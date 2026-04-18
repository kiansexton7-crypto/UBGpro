// ============================================================
// UBG PRO — CHAT SYSTEM
// Real-time global chat via Firestore
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  const chatMessages = document.getElementById("chatMessages");
  const chatForm = document.getElementById("chatForm");
  const chatInput = document.getElementById("chatInput");
  const chatLoginPrompt = document.getElementById("chatLoginPrompt");
  const openChatLoginBtn = document.getElementById("openChatLoginBtn");

  let unsubscribeChat = null;

  function initChat() {
    if (unsubscribeChat) return;

    const messagesQuery = db.collection("messages")
      .orderBy("timestamp", "desc")
      .limit(50);

    unsubscribeChat = messagesQuery.onSnapshot((snapshot) => {
      if (!chatMessages) return;
      
      chatMessages.innerHTML = "";
      
      const msgs = [];
      snapshot.forEach(doc => msgs.push(doc.data()));
      msgs.reverse();

      msgs.forEach(msg => {
        const msgEl = document.createElement("div");
        msgEl.className = "chat-msg";
        
        const currentUsername = currentUser ? currentUser.email.replace("@ubgpro.local", "") : null;
        if (currentUsername === msg.username) {
          msgEl.classList.add("me");
        }

        msgEl.innerHTML = `
          <div class="chat-msg-header">
            <span class="chat-msg-user">${msg.username}</span>
            <span class="chat-msg-time">${formatTime(msg.timestamp)}</span>
          </div>
          <div class="chat-msg-text">${escapeHtml(msg.text)}</div>
        `;
        
        chatMessages.appendChild(msgEl);
      });

      chatMessages.scrollTop = chatMessages.scrollHeight;
    });
  }

  if (chatForm) {
    chatForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      if (!currentUser) {
        showToast("You must be logged in to chat");
        return;
      }
      
      const text = chatInput.value.trim();
      if (!text) return;
      
      const username = currentUser.email.replace("@ubgpro.local", "");
      
      chatInput.value = "";
      
      db.collection("messages").add({
        username: username,
        text: text,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      }).catch(error => {
        console.error("Error sending message:", error);
        showToast("Failed to send message");
      });
    });
  }

  auth.onAuthStateChanged((user) => {
    if (chatForm && chatLoginPrompt) {
      if (user) {
        chatForm.style.display = "flex";
        chatLoginPrompt.style.display = "none";
      } else {
        chatForm.style.display = "none";
        chatLoginPrompt.style.display = "flex";
      }
    }
  });

  if (openChatLoginBtn) {
    openChatLoginBtn.addEventListener("click", () => {
      document.getElementById("loginBtn").click();
    });
  }

  function formatTime(timestamp) {
    if (!timestamp) return "Just now";
    const date = timestamp.toDate();
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  function escapeHtml(unsafe) {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Initialize chat when page loads
  initChat();
});
