import { useState, useEffect, lazy, Suspense } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
  useParams,
} from "react-router-dom";
import { ProvedorUsuario } from "./contextos/ContextoUsuario";
import { Cabecalho } from "./componentes/Cabecalho";
import { ModalAutenticacao } from "./componentes/ModalAutenticacao";
import { PaginaInicial } from "./paginas/PaginaInicial";
import { listaDeArtistas } from "./dados/dadosMusicais";
import { ModalAvaliacao } from "./componentes/ModalAvaliacao";

// A página inicial vai no pacote principal; as demais só baixam quando abertas
const PaginaArtista = lazy(() =>
  import("./paginas/PaginaArtista").then((m) => ({ default: m.PaginaArtista }))
);
const PaginaTodosArtistas = lazy(() =>
  import("./paginas/PaginaTodosArtistas").then((m) => ({ default: m.PaginaTodosArtistas }))
);
const PaginaTodosAlbuns = lazy(() =>
  import("./paginas/PaginaTodosAlbuns").then((m) => ({ default: m.PaginaTodosAlbuns }))
);
const PaginaColecao = lazy(() =>
  import("./paginas/PaginaColecao").then((m) => ({ default: m.PaginaColecao }))
);

// Rola suavemente ao topo em qualquer transição de rota
function ScrollAoTopo() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
}

// Wrapper que resolve o artista dinamicamente pela URL /artista/:id
function PaginaArtistaComUrl({ aoAvaliar }) {
  const { id } = useParams();

  const artista =
    listaDeArtistas.find((a) => a.id === id) || listaDeArtistas[0];

  useEffect(() => {
    if (artista) {
      document.title = `${artista.nome} // RPM`;
    }
  }, [artista]);

  return <PaginaArtista artista={artista} aoAvaliar={aoAvaliar} />;
}

// Shell principal com gerenciamento de rotas e estado global
function ShellAplicativo() {
  const navigate = useNavigate();
  const location = useLocation();
  const [modalAutenticacaoVisivel, setModalAutenticacaoVisivel] = useState(false);
  const [dadosAvaliacao, setDadosAvaliacao] = useState({ visivel: false, item: null });

  // Sincroniza o título padrão da página nas rotas principais
  useEffect(() => {
    const titulos = {
      "/": "RPM // Arquivo Musical Brasileiro",
      "/artistas": "Catálogo de Artistas // RPM",
      "/albuns": "Discografias Oficiais // RPM",
      "/colecao": "Minha Coleção // RPM",
    };
    if (titulos[location.pathname]) {
      document.title = titulos[location.pathname];
    }
  }, [location.pathname]);

  function sortearArtistaAleatorioENavegar() {
    const indiceAleatorio = Math.floor(Math.random() * listaDeArtistas.length);
    const sorteado = listaDeArtistas[indiceAleatorio];
    navigate(`/artista/${sorteado.id}`);
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
    <div className="app-shell">
      <ScrollAoTopo />
      <Cabecalho
        aoClicarDescobrir={sortearArtistaAleatorioENavegar}
        aoClicarEntrar={abrirModalDeAutenticacao}
      />

      <Suspense fallback={<main className="carregando-pagina" aria-busy="true" />}>
        <Routes>
          <Route path="/" element={<PaginaInicial />} />
          <Route path="/artistas" element={<PaginaTodosArtistas />} />
          <Route path="/albuns" element={<PaginaTodosAlbuns aoAvaliar={abrirAvaliacao} />} />
          <Route path="/artista/:id" element={<PaginaArtistaComUrl aoAvaliar={abrirAvaliacao} />} />
          <Route
            path="/colecao"
            element={
              <PaginaColecao aoAvaliar={abrirAvaliacao} aoAbrirLogin={abrirModalDeAutenticacao} />
            }
          />
          {/* Rota coringa com redirecionamento para o início */}
          <Route path="*" element={<PaginaInicial />} />
        </Routes>
      </Suspense>

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
  );
}

// Componente raiz exportado com provedor de autenticação e roteador
export default function Aplicativo() {
  return (
    <ProvedorUsuario>
      <BrowserRouter>
        <ShellAplicativo />
      </BrowserRouter>
    </ProvedorUsuario>
  );
}
