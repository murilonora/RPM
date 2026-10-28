import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useCatalogo } from "../contextos/ContextoCatalogo";
import { ACERVO_HISTORIAS } from "../dados/historias";
import { imagemNoTamanho, tratarErroImagem } from "../utilitarios/imagens";

const DURACAO_SLIDE_MS = 9000;
const DISTANCIA_SWIPE_PX = 50;
const QUANTIDADE_POR_VEZ = 5;

// Cada história é um disco: a foto do artista faz o papel da capa e o vinil
// (com a capa do álbum no rótulo) desliza para fora dela a cada troca.
// Liga cada história do acervo ao artista e ao álbum do catálogo atual (pula as que não existirem)
function montarHistorias(artistasPorId) {
  return ACERVO_HISTORIAS.map((historia) => {
    const artista = artistasPorId.get(historia.artistaId);
    if (!artista) return null;
    const album = artista.albuns.find((a) => a.titulo === historia.album);
    return { ...historia, artista, capa: album?.capa || artista.foto, ano: album?.ano };
  }).filter(Boolean);
}

// Fisher-Yates: sorteia histórias diferentes a cada visita (e a cada clique em "Outras histórias")
function sortearHistorias(todas, quantidade = QUANTIDADE_POR_VEZ) {
  const copia = [...todas];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia.slice(0, quantidade);
}

const doisDigitos = (n) => String(n).padStart(2, "0");

function prefereMenosMovimento() {
  return typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
}

// Foco vindo do teclado (Tab), e não de um clique ou toque numa seta/miniatura
function focoDoTeclado(elemento) {
  try {
    return elemento.matches(":focus-visible");
  } catch {
    return true;
  }
}

// Carrossel editorial da página inicial. Avança sozinho (a barra de progresso
// da miniatura ativa é quem dispara a troca), pausa pelo botão, com o foco do
// teclado dentro dele ou com a aba escondida, e aceita setas e swipe.
// Mouse em cima não pausa: ao rolar a página o cursor quase sempre para em
// cima dele, e o carrossel parecia travado.
export function HistoriasEmDestaque({ historiasIniciais }) {
  const { artistasPorId } = useCatalogo();
  // Sorteia uma vez ao abrir; se o catálogo do servidor chegar depois, as histórias na tela não mudam
  const [historias, setHistorias] = useState(
    () => historiasIniciais ?? sortearHistorias(montarHistorias(artistasPorId))
  );
  const [ativa, setAtiva] = useState(0);
  // História que acabou de sair: a foto dela continua no zoom por baixo e o vinil volta para a capa
  const [saindo, setSaindo] = useState(null);
  const [pausado, setPausado] = useState(false);
  // Pausa escolhida pela pessoa no botão (a de cima é a automática: foco e aba escondida)
  const [pausadoNoBotao, setPausadoNoBotao] = useState(false);
  const [direcao, setDirecao] = useState(1);
  const [semAutoplay] = useState(prefereMenosMovimento);
  const inicioToque = useRef(null);
  const tiraRef = useRef(null);
  const total = historias.length;

  // Vai para a história do índice (dá a volta no fim/começo) e guarda o sentido da animação
  const irPara = useCallback(
    (indice, sentido) => {
      const proximo = (indice + total) % total;
      if (proximo === ativa) return;
      setDirecao(sentido ?? (proximo > ativa ? 1 : -1));
      setSaindo(ativa);
      setAtiva(proximo);
    },
    [ativa, total]
  );
  // "Outras histórias": sorteia um novo conjunto e volta para a primeira
  function sortearOutras() {
    setHistorias(sortearHistorias(montarHistorias(artistasPorId)));
    setDirecao(1);
    setSaindo(null);
    setAtiva(0);
  }
  // Avança uma história
  const proxima = () => irPara(ativa + 1, 1);
  // Volta uma história
  const anterior = () => irPara(ativa - 1, -1);

  // No celular a tira rola de lado: mantém a miniatura ativa à vista sem mexer na página
  useEffect(() => {
    const tira = tiraRef.current;
    const miniatura = tira?.children[ativa];
    if (!miniatura || tira.scrollWidth <= tira.clientWidth) return;
    tira.scrollTo({ left: miniatura.offsetLeft - tira.offsetLeft - 20, behavior: "smooth" });
  }, [ativa]);

  useEffect(() => {
    // Aba do navegador escondida pausa o carrossel
    const aoMudarVisibilidade = () => setPausado(document.hidden);
    document.addEventListener("visibilitychange", aoMudarVisibilidade);
    return () => document.removeEventListener("visibilitychange", aoMudarVisibilidade);
  }, []);

  // Setas do teclado trocam de história
  function aoTeclar(evento) {
    if (evento.key === "ArrowRight") proxima();
    else if (evento.key === "ArrowLeft") anterior();
  }

  // Swipe no celular: arrastar para a esquerda avança, para a direita volta
  function aoSoltarToque(evento) {
    if (inicioToque.current === null) return;
    const deslocamento = evento.changedTouches[0].clientX - inicioToque.current;
    inicioToque.current = null;
    if (Math.abs(deslocamento) < DISTANCIA_SWIPE_PX) return;
    if (deslocamento < 0) proxima();
    else anterior();
  }

  const historia = historias[ativa];
  const rodando = !pausado && !pausadoNoBotao && !semAutoplay;

  return (
    <section
      className={`historias ${rodando ? "" : "historias--pausado"}`}
      aria-roledescription="carrossel"
      aria-label="Histórias em destaque"
      onFocus={(e) => focoDoTeclado(e.target) && setPausado(true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setPausado(false)}
      onKeyDown={aoTeclar}
      onTouchStart={(e) => (inicioToque.current = e.touches[0].clientX)}
      onTouchEnd={aoSoltarToque}
      style={{ "--duracao-slide": `${DURACAO_SLIDE_MS}ms` }}
    >
      <div className="historias-cabecalho">
        <p className="eyebrow">Histórias em destaque</p>
        <button type="button" className="historias-sortear" onClick={sortearOutras}>
          Outras histórias ⟳
        </button>
      </div>

      <div className="historias-palco">
        {/* Foto do artista como capa do disco, com o vinil saindo dela */}
        <div className="historias-disco">
          {/* O vinil da história anterior volta para dentro da capa antes do novo sair */}
          {[saindo, ativa]
            .filter((indice) => indice !== null)
            .map((indice) => (
              <div
                key={`vinil-${historias[indice].artistaId}`}
                className={`historias-vinil ${indice === ativa ? "" : "historias-vinil--saindo"}`}
                aria-hidden="true"
              >
                <img
                  src={imagemNoTamanho(historias[indice].capa, 250)}
                  alt=""
                  className="historias-vinil-rotulo"
                  referrerPolicy="no-referrer"
                  onError={tratarErroImagem}
                />
              </div>
            ))}
          <div className="historias-capa">
            {historias.map((h, indice) => (
              <img
                key={h.artistaId}
                src={imagemNoTamanho(h.artista.foto, 1000)}
                alt={indice === ativa ? h.artista.nome : ""}
                className={`historias-foto ${
                  indice === ativa ? "ativa" : indice === saindo ? "saindo" : ""
                }`}
                // A atual e a próxima já ficam baixadas, para a troca não esperar a rede
                loading={indice === ativa || indice === (ativa + 1) % total ? "eager" : "lazy"}
                decoding="async"
                referrerPolicy="no-referrer"
                onError={tratarErroImagem}
              />
            ))}
            <span className="historias-contador" aria-hidden="true">
              {doisDigitos(ativa + 1)}
              <small>/{doisDigitos(total)}</small>
            </span>
          </div>
        </div>

        <div
          key={`texto-${historia.artistaId}`}
          className="historias-texto"
          style={{ "--direcao": direcao }}
          aria-live={rodando ? "off" : "polite"}
        >
          <p className="historias-meta">
            <span>{historia.vertente}</span>
            <span>Leitura de {historia.leitura} min</span>
          </p>
          <h2 className="historias-manchete">{historia.manchete}</h2>
          <p className="historias-linha-fina">{historia.linhaFina}</p>
          <p className="historias-fato">
            <b>{historia.artista.nome}</b>
            {historia.fato}
          </p>
          <Link className="historias-ler" to={`/artista/${historia.artistaId}?aba=historia`} viewTransition>
            Ler a história de {historia.artista.nome}
          </Link>
        </div>

        <div className="historias-setas">
          {!semAutoplay && (
            <button
              type="button"
              onClick={() => setPausadoNoBotao((p) => !p)}
              aria-label={pausadoNoBotao ? "Continuar histórias" : "Pausar histórias"}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d={pausadoNoBotao ? "M8 5l11 7-11 7z" : "M9 5v14M15 5v14"} />
              </svg>
            </button>
          )}
          <button type="button" onClick={anterior} aria-label="História anterior">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
          </button>
          <button type="button" onClick={proxima} aria-label="Próxima história">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>

      {/* Tira de miniaturas: escolhe a história e mostra o tempo até a próxima */}
      <div className="historias-tira" ref={tiraRef} role="tablist" aria-label="Escolher história">
        {historias.map((h, indice) => (
          <button
            key={h.artistaId}
            type="button"
            role="tab"
            aria-selected={indice === ativa}
            className={`historias-miniatura ${indice === ativa ? "ativa" : ""}`}
            onClick={() => irPara(indice)}
          >
            <img
              src={imagemNoTamanho(h.capa, 250)}
              alt=""
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={tratarErroImagem}
            />
            <span className="historias-miniatura-texto">
              <small>{doisDigitos(indice + 1)}</small>
              {h.artista.nome}
            </span>
            {indice === ativa && (
              <span
                key={`progresso-${historia.artistaId}`}
                className="historias-progresso"
                onAnimationEnd={() => irPara(ativa + 1, 1)}
                aria-hidden="true"
              />
            )}
          </button>
        ))}
      </div>

      {/* Pista do easter egg do 45 RPM (ver RotacaoSecreta em Aplicativo.jsx); o CSS troca o número */}
      <p className="historias-rotacao">
        <span className="historias-rotacao-33">Este acervo gira a 33⅓ rpm. O teclado sabe trocar a rotação.</span>
        <span className="historias-rotacao-45">Girando a 45 rpm, como o Matheus queria.</span>
      </p>
    </section>
  );
}
