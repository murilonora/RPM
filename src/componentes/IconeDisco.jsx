// Desenho de um disco de vinil (corpo escuro, sulcos e rótulo vermelho e branco).
// É o ícone de cada botão do SeletorDeNota; o CSS deixa cinza quando apagado e acende na nota.
export function IconeDisco() {
  return (
    <svg 
      viewBox="0 0 100 100" 
      className="w-full h-full"
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Corpo principal do disco de vinil (Escuro) */}
      <circle cx="50" cy="50" r="46" fill="#18181b" />
      
      {/* Ranhuras do vinil (Efeito de relevo) */}
      <circle cx="50" cy="50" r="38" stroke="#27272a" strokeWidth="1.5" />
      <circle cx="50" cy="50" r="30" stroke="#27272a" strokeWidth="1.5" strokeDasharray="6 3" />
      <circle cx="50" cy="50" r="24" stroke="#27272a" strokeWidth="1" />

      {/* Rótulo Central (Vermelho e Branco, simulando o alvo do RPM) */}
      <circle cx="50" cy="50" r="16" fill="#f43f5e" /> {/* Vermelho */}
      <circle cx="50" cy="50" r="11" fill="#ffffff" /> {/* Branco */}
      <circle cx="50" cy="50" r="7" fill="#f43f5e" />  {/* Centro Vermelho */}
      <circle cx="50" cy="50" r="2" fill="#18181b" />  {/* Furo central do disco */}
    </svg>
  );
}