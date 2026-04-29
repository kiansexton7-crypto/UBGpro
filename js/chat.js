// ============================================================
// UBG PRO — SOCIAL SYSTEM (Chat, Friends, DMs)
// Real-time communication via Firestore
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const chatMessages = document.getElementById("chatMessages");
  const chatForm = document.getElementById("chatForm");
  const chatInput = document.getElementById("chatInput");
  const activeChatTitle = document.getElementById("activeChatTitle");
  const activeChatDesc = document.getElementById("activeChatDesc");
  
  const dmList = document.getElementById("dmList");
  const requestList = document.getElementById("requestList");
  const pendingRequestsSection = document.getElementById("pendingRequestsSection");
  
  const addFriendBtn = document.getElementById("addFriendBtn");
  const friendModal = document.getElementById("friendModal");
  const closeFriendModal = document.getElementById("closeFriendModal");
  const sendFriendRequestBtn = document.getElementById("sendFriendRequestBtn");
  const friendUsernameInput = document.getElementById("friendUsernameInput");

  // State
  let currentChannel = "global"; // "global" or "dm:username"
  let unsubscribeChat = null;
  let unsubscribeRequests = null;
  let unsubscribeFriends = null;

  function getUsername() {
    return currentUser ? currentUser.email.replace("@ubgpro.local", "") : null;
  }

  // ============================================================
  // CHAT LOGIC
  // ============================================================

  function switchChannel(channelId, title, desc) {
    currentChannel = channelId;
    activeChatTitle.innerHTML = title;
    activeChatDesc.textContent = desc;
    
    // Update active class in sidebar
    document.querySelectorAll(".channel-item").forEach(item => {
      item.classList.toggle("active", item.dataset.id === channelId);
    });

    initChat();
  }

  function initChat() {
    if (unsubscribeChat) unsubscribeChat();

    let query;
    if (currentChannel === "global") {
      query = db.collection("messages")
        .orderBy("timestamp", "desc")
        .limit(50);
    } else if (currentChannel.startsWith("dm:")) {
      const otherUser = currentChannel.split(":")[1];
      const me = getUsername();
      // DM ID is sorted alphabetical usernames to stay consistent for both users
      const dmId = [me, otherUser].sort().join("_");
      query = db.collection("dms").doc(dmId).collection("messages")
        .orderBy("timestamp", "desc")
        .limit(50);
    }

    unsubscribeChat = query.onSnapshot((snapshot) => {
      if (!chatMessages) return;
      chatMessages.innerHTML = "";
      
      const msgs = [];
      snapshot.forEach(doc => msgs.push(doc.data()));
      msgs.reverse();

      msgs.forEach(msg => {
        const msgEl = document.createElement("div");
        msgEl.className = "chat-msg";
        if (getUsername() === msg.username) msgEl.classList.add("me");

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
      if (!currentUser) { showToast("You must be logged in to chat"); return; }
      
      const text = chatInput.value.trim();
      if (!text) return;
      chatInput.value = "";
      
      const username = getUsername();
      const payload = {
        username: username,
        text: text,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      };

      if (currentChannel === "global") {
        db.collection("messages").add(payload);
      } else if (currentChannel.startsWith("dm:")) {
        const otherUser = currentChannel.split(":")[1];
        const dmId = [username, otherUser].sort().join("_");
        db.collection("dms").doc(dmId).collection("messages").add(payload);
      }
    });
  }

  // ============================================================
  // FRIENDS & DM SYSTEM
  // ============================================================

  function initSocial() {
    const me = getUsername();
    if (!me) return;

    // Listen for friend requests
    unsubscribeRequests = db.collection("friendRequests")
      .where("to", "==", me)
      .where("status", "==", "pending")
      .onSnapshot(snapshot => {
        requestList.innerHTML = "";
        if (snapshot.empty) {
          pendingRequestsSection.style.display = "none";
        } else {
          pendingRequestsSection.style.display = "block";
          snapshot.forEach(doc => {
            const req = doc.data();
            const el = document.createElement("div");
            el.className = "channel-item";
            el.innerHTML = `
              <span><i class="fas fa-user-clock"></i> ${req.from}</span>
              <div class="channel-actions">
                <button class="btn-icon-small accept-req" data-id="${doc.id}" data-from="${req.from}"><i class="fas fa-check"></i></button>
              </div>
            `;
            requestList.appendChild(el);
          });
          
          // Accept logic
          requestList.querySelectorAll(".accept-req").forEach(btn => {
            btn.addEventListener("click", () => acceptFriendRequest(btn.dataset.id, btn.dataset.from));
          });
        }
      });

    // Listen for friends
    unsubscribeFriends = db.collection("friends")
      .where("users", "array-contains", me)
      .onSnapshot(snapshot => {
        dmList.innerHTML = "";
        snapshot.forEach(doc => {
          const data = doc.data();
          const friend = data.users.find(u => u !== me);
          const el = document.createElement("div");
          el.className = "channel-item";
          el.dataset.id = `dm:${friend}`;
          el.innerHTML = `<i class="fas fa-user"></i> ${friend}`;
          el.addEventListener("click", () => {
            switchChannel(`dm:${friend}`, `<i class="fas fa-user"></i> DM: ${friend}`, `Private chat with ${friend}`);
          });
          dmList.appendChild(el);
        });
      });
  }

  function acceptFriendRequest(requestId, fromUser) {
    const me = getUsername();
    const batch = db.batch();
    
    // Update request
    const reqRef = db.collection("friendRequests").doc(requestId);
    batch.update(reqRef, { status: "accepted" });
    
    // Create friendship
    const friendRef = db.collection("friends").doc([me, fromUser].sort().join("_"));
    batch.set(friendRef, { users: [me, fromUser], created: firebase.firestore.FieldValue.serverTimestamp() });
    
    batch.commit().then(() => showToast(`Friend request from ${fromUser} accepted!`));
  }

  if (addFriendBtn) {
    addFriendBtn.addEventListener("click", () => friendModal.classList.add("open"));
  }
  if (closeFriendModal) {
    closeFriendModal.addEventListener("click", () => friendModal.classList.remove("open"));
  }

  if (sendFriendRequestBtn) {
    sendFriendRequestBtn.addEventListener("click", () => {
      const target = friendUsernameInput.value.trim();
      const me = getUsername();
      if (!target || target === me) return;

      db.collection("friendRequests").add({
        from: me,
        to: target,
        status: "pending",
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      }).then(() => {
        showToast("Friend request sent!");
        friendModal.classList.remove("open");
        friendUsernameInput.value = "";
      });
    });
  }

  // ============================================================
  // HELPERS
  // ============================================================

  function formatTime(timestamp) {
    if (!timestamp) return "Just now";
    const date = timestamp.toDate();
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  function escapeHtml(unsafe) {
    return unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
  }

  // Init switch for global
  document.querySelector(".channel-item[data-id='global']").addEventListener("click", () => {
    switchChannel("global", `<i class="fas fa-globe"></i> Global Chat`, "Chat with other players on UBGPro in real-time!");
  });

  // Auth State
  auth.onAuthStateChanged((user) => {
    if (user) {
      initSocial();
      initChat();
    } else {
      if (unsubscribeRequests) unsubscribeRequests();
      if (unsubscribeFriends) unsubscribeFriends();
      if (unsubscribeChat) unsubscribeChat();
    }
  });
});
