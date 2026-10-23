import { ImagemComFallback } from "./ImagemComFallback";

// Lista com as músicas mais reproduzidas do artista selecionado
export function AbaMusicas({ musicas = [], artistaId = "", aoAvaliar }) {
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
        <button 
          className="ranking-row" 
          key={`${musica.titulo}-${indice}`}
          type="button"
          onClick={() => aoAvaliar && aoAvaliar({
            chave: `musica-${artistaId}-${indice}`,
            titulo: musica.titulo,
            subtitulo: `Música • ${musica.album}`,
            capa: musica.capa
          })}
        >
          <span className="rank">{String(indice + 1).padStart(2, "0")}</span>
          <span className="track-title flex items-center gap-2.5">
            <ImagemComFallback
              src={musica.capa || "/assets/rpm-mark.svg"}
              alt={musica.titulo}
              className="w-9 h-9 shrink-0"
            />
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
