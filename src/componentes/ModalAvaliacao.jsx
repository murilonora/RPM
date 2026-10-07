import { useState, useEffect } from "react";
import { useUsuario } from "../contextos/ContextoUsuario";
import { AvaliacaoVinil } from "./AvaliacaoVinil";

export function ModalAvaliacao({ visivel, aoFechar, item }) {
  const { estaLogado, obterAvaliacao, avaliarItem } = useUsuario();
  const [comentarioTemp, setComentarioTemp] = useState("");

  // Sincroniza o form quando o modal abrir
  useEffect(() => {
    if (visivel && item) {
      const avalAtual = obterAvaliacao(item.chave);
      setComentarioTemp(avalAtual.comentario || "");
    }
  }, [visivel, item, obterAvaliacao]);

  if (!visivel || !item) return null;

  const avaliacaoAtual = obterAvaliacao(item.chave);
  const notaAtual = avaliacaoAtual.nota || 0;

  function aoSalvar(evento) {
    evento.preventDefault();
    // Salva a nota (que ja pode ter sido alterada pelo componente AvaliacaoVinil inline)
    // e atualiza o comentario
    avaliarItem(item.chave, notaAtual, comentarioTemp);
    aoFechar();
  }

  return (
    <div className="modal-overlay" onClick={aoFechar}>
      <div className="modal-conteudo" onClick={(evento) => evento.stopPropagation()}>
        <button className="modal-fechar" onClick={aoFechar} aria-label="Fechar">✕</button>
        
        {!estaLogado ? (
          <div style={{ textAlign: "center", padding: "10px 0" }}>
            <img 
              src="/assets/vinil-triste.jpg" 
              alt="Vinil Triste" 
              style={{ 
                width: "160px", 
                margin: "0 auto 16px", 
                display: "block",
                borderRadius: "16px",
                mixBlendMode: "lighten" /* Se for jpg com fundo, da uma disfarçada no escuro do modal */
              }} 
            />
            <h2 className="modal-titulo" style={{ marginBottom: "8px", fontSize: "1.4rem" }}>
              Voce ainda nao tem conta!
            </h2>
            <p style={{ color: "#aaa", fontSize: "0.95rem" }}>
              Cadastre-se rapidinho para poder avaliar discos, salvar favoritos e muito mais.
            </p>
            <button className="botao-principal" onClick={aoFechar} style={{ marginTop: "24px", width: "100%" }}>
              Entendi
            </button>
          </div>
        ) : (
          <form onSubmit={aoSalvar} className="modal-formulario">
            <h2 className="modal-titulo" style={{ marginBottom: "8px" }}>
              Sua Avaliacao
            </h2>

            <div style={{ display: "flex", gap: "16px", alignItems: "center", marginBottom: "24px", padding: "16px", background: "rgba(255,255,255,0.05)", borderRadius: "12px" }}>
              {item.capa ? (
                <img src={item.capa} alt={item.titulo} style={{ width: "64px", height: "64px", borderRadius: "8px", objectFit: "cover" }} />
              ) : (
                <div style={{ width: "64px", height: "64px", borderRadius: "8px", background: "#333", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "bold" }}>
                  {item.titulo.slice(0, 2).toUpperCase()}
                </div>
              )}
              <div>
                <strong style={{ display: "block", fontSize: "1.1rem" }}>{item.titulo}</strong>
                <span style={{ color: "#aaa", fontSize: "0.85rem" }}>{item.subtitulo}</span>
              </div>
            </div>
            
            <div className="campo-formulario" style={{ alignItems: "center", display: "flex", flexDirection: "column", gap: "12px", marginBottom: "8px" }}>
              <label>Sua nota (em vinis)</label>
              <AvaliacaoVinil chaveItem={item.chave} tamanho="grande" />
            </div>

            <div className="campo-formulario">
              <label htmlFor="campo-comentario">Comentario (Opcional)</label>
              <textarea
                id="campo-comentario"
                rows="4"
                placeholder="O que achou desta obra?"
                value={comentarioTemp}
                onChange={(e) => setComentarioTemp(e.target.value)}
                style={{
                  width: "100%", background: "#0e0d15", border: "1px solid rgba(255,255,255,0.1)",
                  padding: "12px 16px", borderRadius: "8px", color: "#f7f4ed", resize: "vertical",
                  fontFamily: "inherit"
                }}
              />
            </div>

            <button type="submit" className="botao-principal" style={{ marginTop: "16px" }}>
              Salvar Avaliacao
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
