// Catálogo de artistas compartilhado pelo site inteiro.
// Começa com os dados locais (dadosMusicais.ts), então a página nunca abre vazia,
// e troca pela lista do backend se GET /api/artistas responder com um catálogo válido.
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { listaDeArtistas } from "../dados/dadosMusicais";
import { buscarCatalogoDoServidor } from "../servicos/api";

// Monta o valor do contexto: a lista e um mapa por id (buscas rápidas na Coleção e na URL)
function montarCatalogo(artistas, origem) {
  return { artistas, artistasPorId: new Map(artistas.map((a) => [a.id, a])), origem };
}

const CATALOGO_LOCAL = montarCatalogo(listaDeArtistas, "local");

// Valor padrão = dados locais: componentes renderizados fora do provedor (ex.: testes) também funcionam
const ContextoCatalogo = createContext(CATALOGO_LOCAL);

// Provedor: tenta buscar o catálogo do backend uma vez, ao abrir o site
export function ProvedorCatalogo({ children }) {
  const [artistasDoServidor, setArtistasDoServidor] = useState(null);

  useEffect(() => {
    let ativo = true;
    buscarCatalogoDoServidor().then((lista) => {
      if (ativo && lista) setArtistasDoServidor(lista);
    });
    return () => {
      ativo = false;
    };
  }, []);

  // Só recria o valor quando a lista do servidor chega
  const valor = useMemo(
    () => (artistasDoServidor ? montarCatalogo(artistasDoServidor, "servidor") : CATALOGO_LOCAL),
    [artistasDoServidor]
  );

  return <ContextoCatalogo.Provider value={valor}>{children}</ContextoCatalogo.Provider>;
}

// Hook para ler o catálogo: { artistas, artistasPorId, origem: "local" | "servidor" }
export function useCatalogo() {
  return useContext(ContextoCatalogo);
}
