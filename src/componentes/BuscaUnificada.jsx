import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { listaDeArtistas } from "../dados/dadosMusicais";
import { imagemNoTamanho, normalizarTexto, tratarErroImagem } from "../utilitarios/comuns";

const MAX_POR_GRUPO = 6;

const GRUPOS = [
  { tipo: "artista", titulo: "Artistas", selo: "Artista" },
  { tipo: "musica", titulo: "Músicas", selo: "Música" },
  { tipo: "album", titulo: "Álbuns", selo: "Álbum" },
];

// Índice montado uma única vez: o texto já vem normalizado, então cada tecla
// só faz "includes" em vez de remover acentos de todo o acervo de novo
const INDICE_BUSCA = listaDeArtistas.flatMap((artista) => {
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

// Barra de busca da página inicial: artistas, músicas e álbuns num só lugar,
// navegável por teclado (setas, Enter e Esc) no padrão combobox
export function BuscaUnificada({ termo, aoMudarTermo }) {
  const navigate = useNavigate();
  const raizRef = useRef(null);
  const [aberto, setAberto] = useState(false);
  const [indiceAtivo, setIndiceAtivo] = useState(-1);

  const termoNormalizado = normalizarTexto(termo);

  // Resultados agrupados e uma lista plana na mesma ordem, para as setas do teclado
  const { grupos, planos } = useMemo(() => {
    if (!termoNormalizado) return { grupos: [], planos: [] };
    const grupos = GRUPOS.map((grupo) => ({
      ...grupo,
      itens: INDICE_BUSCA.filter(
        (item) => item.tipo === grupo.tipo && item.texto.includes(termoNormalizado)
      ).slice(0, MAX_POR_GRUPO),
    })).filter((grupo) => grupo.itens.length > 0);
    return { grupos, planos: grupos.flatMap((grupo) => grupo.itens) };
  }, [termoNormalizado]);

  const mostrarResultados = aberto && termoNormalizado.length > 0;

  // Fecha ao clicar fora da busca
  useEffect(() => {
    if (!mostrarResultados) return;
    function aoPressionarFora(evento) {
      if (raizRef.current && !raizRef.current.contains(evento.target)) {
        setAberto(false);
      }
    }
    document.addEventListener("pointerdown", aoPressionarFora);
    return () => document.removeEventListener("pointerdown", aoPressionarFora);
  }, [mostrarResultados]);

  function irPara(item) {
    setAberto(false);
    navigate(item.destino);
  }

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
        <div className="busca-dropdown" id="busca-resultados" role="listbox" aria-label="Resultados da busca">
          {planos.length === 0 ? (
            <p className="busca-vazio">Nada encontrado para "{termo}". Tente outro nome ou título.</p>
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
