import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { listaDeArtistas } from "../dados/dadosMusicais";
import { ACERVO_HISTORIAS } from "../dados/historias";
import { HistoriasEmDestaque } from "./HistoriasEmDestaque";

afterEach(cleanup);

// Ordem fixa para os testes de navegação (na página ela é sorteada)
const FIXAS = ["racionais-mcs", "sabotage", "emicida", "chico-buarque", "legiao-urbana"].map((id) => {
  const historia = ACERVO_HISTORIAS.find((h) => h.artistaId === id);
  const artista = listaDeArtistas.find((a) => a.id === id);
  return { ...historia, artista, capa: artista.foto };
});

function renderizar(props) {
  render(
    <MemoryRouter>
      <HistoriasEmDestaque {...props} />
    </MemoryRouter>
  );
}

const manchete = () => screen.getByRole("heading", { level: 2 }).textContent;

describe("acervo de histórias", () => {
  it("toda história aponta para um artista e um álbum que existem nos dados", () => {
    for (const historia of ACERVO_HISTORIAS) {
      const artista = listaDeArtistas.find((a) => a.id === historia.artistaId);
      expect(artista, historia.artistaId).toBeTruthy();
      expect(artista.albuns.some((a) => a.titulo === historia.album), historia.album).toBe(true);
    }
  });

  it("não repete artista no acervo", () => {
    const ids = ACERVO_HISTORIAS.map((h) => h.artistaId);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe("HistoriasEmDestaque (carrossel)", () => {
  it("sorteia 5 histórias diferentes do acervo", () => {
    renderizar();
    const abas = screen.getAllByRole("tab");
    expect(abas).toHaveLength(5);
    expect(new Set(abas.map((a) => a.textContent)).size).toBe(5);
  });

  it("'Outras histórias' sorteia de novo e volta para a primeira", async () => {
    renderizar({ historiasIniciais: FIXAS });
    await userEvent.click(screen.getByRole("button", { name: "Próxima história" }));
    await userEvent.click(screen.getByRole("button", { name: /Outras histórias/ }));
    expect(screen.getAllByRole("tab")).toHaveLength(5);
    expect(screen.getAllByRole("tab")[0].getAttribute("aria-selected")).toBe("true");
  });

  it("começa pela primeira história com link para a aba História", () => {
    renderizar({ historiasIniciais: FIXAS });
    expect(manchete()).toMatch(/Sobrevivendo no Inferno/);
    expect(screen.getByRole("link", { name: /Racionais MCs/ }).getAttribute("href")).toBe(
      "/artista/racionais-mcs?aba=historia"
    );
  });

  it("troca pelas setas, pela miniatura e pelo teclado", async () => {
    renderizar({ historiasIniciais: FIXAS });
    await userEvent.click(screen.getByRole("button", { name: "Próxima história" }));
    expect(manchete()).toMatch(/Maestro do Canão/);

    await userEvent.click(screen.getByRole("tab", { name: /Legiao Urbana/ }));
    expect(manchete()).toMatch(/^Dois/);

    fireEvent.keyDown(screen.getByRole("region", { name: "Histórias em destaque" }), { key: "ArrowRight" });
    expect(manchete()).toMatch(/Sobrevivendo no Inferno/);

    await userEvent.click(screen.getByRole("button", { name: "História anterior" }));
    expect(screen.getByRole("tab", { selected: true }).textContent).toMatch(/Legiao Urbana/);
  });

  it("avança sozinho quando a barra de progresso termina", () => {
    renderizar({ historiasIniciais: FIXAS });
    // O jsdom não tem AnimationEvent, então o React escuta o nome com prefixo webkit
    const barra = document.querySelector(".historias-progresso");
    fireEvent(barra, new Event("webkitAnimationEnd", { bubbles: true }));
    expect(manchete()).toMatch(/Maestro do Canão/);
  });
});
