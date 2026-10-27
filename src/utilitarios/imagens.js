// Funções de imagem: tamanho certo das capas do Deezer e troca por logo quando a imagem falha

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
 * Usada no onError das <img>: se a imagem não carregar, mostra o logo do RPM no lugar.
 * Zera o onerror antes para não entrar em loop caso o próprio logo falhe.
 */
export function tratarErroImagem(e) {
  e.currentTarget.onerror = null;
  e.currentTarget.src = "/assets/rpm-mark.svg";
}
