import { listaDeArtistas } from "../dados/dadosMusicais";

export function PaginaTodosArtistas({ aoSelecionarArtista }) {
  const artistas = [...listaDeArtistas].sort((a, b) => a.nome.localeCompare(b.nome));

  return (
    <main className="page-grid">
      <div className="page-header">
        <h2 className="page-title">Todos os Artistas</h2>
        <p className="page-subtitle">{artistas.length} artistas em ordem alfabetica</p>
      </div>

      <div className="grid-container">
        {artistas.map((artista) => (
          <div
            key={artista.id}
            className="grid-card"
            onClick={() => aoSelecionarArtista(artista)}
          >
            <img
              src={artista.foto}
              alt={artista.nome}
              className="card-img"
            />
            <div className="card-body">
              <h3 className="card-title">{artista.nome}</h3>
              <p className="card-subtitle">{artista.categoria}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
