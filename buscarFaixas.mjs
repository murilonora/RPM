// buscarFaixas.mjs
// Busca a lista real de faixas de TODOS os álbuns do migrar.cjs (API pública do Deezer, sem chave)
// e gera dois arquivos:
//   - faixasAlbuns.json : { "id-do-artista|Titulo do Album": [{ numero, titulo, duracao }, ...] }
//   - faixas.sql        : comandos para preencher a tabela `faixas` do MySQL
//   - revisar.txt       : álbuns que não foram encontrados ou que merecem conferência
//
// Como usar (na pasta do projeto, junto do migrar.cjs):
//   node buscarFaixas.mjs
// Requer Node 18+ (usa fetch nativo).

import fs from 'node:fs';

const ARQUIVO_ENTRADA = './migrar.cjs';
const PAUSA_MS = 250; // o Deezer limita ~50 requisições a cada 5s

// ---------- 1. Ler a lista de artistas do migrar.cjs ----------
const texto = fs.readFileSync(ARQUIVO_ENTRADA, 'utf8');
const inicio = texto.indexOf('const bancoDeDadosArtistas = ');
const fim = texto.indexOf('\n];', inicio);
if (inicio === -1 || fim === -1) {
  console.error('Não achei "bancoDeDadosArtistas" no migrar.cjs.');
  process.exit(1);
}
const artistas = eval(texto.slice(inicio + 'const bancoDeDadosArtistas = '.length, fim + 2));

// ---------- 2. Utilidades ----------
const dormir = (ms) => new Promise((r) => setTimeout(r, ms));
const normalizar = (s) =>
  String(s)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
const formatarDuracao = (seg) => `${Math.floor(seg / 60)}:${String(seg % 60).padStart(2, '0')}`;
const sqlTexto = (s) => `'${String(s).replace(/\\/g, '\\\\').replace(/'/g, "''")}'`;

async function pedir(url) {
  for (let tentativa = 1; tentativa <= 3; tentativa++) {
    try {
      const r = await fetch(url);
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const dados = await r.json();
      if (dados.error) throw new Error(dados.error.message || 'erro da API');
      return dados;
    } catch (e) {
      if (tentativa === 3) throw e;
      await dormir(1000 * tentativa);
    }
  }
}

async function buscarAlbum(nomeArtista, tituloAlbum) {
  const q = encodeURIComponent(`artist:"${nomeArtista}" album:"${tituloAlbum}"`);
  const busca = await pedir(`https://api.deezer.com/search/album?q=${q}&limit=15`);
  const resultados = (busca.data || []).filter(
    (a) => normalizar(a.artist?.name || '').includes(normalizar(nomeArtista)) ||
           normalizar(nomeArtista).includes(normalizar(a.artist?.name || ''))
  );
  if (resultados.length === 0) return null;

  const alvo = normalizar(tituloAlbum);
  const exatos = resultados.filter((a) => normalizar(a.title) === alvo);
  const escolhido = (exatos.length ? exatos : resultados)[0];
  const exato = exatos.length > 0;

  const faixas = await pedir(`https://api.deezer.com/album/${escolhido.id}/tracks?limit=100`);
  return {
    exato,
    tituloEncontrado: escolhido.title,
    artistaEncontrado: escolhido.artist?.name,
    faixas: (faixas.data || []).map((t, i) => ({
      numero: i + 1,
      titulo: t.title,
      duracao: formatarDuracao(t.duration || 0),
    })),
  };
}

// ---------- 3. Rodar para todos os álbuns ----------
const json = {};
const sql = [
  '-- Gerado por buscarFaixas.mjs',
  '-- Para cada álbum: apaga as faixas de teste e insere as reais.',
  '',
];
const revisar = [];
let total = 0;
let achados = 0;

for (const artista of artistas) {
  for (const album of artista.albuns || []) {
    total++;
    const chave = `${artista.id}|${album.titulo}`;
    process.stdout.write(`[${total}] ${artista.nome} — ${album.titulo} ... `);
    try {
      const r = await buscarAlbum(artista.nome, album.titulo);
      if (!r || r.faixas.length === 0) {
        console.log('NÃO ENCONTRADO');
        revisar.push(`NÃO ENCONTRADO: ${artista.nome} — ${album.titulo}`);
      } else {
        achados++;
        json[chave] = r.faixas;
        console.log(`${r.faixas.length} faixas${r.exato ? '' : ' (título aproximado: ' + r.tituloEncontrado + ')'}`);
        if (!r.exato) {
          revisar.push(`CONFERIR: ${artista.nome} — "${album.titulo}" casou com "${r.tituloEncontrado}" (${r.artistaEncontrado})`);
        }
        const filtro = `ar.nome = ${sqlTexto(artista.nome)} AND al.titulo = ${sqlTexto(album.titulo)}`;
        sql.push(
          `DELETE f FROM faixas f JOIN albuns al ON al.id = f.album_id JOIN artistas ar ON ar.id = al.artista_id WHERE ${filtro};`
        );
        for (const f of r.faixas) {
          sql.push(
            `INSERT INTO faixas (album_id, titulo_faixa, duracao, avaliacao) ` +
              `SELECT al.id, ${sqlTexto(f.titulo)}, ${sqlTexto(f.duracao)}, 0 ` +
              `FROM albuns al JOIN artistas ar ON ar.id = al.artista_id WHERE ${filtro};`
          );
        }
        sql.push('');
      }
    } catch (e) {
      console.log('ERRO: ' + e.message);
      revisar.push(`ERRO (${e.message}): ${artista.nome} — ${album.titulo}`);
    }
    await dormir(PAUSA_MS);
  }
}

fs.writeFileSync('./faixasAlbuns.json', JSON.stringify(json, null, 2), 'utf8');
fs.writeFileSync('./faixas.sql', sql.join('\n'), 'utf8');
fs.writeFileSync('./revisar.txt', revisar.join('\n') || 'Nada para revisar.', 'utf8');

console.log(`\nPronto: ${achados}/${total} álbuns com faixas.`);
console.log('Arquivos gerados: faixasAlbuns.json, faixas.sql, revisar.txt');
