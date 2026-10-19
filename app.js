
const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/",
  instagram: "https://www.instagram.com/",
  youtube: "https://www.youtube.com/",
  tiktok: "https://www.tiktok.com/",
  linkedin: "https://www.linkedin.com/"
};

const GITHUB_USERNAME = "javier-jara20";

/*
 * Puedes poner tus repositorios reales aquí. Si todavía no quieres mostrar alguno,
 * cambia el nombre/URL o elimina el objeto. Los enlaces demo no apuntan a repos reales.
 */
const PROJECTS = [
  {
    title: "Linktree personal",
    description: "Mi espacio digital con redes, animaciones y accesos rápidos.",
    tag: "HTML · CSS · JS",
    symbol: "↗",
    color: "#8b5cf6",
    demo: "#inicio",
    code: "https://github.com/javier-jara20"
  },
  {
    title: "Restaurante App",
    description: "Aplicación de consola en Python para practicar POO y organizar productos.",
    tag: "PYTHON · POO",
    symbol: "⌘",
    color: "#37c8ff",
    demo: "https://github.com/javier-jara20",
    code: "https://github.com/javier-jara20"
  },
  {
    title: "Explora mis repos",
    description: "Más ejercicios, proyectos y experimentos de programación.",
    tag: "GITHUB",
    symbol: "⌁",
    color: "#f17be9",
    demo: "https://github.com/javier-jara20",
    code: "https://github.com/javier-jara20"
  }
];

const $ = (selector) => document.querySelector(selector);
const root = document.documentElement;
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const STORAGE_THEME = "xavii-linktree-theme-v1";
const STORAGE_STATS = "xavii-linktree-stats-v1";

function setSocialLinks() {
  document.querySelectorAll("[data-link-id]").forEach((link) => {
    const id = link.dataset.linkId;
    if (SOCIAL_LINKS[id]) link.href = SOCIAL_LINKS[id];
  });
}

function renderProjects() {
  const grid = $("#project-grid");
  grid.innerHTML = PROJECTS.map((project, index) => `
    <article class="project-card" style="--project-glow:${project.color};animation:reveal-up .55s ${index * 90}ms both">
      <div class="project-top">
        <span class="project-symbol" aria-hidden="true">${project.symbol}</span>
        <span class="project-tag">${escapeHTML(project.tag)}</span>
      </div>
      <h3>${escapeHTML(project.title)}</h3>
      <p>${escapeHTML(project.description)}</p>
      <div class="project-actions">
        <a href="${safeURL(project.demo)}" target="_blank" rel="noopener noreferrer">Ver proyecto ↗</a>
        <a href="${safeURL(project.code)}" target="_blank" rel="noopener noreferrer">Ver código</a>
      </div>
    </article>
  `).join("");
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);
}
function safeURL(value) {
  try {
    const url = new URL(value, window.location.href);
    return ["https:", "http:"].includes(url.protocol) ? escapeHTML(url.href) : "#";
  } catch {
    return "#";
  }
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.remove("toast-pop");
  void toast.offsetWidth;
  toast.classList.add("toast-pop");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => { toast.textContent = ""; }, 2800);
}

async function copyProfile() {
  const url = window.location.href.split("#")[0];
  try {
    await navigator.clipboard.writeText(url);
    showToast("¡Enlace copiado al portapapeles!");
  } catch {
    const field = document.createElement("textarea");
    field.value = url;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.opacity = "0";
    document.body.appendChild(field);
    field.select();
    const copied = document.execCommand("copy");
    field.remove();
    showToast(copied ? "¡Enlace copiado!" : "Copia la dirección desde la barra del navegador.");
  }
}

async function shareProfile() {
  const shareData = {
    title: document.title,
    text: "Mis redes sociales y proyectos en un solo lugar.",
    url: window.location.href.split("#")[0]
  };
  if (navigator.share) {
    try { await navigator.share(shareData); }
    catch (error) { if (error.name !== "AbortError") showToast("No se pudo abrir el menú para compartir."); }
  } else {
    await copyProfile();
  }
}

function loadTheme() {
  const saved = localStorage.getItem(STORAGE_THEME);
  const theme = saved || "dark";
  root.dataset.theme = theme;
  $("#theme-icon").textContent = theme === "dark" ? "☼" : "☾";
  $("#theme-toggle").setAttribute("aria-label", theme === "dark" ? "Activar tema claro" : "Activar tema oscuro");
}
function toggleTheme() {
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  localStorage.setItem(STORAGE_THEME, next);
  $("#theme-icon").textContent = next === "dark" ? "☼" : "☾";
  $("#theme-toggle").setAttribute("aria-label", next === "dark" ? "Activar tema claro" : "Activar tema oscuro");
}

/* Estadísticas locales: solo clics desde este navegador/dispositivo, no visitas globales. */
function readStats() {
  try { return JSON.parse(localStorage.getItem(STORAGE_STATS)) || { total: 0, links: {} }; }
  catch { return { total: 0, links: {} }; }
}
function saveStats(stats) { localStorage.setItem(STORAGE_STATS, JSON.stringify(stats)); }
function renderStats() {
  const stats = readStats();
  $("#total-clicks").textContent = stats.total || 0;
  const top = Object.entries(stats.links || {}).sort((a,b) => b[1] - a[1])[0];
  $("#top-link").textContent = top ? `${top[0]} (${top[1]})` : "—";
}
function registerClick(id) {
  const stats = readStats();
  stats.total = (stats.total || 0) + 1;
  stats.links[id] = (stats.links[id] || 0) + 1;
  saveStats(stats);
  renderStats();
}
function resetStats() {
  if (!window.confirm("¿Quieres borrar las estadísticas guardadas en este navegador?")) return;
  saveStats({ total: 0, links: {} });
  renderStats();
  showToast("Estadísticas restablecidas.");
}

/* Partículas canvas: no se ejecuta si el usuario prefiere movimiento reducido. */
function initParticles() {
  const canvas = $("#particles");
  if (reducedMotion || !canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  let width = 0, height = 0, particles = [];
  const count = Math.min(65, Math.floor(window.innerWidth / 19));
  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth; height = window.innerHeight;
    canvas.width = width * dpr; canvas.height = height * dpr;
    canvas.style.width = `${width}px`; canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * width, y: Math.random() * height,
      r: Math.random() * 1.8 + .5, vx: (Math.random() - .5) * .32,
      vy: (Math.random() - .5) * .32, a: Math.random() * .48 + .12
    }));
  };
  const draw = () => {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx; p.y += p.vy;
      if (p.x < -5) p.x = width + 5; if (p.x > width + 5) p.x = -5;
      if (p.y < -5) p.y = height + 5; if (p.y > height + 5) p.y = -5;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(107, 191, 255, ${p.a})`; ctx.fill();
      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j], dx = p.x - q.x, dy = p.y - q.y;
        const distance = Math.sqrt(dx*dx + dy*dy);
        if (distance < 95) {
          ctx.beginPath(); ctx.moveTo(p.x,p.y); ctx.lineTo(q.x,q.y);
          ctx.strokeStyle = `rgba(104, 119, 255, ${.12 * (1 - distance/95)})`;
          ctx.lineWidth = .6; ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  };
  resize();
  window.addEventListener("resize", resize, { passive: true });
  draw();
}

function initCursorGlow() {
  if (reducedMotion || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  const glow = $(".cursor-glow");
  window.addEventListener("pointermove", (event) => {
    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;
    glow.style.opacity = ".9";
  }, { passive: true });
  document.addEventListener("pointerleave", () => { glow.style.opacity = "0"; });
}

function init() {
  setSocialLinks();
  renderProjects();
  loadTheme();
  renderStats();
  $("#year").textContent = new Date().getFullYear();
  $("#copy-button").addEventListener("click", copyProfile);
  $("#share-button").addEventListener("click", shareProfile);
  $("#theme-toggle").addEventListener("click", toggleTheme);
  $("#reset-stats").addEventListener("click", resetStats);
  document.querySelectorAll(".social-link").forEach((link) => {
    link.addEventListener("click", () => registerClick(link.dataset.linkId));
  });
  $("#project-grid").addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (link) registerClick(`proyecto:${link.textContent.trim().replace(" ↗","")}`);
  });
  initParticles();
  initCursorGlow();
}
document.addEventListener("DOMContentLoaded", init);

