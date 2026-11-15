import { askAI } from "../ai.js";

const chatbox = document.querySelector("#chatbox");
const userInput = document.querySelector("#userInput");
const sendButton = document.querySelector("#sendButton");

function displayMessage(message, sender) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", sender);
    messageElement.innerHTML = message;
    chatbox.appendChild(messageElement);
}

sendButton.addEventListener("click", sendMessage);
userInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        sendMessage();
    }
});

async function sendMessage() {
    const question = userInput.value.trim();
    if (!question) {
        return;
    }
    displayMessage(question, "user-message");
    userInput.value = "";
    const answer = await askAI(question);
    displayMessage(answer, "ai-message");
}