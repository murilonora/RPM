import { useState } from "react";
import { tratarErroImagem } from "../utilitarios/comuns";

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
  ...props
}) {
  const [carregada, setCarregada] = useState(false);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        ...style,
        ...(aspectRatio ? { aspectRatio } : {}),
      }}
    >
      {/* Skeleton brutalista com textura técnica enquanto a imagem baixa */}
      {!carregada && (
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
        src={src}
        alt={alt}
        loading={loading}
        referrerPolicy="no-referrer"
        crossOrigin="anonymous"
        onLoad={() => setCarregada(true)}
        onError={(e) => {
          setCarregada(true);
          tratarErroImagem(e);
        }}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          carregada ? "opacity-100" : "opacity-0"
        }`}
        {...props}
      />
    </div>
  );
}
