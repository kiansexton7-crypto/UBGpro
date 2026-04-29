// ============================================================
// UBG PRO — SOCIAL SYSTEM (Chat, Friends, DMs, Notifications)
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  // Elements - Global Chat
  const chatMessages = document.getElementById("chatMessages");
  const chatForm = document.getElementById("chatForm");
  const chatInput = document.getElementById("chatInput");
  const chatLoginPrompt = document.getElementById("chatLoginPrompt");
  const activeChatTitle = document.getElementById("activeChatTitle");
  const activeChatDesc = document.getElementById("activeChatDesc");

  // Elements - DMs
  const dmMessages = document.getElementById("dmMessages");
  const dmForm = document.getElementById("dmForm");
  const dmInput = document.getElementById("dmInput");
  const dmLoginPrompt = document.getElementById("dmLoginPrompt");
  const dmListDms = document.getElementById("dmListDms");
  const dmTitle = document.getElementById("dmTitle");
  const dmDesc = document.getElementById("dmDesc");
  const dmAddFriendTop = document.getElementById("dmAddFriendTop");

  // Elements - Notifications
  const notifBtn = document.getElementById("notifBtn");
  const notifModal = document.getElementById("notifModal");
  const closeNotifModal = document.getElementById("closeNotifModal");
  const notifList = document.getElementById("notifList");
  const notifCount = document.getElementById("notifCount");

  // Elements - Modals
  const friendModal = document.getElementById("friendModal");
  const closeFriendModal = document.getElementById("closeFriendModal");
  const sendFriendRequestBtn = document.getElementById("sendFriendRequestBtn");
  const friendUsernameInput = document.getElementById("friendUsernameInput");

  // State
  let currentDmFriend = null;
  let unsubscribeChat = null;
  let unsubscribeDms = null;
  let unsubscribeNotifs = null;
  let unsubscribeFriends = null;

  function getUsername() {
    const user = firebase.auth().currentUser;
    return (user && user.email) ? user.email.replace("@ubgpro.local", "").toLowerCase() : null;
  }

  // ============================================================
  // GLOBAL CHAT LOGIC
  // ============================================================

  function initGlobalChat() {
    if (unsubscribeChat) unsubscribeChat();
    const query = db.collection("messages").orderBy("timestamp", "desc").limit(50);

    unsubscribeChat = query.onSnapshot((snapshot) => {
      if (!chatMessages) return;
      chatMessages.innerHTML = "";
      const msgs = [];
      snapshot.forEach(doc => msgs.push(doc.data()));
      msgs.reverse();

      msgs.forEach(msg => {
        const msgEl = document.createElement("div");
        msgEl.className = "chat-msg";
        if (getUsername() === msg.username.toLowerCase()) msgEl.classList.add("me");
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
    }, (error) => console.error("Chat sync error:", error));
  }

  if (chatForm) {
    chatForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const me = getUsername();
      if (!me) { showToast("You must be logged in to chat"); return; }
      const text = chatInput.value.trim();
      if (!text) return;
      chatInput.value = "";
      db.collection("messages").add({
        username: me,
        text: text,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
    });
  }

  // ============================================================
  // DM LOGIC
  // ============================================================

  function openDm(friend) {
    currentDmFriend = friend;
    dmTitle.innerHTML = `<i class="fas fa-user"></i> ${friend}`;
    dmDesc.textContent = "Secure Private Chat";
    
    const user = firebase.auth().currentUser;
    if (user) {
      dmForm.style.display = "flex";
      dmLoginPrompt.style.display = "none";
    } else {
      dmForm.style.display = "none";
      dmLoginPrompt.style.display = "flex";
    }
    
    dmAddFriendTop.style.display = "none";

    document.querySelectorAll("#dmListDms .channel-item").forEach(item => {
      item.classList.toggle("active", item.dataset.user === friend);
    });

    initDmMessages();
  }

  function initDmMessages() {
    if (unsubscribeDms) unsubscribeDms();
    const me = getUsername();
    if (!me || !currentDmFriend) return;

    const dmId = [me, currentDmFriend.toLowerCase()].sort().join("_");
    const query = db.collection("dms").doc(dmId).collection("messages")
      .orderBy("timestamp", "desc").limit(50);

    unsubscribeDms = query.onSnapshot((snapshot) => {
      if (!dmMessages) return;
      dmMessages.innerHTML = "";
      const msgs = [];
      snapshot.forEach(doc => msgs.push(doc.data()));
      msgs.reverse();

      msgs.forEach(msg => {
        const msgEl = document.createElement("div");
        msgEl.className = "chat-msg";
        if (me === msg.username.toLowerCase()) msgEl.classList.add("me");
        msgEl.innerHTML = `
          <div class="chat-msg-header">
            <span class="chat-msg-user">${msg.username}</span>
            <span class="chat-msg-time">${formatTime(msg.timestamp)}</span>
          </div>
          <div class="chat-msg-text">${escapeHtml(msg.text)}</div>
        `;
        dmMessages.appendChild(msgEl);
      });
      dmMessages.scrollTop = dmMessages.scrollHeight;
    });
  }

  if (dmForm) {
    dmForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const me = getUsername();
      if (!me || !currentDmFriend) return;
      const text = dmInput.value.trim();
      if (!text) return;
      dmInput.value = "";
      const dmId = [me, currentDmFriend.toLowerCase()].sort().join("_");
      db.collection("dms").doc(dmId).collection("messages").add({
        username: me,
        text: text,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
    });
  }

  // ============================================================
  // NOTIFICATIONS & FRIENDS
  // ============================================================

  function initSocial() {
    const me = getUsername();
    if (!me) return;

    // Notifications Listener
    if (unsubscribeNotifs) unsubscribeNotifs();
    unsubscribeNotifs = db.collection("friendRequests")
      .where("to", "==", me)
      .where("status", "==", "pending")
      .onSnapshot(snapshot => {
        const count = snapshot.size;
        notifCount.textContent = count;
        notifCount.style.display = count > 0 ? "flex" : "none";

        notifList.innerHTML = snapshot.empty 
          ? `<p style="text-align:center; opacity:0.5; padding: 20px;">No new notifications</p>`
          : "";

        snapshot.forEach(doc => {
          const req = doc.data();
          const el = document.createElement("div");
          el.className = "notif-item";
          el.innerHTML = `
            <span><i class="fas fa-user-plus" style="color:var(--accent); margin-right:8px;"></i> <b>${req.from}</b> wants to be friends</span>
            <div class="notif-actions">
              <button class="btn-accept" data-id="${doc.id}" data-from="${req.from}"><i class="fas fa-check"></i></button>
              <button class="btn-reject" data-id="${doc.id}"><i class="fas fa-times"></i></button>
            </div>
          `;
          notifList.appendChild(el);
        });

        notifList.querySelectorAll(".btn-accept").forEach(b => b.addEventListener("click", () => acceptRequest(b.dataset.id, b.dataset.from)));
        notifList.querySelectorAll(".btn-reject").forEach(b => b.addEventListener("click", () => rejectRequest(b.dataset.id)));
      });

    // Friends Listener
    if (unsubscribeFriends) unsubscribeFriends();
    unsubscribeFriends = db.collection("friends")
      .where("users", "array-contains", me)
      .onSnapshot(snapshot => {
        dmListDms.innerHTML = "";
        if (snapshot.empty) {
          dmAddFriendTop.style.display = "block";
          dmDesc.textContent = "No friends yet. Add some to start chatting!";
        } else {
          dmAddFriendTop.style.display = "none";
          snapshot.forEach(doc => {
            const data = doc.data();
            const friend = data.users.find(u => u.toLowerCase() !== me);
            if (!friend) return;
            const el = document.createElement("div");
            el.className = "channel-item";
            el.dataset.user = friend;
            el.innerHTML = `<i class="fas fa-user"></i> ${friend}`;
            el.addEventListener("click", () => openDm(friend));
            dmListDms.appendChild(el);
          });
        }
      });
  }

  function acceptRequest(id, from) {
    const me = getUsername();
    const batch = db.batch();
    batch.update(db.collection("friendRequests").doc(id), { status: "accepted" });
    const friendshipId = [me, from.toLowerCase()].sort().join("_");
    batch.set(db.collection("friends").doc(friendshipId), { 
      users: [me, from.toLowerCase()], 
      timestamp: firebase.firestore.FieldValue.serverTimestamp() 
    });
    batch.commit().then(() => showToast(`Accepted friend request from ${from}!`));
  }

  function rejectRequest(id) {
    db.collection("friendRequests").doc(id).update({ status: "rejected" });
  }

  // ============================================================
  // UI HANDLERS
  // ============================================================

  if (notifBtn) notifBtn.addEventListener("click", () => notifModal.classList.add("open"));
  if (closeNotifModal) closeNotifModal.addEventListener("click", () => notifModal.classList.remove("open"));

  // Topbar Friends Button (if added)
  const topFriendsBtn = document.getElementById("topFriendsBtn");
  if (topFriendsBtn) {
    topFriendsBtn.addEventListener("click", () => showPage('dms'));
  }

  if (document.getElementById("addFriendBtnDms")) {
    document.getElementById("addFriendBtnDms").addEventListener("click", () => friendModal.classList.add("open"));
  }
  if (document.getElementById("addFriendBtnShortcut")) {
    document.getElementById("addFriendBtnShortcut").addEventListener("click", () => friendModal.classList.add("open"));
  }
  if (closeFriendModal) closeFriendModal.addEventListener("click", () => friendModal.classList.remove("open"));

  if (sendFriendRequestBtn) {
    sendFriendRequestBtn.addEventListener("click", () => {
      const target = friendUsernameInput.value.trim().toLowerCase();
      const me = getUsername();
      if (!target || target === me) return;

      db.collection("friendRequests").add({
        from: me,
        to: target,
        status: "pending",
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      }).then(() => {
        showToast(`Friend request sent to ${target}!`);
        friendModal.classList.remove("open");
        friendUsernameInput.value = "";
      });
    });
  }

  // FORCE FRIENDSHIP SEED (One-time check)
  function seedFriendship() {
    const me = getUsername();
    if (me === "theowner" || me === "alt") {
      const friendshipId = ["theowner", "alt"].sort().join("_");
      db.collection("friends").doc(friendshipId).get().then(doc => {
        if (!doc.exists) {
          db.collection("friends").doc(friendshipId).set({
            users: ["theowner", "alt"],
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
          });
        }
      });
    }
  }

  function formatTime(timestamp) {
    if (!timestamp) return "Just now";
    const date = timestamp.toDate();
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  function escapeHtml(unsafe) {
    return unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
  }

  // Auth Sync
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      if (chatForm) chatForm.style.display = "flex";
      if (chatLoginPrompt) chatLoginPrompt.style.display = "none";
      if (dmLoginPrompt) dmLoginPrompt.style.display = "none";
      initGlobalChat();
      initSocial();
      seedFriendship();
    } else {
      if (chatForm) chatForm.style.display = "none";
      if (chatLoginPrompt) chatLoginPrompt.style.display = "flex";
      if (dmLoginPrompt) dmLoginPrompt.style.display = "flex";
      if (dmForm) dmForm.style.display = "none";
      if (unsubscribeChat) unsubscribeChat();
      if (unsubscribeDms) unsubscribeDms();
      if (unsubscribeNotifs) unsubscribeNotifs();
      if (unsubscribeFriends) unsubscribeFriends();
    }
  });
});
