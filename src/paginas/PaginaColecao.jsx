import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUsuario } from "../contextos/ContextoUsuario";
import { ColecaoDeslogada } from "../componentes/colecao/ColecaoDeslogada";
import { FichaCritico } from "../componentes/colecao/FichaCritico";
import { PlacaDiscoOuro } from "../componentes/colecao/PlacaDiscoOuro";
import { CartaoFicha } from "../componentes/colecao/CartaoFicha";
import { ModalSeletorFavorito } from "../componentes/colecao/ModalSeletorFavorito";
import {
  ABAS_COLECAO,
  contarDoisDigitos,
  ehFaixa,
  escolherFavorito,
  filtrarPorAba,
  montarItensAvaliados,
} from "../componentes/colecao/itensColecao";

const TEMPO_DESFAZER_MS = 6000;

export function PaginaColecao({ aoAvaliar, aoAbrirLogin }) {
  const {
    usuarioLogado,
    avaliacoes,
    totalAvaliacoes,
    mediaAvaliacoes,
    chaveFavoritoManual,
    definirFavorito,
    ultimaExcluida,
    desfazerExclusao,
    descartarExclusao,
  } = useUsuario();

  const [abaFiltro, setAbaFiltro] = useState(ABAS_COLECAO.TODOS);
  const [modalSeletorAberto, setModalSeletorAberto] = useState(false);

  // O aviso de "Desfazer" some sozinho; depois disso a exclusão fica definitiva
  useEffect(() => {
    if (!ultimaExcluida) return;
    const temporizador = setTimeout(descartarExclusao, TEMPO_DESFAZER_MS);
    return () => clearTimeout(temporizador);
  }, [ultimaExcluida, descartarExclusao]);

  // Mapeia as avaliações salvas para itens detalhados com capa, títulos e artista
  const itensAvaliados = useMemo(() => montarItensAvaliados(avaliacoes), [avaliacoes]);

  // Números das abas de filtro e da ficha do crítico
  const contagens = useMemo(
    () => ({
      albuns: itensAvaliados.filter((i) => i.tipo === "album").length,
      musicas: itensAvaliados.filter(ehFaixa).length,
      obrasPrimas: itensAvaliados.filter((i) => i.nota === 5).length,
      resenhas: itensAvaliados.filter((i) => i.comentario?.trim()).length,
    }),
    [itensAvaliados]
  );

  // Fichas da aba escolhida (Todos, Álbuns, Faixas ou 5 vinis)
  const itensFiltrados = useMemo(
    () => filtrarPorAba(itensAvaliados, abaFiltro),
    [itensAvaliados, abaFiltro]
  );

  // Obra do Disco de Ouro: a escolhida pelo usuário ou, sem escolha, a primeira
  const favoritoAbsoluto = useMemo(
    () => escolherFavorito(itensAvaliados, chaveFavoritoManual),
    [itensAvaliados, chaveFavoritoManual]
  );

  // Retorno antecipado só depois de todos os hooks, para manter a ordem de chamada estável
  if (!usuarioLogado) {
    return <ColecaoDeslogada aoAbrirLogin={aoAbrirLogin} />;
  }

  const abas = [
    { id: ABAS_COLECAO.TODOS, rotulo: "TODOS", total: totalAvaliacoes },
    { id: ABAS_COLECAO.ALBUNS, rotulo: "ÁLBUNS", total: contagens.albuns },
    { id: ABAS_COLECAO.MUSICAS, rotulo: "FAIXAS", total: contagens.musicas },
    { id: ABAS_COLECAO.OBRAS_PRIMAS, rotulo: "★ 5 VINIS", total: contagens.obrasPrimas },
  ];

  return (
    <main className="colecao-brutal-root">
      <FichaCritico
        usuario={usuarioLogado}
        totalAvaliacoes={totalAvaliacoes}
        mediaAvaliacoes={mediaAvaliacoes}
        totalObrasPrimas={contagens.obrasPrimas}
        totalResenhas={contagens.resenhas}
      />

      {favoritoAbsoluto && (
        <PlacaDiscoOuro
          favorito={favoritoAbsoluto}
          nomeCritico={usuarioLogado.nome}
          aoAvaliar={aoAvaliar}
          aoTrocarFavorito={() => setModalSeletorAberto(true)}
        />
      )}

      {/* Filtro por tipo de obra */}
      <section className="arquivo-filtros-secao">
        <div className="arquivo-abas-bloco" role="group" aria-label="Filtrar coleção">
          {abas.map((aba) => (
            <button
              key={aba.id}
              type="button"
              className={`aba-reta-btn ${abaFiltro === aba.id ? "ativo" : ""}`}
              aria-pressed={abaFiltro === aba.id}
              onClick={() => setAbaFiltro(aba.id)}
            >
              {aba.rotulo} [{contarDoisDigitos(aba.total)}]
            </button>
          ))}
        </div>

        {totalAvaliacoes > 0 && (
          <Link to="/albuns" className="arquivo-btn-explorar">
            + EXPLORAR ACERVO COMPLETO
          </Link>
        )}
      </section>

      {/* Estante de fichas */}
      <section className="arquivo-grid-secao">
        {totalAvaliacoes === 0 ? (
          <div className="arquivo-vazio-box">
            <img src="/assets/vinil-triste.webp" alt="" className="vazio-vinil-icone" />
            <h3 className="vazio-titulo">ESTANTE EM SILÊNCIO</h3>
            <p className="vazio-subtitulo">
              Nenhuma obra catalogada no seu acervo pessoal. Navegue pelos álbuns dos artistas,
              atribua suas notas e monte sua coleção oficial de críticas.
            </p>
            <Link to="/albuns" className="arquivo-cta-btn">
              CATALOGAR MEU PRIMEIRO DISCO →
            </Link>
          </div>
        ) : itensFiltrados.length === 0 ? (
          <div className="arquivo-sem-itens">
            <p>// NENHUM REGISTRO ENCONTRADO NESTE FILTRO</p>
          </div>
        ) : (
          <div className="fichas-arquivo-grid">
            {itensFiltrados.map((item) => (
              <CartaoFicha
                key={item.chave}
                item={item}
                ehFavorito={favoritoAbsoluto?.chave === item.chave}
                aoTornarFavorito={definirFavorito}
                aoAvaliar={aoAvaliar}
              />
            ))}
          </div>
        )}
      </section>

      {/* Aviso de exclusão com opção de desfazer */}
      <div className="colecao-aviso-regiao" role="status" aria-live="polite">
        {ultimaExcluida && (
          <div className="colecao-aviso">
            <span>
              Avaliação de <strong>{ultimaExcluida.avaliacao.obra?.titulo || "obra"}</strong> excluída.
            </span>
            <button type="button" onClick={desfazerExclusao}>
              Desfazer
            </button>
          </div>
        )}
      </div>

      {modalSeletorAberto && (
        <ModalSeletorFavorito
          itens={itensAvaliados}
          chaveAtual={favoritoAbsoluto?.chave}
          aoEscolher={(chave) => {
            definirFavorito(chave);
            setModalSeletorAberto(false);
          }}
          aoFechar={() => setModalSeletorAberto(false)}
        />
      )}
    </main>
  );
}
