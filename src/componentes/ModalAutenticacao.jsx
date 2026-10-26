import { cloneElement, useState } from "react";
import { useUsuario } from "../contextos/ContextoUsuario";

const SEM_ERROS = {};

// Modal de cadastro e login do critico musical.
// O cadastro é validado pelo backend (POST /api/usuarios); as mensagens de erro
// voltam por campo e aparecem embaixo de cada um.
export function ModalAutenticacao({ visivel, aoFechar }) {
  const { registrarUsuario, entrarComEmail, statusServidor } = useUsuario();
  const [modoAtivo, setModoAtivo] = useState("entrar");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erros, setErros] = useState(SEM_ERROS);
  const [enviando, setEnviando] = useState(false);

  if (!visivel) return null;

  const cadastrando = modoAtivo === "cadastrar";

  async function aoSubmeterFormulario(evento) {
    evento.preventDefault();
    if (enviando) return;

    // Campos vazios são avisados aqui mesmo, sem ir ao servidor
    const faltando = {};
    if (cadastrando && !nome.trim()) faltando.nome = "Informe seu nome.";
    if (!email.trim()) faltando.email = "Informe seu e-mail.";
    if (!senha) faltando.senha = "Informe sua senha.";
    if (Object.keys(faltando).length) {
      setErros(faltando);
      return;
    }

    setEnviando(true);
    setErros(SEM_ERROS);
    try {
      if (cadastrando) await registrarUsuario(nome.trim(), email.trim(), senha);
      else await entrarComEmail(email.trim(), senha);
      limparEFechar();
    } catch (erro) {
      setErros(erro.campos || { geral: erro.message });
    } finally {
      setEnviando(false);
    }
  }

  function limparEFechar() {
    setNome("");
    setEmail("");
    setSenha("");
    setErros(SEM_ERROS);
    aoFechar();
  }

  function trocarModo(modo) {
    setModoAtivo(modo);
    setErros(SEM_ERROS);
  }

  // Erros de campos que o formulário não mostra (ex.: "erro" genérico do backend)
  const erroGeral = erros.geral || erros.erro;

  return (
    <div className="modal-overlay" onClick={limparEFechar}>
      <div
        className="modal-conteudo"
        role="dialog"
        aria-modal="true"
        aria-labelledby="autenticacao-titulo"
        onClick={(evento) => evento.stopPropagation()}
      >
        <button type="button" className="modal-fechar" onClick={limparEFechar} aria-label="Fechar modal">
          ✕
        </button>

        <h2 id="autenticacao-titulo" className="modal-titulo">
          {cadastrando ? "Criar conta de crítico" : "Entrar na sua conta"}
        </h2>

        <div className="modal-abas">
          <button type="button" className={!cadastrando ? "ativa" : ""} onClick={() => trocarModo("entrar")}>
            Entrar
          </button>
          <button type="button" className={cadastrando ? "ativa" : ""} onClick={() => trocarModo("cadastrar")}>
            Cadastrar
          </button>
        </div>

        <form onSubmit={aoSubmeterFormulario} className="modal-formulario" noValidate>
          {cadastrando && (
            <Campo id="campo-nome" rotulo="Nome do Crítico" erro={erros.nome}>
              <input
                id="campo-nome"
                type="text"
                placeholder="Ex: Murilo Nora"
                autoComplete="name"
                value={nome}
                onChange={(evento) => setNome(evento.target.value)}
              />
            </Campo>
          )}

          <Campo id="campo-email" rotulo="E-mail" erro={erros.email}>
            <input
              id="campo-email"
              type="email"
              placeholder="seu@email.com"
              autoComplete="email"
              value={email}
              onChange={(evento) => setEmail(evento.target.value)}
            />
          </Campo>

          <Campo
            id="campo-senha"
            rotulo="Senha"
            erro={erros.senha}
            dica={cadastrando ? "Mínimo de 8 caracteres." : undefined}
          >
            <input
              id="campo-senha"
              type="password"
              autoComplete={cadastrando ? "new-password" : "current-password"}
              value={senha}
              onChange={(evento) => setSenha(evento.target.value)}
            />
          </Campo>

          {erroGeral && <p className="modal-erro">{erroGeral}</p>}

          <button type="submit" className="botao-principal" disabled={enviando}>
            {enviando ? "Enviando..." : cadastrando ? "Criar Conta" : "Entrar"}
          </button>

          {statusServidor === "offline" && (
            <p className="modal-aviso-servidor">
              Servidor fora do ar: sua conta e suas notas ficam salvas neste navegador e são
              enviadas quando ele voltar.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

// Rótulo + campo + mensagem de erro ligada ao campo para leitores de tela
function Campo({ id, rotulo, erro, dica, children }) {
  const idMensagem = `${id}-mensagem`;
  return (
    <div className={`campo-formulario ${erro ? "com-erro" : ""}`}>
      <label htmlFor={id}>{rotulo}</label>
      {cloneElement(children, {
        "aria-invalid": erro ? true : undefined,
        "aria-describedby": erro || dica ? idMensagem : undefined,
      })}
      {(erro || dica) && (
        <small id={idMensagem} className={erro ? "campo-erro" : "campo-dica"}>
          {erro || dica}
        </small>
      )}
    </div>
  );
}
