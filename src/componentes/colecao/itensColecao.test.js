import { describe, expect, it } from "vitest";
import {
  ABAS_COLECAO,
  escolherFavorito,
  filtrarPorAba,
  montarItensAvaliados,
} from "./itensColecao";

// Acervo mínimo; "red-hot" tem hífen no id, como alguns artistas reais
const artistas = new Map([
  ["matue", { id: "matue", nome: "Matuê", musicas: [{ titulo: "Anos Luz", album: "Single", ano: "2017", capa: "c1" }], albuns: [{ titulo: "333", ano: "2024", capa: "c2" }] }],
  ["red-hot", { id: "red-hot", nome: "RHCP", musicas: [], albuns: [{ titulo: "Californication", ano: "1999", capa: "c3" }] }],
]);

describe("montarItensAvaliados", () => {
  const avaliacoes = {
    "musica-matue-0": { nota: 3, comentario: "" },
    "album-matue-0": { nota: 5, comentario: "Obra-prima" },
    "album-red-hot-0": { nota: 4, comentario: "" },
    "album-matue-9": { nota: 4, comentario: "" }, // índice que não existe
    "album-sumiu-0": { nota: 4, comentario: "" }, // artista que não existe
    "musica-matue-1": { nota: 0, comentario: "" }, // nota zerada = sem avaliação
  };

  it("monta os itens com título e artista, da maior para a menor nota", () => {
    const itens = montarItensAvaliados(avaliacoes, artistas);
    expect(itens.map((i) => i.titulo)).toEqual(["333", "Californication", "Anos Luz"]);
    expect(itens[1].artista.nome).toBe("RHCP");
    expect(itens[0].comentario).toBe("Obra-prima");
  });

  it("ignora notas zeradas e chaves que não existem mais no acervo", () => {
    expect(montarItensAvaliados(avaliacoes, artistas)).toHaveLength(3);
  });
});

describe("faixas de álbum (avaliação por faixa)", () => {
  const itens = montarItensAvaliados(
    {
      "faixa-red-hot-0-3": { nota: 5, comentario: "", obra: { tipo: "faixa", artistaId: "red-hot", titulo: "Scar Tissue" } },
      "faixa-matue-0-1": { nota: 4, comentario: "" }, // sem título salvo: não dá para mostrar
    },
    artistas
  );

  it("usa o título salvo e a capa do álbum, mesmo com hífen no id do artista", () => {
    expect(itens).toHaveLength(1);
    expect(itens[0]).toMatchObject({
      tipo: "faixa",
      titulo: "Scar Tissue",
      subtitulo: 'Faixa 3 de "Californication"',
      capa: "c3",
    });
    expect(itens[0].artista.nome).toBe("RHCP");
  });

  it("entra na aba de faixas", () => {
    expect(filtrarPorAba(itens, ABAS_COLECAO.MUSICAS)).toHaveLength(1);
    expect(filtrarPorAba(itens, ABAS_COLECAO.ALBUNS)).toHaveLength(0);
  });
});

describe("filtrarPorAba e escolherFavorito", () => {
  const itens = montarItensAvaliados(
    { "musica-matue-0": { nota: 3 }, "album-matue-0": { nota: 5 }, "album-red-hot-0": { nota: 4 } },
    artistas
  );

  it("filtra por tipo e por obras-primas", () => {
    expect(filtrarPorAba(itens, ABAS_COLECAO.ALBUNS)).toHaveLength(2);
    expect(filtrarPorAba(itens, ABAS_COLECAO.MUSICAS)).toHaveLength(1);
    expect(filtrarPorAba(itens, ABAS_COLECAO.OBRAS_PRIMAS).map((i) => i.titulo)).toEqual(["333"]);
    expect(filtrarPorAba(itens, ABAS_COLECAO.TODOS)).toBe(itens);
  });

  it("usa o favorito escolhido ou, sem escolha válida, a maior nota", () => {
    expect(escolherFavorito(itens, "album-red-hot-0").titulo).toBe("Californication");
    expect(escolherFavorito(itens, "album-que-nao-existe-0").titulo).toBe("333");
    expect(escolherFavorito([], null)).toBeNull();
  });
});
