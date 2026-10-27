import { useEffect } from "react";
import { chaveDaFaixa, useFaixasDoAlbum } from "../dados/faixasDosAlbuns";
import { SeletorDeNota } from "./SeletorDeNota";
import { ImagemComFallback } from "./ImagemComFallback";
import { extrairSiglas } from "../utilitarios/texto";

// Janela do álbum com o layout da Mell: capa à esquerda e, à direita,
// "Avaliar Faixas" com um cartão por faixa. dados = { artista, album, indice }
export function ModalFaixasDoAlbum({ dados, aoFechar, aoAbrirLogin }) {
  const { artista, album, indice } = dados;
  const { carregando, faixas } = useFaixasDoAlbum(artista.id, album.titulo);

  // Esc fecha a janela
  useEffect(() => {
    function aoTeclar(evento) {
      if (evento.key === "Escape") aoFechar();
    }
    document.addEventListener("keydown", aoTeclar);
    return () => document.removeEventListener("keydown", aoTeclar);
  }, [aoFechar]);

  return (
    <div className="album-faixas-fundo" onClick={aoFechar}>
      <div
        className="album-faixas-janela"
        role="dialog"
        aria-modal="true"
        aria-labelledby="album-faixas-titulo"
        onClick={(evento) => evento.stopPropagation()}
      >
        <button type="button" className="album-faixas-fechar" onClick={aoFechar} aria-label="Fechar">
          ✕
        </button>

        <div className="album-faixas-disco">
          {album.capa ? (
            <ImagemComFallback src={album.capa} alt={album.titulo} className="album-faixas-capa" />
          ) : (
            <div className="album-faixas-capa album-faixas-capa-vazia">
              <span>{extrairSiglas(artista.nome)}</span>
            </div>
          )}
          <h2 id="album-faixas-titulo" className="album-faixas-titulo">{album.titulo}</h2>
          <p className="album-faixas-ano">{album.ano}</p>
        </div>

        <div className="album-faixas-lista">
          <h3 className="album-faixas-subtitulo">Avaliar Faixas</h3>

          {carregando ? (
            <p className="album-faixas-aviso">Carregando faixas…</p>
          ) : !faixas ? (
            <p className="album-faixas-aviso">
              A lista de faixas deste álbum ainda não foi catalogada.
            </p>
          ) : (
            faixas.map((faixa) => (
              <div key={faixa.numero} className="album-faixas-item">
                <span className="album-faixas-nome">
                  {faixa.numero}. {faixa.titulo}
                </span>
                <SeletorDeNota
                  chaveItem={chaveDaFaixa(artista.id, indice, faixa.numero)}
                  obra={{
                    tipo: "faixa",
                    artistaId: artista.id,
                    titulo: faixa.titulo,
                    album: album.titulo,
                    numero: faixa.numero,
                  }}
                  rotulo={`Nota para ${faixa.titulo}`}
                  aoPedirLogin={aoAbrirLogin}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
