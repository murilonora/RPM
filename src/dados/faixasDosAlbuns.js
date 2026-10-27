// Lista real de faixas dos álbuns, levantada pela Mell na API do Deezer
// (faixasDosAlbuns.json: { "id-do-artista|Título do Álbum": [{ numero, titulo, duracao }] }).
// O arquivo tem ~170 KB, então só é baixado quando alguém abre um álbum.
import { useEffect, useState } from "react";
import { normalizarTexto } from "../utilitarios/texto";

let mapaFaixas = null;

const chaveDoMapa = (artistaId, tituloAlbum) => `${artistaId}|${normalizarTexto(tituloAlbum)}`;

// Baixa o JSON uma única vez e guarda num Map (chave: artista + título normalizado)
async function carregarMapaFaixas() {
  if (!mapaFaixas) {
    const { default: json } = await import("./faixasDosAlbuns.json");
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

// "2:34" -> 154 segundos (duração inválida conta como 0)
export function duracaoEmSegundos(duracao = "") {
  const [minutos, segundos] = String(duracao).split(":").map(Number);
  return Number.isFinite(minutos) && Number.isFinite(segundos) ? minutos * 60 + segundos : 0;
}

// Tempo total do disco: "38 min" ou "1 h 05 min"
export function formatarTempoTotal(faixas = []) {
  const minutos = Math.round(faixas.reduce((soma, f) => soma + duracaoEmSegundos(f.duracao), 0) / 60);
  if (minutos < 60) return `${minutos} min`;
  return `${Math.floor(minutos / 60)} h ${String(minutos % 60).padStart(2, "0")} min`;
}
