import { useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { AbaMusicas } from "../componentes/AbaMusicas";
import { AbaAlbuns } from "../componentes/AbaAlbuns";
import { AbaHistoria } from "../componentes/AbaHistoria";
import { ImagemComFallback } from "../componentes/ImagemComFallback";

const ROTULOS_ABAS = {
  musicas: "Mais ouvidas",
  albuns: "Álbuns",
  historia: "História",
};

// Página de detalhes, músicas, álbuns e história do artista selecionado.
// A aba fica na URL (?aba=historia), assim outras páginas podem abrir direto nela.
export function PaginaArtista({ artista, aoAbrirAlbum, aoAbrirLogin }) {
  const [parametros, setParametros] = useSearchParams();
  const abaDaUrl = parametros.get("aba");
  const abaAtiva = Object.hasOwn(ROTULOS_ABAS, abaDaUrl ?? "") ? abaDaUrl : "musicas";
  const abasRef = useRef(null);

  // Quem chega por um link com ?aba= vai direto para as abas, sem precisar rolar
  useEffect(() => {
    if (abaAtiva === abaDaUrl) {
      abasRef.current?.scrollIntoView?.({ block: "start" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [artista?.id]);

  function setAbaAtiva(aba) {
    setParametros(aba === "musicas" ? {} : { aba }, { replace: true });
  }

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

  return (
    <main className="artist-page">
      <aside className="artist-sidebar relative">
        <ImagemComFallback
          src={artista.foto}
          alt={`Foto de ${artista.nome}`}
          className="w-full h-full object-cover object-top"
          loading="eager"
          tamanho={1000}
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

        <div className="tabs" ref={abasRef} role="tablist" aria-label="Conteúdo do artista">
          {Object.keys(ROTULOS_ABAS).map((chave) => (
            <button
              key={chave}
              type="button"
              className={abaAtiva === chave ? "active" : ""}
              onClick={() => setAbaAtiva(chave)}
              role="tab"
              aria-selected={abaAtiva === chave}
            >
              {ROTULOS_ABAS[chave]}
            </button>
          ))}
        </div>

        <div className="tab-content">
          {abaAtiva === "musicas" && (
            <AbaMusicas musicas={artista.musicas} artistaId={artista.id} aoAbrirLogin={aoAbrirLogin} />
          )}
          {abaAtiva === "albuns" && (
            <AbaAlbuns artista={artista} aoAbrirAlbum={aoAbrirAlbum} aoAbrirLogin={aoAbrirLogin} />
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
