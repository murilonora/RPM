import { listaDeArtistas } from "../../dados/dadosMusicais";

// Busca de artista por id em O(1), em vez de percorrer a lista a cada avaliação
const ARTISTAS_POR_ID = new Map(listaDeArtistas.map((artista) => [artista.id, artista]));

export const ABAS_COLECAO = {
  TODOS: "TODOS",
  ALBUNS: "ALBUNS",
  MUSICAS: "MUSICAS",
  OBRAS_PRIMAS: "OBRAS_PRIMAS",
};

/**
 * Converte as avaliações salvas ({ "album-matue-0": { nota, comentario } })
 * em itens completos com título, capa e artista, do maior para o menor nota.
 * A chave segue o formato "<tipo>-<id do artista>-<índice>" e o id pode ter hífens.
 */
export function montarItensAvaliados(avaliacoes, artistasPorId = ARTISTAS_POR_ID) {
  return Object.entries(avaliacoes)
    .filter(([, avaliacao]) => avaliacao.nota > 0)
    .map(([chave, { nota, comentario }]) => {
      const partes = chave.split("-");
      const tipo = partes[0];
      const indice = parseInt(partes[partes.length - 1], 10);
      const artista = artistasPorId.get(partes.slice(1, -1).join("-"));
      const obra = tipo === "musica" ? artista?.musicas[indice] : artista?.albuns[indice];
      if (!obra) return null;

      return {
        chave,
        tipo,
        titulo: obra.titulo,
        subtitulo: tipo === "musica" ? `Faixa · "${obra.album}"` : "Álbum de estúdio",
        capa: obra.capa || null,
        ano: obra.ano,
        nota,
        comentario,
        artista,
        indice,
      };
    })
    .filter(Boolean)
    .sort((a, b) => b.nota - a.nota);
}

export function filtrarPorAba(itens, aba) {
  if (aba === ABAS_COLECAO.ALBUNS) return itens.filter((i) => i.tipo === "album");
  if (aba === ABAS_COLECAO.MUSICAS) return itens.filter((i) => i.tipo === "musica");
  if (aba === ABAS_COLECAO.OBRAS_PRIMAS) return itens.filter((i) => i.nota === 5);
  return itens;
}

// Favorito escolhido pelo usuário; sem escolha válida, o item de maior nota
export function escolherFavorito(itens, chaveFavoritoManual) {
  if (itens.length === 0) return null;
  return itens.find((i) => i.chave === chaveFavoritoManual) || itens[0];
}

// Dados que o modal de avaliação espera receber para um item da coleção
export function itemParaAvaliar(item) {
  return {
    chave: item.chave,
    titulo: item.titulo,
    subtitulo: `${item.tipo === "album" ? "Álbum" : "Música"} • ${item.artista.nome}`,
    capa: item.capa,
  };
}

export const contarDoisDigitos = (n) => String(n).padStart(2, "0");
