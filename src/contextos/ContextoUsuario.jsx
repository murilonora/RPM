import { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";

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
    const valor = localStorage.getItem(chave);
    return valor ? JSON.parse(valor) : valorPadrao;
  } catch {
    return valorPadrao;
  }
}

function salvarNoStorage(chave, valor) {
  localStorage.setItem(chave, JSON.stringify(valor));
}

// Provedor que envolve toda a aplicacao e fornece estado de usuario e avaliacoes
export function ProvedorUsuario({ children }) {
  const [usuarios, setUsuarios] = useState(() => obterDoStorage(CHAVE_USUARIOS, []));
  const [idSessao, setIdSessao] = useState(() => obterDoStorage(CHAVE_SESSAO, null));
  const [avaliacoes, setAvaliacoes] = useState({});
  const [chaveFavoritoManual, setChaveFavoritoManual] = useState(null);

  const usuarioLogado = useMemo(
    () => usuarios.find((u) => u.id === idSessao) || null,
    [usuarios, idSessao]
  );

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

  // As funções abaixo usam useCallback e o valor do contexto usa useMemo:
  // assim os componentes só redesenham quando algo que eles leem muda de fato,
  // e não a cada render do provedor.

  // Cadastra um novo usuario e ja faz login automatico
  const registrarUsuario = useCallback((nome, email) => {
    const id = nome.toLowerCase().replace(/\s+/g, "-") + "-" + Date.now();
    const novoUsuario = { id, nome, email, criadoEm: new Date().toISOString() };
    setUsuarios((anteriores) => [...anteriores, novoUsuario]);
    setIdSessao(id);
    return novoUsuario;
  }, []);

  // Tenta fazer login buscando o email entre os usuarios cadastrados
  const entrarComEmail = useCallback(
    (email) => {
      const usuario = usuarios.find((u) => u.email === email);
      if (usuario) {
        setIdSessao(usuario.id);
        return usuario;
      }
      return null;
    },
    [usuarios]
  );

  // Encerra a sessao sem apagar dados
  const sairDaConta = useCallback(() => {
    setIdSessao(null);
    setAvaliacoes({});
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

  // Salva ou atualiza a nota e o comentario de um item (musica ou album).
  // Atualização funcional: não depende de "avaliacoes", então a função não muda a cada nota.
  const avaliarItem = useCallback(
    (chaveItem, nota, comentario = "") => {
      if (!idSessao) return;
      setAvaliacoes((anteriores) => {
        const novasAvaliacoes = { ...anteriores, [chaveItem]: { nota, comentario } };
        salvarNoStorage(`rpm_avaliacoes_${idSessao}`, novasAvaliacoes);
        return novasAvaliacoes;
      });
    },
    [idSessao]
  );

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
      avaliacoes,
      totalAvaliacoes,
      mediaAvaliacoes,
      chaveFavoritoManual,
      definirFavorito,
      registrarUsuario,
      entrarComEmail,
      sairDaConta,
      avaliarItem,
      obterAvaliacao,
    }),
    [
      usuarioLogado,
      idSessao,
      avaliacoes,
      totalAvaliacoes,
      mediaAvaliacoes,
      chaveFavoritoManual,
      definirFavorito,
      registrarUsuario,
      entrarComEmail,
      sairDaConta,
      avaliarItem,
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
