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
  rotaAtual = "/",
}) {
  const { estaLogado, usuarioLogado, sairDaConta } = useUsuario();

  return (
    <header className="site-header">
      <Logotipo aoClicar={aoIrParaInicio} />
      <nav aria-label="Navegação principal">
        <button
          type="button"
          onClick={aoClicarDescobrir}
          title="Sortear um artista aleatório do catálogo"
        >
          Descobrir
        </button>
        <button
          type="button"
          className={rotaAtual === "/artistas" ? "active" : ""}
          onClick={aoClicarArtistas}
        >
          Artistas
        </button>
        <button
          type="button"
          className={rotaAtual === "/albuns" ? "active" : ""}
          onClick={aoClicarAlbuns}
        >
          Álbuns
        </button>
      </nav>
      <div className="header-actions">
        <button
          type="button"
          className={`collection-button ${rotaAtual === "/colecao" ? "active" : ""}`}
          onClick={aoClicarColecao}
        >
          Coleção
        </button>
        {estaLogado ? (
          <div className="usuario-logado">
            <span className="nome-usuario">{usuarioLogado.nome}</span>
            <button type="button" className="outline-button" onClick={sairDaConta}>
              Sair
            </button>
          </div>
        ) : (
          <button type="button" className="outline-button" onClick={aoClicarEntrar}>
            Entrar
          </button>
        )}
      </div>
    </header>
  );
}
