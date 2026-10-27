// Funções de texto usadas nas buscas e nas capas sem imagem

/**
 * Tira acentos, passa para minúsculas e corta espaços das pontas,
 * para "Matuê", "matue" e " MATUE " darem a mesma busca.
 */
export function normalizarTexto(texto = "") {
  return (texto || "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();
}

/**
 * Iniciais de um nome ou título ("Racionais MCs" → "RM"), usadas como capa
 * tipográfica quando o álbum não tem imagem. Sem nome, devolve "LP".
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
