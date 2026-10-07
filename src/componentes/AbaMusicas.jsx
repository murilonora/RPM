import { AvaliacaoVinil } from "./AvaliacaoVinil";

// Lista com as musicas mais reproduzidas do artista selecionado
export function AbaMusicas({ musicas = [], artistaId = "" }) {
  if (!musicas || musicas.length === 0) {
    return <p className="p-4 text-center">Nenhuma faixa encontrada.</p>;
  }

  return (
    <div className="ranking-list">
      <div className="list-header">
        <span># / Musica</span>
        <span>Album</span>
        <span>Ano</span>
        <span>Sua Nota</span>
      </div>
      {musicas.map((musica, indice) => (
        <div className="ranking-row" key={`${musica.titulo}-${indice}`}>
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
            <strong>{musica.titulo}</strong>
          </span>
          <span>{musica.album}</span>
          <span>{musica.ano}</span>
          <span className="avaliacao-celula">
            <AvaliacaoVinil
              chaveItem={`musica-${artistaId}-${indice}`}
              tamanho="pequeno"
            />
          </span>
        </div>
      ))}
    </div>
  );
}
