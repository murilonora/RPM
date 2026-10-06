import { useState } from "react";
import { AbaMusicas } from "../componentes/AbaMusicas";
import { AbaAlbuns } from "../componentes/AbaAlbuns";
import { AbaHistoria } from "../componentes/AbaHistoria";

// Página de detalhes, músicas, álbuns e história do artista selecionado
export function PaginaArtista({ artista, aoVoltarAoInicio }) {
  const [abaAtiva, setAbaAtiva] = useState("musicas");

  if (!artista) {
    return (
      <main className="artist-page">
        <section className="artist-main">
          <button className="back-button" onClick={aoVoltarAoInicio}>← Voltar à busca</button>
          <h2>Artista não encontrado</h2>
        </section>
      </main>
    );
  }

  const rotulosAbas = {
    musicas: "Mais ouvidas",
    albuns: "Álbuns",
    historia: "História",
  };

  return (
    <main className="artist-page">
      <aside className="artist-sidebar">
        <img
          src={artista.foto}
          alt={`Foto de ${artista.nome}`}
          style={{ width: "100%", height: "900px", objectFit: "cover", objectPosition: "top", borderRadius: "0px" }}
        />
        <div className="photo-caption">
          <span>{artista.legendaFoto || `${artista.nome} ao vivo`}</span>
          <span>{artista.origem}</span>
        </div>
      </aside>

      <section className="artist-main">
        <button className="back-button" onClick={aoVoltarAoInicio}>← Voltar à busca</button>

        <div className="artist-heading">
          <div>
            <p className="eyebrow">{artista.categoria} · {artista.genero}</p>
            <h1>{artista.nome}</h1>
          </div>
          <div className="artist-stat">
            <strong>{artista.ouvintesMensais}</strong>
            <span>ouvintes mensais</span>
          </div>
        </div>

        <div className="artist-summary">
          <p>{artista.resumo}</p>
          <div>
            <span>Origem</span>
            <strong>{artista.origem}</strong>
          </div>
          <div>
            <span>Em atividade</span>
            <strong>{artista.periodoAtivo}</strong>
          </div>
        </div>

        <div className="tabs" role="tablist" aria-label="Conteúdo da artista">
          {Object.keys(rotulosAbas).map((chave) => (
            <button
              key={chave}
              className={abaAtiva === chave ? "active" : ""}
              onClick={() => setAbaAtiva(chave)}
              role="tab"
              aria-selected={abaAtiva === chave}
            >
              {rotulosAbas[chave]}
            </button>
          ))}
        </div>

        <div className="tab-content">
          {abaAtiva === "musicas" && <AbaMusicas musicas={artista.musicas} />}
          {abaAtiva === "albuns" && (
            <AbaAlbuns albuns={artista.albuns} nomeArtista={artista.nome} />
          )}
          {abaAtiva === "historia" && (
            <AbaHistoria
              biografia={artista.biografia}
              citacao={artista.citacao}
              resumo={artista.resumo}
            />
          )}
        </div>
      </section>
    </main>
  );
}
