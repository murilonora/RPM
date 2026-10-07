import { useState } from "react";
import { useUsuario } from "../contextos/ContextoUsuario";

// Modal de cadastro e login do critico musical
export function ModalAutenticacao({ visivel, aoFechar }) {
  const { registrarUsuario, entrarComEmail } = useUsuario();
  const [modoAtivo, setModoAtivo] = useState("entrar");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [erro, setErro] = useState("");

  if (!visivel) return null;

  function aoSubmeterFormulario(evento) {
    evento.preventDefault();
    setErro("");

    if (modoAtivo === "cadastrar") {
      if (!nome.trim() || !email.trim()) {
        setErro("Preencha todos os campos.");
        return;
      }
      registrarUsuario(nome.trim(), email.trim());
      limparEFechar();
    } else {
      if (!email.trim()) {
        setErro("Informe seu e-mail.");
        return;
      }
      const usuario = entrarComEmail(email.trim());
      if (!usuario) {
        setErro("E-mail nao encontrado. Cadastre-se primeiro.");
        return;
      }
      limparEFechar();
    }
  }

  function limparEFechar() {
    setNome("");
    setEmail("");
    setErro("");
    aoFechar();
  }

  return (
    <div className="modal-overlay" onClick={limparEFechar}>
      <div className="modal-conteudo" onClick={(evento) => evento.stopPropagation()}>
        <button className="modal-fechar" onClick={limparEFechar} aria-label="Fechar modal">
          ✕
        </button>

        <h2 className="modal-titulo">
          {modoAtivo === "entrar" ? "Entrar na sua conta" : "Criar conta de critico"}
        </h2>

        <div className="modal-abas">
          <button
            className={modoAtivo === "entrar" ? "ativa" : ""}
            onClick={() => {
              setModoAtivo("entrar");
              setErro("");
            }}
          >
            Entrar
          </button>
          <button
            className={modoAtivo === "cadastrar" ? "ativa" : ""}
            onClick={() => {
              setModoAtivo("cadastrar");
              setErro("");
            }}
          >
            Cadastrar
          </button>
        </div>

        <form onSubmit={aoSubmeterFormulario} className="modal-formulario">
          {modoAtivo === "cadastrar" && (
            <div className="campo-formulario">
              <label htmlFor="campo-nome">Nome do Critico</label>
              <input
                id="campo-nome"
                type="text"
                placeholder="Ex: Murilo Nora"
                value={nome}
                onChange={(evento) => setNome(evento.target.value)}
              />
            </div>
          )}

          <div className="campo-formulario">
            <label htmlFor="campo-email">E-mail</label>
            <input
              id="campo-email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(evento) => setEmail(evento.target.value)}
            />
          </div>

          {erro && <p className="modal-erro">{erro}</p>}

          <button type="submit" className="botao-principal">
            {modoAtivo === "entrar" ? "Entrar" : "Criar Conta"}
          </button>
        </form>
      </div>
    </div>
  );
}
