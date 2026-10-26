import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { act, cleanup, renderHook } from "@testing-library/react";
import { ProvedorUsuario, useUsuario } from "./ContextoUsuario";

function renderizarContexto() {
  return renderHook(() => useUsuario(), { wrapper: ProvedorUsuario });
}

beforeEach(() => localStorage.clear());
afterEach(cleanup);

describe("login", () => {
  it("cadastra, sai e entra de novo pelo e-mail", () => {
    const { result } = renderizarContexto();
    expect(result.current.estaLogado).toBe(false);

    act(() => {
      result.current.registrarUsuario("Ana Crítica", "ana@rpm.test");
    });
    expect(result.current.usuarioLogado.nome).toBe("Ana Crítica");

    act(() => result.current.sairDaConta());
    expect(result.current.estaLogado).toBe(false);

    act(() => {
      result.current.entrarComEmail("ana@rpm.test");
    });
    expect(result.current.usuarioLogado.email).toBe("ana@rpm.test");
  });

  it("recusa e-mail que não foi cadastrado", () => {
    const { result } = renderizarContexto();
    let retorno;
    act(() => {
      retorno = result.current.entrarComEmail("ninguem@rpm.test");
    });
    expect(retorno).toBeNull();
    expect(result.current.estaLogado).toBe(false);
  });

  it("mantém a sessão ao recarregar a página", () => {
    const primeiro = renderizarContexto();
    act(() => {
      primeiro.result.current.registrarUsuario("Bia", "bia@rpm.test");
    });
    primeiro.unmount();

    const { result } = renderizarContexto();
    expect(result.current.usuarioLogado?.nome).toBe("Bia");
  });
});

describe("avaliação", () => {
  it("não salva nota sem login", () => {
    const { result } = renderizarContexto();
    act(() => result.current.avaliarItem("album-matue-0", 5));
    expect(result.current.totalAvaliacoes).toBe(0);
  });

  it("guarda notas seguidas sem perder a anterior e calcula a média", () => {
    const { result } = renderizarContexto();
    act(() => {
      result.current.registrarUsuario("Caio", "caio@rpm.test");
    });

    // Duas notas no mesmo ciclo: com atualização funcional nenhuma se perde
    act(() => {
      result.current.avaliarItem("album-matue-0", 5, "Clássico");
      result.current.avaliarItem("musica-matue-0", 2);
    });

    expect(result.current.totalAvaliacoes).toBe(2);
    expect(result.current.mediaAvaliacoes).toBe("3.5");
    expect(result.current.obterAvaliacao("album-matue-0")).toEqual({ nota: 5, comentario: "Clássico" });

    const id = result.current.usuarioLogado.id;
    const salvo = JSON.parse(localStorage.getItem(`rpm_avaliacoes_${id}`));
    expect(Object.keys(salvo)).toHaveLength(2);
  });

  it("devolve nota zero para itens nunca avaliados", () => {
    const { result } = renderizarContexto();
    expect(result.current.obterAvaliacao("album-x-0")).toEqual({ nota: 0, comentario: "" });
  });
});
