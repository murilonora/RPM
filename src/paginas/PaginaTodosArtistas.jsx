import { useState, useMemo } from "react";
import { listaDeArtistas } from "../dados/dadosMusicais";
import { normalizarTexto, tratarErroImagem } from "../utilitarios/comuns";
import { FiltroAlfabetico } from "../componentes/FiltroAlfabetico";

export function PaginaTodosArtistas({ aoSelecionarArtista }) {
  const [termoBusca, setTermoBusca] = useState("");
  const [letraFiltro, setLetraFiltro] = useState("TODOS");

  // Ordena todos os artistas alfabeticamente
  const artistasOrdenados = useMemo(() => {
    return [...listaDeArtistas].sort((a, b) => a.nome.localeCompare(b.nome));
  }, []);

  // Letras iniciais únicas presentes no acervo
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
    const termo = normalizarTexto(termoBusca);
    return artistasOrdenados.filter((artista) => {
      const bateTexto =
        !termo ||
        normalizarTexto(artista.nome).includes(termo) ||
        normalizarTexto(artista.categoria).includes(termo) ||
        normalizarTexto(artista.genero).includes(termo) ||
        normalizarTexto(artista.origem).includes(termo);

      const inicial = artista.nome.charAt(0).toUpperCase();
      const bateLetra = letraFiltro === "TODOS" || inicial === letraFiltro;

      return bateTexto && bateLetra;
    });
  }, [artistasOrdenados, termoBusca, letraFiltro]);

  return (
    <main className="artistas-catalogo-root">
      {/* 1. BARRA SUPERIOR MECÂNICA & TÉCNICA */}
      <div className="artistas-barra-controle">
        <div className="artistas-busca-box">
          <span className="busca-prefix-mono">// BUSCA_ARTISTA:</span>
          <input
            type="text"
            className="artistas-busca-input"
            placeholder="DIGITE NOME, CIDADE OU GÊNERO..."
            value={termoBusca}
            onChange={(e) => setTermoBusca(e.target.value)}
          />
        </div>

        {/* Filtro por Letras Unificado */}
        <FiltroAlfabetico
          letrasDisponiveis={letrasDisponiveis}
          letraAtiva={letraFiltro}
          aoSelecionarLetra={setLetraFiltro}
          classeContainer="artistas-letras-bloco"
        />
      </div>

      {/* 2. HEADER DE STATUS DO ACERVO */}
      <div className="artistas-header-indice">
        <div className="indice-tag-wrap">
          <span className="indice-ponto-red" />
          <span className="indice-titulo-mono">
            CATÁLOGO OFICIAL DE ARTISTAS // EXIBINDO {artistasFiltrados.length} DE {artistasOrdenados.length} ARTISTAS
          </span>
        </div>
        <span className="indice-rotulo-sub">ARQUIVO MUSICAL RPM · CLIQUE PARA ACESSAR DISCOGRAFIA</span>
      </div>

      {/* 3. GALERIA DE RETRATOS EDITORIAIS (GRID DE QUADROS RETOS) */}
      <div className="artistas-galeria-grid">
        {artistasFiltrados.length === 0 ? (
          <div className="artistas-vazio-box">
            <span className="vazio-mono">// NENHUM ARTISTA CORRESPONDE AO FILTRO PESQUISADO</span>
          </div>
        ) : (
          artistasFiltrados.map((artista) => {
            const totalAlbuns = artista.albuns ? artista.albuns.length : 0;
            const totalFaixas = artista.musicas ? artista.musicas.length : 0;

            return (
              <article
                key={artista.id}
                className="artista-quadro-card"
                onClick={() => aoSelecionarArtista(artista)}
              >
                {/* Imagem do Artista em Moldura Reta com Aspecto Retrato */}
                <div className="artista-moldura-foto">
                  <img
                    src={artista.foto}
                    alt={artista.nome}
                    className="artista-foto-img"
                    loading="lazy"
                    onError={tratarErroImagem}
                  />
                  <div className="artista-foto-filtro-sombra" />
                  <span className="artista-etiqueta-categoria">{artista.categoria}</span>
                </div>

                {/* Bloco de Informações Tipográficas */}
                <div className="artista-dados-bloco">
                  <div className="artista-head-meta">
                    <span className="artista-cidade-mono">{artista.origem.split(",")[0].toUpperCase()}</span>
                    <span className="artista-ouvintes-tag">{artista.ouvintesMensais} OUVINTES</span>
                  </div>

                  <h2 className="artista-nome-editorial">{artista.nome}</h2>
                  <p className="artista-genero-desc">{artista.genero}</p>

                  <div className="artista-card-footer">
                    <span className="artista-contagem-albuns">
                      {totalAlbuns} {totalAlbuns === 1 ? "ÁLBUM" : "ÁLBUNS"} · {totalFaixas} FAIXAS
                    </span>
                    <span className="artista-btn-ver">EXPLORAR →</span>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </div>
    </main>
  );
}
