// Testes das funções de texto (busca sem acento e siglas das capas)
import { describe, expect, it } from "vitest";
import { extrairSiglas, normalizarTexto } from "./texto";

describe("normalizarTexto", () => {
  it("remove acentos e deixa tudo minúsculo", () => {
    expect(normalizarTexto("Matuê")).toBe("matue");
    expect(normalizarTexto("  Legião Urbana ")).toBe("legiao urbana");
    expect(normalizarTexto("MÚSICA")).toBe("musica");
  });

  it("aceita valores vazios", () => {
    expect(normalizarTexto()).toBe("");
    expect(normalizarTexto(null)).toBe("");
  });
});

describe("extrairSiglas", () => {
  it("pega as iniciais das primeiras palavras", () => {
    expect(extrairSiglas("Racionais MCs")).toBe("RM");
    expect(extrairSiglas("")).toBe("LP");
  });
});
