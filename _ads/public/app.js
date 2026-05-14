const grid = document.getElementById("grid");
const empty = document.getElementById("empty");
const form = document.getElementById("add-form");
const formStatus = document.getElementById("form-status");
const filterPicked = document.getElementById("filter-picked");

function fileUrl(rel) {
  const clean = rel.replace(/^\/+/, "");
  return `/files/${encodeURI(clean)}`;
}

async function fetchAds() {
  const r = await fetch("/api/ads");
  if (!r.ok) throw new Error("load_failed");
  return r.json();
}

function renderThumbStrip(cardEl, ad, setMainSrc) {
  const strip = cardEl.querySelector(".thumbs");
  strip.innerHTML = "";
  if (!ad.images?.length) return;
  ad.images.forEach((rel, i) => {
    const img = document.createElement("img");
    img.src = fileUrl(rel);
    img.alt = "";
    img.loading = "lazy";
    img.classList.toggle("active", i === 0);
    img.addEventListener("click", () => {
      strip.querySelectorAll("img").forEach((x) => x.classList.remove("active"));
      img.classList.add("active");
      setMainSrc(fileUrl(rel));
    });
    strip.append(img);
  });
}

function renderCard(ad) {
  const el = document.createElement("article");
  el.className = "card" + (ad.picked ? " picked" : "");
  el.dataset.id = ad.id;

  const main = document.createElement("div");
  main.className = "card-media";
  const mainImg = document.createElement("img");
  mainImg.alt = "Превʼю";

  if (ad.images?.length) {
    mainImg.src = fileUrl(ad.images[0]);
    main.append(mainImg);
  } else {
    const ph = document.createElement("div");
    ph.className = "no-img";
    ph.textContent = "Без зображення";
    main.append(ph);
  }

  const thumbs = document.createElement("div");
  thumbs.className = "thumbs";

  const body = document.createElement("div");
  body.className = "card-body";

  const text = document.createElement("p");
  text.className = "card-text";
  text.textContent = ad.text?.trim() || "—";

  const meta = document.createElement("p");
  meta.className = "card-meta";
  try {
    const d = new Date(ad.createdAt);
    meta.textContent = d.toLocaleString();
  } catch {
    meta.textContent = ad.createdAt ?? "";
  }

  const actions = document.createElement("div");
  actions.className = "card-actions";

  const pickLabel = document.createElement("label");
  pickLabel.className = "inline";
  const pick = document.createElement("input");
  pick.type = "checkbox";
  pick.checked = !!ad.picked;
  pick.addEventListener("change", async () => {
    const r = await fetch(`/api/ads/${encodeURIComponent(ad.id)}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ picked: pick.checked }),
    });
    if (!r.ok) {
      pick.checked = !pick.checked;
      return;
    }
    el.classList.toggle("picked", pick.checked);
    const a = allAds.find((x) => x.id === ad.id);
    if (a) a.picked = pick.checked;
    if (filterPicked.checked) applyFilter();
    syncEmpty();
  });
  pickLabel.append(pick, document.createTextNode(" Обране"));

  const del = document.createElement("button");
  del.type = "button";
  del.className = "btn ghost danger";
  del.textContent = "Видалити";
  del.addEventListener("click", async () => {
    if (!confirm("Видалити цю картку й файли зображень?")) return;
    const r = await fetch(`/api/ads/${encodeURIComponent(ad.id)}`, {
      method: "DELETE",
    });
    if (r.ok) {
      allAds = allAds.filter((x) => x.id !== ad.id);
      el.remove();
      syncEmpty();
    }
  });

  actions.append(pickLabel, del);
  body.append(text, meta, actions);

  el.append(main, thumbs, body);

  const setMainSrc = (src) => {
    main.querySelector(".no-img")?.remove();
    if (!main.contains(mainImg)) main.prepend(mainImg);
    mainImg.src = src;
  };

  renderThumbStrip(el, ad, setMainSrc);
  return el;
}

let allAds = [];

function applyFilter() {
  const only = filterPicked.checked;
  grid.querySelectorAll(".card").forEach((node) => {
    const id = node.dataset.id;
    const ad = allAds.find((a) => a.id === id);
    node.style.display = only && ad && !ad.picked ? "none" : "";
  });
}

function syncEmpty() {
  const visible = [...grid.children].filter(
    (c) => c.style.display !== "none",
  ).length;
  if (allAds.length === 0) {
    empty.textContent = "Поки що нічого немає — додай перший запис вище.";
    empty.classList.remove("hidden");
    return;
  }
  if (visible === 0 && filterPicked.checked) {
    empty.textContent =
      "Немає обраних карток — зніми фільтр або познач «Обране».";
    empty.classList.remove("hidden");
    return;
  }
  empty.classList.toggle("hidden", visible > 0);
}

async function refresh() {
  grid.innerHTML = "";
  formStatus.textContent = "";
  formStatus.classList.remove("error");
  try {
    allAds = await fetchAds();
    for (const ad of allAds) {
      grid.append(renderCard(ad));
    }
    applyFilter();
    syncEmpty();
  } catch {
    formStatus.textContent = "Не вдалося завантажити список.";
    formStatus.classList.add("error");
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  formStatus.textContent = "";
  formStatus.classList.remove("error");
  const fd = new FormData(form);
  const text = fd.get("text") ?? "";
  const files = fd.getAll("images").filter((f) => f instanceof File && f.size > 0);
  fd.delete("text");
  fd.delete("images");
  fd.set("text", String(text));
  for (const f of files) fd.append("images", f);

  try {
    const r = await fetch("/api/ads", { method: "POST", body: fd });
    if (!r.ok) throw new Error();
    const entry = await r.json();
    form.reset();
    formStatus.textContent = "Збережено.";
    allAds.unshift(entry);
    grid.prepend(renderCard(entry));
    applyFilter();
    syncEmpty();
  } catch {
    formStatus.textContent = "Помилка збереження.";
    formStatus.classList.add("error");
  }
});

filterPicked.addEventListener("change", () => {
  applyFilter();
  syncEmpty();
});

refresh();
