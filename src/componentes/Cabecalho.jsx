import { Logotipo } from "./Logotipo";
import { useUsuario } from "../contextos/ContextoUsuario";

// Cabecalho com navegacao, botao de colecao e area de login/usuario
export function Cabecalho({
  aoIrParaInicio,
  aoClicarDescobrir,
  aoClicarArtistas,
  aoClicarAlbuns,
  aoClicarColecao,
  aoClicarEntrar,
}) {
  const { estaLogado, usuarioLogado, sairDaConta } = useUsuario();

  return (
    <header className="site-header">
      <Logotipo aoClicar={aoIrParaInicio} />
      <nav aria-label="Navegação principal">
        <button onClick={aoClicarDescobrir}>Descobrir</button>
        <button onClick={aoClicarArtistas}>Artistas</button>
        <button onClick={aoClicarAlbuns}>Álbuns</button>
      </nav>
      <div className="header-actions">
        <button className="collection-button" onClick={aoClicarColecao}>
          Coleção
        </button>
        {estaLogado ? (
          <div className="usuario-logado">
            <span className="nome-usuario">{usuarioLogado.nome}</span>
            <button className="outline-button" onClick={sairDaConta}>
              Sair
            </button>
          </div>
        ) : (
          <button className="outline-button" onClick={aoClicarEntrar}>
            Entrar
          </button>
        )}
      </div>
    </header>
  );
}
