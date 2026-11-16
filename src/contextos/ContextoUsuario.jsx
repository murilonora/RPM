import { createContext, useContext, useState, useEffect, useCallback, useMemo, useRef } from "react";
import {
  ErroApi,
  ServidorIndisponivel,
  cadastrarUsuario,
  entrar,
  enviarAvaliacao,
  excluirAvaliacao,
  listarMinhasAvaliacoes,
  rotaDaObra,
  sair,
  verificarServidor,
} from "../servicos/api";
import { useCatalogo } from "./ContextoCatalogo";
import { localizarFaixa } from "../dados/faixasDosAlbuns";
import { normalizarTexto } from "../utilitarios/texto";

// Chaves usadas no localStorage do navegador
const CHAVE_USUARIOS = "rpm_usuarios";
const CHAVE_SESSAO = "rpm_sessao";

// Contexto global do usuario (compartilhado entre todos os componentes)
const ContextoUsuario = createContext(null);

// Objeto fixo para itens sem avaliação (evita criar um novo a cada leitura)
const AVALIACAO_VAZIA = Object.freeze({ nota: 0, comentario: "" });

// Utilitarios de leitura e escrita no localStorage
function obterDoStorage(chave, valorPadrao) {
  try {
    // Tudo o que os componentes recebem pelo useUsuario(), memorizado para evitar re-render à toa
    const valor = localStorage.getItem(chave);
    return valor ? JSON.parse(valor) : valorPadrao;
  } catch {
    return valorPadrao;
  }
}

function salvarNoStorage(chave, valor) {
  localStorage.setItem(chave, JSON.stringify(valor));
}

// A senha nunca é guardada em texto: só o hash SHA-256, para entrar com o servidor fora do ar
// (com ele no ar, quem confere a senha é o POST /api/login)
async function gerarHashSenha(senha) {
  const bytes = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(senha));
  return Array.from(new Uint8Array(bytes), (b) => b.toString(16).padStart(2, "0")).join("");
}

// Cópia local da conta, usada para guardar as notas no navegador
async function criarContaLocal(nome, email, senha) {
  return {
    id: nome.toLowerCase().replace(/\s+/g, "-") + "-" + Date.now(),
    nome,
    email,
    senhaHash: await gerarHashSenha(senha),
    criadoEm: new Date().toISOString(),
  };
}

// Login no backend. Contas criadas só no navegador (antes de o backend salvar usuários)
// não existem lá: se a senha bater com a cópia local, a conta é cadastrada no servidor na hora.
async function entrarNoServidor(email, senha, contaLocal) {
  try {
    return await entrar({ email, senha });
  } catch (erro) {
    if (!(erro instanceof ErroApi) || erro.status !== 401) throw erro;
    const senhaConfere =
      contaLocal && (!contaLocal.senhaHash || contaLocal.senhaHash === (await gerarHashSenha(senha)));
    if (senhaConfere) {
      try {
        await cadastrarUsuario({ nome: contaLocal.nome, email, senha });
        return await entrar({ email, senha });
      } catch (erroMigracao) {
        if (!(erroMigracao instanceof ErroApi)) throw erroMigracao;
      }
    }
    // O backend não diz qual dos dois está errado, para não revelar quais e-mails existem
    throw new ErroApi(401, { senha: "E-mail ou senha incorretos." });
  }
}

// ---------- Avaliações do banco <-> avaliações do navegador ----------
// O banco identifica uma avaliação por usuário + artista + título; o navegador, por chave
// ("album-matue-0", "musica-matue-2", "faixa-matue-0-3"). A "identidade" liga os dois lados.
const identidadeDaObra = (obra) => `${rotaDaObra(obra)}|${obra.artistaId}|${normalizarTexto(obra.titulo)}`;
const identidadeDoBanco = (item) => `${item.rota}|${item.artistaId}|${normalizarTexto(item.titulo)}`;

const chaveExclusoes = (idUsuario) => `rpm_exclusoes_${idUsuario}`;

// Acha a chave do navegador de uma avaliação que veio do banco (ex.: feita em outro aparelho).
// Música procura primeiro nas mais ouvidas e depois nas faixas dos álbuns. Sem achar, devolve null.
async function chaveParaAvaliacaoDoBanco(item, artistasPorId) {
  const artista = artistasPorId.get(item.artistaId);
  if (!artista) return null;
  const titulo = normalizarTexto(item.titulo);
  const mesmoTitulo = (obra) => normalizarTexto(obra.titulo) === titulo;

  if (item.rota === "albuns") {
    const indice = artista.albuns.findIndex(mesmoTitulo);
    if (indice < 0) return null;
    return {
      chave: `album-${artista.id}-${indice}`,
      obra: { tipo: "album", artistaId: artista.id, titulo: artista.albuns[indice].titulo },
    };
  }

  const indice = artista.musicas.findIndex(mesmoTitulo);
  if (indice >= 0) {
    return {
      chave: `musica-${artista.id}-${indice}`,
      obra: { tipo: "musica", artistaId: artista.id, titulo: artista.musicas[indice].titulo },
    };
  }

  const faixa = await localizarFaixa(artista, item.titulo);
  if (!faixa) return null;
  return {
    chave: `faixa-${artista.id}-${faixa.indiceAlbum}-${faixa.numero}`,
    obra: { tipo: "faixa", artistaId: artista.id, titulo: item.titulo, album: faixa.album, numero: faixa.numero },
  };
}

/**
 * Junta o que está no navegador com o que está no banco. O banco vence, menos para notas
 * que ainda não subiram (sincronizado: false), que ficam como estão até serem enviadas.
 * Nota que já tinha subido e sumiu do banco foi apagada em outro lugar: sai daqui também.
 * doBanco: [{ item, local: { chave, obra } | null }]
 */
function mesclarComBanco(locais, doBanco) {
  const porIdentidade = new Map(doBanco.map((d) => [identidadeDoBanco(d.item), d]));
  const usadas = new Set();
  const novas = {};

  for (const [chave, avaliacao] of Object.entries(locais)) {
    const identidade = avaliacao.obra ? identidadeDaObra(avaliacao.obra) : null;
    const noBanco = identidade && porIdentidade.get(identidade);
    if (noBanco) usadas.add(identidade);

    if (!avaliacao.sincronizado && avaliacao.nota > 0) {
      novas[chave] = noBanco ? { ...avaliacao, idServidor: noBanco.item.id } : avaliacao;
    } else if (noBanco) {
      novas[chave] = {
        ...avaliacao,
        nota: noBanco.item.nota,
        comentario: noBanco.item.texto,
        sincronizado: true,
        idServidor: noBanco.item.id,
        textoNoServidor: !!noBanco.item.texto,
      };
    }
  }

  // Avaliações do banco que este navegador ainda não conhecia
  for (const { item, local } of doBanco) {
    if (usadas.has(identidadeDoBanco(item)) || !local || novas[local.chave]) continue;
    novas[local.chave] = {
      nota: item.nota,
      comentario: item.texto,
      obra: local.obra,
      sincronizado: true,
      idServidor: item.id,
      textoNoServidor: !!item.texto,
    };
  }
  return novas;
}

// Provedor que envolve toda a aplicacao e fornece estado de usuario e avaliacoes.
// O backend (servicos/api.js) valida cadastros e recebe as avaliações; o navegador
// guarda uma cópia para o site funcionar mesmo com o servidor desligado.
export function ProvedorUsuario({ children }) {
  const [usuarios, setUsuarios] = useState(() => obterDoStorage(CHAVE_USUARIOS, []));
  const [idSessao, setIdSessao] = useState(() => obterDoStorage(CHAVE_SESSAO, null));
  const [avaliacoes, setAvaliacoes] = useState({});
  const [chaveFavoritoManual, setChaveFavoritoManual] = useState(null);
  // "verificando" | "online" | "offline"
  const [statusServidor, setStatusServidor] = useState("verificando");
  // { chave, avaliacao } da última avaliação apagada, enquanto ainda dá para desfazer
  const [ultimaExcluida, setUltimaExcluida] = useState(null);
  // { titulo, nota, momento } da última nota dada, para o aviso "Salvo na sua Coleção"
  const [ultimaNotaSalva, setUltimaNotaSalva] = useState(null);
  // O backend respondeu 401: a sessão dele acabou (ex.: servidor reiniciado) e as notas
  // ficam pendentes até a pessoa entrar de novo
  const [sessaoExpirada, setSessaoExpirada] = useState(false);

  // Dados do usuário da sessão atual (null quando ninguém entrou)
  const usuarioLogado = useMemo(
    () => usuarios.find((u) => u.id === idSessao) || null,
    [usuarios, idSessao]
  );

  // Refs para as funções de envio lerem o valor atual sem precisar ser recriadas
  const usuarioRef = useRef(usuarioLogado);
  usuarioRef.current = usuarioLogado;
  const avaliacoesRef = useRef(avaliacoes);
  avaliacoesRef.current = avaliacoes;
  const ultimaExcluidaRef = useRef(ultimaExcluida);
  ultimaExcluidaRef.current = ultimaExcluida;
  const sessaoExpiradaRef = useRef(sessaoExpirada);
  sessaoExpiradaRef.current = sessaoExpirada;
  // Catálogo atual: as chaves das avaliações usam a posição do álbum/música nele
  const { artistasPorId } = useCatalogo();
  const artistasPorIdRef = useRef(artistasPorId);
  artistasPorIdRef.current = artistasPorId;
  // Exclusão em andamento no backend, por chave (o "Desfazer" espera ela terminar antes de reenviar)
  const exclusoesEmAndamento = useRef(new Map());

  // Descobre se o backend está no ar ao abrir o site
  useEffect(() => {
    let ativo = true;
    verificarServidor().then((online) => {
      if (ativo) setStatusServidor(online ? "online" : "offline");
    });
    return () => {
      ativo = false;
    };
  }, []);

  // Carrega as avaliações e favorito manual do usuário logado ao trocar de sessão
  useEffect(() => {
    if (idSessao) {
      setAvaliacoes(obterDoStorage(`rpm_avaliacoes_${idSessao}`, {}));
      setChaveFavoritoManual(obterDoStorage(`rpm_favorito_${idSessao}`, null));
    } else {
      setAvaliacoes({});
      setChaveFavoritoManual(null);
    }
  }, [idSessao]);

  // Sincroniza lista de usuarios com localStorage sempre que muda
  useEffect(() => {
    salvarNoStorage(CHAVE_USUARIOS, usuarios);
  }, [usuarios]);

  // Sincroniza sessao ativa com localStorage
  useEffect(() => {
    salvarNoStorage(CHAVE_SESSAO, idSessao);
  }, [idSessao]);

  // Atualiza campos de uma avaliação depois de uma resposta do backend (ex.: sincronizado, idServidor).
  // Se a pessoa mudou a nota enquanto a resposta não chegava, não marca como enviada.
  const marcarSincronizado = useCallback((idUsuario, chaveItem, enviada, campos) => {
    setAvaliacoes((anteriores) => {
      const atual = anteriores[chaveItem];
      if (!atual || atual.nota !== enviada.nota || atual.comentario !== enviada.comentario) return anteriores;
      const novas = { ...anteriores, [chaveItem]: { ...atual, ...campos } };
      salvarNoStorage(`rpm_avaliacoes_${idUsuario}`, novas);
      return novas;
    });
  }, []);

  // Trata um erro do backend: fora do ar, sessão vencida ou recusa (só registra)
  const tratarErroDoServidor = useCallback((erro, acao) => {
    if (erro instanceof ServidorIndisponivel) setStatusServidor("offline");
    else if (erro instanceof ErroApi && erro.status === 401) setSessaoExpirada(true);
    else console.warn(`Backend recusou ${acao}:`, erro.campos || erro.message);
  }, []);

  // Exclusões que não chegaram ao backend (fora do ar, ou sem o id dele): repetidas na próxima sincronização
  const guardarExclusaoPendente = useCallback((idUsuario, avaliacao) => {
    const pendentes = obterDoStorage(chaveExclusoes(idUsuario), []);
    pendentes.push({
      rota: rotaDaObra(avaliacao.obra),
      id: avaliacao.idServidor ?? null,
      identidade: identidadeDaObra(avaliacao.obra),
    });
    salvarNoStorage(chaveExclusoes(idUsuario), pendentes);
  }, []);

  // Apaga no backend uma avaliação que já tinha subido. Sem o id (ou fora do ar), fica pendente.
  const excluirNoServidor = useCallback(
    async (avaliacao) => {
      const usuario = usuarioRef.current;
      if (!usuario || !avaliacao?.obra || !avaliacao.sincronizado) return;
      if (!avaliacao.idServidor || sessaoExpiradaRef.current) {
        guardarExclusaoPendente(usuario.id, avaliacao);
        return;
      }
      try {
        await excluirAvaliacao(rotaDaObra(avaliacao.obra), avaliacao.idServidor);
        setStatusServidor("online");
      } catch (erro) {
        // 404: já não existia no banco, que é o resultado esperado
        if (erro instanceof ErroApi && erro.status === 404) return;
        guardarExclusaoPendente(usuario.id, avaliacao);
        tratarErroDoServidor(erro, "a exclusão");
      }
    },
    [guardarExclusaoPendente, tratarErroDoServidor]
  );

  // Manda a avaliação ao backend; se ele estiver fora do ar, ela fica pendente no navegador.
  // Nota 0 (desmarcada) apaga a avaliação de lá.
  const enviarParaServidor = useCallback(
    async (chaveItem, avaliacao, anterior) => {
      const usuario = usuarioRef.current;
      if (!usuario || !avaliacao.obra || sessaoExpiradaRef.current) return;
      if (avaliacao.nota < 1) {
        await excluirNoServidor(anterior);
        return;
      }
      try {
        // O backend não apaga o texto ao receber uma nota sem comentário: para tirar a resenha,
        // a avaliação antiga é apagada e a nota é gravada de novo
        if (!avaliacao.comentario?.trim() && anterior?.textoNoServidor && anterior.idServidor) {
          await excluirAvaliacao(rotaDaObra(anterior.obra), anterior.idServidor).catch((erro) => {
            if (!(erro instanceof ErroApi && erro.status === 404)) throw erro;
          });
        }
        const salva = await enviarAvaliacao(avaliacao);
        setStatusServidor("online");
        marcarSincronizado(usuario.id, chaveItem, avaliacao, {
          sincronizado: true,
          idServidor: salva?.id ?? anterior?.idServidor,
          textoNoServidor: !!salva?.texto,
        });
      } catch (erro) {
        tratarErroDoServidor(erro, "a avaliação");
      }
    },
    [excluirNoServidor, marcarSincronizado, tratarErroDoServidor]
  );

  // Traz as avaliações do banco (inclusive as feitas em outro aparelho), repete as exclusões
  // pendentes e junta tudo com o navegador. Devolve as avaliações já juntas, ou null se não deu.
  const sincronizarComBanco = useCallback(async () => {
    const usuario = usuarioRef.current;
    if (!usuario) return null;
    let doBanco;
    try {
      doBanco = await listarMinhasAvaliacoes();
    } catch (erro) {
      if (erro instanceof ErroApi && erro.status === 401) {
        // A sessão do backend acabou (ex.: navegador fechado ou servidor reiniciado). Sai só aqui:
        // as notas ficam salvas no navegador e sobem quando a pessoa entrar de novo.
        if (usuarioRef.current?.id === usuario.id) {
          setIdSessao(null);
          setAvaliacoes({});
        }
      } else if (erro instanceof ServidorIndisponivel) {
        setStatusServidor("offline");
      }
      return null;
    }

    // Guarda o id do usuário no banco (o perfil público usa)
    const idNoBanco = doBanco.find((a) => a.usuarioId != null)?.usuarioId;
    if (idNoBanco != null && usuario.idServidor !== idNoBanco) {
      setUsuarios((anteriores) => anteriores.map((u) => (u.id === usuario.id ? { ...u, idServidor: idNoBanco } : u)));
    }

    // Exclusões que ficaram pendentes: apaga agora e tira da lista que vai ser juntada
    const pendentes = obterDoStorage(chaveExclusoes(usuario.id), []);
    const naoApagadas = [];
    for (const pendente of pendentes) {
      const alvo = doBanco.find((a) =>
        pendente.id != null ? a.rota === pendente.rota && a.id === pendente.id : identidadeDoBanco(a) === pendente.identidade
      );
      if (!alvo) continue;
      doBanco = doBanco.filter((a) => a !== alvo);
      try {
        await excluirAvaliacao(alvo.rota, alvo.id);
      } catch (erro) {
        if (!(erro instanceof ErroApi && erro.status === 404)) naoApagadas.push({ ...pendente, id: alvo.id });
      }
    }
    salvarNoStorage(chaveExclusoes(usuario.id), naoApagadas);

    const comChave = await Promise.all(
      doBanco.map(async (item) => ({ item, local: await chaveParaAvaliacaoDoBanco(item, artistasPorIdRef.current) }))
    );
    if (usuarioRef.current?.id !== usuario.id) return null; // trocou de conta no meio

    let juntas = null;
    setAvaliacoes((anteriores) => {
      juntas = mesclarComBanco(anteriores, comChave);
      salvarNoStorage(`rpm_avaliacoes_${usuario.id}`, juntas);
      return juntas;
    });
    return juntas;
  }, []);

  // Ao abrir o site com o servidor no ar (ou entrar na conta): sincroniza com o banco
  // e depois reenvia o que ficou só no navegador
  useEffect(() => {
    if (statusServidor !== "online" || sessaoExpirada || !idSessao) return;
    let ativo = true;
    (async () => {
      const juntas = (await sincronizarComBanco()) ?? avaliacoesRef.current;
      if (!ativo) return;
      Object.entries(juntas)
        .filter(([, a]) => a.nota > 0 && a.obra && !a.sincronizado)
        .forEach(([chave, a]) => enviarParaServidor(chave, a));
    })();
    return () => {
      ativo = false;
    };
    // só ao ficar online ou trocar de usuário, não a cada nota
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusServidor, idSessao, sessaoExpirada]);

  // Cadastra um novo usuario (validado pelo backend) e ja faz login automatico.
  // Lança ErroApi com as mensagens por campo quando algo está inválido.
  const registrarUsuario = useCallback(
    async (nome, email, senha) => {
      if (usuarios.some((u) => u.email === email)) {
        throw new ErroApi(409, { email: "Este e-mail já tem cadastro. Use Entrar." });
      }
      let idServidor = null;
      try {
        await cadastrarUsuario({ nome, email, senha });
        idServidor = (await entrar({ email, senha }))?.id ?? null;
        setStatusServidor("online");
      } catch (erro) {
        if (!(erro instanceof ServidorIndisponivel)) throw erro;
        // Servidor fora: aplica as mesmas regras do backend aqui para não aceitar dados inválidos
        if (!senha || senha.length < 8) {
          throw new ErroApi(400, { senha: "Senha deve ter no minimo 8 caracteres" });
        }
        setStatusServidor("offline");
      }

      const novoUsuario = { ...(await criarContaLocal(nome, email, senha)), idServidor };
      setUsuarios((anteriores) => [...anteriores, novoUsuario]);
      setSessaoExpirada(false);
      setIdSessao(novoUsuario.id);
      return novoUsuario;
    },
    [usuarios]
  );

  // Login com e-mail e senha pelo backend; com ele fora do ar, confere a cópia do navegador.
  // Contas antigas, criadas antes da senha existir, entram só com o e-mail (só offline).
  const entrarComEmail = useCallback(
    async (email, senha = "") => {
      const contaLocal = usuarios.find((u) => u.email === email);
      try {
        const doServidor = await entrarNoServidor(email, senha, contaLocal);
        setStatusServidor("online");
        // Conta criada em outro navegador ganha uma cópia local; a existente só atualiza o hash.
        // idServidor: o id da conta no banco (usado no perfil público)
        const usuario = {
          ...(contaLocal
            ? { ...contaLocal, senhaHash: await gerarHashSenha(senha) }
            : await criarContaLocal(doServidor?.nome || email, email, senha)),
          idServidor: doServidor?.id ?? contaLocal?.idServidor ?? null,
        };
        setUsuarios((anteriores) =>
          contaLocal ? anteriores.map((u) => (u.id === usuario.id ? usuario : u)) : [...anteriores, usuario]
        );
        setSessaoExpirada(false);
        setIdSessao(usuario.id);
        return usuario;
      } catch (erro) {
        if (!(erro instanceof ServidorIndisponivel)) throw erro;
        setStatusServidor("offline");
      }

      const usuario = contaLocal;
      if (!usuario) throw new ErroApi(404, { email: "E-mail não encontrado. Cadastre-se primeiro." });
      if (usuario.senhaHash && usuario.senhaHash !== (await gerarHashSenha(senha))) {
        throw new ErroApi(401, { senha: "Senha incorreta." });
      }
      setIdSessao(usuario.id);
      return usuario;
    },
    [usuarios]
  );

  // Encerra a sessao sem apagar dados
  const sairDaConta = useCallback(() => {
    // Encerra também a sessão do backend; fora do ar, não há o que encerrar
    sair().catch(() => {});
    setSessaoExpirada(false);
    setIdSessao(null);
    setAvaliacoes({});
    setUltimaExcluida(null);
    setChaveFavoritoManual(null);
  }, []);

  // Define manualmente qual item é o favorito absoluto
  const definirFavorito = useCallback(
    (chaveItem) => {
      if (!idSessao) return;
      setChaveFavoritoManual(chaveItem);
      salvarNoStorage(`rpm_favorito_${idSessao}`, chaveItem);
    },
    [idSessao]
  );

  // Salva a nota e o comentário de um álbum, música ou faixa e envia ao backend.
  // obra = { tipo, artistaId, titulo, album? } identifica o item para o servidor e a Coleção;
  // se não vier, mantém a que já estava salva para essa chave.
  // Atualização funcional: não depende de "avaliacoes", então a função não muda a cada nota.
  const avaliarItem = useCallback(
    (chaveItem, nota, comentario = "", obra) => {
      if (!idSessao) return;
      const anterior = avaliacoesRef.current[chaveItem];
      const salva = {
        nota,
        comentario,
        obra: obra || anterior?.obra,
        sincronizado: false,
        // continua sabendo qual é o registro no banco, para atualizar ou apagar depois
        idServidor: anterior?.idServidor,
        textoNoServidor: anterior?.textoNoServidor,
      };
      setAvaliacoes((anteriores) => {
        const novasAvaliacoes = { ...anteriores, [chaveItem]: salva };
        salvarNoStorage(`rpm_avaliacoes_${idSessao}`, novasAvaliacoes);
        return novasAvaliacoes;
      });
      enviarParaServidor(chaveItem, salva, anterior);
      if (nota > 0) setUltimaNotaSalva({ titulo: salva.obra?.titulo, nota, momento: Date.now() });
    },
    [idSessao, enviarParaServidor]
  );

  // Esquece a última nota (o aviso "Salvo na sua Coleção" saiu da tela)
  const descartarNotaSalva = useCallback(() => setUltimaNotaSalva(null), []);

  // Apaga nota e resenha de um item, no navegador e no backend.
  // Guarda o que foi apagado em ultimaExcluida, para a Coleção oferecer "Desfazer".
  const removerAvaliacao = useCallback(
    (chaveItem) => {
      if (!idSessao) return;
      const removida = avaliacoesRef.current[chaveItem];
      if (!removida) return;
      setAvaliacoes((anteriores) => {
        const restantes = { ...anteriores };
        delete restantes[chaveItem];
        salvarNoStorage(`rpm_avaliacoes_${idSessao}`, restantes);
        return restantes;
      });
      setUltimaExcluida({ chave: chaveItem, avaliacao: removida });
      const exclusao = excluirNoServidor(removida);
      exclusoesEmAndamento.current.set(chaveItem, exclusao);
      exclusao.finally(() => {
        if (exclusoesEmAndamento.current.get(chaveItem) === exclusao) exclusoesEmAndamento.current.delete(chaveItem);
      });
    },
    [idSessao, excluirNoServidor]
  );

  // Devolve a última avaliação apagada como estava e grava de novo no backend
  // (depois de a exclusão terminar, para uma não atropelar a outra)
  const desfazerExclusao = useCallback(async () => {
    if (!idSessao || !ultimaExcluidaRef.current) return;
    const { chave, avaliacao } = ultimaExcluidaRef.current;
    const restaurada = { ...avaliacao, sincronizado: false, idServidor: undefined, textoNoServidor: false };
    setAvaliacoes((anteriores) => {
      const novas = { ...anteriores, [chave]: restaurada };
      salvarNoStorage(`rpm_avaliacoes_${idSessao}`, novas);
      return novas;
    });
    setUltimaExcluida(null);
    await exclusoesEmAndamento.current.get(chave);
    // Se a exclusão ficou pendente (fora do ar), ela não vale mais
    const pendentes = obterDoStorage(chaveExclusoes(idSessao), []);
    const identidade = avaliacao.obra && identidadeDaObra(avaliacao.obra);
    salvarNoStorage(chaveExclusoes(idSessao), pendentes.filter((p) => p.identidade !== identidade));
    enviarParaServidor(chave, restaurada);
  }, [idSessao, enviarParaServidor]);

  // Esquece a última exclusão (o aviso de desfazer saiu da tela)
  const descartarExclusao = useCallback(() => setUltimaExcluida(null), []);

  // Retorna a nota e comentario atual de um item
  const obterAvaliacao = useCallback(
    (chaveItem) => avaliacoes[chaveItem] || AVALIACAO_VAZIA,
    [avaliacoes]
  );

  // Estatisticas calculadas apenas quando as avaliações mudam
  const { totalAvaliacoes, mediaAvaliacoes } = useMemo(() => {
    const notas = Object.values(avaliacoes).filter((a) => a.nota > 0);
    const total = notas.length;
    const media = total > 0 ? (notas.reduce((soma, a) => soma + a.nota, 0) / total).toFixed(1) : "0.0";
    return { totalAvaliacoes: total, mediaAvaliacoes: media };
  }, [avaliacoes]);

  const valor = useMemo(
    () => ({
      usuarioLogado,
      estaLogado: !!idSessao,
      statusServidor,
      sessaoExpirada,
      avaliacoes,
      totalAvaliacoes,
      mediaAvaliacoes,
      chaveFavoritoManual,
      definirFavorito,
      registrarUsuario,
      entrarComEmail,
      sairDaConta,
      avaliarItem,
      removerAvaliacao,
      ultimaExcluida,
      desfazerExclusao,
      descartarExclusao,
      ultimaNotaSalva,
      descartarNotaSalva,
      obterAvaliacao,
    }),
    [
      usuarioLogado,
      idSessao,
      statusServidor,
      sessaoExpirada,
      avaliacoes,
      totalAvaliacoes,
      mediaAvaliacoes,
      chaveFavoritoManual,
      definirFavorito,
      registrarUsuario,
      entrarComEmail,
      sairDaConta,
      avaliarItem,
      removerAvaliacao,
      ultimaExcluida,
      desfazerExclusao,
      descartarExclusao,
      ultimaNotaSalva,
      descartarNotaSalva,
      obterAvaliacao,
    ]
  );

  return <ContextoUsuario.Provider value={valor}>{children}</ContextoUsuario.Provider>;
}

// Hook para acessar o contexto do usuario em qualquer componente
export function useUsuario() {
  const contexto = useContext(ContextoUsuario);
  if (!contexto) {
    throw new Error("useUsuario deve ser usado dentro de ProvedorUsuario");
  }
  return contexto;
}
