// Testes da janela de faixas do álbum e da nota do álbum no cartão
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act } from "react";
import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProvedorUsuario, useUsuario } from "../contextos/ContextoUsuario";
import { listaDeArtistas } from "../dados/dadosMusicais";
import { ModalFaixasDoAlbum } from "./ModalFaixasDoAlbum";
import { dividirEmLados, duracaoEmSegundos, formatarTempoTotal, somarDuracao } from "../dados/faixasDosAlbuns";
import { AbaAlbuns } from "./AbaAlbuns";

const matue = listaDeArtistas.find((a) => a.id === "matue");
const indice333 = matue.albuns.findIndex((a) => a.titulo === "333");

let contexto;
function Espiao() {
  contexto = useUsuario();
  return null;
}

function renderizar(album = matue.albuns[indice333], indice = indice333) {
  const aoAbrirLogin = vi.fn();
  render(
    <ProvedorUsuario>
      <Espiao />
      <ModalFaixasDoAlbum dados={{ artista: matue, album, indice }} aoFechar={() => {}} aoAbrirLogin={aoAbrirLogin} />
    </ProvedorUsuario>
  );
  return { aoAbrirLogin };
}

beforeEach(() => {
  localStorage.clear();
  vi.stubGlobal("fetch", vi.fn(() => Promise.reject(new TypeError("Failed to fetch"))));
});
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("ModalFaixasDoAlbum (avaliação por faixa)", () => {
  it("lista as faixas reais do álbum em cartões numerados", async () => {
    renderizar();
    expect(await screen.findByText("1. Crack com Mussilon")).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Avaliar Faixas" })).toBeTruthy();
    expect(screen.getAllByRole("group", { name: /^Nota para / }).length).toBeGreaterThan(5);
  });

  it("pede login ao clicar num disco sem estar logado", async () => {
    const { aoAbrirLogin } = renderizar();
    const faixa = await screen.findByRole("group", { name: "Nota para Crack com Mussilon" });
    await userEvent.click(within(faixa).getByRole("button", { name: "3 vinis" }));
    expect(aoAbrirLogin).toHaveBeenCalled();
    expect(Object.keys(contexto.avaliacoes)).toHaveLength(0);
  });

  it("dá nota a uma faixa e guarda o título dela para a Coleção e o backend", async () => {
    renderizar();
    await act(() => contexto.registrarUsuario("Mell", "mell@rpm.test", "12345678"));

    const faixa = await screen.findByRole("group", { name: "Nota para Crack com Mussilon" });
    await userEvent.click(within(faixa).getByRole("button", { name: "4 vinis" }));

    const [chave, avaliacao] = Object.entries(contexto.avaliacoes)[0];
    expect(chave).toMatch(/^faixa-matue-\d+-1$/);
    expect(avaliacao).toMatchObject({
      nota: 4,
      obra: { tipo: "faixa", artistaId: "matue", titulo: "Crack com Mussilon", album: "333" },
    });
  });

  it("o cartão do álbum avalia o disco sem abrir a janela de faixas", async () => {
    const aoAbrirAlbum = vi.fn();
    cleanup();
    render(
      <ProvedorUsuario>
        <Espiao />
        <AbaAlbuns artista={matue} aoAbrirAlbum={aoAbrirAlbum} aoAbrirLogin={() => {}} />
      </ProvedorUsuario>
    );
    await act(() => contexto.registrarUsuario("Mell", "mell@rpm.test", "12345678"));

    const cartao = screen.getByRole("group", { name: "Nota para 333" });
    await userEvent.click(within(cartao).getByRole("button", { name: "5 vinis" }));
    expect(contexto.obterAvaliacao(`album-matue-${indice333}`)).toMatchObject({
      nota: 5,
      obra: { tipo: "album", artistaId: "matue", titulo: "333" },
    });
    expect(aoAbrirAlbum).not.toHaveBeenCalled();

    await userEvent.click(screen.getByRole("button", { name: "333" }));
    expect(aoAbrirAlbum).toHaveBeenCalledWith(expect.objectContaining({ indice: indice333 }));
  });

  it("divide as faixas em Lado A e Lado B, com duração de cada faixa e do disco", async () => {
    renderizar();
    expect(await screen.findByRole("region", { name: "Lado A" })).toBeTruthy();
    expect(screen.getByRole("region", { name: "Lado B" })).toBeTruthy();
    expect(screen.getByText("2:34")).toBeTruthy();
    expect(screen.getByText(/12 faixas/)).toBeTruthy();
  });

  it("avisa quando o álbum não tem faixas catalogadas", async () => {
    renderizar({ titulo: "Disco Inexistente", ano: "2099", faixas: "10 faixas", capa: null }, 99);
    expect(await screen.findByText(/ainda não foi catalogada/)).toBeTruthy();
  });
});

describe("duração e lados do LP", () => {
  it("converte e soma as durações", () => {
    expect(duracaoEmSegundos("2:34")).toBe(154);
    expect(duracaoEmSegundos("x")).toBe(0);
    expect(formatarTempoTotal([{ duracao: "30:00" }, { duracao: "8:10" }])).toBe("38 min");
    expect(formatarTempoTotal([{ duracao: "40:00" }, { duracao: "25:00" }])).toBe("1 h 05 min");
    expect(somarDuracao([{ duracao: "2:34" }, { duracao: "2:35" }])).toBe("5:09");
  });

  it("o Lado A fica com a faixa extra quando o total é ímpar", () => {
    const lados = dividirEmLados([1, 2, 3].map((numero) => ({ numero })));
    expect(lados.map((l) => l.faixas.length)).toEqual([2, 1]);
    expect(dividirEmLados([{ numero: 1 }])).toHaveLength(1);
  });
});
