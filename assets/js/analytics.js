/* ============================================================
   ANALYTICS JS — Noviq
   Fully self-contained. All 6 tabs working.
   ============================================================ */
'use strict';

/* ══════════════════════════════════════════════════════════
   CONSTANTS & DATA
══════════════════════════════════════════════════════════ */
const TABS = ['overview','content-performance','exam-wise','audience-insights','source-performance','team-performance'];

const AN = {
  activeMetric: 'Views',
  activeDateIdx: 0,

  kpis: [
    { label:'Total Content Published', value:'87',    delta:'+18%', dir:'up', sub:'vs May 8 – May 14', icon:'blue',   iconType:'doc'    },
    { label:'Total Views',             value:'48.6K', delta:'+22%', dir:'up', sub:'vs May 8 – May 14', icon:'teal',   iconType:'eye'    },
    { label:'Avg. Engagement Rate',    value:'6.7%',  delta:'+1.3%',dir:'up', sub:'vs May 8 – May 14', icon:'violet', iconType:'trend'  },
    { label:'MCQs Attempted',          value:'12.4K', delta:'+16%', dir:'up', sub:'vs May 8 – May 14', icon:'orange', iconType:'mcq'    },
    { label:'MCQ Accuracy',            value:'72.3%', delta:'+3.2%',dir:'up', sub:'vs May 8 – May 14', icon:'green',  iconType:'target' },
    { label:'Shares',                  value:'1.8K',  delta:'+24%', dir:'up', sub:'vs May 8 – May 14', icon:'pink',   iconType:'share'  },
  ],

  chartLabels: ['May 15','May 16','May 17','May 18','May 19','May 20','May 21'],
  metrics: {
    'Views':        [5200, 9800, 4200, 7100, 11400, 9600, 12800],
    'Engagement':   [5.8,  6.2,  5.1,  6.8,  7.2,   6.9,  7.5],
    'MCQs Attempted':[1100, 1800, 900, 1500, 2200,  1900, 2500],
    'Shares':       [180,  260,  140,  220,  310,   280,  390],
  },

  statusDist: [
    { label:'Published', value:198, pct:'77.3%', color:'#10B981' },
    { label:'Draft',     value:28,  pct:'10.9%', color:'#F59E0B' },
    { label:'Scheduled', value:18,  pct:'7.0%',  color:'#3B82F6' },
    { label:'Archived',  value:12,  pct:'4.7%',  color:'#9CA3AF' },
  ],

  examTypes: [
    { label:'UPSC',      value:128, pct:'50.0%', color:'#F97316' },
    { label:'SSC',       value:64,  pct:'25.0%', color:'#F59E0B' },
    { label:'IBPS',      value:32,  pct:'12.5%', color:'#8B5CF6' },
    { label:'RRB',       value:16,  pct:'6.3%',  color:'#10B981' },
    { label:'State PSC', value:16,  pct:'6.3%',  color:'#3B82F6' },
  ],

  topContent: [
    { emoji:'🌏', title:'India-EU Trade Agreement: Key Impact and Opportunities',    tags:['UPSC','International Relations'], views:'8.7K', eng:'8.6%', acc:'76.4%', shares:'312' },
    { emoji:'🏦', title:'RBI Keeps Repo Rate Unchanged: What It Means for Economy',  tags:['UPSC','Economy'],                 views:'6.2K', eng:'7.2%', acc:'71.8%', shares:'198' },
    { emoji:'🚀', title:"ISRO's New Launch Mission to Study Solar Winds",            tags:['UPSC','Science & Tech'],          views:'5.1K', eng:'6.9%', acc:'74.1%', shares:'165' },
    { emoji:'🏛️', title:'Union Budget 2025: Major Announcements for Infrastructure', tags:['UPSC','Polity'],                  views:'4.3K', eng:'6.1%', acc:'69.3%', shares:'142' },
    { emoji:'📈', title:'Global Markets Rally as US Inflation Shows Signs of Cooling',tags:['UPSC','Economy'],               views:'3.9K', eng:'5.8%', acc:'70.2%', shares:'128' },
  ],

  sources: [
    { name:'The Hindu',               views:22800, bar:100 },
    { name:'PIB',                     views:9700,  bar:43  },
    { name:'Indian Express',          views:6100,  bar:27  },
    { name:'Press Information Bureau',views:4600,  bar:20  },
    { name:'Business Standard',       views:2900,  bar:13  },
    { name:'LiveMint',                views:1800,  bar:8   },
    { name:'Other Sources',           views:700,   bar:3   },
  ],

  dateRanges: [
    { label:'Last 7 days',  range:'May 15, 2025 – May 21, 2025' },
    { label:'Last 14 days', range:'May 8, 2025 – May 21, 2025'  },
    { label:'Last 30 days', range:'Apr 22, 2025 – May 21, 2025' },
    { label:'This month',   range:'May 1, 2025 – May 21, 2025'  },
    { label:'Last month',   range:'Apr 1, 2025 – Apr 30, 2025'  },
  ],
};

/* ── Tab data ── */
const TAB_DATA = {
  contentPerf: [
    { emoji:'🌏', title:'India-EU Trade Agreement',          views:8700,  pct:100, eng:'8.6%', acc:'76.4%', shares:312,  trend:'up',   trendVal:'+12%' },
    { emoji:'🏦', title:'RBI Repo Rate Unchanged',           views:6200,  pct:71,  eng:'7.2%', acc:'71.8%', shares:198,  trend:'up',   trendVal:'+8%'  },
    { emoji:'🚀', title:"ISRO Solar Wind Mission",           views:5100,  pct:59,  eng:'6.9%', acc:'74.1%', shares:165,  trend:'up',   trendVal:'+15%' },
    { emoji:'🏛️', title:'Union Budget Infrastructure',       views:4300,  pct:49,  eng:'6.1%', acc:'69.3%', shares:142,  trend:'down', trendVal:'-3%'  },
    { emoji:'📈', title:'Global Markets Rally',              views:3900,  pct:45,  eng:'5.8%', acc:'70.2%', shares:128,  trend:'up',   trendVal:'+5%'  },
    { emoji:'🎓', title:'New Education Policy',              views:3200,  pct:37,  eng:'5.4%', acc:'68.1%', shares:98,   trend:'up',   trendVal:'+2%'  },
    { emoji:'⚖️', title:'Supreme Court Electoral Bonds',    views:2800,  pct:32,  eng:'4.9%', acc:'65.3%', shares:76,   trend:'down', trendVal:'-7%'  },
    { emoji:'🌧️', title:'Monsoon 2025 IMD Forecast',        views:2400,  pct:28,  eng:'5.2%', acc:'67.8%', shares:64,   trend:'up',   trendVal:'+4%'  },
    { emoji:'💻', title:'India-Japan Semiconductor',         views:2100,  pct:24,  eng:'5.0%', acc:'66.4%', shares:55,   trend:'up',   trendVal:'+9%'  },
    { emoji:'🌱', title:'Climate Change COP Outcomes',       views:1900,  pct:22,  eng:'4.7%', acc:'64.2%', shares:48,   trend:'down', trendVal:'-2%'  },
  ],

  examWise: [
    { exam:'UPSC',      color:'#F97316', articles:128, views:'28.4K', avgEng:'7.2%', accuracy:'74.6%', attempts:'6.2K', badge:'Most Active'  },
    { exam:'SSC',       color:'#F59E0B', articles:64,  views:'12.1K', avgEng:'6.1%', accuracy:'70.3%', attempts:'3.1K', badge:'Growing'      },
    { exam:'IBPS',      color:'#8B5CF6', articles:32,  views:'5.8K',  avgEng:'5.8%', accuracy:'68.9%', attempts:'1.5K', badge:'Stable'       },
    { exam:'RRB',       color:'#10B981', articles:16,  views:'1.9K',  avgEng:'4.9%', accuracy:'65.2%', attempts:'0.5K', badge:'Emerging'     },
    { exam:'State PSC', color:'#3B82F6', articles:16,  views:'0.4K',  avgEng:'4.2%', accuracy:'62.8%', attempts:'0.1K', badge:'New'          },
  ],

  audience: {
    geography: [
      { flag:'🇮🇳', name:'India',          pct:72, sessions:'34.9K' },
      { flag:'🇬🇧', name:'United Kingdom', pct:8,  sessions:'3.9K'  },
      { flag:'🇺🇸', name:'United States',  pct:6,  sessions:'2.9K'  },
      { flag:'🇦🇺', name:'Australia',      pct:5,  sessions:'2.4K'  },
      { flag:'🇨🇦', name:'Canada',         pct:4,  sessions:'1.9K'  },
      { flag:'🌍',  name:'Others',         pct:5,  sessions:'2.4K'  },
    ],
    devices: [
      { icon:'📱', name:'Mobile',  pct:64, color:'#F97316' },
      { icon:'💻', name:'Desktop', pct:29, color:'#3B82F6' },
      { icon:'📟', name:'Tablet',  pct:7,  color:'#10B981' },
    ],
    ageGender: [
      { range:'18–24', male:38, female:22 },
      { range:'25–34', male:42, female:28 },
      { range:'35–44', male:26, female:16 },
      { range:'45–54', male:14, female:8  },
      { range:'55+',   male:6,  female:4  },
    ],
    peakHours: [
      { hour:'6 AM', val:15 }, { hour:'9 AM', val:45 }, { hour:'12 PM', val:62 },
      { hour:'3 PM', val:55 }, { hour:'6 PM', val:78 }, { hour:'9 PM',  val:88 },
      { hour:'12 AM',val:22 },
    ],
  },

  sources: [
    { name:'The Hindu',           abbr:'TH',   color:'#1a1a1a', articles:45, views:'22.8K', eng:'8.2%', acc:'76.1%', reliability:'High'   },
    { name:'PIB',                 abbr:'PIB',  color:'#1565C0', articles:30, views:'9.7K',  eng:'7.1%', acc:'74.3%', reliability:'High'   },
    { name:'Indian Express',      abbr:'IE',   color:'#0D47A1', articles:20, views:'6.1K',  eng:'6.5%', acc:'71.8%', reliability:'High'   },
    { name:'Business Standard',   abbr:'BS',   color:'#B71C1C', articles:12, views:'2.9K',  eng:'5.4%', acc:'67.2%', reliability:'Medium' },
    { name:'LiveMint',            abbr:'LM',   color:'#E65100', articles:8,  views:'1.8K',  eng:'5.1%', acc:'65.8%', reliability:'Medium' },
    { name:'DD News',             abbr:'DD',   color:'#1B5E20', articles:6,  views:'0.7K',  eng:'4.6%', acc:'63.1%', reliability:'Medium' },
  ],
  sourceQuality: [
    { name:'The Hindu',       score:94, bar:94 },
    { name:'PIB',             score:91, bar:91 },
    { name:'Indian Express',  score:88, bar:88 },
    { name:'Business Standard',score:82, bar:82 },
    { name:'LiveMint',        score:78, bar:78 },
  ],

  team: [
    { name:'Priya Sharma',  role:'Senior Editor',    init:'PS', color:'#F97316', published:32, drafts:4, avgEng:'8.1%', acc:'76.2%', perf:'Excellent' },
    { name:'Rohit Verma',   role:'Content Editor',   init:'RV', color:'#3B82F6', published:28, drafts:6, avgEng:'7.4%', acc:'73.8%', perf:'Excellent' },
    { name:'Ananya Singh',  role:'Junior Editor',    init:'AS', color:'#10B981', published:18, drafts:8, avgEng:'6.8%', acc:'70.4%', perf:'Good'      },
    { name:'Vikram Patel',  role:'Content Writer',   init:'VP', color:'#8B5CF6', published:14, drafts:5, avgEng:'6.2%', acc:'68.9%', perf:'Good'      },
    { name:'Neha Gupta',    role:'Research Analyst', init:'NG', color:'#EF4444', published:9,  drafts:3, avgEng:'5.7%', acc:'65.3%', perf:'Average'   },
  ],
  teamActivity: [
    { name:'Priya Sharma', color:'#F97316', init:'PS', action:'published',             article:'India-EU Trade Agreement',      time:'2m ago'  },
    { name:'Rohit Verma',  color:'#3B82F6', init:'RV', action:'sent to AI processing', article:'RBI Monetary Policy Analysis', time:'18m ago' },
    { name:'Ananya Singh', color:'#10B981', init:'AS', action:'approved content',      article:"ISRO's New Launch Success",    time:'45m ago' },
    { name:'Vikram Patel', color:'#8B5CF6', init:'VP', action:'edited draft',          article:'Digital India Progress Report',time:'1h ago'  },
    { name:'Neha Gupta',   color:'#EF4444', init:'NG', action:'rejected news',         article:'Celebrity Update',             time:'2h ago'  },
    { name:'Priya Sharma', color:'#F97316', init:'PS', action:'created new article',   article:'Viksit Bharat 2047 Analysis',  time:'3h ago'  },
  ],
};

/* ══════════════════════════════════════════════════════════
   TAB SWITCHING  — the single source of truth
══════════════════════════════════════════════════════════ */
function switchTab(tabName) {
  /* 1 — Update tab button styles */
  document.querySelectorAll('.an-tab').forEach(function(t) {
    t.classList.toggle('active', t.dataset.tab === tabName);
  });

  /* 2 — Show/hide panels */
  document.querySelectorAll('.an-tab-panel').forEach(function(p) {
    p.classList.remove('an-tab-panel--active');
  });
  var panel = document.getElementById('panel-' + tabName);
  if (panel) panel.classList.add('an-tab-panel--active');

  /* 3 — Build panel content on first visit */
  if (tabName === 'overview') {
    /* Re-render charts because canvas may have been resized */
    setTimeout(function() {
      renderLineChart();
      renderDonut('anStatusDonut', AN.statusDist);
      renderDonut('anExamDonut', AN.examTypes);
    }, 30);
  }
  if (tabName === 'content-performance'  && panel && !panel.dataset.built) { buildContentPerfPanel(panel);  panel.dataset.built = '1'; }
  if (tabName === 'exam-wise'            && panel && !panel.dataset.built) { buildExamWisePanel(panel);     panel.dataset.built = '1'; }
  if (tabName === 'audience-insights'    && panel && !panel.dataset.built) { buildAudiencePanel(panel);     panel.dataset.built = '1'; }
  if (tabName === 'source-performance'   && panel && !panel.dataset.built) { buildSourcePanel(panel);       panel.dataset.built = '1'; }
  if (tabName === 'team-performance'     && panel && !panel.dataset.built) { buildTeamPanel(panel);         panel.dataset.built = '1'; }
}

/* ══════════════════════════════════════════════════════════
   OVERVIEW — KPIs, line chart, donuts, top content, sources
══════════════════════════════════════════════════════════ */
function renderKPIs() {
  var row = document.getElementById('anKpiRow');
  if (!row) return;
  var icons = {
    doc:   '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/>',
    eye:   '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',
    trend: '<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>',
    mcq:   '<rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="9" x2="15" y2="9"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="15" x2="12" y2="15"/>',
    target:'<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
    share: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>',
  };
  row.innerHTML = AN.kpis.map(function(k) {
    var arrowPath = k.dir === 'up'
      ? '<polyline points="18 15 12 9 6 15"/>'
      : '<polyline points="6 9 12 15 18 9"/>';
    return '<div class="an-kpi-card">' +
      '<div class="an-kpi-body">' +
        '<div class="an-kpi-label">' + k.label + '</div>' +
        '<div class="an-kpi-value">' + k.value + '</div>' +
        '<div class="an-kpi-delta ' + k.dir + '">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">' + arrowPath + '</svg>' +
          k.delta + '<span class="an-kpi-delta-sub">&nbsp;' + k.sub + '</span>' +
        '</div>' +
      '</div>' +
      '<div class="an-kpi-icon ' + k.icon + '">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + (icons[k.iconType] || '') + '</svg>' +
      '</div>' +
    '</div>';
  }).join('');
}

function renderLineChart() {
  var canvas = document.getElementById('anViewsChart');
  if (!canvas) return;
  var ctx  = canvas.getContext('2d');
  var data = AN.metrics[AN.activeMetric];
  var labels = AN.chartLabels;

  var W = canvas.parentElement.clientWidth || 500;
  var H = 200;
  var dpr = window.devicePixelRatio || 1;
  canvas.width  = W * dpr;
  canvas.height = H * dpr;
  canvas.style.width  = W + 'px';
  canvas.style.height = H + 'px';
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, W, H);

  var padL=44, padR=16, padT=16, padB=34;
  var cW = W - padL - padR, cH = H - padT - padB;
  var maxV = Math.max.apply(null, data);
  var yTicks = 4;

  for (var i = 0; i <= yTicks; i++) {
    var v = (maxV / yTicks) * i;
    var y = padT + cH - (v / maxV) * cH;
    ctx.beginPath(); ctx.strokeStyle = '#E8ECF0'; ctx.lineWidth = 1;
    ctx.moveTo(padL, y); ctx.lineTo(W - padR, y); ctx.stroke();
    var lbl = maxV >= 1000 ? (v >= 1000 ? (v/1000).toFixed(0)+'K' : v.toFixed(0)) : v.toFixed(1);
    ctx.fillStyle = '#9CA3AF'; ctx.font = '11px sans-serif'; ctx.textAlign = 'right';
    ctx.fillText(lbl, padL - 6, y + 4);
  }

  ctx.fillStyle = '#9CA3AF'; ctx.font = '11px sans-serif'; ctx.textAlign = 'center';
  labels.forEach(function(l, i) {
    var x = padL + (i / (labels.length - 1)) * cW;
    ctx.fillText(l, x, H - 6);
  });

  var pts = data.map(function(v, i) {
    return { x: padL + (i / (data.length - 1)) * cW, y: padT + cH - (v / maxV) * cH };
  });

  var grad = ctx.createLinearGradient(0, padT, 0, padT + cH);
  grad.addColorStop(0,   'rgba(59,130,246,0.18)');
  grad.addColorStop(0.7, 'rgba(59,130,246,0.04)');
  grad.addColorStop(1,   'rgba(59,130,246,0)');
  ctx.beginPath();
  ctx.moveTo(pts[0].x, padT + cH);
  pts.forEach(function(p) { ctx.lineTo(p.x, p.y); });
  ctx.lineTo(pts[pts.length - 1].x, padT + cH);
  ctx.closePath(); ctx.fillStyle = grad; ctx.fill();

  ctx.beginPath(); ctx.strokeStyle = '#3B82F6'; ctx.lineWidth = 2.5;
  ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  pts.forEach(function(p, i) { i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y); });
  ctx.stroke();

  pts.forEach(function(p) {
    ctx.beginPath(); ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#3B82F6'; ctx.strokeStyle = '#fff'; ctx.lineWidth = 2;
    ctx.fill(); ctx.stroke();
  });
}

function renderDonut(canvasId, segments) {
  var canvas = document.getElementById(canvasId);
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var size = 120, dpr = window.devicePixelRatio || 1;
  canvas.width = size * dpr; canvas.height = size * dpr;
  canvas.style.width = size + 'px'; canvas.style.height = size + 'px';
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, size, size);
  var cx = size/2, cy = size/2, outerR = size*0.46, innerR = size*0.30;
  var total = segments.reduce(function(s,g) { return s + g.value; }, 0);
  var angle = -Math.PI / 2, GAP = 0.04;
  segments.forEach(function(seg) {
    var sweep = (seg.value / total) * Math.PI * 2 - GAP;
    ctx.beginPath();
    ctx.arc(cx, cy, outerR, angle, angle + sweep, false);
    ctx.arc(cx, cy, innerR, angle + sweep, angle, true);
    ctx.closePath(); ctx.fillStyle = seg.color; ctx.fill();
    angle += sweep + GAP;
  });
}

function renderStatusLegend() {
  var el = document.getElementById('anStatusLegend');
  if (!el) return;
  el.innerHTML = AN.statusDist.map(function(s) {
    return '<div class="an-legend-item">' +
      '<div class="an-legend-left"><span class="an-legend-dot" style="background:' + s.color + '"></span><span class="an-legend-label">' + s.label + '</span></div>' +
      '<span class="an-legend-val">' + s.value + ' <span class="an-legend-pct">(' + s.pct + ')</span></span>' +
    '</div>';
  }).join('');
}

function renderExamLegend() {
  var el = document.getElementById('anExamLegend');
  if (!el) return;
  el.innerHTML = AN.examTypes.map(function(e) {
    return '<div class="an-exam-legend-item">' +
      '<div class="an-exam-legend-left"><span class="an-legend-dot" style="background:' + e.color + '"></span><span class="an-exam-legend-label">' + e.label + '</span></div>' +
      '<span class="an-exam-legend-val">' + e.value + ' (' + e.pct + ')</span>' +
    '</div>';
  }).join('');
}

function renderTopContent() {
  var tbody = document.getElementById('anTopContentTbody');
  if (!tbody) return;
  function tagCls(t) {
    if (t === 'UPSC') return 'upsc';
    if (t.indexOf('Relations') > -1) return 'int-rel';
    if (t === 'Economy') return 'economy';
    if (t.indexOf('Tech') > -1) return 'science';
    if (t === 'Polity') return 'polity';
    return '';
  }
  tbody.innerHTML = AN.topContent.map(function(item) {
    var tags = item.tags.map(function(t) { return '<span class="an-content-tag ' + tagCls(t) + '">' + t + '</span>'; }).join('');
    return '<tr>' +
      '<td class="col-content"><div class="an-content-cell"><div class="an-content-thumb">' + item.emoji + '</div>' +
        '<div><div class="an-content-title">' + item.title + '</div><div class="an-content-tags">' + tags + '</div></div>' +
      '</div></td>' +
      '<td>' + item.views + '</td><td>' + item.eng + '</td><td>' + item.acc + '</td><td>' + item.shares + '</td>' +
    '</tr>';
  }).join('');
}

function renderSources() {
  var list = document.getElementById('anSourceList');
  if (!list) return;
  list.innerHTML = AN.sources.map(function(s) {
    var v = s.views >= 1000 ? (s.views/1000).toFixed(1)+'K' : s.views;
    return '<div class="an-source-row">' +
      '<span class="an-source-name">' + s.name + '</span>' +
      '<div class="an-source-bar-wrap"><div class="an-source-bar" style="width:' + s.bar + '%"></div></div>' +
      '<span class="an-source-val">' + v + '</span>' +
    '</div>';
  }).join('');
}

/* ══════════════════════════════════════════════════════════
   TAB: CONTENT PERFORMANCE
══════════════════════════════════════════════════════════ */
function buildContentPerfPanel(el) {
  function rows(data) {
    return data.map(function(item) {
      var arrow = item.trend === 'up'
        ? '<polyline points="18 15 12 9 6 15"/>'
        : '<polyline points="6 9 12 15 18 9"/>';
      return '<tr>' +
        '<td><div class="cp-content-cell"><div class="cp-thumb">' + item.emoji + '</div><span class="cp-title">' + item.title + '</span></div></td>' +
        '<td style="text-align:right;font-weight:600;color:var(--text-primary)">' + (item.views/1000).toFixed(1) + 'K</td>' +
        '<td style="text-align:right"><span class="cp-trend ' + item.trend + '">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">' + arrow + '</svg>' + item.trendVal +
        '</span></td>' +
        '<td style="text-align:right"><div class="cp-bar-cell">' + item.eng +
          '<div class="cp-bar-wrap"><div class="cp-bar" style="width:' + item.pct + '%;background:#F97316"></div></div>' +
        '</div></td>' +
        '<td style="text-align:right">' + item.acc + '</td>' +
        '<td style="text-align:right">' + item.shares + '</td>' +
      '</tr>';
    }).join('');
  }

  el.innerHTML =
    '<div class="cp-layout">' +
      '<div class="cp-filters">' +
        '<span class="cp-filter-label">Sort by:</span>' +
        '<select class="cp-filter-select" id="cpSortSelect">' +
          '<option value="views">Views ↓</option>' +
          '<option value="shares">Shares ↓</option>' +
          '<option value="eng">Engagement ↓</option>' +
          '<option value="acc">MCQ Accuracy ↓</option>' +
        '</select>' +
      '</div>' +
      '<table class="cp-full-table">' +
        '<thead><tr>' +
          '<th>Content</th>' +
          '<th style="text-align:right">Views</th>' +
          '<th style="text-align:right">Trend</th>' +
          '<th style="text-align:right">Engagement</th>' +
          '<th style="text-align:right">MCQ Accuracy</th>' +
          '<th style="text-align:right">Shares</th>' +
        '</tr></thead>' +
        '<tbody id="cpTableBody">' + rows(TAB_DATA.contentPerf) + '</tbody>' +
      '</table>' +
    '</div>';

  document.getElementById('cpSortSelect').addEventListener('change', function() {
    var sorted = TAB_DATA.contentPerf.slice().sort(function(a, b) {
      if (this.value === 'views')  return b.views - a.views;
      if (this.value === 'shares') return b.shares - a.shares;
      if (this.value === 'eng')    return parseFloat(b.eng) - parseFloat(a.eng);
      if (this.value === 'acc')    return parseFloat(b.acc) - parseFloat(a.acc);
      return 0;
    }.bind(this));
    document.getElementById('cpTableBody').innerHTML = rows(sorted);
  });
}

/* ══════════════════════════════════════════════════════════
   TAB: EXAM WISE PERFORMANCE
══════════════════════════════════════════════════════════ */
function buildExamWisePanel(el) {
  function metricRow(label, val, barPct, color) {
    return '<div style="margin-bottom:var(--space-3)">' +
      '<div class="ew-metric-row"><span class="ew-metric-label">' + label + '</span><span class="ew-metric-val">' + val + '</span></div>' +
      '<div class="ew-metric-bar-wrap"><div class="ew-metric-bar" style="width:' + Math.min(100, barPct) + '%;background:' + color + '"></div></div>' +
    '</div>';
  }

  var cards = TAB_DATA.examWise.map(function(e) {
    return '<div class="ew-card">' +
      '<div class="ew-card-top"><span class="ew-exam-label">' + e.exam + '</span><span class="ew-exam-badge">' + e.badge + '</span></div>' +
      '<div class="ew-metrics">' +
        metricRow('Articles Published', e.articles, e.articles/128*100, e.color) +
        metricRow('Total Views', e.views, parseFloat(e.views)/28.4*100, e.color) +
        metricRow('Avg. Engagement', e.avgEng, parseFloat(e.avgEng)/10*100, e.color) +
        metricRow('MCQ Accuracy', e.accuracy, parseFloat(e.accuracy), e.color) +
      '</div>' +
    '</div>';
  }).join('');

  var tableRows = TAB_DATA.examWise.map(function(e, i) {
    return '<tr>' +
      '<td><div style="display:flex;align-items:center;gap:8px">' +
        '<span style="width:22px;height:22px;border-radius:50%;background:' + e.color + ';color:#fff;font-size:10px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0">' + (i+1) + '</span>' +
        e.exam +
      '</div></td>' +
      '<td style="text-align:right">' + e.articles + '</td>' +
      '<td style="text-align:right">' + e.views + '</td>' +
      '<td style="text-align:right">' + e.avgEng + '</td>' +
      '<td style="text-align:right">' + e.accuracy + '</td>' +
      '<td style="text-align:right">' + e.attempts + '</td>' +
    '</tr>';
  }).join('');

  el.innerHTML =
    '<div class="ew-grid">' + cards + '</div>' +
    '<table class="ew-compare-table">' +
      '<thead><tr>' +
        '<th>Exam</th>' +
        '<th style="text-align:right">Articles</th>' +
        '<th style="text-align:right">Total Views</th>' +
        '<th style="text-align:right">Avg Engagement</th>' +
        '<th style="text-align:right">MCQ Accuracy</th>' +
        '<th style="text-align:right">MCQ Attempts</th>' +
      '</tr></thead>' +
      '<tbody>' + tableRows + '</tbody>' +
    '</table>';
}

/* ══════════════════════════════════════════════════════════
   TAB: AUDIENCE INSIGHTS
══════════════════════════════════════════════════════════ */
function buildAudiencePanel(el) {
  var d = TAB_DATA.audience;

  var geoRows = d.geography.map(function(g) {
    return '<div class="ai-geo-row">' +
      '<span class="ai-geo-flag">' + g.flag + '</span>' +
      '<span class="ai-geo-name">' + g.name + '</span>' +
      '<div class="ai-geo-bar-wrap"><div class="ai-geo-bar" style="width:' + g.pct + '%"></div></div>' +
      '<span class="ai-geo-val">' + g.sessions + '</span>' +
    '</div>';
  }).join('');

  var deviceRows = d.devices.map(function(dv) {
    return '<div class="ai-device-row">' +
      '<div class="ai-device-icon">' + dv.icon + '</div>' +
      '<div class="ai-device-info">' +
        '<div class="ai-device-name">' + dv.name + '</div>' +
        '<div class="ai-device-bar-wrap"><div class="ai-device-bar" style="width:' + dv.pct + '%;background:' + dv.color + '"></div></div>' +
      '</div>' +
      '<span class="ai-device-pct">' + dv.pct + '%</span>' +
    '</div>';
  }).join('');

  var ageRows = d.ageGender.map(function(a) {
    var total = a.male + a.female;
    var mPct  = Math.round(a.male / total * 100);
    return '<div class="ai-demo-row">' +
      '<span class="ai-demo-label">' + a.range + '</span>' +
      '<div class="ai-demo-bar-wrap">' +
        '<div class="ai-demo-bar-m" style="width:' + mPct + '%"></div>' +
        '<div class="ai-demo-bar-f" style="width:' + (100-mPct) + '%"></div>' +
      '</div>' +
      '<span class="ai-demo-pct">' + total + '%</span>' +
    '</div>';
  }).join('');

  var maxPeak = Math.max.apply(null, d.peakHours.map(function(h){ return h.val; }));
  var peakBars = d.peakHours.map(function(h) {
    return '<div style="display:flex;flex-direction:column;align-items:center;gap:4px;flex:1">' +
      '<div style="height:60px;display:flex;align-items:flex-end">' +
        '<div style="width:100%;max-width:24px;background:var(--brand-primary);border-radius:3px 3px 0 0;height:' + Math.round(h.val/maxPeak*56) + 'px;opacity:.8;min-height:4px"></div>' +
      '</div>' +
      '<span style="font-size:9px;color:var(--text-muted);white-space:nowrap">' + h.hour + '</span>' +
    '</div>';
  }).join('');

  el.innerHTML =
    '<div class="ai-layout">' +
      '<div class="ai-card"><div class="ai-card-header"><div class="ai-card-title">🌍 Geography Distribution</div></div><div class="ai-card-body"><div class="ai-geo-list">' + geoRows + '</div></div></div>' +
      '<div class="ai-card"><div class="ai-card-header"><div class="ai-card-title">📱 Device Breakdown</div></div><div class="ai-card-body"><div class="ai-device-list">' + deviceRows + '</div></div></div>' +
    '</div>' +
    '<div class="ai-full-row">' +
      '<div class="ai-card"><div class="ai-card-header"><div class="ai-card-title">🔁 User Retention</div></div><div class="ai-card-body">' +
        '<div class="ai-retention-layout">' +
          '<div style="position:relative;width:110px;height:110px">' +
            '<canvas id="aiRetentionDonut" style="width:110px;height:110px;display:block"></canvas>' +
            '<div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;pointer-events:none">' +
              '<span style="font-size:18px;font-weight:700;color:var(--text-primary)">68%</span>' +
              '<span style="font-size:10px;color:var(--text-muted)">Return</span>' +
            '</div>' +
          '</div>' +
          '<div class="ai-retention-stats">' +
            '<div class="ai-ret-stat"><span class="ai-ret-dot" style="background:#F97316"></span><span class="ai-ret-label">Return Visitors</span><span class="ai-ret-val" style="margin-left:12px">68%</span></div>' +
            '<div class="ai-ret-stat"><span class="ai-ret-dot" style="background:#E5E7EB"></span><span class="ai-ret-label">New Visitors</span><span class="ai-ret-val" style="margin-left:12px">32%</span></div>' +
            '<div style="margin-top:12px;padding-top:12px;border-top:1px solid var(--border-light)">' +
              '<div style="font-size:11px;color:var(--text-muted);margin-bottom:4px">Avg. Session Duration</div>' +
              '<div style="font-size:18px;font-weight:700;color:var(--text-primary)">4m 32s</div>' +
            '</div>' +
            '<div><div style="font-size:11px;color:var(--text-muted);margin-bottom:4px">Pages per Session</div><div style="font-size:18px;font-weight:700;color:var(--text-primary)">3.8</div></div>' +
          '</div>' +
        '</div>' +
      '</div></div>' +
      '<div class="ai-card"><div class="ai-card-header"><div class="ai-card-title">👥 Age & Gender</div></div><div class="ai-card-body">' +
        '<div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">' +
          '<span style="display:flex;align-items:center;gap:5px;font-size:12px;color:var(--text-secondary)"><span style="width:12px;height:12px;border-radius:2px;background:#3B82F6;display:inline-block"></span> Male</span>' +
          '<span style="display:flex;align-items:center;gap:5px;font-size:12px;color:var(--text-secondary)"><span style="width:12px;height:12px;border-radius:2px;background:#EC4899;display:inline-block"></span> Female</span>' +
        '</div>' +
        '<div class="ai-demo-list">' + ageRows + '</div>' +
      '</div></div>' +
      '<div class="ai-card"><div class="ai-card-header"><div class="ai-card-title">⏰ Peak Activity Hours</div></div><div class="ai-card-body">' +
        '<div style="display:flex;align-items:flex-end;gap:4px;height:80px">' + peakBars + '</div>' +
        '<div style="margin-top:12px;font-size:12px;color:var(--text-secondary)">Peak time: <strong>9 PM</strong> — 88% of daily active users</div>' +
      '</div></div>' +
    '</div>';

  /* Render retention donut after DOM is ready */
  setTimeout(function() {
    renderDonut('aiRetentionDonut', [
      { value:68, color:'#F97316' },
      { value:32, color:'#E5E7EB' },
    ]);
  }, 30);
}

/* ══════════════════════════════════════════════════════════
   TAB: SOURCE PERFORMANCE
══════════════════════════════════════════════════════════ */
function buildSourcePanel(el) {
  var tableRows = TAB_DATA.sources.map(function(s) {
    var relCls = s.reliability === 'High' ? 'high' : s.reliability === 'Medium' ? 'medium' : 'low';
    return '<tr>' +
      '<td><div class="sp-source-cell"><div class="sp-source-logo" style="background:' + s.color + '">' + s.abbr + '</div>' + s.name + '</div></td>' +
      '<td style="text-align:right">' + s.articles + '</td>' +
      '<td style="text-align:right">' + s.views + '</td>' +
      '<td style="text-align:right">' + s.eng + '</td>' +
      '<td style="text-align:right">' + s.acc + '</td>' +
      '<td style="text-align:right"><span class="sp-reliability ' + relCls + '">' + s.reliability + '</span></td>' +
    '</tr>';
  }).join('');

  var qualityItems = TAB_DATA.sourceQuality.map(function(q) {
    var barColor = q.score >= 90 ? '#10B981' : q.score >= 80 ? '#F97316' : '#EF4444';
    return '<div class="sp-quality-item">' +
      '<div class="sp-quality-row"><span class="sp-quality-name">' + q.name + '</span><span class="sp-quality-score">' + q.score + '/100</span></div>' +
      '<div class="sp-quality-bar-wrap"><div class="sp-quality-bar" style="width:' + q.bar + '%;background:' + barColor + '"></div></div>' +
    '</div>';
  }).join('');

  el.innerHTML =
    '<div class="sp-grid">' +
      '<div class="sp-table-wrap"><table class="sp-table">' +
        '<thead><tr>' +
          '<th>Source</th>' +
          '<th style="text-align:right">Articles</th>' +
          '<th style="text-align:right">Total Views</th>' +
          '<th style="text-align:right">Avg Engagement</th>' +
          '<th style="text-align:right">MCQ Accuracy</th>' +
          '<th style="text-align:right">Reliability</th>' +
        '</tr></thead>' +
        '<tbody>' + tableRows + '</tbody>' +
      '</table></div>' +
      '<div class="sp-quality-card">' +
        '<div class="sp-quality-title">📊 Source Quality Scores</div>' +
        qualityItems +
        '<div style="margin-top:12px;padding:12px;background:var(--bg-base);border-radius:var(--radius-md);font-size:var(--font-size-xs);color:var(--text-secondary);line-height:1.5">' +
          'Quality scores are calculated based on accuracy, engagement rate, and content relevance.' +
        '</div>' +
      '</div>' +
    '</div>';
}

/* ══════════════════════════════════════════════════════════
   TAB: TEAM PERFORMANCE
══════════════════════════════════════════════════════════ */
function buildTeamPanel(el) {
  var tableRows = TAB_DATA.team.map(function(m) {
    var perfCls = m.perf === 'Excellent' ? 'excellent' : m.perf === 'Good' ? 'good' : 'average';
    return '<tr>' +
      '<td><div class="tp-member-cell">' +
        '<div class="tp-avatar" style="background:' + m.color + '">' + m.init + '</div>' +
        '<div><div class="tp-member-name">' + m.name + '</div><div class="tp-member-role">' + m.role + '</div></div>' +
      '</div></td>' +
      '<td style="text-align:right">' + m.published + '</td>' +
      '<td style="text-align:right">' + m.drafts + '</td>' +
      '<td style="text-align:right">' + m.avgEng + '</td>' +
      '<td style="text-align:right">' + m.acc + '</td>' +
      '<td style="text-align:right"><span class="tp-perf-badge ' + perfCls + '">' + m.perf + '</span></td>' +
    '</tr>';
  }).join('');

  var actItems = TAB_DATA.teamActivity.map(function(a) {
    return '<div class="tp-activity-item">' +
      '<div class="tp-act-avatar" style="background:' + a.color + '">' + a.init + '</div>' +
      '<div class="tp-act-body">' +
        '<div class="tp-act-text"><strong>' + a.name + '</strong> ' + a.action + ': "' + a.article + '"</div>' +
        '<div class="tp-act-time">' + a.time + '</div>' +
      '</div>' +
    '</div>';
  }).join('');

  el.innerHTML =
    '<div class="tp-grid">' +
      '<div class="tp-table-wrap"><table class="tp-table">' +
        '<thead><tr>' +
          '<th>Team Member</th>' +
          '<th style="text-align:right">Published</th>' +
          '<th style="text-align:right">Drafts</th>' +
          '<th style="text-align:right">Avg Engagement</th>' +
          '<th style="text-align:right">MCQ Accuracy</th>' +
          '<th style="text-align:right">Performance</th>' +
        '</tr></thead>' +
        '<tbody>' + tableRows + '</tbody>' +
      '</table></div>' +
      '<div class="tp-activity-card">' +
        '<div class="tp-activity-header"><div class="tp-activity-title">🕐 Recent Team Activity</div></div>' +
        '<div class="tp-activity-list">' + actItems + '</div>' +
      '</div>' +
    '</div>';
}

/* ══════════════════════════════════════════════════════════
   DATE RANGE DROPDOWN
══════════════════════════════════════════════════════════ */
var anDdEl = null;

function openDateDD(anchor) {
  if (anDdEl) { anDdEl.remove(); anDdEl = null; return; }
  anDdEl = document.createElement('div');
  anDdEl.className = 'an-date-dd';
  anDdEl.innerHTML = '<div class="preset-list">' +
    AN.dateRanges.map(function(r, i) {
      return '<div class="preset-item' + (i === AN.activeDateIdx ? ' active' : '') + '" data-idx="' + i + '">' +
        '<span>' + r.label + '</span>' +
        '<span class="range-label">' + r.range + '</span>' +
      '</div>';
    }).join('') +
  '</div>';
  document.body.appendChild(anDdEl);

  var rect = anchor.getBoundingClientRect();
  var w = 300;
  anDdEl.style.top  = (rect.bottom + 4 + window.scrollY) + 'px';
  anDdEl.style.left = Math.max(8, rect.right - w) + 'px';
  anDdEl.style.width = w + 'px';
  requestAnimationFrame(function() { anDdEl.classList.add('open'); });

  anDdEl.querySelectorAll('.preset-item').forEach(function(item) {
    item.addEventListener('click', function(e) {
      e.stopPropagation();
      AN.activeDateIdx = parseInt(item.dataset.idx);
      var label = document.querySelector('.an-date-label');
      if (label) label.textContent = AN.dateRanges[AN.activeDateIdx].range;
      anDdEl.remove(); anDdEl = null;
      showToast('Date range: ' + AN.dateRanges[AN.activeDateIdx].range, 'success');
    });
  });

  setTimeout(function() {
    document.addEventListener('click', function out(e) {
      if (anDdEl && !anDdEl.contains(e.target) && e.target.id !== 'anDateBtn') {
        anDdEl.remove(); anDdEl = null;
      }
      document.removeEventListener('click', out);
    });
  }, 0);
}

/* ══════════════════════════════════════════════════════════
   METRIC DROPDOWN
══════════════════════════════════════════════════════════ */
var metricDdEl = null;

function openMetricDD(anchor) {
  if (metricDdEl) { metricDdEl.remove(); metricDdEl = null; return; }
  metricDdEl = document.createElement('div');
  metricDdEl.className = 'ui-dropdown dd-small ui-dropdown--open';
  metricDdEl.style.minWidth = '180px';
  metricDdEl.innerHTML = Object.keys(AN.metrics).map(function(m) {
    return '<button class="dd-item' + (m === AN.activeMetric ? ' dd-item--active' : '') + '" data-metric="' + m + '">' + m + '</button>';
  }).join('');
  document.body.appendChild(metricDdEl);

  var rect = anchor.getBoundingClientRect();
  metricDdEl.style.top  = (rect.bottom + 4 + window.scrollY) + 'px';
  metricDdEl.style.left = (rect.right - 180) + 'px';

  metricDdEl.querySelectorAll('[data-metric]').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      AN.activeMetric = btn.dataset.metric;
      var lbl = document.getElementById('anMetricLabel');
      if (lbl) lbl.textContent = AN.activeMetric;
      metricDdEl.remove(); metricDdEl = null;
      renderLineChart();
    });
  });

  setTimeout(function() {
    document.addEventListener('click', function out(e) {
      if (metricDdEl && !metricDdEl.contains(e.target)) { metricDdEl.remove(); metricDdEl = null; }
      document.removeEventListener('click', out);
    });
  }, 0);
}

/* ══════════════════════════════════════════════════════════
   TOAST
══════════════════════════════════════════════════════════ */
function showToast(msg, type) {
  type = type || 'info';
  var wrap = document.getElementById('toastWrap');
  if (!wrap) { wrap = document.createElement('div'); wrap.id = 'toastWrap'; document.body.appendChild(wrap); }
  wrap.innerHTML = '<div class="ui-toast ui-toast--' + type + '">' + msg + '</div>';
  requestAnimationFrame(function() {
    var t = wrap.querySelector('.ui-toast');
    if (t) t.classList.add('ui-toast--show');
  });
  setTimeout(function() { wrap.innerHTML = ''; }, 3000);
}

/* ══════════════════════════════════════════════════════════
   INIT
══════════════════════════════════════════════════════════ */
document.addEventListener('app:ready', function() {
  /* Wire tab buttons */
  document.querySelectorAll('.an-tab').forEach(function(tab) {
    tab.addEventListener('click', function() {
      switchTab(tab.dataset.tab);
    });
  });

  /* Wire header buttons */
  var dateBtn = document.getElementById('anDateBtn');
  if (dateBtn) dateBtn.addEventListener('click', function(e) { e.stopPropagation(); openDateDD(dateBtn); });

  var metricBtn = document.getElementById('anMetricSelectBtn');
  if (metricBtn) metricBtn.addEventListener('click', function(e) { e.stopPropagation(); openMetricDD(metricBtn); });

  var exportBtn = document.getElementById('anExportBtn');
  if (exportBtn) exportBtn.addEventListener('click', function() {
    showToast('Preparing export report…', 'info');
    setTimeout(function() { showToast('Report downloaded ✓', 'success'); }, 1500);
  });

  var viewAllContent = document.getElementById('anViewAllContent');
  if (viewAllContent) viewAllContent.addEventListener('click', function() { window.location.href = 'content-library.html'; });

  var viewAllSources = document.getElementById('anViewAllSources');
  if (viewAllSources) viewAllSources.addEventListener('click', function() { switchTab('source-performance'); });

  /* Render overview */
  renderKPIs();
  renderStatusLegend();
  renderExamLegend();
  renderTopContent();
  renderSources();

  setTimeout(function() {
    renderLineChart();
    renderDonut('anStatusDonut', AN.statusDist);
    renderDonut('anExamDonut',   AN.examTypes);
  }, 50);
});

/* Re-render charts on resize */
var resizeTimer;
window.addEventListener('resize', function() {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function() {
    renderLineChart();
    renderDonut('anStatusDonut', AN.statusDist);
    renderDonut('anExamDonut', AN.examTypes);
  }, 150);
});
