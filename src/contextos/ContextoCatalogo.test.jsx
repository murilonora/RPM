// Testes do catálogo: usa o backend quando GET /api/artistas responde certo e
// cai nos dados locais (dadosMusicais.ts) em qualquer outro caso
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { listaDeArtistas } from "../dados/dadosMusicais";
import { buscarCatalogoDoServidor } from "../servicos/api";
import { ProvedorCatalogo, useCatalogo } from "./ContextoCatalogo";

// Artista no formato do backend: biografia em texto corrido, álbum sem capa
const ARTISTA_DO_SERVIDOR = {
  id: "teste-servidor",
  nome: "Artista do Servidor",
  categoria: "Rap Brasileiro",
  genero: "Rap",
  origem: "Juiz de Fora, MG, Brasil",
  periodoAtivo: "2020 - presente",
  ouvintesMensais: "1 mi",
  foto: "https://exemplo.test/foto.jpg",
  legendaFoto: "",
  resumo: "Resumo",
  biografia: "Primeiro parágrafo.\n\nSegundo parágrafo.",
  citacao: "",
  albuns: [{ titulo: "Disco", ano: "2024", faixas: "10 faixas", reproducoes: "1 mi", streams: 1 }],
  musicas: [{ titulo: "Faixa", album: "Disco", ano: "2024", reproducoes: "1 mi", streams: 1 }],
};

function responder(status, corpo) {
  vi.stubGlobal("fetch", vi.fn(() => Promise.resolve(new Response(JSON.stringify(corpo), { status }))));
}

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("buscarCatalogoDoServidor", () => {
  it("aceita a lista do backend e prepara como os dados locais", async () => {
    responder(200, [ARTISTA_DO_SERVIDOR]);
    const [artista] = await buscarCatalogoDoServidor();
    expect(artista.biografia).toEqual(["Primeiro parágrafo.", "Segundo parágrafo."]);
    // Álbum sem capa herda a foto do artista, e a música herda a capa do álbum
    expect(artista.albuns[0].capa).toBe(ARTISTA_DO_SERVIDOR.foto);
    expect(artista.musicas[0].capa).toBe(ARTISTA_DO_SERVIDOR.foto);
  });

  it("devolve null quando a rota não existe (404)", async () => {
    responder(404, { erro: "não encontrado" });
    expect(await buscarCatalogoDoServidor()).toBeNull();
  });

  it("devolve null com servidor fora do ar ou formato inesperado", async () => {
    vi.stubGlobal("fetch", vi.fn(() => Promise.reject(new TypeError("Failed to fetch"))));
    expect(await buscarCatalogoDoServidor()).toBeNull();

    responder(200, [{ id: "sem-albuns", nome: "X" }]);
    expect(await buscarCatalogoDoServidor()).toBeNull();

    responder(200, []);
    expect(await buscarCatalogoDoServidor()).toBeNull();
  });
});

// Mostra de onde veio o catálogo e quantos artistas tem
function Mostrador() {
  const { artistas, origem, artistasPorId } = useCatalogo();
  return (
    <p>
      {origem}:{artistas.length}:{artistasPorId.get("teste-servidor")?.nome || "-"}
    </p>
  );
}

describe("ProvedorCatalogo", () => {
  it("começa com os dados locais e troca pelos do backend quando eles chegam", async () => {
    responder(200, [ARTISTA_DO_SERVIDOR]);
    render(
      <ProvedorCatalogo>
        <Mostrador />
      </ProvedorCatalogo>
    );
    expect(screen.getByText(`local:${listaDeArtistas.length}:-`)).toBeTruthy();
    await waitFor(() => expect(screen.getByText("servidor:1:Artista do Servidor")).toBeTruthy());
  });

  it("fica com os dados locais quando o backend não tem o catálogo", async () => {
    responder(404, {});
    render(
      <ProvedorCatalogo>
        <Mostrador />
      </ProvedorCatalogo>
    );
    await new Promise((r) => setTimeout(r, 20));
    expect(screen.getByText(`local:${listaDeArtistas.length}:-`)).toBeTruthy();
  });

  it("fora do provedor (ex.: testes de componentes) também entrega os dados locais", () => {
    render(<Mostrador />);
    expect(screen.getByText(`local:${listaDeArtistas.length}:-`)).toBeTruthy();
  });
});
