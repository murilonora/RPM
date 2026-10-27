import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { categoriasMusicais } from "../dados/dadosMusicais";
import { useCatalogo } from "../contextos/ContextoCatalogo";
import { FundoMosaicoHero } from "../componentes/FundoMosaicoHero";
import { ImagemComFallback } from "../componentes/ImagemComFallback";
import { BuscaUnificada } from "../componentes/BuscaUnificada";
import { HistoriasEmDestaque } from "../componentes/HistoriasEmDestaque";
import { normalizarTexto } from "../utilitarios/texto";

const INTERVALO_EXPLORAR_MS = 7000;

// Texto de busca de cada artista (nome, gênero, categoria, músicas e álbuns), sem acentos.
// Montado uma vez por catálogo, não a cada tecla.
function montarTextosDeBusca(artistas) {
  return new Map(
    artistas.map((artista) => [
      artista.id,
      normalizarTexto(
        [
          artista.nome,
          artista.categoria,
          artista.genero,
          ...artista.musicas.map((m) => m.titulo),
          ...artista.albuns.map((a) => a.titulo),
        ].join(" ")
      ),
    ])
  );
}

// Embaralhamento Fisher-Yates: cada ordem tem a mesma chance de sair
function sortearArtistas(artistas, quantidade) {
  const copia = [...artistas];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia.slice(0, quantidade);
}

// Sugestões rotativas isoladas num componente próprio: o intervalo de 7s
// redesenha só esta linha, e não a página inteira
function ExplorarArtistas() {
  const { artistas } = useCatalogo();
  const [sugeridos, setSugeridos] = useState(() => sortearArtistas(artistas, 5));

  useEffect(() => {
    const intervalo = setInterval(() => setSugeridos(sortearArtistas(artistas, 5)), INTERVALO_EXPLORAR_MS);
    return () => clearInterval(intervalo);
  }, [artistas]);

  return (
    <div className="quick-search">
      <button
        type="button"
        className="quick-search-sortear"
        onClick={() => setSugeridos(sortearArtistas(artistas, 5))}
        title="Sortear outros artistas"
      >
        Explorar ⟳
      </button>
      {sugeridos.map((artista) => (
        <Link key={artista.id} to={`/artista/${artista.id}`} className="btn-explorar-item">
          {artista.nome}
        </Link>
      ))}
    </div>
  );
}

// Página inicial com barra de busca unificada (artistas, músicas e álbuns)
export function PaginaInicial() {
  const [termoBusca, setTermoBusca] = useState("");
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todos");
  const { artistas } = useCatalogo();
  const textosDeBusca = useMemo(() => montarTextosDeBusca(artistas), [artistas]);

  const termo = normalizarTexto(termoBusca);

  // Filtro da grade de cards (por categoria + busca)
  const artistasFiltradosCatalogo = useMemo(
    () =>
      artistas.filter(
        (artista) =>
          (!termo || textosDeBusca.get(artista.id).includes(termo)) &&
          (categoriaAtiva === "Todos" || artista.categoria === categoriaAtiva)
      ),
    [artistas, textosDeBusca, termo, categoriaAtiva]
  );

  return (
    <main>
      <section className="home-hero">
        <FundoMosaicoHero />
        <div className="hero-content">
          <h1>Toda música tem uma história.</h1>
          <p className="hero-copy">
            Arquivo definitivo da música. Explore discografias essenciais, descubra trajetórias históricas e monte sua coleção de críticas em vinil.
          </p>

          <BuscaUnificada termo={termoBusca} aoMudarTermo={setTermoBusca} />
          <ExplorarArtistas />
        </div>
        <span className="hero-index">RPM — ROTAÇÃO POR MINUTO</span>
      </section>

      {/* Filtros de categorias e grade de cards */}
      <section className="intro-section catalogo-secao">
        <div className="catalogo-cabecalho">
          <div>
            <p className="eyebrow">Catálogo Completo</p>
            <h2 className="catalogo-titulo">Selecione por vertente ou movimento</h2>
          </div>
          <div className="filtro-categorias" role="group" aria-label="Filtrar por vertente">
            {categoriasMusicais.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`filtro-categoria-btn ${categoriaAtiva === cat ? "ativo" : ""}`}
                aria-pressed={categoriaAtiva === cat}
                onClick={() => setCategoriaAtiva(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grade de cards */}
        <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-5 mt-6">
          {artistasFiltradosCatalogo.map((artista) => (
            <Link
              key={artista.id}
              to={`/artista/${artista.id}`}
              className="cartao-artista-home bg-white border border-[#191525] transition-all duration-200 hover:-translate-y-1 hover:shadow-lg overflow-hidden group"
            >
              <ImagemComFallback
                src={artista.foto}
                alt=""
                className="w-full h-44"
              />
              <div className="p-4">
                <span className="text-xs uppercase font-bold tracking-wider text-[#7e786b] block mb-1">
                  {artista.categoria}
                </span>
                <h3 className="m-0 mb-1.5 text-lg font-bold font-serif">
                  {artista.nome}
                </h3>
                <p className="m-0 text-sm text-[#555] line-clamp-2 leading-relaxed">
                  {artista.resumo}
                </p>
                <div className="mt-3 flex justify-between items-center text-xs font-semibold">
                  <span>{artista.ouvintesMensais} ouvintes</span>
                  <span className="text-[#ff0004] group-hover:translate-x-0.5 transition-transform">Ver perfil →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Matérias editoriais em destaque */}
      <HistoriasEmDestaque />
    </main>
  );
}
