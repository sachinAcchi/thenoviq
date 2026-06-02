/* ============================================================
   DASHBOARD JS — ExamPrep Content Studio
   Charts · Activity feed · Top articles · Date picker
   All topbar / shared UI lives in main.js
   ============================================================ */
'use strict';

/* ══════════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════════ */
var DASH = {
  chartRanges: {
    'Last 7 Days':  { labels:['May 15','May 16','May 17','May 18','May 19','May 20','May 21'], data:[12,18,22,28,25,30,42] },
    'Last 14 Days': { labels:['May 8','May 9','May 10','May 11','May 12','May 13','May 14','May 15','May 16','May 17','May 18','May 19','May 20','May 21'], data:[8,10,14,11,16,20,18,12,18,22,28,25,30,42] },
    'Last 30 Days': { labels:['Apr 22','Apr 25','Apr 28','May 1','May 4','May 7','May 10','May 13','May 16','May 21'], data:[5,9,12,15,10,18,14,22,30,42] },
  },

  activity: [
    { name:'Priya Sharma',  initials:'PS', color:'#10B981', dot:'green',  action:'published',                  article:'India–EU Trade Agreement Impact',  time:'2m ago'  },
    { name:'Rohit Verma',   initials:'RV', color:'#F97316', dot:'orange', action:'marked news as relevant:',   article:'RBI Monetary Policy',              time:'15m ago' },
    { name:'Ananya Singh',  initials:'AS', color:'#3B82F6', dot:'blue',   action:'sent to AI processing:',     article:"ISRO's New Launch",                time:'32m ago' },
    { name:'Vikram Patel',  initials:'VP', color:'#8B5CF6', dot:'purple', action:'edited content:',            article:'Digital India Progress Report',    time:'1h ago'  },
    { name:'Neha Gupta',    initials:'NG', color:'#EF4444', dot:'red',    action:'rejected news:',             article:'Celebrity News Update',            time:'2h ago'  },
  ],

  subjects: [
    { label:'Polity',                  value:12, pct:'28.6%', color:'#F97316' },
    { label:'Economy',                 value:10, pct:'23.8%', color:'#3B82F6' },
    { label:'International Relations', value:8,  pct:'19.0%', color:'#10B981' },
    { label:'Environment',             value:6,  pct:'14.3%', color:'#8B5CF6' },
    { label:'Science & Tech',          value:6,  pct:'14.3%', color:'#F59E0B' },
  ],

  sources: [
    { label:'The Hindu',      value:45, pct:'35.2%', color:'#F97316' },
    { label:'PIB',            value:30, pct:'23.4%', color:'#3B82F6' },
    { label:'Indian Express', value:20, pct:'15.6%', color:'#10B981' },
    { label:'Live Mint',      value:15, pct:'11.7%', color:'#8B5CF6' },
    { label:'Others',         value:18, pct:'14.1%', color:'#F59E0B' },
  ],

  articles: [
    { title:'India–EU Trade Agreement Impact', views:'2.4K', emoji:'🌏' },
    { title:'RBI Monetary Policy Analysis',    views:'1.8K', emoji:'🏦' },
    { title:"ISRO's New Launch Success",       views:'1.6K', emoji:'🚀' },
    { title:'Digital India Progress Report',   views:'1.2K', emoji:'💻' },
    { title:'Climate Change Global Update',    views:'980',  emoji:'🌱' },
  ],
};

var currentRange = 'Last 7 Days';

/* ══════════════════════════════════════════════════════════
   LINE CHART
══════════════════════════════════════════════════════════ */
function renderLineChart() {
  var canvas = document.getElementById('publishedChart');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');

  var range  = DASH.chartRanges[currentRange];
  var labels = range.labels;
  var values = range.data;

  var W = canvas.parentElement.clientWidth || 600;
  var H = 240;
  var dpr = window.devicePixelRatio || 1;
  canvas.width  = W * dpr;
  canvas.height = H * dpr;
  canvas.style.width  = W + 'px';
  canvas.style.height = H + 'px';
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, W, H);

  var padL=40, padR=20, padT=24, padB=36;
  var cW = W - padL - padR, cH = H - padT - padB;
  var maxY = 60;
  var yTicks = [0, 15, 30, 45, 60];

  yTicks.forEach(function (tick) {
    var y = padT + cH - (tick / maxY) * cH;
    ctx.beginPath(); ctx.strokeStyle = '#E8ECF0'; ctx.lineWidth = 1;
    ctx.moveTo(padL, y); ctx.lineTo(W - padR, y); ctx.stroke();
    ctx.fillStyle = '#9CA3AF'; ctx.font = '11px sans-serif'; ctx.textAlign = 'right';
    ctx.fillText(tick, padL - 8, y + 4);
  });

  ctx.fillStyle = '#9CA3AF'; ctx.font = '11px sans-serif'; ctx.textAlign = 'center';
  var step = labels.length > 8 ? Math.ceil(labels.length / 7) : 1;
  labels.forEach(function (lbl, i) {
    if (i % step !== 0 && i !== labels.length - 1) return;
    var x = padL + (i / (labels.length - 1)) * cW;
    ctx.fillText(lbl, x, H - 6);
  });

  var pts = values.map(function (v, i) { return { x: padL + (i / (values.length - 1)) * cW, y: padT + cH - (v / maxY) * cH }; });

  var grad = ctx.createLinearGradient(0, padT, 0, padT + cH);
  grad.addColorStop(0,   'rgba(249,115,22,0.20)');
  grad.addColorStop(0.6, 'rgba(249,115,22,0.05)');
  grad.addColorStop(1,   'rgba(249,115,22,0)');
  ctx.beginPath();
  ctx.moveTo(pts[0].x, padT + cH);
  pts.forEach(function (p) { ctx.lineTo(p.x, p.y); });
  ctx.lineTo(pts[pts.length - 1].x, padT + cH);
  ctx.closePath(); ctx.fillStyle = grad; ctx.fill();

  ctx.beginPath(); ctx.strokeStyle = '#F97316'; ctx.lineWidth = 2.5;
  ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  pts.forEach(function (p, i) { i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y); });
  ctx.stroke();

  ctx.font = '600 11px sans-serif'; ctx.fillStyle = '#374151'; ctx.textAlign = 'center';
  pts.forEach(function (p, i) { ctx.fillText(values[i], p.x, p.y - 10); });

  pts.forEach(function (p) {
    ctx.beginPath(); ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#F97316'; ctx.strokeStyle = '#fff'; ctx.lineWidth = 2;
    ctx.fill(); ctx.stroke();
  });
}

/* ══════════════════════════════════════════════════════════
   DONUT CHART
══════════════════════════════════════════════════════════ */
function renderDonut(canvasId, segments) {
  var canvas = document.getElementById(canvasId);
  if (!canvas) return;
  var ctx  = canvas.getContext('2d');
  var size = canvas.parentElement.clientWidth || 130;
  var dpr  = window.devicePixelRatio || 1;
  canvas.width  = size * dpr; canvas.height = size * dpr;
  canvas.style.width = size + 'px'; canvas.style.height = size + 'px';
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, size, size);

  var cx = size/2, cy = size/2, outerR = size*0.46, innerR = size*0.30;
  var total = segments.reduce(function (s, seg) { return s + seg.value; }, 0);
  var GAP   = 0.04;
  var angle = -Math.PI / 2;

  segments.forEach(function (seg) {
    var sweep = (seg.value / total) * (Math.PI * 2) - GAP;
    ctx.beginPath();
    ctx.arc(cx, cy, outerR, angle, angle + sweep, false);
    ctx.arc(cx, cy, innerR, angle + sweep, angle, true);
    ctx.closePath();
    ctx.fillStyle = seg.color; ctx.fill();
    angle += sweep + GAP;
  });
}

/* ══════════════════════════════════════════════════════════
   LEGEND
══════════════════════════════════════════════════════════ */
function renderLegend(legendId, segments) {
  var el = document.getElementById(legendId);
  if (!el) return;
  el.innerHTML = segments.map(function (s) {
    return '<div class="donut-legend-item">' +
      '<div class="donut-legend-left">' +
        '<span class="donut-dot" style="background:' + s.color + '"></span>' +
        '<span class="donut-legend-label">' + s.label + '</span>' +
      '</div>' +
      '<span class="donut-legend-val">' + s.value + ' (' + s.pct + ')</span>' +
    '</div>';
  }).join('');
}

/* ══════════════════════════════════════════════════════════
   ACTIVITY FEED
══════════════════════════════════════════════════════════ */
function renderActivity() {
  var list = document.getElementById('activityList');
  if (!list) return;
  list.innerHTML = DASH.activity.map(function (a) {
    return '<div class="activity-item">' +
      '<div class="activity-avatar-wrap">' +
        '<div class="avatar-placeholder avatar-md" style="background:' + a.color + ';font-size:12px">' + a.initials + '</div>' +
        '<span class="activity-status-dot ' + a.dot + '"></span>' +
      '</div>' +
      '<div class="activity-body">' +
        '<p class="activity-text"><strong>' + a.name + '</strong> ' + a.action + ' "<span>' + a.article + '</span>"</p>' +
      '</div>' +
      '<span class="activity-time">' + a.time + '</span>' +
    '</div>';
  }).join('');
}

/* ══════════════════════════════════════════════════════════
   TOP ARTICLES
══════════════════════════════════════════════════════════ */
function renderArticles() {
  var list = document.getElementById('articlesList');
  if (!list) return;
  list.innerHTML = DASH.articles.map(function (a) {
    return '<div class="article-item">' +
      '<div class="article-thumb-placeholder">' + a.emoji + '</div>' +
      '<div class="article-body">' +
        '<div class="article-title">' + a.title + '</div>' +
        '<div class="article-views">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>' +
          a.views +
        '</div>' +
      '</div>' +
    '</div>';
  }).join('');
}

/* ══════════════════════════════════════════════════════════
   CHART RANGE DROPDOWN  (dashboard-specific)
══════════════════════════════════════════════════════════ */
function openRangeDropdown(anchor) {
  var opts = Object.keys(DASH.chartRanges);
  var html = opts.map(function (o) {
    return '<button class="dd-item ' + (o === currentRange ? 'dd-item--active' : '') + '" data-range="' + o + '">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:14px;height:14px"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/></svg>' +
      o + '</button>';
  }).join('');

  var dd = createDropdown(anchor, html, 'dd-small');
  dd.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-range]');
    if (!btn) return;
    currentRange = btn.dataset.range;
    /* Update button text */
    var textNode = anchor.childNodes[0];
    if (textNode && textNode.nodeType === 3) textNode.textContent = currentRange + ' ';
    else { var firstText = anchor.querySelector('span') || anchor; firstText.textContent = currentRange; }
    closeAllDropdowns();
    renderLineChart();
  });
}

/* ══════════════════════════════════════════════════════════
   DATE PICKER  (dashboard header)
══════════════════════════════════════════════════════════ */
function openDatePicker(anchor) {
  var MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  var MONTHS3 = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var viewDate = new Date(2025, 4, 21);

  function buildCalendar() {
    var y = viewDate.getFullYear(), m = viewDate.getMonth();
    var firstDay = new Date(y, m, 1).getDay();
    var daysInMonth = new Date(y, m + 1, 0).getDate();
    var cells = '';
    for (var i = 0; i < firstDay; i++) cells += '<span class="cal-cell cal-cell--empty"></span>';
    for (var d = 1; d <= daysInMonth; d++) {
      var active = (d === 21 && m === 4) ? 'cal-cell--active' : '';
      cells += '<button class="cal-cell ' + active + '" data-day="' + d + '">' + d + '</button>';
    }
    return '<div class="cal-header">' +
      '<button class="cal-nav" id="calPrev">&#8249;</button>' +
      '<span class="cal-month">' + MONTHS[m] + ' ' + y + '</span>' +
      '<button class="cal-nav" id="calNext">&#8250;</button>' +
    '</div>' +
    '<div class="cal-grid">' +
      '<span class="cal-dow">Su</span><span class="cal-dow">Mo</span><span class="cal-dow">Tu</span>' +
      '<span class="cal-dow">We</span><span class="cal-dow">Th</span><span class="cal-dow">Fr</span><span class="cal-dow">Sa</span>' +
      cells +
    '</div>';
  }

  var dd = createDropdown(anchor, buildCalendar(), 'dd-calendar');

  function wireNav() {
    var prev = document.getElementById('calPrev');
    var next = document.getElementById('calNext');
    if (prev) prev.addEventListener('click', function (e) { e.stopPropagation(); viewDate.setMonth(viewDate.getMonth()-1); dd.innerHTML = buildCalendar(); wireNav(); });
    if (next) next.addEventListener('click', function (e) { e.stopPropagation(); viewDate.setMonth(viewDate.getMonth()+1); dd.innerHTML = buildCalendar(); wireNav(); });
  }
  wireNav();

  dd.addEventListener('click', function (e) {
    var cell = e.target.closest('[data-day]');
    if (cell) {
      var dateStr = MONTHS3[viewDate.getMonth()] + ' ' + cell.dataset.day + ', ' + viewDate.getFullYear();
      var dateText = anchor.querySelector('.date-text');
      if (dateText) dateText.textContent = dateStr;
      closeAllDropdowns();
      showToast('Date set to ' + dateStr, 'success');
    }
  });
}

/* ══════════════════════════════════════════════════════════
   WIRE DASHBOARD-SPECIFIC UI
══════════════════════════════════════════════════════════ */
function wireDashboard() {
  /* Chart range dropdown */
  var rangeBtn = document.querySelector('.chart-range-select');
  if (rangeBtn) rangeBtn.addEventListener('click', function (e) { e.stopPropagation(); openRangeDropdown(rangeBtn); });

  /* Date picker */
  var dateBtn = document.querySelector('.date-picker-btn');
  if (dateBtn) {
    /* Ensure a .date-text span exists to update */
    if (!dateBtn.querySelector('.date-text')) {
      var span = document.createElement('span');
      span.className = 'date-text';
      span.textContent = 'May 21, 2025';
      var chevron = dateBtn.querySelector('svg:last-child');
      dateBtn.childNodes.forEach(function (n) { if (n.nodeType === 3 && n.textContent.trim()) n.remove(); });
      dateBtn.insertBefore(span, chevron || null);
    }
    dateBtn.addEventListener('click', function (e) { e.stopPropagation(); openDatePicker(dateBtn); });
  }

  /* View all activity */
  var viewAll = document.querySelector('.view-all-link');
  if (viewAll) viewAll.addEventListener('click', function () { showToast('Loading full activity log\u2026', 'info'); });
}

/* ══════════════════════════════════════════════════════════
   INIT
══════════════════════════════════════════════════════════ */
document.addEventListener('app:ready', function () {
  renderActivity();
  renderLegend('subjectsLegend', DASH.subjects);
  renderLegend('sourcesLegend',  DASH.sources);
  renderArticles();
  wireDashboard();

  requestAnimationFrame(function () {
    setTimeout(function () {
      renderLineChart();
      renderDonut('subjectsDonut', DASH.subjects);
      renderDonut('sourcesDonut',  DASH.sources);
    }, 50);
  });
});

var dashResizeTimer;
window.addEventListener('resize', function () {
  clearTimeout(dashResizeTimer);
  dashResizeTimer = setTimeout(function () {
    renderLineChart();
    renderDonut('subjectsDonut', DASH.subjects);
    renderDonut('sourcesDonut',  DASH.sources);
  }, 150);
});
