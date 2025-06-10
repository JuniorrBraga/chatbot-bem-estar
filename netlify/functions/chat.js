// Importa o pacote para fazer chamadas HTTP
const fetch = require('node-fetch');

// A "mágica" das serverless functions está aqui.
// Em vez de "app.listen", exportamos uma função "handler".
exports.handler = async function (event, context) {
    // As informações enviadas pelo frontend vêm no corpo (body) do evento.
    // Precisamos converter o texto do corpo em um objeto JSON.
    const { history, systemInstruction } = JSON.parse(event.body);
    
    // No Netlify, as variáveis de ambiente são acessadas diretamente.
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'A chave da API do Gemini não foi configurada no servidor.' })
        };
    }

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

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

        const data = await apiResponse.json();

        if (!apiResponse.ok) {
            console.error("Erro da API do Google:", data);
            return {
                statusCode: apiResponse.status,
                body: JSON.stringify({ error: 'Erro ao se comunicar com a API do Google.' })
            };
        }
        
        // Retorna a resposta com sucesso para o frontend
        return {
            statusCode: 200,
            body: JSON.stringify(data)
        };

    } catch (error) {
        console.error('Erro na função serverless:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Erro interno no servidor.' })
        };
    }
};
