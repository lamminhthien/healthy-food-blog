import fallbackImage from '../assets/images/recipe-placeholder.svg';

const $ = (s, p = document) => p.querySelector(s);
const $$ = (s, p = document) => [...p.querySelectorAll(s)];
const imageSrc = (src) => src || fallbackImage;
const imageFallback = `onerror="this.onerror=null;this.src='${fallbackImage}'"`;
const fmt = (r) =>
  `<article class="card"><a href="recipe-detail.html?id=${r.id}" class="block"><div class="overflow-hidden"><img class="h-[235px] w-full object-cover" src="${imageSrc(r.image)}" ${imageFallback} alt="${r.title}"></div><div class="p-5"><span class="chip">${r.category}</span><h3 class="mt-[10px] mb-[8px] font-['Playfair_Display'] text-[22px] leading-[1.18] line-clamp-2">${r.title}</h3><p class="text-[14px] text-[#565a52] line-clamp-2">${r.description}</p><div class="mt-3 flex flex-wrap items-center gap-x-[12px] gap-y-1 text-[12px] text-[#74776f] border-t border-[#f0ede8] pt-3"><span>⏱ ${r.prepTime + r.cookTime} phút</span><span>🔥 ${r.calories} kcal</span></div></div></a></article>`;
const art = (a) =>
  `<article class="card"><a href="article-detail.html?id=${a.id}" class="block"><div class="overflow-hidden"><img class="h-[235px] w-full object-cover" src="${imageSrc(a.image)}" ${imageFallback} alt="${a.title}"></div><div class="p-5"><span class="chip">${a.category}</span><h3 class="mt-[10px] mb-[8px] font-['Playfair_Display'] text-[22px] leading-[1.18] line-clamp-2">${a.title}</h3><p class="text-[14px] text-[#565a52] line-clamp-2">${a.excerpt}</p><div class="mt-3 flex flex-wrap items-center gap-x-[12px] gap-y-1 text-[12px] text-[#74776f] border-t border-[#f0ede8] pt-3"><span>📅 ${a.date}</span><span>📖 ${a.readTime}</span></div></div></a></article>`;

async function data(name) {
  return fetch(`${name}.json`, { cache: 'no-store' }).then((r) => r.json());
}
function layout() {
  const menu = $('.js-menu');
  const navLinks = $('.js-nav-links');
  if (!menu || !navLinks) return;
  const isMobile = () => window.matchMedia('(max-width: 767px)').matches;
  const syncNav = () => {
    if (!isMobile()) {
      navLinks.classList.remove('hidden');
      menu.setAttribute('aria-expanded', 'true');
    } else {
      navLinks.classList.add('hidden');
      menu.setAttribute('aria-expanded', 'false');
    }
  };
  syncNav();
  window.addEventListener('resize', syncNav);
  menu.addEventListener('click', () => {
    if (!isMobile()) return;
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
function detailDefaults(r) {
  const profile = {
    'Bữa sáng': {
      tags: ['Bữa sáng lành mạnh', 'Năng lượng bền vững'],
      why: ['Dễ chuẩn bị với các nguyên liệu gần gũi trong căn bếp.', `Mỗi phần có ${r.protein}g protein, giúp bạn no lâu hơn vào buổi sáng.`, 'Có thể chuẩn bị trước để buổi sáng bận rộn vẫn ăn uống tử tế.'],
      variations: ['Đổi trái cây hoặc rau củ theo mùa để món ăn luôn mới mẻ.', 'Điều chỉnh lượng gia vị hoặc topping theo khẩu vị của bạn.'],
      serving: 'Dùng ngay khi còn ấm hoặc ăn cùng trái cây tươi và một ly nước. Nếu cần bữa sáng no hơn, thêm một lát bánh mì nguyên cám.',
      tips: ['Chuẩn bị sẵn nguyên liệu từ tối hôm trước để rút ngắn thời gian buổi sáng.', 'Nêm nếm vừa phải để hương vị tự nhiên của nguyên liệu vẫn nổi bật.'],
      faqs: [['Có thể làm trước không?', 'Có. Hãy chia thành từng phần, làm nguội hẳn và giữ trong hộp kín ở ngăn mát.'], ['Có thể thay nguyên liệu không?', 'Hoàn toàn có thể. Chọn nguyên liệu cùng nhóm và điều chỉnh gia vị cho phù hợp.']]
    },
    'Bữa trưa': {
      tags: ['Bữa trưa cân bằng', 'Phù hợp mang đi'],
      why: ['Kết hợp rau củ, tinh bột và protein trong một phần ăn cân bằng.', `Với ${r.calories} kcal mỗi phần, món ăn phù hợp cho một buổi trưa đủ năng lượng.`, 'Dễ chia hộp để mang đi học hoặc đi làm.'],
      variations: ['Thay loại rau bằng nguyên liệu theo mùa để giữ độ tươi ngon.', 'Dùng cơm gạo lứt, quinoa hoặc khoai lang tùy nhu cầu năng lượng.'],
      serving: 'Chia món thành từng hộp riêng. Khi mang đi, để phần sốt hoặc topping giòn trong hộp nhỏ và trộn ngay trước khi ăn.',
      tips: ['Để các nguyên liệu nóng nguội bớt trước khi đóng hộp để tránh làm rau bị úng.', 'Nếm lại phần sốt sau khi bảo quản vì gia vị có thể dịu đi khi để lạnh.'],
      faqs: [['Có thể meal prep bao lâu?', 'Phần lớn món trưa ngon nhất trong 2–3 ngày khi bảo quản lạnh đúng cách.'], ['Hâm nóng thế nào?', 'Chỉ hâm phần cơm hoặc protein; rau tươi và sốt nên thêm sau khi hâm.']]
    },
    'Bữa tối': {
      tags: ['Bữa tối đủ đầy', 'Dễ nấu tại nhà'],
      why: ['Hương vị ấm áp, dễ ăn và phù hợp cho một bữa tối tại nhà.', `Cung cấp ${r.protein}g protein mỗi phần để bữa ăn vẫn đủ chất mà không nặng bụng.`, 'Các bước làm rõ ràng, không cần kỹ thuật nấu nướng phức tạp.'],
      variations: ['Thay rau củ bằng các loại rau đang có sẵn trong tủ lạnh.', 'Tăng hoặc giảm lượng tinh bột theo mức độ vận động trong ngày.'],
      serving: 'Dùng nóng ngay sau khi nấu. Ghép cùng một phần rau xanh hoặc salad chua nhẹ để hương vị cân bằng hơn.',
      tips: ['Chuẩn bị và cắt sẵn toàn bộ nguyên liệu trước khi bật bếp.', 'Nấu vừa chín tới để rau củ còn màu sắc và độ giòn tự nhiên.'],
      faqs: [['Có thể nấu trước không?', 'Có. Để nguội hoàn toàn rồi bảo quản trong hộp kín; hâm nóng nhẹ trước khi dùng.'], ['Làm sao để món không bị khô?', 'Không hâm quá lâu và thêm một thìa nước, nước dùng hoặc sốt khi cần.']]
    },
    'Ăn nhẹ': {
      tags: ['Ăn nhẹ lành mạnh', 'Nhanh gọn'],
      why: ['Phần ăn nhỏ gọn, phù hợp giữa hai bữa chính hoặc sau khi vận động.', 'Nguyên liệu đơn giản, dễ chuẩn bị và dễ mang theo.', `Mỗi phần khoảng ${r.calories} kcal, vừa đủ để nạp thêm năng lượng.`],
      variations: ['Đổi hạt, trái cây hoặc topping để tạo hương vị mới.', 'Giảm vị ngọt bằng cách dùng trái cây chín tự nhiên thay cho đường.'],
      serving: 'Dùng như món ăn nhẹ giữa buổi. Ghép cùng trà nóng, cà phê không đường hoặc sữa chua để no lâu hơn.',
      tips: ['Chia sẵn thành từng phần nhỏ để dễ kiểm soát khẩu phần.', 'Ưu tiên hộp kín để món giữ được độ tươi, giòn hoặc mềm đúng ý.'],
      faqs: [['Có thể mang đi không?', 'Có. Chọn hộp kín hoặc túi giữ lạnh nếu món có sữa chua, trái cây hay thành phần tươi.'], ['Có thể thay topping không?', 'Có. Dùng hạt, trái cây hoặc gia vị có sẵn, nhưng nên giữ khẩu phần vừa phải.']]
    }
  }[r.category];
  return {
    tags: r.tags || profile.tags,
    intro: r.intro || `${r.title} là một lựa chọn ${r.category.toLowerCase()} tươi ngon, được xây dựng từ ${r.ingredients.slice(0, 2).join(' và ').toLowerCase()}. ${r.description} Món ăn phù hợp với nhịp sống bận rộn nhưng vẫn ưu tiên nguyên liệu thật và khẩu phần cân bằng.`,
    why: r.whyItWorks || profile.why,
    variations: r.variations || profile.variations,
    storage: r.storage || 'Để món ăn nguội hoàn toàn trước khi cất trong hộp kín. Bảo quản ngăn mát 2–3 ngày; với món có rau tươi hoặc trái cây, nên dùng sớm để giữ độ ngon.',
    notes: r.notes || 'Chuẩn bị sẵn nguyên liệu và nêm nếm từng chút một. Điều này giúp bạn dễ kiểm soát cả hương vị lẫn độ chín của món.',
    serving: r.servingSuggestions || profile.serving,
    tips: r.tips || profile.tips,
    faqs: r.faqs || profile.faqs
  };
}
async function recipeDetail() {
  const recipes = await data('recipes'), r = recipes.find((x) => x.id == new URLSearchParams(location.search).get('id')) || recipes[0], d = detailDefaults(r);
  document.title = `${r.title} — Nhà bếp của Lyn`;
  const list = (items) => `<ul>${items.map((x) => `<li>${x}</li>`).join('')}</ul>`;
  $('#recipe-detail').innerHTML =
    `<p class="text-[11px] font-bold uppercase tracking-[.15em] text-[var(--color-fern-500)]">${r.category} · ${r.difficulty || 'Dễ làm'} · ${r.prepTime + r.cookTime} phút</p><h1 class="font-['Playfair_Display'] text-[clamp(42px,6vw,76px)] leading-[1.12]">${r.title}</h1><p class="text-[19px] text-[#565a52]">${r.description}</p><div class="mt-5 flex flex-wrap gap-2">${d.tags.map((tag) => `<span class="chip">${tag}</span>`).join('')}</div><img class="my-[30px] h-[280px] w-full object-cover md:h-[450px] rounded-md" src="${imageSrc(r.image)}" ${imageFallback} alt="${r.title}"><div class="my-[30px] grid grid-cols-2 bg-white md:grid-cols-4"><div class="border-r border-[#e7e5df] p-[18px] text-center"><b class="block font-['Playfair_Display'] text-[24px] text-[var(--color-fern-500)]">${r.prepTime}'</b>chuẩn bị</div><div class="p-[18px] text-center md:border-r md:border-[#e7e5df]"><b class="block font-['Playfair_Display'] text-[24px] text-[var(--color-fern-500)]">${r.cookTime}'</b>nấu</div><div class="border-r border-[#e7e5df] p-[18px] text-center"><b class="block font-['Playfair_Display'] text-[24px] text-[var(--color-fern-500)]">${r.servings}</b>khẩu phần</div><div class="p-[18px] text-center"><b class="block font-['Playfair_Display'] text-[24px] text-[var(--color-fern-500)]">${r.calories}</b>kcal / phần</div></div><div class="grid gap-6 md:grid-cols-[1fr_270px] md:gap-[68px]"><div class="[&_h2]:mt-10 [&_h2]:font-['Playfair_Display'] [&_h2]:text-[30px] [&_li]:mb-[10px]"><h2 class="!mt-0">Về món này</h2><p>${d.intro}</p><h2>Vì sao bạn sẽ thích</h2>${list(d.why)}<h2>Nguyên liệu bạn cần</h2><p>Ưu tiên nguyên liệu tươi; bạn có thể thay thế linh hoạt nhưng nên giữ tỷ lệ tương tự để món vẫn cân bằng.</p>${list(r.ingredients)}<h2>Hướng dẫn từng bước</h2><ol>${r.steps.map((x, i) => `<li><b>Bước ${i + 1}: </b>${x}</li>`).join('')}</ol><h2>Biến tấu theo ý thích</h2>${list(d.variations)}<h2>Gợi ý dùng món</h2><p>${d.serving}</p><h2>Mẹo để món ngon hơn</h2>${list(d.tips)}<h2>Meal prep, bảo quản & hâm nóng</h2>${list(r.mealPrepTips)}<p>${d.storage}</p><div class="mt-8 rounded-xl bg-[#f1f4ed] p-5"><b class="text-[var(--color-fern-600)]">Lưu ý từ Lyn</b><p class="mt-2">${d.notes}</p></div><h2>Câu hỏi thường gặp</h2><div class="space-y-3">${d.faqs.map(([question, answer]) => `<details class="rounded-lg border border-[#e7e5df] bg-white px-4 py-3"><summary class="cursor-pointer font-semibold">${question}</summary><p class="mt-2 text-[#565a52]">${answer}</p></details>`).join('')}</div></div><aside class="h-max rounded-xl bg-[#e8dfd0] p-[25px] md:sticky md:top-24"><span class="text-[11px] font-bold uppercase tracking-[.12em] text-[var(--color-fern-500)]">Dinh dưỡng tham khảo</span><p><b>${r.protein}g</b> protein<br><b>${r.carbs}g</b> carbs<br><b>${r.fat}g</b> chất béo</p><p>Con số mang tính tham khảo và có thể thay đổi theo nguyên liệu bạn dùng.</p></aside></div>`;
}
async function articlesPage() {
  const articles = await data('articles');
  $('#article-list').innerHTML = articles.map(art).join('');
}
async function articleDetail() {
  const articles = await data('articles'),
    a = articles.find((x) => x.id == new URLSearchParams(location.search).get('id')) || articles[0];
  $('#article-detail').innerHTML =
    `<p class="text-[11px] font-bold uppercase tracking-[.15em] text-[var(--color-fern-500)]">${a.category} · ${a.readTime}</p><h1 class="font-['Playfair_Display'] text-[clamp(42px,6vw,76px)] leading-[1.12]">${a.title}</h1><p class="text-[19px] text-[#565a52]">${a.excerpt}</p><img class="my-[30px] h-[280px] w-full object-cover md:h-[450px] rounded-md" src="${imageSrc(a.image)}" ${imageFallback} alt="${a.title}"><div class="[&_h2]:mt-[42px] [&_h2]:font-['Playfair_Display'] [&_h2]:text-[30px]"><p>${a.content}</p><h2>Điều quan trọng là sự đều đặn</h2><p>Hãy bắt đầu bằng lựa chọn vừa sức với lịch sống của bạn. Một bữa ăn được chuẩn bị sẵn, một chai nước trên bàn làm việc hoặc 10 phút đi bộ cũng là những bước nhỏ đáng giá.</p></div>`;
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
