import { useState, useEffect } from "react";
import { listaDeArtistas, categoriasMusicais } from "../dados/dadosMusicais";
import { FundoMosaicoHero } from "../componentes/FundoMosaicoHero";

// Função para normalizar texto removendo acentos e convertendo para minúsculas
function normalizarTexto(texto = "") {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

// Estilos reutilizáveis para o dropdown de busca
const estiloDropdown = {
  position: "absolute",
  top: "100%",
  left: 0,
  right: 0,
  background: "#ffffff",
  borderRadius: "0px",
  border: "1px solid #191525",
  boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
  marginTop: "8px",
  maxHeight: "400px",
  overflowY: "auto",
  zIndex: 50,
  padding: "8px",
};

const estiloItemBusca = {
  width: "100%",
  display: "flex",
  alignItems: "center",
  textAlign: "left",
  padding: "8px 12px",
  marginBottom: "4px",
  borderRadius: "0px",
  border: "none",
  cursor: "pointer",
  background: "transparent",
};

const estiloFoto = {
  width: "48px",
  height: "48px",
  borderRadius: "0px",
  objectFit: "cover",
  marginRight: "12px",
  flexShrink: 0,
};

const estiloBadge = (cor) => ({
  display: "inline-block",
  fontSize: "0.65rem",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  padding: "2px 8px",
  borderRadius: "0px",
  marginBottom: "3px",
  background: cor,
  color: "#ffffff",
});

const CORES_TIPO = {
  artista: "#191525",
  musica: "#d94e28",
  album: "#2563eb",
};

// Página inicial com barra de busca unificada (artistas, músicas e álbuns)
export function PaginaInicial({ aoSelecionarArtista }) {
  const [termoBusca, setTermoBusca] = useState("");
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todos");
  const [artistasExplorar, setArtistasExplorar] = useState([]);

  // Função para sortear 5 artistas aleatórios da base de dados
  function sortearArtistasExplorar() {
    const embaralhada = [...listaDeArtistas].sort(() => 0.5 - Math.random());
    setArtistasExplorar(embaralhada.slice(0, 5));
  }

  // Sorteia inicialmente e atualiza periodicamente a cada 7 segundos
  useEffect(() => {
    sortearArtistasExplorar();
    const intervalo = setInterval(() => {
      sortearArtistasExplorar();
    }, 7000);
    return () => clearInterval(intervalo);
  }, []);

  const artistaEmDestaque =
    listaDeArtistas.find((a) => a.id === "racionais-mcs") || listaDeArtistas[0];

  const termo = normalizarTexto(termoBusca.trim());

  // -----------------------------------------------------------
  // BUSCA UNIFICADA: gera uma lista de resultados com 3 tipos
  // tipo: "artista" | "musica" | "album"
  // -----------------------------------------------------------
  const resultadosBusca = (() => {
    if (!termo) return [];

    const resultados = [];

    listaDeArtistas.forEach((artista) => {
      // 1. Verifica se o artista bate com o termo
      if (
        normalizarTexto(artista.nome).includes(termo) ||
        normalizarTexto(artista.genero).includes(termo) ||
        normalizarTexto(artista.categoria).includes(termo)
      ) {
        resultados.push({
          tipo: "artista",
          chave: `artista-${artista.id}`,
          foto: artista.foto,
          titulo: artista.nome,
          subtitulo: `${artista.categoria} · ${artista.origem}`,
          artista: artista,
          acaoAoClicar: () => aoSelecionarArtista(artista),
        });
      }

      // 2. Verifica músicas do artista
      artista.musicas.forEach((musica, idx) => {
        if (normalizarTexto(musica.titulo).includes(termo)) {
          resultados.push({
            tipo: "musica",
            chave: `musica-${artista.id}-${idx}`,
            foto: artista.foto,
            titulo: musica.titulo,
            subtitulo: `Música · ${musica.album} · ${artista.nome}`,
            artista: artista,
            acaoAoClicar: () => aoSelecionarArtista(artista),
          });
        }
      });

      // 3. Verifica álbuns do artista
      artista.albuns.forEach((album, idx) => {
        if (normalizarTexto(album.titulo).includes(termo)) {
          resultados.push({
            tipo: "album",
            chave: `album-${artista.id}-${idx}`,
            foto: artista.foto,
            titulo: album.titulo,
            subtitulo: `Álbum · ${album.ano} · ${album.faixas} · ${artista.nome}`,
            artista: artista,
            acaoAoClicar: () => aoSelecionarArtista(artista),
          });
        }
      });
    });

    return resultados;
  })();

  // Filtro da grade de cards (por categoria + busca)
  const artistasFiltradosCatalogo = listaDeArtistas.filter((artista) => {
    const correspondeBusca =
      !termo ||
      normalizarTexto(artista.nome).includes(termo) ||
      normalizarTexto(artista.categoria).includes(termo) ||
      normalizarTexto(artista.genero).includes(termo) ||
      artista.musicas.some((m) => normalizarTexto(m.titulo).includes(termo)) ||
      artista.albuns.some((a) => normalizarTexto(a.titulo).includes(termo));

    const correspondeCategoria =
      categoriaAtiva === "Todos" || artista.categoria === categoriaAtiva;

    return correspondeBusca && correspondeCategoria;
  });

  function lidarComEnvio(evento) {
    evento.preventDefault();
    if (resultadosBusca.length > 0) {
      resultadosBusca[0].acaoAoClicar();
    }
  }

  return (
    <main>
      <section className="home-hero">
        <FundoMosaicoHero />
        <div className="hero-content">
          <h1>
            Toda música tem uma história.
          </h1>
          <p className="hero-copy">
            Arquivo definitivo da música. Explore discografias essenciais, descubra trajetórias históricas e monte sua coleção de críticas em vinil.
          </p>

          <form className="search-box" onSubmit={lidarComEnvio}>
            <span className="search-symbol" aria-hidden="true" />
            <input
              value={termoBusca}
              onChange={(e) => setTermoBusca(e.target.value)}
              placeholder="Pesquise artista, música ou álbum..."
              aria-label="Pesquisar artista, música ou álbum"
              autoComplete="off"
            />
            <button type="submit" aria-label="Buscar">→</button>

            {/* DROPDOWN DE RESULTADOS UNIFICADOS */}
            {termo.length > 0 && (
              <div style={estiloDropdown}>
                {resultadosBusca.length === 0 ? (
                  <p style={{ padding: "12px", margin: 0, color: "#666" }}>
                    Nenhum resultado para "{termoBusca}".
                  </p>
                ) : (
                  <>
                    {/* Agrupa resultados por tipo para exibir com cabeçalhos */}
                    {["artista", "musica", "album"].map((tipo) => {
                      const itensDeTipo = resultadosBusca.filter((r) => r.tipo === tipo);
                      if (itensDeTipo.length === 0) return null;

                      const labelGrupo =
                        tipo === "artista"
                          ? " Artistas"
                          : tipo === "musica"
                          ? " Músicas"
                          : " Álbuns";

                      return (
                        <div key={tipo}>
                          {/* Cabeçalho do grupo */}
                          <p
                            style={{
                              margin: "8px 12px 4px",
                              fontSize: "0.7rem",
                              fontWeight: 700,
                              textTransform: "uppercase",
                              letterSpacing: "0.08em",
                              color: "#999",
                            }}
                          >
                            {labelGrupo}
                          </p>

                          {itensDeTipo.map((resultado) => (
                            <button
                              key={resultado.chave}
                              type="button"
                              style={estiloItemBusca}
                              onClick={resultado.acaoAoClicar}
                              onMouseEnter={(e) =>
                                (e.currentTarget.style.background = "#f7f4ed")
                              }
                              onMouseLeave={(e) =>
                                (e.currentTarget.style.background = "transparent")
                              }
                            >
                              <img
                                src={resultado.foto}
                                alt={resultado.titulo}
                                style={estiloFoto}
                              />
                              <span style={{ flex: 1, minWidth: 0 }}>
                                {/* Badge colorido indicando o tipo */}
                                <span style={estiloBadge(CORES_TIPO[resultado.tipo])}>
                                  {resultado.tipo === "artista"
                                    ? "Artista"
                                    : resultado.tipo === "musica"
                                    ? "Música"
                                    : "Álbum"}
                                </span>
                                <strong
                                  style={{
                                    display: "block",
                                    fontSize: "0.95rem",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                  }}
                                >
                                  {resultado.titulo}
                                </strong>
                                <small style={{ color: "#777", fontSize: "0.78rem" }}>
                                  {resultado.subtitulo}
                                </small>
                              </span>
                              <span
                                style={{
                                  color: "#d94e28",
                                  fontSize: "0.8rem",
                                  fontWeight: 600,
                                  marginLeft: "8px",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                Ver perfil →
                              </span>
                            </button>
                          ))}
                        </div>
                      );
                    })}
                  </>
                )}
              </div>
            )}
          </form>

          <div className="quick-search">
            <span
              onClick={sortearArtistasExplorar}
              title="Clique para sortear outros artistas"
              style={{ cursor: "pointer" }}
            >
              Explorar ⟳:
            </span>
            {artistasExplorar.map((artista) => (
              <button
                key={artista.id}
                type="button"
                className="btn-explorar-item"
                onClick={() => aoSelecionarArtista(artista)}
                title={`Ver página de ${artista.nome}`}
              >
                {artista.nome}
              </button>
            ))}
          </div>
        </div>
        <span className="hero-index">RPM — ROTAÇÃO POR MINUTO</span>
      </section>

      {/* Filtros de categorias e grade de cards */}
      <section className="intro-section" style={{ paddingTop: "40px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div>
            <p className="eyebrow">Catálogo Completo</p>
            <h2 style={{ margin: "4px 0" }}>Selecione por vertente ou movimento</h2>
          </div>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {categoriasMusicais.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoriaAtiva(cat)}
                style={{
                  padding: "8px 16px",
                  borderRadius: "0px",
                  border:
                    categoriaAtiva === cat
                      ? "2px solid #191525"
                      : "1px solid #d4cfc4",
                  background: categoriaAtiva === cat ? "#191525" : "#f7f4ed",
                  color: categoriaAtiva === cat ? "#ffffff" : "#191525",
                  fontWeight: categoriaAtiva === cat ? "bold" : "normal",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grade de cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: "20px",
            marginTop: "24px",
          }}
        >
          {artistasFiltradosCatalogo.map((artista) => (
            <div
              key={artista.id}
              onClick={() => aoSelecionarArtista(artista)}
              style={{
                background: "#ffffff",
                borderRadius: "0px",
                overflow: "hidden",
                border: "1px solid #191525",
                cursor: "pointer",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <img
                src={artista.foto}
                alt={artista.nome}
                style={{ width: "100%", height: "180px", objectFit: "cover" }}
              />
              <div style={{ padding: "16px" }}>
                <span
                  style={{
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                    fontWeight: 700,
                    letterSpacing: "0.05em",
                    color: "#7e786b",
                    display: "block",
                    marginBottom: "4px",
                  }}
                >
                  {artista.categoria}
                </span>
                <h3 style={{ margin: "0 0 6px 0", fontSize: "1.2rem" }}>
                  {artista.nome}
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontSize: "0.85rem",
                    color: "#555",
                    lineHeight: "1.4",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {artista.resumo}
                </p>
                <div
                  style={{
                    marginTop: "12px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                  }}
                >
                  <span>{artista.ouvintesMensais} ouvintes</span>
                  <span style={{ color: "#d94e28" }}>Ver perfil →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Matéria editorial em destaque */}
      <section className="intro-section" style={{ marginTop: "40px" }}>
        <div>
          <p className="eyebrow">Histórias em destaque</p>
          <span className="edition">Edição Especial — Movimento Hip Hop</span>
        </div>
        <h2>
          Sobrevivendo no Inferno: A bíblia do <em>rap brasileiro.</em>
        </h2>
        <button
          className="featured-artist"
          onClick={() => aoSelecionarArtista(artistaEmDestaque)}
        >
          <span className="feature-number">01</span>
          <div className="feature-image">
            <img
              src={artistaEmDestaque.foto}
              alt="Foto do artista em destaque"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="feature-copy">
            <span>Especial de Leitura · 10 min</span>
            <h3>Como Racionais MC's transformaram a história da cultura nacional</h3>
            <p>
              Da periferia de São Paulo para a literatura clássica: entenda a
              trajetória, as composições e o impacto revolucionário do grupo.
            </p>
            <b>Ler história completa e discografia →</b>
          </div>
        </button>
      </section>
    </main>
  );
}
