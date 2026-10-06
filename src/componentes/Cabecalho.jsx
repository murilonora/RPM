import { Logotipo } from "./Logotipo";

// Cabeçalho simplificado (sem Linha do Tempo)
export function Cabecalho({
  aoIrParaInicio,
  aoClicarDescobrir,
  aoClicarArtistas,
  aoClicarAlbuns
}) {
  return (
    <header className="site-header">
      <Logotipo aoClicar={aoIrParaInicio} />
      <nav aria-label="Navegação principal">
        <button onClick={aoClicarDescobrir}>Descobrir</button>
        <button onClick={aoClicarArtistas}>Artistas</button>
        <button onClick={aoClicarAlbuns}>Álbuns</button>
      </nav>
      <div className="header-actions">
        <button className="collection-button">Coleção</button>
        <button className="outline-button">Entrar</button>
      </div>
    </header>
  );
}
