// ============================================================
// UBG PRO — CORE APP LOGIC
// Navigation, search, game cards, modal, categories
// ============================================================

let currentCat = "all";
let currentSearch = "";

// ============================================================
// PAGE ROUTING
// ============================================================
function showPage(pageId) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  const target = document.getElementById(`page-${pageId}`);
  if (target) target.classList.add("active");

  document.querySelectorAll(".nav-item").forEach(n => {
    n.classList.toggle("active", n.dataset.page === pageId);
  });

  // Lazy populate on navigate
  if (pageId === "games") renderAllGamesPage();
  if (pageId === "unity") renderUnityPage();
}

// ============================================================
// GAME CARD BUILDER
// ============================================================
function buildCard(game) {
  const card = document.createElement("div");
  card.className = "game-card";
  card.innerHTML = `
    <div class="game-thumb-placeholder" style="background: linear-gradient(135deg, ${hashColor(game.id)}, ${hashColor(game.id + 50)})">
      <span style="font-size:2.8rem">${game.emoji}</span>
      <div class="game-overlay">
        <div class="play-btn"><i class="fas fa-play"></i></div>
      </div>
    </div>
    <div class="game-info">
      <div class="game-name">${game.name}</div>
      <div class="game-meta">
        <span class="game-cat-tag">${game.cat}</span>
        ${game.unity ? '<span class="game-cat-tag" style="background:rgba(6,182,212,0.12);color:#06b6d4">Unity</span>' : ''}
      </div>
    </div>
  `;
  card.addEventListener("click", () => openGame(game));
  return card;
}

function hashColor(id) {
  const colors = [
    "#1e1e40","#1a2a3a","#1e2a20","#2a1a2a","#1a1a3a",
    "#2a1e1e","#1e2a2a","#2a2a1a","#1a2a1a","#2a1e2a"
  ];
  return colors[id % colors.length];
}

// ============================================================
// RENDER HOME PAGE
// ============================================================
function renderHome() {
  // Featured
  const featured = GAMES.filter(g => g.featured);
  const featuredGrid = document.getElementById("featuredGrid");
  if (featuredGrid) {
    featuredGrid.innerHTML = "";
    featured.forEach(g => featuredGrid.appendChild(buildCard(g)));
  }

  // All games grid (home)
  renderGameGrid("gameGrid", GAMES);
  document.getElementById("gameCount").textContent = `${GAMES.length} games`;

  // Clone cat filters to all games page
  cloneCatFilters();
}

// ============================================================
// RENDER GAME GRID WITH FILTER
// ============================================================
function renderGameGrid(containerId, games) {
  const grid = document.getElementById(containerId);
  if (!grid) return;
  grid.innerHTML = "";
  let filtered = games;
  if (currentCat !== "all") filtered = filtered.filter(g => g.cat === currentCat);
  if (currentSearch) filtered = filtered.filter(g => g.name.toLowerCase().includes(currentSearch.toLowerCase()));
  filtered.forEach(g => grid.appendChild(buildCard(g)));
}

function renderAllGamesPage() {
  renderGameGrid("gameGrid2", GAMES);
  document.getElementById("gameCount2").textContent = `${GAMES.length} games`;
}

function renderUnityPage() {
  const unityGames = GAMES.filter(g => g.unity || g.cat === "unity");
  const grid = document.getElementById("unityGrid");
  if (!grid) return;
  grid.innerHTML = "";
  unityGames.forEach(g => grid.appendChild(buildCard(g)));
}

// ============================================================
// CATEGORY FILTERS
// ============================================================
function cloneCatFilters() {
  const source = document.getElementById("catFilters");
  const target = document.getElementById("catFilters2");
  if (source && target) {
    target.innerHTML = source.innerHTML;
    setupCatButtons("catFilters2", "gameGrid2");
  }
  setupCatButtons("catFilters", "gameGrid");
}

function setupCatButtons(filterId, gridId) {
  const container = document.getElementById(filterId);
  if (!container) return;
  container.querySelectorAll(".cat-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      container.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentCat = btn.dataset.cat;
      renderGameGrid(gridId, GAMES);
    });
  });
}

// ============================================================
// SEARCH
// ============================================================
function setupSearch() {
  const input = document.getElementById("searchInput");
  if (!input) return;
  input.addEventListener("input", (e) => {
    currentSearch = e.target.value;
    renderGameGrid("gameGrid", GAMES);
    renderGameGrid("gameGrid2", GAMES);
  });

  // Keyboard shortcut ⌘K / Ctrl+K
  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      input.focus();
    }
  });
}

// ============================================================
// GAME MODAL
// ============================================================
function openGame(game) {
  const overlay = document.getElementById("modalOverlay");
  const frame = document.getElementById("gameFrame");
  const title = document.getElementById("modalTitle");
  const cat = document.getElementById("modalCat");

  if (!overlay || !frame) return;

  title.textContent = game.name;
  cat.textContent = game.cat + (game.unity ? " · Unity" : "");
  frame.src = game.url;
  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeGame() {
  const overlay = document.getElementById("modalOverlay");
  const frame = document.getElementById("gameFrame");
  if (overlay) overlay.classList.remove("open");
  if (frame) frame.src = "about:blank";
  document.body.style.overflow = "";
}

function setupModal() {
  const closeBtn = document.getElementById("closeModal");
  const overlay = document.getElementById("modalOverlay");
  const fsBtn = document.getElementById("fullscreenBtn");
  const frame = document.getElementById("gameFrame");

  if (closeBtn) closeBtn.addEventListener("click", closeGame);
  if (overlay) overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeGame();
  });

  if (fsBtn && frame) {
    fsBtn.addEventListener("click", () => {
      if (frame.requestFullscreen) frame.requestFullscreen();
      else if (frame.webkitRequestFullscreen) frame.webkitRequestFullscreen();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const overlay = document.getElementById("modalOverlay");
      if (overlay && overlay.classList.contains("open")) closeGame();
    }
  });
}

// ============================================================
// SIDEBAR NAVIGATION
// ============================================================
function setupNav() {
  document.querySelectorAll(".nav-item").forEach(item => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      showPage(item.dataset.page);
      // Close sidebar on mobile
      if (window.innerWidth <= 768) {
        document.getElementById("sidebar").classList.remove("open");
      }
    });
  });

  const hamburger = document.getElementById("hamburger");
  const sidebar = document.getElementById("sidebar");
  if (hamburger && sidebar) {
    hamburger.addEventListener("click", () => sidebar.classList.toggle("open"));
  }
}

// ============================================================
// TOAST
// ============================================================
function showToast(msg, duration = 3000) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), duration);
}

// Make showToast global (used by cloak.js and proxy.js)
window.showToast = showToast;

// ============================================================
// INIT
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
  renderHome();
  setupSearch();
  setupModal();
  setupNav();
  showPage("home");
});
