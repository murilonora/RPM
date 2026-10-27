import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { HistoriasEmDestaque } from "./HistoriasEmDestaque";

afterEach(cleanup);

function renderizar() {
  render(
    <MemoryRouter>
      <HistoriasEmDestaque />
    </MemoryRouter>
  );
}

const manchete = () => screen.getByRole("heading", { level: 2 }).textContent;

describe("HistoriasEmDestaque (carrossel)", () => {
  it("começa pelos Racionais com link para o perfil", () => {
    renderizar();
    expect(manchete()).toMatch(/Sobrevivendo no Inferno/);
    expect(screen.getByRole("link", { name: /Racionais MCs/ }).getAttribute("href")).toBe(
      "/artista/racionais-mcs"
    );
  });

  it("troca pelas setas, pela miniatura e pelo teclado", async () => {
    renderizar();
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
    renderizar();
    // O jsdom não tem AnimationEvent, então o React escuta o nome com prefixo webkit
    const barra = document.querySelector(".historias-progresso");
    fireEvent(barra, new Event("webkitAnimationEnd", { bubbles: true }));
    expect(manchete()).toMatch(/Maestro do Canão/);
  });
});
