// Importa os pacotes necessários
const express = require('express');
const fetch = require('node-fetch'); // Para fazer chamadas HTTP no Node.js
require('dotenv').config(); // Para carregar a chave da API do arquivo .env

// Inicializa o aplicativo Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json()); // Permite que o servidor entenda JSON
app.use(express.static('public')); // Serve os arquivos estáticos da pasta 'public' (nosso index.html)

// A nossa rota segura da API
app.post('/api/chat', async (req, res) => {
  // Pega o histórico e a instrução do corpo da requisição enviada pelo frontend
  const { history, systemInstruction } = req.body;
  const apiKey = process.env.GEMINI_API_KEY; // Pega a chave do ambiente, de forma segura

  if (!apiKey) {
    return res.status(500).json({ error: 'A chave da API do Gemini não foi configurada no servidor.' });
  }

  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  const payload = {
    contents: history,
    systemInstruction: {
      role: "system",
      parts: [{ text: systemInstruction }]
    }
  };

  try {
    const apiResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!apiResponse.ok) {
        const errorBody = await apiResponse.json();
        console.error("Erro da API do Google:", errorBody);
        return res.status(apiResponse.status).json({ error: 'Erro ao se comunicar com a API do Google.' });
    }

    const data = await apiResponse.json();
    // Envia a resposta da IA de volta para o frontend
    res.json(data); 

  } catch (error) {
    console.error('Erro no servidor proxy:', error);
    res.status(500).json({ error: 'Erro interno no servidor.' });
  }
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});