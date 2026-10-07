// Grid de exibicao dos albuns lancados pelo artista
export function AbaAlbuns({ albuns = [], nomeArtista = "", artistaId = "", aoAvaliar }) {
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
        <article 
          className="album-card" 
          key={`${album.titulo}-${indice}`} 
          style={{ cursor: "pointer", position: "relative" }}
          onClick={() => aoAvaliar && aoAvaliar({
            chave: `album-${artistaId}-${indice}`,
            titulo: album.titulo,
            subtitulo: `Album - ${album.ano}`,
            capa: album.capa
          })}
        >
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
            <div style={{ position: "absolute", bottom: "8px", right: "8px", width: "28px", height: "28px", borderRadius: "50%", background: "#191525", border: "2px solid #2a2a2a", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 10px rgba(0,0,0,0.5)" }}>
              <div style={{ width: "8px", height: "8px", background: "#f7f4ed", borderRadius: "50%" }} />
            </div>
          </div>
          <div className="album-meta">
            <span>{album.ano}</span>
            <span>{album.faixas}</span>
          </div>
          <h3>{album.titulo}</h3>
          <p>{album.reproducoes} reproducoes</p>
        </article>
      ))}
    </div>
  );
}
