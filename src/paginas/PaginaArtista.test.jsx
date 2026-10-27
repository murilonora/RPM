import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes, useLocation } from "react-router-dom";
import { ProvedorUsuario } from "../contextos/ContextoUsuario";
import { listaDeArtistas } from "../dados/dadosMusicais";
import { PaginaArtista } from "./PaginaArtista";

afterEach(cleanup);

const emicida = listaDeArtistas.find((a) => a.id === "emicida");

let local;
function Espiao() {
  local = useLocation();
  return null;
}

function renderizar(url) {
  render(
    <ProvedorUsuario>
      <MemoryRouter initialEntries={[url]}>
        <Espiao />
        <Routes>
          <Route path="/artista/:id" element={<PaginaArtista artista={emicida} />} />
        </Routes>
      </MemoryRouter>
    </ProvedorUsuario>
  );
}

const abaAtiva = () => screen.getByRole("tab", { selected: true }).textContent;

describe("PaginaArtista (aba pela URL)", () => {
  it("abre direto na História com ?aba=historia", () => {
    renderizar("/artista/emicida?aba=historia");
    expect(abaAtiva()).toBe("História");
  });

  it("sem parâmetro (ou com um inválido) abre em Mais ouvidas", () => {
    renderizar("/artista/emicida?aba=toString");
    expect(abaAtiva()).toBe("Mais ouvidas");
  });

  it("trocar de aba atualiza a URL", async () => {
    renderizar("/artista/emicida");
    await userEvent.click(screen.getByRole("tab", { name: "Álbuns" }));
    expect(local.search).toBe("?aba=albuns");
    await userEvent.click(screen.getByRole("tab", { name: "Mais ouvidas" }));
    expect(local.search).toBe("");
  });
});
