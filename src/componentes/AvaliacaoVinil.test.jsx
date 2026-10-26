import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act } from "react";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProvedorUsuario, useUsuario } from "../contextos/ContextoUsuario";
import { AvaliacaoVinil } from "./AvaliacaoVinil";

let contexto;
function Espiao() {
  contexto = useUsuario();
  return null;
}

function renderizar() {
  render(
    <ProvedorUsuario>
      <Espiao />
      <AvaliacaoVinil chaveItem="album-matue-0" />
    </ProvedorUsuario>
  );
}

// Sem backend nos testes: toda chamada falha como "servidor fora do ar"
beforeEach(() => {
  localStorage.clear();
  vi.stubGlobal("fetch", vi.fn(() => Promise.reject(new TypeError("Failed to fetch"))));
});
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("AvaliacaoVinil", () => {
  it("fica desabilitada para quem não está logado", () => {
    renderizar();
    const botoes = screen.getAllByRole("button");
    expect(botoes).toHaveLength(5);
    expect(botoes.every((b) => b.disabled)).toBe(true);
  });

  it("dá a nota no clique e desmarca ao clicar na mesma nota", async () => {
    renderizar();
    await act(() => contexto.registrarUsuario("Duda", "duda@rpm.test", "12345678"));

    await userEvent.click(screen.getByTitle("3 vinis"));
    expect(contexto.obterAvaliacao("album-matue-0").nota).toBe(3);
    expect(screen.getByText("3/5")).toBeTruthy();

    await userEvent.click(screen.getByTitle("3 vinis"));
    expect(contexto.obterAvaliacao("album-matue-0").nota).toBe(0);
  });

  it("não envia o formulário em que está (botões são type=button)", () => {
    renderizar();
    screen.getAllByRole("button").forEach((botao) => expect(botao.type).toBe("button"));
  });
});
