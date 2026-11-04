const root = document.documentElement;
const $ = (id) => document.getElementById(id);
const grid = $('grid'), search = $('search'), genreSel = $('genre'), sortSel = $('sort');
let category = 'film', current = [];

/* ---------- Theme ---------- */
const themeToggle = $('themeToggle'), logo = $('logo');
function applyTheme(t) {
  root.setAttribute('theme', t);
  themeToggle.checked = t === 'dark';
  logo.src = t === 'dark' ? 'logo-dark.png' : 'logo-light.png';
}
applyTheme(root.getAttribute('theme'));
themeToggle.addEventListener('change', () => {
  const t = themeToggle.checked ? 'dark' : 'light';
  applyTheme(t);
  try { localStorage.setItem('theme', t); } catch (e) {}
});

/* ---------- Catalog ---------- */
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const allItems = () => ['film', 'serial', 'cartoon', 'anime', 'new', 'announce'].flatMap((k) => CATALOG[k].items);

function card(i) {
  const cover = i.poster
    ? `<img src="${esc(i.poster)}" alt="" width="166" height="250" loading="lazy" decoding="async">`
    : `<span>${esc(i.title)}</span>`;
  const badge = i.date ? `<span class="badge">${esc(i.date)}</span>` : '';
  const box = `<${i.url ? 'a href="' + esc(i.url) + '" target="_blank" rel="noopener" tabindex="-1" aria-hidden="true"' : 'div'} class="cover${i.poster ? '' : ' ph'}">${cover}${badge}</${i.url ? 'a' : 'div'}>`;
  const title = i.url
    ? `<a class="title-link" href="${esc(i.url)}" target="_blank" rel="noopener">${esc(i.title)}</a>`
    : `<span class="title-link">${esc(i.title)}</span>`;
  return `<article class="film-card">${box}${title}<p>${esc([i.year, i.country, i.genre].filter(Boolean).join(', '))}</p></article>`;
}

function render() {
  const q = search.value.trim().toLowerCase();
  let items = current.filter((i) => (!q || i.title.toLowerCase().includes(q)) && (!genreSel.value || i.genre === genreSel.value));
  const s = sortSel.value;
  if (s === 'new') items = [...items].sort((a, b) => parseInt(b.year) - parseInt(a.year));
  if (s === 'old') items = [...items].sort((a, b) => parseInt(a.year) - parseInt(b.year));
  if (s === 'az') items = [...items].sort((a, b) => a.title.localeCompare(b.title, 'en'));
  grid.className = 'wrapper films-container';
  grid.innerHTML = items.map(card).join('');
  $('empty').hidden = items.length > 0;
}

function showCollections() {
  $('toolbar').hidden = true; $('empty').hidden = true;
  grid.className = 'wrapper collections-grid';
  const pool = allItems();
  grid.innerHTML = CATALOG.collections.list.map((c) => {
    const found = c.picks.map((t) => pool.find((i) => i.title === t)).filter(Boolean);
    const imgs = found.filter((i) => i.poster).slice(0, 4).map((i) => `<img src="${esc(i.poster)}" alt="" loading="lazy">`).join('');
    return `<a class="collection" href="#collections/${c.slug}"><div class="stack">${imgs}</div><h2>${esc(c.title)}</h2><p>${esc(c.desc)} · ${found.length} titles</p></a>`;
  }).join('');
}

function route() {
  const [cat, sub] = location.hash.slice(1).split('/');
  category = CATALOG[cat] ? cat : 'film';
  let heading = CATALOG[category].heading;
  $('back').hidden = true; $('toolbar').hidden = false;
  document.querySelectorAll('[data-cat]').forEach((a) => {
    const on = a.dataset.cat === category;
    a.classList.toggle('active', on);
    on ? a.setAttribute('aria-current', 'page') : a.removeAttribute('aria-current');
  });
  if (category === 'collections') {
    const col = CATALOG.collections.list.find((c) => c.slug === sub);
    if (!col) { $('heading').textContent = heading; document.title = heading; return showCollections(); }
    heading = col.title; $('back').hidden = false;
    const pool = allItems();
    current = col.picks.map((t) => pool.find((i) => i.title === t)).filter(Boolean);
  } else {
    current = CATALOG[category].items;
  }
  $('heading').textContent = heading;
  document.title = heading + ' – watch online';
  const genres = [...new Set(current.map((i) => i.genre).filter(Boolean))].sort();
  genreSel.innerHTML = '<option value="">All genres</option>' + genres.map((g) => `<option>${esc(g)}</option>`).join('');
  search.value = ''; sortSel.value = '';
  render();
}
[search, genreSel, sortSel].forEach((el) => el.addEventListener('input', render));
window.addEventListener('hashchange', route);
route();

/* ---------- Sign in / register ---------- */
document.querySelectorAll('[data-open]').forEach((b) =>
  b.addEventListener('click', () => { const d = $(b.dataset.open); d.showModal(); d.querySelector('input')?.focus(); }));
document.querySelectorAll('dialog').forEach((d) =>
  d.addEventListener('click', (e) => { if (e.target === d) d.close(); }));
document.querySelectorAll('[data-form]').forEach((f) =>
  f.addEventListener('submit', (e) => {
    if (e.submitter?.value !== 'ok') return;
    e.preventDefault();
    f.querySelector('.form-note').textContent = 'This is a demo: there is no server yet, so nothing is sent.';
  }));

/* ---------- Mobile menu ---------- */
$('burger').addEventListener('click', () => {
  const open = $('linkBox').classList.toggle('open');
  $('burger').setAttribute('aria-expanded', open);
});
$('year').textContent = new Date().getFullYear();
