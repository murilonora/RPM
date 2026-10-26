// ==========================================
// EFEITOS SONOROS TÁTEIS - WEB AUDIO API
// ==========================================

let contextoAudio = null;

function obterContextoAudio() {
  if (typeof window === "undefined") return null;
  if (!contextoAudio) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      contextoAudio = new AudioContextClass();
    }
  }
  if (contextoAudio && contextoAudio.state === "suspended") {
    contextoAudio.resume();
  }
  return contextoAudio;
}

/**
 * Toca um clique sutil de agulha de vinil mecânica ao interagir com notas e discos.
 */
export function tocarCliqueVinil() {
  try {
    const ctx = obterContextoAudio();
    if (!ctx) return;

    const agora = ctx.currentTime;

    // 1. Estalo de ruído de agulha física (pop)
    const duracao = 0.04;
    const bufferTamanho = ctx.sampleRate * duracao;
    const buffer = ctx.createBuffer(1, bufferTamanho, ctx.sampleRate);
    const dados = buffer.getChannelData(0);

    for (let i = 0; i < bufferTamanho; i++) {
      // Ruído decrescente com textura analógica
      dados[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferTamanho * 0.2));
    }

    const fonteRuido = ctx.createBufferSource();
    fonteRuido.buffer = buffer;

    // Filtro passa-faixa para simular resposta de frequência de toca-discos
    const filtro = ctx.createBiquadFilter();
    filtro.type = "bandpass";
    filtro.frequency.setValueAtTime(1400, agora);
    filtro.Q.setValueAtTime(3.0, agora);

    // Ganho suave para não incomodar
    const ganho = ctx.createGain();
    ganho.gain.setValueAtTime(0.18, agora);
    ganho.gain.exponentialRampToValueAtTime(0.001, agora + duracao);

    fonteRuido.connect(filtro);
    filtro.connect(ganho);
    ganho.connect(ctx.destination);

    fonteRuido.start(agora);

    // 2. Tom grave seco do impacto da agulha no sulco (thump de 60Hz)
    const oscilador = ctx.createOscillator();
    const ganhoGrave = ctx.createGain();

    oscilador.type = "sine";
    oscilador.frequency.setValueAtTime(95, agora);
    oscilador.frequency.exponentialRampToValueAtTime(40, agora + 0.05);

    ganhoGrave.gain.setValueAtTime(0.22, agora);
    ganhoGrave.gain.exponentialRampToValueAtTime(0.001, agora + 0.05);

    oscilador.connect(ganhoGrave);
    ganhoGrave.connect(ctx.destination);

    oscilador.start(agora);
    oscilador.stop(agora + 0.06);
  } catch (err) {
    // Falha silenciosa em navegadores com restrições estritas de áudio
  }
}
