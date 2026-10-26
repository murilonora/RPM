// Cliente da API do backend Spring Boot (pasta backend/).
// Em desenvolvimento o Vite repassa /api para http://localhost:8080 (ver vite.config.js).
//
// Contrato usado (backend/teste.http):
//   GET  /api/status                         -> { status: "ok" }
//   POST /api/usuarios                       { nome, email, senha }
//   POST /api/avaliacoes/albuns              { artistaId, tituloAlbum, nota, usuario }
//   POST /api/avaliacoes/albuns/comentarios  { ...igual, texto }
//   POST /api/avaliacoes/musicas             { artistaId, tituloMusica, nota, usuario }
//   POST /api/avaliacoes/musicas/comentarios { ...igual, texto }
// Erros de validação voltam como 400 { campo: "mensagem" } ou { erro: "mensagem" }.

const BASE = "/api";

// Erro com as mensagens por campo devolvidas pelo backend (ex.: { senha: "..." })
export class ErroApi extends Error {
  constructor(status, campos = {}) {
    super(Object.values(campos)[0] || `Erro ${status} no servidor`);
    this.status = status;
    this.campos = campos;
  }
}

// Sem conexão com o servidor (backend desligado, rede fora)
export class ServidorIndisponivel extends Error {
  constructor() {
    super("Servidor indisponível");
  }
}

async function requisitar(caminho, { metodo = "GET", corpo } = {}) {
  let resposta;
  try {
    resposta = await fetch(`${BASE}${caminho}`, {
      method: metodo,
      headers: corpo ? { "Content-Type": "application/json" } : undefined,
      body: corpo ? JSON.stringify(corpo) : undefined,
    });
  } catch {
    throw new ServidorIndisponivel();
  }

  const texto = await resposta.text();
  const dados = texto ? lerJson(texto) : null;

  // O proxy do Vite responde 5xx (ou HTML) quando o backend está desligado
  if (resposta.status >= 500 || (texto && dados === undefined)) throw new ServidorIndisponivel();
  if (!resposta.ok) throw new ErroApi(resposta.status, dados || {});
  return dados;
}

function lerJson(texto) {
  try {
    return JSON.parse(texto);
  } catch {
    return undefined;
  }
}

export async function verificarServidor() {
  try {
    const dados = await requisitar("/status");
    return dados?.status === "ok";
  } catch {
    return false;
  }
}

export function cadastrarUsuario({ nome, email, senha }) {
  return requisitar("/usuarios", { metodo: "POST", corpo: { nome, email, senha } });
}

/**
 * Envia a nota (e o comentário, se houver) de um álbum, música ou faixa.
 * obra: { tipo: "album" | "musica" | "faixa", artistaId, titulo }
 * Faixas de álbum usam a mesma rota das músicas: o backend identifica pelo título.
 */
export async function enviarAvaliacao({ obra, nota, comentario, usuario }) {
  const ehAlbum = obra.tipo === "album";
  const rota = ehAlbum ? "/avaliacoes/albuns" : "/avaliacoes/musicas";
  const corpo = {
    artistaId: obra.artistaId,
    [ehAlbum ? "tituloAlbum" : "tituloMusica"]: obra.titulo,
    nota,
    usuario: usuario ? { nome: usuario.nome, email: usuario.email } : undefined,
  };

  await requisitar(rota, { metodo: "POST", corpo });
  if (comentario?.trim()) {
    await requisitar(`${rota}/comentarios`, { metodo: "POST", corpo: { ...corpo, texto: comentario.trim() } });
  }
}
