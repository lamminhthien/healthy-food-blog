const $ = (s, p = document) => p.querySelector(s);
const $$ = (s, p = document) => [...p.querySelectorAll(s)];
const fmt = (r) =>
  `<article class="card"><a href="recipe-detail.html?id=${r.id}" class="block"><div class="overflow-hidden"><img class="h-[235px] w-full object-cover" src="${r.image}" alt="${r.title}"></div><div class="p-5"><span class="chip">${r.category}</span><h3 class="mt-[10px] mb-[8px] font-['Playfair_Display'] text-[22px] leading-[1.18] line-clamp-2">${r.title}</h3><p class="text-[14px] text-[#565a52] line-clamp-2">${r.description}</p><div class="mt-3 flex flex-wrap items-center gap-x-[12px] gap-y-1 text-[12px] text-[#74776f] border-t border-[#f0ede8] pt-3"><span>⏱ ${r.prepTime + r.cookTime} phút</span><span>🔥 ${r.calories} kcal</span></div></div></a></article>`;
const art = (a) =>
  `<article class="card"><a href="article-detail.html?id=${a.id}" class="block"><div class="overflow-hidden"><img class="h-[235px] w-full object-cover" src="${a.image}" alt="${a.title}"></div><div class="p-5"><span class="chip">${a.category}</span><h3 class="mt-[10px] mb-[8px] font-['Playfair_Display'] text-[22px] leading-[1.18] line-clamp-2">${a.title}</h3><p class="text-[14px] text-[#565a52] line-clamp-2">${a.excerpt}</p><div class="mt-3 flex flex-wrap items-center gap-x-[12px] gap-y-1 text-[12px] text-[#74776f] border-t border-[#f0ede8] pt-3"><span>📅 ${a.date}</span><span>📖 ${a.readTime}</span></div></div></a></article>`;

async function data(name) {
  return fetch(`${name}.json`).then((r) => r.json());
}
function layout() {
  const menu = $('.js-menu');
  const navLinks = $('.js-nav-links');
  if (!menu || !navLinks) return;
  menu.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('hidden') === false;
    menu.setAttribute('aria-expanded', String(isOpen));
  });
  $$('.js-signup').forEach((f) =>
    f.addEventListener('submit', (e) => {
      e.preventDefault();
      f.innerHTML = '<strong class="text-white mx-auto">Cảm ơn bạn! Hẹn gặp bạn trong bản tin sắp tới. 🌿</strong>';
    })
  );
  // Header scroll shadow
  const header = $('header');
  if (header) {
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
}
async function home() {
  const [recipes, articles] = await Promise.all([data('recipes'), data('articles')]);
  $('#featured').innerHTML = recipes
    .filter((r) => r.featured)
    .slice(0, 3)
    .map(fmt)
    .join('');
  $('#latest').innerHTML = articles.map(art).join('');
}
async function recipesPage() {
  const recipes = await data('recipes');
  const render = () => {
    let x = [...recipes],
      q = $('#search').value.toLowerCase(),
      c = $('#category').value,
      s = $('#sort').value;
    x = x.filter((r) => (c === 'all' || r.category === c) && r.title.toLowerCase().includes(q));
    if (s === 'calories') x.sort((a, b) => a.calories - b.calories);
    if (s === 'time') x.sort((a, b) => a.prepTime + a.cookTime - (b.prepTime + b.cookTime));
    $('#recipe-list').innerHTML = x.map(fmt).join('') || '<p>Chưa tìm thấy món phù hợp.</p>';
    $('#result-count').textContent = `${x.length} công thức`;
  };
  ['search', 'category', 'sort'].forEach((id) =>
    $('#' + id).addEventListener(id === 'search' ? 'input' : 'change', render)
  );
  render();
}
async function recipeDetail() {
  const recipes = await data('recipes'),
    r = recipes.find((x) => x.id == new URLSearchParams(location.search).get('id')) || recipes[0];
  document.title = `${r.title} — Nhà bếp của Lyn`;
  $('#recipe-detail').innerHTML =
    `<p class="text-[11px] font-bold uppercase tracking-[.15em] text-[var(--color-fern-500)]">${r.category} · công thức dễ làm</p><h1 class="font-['Playfair_Display'] text-[clamp(42px,6vw,76px)] leading-[1.12]">${r.title}</h1><p class="text-[19px] text-[#565a52]">${r.description}</p><img class="my-[30px] h-[280px] w-full object-cover md:h-[450px] rounded-md" src="${r.image}" alt="${r.title}"><div class="my-[30px] grid grid-cols-2 bg-white md:grid-cols-4"><div class="border-r border-[#e7e5df] p-[18px] text-center"><b class="block font-['Playfair_Display'] text-[24px] text-[var(--color-fern-500)]">${r.prepTime}'</b>chuẩn bị</div><div class="p-[18px] text-center md:border-r md:border-[#e7e5df]"><b class="block font-['Playfair_Display'] text-[24px] text-[var(--color-fern-500)]">${r.cookTime}'</b>nấu</div><div class="border-r border-[#e7e5df] p-[18px] text-center"><b class="block font-['Playfair_Display'] text-[24px] text-[var(--color-fern-500)]">${r.servings}</b>khẩu phần</div><div class="p-[18px] text-center"><b class="block font-['Playfair_Display'] text-[24px] text-[var(--color-fern-500)]">${r.calories}</b>kcal / phần</div></div><div class="grid gap-6 md:grid-cols-[1fr_270px] md:gap-[68px]"><div class="[&_h2]:font-['Playfair_Display'] [&_h2]:text-[30px] [&_li]:mb-[10px]"><h2>Nguyên liệu</h2><ul>${r.ingredients.map((x) => `<li>${x}</li>`).join('')}</ul><h2>Cách thực hiện</h2><ol>${r.steps.map((x) => `<li>${x}</li>`).join('')}</ol><h2>Mẹo meal prep</h2><ul>${r.mealPrepTips.map((x) => `<li>${x}</li>`).join('')}</ul></div><aside class="h-max rounded-xl bg-[#e8dfd0] p-[25px] md:sticky md:top-24"><span class="text-[11px] font-bold uppercase tracking-[.12em] text-[var(--color-fern-500)]">Dinh dưỡng tham khảo</span><p><b>${r.protein}g</b> protein<br><b>${r.carbs}g</b> carbs<br><b>${r.fat}g</b> chất béo</p><p>Con số mang tính tham khảo và có thể thay đổi theo nguyên liệu bạn dùng.</p></aside></div>`;
}
async function articlesPage() {
  const articles = await data('articles');
  $('#article-list').innerHTML = articles.map(art).join('');
}
async function articleDetail() {
  const articles = await data('articles'),
    a = articles.find((x) => x.id == new URLSearchParams(location.search).get('id')) || articles[0];
  $('#article-detail').innerHTML =
    `<p class="text-[11px] font-bold uppercase tracking-[.15em] text-[var(--color-fern-500)]">${a.category} · ${a.readTime}</p><h1 class="font-['Playfair_Display'] text-[clamp(42px,6vw,76px)] leading-[1.12]">${a.title}</h1><p class="text-[19px] text-[#565a52]">${a.excerpt}</p><img class="my-[30px] h-[280px] w-full object-cover md:h-[450px] rounded-md" src="${a.image}" alt="${a.title}"><div class="[&_h2]:mt-[42px] [&_h2]:font-['Playfair_Display'] [&_h2]:text-[30px]"><p>${a.content}</p><h2>Điều quan trọng là sự đều đặn</h2><p>Hãy bắt đầu bằng lựa chọn vừa sức với lịch sống của bạn. Một bữa ăn được chuẩn bị sẵn, một chai nước trên bàn làm việc hoặc 10 phút đi bộ cũng là những bước nhỏ đáng giá.</p></div>`;
}
async function prep() {
  const p = (await data('meal-plans'))[0];
  $('#plan-title').textContent = p.title;
  $('#plan-desc').textContent = p.description;
  $('#shopping').innerHTML = p.shopping.map((x) => `<li>${x}</li>`).join('');
  $('#plan-table').innerHTML =
    '<div class="grid min-w-[530px] grid-cols-[90px_repeat(3,1fr)] border-b border-[#e7e5df] py-[17px] text-[13px] font-bold"><span>Ngày</span><span>Bữa sáng</span><span>Bữa trưa</span><span>Bữa tối</span></div>' +
    p.days
      .map((d, i) => `<div class="grid min-w-[530px] grid-cols-[90px_repeat(3,1fr)] border-b border-[#e7e5df] py-[17px] text-[13px] rounded-lg px-2 cursor-default">${d.map((x, j) => `<span class="${j === 0 ? 'font-semibold text-[var(--color-fern-600)]' : ''}">${x}</span>`).join('')}</div>`)
      .join('');
}

layout();
(
  ({ home, recipesPage, recipeDetail, articlesPage, articleDetail, prep })[
    document.body.dataset.page
  ] || (() => {})
)();
