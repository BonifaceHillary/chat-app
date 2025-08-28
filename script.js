const johnSelectorBtn = document.querySelector("#Jake-selector");

const janeSelectorBtn = document.querySelector("#Imma-selector");

const chatHeader = document.querySelector(".chat-header");

const chatMessages = document.querySelector(".chat-messages");

const chatInputForm = document.querySelector(".chat-input-form");

const chatInput = document.querySelector(".chat-input");

const clearChatBtn = document.querySelector(".clear-chat-button");

const messages = JSON.parse(localStorage.getItem("messages")) || [];

const createChatMessageElement = (message) => `
<div class="message ${message.sender === "Jake" ? "blue-bg" : "gray-bg"}">
<div class="message-sender">${message.sender}</div>
<div class="message-text">${message.text}</div>
<div class="message-timestamp">${message.timestamp}</div>
</div>
`;


Window.onload = () => {
  messages.forEach((message) => {
    chatMessages.innerHTML += createChatMessageElement(message);
  });
};

let messageSender = "Jake";

const updateMessageSender = (name) => {
  messageSender = name;
  chatHeader.innerText = `${messageSender} chatting...`;
  chatInput.placeholder = `type here, ${messageSender}...`;

  if (name === "Jake") {
    johnSelectorBtn.classList.add("active-person");
    immaSelectorBtn.classList.remove("active-person");
  }

  if (name === "Imma") {
    janeSelectorBtn.classList.add("active-person");
    johnSelectorBtn.classList.remove("active-person");
  }

  chatInput.focus();
};

johnSelectorBtn.onclick = () => updateMessageSender("Jake");

janeSelectorBtn.onclick = () => updateMessageSender("Imma");

const sendMessage = (e) => {
  e.preventDefault();
  const timestamp = new Date().toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const message = {
    sender: messageSender,
    text: chatInput.value, 
    timestamp,
  }

  messages.push(message);

  localStorage.setItem('messages', JSON.stringify(messages));

  chatMessages.innerHTML += createChatMessageElement(message);

  chatInputForm.reset();

  chatMessages.scrollTop = chatMessages.scrollHeight;
};

chatInputForm.addEventListener("submit", sendMessage);
