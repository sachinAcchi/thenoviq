/* ============================================================
   PUBLISH QUEUE JS — Noviq
   Table · Tabs · Filters · Sort · Pagination · Actions
   ============================================================ */
'use strict';

/* ── Data ── */
const PQ_DATA = [
  { id:1,  emoji:'🌏', title:'India-EU Trade Agreement: Key Impact and Opportunities',    author:'Priya Sharma',  date:'May 21, 2025', subject:'int-rel',  subjectLabel:'International Relations', exams:['UPSC','SSC','IBPS'],  status:'scheduled', scheduleDate:'May 23, 2025', scheduleTime:'09:00 AM' },
  { id:2,  emoji:'🏦', title:'RBI Keeps Repo Rate Unchanged: What It Means for Economy',   author:'Rohit Verma',   date:'May 21, 2025', subject:'economy',  subjectLabel:'Economy',                 exams:['UPSC','SSC','IBPS'],  status:'ready',     scheduleDate:null,           scheduleTime:null        },
  { id:3,  emoji:'🚀', title:"ISRO's New Launch Mission to Study Solar Winds",             author:'Ananya Singh',  date:'May 21, 2025', subject:'science',  subjectLabel:'Science & Tech',          exams:['UPSC','SSC'],         status:'scheduled', scheduleDate:'May 24, 2025', scheduleTime:'08:30 AM' },
  { id:4,  emoji:'🏛️', title:'Union Budget 2025: Major Announcements for Infrastructure', author:'Vikram Patel',  date:'May 20, 2025', subject:'polity',   subjectLabel:'Polity',                  exams:['UPSC','SSC','RRB'],   status:'scheduled', scheduleDate:'May 25, 2025', scheduleTime:'10:00 AM' },
  { id:5,  emoji:'📈', title:'Global Markets Rally as US Inflation Shows Signs of Cooling',author:'Neha Gupta',   date:'May 20, 2025', subject:'economy',  subjectLabel:'Economy',                 exams:['UPSC','IBPS'],        status:'overdue',   scheduleDate:'May 19, 2025', scheduleTime:null        },
  { id:6,  emoji:'🎓', title:'New Education Policy: Implementation Updates from States',   author:'Priya Sharma',  date:'May 20, 2025', subject:'polity',   subjectLabel:'Polity',                  exams:['UPSC','SSC','RRB'],   status:'ready',     scheduleDate:null,           scheduleTime:null        },
  { id:7,  emoji:'⚖️', title:'Supreme Court Verdict on Electoral Bonds Scheme',            author:'Rohit Verma',   date:'May 20, 2025', subject:'polity',   subjectLabel:'Polity',                  exams:['UPSC','SSC'],         status:'overdue',   scheduleDate:'May 18, 2025', scheduleTime:null        },
  { id:8,  emoji:'🌧️', title:'Monsoon 2025 Forecast: IMD Predicts Above Normal Rainfall', author:'Ananya Singh',  date:'May 19, 2025', subject:'geo',      subjectLabel:'Geography',               exams:['UPSC','SSC'],         status:'scheduled', scheduleDate:'May 26, 2025', scheduleTime:'11:00 AM' },
  { id:9,  emoji:'💻', title:'India-Japan Collaboration in Semiconductor Development',     author:'Vikram Patel',  date:'May 19, 2025', subject:'science',  subjectLabel:'Science & Tech',          exams:['UPSC','SSC'],         status:'ready',     scheduleDate:null,           scheduleTime:null        },
  { id:10, emoji:'🌱', title:'Climate Change Global Update: COP Outcomes',                 author:'Neha Gupta',   date:'May 18, 2025', subject:'geo',      subjectLabel:'Geography',               exams:['UPSC','SSC','RRB'],   status:'scheduled', scheduleDate:'May 27, 2025', scheduleTime:'09:30 AM' },
  { id:11, emoji:'🏗️', title:'Viksit Bharat 2047: Key Pillars and Implementation',         author:'Priya Sharma',  date:'May 18, 2025', subject:'polity',   subjectLabel:'Polity',                  exams:['UPSC','SSC'],         status:'ready',     scheduleDate:null,           scheduleTime:null        },
  { id:12, emoji:'📊', title:'India GDP Growth Revised to 7.6% for FY2024-25',             author:'Rohit Verma',   date:'May 17, 2025', subject:'economy',  subjectLabel:'Economy',                 exams:['UPSC','SSC','IBPS'],  status:'overdue',   scheduleDate:'May 16, 2025', scheduleTime:null        },
];

let pqFilter   = 'all';
let pqSort     = 'newest';
let pqPage     = 1;
let pqPerPage  = 10;

/* ── Filter & sort ── */
function getFiltered() {
  let list = [...PQ_DATA];
  if (pqFilter !== 'all') list = list.filter(i => i.status === pqFilter);
  if (pqSort === 'newest') list.sort((a,b) => b.id - a.id);
  if (pqSort === 'oldest') list.sort((a,b) => a.id - b.id);
  if (pqSort === 'az')     list.sort((a,b) => a.title.localeCompare(b.title));
  return list;
}

function getPage(list) {
  const s = (pqPage - 1) * pqPerPage;
  return list.slice(s, s + pqPerPage);
}

/* ── Render table ── */
function renderTable() {
  const filtered = getFiltered();
  const page     = getPage(filtered);
  const tbody    = document.getElementById('pqTbody');
  if (!tbody) return;

  tbody.innerHTML = page.map(item => {
    const examBadges = item.exams.slice(0,2).map(e =>
      `<span class="pq-exam-badge">${e}</span>`).join('') +
      (item.exams.length > 2 ? `<span class="pq-exam-more">+${item.exams.length-2}</span>` : '');

    const statusBadge = `<span class="pq-status-badge ${item.status}">${statusLabel(item.status)}</span>`;
    const statusSub   = item.status === 'scheduled' ? `${item.scheduleDate} &bull; ${item.scheduleTime}`
                      : item.status === 'overdue'   ? `Was due ${item.scheduleDate}`
                      : '';

    const scheduleCell = (item.status === 'ready' || item.status === 'overdue')
      ? `<button class="pq-publish-now-btn ${item.status === 'overdue' ? 'overdue' : ''}" data-id="${item.id}">
           <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
           Publish Now
         </button>`
      : `<div class="pq-schedule-cell">
           <div class="pq-schedule-date">
             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
             ${item.scheduleDate}
           </div>
           <span class="pq-schedule-time">${item.scheduleTime}</span>
         </div>`;

    return `
      <tr data-id="${item.id}">
        <td class="col-content">
          <div class="pq-content-cell">
            <div class="pq-thumb">${item.emoji}</div>
            <div class="pq-content-info">
              <div class="pq-content-title">${item.title}</div>
              <div class="pq-content-meta">
                By ${item.author} <span>&bull;</span> ${item.date}
              </div>
            </div>
          </div>
        </td>
        <td class="col-subject"><span class="pq-subject-badge ${item.subject}">${item.subjectLabel}</span></td>
        <td class="col-exam"><div class="pq-exam-badges">${examBadges}</div></td>
        <td class="col-status">
          <div class="pq-status-cell">
            ${statusBadge}
            <span class="pq-status-sub">${statusSub}</span>
          </div>
        </td>
        <td class="col-schedule">${scheduleCell}</td>
        <td class="col-actions">
          <button class="pq-actions-btn" data-id="${item.id}" title="More actions">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="5" r="1" fill="currentColor"/><circle cx="12" cy="12" r="1" fill="currentColor"/><circle cx="12" cy="19" r="1" fill="currentColor"/></svg>
          </button>
        </td>
      </tr>`;
  }).join('');

  /* Wire publish now */
  tbody.querySelectorAll('.pq-publish-now-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      publishItem(parseInt(btn.dataset.id));
    });
  });

  /* Wire 3-dot */
  tbody.querySelectorAll('.pq-actions-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      openActionMenu(btn, parseInt(btn.dataset.id));
    });
  });

  renderPagination(filtered.length);
}

function statusLabel(s) {
  return { scheduled:'Scheduled', ready:'Ready to Publish', overdue:'Overdue', published:'Published' }[s] || s;
}

/* ── Pagination ── */
function renderPagination(total) {
  const totalPages = Math.ceil(total / pqPerPage);
  const s = (pqPage-1)*pqPerPage+1, e = Math.min(pqPage*pqPerPage, total);
  const info = document.getElementById('pqPaginationInfo');
  const pages = document.getElementById('pqPages');
  if (info) info.textContent = `Showing ${s} to ${e} of ${total} results`;
  if (!pages) return;

  let html = `<button class="pq-pg-btn" id="pqPrev" ${pqPage===1?'disabled':''}>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
  </button>`;
  for (let p = 1; p <= totalPages; p++) {
    html += `<button class="pq-pg-btn ${p===pqPage?'active':''}" data-pg="${p}">${p}</button>`;
  }
  html += `<button class="pq-pg-btn" id="pqNext" ${pqPage===totalPages?'disabled':''}>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
  </button>`;
  pages.innerHTML = html;

  pages.querySelector('#pqPrev')?.addEventListener('click', () => { pqPage--; renderTable(); });
  pages.querySelector('#pqNext')?.addEventListener('click', () => { pqPage++; renderTable(); });
  pages.querySelectorAll('[data-pg]').forEach(b => {
    b.addEventListener('click', () => { pqPage = parseInt(b.dataset.pg); renderTable(); });
  });
}

/* ── Update stat cards ── */
function renderStats() {
  const total     = PQ_DATA.length;
  const scheduled = PQ_DATA.filter(i => i.status === 'scheduled').length;
  const ready     = PQ_DATA.filter(i => i.status === 'ready').length;
  const overdue   = PQ_DATA.filter(i => i.status === 'overdue').length;
  const el = id => document.getElementById(id);
  if (el('pqStatTotal'))     el('pqStatTotal').textContent     = total;
  if (el('pqStatScheduled')) el('pqStatScheduled').textContent = scheduled;
  if (el('pqStatReady'))     el('pqStatReady').textContent     = ready;
  if (el('pqStatOverdue'))   el('pqStatOverdue').textContent   = overdue;

  /* Update tab counts */
  if (el('tabAll'))       el('tabAll').textContent       = `All (${total})`;
  if (el('tabReady'))     el('tabReady').textContent     = `Ready to Publish (${ready})`;
  if (el('tabScheduled')) el('tabScheduled').textContent = `Scheduled (${scheduled})`;
  if (el('tabOverdue'))   el('tabOverdue').textContent   = `Overdue (${overdue})`;
}

/* ── Publish item ── */
function publishItem(id) {
  const item = PQ_DATA.find(i => i.id === id);
  if (!item) return;
  item.status = 'published';
  renderStats();
  renderTable();
  showPqToast(`"${item.title.slice(0,40)}…" published successfully 🚀`, 'success');
}

/* ── Action dropdown ── */
function openActionMenu(anchor, id) {
  closeAllPqDropdowns();
  const item = PQ_DATA.find(i => i.id === id);
  const html = `
    <button class="dd-item" data-act="edit">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
      Edit Content
    </button>
    <button class="dd-item" data-act="reschedule">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
      Reschedule
    </button>
    <button class="dd-item" data-act="preview">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
      Preview
    </button>
    <div class="dd-divider"></div>
    <button class="dd-item dd-item--danger" data-act="remove">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>
      Remove from Queue
    </button>`;

  const dd = document.createElement('div');
  dd.className = 'ui-dropdown pq-action-dd ui-dropdown--open';
  dd.innerHTML = html;
  document.body.appendChild(dd);

  const rect = anchor.getBoundingClientRect();
  const ddW  = 200;
  let left = rect.right - ddW;
  if (left < 8) left = 8;
  dd.style.top  = (rect.bottom + 4 + window.scrollY) + 'px';
  dd.style.left = left + 'px';
  dd.style.width = ddW + 'px';

  dd.addEventListener('click', e => {
    const btn = e.target.closest('[data-act]');
    if (!btn) return;
    closeAllPqDropdowns();
    const act = btn.dataset.act;
    if (act === 'edit')       { window.location.href = 'content-editor.html'; }
    if (act === 'reschedule') { showPqToast('Reschedule dialog coming soon', 'info'); }
    if (act === 'preview')    { showPqToast('Preview loading…', 'info'); }
    if (act === 'remove')     {
      const idx = PQ_DATA.findIndex(i => i.id === id);
      if (idx > -1) { PQ_DATA.splice(idx, 1); renderStats(); renderTable(); showPqToast('Removed from queue', 'danger'); }
    }
  });

  setTimeout(() => {
    document.addEventListener('click', outsideClose, { once: true });
  }, 0);
  function outsideClose(e) {
    if (!dd.contains(e.target)) closeAllPqDropdowns();
  }
}

function closeAllPqDropdowns() {
  document.querySelectorAll('.pq-action-dd').forEach(d => d.remove());
}

/* ── Sort dropdown ── */
function openSortMenu(anchor) {
  closeAllPqDropdowns();
  const opts = [
    { val:'newest', label:'Newest First' },
    { val:'oldest', label:'Oldest First' },
    { val:'az',     label:'A → Z'        },
  ];
  const html = opts.map(o =>
    `<button class="dd-item ${o.val === pqSort ? 'dd-item--active' : ''}" data-val="${o.val}">${o.label}</button>`
  ).join('');

  const dd = document.createElement('div');
  dd.className = 'ui-dropdown pq-sort-dd ui-dropdown--open';
  dd.innerHTML = html;
  dd.style.minWidth = '160px';
  document.body.appendChild(dd);

  const rect = anchor.getBoundingClientRect();
  dd.style.top  = (rect.bottom + 4 + window.scrollY) + 'px';
  dd.style.left = (rect.right - 160) + 'px';

  dd.addEventListener('click', e => {
    const btn = e.target.closest('[data-val]');
    if (!btn) return;
    pqSort = btn.dataset.val;
    pqPage = 1;
    const label = opts.find(o => o.val === pqSort)?.label || 'Newest First';
    anchor.querySelector('.pq-sort-label').textContent = `Sort by: ${label}`;
    closeAllPqDropdowns();
    renderTable();
  });

  setTimeout(() => {
    document.addEventListener('click', out => {
      if (!dd.contains(out.target) && !anchor.contains(out.target)) closeAllPqDropdowns();
    }, { once: true });
  }, 0);
}

/* ── Filter dropdown ── */
function openFilterMenu(anchor) {
  closeAllPqDropdowns();
  const opts = [
    { val:'all',       label:'All' },
    { val:'ready',     label:'Ready to Publish' },
    { val:'scheduled', label:'Scheduled' },
    { val:'overdue',   label:'Overdue' },
  ];
  const html = opts.map(o =>
    `<button class="dd-item ${o.val === pqFilter ? 'dd-item--active' : ''}" data-val="${o.val}">${o.label}</button>`
  ).join('');

  const dd = document.createElement('div');
  dd.className = 'ui-dropdown pq-filter-dd ui-dropdown--open';
  dd.innerHTML = html;
  dd.style.minWidth = '180px';
  document.body.appendChild(dd);

  const rect = anchor.getBoundingClientRect();
  dd.style.top  = (rect.bottom + 4 + window.scrollY) + 'px';
  dd.style.left = rect.left + 'px';

  dd.addEventListener('click', e => {
    const btn = e.target.closest('[data-val]');
    if (!btn) return;
    pqFilter = btn.dataset.val;
    pqPage   = 1;
    setActiveTab(pqFilter);
    closeAllPqDropdowns();
    renderTable();
  });

  setTimeout(() => {
    document.addEventListener('click', out => {
      if (!dd.contains(out.target) && !anchor.contains(out.target)) closeAllPqDropdowns();
    }, { once: true });
  }, 0);
}

/* ── Tabs ── */
function setActiveTab(val) {
  document.querySelectorAll('.pq-tab').forEach(t => {
    t.classList.toggle('active', t.dataset.filter === val);
  });
}

/* ── Toast ── */
function showPqToast(msg, type = 'info') {
  let wrap = document.getElementById('toastWrap');
  if (!wrap) { wrap = document.createElement('div'); wrap.id = 'toastWrap'; document.body.appendChild(wrap); }
  wrap.innerHTML = `<div class="ui-toast ui-toast--${type}">${msg}</div>`;
  requestAnimationFrame(() => wrap.querySelector('.ui-toast')?.classList.add('ui-toast--show'));
  setTimeout(() => { wrap.innerHTML = ''; }, 3000);
}

/* ── Wire everything ── */
function wirePQ() {
  /* Stat cards filter */
  document.querySelectorAll('.pq-stat-card[data-filter]').forEach(card => {
    card.addEventListener('click', () => {
      pqFilter = card.dataset.filter;
      pqPage   = 1;
      setActiveTab(pqFilter);
      renderTable();
    });
  });

  /* Tabs */
  document.querySelectorAll('.pq-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      pqFilter = tab.dataset.filter;
      pqPage   = 1;
      setActiveTab(pqFilter);
      renderTable();
    });
  });

  /* Filter button */
  document.getElementById('pqFilterBtn')?.addEventListener('click', function (e) {
    e.stopPropagation(); openFilterMenu(this);
  });

  /* Sort button */
  document.getElementById('pqSortBtn')?.addEventListener('click', function (e) {
    e.stopPropagation(); openSortMenu(this);
  });

  /* Per page */
  document.getElementById('pqPerPageSelect')?.addEventListener('change', function () {
    pqPerPage = parseInt(this.value);
    pqPage    = 1;
    renderTable();
  });

  /* Close dropdowns on scroll */
  window.addEventListener('scroll', closeAllPqDropdowns, { passive: true });
}

/* ── Init ── */
document.addEventListener('app:ready', function () {
  renderStats();
  renderTable();
  wirePQ();
});
