import { useState } from "react";
import { Link } from "react-router-dom";
import { AbaMusicas } from "../componentes/AbaMusicas";
import { AbaAlbuns } from "../componentes/AbaAlbuns";
import { AbaHistoria } from "../componentes/AbaHistoria";
import { ImagemComFallback } from "../componentes/ImagemComFallback";

// Página de detalhes, músicas, álbuns e história do artista selecionado
export function PaginaArtista({ artista, aoAvaliar }) {
  const [abaAtiva, setAbaAtiva] = useState("musicas");

  if (!artista) {
    return (
      <main className="artist-page">
        <section className="artist-main">
          <Link className="back-button" to="/">
            ← Voltar à busca
          </Link>
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
      <aside className="artist-sidebar relative">
        <ImagemComFallback
          src={artista.foto}
          alt={`Foto de ${artista.nome}`}
          className="w-full h-full object-cover object-top"
          loading="eager"
        />
        <div className="photo-caption">
          <span>{artista.legendaFoto || `${artista.nome} ao vivo`}</span>
          <span>{artista.origem}</span>
        </div>
      </aside>

      <section className="artist-main">
        <Link className="back-button" to="/">
          ← Voltar à busca
        </Link>

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

        <div className="tabs" role="tablist" aria-label="Conteúdo do artista">
          {Object.keys(rotulosAbas).map((chave) => (
            <button
              key={chave}
              type="button"
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
          {abaAtiva === "musicas" && (
            <AbaMusicas
              musicas={artista.musicas}
              artistaId={artista.id}
              aoAvaliar={aoAvaliar}
            />
          )}
          {abaAtiva === "albuns" && (
            <AbaAlbuns
              albuns={artista.albuns}
              nomeArtista={artista.nome}
              artistaId={artista.id}
              aoAvaliar={aoAvaliar}
            />
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
