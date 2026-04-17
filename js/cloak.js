// ============================================================
// UBG PRO — TAB CLOAKING SYSTEM
// ============================================================

const CLOAK_KEY = "ubgpro_cloak";

function applyCloak(title, iconUrl) {
  // Change page title
  document.title = title;

  // Change favicon
  let link = document.querySelector("link[rel~='icon']");
  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    document.head.appendChild(link);
  }
  link.href = iconUrl;

  // Save to localStorage
  localStorage.setItem(CLOAK_KEY, JSON.stringify({ title, iconUrl }));
  showToast(`🎭 Cloaked as: ${title}`);
}

function removeCloak() {
  document.title = "UBG Pro";
  let link = document.querySelector("link[rel~='icon']");
  if (link) link.href = "assets/favicon.ico";
  localStorage.removeItem(CLOAK_KEY);
  showToast("✅ Cloak removed");
}

function loadSavedCloak() {
  const saved = localStorage.getItem(CLOAK_KEY);
  if (saved) {
    try {
      const { title, iconUrl } = JSON.parse(saved);
      document.title = title;
      let link = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.head.appendChild(link);
      }
      link.href = iconUrl;
    } catch(e) {}
  }
}

function openAboutBlank() {
  const w = window.open("about:blank", "_blank");
  if (!w) { showToast("⚠️ Allow popups to use this feature"); return; }
  const doc = w.document;
  doc.open();
  doc.write(`<!DOCTYPE html><html><head><title>Loading...</title></head><body style="margin:0;background:#fff;">
  <iframe src="${location.href}" style="width:100%;height:100vh;border:none;"></iframe>
  </body></html>`);
  doc.close();
  showToast("👻 Opened in about:blank tab");
}

// Panic key — press Alt+X to open a blank Google Docs tab
function setupPanicKey() {
  document.addEventListener("keydown", (e) => {
    if (e.altKey && e.key === "x") {
      window.open("https://docs.google.com/", "_blank");
      showToast("🚨 Panic key activated!");
    }
  });
}

// Init cloak system
document.addEventListener("DOMContentLoaded", () => {
  loadSavedCloak();
  setupPanicKey();

  // Preset buttons
  document.querySelectorAll(".cloak-preset").forEach(btn => {
    btn.addEventListener("click", () => {
      const title = btn.dataset.title;
      const icon = btn.dataset.icon;
      applyCloak(title, icon);
      // Visually highlight active preset
      document.querySelectorAll(".cloak-preset").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });

  // Custom cloak
  const applyBtn = document.getElementById("applyCloakBtn");
  const removeBtn = document.getElementById("removeCloakBtn");
  const blankBtn = document.getElementById("blankCloakBtn");
  const panicBtn = document.getElementById("panicBtn");
  const cloakBtn = document.getElementById("cloakBtn");

  if (applyBtn) applyBtn.addEventListener("click", () => {
    const title = document.getElementById("cloakTitle").value || "Google Docs";
    const icon = document.getElementById("cloakIcon").value || "https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico";
    applyCloak(title, icon);
  });

  if (removeBtn) removeBtn.addEventListener("click", removeCloak);
  if (blankBtn) blankBtn.addEventListener("click", openAboutBlank);

  // Header panic btn
  if (panicBtn) panicBtn.addEventListener("click", () => {
    window.open("https://docs.google.com/", "_blank");
    showToast("🚨 Panic! Redirecting...");
  });

  // Header quick cloak btn
  if (cloakBtn) cloakBtn.addEventListener("click", () => {
    applyCloak("Google Docs - Untitled Document", "https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico");
    showToast("🎭 Quick cloaked as Google Docs");
  });
});
