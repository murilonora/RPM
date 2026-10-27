import { useState } from "react";
import { imagemNoTamanho, tratarErroImagem } from "../utilitarios/imagens";

// Imagens que já carregaram nesta visita: aparecem direto, sem esqueleto nem fade.
// Importante para a transição da foto do artista (cartão -> página do artista).
const IMAGENS_CARREGADAS = new Set();

/**
 * Componente de imagem otimizado com skeleton brutalista e fallback automático.
 * Elimina o salto de layout (CLS) durante o carregamento das capas em alta resolução.
 */
export function ImagemComFallback({
  src,
  alt = "",
  className = "",
  style = {},
  aspectRatio,
  loading = "lazy",
  tamanho = 500,
  ...props
}) {
  const url = imagemNoTamanho(src, tamanho);
  const [carregada, setCarregada] = useState(() => IMAGENS_CARREGADAS.has(url));
  // Enquanto a versão grande baixa, mostra uma menor que já esteja no cache (ex.: a do cartão)
  const reserva = carregada
    ? null
    : [500, 250].map((t) => imagemNoTamanho(src, t)).find((u) => u !== url && IMAGENS_CARREGADAS.has(u));

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        ...style,
        ...(aspectRatio ? { aspectRatio } : {}),
      }}
    >
      {/* Skeleton brutalista com textura técnica enquanto a imagem baixa */}
      {reserva && (
        <img src={reserva} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover" />
      )}
      {!carregada && !reserva && (
        <div
          className="absolute inset-0 bg-[#1e1b24] animate-pulse flex items-center justify-center pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #181520, #181520 8px, #231f2d 8px, #231f2d 16px)",
          }}
          aria-hidden="true"
        >
          <span className="font-mono text-[9px] text-[#ff0004] opacity-50 tracking-widest font-bold">
            // CARREGANDO
          </span>
        </div>
      )}

      <img
        src={url}
        alt={alt}
        loading={loading}
        referrerPolicy="no-referrer"
        crossOrigin="anonymous"
        onLoad={() => {
          IMAGENS_CARREGADAS.add(url);
          setCarregada(true);
        }}
        onError={(e) => {
          setCarregada(true);
          tratarErroImagem(e);
        }}
        className={`relative w-full h-full object-cover transition-opacity duration-300 ${
          carregada ? "opacity-100" : "opacity-0"
        }`}
        {...props}
      />
    </div>
  );
}
