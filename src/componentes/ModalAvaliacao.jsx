import { useState, useEffect } from "react";
import { useUsuario } from "../contextos/ContextoUsuario";
import { AvaliacaoDisco } from "./AvaliacaoDisco";
import { ImagemComFallback } from "./ImagemComFallback";

// Nota + resenha de uma obra (usado na Coleção), com o visual da avaliação da Mell:
// cartão creme arredondado, obra num cartão branco e a pílula "Sua nota:".
export function ModalAvaliacao({ visivel, aoFechar, item }) {
  const { estaLogado, obterAvaliacao, avaliarItem, removerAvaliacao } = useUsuario();
  const [comentarioTemp, setComentarioTemp] = useState("");

  // Sincroniza o form apenas quando o modal abrir ou trocar de item.
  // obterAvaliacao fica fora das dependências de propósito: ela muda a cada
  // nota dada e reexecutar aqui apagaria o comentário que está sendo digitado.
  const chaveItem = item?.chave;
  useEffect(() => {
    if (visivel && chaveItem) {
      const avalAtual = obterAvaliacao(chaveItem);
      setComentarioTemp(avalAtual.comentario || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visivel, chaveItem]);

  if (!visivel || !item) return null;

  const salva = obterAvaliacao(item.chave);
  const notaAtual = salva.nota || 0;
  const jaAvaliado = notaAtual > 0 || !!salva.comentario;

  function aoSalvar(evento) {
    evento.preventDefault();
    avaliarItem(item.chave, notaAtual, comentarioTemp, item.obra);
    aoFechar();
  }

  // Apaga nota e resenha; a Coleção mostra o aviso com "Desfazer"
  function aoExcluir() {
    removerAvaliacao(item.chave);
    aoFechar();
  }

  return (
    <div className="album-faixas-fundo" onClick={aoFechar}>
      <div
        className="avaliacao-janela"
        role="dialog"
        aria-modal="true"
        aria-labelledby="avaliacao-janela-titulo"
        onClick={(evento) => evento.stopPropagation()}
      >
        <button className="album-faixas-fechar" onClick={aoFechar} aria-label="Fechar" type="button">
          ✕
        </button>

        {!estaLogado ? (
          <div className="avaliacao-janela-deslogado">
            <img src="/assets/vinil-triste.webp" alt="" className="avaliacao-janela-mascote" />
            <h2 id="avaliacao-janela-titulo" className="album-faixas-titulo">Você ainda não tem conta!</h2>
            <p className="album-faixas-ano">
              Cadastre-se rapidinho para poder avaliar discos, salvar favoritos e muito mais.
            </p>
            <button className="avaliacao-janela-salvar" onClick={aoFechar} type="button">
              Entendi
            </button>
          </div>
        ) : (
          <form onSubmit={aoSalvar}>
            <h2 id="avaliacao-janela-titulo" className="album-faixas-subtitulo">Sua avaliação</h2>

            <div className="album-faixas-item avaliacao-janela-obra">
              {item.capa ? (
                <ImagemComFallback src={item.capa} alt="" className="avaliacao-janela-capa" tamanho={250} />
              ) : (
                <div className="avaliacao-janela-capa album-faixas-capa-vazia">
                  {item.titulo.slice(0, 2).toUpperCase()}
                </div>
              )}
              <div className="avaliacao-janela-textos">
                <span className="album-faixas-nome">{item.titulo}</span>
                <span className="avaliacao-janela-sub">{item.subtitulo}</span>
                <AvaliacaoDisco chaveItem={item.chave} obra={item.obra} rotulo={`Nota para ${item.titulo}`} />
              </div>
            </div>

            <label htmlFor="campo-comentario" className="avaliacao-janela-rotulo">
              Comentário (opcional)
            </label>
            <textarea
              id="campo-comentario"
              rows="4"
              placeholder="O que achou desta obra?"
              value={comentarioTemp}
              onChange={(e) => setComentarioTemp(e.target.value)}
              className="avaliacao-janela-texto"
            />

            <div className="avaliacao-janela-acoes">
              {jaAvaliado && (
                <button type="button" className="avaliacao-janela-excluir" onClick={aoExcluir}>
                  Excluir avaliação
                </button>
              )}
              <button type="submit" className="avaliacao-janela-salvar">
                Salvar avaliação
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
