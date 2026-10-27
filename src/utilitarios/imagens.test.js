// Testes do redimensionamento das capas do Deezer e da troca por logo quando a imagem falha
import { describe, expect, it } from "vitest";
import { imagemNoTamanho, tratarErroImagem } from "./imagens";

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

describe("tratarErroImagem", () => {
  it("troca a imagem quebrada pelo logo do RPM", () => {
    const img = document.createElement("img");
    tratarErroImagem({ currentTarget: img });
    expect(img.getAttribute("src")).toBe("/assets/rpm-mark.svg");
    expect(img.onerror).toBeNull();
  });
});
