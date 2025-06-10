Aura: Seu Assistente de Bem-Estar Integrado 💬
Uma interface de chat inteligente projetada para oferecer um espaço seguro de conversa sobre saúde mental e física, culminando em um resumo holístico e empático gerado pela IA do Google.

✨ Sobre o Projeto
Aura não é apenas um chatbot, é um experimento em escuta ativa e empática. O objetivo é criar um ambiente acolhedor onde o usuário possa expressar seus sentimentos e refletir sobre seus hábitos. A IA foi cuidadosamente instruída para fazer perguntas contextuais que conectam o estado emocional com a saúde física (sono, exercícios, etc.), promovendo uma visão de bem-estar 360°.

A arquitetura do projeto utiliza um backend Node.js como um proxy seguro, garantindo que a chave da API do Google Gemini nunca seja exposta no lado do cliente.

🚀 Principais Funcionalidades
Conversa Empática e Fluida: A IA é instruída para manter um tom gentil e fazer perguntas abertas.

Abordagem Holística: Conecta perguntas sobre sentimentos com hábitos de sono, exercícios e alimentação de forma natural.

Resumo Final Sob Demanda: O usuário tem total controle e pode solicitar um resumo integrado da conversa quando se sentir pronto.

Interface Moderna e Responsiva: Interface limpa e agradável, construída com Tailwind CSS.

Backend Seguro: Um servidor Express.js protege a chave da API, processando todas as chamadas para a IA do Google.

🛠️ Tecnologias Utilizadas
Frontend:

HTML5

CSS3 com Tailwind CSS

JavaScript (Vanilla)

Backend:

Node.js

Express.js

Dotenv para gerenciamento de segredos

Inteligência Artificial:

Google Gemini API

📁 Estrutura do Projeto
/aura-chatbot/
├── public/              # Arquivos públicos (acessíveis pelo navegador)
│   ├── index.html       # A estrutura da página
│   ├── style.css        # Estilos personalizados
│   └── script.js        # Lógica do frontend
├── .env                 # Arquivo SECRETO com a chave da API (ignorado pelo Git)
├── .gitignore           # Especifica os arquivos a serem ignorados pelo Git
└── server.js            # O servidor backend (Node.js/Express)

⚙️ Como Rodar o Projeto Localmente
Siga os passos abaixo para executar o Aura na sua máquina.

Pré-requisitos:

Node.js (versão 14 ou superior)

npm (geralmente vem com o Node.js)

Instalação:

Clone o repositório:

git clone https://github.com/seu-usuario/aura-chatbot.git

Navegue até a pasta do projeto:

cd chatbot-bem-estar

Instale as dependências do backend:

npm install

Configure suas variáveis de ambiente:

Crie um arquivo chamado .env na raiz do projeto.

Dentro dele, adicione sua chave da API do Google Gemini:

GEMINI_API_KEY=SUA_CHAVE_SECRETA_AQUI

Inicie o servidor:

node server.js

Abra seu navegador e acesse http://localhost:3000. Pronto!

💡 Como Usar
Ao abrir a página, o assistente Aura irá te saudar.

Converse naturalmente sobre como você está se sentindo. A IA fará perguntas para aprofundar a conversa.

Quando sentir que a conversa foi suficiente, clique no botão de "check" (✅) para solicitar o seu resumo final integrado.

A IA irá processar todo o histórico e apresentar uma análise final, encerrando a sessão.

🔮 Melhorias Futuras
[ ] Implementar persistência de histórico de chat (com LocalStorage ou banco de dados).

[ ] Adicionar autenticação de usuário para conversas privadas.

[ ] Criar um seletor de tema (Light/Dark Mode).

[ ] Implementar streaming da resposta da IA para uma percepção de velocidade maior.

📄 Licença
Distribuído sob a licença MIT. Veja LICENSE para mais informações.