/* ============================================================
   CONTENT EDITOR JS — Noviq
   Form interactions · Tags · MCQ builder · Preview modal
   ============================================================ */
'use strict';

/* ── State ── */
const CE = {
  title: 'India-EU Trade Agreement: Key Impact and Opportunities',
  summary: 'India and the European Union have finalized a landmark trade agreement to strengthen economic ties. The pact includes tariff cuts on over 90% of goods, better market access for services, and cooperation in areas like technology, green energy, and sustainable development. It is expected to boost business opportunities and create jobs in both regions.',
  facts: [
    'India and EU finalise landmark trade agreement.',
    'Tariff reductions on over 90% of goods.',
    'Improved market access for services and investments.',
    'Cooperation in technology, green energy, and sustainable development.',
    'Expected to boost business and create jobs in both regions.',
  ],
  mcqQuestion: 'India and the EU trade agreement aims to achieve which of the following?',
  options: [
    { label:'A', text:'Establish a military alliance',              correct:false },
    { label:'B', text:'Reduce tariffs and boost economic cooperation', correct:true  },
    { label:'C', text:'Introduce a common currency',               correct:false },
    { label:'D', text:'Form a political union',                    correct:false },
  ],
  explanation: 'The agreement focuses on reducing tariffs on over 90% of goods, improving market access, and collaborating in key sectors to boost economic ties.',
  tags: ['India', 'European Union', 'Trade Agreement', 'Economy'],
  subject: 'International Relations',
  subSubject: 'International Organizations',
  examTypes: ['UPSC'],
  difficulty: 'Medium',
  refSource: 'The Hindu',
  publishMode: 'schedule',
  publishDate: 'May 23, 2025',
  publishTime: '09:00 AM',
  status: 'draft',
};

let autosaveTimer;

/* ══════════════════════════════════════════════════════════
   INIT
══════════════════════════════════════════════════════════ */
document.addEventListener('app:ready', function () {
  populateForm();
  wireTitle();
  wireSummary();
  wireFacts();
  wireOptions();
  wireExplanation();
  wireTags();
  wireExamTypes();
  wireSidebarFields();
  wirePublishOpts();
  wireActions();
  wirePreviewModal();
  startAutosave();
});

/* ══════════════════════════════════════════════════════════
   POPULATE
══════════════════════════════════════════════════════════ */
function populateForm() {
  const titleEl = document.getElementById('ceTitle');
  if (titleEl) { titleEl.value = CE.title; updateCharCount('ceTitle', 'ceTitleCount', 150); }

  const summaryEl = document.getElementById('ceSummary');
  if (summaryEl) { summaryEl.value = CE.summary; updateWordCount('ceSummary', 'ceSummaryWords'); }

  renderFacts();
  renderOptions();

  const qEl = document.getElementById('ceMcqQuestion');
  if (qEl) { qEl.value = CE.mcqQuestion; updateCharCount('ceMcqQuestion', 'ceMcqQCount', 200); }

  const expEl = document.getElementById('ceExplanation');
  if (expEl) { expEl.value = CE.explanation; updateWordCount('ceExplanation', 'ceExpWords'); }

  renderTags();
  renderExamTypes();

  const subjectEl = document.getElementById('ceSubject');
  if (subjectEl) subjectEl.value = CE.subject;
  const subsubEl = document.getElementById('ceSubSubject');
  if (subsubEl) subsubEl.value = CE.subSubject;
  const diffEl = document.getElementById('ceDifficulty');
  if (diffEl) diffEl.value = CE.difficulty;
  const refEl = document.getElementById('ceRefSource');
  if (refEl) refEl.value = CE.refSource;

  updateStatusBadge();
}

/* ══════════════════════════════════════════════════════════
   TITLE
══════════════════════════════════════════════════════════ */
function wireTitle() {
  const el = document.getElementById('ceTitle');
  if (!el) return;
  el.addEventListener('input', () => {
    CE.title = el.value;
    updateCharCount('ceTitle', 'ceTitleCount', 150);
    triggerAutosave();
  });
}

/* ══════════════════════════════════════════════════════════
   SUMMARY
══════════════════════════════════════════════════════════ */
function wireSummary() {
  const el = document.getElementById('ceSummary');
  if (!el) return;
  el.addEventListener('input', () => {
    CE.summary = el.value;
    updateWordCount('ceSummary', 'ceSummaryWords');
    triggerAutosave();
  });

  // Toolbar buttons
  document.querySelectorAll('[data-fmt]').forEach(btn => {
    btn.addEventListener('click', () => {
      const fmt = btn.dataset.fmt;
      document.execCommand(fmt, false, null);
      el.focus();
    });
  });
}

/* ══════════════════════════════════════════════════════════
   FACTS
══════════════════════════════════════════════════════════ */
function renderFacts() {
  const list = document.getElementById('ceFactsList');
  if (!list) return;
  list.innerHTML = CE.facts.map((fact, i) => `
    <div class="ce-fact-row" data-idx="${i}">
      <span class="ce-drag-handle">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="5" r="1"/><circle cx="9" cy="12" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="19" r="1"/></svg>
      </span>
      <input class="ce-fact-input" type="text" value="${escHtml(fact)}" placeholder="Enter key fact…" />
      <button class="ce-fact-delete" title="Remove">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>
      </button>
    </div>`).join('');

  list.querySelectorAll('.ce-fact-input').forEach((inp, i) => {
    inp.addEventListener('input', () => { CE.facts[i] = inp.value; triggerAutosave(); });
  });
  list.querySelectorAll('.ce-fact-delete').forEach((btn, i) => {
    btn.addEventListener('click', () => { CE.facts.splice(i, 1); renderFacts(); triggerAutosave(); });
  });
}

function wireFacts() {
  document.getElementById('ceAddFact')?.addEventListener('click', () => {
    CE.facts.push('');
    renderFacts();
    const inputs = document.querySelectorAll('.ce-fact-input');
    inputs[inputs.length - 1]?.focus();
  });
}

/* ══════════════════════════════════════════════════════════
   MCQ OPTIONS
══════════════════════════════════════════════════════════ */
function renderOptions() {
  const list = document.getElementById('ceOptionsList');
  if (!list) return;
  list.innerHTML = CE.options.map((opt, i) => `
    <div class="ce-option-row ${opt.correct ? 'is-correct' : ''}" data-idx="${i}">
      <span class="ce-option-label">${opt.label}</span>
      <input class="ce-option-input" type="text" value="${escHtml(opt.text)}" placeholder="Option text…" />
      <span class="ce-correct-tag">Correct Answer</span>
      <input type="radio" class="ce-option-radio" name="ceCorrectOpt" ${opt.correct ? 'checked' : ''} title="Mark as correct" />
      <button class="ce-option-delete" title="Remove">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>
      </button>
    </div>`).join('');

  list.querySelectorAll('.ce-option-input').forEach((inp, i) => {
    inp.addEventListener('input', () => { CE.options[i].text = inp.value; triggerAutosave(); });
  });
  list.querySelectorAll('.ce-option-radio').forEach((radio, i) => {
    radio.addEventListener('change', () => {
      CE.options.forEach((o, j) => o.correct = j === i);
      renderOptions();
      triggerAutosave();
    });
  });
  list.querySelectorAll('.ce-option-delete').forEach((btn, i) => {
    btn.addEventListener('click', () => {
      if (CE.options.length <= 2) { showCeToast('Need at least 2 options', 'warning'); return; }
      CE.options.splice(i, 1);
      // Re-label A B C D
      CE.options.forEach((o, j) => o.label = String.fromCharCode(65 + j));
      renderOptions();
      triggerAutosave();
    });
  });
}

function wireOptions() {
  document.getElementById('ceAddOption')?.addEventListener('click', () => {
    if (CE.options.length >= 6) { showCeToast('Max 6 options allowed', 'warning'); return; }
    CE.options.push({ label: String.fromCharCode(65 + CE.options.length), text: '', correct: false });
    renderOptions();
    const inputs = document.querySelectorAll('.ce-option-input');
    inputs[inputs.length - 1]?.focus();
  });

  document.getElementById('ceMcqQuestion')?.addEventListener('input', function () {
    CE.mcqQuestion = this.value;
    updateCharCount('ceMcqQuestion', 'ceMcqQCount', 200);
    triggerAutosave();
  });
}

/* ══════════════════════════════════════════════════════════
   EXPLANATION
══════════════════════════════════════════════════════════ */
function wireExplanation() {
  const el = document.getElementById('ceExplanation');
  if (!el) return;
  el.addEventListener('input', () => {
    CE.explanation = el.value;
    updateWordCount('ceExplanation', 'ceExpWords');
    triggerAutosave();
  });
}

/* ══════════════════════════════════════════════════════════
   TAGS
══════════════════════════════════════════════════════════ */
function renderTags() {
  const wrap = document.getElementById('ceTagsWrap');
  if (!wrap) return;
  const tagInput = document.getElementById('ceTagInput');
  wrap.innerHTML = '';
  CE.tags.forEach((tag, i) => {
    const span = document.createElement('span');
    span.className = 'ce-tag';
    span.innerHTML = `${escHtml(tag)}<span class="ce-tag-remove" data-i="${i}">✕</span>`;
    wrap.appendChild(span);
  });
  if (!tagInput) {
    const inp = document.createElement('input');
    inp.type = 'text'; inp.className = 'ce-tag-input';
    inp.id = 'ceTagInput'; inp.placeholder = '+ Add Tag';
    inp.addEventListener('keydown', onTagKeydown);
    wrap.appendChild(inp);
  } else {
    wrap.appendChild(tagInput);
  }
  wrap.querySelectorAll('.ce-tag-remove').forEach(btn => {
    btn.addEventListener('click', () => {
      CE.tags.splice(parseInt(btn.dataset.i), 1);
      renderTags();
      triggerAutosave();
    });
  });
}

function wireTags() {
  document.getElementById('ceTagsWrap')?.addEventListener('click', () => {
    document.getElementById('ceTagInput')?.focus();
  });
}

function onTagKeydown(e) {
  if ((e.key === 'Enter' || e.key === ',') && this.value.trim()) {
    e.preventDefault();
    const val = this.value.trim().replace(/,$/, '');
    if (val && !CE.tags.includes(val)) { CE.tags.push(val); renderTags(); triggerAutosave(); }
    else this.value = '';
  }
  if (e.key === 'Backspace' && !this.value && CE.tags.length) {
    CE.tags.pop(); renderTags(); triggerAutosave();
  }
}

/* ══════════════════════════════════════════════════════════
   EXAM TYPES
══════════════════════════════════════════════════════════ */
function renderExamTypes() {
  document.querySelectorAll('.ce-exam-check').forEach(el => {
    const val = el.dataset.val;
    const active = CE.examTypes.includes(val);
    el.classList.toggle('checked', active);
    el.querySelector('input').checked = active;
  });
}

function wireExamTypes() {
  document.querySelectorAll('.ce-exam-check').forEach(el => {
    el.addEventListener('click', () => {
      const val = el.dataset.val;
      const idx = CE.examTypes.indexOf(val);
      if (idx > -1) CE.examTypes.splice(idx, 1);
      else CE.examTypes.push(val);
      renderExamTypes();
      triggerAutosave();
    });
  });
}

/* ══════════════════════════════════════════════════════════
   SIDEBAR FIELDS
══════════════════════════════════════════════════════════ */
function wireSidebarFields() {
  document.getElementById('ceSubject')?.addEventListener('change', function () {
    CE.subject = this.value; triggerAutosave();
  });
  document.getElementById('ceSubSubject')?.addEventListener('change', function () {
    CE.subSubject = this.value; triggerAutosave();
  });
  document.getElementById('ceDifficulty')?.addEventListener('change', function () {
    CE.difficulty = this.value; triggerAutosave();
  });
  document.getElementById('ceRefSource')?.addEventListener('input', function () {
    CE.refSource = this.value; triggerAutosave();
  });
}

/* ══════════════════════════════════════════════════════════
   PUBLISH OPTIONS
══════════════════════════════════════════════════════════ */
function wirePublishOpts() {
  document.querySelectorAll('.ce-publish-opt').forEach(opt => {
    opt.addEventListener('click', () => {
      CE.publishMode = opt.dataset.mode;
      document.querySelectorAll('.ce-publish-opt').forEach(o => {
        o.classList.toggle('active', o.dataset.mode === CE.publishMode);
        o.querySelector('input').checked = o.dataset.mode === CE.publishMode;
      });
      const dtRow = document.getElementById('ceDateTimeRow');
      if (dtRow) dtRow.style.display = CE.publishMode === 'schedule' ? 'flex' : 'none';
    });
  });
}

/* ══════════════════════════════════════════════════════════
   STATUS BADGE
══════════════════════════════════════════════════════════ */
function updateStatusBadge() {
  const badge = document.getElementById('ceStatusBadge');
  if (!badge) return;
  const map = { draft:'Draft', ready:'Ready to Publish', published:'Published' };
  badge.textContent = map[CE.status] || CE.status;
  badge.className = `ce-status-badge ${CE.status}`;
}

/* ══════════════════════════════════════════════════════════
   ACTIONS
══════════════════════════════════════════════════════════ */
function wireActions() {
  document.getElementById('ceSaveDraftBtn')?.addEventListener('click', saveDraft);
  document.getElementById('ceApproveBtn')  ?.addEventListener('click', approveContent);
  document.getElementById('cePublishBtn')  ?.addEventListener('click', sendToPublish);
}

function saveDraft() {
  CE.status = 'draft';
  updateStatusBadge();
  setAutosaveLabel('Saved just now');
  showCeToast('Draft saved ✓', 'success');
}

function approveContent() {
  CE.status = 'ready';
  updateStatusBadge();
  showCeToast('Content approved — Ready to Publish ✓', 'success');
  setAutosaveLabel('Saved just now');
}

function sendToPublish() {
  CE.status = 'published';
  updateStatusBadge();
  showCeToast('Sent to Publish Queue 🚀', 'success');
  setTimeout(() => window.location.href = 'publish-queue.html', 1500);
}

/* ══════════════════════════════════════════════════════════
   AUTOSAVE
══════════════════════════════════════════════════════════ */
function startAutosave() {
  setAutosaveLabel('Autosaved 2 min ago');
}

function triggerAutosave() {
  clearTimeout(autosaveTimer);
  setAutosaveLabel('Saving…');
  autosaveTimer = setTimeout(() => setAutosaveLabel('Autosaved just now'), 1200);
}

function setAutosaveLabel(text) {
  const el = document.getElementById('ceAutosaveLabel');
  if (el) el.textContent = text;
}

/* ══════════════════════════════════════════════════════════
   PREVIEW MODAL
══════════════════════════════════════════════════════════ */
function wirePreviewModal() {
  document.getElementById('cePreviewBtn')       ?.addEventListener('click', openPreview);
  document.getElementById('cePreviewCloseBtn')  ?.addEventListener('click', closePreview);
  document.getElementById('cePreviewClose2')    ?.addEventListener('click', closePreview);
  document.getElementById('cePreviewEditBtn')   ?.addEventListener('click', () => { closePreview(); showCeToast('Back to editing', 'info'); });
  document.getElementById('cePreviewOverlay')   ?.addEventListener('click', e => {
    if (e.target === document.getElementById('cePreviewOverlay')) closePreview();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closePreview();
  });
}

function openPreview() {
  // Populate preview with current state
  document.getElementById('pvTitle')  .textContent = CE.title;
  document.getElementById('pvSummary').textContent = CE.summary;

  document.getElementById('pvTags').innerHTML =
    CE.tags.slice(0,1).map(t => `<span class="ce-preview-tag">${t}</span>`).join('') +
    CE.examTypes.slice(0,2).map(t => `<span class="ce-preview-tag orange">${t}</span>`).join('') +
    (CE.examTypes.length > 1 ? `` : '') +
    `<button class="ce-preview-tag-add"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> Add Tag</button>`;

  document.getElementById('pvFacts').innerHTML =
    CE.facts.filter(f=>f.trim()).map(f => `<li>${escHtml(f)}</li>`).join('');

  document.getElementById('pvMcqQuestion').textContent = `Q. ${CE.mcqQuestion}`;
  document.getElementById('pvMcqOptions').innerHTML = CE.options.map(opt => `
    <div class="ce-preview-opt ${opt.correct ? 'correct' : ''}">
      <div class="ce-preview-opt-radio"><div class="ce-preview-opt-dot"></div></div>
      <span>${opt.label}. ${escHtml(opt.text)}</span>
      ${opt.correct ? `<span class="ce-preview-correct-tag">Correct Answer</span>` : ''}
    </div>`).join('');

  document.getElementById('pvExplanation').textContent = CE.explanation;

  // Details panel
  const correct = CE.options.find(o => o.correct);
  document.getElementById('pvDetailSubject').textContent  = CE.subject;
  document.getElementById('pvDetailSubSub').textContent   = CE.subSubject;
  document.getElementById('pvDetailExams').innerHTML      = CE.examTypes.map(e =>
    `<span class="ce-detail-exam-badge">${e}</span>`).join('');
  document.getElementById('pvDetailDifficulty').textContent = CE.difficulty;
  document.getElementById('pvDetailTags').innerHTML       = CE.tags.map(t =>
    `<span class="ce-detail-tag">${t}</span>`).join('');
  document.getElementById('pvDetailSource').textContent   = CE.refSource;
  document.getElementById('pvDetailPublishDate').textContent = `${CE.publishDate}  ${CE.publishTime}`;
  document.getElementById('pvDetailStatus').className     = `ce-detail-status-badge ${CE.status === 'ready' ? 'ready' : 'draft'}`;
  document.getElementById('pvDetailStatus').textContent   = CE.status === 'ready' ? 'Ready to Publish' : 'Draft';
  document.getElementById('pvDetailWords').textContent    = countWords(CE.summary) + countWords(CE.explanation) + ' words';

  const overlay = document.getElementById('cePreviewOverlay');
  overlay.classList.add('open');
}

function closePreview() {
  document.getElementById('cePreviewOverlay')?.classList.remove('open');
}

/* ══════════════════════════════════════════════════════════
   HELPERS
══════════════════════════════════════════════════════════ */
function updateCharCount(inputId, countId, max) {
  const el = document.getElementById(inputId);
  const ct = document.getElementById(countId);
  if (el && ct) ct.textContent = `${el.value.length}/${max} characters`;
}

function updateWordCount(inputId, countId) {
  const el = document.getElementById(inputId);
  const ct = document.getElementById(countId);
  if (el && ct) ct.textContent = countWords(el.value) + ' words';
}

function countWords(str) {
  return str.trim() ? str.trim().split(/\s+/).length : 0;
}

function escHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function showCeToast(msg, type = 'info') {
  let wrap = document.getElementById('toastWrap');
  if (!wrap) { wrap = document.createElement('div'); wrap.id = 'toastWrap'; document.body.appendChild(wrap); }
  wrap.innerHTML = `<div class="ui-toast ui-toast--${type}">${msg}</div>`;
  requestAnimationFrame(() => wrap.querySelector('.ui-toast')?.classList.add('ui-toast--show'));
  setTimeout(() => { wrap.innerHTML = ''; }, 3000);
}
