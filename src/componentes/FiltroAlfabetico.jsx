// Componente unificado de filtro alfabético brutalista
export function FiltroAlfabetico({
  letrasDisponiveis = [],
  letraAtiva = "TODOS",
  aoSelecionarLetra,
  classeContainer = "artistas-letras-bloco",
}) {
  return (
    <div className={classeContainer}>
      <button
        type="button"
        className={`letra-reta-btn ${letraAtiva === "TODOS" ? "ativo" : ""}`}
        onClick={() => aoSelecionarLetra("TODOS")}
      >
        TODOS
      </button>
      {letrasDisponiveis.map((letra) => (
        <button
          type="button"
          key={letra}
          className={`letra-reta-btn ${letraAtiva === letra ? "ativo" : ""}`}
          onClick={() => aoSelecionarLetra(letra)}
        >
          {letra}
        </button>
      ))}
    </div>
  );
}
