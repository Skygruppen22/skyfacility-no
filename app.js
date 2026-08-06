/* Sky Facility Drift AS — site logic */

const SERVICES = [
  {
    id: "kontorvask",
    kicker: "Kontor",
    title: "Kontorvask",
    short: "Rent kontor, roligere hverdag. Vi holder arbeidsplassen pen — uten at det forstyrrer de som jobber.",
    desc: "Daglig eller ukentlig vask av kontorlandskap, møterom, kjøkkenkrok og toaletter. Faste tider, faste folk, og et resultat du merker når du kommer på jobb.",
    tags: ["Fast avtale", "Fleksible tider", "Kontor"],
    image: "assets/kontorvask.jpg",
    alt: "Kontor klart for arbeidsdagen"
  },
  {
    id: "trappevask",
    kicker: "Trapp & felles",
    title: "Trappevask",
    short: "Trappa er det første folk ser. Vi holder den ren, uke etter uke.",
    desc: "Vask av trappeoppgang, rekkverk, dørpartier, heis og inngang. Passer sameier, borettslag under forvaltning og næringsbygg der fellesarealet skal holde standard.",
    tags: ["Ukentlig", "Sameie", "Næringsbygg"],
    image: "assets/trappevask.jpg",
    alt: "Lys og ren trappeoppgang"
  },
  {
    id: "garasjevask",
    kicker: "Garasje",
    title: "Garasjevask",
    short: "Mindre støv, mindre grus, penere anlegg — også under bakken.",
    desc: "Feiing og vask av parkeringskjeller og garasjeanlegg. Vi tar unna sand, salt og søl slik at anlegget ser vedlikeholdt ut og er tryggere å ferdes i.",
    tags: ["Periodisk", "Kjeller", "Anlegg"],
    image: "assets/garasjevask.jpg",
    alt: "Ren parkeringskjeller"
  },
  {
    id: "byggevask",
    kicker: "Bygg",
    title: "Byggevask",
    short: "Når prosjektet nærmer seg slutt, rydder vi vei for overlevering.",
    desc: "Grovvask underveis og finvask før overtakelse. Vi jobber etter fremdriften på bygget og leverer flater som er klare for inspeksjon og innflytting.",
    tags: ["Prosjekt", "Overlevering", "Entreprise"],
    image: "assets/byggevask.jpg",
    alt: "Bygg klart etter sluttrengjøring"
  },
  {
    id: "etterrehab",
    kicker: "Rehab",
    title: "Etter rehab",
    short: "Støvet etter oppussing skal ikke bli leietakers problem.",
    desc: "Grundig renhold etter rehabilitering og ombygging — støv, sparkel og byggestøv tas skikkelig, slik at lokalet kan tas i bruk med en gang.",
    tags: ["Rehab", "Engangs", "Detaljer"],
    image: "assets/etterrehab.jpg",
    alt: "Inngangsparti klart etter rehab"
  },
  {
    id: "vinduspuss",
    kicker: "Vinduer",
    title: "Vinduspuss",
    short: "Blanke vinduer gir bedre dagslys og et mer profesjonelt uttrykk.",
    desc: "Planlagt vinduspuss for kontor og næringsfasade. Inn- og utvendig etter avtale — tilpasset sesong og adkomst.",
    tags: ["Fasade", "Planlagt", "Kontor"],
    image: "assets/vinduspuss.jpg",
    alt: "Blanke vinduer på næringsbygg"
  },
  {
    id: "industrivask",
    kicker: "Lager",
    title: "Lager og industri",
    short: "Store gulv, tydelige soner, maskiner som tar unna.",
    desc: "Renhold av lager og enklere industrilokaler med maskinelt gulvrenhold der det trengs. Vi holder gangareal og arbeidsflater i orden.",
    tags: ["Lager", "Maskin", "Gulv"],
    image: "assets/industrivask.jpg",
    alt: "Lagerhall med rent gulv"
  },
  {
    id: "periodisk",
    kicker: "Storvask",
    title: "Periodisk storvask",
    short: "Det lille ekstra — lister, glass og flater som daglig vask ikke rekker.",
    desc: "Planlagt dypere renhold av møterom, fellesareal og detaljer. Typisk noen ganger i året, i tillegg til den faste avtalen.",
    tags: ["Kvartal", "Dypere", "Plan"],
    image: "assets/periodisk.jpg",
    alt: "Møterom etter storvask"
  },
  {
    id: "fellesareal",
    kicker: "Lobby",
    title: "Lobby og fellesareal",
    short: "Førsteinntrykket i resepsjon og fellesrom — hver dag.",
    desc: "Renhold av lobby, resepsjon, toaletter og fellesmøterom. Der leietakere, kunder og gjester møter bygget først.",
    tags: ["Resepsjon", "Synlig", "Daglig"],
    image: "assets/fellesareal.jpg",
    alt: "Velkommen i ren lobby"
  },
  {
    id: "hygiene",
    kicker: "Toaletter",
    title: "Toaletter og hygiene",
    short: "Toaletter som alltid føles i orden — uansett hvor travelt det er.",
    desc: "Ekstra oppfølging av toaletter og hygienepunkter i næringsbygg. Frekvens tilpasses hvor mange som bruker dem.",
    tags: ["Toaletter", "Frekvens", "Hygiene"],
    image: "assets/hygiene.jpg",
    alt: "Rent toalett i næringsbygg"
  }
];

const STORAGE = {
  keep: "sky_facility_keep",
  skip: "sky_facility_skip",
  tutorial: "sky_facility_tutorial"
};

const FORM_ENDPOINT = "https://formsubmit.co/ajax/hei@skyfacility.no";

const state = {
  keep: load(STORAGE.keep),
  skip: load(STORAGE.skip),
  dragging: false,
  startX: 0,
  startY: 0,
  dx: 0,
  dy: 0,
  activeId: null
};

function load(key) {
  try { return JSON.parse(localStorage.getItem(key) || "[]"); }
  catch { return []; }
}
function save() {
  localStorage.setItem(STORAGE.keep, JSON.stringify(state.keep));
  localStorage.setItem(STORAGE.skip, JSON.stringify(state.skip));
}

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const byId = (id) => SERVICES.find((s) => s.id === id);
const remaining = () => SERVICES.filter((s) => !state.keep.includes(s.id) && !state.skip.includes(s.id));

function renderServiceGrid() {
  const grid = $("#service-grid");
  if (!grid) return;
  grid.innerHTML = SERVICES.map(
    (s) => `
    <article class="service-card">
      <img src="${s.image}" alt="${s.alt}" width="800" height="600" loading="lazy" />
      <div class="body">
        <div class="kicker">${s.kicker}</div>
        <h3>${s.title}</h3>
        <p>${s.short}</p>
        <div class="meta">${s.tags.map((t) => `<span>${t}</span>`).join("")}</div>
      </div>
    </article>`
  ).join("");
}

function updateCounts() {
  $("#skip-count").textContent = state.skip.length;
  $("#keep-count").textContent = state.keep.length;
  const rem = remaining().length;
  const done = SERVICES.length - rem;
  $("#progress-current").textContent = Math.min(done + (rem ? 1 : 0), SERVICES.length) || (done ? SERVICES.length : 1);
  $("#progress-total").textContent = SERVICES.length;
  syncHiddenFields();
}

function syncHiddenFields() {
  const kept = state.keep.map(byId).filter(Boolean);
  const skipped = state.skip.map(byId).filter(Boolean);
  const keptStr = kept.map((s) => s.title).join(", ") || "Ingen valgt";
  const skipStr = skipped.map((s) => s.title).join(", ") || "Ingen";
  const fKeep = $("#field-services");
  const fSkip = $("#field-skipped");
  if (fKeep) fKeep.value = keptStr;
  if (fSkip) fSkip.value = skipStr;

  const note = $("#form-selected-note");
  if (!note) return;
  if (!kept.length) {
    note.hidden = true;
    note.textContent = "";
    return;
  }
  note.hidden = false;
  note.textContent = "Du har valgt: " + kept.map((s) => s.title).join(" · ");
}

function renderPanel(type) {
  const ids = type === "keep" ? state.keep : state.skip;
  const list = type === "keep" ? $("#panel-keep-list") : $("#panel-skip-list");
  const empty = type === "keep" ? $("#panel-keep-empty") : $("#panel-skip-empty");
  list.innerHTML = "";
  if (!ids.length) {
    empty.hidden = false;
    return;
  }
  empty.hidden = true;
  ids.forEach((id) => {
    const s = byId(id);
    if (!s) return;
    const li = document.createElement("li");
    li.innerHTML = `<img src="${s.image}" alt="" /><div><strong>${s.title}</strong><span>${s.short}</span></div>`;
    list.appendChild(li);
  });
}

function openPanel(type) {
  $("#panel-backdrop").classList.add("is-open");
  if (type === "keep") {
    $("#panel-keep").classList.add("is-open");
    renderPanel("keep");
  } else {
    $("#panel-skip").classList.add("is-open");
    renderPanel("skip");
  }
}
function closePanels() {
  $("#panel-backdrop").classList.remove("is-open");
  $("#panel-keep").classList.remove("is-open");
  $("#panel-skip").classList.remove("is-open");
}

function setStatus(msg) {
  const el = $("#stack-status");
  if (el && msg) el.textContent = msg;
}

function renderStack() {
  const stack = $("#stack");
  const rem = remaining();
  stack.innerHTML = "";
  updateCounts();

  if (rem.length === 0) {
    showPlan();
    setStatus("Ferdig — se valgene dine under.");
    return;
  }
  $("#plan-summary").hidden = true;

  rem.slice(0, 4).reverse().forEach((svc, i, arr) => {
    const depth = arr.length - 1 - i;
    const card = document.createElement("article");
    card.className = "card";
    card.dataset.id = svc.id;
    if (depth === 0) card.classList.add("is-top");
    else if (depth === 1) card.classList.add("is-next");
    else card.classList.add("is-third");

    card.style.transform = `translateY(${depth * 10}px) scale(${1 - depth * 0.04})`;
    card.style.opacity = String(1 - depth * 0.07);

    card.innerHTML = `
      <div class="card-media">
        <img src="${svc.image}" alt="${svc.alt}" draggable="false" width="800" height="480" />
        <div class="card-stamp card-stamp--keep">Ja takk</div>
        <div class="card-stamp card-stamp--skip">Nei takk</div>
      </div>
      <div class="card-body">
        <div class="card-kicker">${svc.kicker}</div>
        <h3 class="card-title">${svc.title}</h3>
        <p class="card-desc">${svc.desc}</p>
        <div class="card-tags">${svc.tags.map((t) => `<span>${t}</span>`).join("")}</div>
      </div>`;
    stack.appendChild(card);
  });

  bindTopCard();
}

function topCard() {
  return $("#stack .card.is-top");
}

function bindTopCard() {
  const card = topCard();
  if (!card) return;

  const onDown = (e) => {
    if (e.button != null && e.button !== 0) return;
    state.dragging = true;
    state.activeId = card.dataset.id;
    state.startX = e.clientX;
    state.startY = e.clientY;
    state.dx = 0;
    state.dy = 0;
    try { card.setPointerCapture(e.pointerId); } catch (_) {}
  };
  const onMove = (e) => {
    if (!state.dragging || state.activeId !== card.dataset.id) return;
    state.dx = e.clientX - state.startX;
    state.dy = e.clientY - state.startY;
    card.style.transform = `translate(${state.dx}px, ${state.dy * 0.3}px) rotate(${state.dx * 0.055}deg)`;
    card.classList.toggle("show-keep", state.dx > 55);
    card.classList.toggle("show-skip", state.dx < -55);
    $$(".card.is-next, .card.is-third").forEach((c, i) => {
      const depth = i + 1;
      const pull = Math.min(Math.abs(state.dx) / 280, 1);
      c.style.transform = `translateY(${depth * 10 - pull * 6}px) scale(${1 - depth * 0.04 + pull * 0.03})`;
    });
  };
  const onUp = () => {
    if (!state.dragging) return;
    state.dragging = false;
    if (state.dx > 105) decide("keep");
    else if (state.dx < -105) decide("skip");
    else {
      card.style.transition = "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)";
      card.style.transform = "";
      card.classList.remove("show-keep", "show-skip");
      $$(".card.is-next, .card.is-third").forEach((c, i) => {
        const depth = i + 1;
        c.style.transition = "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)";
        c.style.transform = `translateY(${depth * 10}px) scale(${1 - depth * 0.04})`;
      });
      setTimeout(() => {
        card.style.transition = "";
        $$(".card").forEach((c) => { c.style.transition = ""; });
      }, 360);
    }
  };

  card.addEventListener("pointerdown", onDown);
  window.addEventListener("pointermove", onMove);
  window.addEventListener("pointerup", onUp);
  card._cleanup = () => {
    card.removeEventListener("pointerdown", onDown);
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("pointerup", onUp);
  };
}

function decide(dir) {
  const card = topCard();
  if (!card) return;
  card._cleanup?.();
  const id = card.dataset.id;
  const s = byId(id);

  if (dir === "keep") {
    if (!state.keep.includes(id)) state.keep.push(id);
    state.skip = state.skip.filter((x) => x !== id);
    setStatus(s ? `Tatt med: ${s.title}` : "Tatt med");
  } else {
    if (!state.skip.includes(id)) state.skip.push(id);
    state.keep = state.keep.filter((x) => x !== id);
    setStatus(s ? `Hoppet over: ${s.title}` : "Hoppet over");
  }
  save();

  const fly = dir === "keep" ? window.innerWidth * 1.15 : -window.innerWidth * 1.15;
  card.classList.add("is-gone", dir === "keep" ? "show-keep" : "show-skip");
  card.style.transform = `translate(${fly}px, ${state.dy || 30}px) rotate(${dir === "keep" ? 26 : -26}deg)`;
  card.style.opacity = "0";
  setTimeout(renderStack, 400);
}

function showPlan() {
  const box = $("#plan-summary");
  box.hidden = false;
  const kept = state.keep.map(byId).filter(Boolean);
  const list = $("#plan-list");
  list.innerHTML = "";
  if (!kept.length) {
    $("#plan-title").textContent = "Ingen tjenester valgt";
    $("#plan-lead").textContent = "Du hoppet over alle. Prøv igjen, eller skriv fritt i skjemaet under.";
  } else {
    $("#plan-title").textContent = "Dette vil du ha med";
    $("#plan-lead").textContent = "Fyll ut skjemaet under — valgene dine følger med på e-post til oss.";
    kept.forEach((s) => {
      const li = document.createElement("li");
      li.innerHTML = `<img src="${s.image}" alt="" width="64" height="48" /><div><strong>${s.title}</strong><span>${s.short}</span></div><span>✓</span>`;
      list.appendChild(li);
    });
  }
  syncContactMessage(true);
  updateCounts();
}

function syncContactMessage(force) {
  const kept = state.keep.map(byId).filter(Boolean);
  const ta = $("#contact-message");
  if (!ta) return;
  if (!kept.length) return;
  if (force || !ta.value.trim() || ta.dataset.fromSwipe === "1") {
    ta.value =
      "Hei,\n\n" +
      "Vi ønsker tilbud på:\n" +
      kept.map((s) => "• " + s.title).join("\n") +
      "\n\nAreal / adresse:\nØnsket oppstart:\n\nMvh";
    ta.dataset.fromSwipe = "1";
  }
}

function resetDeck() {
  state.keep = [];
  state.skip = [];
  save();
  $("#plan-summary").hidden = true;
  const ta = $("#contact-message");
  if (ta && ta.dataset.fromSwipe === "1") {
    ta.value = "";
    delete ta.dataset.fromSwipe;
  }
  setStatus("Dra kortet, eller bruk knappene. Tastatur: ← →");
  renderStack();
  maybeTutorial();
}

function maybeTutorial() {
  if (localStorage.getItem(STORAGE.tutorial)) return;
  $("#tutorial").hidden = false;
}

async function submitForm(e) {
  e.preventDefault();
  const form = $("#contact-form");
  const status = $("#form-status");
  const btn = $("#form-submit");
  const data = new FormData(form);

  // honeypot
  if (data.get("_honey")) return;

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  syncHiddenFields();
  data.set("valgte_tjenester", $("#field-services").value);
  data.set("hoppet_over", $("#field-skipped").value);
  data.set("_subject", `Ny henvendelse: ${data.get("bedrift") || "skyfacility.no"}`);

  btn.disabled = true;
  btn.textContent = "Sender…";
  status.hidden = false;
  status.className = "form-status";
  status.textContent = "Sender meldingen til oss…";

  try {
    const res = await fetch(FORM_ENDPOINT, {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" }
    });
    const json = await res.json().catch(() => ({}));

    if (res.ok) {
      status.className = "form-status ok";
      status.textContent = "Takk! Vi har mottatt henvendelsen og tar kontakt snart.";
      form.reset();
      // restore hidden after reset
      syncHiddenFields();
      btn.textContent = "Sendt";
      setTimeout(() => { btn.disabled = false; btn.textContent = "Send til oss"; }, 2500);
      return;
    }

    // FormSubmit first-time activation or error → fallback mailto
    throw new Error(json.message || "Kunne ikke sende via skjema");
  } catch (err) {
    // Fallback: open mail client with full body so workflow still works
    const bedrift = data.get("bedrift") || "";
    const navn = data.get("navn") || "";
    const email = data.get("email") || "";
    const telefon = data.get("telefon") || "";
    const melding = data.get("melding") || "";
    const valgte = data.get("valgte_tjenester") || "";
    const subject = encodeURIComponent(`Henvendelse fra ${bedrift || navn || "nettside"}`);
    const body = encodeURIComponent(
      `Bedrift: ${bedrift}\nNavn: ${navn}\nE-post: ${email}\nTelefon: ${telefon}\n\nValgte tjenester:\n${valgte}\n\nMelding:\n${melding}`
    );
    status.className = "form-status warn";
    status.innerHTML =
      "Skjemaet trenger en engangsbekreftelse på e-post første gang. " +
      "Vi åpner e-postklienten din som reserve — trykk send der. " +
      `<a href="mailto:hei@skyfacility.no?subject=${subject}&body=${body}">Åpne e-post</a>`;
    window.location.href = `mailto:hei@skyfacility.no?subject=${subject}&body=${body}`;
    btn.disabled = false;
    btn.textContent = "Send til oss";
  }
}

function initNav() {
  const toggle = $("#nav-toggle");
  const nav = $("#main-nav");
  toggle?.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Lukk meny" : "Åpne meny");
  });
  $$("#main-nav a").forEach((a) =>
    a.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle?.setAttribute("aria-expanded", "false");
    })
  );
}

function init() {
  $("#year").textContent = new Date().getFullYear();
  renderServiceGrid();
  renderStack();
  maybeTutorial();
  initNav();

  $("#btn-skip")?.addEventListener("click", () => decide("skip"));
  $("#btn-keep")?.addEventListener("click", () => decide("keep"));
  $("#btn-restart")?.addEventListener("click", resetDeck);
  $("#btn-open-keep")?.addEventListener("click", () => openPanel("keep"));
  $("#btn-open-skip")?.addEventListener("click", () => openPanel("skip"));
  $("#panel-keep-close")?.addEventListener("click", closePanels);
  $("#panel-skip-close")?.addEventListener("click", closePanels);
  $("#panel-backdrop")?.addEventListener("click", closePanels);
  $("#btn-tutorial-ok")?.addEventListener("click", () => {
    localStorage.setItem(STORAGE.tutorial, "1");
    $("#tutorial").hidden = true;
  });
  $("#contact-form")?.addEventListener("submit", submitForm);

  window.addEventListener("keydown", (e) => {
    if ($("#tutorial") && !$("#tutorial").hidden) return;
    if (e.key === "ArrowLeft") { e.preventDefault(); decide("skip"); }
    if (e.key === "ArrowRight") { e.preventDefault(); decide("keep"); }
  });

  if (remaining().length === 0 && (state.keep.length || state.skip.length)) {
    showPlan();
  }
}

document.addEventListener("DOMContentLoaded", init);
