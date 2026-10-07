import { listaDeArtistas } from "../dados/dadosMusicais";
import { AvaliacaoVinil } from "../componentes/AvaliacaoVinil";

export function PaginaTodosAlbuns({ aoSelecionarArtista }) {
  // Extrair todos os albuns e vincular ao artista
  const todosAlbuns = [];
  listaDeArtistas.forEach((artista) => {
    artista.albuns.forEach((album) => {
      todosAlbuns.push({ ...album, artistaRef: artista });
    });
  });

  // Ordem alfabetica pelo titulo do album
  todosAlbuns.sort((a, b) => a.titulo.localeCompare(b.titulo));

  return (
    <main className="page-grid">
      <div className="page-header">
        <h2 className="page-title">Todos os Albuns</h2>
        <p className="page-subtitle">{todosAlbuns.length} albuns em ordem alfabetica</p>
      </div>

      <div className="grid-container">
        {todosAlbuns.map((album, indiceAlbum) => (
          <div
            key={`${album.titulo}-${indiceAlbum}`}
            className="grid-card"
            onClick={() => aoSelecionarArtista(album.artistaRef)}
          >
            {album.capa ? (
              <img src={album.capa} alt={album.titulo} className="card-img" />
            ) : (
              <div className="card-img-placeholder">
                {album.titulo.slice(0, 2).toUpperCase()}
              </div>
            )}
            <div className="card-body">
              <h3 className="card-title">{album.titulo}</h3>
              <p className="card-subtitle">{album.artistaRef.nome}</p>
              <div className="card-meta">
                <span>{album.ano}</span>
                <span>{album.reproducoes} streams</span>
              </div>
              <div style={{ marginTop: "12px", paddingTop: "12px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                <AvaliacaoVinil chaveItem={`album-${album.artistaRef.id}-${indiceAlbum}`} tamanho="pequeno" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
