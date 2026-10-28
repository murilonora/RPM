import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCatalogo } from "../contextos/ContextoCatalogo";
import { imagemNoTamanho, tratarErroImagem } from "../utilitarios/imagens";
import { normalizarTexto } from "../utilitarios/texto";

const MAX_POR_GRUPO = 6;
const ALTURA_MAXIMA_LISTA = 420;
const ALTURA_MINIMA_LISTA = 110;
const FOLGA_BORDA_PX = 12;

// Resultado secreto: só o nome completo "Matheus Rocha" (idealizador do RPM) revela a
// faixa bônus dele; "matheus" sozinho não mostra nada de especial.
const NOME_SECRETO = "matheus rocha";
const RESULTADO_MATHEUS = {
  tipo: "bonus",
  chave: "bonus-matheus",
  foto: "/assets/matheus/foto-1.jpg",
  titulo: "Matheus Rocha",
  subtitulo: "Idealizador do RPM · Faixa bônus",
  destino: "/faixa-bonus",
};

const GRUPOS = [
  { tipo: "bonus", titulo: "Faixa bônus", selo: "Lado B" },
  { tipo: "artista", titulo: "Artistas", selo: "Artista" },
  { tipo: "musica", titulo: "Músicas", selo: "Música" },
  { tipo: "album", titulo: "Álbuns", selo: "Álbum" },
];

// Índice de busca: o texto já vem normalizado, então cada tecla só faz "includes"
// em vez de remover acentos de todo o acervo de novo. Montado uma vez por catálogo.
function montarIndiceBusca(artistas) {
  return artistas.flatMap((artista) => {
    const destino = `/artista/${artista.id}`;
    return [
      {
        tipo: "artista",
        chave: `artista-${artista.id}`,
        texto: normalizarTexto(`${artista.nome} ${artista.genero} ${artista.categoria}`),
        foto: artista.foto,
        titulo: artista.nome,
        subtitulo: `${artista.categoria} · ${artista.origem}`,
        destino,
      },
      ...artista.musicas.map((musica, idx) => ({
        tipo: "musica",
        chave: `musica-${artista.id}-${idx}`,
        texto: normalizarTexto(musica.titulo),
        foto: musica.capa || artista.foto,
        titulo: musica.titulo,
        subtitulo: `${musica.album} · ${artista.nome}`,
        destino,
      })),
      ...artista.albuns.map((album, idx) => ({
        tipo: "album",
        chave: `album-${artista.id}-${idx}`,
        texto: normalizarTexto(album.titulo),
        foto: album.capa || artista.foto,
        titulo: album.titulo,
        subtitulo: `${album.ano} · ${artista.nome}`,
        destino,
      })),
    ];
  });
}

// Barra de busca da página inicial: artistas, músicas e álbuns num só lugar,
// navegável por teclado (setas, Enter e Esc) no padrão combobox
export function BuscaUnificada({ termo, aoMudarTermo }) {
  const navigate = useNavigate();
  const { artistas } = useCatalogo();
  const indiceBusca = useMemo(() => montarIndiceBusca(artistas), [artistas]);
  // Sugestões para busca sem resultado: os 4 artistas com a música mais tocada do acervo
  const sugestoes = useMemo(
    () =>
      [...artistas]
        .sort((a, b) => (b.musicas[0]?.streams || 0) - (a.musicas[0]?.streams || 0))
        .slice(0, 4),
    [artistas]
  );
  const raizRef = useRef(null);
  const listaRef = useRef(null);
  const [aberto, setAberto] = useState(false);
  const [indiceAtivo, setIndiceAtivo] = useState(-1);

  const termoNormalizado = normalizarTexto(termo);

  // Resultados agrupados e uma lista plana na mesma ordem, para as setas do teclado
  const { grupos, planos } = useMemo(() => {
    if (!termoNormalizado) return { grupos: [], planos: [] };
    const achouMatheus = termoNormalizado.replace(/\s+/g, " ") === NOME_SECRETO;
    const grupos = GRUPOS.map((grupo) => ({
      ...grupo,
      itens:
        grupo.tipo === "bonus"
          ? achouMatheus ? [RESULTADO_MATHEUS] : []
          : indiceBusca
              .filter((item) => item.tipo === grupo.tipo && item.texto.includes(termoNormalizado))
              .slice(0, MAX_POR_GRUPO),
    })).filter((grupo) => grupo.itens.length > 0);
    return { grupos, planos: grupos.flatMap((grupo) => grupo.itens) };
  }, [termoNormalizado, indiceBusca]);

  const mostrarResultados = aberto && termoNormalizado.length > 0;

  // A lista cabe dentro do banner (.home-hero): a altura vai só até a borda de baixo dele,
  // e o que não couber rola dentro da própria lista em vez de cobrir a seção seguinte
  useLayoutEffect(() => {
    if (!mostrarResultados) return;
    // Mede o espaço entre a lista e a borda do banner e limita a altura a ele
    function ajustarAltura() {
      const lista = listaRef.current;
      const banner = raizRef.current?.closest(".home-hero");
      if (!lista || !banner) return;
      const espaco = banner.getBoundingClientRect().bottom - lista.getBoundingClientRect().top - FOLGA_BORDA_PX;
      const altura = Math.max(ALTURA_MINIMA_LISTA, Math.min(ALTURA_MAXIMA_LISTA, espaco));
      lista.style.maxHeight = `${altura}px`;
    }
    ajustarAltura();
    window.addEventListener("resize", ajustarAltura);
    return () => window.removeEventListener("resize", ajustarAltura);
  }, [mostrarResultados]);

  // Fecha ao clicar fora da busca
  useEffect(() => {
    if (!mostrarResultados) return;
    // Clique fora da busca fecha a lista
    function aoPressionarFora(evento) {
      if (raizRef.current && !raizRef.current.contains(evento.target)) {
        setAberto(false);
      }
    }
    document.addEventListener("pointerdown", aoPressionarFora);
    return () => document.removeEventListener("pointerdown", aoPressionarFora);
  }, [mostrarResultados]);

  // Fecha a lista e abre a página do resultado escolhido
  function irPara(item) {
    setAberto(false);
    navigate(item.destino);
  }

  // Teclado: setas andam pelos resultados e Esc fecha a lista
  function aoTeclar(evento) {
    if (evento.key === "Escape") {
      setAberto(false);
      return;
    }
    if (!planos.length) return;
    if (evento.key === "ArrowDown") {
      evento.preventDefault();
      setAberto(true);
      setIndiceAtivo((atual) => (atual + 1) % planos.length);
    } else if (evento.key === "ArrowUp") {
      evento.preventDefault();
      setIndiceAtivo((atual) => (atual <= 0 ? planos.length - 1 : atual - 1));
    }
  }

  // Enter/botão: abre o resultado destacado (ou o primeiro)
  function aoEnviar(evento) {
    evento.preventDefault();
    const escolhido = planos[indiceAtivo] || planos[0];
    if (escolhido) irPara(escolhido);
  }

  const idAtivo = mostrarResultados && planos[indiceAtivo] ? `busca-opcao-${indiceAtivo}` : undefined;

  return (
    <form className="search-box" role="search" onSubmit={aoEnviar} ref={raizRef}>
      <span className="search-symbol" aria-hidden="true" />
      <input
        value={termo}
        onChange={(e) => {
          aoMudarTermo(e.target.value);
          setAberto(true);
          setIndiceAtivo(-1);
        }}
        onFocus={() => setAberto(true)}
        onKeyDown={aoTeclar}
        placeholder="Pesquise artista, música ou álbum..."
        aria-label="Pesquisar artista, música ou álbum"
        autoComplete="off"
        role="combobox"
        aria-expanded={mostrarResultados}
        aria-controls="busca-resultados"
        aria-autocomplete="list"
        aria-activedescendant={idAtivo}
      />
      <button type="submit" aria-label="Buscar">→</button>

      {mostrarResultados && (
        <div className="busca-dropdown" ref={listaRef} id="busca-resultados" role="listbox" aria-label="Resultados da busca">
          {planos.length === 0 ? (
            <>
              <p className="busca-vazio">Nada encontrado para "{termo}". Tente outro nome ou título.</p>
              <div className="busca-sugestoes">
                <span>Que tal:</span>
                {sugestoes.map((artista) => (
                  <button
                    key={artista.id}
                    type="button"
                    onClick={() => irPara({ destino: `/artista/${artista.id}` })}
                  >
                    {artista.nome}
                  </button>
                ))}
              </div>
            </>
          ) : (
            grupos.map((grupo) => (
              <div key={grupo.tipo} role="group" aria-label={grupo.titulo}>
                <p className="busca-grupo-titulo" aria-hidden="true">{grupo.titulo}</p>
                {grupo.itens.map((item) => {
                  const indice = planos.indexOf(item);
                  const ativo = indice === indiceAtivo;
                  return (
                    <Link
                      key={item.chave}
                      id={`busca-opcao-${indice}`}
                      to={item.destino}
                      role="option"
                      aria-selected={ativo}
                      className={`busca-item ${ativo ? "ativo" : ""}`}
                      // mousemove (e não mouseenter): a lista abrir sob um cursor parado
                      // não deve roubar a seleção feita pelas setas
                      onMouseMove={() => indice !== indiceAtivo && setIndiceAtivo(indice)}
                      onClick={() => setAberto(false)}
                    >
                      <img
                        src={imagemNoTamanho(item.foto, 250)}
                        alt=""
                        className="busca-item-foto"
                        onError={tratarErroImagem}
                      />
                      <span className="busca-item-textos">
                        <span className={`busca-selo busca-selo--${item.tipo}`}>{grupo.selo}</span>
                        <strong className="busca-item-titulo">{item.titulo}</strong>
                        <small className="busca-item-sub">{item.subtitulo}</small>
                      </span>
                    </Link>
                  );
                })}
              </div>
            ))
          )}
        </div>
      )}
    </form>
  );
}
