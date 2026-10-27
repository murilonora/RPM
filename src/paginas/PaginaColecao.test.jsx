// Testes da Coleção: excluir a avaliação pelo modal, desfazer e o retrato do crítico
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, useState } from "react";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { ProvedorUsuario, useUsuario } from "../contextos/ContextoUsuario";
import { listaDeArtistas } from "../dados/dadosMusicais";
import { ModalAvaliacao } from "../componentes/ModalAvaliacao";
import { PaginaColecao } from "./PaginaColecao";

const matue = listaDeArtistas.find((a) => a.id === "matue");
const indice333 = matue.albuns.findIndex((a) => a.titulo === "333");
const chave333 = `album-matue-${indice333}`;

let contexto;
function Espiao() {
  contexto = useUsuario();
  return null;
}

// Coleção + modal de avaliação, ligados como no Aplicativo
function ColecaoComModal() {
  const [itemAberto, setItemAberto] = useState(null);
  return (
    <>
      <PaginaColecao aoAvaliar={setItemAberto} aoAbrirLogin={() => {}} />
      <ModalAvaliacao visivel={!!itemAberto} item={itemAberto} aoFechar={() => setItemAberto(null)} />
    </>
  );
}

async function renderizarComAvaliacao() {
  render(
    <ProvedorUsuario>
      <MemoryRouter>
        <Espiao />
        <ColecaoComModal />
      </MemoryRouter>
    </ProvedorUsuario>
  );
  await act(() => contexto.registrarUsuario("Mell", "mell@rpm.test", "12345678"));
  act(() =>
    contexto.avaliarItem(chave333, 4, "Disco forte", { tipo: "album", artistaId: "matue", titulo: "333" })
  );
}

const salvasNoNavegador = () =>
  JSON.parse(localStorage.getItem(`rpm_avaliacoes_${contexto.usuarioLogado.id}`));

beforeEach(() => {
  localStorage.clear();
  vi.stubGlobal("fetch", vi.fn(() => Promise.reject(new TypeError("Failed to fetch"))));
});
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

async function excluirPeloModal() {
  await userEvent.click(screen.getByRole("button", { name: "EDITAR" }));
  await userEvent.click(screen.getByRole("button", { name: "Excluir avaliação" }));
}

describe("PaginaColecao (excluir avaliação)", () => {
  it("o cartão não tem mais botão de excluir; ele fica no modal, ao lado de Salvar", async () => {
    await renderizarComAvaliacao();
    expect(screen.queryByRole("button", { name: /Excluir/ })).toBeNull();
    await userEvent.click(screen.getByRole("button", { name: "EDITAR" }));
    expect(screen.getByRole("button", { name: "Excluir avaliação" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Salvar avaliação" })).toBeTruthy();
  });

  it("exclui a nota e a resenha, inclusive do navegador", async () => {
    await renderizarComAvaliacao();
    await excluirPeloModal();

    expect(contexto.avaliacoes[chave333]).toBeUndefined();
    expect(salvasNoNavegador()[chave333]).toBeUndefined();
    expect(screen.getByRole("status").textContent).toMatch(/333.*excluída/);
    expect(screen.getByText("ESTANTE EM SILÊNCIO")).toBeTruthy();
  });

  it("'Desfazer' devolve a avaliação como estava", async () => {
    await renderizarComAvaliacao();
    await excluirPeloModal();
    await userEvent.click(screen.getByRole("button", { name: "Desfazer" }));

    expect(contexto.obterAvaliacao(chave333)).toMatchObject({ nota: 4, comentario: "Disco forte" });
    expect(salvasNoNavegador()[chave333]).toMatchObject({ nota: 4 });
    expect(screen.queryByRole("button", { name: "Desfazer" })).toBeNull();
  });

  it("o aviso de desfazer some sozinho depois de alguns segundos", async () => {
    await renderizarComAvaliacao();
    vi.useFakeTimers();
    act(() => screen.getByRole("button", { name: "EDITAR" }).click());
    act(() => screen.getByRole("button", { name: "Excluir avaliação" }).click());
    expect(screen.getByRole("button", { name: "Desfazer" })).toBeTruthy();

    act(() => vi.advanceTimersByTime(6000));
    expect(screen.queryByRole("button", { name: "Desfazer" })).toBeNull();
    expect(contexto.avaliacoes[chave333]).toBeUndefined();
  });
});

describe("ModalAvaliacao (botão Excluir)", () => {
  it("não aparece quando a obra ainda não foi avaliada", async () => {
    render(
      <ProvedorUsuario>
        <Espiao />
        <ModalAvaliacao
          visivel
          aoFechar={() => {}}
          item={{ chave: "album-matue-0", titulo: "Novo", subtitulo: "Álbum", obra: { tipo: "album" } }}
        />
      </ProvedorUsuario>
    );
    await act(() => contexto.registrarUsuario("Mell", "mell@rpm.test", "12345678"));
    expect(screen.queryByRole("button", { name: "Excluir avaliação" })).toBeNull();
  });
});

describe("PaginaColecao (retrato do crítico)", () => {
  it("mostra quantas obras têm cada nota, a vertente e o artista mais avaliados", async () => {
    await renderizarComAvaliacao();
    expect(screen.getByRole("img", { name: /1 com nota 4/ })).toBeTruthy();
    expect(screen.getByText("VERTENTE_FAVORITA").nextSibling.textContent).toBe(matue.categoria);
    expect(screen.getByText("ARTISTA_MAIS_AVALIADO").nextSibling.textContent).toBe(matue.nome);
  });
});
