import { describe, expect, it } from "vitest";
import { extrairSiglas, imagemNoTamanho, normalizarTexto } from "./comuns";

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

describe("imagemNoTamanho", () => {
  const capa = "https://cdn-images.dzcdn.net/images/cover/abc/1000x1000-000000-80-0-0.jpg";

  it("troca o tamanho de imagens do Deezer", () => {
    expect(imagemNoTamanho(capa, 250)).toBe(
      "https://cdn-images.dzcdn.net/images/cover/abc/250x250-000000-80-0-0.jpg"
    );
    expect(imagemNoTamanho(capa)).toContain("/500x500-");
  });

  it("não mexe em imagens de outros servidores nem em valores vazios", () => {
    const wiki = "https://upload.wikimedia.org/foto/1280px-banda.jpg";
    expect(imagemNoTamanho(wiki, 250)).toBe(wiki);
    expect(imagemNoTamanho(null)).toBe(null);
  });
});

describe("extrairSiglas", () => {
  it("pega as iniciais das primeiras palavras", () => {
    expect(extrairSiglas("Racionais MCs")).toBe("RM");
    expect(extrairSiglas("")).toBe("LP");
  });
});
