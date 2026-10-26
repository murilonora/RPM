import { Link } from "react-router-dom";

// Componente do logotipo e marca da aplicação
export function Logotipo() {
  return (
    <Link to="/" className="brand" aria-label="RPM — Página inicial">
      <img src="/assets/rpm-mark.svg" alt="" />
      <span>RPM</span>
    </Link>
  );
}
