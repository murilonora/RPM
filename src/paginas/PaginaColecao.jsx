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

  // Encontra o favorito supremo:
  // Se o usuário selecionou manualmente, usa a seleção dele; caso contrário, pega o de maior nota
  const favoritoAbsoluto = useMemo(() => {
    if (itensAvaliados.length === 0) return null;
    if (chaveFavoritoManual) {
      const achado = itensAvaliados.find((i) => i.chave === chaveFavoritoManual);
      if (achado) return achado;
    }
    return itensAvaliados[0];
  }, [itensAvaliados, chaveFavoritoManual]);

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

      {/* 2. O TEMPLO DO VINIL / DISCO DE OURO NA PAREDE (FAVORITO ABSOLUTO) */}
      {favoritoAbsoluto ? (
        <section className="templo-vinil-secao">
          <div className="templo-vinil-quadro">
            {/* Faixa Superior com Selo Dourado e Ações */}
            <div className="templo-header-linha">
              <div className="templo-selo-wrap">
                <span className="templo-estrela-ouro">★</span>
                <span className="templo-selo-texto">DISCO DE OURO · FAVORITO SUPREMO</span>
              </div>

              <div className="templo-acoes-topo">
                <span className="templo-nota-ouro">{favoritoAbsoluto.nota}/5 VINIS</span>
                <button
                  type="button"
                  className="templo-btn-trocar"
                  onClick={() => setModalSeletorAberto(true)}
                  title="Trocar qual obra fica exposta no seu Templo de Ouro"
                >
                  ⟳ Trocar Favorito
                </button>
              </div>
            </div>

            {/* Corpo em Perspectiva com Disco de Ouro Físico */}
            <div
              className="templo-conteudo-grid"
              onClick={() => aoSelecionarArtista(favoritoAbsoluto.artista)}
            >
              {/* Moldura Física com Disco de Ouro saindo */}
              <div className="templo-moldura-vinil">
                {/* Disco Dourado / Ouro com Sulcos e Brilho */}
                <div className="templo-disco-ouro" aria-hidden="true">
                  <div className="disco-ouro-groove" />
                  <div className="disco-ouro-groove-inner" />
                  <div className="disco-ouro-selo">
                    <span className="disco-ouro-furo" />
                  </div>
                </div>

                {/* Capa do Álbum em Relevo */}
                <div className="templo-capa-cover">
                  {favoritoAbsoluto.capa ? (
                    <img
                      src={favoritoAbsoluto.capa}
                      alt={favoritoAbsoluto.titulo}
                      className="templo-capa-img"
                    />
                  ) : (
                    <div className="templo-capa-placeholder">LP</div>
                  )}
                  <span className="templo-tipo-badge">
                    {favoritoAbsoluto.tipo === "album" ? "ÁLBUM" : "FAIXA"}
                  </span>
                </div>
              </div>

              {/* Informações Editoriais e Placa Comemorativa */}
              <div className="templo-info-col">
                <span className="templo-artista-eyebrow">
                  {favoritoAbsoluto.artista.nome} · {favoritoAbsoluto.ano || "Acervo"}
                </span>
                <h2 className="templo-obra-titulo">{favoritoAbsoluto.titulo}</h2>
                <p className="templo-obra-desc">{favoritoAbsoluto.subtitulo}</p>

                {favoritoAbsoluto.comentario ? (
                  <div className="templo-placa-comentario">
                    <span className="placa-aspas">“</span>
                    <p className="placa-texto">{favoritoAbsoluto.comentario}</p>
                    <span className="placa-assinatura">— {usuarioLogado.nome}</span>
                  </div>
                ) : (
                  <div className="templo-placa-vazia">
                    <span>Nenhuma resenha escrita ainda para esta obra.</span>
                    {aoAvaliar && (
                      <button
                        type="button"
                        className="templo-btn-escrever"
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
                        + Escrever Resenha do Favorito
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      ) : null}

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
            const ehFavoritoAtual = favoritoAbsoluto && favoritoAbsoluto.chave === item.chave;

            return (
              <div
                key={item.chave}
                className={`colecao-linha-item ${ehFavoritoAtual ? "linha-favorito-destaque" : ""}`}
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
                    <h3 className="colecao-obra-nome">
                      {item.titulo}
                      {ehFavoritoAtual && (
                        <span className="badge-mini-favorito" title="Favorito Supremo">
                          ★ OURO
                        </span>
                      )}
                    </h3>
                    <span className="colecao-artista-sub">{item.artista.nome}</span>
                  </div>

                  {item.comentario && (
                    <p className="colecao-comentario-texto">
                      "{item.comentario}"
                    </p>
                  )}
                </div>

                {/* Avaliação em Vinis, Botão de Favoritar e Botão de Editar */}
                <div className="colecao-item-direita">
                  <div className="colecao-vinis-bloco">
                    <AvaliacaoVinil chaveItem={item.chave} tamanho="pequeno" apenasLeitura />
                  </div>

                  {/* Botão de Coroar como Favorito Supremo */}
                  <button
                    type="button"
                    className={`btn-coroar-favorito ${ehFavoritoAtual ? "coroado" : ""}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      definirFavorito(item.chave);
                    }}
                    title={
                      ehFavoritoAtual
                        ? "Esta é a sua Obra-Prima atual no Templo"
                        : "Definir esta obra como seu Favorito Supremo"
                    }
                  >
                    ★ {ehFavoritoAtual ? "Favorito" : "Tornar Favorito"}
                  </button>

                  {aoAvaliar && (
                    <button
                      type="button"
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

      {/* 5. MODAL SELETOR DO FAVORITO SUPREMO */}
      {modalSeletorAberto && (
        <div className="modal-overlay" onClick={() => setModalSeletorAberto(false)}>
          <div
            className="modal-conteudo modal-seletor-favorito"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-fechar"
              onClick={() => setModalSeletorAberto(false)}
              aria-label="Fechar"
            >
              ✕
            </button>

            <span className="modal-seletor-tag">RPM HALL OF FAME</span>
            <h2 className="modal-titulo" style={{ margin: "4px 0 8px" }}>
              Escolha seu Disco de Ouro
            </h2>
            <p style={{ color: "#aaa", fontSize: "0.85rem", marginBottom: "20px" }}>
              Selecione qual disco ou faixa ocupará o pedestal de honra da sua coleção:
            </p>

            <div className="seletor-lista-itens">
              {itensAvaliados.map((item) => {
                const selecionado = favoritoAbsoluto && favoritoAbsoluto.chave === item.chave;

                return (
                  <div
                    key={item.chave}
                    className={`seletor-card-item ${selecionado ? "selecionado" : ""}`}
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
                        {item.artista.nome} · {item.nota}/5 vinis
                      </span>
                    </div>
                    {selecionado ? (
                      <span className="seletor-check-badge">★ ATUAL</span>
                    ) : (
                      <span className="seletor-btn-escolher">Escolher</span>
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
