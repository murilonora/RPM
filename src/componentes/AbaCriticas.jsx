import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ErroApi, ServidorIndisponivel, buscarCriticasDoArtista } from "../servicos/api";
import { useCatalogo } from "../contextos/ContextoCatalogo";
import { NotaEmVinis } from "./NotaEmVinis";

// "2026-11-15T21:04:10" -> "15 de nov. de 2026"
export function formatarDataCritica(data) {
  const dia = data ? new Date(data) : null;
  if (!dia || Number.isNaN(dia.getTime())) return "";
  return dia.toLocaleDateString("pt-BR", { day: "numeric", month: "short", year: "numeric" });
}

/**
 * Uma crítica publicada (ReviewPublica do backend).
 * mostrarAutor: link para o perfil de quem escreveu (página do artista)
 * mostrarArtista: nome do artista com link (perfil do crítico)
 */
export function CartaoCritica({ critica, mostrarAutor = false, mostrarArtista = false }) {
  const { artistasPorId } = useCatalogo();
  const artista = artistasPorId.get(critica.artistaId);

  return (
    <article className="critica-cartao">
      <header className="critica-topo">
        <div>
          <span className="critica-tipo">{critica.tipo === "album" ? "Álbum" : "Música"}</span>
          <h3 className="critica-obra">{critica.obra}</h3>
          {mostrarArtista && (
            <Link className="critica-artista" to={`/artista/${critica.artistaId}`}>
              {artista?.nome || critica.artistaId}
            </Link>
          )}
        </div>
        <NotaEmVinis nota={critica.nota} />
      </header>

      {critica.texto && <p className="critica-texto">{critica.texto}</p>}

      <footer className="critica-rodape">
        {mostrarAutor && (
          <Link className="critica-autor" to={`/critico/${critica.usuarioId}`}>
            {critica.nomeUsuario}
          </Link>
        )}
        <time dateTime={critica.dataAvaliacao}>{formatarDataCritica(critica.dataAvaliacao)}</time>
      </footer>
    </article>
  );
}

// Aba "Críticas" da página do artista: as resenhas mais recentes que o público escreveu
export function AbaCriticas({ artistaId }) {
  // estado: "carregando" | "pronto" | "fora" (servidor desligado) | "erro"
  const [{ estado, criticas }, setDados] = useState({ estado: "carregando", criticas: [] });

  useEffect(() => {
    let ativo = true;
    setDados({ estado: "carregando", criticas: [] });
    buscarCriticasDoArtista(artistaId)
      .then((lista) => ativo && setDados({ estado: "pronto", criticas: Array.isArray(lista) ? lista : [] }))
      .catch((erro) => {
        if (!ativo) return;
        setDados({ estado: erro instanceof ServidorIndisponivel ? "fora" : "erro", criticas: [] });
        if (!(erro instanceof ServidorIndisponivel || erro instanceof ErroApi)) console.warn(erro);
      });
    return () => {
      ativo = false;
    };
  }, [artistaId]);

  if (estado === "carregando") return <p className="criticas-aviso">Carregando críticas…</p>;
  if (estado === "fora") {
    return <p className="criticas-aviso">As críticas ficam no servidor, que está fora do ar agora. Tente de novo mais tarde.</p>;
  }
  if (estado === "erro") return <p className="criticas-aviso">Não deu para carregar as críticas agora.</p>;
  if (criticas.length === 0) {
    return (
      <p className="criticas-aviso">
        Ninguém escreveu sobre este artista ainda. Dê uma nota a um álbum e escreva o que achou na sua Coleção.
      </p>
    );
  }

  return (
    <div className="criticas-lista">
      {criticas.map((critica) => (
        <CartaoCritica key={`${critica.tipo}-${critica.id}`} critica={critica} mostrarAutor />
      ))}
    </div>
  );
}
