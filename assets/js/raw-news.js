/* ============================================================
   RAW NEWS INBOX JS — Noviq
   Table · Preview panel · Filters · Pagination · Actions
   ============================================================ */
'use strict';

/* ── Data ── */
const SOURCES = {
  'The Hindu':         { abbr:'TH', color:'#1a1a1a' },
  'Economic Times':   { abbr:'ET', color:'#D32F2F' },
  'PIB':              { abbr:'PIB',color:'#1565C0' },
  'Business Standard':{ abbr:'BS', color:'#B71C1C' },
  'Live Law':         { abbr:'LL', color:'#4A148C' },
  'Times of India':   { abbr:'TOI',color:'#E65100' },
  'DD News':          { abbr:'DD', color:'#1B5E20' },
  'Indian Express':   { abbr:'IE', color:'#0D47A1' },
};

const ALL_NEWS = [
  { id:1,  title:'India-EU Trade Agreement: Key Impact and Opportunities',     source:'The Hindu',          date:'May 21, 2025', time:'10:30 AM', status:'new',      emoji:'🌏', summary:'India and the European Union have finalized a landmark trade agreement aimed at boosting economic ties between the two regions. The pact is expected to provide significant benefits across sectors including technology, green energy, and manufacturing.', highlights:['Duty cuts on over 90% of goods.','Enhanced market access for services and investments.','Collaboration on green energy and sustainable development.','Stronger intellectual property rights protection.'], extra:'The agreement is seen as a major step towards deepening strategic partnership and fostering inclusive growth.' },
  { id:2,  title:"RBI Keeps Repo Rate Unchanged: What It Means for Economy",    source:'Economic Times',     date:'May 21, 2025', time:'09:15 AM', status:'new',      emoji:'🏦', summary:'The Reserve Bank of India has kept the repo rate unchanged at 6.5% in its latest monetary policy meeting, citing stable inflation and steady economic growth prospects.', highlights:['Repo rate held at 6.5%.','CPI inflation within target band.','GDP growth forecast maintained at 7.2%.','Liquidity conditions remain comfortable.'], extra:'Analysts expect the RBI to continue its pause stance through the next quarter before considering any rate cuts.' },
  { id:3,  title:"ISRO's New Launch Mission to Study Solar Winds",              source:'PIB',                date:'May 21, 2025', time:'08:40 AM', status:'new',      emoji:'🚀', summary:'ISRO has announced a new mission to study solar winds and their impact on Earth\'s magnetosphere. The mission will carry advanced scientific instruments developed in collaboration with international space agencies.', highlights:['Launch window set for Q3 2025.','Payload includes 4 scientific instruments.','International collaboration with ESA.','Mission duration: 2 years.'], extra:'The mission represents a significant step in India\'s space science program and builds on the success of previous solar observation missions.' },
  { id:4,  title:'Union Budget 2025: Major Announcements for Infrastructure',   source:'The Hindu',          date:'May 20, 2025', time:'11:20 PM', status:'reviewed', emoji:'🏗️', summary:'The Union Budget 2025 has made significant allocations for infrastructure development, including roads, railways, and urban development projects across the country.', highlights:['₹11 lakh crore capex allocation.','New railway corridors approved.','Urban infrastructure fund doubled.','Green energy push with solar targets.'], extra:'Infrastructure spending is expected to be a key driver of economic growth in FY2025-26.' },
  { id:5,  title:'Global Markets Rally as US Inflation Shows Signs of Cooling', source:'Economic Times',     date:'May 20, 2025', time:'10:05 PM', status:'reviewed', emoji:'📈', summary:'Global equity markets rallied significantly after the latest US inflation data showed a cooling trend, raising hopes of an early Fed rate cut.', highlights:['US CPI drops to 3.1%.','S&P 500 up 1.8% on the day.','Emerging markets see capital inflows.','Dollar weakens against major currencies.'], extra:'Asian markets including India are expected to open higher following the positive global cues.' },
  { id:6,  title:"India's Manufacturing PMI Rises to 58.2 in April",           source:'Business Standard',  date:'May 20, 2025', time:'09:00 PM', status:'new',      emoji:'🏭', summary:'India\'s Manufacturing Purchasing Managers\' Index rose to 58.2 in April, the highest level in 16 years, driven by strong domestic and export demand.', highlights:['PMI at 16-year high of 58.2.','New orders sub-index surges.','Employment in manufacturing rising.','Export orders at record high.'], extra:'The strong PMI reading signals robust growth momentum in India\'s manufacturing sector.' },
  { id:7,  title:'Supreme Court Verdict on Electoral Bonds Scheme',             source:'Live Law',           date:'May 20, 2025', time:'07:45 PM', status:'rejected', emoji:'⚖️', summary:'The Supreme Court has delivered a landmark verdict on the Electoral Bonds Scheme, directing full disclosure of donor information and ordering changes to the scheme.', highlights:['Full donor disclosure ordered.','Bank to share all transaction data.','Timeline set for compliance.','Scheme modifications mandated.'], extra:'The verdict is expected to have far-reaching implications for political funding transparency in India.' },
  { id:8,  title:'New Education Policy: Implementation Updates from States',    source:'Times of India',     date:'May 20, 2025', time:'06:30 PM', status:'new',      emoji:'🎓', summary:'Several states have shared updates on the implementation of the National Education Policy 2020, with progress reports on curriculum changes and teacher training programs.', highlights:['12 states revising curricula.','Mother-tongue instruction expanding.','Vocational training integration.','Teacher training programs scaled up.'], extra:'The NEP implementation is proceeding at different paces across states, with some showing strong progress.' },
  { id:9,  title:'Monsoon 2025 Forecast: IMD Predicts Above Normal Rainfall',   source:'DD News',            date:'May 20, 2025', time:'05:10 PM', status:'new',      emoji:'🌧️', summary:'The India Meteorological Department has forecast above-normal monsoon rainfall for 2025, which is expected to boost agricultural output and support rural economies.', highlights:['Overall rainfall: 106% of LPA.','Northwest India to see surplus rain.','Kharif crop output to rise 8%.','Reservoir levels expected to improve.'], extra:'The positive monsoon outlook is expected to moderate food inflation and support rural consumption.' },
  { id:10, title:'India-Japan Collaboration in Semiconductor Development',      source:'Business Standard',  date:'May 20, 2025', time:'04:20 PM', status:'reviewed', emoji:'💻', summary:'India and Japan have announced a strategic collaboration in semiconductor research and manufacturing, with joint investments in chip fabrication facilities.', highlights:['₹45,000 crore joint investment.','Two semiconductor fabs planned.','R&D centres in Bengaluru and Pune.','Technology transfer agreement signed.'], extra:'This partnership is part of India\'s broader strategy to build a domestic semiconductor ecosystem.' },
  { id:11, title:'Chandrayaan-4 Mission Details Unveiled by ISRO Chief',        source:'PIB',                date:'May 19, 2025', time:'03:00 PM', status:'new',      emoji:'🌙', summary:'ISRO chief unveiled detailed plans for the Chandrayaan-4 mission, which will attempt a sample return from the lunar south pole region.', highlights:['Sample return mission planned.','Launch target: 2027.','International payloads included.','Budget: ₹2,500 crore.'], extra:'Chandrayaan-4 builds on the success of Chandrayaan-3 and represents India\'s most ambitious lunar mission.' },
  { id:12, title:'India GDP Growth Revised to 7.6% for FY2024-25',              source:'Economic Times',     date:'May 19, 2025', time:'01:30 PM', status:'reviewed', emoji:'📊', summary:'The National Statistical Office has revised India\'s GDP growth estimate upward to 7.6% for FY2024-25, making it the fastest-growing major economy globally.', highlights:['GDP revised to 7.6%.','Manufacturing drives growth.','Services sector robust.','Investment cycle picking up.'], extra:'The upward revision reflects strong performance across key sectors including manufacturing and services.' },
];

let currentPage   = 1;
const PER_PAGE    = 10;
let selectedId    = 1;
let filterSource  = 'all';
let filterStatus  = 'all';
let sortDateDesc  = true;

/* ── Derived filtered + sorted list ── */
function getFiltered() {
  let list = [...ALL_NEWS];
  if (filterSource !== 'all') list = list.filter(n => n.source === filterSource);
  if (filterStatus !== 'all') list = list.filter(n => n.status === filterStatus);
  list.sort((a, b) => sortDateDesc
    ? b.id - a.id
    : a.id - b.id
  );
  return list;
}

function getPage(list) {
  const start = (currentPage - 1) * PER_PAGE;
  return list.slice(start, start + PER_PAGE);
}

/* ── Source logo HTML ── */
function sourceLogo(sourceName, size = 26) {
  const s = SOURCES[sourceName] || { abbr: sourceName.slice(0,2).toUpperCase(), color:'#6B7280' };
  return `<span class="source-logo" style="width:${size}px;height:${size}px;background:${s.color};">${s.abbr}</span>`;
}

/* ── Status badge HTML ── */
function statusBadge(status) {
  const map = { new:'New', reviewed:'Reviewed', rejected:'Rejected', published:'Published' };
  return `<span class="status-badge ${status}">${map[status] || status}</span>`;
}

/* ── Render table ── */
function renderTable() {
  const filtered = getFiltered();
  const page     = getPage(filtered);
  const tbody    = document.getElementById('rniTbody');
  if (!tbody) return;

  tbody.innerHTML = page.map(item => `
    <tr data-id="${item.id}" class="${item.id === selectedId ? 'row--active' : ''}">
      <td><input type="checkbox" class="rni-checkbox" onclick="event.stopPropagation()"></td>
      <td class="td-title">${item.title}</td>
      <td class="col-source">
        <div class="td-source">
          ${sourceLogo(item.source)}
          <span class="source-name">${item.source}</span>
        </div>
      </td>
      <td>
        <div class="td-date">
          <span class="date-day">${item.date}</span>
          <span class="date-time">${item.time}</span>
        </div>
      </td>
      <td>${statusBadge(item.status)}</td>
    </tr>`).join('');

  /* Row click → show preview */
  tbody.querySelectorAll('tr').forEach(row => {
    row.addEventListener('click', () => {
      selectedId = parseInt(row.dataset.id);
      renderTable();
      renderPreview();
    });
  });

  renderPagination(filtered.length);
}

/* ── Render pagination ── */
function renderPagination(total) {
  const totalPages = Math.ceil(total / PER_PAGE);
  const info = document.getElementById('rniPaginationInfo');
  const pages = document.getElementById('rniPages');
  if (!info || !pages) return;

  const start = (currentPage - 1) * PER_PAGE + 1;
  const end   = Math.min(currentPage * PER_PAGE, total);
  info.textContent = `Showing ${start} to ${end} of ${total} results`;

  /* Build page buttons: prev · 1 · 2 · 3 · … · last · next */
  let btns = '';

  btns += `<button class="pg-btn" id="pgPrev" ${currentPage === 1 ? 'disabled' : ''}>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
  </button>`;

  const visiblePages = buildPageNumbers(currentPage, totalPages);
  visiblePages.forEach(p => {
    if (p === '…') {
      btns += `<span class="pg-dots">…</span>`;
    } else {
      btns += `<button class="pg-btn ${p === currentPage ? 'active' : ''}" data-page="${p}">${p}</button>`;
    }
  });

  btns += `<button class="pg-btn" id="pgNext" ${currentPage === totalPages ? 'disabled' : ''}>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
  </button>`;

  pages.innerHTML = btns;

  pages.querySelector('#pgPrev')?.addEventListener('click', () => { currentPage--; renderTable(); });
  pages.querySelector('#pgNext')?.addEventListener('click', () => { currentPage++; renderTable(); });
  pages.querySelectorAll('[data-page]').forEach(btn => {
    btn.addEventListener('click', () => { currentPage = parseInt(btn.dataset.page); renderTable(); });
  });
}

function buildPageNumbers(current, total) {
  if (total <= 7) return Array.from({length: total}, (_, i) => i + 1);
  if (current <= 3) return [1, 2, 3, '…', total];
  if (current >= total - 2) return [1, '…', total - 2, total - 1, total];
  return [1, '…', current - 1, current, current + 1, '…', total];
}

/* ── Render preview ── */
function renderPreview() {
  const item    = ALL_NEWS.find(n => n.id === selectedId);
  const panel   = document.getElementById('rniPreview');
  const body    = document.getElementById('previewBody');
  if (!panel || !body || !item) return;

  panel.classList.remove('rni-preview--hidden');

  const src = SOURCES[item.source] || { abbr:'??', color:'#6B7280' };

  body.innerHTML = `
    <div class="preview-source-row">
      <div class="preview-source-info">
        <span class="preview-source-logo" style="background:${src.color};">${src.abbr}</span>
        <div>
          <div class="preview-source-name">${item.source}</div>
          <div class="preview-source-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            Open source
          </div>
        </div>
      </div>
      <button class="preview-bookmark-btn" title="Bookmark">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
      </button>
    </div>

    <div class="preview-body" id="previewScrollBody">
      <h2 class="preview-title">${item.title}</h2>
      <div class="preview-meta">
        <span>${item.date}</span>
        <span class="preview-meta-dot">•</span>
        <span>${item.time}</span>
      </div>

      <div class="preview-image">${item.emoji}</div>

      <p class="preview-summary">${item.summary}</p>

      <div class="preview-highlights">
        <div class="preview-highlights-title">Key Highlights:</div>
        <ul>${item.highlights.map(h => `<li>${h}</li>`).join('')}</ul>
      </div>

      <p class="preview-extra-text">${item.extra}</p>

      <div class="preview-source-link-row">
        <strong>Source Link:</strong>
        <a href="#" onclick="return false;">
          Read Full Article
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
        </a>
      </div>
    </div>`;

  /* Action buttons */
  wirePreviewActions(item);
}

/* ── Wire preview action buttons ── */
function wirePreviewActions(item) {
  document.getElementById('btnMarkRelevant')?.addEventListener('click', () => {
    updateStatus(item.id, 'reviewed');
    showRniToast('Marked as Relevant ✓', 'success');
  });
  document.getElementById('btnReject')?.addEventListener('click', () => {
    updateStatus(item.id, 'rejected');
    showRniToast('Article Rejected', 'danger');
  });
  document.getElementById('btnSendAI')?.addEventListener('click', () => {
    updateStatus(item.id, 'reviewed');
    showRniToast('Sent to AI Processing 🤖', 'info');
  });
}

function updateStatus(id, newStatus) {
  const item = ALL_NEWS.find(n => n.id === id);
  if (item) { item.status = newStatus; renderTable(); }
}

/* ── Filter dropdowns ── */
function openSourceFilter(anchor) {
  const sources = ['All Sources', ...Object.keys(SOURCES)];
  const html = sources.map(s => {
    const val    = s === 'All Sources' ? 'all' : s;
    const active = val === filterSource;
    return `<button class="dd-item ${active ? 'dd-item--active' : ''}" data-val="${val}">${s}</button>`;
  }).join('');

  const dd = createRniDropdown(anchor, html);
  dd.addEventListener('click', e => {
    const btn = e.target.closest('[data-val]');
    if (!btn) return;
    filterSource = btn.dataset.val;
    currentPage  = 1;
    anchor.querySelector('.filter-label').textContent =
      filterSource === 'all' ? 'All Sources' : filterSource;
    closeRniDropdowns();
    renderTable();
  });
}

function openStatusFilter(anchor) {
  const opts = [
    { val:'all',      label:'All Status' },
    { val:'new',      label:'New'        },
    { val:'reviewed', label:'Reviewed'   },
    { val:'rejected', label:'Rejected'   },
    { val:'published',label:'Published'  },
  ];
  const html = opts.map(o =>
    `<button class="dd-item ${o.val === filterStatus ? 'dd-item--active' : ''}" data-val="${o.val}">${o.label}</button>`
  ).join('');

  const dd = createRniDropdown(anchor, html);
  dd.addEventListener('click', e => {
    const btn = e.target.closest('[data-val]');
    if (!btn) return;
    filterStatus = btn.dataset.val;
    currentPage  = 1;
    anchor.querySelector('.filter-label').textContent =
      opts.find(o => o.val === filterStatus)?.label || 'All Status';
    closeRniDropdowns();
    renderTable();
  });
}

/* ── Generic mini dropdown ── */
function createRniDropdown(anchor, innerHTML) {
  closeRniDropdowns();
  const dd = document.createElement('div');
  dd.className = 'ui-dropdown rni-dd ui-dropdown--open';
  dd.innerHTML = innerHTML;
  document.body.appendChild(dd);

  const rect = anchor.getBoundingClientRect();
  dd.style.top  = (rect.bottom + 4 + window.scrollY) + 'px';
  dd.style.left = rect.left + 'px';
  dd.style.minWidth = rect.width + 'px';

  setTimeout(() => {
    document.addEventListener('click', outsideClose, { once: true });
  }, 0);
  function outsideClose(e) {
    if (!dd.contains(e.target) && !anchor.contains(e.target)) closeRniDropdowns();
  }
  return dd;
}

function closeRniDropdowns() {
  document.querySelectorAll('.rni-dd').forEach(d => d.remove());
}

/* ── Sort by date ── */
function toggleDateSort() {
  sortDateDesc = !sortDateDesc;
  currentPage  = 1;
  const icon   = document.getElementById('dateSortIcon');
  if (icon) icon.style.transform = sortDateDesc ? '' : 'rotate(180deg)';
  renderTable();
}

/* ── Refresh ── */
function doRefresh() {
  const btn = document.getElementById('rniRefreshBtn');
  if (!btn) return;
  btn.classList.add('spinning');
  btn.disabled = true;
  showRniToast('Fetching latest news…', 'info');
  setTimeout(() => {
    btn.classList.remove('spinning');
    btn.disabled = false;
    showRniToast('Inbox refreshed — 240 articles loaded ✓', 'success');
    renderTable();
  }, 1400);
}

/* ── Prev/Next article in preview ── */
function previewPrev() {
  const filtered = getFiltered();
  const idx = filtered.findIndex(n => n.id === selectedId);
  if (idx > 0) { selectedId = filtered[idx - 1].id; renderTable(); renderPreview(); }
}

function previewNext() {
  const filtered = getFiltered();
  const idx = filtered.findIndex(n => n.id === selectedId);
  if (idx < filtered.length - 1) { selectedId = filtered[idx + 1].id; renderTable(); renderPreview(); }
}

/* ── Close preview ── */
function closePreview() {
  const panel = document.getElementById('rniPreview');
  if (panel) panel.classList.add('rni-preview--hidden');
}

/* ── Toast ── */
function showRniToast(msg, type = 'info') {
  let wrap = document.getElementById('toastWrap');
  if (!wrap) {
    wrap = document.createElement('div');
    wrap.id = 'toastWrap';
    document.body.appendChild(wrap);
  }
  wrap.innerHTML = `<div class="ui-toast ui-toast--${type}">${msg}</div>`;
  requestAnimationFrame(() => wrap.querySelector('.ui-toast')?.classList.add('ui-toast--show'));
  setTimeout(() => { wrap.innerHTML = ''; }, 3000);
}

/* ── Wire everything ── */
function wireRawNews() {
  /* Toolbar filters */
  document.getElementById('sourceFilterBtn')?.addEventListener('click', function (e) {
    e.stopPropagation(); openSourceFilter(this);
  });
  document.getElementById('statusFilterBtn')?.addEventListener('click', function (e) {
    e.stopPropagation(); openStatusFilter(this);
  });

  /* Date sort */
  document.getElementById('dateSortBtn')?.addEventListener('click', toggleDateSort);

  /* Refresh */
  document.getElementById('rniRefreshBtn')?.addEventListener('click', doRefresh);

  /* Preview navigation */
  document.getElementById('previewPrev')?.addEventListener('click', previewPrev);
  document.getElementById('previewNext')?.addEventListener('click', previewNext);
  document.getElementById('previewClose')?.addEventListener('click', closePreview);

  /* Action buttons (static, wired again on each preview render) */
  document.getElementById('btnMarkRelevant')?.addEventListener('click', () => {
    const item = ALL_NEWS.find(n => n.id === selectedId);
    if (item) { updateStatus(item.id, 'reviewed'); showRniToast('Marked as Relevant ✓', 'success'); }
  });
  document.getElementById('btnReject')?.addEventListener('click', () => {
    const item = ALL_NEWS.find(n => n.id === selectedId);
    if (item) { updateStatus(item.id, 'rejected'); showRniToast('Article Rejected', 'danger'); }
  });
  document.getElementById('btnSendAI')?.addEventListener('click', () => {
    const item = ALL_NEWS.find(n => n.id === selectedId);
    if (item) { updateStatus(item.id, 'reviewed'); showRniToast('Sent to AI Processing 🤖', 'info'); }
  });

  /* Close dropdowns on scroll */
  window.addEventListener('scroll', closeRniDropdowns, { passive: true });
}

/* ── Init ── */
document.addEventListener('app:ready', function () {
  renderTable();
  renderPreview();
  wireRawNews();
});
