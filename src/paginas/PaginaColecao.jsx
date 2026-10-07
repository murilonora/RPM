import { useUsuario } from "../contextos/ContextoUsuario";
import { listaDeArtistas } from "../dados/dadosMusicais";
import { AvaliacaoVinil } from "../componentes/AvaliacaoVinil";

// Pagina que exibe todas as avaliacoes e estatisticas do usuario logado
export function PaginaColecao({ aoSelecionarArtista }) {
  const { usuarioLogado, avaliacoes, totalAvaliacoes, mediaAvaliacoes } = useUsuario();

  // Se nao estiver logado, exibe mensagem orientando o login
  if (!usuarioLogado) {
    return (
      <main className="page-grid">
        <div className="page-header" style={{ textAlign: "center", padding: "80px 20px" }}>
          <h2 className="page-title">Minha Colecao</h2>
          <p className="page-subtitle">Faca login para ver suas avaliacoes e estatisticas.</p>
        </div>
      </main>
    );
  }

  // Mapeia as chaves de avaliacao para objetos com dados completos do item avaliado
  const itensAvaliados = Object.entries(avaliacoes)
    .filter(([, obj]) => obj.nota > 0)
    .map(([chave, obj]) => {
      const nota = obj.nota;
      const comentario = obj.comentario;
      const partes = chave.split("-");
      const tipo = partes[0]; // "musica" ou "album"
      const indice = parseInt(partes[partes.length - 1], 10);
      const artistaId = partes.slice(1, -1).join("-");

      const artista = listaDeArtistas.find((a) => a.id === artistaId);
      if (!artista) return null;

      let titulo = "";
      let capa = null;

      if (tipo === "musica" && artista.musicas[indice]) {
        titulo = artista.musicas[indice].titulo;
        capa = artista.musicas[indice].capa;
      } else if (tipo === "album" && artista.albuns[indice]) {
        titulo = artista.albuns[indice].titulo;
        capa = artista.albuns[indice].capa;
      }

      return { chave, tipo, titulo, capa, nota, comentario, artista };
    })
    .filter(Boolean)
    .sort((a, b) => b.nota - a.nota);

  const musicasAvaliadas = itensAvaliados.filter((item) => item.tipo === "musica");
  const albunsAvaliados = itensAvaliados.filter((item) => item.tipo === "album");
  const favorito = itensAvaliados[0] || null;

  return (
    <main className="page-grid">
      <div className="page-header">
        <h2 className="page-title">Colecao de {usuarioLogado.nome}</h2>
        <p className="page-subtitle">Seu diario de criticas musicais</p>
      </div>

      {/* Cartoes de estatisticas */}
      <div className="colecao-estatisticas">
        <div className="estatistica-card">
          <strong>{totalAvaliacoes}</strong>
          <span>Avaliacoes</span>
        </div>
        <div className="estatistica-card">
          <strong>{mediaAvaliacoes}</strong>
          <span>Media (vinis)</span>
        </div>
        <div className="estatistica-card">
          <strong>{musicasAvaliadas.length}</strong>
          <span>Musicas</span>
        </div>
        <div className="estatistica-card">
          <strong>{albunsAvaliados.length}</strong>
          <span>Albuns</span>
        </div>
      </div>

      {/* Destaque do favorito absoluto */}
      {favorito && (
        <div className="colecao-favorito">
          <h3>Favorito Absoluto</h3>
          <div
            className="favorito-card"
            onClick={() => aoSelecionarArtista(favorito.artista)}
          >
            {favorito.capa && <img src={favorito.capa} alt={favorito.titulo} />}
            <div>
              <strong>{favorito.titulo}</strong>
              <span>
                {favorito.artista.nome} — {favorito.nota}/5 vinis
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Lista de albuns avaliados */}
      {albunsAvaliados.length > 0 && (
        <>
          <h3 className="colecao-secao-titulo">Albuns Avaliados</h3>
          <div className="grid-container">
            {albunsAvaliados.map((item) => (
              <div
                key={item.chave}
                className="grid-card"
                onClick={() => aoSelecionarArtista(item.artista)}
              >
                {item.capa ? (
                  <img src={item.capa} alt={item.titulo} className="card-img" />
                ) : (
                  <div className="card-img-placeholder">
                    {item.titulo.slice(0, 2).toUpperCase()}
                  </div>
                )}
                <div className="card-body">
                  <h3 className="card-title">{item.titulo}</h3>
                  <p className="card-subtitle">{item.artista.nome}</p>
                  <AvaliacaoVinil chaveItem={item.chave} tamanho="pequeno" apenasLeitura />
                  {item.comentario && (
                    <p style={{ marginTop: "12px", fontSize: "0.85rem", fontStyle: "italic", color: "#aaa" }}>
                      "{item.comentario}"
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Lista de musicas avaliadas */}
      {musicasAvaliadas.length > 0 && (
        <>
          <h3 className="colecao-secao-titulo">Musicas Avaliadas</h3>
          <div className="grid-container">
            {musicasAvaliadas.map((item) => (
              <div
                key={item.chave}
                className="grid-card"
                onClick={() => aoSelecionarArtista(item.artista)}
              >
                {item.capa ? (
                  <img src={item.capa} alt={item.titulo} className="card-img" />
                ) : (
                  <div className="card-img-placeholder">
                    {item.titulo.slice(0, 2).toUpperCase()}
                  </div>
                )}
                <div className="card-body">
                  <h3 className="card-title">{item.titulo}</h3>
                  <p className="card-subtitle">{item.artista.nome}</p>
                  <AvaliacaoVinil chaveItem={item.chave} tamanho="pequeno" apenasLeitura />
                  {item.comentario && (
                    <p style={{ marginTop: "12px", fontSize: "0.85rem", fontStyle: "italic", color: "#aaa" }}>
                      "{item.comentario}"
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Mensagem quando nao ha avaliacoes ainda */}
      {totalAvaliacoes === 0 && (
        <div style={{ textAlign: "center", padding: "40px 0", color: "#666" }}>
          <p>Voce ainda nao avaliou nenhum album ou musica.</p>
          <p>Navegue pelo catalogo e comece a dar suas notas em vinis!</p>
        </div>
      )}
    </main>
  );
}
