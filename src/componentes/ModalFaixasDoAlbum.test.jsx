// Testes da janela de faixas do álbum e da nota do álbum no cartão
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act } from "react";
import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProvedorUsuario, useUsuario } from "../contextos/ContextoUsuario";
import { listaDeArtistas } from "../dados/dadosMusicais";
import { ModalFaixasDoAlbum } from "./ModalFaixasDoAlbum";
import { duracaoEmSegundos, formatarTempoTotal } from "../dados/faixasDosAlbuns";
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
  const aoAvaliar = vi.fn();
  render(
    <ProvedorUsuario>
      <Espiao />
      <ModalFaixasDoAlbum
        dados={{ artista: matue, album, indice }}
        aoFechar={() => {}}
        aoAbrirLogin={aoAbrirLogin}
        aoAvaliar={aoAvaliar}
      />
    </ProvedorUsuario>
  );
  return { aoAbrirLogin, aoAvaliar };
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
    // Cada faixa tem o botão "Avaliar" (a nota é dada na janela de avaliação)
    expect(screen.getAllByRole("button", { name: /^Avaliar / }).length).toBeGreaterThan(5);
    expect(screen.queryByRole("group", { name: /^Nota para / })).toBeNull();
  });

  it("pede login ao clicar em Avaliar sem estar logado", async () => {
    const { aoAbrirLogin, aoAvaliar } = renderizar();
    await userEvent.click(await screen.findByRole("button", { name: "Avaliar Crack com Mussilon" }));
    expect(aoAbrirLogin).toHaveBeenCalled();
    expect(aoAvaliar).not.toHaveBeenCalled();
  });

  it("Avaliar abre a janela de nota e resenha com a faixa (chave e título para a Coleção e o backend)", async () => {
    const { aoAvaliar } = renderizar();
    await act(() => contexto.registrarUsuario("Mell", "mell@rpm.test", "12345678"));

    await userEvent.click(await screen.findByRole("button", { name: "Avaliar Crack com Mussilon" }));
    const [item] = aoAvaliar.mock.calls[0];
    expect(item.chave).toBe(`faixa-matue-${indice333}-1`);
    expect(item.obra).toEqual({ tipo: "faixa", artistaId: "matue", titulo: "Crack com Mussilon", album: "333", numero: 1 });
    expect(item.subtitulo).toContain("333");
  });

  it("faixa já avaliada mostra a nota e o botão vira Editar", async () => {
    renderizar();
    await act(() => contexto.registrarUsuario("Mell", "mell@rpm.test", "12345678"));
    act(() =>
      contexto.avaliarItem(`faixa-matue-${indice333}-1`, 4, "Abertura forte", {
        tipo: "faixa",
        artistaId: "matue",
        titulo: "Crack com Mussilon",
        album: "333",
        numero: 1,
      })
    );

    const botao = await screen.findByRole("button", { name: "Editar avaliação de Crack com Mussilon" });
    const cartao = botao.closest(".album-faixas-item");
    expect(within(cartao).getByRole("img", { name: "Nota 4 de 5" })).toBeTruthy();
    expect(within(cartao).getByText("com resenha")).toBeTruthy();
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

  it("mostra a duração de cada faixa e o tempo total do disco", async () => {
    renderizar();
    expect(await screen.findByText("2:34")).toBeTruthy();
    expect(screen.getByText(/12 faixas/)).toBeTruthy();
  });

  it("avisa quando o álbum não tem faixas catalogadas", async () => {
    renderizar({ titulo: "Disco Inexistente", ano: "2099", faixas: "10 faixas", capa: null }, 99);
    expect(await screen.findByText(/ainda não foi catalogada/)).toBeTruthy();
  });
});

describe("duração das faixas", () => {
  it("converte e soma as durações", () => {
    expect(duracaoEmSegundos("2:34")).toBe(154);
    expect(duracaoEmSegundos("x")).toBe(0);
    expect(formatarTempoTotal([{ duracao: "30:00" }, { duracao: "8:10" }])).toBe("38 min");
    expect(formatarTempoTotal([{ duracao: "40:00" }, { duracao: "25:00" }])).toBe("1 h 05 min");
  });
});
