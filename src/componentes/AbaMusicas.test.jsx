// Testes da aba Mais ouvidas: dar nota na própria linha e pedir login quando não há conta
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act } from "react";
import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProvedorUsuario, useUsuario } from "../contextos/ContextoUsuario";
import { listaDeArtistas } from "../dados/dadosMusicais";
import { AbaMusicas } from "./AbaMusicas";

const matue = listaDeArtistas.find((a) => a.id === "matue");

let contexto;
function Espiao() {
  contexto = useUsuario();
  return null;
}

beforeEach(() => {
  localStorage.clear();
  vi.stubGlobal("fetch", vi.fn(() => Promise.reject(new TypeError("Failed to fetch"))));
});
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("AbaMusicas (coluna Avaliação)", () => {
  it("dá nota na própria linha da música", async () => {
    render(
      <ProvedorUsuario>
        <Espiao />
        <AbaMusicas musicas={matue.musicas} artistaId="matue" aoAbrirLogin={() => {}} />
      </ProvedorUsuario>
    );
    await act(() => contexto.registrarUsuario("Mell", "mell@rpm.test", "12345678"));

    expect(screen.getByText("Avaliação")).toBeTruthy();
    const primeira = matue.musicas[0];
    const linha = screen.getByRole("group", { name: `Nota para ${primeira.titulo}` });
    await userEvent.click(within(linha).getByRole("button", { name: "4 vinis" }));

    expect(contexto.obterAvaliacao("musica-matue-0")).toMatchObject({
      nota: 4,
      obra: { tipo: "musica", artistaId: "matue", titulo: primeira.titulo },
    });
  });

  it("sem login, clicar num disco pede para entrar", async () => {
    const aoAbrirLogin = vi.fn();
    render(
      <ProvedorUsuario>
        <AbaMusicas musicas={matue.musicas} artistaId="matue" aoAbrirLogin={aoAbrirLogin} />
      </ProvedorUsuario>
    );
    const linha = screen.getByRole("group", { name: `Nota para ${matue.musicas[0].titulo}` });
    await userEvent.click(within(linha).getByRole("button", { name: "2 vinis" }));
    expect(aoAbrirLogin).toHaveBeenCalled();
  });
});
