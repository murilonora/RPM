// Testes do cliente da API: erros de validação, servidor fora do ar e envio de avaliações
import { afterEach, describe, expect, it, vi } from "vitest";
import { ErroApi, ServidorIndisponivel, cadastrarUsuario, enviarAvaliacao, verificarServidor } from "./api";

function responder(status, corpo, tipo = "json") {
  const texto = tipo === "json" ? JSON.stringify(corpo) : corpo;
  return vi.fn(async () => new Response(texto, { status }));
}

afterEach(() => vi.unstubAllGlobals());

describe("api", () => {
  it("reconhece o servidor no ar pelo /api/status", async () => {
    vi.stubGlobal("fetch", responder(200, { status: "ok" }));
    expect(await verificarServidor()).toBe(true);
    expect(fetch).toHaveBeenCalledWith("/api/status", expect.anything());
  });

  it("trata servidor desligado: sem rede, erro 5xx do proxy ou resposta em HTML", async () => {
    vi.stubGlobal("fetch", vi.fn(() => Promise.reject(new TypeError("Failed to fetch"))));
    expect(await verificarServidor()).toBe(false);

    vi.stubGlobal("fetch", responder(502, "Bad Gateway", "texto"));
    await expect(cadastrarUsuario({ nome: "a", email: "a@a.com", senha: "12345678" })).rejects.toBeInstanceOf(ServidorIndisponivel);

    vi.stubGlobal("fetch", responder(200, "<!doctype html>", "texto"));
    await expect(cadastrarUsuario({ nome: "a", email: "a@a.com", senha: "12345678" })).rejects.toBeInstanceOf(ServidorIndisponivel);
  });

  it("devolve as mensagens por campo quando o backend recusa (400)", async () => {
    vi.stubGlobal("fetch", responder(400, { senha: "Senha deve ter no minimo 8 caracteres" }));
    const erro = await cadastrarUsuario({ nome: "a", email: "a@a.com", senha: "1" }).catch((e) => e);
    expect(erro).toBeInstanceOf(ErroApi);
    expect(erro.campos.senha).toContain("8 caracteres");
  });

  it("envia nota e comentário de álbum nas rotas do backend", async () => {
    vi.stubGlobal("fetch", responder(201, {}));
    await enviarAvaliacao({
      obra: { tipo: "album", artistaId: "matue", titulo: "333" },
      nota: 5,
      comentario: "  Disco do ano  ",
      usuario: { nome: "Ana", email: "ana@rpm.test", senhaHash: "nao-vai" },
    });

    const [rotaNota, opcoesNota] = fetch.mock.calls[0];
    expect(rotaNota).toBe("/api/avaliacoes/albuns");
    expect(JSON.parse(opcoesNota.body)).toEqual({
      artistaId: "matue",
      tituloAlbum: "333",
      nota: 5,
      usuario: { nome: "Ana", email: "ana@rpm.test" },
    });

    const [rotaComentario, opcoesComentario] = fetch.mock.calls[1];
    expect(rotaComentario).toBe("/api/avaliacoes/albuns/comentarios");
    expect(JSON.parse(opcoesComentario.body).texto).toBe("Disco do ano");
  });

  it("não chama a rota de comentário quando não há texto", async () => {
    vi.stubGlobal("fetch", responder(201, {}));
    await enviarAvaliacao({ obra: { tipo: "musica", artistaId: "matue", titulo: "Kenny G" }, nota: 3, comentario: "" });
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch.mock.calls[0][0]).toBe("/api/avaliacoes/musicas");
  });
});
