// Testes do seletor de nota ("Sua nota:"): dar nota, desmarcar e pedir login
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act } from "react";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProvedorUsuario, useUsuario } from "../contextos/ContextoUsuario";
import { SeletorDeNota } from "./SeletorDeNota";

const OBRA = { tipo: "album", artistaId: "matue", titulo: "333" };

let contexto;
function Espiao() {
  contexto = useUsuario();
  return null;
}

function renderizar(aoPedirLogin = () => {}) {
  render(
    <ProvedorUsuario>
      <Espiao />
      <form>
        <SeletorDeNota chaveItem="album-matue-0" obra={OBRA} rotulo="Nota para 333" aoPedirLogin={aoPedirLogin} />
      </form>
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

describe("SeletorDeNota", () => {
  it("dá a nota no clique e desmarca ao clicar na mesma nota", async () => {
    renderizar();
    await act(() => contexto.registrarUsuario("Mell", "mell@rpm.test", "12345678"));

    await userEvent.click(screen.getByRole("button", { name: "3 vinis" }));
    expect(contexto.obterAvaliacao("album-matue-0")).toMatchObject({ nota: 3, obra: OBRA });

    await userEvent.click(screen.getByRole("button", { name: "3 vinis" }));
    expect(contexto.obterAvaliacao("album-matue-0").nota).toBe(0);
  });

  it("sem login, pede para entrar e não salva nada", async () => {
    const aoPedirLogin = vi.fn();
    renderizar(aoPedirLogin);
    await userEvent.click(screen.getByRole("button", { name: "4 vinis" }));
    expect(aoPedirLogin).toHaveBeenCalled();
    expect(contexto.avaliacoes).toEqual({});
  });

  it("os botões são type=button e não enviam o formulário em volta", () => {
    renderizar();
    for (const botao of screen.getAllByRole("button")) expect(botao.getAttribute("type")).toBe("button");
  });
});
