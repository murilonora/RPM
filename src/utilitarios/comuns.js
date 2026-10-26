// ==========================================
// UTILITÁRIOS COMPARTILHADOS - RPM
// ==========================================

/**
 * Normaliza textos removendo acentos e pontuações para buscas insensíveis a maiúsculas/minúsculas e diacríticos.
 */
export function normalizarTexto(texto = "") {
  return (texto || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

/**
 * O CDN do Deezer serve a mesma imagem em vários tamanhos trocando o "1000x1000" da URL.
 * 1000px ≈ 145 KB, 500px ≈ 46 KB, 250px ≈ 16 KB: cada lugar pede só o que vai exibir.
 * URLs de outros servidores voltam sem alteração.
 */
export function imagemNoTamanho(url, tamanho = 500) {
  if (!url || !url.includes("dzcdn.net")) return url;
  return url.replace(/\/\d+x\d+-/, `/${tamanho}x${tamanho}-`);
}

/**
 * Manipulador padronizado de erro de carregamento de imagens com fallback visual para o logotipo do RPM.
 */
export function tratarErroImagem(e) {
  e.currentTarget.onerror = null;
  e.currentTarget.src = "/assets/rpm-mark.svg";
}

/**
 * Extrai as iniciais de um nome ou título para monogramas ou capas tipográficas alternativas.
 */
export function extrairSiglas(nome = "", max = 2) {
  if (!nome) return "LP";
  return nome
    .split(" ")
    .filter(Boolean)
    .slice(0, max)
    .map((p) => p[0])
    .join("")
    .toUpperCase();
}
