// Lista com as músicas mais reproduzidas do artista selecionado
export function AbaMusicas({ musicas = [] }) {
  if (!musicas || musicas.length === 0) {
    return <p className="p-4 text-center">Nenhuma faixa encontrada.</p>;
  }

  return (
    <div className="ranking-list">
      <div className="list-header">
        <span># / Música</span>
        <span>Álbum</span>
        <span>Ano</span>
        <span>Reproduções</span>
      </div>
      {musicas.map((musica, indice) => (
        <button className="ranking-row" key={`${musica.titulo}-${indice}`}>
          <span className="rank">{String(indice + 1).padStart(2, "0")}</span>
          <span className="track-title" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {musica.capa && (
              <img
                src={musica.capa}
                alt={musica.titulo}
                style={{ width: "36px", height: "36px", borderRadius: "4px", objectFit: "cover" }}
              />
            )}
            <i aria-hidden="true">▶</i>
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
