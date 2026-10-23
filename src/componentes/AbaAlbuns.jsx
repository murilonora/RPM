import { extrairSiglas } from "../utilitarios/comuns";
import { ImagemComFallback } from "./ImagemComFallback";

// Grid de exibição dos álbuns lançados pelo artista
export function AbaAlbuns({ albuns = [], nomeArtista = "", artistaId = "", aoAvaliar }) {
  if (!albuns || albuns.length === 0) {
    return <p className="p-4 text-center">Nenhum álbum encontrado.</p>;
  }

  const siglas = extrairSiglas(nomeArtista);

  return (
    <div className="album-grid">
      {albuns.map((album, indice) => (
        <article 
          className="album-card cursor-pointer relative" 
          key={`${album.titulo}-${indice}`} 
          onClick={() => aoAvaliar && aoAvaliar({
            chave: `album-${artistaId}-${indice}`,
            titulo: album.titulo,
            subtitulo: `Álbum • ${album.ano}`,
            capa: album.capa
          })}
        >
          <div className={`album-art album-art-${(indice % 3) + 1} relative overflow-hidden`}>
            {album.capa ? (
              <ImagemComFallback
                src={album.capa}
                alt={album.titulo}
                className="w-full h-full"
              />
            ) : (
              <>
                <span>
                  {nomeArtista.split(" ").slice(0, 2).join("\n") || "DISCO"}
                </span>
                <small>
                  {siglas} — {String(indice + 1).padStart(2, "0")}
                </small>
              </>
            )}
            <div 
              className="absolute bottom-2 right-2 w-7 h-7 rounded-full bg-[#191525] border-2 border-[#2a2a2a] flex items-center justify-center shadow-lg pointer-events-none"
              aria-hidden="true"
            >
              <div className="w-2 h-2 bg-[#f7f4ed] rounded-full" />
            </div>
          </div>
          <div className="album-meta">
            <span>{album.ano}</span>
            <span>{album.faixas}</span>
          </div>
          <h3>{album.titulo}</h3>
          <p>{album.reproducoes} reproduções</p>
        </article>
      ))}
    </div>
  );
}
