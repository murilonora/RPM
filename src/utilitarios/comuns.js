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
