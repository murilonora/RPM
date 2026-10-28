// Testes da busca unificada da página inicial (resultados, teclado e navegação)
import { afterEach, describe, expect, it } from "vitest";
import { useState } from "react";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes, useParams } from "react-router-dom";
import { BuscaUnificada } from "./BuscaUnificada";

function PaginaDestino() {
  const { id } = useParams();
  return <p>Página do artista {id}</p>;
}

function BuscaComEstado() {
  const [termo, setTermo] = useState("");
  return <BuscaUnificada termo={termo} aoMudarTermo={setTermo} />;
}

function renderizarBusca() {
  render(
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<BuscaComEstado />} />
        <Route path="/artista/:id" element={<PaginaDestino />} />
        <Route path="/faixa-bonus" element={<p>Faixa bônus</p>} />
      </Routes>
    </MemoryRouter>
  );
  return screen.getByRole("combobox");
}

afterEach(cleanup);

describe("BuscaUnificada", () => {
  it("encontra resultados ignorando acentos e maiúsculas", async () => {
    const campo = renderizarBusca();
    await userEvent.type(campo, "MÁQUINA");
    // "Maquina do Tempo" é música e álbum ao mesmo tempo, então aparece nos dois grupos
    const resultados = screen.getAllByRole("option", { name: /Maquina do Tempo/ });
    expect(resultados.length).toBe(2);
  });

  it("agrupa artistas, músicas e álbuns", async () => {
    const campo = renderizarBusca();
    await userEvent.type(campo, "matue");
    expect(screen.getByRole("group", { name: "Artistas" })).toBeTruthy();
    expect(screen.getByRole("option", { name: /Matue/ })).toBeTruthy();
  });

  it("avisa quando não encontra nada", async () => {
    const campo = renderizarBusca();
    await userEvent.type(campo, "zzzxxq");
    expect(screen.getByText(/Nada encontrado/)).toBeTruthy();
  });

  it("navega com as setas e abre o resultado com Enter", async () => {
    const campo = renderizarBusca();
    await userEvent.type(campo, "matue");
    await userEvent.keyboard("{ArrowDown}");

    const ativo = document.getElementById(campo.getAttribute("aria-activedescendant"));
    expect(ativo.getAttribute("aria-selected")).toBe("true");

    await userEvent.keyboard("{Enter}");
    expect(screen.getByText("Página do artista matue")).toBeTruthy();
  });

  it("fecha a lista com Esc", async () => {
    const campo = renderizarBusca();
    await userEvent.type(campo, "matue");
    await userEvent.keyboard("{Escape}");
    expect(screen.queryByRole("listbox")).toBeNull();
    expect(campo.getAttribute("aria-expanded")).toBe("false");
  });

  it("buscar \"Matheus Rocha\" mostra a faixa bônus e o Enter abre ela", async () => {
    const campo = renderizarBusca();
    await userEvent.type(campo, "Matheus  Rocha");
    expect(screen.getByRole("group", { name: "Faixa bônus" })).toBeTruthy();
    await userEvent.keyboard("{Enter}");
    expect(screen.getByText("Faixa bônus")).toBeTruthy();
  });

  it("só \"matheus\" não revela a faixa bônus", async () => {
    const campo = renderizarBusca();
    await userEvent.type(campo, "matheus");
    expect(screen.queryByRole("group", { name: "Faixa bônus" })).toBeNull();
  });

  it("sem resultado, sugere artistas e abre o escolhido", async () => {
    const campo = renderizarBusca();
    await userEvent.type(campo, "zzzqqq");
    expect(screen.getByText(/Nada encontrado/)).toBeTruthy();
    const sugestoes = screen.getAllByRole("button").filter((b) => b.closest(".busca-sugestoes"));
    expect(sugestoes).toHaveLength(4);
    await userEvent.click(sugestoes[0]);
    expect(screen.getByText(/Página do artista/)).toBeTruthy();
  });
});
