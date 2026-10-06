# RPM — Trap & Rap: Arquivo e Enciclopédia Musical

Aplicação Web desenvolvida com **React 19**, **JavaScript (ES Modules)**, **Tailwind CSS v4** e **Vite**. O projeto funciona como uma plataforma editorial, enciclopédia digital e acervo discográfico focado nas quatro grandes vertentes da cultura urbana: **Trap Brasileiro**, **Rap Brasileiro**, **Rap Americano** e **Hip Hop Americano**.

---

## 📌 Sumário
- [Sobre o Projeto](#-sobre-o-projeto)
- [Artistas e Vertentes Cadastradas](#-artistas-e-vertentes-cadastradas)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Pré-requisitos](#-pré-requisitos)
- [Como Rodar Localmente](#-como-rodar-localmente)
- [Funcionalidades e Telas](#-funcionalidades-e-telas)
- [Como Adicionar Novos Artistas](#-como-adicionar-novos-artistas)

---

## 🎤 Sobre o Projeto

O **RPM** reúne acervos, histórias editoriais, discografias completas e dados de reprodução dos maiores nomes do rap e do hip hop nacional e mundial. Todos os dados são reais, estruturados em JavaScript e gerenciados dinamicamente pelos componentes React.

---

## 🎧 Artistas e Vertentes Cadastradas

O catálogo já conta com artistas fundamentais de cada movimento, com suas músicas mais tocadas, álbuns com faixas, estatísticas e biografias aprofundadas:

| Vertente | Artistas Incluídos | Destaques |
| :--- | :--- | :--- |
| **Trap Brasileiro** | **Matuê**, **KayBlack**, **Filipe Ret** | *Máquina do Tempo*, *333*, *Contraditório*, *LUME* |
| **Rap Brasileiro** | **Racionais MC's**, **Emicida**, **Sabotage** | *Sobrevivendo no Inferno*, *AmarElo*, *Rap É Compromisso* |
| **Rap Americano** | **Kendrick Lamar**, **Eminem**, **Travis Scott** | *good kid, m.A.A.d city*, *DAMN.*, *ASTROWORLD*, *The Eminem Show* |
| **Hip Hop Americano** | **2Pac**, **The Notorious B.I.G.**, **Dr. Dre** | *All Eyez on Me*, *Ready to Die*, *2001*, *The Chronic* |

---

## 🛠 Tecnologias Utilizadas

- **[React 19](https://react.dev/)**: Biblioteca component-based com hooks (`useState`) e gerenciamento de estado limpo.
- **[JavaScript (ES6+)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)**: Código 100% em JavaScript puro, sem TypeScript, ideal para projetos acadêmicos.
- **[Vite 8](https://vite.dev/)**: Servidor de desenvolvimento ultrarrápido com HMR e compilador otimizado.
- **[Tailwind CSS v4](https://tailwindcss.com/)**: Estilização moderna e layout responsivo.

---

## 📂 Estrutura do Projeto

Pastas e arquivos nomeados em **Português**, seguindo as melhores práticas de arquitetura de software:

```text
RPM/
├── public/                     # Arquivos estáticos e ativos públicos
│   └── assets/                 # Imagens e marcas
├── src/                        # Código-fonte da aplicação
│   ├── componentes/            # Componentes reutilizáveis
│   │   ├── AbaAlbuns.jsx       # Grid de álbuns e discografia do artista
│   │   ├── AbaHistoria.jsx     # Biografia, contexto histórico e citações
│   │   ├── AbaMusicas.jsx      # Ranking das músicas mais ouvidas
│   │   ├── Cabecalho.jsx       # Barra de navegação e menu superior
│   │   └── Logotipo.jsx        # Marca visual do RPM
│   ├── dados/                  # Base de dados estruturada em JavaScript
│   │   └── dadosMusicais.js    # Acervo completo de artistas, músicas e álbuns
│   ├── paginas/                # Telas da aplicação
│   │   ├── PaginaArtista.jsx   # Página de perfil dinâmico com navegação em abas
│   │   └── PaginaInicial.jsx   # Busca inteligente, catálogo de cards e filtros
│   ├── Aplicativo.jsx          # Componente raiz com orquestração de rotas e estado
│   ├── estilosGlobais.css      # Estilização editorial e regras tipográficas
│   └── principal.jsx           # Ponto de entrada do React no DOM
├── index.html                  # Shell HTML principal
├── package.json                # Dependências e scripts npm
├── vite.config.js              # Configuração simplificada do Vite
└── README.md                   # Esta documentação
```

---

## 💻 Pré-requisitos

- **Node.js** (versão 18, 20 ou superior recomendada)
- Gerenciador **npm** (incluso no Node.js)

---

## 🚀 Como Rodar Localmente

```bash
# 1. Instalar as dependências
npm install

# 2. Iniciar o servidor de desenvolvimento
npm run dev
```

Abra o link informado no terminal (ex: `http://localhost:5173`) no navegador.

Para gerar e validar a build de produção:
```bash
npm run build
npm run preview
```

---

## 🖥 Funcionalidades

1. **Busca Instantânea Inteligente**:
   - Pesquise pelo nome do artista, gênero, categoria ou até pelo título de uma música.
   - Pré-visualização com foto, vertente e botão para abrir o perfil direto.
2. **Filtros por Categorias**:
   - Alterne com 1 clique entre: *Todos*, *Trap Brasileiro*, *Rap Brasileiro*, *Rap Americano* e *Hip Hop Americano*.
3. **Catálogo em Cards**:
   - Visualização de todos os artistas com fotos, ouvintes mensais e síntese de carreira.
4. **Matéria Editorial em Destaque**:
   - Artigo com foco no impacto cultural dos *Racionais MC's* e a importância de *Sobrevivendo no Inferno*.
5. **Página Dinâmica do Artista**:
   - **Mais ouvidas**: Top faixas com número de reproduções, ano e álbum.
   - **Álbuns**: Grade com capas estilizadas com as siglas do artista, quantidade de faixas e ano.
   - **História**: Biografia editorial completa com citação marcante do artista.

---

## ➕ Como Adicionar Novos Artistas

Basta abrir o arquivo `src/dados/dadosMusicais.js` e adicionar um novo objeto ao array `listaDeArtistas`:

```javascript
{
  id: "nome-do-artista",
  nome: "Nome Completo",
  categoria: "Trap Brasileiro", // ou "Rap Brasileiro", "Rap Americano", "Hip Hop Americano"
  genero: "Subgênero",
  origem: "Cidade, Estado, País",
  periodoAtivo: "Ano — presente",
  ouvintesMensais: "X.X mi",
  foto: "URL da foto ou caminho em /assets/...",
  legendaFoto: "Descrição da foto",
  resumo: "Pequeno resumo da relevância do artista.",
  biografia: [
    "Primeiro parágrafo da história...",
    "Segundo parágrafo..."
  ],
  citacao: "“Uma frase marcante do artista.”",
  musicas: [
    { titulo: "Nome da Música", album: "Nome do Disco", ano: "2024", reproducoes: "100 mi" }
  ],
  albuns: [
    { titulo: "Nome do Álbum", ano: "2024", faixas: "10 faixas", reproducoes: "300 mi" }
  ]
}
```
A aplicação irá automaticamente incluí-lo na busca, nos filtros e na grade de exibição!
