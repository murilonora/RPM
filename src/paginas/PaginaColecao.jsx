import { useState, useMemo } from "react";
import { useUsuario } from "../contextos/ContextoUsuario";
import { listaDeArtistas } from "../dados/dadosMusicais";
import { AvaliacaoVinil } from "../componentes/AvaliacaoVinil";

export function PaginaColecao({ aoSelecionarArtista, aoNavegarParaAlbuns, aoAvaliar }) {
  const {
    usuarioLogado,
    avaliacoes,
    totalAvaliacoes,
    mediaAvaliacoes,
    chaveFavoritoManual,
    definirFavorito,
  } = useUsuario();

  const [abaFiltro, setAbaFiltro] = useState("TODOS"); // "TODOS" | "ALBUNS" | "MUSICAS" | "OBRAS_PRIMAS"
  const [modalSeletorAberto, setModalSeletorAberto] = useState(false);

  // Se não estiver logado, exibe estado empático com o mascote
  if (!usuarioLogado) {
    return (
      <main className="colecao-brutal-root">
        <div className="colecao-deslogado-box">
          <img
            src="/assets/vinil-triste.png"
            alt="Vinil Triste"
            className="colecao-deslogado-img"
          />
          <span className="brutal-badge-mono">ACESSO_RESTRITO // REGISTRO_EXIGIDO</span>
          <h2 className="colecao-deslogado-titulo">Você ainda não tem conta!</h2>
          <p className="colecao-deslogado-sub">
            Faça login ou cadastre sua conta de crítico para começar a catalogar seu acervo
            musical, registrar notas em vinil e escrever resenhas.
          </p>
        </div>
      </main>
    );
  }

  // Mapeia as avaliações salvas para itens detalhados com capa, títulos e artista
  const itensAvaliados = useMemo(() => {
    return Object.entries(avaliacoes)
      .filter(([, obj]) => obj.nota > 0)
      .map(([chave, obj]) => {
        const nota = obj.nota;
        const comentario = obj.comentario;
        const partes = chave.split("-");
        const tipo = partes[0]; // "musica" ou "album"
        const indice = parseInt(partes[partes.length - 1], 10);
        const artistaId = partes.slice(1, -1).join("-");

        const artista = listaDeArtistas.find((a) => a.id === artistaId);
        if (!artista) return null;

        let titulo = "";
        let subtitulo = "";
        let capa = null;
        let ano = "";

        if (tipo === "musica" && artista.musicas[indice]) {
          const m = artista.musicas[indice];
          titulo = m.titulo;
          subtitulo = `Faixa · "${m.album}"`;
          capa = m.capa;
          ano = m.ano;
        } else if (tipo === "album" && artista.albuns[indice]) {
          const alb = artista.albuns[indice];
          titulo = alb.titulo;
          subtitulo = `Álbum de estúdio`;
          capa = alb.capa;
          ano = alb.ano;
        }

        return {
          chave,
          tipo,
          titulo,
          subtitulo,
          capa,
          ano,
          nota,
          comentario,
          artista,
          indice,
        };
      })
      .filter(Boolean)
      .sort((a, b) => b.nota - a.nota);
  }, [avaliacoes]);

  // Contadores
  const totalAlbuns = itensAvaliados.filter((i) => i.tipo === "album").length;
  const totalMusicas = itensAvaliados.filter((i) => i.tipo === "musica").length;
  const totalObrasPrimas = itensAvaliados.filter((i) => i.nota === 5).length;
  const totalResenhas = itensAvaliados.filter((i) => !!i.comentario && i.comentario.trim().length > 0).length;

  // Itens filtrados conforme a aba ativa
  const itensFiltrados = useMemo(() => {
    if (abaFiltro === "ALBUNS") return itensAvaliados.filter((i) => i.tipo === "album");
    if (abaFiltro === "MUSICAS") return itensAvaliados.filter((i) => i.tipo === "musica");
    if (abaFiltro === "OBRAS_PRIMAS") return itensAvaliados.filter((i) => i.nota === 5);
    return itensAvaliados;
  }, [itensAvaliados, abaFiltro]);

  // Favorito supremo
  const favoritoAbsoluto = useMemo(() => {
    if (itensAvaliados.length === 0) return null;
    if (chaveFavoritoManual) {
      const achado = itensAvaliados.find((i) => i.chave === chaveFavoritoManual);
      if (achado) return achado;
    }
    return itensAvaliados[0];
  }, [itensAvaliados, chaveFavoritoManual]);

  return (
    <main className="colecao-brutal-root">
      {/* 1. FICHA TÉCNICA DO CRÍTICO (ESTILO ARQUIVO GEOMÉTRICO) */}
      <section className="arquivo-ficha-critico">
        <div className="ficha-topo-grid">
          <div className="ficha-identificacao">
            <div className="ficha-codigo-linha">
              <span className="ficha-label-mono">ARQUIVO_RPM // FICHA_CRÍTICO</span>
              <span className="ficha-serial">ID: #{usuarioLogado.id.slice(0, 10).toUpperCase()}</span>
            </div>
            <h1 className="ficha-nome-critico">{usuarioLogado.nome}</h1>
            <p className="ficha-credencial">
              CREDENTIAL: <code>{usuarioLogado.email || usuarioLogado.id}</code> · STATUS: ATIVO
            </p>
          </div>

          <div className="ficha-selo-caixa">
            <div className="selo-caixa-topo">COLEÇÃO_CERTIFICADA</div>
            <div className="selo-caixa-corpo">
              <span className="selo-ano-gravacao">RPM·2026</span>
              <strong className="selo-grau">CRÍTICO OURO</strong>
            </div>
          </div>
        </div>

        {/* Grade de Estatísticas Brutalistas */}
        <div className="ficha-metricas-grid">
          <div className="metrica-quadro">
            <span className="metrica-mono-tag">TOTAL_AVALIADO</span>
            <strong className="metrica-mono-num">{String(totalAvaliacoes).padStart(2, "0")}</strong>
            <span className="metrica-mono-sub">OBRAS CATALOGADAS</span>
          </div>
          <div className="metrica-quadro metrica-destaque-red">
            <span className="metrica-mono-tag">MÉDIA_VINIS</span>
            <strong className="metrica-mono-num">{mediaAvaliacoes}</strong>
            <span className="metrica-mono-sub">DE 5.0 ESTRELAS</span>
          </div>
          <div className="metrica-quadro">
            <span className="metrica-mono-tag">OBRAS_PRIMAS</span>
            <strong className="metrica-mono-num">{String(totalObrasPrimas).padStart(2, "0")}</strong>
            <span className="metrica-mono-sub">GRAU MÁXIMO (5/5)</span>
          </div>
          <div className="metrica-quadro">
            <span className="metrica-mono-tag">RESENHAS_TXT</span>
            <strong className="metrica-mono-num">{String(totalResenhas).padStart(2, "0")}</strong>
            <span className="metrica-mono-sub">CRÍTICAS ESCRITAS</span>
          </div>
        </div>
      </section>

      {/* 2. O TEMPLO DO DISCO DE OURO (PLACA DE PRECISÃO GEOMÉTRICA) */}
      {favoritoAbsoluto && (
        <section className="templo-ouro-arquivo">
          <div className="placa-ouro-moldura">
            {/* Faixa superior mecânica */}
            <div className="placa-ouro-header">
              <div className="placa-ouro-badge">
                <span className="ouro-quadrado-icon">■</span>
                <span>DISCO DE OURO // FAVORITO SUPREMO DO ACERVO</span>
              </div>
              <div className="placa-ouro-controles">
                <span className="placa-nota-carimbo">{favoritoAbsoluto.nota}/5 VINIS</span>
                <button
                  type="button"
                  className="placa-btn-trocar"
                  onClick={() => setModalSeletorAberto(true)}
                  title="Trocar qual obra ocupa o pedestal de ouro"
                >
                  [ ⟳ TROCAR FAVORITO ]
                </button>
              </div>
            </div>

            {/* Corpo da Obra de Ouro com Capa e Disco Saindo */}
            <div
              className="placa-ouro-corpo"
              onClick={() => aoSelecionarArtista(favoritoAbsoluto.artista)}
            >
              <div className="placa-disco-wrap">
                <div className="placa-disco-ouro" aria-hidden="true">
                  <div className="disco-ouro-groove" />
                  <div className="disco-ouro-groove-inner" />
                  <div className="disco-ouro-selo">
                    <span className="disco-ouro-furo" />
                  </div>
                </div>

                <div className="placa-capa-quadrada">
                  {favoritoAbsoluto.capa ? (
                    <img
                      src={favoritoAbsoluto.capa}
                      alt={favoritoAbsoluto.titulo}
                      className="placa-capa-img"
                    />
                  ) : (
                    <div className="placa-capa-placeholder">LP</div>
                  )}
                  <span className="placa-tipo-etiqueta">
                    {favoritoAbsoluto.tipo === "album" ? "LP" : "SINGLE"}
                  </span>
                </div>
              </div>

              <div className="placa-dados-col">
                <span className="placa-artista-head">
                  {favoritoAbsoluto.artista.nome} · ANO {favoritoAbsoluto.ano || "N/A"}
                </span>
                <h2 className="placa-titulo-obra">{favoritoAbsoluto.titulo}</h2>
                <p className="placa-sub-detalhe">{favoritoAbsoluto.subtitulo}</p>

                {favoritoAbsoluto.comentario ? (
                  <div className="placa-resenha-box">
                    <span className="resenha-tag-mono">// RESENHA DO CRÍTICO:</span>
                    <p className="resenha-texto-aspas">"{favoritoAbsoluto.comentario}"</p>
                    <span className="resenha-assinatura">— {usuarioLogado.nome}</span>
                  </div>
                ) : (
                  <div className="placa-sem-resenha">
                    <span>Sem resenha textual registrada.</span>
                    {aoAvaliar && (
                      <button
                        type="button"
                        className="placa-btn-adicionar-txt"
                        onClick={(e) => {
                          e.stopPropagation();
                          aoAvaliar({
                            chave: favoritoAbsoluto.chave,
                            titulo: favoritoAbsoluto.titulo,
                            subtitulo: `${favoritoAbsoluto.tipo === "album" ? "Álbum" : "Música"} • ${favoritoAbsoluto.artista.nome}`,
                            capa: favoritoAbsoluto.capa,
                          });
                        }}
                      >
                        [ + ESCREVER RESENHA ]
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. BARRA DE FILTRO BRUTALISTA (SEM PÍLULAS REDONDAS) */}
      <section className="arquivo-filtros-secao">
        <div className="arquivo-abas-bloco">
          <button
            className={`aba-reta-btn ${abaFiltro === "TODOS" ? "ativo" : ""}`}
            onClick={() => setAbaFiltro("TODOS")}
          >
            TODOS [{String(totalAvaliacoes).padStart(2, "0")}]
          </button>
          <button
            className={`aba-reta-btn ${abaFiltro === "ALBUNS" ? "ativo" : ""}`}
            onClick={() => setAbaFiltro("ALBUNS")}
          >
            ÁLBUNS [{String(totalAlbuns).padStart(2, "0")}]
          </button>
          <button
            className={`aba-reta-btn ${abaFiltro === "MUSICAS" ? "ativo" : ""}`}
            onClick={() => setAbaFiltro("MUSICAS")}
          >
            FAIXAS [{String(totalMusicas).padStart(2, "0")}]
          </button>
          <button
            className={`aba-reta-btn ${abaFiltro === "OBRAS_PRIMAS" ? "ativo" : ""}`}
            onClick={() => setAbaFiltro("OBRAS_PRIMAS")}
          >
            ★ 5 VINIS [{String(totalObrasPrimas).padStart(2, "0")}]
          </button>
        </div>

        {totalAvaliacoes > 0 && aoNavegarParaAlbuns && (
          <button className="arquivo-btn-explorar" onClick={aoNavegarParaAlbuns}>
            + EXPLORAR ACERVO COMPLETO
          </button>
        )}
      </section>

      {/* 4. ESTANTE DE FICHAS TÉCNICAS (GRID DE CARDS RETOS DE ARQUIVO) */}
      <section className="arquivo-grid-secao">
        {totalAvaliacoes === 0 ? (
          <div className="arquivo-vazio-box">
            <img
              src="/assets/vinil-triste.png"
              alt="Estante Vazia"
              className="vazio-vinil-icone"
            />
            <h3 className="vazio-titulo">ESTANTE EM SILÊNCIO</h3>
            <p className="vazio-subtitulo">
              Nenhuma obra catalogada no seu acervo pessoal. Navegue pelos álbuns dos artistas,
              atribua suas notas e monte sua coleção oficial de críticas.
            </p>
            {aoNavegarParaAlbuns && (
              <button className="arquivo-cta-btn" onClick={aoNavegarParaAlbuns}>
                CATALOGAR MEU PRIMEIRO DISCO →
              </button>
            )}
          </div>
        ) : itensFiltrados.length === 0 ? (
          <div className="arquivo-sem-itens">
            <p>// NENHUM REGISTRO ENCONTRADO NESTE FILTRO</p>
          </div>
        ) : (
          <div className="fichas-arquivo-grid">
            {itensFiltrados.map((item) => {
              const ehFavoritoAtual = favoritoAbsoluto && favoritoAbsoluto.chave === item.chave;

              return (
                <div
                  key={item.chave}
                  className={`ficha-card-item ${ehFavoritoAtual ? "card-favorito-ativo" : ""}`}
                  onClick={() => aoSelecionarArtista(item.artista)}
                >
                  {/* Cabeçalho da Ficha */}
                  <div className="ficha-card-header">
                    <span className="ficha-card-tipo">
                      {item.tipo === "album" ? "LP // ÁLBUM" : "FAIXA // SINGLE"}
                    </span>
                    {ehFavoritoAtual ? (
                      <span className="ficha-card-ouro-badge">★ FAVORITO SUPREMO</span>
                    ) : (
                      <span className="ficha-card-ano">{item.ano || "RPM"}</span>
                    )}
                  </div>

                  {/* Capa e Títulos */}
                  <div className="ficha-card-body">
                    <div className="ficha-capa-wrap">
                      {item.capa ? (
                        <img src={item.capa} alt={item.titulo} className="ficha-capa-img" />
                      ) : (
                        <div className="ficha-capa-vazia">LP</div>
                      )}
                    </div>

                    <div className="ficha-titulos-box">
                      <span className="ficha-card-artista">{item.artista.nome}</span>
                      <h3 className="ficha-card-titulo">{item.titulo}</h3>
                    </div>
                  </div>

                  {/* Resenha do Usuário (se houver) */}
                  {item.comentario && (
                    <div className="ficha-card-comentario">
                      "{item.comentario}"
                    </div>
                  )}

                  {/* Rodapé com Nota em Vinis e Ações Técnicas */}
                  <div className="ficha-card-footer" onClick={(e) => e.stopPropagation()}>
                    <div className="ficha-vinis-rating">
                      <AvaliacaoVinil chaveItem={item.chave} tamanho="pequeno" apenasLeitura />
                    </div>

                    <div className="ficha-botoes-acoes">
                      <button
                        type="button"
                        className={`btn-ficha-coroar ${ehFavoritoAtual ? "ativo" : ""}`}
                        onClick={() => definirFavorito(item.chave)}
                        title={ehFavoritoAtual ? "Favorito Supremo Ativo" : "Definir como Favorito Supremo"}
                      >
                        {ehFavoritoAtual ? "★ OURO" : "TORNAR FAVORITO"}
                      </button>

                      {aoAvaliar && (
                        <button
                          type="button"
                          className="btn-ficha-editar"
                          onClick={() => {
                            aoAvaliar({
                              chave: item.chave,
                              titulo: item.titulo,
                              subtitulo: `${item.tipo === "album" ? "Álbum" : "Música"} • ${item.artista.nome}`,
                              capa: item.capa,
                            });
                          }}
                          title="Editar nota e comentário"
                        >
                          EDITAR
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 5. MODAL SELETOR DE FAVORITO (ARQUIVO RETO) */}
      {modalSeletorAberto && (
        <div className="modal-overlay" onClick={() => setModalSeletorAberto(false)}>
          <div
            className="modal-conteudo modal-brutal-seletor"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-fechar"
              onClick={() => setModalSeletorAberto(false)}
              aria-label="Fechar"
            >
              ✕
            </button>

            <span className="modal-seletor-tag">RPM_ARCHIVE // TROCA_DE_FAVORITO</span>
            <h2 className="modal-titulo" style={{ margin: "4px 0 8px", textAlign: "left" }}>
              Escolha seu Disco de Ouro
            </h2>
            <p style={{ color: "#888", fontSize: "0.85rem", marginBottom: "20px" }}>
              Selecione o registro que ficará gravado no pedestal da sua coleção:
            </p>

            <div className="seletor-lista-itens">
              {itensAvaliados.map((item) => {
                const selecionado = favoritoAbsoluto && favoritoAbsoluto.chave === item.chave;

                return (
                  <div
                    key={item.chave}
                    className={`seletor-card-item brutal-item ${selecionado ? "selecionado" : ""}`}
                    onClick={() => {
                      definirFavorito(item.chave);
                      setModalSeletorAberto(false);
                    }}
                  >
                    <img
                      src={item.capa || "/assets/rpm-mark.svg"}
                      alt={item.titulo}
                      className="seletor-item-capa"
                    />
                    <div className="seletor-item-textos">
                      <strong>{item.titulo}</strong>
                      <span>
                        {item.artista.nome} · {item.nota}/5 VINIS
                      </span>
                    </div>
                    {selecionado ? (
                      <span className="seletor-check-badge">★ ATUAL</span>
                    ) : (
                      <span className="seletor-btn-escolher">[ SELECIONAR ]</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
