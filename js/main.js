const $ = (s, p = document) => p.querySelector(s);
const $$ = (s, p = document) => [...p.querySelectorAll(s)];
const fmt = (r) =>
  `<article class="bg-white transition duration-200 hover:-translate-y-[5px] hover:shadow-[0_18px_40px_rgba(47,52,45,.09)]"><a href="recipe-detail.html?id=${r.id}"><img class="h-[235px] w-full object-cover" src="${r.image}" alt="${r.title}"><div class="p-5"><span class="text-[11px] font-bold uppercase tracking-[.12em] text-[#78966c]">${r.category}</span><h3 class="my-[7px] mb-[11px] font-['Playfair_Display'] text-[23px] leading-[1.12]">${r.title}</h3><p>${r.description}</p><div class="flex flex-wrap gap-[14px] text-[12px] text-[#74776f]"><span>◷ ${r.prepTime + r.cookTime} phút</span><span>◌ ${r.calories} kcal</span></div></div></a></article>`;
const art = (a) =>
  `<article class="bg-white transition duration-200 hover:-translate-y-[5px] hover:shadow-[0_18px_40px_rgba(47,52,45,.09)]"><a href="article-detail.html?id=${a.id}"><img class="h-[235px] w-full object-cover" src="${a.image}" alt="${a.title}"><div class="p-5"><span class="text-[11px] font-bold uppercase tracking-[.12em] text-[#78966c]">${a.category}</span><h3 class="my-[7px] mb-[11px] font-['Playfair_Display'] text-[23px] leading-[1.12]">${a.title}</h3><p>${a.excerpt}</p><div class="flex flex-wrap gap-[14px] text-[12px] text-[#74776f]"><span>${a.date}</span><span>${a.readTime}</span></div></div></a></article>`;
async function data(name) {
  return fetch(`${name}.json`).then((r) => r.json());
}
function layout() {
  $('.js-menu')?.addEventListener('click', () => $('.js-nav-links').classList.toggle('hidden'));
  $$('.js-signup').forEach((f) =>
    f.addEventListener('submit', (e) => {
      e.preventDefault();
      f.innerHTML = '<strong>Cảm ơn bạn! Hẹn gặp bạn trong bản tin sắp tới.</strong>';
    })
  );
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
    `<p class="text-[11px] font-bold uppercase tracking-[.15em] text-[#78966c]">${r.category} · công thức dễ làm</p><h1 class="font-['Playfair_Display'] text-[clamp(42px,6vw,76px)] leading-[1.12]">${r.title}</h1><p class="text-[19px] text-[#565a52]">${r.description}</p><img class="my-[30px] h-[280px] w-full object-cover md:h-[450px]" src="${r.image}" alt="${r.title}"><div class="my-[30px] grid grid-cols-2 bg-white md:grid-cols-4"><div class="border-r border-[#e7e5df] p-[18px] text-center"><b class="block font-['Playfair_Display'] text-[24px] text-[#78966c]">${r.prepTime}'</b>chuẩn bị</div><div class="p-[18px] text-center md:border-r md:border-[#e7e5df]"><b class="block font-['Playfair_Display'] text-[24px] text-[#78966c]">${r.cookTime}'</b>nấu</div><div class="border-r border-[#e7e5df] p-[18px] text-center"><b class="block font-['Playfair_Display'] text-[24px] text-[#78966c]">${r.servings}</b>khẩu phần</div><div class="p-[18px] text-center"><b class="block font-['Playfair_Display'] text-[24px] text-[#78966c]">${r.calories}</b>kcal / phần</div></div><div class="grid gap-6 md:grid-cols-[1fr_270px] md:gap-[68px]"><div class="[&_h2]:mt-[42px] [&_h2]:font-['Playfair_Display'] [&_h2]:text-[30px] [&_li]:mb-[10px]"><h2>Nguyên liệu</h2><ul>${r.ingredients.map((x) => `<li>${x}</li>`).join('')}</ul><h2>Cách thực hiện</h2><ol>${r.steps.map((x) => `<li>${x}</li>`).join('')}</ol><h2>Mẹo meal prep</h2><ul>${r.mealPrepTips.map((x) => `<li>${x}</li>`).join('')}</ul></div><aside class="h-max bg-[#e8dfd0] p-[25px]"><span class="text-[11px] font-bold uppercase tracking-[.12em] text-[#78966c]">Dinh dưỡng tham khảo</span><p><b>${r.protein}g</b> protein<br><b>${r.carbs}g</b> carbs<br><b>${r.fat}g</b> chất béo</p><p>Con số mang tính tham khảo và có thể thay đổi theo nguyên liệu bạn dùng.</p></aside></div>`;
}
async function articlesPage() {
  const articles = await data('articles');
  $('#article-list').innerHTML = articles.map(art).join('');
}
async function articleDetail() {
  const articles = await data('articles'),
    a = articles.find((x) => x.id == new URLSearchParams(location.search).get('id')) || articles[0];
  $('#article-detail').innerHTML =
    `<p class="text-[11px] font-bold uppercase tracking-[.15em] text-[#78966c]">${a.category} · ${a.readTime}</p><h1 class="font-['Playfair_Display'] text-[clamp(42px,6vw,76px)] leading-[1.12]">${a.title}</h1><p class="text-[19px] text-[#565a52]">${a.excerpt}</p><img class="my-[30px] h-[280px] w-full object-cover md:h-[450px]" src="${a.image}" alt="${a.title}"><div class="[&_h2]:mt-[42px] [&_h2]:font-['Playfair_Display'] [&_h2]:text-[30px]"><p>${a.content}</p><h2>Điều quan trọng là sự đều đặn</h2><p>Hãy bắt đầu bằng lựa chọn vừa sức với lịch sống của bạn. Một bữa ăn được chuẩn bị sẵn, một chai nước trên bàn làm việc hoặc 10 phút đi bộ cũng là những bước nhỏ đáng giá.</p></div>`;
}
async function prep() {
  const p = (await data('meal-plans'))[0];
  $('#plan-title').textContent = p.title;
  $('#plan-desc').textContent = p.description;
  $('#shopping').innerHTML = p.shopping.map((x) => `<li>${x}</li>`).join('');
  $('#plan-table').innerHTML =
    '<div class="grid min-w-[530px] grid-cols-[90px_repeat(3,1fr)] border-b border-[#e7e5df] py-[17px] text-[13px] font-bold text-[#78966c]"><span>Ngày</span><span>Bữa sáng</span><span>Bữa trưa</span><span>Bữa tối</span></div>' +
    p.days
      .map((d) => `<div class="grid min-w-[530px] grid-cols-[90px_repeat(3,1fr)] border-b border-[#e7e5df] py-[17px] text-[13px]">${d.map((x) => `<span>${x}</span>`).join('')}</div>`)
      .join('');
}
layout();
(
  ({ home, recipesPage, recipeDetail, articlesPage, articleDetail, prep })[
    document.body.dataset.page
  ] || (() => {})
)();
