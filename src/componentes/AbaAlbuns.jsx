import { useState } from 'react';
import Avaliacao from './Avaliacao';

export function AbaAlbuns({ albuns = [], nomeArtista = "" }) {
  const [albumAberto, setAlbumAberto] = useState(null);

  if (!albuns || albuns.length === 0) {
    return <p className="p-4 text-center">Nenhum álbum encontrado.</p>;
  }

  const siglas = nomeArtista
    ? nomeArtista.split(" ").slice(0, 2).map((p) => p[0]).join("").toUpperCase()
    : "LP";

  // Função inteligente que gera a lista na hora, baseada no número de faixas
  const obterFaixasDoAlbum = (album) => {
    if (album.listaFaixas && album.listaFaixas.length > 0) {
      return album.listaFaixas;
    }
    const numeroDeFaixas = parseInt(album.faixas) || 10; 
    const idBase = album.titulo.replace(/[^a-zA-Z0-9]/g, '').toLowerCase(); 

    const faixasGeradas = [];
    for (let i = 1; i <= numeroDeFaixas; i++) {
      faixasGeradas.push({
        id: `${idBase}_faixa_${i}`,
        titulo: `Faixa ${i}`
      });
    }
    return faixasGeradas;
  };

  const faixasParaAvaliar = albumAberto ? obterFaixasDoAlbum(albumAberto) : [];

  return (
    <>
      <div className="album-grid">
        {albuns.map((album, indice) => (
          <article 
            className="album-card cursor-pointer hover:opacity-80 transition-opacity" 
            key={`${album.titulo}-${indice}`}
            onClick={() => {
              // Este console.log ajuda-nos a debugar se o clique funcionou
              console.log("🔥 Clicou no álbum:", album.titulo);
              setAlbumAberto(album);
            }}
          >
            <div className="album-art" style={{ overflow: "hidden", position: "relative" }}>
              {album.capa ? (
                <img src={album.capa} alt={album.titulo} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <>
                  <span>{nomeArtista.split(" ").slice(0, 2).join("\n") || "DISCO"}</span>
                  <small>{siglas} — {String(indice + 1).padStart(2, "0")}</small>
                </>
              )}
            </div>
            <div className="album-meta">
              <span>{album.ano}</span>
              <span>{album.faixas}</span>
            </div>
            <h3>{album.titulo}</h3>
            <p>{album.reproducoes} reproduções</p>
            
            <Avaliacao idElemento={`album_${album.titulo.replace(/[^a-zA-Z0-9]/g, '')}`} />
          </article>
        ))}
      </div>

      {albumAberto && (
        <div 
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onClick={() => setAlbumAberto(null)}
        >
          {/* Fundo mudado para #F8F5EE (Creme) e borda mais suave */}
          <div 
            style={{ backgroundColor: '#F8F5EE', border: '1px solid #e5e7eb', borderRadius: '12px', display: 'flex', gap: '24px', width: '800px', maxWidth: '95vw', height: '500px', padding: '24px', position: 'relative' }}
            onClick={(e) => e.stopPropagation()} 
          >
            <button 
              onClick={() => setAlbumAberto(null)}
              style={{ position: 'absolute', top: '16px', right: '16px', color: '#9ca3af', fontWeight: 'bold', background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px' }}
            >
              ✕
            </button>

            <div style={{ width: '50%', display: 'flex', flexDirection: 'column', height: '100%', borderRight: '1px solid #e5e7eb', paddingRight: '24px' }}>
              {albumAberto.capa ? (
                <img src={albumAberto.capa} alt={albumAberto.titulo} style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
              ) : (
                <div style={{ width: '100%', aspectRatio: '1/1', backgroundColor: '#e4e4e7', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                   <span style={{ color: '#71717a', fontWeight: 'bold', fontSize: '24px' }}>{siglas}</span>
                </div>
              )}
              {/* Texto do título escurecido para #18181b */}
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '16px', color: '#18181b' }}>{albumAberto.titulo}</h2>
              <p style={{ color: '#52525b', marginTop: '4px' }}>{albumAberto.ano}</p>
            </div>

            <div style={{ width: '50%', overflowY: 'auto', paddingRight: '8px' }}>
              {/* Título "Avaliar Faixas" escurecido */}
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#18181b' }}>Avaliar Faixas</h3>
              
              {faixasParaAvaliar.map((faixa, index) => (
                // Fundo das faixas mudado para branco com uma leve sombra para destacar no creme
                <div key={faixa.id} style={{ display: 'flex', flexDirection: 'column', marginBottom: '16px', padding: '12px', backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #f4f4f5' }}>
                  {/* Nome da faixa escurecido */}
                  <span style={{ color: '#27272a', fontWeight: '500', marginBottom: '8px' }}>
                    {index + 1}. {faixa.titulo}
                  </span>
                  <Avaliacao idElemento={faixa.id} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}