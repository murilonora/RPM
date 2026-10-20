import { useState, useMemo } from "react";
import { useUsuario } from "../contextos/ContextoUsuario";
import { listaDeArtistas } from "../dados/dadosMusicais";
import { AvaliacaoVinil } from "../componentes/AvaliacaoVinil";

export function PaginaColecao({ aoSelecionarArtista, aoNavegarParaAlbuns, aoAvaliar }) {
  const { usuarioLogado, avaliacoes, totalAvaliacoes, mediaAvaliacoes } = useUsuario();
  const [abaFiltro, setAbaFiltro] = useState("TODOS"); // "TODOS" | "ALBUNS" | "MUSICAS" | "OBRAS_PRIMAS"

  // Se não estiver logado, exibe estado empático com o mascote
  if (!usuarioLogado) {
    return (
      <main className="colecao-editorial-root">
        <div className="colecao-deslogado-box">
          <img
            src="/assets/vinil-triste.png"
            alt="Vinil Triste"
            className="colecao-deslogado-img"
          />
          <span className="colecao-tag-aviso">ACESSO RESTRITO</span>
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
          subtitulo = `Faixa de "${m.album}"`;
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

  // O melhor item avaliado (Favorito Absoluto)
  const favoritoAbsoluto = itensAvaliados[0] || null;

  return (
    <main className="colecao-editorial-root">
      {/* 1. FICHA / PASSAPORTE DO CRÍTICO (HEADER EDITORIAL) */}
      <section className="passaporte-critico">
        <div className="passaporte-top">
          <div className="passaporte-avatar">
            <span className="passaporte-avatar-vinil" />
            <div className="passaporte-avatar-inicial">
              {usuarioLogado.nome.charAt(0).toUpperCase()}
            </div>
          </div>

          <div className="passaporte-info">
            <div className="passaporte-meta-selo">
              <span className="selo-rpm">RPM ARCHIVE</span>
              <span className="selo-status">CRÍTICO ATIVO · NÍVEL OURO</span>
            </div>
            <h1 className="passaporte-nome">{usuarioLogado.nome}</h1>
            <p className="passaporte-id">
              REGISTRO: <code>{usuarioLogado.email || usuarioLogado.id}</code>
            </p>
          </div>
        </div>

        {/* Barra de Fita Métrica / Indicadores Técnicos */}
        <div className="passaporte-metricas">
          <div className="metrica-bloco">
            <span className="metrica-rotulo">ACERVO AVALIADO</span>
            <strong className="metrica-valor">{totalAvaliacoes}</strong>
            <small className="metrica-desc">discos & faixas</small>
          </div>
          <div className="metrica-bloco">
            <span className="metrica-rotulo">MÉDIA GERAL</span>
            <strong className="metrica-valor destaque-vermelho">{mediaAvaliacoes}</strong>
            <small className="metrica-desc">em discos de vinil</small>
          </div>
          <div className="metrica-bloco">
            <span className="metrica-rotulo">OBRAS-PRIMAS (5/5)</span>
            <strong className="metrica-valor">{totalObrasPrimas}</strong>
            <small className="metrica-desc">grau máximo</small>
          </div>
          <div className="metrica-bloco">
            <span className="metrica-rotulo">RESENHAS REGISTRADAS</span>
            <strong className="metrica-valor">{totalResenhas}</strong>
            <small className="metrica-desc">críticas escritas</small>
          </div>
        </div>
      </section>

      {/* 2. FAVORITO ABSOLUTO EM DESTAQUE (SE EXISTIR) */}
      {favoritoAbsoluto && (
        <section className="colecao-destaque-banner">
          <div className="destaque-tag-linha">
            <span className="destaque-tag-badge">★ FAVORITO ABSOLUTO DO CRÍTICO</span>
            <span className="destaque-tag-nota">{favoritoAbsoluto.nota}/5 VINIS</span>
          </div>

          <div
            className="destaque-corpo"
            onClick={() => aoSelecionarArtista(favoritoAbsoluto.artista)}
          >
            <div className="destaque-capa-wrap">
              {favoritoAbsoluto.capa ? (
                <img
                  src={favoritoAbsoluto.capa}
                  alt={favoritoAbsoluto.titulo}
                  className="destaque-capa-img"
                />
              ) : (
                <div className="destaque-capa-placeholder">LP</div>
              )}
              <div className="destaque-vinil-relevo" />
            </div>

            <div className="destaque-texto">
              <span className="destaque-artista-nome">{favoritoAbsoluto.artista.nome}</span>
              <h2 className="destaque-obra-titulo">{favoritoAbsoluto.titulo}</h2>
              <p className="destaque-detalhe">
                {favoritoAbsoluto.subtitulo} · Lançamento: {favoritoAbsoluto.ano || "Acervo"}
              </p>
              {favoritoAbsoluto.comentario && (
                <blockquote className="destaque-citacao">
                  "{favoritoAbsoluto.comentario}"
                </blockquote>
              )}
            </div>
          </div>
        </section>
      )}

      {/* 3. BARRA DE FILTROS DAS AVALIAÇÕES */}
      <section className="colecao-controle-secao">
        <div className="colecao-abas-filtro">
          <button
            className={`aba-btn ${abaFiltro === "TODOS" ? "ativa" : ""}`}
            onClick={() => setAbaFiltro("TODOS")}
          >
            Todos ({totalAvaliacoes})
          </button>
          <button
            className={`aba-btn ${abaFiltro === "ALBUNS" ? "ativa" : ""}`}
            onClick={() => setAbaFiltro("ALBUNS")}
          >
            Álbuns ({totalAlbuns})
          </button>
          <button
            className={`aba-btn ${abaFiltro === "MUSICAS" ? "ativa" : ""}`}
            onClick={() => setAbaFiltro("MUSICAS")}
          >
            Faixas ({totalMusicas})
          </button>
          <button
            className={`aba-btn ${abaFiltro === "OBRAS_PRIMAS" ? "ativa" : ""}`}
            onClick={() => setAbaFiltro("OBRAS_PRIMAS")}
          >
            ★ 5 Vinis ({totalObrasPrimas})
          </button>
        </div>

        {totalAvaliacoes > 0 && aoNavegarParaAlbuns && (
          <button className="colecao-btn-adicionar" onClick={aoNavegarParaAlbuns}>
            + Explorar mais álbuns
          </button>
        )}
      </section>

      {/* 4. LISTA EDITORIAL DE DISCOS / FICHAS DE AUDIÇÃO */}
      <section className="colecao-lista-editorial">
        {totalAvaliacoes === 0 ? (
          /* ESTADO VAZIO COM DESIGN TEMÁTICO */
          <div className="colecao-vazio-card">
            <img
              src="/assets/vinil-triste.png"
              alt="Estante Vazia"
              className="vazio-vinil-icone"
            />
            <h3 className="vazio-titulo">Sua estante de discos ainda está em silêncio</h3>
            <p className="vazio-subtitulo">
              Você ainda não registrou nenhuma avaliação. Explore a discografia dos maiores
              artistas, dê suas notas de 1 a 5 vinis e crie seu diário oficial de crítico musical!
            </p>
            {aoNavegarParaAlbuns && (
              <button className="vazio-btn-cta" onClick={aoNavegarParaAlbuns}>
                Avaliar Meu Primeiro Álbum →
              </button>
            )}
          </div>
        ) : itensFiltrados.length === 0 ? (
          <div className="colecao-sem-filtro">
            <p>Nenhum item encontrado nesta categoria de filtro.</p>
          </div>
        ) : (
          itensFiltrados.map((item, index) => {
            const numeroFormatado = String(index + 1).padStart(2, "0");

            return (
              <div
                key={item.chave}
                className="colecao-linha-item"
                onClick={() => aoSelecionarArtista(item.artista)}
              >
                {/* Índice numérico vermelho */}
                <span className="colecao-item-numero">{numeroFormatado}</span>

                {/* Capa com vinil deslizante */}
                <div className="colecao-capa-box">
                  {item.capa ? (
                    <img src={item.capa} alt={item.titulo} className="colecao-capa-img" />
                  ) : (
                    <div className="colecao-capa-placeholder">
                      {item.titulo.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                  <span className="colecao-tag-tipo">
                    {item.tipo === "album" ? "LP" : "FAIXA"}
                  </span>
                </div>

                {/* Informações da obra */}
                <div className="colecao-item-info">
                  <div className="colecao-item-titulos">
                    <h3 className="colecao-obra-nome">{item.titulo}</h3>
                    <span className="colecao-artista-sub">{item.artista.nome}</span>
                  </div>

                  {item.comentario && (
                    <p className="colecao-comentario-texto">
                      "{item.comentario}"
                    </p>
                  )}
                </div>

                {/* Avaliação em Vinis e Botão de Editar */}
                <div className="colecao-item-direita">
                  <div className="colecao-vinis-bloco">
                    <AvaliacaoVinil chaveItem={item.chave} tamanho="pequeno" apenasLeitura />
                  </div>

                  {aoAvaliar && (
                    <button
                      className="colecao-btn-editar"
                      onClick={(e) => {
                        e.stopPropagation();
                        aoAvaliar({
                          chave: item.chave,
                          titulo: item.titulo,
                          subtitulo: `${item.tipo === "album" ? "Álbum" : "Música"} • ${item.artista.nome}`,
                          capa: item.capa,
                        });
                      }}
                      title="Editar nota ou comentário"
                    >
                      Editar Nota
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </section>
    </main>
  );
}
