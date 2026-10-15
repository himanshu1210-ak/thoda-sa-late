/* ================= CONFIG: edit here ================= */
const CONFIG = {
  music: "assets/audio/song.mp3",   // put your MP3 here; the music button only appears if the file loads
  lineDelayMs: 900                  // pace of the letter reveal
};
/* ===================================================== */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

// Photos: <figure data-src data-alt data-pos> -> <img>, or a labelled placeholder if the file is missing
function placeholder(fig) {
  const d = document.createElement("div");
  d.className = "ph"; d.textContent = "add " + fig.dataset.src;
  return d;
}
function loadPhotos() {
  $$("figure[data-src]").forEach(fig => {
    const img = new Image();
    img.alt = fig.dataset.alt || ""; img.loading = "lazy";
    img.style.objectPosition = fig.dataset.pos || "50% 30%";
    img.onerror = () => { img.replaceWith(placeholder(fig)); fig.dataset.missing = "1"; };
    img.src = fig.dataset.src;
    fig.prepend(img);
  });
}
// Backgrounds: only applied if the image actually loads (otherwise the gradient stays)
function loadBackgrounds() {
  $$("[data-bg]").forEach(el => {
    const t = new Image();
    t.onload = () => { el.style.backgroundImage = `url(${el.dataset.bg})`; el.classList.add("has-photo"); };
    t.src = el.dataset.bg;
  });
}

// Opening + envelope
function openGift() {
  $("#story").hidden = false;
  $("#s2").scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
}
function openEnvelope() {
  const env = $("#envelope");
  env.classList.add("open"); env.setAttribute("aria-expanded", "true");
  setTimeout(() => { env.hidden = true; const l = $("#letter1"); l.hidden = false; l.classList.add("pop"); }, reduce ? 0 : 600);
}

// Letter: lines appear gradually, "show all" reveals instantly
let letterTimer;
function prepLetter() { $$("#letter2 p").forEach(p => p.classList.add("rv")); }
function revealLetter(all) {
  const lines = $$("#letter2 p:not(.in)");
  if (all || reduce) { clearInterval(letterTimer); lines.forEach(p => p.classList.add("in")); return; }
  clearInterval(letterTimer);
  letterTimer = setInterval(() => { const p = lines.shift(); p ? p.classList.add("in") : clearInterval(letterTimer); }, CONFIG.lineDelayMs);
}

// Cards, report bars, scroll progress
function initCards() { $$(".flip").forEach(b => b.addEventListener("click", () => b.classList.toggle("on"))); }
function initObservers() {
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    if (e.target.id === "s4") $$(".bar i").forEach(i => i.style.width = i.dataset.w + "%");
    if (e.target.id === "s5") revealLetter(false);
    io.unobserve(e.target);
  }), { threshold: .35 });
  ["s4", "s5"].forEach(id => io.observe($("#" + id)));
}
function updateProgress() {
  const h = document.documentElement;
  $("#progress").style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight || 1) * 100) + "%";
}

// Dialogs
function initDialogs() {
  const tiny = $("#tiny");
  $("#one-more").onclick = () => tiny.showModal();
  $("#tiny-close").onclick = () => { tiny.close(); $("#s8").scrollIntoView({ behavior: reduce ? "auto" : "smooth" }); };
  const lb = $("#lightbox");
  $$("#s8 .polaroid").forEach(f => f.addEventListener("click", () => {
    if (f.dataset.missing) return;
    $("#lb-img").src = $("img", f).src; $("#lb-img").alt = f.dataset.alt || "";
    $("#lb-cap").textContent = $("figcaption", f).textContent; lb.showModal();
  }));
  $("#lb-close").onclick = () => lb.close();
  lb.addEventListener("click", e => { if (e.target === lb) lb.close(); }); // Esc closes natively
}

// Optional music: button appears only if the file exists; never autoplays
function initMusic() {
  const a = new Audio(); a.loop = true; a.preload = "none";
  const btn = $("#music");
  fetch(CONFIG.music, { method: "HEAD" }).then(r => { if (r.ok) btn.hidden = false; }).catch(() => {});
  btn.onclick = () => {
    const on = btn.getAttribute("aria-pressed") === "true";
    if (!a.src) a.src = CONFIG.music;
    if (on) a.pause(); else a.play().catch(() => { btn.hidden = true; });
    btn.setAttribute("aria-pressed", String(!on));
  };
}

// Replay
function restart() {
  $("#story").hidden = true;
  $$(".flip").forEach(b => b.classList.remove("on"));
  $$(".bar i").forEach(i => i.style.width = 0);
  $$("#letter2 p").forEach(p => p.classList.remove("in"));
  const env = $("#envelope"); env.hidden = false; env.classList.remove("open"); env.setAttribute("aria-expanded", "false");
  $("#letter1").hidden = true;
  window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  initObservers();
}

document.addEventListener("DOMContentLoaded", () => {
  loadPhotos(); loadBackgrounds(); prepLetter(); initCards(); initObservers(); initDialogs(); initMusic();
  $("#open-gift").onclick = openGift;
  $("#envelope").onclick = openEnvelope;
  $("#show-all").onclick = () => revealLetter(true);
  $("#restart").onclick = restart;
  addEventListener("scroll", updateProgress, { passive: true });
});
