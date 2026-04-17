// ============================================================
// UBG PRO — PROXY AUTO-FALLBACK SYSTEM
// Cycles through multiple proxy backends automatically
// ============================================================

const PROXY_BACKENDS = [
  {
    name: "Ultraviolet (Titanium)",
    id: "uv1",
    encode: (url) => {
      const base = "https://titaniumnetwork.org/service/";
      return base + encodeURIComponent(url);
    },
    testUrl: "https://titaniumnetwork.org/"
  },
  {
    name: "Ultraviolet (Holy)",
    id: "uv2",
    encode: (url) => {
      const base = "https://holyubofficial.net/service/";
      return base + encodeURIComponent(url);
    },
    testUrl: "https://holyubofficial.net/"
  },
  {
    name: "Incognito Proxy",
    id: "incog",
    encode: (url) => {
      return `https://incognitonode.us.kg/service/${encodeURIComponent(url)}`;
    },
    testUrl: "https://incognitonode.us.kg/"
  },
  {
    name: "Corrosion (Public)",
    id: "corr",
    encode: (url) => {
      return `https://corrosion.wooloo.farm/service/${encodeURIComponent(url)}`;
    },
    testUrl: "https://corrosion.wooloo.farm/"
  },
  {
    name: "Direct (No Proxy)",
    id: "direct",
    encode: (url) => {
      if (!url.startsWith("http")) url = "https://" + url;
      return url;
    },
    testUrl: "https://google.com/"
  }
];

let activeProxy = null;
let proxyStatuses = {};

// Check if a proxy is reachable
async function checkProxy(proxy) {
  return new Promise((resolve) => {
    const img = new Image();
    const timeout = setTimeout(() => { resolve(false); }, 4000);
    img.onload = () => { clearTimeout(timeout); resolve(true); };
    img.onerror = () => { clearTimeout(timeout); resolve(false); };
    img.src = proxy.testUrl + "favicon.ico?_=" + Date.now();
  });
}

// Check all proxies, find first live one
async function detectBestProxy() {
  updateProxyStatusUI("checking");
  for (const proxy of PROXY_BACKENDS) {
    proxyStatuses[proxy.id] = "checking";
    renderProxyChips();
    const alive = await checkProxy(proxy);
    proxyStatuses[proxy.id] = alive ? "live" : "dead";
    renderProxyChips();
    if (alive && !activeProxy) {
      activeProxy = proxy;
      updateProxyStatusUI("live", proxy.name);
    }
  }
  if (!activeProxy) {
    activeProxy = PROXY_BACKENDS[PROXY_BACKENDS.length - 1]; // fallback to direct
    updateProxyStatusUI("dead");
  }
}

function renderProxyChips() {
  const list = document.getElementById("proxyStatusList");
  if (!list) return;
  list.innerHTML = PROXY_BACKENDS.map(p => {
    const status = proxyStatuses[p.id] || "checking";
    const icon = status === "live" ? "✅" : status === "dead" ? "❌" : "⏳";
    return `<div class="proxy-chip ${status}">${icon} ${p.name}</div>`;
  }).join("");
}

function updateProxyStatusUI(state, name) {
  const dot = document.querySelector(".status-dot");
  const text = document.querySelector(".status-text");
  if (!dot || !text) return;
  dot.className = "status-dot " + (state === "live" ? "live" : state === "dead" ? "dead" : "");
  text.textContent = state === "live" ? `Proxy: ${name}` : state === "dead" ? "No proxy found" : "Checking proxies...";
}

function navigateProxy(rawUrl) {
  if (!rawUrl) return;
  if (!rawUrl.startsWith("http")) rawUrl = "https://" + rawUrl;

  const frame = document.getElementById("proxyFrame");
  const placeholder = document.getElementById("proxyPlaceholder");

  const backend = activeProxy || PROXY_BACKENDS[PROXY_BACKENDS.length - 1];
  const proxyUrl = backend.encode(rawUrl);

  if (frame) {
    frame.style.display = "block";
    frame.src = proxyUrl;
    if (placeholder) placeholder.style.display = "none";
    showToast(`🔒 Proxying via ${backend.name}`);
  }
}

// Auto-fallback on frame error
function setupProxyFrameHandlers() {
  const frame = document.getElementById("proxyFrame");
  if (!frame) return;
  frame.addEventListener("error", () => {
    showToast("⚠️ Proxy failed, trying next...");
    const currentIdx = PROXY_BACKENDS.findIndex(p => p.id === activeProxy?.id);
    const next = PROXY_BACKENDS[currentIdx + 1];
    if (next) {
      activeProxy = next;
      const currentUrl = document.getElementById("proxyUrl")?.value;
      if (currentUrl) navigateProxy(currentUrl);
    }
  });
}

// Init proxy on page load
document.addEventListener("DOMContentLoaded", () => {
  detectBestProxy();
  setupProxyFrameHandlers();

  const goBtn = document.getElementById("proxyGo");
  const urlInput = document.getElementById("proxyUrl");

  if (goBtn) goBtn.addEventListener("click", () => navigateProxy(urlInput.value));
  if (urlInput) {
    urlInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") navigateProxy(urlInput.value);
    });
  }
});
