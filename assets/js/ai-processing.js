/* ============================================================
   AI PROCESSING JS — Noviq
   Article display · MCQ interaction · Regenerate · Approve
   ============================================================ */
'use strict';

/* ── Data ── */
const AIP_ARTICLES = [
  {
    id: 1,
    source: { name:'The Hindu', abbr:'TH', color:'#1a1a1a' },
    title: 'India-EU Trade Agreement: Key Impact and Opportunities',
    date: 'May 21, 2025', time: '10:30 AM',
    emoji: '🌏',
    url: 'https://www.thehindu.com/business/india-eu-trade-agreement',
    category: 'International Relations',
    fetchedOn: 'May 21, 2025, 08:45 AM',
    wordCount: '452 words',
    body: [
      'India and the European Union have finalized a landmark trade agreement aimed at boosting economic ties between the two regions. The pact is expected to provide significant benefits across sectors including technology, green energy, and manufacturing.',
      'The agreement includes provisions for tariff reductions on over 90% of goods, improved market access for services, and strengthened collaboration in sustainable development.',
      'Officials believe the deal will create new opportunities for businesses and contribute to job creation in both regions.',
    ],
    ai: {
      status: 'generated',
      summary: 'India and the European Union have finalized a major trade agreement to strengthen economic ties. The pact includes tariff cuts on over 90% of goods, better market access for services, and cooperation in areas like technology, green energy, and sustainable development. It is expected to boost business opportunities and create jobs in both regions.',
      keyPoints: [
        'India and EU finalise landmark trade agreement.',
        'Tariff reductions on over 90% of goods.',
        'Improved market access for services and investments.',
        'Cooperation in technology, green energy, and sustainable development.',
        'Expected to boost business and create jobs in both regions.',
      ],
      mcq: {
        question: 'India and the EU trade agreement aims to achieve which of the following?',
        options: [
          { label:'A', text:'Establish a military alliance' },
          { label:'B', text:'Reduce tariffs and boost economic cooperation' },
          { label:'C', text:'Introduce a common currency' },
          { label:'D', text:'Form a political union' },
        ],
        correct: 'B',
      },
      explanation: 'The agreement focuses on reducing tariffs on over 90% of goods, improving market access, and collaborating in key sectors to boost economic ties.',
    },
  },
  {
    id: 2,
    source: { name:'Economic Times', abbr:'ET', color:'#D32F2F' },
    title: 'RBI Keeps Repo Rate Unchanged: What It Means for Economy',
    date: 'May 21, 2025', time: '09:15 AM',
    emoji: '🏦',
    url: 'https://economictimes.indiatimes.com/rbi-repo-rate',
    category: 'Economy',
    fetchedOn: 'May 21, 2025, 09:30 AM',
    wordCount: '380 words',
    body: [
      'The Reserve Bank of India has kept the repo rate unchanged at 6.5% in its latest monetary policy meeting, citing stable inflation and steady economic growth prospects.',
      'The RBI\'s Monetary Policy Committee voted 5-1 to hold rates, maintaining its focus on withdrawal of accommodation to ensure inflation remains within the target band.',
      'Analysts expect economic growth to remain robust at around 7.2% for the current fiscal year, supported by strong domestic consumption and investment activity.',
    ],
    ai: {
      status: 'generated',
      summary: 'The RBI has held the repo rate steady at 6.5% amid controlled inflation and strong GDP growth. The decision signals continued monetary stability and is expected to support borrowing and investment activity across the economy.',
      keyPoints: [
        'Repo rate held at 6.5% for the fourth consecutive meeting.',
        'CPI inflation within the 4% target band.',
        'GDP growth forecast maintained at 7.2% for FY2025.',
        'MPC voted 5-1 in favour of the hold decision.',
        'Focus remains on withdrawal of accommodation.',
      ],
      mcq: {
        question: 'The RBI\'s decision to keep the repo rate unchanged primarily reflects which of the following?',
        options: [
          { label:'A', text:'Rising inflationary pressures' },
          { label:'B', text:'Slowdown in GDP growth' },
          { label:'C', text:'Stable inflation and growth outlook' },
          { label:'D', text:'Pressure from global central banks' },
        ],
        correct: 'C',
      },
      explanation: 'The RBI maintained the repo rate unchanged because inflation is within the target band and GDP growth remains strong, indicating a stable macroeconomic environment.',
    },
  },
  {
    id: 3,
    source: { name:'PIB', abbr:'PIB', color:'#1565C0' },
    title: "ISRO's New Launch Mission to Study Solar Winds",
    date: 'May 21, 2025', time: '08:40 AM',
    emoji: '🚀',
    url: 'https://pib.gov.in/isro-solar-wind-mission',
    category: 'Science & Technology',
    fetchedOn: 'May 21, 2025, 09:00 AM',
    wordCount: '310 words',
    body: [
      'ISRO has announced a new mission to study solar winds and their impact on Earth\'s magnetosphere. The mission will carry advanced scientific instruments developed in collaboration with international space agencies.',
      'The spacecraft will be placed in a halo orbit around the Sun-Earth L1 point, providing continuous observation of solar activity.',
      'The mission builds on the success of Aditya-L1 and aims to deepen India\'s understanding of space weather phenomena.',
    ],
    ai: {
      status: 'generated',
      summary: 'ISRO has announced a new solar wind study mission to be placed at the L1 Lagrange point. The mission will use advanced instruments to study solar activity and its effects on Earth\'s magnetosphere, building on the success of the Aditya-L1 mission.',
      keyPoints: [
        'New ISRO mission to study solar winds announced.',
        'Spacecraft to be placed at Sun-Earth L1 point.',
        'International collaboration for instrument development.',
        'Builds on Aditya-L1 mission success.',
        'Launch window planned for Q3 2025.',
      ],
      mcq: {
        question: 'The primary objective of ISRO\'s new solar wind mission is to:',
        options: [
          { label:'A', text:'Land on the surface of the Sun' },
          { label:'B', text:'Study solar winds and their impact on Earth\'s magnetosphere' },
          { label:'C', text:'Deploy a satellite for GPS navigation' },
          { label:'D', text:'Establish a space station near Mars' },
        ],
        correct: 'B',
      },
      explanation: 'The mission is specifically designed to study solar wind phenomena and understand how they affect Earth\'s magnetosphere, contributing to space weather research.',
    },
  },
];

let currentArticleIdx = 0;
let selectedOption    = null;

/* ── Render article (left panel) ── */
function renderArticle() {
  const a = AIP_ARTICLES[currentArticleIdx];
  document.getElementById('aipSourceLogo').style.background = a.source.color;
  document.getElementById('aipSourceAbbr').textContent       = a.source.abbr;
  document.getElementById('aipSourceName').textContent       = a.source.name;
  document.getElementById('aipSourceUrl').href               = a.url;
  document.getElementById('aipArticleTitle').textContent     = a.title;
  document.getElementById('aipArticleMeta').textContent      = `${a.date}  •  ${a.time}`;
  document.getElementById('aipArticleEmoji').textContent     = a.emoji;

  const bodyEl = document.getElementById('aipArticleBody');
  bodyEl.innerHTML = a.body.map(p => `<p>${p}</p>`).join('');

  document.getElementById('aipSourceLinkUrl').textContent = a.url;
  document.getElementById('aipSourceLinkUrl').href        = a.url;
  document.getElementById('aipMetaCategory').textContent  = a.category;
  document.getElementById('aipMetaFetched').textContent   = a.fetchedOn;
  document.getElementById('aipMetaWords').textContent     = a.wordCount;
}

/* ── Render AI content (right panel) ── */
function renderAIContent() {
  const a  = AIP_ARTICLES[currentArticleIdx];
  const ai = a.ai;
  selectedOption = null;

  /* Status badge */
  const badge = document.getElementById('aipStatusBadge');
  badge.className = `aip-status-badge ${ai.status}`;
  badge.textContent = ai.status.charAt(0).toUpperCase() + ai.status.slice(1);

  /* Summary */
  document.getElementById('aipSummaryText').textContent = ai.summary;

  /* Key Points */
  document.getElementById('aipKeyPointsList').innerHTML =
    ai.keyPoints.map(kp => `<li>${kp}</li>`).join('');

  /* MCQ */
  document.getElementById('aipMcqQuestion').textContent = `Q. ${ai.mcq.question}`;
  const optionsEl = document.getElementById('aipMcqOptions');
  optionsEl.innerHTML = ai.mcq.options.map(opt => `
    <div class="aip-option" data-label="${opt.label}">
      <div class="aip-option-radio"><div class="aip-option-radio-dot"></div></div>
      <span class="aip-option-label">${opt.label}. ${opt.text}</span>
    </div>`).join('');

  /* Wire option clicks */
  optionsEl.querySelectorAll('.aip-option').forEach(optEl => {
    optEl.addEventListener('click', () => selectOption(optEl, ai.mcq.correct));
  });

  /* Reset answer badge */
  document.getElementById('aipAnswerBadge').style.display = 'none';

  /* Pre-select correct option with highlight */
  const correctEl = optionsEl.querySelector(`[data-label="${ai.mcq.correct}"]`);
  if (correctEl) { correctEl.classList.add('correct'); }
  document.getElementById('aipAnswerBadge').style.display = 'inline-flex';
  document.getElementById('aipAnswerLabel').textContent   = `Answer: ${ai.mcq.correct}`;

  /* Explanation */
  document.getElementById('aipExplanationText').textContent = ai.explanation;
}

function selectOption(optEl, correct) {
  const parent = document.getElementById('aipMcqOptions');
  parent.querySelectorAll('.aip-option').forEach(el => {
    el.classList.remove('selected', 'correct', 'wrong');
  });

  const chosen = optEl.dataset.label;
  if (chosen === correct) {
    optEl.classList.add('correct');
    showAipToast('Correct answer! ✓', 'success');
  } else {
    optEl.classList.add('wrong');
    const correctEl = parent.querySelector(`[data-label="${correct}"]`);
    if (correctEl) correctEl.classList.add('correct');
    showAipToast('Incorrect. See the correct answer.', 'danger');
  }

  document.getElementById('aipAnswerBadge').style.display = 'inline-flex';
  document.getElementById('aipAnswerLabel').textContent   = `Answer: ${correct}`;
}

/* ── Navigate between articles ── */
function navigateArticle(dir) {
  const total = AIP_ARTICLES.length;
  currentArticleIdx = (currentArticleIdx + dir + total) % total;
  renderArticle();
  renderAIContent();
  showAipToast(`Viewing article ${currentArticleIdx + 1} of ${total}`, 'info');
}

/* ── Regenerate ── */
function doRegenerate() {
  const btn = document.getElementById('aipRegenerateBtn');
  btn.classList.add('spinning');
  btn.disabled = true;
  showAipToast('Regenerating AI content…', 'info');

  setTimeout(() => {
    btn.classList.remove('spinning');
    btn.disabled = false;
    renderAIContent();
    showAipToast('Content regenerated successfully ✓', 'success');
  }, 1800);
}

/* ── Edit ── */
function doEdit() {
  const summaryEl = document.getElementById('aipSummaryText');
  if (summaryEl.contentEditable === 'true') {
    summaryEl.contentEditable = 'false';
    summaryEl.style.outline = '';
    summaryEl.style.background = '';
    showAipToast('Changes saved ✓', 'success');
    document.getElementById('aipEditBtn').textContent = '';
    document.getElementById('aipEditBtn').innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
      Edit`;
  } else {
    summaryEl.contentEditable = 'true';
    summaryEl.style.outline  = '2px solid var(--brand-primary)';
    summaryEl.style.borderRadius = '6px';
    summaryEl.style.padding  = '4px';
    summaryEl.style.background = '#fffbf7';
    summaryEl.focus();
    showAipToast('Summary is now editable', 'info');
    document.getElementById('aipEditBtn').innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
      Save`;
  }
}

/* ── Approve & Send to Editor ── */
function doApprove() {
  showAipToast('Article approved and sent to Content Editor ✓', 'success');
  setTimeout(() => { window.location.href = 'content-editor.html'; }, 1400);
}

/* ── Copy section ── */
function copySection(type) {
  const a  = AIP_ARTICLES[currentArticleIdx];
  const ai = a.ai;
  let text = '';
  if (type === 'summary')     text = ai.summary;
  if (type === 'keypoints')   text = ai.keyPoints.map((kp, i) => `${i+1}. ${kp}`).join('\n');
  if (type === 'mcq')         text = `Q. ${ai.mcq.question}\n${ai.mcq.options.map(o => `${o.label}. ${o.text}`).join('\n')}\nAnswer: ${ai.mcq.correct}`;
  if (type === 'explanation') text = ai.explanation;

  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => showAipToast('Copied to clipboard ✓', 'success'));
  } else {
    showAipToast('Copy not supported in this browser', 'danger');
  }
}

/* ── Raw output modal ── */
function openRawModal() {
  const a  = AIP_ARTICLES[currentArticleIdx];
  const raw = JSON.stringify({ title: a.title, source: a.source.name, ai: a.ai }, null, 2);
  document.getElementById('aipRawPre').textContent = raw;
  const overlay = document.getElementById('aipRawOverlay');
  overlay.classList.add('open');
  document.addEventListener('keydown', escRaw);
}

function closeRawModal() {
  document.getElementById('aipRawOverlay').classList.remove('open');
  document.removeEventListener('keydown', escRaw);
}

function escRaw(e) { if (e.key === 'Escape') closeRawModal(); }

/* ── Back to inbox ── */
function backToInbox() { window.location.href = 'raw-news-inbox.html'; }

/* ── Toast ── */
function showAipToast(msg, type = 'info') {
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

/* ── Wire all buttons ── */
function wireAIP() {
  document.getElementById('aipBackBtn')       ?.addEventListener('click', backToInbox);
  document.getElementById('aipNavArrow')      ?.addEventListener('click', () => navigateArticle(1));
  document.getElementById('aipRegenerateBtn') ?.addEventListener('click', doRegenerate);
  document.getElementById('aipEditBtn')       ?.addEventListener('click', doEdit);
  document.getElementById('aipApproveBtn')    ?.addEventListener('click', doApprove);
  document.getElementById('aipRawBtn')        ?.addEventListener('click', openRawModal);
  document.getElementById('aipRawClose')      ?.addEventListener('click', closeRawModal);
  document.getElementById('aipRawOverlay')    ?.addEventListener('click', e => {
    if (e.target === document.getElementById('aipRawOverlay')) closeRawModal();
  });

  /* Copy buttons */
  document.getElementById('copySummary')    ?.addEventListener('click', () => copySection('summary'));
  document.getElementById('copyKeyPoints')  ?.addEventListener('click', () => copySection('keypoints'));
  document.getElementById('copyMcq')        ?.addEventListener('click', () => copySection('mcq'));
  document.getElementById('copyExplanation')?.addEventListener('click', () => copySection('explanation'));
}

/* ── Init ── */
document.addEventListener('app:ready', function () {
  renderArticle();
  renderAIContent();
  wireAIP();
});
