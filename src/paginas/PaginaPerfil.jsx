import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ErroApi, ServidorIndisponivel, atualizarPerfil, buscarPerfil } from "../servicos/api";
import { useUsuario } from "../contextos/ContextoUsuario";
import { CartaoCritica } from "../componentes/AbaCriticas";

const REDES = [
  { campo: "instagram", rotulo: "Instagram", exemplo: "https://instagram.com/seu-perfil" },
  { campo: "twitter", rotulo: "X / Twitter", exemplo: "https://x.com/seu-perfil" },
  { campo: "spotify", rotulo: "Spotify", exemplo: "https://open.spotify.com/user/..." },
];
const LIMITE_BIO = 500;

// Só mostra como link o que começa com https:// (o backend já recusa o resto; aqui é a segunda trava)
const linkSeguro = (url) => (typeof url === "string" && /^https:\/\/\S+$/.test(url) ? url : null);

// Perfil público de um crítico (/critico/:id): bio, redes e todas as notas que ele deu.
// Quem é o dono do perfil pode editar a bio e os links aqui mesmo.
export function PaginaPerfil({ aoAbrirLogin }) {
  const { id } = useParams();
  const { usuarioLogado } = useUsuario();
  // estado: "carregando" | "pronto" | "fora" | "inexistente" | "erro"
  const [{ estado, perfil }, setDados] = useState({ estado: "carregando", perfil: null });
  const [editando, setEditando] = useState(false);

  useEffect(() => {
    let ativo = true;
    setDados({ estado: "carregando", perfil: null });
    setEditando(false);
    buscarPerfil(id)
      .then((dados) => ativo && setDados({ estado: "pronto", perfil: dados }))
      .catch((erro) => {
        if (!ativo) return;
        if (erro instanceof ServidorIndisponivel) setDados({ estado: "fora", perfil: null });
        else if (erro instanceof ErroApi && (erro.status === 404 || erro.status === 400)) {
          setDados({ estado: "inexistente", perfil: null });
        } else setDados({ estado: "erro", perfil: null });
      });
    return () => {
      ativo = false;
    };
  }, [id]);

  useEffect(() => {
    document.title = perfil ? `${perfil.nome} // Críticos RPM` : "Perfil de crítico // RPM";
  }, [perfil]);

  if (estado !== "pronto") {
    const avisos = {
      carregando: "Carregando perfil…",
      fora: "Os perfis ficam no servidor, que está fora do ar agora. Tente de novo mais tarde.",
      inexistente: "Esse crítico não existe ou apagou a conta.",
      erro: "Não deu para abrir este perfil agora.",
    };
    return (
      <main className="perfil-pagina">
        <p className="perfil-aviso">{avisos[estado]}</p>
        {estado !== "carregando" && <Link to="/">Voltar ao início</Link>}
      </main>
    );
  }

  const ehDono = usuarioLogado?.idServidor != null && String(usuarioLogado.idServidor) === String(perfil.id);
  const avaliacoes = perfil.avaliacoes || [];
  const media = avaliacoes.length
    ? (avaliacoes.reduce((soma, a) => soma + a.nota, 0) / avaliacoes.length).toFixed(1)
    : null;
  const redes = REDES.map((r) => ({ ...r, url: linkSeguro(perfil[r.campo]) })).filter((r) => r.url);

  return (
    <main className="perfil-pagina">
      <section className="perfil-cabeca">
        <div className="perfil-identidade">
          <p className="eyebrow">Crítico do RPM</p>
          <h1>{perfil.nome}</h1>
          {perfil.bio ? (
            <p className="perfil-bio">{perfil.bio}</p>
          ) : (
            <p className="perfil-bio perfil-bio--vazia">
              {ehDono ? "Você ainda não escreveu sua bio." : "Este crítico ainda não escreveu uma bio."}
            </p>
          )}
          {redes.length > 0 && (
            <ul className="perfil-redes">
              {redes.map((rede) => (
                <li key={rede.campo}>
                  <a href={rede.url} target="_blank" rel="noopener noreferrer nofollow">
                    {rede.rotulo}
                  </a>
                </li>
              ))}
            </ul>
          )}
          {ehDono && !editando && (
            <button type="button" className="perfil-botao" onClick={() => setEditando(true)}>
              Editar perfil
            </button>
          )}
        </div>

        <dl className="perfil-numeros">
          <div>
            <dt>Avaliações</dt>
            <dd>{avaliacoes.length}</dd>
          </div>
          <div>
            <dt>Média</dt>
            <dd>{media ?? "—"}</dd>
          </div>
          <div>
            <dt>Resenhas</dt>
            <dd>{avaliacoes.filter((a) => a.texto).length}</dd>
          </div>
        </dl>
      </section>

      {ehDono && editando && (
        <FormularioPerfil
          perfil={perfil}
          aoSalvar={(atualizado) => {
            setDados({ estado: "pronto", perfil: { ...perfil, ...atualizado } });
            setEditando(false);
          }}
          aoCancelar={() => setEditando(false)}
          aoAbrirLogin={aoAbrirLogin}
        />
      )}

      <section className="perfil-avaliacoes">
        <h2>Notas e resenhas</h2>
        {avaliacoes.length === 0 ? (
          <p className="perfil-aviso">
            {ehDono ? "Suas notas aparecem aqui assim que chegam ao servidor." : "Nenhuma avaliação publicada ainda."}
          </p>
        ) : (
          <div className="criticas-lista">
            {avaliacoes.map((critica) => (
              <CartaoCritica key={`${critica.tipo}-${critica.id}`} critica={critica} mostrarArtista />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

// Edição da bio e das redes do próprio perfil (PUT /api/usuarios/me)
function FormularioPerfil({ perfil, aoSalvar, aoCancelar, aoAbrirLogin }) {
  const [valores, setValores] = useState({
    bio: perfil.bio || "",
    instagram: perfil.instagram || "",
    twitter: perfil.twitter || "",
    spotify: perfil.spotify || "",
  });
  const [erros, setErros] = useState({});
  const [salvando, setSalvando] = useState(false);

  const mudar = (campo) => (evento) => setValores((atuais) => ({ ...atuais, [campo]: evento.target.value }));

  async function aoEnviar(evento) {
    evento.preventDefault();
    if (salvando) return;
    setSalvando(true);
    setErros({});
    try {
      const atualizado = await atualizarPerfil({
        bio: valores.bio.trim(),
        instagram: valores.instagram.trim(),
        twitter: valores.twitter.trim(),
        spotify: valores.spotify.trim(),
      });
      aoSalvar(atualizado);
    } catch (erro) {
      if (erro instanceof ServidorIndisponivel) setErros({ geral: "Servidor fora do ar. Tente salvar de novo daqui a pouco." });
      else if (erro instanceof ErroApi && erro.status === 401) {
        setErros({ geral: "Sua sessão terminou. Entre de novo para salvar." });
        aoAbrirLogin?.();
      } else setErros(erro.campos && Object.keys(erro.campos).length ? erro.campos : { geral: erro.message });
    } finally {
      setSalvando(false);
    }
  }

  return (
    <form className="perfil-formulario" onSubmit={aoEnviar} noValidate>
      <h2>Editar perfil</h2>

      <div className={`campo-formulario ${erros.bio ? "com-erro" : ""}`}>
        <label htmlFor="perfil-bio">Bio</label>
        <textarea
          id="perfil-bio"
          rows={4}
          maxLength={LIMITE_BIO}
          value={valores.bio}
          onChange={mudar("bio")}
          placeholder="Que tipo de música você ouve? O que procura num disco?"
          aria-describedby="perfil-bio-mensagem"
        />
        <small id="perfil-bio-mensagem" className={erros.bio ? "campo-erro" : "campo-dica"}>
          {erros.bio || `${valores.bio.length}/${LIMITE_BIO}`}
        </small>
      </div>

      {REDES.map(({ campo, rotulo, exemplo }) => (
        <div key={campo} className={`campo-formulario ${erros[campo] ? "com-erro" : ""}`}>
          <label htmlFor={`perfil-${campo}`}>{rotulo}</label>
          <input
            id={`perfil-${campo}`}
            type="url"
            inputMode="url"
            value={valores[campo]}
            onChange={mudar(campo)}
            placeholder={exemplo}
            aria-invalid={erros[campo] ? true : undefined}
            aria-describedby={erros[campo] ? `perfil-${campo}-erro` : undefined}
          />
          {erros[campo] && (
            <small id={`perfil-${campo}-erro`} className="campo-erro">
              {erros[campo]}
            </small>
          )}
        </div>
      ))}

      {(erros.geral || erros.erro) && <p className="modal-erro">{erros.geral || erros.erro}</p>}

      <div className="perfil-formulario-acoes">
        <button type="submit" className="botao-principal" disabled={salvando}>
          {salvando ? "Salvando..." : "Salvar perfil"}
        </button>
        <button type="button" className="perfil-botao" onClick={aoCancelar}>
          Cancelar
        </button>
      </div>
    </form>
  );
}
