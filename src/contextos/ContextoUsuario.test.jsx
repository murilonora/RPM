// Testes do contexto do usuário com um backend simulado (cadastro, login, avaliações e reenvio)
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, renderHook, waitFor } from "@testing-library/react";
import { ProvedorUsuario, useUsuario } from "./ContextoUsuario";

// Simula o backend: cada teste diz o que o servidor responde para cada rota
function simularServidor(rotas = {}) {
  const chamadas = [];
  vi.stubGlobal(
    "fetch",
    vi.fn(async (url, opcoes = {}) => {
      const corpo = opcoes.body ? JSON.parse(opcoes.body) : undefined;
      chamadas.push({ url, metodo: opcoes.method || "GET", corpo });
      const resposta = rotas[url] ?? { status: 404, corpo: {} };
      if (resposta === "fora") throw new TypeError("Failed to fetch");
      return new Response(JSON.stringify(resposta.corpo ?? {}), { status: resposta.status ?? 200 });
    })
  );
  return chamadas;
}

const SERVIDOR_OK = {
  "/api/status": { corpo: { status: "ok" } },
  "/api/usuarios": { corpo: {} },
  "/api/avaliacoes/albuns": { status: 201 },
  "/api/avaliacoes/albuns/comentarios": { status: 201 },
  "/api/avaliacoes/musicas": { status: 201 },
};

function renderizarContexto() {
  return renderHook(() => useUsuario(), { wrapper: ProvedorUsuario });
}

beforeEach(() => localStorage.clear());
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("cadastro e login", () => {
  it("cadastra pelo backend, sai e entra de novo com e-mail e senha", async () => {
    const chamadas = simularServidor(SERVIDOR_OK);
    const { result } = renderizarContexto();
    await waitFor(() => expect(result.current.statusServidor).toBe("online"));

    await act(() => result.current.registrarUsuario("Ana Crítica", "ana@rpm.test", "senha-forte"));
    expect(result.current.usuarioLogado.nome).toBe("Ana Crítica");
    expect(chamadas.find((c) => c.url === "/api/usuarios").corpo).toEqual({
      nome: "Ana Crítica",
      email: "ana@rpm.test",
      senha: "senha-forte",
    });

    // A senha nunca fica em texto no navegador
    expect(localStorage.getItem("rpm_usuarios")).not.toContain("senha-forte");

    act(() => result.current.sairDaConta());
    await act(() => result.current.entrarComEmail("ana@rpm.test", "senha-forte"));
    expect(result.current.usuarioLogado.email).toBe("ana@rpm.test");
  });

  it("mostra os erros de validação que o backend devolve", async () => {
    simularServidor({ ...SERVIDOR_OK, "/api/usuarios": { status: 400, corpo: { email: "Email invalido" } } });
    const { result } = renderizarContexto();

    await expect(result.current.registrarUsuario("Bia", "bia", "12345678")).rejects.toMatchObject({
      campos: { email: "Email invalido" },
    });
    expect(result.current.estaLogado).toBe(false);
  });

  it("com o servidor fora, cadastra só no navegador e aplica a regra da senha", async () => {
    simularServidor({ "/api/status": "fora", "/api/usuarios": "fora" });
    const { result } = renderizarContexto();
    await waitFor(() => expect(result.current.statusServidor).toBe("offline"));

    await expect(result.current.registrarUsuario("Caio", "caio@rpm.test", "123")).rejects.toMatchObject({
      campos: { senha: expect.stringContaining("8 caracteres") },
    });

    await act(() => result.current.registrarUsuario("Caio", "caio@rpm.test", "12345678"));
    expect(result.current.usuarioLogado.nome).toBe("Caio");
  });

  it("recusa senha errada e e-mail desconhecido", async () => {
    simularServidor(SERVIDOR_OK);
    const { result } = renderizarContexto();
    await act(() => result.current.registrarUsuario("Duda", "duda@rpm.test", "12345678"));
    act(() => result.current.sairDaConta());

    await expect(result.current.entrarComEmail("duda@rpm.test", "errada123")).rejects.toMatchObject({
      campos: { senha: "Senha incorreta." },
    });
    await expect(result.current.entrarComEmail("ninguem@rpm.test", "12345678")).rejects.toMatchObject({
      campos: { email: expect.stringContaining("não encontrado") },
    });
    expect(result.current.estaLogado).toBe(false);
  });

  it("mantém a sessão ao recarregar a página", async () => {
    simularServidor(SERVIDOR_OK);
    const primeiro = renderizarContexto();
    await act(() => primeiro.result.current.registrarUsuario("Bia", "bia@rpm.test", "12345678"));
    primeiro.unmount();

    const { result } = renderizarContexto();
    expect(result.current.usuarioLogado?.nome).toBe("Bia");
  });
});

describe("avaliação", () => {
  it("não salva nota sem login", () => {
    simularServidor(SERVIDOR_OK);
    const { result } = renderizarContexto();
    act(() => result.current.avaliarItem("album-matue-0", 5));
    expect(result.current.totalAvaliacoes).toBe(0);
  });

  it("guarda notas seguidas, calcula a média e envia ao backend com artista + título", async () => {
    const chamadas = simularServidor(SERVIDOR_OK);
    const { result } = renderizarContexto();
    await act(() => result.current.registrarUsuario("Caio", "caio@rpm.test", "12345678"));

    act(() => {
      result.current.avaliarItem("album-matue-0", 5, "Clássico", { tipo: "album", artistaId: "matue", titulo: "333" });
      result.current.avaliarItem("faixa-matue-0-3", 2, "", { tipo: "faixa", artistaId: "matue", titulo: "Isso é Sério" });
    });

    expect(result.current.totalAvaliacoes).toBe(2);
    expect(result.current.mediaAvaliacoes).toBe("3.5");

    await waitFor(() => expect(result.current.obterAvaliacao("album-matue-0").sincronizado).toBe(true));
    const corpoAlbum = chamadas.find((c) => c.url === "/api/avaliacoes/albuns").corpo;
    expect(corpoAlbum).toMatchObject({ artistaId: "matue", tituloAlbum: "333", nota: 5 });
    expect(chamadas.find((c) => c.url === "/api/avaliacoes/albuns/comentarios").corpo.texto).toBe("Clássico");
    // Faixa de álbum vai pela rota de músicas
    expect(chamadas.find((c) => c.url === "/api/avaliacoes/musicas").corpo).toMatchObject({
      tituloMusica: "Isso é Sério",
      nota: 2,
    });
  });

  it("com o servidor fora, a nota fica salva no navegador como pendente", async () => {
    simularServidor({ "/api/status": "fora", "/api/usuarios": "fora", "/api/avaliacoes/albuns": "fora" });
    const { result } = renderizarContexto();
    await act(() => result.current.registrarUsuario("Eva", "eva@rpm.test", "12345678"));

    act(() => result.current.avaliarItem("album-matue-0", 4, "", { tipo: "album", artistaId: "matue", titulo: "333" }));
    await waitFor(() => expect(result.current.statusServidor).toBe("offline"));
    expect(result.current.obterAvaliacao("album-matue-0")).toMatchObject({ nota: 4, sincronizado: false });
  });

  it("devolve nota zero para itens nunca avaliados", () => {
    simularServidor(SERVIDOR_OK);
    const { result } = renderizarContexto();
    expect(result.current.obterAvaliacao("album-x-0")).toEqual({ nota: 0, comentario: "" });
  });
});
