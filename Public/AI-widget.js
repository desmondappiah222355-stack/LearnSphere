import { askAI } from "./ai.js";

const chatButton = document.createElement("button");
chatButton.id = "ai-widget-button";
chatButton.textContent = "💬";
document.body.appendChild(chatButton);

const chatWindow = document.createElement("div");
chatWindow.id = "ai-widget-window";
document.body.appendChild(chatWindow);

const chatHeader = document.createElement("div");
chatHeader.id = "ai-widget-header";
chatHeader.textContent = "LearnSphere AI";
chatWindow.appendChild(chatHeader);


const chatMessages = document.createElement("div");
chatMessages.id = "ai-widget-messages";
chatWindow.appendChild(chatMessages);


const chatInputContainer = document.createElement("div");
chatInputContainer.id = "ai-widget-input-container";
chatWindow.appendChild(chatInputContainer);


const chatInput = document.createElement("input");
chatInput.id = "ai-widget-input";
chatInput.placeholder = "Ask LearnSphere AI...";
chatInputContainer.appendChild(chatInput);


const sendButton = document.createElement("button");
sendButton.id = "ai-widget-send";
sendButton.textContent = "➤";
chatInputContainer.appendChild(sendButton);


chatButton.addEventListener("click", () => {
    if (chatWindow.style.display === "flex") {
        chatWindow.style.display = "none";
    } else {
        chatWindow.style.display = "flex";
    }
});



function displayMessage(message, sender) {

    const messageElement = document.createElement("div");
    messageElement.classList.add("ai-widget-message", sender);
    messageElement.innerHTML = message;
    chatMessages.appendChild(messageElement);
}
sendButton.addEventListener("click", sendWidgetMessage);
chatInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        sendWidgetMessage();
    }
});
async function sendWidgetMessage() {
    const question = chatInput.value.trim();

    if (!question) {
        return;
    }

    displayMessage(question, "user-message");

    chatInput.value = "";

    const answer = await askAI(question);

    displayMessage(answer, "ai-message");
}