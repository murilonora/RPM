import { extrairSiglas } from "../utilitarios/comuns";
import { ImagemComFallback } from "./ImagemComFallback";

// Grid de exibição dos álbuns lançados pelo artista.
// Clicar no álbum abre a ficha com a avaliação do disco e de cada faixa.
export function AbaAlbuns({ artista, aoAbrirAlbum }) {
  const albuns = artista.albuns || [];
  if (albuns.length === 0) {
    return <p className="p-4 text-center">Nenhum álbum encontrado.</p>;
  }

  const siglas = extrairSiglas(artista.nome);

  return (
    <div className="album-grid">
      {albuns.map((album, indice) => (
        <article className="album-card cartao-com-link cursor-pointer relative" key={`${album.titulo}-${indice}`}>
          <div className={`album-art album-art-${(indice % 3) + 1} relative overflow-hidden${album.capa ? " tem-capa" : ""}`}>
            {album.capa ? (
              <ImagemComFallback src={album.capa} alt="" className="w-full h-full" />
            ) : (
              <>
                <span>{artista.nome.split(" ").slice(0, 2).join("\n") || "DISCO"}</span>
                <small>
                  {siglas} — {String(indice + 1).padStart(2, "0")}
                </small>
              </>
            )}
          </div>
          <div className="album-meta">
            <span>{album.ano}</span>
            <span>{album.faixas}</span>
          </div>
          <h3>
            {/* O botão cobre o cartão inteiro (::after) e abre a ficha de faixas */}
            <button
              type="button"
              className="cartao-link"
              onClick={() => aoAbrirAlbum({ artista, album, indice })}
            >
              {album.titulo}
            </button>
          </h3>
          <p>{album.reproducoes} reproduções</p>
        </article>
      ))}
    </div>
  );
}
