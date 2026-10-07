import { useState } from "react";
import { ProvedorUsuario } from "./contextos/ContextoUsuario";
import { Cabecalho } from "./componentes/Cabecalho";
import { ModalAutenticacao } from "./componentes/ModalAutenticacao";
import { PaginaInicial } from "./paginas/PaginaInicial";
import { PaginaArtista } from "./paginas/PaginaArtista";
import { PaginaTodosArtistas } from "./paginas/PaginaTodosArtistas";
import { PaginaTodosAlbuns } from "./paginas/PaginaTodosAlbuns";
import { PaginaColecao } from "./paginas/PaginaColecao";
import { listaDeArtistas } from "./dados/dadosMusicais";
import { ModalAvaliacao } from "./componentes/ModalAvaliacao";

// Componente raiz da aplicacao com gerenciamento de rotas e estado global
export default function Aplicativo() {
  const [paginaAtual, setPaginaAtual] = useState("inicio");
  const [artistaSelecionado, setArtistaSelecionado] = useState(listaDeArtistas[0]);
  const [modalAutenticacaoVisivel, setModalAutenticacaoVisivel] = useState(false);
  const [dadosAvaliacao, setDadosAvaliacao] = useState({ visivel: false, item: null });

  function navegarParaInicio() {
    setPaginaAtual("inicio");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function selecionarArtista(artista) {
    setArtistaSelecionado(artista);
    setPaginaAtual("artista");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function sortearArtistaAleatorioENavegar() {
    const indiceAleatorio = Math.floor(Math.random() * listaDeArtistas.length);
    selecionarArtista(listaDeArtistas[indiceAleatorio]);
  }

  function navegarParaPaginaDeTodosArtistas() {
    setPaginaAtual("todos-artistas");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function navegarParaPaginaDeTodosAlbuns() {
    setPaginaAtual("todos-albuns");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function navegarParaColecao() {
    setPaginaAtual("colecao");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function abrirModalDeAutenticacao() {
    setModalAutenticacaoVisivel(true);
  }

  function fecharModalDeAutenticacao() {
    setModalAutenticacaoVisivel(false);
  }

  function abrirAvaliacao(itemProps) {
    setDadosAvaliacao({ visivel: true, item: itemProps });
  }

  function fecharAvaliacao() {
    setDadosAvaliacao({ visivel: false, item: null });
  }

  return (
    <ProvedorUsuario>
      <div className="app-shell">
        <Cabecalho
          aoIrParaInicio={navegarParaInicio}
          aoClicarDescobrir={sortearArtistaAleatorioENavegar}
          aoClicarArtistas={navegarParaPaginaDeTodosArtistas}
          aoClicarAlbuns={navegarParaPaginaDeTodosAlbuns}
          aoClicarColecao={navegarParaColecao}
          aoClicarEntrar={abrirModalDeAutenticacao}
        />

        {paginaAtual === "inicio" && (
          <PaginaInicial aoSelecionarArtista={selecionarArtista} />
        )}

        {paginaAtual === "artista" && (
          <PaginaArtista
            artista={artistaSelecionado}
            aoVoltarAoInicio={navegarParaInicio}
            aoAvaliar={abrirAvaliacao}
          />
        )}

        {paginaAtual === "todos-artistas" && (
          <PaginaTodosArtistas aoSelecionarArtista={selecionarArtista} />
        )}

        {paginaAtual === "todos-albuns" && (
          <PaginaTodosAlbuns aoSelecionarArtista={selecionarArtista} aoAvaliar={abrirAvaliacao} />
        )}

        {paginaAtual === "colecao" && (
          <PaginaColecao aoSelecionarArtista={selecionarArtista} />
        )}

        <ModalAutenticacao
          visivel={modalAutenticacaoVisivel}
          aoFechar={fecharModalDeAutenticacao}
        />

        <ModalAvaliacao
          visivel={dadosAvaliacao.visivel}
          item={dadosAvaliacao.item}
          aoFechar={fecharAvaliacao}
        />
      </div>
    </ProvedorUsuario>
  );
}
