import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Logotipo } from "./Logotipo";
import { useUsuario } from "../contextos/ContextoUsuario";

// NavLink já marca a rota atual com a classe "active" e aria-current="page"
const classeDoLink = ({ isActive }) => (isActive ? "active" : "");

// Cabecalho com navegacao, botao de colecao e area de login/usuario.
// Abaixo de 980px a navegação vai para um painel aberto pelo botão "Menu".
export function Cabecalho({ aoClicarDescobrir, aoClicarEntrar }) {
  const { estaLogado, usuarioLogado, sairDaConta } = useUsuario();
  const { pathname } = useLocation();
  const [menuAberto, setMenuAberto] = useState(false);

  // Fecha o menu ao trocar de página
  useEffect(() => {
    setMenuAberto(false);
  }, [pathname]);

  // Esc fecha o menu
  useEffect(() => {
    if (!menuAberto) return;
    function aoTeclar(evento) {
      if (evento.key === "Escape") setMenuAberto(false);
    }
    document.addEventListener("keydown", aoTeclar);
    return () => document.removeEventListener("keydown", aoTeclar);
  }, [menuAberto]);

  function descobrir() {
    setMenuAberto(false);
    aoClicarDescobrir();
  }

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
        <button
          type="button"
          className="menu-celular-botao"
          aria-expanded={menuAberto}
          aria-controls="menu-celular"
          onClick={() => setMenuAberto((aberto) => !aberto)}
        >
          {menuAberto ? "Fechar" : "Menu"}
        </button>
      </div>

      {menuAberto && (
        <nav id="menu-celular" className="menu-celular" aria-label="Navegação">
          <NavLink to="/" end className={classeDoLink}>
            Início
          </NavLink>
          <NavLink to="/artistas" className={classeDoLink}>
            Artistas
          </NavLink>
          <NavLink to="/albuns" className={classeDoLink}>
            Álbuns
          </NavLink>
          <NavLink to="/colecao" className={classeDoLink}>
            Minha coleção
          </NavLink>
          <button type="button" onClick={descobrir}>
            Descobrir um artista
          </button>
          {estaLogado && <p className="menu-celular-usuario">Conectado como {usuarioLogado.nome}</p>}
        </nav>
      )}
    </header>
  );
}
