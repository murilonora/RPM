// Lista real de faixas dos álbuns, levantada pela Mell na API do Deezer
// (faixasAlbuns.json: { "id-do-artista|Título do Álbum": [{ numero, titulo, duracao }] }).
// O arquivo tem ~170 KB, então só é baixado quando alguém abre um álbum.
import { useEffect, useState } from "react";
import { normalizarTexto } from "../utilitarios/comuns";

let mapaFaixas = null;

const chaveDoMapa = (artistaId, tituloAlbum) => `${artistaId}|${normalizarTexto(tituloAlbum)}`;

export async function carregarMapaFaixas() {
  if (!mapaFaixas) {
    const { default: json } = await import("./faixasAlbuns.json");
    mapaFaixas = new Map(
      Object.entries(json).map(([chave, faixas]) => {
        const [artistaId, titulo] = chave.split("|");
        return [chaveDoMapa(artistaId, titulo), faixas];
      })
    );
  }
  return mapaFaixas;
}

// Chave da avaliação de uma faixa: o número da faixa é estável, ao contrário da posição na lista
export const chaveDaFaixa = (artistaId, indiceAlbum, numero) =>
  `faixa-${artistaId}-${indiceAlbum}-${numero}`;

// Faixas de um álbum; "faixas" fica null quando o álbum não está no levantamento
export function useFaixasDoAlbum(artistaId, tituloAlbum) {
  const [estado, setEstado] = useState({ carregando: true, faixas: null });

  useEffect(() => {
    let ativo = true;
    setEstado({ carregando: true, faixas: null });
    carregarMapaFaixas().then((mapa) => {
      if (ativo) setEstado({ carregando: false, faixas: mapa.get(chaveDoMapa(artistaId, tituloAlbum)) || null });
    });
    return () => {
      ativo = false;
    };
  }, [artistaId, tituloAlbum]);

  return estado;
}
