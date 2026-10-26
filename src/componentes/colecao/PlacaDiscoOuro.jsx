import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ImagemComFallback } from "../ImagemComFallback";
import { DiscoOuroSvg } from "./DiscoOuroSvg";
import { itemParaAvaliar } from "./itensColecao";

// Pedestal do Disco de Ouro: obra favorita, resenha e ações de compartilhar
export function PlacaDiscoOuro({ favorito, nomeCritico, aoAvaliar, aoTrocarFavorito }) {
  const [exportando, setExportando] = useState(false);
  const [mensagemCopiado, setMensagemCopiado] = useState(false);
  const placaRef = useRef(null);

  async function exportarCardPng() {
    if (!placaRef.current || exportando) return;
    try {
      setExportando(true);
      // Biblioteca carregada só no clique: quem não exporta a placa não baixa esse código
      const { toPng } = await import("html-to-image");
      const dataUrl = await toPng(placaRef.current, {
        cacheBust: true,
        backgroundColor: "#111019",
        pixelRatio: 2,
      });
      const link = document.createElement("a");
      const nomeLimpo = favorito.titulo.toLowerCase().replace(/[^a-z0-9]/g, "-");
      link.download = `rpm-${nomeLimpo}-disco-ouro.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Erro ao gerar imagem da placa:", err);
    } finally {
      setExportando(false);
    }
  }

  function copiarResenhaTexto() {
    const estrelas = "★".repeat(favorito.nota) + "☆".repeat(5 - favorito.nota);
    const texto = `🏆 RPM // DISCO DE OURO DO MEU ACERVO\n` +
      `Obra: ${favorito.titulo} — ${favorito.artista.nome}\n` +
      `Classificação: ${estrelas} (${favorito.nota}/5 Vinis)\n` +
      (favorito.comentario ? `Resenha: "${favorito.comentario}"\n` : "") +
      `Crítico: ${nomeCritico}\n` +
      `Catálogo Musical RPM`;

    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(texto).then(() => {
        setMensagemCopiado(true);
        setTimeout(() => setMensagemCopiado(false), 2500);
      });
    }
  }

  return (
    <section className="templo-ouro-arquivo">
      <div className="placa-ouro-moldura" ref={placaRef}>
        {/* Faixa superior mecânica */}
        <div className="placa-ouro-header">
          <div className="placa-ouro-badge">
            <span className="ouro-quadrado-icon">■</span>
            <span>DISCO DE OURO // FAVORITO SUPREMO DO ACERVO</span>
          </div>
          <div className="placa-ouro-controles">
            <span className="placa-nota-carimbo">{favorito.nota}/5 VINIS</span>
            <button
              type="button"
              className="placa-btn-trocar"
              onClick={aoTrocarFavorito}
              title="Trocar qual obra ocupa o pedestal de ouro"
            >
              [ ⟳ TROCAR FAVORITO ]
            </button>
          </div>
        </div>

        {/* Corpo da Obra de Ouro com Capa e Disco Saindo */}
        <div className="placa-ouro-corpo cartao-com-link">
          <div className="placa-disco-wrap">
            <div className="placa-disco-ouro" aria-hidden="true">
              <DiscoOuroSvg />
            </div>

            <div className="placa-capa-quadrada">
              {favorito.capa ? (
                <ImagemComFallback
                  src={favorito.capa}
                  alt={favorito.titulo}
                  className="placa-capa-img w-full h-full"
                />
              ) : (
                <div className="placa-capa-placeholder">LP</div>
              )}
              <span className="placa-tipo-etiqueta">{favorito.tipo === "musica" ? "SINGLE" : "LP"}</span>
            </div>
          </div>

          <div className="placa-dados-col">
            <span className="placa-artista-head">
              {favorito.artista.nome} · ANO {favorito.ano || "N/A"}
            </span>
            <h2 className="placa-titulo-obra">
              <Link to={`/artista/${favorito.artista.id}`} className="cartao-link">
                {favorito.titulo}
              </Link>
            </h2>
            <p className="placa-sub-detalhe">{favorito.subtitulo}</p>

            {favorito.comentario ? (
              <div className="placa-resenha-box">
                <span className="resenha-tag-mono">// RESENHA DO CRÍTICO:</span>
                <p className="resenha-texto-aspas">"{favorito.comentario}"</p>
                <span className="resenha-assinatura">— {nomeCritico}</span>
              </div>
            ) : (
              <div className="placa-sem-resenha">
                <span>Sem resenha textual registrada.</span>
                {aoAvaliar && (
                  <button
                    type="button"
                    className="placa-btn-adicionar-txt"
                    onClick={() => aoAvaliar(itemParaAvaliar(favorito))}
                  >
                    [ + ESCREVER RESENHA ]
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Barra de Ações e Compartilhamento */}
        <div className="placa-ouro-footer-acoes">
          <button
            type="button"
            className="placa-btn-exportar"
            onClick={exportarCardPng}
            disabled={exportando}
            title="Exportar imagem PNG em alta resolução para Instagram / Twitter"
          >
            {exportando ? "[ GERANDO CARD HD... ]" : "[ 📸 BAIXAR CARD (PNG) ]"}
          </button>
          <button
            type="button"
            className="placa-btn-exportar"
            onClick={copiarResenhaTexto}
            title="Copiar texto formatado da resenha para redes sociais"
          >
            {mensagemCopiado ? "[ ✓ COPIADO P/ ÁREA DE TRANSFERÊNCIA! ]" : "[ 📋 COPIAR TEXTO DA RESENHA ]"}
          </button>
        </div>
      </div>
    </section>
  );
}
