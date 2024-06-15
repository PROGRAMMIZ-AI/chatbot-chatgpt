async function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() === "") return;

    const chatBox = document.getElementById('chat-box');

    // Display user message
    const userMessage = document.createElement('div');
    userMessage.textContent = "You: " + userInput;
    chatBox.appendChild(userMessage);

    // Fetch chatbot response from OpenAI API
    const botMessage = document.createElement('div');
    botMessage.textContent = "Chatbot: Thinking...";
    chatBox.appendChild(botMessage);

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer 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'
            },
            body: JSON.stringify({
                model: "gpt-4",
                messages: [{ role: "user", content: userInput }]
            })
        });
        const data = await response.json();
        botMessage.textContent = "Chatbot: " + data.choices[0].message.content;
    } catch (error) {
        botMessage.textContent = "Chatbot: Error fetching response.";
        console.error('Error:', error);
    }

    // Clear input
    document.getElementById('user-input').value = "";
    chatBox.scrollTop = chatBox.scrollHeight;
}
