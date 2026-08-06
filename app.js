/* Sky Facility — B2B renhold site logic */

const SERVICES = [
  {
    id: "kontorvask",
    kicker: "Kontor",
    title: "Kontorvask",
    short: "Daglig eller ukentlig renhold av arbeidsplasser, møterom og fellesflater — uten å forstyrre driften.",
    desc: "Strukturert renhold av kontorlandskap, celler, møterom, pantry og sanitærområder. Vi tilpasser frekvens, tidspunkt og sjekkliste til deres husregler, adgang og sikkerhetsnivå. Rapportering og fast kontaktperson inngår i avtalen.",
    tags: ["Avtale", "Natt/tidlig", "SLA"],
    image: "assets/kontorvask.jpg",
    alt: "Kontorlandskap etter profesjonell næringsrenhold"
  },
  {
    id: "trappevask",
    kicker: "Eiendom",
    title: "Trappevask",
    short: "Regelmessig renhold av trappeoppganger, heis og fellesareal for sameier og næringsbygg under forvaltning.",
    desc: "Trappevask og fellesareal med fast rytme: trapp, rekkverk, glass, dørpartier, heis og inngangsparti. Egnet for borettslag, sameier og blandet næring der forvalter trenger forutsigbar kvalitet og dokumentasjon.",
    tags: ["Sameie", "Forvaltning", "Ukentlig"],
    image: "assets/trappevask.jpg",
    alt: "Ren trappeoppgang i moderne bygg"
  },
  {
    id: "garasjevask",
    kicker: "Anlegg",
    title: "Garasjevask",
    short: "Feiing, spyling og periodisk renhold av parkeringskjeller og garasjeanlegg — støv, sand og oljesøl under kontroll.",
    desc: "Garasjer samler sand, salt, dekkstøv og olje. Vi leverer planlagt garasjevask med feiing, maskinell rens der det er mulig, og oppfølging av sølsoner. Passer både frittstående anlegg og kjeller under bolig/næring.",
    tags: ["Periodisk", "Maskin", "HMS"],
    image: "assets/garasjevask.jpg",
    alt: "Parkeringshus etter profesjonell garasjevask"
  },
  {
    id: "byggevask",
    kicker: "Prosjekt",
    title: "Byggevask",
    short: "Grov- og finvask i bygge- og rehabiliteringsprosjekter frem til overlevering.",
    desc: "Byggevask i faser: grovvask under arbeid, finvask før teknisk overtakelse og sluttrengjøring til overlevering. Vi jobber etter prosjektets fremdrift, med respekt for andre fag og strenge krav til støvfrie flater.",
    tags: ["Entreprise", "Overlevering", "Faser"],
    image: "assets/byggevask.jpg",
    alt: "Byggevask i nybygg før overlevering"
  },
  {
    id: "etterrehab",
    kicker: "Prosjekt",
    title: "Etterrehabilitering",
    short: "Grundig renhold etter rehab og ombygging — støv, lim, sparkel og byggestøv fjernes systematisk.",
    desc: "Når rehab er ferdig, gjenstår ofte usynlig støv i ventilasjonssoner, lister og tekniske rom. Vi tar etterrehabilitering med sjekkliste tilpasset prosjektet, slik at leietaker eller eier kan ta i bruk arealene trygt.",
    tags: ["Rehab", "Sjekkliste", "Detalj"],
    image: "assets/etterrehab.jpg",
    alt: "Inngangsparti i næringsbygg etter renhold"
  },
  {
    id: "vinduspuss",
    kicker: "Fasade",
    title: "Vinduspuss næring",
    short: "Planlagt vinduspuss for kontor, butikk og fasade — innvendig, utvendig og etter avtale med stillas/lift.",
    desc: "Strekkfri vinduspuss for næringsbygg. Vi planlegger frekvens (kvartal/halvår), adkomst og sesong. Passer kjede, kontorpark og enkeltstående fasader der synlighet og førsteintrykk er del av merkevaren.",
    tags: ["Fasade", "Plan", "Sesong"],
    image: "assets/vinduspuss.jpg",
    alt: "Vinduspuss på glassfasade næringsbygg"
  },
  {
    id: "industrivask",
    kicker: "Industri",
    title: "Industri- & lager",
    short: "Renhold av lager, logistikk og industrilokaler med maskinelt gulvrenhold og sonedeling.",
    desc: "Store flater krever maskin og metode. Vi leverer renhold for lager og lett industri med fokus på gangsoner, lasteområder og hygiene der mat/emballasje eller HMS krever det — uten å blande inn matservering eller catering.",
    tags: ["Lager", "Maskin", "Sone"],
    image: "assets/industrivask.jpg",
    alt: "Industrielt gulvrenhold i lagerhall"
  },
  {
    id: "periodisk",
    kicker: "Dyp",
    title: "Periodisk storvask",
    short: "Planlagt dypere renhold av møterom, fellesareal og vanskelige flater utover daglig drift.",
    desc: "Periodisk storvask fanger det daglig renhold ikke dekker: lister, glassfelt, armaturer, møbler og gulv som trenger maskin. Typisk kvartals- eller halvårsplan for kontor og forvaltningseiendom.",
    tags: ["Kvartal", "Dyp", "Plan"],
    image: "assets/periodisk.jpg",
    alt: "Møterom etter periodisk storvask"
  },
  {
    id: "fellesareal",
    kicker: "Eiendom",
    title: "Fellesareal & lobby",
    short: "Inngang, resepsjon, toaletter og fellesrom — det første inntrykket leietakere og gjester møter.",
    desc: "Fellesareal bærer merkevaren til bygget. Vi holder lobby, resepsjon, toaletter og fellesmøterom på avtalt nivå, med frekvens som speiler trafikk og leietakermiks.",
    tags: ["Lobby", "Resepsjon", "Synlig"],
    image: "assets/fellesareal.jpg",
    alt: "Lobby i næringsbygg etter renhold"
  },
  {
    id: "hygiene",
    kicker: "Sanitær",
    title: "Sanitær & hygiene",
    short: "Forsterket renhold av toaletter og hygienepunkter i næringsbygg — frekvens etter belastning.",
    desc: "Sanitærsoner er kritisk for omdømme og arbeidsmiljø. Vi setter frekvens, forbruksmateriell-rutiner (etter avtale) og kontrollpunkter for toaletter og garderober i kontor og publikumsrettede bygg. Ikke mat, ikke catering — ren renholdskompetanse.",
    tags: ["Sanitær", "Frekvens", "Kontroll"],
    image: "assets/hygiene.jpg",
    alt: "Sanitærområde etter profesjonell rengjøring"
  }
];

const STORAGE = {
  keep: "sky_facility_b2b_keep",
  skip: "sky_facility_b2b_skip",
  tutorial: "sky_facility_b2b_tutorial"
};

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

function byId(id) {
  return SERVICES.find((s) => s.id === id);
}
function remaining() {
  return SERVICES.filter((s) => !state.keep.includes(s.id) && !state.skip.includes(s.id));
}

/* ---------- Service grid ---------- */
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

/* ---------- Counts & panels ---------- */
function updateCounts() {
  $("#skip-count").textContent = state.skip.length;
  $("#keep-count").textContent = state.keep.length;
  const rem = remaining().length;
  const done = SERVICES.length - rem;
  $("#progress-current").textContent = Math.min(done + (rem ? 1 : 0), SERVICES.length) || (done ? SERVICES.length : 1);
  $("#progress-total").textContent = SERVICES.length;
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

/* ---------- Stack ---------- */
function renderStack() {
  const stack = $("#stack");
  const rem = remaining();
  stack.innerHTML = "";
  updateCounts();

  if (rem.length === 0) {
    showPlan();
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

    const scale = 1 - depth * 0.04;
    const y = depth * 10;
    card.style.transform = `translateY(${y}px) scale(${scale})`;
    card.style.opacity = String(1 - depth * 0.07);

    card.innerHTML = `
      <div class="card-media">
        <img src="${svc.image}" alt="${svc.alt}" draggable="false" />
        <div class="card-stamp card-stamp--keep">Behold</div>
        <div class="card-stamp card-stamp--skip">Hopp over</div>
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
    const rot = state.dx * 0.055;
    card.style.transform = `translate(${state.dx}px, ${state.dy * 0.3}px) rotate(${rot}deg)`;
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
    const t = 105;
    if (state.dx > t) decide("keep");
    else if (state.dx < -t) decide("skip");
    else {
      card.style.transition = "transform 0.35s var(--ease-soft)";
      card.style.transform = "";
      card.classList.remove("show-keep", "show-skip");
      $$(".card.is-next, .card.is-third").forEach((c, i) => {
        const depth = i + 1;
        c.style.transition = "transform 0.35s var(--ease-soft)";
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

  if (dir === "keep") {
    if (!state.keep.includes(id)) state.keep.push(id);
    state.skip = state.skip.filter((x) => x !== id);
  } else {
    if (!state.skip.includes(id)) state.skip.push(id);
    state.keep = state.keep.filter((x) => x !== id);
  }
  save();

  const fly = dir === "keep" ? window.innerWidth * 1.15 : -window.innerWidth * 1.15;
  const rot = dir === "keep" ? 26 : -26;
  card.classList.add("is-gone", dir === "keep" ? "show-keep" : "show-skip");
  card.style.transform = `translate(${fly}px, ${state.dy || 30}px) rotate(${rot}deg)`;
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
    $("#plan-lead").textContent = "Du hoppet over alle. Velg på nytt for å bygge en bedriftspakke.";
  } else {
    $("#plan-title").textContent = "Din bedriftspakke";
    $("#plan-lead").textContent = "Disse tjenestene er valgt. Gå til forespørsel — teksten fylles inn automatisk.";
    kept.forEach((s) => {
      const li = document.createElement("li");
      li.innerHTML = `<img src="${s.image}" alt="" /><div><strong>${s.title}</strong><span>${s.kicker} · ${s.tags.join(" · ")}</span></div><span>✓</span>`;
      list.appendChild(li);
    });
  }
  syncContactFromSelection();
  updateCounts();
  box.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function syncContactFromSelection() {
  const kept = state.keep.map(byId).filter(Boolean);
  const note = $("#form-selected-note");
  const ta = $("#contact-message");
  if (!kept.length) {
    note.hidden = true;
    return;
  }
  note.hidden = false;
  note.textContent = `Valgt i sveip: ${kept.map((s) => s.title).join(", ")}.`;
  const block = [
    "Hei Sky Facility,",
    "",
    "Vi ønsker tilbud på følgende B2B-tjenester:",
    ...kept.map((s) => `- ${s.title}`),
    "",
    "Areal / adresse:",
    "Ønsket oppstart:",
    "",
    "Mvh"
  ].join("\n");
  if (!ta.value.trim() || ta.dataset.fromSwipe === "1") {
    ta.value = block;
    ta.dataset.fromSwipe = "1";
  }
}

function resetDeck() {
  state.keep = [];
  state.skip = [];
  save();
  $("#plan-summary").hidden = true;
  renderStack();
  maybeTutorial();
}

function maybeTutorial() {
  if (localStorage.getItem(STORAGE.tutorial)) return;
  const t = $("#tutorial");
  t.hidden = false;
}

/* ---------- Nav / init ---------- */
function initNav() {
  const toggle = $("#nav-toggle");
  const nav = $(".nav");
  toggle?.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
  $$(".nav a").forEach((a) =>
    a.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle?.setAttribute("aria-expanded", "false");
    })
  );
}

function initForm() {
  const form = $("#contact-form");
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const company = fd.get("company") || "";
    const name = fd.get("name") || "";
    const email = fd.get("email") || "";
    const phone = fd.get("phone") || "";
    const message = fd.get("message") || "";
    const subject = encodeURIComponent(`Forespørsel renhold — ${company}`);
    const body = encodeURIComponent(
      `Bedrift: ${company}\nKontakt: ${name}\nE-post: ${email}\nTelefon: ${phone}\n\n${message}`
    );
    window.location.href = `mailto:hei@skyfacility.no?subject=${subject}&body=${body}`;
  });
}

function init() {
  $("#year").textContent = new Date().getFullYear();
  renderServiceGrid();
  renderStack();
  maybeTutorial();
  initNav();
  initForm();

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
  $("#btn-mailto")?.addEventListener("click", () => {
    syncContactFromSelection();
  });

  window.addEventListener("keydown", (e) => {
    if ($("#tutorial") && !$("#tutorial").hidden) return;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      decide("skip");
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      decide("keep");
    }
  });

  // Show plan if already finished in storage
  if (remaining().length === 0 && (state.keep.length || state.skip.length)) {
    showPlan();
  }
}

document.addEventListener("DOMContentLoaded", init);
