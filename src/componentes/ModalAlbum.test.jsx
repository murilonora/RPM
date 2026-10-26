import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act } from "react";
import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProvedorUsuario, useUsuario } from "../contextos/ContextoUsuario";
import { listaDeArtistas } from "../dados/dadosMusicais";
import { ModalAlbum } from "./ModalAlbum";

const matue = listaDeArtistas.find((a) => a.id === "matue");
const indice333 = matue.albuns.findIndex((a) => a.titulo === "333");

let contexto;
function Espiao() {
  contexto = useUsuario();
  return null;
}

function renderizar(album = matue.albuns[indice333], indice = indice333) {
  const aoEscreverResenha = vi.fn();
  render(
    <ProvedorUsuario>
      <Espiao />
      <ModalAlbum
        dados={{ artista: matue, album, indice }}
        aoFechar={() => {}}
        aoEscreverResenha={aoEscreverResenha}
        aoAbrirLogin={() => {}}
      />
    </ProvedorUsuario>
  );
  return { aoEscreverResenha };
}

beforeEach(() => {
  localStorage.clear();
  vi.stubGlobal("fetch", vi.fn(() => Promise.reject(new TypeError("Failed to fetch"))));
});
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("ModalAlbum (avaliação por faixa)", () => {
  it("lista as faixas reais do álbum", async () => {
    renderizar();
    const lista = await screen.findByRole("list");
    expect(within(lista).getByText("Crack com Mussilon")).toBeTruthy();
    expect(within(lista).getAllByRole("listitem").length).toBeGreaterThan(5);
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

  it("avalia o disco inteiro e abre a resenha com os dados do álbum", async () => {
    const { aoEscreverResenha } = renderizar();
    await act(() => contexto.registrarUsuario("Mell", "mell@rpm.test", "12345678"));

    await userEvent.click(within(screen.getByRole("group", { name: "Sua nota" })).getByRole("button", { name: "5 vinis" }));
    expect(contexto.obterAvaliacao(`album-matue-${indice333}`).nota).toBe(5);

    await userEvent.click(screen.getByRole("button", { name: "Escrever resenha" }));
    expect(aoEscreverResenha).toHaveBeenCalledWith(
      expect.objectContaining({ chave: `album-matue-${indice333}`, obra: { tipo: "album", artistaId: "matue", titulo: "333" } })
    );
  });

  it("avisa quando o álbum não tem faixas catalogadas", async () => {
    renderizar({ titulo: "Disco Inexistente", ano: "2099", faixas: "10 faixas", capa: null }, 99);
    expect(await screen.findByText(/ainda não foi catalogada/)).toBeTruthy();
  });
});
