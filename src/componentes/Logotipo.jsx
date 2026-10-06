// Componente do logotipo e marca da aplicação
export function Logotipo({ aoClicar }) {
  return (
    <button className="brand" onClick={aoClicar} aria-label="RPM — Página inicial">
      <img src="/assets/rpm-mark.svg" alt="Logotipo RPM" />
      <span>RPM</span>
    </button>
  );
}
