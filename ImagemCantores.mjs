import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const caminhoDados = path.join(__dirname, 'src', 'dados', 'dadosMusicais.ts');

const corretoras = {
  "Nas": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Nas_%2852380600682%29_%28cropped%29.jpg/1280px-Nas_%2852380600682%29_%28cropped%29.jpg",
  "Alok": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Alok_Tomorrowland_Winter_2025.jpg/1280px-Alok_Tomorrowland_Winter_2025.jpg",
  "Red Hot Chili Peppers": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/RHCP_Live_in_London_26_June_2022.jpg/1280px-RHCP_Live_in_London_26_June_2022.jpg"
};

async function executar() {
  console.log('Lendo dadosMusicais.ts...');
  let { listaDeArtistas, categoriasMusicais } = await import('./src/dados/dadosMusicais.ts');

  listaDeArtistas = listaDeArtistas.map(a => {
    if (corretoras[a.nome]) {
      a.foto = corretoras[a.nome];
      console.log('Corrigida foto de:', a.nome);
    }
    return a;
  });

  const novoConteudo = `// ==========================================
// TIPAGENS (TYPESCRIPT)
// ==========================================

export interface Musica {
  titulo: string;
  album: string;
  ano: string;
  reproducoes: string;
  streams: number;
  capa?: string;
}

export interface Album {
  titulo: string;
  ano: string;
  faixas: string;
  reproducoes: string;
  streams: number;
  capa?: string;
}

export interface Artista {
  id: string;
  nome: string;
  categoria: string;
  genero: string;
  origem: string;
  periodoAtivo: string;
  ouvintesMensais: string;
  ouvintesMensaisNum: number;
  foto: string;
  legendaFoto: string;
  resumo: string;
  biografia: string[];
  citacao: string;
  musicas: Musica[];
  albuns: Album[];
}

export const categoriasMusicais: string[] = ${JSON.stringify(categoriasMusicais, null, 2)};

// ==========================================
// BANCO DE DADOS COM IMAGENS REAIS
// ==========================================

const bancoDeDadosArtistas: Artista[] = ${JSON.stringify(listaDeArtistas, null, 2)};

// ==========================================
// FUNCAO DE NORMALIZACAO E ORDENACAO
// ==========================================
export const listaDeArtistas: Artista[] = bancoDeDadosArtistas.map((artista) => ({
  ...artista,
  albuns: [...artista.albuns].sort((a, b) => b.streams - a.streams),
  musicas: [...artista.musicas].sort((a, b) => b.streams - a.streams),
}));
`;

  fs.writeFileSync(caminhoDados, novoConteudo, 'utf8');
  console.log('✅ Arquivo atualizado!');
}

executar();
