// Testes da nota em vinis (só leitura) usada nas fichas da Coleção
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { NotaEmVinis } from "./NotaEmVinis";

afterEach(cleanup);

describe("NotaEmVinis", () => {
  it("acende a quantidade de discos da nota e mostra 'x/5'", () => {
    const { container } = render(<NotaEmVinis nota={3} />);
    expect(screen.getByRole("img", { name: "Nota 3 de 5" })).toBeTruthy();
    expect(screen.getByText("3/5")).toBeTruthy();
    const preenchidos = [...container.querySelectorAll("svg circle:first-child")].filter(
      (c) => c.getAttribute("fill") === "#ff0004"
    );
    expect(preenchidos).toHaveLength(3);
  });

  it("não tem botões: é só exibição", () => {
    render(<NotaEmVinis nota={5} />);
    expect(screen.queryAllByRole("button")).toHaveLength(0);
  });

  it("sem nota, não mostra o texto 'x/5'", () => {
    render(<NotaEmVinis />);
    expect(screen.queryByText(/\/5$/)).toBeNull();
  });
});
