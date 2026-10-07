# RPM — Arquivo e Enciclopédia Musical

Trabalho acadêmico desenvolvido com **React 19**, **Vite** e **Tailwind CSS v4**. O projeto consiste em uma plataforma editorial, enciclopédia digital e acervo discográfico focada nas quatro principais vertentes da cultura urbana: **Trap Brasileiro**, **Rap Brasileiro**, **Rap Americano** e **Hip Hop Americano**.

---

## 📌 Sumário
- [Sobre o Projeto](#-sobre-o-projeto)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Funcionalidades e Telas](#-funcionalidades-e-telas)
- [Como Rodar Localmente](#-como-rodar-localmente)

---

## 🎤 Sobre o Projeto

O **RPM** reúne acervos, histórias, discografias completas e dados de reprodução dos maiores nomes do rap e do hip hop nacional e mundial. Com uma base de dados contendo 55 artistas de relevância global, todos os dados são estruturados dinamicamente através de componentes React. O sistema foca em usabilidade, performance e interface limpa.

**Destaques do Catálogo:**
- **Trap Brasileiro**: Matuê, KayBlack, Filipe Ret, etc.
- **Rap Brasileiro**: Racionais MC's, Emicida, Sabotage, etc.
- **Rap Americano**: Kendrick Lamar, Eminem, Travis Scott, etc.
- **Hip Hop Americano**: 2Pac, The Notorious B.I.G., Dr. Dre, etc.

---

## 🛠 Tecnologias Utilizadas

Este projeto foi construído focando em performance e no ecossistema moderno do JavaScript:

- **[React 19](https://react.dev/)**: Biblioteca component-based utilizando os recursos e hooks mais recentes.
- **[Vite 8](https://vite.dev/)**: Ferramenta de build super rápida e servidor de desenvolvimento otimizado.
- **[Tailwind CSS v4](https://tailwindcss.com/)**: Estilização moderna e layout completamente responsivo, integrado de forma nativa.
- **[JavaScript (ES6+)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)**: Aplicação 100% construída utilizando as melhores práticas do JavaScript moderno (ES Modules, Array Methods, Destructuring).

---

## 🖥 Funcionalidades e Telas

A aplicação conta com uma experiência rica de usuário dividida em diversas sessões otimizadas:

1. **Página Inicial & Busca Inteligente**:
   - Barra de pesquisa integrada para encontrar artistas instantaneamente.
   - Filtros dinâmicos por categorias (*Trap Brasileiro, Rap Americano, etc*).
   - Sessão de destaques editoriais e catálogo completo.
2. **Navegação Global (Cabeçalho)**:
   - **Descobrir**: Função randômica (sorteio) que redireciona o usuário para um artista aleatório do catálogo para descobertas musicais.
   - **Artistas**: Um grid responsivo, em ordem alfabética, exibindo todos os 55 artistas da plataforma.
   - **Álbuns**: Acervo global com todos os álbuns cadastrados ordenados pelo número de streams (mais ouvidos), vinculados às páginas de seus criadores.
3. **Página do Artista**:
   - Layout modular dividido em abas (*Mais Ouvidas, Álbuns, História*).
   - Responsividade completa garantindo fotos e dados enquadrados de ponta a ponta (com `object-fit: cover` e position top).

---

## 🚀 Como Rodar Localmente

Certifique-se de ter o **Node.js** instalado na sua máquina.

```bash
# 1. Clone o repositório
git clone https://github.com/murilonora/RPM.git
cd RPM

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev
```

Abra o link informado no terminal (ex: `http://localhost:5173`) no seu navegador. Para compilar o projeto e otimizar para produção, execute `npm run build`.
