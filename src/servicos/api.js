// Cliente da API do backend Spring Boot (pasta backend/).
// Em desenvolvimento o Vite repassa /api para http://localhost:8080 (ver vite.config.js).
//
// Contrato usado (backend/teste.http):
//   GET  /api/status                         -> { status: "ok" }
//   GET  /api/artistas                       -> catálogo completo
//   POST /api/usuarios                       { nome, email, senha } -> 201 { id, nome, email } | 409 e-mail repetido
//   POST /api/login                          { email, senha } -> { id, nome, email } e abre a sessão (cookie) | 401
//   POST /api/logout                         -> 204, encerra a sessão
//   POST /api/avaliacoes/albuns              { artistaId, tituloAlbum, nota }
//   POST /api/avaliacoes/albuns/comentarios  { ...igual, texto } (grava nota e texto juntos)
//   POST /api/avaliacoes/musicas             { artistaId, tituloMusica, nota }
//   POST /api/avaliacoes/musicas/comentarios { ...igual, texto }
// As avaliações exigem login: o backend pega o usuário da sessão e responde 401 sem ela.
// O cookie da sessão vai sozinho porque o Vite serve /api no mesmo endereço do site.
// Erros de validação voltam como 400 { campo: "mensagem" } ou { erro: "mensagem" }.

import { prepararArtistas } from "../dados/dadosMusicais";

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

// Confere e-mail e senha no backend e abre a sessão dele (cookie)
export function entrar({ email, senha }) {
  return requisitar("/login", { metodo: "POST", corpo: { email, senha } });
}

export function sair() {
  return requisitar("/logout", { metodo: "POST" });
}

/**
 * Envia a nota (e o comentário, se houver) de um álbum, música ou faixa.
 * obra: { tipo: "album" | "musica" | "faixa", artistaId, titulo }
 * Faixas de álbum usam a mesma rota das músicas: o backend identifica pelo título.
 */
export function enviarAvaliacao({ obra, nota, comentario }) {
  const ehAlbum = obra.tipo === "album";
  const rota = ehAlbum ? "/avaliacoes/albuns" : "/avaliacoes/musicas";
  const corpo = {
    artistaId: obra.artistaId,
    [ehAlbum ? "tituloAlbum" : "tituloMusica"]: obra.titulo,
    nota,
  };

  // Com texto, a rota de comentários grava nota e comentário de uma vez
  if (comentario?.trim()) {
    return requisitar(`${rota}/comentarios`, { metodo: "POST", corpo: { ...corpo, texto: comentario.trim() } });
  }
  return requisitar(rota, { metodo: "POST", corpo });
}

// ---------- Catálogo de artistas ----------
// Formato esperado: o mesmo do backend/src/main/resources/dados/artistas.json
// (artistas com "albuns" e "musicas" dentro). Com o servidor fora, devolve null
// e o site segue com os dados locais de dadosMusicais.ts.

// Um artista só é aceito se tiver o mínimo que as páginas usam
function artistaValido(artista) {
  return (
    artista &&
    typeof artista.id === "string" &&
    typeof artista.nome === "string" &&
    Array.isArray(artista.albuns) &&
    Array.isArray(artista.musicas)
  );
}

// No banco a biografia é um TEXT; o site espera uma lista de parágrafos
function paragrafos(biografia) {
  if (Array.isArray(biografia)) return biografia;
  if (typeof biografia === "string" && biografia.trim()) {
    return biografia.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
  }
  return [];
}

/**
 * Devolve a lista de artistas pronta para o site, ou null se não der para usar a do servidor
 * (rota inexistente, servidor fora do ar, resposta vazia ou em formato diferente).
 */
export async function buscarCatalogoDoServidor() {
  try {
    const dados = await requisitar("/artistas");
    if (!Array.isArray(dados) || dados.length === 0 || !dados.every(artistaValido)) return null;
    return prepararArtistas(dados.map((artista) => ({ ...artista, biografia: paragrafos(artista.biografia) })));
  } catch {
    return null;
  }
}
