document.addEventListener('DOMContentLoaded', () => {
    // --- Elementos da UI ---
    const chatBox = document.getElementById('chat-box');
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');
    const requestSummaryBtn = document.getElementById('request-summary-btn');
    const sendMessageBtn = document.getElementById('send-message-btn');

    let chatHistory = [];
    
    // --- Instruções para a IA ---
    const INSTRUCAO_AURA_CONVERSA = `
        Assuma o papel de 'Aura', uma ouvinte atenciosa com foco em bem-estar integrado (corpo e mente).
        Seu objetivo principal é entender como o usuário se sente emocionalmente, enquanto também explora, de forma natural e sutil, seus hábitos de saúde física.
        DIRETRIZES DA CONVERSA:
        1.  **Comece pelo Sentimento:** Sempre inicie entendendo o estado emocional do usuário.
        2.  **Conecte com o Físico:** Quando for apropriado, conecte o sentimento a um hábito físico. Não faça uma lista de perguntas. Use o contexto.
            * Se o usuário disser "estou cansado" ou "sem energia", pergunte: "Entendo... E como tem sido seu sono ultimamente? Você sente que tem descansado o suficiente?".
            * Se o usuário disser "estou ansioso" ou "muito agitado", pergunte: "Essa agitação pode ser desgastante. Você tem conseguido um tempo para movimentar o corpo, mesmo que seja uma caminhada leve?".
        3.  **Mantenha o Tom:** Seja sempre gentil e empático. As perguntas sobre hábitos devem soar como curiosidade e cuidado, não como uma cobrança.
    `;

    const INSTRUCAO_AURA_FINAL = `
        Com base em todo o histórico da conversa, chegou a hora de concluir. Não faça mais perguntas.
        Sintetize a conversa em um resumo empático e encorajador em um único parágrafo.
        Conecte brevemente como os hábitos físicos (sono, exercício) podem influenciar os sentimentos do usuário.
        Termine oferecendo uma sugestão gentil e um lembrete para procurar apoio profissional se necessário.
    `;
    
    // --- Funções de Lógica ---
    async function getAIResponse(history, systemInstruction) {
        const apiUrl = '/api/chat'; 
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ history, systemInstruction })
            });
            if (!response.ok) {
                console.error("ERRO VINDO DO BACKEND:", await response.text());
                return "API_ERROR";
            }
            const result = await response.json();
            
            if (result.promptFeedback && result.promptFeedback.blockReason) {
                console.error("PROMPT BLOQUEADO PELA API:", result.promptFeedback);
                return "API_ERROR";
            }

            if (result.candidates && result.candidates.length > 0 && result.candidates[0].content && result.candidates[0].content.parts[0].text) {
                return result.candidates[0].content.parts[0].text;
            }
            
            console.error("ESTRUTURA DE RESPOSTA INESPERADA:", result);
            return "API_ERROR";

        } catch (error) {
            console.error("ERRO DE CONEXÃO FETCH:", error);
            return "API_ERROR";
        }
    }

    function addMessage(text, sender) {
        const messageWrapper = document.createElement('div');
        messageWrapper.classList.add('flex', 'message-bubble');
        const formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
        
        const messageElement = document.createElement('div');
        messageElement.classList.add('max-w-xs', 'lg:max-w-md', 'px-4', 'py-3', 'rounded-2xl');
        messageElement.innerHTML = formattedText;

        if (sender === 'user') {
            messageWrapper.classList.add('justify-end');
            messageElement.classList.add('bg-indigo-600', 'text-white', 'rounded-br-none');
        } else {
            messageWrapper.classList.add('justify-start');
            messageElement.classList.add('bg-gray-200', 'text-gray-800', 'rounded-bl-none');
        }
        messageWrapper.appendChild(messageElement);
        chatBox.appendChild(messageWrapper);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    // --- Event Listeners ---

    // Evento para enviar uma mensagem normal
    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const userText = userInput.value.trim();
        if (userText === '' || userInput.disabled) return;

        addMessage(userText, 'user');
        chatHistory.push({ role: 'user', parts: [{ text: userText }] });
        userInput.value = '';
        userInput.disabled = true;
        sendMessageBtn.disabled = true;

        const typingIndicator = createTypingIndicator();
        chatBox.appendChild(typingIndicator);
        chatBox.scrollTop = chatBox.scrollHeight;

        const aiResponseText = await getAIResponse(chatHistory, INSTRUCAO_AURA_CONVERSA);
        chatHistory.push({ role: 'model', parts: [{ text: aiResponseText }] });
        
        chatBox.removeChild(typingIndicator);
        addMessage(aiResponseText, 'model');

        userInput.disabled = false;
        sendMessageBtn.disabled = false;
        userInput.focus();
    });
    
    // Evento para o botão de solicitar resumo
    requestSummaryBtn.addEventListener('click', async () => {
        userInput.disabled = true;
        sendMessageBtn.disabled = true;
        requestSummaryBtn.disabled = true;
        userInput.placeholder = "Gerando resumo final...";

        const summaryTypingIndicator = createTypingIndicator();
        chatBox.appendChild(summaryTypingIndicator);
        chatBox.scrollTop = chatBox.scrollHeight;
        
        const summaryText = await getAIResponse(chatHistory, INSTRUCAO_AURA_FINAL);

        chatBox.removeChild(summaryTypingIndicator);
        
        if (summaryText === "API_ERROR") {
            const fallbackMessage = "Chegamos ao final de nossa conversa por hoje. Refletir sobre o que falamos já é um ótimo passo. Lembre-se de se cuidar e, se precisar, estou aqui para uma nova conversa.";
            addMessage(fallbackMessage, 'model');
        } else {
            chatHistory.push({ role: 'model', parts: [{ text: summaryText }] });
            addMessage(summaryText, 'model');
        }

        userInput.placeholder = "Conversa finalizada. Recarregue para começar.";
    });
    
    // --- Funções de UI Auxiliares ---
    function createTypingIndicator() {
        const wrapper = document.createElement('div');
        wrapper.classList.add('flex', 'justify-start', 'items-center', 'space-x-1', 'p-3');
        wrapper.innerHTML = `<div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0s;"></div><div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.1s;"></div><div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s;"></div>`;
        return wrapper;
    }

    function startChat() {
        const firstMessage = "Olá! Sou a Aura, sua assistente de bem-estar. Como você está se sentindo hoje?";
        chatHistory.push({ role: 'model', parts: [{ text: firstMessage }] });
        addMessage(firstMessage, 'model');
    }

    startChat();
});
