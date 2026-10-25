const mysql = require('mysql2');

// 1. Configurar a ligação ao MySQL
const conexao = mysql.createConnection({
  host: 'localhost',
  user: 'root',          // Substitui pelo teu utilizador do MySQL (ex: root)
  password: 'sua_senha', // Substitui pela tua senha do MySQL (se tiveres)
  database: 'dados_musicais_db'
});

conexao.connect((err) => {
  if (err) {
    console.error('Erro ao ligar ao MySQL:', err);
    return;
  }
  console.log('Ligado ao MySQL com sucesso!');

  // Exemplo de artista baseado na tua estrutura
  const dadosArtista = {
    nome: 'The Weeknd',
    biografia: 'Cantor, compositor e produtor musical canadiano.',
    resumo: 'Um dos maiores nomes da música pop e R&B atual.',
    albuns: [
      {
        titulo: 'After Hours',
        ano: 2020,
        faixas: [
          { titulo_faixa: 'Blinding Lights', duracao: '3:20', avaliacao: 9.8 },
          { titulo_faixa: 'Save Your Tears', duracao: '3:35', avaliacao: 9.5 }
        ]
      },
      {
        titulo: 'Starboy',
        ano: 2016,
        faixas: [
          { titulo_faixa: 'Starboy', duracao: '3:50', avaliacao: 9.0 }
        ]
      }
    ]
  };

  // 2. Inserir o Artista na tabela 'artistas'
  const sqlArtista = 'INSERT INTO artistas (nome, biografia, resumo) VALUES (?, ?, ?)';
  conexao.query(sqlArtista, [dadosArtista.nome, dadosArtista.biografia, dadosArtista.resumo], (err, resultadoArtista) => {
    if (err) throw err;
    
    const artistaId = resultadoArtista.insertId;
    console.log(`Artista inserido com o ID: ${artistaId}`);

    // 3. Inserir cada álbum do artista
    dadosArtista.albuns.forEach(album => {
      const sqlAlbum = 'INSERT INTO albuns (artista_id, titulo, ano_lancamento) VALUES (?, ?, ?)';
      conexao.query(sqlAlbum, [artistaId, album.titulo, album.ano], (err, resultadoAlbum) => {
        if (err) throw err;
        
        const albumId = resultadoAlbum.insertId;
        console.log(`Álbum '${album.titulo}' inserido com o ID: ${albumId}`);

        // 4. Inserir as faixas de cada álbum
        album.faixas.forEach(faixa => {
          const sqlFaixa = 'INSERT INTO faixas (album_id, titulo_faixa, duracao, avaliacao) VALUES (?, ?, ?, ?)';
          conexao.query(sqlFaixa, [albumId, faixa.titulo_faixa, faixa.duracao, faixa.avaliacao], (err) => {
            if (err) throw err;
          });
        });
      });
    });

    console.log('Migração dos dados concluída com sucesso!');
  });

  // Fechar a ligação após 2 segundos para garantir que tudo foi guardado
  setTimeout(() => {
    conexao.end();
    console.log('Ligação ao MySQL encerrada.');
  }, 2000);
});