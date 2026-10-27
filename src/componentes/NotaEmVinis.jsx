// Exibe uma nota de 0 a 5 em discos de vinil (só leitura), como nas fichas da Coleção.
// Para o usuário dar a nota, o componente é o SeletorDeNota.

// Um disco: vermelho quando faz parte da nota, cinza quando não
function IconeVinil({ preenchido }) {
  const corDisco = preenchido ? "#ff0004" : "#3a3a3a";
  const corSulco = preenchido ? "#cc0003" : "#2a2a2a";
  const corLabel = preenchido ? "#f7f4ed" : "#444";
  const corFuro = preenchido ? "#191525" : "#1a1a1a";

  return (
    <svg width="20" height="20" viewBox="0 0 28 28" className="icone-vinil" aria-hidden="true">
      <circle cx="14" cy="14" r="13" fill={corDisco} stroke="#555" strokeWidth="0.5" />
      <circle cx="14" cy="14" r="10.5" fill="none" stroke={corSulco} strokeWidth="0.4" />
      <circle cx="14" cy="14" r="8.5" fill="none" stroke={corSulco} strokeWidth="0.3" />
      <circle cx="14" cy="14" r="6.5" fill="none" stroke={corSulco} strokeWidth="0.3" />
      <circle cx="14" cy="14" r="4.5" fill={corLabel} />
      <circle cx="14" cy="14" r="1.5" fill={corFuro} />
    </svg>
  );
}

// Cinco discos lado a lado (os da nota acesos) e o texto "x/5" à direita
export function NotaEmVinis({ nota = 0 }) {
  return (
    <div className="avaliacao-vinil" role="img" aria-label={`Nota ${nota} de 5`}>
      {[1, 2, 3, 4, 5].map((posicao) => (
        <IconeVinil key={posicao} preenchido={posicao <= nota} />
      ))}
      {nota > 0 && <span className="nota-texto">{nota}/5</span>}
    </div>
  );
}
