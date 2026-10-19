import { useState, useMemo } from "react";
import { listaDeArtistas } from "../dados/dadosMusicais";

export function PaginaTodosArtistas({ aoSelecionarArtista }) {
  const [termoBusca, setTermoBusca] = useState("");
  const [letraFiltro, setLetraFiltro] = useState("TODOS");

  // Ordena todos os artistas alfabeticamente
  const artistasOrdenados = useMemo(() => {
    return [...listaDeArtistas].sort((a, b) => a.nome.localeCompare(b.nome));
  }, []);

  // Extrai as letras iniciais únicas presentes nos artistas
  const letrasDisponiveis = useMemo(() => {
    const letras = new Set();
    artistasOrdenados.forEach((a) => {
      const inicial = a.nome.charAt(0).toUpperCase();
      if (/[A-Z]/.test(inicial)) {
        letras.add(inicial);
      }
    });
    return Array.from(letras).sort();
  }, [artistasOrdenados]);

  // Filtra por termo de busca e letra selecionada
  const artistasFiltrados = useMemo(() => {
    const termo = termoBusca.trim().toLowerCase();
    return artistasOrdenados.filter((artista) => {
      const bateTexto =
        !termo ||
        artista.nome.toLowerCase().includes(termo) ||
        artista.categoria.toLowerCase().includes(termo) ||
        artista.genero.toLowerCase().includes(termo) ||
        artista.origem.toLowerCase().includes(termo);

      const inicial = artista.nome.charAt(0).toUpperCase();
      const bateLetra = letraFiltro === "TODOS" || inicial === letraFiltro;

      return bateTexto && bateLetra;
    });
  }, [artistasOrdenados, termoBusca, letraFiltro]);

  return (
    <main className="pagina-artistas-editorial">
      {/* Barra superior de controle estilo editorial */}
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
            placeholder="DIGITE NOME / GÊNERO"
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

      {/* Lista Editorial Interativa */}
      <div className="artistas-lista-editorial">
        {artistasFiltrados.length === 0 ? (
          <div className="artistas-vazio">
            <p>Nenhum artista encontrado para o filtro selecionado.</p>
          </div>
        ) : (
          artistasFiltrados.map((artista, index) => {
            const numeroFormatado = String(index + 1).padStart(2, "0");

            return (
              <div
                key={artista.id}
                className="artistas-linha-item"
                onClick={() => aoSelecionarArtista(artista)}
              >
                {/* Índice numérico vermelho */}
                <span className="artistas-item-numero">{numeroFormatado}</span>

                {/* Foto / Miniatura com moldura editorial */}
                <div className="artistas-item-foto-wrap">
                  <img
                    src={artista.foto}
                    alt={artista.nome}
                    className="artistas-item-foto"
                    loading="lazy"
                  />
                </div>

                {/* Nome do Artista em destaque */}
                <h2 className="artistas-item-nome">{artista.nome}</h2>

                {/* Metadados à direita estilo editorial com fonte técnica */}
                <div className="artistas-item-metas">
                  <span className="artistas-meta-genero">
                    {artista.genero.replace(/\s*\/\s*/g, " • ").toUpperCase()}
                  </span>
                  <span className="artistas-meta-origem">
                    {artista.origem.split(",")[0].trim().toUpperCase()}
                  </span>
                  <span className="artistas-meta-status">INDEXADO</span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </main>
  );
}
