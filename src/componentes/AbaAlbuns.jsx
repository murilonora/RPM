import { AvaliacaoVinil } from "./AvaliacaoVinil";

// Grid de exibicao dos albuns lancados pelo artista
export function AbaAlbuns({ albuns = [], nomeArtista = "", artistaId = "" }) {
  if (!albuns || albuns.length === 0) {
    return <p className="p-4 text-center">Nenhum album encontrado.</p>;
  }

  const siglas = nomeArtista
    ? nomeArtista
        .split(" ")
        .slice(0, 2)
        .map((p) => p[0])
        .join("")
        .toUpperCase()
    : "LP";

  return (
    <div className="album-grid">
      {albuns.map((album, indice) => (
        <article className="album-card" key={`${album.titulo}-${indice}`}>
          <div
            className={`album-art album-art-${(indice % 3) + 1}`}
            style={{ overflow: "hidden", position: "relative" }}
          >
            {album.capa ? (
              <img
                src={album.capa}
                alt={album.titulo}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
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
          </div>
          <div className="album-meta">
            <span>{album.ano}</span>
            <span>{album.faixas}</span>
          </div>
          <h3>{album.titulo}</h3>
          <p>{album.reproducoes} reproducoes</p>
          <AvaliacaoVinil
            chaveItem={`album-${artistaId}-${indice}`}
            tamanho="pequeno"
          />
        </article>
      ))}
    </div>
  );
}
