// BiblioHub Static — app.js
// Books are hard-coded in HTML. This file handles filtering, sorting, bookmarks, modal.

// ─── Book Data (for modal details) ────────────────────────────────
const BOOKS_DATA = {
  1:  { title:"Fundamentals of Electrical Engineering", author:"Charles Hayt", cat:"Engineering", fmt:"PDF", rating:4.8, pages:782, year:2023, badge:"hot", free:true, tags:["circuits","electronics","signals"], desc:"A comprehensive introduction to electrical engineering principles, covering circuit analysis, electromagnetism, and signal processing for undergraduate students.", icon:"⚡", accent:"#60a5fa", dir:"book-detail.html",pdfUrl:"uploads/books/Fundamentals_of_Electrical_Engineering.pdf",pdfName:"Fundamentals-of-electrical-engineering.pdf" },
  2:  { title:"Structural Analysis", author:"R.C. Hibbeler", cat:"Engineering", fmt:"PDF", rating:4.7, pages:622, year:2022, badge:"", free:true, tags:["structures","mechanics","beams"], desc:"Master the fundamentals of structural analysis with clear explanations, worked examples, and real-world applications in civil and structural engineering.", icon:"🏗️", accent:"#e8a44a", dir:"book-detail.html?id=2",pdfUrl:"uploads/books/Structural_Analysis.pdf",pdfName:"Structural-analysis.pdf"  },
  3:  { title:"Thermodynamics: An Engineering Approach", author:"Cengel & Boles", cat:"Engineering", fmt:"PDF", rating:4.9, pages:1008, year:2023, badge:"hot", free:true, tags:["heat","energy","systems"], desc:"The gold standard textbook for thermodynamics, featuring comprehensive coverage of energy systems, heat transfer, and entropy with engineering applications.", icon:"🌡️", accent:"#f87171", dir:"book-detail.html?id=3",pdfUrl:"uploads/books/Thermodynamics_An_Engineering_Approach.pdf",pdfName:"Thermodynamics_An_Engineering_Approach.pdf"  },
  4:  { title:"Engineering Mechanics: Dynamics", author:"Meriam & Kraige", cat:"Engineering", fmt:"PDF", rating:4.5, pages:584, year:2021, badge:"", free:true, tags:["dynamics","motion","forces"], desc:"Rigorous treatment of dynamics and kinematics with emphasis on problem-solving methodology and practical engineering applications.", icon:"🔧", accent:"#4ade80", dir:"book-detail.html?id=4",pdfUrl:"uploads/books/ENGINEERING_MECHANICS_DYNAMICS.pdf",pdfName:"ENGINEERING_MECHANICS_DYNAMICS.pdf"  },
  5:  { title:"Materials Science & Engineering", author:"Callister & Rethwisch", cat:"Engineering", fmt:"PDF", rating:4.6, pages:896, year:2022, badge:"new", free:true, tags:["materials","properties","metals"], desc:"Explores the relationships between microstructure and properties of engineering materials including metals, polymers, ceramics, and composites.", icon:"🔩", accent:"#a78bfa", dir:"book-detail.html?id=5",pdfUrl:"uploads/books/Materials_Science_and_Engineering.pdf",pdfName:"Materials_Science_and_Engineering.pdf"  },
  6:  { title:"Fluid Mechanics", author:"Frank White", cat:"Engineering", fmt:"EPUB", rating:4.4, pages:776, year:2021, badge:"", free:true, tags:["fluids","flow","pressure"], desc:"Complete treatment of fluid statics and dynamics, turbomachinery, and compressible flow with engineering design perspective.", icon:"💧", accent:"#60a5fa", dir:"book-detail.html?id=6",pdfUrl:"uploads/books/fluid_mechanics.pdf",pdfName:"fluid_mechanics.pdf"  },
  7:  { title:"Control Systems Engineering", author:"Norman Nise", cat:"Engineering", fmt:"PDF", rating:4.7, pages:944, year:2023, badge:"new", free:false, tags:["control","systems","feedback"], desc:"Comprehensive introduction to control systems theory with emphasis on design, analysis, and practical implementation using MATLAB.", icon:"🎛️", accent:"#4ade80", dir:"book-detail.html?id=7",pdfUrl:"uploads/books/control_systems_and_engineering.pdf",pdfName:"control_systems_and_engineering.pdf"  },
  8:  { title:"A Brief History of Time", author:"Stephen Hawking", cat:"Science", fmt:"EPUB", rating:4.9, pages:212, year:2020, badge:"hot", free:true, tags:["cosmology","physics","universe"], desc:"The landmark book that made cosmology accessible to millions. Hawking's masterpiece covering black holes, the Big Bang, and the nature of time.", icon:"🌌", accent:"#60a5fa", dir:"book-detail.html?id=8",pdfUrl:"uploads/books/stephen_hawking_a_brief_history_of_time.pdf.pdf",pdfName:"stephen_hawking_a_brief_history_of_time.pdf.pdf"  },
  9:  { title:"The Selfish Gene", author:"Richard Dawkins", cat:"Science", fmt:"PDF", rating:4.8, pages:360, year:2021, badge:"", free:true, tags:["evolution","genetics","biology"], desc:"Dawkins' revolutionary exploration of evolution from a gene-centric perspective that transformed our understanding of natural selection.", icon:"🧬", accent:"#4ade80", dir:"book-detail.html?id=9",pdfUrl:"uploads/books/the-selfish-gene.pdf",pdfName:"the-selfish-gene.pdf"  },
  10: { title:"Cosmos", author:"Carl Sagan", cat:"Science", fmt:"EPUB", rating:4.9, pages:365, year:2020, badge:"hot", free:true, tags:["astronomy","universe","history"], desc:"Sagan's timeless journey through the universe, exploring the nature of science, the history of astronomy, and humanity's place in the cosmos.", icon:"🪐", accent:"#a78bfa", dir:"book-detail.html?id=10",pdfUrl:"uploads/books/cosmos.pdf",pdfName:"cosmos.pdf"  },
  11: { title:"The Double Helix", author:"James Watson", cat:"Science", fmt:"PDF", rating:4.6, pages:226, year:2021, badge:"", free:true, tags:["DNA","biology","history"], desc:"A personal and controversial account of the discovery of the structure of DNA — one of the most important scientific breakthroughs of the 20th century.", icon:"🔬", accent:"#f87171", dir:"book-detail.html?id=11",pdfUrl:"uploads/books/the-double-helix.pdf",pdfName:"the-double-helix.pdf"  },
  12: { title:"Feynman Lectures on Physics", author:"Richard Feynman", cat:"Science", fmt:"Article", rating:5.0, pages:1552, year:2022, badge:"hot", free:true, tags:["physics","quantum","electromagnetism"], desc:"The legendary lecture series from Nobel laureate Feynman — the definitive introduction to physics, freely available online.", icon:"⚛️", accent:"#e8a44a", dir:"book-detail.html?id=12",pdfUrl:"uploads/books/The_Feynman_Lectures_on_Physics_Vol_II_E.pdf",pdfName:"The_Feynman_Lectures_on_Physics_Vol_II_E.pdf"  },
  13: { title:"Six Easy Pieces", author:"Richard Feynman", cat:"Science", fmt:"EPUB", rating:4.7, pages:176, year:2022, badge:"new", free:false, tags:["physics","popular science","atoms"], desc:"The most accessible introductions to physics from the greatest teacher — six chapters from the Feynman Lectures for the general reader.", icon:"🔭", accent:"#60a5fa", dir:"book-detail.html?id=13",pdfUrl:"uploads/books/Six_Easy_Pieces.pdf",pdfName:"Six_Easy_Pieces.pdf"  },
  14: { title:"Clean Code", author:"Robert C. Martin", cat:"Programming", fmt:"PDF", rating:4.8, pages:431, year:2023, badge:"hot", free:true, tags:["best practices","refactoring","craftsmanship"], desc:"A handbook of agile software craftsmanship. The essential guide to writing clean, readable, maintainable code that professional developers swear by.", icon:"💻", accent:"#e8e8e8", dir:"book-detail.html?id=14",pdfUrl:"uploads/books/Clean_code.pdf",pdfName:"Clean_code.pdf"  },
  15: { title:"The Pragmatic Programmer", author:"Hunt & Thomas", cat:"Programming", fmt:"PDF", rating:4.9, pages:352, year:2023, badge:"", free:true, tags:["career","philosophy","tools"], desc:"Your journey to mastery in software development. Timeless advice on career development, tools, techniques, and the philosophy of pragmatic programming.", icon:"🛠️", accent:"#4ade80", dir:"book-detail.html?id=15",pdfUrl:"uploads/books/The_Pragmatic_Programmer.pdf",pdfName:"The_Pragmatic_Programmer.pdf"  },
  16: { title:"Design Patterns", author:"Gang of Four", cat:"Programming", fmt:"EPUB", rating:4.7, pages:395, year:2020, badge:"", free:true, tags:["patterns","OOP","architecture"], desc:"The legendary catalog of reusable object-oriented design patterns that remains essential reading for every serious software engineer.", icon:"🏛️", accent:"#a78bfa", dir:"book-detail.html?id=16",pdfUrl:"uploads/books/desigh_patterns.pdf",pdfName:"desigh_patterns.pdf"  },
  17: { title:"Introduction to Algorithms", author:"CLRS", cat:"Programming", fmt:"PDF", rating:4.8, pages:1312, year:2022, badge:"hot", free:true, tags:["algorithms","data structures","theory"], desc:"The definitive textbook on algorithms — comprehensive, rigorous, and authoritative. Known universally as 'CLRS', an essential reference.", icon:"📊", accent:"#60a5fa", dir:"book-detail.html?id=17",pdfUrl:"uploads/books/introduction_to_Algorithms.pdf",pdfName:"introduction_to_Algorithms.pdf"  },
  18: { title:"You Don't Know JS", author:"Kyle Simpson", cat:"Programming", fmt:"Article", rating:4.6, pages:278, year:2023, badge:"new", free:true, tags:["JavaScript","web","async"], desc:"A series that dives deep into the core mechanisms of the JavaScript language, covering scope, closures, types, syntax, and async patterns.", icon:"🌐", accent:"#e8a44a", dir:"book-detail.html?id=18",pdfUrl:"uploads/books/You_don't_know_js.pdf",pdfName:"You_don't_know_js.pdf"  },
  19: { title:"Python Crash Course", author:"Eric Matthes", cat:"Programming", fmt:"PDF", rating:4.5, pages:544, year:2023, badge:"new", free:false, tags:["Python","beginner","projects"], desc:"A hands-on, project-based introduction to programming using Python. Build games, data visualizations, and web applications.", icon:"🐍", accent:"#4ade80", dir:"book-detail.html?id=19",pdfUrl:"uploads/books/Python-Crash-Course.pdf",pdfName:"Python-Crash-Course.pdf"  },
  20: { title:"Calculus: Early Transcendentals", author:"James Stewart", cat:"Mathematics", fmt:"PDF", rating:4.8, pages:1368, year:2023, badge:"", free:true, tags:["calculus","limits","integrals"], desc:"The most widely used calculus textbook in the world, known for its clarity of exposition and excellent problem sets.", icon:"∫", accent:"#a78bfa", dir:"book-detail.html?id=20",pdfUrl:"uploads/books/calculus.pdf",pdfName:"calculus_Early_Transcendentals.pdf"  },
  21: { title:"Linear Algebra Done Right", author:"Sheldon Axler", cat:"Mathematics", fmt:"PDF", rating:4.9, pages:340, year:2022, badge:"hot", free:true, tags:["linear algebra","vectors","matrices"], desc:"A fresh approach to linear algebra that focuses on linear maps rather than matrix computations, with elegant proofs and insights.", icon:"📐", accent:"#e8a44a", dir:"book-detail.html?id=21",pdfUrl:"uploads/books/Linear_Algebra.pdf",pdfName:"Linear_Algebra_done_right.pdf"  },
  22: { title:"Introduction to Probability", author:"Bertsekas & Tsitsiklis", cat:"Mathematics", fmt:"EPUB", rating:4.7, pages:544, year:2022, badge:"", free:true, tags:["probability","statistics","random"], desc:"A rigorous yet accessible introduction to probability theory and its applications in engineering, science, and computer science.", icon:"🎲", accent:"#4ade80", dir:"book-detail.html?id=22",pdfUrl:"uploads/books/introduction_to_probability.pdf",pdfName:"introduction_to_probability.pdf"  },
  23: { title:"Number Theory", author:"Niven, Zuckerman & Montgomery", cat:"Mathematics", fmt:"PDF", rating:4.6, pages:544, year:2021, badge:"", free:true, tags:["number theory","primes","proofs"], desc:"A classic introduction to number theory covering divisibility, congruences, quadratic residues, Diophantine equations, and more.", icon:"🔢", accent:"#f87171", dir:"book-detail.html?id=23",pdfUrl:"uploads/books/Number_Theory.pdf",pdfName:"Number_Theory.pdf"  },
  24: { title:"Graph Theory", author:"Diestel", cat:"Mathematics", fmt:"PDF", rating:4.8, pages:428, year:2023, badge:"new", free:true, tags:["graphs","algorithms","combinatorics"], desc:"A comprehensive and elegant treatment of graph theory from fundamentals to advanced topics, freely available online.", icon:"🕸️", accent:"#60a5fa", dir:"book-detail.html?id=24",pdfUrl:"uploads/books/graph_theory_book_diestel.pdf",pdfName:"graph_theory_book_diestel.pdf"  }
};

const CAT_COLORS = {
  Engineering: "#60a5fa",
  Science: "#4ade80",
  Programming: "#a78bfa",
  Mathematics: "#f87171"
};

// ─── State ────────────────────────────────────────────────────────
let currentCat    = 'All';
let currentRating = 0;
let activeFormats = ['PDF', 'EPUB', 'Video', 'Article'];
let currentView   = 'grid';
let quickFilters  = { new: false, hot: false, free: false };
let bookmarks     = new Set();
let sortMode      = 'default';
let searchQuery   = '';
let toastTimer;

// ─── Init ─────────────────────────────────────────────────────────
(function init() {
  loadBookmarks();
  updateBmCount();
  applyFilters();
})();

// ─── Bookmarks ────────────────────────────────────────────────────
function loadBookmarks() {
  try {
    const s = localStorage.getItem('bibliohub_bm_static');
    if (s) JSON.parse(s).forEach(id => bookmarks.add(Number(id)));
    updateBmIcons();
  } catch (e) {}
}

function saveBookmarks() {
  try { localStorage.setItem('bibliohub_bm_static', JSON.stringify([...bookmarks])); } catch (e) {}
}

function updateBmIcons() {
  document.querySelectorAll('.bm-btn').forEach(btn => {
    const id = Number(btn.closest('[data-id]')?.dataset.id);
    if (!id) return;
    btn.textContent = bookmarks.has(id) ? '🔖' : '🏷';
    btn.classList.toggle('bookmarked', bookmarks.has(id));
  });
}

function toggleBookmark(id, e) {
  if (e) e.stopPropagation();
  id = Number(id);
  if (bookmarks.has(id)) {
    bookmarks.delete(id);
    showToast('📖', 'Bookmark removed');
  } else {
    bookmarks.add(id);
    showToast('🔖', 'Bookmarked!');
  }
  saveBookmarks();
  updateBmCount();
  updateBmIcons();
  renderBmView();
}

// ─── PDF View / Download Handlers ─────────────────────────────────
// View button → opens the PDF file directly.
// Download button → downloads the PDF file directly.
function getBookPdfUrl(b) {
  if (!b) return '';
  return b.pdfUrl || b.pdfData || b.link || b.readLink || '';
}

function safePdfName(b) {
  return (b.pdfName || (b.title || 'book') + '.pdf').replace(/[\\/:*?"<>|]/g, '-');
}

function handleView(id, e) {
  if (e) { e.preventDefault(); e.stopPropagation(); }
  const b = BOOKS_DATA[Number(id)];
  const url = getBookPdfUrl(b);

  if (!url) {
    showToast('⚠️', 'No PDF file is available for this book');
    return;
  }

  window.open(url, '_blank', 'noopener');
}

function handleDownload(id, e) {
  if (e) { e.preventDefault(); e.stopPropagation(); }
  const b = BOOKS_DATA[Number(id)];
  const url = getBookPdfUrl(b);

  if (!url) {
    showToast('⚠️', 'No PDF file is available for this book');
    return;
  }

  const a = document.createElement('a');
  a.href = url;
  a.download = safePdfName(b);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  showToast('⬇', 'Downloading ' + b.title + '…');
}

function updateBmCount() {
  const n = bookmarks.size;
  document.getElementById('bmCount').textContent = n;
  const statBm = document.getElementById('statBm');
  if (statBm) statBm.textContent = n;
}

// ─── Filtering ────────────────────────────────────────────────────
function applyFilters() {
  const cards = document.querySelectorAll('#bookGrid .book-card');
  let visible = 0;

  // Collect all card elements into sortable array
  const cardArr = [...cards];

  // Sort first
  const grid = document.getElementById('bookGrid');
  grid.className = currentView === 'list' ? 'book-grid list' : 'book-grid';

  if (sortMode !== 'default') {
    cardArr.sort((a, b) => {
      const idA = Number(a.dataset.id), idB = Number(b.dataset.id);
      const dA = BOOKS_DATA[idA], dB = BOOKS_DATA[idB];
      if (sortMode === 'rating') return dB.rating - dA.rating;
      if (sortMode === 'title') return dA.title.localeCompare(dB.title);
      if (sortMode === 'newest') return dB.year - dA.year;
      return 0;
    });
    cardArr.forEach(c => grid.appendChild(c));
  }

  cardArr.forEach(card => {
    const id     = Number(card.dataset.id);
    const cat    = card.dataset.cat;
    const fmt    = card.dataset.fmt;
    const rating = parseFloat(card.dataset.rating);
    const badge  = card.dataset.badge;
    const free   = card.dataset.free === 'true';
    const tags   = card.dataset.tags || '';
    const title  = card.querySelector('.book-title')?.textContent.toLowerCase() || '';
    const author = card.querySelector('.book-author')?.textContent.toLowerCase() || '';

    let show = true;
    if (currentCat !== 'All' && cat !== currentCat) show = false;
    if (currentRating > 0 && rating < currentRating) show = false;
    if (!activeFormats.includes(fmt)) show = false;
    if (quickFilters.new && badge !== 'new') show = false;
    if (quickFilters.hot && badge !== 'hot') show = false;
    if (quickFilters.free && !free) show = false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (!title.includes(q) && !author.includes(q) && !tags.includes(q)) show = false;
    }

    card.classList.toggle('hidden', !show);
    if (show) visible++;
  });

  const rc = document.getElementById('resultsCount');
  const sf = document.getElementById('statFiltered');
  if (rc) rc.textContent = visible;
  if (sf) sf.textContent = visible;
}

// ─── Filter Controls ──────────────────────────────────────────────
function setCategory(cat) {
  currentCat = cat;
  document.querySelectorAll('[data-cat]').forEach(el =>
    el.classList.toggle('active', el.dataset.cat === cat)
  );
  document.querySelectorAll('.pill').forEach(p =>
    p.classList.toggle('active', p.textContent.trim().includes(cat === 'All' ? 'All' : cat))
  );
  applyFilters();
}

function setPill(el, cat) {
  currentCat = cat;
  document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
  el.classList.add('active');
  document.querySelectorAll('[data-cat]').forEach(e =>
    e.classList.toggle('active', e.dataset.cat === cat)
  );
  applyFilters();
}

function filterBooks() {
  searchQuery = document.getElementById('searchInput').value.trim();
  applyFilters();
}

function sortBooks(v) {
  sortMode = v;
  applyFilters();
}

function setView(v) {
  currentView = v;
  document.getElementById('gridBtn').classList.toggle('active', v === 'grid');
  document.getElementById('listBtn').classList.toggle('active', v === 'list');
  applyFilters();
}

function toggleFormat(el, fmt) {
  if (activeFormats.includes(fmt)) {
    if (activeFormats.length === 1) return;
    activeFormats = activeFormats.filter(f => f !== fmt);
    el.classList.remove('active');
  } else {
    activeFormats.push(fmt);
    el.classList.add('active');
  }
  applyFilters();
}

function setRating(r) {
  currentRating = r + 1;
  document.querySelectorAll('.star-btn').forEach((btn, i) =>
    btn.classList.toggle('active', i <= r)
  );
  applyFilters();
}

function toggleQuick(key, el) {
  quickFilters[key] = !quickFilters[key];
  el.classList.toggle('active', quickFilters[key]);
  applyFilters();
}

function switchView(v) {
  document.getElementById('libraryView').classList.toggle('active', v === 'library');
  document.getElementById('bookmarksView').classList.toggle('active', v === 'bookmarks');
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active-nav'));
  event.currentTarget.classList.add('active-nav');
  if (v === 'bookmarks') renderBmView();
}

// ─── Bookmarks View ───────────────────────────────────────────────
function renderBmView() {
  const grid = document.getElementById('bmGrid');
  if (!bookmarks.size) {
    grid.innerHTML = `
      <div class="empty">
        <div class="empty-icon">🔖</div>
        <div class="empty-title">No bookmarks yet</div>
        <div>Click the tag icon on any book to bookmark it</div>
      </div>`;
    return;
  }
  grid.className = 'book-grid';
  grid.innerHTML = [...bookmarks].map(id => {
    const b = BOOKS_DATA[id];
    if (!b) return '';
    const catCol = CAT_COLORS[b.cat] || '#888';
    return `
      <div class="book-card" onclick="openModal(${id})">
        <button class="bm-btn bookmarked" onclick="toggleBookmark(${id},event)">🔖</button>
        <div class="book-cover" style="background:#ffffff">
          <div class="cover-inner">
            <div class="cover-icon">${b.icon}</div>
            <div class="cover-title">${b.title}</div>
            <div class="cover-author">${b.author}</div>
          </div>
        </div>
        <div class="book-info">
          <div class="book-title">${b.title}</div>
          <div class="book-author">${b.author}</div>
          <div class="book-meta">
            <span class="book-cat" style="background:${catCol}18;color:${catCol}">${b.cat}</span>
            <span class="book-rating">★ ${b.rating}</span>
          </div>
          <div class="book-actions">
            <a href="${getBookPdfUrl(b) || '#'}" class="btn-view" onclick="handleView(${id},event)">👁 View</a>
            <a href="${getBookPdfUrl(b) || '#'}" class="btn-download" onclick="handleDownload(${id},event)">⬇ Download</a>
          </div>
        </div>
      </div>`;
  }).join('');
}

// ─── Modal ────────────────────────────────────────────────────────
function openModal(id) {
  id = Number(id);
  const b = BOOKS_DATA[id];
  if (!b) return;
  const bm = bookmarks.has(id);
  const catCol = CAT_COLORS[b.cat] || '#888';

  // Build modal action buttons
  let downloadBtns = '';
  // View — always present, opens book-detail page with PDF viewer
  downloadBtns += `<a href="${getBookPdfUrl(b) || '#'}" class="btn-primary" style="text-decoration:none;border-radius:10px;display:inline-flex;align-items:center;gap:6px;" onclick="handleView(${id},event);closeModal()">👁 View PDF</a>`;
  // Download — PDF stored locally takes priority, then external link
  if (b.pdfData) {
    const fname = b.pdfName || b.title + '.pdf';
    downloadBtns += `<a href="${b.pdfData}" download="${fname}" class="btn-secondary" style="text-decoration:none;border-radius:10px;display:inline-flex;align-items:center;gap:6px;">⬇ Download PDF</a>`;
  } else if (b.link) {
    downloadBtns += `<a href="${b.link}" target="_blank" rel="noopener" class="btn-secondary" style="text-decoration:none;border-radius:10px;display:inline-flex;align-items:center;gap:6px;">⬇ Download</a>`;
  }
  if (b.readLink) {
    downloadBtns += `<a href="${b.readLink}" target="_blank" rel="noopener" class="btn-secondary" style="text-decoration:none;border-radius:10px;display:inline-flex;align-items:center;gap:6px;">🌐 Read Online</a>`;
  }

  document.getElementById('modalInner').innerHTML = `
    <div class="modal-cover" style="background:#1a1713">
      <div class="cover-inner" style="padding:20px">
        <div style="font-size:52px;margin-bottom:12px">${b.icon}</div>
        <div style="font-size:12px;font-weight:600;color:${b.accent || catCol};text-align:center;line-height:1.3">${b.title}</div>
      </div>
    </div>
    <div class="modal-body">
      <div class="modal-title">${b.title}</div>
      <div class="modal-author">by ${b.author} · ${b.year}</div>
      <div class="modal-stats">
        <div class="modal-stat"><div class="stat-val">★ ${b.rating}</div><div class="stat-key">Rating</div></div>
        <div class="modal-stat"><div class="stat-val">${b.pages}</div><div class="stat-key">Pages</div></div>
        <div class="modal-stat"><div class="stat-val" style="color:${catCol}">${b.fmt}</div><div class="stat-key">Format</div></div>
      </div>
      <div class="modal-desc">${b.desc}</div>
      <div class="modal-tags">
        ${b.tags.map(t => `<span class="modal-tag">${t}</span>`).join('')}
        <span class="modal-tag" style="background:${catCol}15;color:${catCol};border-color:${catCol}30">${b.cat}</span>
        ${b.free ? '<span class="modal-tag" style="background:#4ade8015;color:#4ade80;border-color:#4ade8030">Free</span>' : ''}
        ${b.pdfData ? '<span class="modal-tag" style="background:rgba(160,98,10,0.1);color:var(--accent);border-color:rgba(160,98,10,0.2)">📄 PDF Available</span>' : ''}
      </div>
      <div class="modal-actions">
        ${downloadBtns}
        <button class="btn-secondary ${bm ? 'bookmarked' : ''}" id="modalBmBtn"
          onclick="toggleModalBookmark(${id})"
          style="${bm ? 'border-color:var(--accent);color:var(--accent)' : ''}">
          ${bm ? '🔖 Bookmarked' : '🏷 Bookmark'}
        </button>
      </div>
    </div>`;

  document.getElementById('modal').classList.add('open');
}

function toggleModalBookmark(id) {
  toggleBookmark(id, null);
  const bm  = bookmarks.has(Number(id));
  const btn = document.getElementById('modalBmBtn');
  if (btn) {
    btn.textContent = bm ? '🔖 Bookmarked' : '🏷 Bookmark';
    btn.style.borderColor = bm ? 'var(--accent)' : '';
    btn.style.color = bm ? 'var(--accent)' : '';
    btn.classList.toggle('bookmarked', bm);
  }
}

function closeModal() {
  document.getElementById('modal').classList.remove('open');
}

// ─── Toast ────────────────────────────────────────────────────────
function showToast(icon, msg) {
  const t = document.getElementById('toast');
  document.getElementById('toastIcon').textContent = icon;
  document.getElementById('toastMsg').textContent  = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2500);
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

// ─── Dynamic Books (Admin-Added) ──────────────────────────────────
// Reads books saved by the admin panel from localStorage and injects
// them into the grid and BOOKS_DATA so all features work seamlessly.

const CAT_COLORS_FULL = {
  Engineering: "#60a5fa",
  Science:     "#4ade80",
  Programming: "#a78bfa",
  Mathematics: "#f87171"
};

function loadDynamicBooks() {
  let dynBooks = [];
  try {
    dynBooks = JSON.parse(localStorage.getItem('bh_books') || '[]');
    // Re-attach pdfData from individual storage keys
    dynBooks = dynBooks.map(b => {
      if (b.hasPdf) {
        try { b.pdfData = localStorage.getItem('bh_pdf_' + b.id) || null; } catch(e) {}
      }
      return b;
    });
  } catch(e) { return; }
  if (!dynBooks.length) return;

  const grid = document.getElementById('bookGrid');
  if (!grid) return;

  dynBooks.forEach(b => {
    // Register in BOOKS_DATA for modal
    const catCol = CAT_COLORS_FULL[b.cat] || '#888';
    BOOKS_DATA[b.id] = {
      title:   b.title,
      author:  b.author,
      cat:     b.cat,
      fmt:     b.fmt,
      rating:  b.rating,
      pages:   b.pages || 0,
      year:    b.year,
      badge:   b.badge || '',
      free:    b.free,
      tags:    b.tags || [],
      desc:    b.desc || '',
      icon:    b.icon || '📚',
      accent:  catCol,
      dir:     'book-detail.html?id=' + b.id,
      pdfData: b.pdfData || null,
      pdfUrl:  b.pdfUrl || '',
      pdfName: b.pdfName || '',
      link:    b.link || '',
      readLink:b.readLink || ''
    };

    // Build card HTML
    const badgeHtml = b.badge === 'hot'
      ? '<div class="badge-hot">HOT</div>'
      : b.badge === 'new'
      ? '<div class="badge-new">NEW</div>'
      : '';

    const card = document.createElement('div');
    card.className = 'book-card';
    card.dataset.id     = b.id;
    card.dataset.cat    = b.cat;
    card.dataset.fmt    = b.fmt;
    card.dataset.rating = b.rating;
    card.dataset.badge  = b.badge || '';
    card.dataset.free   = b.free;
    card.dataset.year   = b.year;
    card.dataset.tags   = (b.tags || []).join(' ');
    card.setAttribute('onclick', `openModal(${b.id})`);

    card.innerHTML = `
      ${badgeHtml}
      <div class="admin-tag" title="Added by admin" style="position:absolute;top:10px;left:${b.badge?'70px':'10px'};font-size:10px;font-weight:700;padding:2px 7px;border-radius:20px;background:${catCol}20;color:${catCol};border:1px solid ${catCol}40;z-index:2;letter-spacing:0.4px;">ADMIN</div>
      <button class="bm-btn" onclick="toggleBookmark(${b.id},event)">🏷</button>
      <div class="book-cover" style="background:#ffffff">
        <div class="cover-inner">
          <div class="cover-icon">${b.icon || '📚'}</div>
          <div class="cover-title">${b.title}</div>
          <div class="cover-author">${b.author}</div>
        </div>
      </div>
      <div class="book-info">
        <div class="book-title">${b.title}</div>
        <div class="book-author">${b.author}</div>
        <div class="book-meta">
          <span class="book-cat" style="background:${catCol}18;color:${catCol}">${b.cat}</span>
          <span class="book-rating">★ ${b.rating}</span>
        </div>
        <div class="book-actions">
          <a href="${getBookPdfUrl(BOOKS_DATA[b.id]) || '#'}" class="btn-view" onclick="handleView(${b.id},event)">👁 View</a>
          <a href="${getBookPdfUrl(BOOKS_DATA[b.id]) || '#'}" class="btn-download" onclick="handleDownload(${b.id},event)">⬇ Download</a>
        </div>
      </div>`;

    grid.appendChild(card);
  });

  // Update "total" stat count
  const totalEl = document.querySelector('.stat-card .sc-val');
  if (totalEl) {
    const allCards = document.querySelectorAll('#bookGrid .book-card').length;
    totalEl.textContent = allCards;
  }

  // Re-run filters so new cards participate
  applyFilters();
  updateBmIcons();

  // Update category pill counts
  updateSidebarCounts();
}

function updateSidebarCounts() {
  const all = document.querySelectorAll('#bookGrid .book-card');
  const counts = { All: all.length };
  all.forEach(c => {
    const cat = c.dataset.cat;
    counts[cat] = (counts[cat] || 0) + 1;
  });
  document.querySelectorAll('[data-cat]').forEach(el => {
    const cat = el.dataset.cat;
    const fi  = el.querySelector('.fi-count');
    if (fi && counts[cat] !== undefined) fi.textContent = counts[cat];
  });
  const statFiltered = document.getElementById('statFiltered');
  if (statFiltered) statFiltered.textContent = all.length;
}


function setupDirectPdfButtons() {
  document.querySelectorAll('#bookGrid .book-card').forEach(card => {
    const id = Number(card.dataset.id);
    if (!id) return;
    const viewBtn = card.querySelector('.btn-view');
    const downloadBtn = card.querySelector('.btn-download');
    if (viewBtn) {
      viewBtn.href = getBookPdfUrl(BOOKS_DATA[id]) || '#';
      viewBtn.onclick = e => handleView(id, e);
    }
    if (downloadBtn) {
      downloadBtn.href = getBookPdfUrl(BOOKS_DATA[id]) || '#';
      downloadBtn.onclick = e => handleDownload(id, e);
    }
  });
}

// Run after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  setupDirectPdfButtons();
  loadDynamicBooks();
});
// Also run immediately in case DOM is already loaded
if (document.readyState !== 'loading') {
  setupDirectPdfButtons();
  loadDynamicBooks();
}
