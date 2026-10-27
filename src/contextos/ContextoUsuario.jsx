import { createContext, useContext, useState, useEffect, useCallback, useMemo, useRef } from "react";
import {
  ErroApi,
  ServidorIndisponivel,
  cadastrarUsuario,
  enviarAvaliacao,
  verificarServidor,
} from "../servicos/api";

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

// A senha nunca é guardada em texto: só o hash SHA-256 (cópia local enquanto o
// backend não tem rota de login; quando tiver, o login passa a ser feito por ele)
async function gerarHashSenha(senha) {
  const bytes = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(senha));
  return Array.from(new Uint8Array(bytes), (b) => b.toString(16).padStart(2, "0")).join("");
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

  // Marca no navegador se a avaliação já chegou ao backend
  const marcarSincronizado = useCallback((idUsuario, chaveItem, sincronizado) => {
    setAvaliacoes((anteriores) => {
      if (!anteriores[chaveItem]) return anteriores;
      const novas = { ...anteriores, [chaveItem]: { ...anteriores[chaveItem], sincronizado } };
      salvarNoStorage(`rpm_avaliacoes_${idUsuario}`, novas);
      return novas;
    });
  }, []);

  // Manda a avaliação ao backend; se ele estiver fora do ar, ela fica pendente no navegador
  const enviarParaServidor = useCallback(
    async (chaveItem, avaliacao) => {
      const usuario = usuarioRef.current;
      if (!usuario || !avaliacao.obra || avaliacao.nota < 1) return;
      try {
        await enviarAvaliacao({ ...avaliacao, usuario });
        setStatusServidor("online");
        marcarSincronizado(usuario.id, chaveItem, true);
      } catch (erro) {
        if (erro instanceof ServidorIndisponivel) setStatusServidor("offline");
        else console.warn("Backend recusou a avaliação:", erro.campos || erro.message);
      }
    },
    [marcarSincronizado]
  );

  // Quando o servidor volta, reenvia o que ficou só no navegador
  useEffect(() => {
    if (statusServidor !== "online") return;
    Object.entries(avaliacoes)
      .filter(([, a]) => a.nota > 0 && a.obra && !a.sincronizado)
      .forEach(([chave, a]) => enviarParaServidor(chave, a));
    // só ao ficar online ou trocar de usuário, não a cada nota
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusServidor, idSessao]);

  // Cadastra um novo usuario (validado pelo backend) e ja faz login automatico.
  // Lança ErroApi com as mensagens por campo quando algo está inválido.
  const registrarUsuario = useCallback(
    async (nome, email, senha) => {
      if (usuarios.some((u) => u.email === email)) {
        throw new ErroApi(409, { email: "Este e-mail já tem cadastro. Use Entrar." });
      }
      try {
        await cadastrarUsuario({ nome, email, senha });
        setStatusServidor("online");
      } catch (erro) {
        if (!(erro instanceof ServidorIndisponivel)) throw erro;
        // Servidor fora: aplica as mesmas regras do backend aqui para não aceitar dados inválidos
        if (!senha || senha.length < 8) {
          throw new ErroApi(400, { senha: "Senha deve ter no minimo 8 caracteres" });
        }
        setStatusServidor("offline");
      }

      const id = nome.toLowerCase().replace(/\s+/g, "-") + "-" + Date.now();
      const novoUsuario = {
        id,
        nome,
        email,
        senhaHash: await gerarHashSenha(senha),
        criadoEm: new Date().toISOString(),
      };
      setUsuarios((anteriores) => [...anteriores, novoUsuario]);
      setIdSessao(id);
      return novoUsuario;
    },
    [usuarios]
  );

  // Login com e-mail e senha. Contas antigas, criadas antes da senha existir, entram só com o e-mail.
  const entrarComEmail = useCallback(
    async (email, senha = "") => {
      const usuario = usuarios.find((u) => u.email === email);
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
      const salva = {
        nota,
        comentario,
        obra: obra || avaliacoesRef.current[chaveItem]?.obra,
        sincronizado: false,
      };
      setAvaliacoes((anteriores) => {
        const novasAvaliacoes = { ...anteriores, [chaveItem]: salva };
        salvarNoStorage(`rpm_avaliacoes_${idSessao}`, novasAvaliacoes);
        return novasAvaliacoes;
      });
      enviarParaServidor(chaveItem, salva);
    },
    [idSessao, enviarParaServidor]
  );

  // Apaga nota e resenha de um item (só no navegador: o backend ainda não tem rota de exclusão).
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
    },
    [idSessao]
  );

  // Devolve a última avaliação apagada exatamente como estava (sem reenviar ao backend)
  const desfazerExclusao = useCallback(() => {
    if (!idSessao || !ultimaExcluidaRef.current) return;
    const { chave, avaliacao } = ultimaExcluidaRef.current;
    setAvaliacoes((anteriores) => {
      const novas = { ...anteriores, [chave]: avaliacao };
      salvarNoStorage(`rpm_avaliacoes_${idSessao}`, novas);
      return novas;
    });
    setUltimaExcluida(null);
  }, [idSessao]);

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
      obterAvaliacao,
    }),
    [
      usuarioLogado,
      idSessao,
      statusServidor,
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
