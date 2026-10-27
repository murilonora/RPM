import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { listaDeArtistas } from "../dados/dadosMusicais";
import { imagemNoTamanho, tratarErroImagem } from "../utilitarios/comuns";

const DURACAO_SLIDE_MS = 9000;
const DISTANCIA_SWIPE_PX = 50;

// Cada história é um disco: a foto do artista faz o papel da capa e o vinil
// (com a capa do álbum no rótulo) desliza para fora dela a cada troca.
const HISTORIAS = [
  {
    artistaId: "racionais-mcs",
    album: "Sobrevivendo no Inferno",
    vertente: "Rap nacional",
    manchete: "Sobrevivendo no Inferno, a bíblia do rap brasileiro",
    linhaFina:
      "Da periferia de São Paulo para a lista de leituras da Unicamp: a trajetória, as letras e o impacto do grupo que deu voz à quebrada.",
    fato: "1,5 milhão de cópias vendidas de forma independente",
    leitura: 10,
  },
  {
    artistaId: "sabotage",
    album: "Rap e Compromisso",
    vertente: "Rap nacional",
    manchete: "O Maestro do Canão e o disco que bastou",
    linhaFina:
      "Um único álbum lançado em vida foi suficiente para mudar a métrica, o vocabulário e o sotaque do rap paulistano.",
    fato: "Rap é Compromisso, de 2000, o único disco lançado em vida",
    leitura: 8,
  },
  {
    artistaId: "emicida",
    album: "AmarElo",
    vertente: "Rap e MPB",
    manchete: "AmarElo: quando o rap pediu licença ao samba",
    linhaFina:
      "Do Theatro Municipal ao documentário, o disco que costurou Belchior, Pabllo Vittar e Zeca Pagodinho numa mesma ideia de Brasil.",
    fato: "O show no Theatro Municipal virou documentário em 2020",
    leitura: 9,
  },
  {
    artistaId: "chico-buarque",
    album: "Construcao",
    vertente: "MPB",
    manchete: "Construção: um operário em versos proparoxítonos",
    linhaFina:
      "Em plena ditadura, Chico Buarque fechou cada verso numa proparoxítona e transformou a rotina de um trabalhador num retrato duro do país.",
    fato: "Lançado em 1971, no auge da censura",
    leitura: 7,
  },
  {
    artistaId: "legiao-urbana",
    album: "Dois",
    vertente: "Rock nacional",
    manchete: "Dois: o disco que fez Brasília falar pelo país",
    linhaFina:
      "Eduardo e Mônica, Tempo Perdido e Índios saíram do mesmo vinil de 1986 e viraram a trilha de uma geração inteira.",
    fato: "Três clássicos da banda no mesmo lado do vinil",
    leitura: 8,
  },
]
  .map((historia) => {
    const artista = listaDeArtistas.find((a) => a.id === historia.artistaId);
    if (!artista) return null;
    const album = artista.albuns.find((a) => a.titulo === historia.album);
    return { ...historia, artista, capa: album?.capa || artista.foto, ano: album?.ano };
  })
  .filter(Boolean);

const doisDigitos = (n) => String(n).padStart(2, "0");

function prefereMenosMovimento() {
  return typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
}

// Carrossel editorial da página inicial. Avança sozinho (a barra de progresso
// da miniatura ativa é quem dispara a troca), pausa com o mouse em cima, com o
// foco do teclado dentro dele ou com a aba escondida, e aceita setas e swipe.
export function HistoriasEmDestaque() {
  const [ativa, setAtiva] = useState(0);
  const [pausado, setPausado] = useState(false);
  const [direcao, setDirecao] = useState(1);
  const [semAutoplay] = useState(prefereMenosMovimento);
  const inicioToque = useRef(null);
  const tiraRef = useRef(null);
  const total = HISTORIAS.length;

  const irPara = useCallback(
    (indice, sentido) => {
      const proximo = (indice + total) % total;
      setDirecao(sentido ?? (proximo > ativa ? 1 : -1));
      setAtiva(proximo);
    },
    [ativa, total]
  );
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

  const historia = HISTORIAS[ativa];
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
        <span className="edition">Edição especial: cinco discos, cinco histórias</span>
      </div>

      <div className="historias-palco">
        {/* Foto do artista como capa do disco, com o vinil saindo dela */}
        <div className="historias-disco">
          <div
            key={`vinil-${ativa}`}
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
            {HISTORIAS.map((h, indice) => (
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
          key={`texto-${ativa}`}
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
          <Link className="historias-ler" to={`/artista/${historia.artistaId}`}>
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
        {HISTORIAS.map((h, indice) => (
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
                key={`progresso-${ativa}`}
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
