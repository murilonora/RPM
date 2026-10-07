// Lista com as musicas mais reproduzidas do artista selecionado
export function AbaMusicas({ musicas = [], artistaId = "", aoAvaliar }) {
  if (!musicas || musicas.length === 0) {
    return <p className="p-4 text-center">Nenhuma faixa encontrada.</p>;
  }

  return (
    <div className="ranking-list">
      <div className="list-header">
        <span># / Musica</span>
        <span>Album</span>
        <span>Ano</span>
        <span>Reproducoes</span>
      </div>
      {musicas.map((musica, indice) => (
        <button 
          className="ranking-row" 
          key={`${musica.titulo}-${indice}`}
          onClick={() => aoAvaliar && aoAvaliar({
            chave: `musica-${artistaId}-${indice}`,
            titulo: musica.titulo,
            subtitulo: `Musica - ${musica.album}`,
            capa: musica.capa
          })}
        >
          <span className="rank">{String(indice + 1).padStart(2, "0")}</span>
          <span
            className="track-title"
            style={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            {musica.capa && (
              <img
                src={musica.capa}
                alt={musica.titulo}
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "4px",
                  objectFit: "cover",
                }}
              />
            )}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "20px", height: "20px", borderRadius: "50%", background: "#191525", border: "1px solid #333" }}>
              <div style={{ width: "6px", height: "6px", background: "#f7f4ed", borderRadius: "50%" }} />
            </div>
            <strong>{musica.titulo}</strong>
          </span>
          <span>{musica.album}</span>
          <span>{musica.ano}</span>
          <b>{musica.reproducoes}</b>
        </button>
      ))}
    </div>
  );
}
