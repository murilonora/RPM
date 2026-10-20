import { useState, useMemo } from "react";
import { listaDeArtistas } from "../dados/dadosMusicais";

function normalizarTexto(texto = "") {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export function PaginaTodosAlbuns({ aoSelecionarArtista, aoAvaliar }) {
  const [termoBusca, setTermoBusca] = useState("");
  const [letraFiltro, setLetraFiltro] = useState("TODOS");

  // Extrair todos os álbuns vinculando a referência do artista
  const todosAlbuns = useMemo(() => {
    const albuns = [];
    listaDeArtistas.forEach((artista) => {
      artista.albuns.forEach((album, idx) => {
        albuns.push({
          ...album,
          indiceOriginal: idx,
          artistaRef: artista,
        });
      });
    });
    return albuns.sort((a, b) => a.titulo.localeCompare(b.titulo));
  }, []);

  // Letras iniciais únicas dos álbuns
  const letrasDisponiveis = useMemo(() => {
    const letras = new Set();
    todosAlbuns.forEach((alb) => {
      const inicial = alb.titulo.charAt(0).toUpperCase();
      if (/[A-Z]/.test(inicial)) {
        letras.add(inicial);
      }
    });
    return Array.from(letras).sort();
  }, [todosAlbuns]);

  // Filtro por texto e letra
  const albunsFiltrados = useMemo(() => {
    const termo = normalizarTexto(termoBusca.trim());
    return todosAlbuns.filter((album) => {
      const bateTexto =
        !termo ||
        normalizarTexto(album.titulo).includes(termo) ||
        normalizarTexto(album.artistaRef.nome).includes(termo) ||
        normalizarTexto(album.artistaRef.categoria).includes(termo) ||
        album.ano.includes(termo);

      const inicial = album.titulo.charAt(0).toUpperCase();
      const bateLetra = letraFiltro === "TODOS" || inicial === letraFiltro;

      return bateTexto && bateLetra;
    });
  }, [todosAlbuns, termoBusca, letraFiltro]);

  return (
    <main className="albuns-catalogo-root">
      {/* 1. BARRA SUPERIOR MECÂNICA & TÉCNICA */}
      <div className="albuns-barra-controle">
        <div className="albuns-busca-box">
          <span className="busca-prefix-mono">// BUSCA_DISCOGRAFIA:</span>
          <input
            type="text"
            className="albuns-busca-input"
            placeholder="DIGITE ÁLBUM, ARTISTA OU ANO..."
            value={termoBusca}
            onChange={(e) => setTermoBusca(e.target.value)}
          />
        </div>

        {/* Filtro por Letras Reto e Geométrico */}
        <div className="albuns-letras-bloco">
          <button
            className={`letra-reta-btn ${letraFiltro === "TODOS" ? "ativo" : ""}`}
            onClick={() => setLetraFiltro("TODOS")}
          >
            TODOS
          </button>
          {letrasDisponiveis.map((letra) => (
            <button
              key={letra}
              className={`letra-reta-btn ${letraFiltro === letra ? "ativo" : ""}`}
              onClick={() => setLetraFiltro(letra)}
            >
              {letra}
            </button>
          ))}
        </div>
      </div>

      {/* 2. HEADER DE STATUS DA DISCOGRAFIA */}
      <div className="albuns-header-indice">
        <div className="indice-tag-wrap">
          <span className="indice-ponto-red" />
          <span className="indice-titulo-mono">
            DISCOGRAFIA OFICIAL // EXIBINDO {albunsFiltrados.length} DE {todosAlbuns.length} ÁLBUNS
          </span>
        </div>
        <span className="indice-rotulo-sub">PASSE O MOUSE SOBRE O DISCO PARA LIBERAR O VINIL</span>
      </div>

      {/* 3. ESTANTE DE VINIS EM FORMATO CRATE DIGGING (GRID DE CAPAS DE VINIL) */}
      <div className="albuns-crate-grid">
        {albunsFiltrados.length === 0 ? (
          <div className="albuns-vazio-box">
            <span className="vazio-mono">// NENHUM ÁLBUM ENCONTRADO NO CATÁLOGO</span>
          </div>
        ) : (
          albunsFiltrados.map((album) => {
            const chaveItem = `album-${album.artistaRef.id}-${album.indiceOriginal}`;

            return (
              <article
                key={chaveItem}
                className="album-crate-card"
                onClick={() => aoSelecionarArtista(album.artistaRef)}
              >
                {/* Cabeçalho da Capa com Carimbo Técnico */}
                <div className="album-crate-header">
                  <span className="album-tipo-etiqueta">LP // 12-INCH</span>
                  <span className="album-ano-etiqueta">{album.ano}</span>
                </div>

                {/* Efeito Físico: Vinil Saindo da Capa no Hover */}
                <div className="album-fisico-container">
                  {/* O Disco de Vinil que desliza para cima/fora e gira */}
                  <div className="album-disco-vinil-fisico" aria-hidden="true">
                    <div className="vinyl-grooves-fisico" />
                    <div className="vinyl-center-red">
                      <div className="vinyl-furo-preto" />
                    </div>
                  </div>

                  {/* A Capa Quadrada do Disco (Jacket) */}
                  <div className="album-capa-quadrada">
                    {album.capa ? (
                      <img
                        src={album.capa}
                        alt={album.titulo}
                        className="album-capa-img"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = "/assets/rpm-mark.svg";
                        }}
                      />
                    ) : (
                      <div className="album-capa-vazia">
                        <span>{album.titulo.slice(0, 2).toUpperCase()}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Dados da Obra */}
                <div className="album-dados-painel">
                  <span className="album-artista-nome">{album.artistaRef.nome}</span>
                  <h2 className="album-titulo-obra">{album.titulo}</h2>
                  <div className="album-meta-tecnica">
                    <span>{album.faixas}</span>
                    <span>{album.reproducoes} STREAMS</span>
                  </div>

                  {/* Botão de Avaliar Direto */}
                  {aoAvaliar && (
                    <button
                      type="button"
                      className="album-btn-avaliar-disco"
                      onClick={(e) => {
                        e.stopPropagation();
                        aoAvaliar({
                          chave: chaveItem,
                          titulo: album.titulo,
                          subtitulo: `Álbum • ${album.artistaRef.nome}`,
                          capa: album.capa,
                        });
                      }}
                      title="Avaliar este disco em vinis"
                    >
                      <span className="disco-ponto-icon" />
                      [ AVALIAR DISCO ]
                    </button>
                  )}
                </div>
              </article>
            );
          })
        )}
      </div>
    </main>
  );
}
