# Ecolote Frontend (Vite + React)

Este é o projeto frontend para a landing page Ecolote, desenvolvido com Vite, React e utilizando CSS Modules para estilização.

## Pré-requisitos

- Node.js (versão 18.x ou superior recomendada)
- npm ou pnpm (pnpm é recomendado pelo Vite e usado na criação deste template base)

## Estrutura do Projeto (Simplificada)

```
/ecolote-frontend
|-- public/                  # Arquivos estáticos (favicon, etc.)
|-- src/
|   |-- assets/              # Imagens, fontes, etc.
|   |-- components/          # Componentes React reutilizáveis (Navbar, Card, etc.)
|   |   |-- Navbar/
|   |   |   |-- Navbar.jsx
|   |   |   |-- Navbar.module.css
|   |   |-- ... (outros componentes)
|   |-- styles/              # Estilos globais (global.css)
|   |-- App.jsx              # Componente principal da aplicação
|   |-- main.jsx             # Ponto de entrada da aplicação React
|-- index.html               # Template HTML principal
|-- vite.config.js         # Configurações do Vite (incluindo base path para GitHub Pages)
|-- package.json             # Dependências e scripts do projeto
|-- README.md                # Este arquivo
```

## Como Configurar e Rodar Localmente

1.  **Clone o repositório (ou extraia o conteúdo do ZIP).**
2.  **Navegue até a pasta do projeto frontend:**
    ```bash
    cd ecolote-frontend
    ```
3.  **Instale as dependências:**
    Se você usa npm:
    ```bash
    npm install
    ```
    Se você usa pnpm:
    ```bash
    pnpm install
    ```
4.  **Inicie o servidor de desenvolvimento:**
    Se você usa npm:
    ```bash
    npm run dev
    ```
    Se você usa pnpm:
    ```bash
    pnpm dev
    ```
    Abra o navegador no endereço fornecido (geralmente `http://localhost:5173`).

## Como Fazer o Build para Produção

Para criar uma versão otimizada para produção (que será usada para o deploy):

Se você usa npm:
```bash
npm run build
```
Se você usa pnpm:
```bash
pnpm build
```
Isso criará uma pasta `dist/` na raiz do projeto `ecolote-frontend/` com os arquivos estáticos prontos para deploy.

## Deploy no GitHub Pages

1.  **Configure o `base` no `vite.config.js`:**
    Abra o arquivo `vite.config.js` e certifique-se de que a propriedade `base` está configurada corretamente com o nome do seu repositório no GitHub. Por exemplo, se seu repositório se chama `meu-ecolote-site`, a configuração deve ser:
    ```javascript
    export default defineConfig({
      // ...outras configs
      base: "/meu-ecolote-site/",
    });
    ```
    **Importante:** O valor deve começar e terminar com uma barra `/`.

2.  **Faça o build do projeto:**
    ```bash
    pnpm build # ou npm run build
    ```
3.  **Envie o conteúdo da pasta `dist` para o GitHub:**
    Você pode configurar o GitHub Pages para servir a partir da branch `gh-pages` ou da pasta `/docs` na sua branch principal. Uma maneira comum é usar a branch `gh-pages`.

    **Método 1: Manual (copiando a pasta `dist`)**
    *   Após o build, copie o conteúdo da pasta `dist` para a raiz da branch `gh-pages` do seu repositório (ou para a pasta `/docs` da sua branch `main`, dependendo da sua configuração no GitHub Pages).

    **Método 2: Usando um pacote como `gh-pages` (Requer instalação e configuração no `package.json`)**
    *   Instale o pacote: `pnpm add -D gh-pages` (ou `npm install --save-dev gh-pages`)
    *   Adicione um script ao seu `package.json`:
        ```json
        "scripts": {
          // ...outros scripts
          "deploy": "gh-pages -d dist"
        }
        ```
    *   Execute o script de deploy após o build:
        ```bash
        pnpm deploy # ou npm run deploy
        ```
        Este comando fará o build (se você adicionar `pnpm build &&` antes de `gh-pages`) e publicará o conteúdo da pasta `dist` na branch `gh-pages` automaticamente.

4.  **Configure o GitHub Pages no seu repositório:**
    *   Vá para as configurações do seu repositório no GitHub (`Settings` > `Pages`).
    *   Em "Build and deployment", na seção "Source", selecione "Deploy from a branch".
    *   Escolha a branch `gh-pages` (ou `main` se estiver usando a pasta `/docs`) e a pasta `/ (root)`.
    *   Clique em "Save". O GitHub Pages irá construir e implantar seu site. O link será disponibilizado na mesma seção (ex: `https://SEU_NOME_DE_USUARIO.github.io/NOME_DO_REPOSITORIO/`).

## Estilização

Este projeto utiliza CSS Modules. Cada componente em `src/components/` pode ter seu próprio arquivo `.module.css` (ex: `Navbar.module.css`). Estilos globais podem ser definidos em `src/styles/global.css` e importados em `src/main.jsx` ou `src/App.jsx`.

## Conteúdo

O conteúdo da landing page será baseado no e-book "Ecolote: A Nova Era da Energia Solar Sustentável" e na estrutura fornecida pelo usuário.

