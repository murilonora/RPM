import { useEffect } from "react";
import { useUsuario } from "../contextos/ContextoUsuario";
import { chaveDaFaixa, useFaixasDoAlbum } from "../dados/faixas";
import { AvaliacaoVinil } from "./AvaliacaoVinil";
import { ImagemComFallback } from "./ImagemComFallback";

// Ficha do álbum com a avaliação do disco e de cada faixa (sistema de avaliação da Mell,
// integrado ao login e à Coleção). dados = { artista, album, indice }
export function ModalAlbum({ dados, aoFechar, aoEscreverResenha, aoAbrirLogin }) {
  const { estaLogado, obterAvaliacao } = useUsuario();
  const { artista, album, indice } = dados;
  const { carregando, faixas } = useFaixasDoAlbum(artista.id, album.titulo);

  const chaveAlbum = `album-${artista.id}-${indice}`;
  const obraAlbum = { tipo: "album", artistaId: artista.id, titulo: album.titulo };
  const resenha = obterAvaliacao(chaveAlbum).comentario;

  // Esc fecha a ficha
  useEffect(() => {
    function aoTeclar(evento) {
      if (evento.key === "Escape") aoFechar();
    }
    document.addEventListener("keydown", aoTeclar);
    return () => document.removeEventListener("keydown", aoTeclar);
  }, [aoFechar]);

  return (
    <div className="modal-overlay" onClick={aoFechar}>
      <div
        className="modal-conteudo modal-album"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-album-titulo"
        onClick={(evento) => evento.stopPropagation()}
      >
        <button type="button" className="modal-fechar" onClick={aoFechar} aria-label="Fechar">
          ✕
        </button>

        <section className="modal-album-disco">
          <ImagemComFallback src={album.capa} alt="" className="modal-album-capa" />
          <p className="modal-album-artista">{artista.nome}</p>
          <h2 id="modal-album-titulo" className="modal-album-titulo">{album.titulo}</h2>
          <p className="modal-album-meta">
            {album.ano} · {faixas ? `${faixas.length} faixas` : album.faixas}
          </p>

          <div className="modal-album-nota">
            <span>Nota do disco</span>
            <AvaliacaoVinil chaveItem={chaveAlbum} obra={obraAlbum} tamanho="grande" />
          </div>

          {estaLogado ? (
            <button
              type="button"
              className="modal-album-resenha"
              onClick={() =>
                aoEscreverResenha({
                  chave: chaveAlbum,
                  titulo: album.titulo,
                  subtitulo: `Álbum • ${artista.nome}`,
                  capa: album.capa,
                  obra: obraAlbum,
                })
              }
            >
              {resenha ? "Editar resenha" : "Escrever resenha"}
            </button>
          ) : (
            <button type="button" className="modal-album-resenha" onClick={aoAbrirLogin}>
              Entre para avaliar
            </button>
          )}
        </section>

        <section className="modal-album-faixas" aria-label="Faixas do álbum">
          {carregando ? (
            <p className="modal-album-aviso">Carregando faixas…</p>
          ) : !faixas ? (
            <p className="modal-album-aviso">
              A lista de faixas deste álbum ainda não foi catalogada. Você pode avaliar o disco inteiro ao lado.
            </p>
          ) : (
            <ol className="lista-faixas">
              {faixas.map((faixa) => (
                <li key={faixa.numero} className="lista-faixas-item">
                  <span className="lista-faixas-numero">{String(faixa.numero).padStart(2, "0")}</span>
                  <span className="lista-faixas-titulo">{faixa.titulo}</span>
                  <span className="lista-faixas-duracao">{faixa.duracao}</span>
                  <AvaliacaoVinil
                    chaveItem={chaveDaFaixa(artista.id, indice, faixa.numero)}
                    obra={{ tipo: "faixa", artistaId: artista.id, titulo: faixa.titulo, album: album.titulo, numero: faixa.numero }}
                    tamanho="pequeno"
                    rotulo={`Nota para ${faixa.titulo}`}
                  />
                </li>
              ))}
            </ol>
          )}
        </section>
      </div>
    </div>
  );
}
