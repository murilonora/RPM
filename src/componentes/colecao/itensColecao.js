import { listaDeArtistas } from "../../dados/dadosMusicais";

// Busca de artista por id em O(1), em vez de percorrer a lista a cada avaliação.
// É o padrão (dados locais); a Coleção passa o mapa do catálogo atual (que pode vir do backend).
const ARTISTAS_POR_ID = new Map(listaDeArtistas.map((artista) => [artista.id, artista]));

export const ABAS_COLECAO = {
  TODOS: "TODOS",
  ALBUNS: "ALBUNS",
  MUSICAS: "MUSICAS",
  OBRAS_PRIMAS: "OBRAS_PRIMAS",
};

// Faixa avulsa ("musica") ou faixa de dentro de um álbum ("faixa")
export const ehFaixa = (item) => item.tipo === "musica" || item.tipo === "faixa";

/**
 * Converte as avaliações salvas ({ "album-matue-0": { nota, comentario, obra } })
 * em itens completos com título, capa e artista, do maior para o menor nota.
 * Formatos de chave (o id do artista pode ter hífens):
 *   album-<artista>-<índice do álbum>
 *   musica-<artista>-<índice da música>
 *   faixa-<artista>-<índice do álbum>-<número da faixa>
 */
export function montarItensAvaliados(avaliacoes, artistasPorId = ARTISTAS_POR_ID) {
  return Object.entries(avaliacoes)
    .filter(([, avaliacao]) => avaliacao.nota > 0)
    .map(([chave, { nota, comentario, obra: obraSalva }]) => {
      const partes = chave.split("-");
      const tipo = partes[0];

      if (tipo === "faixa") {
        const numero = parseInt(partes[partes.length - 1], 10);
        const indice = parseInt(partes[partes.length - 2], 10);
        const artista = artistasPorId.get(partes.slice(1, -2).join("-"));
        const album = artista?.albuns[indice];
        // O título da faixa vem da própria avaliação (a lista de faixas é carregada sob demanda)
        if (!album || !obraSalva?.titulo) return null;
        return {
          chave,
          tipo,
          titulo: obraSalva.titulo,
          subtitulo: `Faixa ${numero} de "${album.titulo}"`,
          capa: album.capa || null,
          ano: album.ano,
          nota,
          comentario,
          artista,
          indice,
          obra: obraSalva,
        };
      }

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
        obra: { tipo, artistaId: artista.id, titulo: obra.titulo },
      };
    })
    .filter(Boolean)
    .sort((a, b) => b.nota - a.nota);
}

export function filtrarPorAba(itens, aba) {
  if (aba === ABAS_COLECAO.ALBUNS) return itens.filter((i) => i.tipo === "album");
  if (aba === ABAS_COLECAO.MUSICAS) return itens.filter(ehFaixa);
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
    obra: item.obra,
  };
}

export const contarDoisDigitos = (n) => String(n).padStart(2, "0");
