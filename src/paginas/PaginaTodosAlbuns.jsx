import { useState, useMemo } from "react";
import { listaDeArtistas } from "../dados/dadosMusicais";

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
    // Ordem alfabética pelo título do álbum
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
    const termo = termoBusca.trim().toLowerCase();
    return todosAlbuns.filter((album) => {
      const bateTexto =
        !termo ||
        album.titulo.toLowerCase().includes(termo) ||
        album.artistaRef.nome.toLowerCase().includes(termo) ||
        album.artistaRef.categoria.toLowerCase().includes(termo) ||
        album.ano.includes(termo);

      const inicial = album.titulo.charAt(0).toUpperCase();
      const bateLetra = letraFiltro === "TODOS" || inicial === letraFiltro;

      return bateTexto && bateLetra;
    });
  }, [todosAlbuns, termoBusca, letraFiltro]);

  return (
    <main className="pagina-artistas-editorial">
      {/* Barra superior de controle editorial */}
      <div className="artistas-topo-editorial">
        <div className="artistas-busca-box">
          <svg
            className="artistas-busca-icone"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            className="artistas-busca-input"
            placeholder="DIGITE ÁLBUM / ARTISTA"
            value={termoBusca}
            onChange={(e) => setTermoBusca(e.target.value)}
          />
        </div>

        {/* Filtro por Letras Alfabéticas / TODOS */}
        <div className="artistas-letras-filtro">
          <button
            className={`artistas-letra-btn pill ${letraFiltro === "TODOS" ? "ativo" : ""}`}
            onClick={() => setLetraFiltro("TODOS")}
          >
            Todos
          </button>
          {letrasDisponiveis.map((letra) => (
            <button
              key={letra}
              className={`artistas-letra-btn circle ${letraFiltro === letra ? "ativo" : ""}`}
              onClick={() => setLetraFiltro(letra)}
            >
              {letra}
            </button>
          ))}
        </div>
      </div>

      {/* Lista Editorial Interativa de Álbuns */}
      <div className="albuns-lista-editorial">
        {albunsFiltrados.length === 0 ? (
          <div className="artistas-vazio">
            <p>Nenhum álbum encontrado para o filtro selecionado.</p>
          </div>
        ) : (
          albunsFiltrados.map((album, index) => {
            const numeroFormatado = String(index + 1).padStart(2, "0");

            return (
              <div
                key={`${album.titulo}-${album.artistaRef.id}-${album.indiceOriginal}`}
                className="album-linha-item"
                onClick={() => aoSelecionarArtista(album.artistaRef)}
              >
                {/* Índice numérico vermelho */}
                <span className="artistas-item-numero">{numeroFormatado}</span>

                {/* Efeito da Capa do Álbum com o Disco de Vinil saindo */}
                <div className="album-sleeve-container">
                  {/* O Disco de Vinil que desliza para fora e gira */}
                  <div className="album-vinyl-disc" aria-hidden="true">
                    <div className="vinyl-grooves" />
                    <div className="vinyl-grooves-inner" />
                    <div className="vinyl-center-label">
                      <div className="vinyl-center-hole" />
                    </div>
                  </div>

                  {/* A Capa do Álbum (Sleeve) na frente */}
                  <div className="album-jacket-cover">
                    {album.capa ? (
                      <img
                        src={album.capa}
                        alt={album.titulo}
                        className="album-jacket-img"
                        loading="lazy"
                      />
                    ) : (
                      <div className="album-jacket-placeholder">
                        {album.titulo.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                  </div>
                </div>

                {/* Título do Álbum e Artista */}
                <div className="album-item-titulos">
                  <h2 className="album-item-nome">{album.titulo}</h2>
                  <span className="album-item-artista">{album.artistaRef.nome}</span>
                </div>

                {/* Metadados e Ação de Avaliar à direita */}
                <div className="album-item-metas">
                  <span className="album-meta-ano">{album.ano}</span>
                  <span className="album-meta-faixas">{album.faixas}</span>
                  <span className="album-meta-reproducoes">{album.reproducoes} STREAMS</span>

                  {/* Botão de Avaliar com Ícone de Vinil */}
                  {aoAvaliar && (
                    <button
                      className="album-btn-avaliar"
                      onClick={(e) => {
                        e.stopPropagation();
                        aoAvaliar({
                          chave: `album-${album.artistaRef.id}-${album.indiceOriginal}`,
                          titulo: album.titulo,
                          subtitulo: `Álbum • ${album.artistaRef.nome}`,
                          capa: album.capa,
                        });
                      }}
                      title="Avaliar este álbum"
                    >
                      <span className="btn-vinil-mini" />
                      Avaliar
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </main>
  );
}
