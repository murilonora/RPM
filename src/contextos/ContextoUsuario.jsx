import { createContext, useContext, useState, useEffect, useCallback } from "react";

// Chaves usadas no localStorage do navegador
const CHAVE_USUARIOS = "rpm_usuarios";
const CHAVE_SESSAO = "rpm_sessao";

// Contexto global do usuario (compartilhado entre todos os componentes)
const ContextoUsuario = createContext(null);

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

  const usuarioLogado = usuarios.find((u) => u.id === idSessao) || null;

  // Carrega as avaliacoes do usuario logado ao trocar de sessao
  useEffect(() => {
    if (idSessao) {
      setAvaliacoes(obterDoStorage(`rpm_avaliacoes_${idSessao}`, {}));
    } else {
      setAvaliacoes({});
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

  // Cadastra um novo usuario e ja faz login automatico
  function registrarUsuario(nome, email) {
    const id = nome.toLowerCase().replace(/\s+/g, "-") + "-" + Date.now();
    const novoUsuario = { id, nome, email, criadoEm: new Date().toISOString() };
    setUsuarios((anteriores) => [...anteriores, novoUsuario]);
    setIdSessao(id);
    return novoUsuario;
  }

  // Tenta fazer login buscando o email entre os usuarios cadastrados
  function entrarComEmail(email) {
    const usuario = usuarios.find((u) => u.email === email);
    if (usuario) {
      setIdSessao(usuario.id);
      return usuario;
    }
    return null;
  }

  // Encerra a sessao sem apagar dados
  function sairDaConta() {
    setIdSessao(null);
    setAvaliacoes({});
  }

  // Salva ou atualiza a nota e o comentario de um item (musica ou album)
  const avaliarItem = useCallback(
    (chaveItem, nota, comentario = "") => {
      if (!idSessao) return;
      const novasAvaliacoes = { ...avaliacoes, [chaveItem]: { nota, comentario } };
      setAvaliacoes(novasAvaliacoes);
      salvarNoStorage(`rpm_avaliacoes_${idSessao}`, novasAvaliacoes);
    },
    [idSessao, avaliacoes]
  );

  // Retorna a nota e comentario atual de um item
  function obterAvaliacao(chaveItem) {
    return avaliacoes[chaveItem] || { nota: 0, comentario: "" };
  }

  // Estatisticas calculadas em tempo real
  const valoresAvaliacoes = Object.values(avaliacoes).filter((a) => a.nota > 0);
  const totalAvaliacoes = valoresAvaliacoes.length;
  const mediaAvaliacoes =
    totalAvaliacoes > 0
      ? (valoresAvaliacoes.reduce((soma, a) => soma + a.nota, 0) / totalAvaliacoes).toFixed(1)
      : "0.0";

  const valor = {
    usuarioLogado,
    estaLogado: !!idSessao,
    avaliacoes,
    totalAvaliacoes,
    mediaAvaliacoes,
    registrarUsuario,
    entrarComEmail,
    sairDaConta,
    avaliarItem,
    obterAvaliacao,
  };

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
