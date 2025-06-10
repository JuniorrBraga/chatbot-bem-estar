# Aura: Seu Assistente de Bem-Estar Integrado 💬

![Status](https://img.shields.io/badge/status-ativo-brightgreen.svg)
![Tecnologia](https://img.shields.io/badge/hospedagem-Netlify-00C7B7.svg)
![Licença](https://img.shields.io/badge/licença-MIT-blue.svg)

Uma interface de chat inteligente projetada para oferecer um espaço seguro de conversa sobre saúde mental e física, culminando em um resumo holístico e empático gerado pela IA do Google. O projeto é construído com uma arquitetura serverless, implantado na Netlify.

</br>

<!-- 
    IMPORTANTE: Grave um GIF curto mostrando o chatbot em ação e substitua o link abaixo.
    Ferramentas como ScreenToGif (Windows) ou Kap (Mac) são ótimas para isso.
-->
<p align="center">
  <img src="https://imgur.com/a/aura-chatbot-3FzV2Jp" alt="Demonstração do Aura em ação" width="400px">
</p>

## ✨ Sobre o Projeto

Aura não é apenas um chatbot, é um experimento em escuta ativa e empática. O objetivo é criar um ambiente acolhedor onde o usuário possa expressar seus sentimentos e refletir sobre seus hábitos. A IA foi cuidadosamente instruída para fazer perguntas contextuais que conectam o estado emocional com a saúde física, promovendo uma visão de bem-estar 360°.

A arquitetura do projeto utiliza **Netlify Functions** para servir como um backend serverless seguro, garantindo que a chave da API do Google Gemini nunca seja exposta no lado do cliente.

## 🚀 Principais Funcionalidades

-   **Conversa Empática e Fluida:** A IA é instruída para manter um tom gentil e fazer perguntas abertas.
-   **Abordagem Holística:** Conecta perguntas sobre sentimentos com hábitos de sono, exercícios e alimentação.
-   **Resumo Final Sob Demanda:** O usuário controla a conversa e solicita um resumo integrado quando se sentir pronto.
-   **Interface Moderna e Responsiva:** Layout limpo e otimizado para desktop e mobile, construído com Tailwind CSS.
-   **Backend Serverless Seguro:** A lógica do backend roda em Netlify Functions, protegendo a chave da API.
-   **Pronto para Deploy:** Configurado para uma implantação fácil e rápida na plataforma Netlify.

## 🛠️ Tecnologias Utilizadas

-   **Frontend:**
    -   HTML5
    -   CSS3 com [Tailwind CSS](https://tailwindcss.com/)
    -   JavaScript (Vanilla)
-   **Backend & Hospedagem:**
    -   [Netlify Functions](https://www.netlify.com/products/functions/) (com Node.js)
    -   [Netlify](https://www.netlify.com/)
-   **Inteligência Artificial:**
    -   [Google Gemini API](https://ai.google.dev/)

## 📁 Estrutura do Projeto

A estrutura foi adaptada para a arquitetura serverless da Netlify.


```text
/chatbot-bem-estar/
├── netlify/
│   └── functions/
│       └── chat.js      # A função serverless que atua como nosso backend
├── public/              # Arquivos públicos (acessíveis pelo navegador)
│   ├── index.html
│   ├── style.css
│   └── script.js
├── .gitignore           # Ignora node_modules e .env
├── netlify.toml         # Arquivo de configuração para o deploy no Netlify
└── package.json         # Define as dependências da função serverless
```

## 🚀 Como Fazer o Deploy no Netlify (Recomendado)

A maneira mais fácil de usar este projeto é implantá-lo diretamente na Netlify.

1.  **Faça um Fork do Repositório:**
    -   Clique no botão "Fork" no canto superior direito desta página para criar uma cópia no seu próprio GitHub.

2.  **Conecte ao Netlify:**
    -   Acesse [app.netlify.com](https://app.netlify.com/) e faça login com sua conta do GitHub.
    -   Clique em "Add new site" -> "Import an existing project".
    -   Escolha seu repositório recém-forkado.

3.  **Configure a Chave da API:**
    -   O Netlify detectará o arquivo `netlify.toml` e configurará o build automaticamente.
    -   Antes de fazer o deploy, vá para **Site settings > Build & deploy > Environment**.
    -   Clique em **"Edit variables"** e adicione sua chave secreta:
        -   **Key:** `GEMINI_API_KEY`
        -   **Value:** `SUA_CHAVE_SECRETA_REAL_AQUI`
    -   Clique em Salvar.

4.  **Faça o Deploy:**
    -   Vá para a aba **"Deploys"** e clique em **"Trigger deploy" -> "Deploy site"**.
    -   Em poucos minutos, seu site estará no ar!

## ⚙️ Como Rodar o Projeto Localmente (Opcional)

Para testar em sua máquina, você pode usar a CLI (Interface de Linha de Comando) da Netlify.

**Pré-requisitos:**
-   [Node.js](https://nodejs.org/) (versão 18 ou superior)

**Instalação:**
1.  **Clone seu fork do repositório:**
    ```sh
    git clone [https://github.com/seu-usuario/aura-chatbot.git](https://github.com/seu-usuario/aura-chatbot.git)
    ```
2.  **Navegue até a pasta do projeto:**
    ```sh
    cd aura-chatbot
    ```
3.  **Instale as dependências:**
    ```sh
    npm install
    ```
4.  **Instale a CLI da Netlify globalmente:**
    ```sh
    npm install netlify-cli -g
    ```
5.  **Faça o login na Netlify pela CLI:**
    ```sh
    netlify login
    ```
6.  **Inicie o ambiente de desenvolvimento local:**
    -   Crie um arquivo `.env` na raiz e adicione sua chave: `GEMINI_API_KEY=SUA_CHAVE_AQUI`
    -   Execute o comando:
    ```sh
    netlify dev
    ```
7.  **Abra seu navegador** e acesse o endereço fornecido (geralmente `http://localhost:8888`).

## 🔮 Melhorias Futuras

-   [ ] Implementar persistência de histórico de chat (com LocalStorage ou banco de dados).
-   [ ] Adicionar autenticação de usuário para conversas privadas.
-   [ ] Criar um seletor de tema (Light/Dark Mode).
-   [ ] Implementar streaming da resposta da IA para uma percepção de velocidade maior.

---
<p align="center">
  Feito com ❤️ por Luciano Junior
</p>
