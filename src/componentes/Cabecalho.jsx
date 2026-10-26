import { NavLink } from "react-router-dom";
import { Logotipo } from "./Logotipo";
import { useUsuario } from "../contextos/ContextoUsuario";

// NavLink já marca a rota atual com a classe "active" e aria-current="page"
const classeDoLink = ({ isActive }) => (isActive ? "active" : "");

// Cabecalho com navegacao, botao de colecao e area de login/usuario
export function Cabecalho({ aoClicarDescobrir, aoClicarEntrar }) {
  const { estaLogado, usuarioLogado, sairDaConta } = useUsuario();

  return (
    <header className="site-header">
      <Logotipo />
      <nav aria-label="Navegação principal">
        <button
          type="button"
          onClick={aoClicarDescobrir}
          title="Sortear um artista aleatório do catálogo"
        >
          Descobrir
        </button>
        <NavLink to="/artistas" className={classeDoLink}>
          Artistas
        </NavLink>
        <NavLink to="/albuns" className={classeDoLink}>
          Álbuns
        </NavLink>
      </nav>
      <div className="header-actions">
        <NavLink
          to="/colecao"
          className={({ isActive }) => `collection-button ${isActive ? "active" : ""}`}
        >
          Coleção
        </NavLink>
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
