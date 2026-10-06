import { useState } from "react";
import { Cabecalho } from "./componentes/Cabecalho";
import { PaginaInicial } from "./paginas/PaginaInicial";
import { PaginaArtista } from "./paginas/PaginaArtista";
import { PaginaTodosArtistas } from "./paginas/PaginaTodosArtistas";
import { PaginaTodosAlbuns } from "./paginas/PaginaTodosAlbuns";
import { listaDeArtistas } from "./dados/dadosMusicais";

// Componente raiz da aplicacao
export default function Aplicativo() {
  const [paginaAtual, setPaginaAtual] = useState("inicio");
  const [artistaSelecionado, setArtistaSelecionado] = useState(listaDeArtistas[0]);

  function navegarParaInicio() {
    setPaginaAtual("inicio");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function selecionarArtista(artista) {
    setArtistaSelecionado(artista);
    setPaginaAtual("artista");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function descobrirAleatorio() {
    const indiceAleatorio = Math.floor(Math.random() * listaDeArtistas.length);
    selecionarArtista(listaDeArtistas[indiceAleatorio]);
  }

  function mostrarTodosArtistas() {
    setPaginaAtual("todos-artistas");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function mostrarTodosAlbuns() {
    setPaginaAtual("todos-albuns");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="app-shell">
      <Cabecalho
        aoIrParaInicio={navegarParaInicio}
        aoClicarDescobrir={descobrirAleatorio}
        aoClicarArtistas={mostrarTodosArtistas}
        aoClicarAlbuns={mostrarTodosAlbuns}
      />

      {paginaAtual === "inicio" && (
        <PaginaInicial aoSelecionarArtista={selecionarArtista} />
      )}

      {paginaAtual === "artista" && (
        <PaginaArtista
          artista={artistaSelecionado}
          aoVoltarAoInicio={navegarParaInicio}
        />
      )}

      {paginaAtual === "todos-artistas" && (
        <PaginaTodosArtistas aoSelecionarArtista={selecionarArtista} />
      )}

      {paginaAtual === "todos-albuns" && (
        <PaginaTodosAlbuns aoSelecionarArtista={selecionarArtista} />
      )}
    </div>
  );
}
