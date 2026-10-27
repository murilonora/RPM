import { useState, useEffect, useCallback, lazy, Suspense } from "react";
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
import { ProvedorCatalogo, useCatalogo } from "./contextos/ContextoCatalogo";
import { ModalAvaliacao } from "./componentes/ModalAvaliacao";
import { ModalFaixasDoAlbum } from "./componentes/ModalFaixasDoAlbum";

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

// Resolve o artista pela URL /artista/:id. Id inexistente mostra "Artista não encontrado"
// (antes abria o primeiro artista da lista e a tela de erro nunca aparecia)
function PaginaArtistaComUrl({ aoAbrirAlbum, aoAbrirLogin }) {
  const { id } = useParams();
  const { artistasPorId } = useCatalogo();
  const artista = artistasPorId.get(id);

  useEffect(() => {
    if (artista) {
      document.title = `${artista.nome} // RPM`;
    }
  }, [artista]);

  return (
    <PaginaArtista
      artista={artista}
      aoAbrirAlbum={aoAbrirAlbum}
      aoAbrirLogin={aoAbrirLogin}
    />
  );
}

// Shell principal com gerenciamento de rotas e estado global
function ShellAplicativo() {
  const navigate = useNavigate();
  const location = useLocation();
  const { artistas } = useCatalogo();
  const [modalAutenticacaoVisivel, setModalAutenticacaoVisivel] = useState(false);
  // Álbum aberto na ficha de faixas: { artista, album, indice }
  const [albumAberto, setAlbumAberto] = useState(null);
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

  // Botão "Descobrir": abre o perfil de um artista sorteado
  function sortearArtistaAleatorioENavegar() {
    const sorteado = artistas[Math.floor(Math.random() * artistas.length)];
    navigate(`/artista/${sorteado.id}`);
  }

  // Abre a janela de login/cadastro (usada por qualquer ação que exige conta)
  function abrirModalDeAutenticacao() {
    setModalAutenticacaoVisivel(true);
  }

  // Fecha a janela de login/cadastro
  function fecharModalDeAutenticacao() {
    setModalAutenticacaoVisivel(false);
  }

  // Abre o modal de nota e resenha para a obra escolhida na Coleção
  function abrirAvaliacao(itemProps) {
    setDadosAvaliacao({ visivel: true, item: itemProps });
  }

  // Fecha a janela de faixas (estável para o efeito do Esc no modal não ser recriado)
  const fecharAlbum = useCallback(() => setAlbumAberto(null), []);

  // Fecha o modal de nota e resenha
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
          <Route path="/albuns" element={<PaginaTodosAlbuns aoAbrirAlbum={setAlbumAberto} aoAbrirLogin={abrirModalDeAutenticacao} />} />
          <Route path="/artista/:id" element={<PaginaArtistaComUrl aoAbrirAlbum={setAlbumAberto} aoAbrirLogin={abrirModalDeAutenticacao} />} />
          <Route
            path="/colecao"
            element={
              <PaginaColecao aoAvaliar={abrirAvaliacao} aoAbrirLogin={abrirModalDeAutenticacao} />
            }
          />
          {/* Qualquer endereço desconhecido mostra a página inicial */}
          <Route path="*" element={<PaginaInicial />} />
        </Routes>
      </Suspense>

      {/* Ordem importa: o que vem depois fica por cima (resenha e login abrem sobre a ficha do álbum) */}
      {albumAberto && (
        <ModalFaixasDoAlbum
          dados={albumAberto}
          aoFechar={fecharAlbum}
          aoAbrirLogin={abrirModalDeAutenticacao}
        />
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
  );
}

// Componente raiz: catálogo (backend ou local), usuário e roteador
export default function Aplicativo() {
  return (
    <ProvedorCatalogo>
      <ProvedorUsuario>
        <BrowserRouter>
          <ShellAplicativo />
        </BrowserRouter>
      </ProvedorUsuario>
    </ProvedorCatalogo>
  );
}
