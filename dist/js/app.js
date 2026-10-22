const $ = (s, r = document) => r.querySelector(s);
const app = $('#app');
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const rub = (n) => n.toLocaleString('ru-RU') + ' ₽';
const ic = (n, c = '') => `<svg class="ic ${c}"><use href="#i-${n}"/></svg>`;
const byId = (id) => PRODUCTS.find((p) => p.id === +id);

const store = (() => {
  let s;
  try { s = JSON.parse(localStorage.getItem('wbselect')) || {}; } catch { s = {}; }
  return { cart: [], fav: [], orders: [], chat: [], recv: 'pvz', ...s };
})();
const save = () => { try { localStorage.setItem('wbselect', JSON.stringify(store)); } catch {} counts(); };

function counts() {
  const n = { cart: store.cart.reduce((a, c) => a + c.qty, 0), fav: store.fav.length };
  document.querySelectorAll('[data-count]').forEach((b) => { const v = n[b.dataset.count]; b.textContent = v; b.hidden = !v; });
}
function toast(html) {
  const t = $('#toast'); t.innerHTML = html; t.classList.add('is-on');
  clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove('is-on'), 2600);
}
function modal(html, cls = '') {
  const m = $('#modal'); m.className = 'modal ' + cls; $('#modal-body').innerHTML = html; m.showModal();
}
const imgTag = (id, alt, w = 600) => `<img src="${IMG(id, w)}" alt="${esc(alt)}" loading="lazy" decoding="async" onerror="this.outerHTML='<div class=img-fallback>BERRYBLACK</div>'">`;

function card(p) {
  const fav = store.fav.includes(p.id);
  return `<article class="pcard ${p.stock ? '' : 'is-out'}">
    <div class="pcard-media">${imgTag(p.imgs[0], p.title)}
      <div class="pcard-tags"><span class="tag tag-orig">${ic('shield')} Оригинал</span>${p.isNew ? '<span class="tag tag-violet">Новинка</span>' : ''}${p.stock ? '' : '<span class="tag">Нет в наличии</span>'}</div>
    </div>
    <a class="cover" href="#/product/${p.id}" aria-label="${esc(p.brandName + ', ' + p.title)}"></a>
    <button class="fav-btn ${fav ? 'is-on' : ''}" data-action="fav" data-id="${p.id}" aria-pressed="${fav}" aria-label="В избранное">${ic('heart')}</button>
    <div class="pcard-body"><div class="pcard-price">${rub(p.price)}</div><div class="pcard-brand">${esc(p.brandName)}</div>
    <div class="pcard-title">${esc(p.title)}</div><div class="pcard-meta">${ic('star')} ${p.rating} · ${p.reviews} отзывов</div></div></article>`;
}

/* ---------- Pages ---------- */
function home() {
  const row = BRANDS.map((b) => `<a class="brand-pill" href="#/catalog?brand=${b.id}">${esc(b.name)}</a>`).join('');
  const half = Math.ceil(BRANDS.length / 2);
  const r1 = BRANDS.slice(0, half).map((b) => `<a class="brand-pill" href="#/catalog?brand=${b.id}">${esc(b.name)}</a>`).join('');
  const r2 = BRANDS.slice(half).map((b) => `<a class="brand-pill" href="#/catalog?brand=${b.id}">${esc(b.name)}</a>`).join('');
  return `<div class="wrap page" style="padding-top:8px">
  <section class="marquee" aria-label="Бренды">
    <div class="marquee-head"><h2>${BRANDS.length} брендов в BerryBlack</h2><a class="link" href="#/brands">Все бренды ${ic('chevron')}</a></div>
    <div class="marquee-row">${r1}${r1}</div><div class="marquee-row rev">${r2}${r2}</div>
  </section>
  <section class="hero">
    <div class="hero-img" style="background-image:url('${IMG('1483985988355-763728e1935b', 1400)}')"></div>
    <div class="hero-copy"><span class="eyebrow">BerryBlack</span>
      <h1>Оригинальные вещи премиальных брендов</h1>
      <p>Каждая партия проверена на подлинность. Привезём к точному времени или в BerryBlack-пункт без очередей.</p>
      <div class="hero-cta"><a class="btn btn-light" href="#/catalog?sort=new">Смотреть новинки</a><button class="btn btn-ghost" data-action="story" data-id="original">Как мы проверяем</button></div>
      <div class="hero-facts"><span>${ic('shield')} Гарантия оригинала</span><span>${ic('clock')} Доставка ко времени</span><span>${ic('chat')} Ответ за 5 минут</span></div>
    </div>
  </section>
  <section class="section"><div class="stories">${stories()}</div></section>
  ${GROUPS.map((g) => `<section class="group" data-group="${g.id}"><div class="group-head"><div><h2>${g.name}</h2><p>${g.note}</p></div><a class="link" href="#/catalog?group=${g.id}">Смотреть всё ${ic('chevron')}</a></div>
    <div class="cat-grid">${g.cats.map((c) => `<a class="cat-tile" href="#/catalog?cat=${c}">${imgTag(CATS[c].img, '', 500)}<span>${CATS[c].name}</span></a>`).join('')}</div></section>`).join('')}
  <section class="section"><div class="section-head"><div><h2>Новинки недели</h2><p>Отобрано байерами BerryBlack</p></div><a class="link" href="#/catalog?sort=new">Все ${ic('chevron')}</a></div>
    <div class="rail">${PRODUCTS.filter((p) => p.isNew).map(card).join('')}</div></section>
  <section class="section"><div class="section-head"><div><h2>Как получить заказ</h2><p>Выберите один раз в профиле — будем предлагать по умолчанию</p></div></div>
    <div class="svc">
      <div class="svc-card">${imgTag('1441984904996-e0b6ba687e04', '', 900)}<span class="eyebrow">BerryBlack-пункт</span><h3>Премиальный пункт выдачи</h3>
        <ul><li>${ic('check')} Отдельное окно без очереди</li><li>${ic('check')} Примерочные и консультант, который знает товар</li><li>${ic('check')} Хранение 7 дней</li></ul>
        <button class="btn btn-light" data-action="recv" data-v="pvz">Получать в BerryBlack-пункте</button></div>
      <div class="svc-card">${imgTag('1445205170230-053b83016050', '', 900)}<span class="eyebrow">Курьер</span><h3>Курьер к точному времени</h3>
        <ul><li>${ic('check')} Интервал 1 час, с 8:00 до 23:00</li><li>${ic('check')} Примерка 15 минут, оплата только подошедшего</li><li>${ic('check')} Подъём и сборка мебели и техники</li></ul>
        <button class="btn btn-light" data-action="recv" data-v="courier">Получать курьером</button></div>
    </div></section>
  <section class="section"><div class="section-head"><div><h2>Параллельный импорт — с проверкой</h2><p>Тот же оригинал, просто другой путь в Россию</p></div></div>
    <div class="steps"><div class="step"><h3>Документы поставки</h3><p>ГТД, договор и происхождение каждой партии.</p></div><div class="step"><h3>Экспертный осмотр</h3><p>Серийные номера, IMEI, маркировка, материалы.</p></div><div class="step"><h3>Гарантия BerryBlack</h3><p>Сервис партнёра и возврат двойной стоимости при подделке.</p></div></div></section>
  <section class="section"><div class="section-head"><div><h2>Российские премиум-бренды</h2></div><a class="link" href="#/catalog?supply=ru">Все ${ic('chevron')}</a></div>
    <div class="rail">${PRODUCTS.filter((p) => p.supply === 'ru').map(card).join('')}</div></section>
  <section class="section"><div class="trust">
    <div>${ic('shield')}<span><b>Подлинность</b>Сертификат в каждой карточке</span></div>
    <div>${ic('return')}<span><b>Возврат 30 дней</b>Курьер заберёт бесплатно</span></div>
    <div>${ic('gift')}<span><b>Фирменная упаковка</b>Коробка, пыльник, открытка</span></div>
    <div>${ic('chat')}<span><b>Поддержка 24/7</b>Отвечаем за 5 минут</span></div></div></section>
  </div>`;
}
function stories() {
  return `<a class="story story-brand" href="#/about"><b>BERRYBLACK</b><span>Наши стандарты</span></a>` +
    STANDARDS.slice(1).map((s) => `<button class="story" data-action="story" data-id="${s.id}">${imgTag(s.img, '', 400)}<span>${s.title}</span></button>`).join('');
}

function catalog(q) {
  const f = { q: q.get('q') || '', cat: q.get('cat'), group: q.get('group'), brand: q.getAll('brand'), supply: q.getAll('supply'), material: q.getAll('material'), dlv: q.getAll('dlv'), sort: q.get('sort') || 'rel', max: +q.get('max') || 0 };
  let list = PRODUCTS.filter((p) => {
    const t = (p.brandName + ' ' + p.title + ' ' + CATS[p.cat].name + ' ' + p.article).toLowerCase();
    return (!f.q || f.q.toLowerCase().split(/\s+/).every((w) => t.includes(w))) && (!f.cat || p.cat === f.cat) &&
      (!f.group || GROUPS.find((g) => g.id === f.group).cats.includes(p.cat)) && (!f.brand.length || f.brand.includes(p.brand)) &&
      (!f.supply.length || f.supply.includes(p.supply)) && (!f.material.length || f.material.includes(p.material)) &&
      (!f.dlv.length || f.dlv.every((d) => p.delivery.includes(d))) && (!f.max || p.price <= f.max);
  });
  const sorts = { rel: (a, b) => b.reviews * b.rating - a.reviews * a.rating, cheap: (a, b) => a.price - b.price, exp: (a, b) => b.price - a.price, new: (a, b) => b.added - a.added, rate: (a, b) => b.rating - a.rating };
  list.sort(sorts[f.sort]);
  const title = f.q ? `«${esc(f.q)}»` : f.cat ? CATS[f.cat].name : f.group ? GROUPS.find((g) => g.id === f.group).name : 'Все товары';
  const box = (name, val, label, n) => `<label class="check"><input type="checkbox" name="${name}" value="${val}" ${q.getAll(name).includes(val) ? 'checked' : ''}> ${esc(label)}<span class="n">${n}</span></label>`;
  const mats = [...new Set(PRODUCTS.map((p) => p.material).filter((m) => m !== '—'))];
  return `<div class="wrap page"><div class="crumbs"><a href="#/">BerryBlack</a> / <span>Каталог</span></div>
  <h1 class="h1">${title}</h1>
  <div class="cat-layout mt-16">
    <form class="filters" id="filters"><div class="filters-head"><h2>Фильтры</h2><button type="button" class="iconbtn" data-action="close-filters" aria-label="Закрыть">${ic('close')}</button></div>
      <div class="fgroup"><h3>Подлинность</h3><label class="check"><input type="checkbox" checked disabled> Есть сертификат подлинности<span class="n">все</span></label></div>
      <div class="fgroup"><h3>Происхождение</h3>${Object.entries(SUPPLY).map(([k, v]) => box('supply', k, v.short, PRODUCTS.filter((p) => p.supply === k).length)).join('')}</div>
      <div class="fgroup"><h3>Способ получения</h3>${Object.entries(DELIVERY).map(([k, v]) => box('dlv', k, v, PRODUCTS.filter((p) => p.delivery.includes(k)).length)).join('')}</div>
      <div class="fgroup"><h3>Цена до</h3><input class="input" name="max" inputmode="numeric" placeholder="Например, 100 000" value="${f.max || ''}"></div>
      <div class="fgroup"><h3>Бренд</h3>${BRANDS.map((b) => box('brand', b.id, b.name + ' · ' + b.country, PRODUCTS.filter((p) => p.brand === b.id).length)).join('')}</div>
      <div class="fgroup"><h3>Материал</h3>${mats.map((m) => box('material', m, m, PRODUCTS.filter((p) => p.material === m).length)).join('')}</div>
      <div class="filters-foot"><a class="btn btn-ghost" href="#/catalog">Сбросить</a><button class="btn btn-primary btn-block" type="button" data-action="close-filters">Показать</button></div>
    </form>
    <div><div class="toolbar"><span class="count">${list.length} товаров</span>
      <button class="btn btn-ghost btn-s open-filters" data-action="open-filters">${ic('filter')} Фильтры</button>
      <select class="select" id="sort" aria-label="Сортировка">${[['rel', 'По релевантности'], ['cheap', 'Сначала дешевле'], ['exp', 'Сначала дороже'], ['new', 'Новинки'], ['rate', 'По рейтингу']].map(([v, l]) => `<option value="${v}" ${f.sort === v ? 'selected' : ''}>${l}</option>`).join('')}</select></div>
      <div id="results" class="grid grid-cat">${Array(6).fill('<div class="sk-card"><div class="sk"></div><div class="sk sk-line"></div><div class="sk sk-line" style="width:60%"></div></div>').join('')}</div>
    </div></div></div>`;
  // results filled after skeleton in after()
}
function catalogAfter(q) {
  setTimeout(() => {
    const el = $('#results'); if (!el) return;
    const ids = catalog.last;
    el.innerHTML = ids.length ? ids.map(card).join('') : `<div class="empty" style="grid-column:1/-1"><div class="empty-ic">${ic('search')}</div><h2>Ничего не нашлось</h2><p>Попробуйте убрать часть фильтров или поискать по бренду.</p><a class="btn btn-primary" href="#/catalog">Сбросить фильтры</a></div>`;
  }, 250);
}

function product(id) {
  const p = byId(id);
  if (!p) return `<div class="wrap page"><div class="empty"><div class="empty-ic">${ic('info')}</div><h2>Товар не найден</h2><p>Возможно, его сняли с продажи.</p><a class="btn btn-primary" href="#/catalog">В каталог</a></div></div>`;
  const inCart = store.cart.some((c) => c.id === p.id);
  const fav = store.fav.includes(p.id);
  const revs = REVIEW_TEXT.map((r, i) => ({ t: r[0], x: r[1], n: REVIEW_NAMES[(i + p.id) % 8], s: i === 4 ? 4 : 5, v: i % 3 !== 2, ph: i % 2 === 0 }));
  return `<div class="wrap page"><div class="crumbs"><a href="#/">BerryBlack</a> / <a href="#/catalog?cat=${p.cat}">${CATS[p.cat].name}</a> / <span>${esc(p.brandName)}</span></div>
  <div class="pdp">
    <div class="gallery"><div class="g-thumbs">${p.imgs.map((m, i) => `<button class="${i ? '' : 'is-on'}" data-action="thumb" data-i="${i}" aria-label="Фото ${i + 1}">${imgTag(m, '', 200)}</button>`).join('')}</div>
      <div class="g-main" id="gmain" data-imgs="${p.imgs.join(',')}">${imgTag(p.imgs[0], p.title, 1200)}
        <div class="g-tools">${p.has360 ? `<button class="chip" data-action="360">${ic('rotate')} 360°</button>` : ''}<button class="chip" data-action="fullscreen">Во весь экран</button></div>
        <span class="g-hint">${matchMedia('(hover:hover)').matches ? 'Наведите для зума' : 'Нажмите, чтобы увеличить'}</span></div></div>
    <div class="pdp-info">
      <a class="pdp-brand" href="#/catalog?brand=${p.brand}">${esc(p.brandName)} ${ic('chevron', 'ic-s')}</a>
      <h1 class="pdp-title">${esc(p.title)}</h1>
      <div class="pdp-meta"><span class="rating">${ic('star')} ${p.rating}</span><button class="link" style="min-height:32px" onclick="document.getElementById('reviews').scrollIntoView({behavior:'smooth'})">${p.reviews} отзывов</button><button class="art" data-action="copy" data-v="${p.article}">Арт. ${p.article} ${ic('copy')}</button></div>
      <div class="pdp-price">${rub(p.price)}<small>Цена окончательная: доставка и упаковка BerryBlack включены</small></div>
      ${p.sizes ? `<div><div class="row between"><b>Размер</b><button class="link" data-action="sizes">Таблица размеров</button></div><div class="sizes mt-8">${p.sizes.map((s) => `<button class="size" data-action="size" data-v="${s}">${s}</button>`).join('')}</div></div>` : ''}
      <div class="buy">${p.stock ? `<button class="btn btn-primary" data-action="add" data-id="${p.id}">${inCart ? 'Перейти в корзину' : 'Добавить в корзину'}</button>` : `<button class="btn btn-primary" data-action="notify" data-id="${p.id}">${ic('bell')} Сообщить о поступлении</button>`}
        <button class="iconbtn ${fav ? 'is-on' : ''}" data-action="fav" data-id="${p.id}" aria-label="В избранное" aria-pressed="${fav}">${ic('heart')}</button></div>
      <div class="auth"><div class="auth-head"><span class="auth-badge">${ic('shield')}</span><div><b>Подлинность подтверждена</b><span class="muted small">Проверено экспертом BerryBlack 14.10.2026</span></div></div>
        <dl><dt>Сертификат</dt><dd>${p.cert}</dd><dt>Поставка</dt><dd>${SUPPLY[p.supply].name}</dd><dt>Страна бренда</dt><dd>${p.country}</dd></dl>
        <div class="auth-actions"><button class="btn btn-ghost btn-s" data-action="cert" data-id="${p.id}">Открыть сертификат</button><a class="btn btn-line btn-s" href="#/support">${ic('chat', 'ic-s')} Спросить эксперта</a></div></div>
      <div class="dlv">
        ${p.delivery.includes('courier') ? `<div class="dlv-row">${ic('clock')}<div><b>Курьер ко времени — завтра</b><span>Интервал 1 час на выбор</span></div></div>` : ''}
        ${p.delivery.includes('pvz') ? `<div class="dlv-row">${ic('store')}<div><b>BerryBlack-пункт — сегодня после 18:00</b><span>Без очереди, с примерочной</span></div></div>` : ''}
        ${p.delivery.includes('fitting') ? `<div class="dlv-row">${ic('user')}<div><b>Примерка при курьере</b><span>15 минут, оплата только подошедшего</span></div></div>` : ''}
        ${p.delivery.includes('install') ? `<div class="dlv-row">${ic('box')}<div><b>Подъём и сборка включены</b><span>Мастер установит и проверит</span></div></div>` : ''}
        <div class="dlv-row">${ic('return')}<div><b>Возврат ${p.returnDays} дней</b><span>Курьер заберёт бесплатно</span></div></div>
        <div class="dlv-row">${ic('shield')}<div><b>Гарантия: ${p.warranty}</b><span>Сервис партнёра BerryBlack</span></div></div></div>
      <div class="seller-line"><span class="seller-ava">${esc(p.brandName[0])}</span><div><b>${esc(p.brandName)}</b><div class="muted small">Магазин BerryBlack · рейтинг 4,9</div></div></div>
      <div><h2 style="font-size:20px;margin:8px 0">Характеристики</h2><table class="spec">${Object.entries(p.specs).map(([k, v]) => `<tr><th>${k}</th><td>${esc(v)}</td></tr>`).join('')}<tr><th>Страна</th><td>${p.country}</td></tr></table></div>
      <div id="reviews"><h2 style="font-size:20px;margin:8px 0">Отзывы</h2>
        <div class="reviews-sum"><span class="big-rate">${p.rating}</span><span class="muted">${p.reviews} отзывов<br>${Math.round(p.reviews * .78)} с подтверждённой покупкой</span></div>
        <div class="chips mt-16" id="rev-filter"><button class="chip is-on" data-action="rev" data-v="all">Все</button><button class="chip" data-action="rev" data-v="v">Подтверждённая покупка</button><button class="chip" data-action="rev" data-v="ph">С фото</button></div>
        <div id="rev-list">${revs.map((r) => `<div class="review" data-v="${r.v}" data-ph="${r.ph}"><div class="review-head"><b>${r.n}</b><span class="stars">${[1, 2, 3, 4, 5].map((i) => ic('star', i > r.s ? 'off' : '')).join('')}</span>${r.v ? `<span class="tag tag-ok">${ic('check')} Подтверждённая покупка</span>` : ''}</div><b>${r.t}</b><p class="muted">${r.x}</p>${r.ph ? imgTag(p.imgs[0], 'Фото покупателя', 200) : ''}</div>`).join('')}</div></div>
    </div></div>
  <section class="section"><div class="section-head"><h2>Похожие товары</h2></div><div class="rail">${PRODUCTS.filter((x) => x.cat === p.cat && x.id !== p.id).concat(PRODUCTS.filter((x) => x.brand === p.brand && x.cat !== p.cat)).slice(0, 8).map(card).join('')}</div></section></div>
  <div class="sticky-buy is-shown"><span class="pr">${rub(p.price)}</span>${p.stock ? `<button class="btn btn-primary" data-action="add" data-id="${p.id}">${inCart ? 'В корзине' : 'В корзину'}</button>` : '<button class="btn btn-ghost" disabled>Нет в наличии</button>'}</div>`;
}

const co = { recv: null, day: 1, slot: '12:00–13:00', pvz: 'patr', gift: false, pay: 'card' };
function cart() {
  const items = store.cart.map((c) => ({ ...c, p: byId(c.id) })).filter((c) => c.p);
  if (!items.length) return `<div class="wrap page"><div class="empty"><div class="empty-ic">${ic('bag')}</div><h2>В корзине пусто</h2><p>Загляните в новинки или в избранное.</p><a class="btn btn-primary" href="#/catalog">В каталог</a></div></div>`;
  co.recv = co.recv || store.recv;
  const sum = items.reduce((a, c) => a + c.p.price * c.qty, 0);
  const gift = co.gift ? 390 : 0;
  const canFit = items.some((c) => c.p.delivery.includes('fitting'));
  const days = Array.from({ length: 7 }, (_, i) => { const d = new Date(); d.setDate(d.getDate() + i + 1); return d; });
  const slots = ['08:00–09:00', '09:00–10:00', '10:00–11:00', '12:00–13:00', '14:00–15:00', '17:00–18:00', '19:00–20:00', '21:00–22:00'];
  const opt = (v, icon, t, s) => `<label class="opt ${co.recv === v ? 'is-on' : ''}"><input type="radio" name="recv" value="${v}" ${co.recv === v ? 'checked' : ''}>${ic(icon)}<div><b>${t}</b><span>${s}</span></div><span class="price">Бесплатно</span></label>`;
  return `<div class="wrap page"><h1 class="h1">Корзина и оформление</h1><div class="checkout mt-16"><div class="stack">
    <div class="co-block"><h2><span class="num">1</span> Товары</h2>${items.map((c) => `<div class="citem">${imgTag(c.p.imgs[0], c.p.title, 200)}<div><div class="citem-top"><div><div class="citem-brand">${esc(c.p.brandName)}</div><div class="citem-title">${esc(c.p.title)}${c.size ? ' · ' + c.size : ''}</div></div><div class="citem-price">${rub(c.p.price * c.qty)}</div></div>
      <div class="citem-actions"><div class="qty"><button data-action="qty" data-id="${c.id}" data-d="-1" aria-label="Меньше">${ic('minus')}</button><span>${c.qty}</span><button data-action="qty" data-id="${c.id}" data-d="1" aria-label="Больше">${ic('plus')}</button></div><button class="iconbtn" data-action="remove" data-id="${c.id}" aria-label="Удалить">${ic('trash')}</button></div></div></div>`).join('')}</div>
    <div class="co-block"><h2><span class="num">2</span> Способ получения</h2><div class="opts" id="recv">
      ${opt('courier', 'clock', 'Курьер к точному времени', 'Интервал 1 час')}${opt('pvz', 'store', 'BerryBlack-пункт', 'Без очереди, с примерочной')}${canFit ? opt('fitting', 'user', 'Курьер с примеркой', '15 минут на примерку') : ''}</div>
      ${co.recv === 'pvz' ? `<div class="opts">${PICKUP_POINTS.map((pt) => `<label class="opt ${co.pvz === pt.id ? 'is-on' : ''}"><input type="radio" name="pvz" value="${pt.id}">${ic('pin')}<div><b>${pt.name}</b><span>${pt.address} · ${pt.hours}<br>${pt.note}</span></div></label>`).join('')}</div>` :
      `<div class="addr">${ic('pin')}<div><b>Москва, Большая Никитская, 24, кв. 12</b><br><span>Сохранённый адрес</span></div></div>
       <div class="days">${days.map((d, i) => `<button class="day ${co.day === i + 1 ? 'is-on' : ''}" data-action="day" data-v="${i + 1}">${d.toLocaleDateString('ru-RU', { weekday: 'short' })}<b>${d.getDate()}</b></button>`).join('')}</div>
       <div class="slots">${slots.map((s, i) => `<button class="slot ${co.slot === s ? 'is-on' : ''}" data-action="slot" data-v="${s}" ${i === 1 && co.day === 1 ? 'disabled' : ''}>${s}</button>`).join('')}</div>`}</div>
    <div class="co-block"><h2><span class="num">3</span> Упаковка и комментарий</h2>
      <div class="opt is-on">${ic('box')}<div><b>Фирменная коробка BerryBlack</b><span>Пыльник и карточка подлинности</span></div><span class="price">Включено</span></div>
      <label class="switch-row"><div><b>Подарочная упаковка</b><span>Лента и открытка, без чека с ценой · 390 ₽</span></div><input type="checkbox" class="tgl" id="gift" ${co.gift ? 'checked' : ''}></label>
      ${co.gift ? '<textarea class="input" placeholder="Текст открытки"></textarea>' : ''}
      <textarea class="input" placeholder="Комментарий курьеру: код домофона, этаж"></textarea></div>
    <div class="co-block"><h2><span class="num">4</span> Оплата</h2><div class="opts">
      <label class="opt is-on">${ic('wallet')}<div><b>Карта •••• 4417</b><span>Сохранённая (демо)</span></div></label>
      <label class="opt">${ic('wallet')}<div><b>WB Кошелёк</b><span>Кешбэк 5% баллами BerryBlack</span></div></label></div></div>
  </div>
  <aside class="summary"><h2 style="font-size:20px">Итого</h2>
    <div class="sum-row">Товары, ${items.reduce((a, c) => a + c.qty, 0)} шт.<b>${rub(sum)}</b></div>
    <div class="sum-row">Доставка<b>Бесплатно</b></div><div class="sum-row">Фирменная упаковка<b>Бесплатно</b></div>
    ${gift ? `<div class="sum-row">Подарочная упаковка<b>${rub(gift)}</b></div>` : ''}<div class="sum-row">Сервисный сбор<b>0 ₽</b></div>
    <div class="sum-total"><span>К оплате</span><span>${rub(sum + gift)}</span></div>
    <button class="btn btn-primary btn-block" data-action="order" data-sum="${sum + gift}">Оформить заказ</button>
    <p class="note">Это учебный прототип: деньги не списываются, заказ создаётся только в этом браузере.</p></aside></div></div>`;
}

const STATUSES = [['Заказ оформлен', 'Оплата прошла'], ['Проверка подлинности', 'Эксперт сверяет документы и серийные номера'], ['Упакован в коробку BerryBlack', 'Пыльник и карточка подлинности внутри'], ['В пути', 'Курьер приедет в выбранный интервал'], ['Доставлен', 'Спасибо, что выбрали BerryBlack']];
function orders() {
  if (!store.orders.length) return `<div class="wrap page"><div class="empty"><div class="empty-ic">${ic('box')}</div><h2>Заказов пока нет</h2><p>Здесь будут статусы, отслеживание и возвраты.</p><a class="btn btn-primary" href="#/catalog">Выбрать товары</a></div></div>`;
  return `<div class="wrap page"><h1 class="h1">Заказы и возвраты</h1><div class="stack mt-16">${store.orders.slice().reverse().map((o) => {
    const st = Math.min(4, Math.floor((Date.now() - o.at) / 20000));
    return `<div class="order"><div class="order-head"><b>Заказ ${o.id}</b><span class="tag ${st === 4 ? 'tag-ok' : 'tag-violet'}">${o.returned ? 'Возврат оформлен' : STATUSES[st][0]}</span></div>
      <div class="order-thumbs">${o.items.map((c) => imgTag(byId(c.id).imgs[0], '', 150)).join('')}</div>
      <ol class="timeline">${STATUSES.map((s, i) => `<li class="${i < st ? 'done' : i === st ? 'done now' : ''}"><span class="dot">${i <= st ? ic('check') : ''}</span><b>${s[0]}</b><span>${s[1]}</span></li>`).join('')}</ol>
      <p class="note">Демо: статус меняется каждые 20 секунд.</p>
      <div class="row"><a class="btn btn-ghost btn-s" href="#/support">${ic('chat', 'ic-s')} Поддержка</a>${!o.returned ? `<button class="btn btn-line btn-s" data-action="return" data-id="${o.id}">${ic('return', 'ic-s')} Вернуть</button>` : ''}</div></div>`;
  }).join('')}</div></div>`;
}

function favorites() {
  const list = store.fav.map(byId).filter(Boolean);
  return `<div class="wrap page"><h1 class="h1">Избранное</h1>${list.length ? `<div class="grid mt-16">${list.map(card).join('')}</div>` : `<div class="empty"><div class="empty-ic">${ic('heart')}</div><h2>Пока пусто</h2><p>Нажмите на сердечко на товаре, чтобы сохранить его. Сообщим, если товар снова появится в наличии.</p><a class="btn btn-primary" href="#/catalog">В каталог</a></div>`}</div>`;
}

function profile() {
  const lastOrder = store.orders.length;
  const pt = PICKUP_POINTS[0];
  return `<div class="wrap page"><div class="prof-head"><span class="ava">S</span><div><h1 style="font-size:24px">Профиль</h1><span class="tag tag-violet">${ic('sparkle')} Клиент BerryBlack</span></div></div>
  <div class="prof mt-16"><div class="stack">
    <div class="tiles"><a class="tile" href="#/favorites">${ic('heart')}<b>Избранное</b><span>${store.fav.length} товаров</span></a>
      <a class="tile" href="#/orders">${ic('bag', 'line')}<b>Покупки</b><span>${lastOrder ? 'Заказать снова' : 'Нет покупок'}</span></a>
      <a class="tile" href="#/orders">${ic('star')}<b>Отзывы</b><span>Нет товаров</span></a></div>
    <div class="prem"><div class="prem-head"><div><span class="eyebrow">Премиум-поддержка</span><h2>Ответим за 5 минут, 24/7</h2></div><span class="prem-live">Онлайн</span></div>
      <div class="concierge"><span class="ava">АМ</span><div><b>Анна Морозова</b><br><span class="muted">Ваш персональный консьерж</span></div></div>
      <div class="prem-actions"><a class="btn btn-light" href="#/support">${ic('chat')} Чат</a><button class="btn btn-ghost" data-action="call">${ic('phone')} Звонок</button></div></div>
    <div class="panel"><h2>Как получать заказы</h2><div class="recv">
      <button class="recv-btn ${store.recv === 'pvz' ? 'is-on' : ''}" data-action="recv" data-v="pvz">${ic('store')}<b>BerryBlack-пункт</b><span>${pt.name.split('· ')[1]}, без очереди</span></button>
      <button class="recv-btn ${store.recv === 'courier' ? 'is-on' : ''}" data-action="recv" data-v="courier">${ic('truck')}<b>Курьер</b><span>К точному времени, с примеркой</span></button></div></div>
  </div><div class="stack">
    <div class="panel"><h2>Финансы</h2><div class="fin"><div class="fin-item"><span>WB Кошелёк</span><b>0 ₽</b></div><div class="fin-item"><span>Баллы BerryBlack</span><b>1 000</b></div>
      <div class="fin-promo"><div><b>Карта WB Банка</b><span>Кешбэк 5% в BerryBlack</span></div><button class="btn btn-ghost btn-s" data-action="soon">Подробнее</button></div></div></div>
    <div class="stories">${stories()}</div>
    <nav class="menu"><a href="#/orders">${ic('box')} Заказы ${ic('chevron', 'chev')}</a><a href="#/orders">${ic('return')} Возвраты ${ic('chevron', 'chev')}</a><a href="#/brands">${ic('heart')} Избранные магазины и бренды ${ic('chevron', 'chev')}</a>
      <button data-action="soon">${ic('ticket')} Коды и сертификаты ${ic('chevron', 'chev')}</button><button data-action="soon">${ic('wallet')} Баланс средств ${ic('chevron', 'chev')}</button>
      <a href="#/seller">${ic('chart')} Кабинет продавца ${ic('chevron', 'chev')}</a><a href="#/about">${ic('info')} О проекте ${ic('chevron', 'chev')}</a></nav>
  </div></div></div>`;
}

function support() {
  if (!store.chat.length) store.chat.push({ me: false, t: 'Здравствуйте! Я Анна, ваш консьерж BerryBlack. Помогу с подлинностью, размером, доставкой или возвратом.', at: Date.now() });
  return `<div class="wrap page"><div class="chat"><div class="chat-head"><span class="ava">АМ</span><div><b>Премиум-поддержка BerryBlack</b><span class="prem-live">Онлайн · ответ до 5 минут</span></div></div>
    <div class="chat-log" id="chat-log" aria-live="polite">${store.chat.map(msg).join('')}</div>
    <div class="chat-foot"><div class="chips chips-scroll">${['Это оригинал?', 'Где мой заказ?', 'Оформить возврат', 'Подобрать размер'].map((t) => `<button class="chip" data-action="quick" data-v="${t}">${t}</button>`).join('')}</div>
    <form class="chat-form" id="chat-form"><input class="input" id="chat-input" placeholder="Сообщение" aria-label="Сообщение"><button class="btn btn-primary" aria-label="Отправить">${ic('send')}</button></form></div></div></div>`;
}
const msg = (m) => `<div class="msg ${m.me ? 'me' : 'them'}">${esc(m.t)}<time>${new Date(m.at).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}</time></div>`;
const REPLIES = { 'Это оригинал?': 'Да. Все товары BerryBlack проходят проверку документов и экспертный осмотр, номер сертификата есть в карточке товара.', 'Где мой заказ?': 'Статус и время доставки видны в разделе «Заказы». Если курьер опаздывает, мы позвоним сами.', 'Оформить возврат': 'Откройте «Заказы» → «Вернуть». Курьер заберёт бесплатно, деньги придут в течение дня после проверки.', 'Подобрать размер': 'Напишите рост и обычный размер — подскажу по посадке конкретной модели.' };
function sendChat(t) {
  store.chat.push({ me: true, t, at: Date.now() }); save();
  const log = $('#chat-log'); log.insertAdjacentHTML('beforeend', msg(store.chat.at(-1)) + '<div class="typing" id="typing"><i></i><i></i><i></i></div>'); log.scrollTop = 1e6;
  setTimeout(() => { $('#typing')?.remove(); store.chat.push({ me: false, t: REPLIES[t] || 'Спасибо! Уже разбираюсь, отвечу в течение пары минут.', at: Date.now() }); save(); if ($('#chat-log')) { $('#chat-log').insertAdjacentHTML('beforeend', msg(store.chat.at(-1))); $('#chat-log').scrollTop = 1e6; } }, 1200);
}

function brands() {
  return `<div class="wrap page"><h1 class="h1">Все бренды</h1><div class="brand-grid mt-16">${BRANDS.slice().sort((a, b) => a.name.localeCompare(b.name)).map((b) => `<div class="brand-card"><a class="cover" href="#/catalog?brand=${b.id}" aria-label="${esc(b.name)}"></a><b>${esc(b.name)}</b><span>${b.country} · ${SUPPLY[b.supply].short}</span></div>`).join('')}</div></div>`;
}

function seller() {
  const done = SELLER.checklist.filter((c) => c.done).length;
  return `<div class="wrap page"><span class="eyebrow">Кабинет продавца</span><h1 class="h1">${SELLER.name}</h1>
  <div class="manager mt-16"><span class="ava">ЕЛ</span><div><b>${SELLER.manager.name}</b><span>${SELLER.manager.role}, ${SELLER.manager.reply}</span></div><button class="btn btn-light btn-s" data-action="soon">Написать</button></div>
  <section class="section"><div class="kpis"><div class="kpi"><span>Выручка, 30 дней</span><b>4,82 млн ₽</b><em class="up">+12% к категории</em></div><div class="kpi"><span>Конверсия</span><b>3,4%</b><em class="up">+0,6 п.п.</em></div><div class="kpi"><span>Возвраты</span><b>6,1%</b><em class="down">+0,8 п.п.</em></div><div class="kpi"><span>Рейтинг</span><b>4,86</b><em class="up">выше 4,7</em></div><div class="kpi"><span>Остатки</span><b>312 шт.</b><em class="down">2 SKU заканчиваются</em></div></div>
    <button class="btn btn-ghost btn-s mt-16" data-action="csv">${ic('download', 'ic-s')} Выгрузить в Excel (CSV)</button></section>
  <section class="section two-col"><div class="card"><h3>Подключение BerryBlack: ${done} из ${SELLER.checklist.length}</h3><div class="progress mt-8"><i style="width:${done / SELLER.checklist.length * 100}%"></i></div>
    ${SELLER.checklist.map((c) => `<div class="cl-item ${c.done ? 'done' : ''}"><span class="cl-mark">${c.done ? ic('check') : ''}</span><div><b>${c.title}</b><span>${c.hint}</span></div></div>`).join('')}</div>
  <div class="card"><h3>Модерация карточек</h3>${SELLER.cards.map((c) => { const p = byId(c.pid); const st = { ok: ['tag-ok', 'Одобрено'], review: ['tag-warn', 'На модерации'], rejected: ['tag-bad', 'Отклонено'] }[c.status];
    return `<div class="mod">${imgTag(p.imgs[0], '', 150)}<div><div class="row between"><b>${esc(p.title)}</b><span class="tag ${st[0]}">${st[1]}</span></div>${c.reason ? `<div class="mod-reason"><b>${c.reason}</b><span class="muted">Что сделать: ${c.fix}</span></div><button class="btn btn-primary btn-s mt-8" data-action="soon">Исправить и отправить повторно</button>` : ''}</div></div>`; }).join('')}</div></section>
  <section class="section card"><h3>Заказы</h3><div class="alert bad mt-8">${ic('info')}<div>Заказ S-48199 рискует опоздать со сборкой: срок сегодня до 14:00.</div></div>
    <div class="table-wrap mt-16"><table class="table"><tr><th>№</th><th>Товар</th><th>Город</th><th>Срок</th><th>Сумма</th></tr>${SELLER.orders.map((o) => `<tr><td>${o.id}</td><td>${esc(byId(o.pid).title)}</td><td>${o.buyer}</td><td class="${o.late ? 'down' : ''}">${o.due}</td><td>${rub(o.sum)}</td></tr>`).join('')}</table></div></section></div>`;
}

function about() {
  const cjm = [['Вход', 'Открывает WB, переходит в BerryBlack', 'Переключатель WB / BerryBlack, баннер'], ['Выбор', 'Ищет бренд, фильтрует, сравнивает', 'Поиск сверху, бренды, фильтры'], ['Проверка', 'Смотрит сертификат и происхождение', 'Блок подлинности, чат с экспертом'], ['Оформление', 'Выбирает курьера ко времени или BerryBlack-пункт', 'Оформление на одном экране'], ['Ожидание', 'Следит за статусом', 'Трекинг, уведомления, поддержка 24/7'], ['Получение', 'Примеряет, оценивает упаковку', 'BerryBlack-пункт, курьер с примеркой'], ['После', 'Отзыв, возврат, повторная покупка', 'Возврат в 2 клика, рекомендации']];
  return `<div class="wrap page about"><span class="eyebrow">О проекте</span><h1 class="h1">BerryBlack: премиум-сегмент маркетплейса</h1>
  <p class="lead">Прототип отдельной премиальной витрины: гарантия оригинала, премиальный опыт, сервис и упаковка, отобранные бренды и продавцы.</p>
  <section><h2>Пользовательские истории</h2><div class="cards-3">${[['Гарантия оригинальности', 'Хочу быть уверенным в подлинности товара, чтобы не бояться купить подделку.'], ['Премиальная доставка и ПВЗ', 'Хочу выбирать курьера или премиальный пункт без очередей, с дружелюбными и знающими сотрудниками.'], ['Красивая упаковка', 'Хочу получать товар в чистой, эстетичной упаковке, соответствующей уровню покупки.'], ['Доставка ко времени', 'Хочу выбирать точное время доставки, чтобы получать покупки, когда удобно.'], ['Премиум-поддержка', 'Хочу получать ответы в любое время, в течение 5 минут.']].map((s, i) => `<div class="story-card"><span class="num">0${i + 1}</span><h3>${s[0]}</h3><p>Я как покупатель: ${s[1]}</p></div>`).join('')}</div></section>
  <section><h2>Customer Journey Map</h2><div class="card"><div class="table-wrap"><table class="table cjm"><tr><th>Этап</th><th>Действия</th><th>Точки взаимодействия</th></tr>${cjm.map((r) => `<tr><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join('')}</table></div></div></section>
  <section id="testing"><h2>Тестирование и Go/No-Go</h2><div class="cards-3">${[['Функциональное', '100% кейсов P0/P1: поиск, карточка, оформление, возврат, кабинет продавца'], ['Юзабилити', '5–8 респондентов, 85%+ выполняют задачу за 2–3 действия'], ['Производительность', 'Первый экран быстрее 2 с, API без деградации на пике'], ['Доступность', 'Контраст, клавиатура, скринридеры, зоны нажатия от 44 px'], ['Пилот', '5–10% аудитории, метрики не хуже контрольной группы'], ['Премиум-специфика', 'Блок подлинности, подарки, возврат дорогих товаров, качество фото']].map((s) => `<div class="story-card"><h3>${s[0]}</h3><p>${s[1]}</p></div>`).join('')}</div></section></div>`;
}

/* ---------- Router ---------- */
function route() {
  const [path, qs] = (location.hash.slice(1) || '/').split('?');
  const q = new URLSearchParams(qs || '');
  const parts = path.split('/').filter(Boolean);
  const name = parts[0] || 'home';
  let html;
  if (name === 'catalog') {
    html = catalog(q);
  }
  const pages = { home, cart, orders, favorites, profile, support, brands, seller, about };
  if (name === 'product') html = product(parts[1]);
  else if (name !== 'catalog') html = (pages[name] || home)();
  app.innerHTML = html;
  document.body.dataset.page = name;
  document.body.style.overflow = '';
  if (name === 'catalog') { catalog.last = filterFor(q); catalogAfter(); }
  document.querySelectorAll('[data-nav]').forEach((a) => a.classList.toggle('is-on', a.dataset.nav === name || (name === 'home' && a.dataset.nav === 'home')));
  if (name === 'support') $('#chat-log').scrollTop = 1e6;
  window.scrollTo(0, 0);
  bindPage(name, q);
  save();
}
function filterFor(q) {
  const f = { q: (q.get('q') || '').toLowerCase(), cat: q.get('cat'), group: q.get('group'), brand: q.getAll('brand'), supply: q.getAll('supply'), material: q.getAll('material'), dlv: q.getAll('dlv'), sort: q.get('sort') || 'rel', max: +q.get('max') || 0 };
  const sorts = { rel: (a, b) => b.reviews * b.rating - a.reviews * a.rating, cheap: (a, b) => a.price - b.price, exp: (a, b) => b.price - a.price, new: (a, b) => b.added - a.added, rate: (a, b) => b.rating - a.rating };
  return PRODUCTS.filter((p) => {
    const t = (p.brandName + ' ' + p.title + ' ' + CATS[p.cat].name + ' ' + p.article).toLowerCase();
    return (!f.q || f.q.split(/\s+/).every((w) => t.includes(w))) && (!f.cat || p.cat === f.cat) && (!f.group || GROUPS.find((g) => g.id === f.group).cats.includes(p.cat)) &&
      (!f.brand.length || f.brand.includes(p.brand)) && (!f.supply.length || f.supply.includes(p.supply)) && (!f.material.length || f.material.includes(p.material)) &&
      (!f.dlv.length || f.dlv.every((d) => p.delivery.includes(d))) && (!f.max || p.price <= f.max);
  }).sort(sorts[f.sort]);
}
function bindPage(name, q) {
  if (name === 'catalog') {
    const apply = () => {
      const fd = new FormData($('#filters')); const n = new URLSearchParams();
      ['q', 'cat', 'group'].forEach((k) => q.get(k) && n.set(k, q.get(k)));
      for (const [k, v] of fd) if (v) n.append(k, v);
      n.set('sort', $('#sort').value); location.hash = '#/catalog?' + n;
    };
    window.applyFilters = apply;
    $('#filters').addEventListener('change', () => { if (!$('#filters').classList.contains('is-open')) apply(); });
    $('#sort').addEventListener('change', apply);
  }
  if (name === 'support') $('#chat-form').addEventListener('submit', (e) => { e.preventDefault(); const v = $('#chat-input').value.trim(); if (v) { $('#chat-input').value = ''; sendChat(v); } });
  if (name === 'cart') {
    $('#recv')?.addEventListener('change', (e) => { co.recv = e.target.value; route(); });
    app.querySelectorAll('input[name=pvz]').forEach((i) => i.addEventListener('change', () => { co.pvz = i.value; route(); }));
    $('#gift')?.addEventListener('change', (e) => { co.gift = e.target.checked; route(); });
  }
  const g = $('#gmain');
  if (g) {
    const imgs = g.dataset.imgs.split(','); let i = 0, spin = false, x0 = null;
    const show = (n) => { i = (n + imgs.length) % imgs.length; g.querySelector('img').src = IMG(imgs[i], 1200); document.querySelectorAll('.g-thumbs button').forEach((b, k) => b.classList.toggle('is-on', k === i)); };
    g.show = show;
    g.addEventListener('mousemove', (e) => {
      if (spin) { if (x0 !== null && Math.abs(e.clientX - x0) > 40) { show(i + (e.clientX > x0 ? 1 : -1)); x0 = e.clientX; } return; }
      const r = g.getBoundingClientRect(); g.querySelector('img').style.transformOrigin = `${(e.clientX - r.left) / r.width * 100}% ${(e.clientY - r.top) / r.height * 100}%`;
      if (matchMedia('(hover:hover)').matches) g.classList.add('is-zoom');
    });
    g.addEventListener('mouseenter', (e) => { x0 = e.clientX; });
    g.addEventListener('mouseleave', () => g.classList.remove('is-zoom'));
    g.addEventListener('click', (e) => { if (!e.target.closest('.g-tools') && !matchMedia('(hover:hover)').matches) modal(`<img src="${IMG(imgs[i], 1600)}" alt="">`, 'full'); });
    g.toggle360 = (btn) => { spin = !spin; btn.classList.toggle('is-on', spin); g.classList.toggle('is-360', spin); g.classList.remove('is-zoom'); g.querySelector('.g-hint').textContent = spin ? 'Ведите курсором для поворота' : 'Наведите для зума'; if (spin) { let k = 0; const t = setInterval(() => { if (!spin || ++k > imgs.length * 2) return clearInterval(t); show(i + 1); }, 500); } };
  }
}

/* ---------- Actions ---------- */
let pickedSize = null;
document.addEventListener('click', (e) => {
  const b = e.target.closest('[data-action]'); if (!b) return;
  const a = b.dataset.action, id = +b.dataset.id;
  if (a === 'fav') { e.preventDefault(); const i = store.fav.indexOf(id); i >= 0 ? store.fav.splice(i, 1) : store.fav.push(id); b.classList.toggle('is-on', i < 0); b.setAttribute('aria-pressed', i < 0); save(); toast(i < 0 ? 'Добавлено в избранное' : 'Удалено из избранного'); }
  if (a === 'size') { pickedSize = b.dataset.v; document.querySelectorAll('.size').forEach((s) => s.classList.toggle('is-on', s === b)); }
  if (a === 'add') {
    const p = byId(id);
    if (store.cart.some((c) => c.id === id)) { location.hash = '#/cart'; return; }
    if (p.sizes && !pickedSize) { toast('Выберите размер'); document.querySelector('.sizes')?.scrollIntoView({ block: 'center', behavior: 'smooth' }); return; }
    store.cart.push({ id, qty: 1, size: pickedSize }); pickedSize = null; save();
    document.querySelectorAll('[data-action=add]').forEach((x) => (x.textContent = 'Перейти в корзину'));
    toast('Добавлено в корзину <a href="#/cart">Оформить</a>');
  }
  if (a === 'notify') toast('Сообщим, когда товар появится');
  if (a === 'qty') { const c = store.cart.find((x) => x.id === id); c.qty = Math.max(1, Math.min(5, c.qty + +b.dataset.d)); route(); }
  if (a === 'remove') { store.cart = store.cart.filter((x) => x.id !== id); route(); }
  if (a === 'day') { co.day = +b.dataset.v; route(); }
  if (a === 'slot') { co.slot = b.dataset.v; route(); }
  if (a === 'order') { const o = { id: 'WS-' + String(Date.now()).slice(-6), at: Date.now(), items: store.cart, sum: +b.dataset.sum }; store.orders.push(o); store.cart = []; save(); location.hash = '#/orders'; toast('Заказ оформлен'); }
  if (a === 'return') modal(`<h2 id="modal-title">Возврат</h2><div class="modal-body-grid"><p class="muted">Причина</p><div class="chips">${['Не подошёл размер', 'Не понравился', 'Брак'].map((r, i) => `<button class="chip ${i ? '' : 'is-on'}" data-action="pick">${r}</button>`).join('')}</div><div class="opt is-on">${ic('truck')}<div><b>Курьер заберёт бесплатно</b><span>Завтра в удобный интервал</span></div></div><button class="btn btn-primary btn-block" data-action="do-return" data-id="${b.dataset.id}">Оформить возврат</button></div>`);
  if (a === 'pick') b.parentElement.querySelectorAll('.chip').forEach((c) => c.classList.toggle('is-on', c === b));
  if (a === 'do-return') { store.orders.find((o) => o.id === b.dataset.id).returned = true; $('#modal').close(); route(); toast('Возврат оформлен. Деньги придут в течение дня после проверки'); }
  if (a === 'close-modal') $('#modal').close();
  if (a === 'recv') { store.recv = b.dataset.v; co.recv = null; save(); document.querySelectorAll('.recv-btn').forEach((x) => x.classList.toggle('is-on', x.dataset.v === store.recv)); toast(store.recv === 'pvz' ? 'По умолчанию: BerryBlack-пункт' : 'По умолчанию: курьер ко времени'); }
  if (a === 'story') { const s = STANDARDS.find((x) => x.id === b.dataset.id); modal(`<h2 id="modal-title">${s.title}</h2><div class="modal-body-grid">${imgTag(s.img, '', 900)}<p>${s.text}</p></div>`); }
  if (a === 'cert') { const p = byId(id); modal(`<h2 id="modal-title">Сертификат подлинности</h2><div class="cert"><div class="cert-head"><div><span class="eyebrow">BerryBlack</span><h3>${p.cert}</h3></div><span class="cert-seal">BB<br>ORIGINAL</span></div><dl class="auth"><dt>Товар</dt><dd>${esc(p.brandName)}, ${esc(p.title)}</dd><dt>Артикул</dt><dd>${p.article}</dd><dt>Поставка</dt><dd>${SUPPLY[p.supply].name}</dd><dt>Проверка</dt><dd>14.10.2026, эксперт BerryBlack</dd></dl></div>`); }
  if (a === 'sizes') modal(`<h2 id="modal-title">Таблица размеров</h2><table class="size-table"><tr><th>Размер</th><th>RU</th><th>Грудь</th><th>Талия</th></tr>${[['XS', 40, 82, 64], ['S', 42, 86, 68], ['M', 44, 90, 72], ['L', 46, 94, 76], ['XL', 48, 98, 80]].map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}</table><p class="note mt-16">Не уверены? Консьерж в чате подскажет по посадке.</p>`);
  if (a === 'thumb') $('#gmain').show(+b.dataset.i);
  if (a === '360') $('#gmain').toggle360(b);
  if (a === 'fullscreen') { const g = $('#gmain'); modal(`<img src="${g.querySelector('img').src.replace('w=1200', 'w=1800')}" alt="">`, 'full'); }
  if (a === 'copy') { navigator.clipboard?.writeText(b.dataset.v); toast('Артикул скопирован'); }
  if (a === 'quick') sendChat(b.dataset.v);
  if (a === 'open-filters') { $('#filters').classList.add('is-open'); document.body.style.overflow = 'hidden'; }
  if (a === 'close-filters') { $('#filters').classList.remove('is-open'); document.body.style.overflow = ''; if (b.classList.contains('btn-primary')) window.applyFilters(); }
  if (a === 'rev') { document.querySelectorAll('#rev-filter .chip').forEach((c) => c.classList.toggle('is-on', c === b)); document.querySelectorAll('#rev-list .review').forEach((r) => (r.hidden = b.dataset.v === 'v' ? r.dataset.v !== 'true' : b.dataset.v === 'ph' ? r.dataset.ph !== 'true' : false)); }
  if (a === 'to-wb') toast('Переход в основной каталог WB — вне прототипа');
  if (a === 'call' || a === 'soon') toast('В прототипе недоступно');
  if (a === 'csv') { const rows = [['Заказ', 'Товар', 'Город', 'Сумма'], ...SELLER.orders.map((o) => [o.id, byId(o.pid).title, o.buyer, o.sum])]; const blob = new Blob(['﻿' + rows.map((r) => r.join(';')).join('\n')], { type: 'text/csv' }); const l = document.createElement('a'); l.href = URL.createObjectURL(blob); l.download = 'select-orders.csv'; l.click(); }
});

/* ---------- Search with suggestions ---------- */
const si = $('#search-input'), sg = $('#suggest');
const hl = (t, q) => esc(t).replace(new RegExp('(' + q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig'), '<mark>$1</mark>');
si.addEventListener('input', () => {
  const q = si.value.trim().toLowerCase();
  if (!q) { sg.hidden = true; si.setAttribute('aria-expanded', 'false'); return; }
  const br = BRANDS.filter((b) => b.name.toLowerCase().includes(q)).slice(0, 4);
  const cs = Object.entries(CATS).filter(([, c]) => c.name.toLowerCase().includes(q)).slice(0, 3);
  const ps = PRODUCTS.filter((p) => (p.title + ' ' + p.brandName + ' ' + p.article).toLowerCase().includes(q)).slice(0, 5);
  sg.innerHTML = (br.length ? '<h4>Бренды</h4>' + br.map((b) => `<a href="#/catalog?brand=${b.id}">${hl(b.name, q)}<span class="tag">${b.country}</span></a>`).join('') : '') +
    (cs.length ? '<h4>Категории</h4>' + cs.map(([k, c]) => `<a href="#/catalog?cat=${k}">${hl(c.name, q)}</a>`).join('') : '') +
    (ps.length ? '<h4>Товары</h4>' + ps.map((p) => `<a href="#/product/${p.id}">${imgTag(p.imgs[0], '', 100)}<span>${hl(p.brandName + ' · ' + p.title, q)}</span><span class="tag">${rub(p.price)}</span></a>`).join('') : '') ||
    '<p class="muted" style="padding:12px">Ничего не нашлось. Попробуйте название бренда или артикул.</p>';
  sg.hidden = false; si.setAttribute('aria-expanded', 'true');
});
$('#search-form').addEventListener('submit', (e) => { e.preventDefault(); sg.hidden = true; location.hash = '#/catalog?q=' + encodeURIComponent(si.value.trim()); si.blur(); });
document.addEventListener('click', (e) => { if (!e.target.closest('.search')) sg.hidden = true; else if (e.target.closest('.suggest a')) sg.hidden = true; });
si.addEventListener('keydown', (e) => { if (e.key === 'Escape') sg.hidden = true; });
$('#photo-input').addEventListener('change', (e) => { if (!e.target.files[0]) return; toast('Ищем похожие товары по фото…'); setTimeout(() => (location.hash = '#/catalog?cat=bags'), 900); e.target.value = ''; });

$('#catnav').innerHTML = ['clothes', 'shoes', 'bags', 'watches', 'jewelry', 'beauty', 'appliances', 'furniture', 'sport', 'tech', 'audio'].map((c) => `<a href="#/catalog?cat=${c}">${CATS[c].name}</a>`).join('') + '<a href="#/brands">Бренды</a>';

const net = () => ($('#offline').hidden = navigator.onLine);
addEventListener('online', net); addEventListener('offline', net); net();
addEventListener('hashchange', route);
$('#modal').addEventListener('click', (e) => { if (e.target.id === 'modal') e.target.close(); });
route();
