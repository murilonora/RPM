import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { listaDeArtistas } from "../dados/dadosMusicais";
import { imagemNoTamanho, tratarErroImagem } from "../utilitarios/imagens";
import { normalizarTexto } from "../utilitarios/texto";
import { FiltroAlfabetico } from "../componentes/FiltroAlfabetico";
import { ImagemComFallback } from "../componentes/ImagemComFallback";
import { SeletorDeNota } from "../componentes/SeletorDeNota";

// Todos os álbuns do acervo, com a referência do artista e o índice original
// (o índice compõe a chave da avaliação). Calculado uma vez, quando o arquivo carrega.
const ALBUNS_ORDENADOS = listaDeArtistas
  .flatMap((artista) =>
    artista.albuns.map((album, idx) => ({
      ...album,
      indiceOriginal: idx,
      artistaRef: artista,
      inicial: album.titulo.charAt(0).toUpperCase(),
      textoBusca: normalizarTexto(`${album.titulo} ${artista.nome} ${artista.categoria} ${album.ano}`),
    }))
  )
  .sort((a, b) => a.titulo.localeCompare(b.titulo));

const LETRAS_DISPONIVEIS = [...new Set(ALBUNS_ORDENADOS.map((a) => a.inicial))]
  .filter((letra) => /[A-Z]/.test(letra))
  .sort();

// Vitrine de todos os álbuns: busca, filtro por letra, nota direto no cartão
// e botão para avaliar as faixas
export function PaginaTodosAlbuns({ aoAbrirAlbum, aoAbrirLogin }) {
  const [termoBusca, setTermoBusca] = useState("");
  const [letraFiltro, setLetraFiltro] = useState("TODOS");

  // Álbuns que batem com a busca e com a letra escolhida
  const albunsFiltrados = useMemo(() => {
    const termo = normalizarTexto(termoBusca);
    return ALBUNS_ORDENADOS.filter(
      (album) =>
        (!termo || album.textoBusca.includes(termo)) &&
        (letraFiltro === "TODOS" || album.inicial === letraFiltro)
    );
  }, [termoBusca, letraFiltro]);

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

        {/* Filtro por Letras Unificado */}
        <FiltroAlfabetico
          letrasDisponiveis={LETRAS_DISPONIVEIS}
          letraAtiva={letraFiltro}
          aoSelecionarLetra={setLetraFiltro}
          classeContainer="albuns-letras-bloco"
        />
      </div>

      {/* 2. HEADER DE STATUS DA DISCOGRAFIA */}
      <div className="albuns-header-indice">
        <div className="indice-tag-wrap">
          <span className="indice-ponto-red" />
          <span className="indice-titulo-mono">
            DISCOGRAFIA OFICIAL // EXIBINDO {albunsFiltrados.length} DE {ALBUNS_ORDENADOS.length} ÁLBUNS
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
              <article key={chaveItem} className="album-crate-card cartao-com-link">
                {/* Cabeçalho da Capa com Carimbo Técnico */}
                <div className="album-crate-header">
                  <span className="album-tipo-etiqueta">LP // 12-INCH</span>
                  <span className="album-ano-etiqueta">{album.ano}</span>
                </div>

                {/* Efeito Físico: Vinil Saindo da Capa no Hover */}
                <div className="album-fisico-container">
                  {/* O vinil fica guardado na capa e sai por cima, girando, no hover/foco */}
                  <div className="album-disco-vinil-fisico" aria-hidden="true">
                    {album.capa ? (
                      <img
                        src={imagemNoTamanho(album.capa, 250)}
                        alt=""
                        className="vinyl-rotulo-capa"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        onError={tratarErroImagem}
                      />
                    ) : (
                      <span className="vinyl-rotulo-capa vinyl-rotulo-vazio" />
                    )}
                  </div>

                  {/* A Capa Quadrada do Disco (Jacket) */}
                  <div className="album-capa-quadrada">
                    {album.capa ? (
                      <ImagemComFallback
                        src={album.capa}
                        alt={album.titulo}
                        className="album-capa-img w-full h-full"
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
                  <h2 className="album-titulo-obra">
                    {/* O link cobre o cartão todo (::after); o botão de avaliar fica por cima */}
                    <Link to={`/artista/${album.artistaRef.id}`} className="cartao-link">
                      {album.titulo}
                    </Link>
                  </h2>
                  <div className="album-meta-tecnica">
                    <span>{album.faixas}</span>
                    <span>{album.reproducoes} STREAMS</span>
                  </div>

                  {/* Nota do álbum no cartão e botão para avaliar as faixas (layout da Mell) */}
                  <SeletorDeNota
                    chaveItem={chaveItem}
                    obra={{ tipo: "album", artistaId: album.artistaRef.id, titulo: album.titulo }}
                    rotulo={`Nota para ${album.titulo}`}
                    aoPedirLogin={aoAbrirLogin}
                    escuro
                  />
                  {aoAbrirAlbum && (
                    <button
                      type="button"
                      className="album-btn-avaliar-disco"
                      onClick={() =>
                        aoAbrirAlbum({
                          artista: album.artistaRef,
                          album,
                          indice: album.indiceOriginal,
                        })
                      }
                      title="Abrir a lista de faixas para avaliar"
                    >
                      <span className="disco-ponto-icon" />
                      [ AVALIAR FAIXAS ]
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
