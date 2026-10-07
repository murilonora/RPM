import { useState } from "react";
import { useUsuario } from "../contextos/ContextoUsuario";

// SVG de um disco de vinil individual
function IconeVinil({ preenchido, destacado }) {
  const corDisco = preenchido ? "#ff0004" : destacado ? "rgba(255,0,4,0.5)" : "#3a3a3a";
  const corSulco = preenchido ? "#cc0003" : "#2a2a2a";
  const corLabel = preenchido ? "#f7f4ed" : "#444";
  const corFuro = preenchido ? "#191525" : "#1a1a1a";

  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      className={`icone-vinil ${preenchido ? "preenchido" : ""} ${destacado ? "destacado" : ""}`}
    >
      <circle cx="14" cy="14" r="13" fill={corDisco} stroke="#555" strokeWidth="0.5" />
      <circle cx="14" cy="14" r="10.5" fill="none" stroke={corSulco} strokeWidth="0.4" />
      <circle cx="14" cy="14" r="8.5" fill="none" stroke={corSulco} strokeWidth="0.3" />
      <circle cx="14" cy="14" r="6.5" fill="none" stroke={corSulco} strokeWidth="0.3" />
      <circle cx="14" cy="14" r="4.5" fill={corLabel} />
      <circle cx="14" cy="14" r="1.5" fill={corFuro} />
    </svg>
  );
}

// Componente reutilizavel de avaliacao com 1 a 5 discos de vinil
export function AvaliacaoVinil({ chaveItem, tamanho = "normal", apenasLeitura = false }) {
  const { estaLogado, obterAvaliacao, avaliarItem } = useUsuario();
  const [notaHover, setNotaHover] = useState(0);
  const avaliacaoAtual = obterAvaliacao(chaveItem);
  const notaAtual = avaliacaoAtual.nota || 0;

  function aoClicarNota(nota) {
    if (!estaLogado || apenasLeitura) return;
    // Se clicar na mesma nota ja dada, remove a avaliacao (toggle)
    avaliarItem(chaveItem, nota === notaAtual ? 0 : nota, avaliacaoAtual.comentario);
  }

  return (
    <div className={`avaliacao-vinil ${tamanho}`} onMouseLeave={() => setNotaHover(0)}>
      {[1, 2, 3, 4, 5].map((nota) => (
        <button
          key={nota}
          className="botao-vinil"
          onClick={(evento) => {
            evento.stopPropagation();
            aoClicarNota(nota);
          }}
          onMouseEnter={() => !apenasLeitura && estaLogado && setNotaHover(nota)}
          title={estaLogado ? `${nota} vinil${nota > 1 ? "s" : ""}` : "Faca login para avaliar"}
          disabled={!estaLogado || apenasLeitura}
        >
          <IconeVinil
            preenchido={nota <= (notaHover || notaAtual)}
            destacado={notaHover > 0 && nota <= notaHover && nota > notaAtual}
          />
        </button>
      ))}
      {notaAtual > 0 && <span className="nota-texto">{notaAtual}/5</span>}
    </div>
  );
}
