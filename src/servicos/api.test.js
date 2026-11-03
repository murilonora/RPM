// Testes do cliente da API: erros de validação, servidor fora do ar e envio de avaliações
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  ErroApi,
  ServidorIndisponivel,
  cadastrarUsuario,
  entrar,
  enviarAvaliacao,
  sair,
  verificarServidor,
} from "./api";

function responder(status, corpo, tipo = "json") {
  const texto = tipo === "json" ? JSON.stringify(corpo) : corpo;
  // 204 não pode ter corpo
  return vi.fn(async () => new Response(status === 204 ? null : texto, { status }));
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

  it("com comentário, envia nota e texto juntos na rota de comentários (sem dados do usuário)", async () => {
    vi.stubGlobal("fetch", responder(201, {}));
    await enviarAvaliacao({
      obra: { tipo: "album", artistaId: "matue", titulo: "333" },
      nota: 5,
      comentario: "  Disco do ano  ",
    });

    expect(fetch).toHaveBeenCalledTimes(1);
    const [rota, opcoes] = fetch.mock.calls[0];
    expect(rota).toBe("/api/avaliacoes/albuns/comentarios");
    expect(JSON.parse(opcoes.body)).toEqual({
      artistaId: "matue",
      tituloAlbum: "333",
      nota: 5,
      texto: "Disco do ano",
    });
  });

  it("entra e sai pelas rotas de sessão; login errado vira ErroApi 401", async () => {
    vi.stubGlobal("fetch", responder(200, { id: 1, nome: "Ana", email: "ana@rpm.test" }));
    expect(await entrar({ email: "ana@rpm.test", senha: "12345678" })).toMatchObject({ nome: "Ana" });
    expect(fetch.mock.calls[0][0]).toBe("/api/login");

    vi.stubGlobal("fetch", responder(204, "", "texto"));
    await sair();
    expect(fetch.mock.calls[0][0]).toBe("/api/logout");

    vi.stubGlobal("fetch", responder(401, { erro: "Email ou senha invalidos" }));
    await expect(entrar({ email: "ana@rpm.test", senha: "errada123" })).rejects.toMatchObject({ status: 401 });
  });

  it("não chama a rota de comentário quando não há texto", async () => {
    vi.stubGlobal("fetch", responder(201, {}));
    await enviarAvaliacao({ obra: { tipo: "musica", artistaId: "matue", titulo: "Kenny G" }, nota: 3, comentario: "" });
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch.mock.calls[0][0]).toBe("/api/avaliacoes/musicas");
  });
});
