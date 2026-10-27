import { extrairSiglas } from "../utilitarios/texto";
import { ImagemComFallback } from "./ImagemComFallback";
import { SeletorDeNota } from "./SeletorDeNota";

// Grid de exibição dos álbuns lançados pelo artista.
// Clicar no álbum abre a janela de faixas; a nota do álbum fica no próprio cartão.
export function AbaAlbuns({ artista, aoAbrirAlbum, aoAbrirLogin }) {
  const albuns = artista.albuns || [];
  if (albuns.length === 0) {
    return <p className="p-4 text-center">Nenhum álbum encontrado.</p>;
  }

  const siglas = extrairSiglas(artista.nome);

  return (
    <div className="album-grid">
      {albuns.map((album, indice) => (
        <article className="album-card cartao-com-link cursor-pointer relative" key={`${album.titulo}-${indice}`}>
          <div className={`album-art relative overflow-hidden${album.capa ? " tem-capa" : ""}`}>
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

          {/* Nota do álbum direto no cartão, como no layout da Mell */}
          <SeletorDeNota
            chaveItem={`album-${artista.id}-${indice}`}
            obra={{ tipo: "album", artistaId: artista.id, titulo: album.titulo }}
            rotulo={`Nota para ${album.titulo}`}
            aoPedirLogin={aoAbrirLogin}
          />
        </article>
      ))}
    </div>
  );
}
