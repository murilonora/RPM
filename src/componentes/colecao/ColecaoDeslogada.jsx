import { Link } from "react-router-dom";

// Coleção sem login: convite para entrar, com o mascote Vinil Triste
export function ColecaoDeslogada({ aoAbrirLogin }) {
  return (
    <main className="colecao-brutal-root">
      <section className="colecao-deslogado" aria-labelledby="colecao-deslogado-titulo">
        <div className="colecao-deslogado-texto">
          <h1 id="colecao-deslogado-titulo" className="colecao-deslogado-titulo">
            Sua estante ainda está vazia.
          </h1>
          <p className="colecao-deslogado-sub">
            Entre na sua conta para guardar os discos que você ouviu, dar notas em vinil e
            escrever o que achou de cada um.
          </p>

          <div className="colecao-deslogado-acoes">
            <button type="button" className="colecao-deslogado-cta" onClick={aoAbrirLogin}>
              Entrar ou criar conta
            </button>
            <Link to="/albuns" className="colecao-deslogado-link">
              Explorar os discos
            </Link>
          </div>

          <ul className="colecao-deslogado-lista">
            <li>Dê de 1 a 5 vinis para álbuns e faixas</li>
            <li>Escreva resenhas curtas ou longas</li>
            <li>Escolha o seu Disco de Ouro</li>
          </ul>
        </div>

        <img
          src="/assets/vinil-triste.webp"
          alt=""
          aria-hidden="true"
          className="colecao-deslogado-mascote"
        />
      </section>
    </main>
  );
}
