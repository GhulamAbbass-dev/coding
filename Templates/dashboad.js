const input = document.getElementById("input");
const sendBtn = document.getElementById("Send");
const chatMessages = document.querySelector(".chat-messages");

// 💡 PUT YOUR API KEY BELOW (only for local testing!)
const API_KEY = "AIzaSyB1qND59fwRUpMUnc4e2pLLvjsqN3X2Uts";


// Function to add messages to chat area
function addMessage(content, sender) {
  const msg = document.createElement("div");
  msg.classList.add("message", sender);
  msg.textContent = content;
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Send message handler
sendBtn.addEventListener("click", async () => {
  const userMessage = input.value.trim();
  if (!userMessage) return;

  addMessage(userMessage, "user");
  input.value = "";

  // Show loading indicator
  const loading = document.createElement("div");
  loading.classList.add("message", "bot");
  loading.textContent = "Thinking...";
  chatMessages.appendChild(loading);
  chatMessages.scrollTop = chatMessages.scrollHeight;

  try {
    // Call OpenAI API directly
    const response = await fetch("https://aistudio.google.com/api-keys", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", // You can use gpt-4-turbo if available
        messages: [{ role: "user", content: userMessage }],
      }),
    });

    const data = await response.json();
    loading.remove();

    if (data.error) {
      addMessage(`Error: ${data.error.message}`, "bot");
      return;
    }

    const botReply = data.choices[0].message.content.trim();
    addMessage(botReply, "bot");
  } catch (err) {
    loading.remove();
    addMessage("⚠️ Network error. Check your connection or key.", "bot");
    console.error(err);
  }
});
