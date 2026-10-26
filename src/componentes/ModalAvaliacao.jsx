import { useState, useEffect } from "react";
import { useUsuario } from "../contextos/ContextoUsuario";
import { AvaliacaoVinil } from "./AvaliacaoVinil";
import { ImagemComFallback } from "./ImagemComFallback";

export function ModalAvaliacao({ visivel, aoFechar, item }) {
  const { estaLogado, obterAvaliacao, avaliarItem } = useUsuario();
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

  const avaliacaoAtual = obterAvaliacao(item.chave);
  const notaAtual = avaliacaoAtual.nota || 0;

  function aoSalvar(evento) {
    evento.preventDefault();
    avaliarItem(item.chave, notaAtual, comentarioTemp);
    aoFechar();
  }

  return (
    <div className="modal-overlay" onClick={aoFechar}>
      <div className="modal-conteudo" onClick={(evento) => evento.stopPropagation()}>
        <button className="modal-fechar" onClick={aoFechar} aria-label="Fechar" type="button">✕</button>
        
        {!estaLogado ? (
          <div className="text-center py-2.5">
            <img 
              src="/assets/vinil-triste.png"
              alt="Vinil Triste" 
              className="w-40 mx-auto mb-4 block"
            />
            <h2 className="modal-titulo mb-2 text-xl">
              Você ainda não tem conta!
            </h2>
            <p className="text-stone-400 text-sm">
              Cadastre-se rapidinho para poder avaliar discos, salvar favoritos e muito mais.
            </p>
            <button className="botao-principal mt-6 w-full" onClick={aoFechar} type="button">
              Entendi
            </button>
          </div>
        ) : (
          <form onSubmit={aoSalvar} className="modal-formulario">
            <h2 className="modal-titulo mb-2">
              Sua Avaliação
            </h2>

            <div className="flex gap-4 items-center mb-6 p-4 bg-white/5 border border-white/12">
              {item.capa ? (
                <ImagemComFallback
                  src={item.capa}
                  alt={item.titulo}
                  className="w-16 h-16 shrink-0"
                />
              ) : (
                <div className="w-16 h-16 bg-[#333] flex items-center justify-center text-xs font-bold shrink-0">
                  {item.titulo.slice(0, 2).toUpperCase()}
                </div>
              )}
              <div className="min-w-0">
                <strong className="block text-lg truncate">{item.titulo}</strong>
                <span className="text-stone-400 text-sm block truncate">{item.subtitulo}</span>
              </div>
            </div>
            
            <div className="campo-formulario flex flex-col items-center gap-3 mb-2">
              <label>Sua nota (em vinis)</label>
              <AvaliacaoVinil chaveItem={item.chave} tamanho="grande" />
            </div>

            <div className="campo-formulario">
              <label htmlFor="campo-comentario">Comentário (opcional)</label>
              <textarea
                id="campo-comentario"
                rows="4"
                placeholder="O que achou desta obra?"
                value={comentarioTemp}
                onChange={(e) => setComentarioTemp(e.target.value)}
                className="w-full bg-[#0e0d15] border border-white/15 p-3.5 text-[#f7f4ed] resize-y font-inherit outline-none focus:border-[#ff0004]"
              />
            </div>

            <button type="submit" className="botao-principal mt-4 w-full">
              Salvar Avaliação
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
