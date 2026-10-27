import { ImagemComFallback } from "./ImagemComFallback";
import { SeletorDeNota } from "./SeletorDeNota";

// Lista com as músicas mais reproduzidas do artista selecionado.
// Como no layout da Mell, a nota é dada direto na linha, na coluna "Avaliação".
export function AbaMusicas({ musicas = [], artistaId = "", aoAbrirLogin }) {
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
        <span>Avaliação</span>
      </div>
      {musicas.map((musica, indice) => (
        <div className="ranking-row" key={`${musica.titulo}-${indice}`}>
          <span className="rank">{String(indice + 1).padStart(2, "0")}</span>
          <span className="track-title">
            <ImagemComFallback
              src={musica.capa || "/assets/rpm-mark.svg"}
              alt=""
              className="track-capa"
              tamanho={250}
            />
            <strong>{musica.titulo}</strong>
          </span>
          <span>{musica.album}</span>
          <span>{musica.ano}</span>
          <b>{musica.reproducoes}</b>
          <SeletorDeNota
            chaveItem={`musica-${artistaId}-${indice}`}
            obra={{ tipo: "musica", artistaId, titulo: musica.titulo }}
            rotulo={`Nota para ${musica.titulo}`}
            aoPedirLogin={aoAbrirLogin}
          />
        </div>
      ))}
    </div>
  );
}
