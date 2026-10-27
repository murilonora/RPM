import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { listaDeArtistas } from "../dados/dadosMusicais";
import { ACERVO_HISTORIAS } from "../dados/historias";
import { imagemNoTamanho, tratarErroImagem } from "../utilitarios/comuns";

const DURACAO_SLIDE_MS = 9000;
const DISTANCIA_SWIPE_PX = 50;
const QUANTIDADE_POR_VEZ = 5;

// Cada história é um disco: a foto do artista faz o papel da capa e o vinil
// (com a capa do álbum no rótulo) desliza para fora dela a cada troca.
const TODAS_HISTORIAS = ACERVO_HISTORIAS.map((historia) => {
  const artista = listaDeArtistas.find((a) => a.id === historia.artistaId);
  if (!artista) return null;
  const album = artista.albuns.find((a) => a.titulo === historia.album);
  return { ...historia, artista, capa: album?.capa || artista.foto, ano: album?.ano };
}).filter(Boolean);

// Fisher-Yates: sorteia histórias diferentes a cada visita (e a cada clique em "Outras histórias")
function sortearHistorias(quantidade = QUANTIDADE_POR_VEZ) {
  const copia = [...TODAS_HISTORIAS];
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

// Carrossel editorial da página inicial. Avança sozinho (a barra de progresso
// da miniatura ativa é quem dispara a troca), pausa com o mouse em cima, com o
// foco do teclado dentro dele ou com a aba escondida, e aceita setas e swipe.
export function HistoriasEmDestaque({ historiasIniciais }) {
  const [historias, setHistorias] = useState(() => historiasIniciais ?? sortearHistorias());
  const [ativa, setAtiva] = useState(0);
  const [pausado, setPausado] = useState(false);
  const [direcao, setDirecao] = useState(1);
  const [semAutoplay] = useState(prefereMenosMovimento);
  const inicioToque = useRef(null);
  const tiraRef = useRef(null);
  const total = historias.length;

  const irPara = useCallback(
    (indice, sentido) => {
      const proximo = (indice + total) % total;
      setDirecao(sentido ?? (proximo > ativa ? 1 : -1));
      setAtiva(proximo);
    },
    [ativa, total]
  );
  function sortearOutras() {
    setHistorias(sortearHistorias());
    setDirecao(1);
    setAtiva(0);
  }
  const proxima = () => irPara(ativa + 1, 1);
  const anterior = () => irPara(ativa - 1, -1);

  // No celular a tira rola de lado: mantém a miniatura ativa à vista sem mexer na página
  useEffect(() => {
    const tira = tiraRef.current;
    const miniatura = tira?.children[ativa];
    if (!miniatura || tira.scrollWidth <= tira.clientWidth) return;
    tira.scrollTo({ left: miniatura.offsetLeft - tira.offsetLeft - 20, behavior: "smooth" });
  }, [ativa]);

  useEffect(() => {
    const aoMudarVisibilidade = () => setPausado(document.hidden);
    document.addEventListener("visibilitychange", aoMudarVisibilidade);
    return () => document.removeEventListener("visibilitychange", aoMudarVisibilidade);
  }, []);

  function aoTeclar(evento) {
    if (evento.key === "ArrowRight") proxima();
    else if (evento.key === "ArrowLeft") anterior();
  }

  function aoSoltarToque(evento) {
    if (inicioToque.current === null) return;
    const deslocamento = evento.changedTouches[0].clientX - inicioToque.current;
    inicioToque.current = null;
    if (Math.abs(deslocamento) < DISTANCIA_SWIPE_PX) return;
    if (deslocamento < 0) proxima();
    else anterior();
  }

  const historia = historias[ativa];
  const rodando = !pausado && !semAutoplay;

  return (
    <section
      className={`historias ${rodando ? "" : "historias--pausado"}`}
      aria-roledescription="carrossel"
      aria-label="Histórias em destaque"
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      onFocus={() => setPausado(true)}
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
          <div
            key={`vinil-${historia.artistaId}`}
            className="historias-vinil"
            style={{ "--direcao": direcao }}
            aria-hidden="true"
          >
            <img
              src={imagemNoTamanho(historia.capa, 250)}
              alt=""
              className="historias-vinil-rotulo"
              referrerPolicy="no-referrer"
              onError={tratarErroImagem}
            />
          </div>
          <div className="historias-capa">
            {historias.map((h, indice) => (
              <img
                key={h.artistaId}
                src={imagemNoTamanho(h.artista.foto, 1000)}
                alt={indice === ativa ? h.artista.nome : ""}
                className={`historias-foto ${indice === ativa ? "ativa" : ""}`}
                loading={indice === 0 ? "eager" : "lazy"}
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
          <Link className="historias-ler" to={`/artista/${historia.artistaId}?aba=historia`}>
            Ler a história de {historia.artista.nome}
          </Link>
        </div>

        <div className="historias-setas">
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
    </section>
  );
}
