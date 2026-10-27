# 💿 RPM — Arquivo & Enciclopédia Musical Brutalista

> **Plataforma editorial, arquivo discográfico e sistema de crítica musical física.**  
> Desenvolvido em **React 19**, **Vite 8** e **Tailwind CSS v4** com estética editorial brutalista (0-radius, preto vinil carvão, vermelho RPM e papel creme).

---

## 📌 Sumário
- [Visão Geral & Identidade Visual](#-visão-geral--identidade-visual)
- [Arquitetura & Tecnologias](#-arquitetura--tecnologias)
- [Funcionalidades & Telas](#-funcionalidades--telas)
- [Sistema de Avaliação & Coleção do Crítico](#-sistema-de-avaliação--coleção-do-crítico)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Instalação & Execução](#-instalação--execução)
- [Persistência Local (LocalStorage Schema)](#-persistência-local-localstorage-schema)

---

## 🎨 Visão Geral & Identidade Visual

O **RPM** (Rotação Por Minuto) é uma enciclopédia interativa inspirada em catálogos de arquivo físico, zines editoriais e sebos de discos de vinil clássicos. O design afasta-se deliberadamente de layouts genéricos de streaming contemporâneos, adotando:

- **Paleta Cromática Rigorosa:**
  - `Preto Vinil Carvão` (`#08080a` / `#0f0e14`)
  - `Vermelho RPM` (`#ff0004` / `#cc0003`)
  - `Creme Papel de Prensa` (`#f7f4ed`)
  - `Dourado Certificado` (`#ffd700`)
- **Geometria Brutalista:** Bordas retas (`border-radius: 0`), divisórias mecânicas, tipografia monoespaçada técnica (`// ARQUIVO_RPM`) em contraste com a elegância de fontes serifadas editoriais (`DM Serif Display`).
- **Acervo Musical Rico:** Catálogo com 55 artistas de relevância histórica e contemporânea (Trap, Rap Nacional, Rap Internacional, MPB, Samba, Rock, etc.), com discografia detalhada, contagem de streams, capas reais e ensaios biográficos.

---

## 🛠 Arquitetura & Tecnologias

- **[React 19](https://react.dev/)**: Arquitetura baseada em componentes funcionais modernos com hooks (`useState`, `useEffect`, `useMemo`, `useCallback`, `useContext`).
- **[Vite 8](https://vite.dev/)**: Ferramenta de build ultrarrápida com Hot Module Replacement (HMR) e compilação otimizada para produção.
- **[Tailwind CSS v4](https://tailwindcss.com/) & CSS Vanilla Estruturado**: Estilos globais e componentes tipográficos com zero dependências externas de ícones pesados.
- **Normalização com Tolerância a Diacríticos**: Algoritmo de busca que ignora acentuação e caixa alta/baixa (`normalizarTexto`), garantindo que buscas como `"matue"` ou `"musica"` encontrem registros com `"Matuê"` ou `"música"`.

---

## 🖥 Funcionalidades & Telas

### 1. Página Inicial (`PaginaInicial.jsx`)
- **Fundo Mosaico Hero Marquee (`FundoMosaicoHero.jsx`)**: 6 colunas infinitas verticais que deslizam suavemente em direções alternadas com capas de discos e retratos de artistas, sob uma textura de vinil e vinheta cinematográfica.
- **Busca Unificada em Tempo Real**: Barra central que vasculha simultaneamente **Artistas**, **Músicas** e **Álbuns**, agrupando resultados com crachás distintivos e prévias visuais.
- **Explorador Dinâmico Rotativo**: Alternância periódica (intervalo de 7s) sorteando artistas do acervo para sugestão instantânea.
- **Filtro por Movimento & Matéria Editorial**: Destaques em formato jornalístico e grade de artistas por vertente.

### 2. Galeria Editorial de Artistas (`PaginaTodosArtistas.jsx`)
- **Arquivo Retrato Brutalista**: Cards de artistas com estética de galeria fotográfica, contagem de álbuns, métricas de ouvintes mensais e gênero musical.
- **Filtro Alfabético Rápido (A-Z)**: Barra mecânica para salto instantâneo por letra inicial.

### 3. Estante de Vinis — *Crate Digging* (`PaginaTodosAlbuns.jsx`)
- **Experiência Física de Sebo**: Grid simulando caixas de vinis de 12 polegadas (*12-inch LP jackets*). Ao passar o mouse sobre a capa, o disco de vinil desliza suavemente para fora girando com o sulco físico exposto.
- **Ação Direta `[ AVALIAR DISCO ]`**: Permite atribuir notas ao álbum diretamente da estante global.

### 4. Página Individual do Artista (`PaginaArtista.jsx`)
- **Sidebar Editorial de Retrato**: Fotografia imponente em alta resolução com legenda e metadados de origem e período ativo.
- **Abas de Conteúdo**:
  - `Mais ouvidas`: Ranking tabular com reproduções e avaliação por faixa.
  - `Álbuns`: Discografia completa com capas, faixas e streams.
  - `História`: Ensaio biográfico completo e citações emblemáticas.

---

## ⭐️ Sistema de Avaliação & Coleção do Crítico

### 1. Avaliação em Vinis (1 a 5 Discos)
- `SeletorDeNota.jsx`: a pílula "Sua nota:" (visual da Mell) com 5 discos de vinil. Clicar na nota atual desmarca; sem login, pede para entrar.
- `NotaEmVinis.jsx`: mostra a nota em vinis, só leitura, nas fichas da Coleção.
- `ModalAvaliacao.jsx`: nota e resenha de uma obra, com o botão para excluir a avaliação (e "Desfazer" na Coleção).
- **Avaliação por faixa** (`ModalFaixasDoAlbum.jsx`, sistema da Mell): ao abrir um álbum aparecem as faixas reais do disco, cada uma com sua nota em vinis, além da nota e da resenha do álbum inteiro. A lista de faixas vem de `src/dados/faixasDosAlbuns.json` (104 dos 139 álbuns), levantada na API do Deezer, e só é baixada quando um álbum é aberto.

### 2. Arquivo Técnico do Crítico (`PaginaColecao.jsx`)
- **Ficha Técnica & Credencial do Usuário**: Exibe número de série único (`ID: #...`), selo de certificação da coleção e métricas automáticas (total catalogado, média de notas, grau máximo e resenhas registradas).
- **Templo do Disco de Ouro (Hall da Fama)**:
  - Destaca o favorito absoluto da coleção em um pedestal com disco de ouro e sulcos gravados.
  - Botão `[ ⟳ TROCAR FAVORITO ]` com modal de seleção rápida.
  - Botão `[ TORNAR FAVORITO ]` disponível em cada card da coleção.
- **Filtros do Arquivo**: `TODOS`, `ÁLBUNS`, `FAIXAS` e `★ 5 VINIS (OBRAS-PRIMAS)`.
- **Estado Vazio Humanizado**: Apresentação ilustrada com o mascote Vinil Triste quando o usuário não possui itens avaliados ou não está autenticado.

---

## 📂 Estrutura do Projeto

```text
RPM/
├── public/
│   ├── assets/
│   │   ├── rpm-mark.svg        # Logotipo vetorial oficial
│   │   └── vinil-triste.webp   # Mascote do acervo (fundo transparente)
│   └── fonts/                  # DM Sans e DM Serif Display hospedadas no projeto
├── src/
│   ├── componentes/
│   │   ├── AbaAlbuns.jsx             # Discografia do artista, com nota por álbum
│   │   ├── AbaHistoria.jsx           # Biografia editorial
│   │   ├── AbaMusicas.jsx            # Mais ouvidas, com coluna de avaliação
│   │   ├── BuscaUnificada.jsx        # Busca de artistas, músicas e álbuns da home
│   │   ├── Cabecalho.jsx             # Navegação, login e menu do celular
│   │   ├── FiltroAlfabetico.jsx      # Letras A–Z dos catálogos
│   │   ├── FundoMosaicoHero.jsx      # Mosaico animado de capas no banner
│   │   ├── HistoriasEmDestaque.jsx   # Carrossel de histórias da home
│   │   ├── IconeDisco.jsx            # Desenho do disco usado no seletor de nota
│   │   ├── ImagemComFallback.jsx     # Imagem com carregamento e troca por logo
│   │   ├── Logotipo.jsx              # Marca da aplicação
│   │   ├── ModalAutenticacao.jsx     # Login e cadastro (validado pelo backend)
│   │   ├── ModalAvaliacao.jsx        # Nota, resenha e exclusão da avaliação
│   │   ├── ModalFaixasDoAlbum.jsx    # Faixas do álbum com nota por faixa
│   │   ├── NotaEmVinis.jsx           # Nota em vinis só para exibição
│   │   ├── SeletorDeNota.jsx         # Pílula "Sua nota:" para dar a nota
│   │   └── colecao/                  # Partes da página Coleção
│   ├── contextos/
│   │   ├── ContextoCatalogo.jsx      # Catálogo de artistas (backend ou dados locais)
│   │   └── ContextoUsuario.jsx       # Sessão e avaliações (backend + cópia local)
│   ├── dados/
│   │   ├── dadosMusicais.ts          # Banco de dados musical tipado (55 artistas)
│   │   ├── faixasDosAlbuns.js        # Carrega as faixas dos álbuns sob demanda
│   │   ├── faixasDosAlbuns.json      # Faixas reais de 104 álbuns (levantamento da Mell)
│   │   └── historias.js              # Acervo de matérias do carrossel da home
│   ├── servicos/
│   │   └── api.js                    # Cliente da API do backend (inclui o catálogo GET /api/artistas)
│   ├── utilitarios/
│   │   ├── imagens.js                # Tamanho das capas do Deezer e imagem reserva
│   │   ├── somVinil.js               # Som de clique ao dar nota
│   │   └── texto.js                  # Busca sem acentos e siglas das capas
│   ├── paginas/
│   │   ├── PaginaArtista.jsx         # Perfil do artista (aba na URL: ?aba=historia)
│   │   ├── PaginaColecao.jsx         # Fichário do crítico e Disco de Ouro
│   │   ├── PaginaInicial.jsx         # Banner, busca, catálogo e histórias
│   │   ├── PaginaTodosAlbuns.jsx     # Vitrine de álbuns com vinil animado
│   │   └── PaginaTodosArtistas.jsx   # Galeria editorial de artistas
│   ├── Aplicativo.jsx                # Rotas, modais e estado global
│   ├── estilosGlobais.css            # Estilos do site inteiro
│   └── principal.jsx                 # Ponto de entrada do React
├── index.html                   # HTML base com meta tags e favicon
├── package.json                 # Dependências e scripts npm
├── backend/                     # API Spring Boot + MySQL (Matheus e Gabriel)
├── vite.config.js               # Vite, Tailwind, proxy /api e testes
└── README.md                    # Documentação do projeto
```

---

## 🔌 Integração Front ↔ Backend

O backend fica em `backend/` (Spring Boot + MySQL, por Matheus e Gabriel). Em desenvolvimento o Vite repassa tudo que começa com `/api` para `http://localhost:8080` (ver `vite.config.js`), e o front fala com ele por `src/servicos/api.js`.

| Ação no site | Rota | Corpo enviado |
| :--- | :--- | :--- |
| Ao abrir o site | `GET /api/status` | — |
| Ao abrir o site | `GET /api/artistas` *(ainda não existe no backend)* | — |
| Criar conta | `POST /api/usuarios` | `{ nome, email, senha }` |
| Nota de álbum | `POST /api/avaliacoes/albuns` | `{ artistaId, tituloAlbum, nota, usuario }` |
| Nota de música ou faixa | `POST /api/avaliacoes/musicas` | `{ artistaId, tituloMusica, nota, usuario }` |
| Resenha | `POST .../comentarios` | o mesmo corpo + `texto` |

- **Validação**: as mensagens de erro do backend (400 `{ campo: "mensagem" }`) aparecem embaixo de cada campo do cadastro.
- **Servidor desligado**: o site continua funcionando com os dados no navegador; as notas ficam marcadas como pendentes e são reenviadas quando o servidor volta.
- **O que o backend ainda precisa** para o front deixar de depender do navegador: salvar usuários e avaliações no MySQL (hoje as rotas só validam), rota de login (`POST /api/login`), rotas de leitura (`GET` das avaliações do usuário) e atualizar a nota quando o mesmo usuário avalia a mesma obra de novo, em vez de duplicar.

### Catálogo de artistas: backend com reserva local
O front já está pronto para ler artistas, álbuns e músicas do banco (`buscarCatalogoDoServidor` em `src/servicos/api.js` e `src/contextos/ContextoCatalogo.jsx`):

- O site abre sempre com os dados locais de `src/dados/dadosMusicais.ts`, então nunca aparece vazio.
- Ao mesmo tempo ele chama `GET /api/artistas`. Se a resposta for uma lista válida, o site passa a usar a lista do banco.
- Se a rota não existir (como hoje), o servidor estiver desligado ou o formato vier diferente, o site continua com os dados locais.

**O que o backend precisa entregar** em `GET /api/artistas`: uma lista no mesmo formato do `backend/src/main/resources/dados/artistas.json`, com os álbuns e as músicas dentro de cada artista:

```json
[
  {
    "id": "matue", "nome": "Matue", "categoria": "Trap Brasileiro", "genero": "Trap / Hip Hop",
    "origem": "Fortaleza, CE, Brasil", "periodoAtivo": "2015 - presente", "ouvintesMensais": "11.8 mi",
    "foto": "https://...", "legendaFoto": "...", "resumo": "...", "citacao": "...",
    "biografia": "Primeiro parágrafo.\n\nSegundo parágrafo.",
    "albuns":  [{ "titulo": "333", "ano": "2024", "faixas": "12 faixas", "reproducoes": "...", "streams": 0, "capa": "https://..." }],
    "musicas": [{ "titulo": "...", "album": "333", "ano": "2024", "reproducoes": "...", "streams": 0, "capa": "https://..." }]
  }
]
```

- `id`, `nome`, `albuns` e `musicas` são obrigatórios. Sem eles, a lista do banco é ignorada.
- `biografia` pode vir como texto (parágrafos separados por linha em branco) ou como lista.
- Os `id` precisam continuar iguais aos de hoje (`"matue"`, `"racionais-mcs"`...), porque as avaliações salvas usam esse id.

### Rodando os dois juntos
1. Backend: abrir `backend/` no IntelliJ (Java 21), definir `DB_PASSWORD` (e `DB_USER`, se não for `root`) e rodar `RpmApplication`. O banco `sitemusica` precisa existir no MySQL.
2. Front: `npm run dev` e abrir `http://localhost:5173`.

## 💾 Persistência Local (LocalStorage Schema)

Cópia local usada enquanto o backend não guarda os dados (e quando ele está fora do ar):

| Chave LocalStorage | Tipo | Descrição |
| :--- | :--- | :--- |
| `rpm_usuarios` | `Array<Usuario>` | Perfis cadastrados (`id`, `nome`, `email`, `senhaHash`, `criadoEm`). A senha só é guardada como hash SHA-256. |
| `rpm_sessao` | `string` | ID do usuário atualmente logado. |
| `rpm_avaliacoes_<id>` | `Record<string, {nota, comentario, obra, sincronizado}>` | Notas (1-5) e resenhas; `obra` identifica o item para o backend e `sincronizado` diz se já chegou ao servidor. |
| `rpm_favorito_<id>` | `string` | Chave do item definido manualmente como Disco de Ouro. |

---

## 🚀 Instalação & Execução

### Pré-requisitos
- **Node.js** (versão 18 ou superior recomendada)
- Gerenciador de pacotes **npm** ou **yarn**

### Passo a passo
```bash
# 1. Clonar o repositório
git clone https://github.com/murilonora/RPM.git
cd RPM

# 2. Instalar as dependências
npm install

# 3. Rodar em ambiente de desenvolvimento
npm run dev

# 4. Compilar e otimizar para produção
npm run build

# 5. Visualizar o build de produção localmente
npm run preview
```

---

## 📄 Licença & Créditos
Projeto acadêmico do grupo: front-end por **Murilo Nora**, backend por **Matheus Rocha** e **Gabriel Angelo**, avaliação por faixa e levantamento das faixas por **Mell Feital**. As imagens de capas e artistas são utilizadas estritamente para fins educacionais e de demonstração de interface.
