import { useMemo } from "react";
import { listaDeArtistas } from "../dados/dadosMusicais";

/**
 * Componente que renderiza um fundo de mosaico com colunas infinitas
 * deslizantes (vertical ticker / infinite marquee) com fotos de artistas
 * e capas de álbuns emblemáticas do acervo musical.
 */
export function FundoMosaicoHero({ aoSelecionarArtista }) {
  // Monta itens ricos (fotos de artistas + capas de álbuns icônicos)
  const colunas = useMemo(() => {
    // Lista de artistas com foto
    const artistasComFoto = listaDeArtistas
      .filter((a) => !!a.foto)
      .map((a) => ({
        tipo: "artista",
        id: a.id,
        nome: a.nome,
        sub: a.categoria,
        imagem: a.foto,
        artistaRef: a,
      }));

    // Capas de álbuns
    const capasAlbuns = [];
    listaDeArtistas.forEach((a) => {
      a.albuns.forEach((alb) => {
        if (alb.capa) {
          capasAlbuns.push({
            tipo: "album",
            id: `${a.id}-${alb.titulo}`,
            nome: alb.titulo,
            sub: a.nome,
            imagem: alb.capa,
            artistaRef: a,
          });
        }
      });
    });

    // Embaralha de forma determinística intercalando artistas e álbuns
    const todosItens = [];
    const maxLen = Math.max(artistasComFoto.length, capasAlbuns.length);
    for (let i = 0; i < maxLen; i++) {
      if (i < artistasComFoto.length) todosItens.push(artistasComFoto[i]);
      if (i < capasAlbuns.length) todosItens.push(capasAlbuns[i]);
    }

    // Dividimos em 6 colunas para telas ultra-wide / desktop
    const NUM_COLUNAS = 6;
    const cols = Array.from({ length: NUM_COLUNAS }, () => []);

    todosItens.forEach((item, index) => {
      cols[index % NUM_COLUNAS].push(item);
    });

    return cols;
  }, []);

  return (
    <div className="hero-mosaic-container" aria-hidden="true">
      {colunas.map((colunaItens, colIndex) => {
        // Direção alternada: colunas pares sobem, ímpares descem
        const direcaoClasse = colIndex % 2 === 0 ? "mover-cima" : "mover-baixo";
        // Variação suave de duração para que as colunas fiquem orgânicas
        const duracoes = [70, 85, 65, 90, 75, 80];
        const duracao = duracoes[colIndex % duracoes.length];

        return (
          <div key={`col-${colIndex}`} className="hero-mosaic-col">
            <div
              className={`hero-mosaic-track ${direcaoClasse}`}
              style={{ animationDuration: `${duracao}s` }}
            >
              {/* Duplicamos o conteúdo 2x para o loop infinito sem descontinuidade */}
              {[...colunaItens, ...colunaItens].map((item, idx) => (
                <div
                  key={`${item.id}-${idx}`}
                  className="hero-mosaic-card"
                  onClick={() => aoSelecionarArtista && aoSelecionarArtista(item.artistaRef)}
                >
                  <img
                    src={item.imagem}
                    alt={item.nome}
                    className="hero-mosaic-img"
                    loading="lazy"
                  />
                  <div className="hero-mosaic-card-info">
                    <span className="hero-mosaic-badge">
                      {item.tipo === "artista" ? "ARTISTA" : "ÁLBUM"}
                    </span>
                    <strong className="hero-mosaic-nome">{item.nome}</strong>
                    <span className="hero-mosaic-sub">{item.sub}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* Camada de textura de vinil e granulação cinematográfica */}
      <div className="hero-mosaic-overlay-shade" />
      <div className="hero-mosaic-vignette" />
    </div>
  );
}
