import { useCallback, useEffect, useRef, useState } from "react";

// Faixa bônus: homenagem ao Matheus Rocha, que teve a ideia do RPM e faz beats.
// Só se chega aqui buscando "Matheus Rocha" (ou pelo aviso do 45 RPM).
// A peça principal é uma MPC tocável; como não temos os beats dele, a bateria é
// sintetizada na hora com a Web Audio API, sem nenhum arquivo de áudio.

// Foto do Matheus (public/assets/matheus/), repetida nos 3 painéis do fundo
const FOTO_MATHEUS = "/assets/matheus/foto-1.jpg";
const PAINEIS = ["vermelho", "osso", "azul"];

const PASSOS = 16;
const BPM_MIN = 60;
const BPM_MAX = 160;

// 16 pads em 4 fileiras (de cima para baixo), cada um com a tecla que o dispara.
// "nivel" é quanto o medidor de volume sobe quando o pad toca.
const PADS = [
  { tecla: "u", nome: "Scratch", som: "scratch", nivel: 7 },
  { tecla: "i", nome: "Sirene", som: "sirene", nivel: 8 },
  { tecla: "o", nome: "Cowbell", som: "cowbell", nivel: 5 },
  { tecla: "p", nome: "Shaker", som: "shaker", nivel: 3 },
  { tecla: "q", nome: "808 Dó", som: "grave1", nivel: 9 },
  { tecla: "w", nome: "808 Mi", som: "grave2", nivel: 9 },
  { tecla: "e", nome: "808 Sol", som: "grave3", nivel: 9 },
  { tecla: "r", nome: "Prato", som: "prato", nivel: 6 },
  { tecla: "a", nome: "Chimbal", som: "chimbal", nivel: 3 },
  { tecla: "s", nome: "Chimbal aberto", som: "chimbalAberto", nivel: 4 },
  { tecla: "d", nome: "Tom grave", som: "tomGrave", nivel: 6 },
  { tecla: "f", nome: "Tom agudo", som: "tomAgudo", nivel: 5 },
  { tecla: "z", nome: "Bumbo", som: "bumbo", nivel: 10 },
  { tecla: "x", nome: "Caixa", som: "caixa", nivel: 8 },
  { tecla: "c", nome: "Palma", som: "palma", nivel: 7 },
  { tecla: "v", nome: "Aro", som: "aro", nivel: 4 },
];
const PAD_POR_SOM = Object.fromEntries(PADS.map((pad) => [pad.som, pad]));

// Padrões do sequenciador: em quais dos 16 passos cada som toca
const PADROES = {
  boombap: {
    nome: "Boom bap",
    bpm: 90,
    passos: { bumbo: [0, 7, 10], caixa: [4, 12], chimbal: [0, 2, 4, 6, 8, 10, 12, 14], grave1: [0, 10], aro: [15] },
  },
  funk: {
    nome: "Funk",
    bpm: 130,
    passos: { bumbo: [0, 3, 7, 10], palma: [4, 12], tomGrave: [6, 14], cowbell: [2, 8, 11], sirene: [0], grave2: [0, 7] },
  },
  trap: {
    nome: "Trap",
    bpm: 140,
    passos: {
      bumbo: [0, 10],
      palma: [8],
      caixa: [8],
      chimbal: [0, 2, 3, 4, 6, 8, 10, 11, 12, 13, 14, 15],
      chimbalAberto: [6],
      grave3: [0],
      grave1: [10],
    },
  },
};

// Bateria sintetizada: cada som é um oscilador ou ruído com envelope curto
function criarBateria() {
  const Contexto = window.AudioContext || window.webkitAudioContext;
  if (!Contexto) return null;
  const ctx = new Contexto();
  const saida = ctx.createGain();
  saida.gain.value = 0.7;
  saida.connect(ctx.destination);

  // 1 segundo de ruído branco, reaproveitado pelos sons de chiado
  const ruido = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
  const amostras = ruido.getChannelData(0);
  for (let i = 0; i < amostras.length; i++) amostras[i] = Math.random() * 2 - 1;

  // Envelope: sobe na hora e cai exponencialmente até sumir
  function envelope(inicio, volume, duracao) {
    const ganho = ctx.createGain();
    ganho.gain.setValueAtTime(volume, inicio);
    ganho.gain.exponentialRampToValueAtTime(0.001, inicio + duracao);
    ganho.connect(saida);
    return ganho;
  }

  // Oscilador com queda de frequência (bumbo, 808, toms, aro, cowbell)
  function tom(inicio, { tipo = "sine", de, para = de, volume, duracao }) {
    const osc = ctx.createOscillator();
    osc.type = tipo;
    osc.frequency.setValueAtTime(de, inicio);
    osc.frequency.exponentialRampToValueAtTime(para, inicio + duracao * 0.6);
    osc.connect(envelope(inicio, volume, duracao));
    osc.start(inicio);
    osc.stop(inicio + duracao);
    return osc;
  }

  // Ruído filtrado (caixa, chimbal, palma, prato, shaker, scratch)
  function chiado(inicio, { filtro, frequencia, ate, volume, duracao }) {
    const fonte = ctx.createBufferSource();
    fonte.buffer = ruido;
    const passa = ctx.createBiquadFilter();
    passa.type = filtro;
    passa.frequency.setValueAtTime(frequencia, inicio);
    if (ate) passa.frequency.exponentialRampToValueAtTime(ate, inicio + duracao);
    fonte.connect(passa);
    passa.connect(envelope(inicio, volume, duracao));
    fonte.start(inicio);
    fonte.stop(inicio + duracao);
  }

  // 808: senoide grave e longa na nota pedida
  const grave = (t, nota) => tom(t, { de: nota * 1.4, para: nota, volume: 0.9, duracao: 0.9 });

  const sons = {
    bumbo: (t) => tom(t, { de: 150, para: 45, volume: 1, duracao: 0.4 }),
    grave1: (t) => grave(t, 65.4),
    grave2: (t) => grave(t, 82.4),
    grave3: (t) => grave(t, 98),
    tomGrave: (t) => tom(t, { de: 180, para: 90, volume: 0.6, duracao: 0.35 }),
    tomAgudo: (t) => tom(t, { de: 320, para: 170, volume: 0.5, duracao: 0.25 }),
    aro: (t) => tom(t, { tipo: "square", de: 1200, para: 800, volume: 0.15, duracao: 0.04 }),
    cowbell: (t) => {
      tom(t, { tipo: "square", de: 540, volume: 0.12, duracao: 0.25 });
      tom(t, { tipo: "square", de: 800, volume: 0.12, duracao: 0.25 });
    },
    caixa: (t) => {
      chiado(t, { filtro: "highpass", frequencia: 1200, volume: 0.6, duracao: 0.2 });
      tom(t, { tipo: "triangle", de: 200, para: 160, volume: 0.4, duracao: 0.1 });
    },
    chimbal: (t) => chiado(t, { filtro: "highpass", frequencia: 7000, volume: 0.25, duracao: 0.05 }),
    chimbalAberto: (t) => chiado(t, { filtro: "highpass", frequencia: 7000, volume: 0.22, duracao: 0.35 }),
    shaker: (t) => chiado(t, { filtro: "bandpass", frequencia: 6000, volume: 0.3, duracao: 0.08 }),
    prato: (t) => chiado(t, { filtro: "highpass", frequencia: 5000, volume: 0.25, duracao: 0.9 }),
    palma: (t) => {
      for (const atraso of [0, 0.012, 0.024]) {
        chiado(t + atraso, { filtro: "bandpass", frequencia: 1500, volume: 0.5, duracao: 0.12 });
      }
    },
    // Scratch: ruído com filtro varrendo para cima e para baixo, como o disco indo e voltando
    scratch: (t) => {
      chiado(t, { filtro: "bandpass", frequencia: 400, ate: 3000, volume: 0.6, duracao: 0.09 });
      chiado(t + 0.1, { filtro: "bandpass", frequencia: 3000, ate: 500, volume: 0.6, duracao: 0.12 });
    },
    // Sirene do funk: dente de serra subindo e descendo
    sirene: (t) => {
      const osc = ctx.createOscillator();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(600, t);
      osc.frequency.linearRampToValueAtTime(1300, t + 0.4);
      osc.frequency.linearRampToValueAtTime(600, t + 0.8);
      const ganho = ctx.createGain();
      ganho.gain.setValueAtTime(0.08, t);
      ganho.gain.linearRampToValueAtTime(0.001, t + 0.85);
      osc.connect(ganho);
      ganho.connect(saida);
      osc.start(t);
      osc.stop(t + 0.85);
    },
  };

  return {
    tocar(som) {
      if (ctx.state === "suspended") ctx.resume();
      sons[som]?.(ctx.currentTime);
    },
    fechar: () => ctx.close(),
  };
}

export function PaginaFaixaBonus() {
  const palcoRef = useRef(null);
  const bateriaRef = useRef(null);
  // Pads acesos agora ({ som: id do toque }); o id muda a cada toque para reiniciar a onda
  const [acesos, setAcesos] = useState({});
  // Último toque: alimenta a tela e o medidor de volume
  const [ultimo, setUltimo] = useState({ pad: null, id: 0 });
  const [padrao, setPadrao] = useState("boombap");
  const [bpm, setBpm] = useState(PADROES.boombap.bpm);
  const [tocando, setTocando] = useState(false);
  const [passoAtual, setPassoAtual] = useState(-1);

  useEffect(() => {
    document.title = "Faixa bônus: Matheus Rocha // RPM";
    return () => bateriaRef.current?.fechar();
  }, []);

  // Cada batida forte faz um dos 3 painéis piscar (a classe sai e volta para reiniciar a animação)
  const pulsar = useCallback((forte) => {
    const palco = palcoRef.current;
    if (!palco) return;
    const classe = forte ? "bonus--soco" : "bonus--toque";
    palco.classList.remove(classe);
    void palco.offsetWidth;
    palco.classList.add(classe);
  }, []);

  // Toca um pad: som, luz e onda no pad, tela, medidor e pulso no fundo
  const tocarPad = useCallback(
    (pad) => {
      bateriaRef.current ??= criarBateria();
      bateriaRef.current?.tocar(pad.som);
      const id = Math.random();
      setAcesos((atual) => ({ ...atual, [pad.som]: id }));
      setTimeout(() => setAcesos((atual) => (atual[pad.som] === id ? { ...atual, [pad.som]: undefined } : atual)), 160);
      setUltimo({ pad, id });
      pulsar(pad.nivel >= 9);
    },
    [pulsar]
  );

  // Teclado do computador toca os pads (a tecla de cada um aparece no canto dele)
  useEffect(() => {
    function aoTeclar(evento) {
      if (evento.repeat || evento.ctrlKey || evento.metaKey || evento.altKey) return;
      if (["INPUT", "TEXTAREA"].includes(evento.target.tagName)) return;
      const pad = PADS.find((p) => p.tecla === evento.key.toLowerCase());
      if (!pad) return;
      evento.preventDefault();
      tocarPad(pad);
    }
    document.addEventListener("keydown", aoTeclar);
    return () => document.removeEventListener("keydown", aoTeclar);
  }, [tocarPad]);

  // Sequenciador: com o play ligado, anda um passo a cada semicolcheia no BPM escolhido
  useEffect(() => {
    if (!tocando) return;
    const { passos } = PADROES[padrao];
    let passo = 0;
    function avancar() {
      for (const [som, lista] of Object.entries(passos)) {
        if (lista.includes(passo)) tocarPad(PAD_POR_SOM[som]);
      }
      setPassoAtual(passo);
      passo = (passo + 1) % PASSOS;
    }
    avancar();
    const intervalo = setInterval(avancar, 60000 / bpm / 4);
    return () => {
      clearInterval(intervalo);
      setPassoAtual(-1);
    };
  }, [tocando, padrao, bpm, tocarPad]);

  // Troca o padrão e já ajusta o BPM para o andamento dele
  function escolherPadrao(chave) {
    setPadrao(chave);
    setBpm(PADROES[chave].bpm);
  }

  // Botões de BPM: sobe ou desce de 5 em 5 dentro dos limites
  const mudarBpm = (delta) => setBpm((atual) => Math.min(BPM_MAX, Math.max(BPM_MIN, atual + delta)));

  return (
    <main className="bonus" ref={palcoRef}>
      {/* Fundo: a mesma foto em 3 painéis, cada um num tom da paleta do RPM */}
      <div className="bonus-triptico" aria-hidden="true">
        {PAINEIS.map((tom) => (
          <div key={tom} className={`bonus-painel bonus-painel--${tom}`}>
            <img src={FOTO_MATHEUS} alt="" />
          </div>
        ))}
      </div>

      <section className="bonus-palco" aria-labelledby="bonus-titulo">
        <p className="bonus-etiqueta" id="bonus-titulo">
          Faixa bônus <span aria-hidden="true">/</span> Lado B <span aria-hidden="true">/</span> Matheus Rocha
        </p>

        {/* A MPC: tela, medidor, transporte, sequenciador e os 16 pads */}
        <div className="mpc" style={{ "--nivel": ultimo.pad?.nivel ?? 0 }}>
          <div className="mpc-topo">
            <span className="mpc-marca">
              RPM<b>-01</b>
            </span>
            <span className="mpc-modelo">Music Production Center</span>
            <span className={`mpc-led ${tocando ? "ligado" : ""}`} aria-hidden="true" />
          </div>

          <div className="mpc-painel">
            <div className="mpc-tela" aria-live="off">
              <div className="mpc-tela-linha">
                <span>{PADROES[padrao].nome.toUpperCase()}</span>
                <span>{String(bpm).padStart(3, "0")} BPM</span>
              </div>
              <div className="mpc-tela-pad">{ultimo.pad ? ultimo.pad.nome.toUpperCase() : "TOQUE UM PAD"}</div>
              <div className="mpc-tela-letreiro" aria-hidden="true">
                <span>
                  PRODUZIDO POR MATHEUS ROCHA · IDEALIZADOR DO RPM · VALEU PELA IDEIA ·&nbsp;
                </span>
                <span>
                  PRODUZIDO POR MATHEUS ROCHA · IDEALIZADOR DO RPM · VALEU PELA IDEIA ·&nbsp;
                </span>
              </div>
            </div>

            {/* Medidor de volume: sobe com a força do último pad e cai sozinho */}
            <div className="mpc-vu" aria-hidden="true">
              <span key={ultimo.id} className="mpc-vu-nivel" />
            </div>
          </div>

          <div className="mpc-controles">
            <div className="mpc-padroes" role="group" aria-label="Padrão do beat">
              {Object.entries(PADROES).map(([chave, { nome }]) => (
                <button
                  key={chave}
                  type="button"
                  className={padrao === chave ? "ativo" : ""}
                  aria-pressed={padrao === chave}
                  onClick={() => escolherPadrao(chave)}
                >
                  {nome}
                </button>
              ))}
            </div>
            <div className="mpc-bpm" role="group" aria-label="Andamento">
              <button type="button" onClick={() => mudarBpm(-5)} aria-label="Diminuir BPM">
                −
              </button>
              <button type="button" onClick={() => mudarBpm(5)} aria-label="Aumentar BPM">
                +
              </button>
            </div>
            <button
              type="button"
              className={`mpc-play ${tocando ? "ligado" : ""}`}
              onClick={() => setTocando((t) => !t)}
              aria-label={tocando ? "Parar o beat" : "Tocar o beat"}
            >
              {tocando ? "■" : "▶"}
            </button>
          </div>

          <div className="mpc-sequencia" aria-hidden="true">
            {Array.from({ length: PASSOS }, (_, i) => (
              <span key={i} className={i === passoAtual ? "ativo" : ""} />
            ))}
          </div>

          <div className="mpc-pads">
            {PADS.map((pad) => (
              <button
                key={pad.som}
                type="button"
                className={`mpc-pad ${acesos[pad.som] ? "aceso" : ""}`}
                aria-label={`${pad.nome} (tecla ${pad.tecla.toUpperCase()})`}
                onPointerDown={() => tocarPad(pad)}
                onKeyDown={(e) => {
                  if (e.key !== "Enter" && e.key !== " ") return;
                  e.preventDefault();
                  e.stopPropagation();
                  tocarPad(pad);
                }}
              >
                {acesos[pad.som] && <span key={acesos[pad.som]} className="mpc-pad-onda" aria-hidden="true" />}
                <kbd aria-hidden="true">{pad.tecla.toUpperCase()}</kbd>
                <span aria-hidden="true">{pad.nome}</span>
              </button>
            ))}
          </div>
        </div>

        <p className="bonus-dica">Clique nos pads ou toque pelo teclado. Escolha um padrão e aperte ▶.</p>
      </section>
    </main>
  );
}
