import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useCatalogo } from "../contextos/ContextoCatalogo";
import { normalizarTexto } from "../utilitarios/texto";
import { FiltroAlfabetico } from "../componentes/FiltroAlfabetico";
import { ImagemComFallback } from "../componentes/ImagemComFallback";

// Ordem alfabética, letras do filtro e texto de busca (sem acentos), calculados uma vez por
// catálogo para a busca a cada tecla só comparar textos
function prepararCatalogo(artistas) {
  const ordenados = [...artistas]
    .sort((a, b) => a.nome.localeCompare(b.nome))
    .map((artista) => ({
      artista,
      inicial: artista.nome.charAt(0).toUpperCase(),
      textoBusca: normalizarTexto(`${artista.nome} ${artista.categoria} ${artista.genero} ${artista.origem}`),
    }));
  const letras = [...new Set(ordenados.map((a) => a.inicial))].filter((letra) => /[A-Z]/.test(letra)).sort();
  return { ordenados, letras };
}

// Catálogo de todos os artistas: busca por nome, cidade ou gênero e filtro pela letra inicial
export function PaginaTodosArtistas() {
  const [termoBusca, setTermoBusca] = useState("");
  const [letraFiltro, setLetraFiltro] = useState("TODOS");
  const { artistas } = useCatalogo();
  const { ordenados, letras } = useMemo(() => prepararCatalogo(artistas), [artistas]);

  // Artistas que batem com a busca e com a letra escolhida
  const artistasFiltrados = useMemo(() => {
    const termo = normalizarTexto(termoBusca);
    return ordenados.filter(
      ({ inicial, textoBusca }) =>
        (!termo || textoBusca.includes(termo)) && (letraFiltro === "TODOS" || inicial === letraFiltro)
    ).map(({ artista }) => artista);
  }, [ordenados, termoBusca, letraFiltro]);

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
          letrasDisponiveis={letras}
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
            CATÁLOGO OFICIAL DE ARTISTAS // EXIBINDO {artistasFiltrados.length} DE {ordenados.length} ARTISTAS
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
              <Link key={artista.id} to={`/artista/${artista.id}`} className="artista-quadro-card" viewTransition>
                {/* Imagem do Artista em Moldura Reta com Aspecto Retrato */}
                <div className="artista-moldura-foto">
                  <ImagemComFallback
                    src={artista.foto}
                    alt={artista.nome}
                    className="artista-foto-img w-full h-full"
                    style={{ viewTransitionName: `artista-foto-${artista.id}` }}
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
              </Link>
            );
          })
        )}
      </div>
    </main>
  );
}
