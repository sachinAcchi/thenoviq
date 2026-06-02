/* ============================================================
   CONTENT LIBRARY JS — Noviq
   Table · Search · Filters · Tabs · Pagination · Modals
   + Dynamic Create Content form by type
   ============================================================ */
'use strict';

/* ══════════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════════ */
var CL_DATA = [
  { id:1,  emoji:'🌏', title:'India-EU Trade Agreement: Key Impact and Opportunities',    subject:'int-rel', subjectLabel:'International Relations', exams:['UPSC','SSC'],         type:'Article',       author:'Priya Sharma',  date:'May 21, 2025', time:'10:30 AM', status:'published' },
  { id:2,  emoji:'🏦', title:'RBI Keeps Repo Rate Unchanged: What It Means for Economy',  subject:'economy', subjectLabel:'Economy',                 exams:['UPSC','SSC','IBPS'],  type:'Article',       author:'Rohit Verma',   date:'May 21, 2025', time:'09:15 AM', status:'published' },
  { id:3,  emoji:'🚀', title:"ISRO's New Launch Mission to Study Solar Winds",            subject:'science', subjectLabel:'Science & Tech',          exams:['UPSC','SSC'],         type:'Article',       author:'Ananya Singh',  date:'May 21, 2025', time:'08:40 AM', status:'published' },
  { id:4,  emoji:'🏛️', title:'Union Budget 2025: Major Announcements for Infrastructure', subject:'polity',  subjectLabel:'Polity',                  exams:['UPSC','SSC','RRB'],   type:'Article',       author:'Vikram Patel',  date:'May 20, 2025', time:'11:20 PM', status:'published' },
  { id:5,  emoji:'📈', title:'Global Markets Rally as US Inflation Shows Signs of Cooling',subject:'economy',subjectLabel:'Economy',                 exams:['UPSC','IBPS'],        type:'Article',       author:'Neha Gupta',    date:'May 20, 2025', time:'10:05 PM', status:'draft'     },
  { id:6,  emoji:'🎓', title:'New Education Policy: Implementation Updates from States',  subject:'polity',  subjectLabel:'Polity',                  exams:['UPSC','SSC','RRB'],   type:'Article',       author:'Priya Sharma',  date:'May 20, 2025', time:'06:30 PM', status:'draft'     },
  { id:7,  emoji:'⚖️', title:'Supreme Court Verdict on Electoral Bonds Scheme',           subject:'polity',  subjectLabel:'Polity',                  exams:['UPSC','SSC'],         type:'Article',       author:'Rohit Verma',   date:'May 20, 2025', time:'04:20 PM', status:'archived'  },
  { id:8,  emoji:'🌧️', title:'Monsoon 2025 Forecast: IMD Predicts Above Normal Rainfall',subject:'geo',     subjectLabel:'Geography',               exams:['UPSC','SSC'],         type:'MCQ Set',       author:'Ananya Singh',  date:'May 19, 2025', time:'03:00 PM', status:'published' },
  { id:9,  emoji:'💻', title:'India-Japan Collaboration in Semiconductor Development',    subject:'science', subjectLabel:'Science & Tech',          exams:['UPSC','SSC'],         type:'Article',       author:'Vikram Patel',  date:'May 19, 2025', time:'01:00 PM', status:'published' },
  { id:10, emoji:'🌱', title:'Climate Change Global Update: COP Outcomes',                subject:'geo',     subjectLabel:'Geography',               exams:['UPSC','SSC','RRB'],   type:'Notes',         author:'Neha Gupta',    date:'May 18, 2025', time:'11:00 AM', status:'published' },
  { id:11, emoji:'🏗️', title:'Viksit Bharat 2047: Key Pillars and Implementation',       subject:'polity',  subjectLabel:'Polity',                  exams:['UPSC','SSC'],         type:'Article',       author:'Priya Sharma',  date:'May 18, 2025', time:'10:30 AM', status:'draft'     },
  { id:12, emoji:'📊', title:'India GDP Growth Revised to 7.6% for FY2024-25',            subject:'economy', subjectLabel:'Economy',                 exams:['UPSC','SSC','IBPS'],  type:'Article',       author:'Rohit Verma',   date:'May 17, 2025', time:'09:00 AM', status:'published' },
  { id:13, emoji:'🔬', title:'New Drug Discovery: IIT Scientists Develop Cancer Treatment',subject:'science',subjectLabel:'Science & Tech',         exams:['UPSC','SSC'],         type:'Article',       author:'Ananya Singh',  date:'May 16, 2025', time:'02:00 PM', status:'published' },
  { id:14, emoji:'🌐', title:"Digital Public Infrastructure: India's UPI Goes Global",   subject:'economy', subjectLabel:'Economy',                 exams:['UPSC','SSC','IBPS'],  type:'Current Affairs',author:'Vikram Patel', date:'May 15, 2025', time:'11:30 AM', status:'archived'  },
];

/* ── State ── */
var clTab     = 'all';
var clPage    = 1;
var clPerPage = 10;
var clSearch  = '';
var clSubject = '';
var clExam    = '';
var clType    = '';
var clSortDate = 'desc';
var clSelected = {};

/* ══════════════════════════════════════════════════════════
   TABLE RENDER
══════════════════════════════════════════════════════════ */
function clGetFiltered() {
  var list = CL_DATA.filter(function(i) {
    if (clTab === 'published') return i.status === 'published';
    if (clTab === 'draft')     return i.status === 'draft';
    if (clTab === 'archived')  return i.status === 'archived';
    return true;
  });
  if (clSearch)  list = list.filter(function(i) { return i.title.toLowerCase().includes(clSearch.toLowerCase()) || i.author.toLowerCase().includes(clSearch.toLowerCase()); });
  if (clSubject) list = list.filter(function(i) { return i.subject === clSubject; });
  if (clExam)    list = list.filter(function(i) { return i.exams.includes(clExam); });
  if (clType)    list = list.filter(function(i) { return i.type === clType; });
  list.sort(function(a,b) { return clSortDate === 'desc' ? b.id - a.id : a.id - b.id; });
  return list;
}

function clGetPage(list) { return list.slice((clPage-1)*clPerPage, clPage*clPerPage); }

function clRenderTable() {
  var filtered = clGetFiltered();
  var page     = clGetPage(filtered);
  var tbody    = document.getElementById('clTbody');
  if (!tbody) return;

  if (page.length === 0) {
    tbody.innerHTML = '<tr><td colspan="9" style="text-align:center;padding:40px;color:var(--text-muted);">No content found.</td></tr>';
  } else {
    var authorColors = { 'Priya Sharma':'#F97316','Rohit Verma':'#3B82F6','Ananya Singh':'#10B981','Vikram Patel':'#8B5CF6','Neha Gupta':'#EF4444' };
    var html = '';
    page.forEach(function(item) {
      var color = authorColors[item.author] || '#6B7280';
      var init  = item.author.split(' ').map(function(w){ return w[0]; }).join('');
      var examBadges = item.exams.map(function(e){ return '<span class="cl-exam-badge">'+e+'</span>'; }).join('');
      var statusCls  = item.status === 'published' ? 'published' : item.status === 'draft' ? 'draft' : 'archived';
      var statusLabel = item.status.charAt(0).toUpperCase() + item.status.slice(1);
      html += '<tr data-id="'+item.id+'">' +
        '<td><input type="checkbox" class="cl-checkbox cl-row-check" data-id="'+item.id+'" '+(clSelected[item.id]?'checked':'')+'></td>' +
        '<td><div class="cl-title-cell"><div class="cl-thumb">'+item.emoji+'</div><span class="cl-title-text">'+item.title+'</span></div></td>' +
        '<td class="col-subject"><span class="cl-subject-badge '+item.subject+'">'+item.subjectLabel+'</span></td>' +
        '<td class="col-exam"><div class="cl-exam-badges">'+examBadges+'</div></td>' +
        '<td class="col-type"><div class="cl-type-cell"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:13px;height:13px;flex-shrink:0;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>'+item.type+'</div></td>' +
        '<td class="col-author"><div class="cl-author-cell"><div class="cl-author-avatar" style="background:'+color+'">'+init+'</div><span class="cl-author-name">'+item.author+'</span></div></td>' +
        '<td class="col-date"><div class="cl-date-cell"><span class="cl-date-day">'+item.date+'</span><span class="cl-date-time">'+item.time+'</span></div></td>' +
        '<td class="col-status"><span class="cl-status-badge '+statusCls+'"><span class="cl-status-dot"></span>'+statusLabel+'</span></td>' +
        '<td class="col-actions"><div class="cl-action-btns">' +
          '<button class="cl-action-btn view" data-id="'+item.id+'" title="Preview"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></button>' +
          '<button class="cl-action-btn edit" data-id="'+item.id+'" title="Edit"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>' +
          '<button class="cl-action-btn delete" data-id="'+item.id+'" title="Delete"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg></button>' +
        '</div></td>' +
      '</tr>';
    });
    tbody.innerHTML = html;
  }

  /* Wire row actions */
  tbody.querySelectorAll('.cl-row-check').forEach(function(cb) {
    cb.addEventListener('change', function() {
      clSelected[parseInt(cb.dataset.id)] = cb.checked;
      clUpdateSelectAll();
    });
  });
  tbody.querySelectorAll('.cl-action-btn.view').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      var item = CL_DATA.find(function(i){ return i.id === parseInt(btn.dataset.id); });
      clOpenPreviewDrawer(item);
    });
  });
  tbody.querySelectorAll('.cl-action-btn.edit').forEach(function(btn) {
    btn.addEventListener('click', function() { window.location.href = 'content-editor.html'; });
  });
  tbody.querySelectorAll('.cl-action-btn.delete').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var id  = parseInt(btn.dataset.id);
      var idx = CL_DATA.findIndex(function(i){ return i.id === id; });
      if (idx > -1) { CL_DATA.splice(idx, 1); clRenderTable(); clUpdateTabs(); clShowToast('Content deleted', 'danger'); }
    });
  });

  clRenderPagination(filtered.length);
  clUpdateTabs();
}

/* ── Select all ── */
function clUpdateSelectAll() {
  var all = document.getElementById('clCheckAll');
  if (!all) return;
  var page = clGetPage(clGetFiltered());
  var checkedAll = page.length > 0 && page.every(function(i){ return clSelected[i.id]; });
  all.checked = checkedAll;
  all.indeterminate = !checkedAll && page.some(function(i){ return clSelected[i.id]; });
}

/* ── Tabs ── */
function clUpdateTabs() {
  var total     = CL_DATA.length;
  var published = CL_DATA.filter(function(i){ return i.status==='published'; }).length;
  var draft     = CL_DATA.filter(function(i){ return i.status==='draft'; }).length;
  var archived  = CL_DATA.filter(function(i){ return i.status==='archived'; }).length;
  function el(id){ return document.getElementById(id); }
  if(el('tabAll'))       el('tabAll').textContent       = 'All Content ('+total+')';
  if(el('tabPublished')) el('tabPublished').textContent = 'Published ('+published+')';
  if(el('tabDraft'))     el('tabDraft').textContent     = 'Drafts ('+draft+')';
  if(el('tabArchived'))  el('tabArchived').textContent  = 'Archived ('+archived+')';
}

function clSetActiveTab(val) {
  document.querySelectorAll('.cl-tab').forEach(function(t){ t.classList.toggle('active', t.dataset.tab === val); });
}

/* ── Pagination ── */
function clRenderPagination(total) {
  var totalPages = Math.max(1, Math.ceil(total / clPerPage));
  var s = total===0 ? 0 : (clPage-1)*clPerPage+1;
  var e = Math.min(clPage*clPerPage, total);
  var info  = document.getElementById('clPaginationInfo');
  var pages = document.getElementById('clPages');
  if (info) info.textContent = 'Showing '+s+' to '+e+' of '+total+' results';
  if (!pages) return;

  function buildPgs() {
    if (totalPages <= 5) { var a=[]; for(var i=1;i<=totalPages;i++) a.push(i); return a; }
    if (clPage <= 3)  return [1,2,3,'…',totalPages];
    if (clPage >= totalPages-1) return [1,'…',totalPages-2,totalPages-1,totalPages];
    return [1,'…',clPage-1,clPage,clPage+1,'…',totalPages];
  }
  var pNums = buildPgs();
  var html = '<button class="cl-pg-btn" id="clPrev" '+(clPage===1?'disabled':'')+'><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg></button>';
  pNums.forEach(function(p) {
    if (p === '…') html += '<span class="cl-pg-dots">…</span>';
    else html += '<button class="cl-pg-btn '+(p===clPage?'active':'')+'" data-pg="'+p+'">'+p+'</button>';
  });
  html += '<button class="cl-pg-btn" id="clNext" '+(clPage===totalPages?'disabled':'')+'><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg></button>';
  pages.innerHTML = html;
  pages.querySelector('#clPrev').addEventListener('click', function(){ clPage--; clRenderTable(); });
  pages.querySelector('#clNext').addEventListener('click', function(){ clPage++; clRenderTable(); });
  pages.querySelectorAll('[data-pg]').forEach(function(b){ b.addEventListener('click', function(){ clPage=parseInt(b.dataset.pg); clRenderTable(); }); });
}

/* ── Toast ── */
function clShowToast(msg, type) {
  var wrap = document.getElementById('toastWrap');
  if (!wrap) { wrap = document.createElement('div'); wrap.id='toastWrap'; document.body.appendChild(wrap); }
  wrap.innerHTML = '<div class="ui-toast ui-toast--'+(type||'info')+'">'+msg+'</div>';
  requestAnimationFrame(function(){ var t=wrap.querySelector('.ui-toast'); if(t) t.classList.add('ui-toast--show'); });
  setTimeout(function(){ wrap.innerHTML=''; }, 3000);
}

/* ══════════════════════════════════════════════════════════
   PREVIEW DRAWER
══════════════════════════════════════════════════════════ */
function clOpenPreviewDrawer(item) {
  if (!item) return;
  var body = document.getElementById('clPreviewDrawerBody');
  if (!body) return;
  var authorColors = { 'Priya Sharma':'#F97316','Rohit Verma':'#3B82F6','Ananya Singh':'#10B981','Vikram Patel':'#8B5CF6','Neha Gupta':'#EF4444' };
  var color = authorColors[item.author] || '#6B7280';
  var init  = item.author.split(' ').map(function(w){ return w[0]; }).join('');
  var examBadges = item.exams.map(function(e){ return '<span class="cl-exam-badge">'+e+'</span>'; }).join('');
  body.innerHTML =
    '<div class="cl-preview-thumb">'+item.emoji+'</div>' +
    '<div><span class="cl-preview-type-badge">'+item.type.toUpperCase()+'</span><h3 class="cl-preview-title">'+item.title+'</h3></div>' +
    '<div class="cl-preview-meta-row"><span class="cl-subject-badge '+item.subject+'">'+item.subjectLabel+'</span>'+examBadges+'</div>' +
    '<hr class="cl-preview-divider">' +
    '<div class="cl-preview-detail-list">' +
      '<div class="cl-preview-detail-row"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:14px;height:14px;color:var(--text-muted);margin-top:2px;flex-shrink:0;"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg><div><div class="cl-preview-detail-key">Author</div><div class="cl-preview-detail-val" style="display:flex;align-items:center;gap:8px;"><span style="width:22px;height:22px;border-radius:50%;background:'+color+';display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:#fff;flex-shrink:0;">'+init+'</span>'+item.author+'</div></div></div>' +
      '<div class="cl-preview-detail-row"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:14px;height:14px;color:var(--text-muted);margin-top:2px;flex-shrink:0;"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/></svg><div><div class="cl-preview-detail-key">Published Date</div><div class="cl-preview-detail-val">'+item.date+' &nbsp; '+item.time+'</div></div></div>' +
      '<div class="cl-preview-detail-row"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:14px;height:14px;color:var(--text-muted);margin-top:2px;flex-shrink:0;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg><div><div class="cl-preview-detail-key">Status</div><div><span class="cl-status-badge '+item.status+'"><span class="cl-status-dot"></span>'+item.status.charAt(0).toUpperCase()+item.status.slice(1)+'</span></div></div></div>' +
    '</div>';
  document.getElementById('clPreviewOverlay').classList.add('open');
}
function clClosePreviewDrawer() { var el = document.getElementById('clPreviewOverlay'); if(el) el.classList.remove('open'); }

/* ══════════════════════════════════════════════════════════
   DYNAMIC CREATE FORM
══════════════════════════════════════════════════════════ */
var clMcqOptions = [
  { label:'A', text:'', correct:false },
  { label:'B', text:'', correct:false },
  { label:'C', text:'', correct:false },
  { label:'D', text:'', correct:false },
];
var clKeyFacts = [''];

function clCountWords(str) {
  return str.trim() ? str.trim().split(/\s+/).length : 0;
}

function clEsc(s) {
  if (!s) return '';
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

/* ── HTML builders ── */
function clBuildArticleFields() {
  var factsHtml = clKeyFacts.map(function(f, i) {
    return '<div class="cld-fact-row" data-idx="'+i+'">' +
      '<span class="cld-drag-handle"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="5" r="1"/><circle cx="9" cy="12" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="19" r="1"/></svg></span>' +
      '<input class="cld-fact-input" type="text" value="'+clEsc(f)+'" placeholder="Enter a key fact or bullet point…" />' +
      '<button type="button" class="cld-delete-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg></button>' +
    '</div>';
  }).join('');

  return '<div class="cld-section">' +
    '<div class="cld-section-header"><span class="cld-section-icon">📝</span><span class="cld-section-title">Article Content</span><span class="cld-section-badge">Required</span></div>' +
    '<div class="cld-section-body">' +
      '<div class="cld-field">' +
        '<label class="cld-label">Summary <span class="req">*</span></label>' +
        '<textarea class="cld-textarea" id="cldArticleSummary" rows="4" maxlength="800" placeholder="Write the article summary or main content…"></textarea>' +
        '<div class="cld-word-count" id="cldArticleWC">0 words</div>' +
      '</div>' +
      '<div class="cld-field">' +
        '<label class="cld-label">Key Facts</label>' +
        '<div class="cld-facts-list" id="cldFactsList">'+factsHtml+'</div>' +
        '<button type="button" class="cld-add-btn" id="cldAddFact"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> Add Key Fact</button>' +
      '</div>' +
    '</div>' +
  '</div>';
}

function clBuildMCQFields() {
  var optHtml = clMcqOptions.map(function(opt, i) {
    return '<div class="cld-opt-row'+(opt.correct?' correct':'') + '" data-idx="'+i+'">' +
      '<span class="cld-opt-lbl">'+opt.label+'</span>' +
      '<input class="cld-opt-input" type="text" value="'+clEsc(opt.text)+'" placeholder="Option '+opt.label+'…" />' +
      (opt.correct ? '<span class="cld-correct-tag">✓ Correct</span>' : '') +
      '<input type="radio" class="cld-opt-radio" name="cldMcqCorrect" '+(opt.correct?'checked':'')+' title="Mark as correct" />' +
      '<button type="button" class="cld-delete-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg></button>' +
    '</div>';
  }).join('');

  return '<div class="cld-section">' +
    '<div class="cld-section-header"><span class="cld-section-icon">🟠</span><span class="cld-section-title">MCQ Builder</span><span class="cld-section-badge">Required</span></div>' +
    '<div class="cld-section-body">' +
      '<div class="cld-field">' +
        '<label class="cld-label">Question <span class="req">*</span></label>' +
        '<input type="text" class="cl-form-input" id="cldMcqQ" maxlength="300" placeholder="Enter the MCQ question…" />' +
        '<div class="cl-char-count" id="cldMcqQCount">0/300</div>' +
      '</div>' +
      '<div class="cld-field">' +
        '<label class="cld-label">Options <span class="req">*</span></label>' +
        '<div style="font-size:11px;color:var(--text-muted);margin-bottom:6px;">Click the radio button to mark the correct answer</div>' +
        '<div class="cld-opts-list" id="cldOptsList">'+optHtml+'</div>' +
        '<button type="button" class="cld-add-btn" id="cldAddOpt"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> Add Option</button>' +
      '</div>' +
      '<div class="cld-field">' +
        '<label class="cld-label">Explanation</label>' +
        '<textarea class="cld-textarea" id="cldMcqExp" rows="3" maxlength="600" placeholder="Explain why the correct answer is right…"></textarea>' +
        '<div class="cld-word-count" id="cldMcqExpWC">0 words</div>' +
      '</div>' +
      '<div class="cld-field-row">' +
        '<div class="cld-field"><label class="cld-label">MCQ Type</label><select class="cl-form-select" id="cldMcqType"><option>Single Correct</option><option>Multiple Correct</option><option>Assertion-Reason</option><option>Matching Type</option></select></div>' +
        '<div class="cld-field"><label class="cld-label">Marks</label><select class="cl-form-select" id="cldMcqMarks"><option value="1">1 Mark</option><option value="2" selected>2 Marks</option><option value="3">3 Marks</option><option value="4">4 Marks</option></select></div>' +
      '</div>' +
    '</div>' +
  '</div>';
}

function clBuildNotesFields() {
  return '<div class="cld-section">' +
    '<div class="cld-section-header"><span class="cld-section-icon">📒</span><span class="cld-section-title">Notes Content</span><span class="cld-section-badge">Required</span></div>' +
    '<div class="cld-section-body">' +
      '<div class="cld-field">' +
        '<label class="cld-label">Notes Content <span class="req">*</span></label>' +
        '<div class="cld-toolbar">' +
          '<button type="button" class="cld-tb-btn"><strong>B</strong></button>' +
          '<button type="button" class="cld-tb-btn"><em>I</em></button>' +
          '<button type="button" class="cld-tb-btn"><u>U</u></button>' +
          '<span class="cld-sep"></span>' +
          '<button type="button" class="cld-tb-btn" style="font-size:10px;font-weight:700;">H1</button>' +
          '<button type="button" class="cld-tb-btn" style="font-size:10px;font-weight:700;">H2</button>' +
          '<span class="cld-sep"></span>' +
          '<button type="button" class="cld-tb-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:13px;height:13px;"><line x1="9" y1="6" x2="20" y2="6"/><line x1="9" y1="12" x2="20" y2="12"/><line x1="9" y1="18" x2="20" y2="18"/><circle cx="4" cy="6" r="1" fill="currentColor"/><circle cx="4" cy="12" r="1" fill="currentColor"/><circle cx="4" cy="18" r="1" fill="currentColor"/></svg></button>' +
        '</div>' +
        '<textarea class="cld-textarea cld-notes-body" id="cldNotesContent" placeholder="Write detailed notes, study material…"></textarea>' +
        '<div class="cld-word-count" id="cldNotesWC">0 words</div>' +
      '</div>' +
      '<div class="cld-field-row">' +
        '<div class="cld-field"><label class="cld-label">Notes Format</label><select class="cl-form-select"><option>Structured Notes</option><option>Q&amp;A Format</option><option>Mind Map Style</option><option>Timeline</option></select></div>' +
        '<div class="cld-field"><label class="cld-label">Chapter / Topic</label><input type="text" class="cl-form-input" id="cldNotesChapter" placeholder="e.g. Chapter 5 — Directive Principles" /></div>' +
      '</div>' +
      '<div class="cld-field">' +
        '<label class="cld-label">Key Takeaways</label>' +
        '<textarea class="cld-textarea" id="cldNotesTakeaways" rows="2" placeholder="Most important points to remember…"></textarea>' +
      '</div>' +
    '</div>' +
  '</div>';
}

function clBuildCurrentAffairsFields() {
  var areas = ['National','International','Economic','Environment','Science & Tech','Social','Constitutional','Historical'];
  var areasHtml = areas.map(function(a) {
    return '<label class="cld-impact-chip"><input type="checkbox" style="accent-color:var(--brand-primary);" /> '+a+'</label>';
  }).join('');

  return '<div class="cld-section">' +
    '<div class="cld-section-header"><span class="cld-section-icon">📰</span><span class="cld-section-title">Current Affairs Details</span><span class="cld-section-badge">Required</span></div>' +
    '<div class="cld-section-body">' +
      '<div class="cld-field">' +
        '<label class="cld-label">News Summary <span class="req">*</span></label>' +
        '<textarea class="cld-textarea" id="cldCaSummary" rows="4" maxlength="800" placeholder="Summarise the current affairs event in 3–5 sentences…"></textarea>' +
        '<div class="cld-word-count" id="cldCaWC">0 words</div>' +
      '</div>' +
      '<div class="cld-field-row">' +
        '<div class="cld-field"><label class="cld-label">News Source <span class="req">*</span></label><select class="cl-form-select" id="cldCaSource"><option value="">Select source</option><option>The Hindu</option><option>PIB</option><option>Indian Express</option><option>Business Standard</option><option>LiveMint</option><option>DD News</option><option>Other</option></select></div>' +
        '<div class="cld-field"><label class="cld-label">Event Date</label><input type="text" class="cl-form-input" id="cldCaDate" placeholder="e.g. May 21, 2025" /></div>' +
      '</div>' +
      '<div class="cld-field"><label class="cld-label">Impact Areas</label><div class="cld-impact-grid">'+areasHtml+'</div></div>' +
      '<div class="cld-field-row">' +
        '<div class="cld-field"><label class="cld-label">Exam Relevance</label><select class="cl-form-select" id="cldCaRelevance"><option>Prelims Only</option><option>Mains Only</option><option selected>Both Prelims &amp; Mains</option><option>Interview</option></select></div>' +
        '<div class="cld-field"><label class="cld-label">GS Paper</label><select class="cl-form-select" id="cldCaGsPaper"><option value="">Select GS paper</option><option>GS Paper I</option><option selected>GS Paper II</option><option>GS Paper III</option><option>GS Paper IV</option><option>Essay</option></select></div>' +
      '</div>' +
    '</div>' +
  '</div>';
}

/* ── Render dynamic section ── */
function clRenderDynamicFields(type) {
  var container = document.getElementById('clDynamicFields');
  if (!container) return;

  /* Update badge in header */
  var badge = document.getElementById('clTypeBadge');
  var icons = { 'Article':'📝', 'MCQ Set':'🟠', 'Notes':'📒', 'Current Affairs':'📰' };
  if (badge) {
    badge.style.display = 'inline-flex';
    badge.textContent = (icons[type] || '') + ' ' + type;
  }

  /* Update submit button text */
  var submitBtn = document.getElementById('clCreateSubmitBtn');
  var labels = { 'Article':'Create Article', 'MCQ Set':'Create MCQ Set', 'Notes':'Create Notes', 'Current Affairs':'Create Current Affairs' };
  if (submitBtn) submitBtn.textContent = labels[type] || 'Create Content';

  /* Render correct fields */
  var html = '';
  if      (type === 'Article')        html = clBuildArticleFields();
  else if (type === 'MCQ Set')        html = clBuildMCQFields();
  else if (type === 'Notes')          html = clBuildNotesFields();
  else if (type === 'Current Affairs') html = clBuildCurrentAffairsFields();
  container.innerHTML = html;

  /* Wire interactive elements */
  if (type === 'Article') {
    var addFact = document.getElementById('cldAddFact');
    if (addFact) addFact.addEventListener('click', function() {
      clKeyFacts.push('');
      clRenderDynamicFields('Article');
      var inputs = document.querySelectorAll('.cld-fact-input');
      if (inputs.length) inputs[inputs.length-1].focus();
    });
    document.querySelectorAll('.cld-fact-input').forEach(function(inp, i) {
      inp.addEventListener('input', function() { clKeyFacts[i] = this.value; });
    });
    document.querySelectorAll('[data-idx] .cld-delete-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var idx = parseInt(btn.closest('[data-idx]').dataset.idx);
        if (clKeyFacts.length > 1) { clKeyFacts.splice(idx, 1); clRenderDynamicFields('Article'); }
      });
    });
    var summaryTA = document.getElementById('cldArticleSummary');
    if (summaryTA) summaryTA.addEventListener('input', function() {
      var wc = document.getElementById('cldArticleWC');
      if (wc) wc.textContent = clCountWords(this.value) + ' words';
    });
  }

  if (type === 'MCQ Set') {
    document.querySelectorAll('.cld-opt-input').forEach(function(inp, i) {
      inp.addEventListener('input', function() { clMcqOptions[i].text = this.value; });
    });
    document.querySelectorAll('.cld-opt-radio').forEach(function(radio, i) {
      radio.addEventListener('change', function() {
        clMcqOptions.forEach(function(o, j) { o.correct = j === i; });
        clRenderDynamicFields('MCQ Set');
        var opts = document.querySelectorAll('.cld-opt-input');
        if (opts[i]) opts[i].focus();
      });
    });
    document.querySelectorAll('.cld-opt-row .cld-delete-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var idx = parseInt(btn.closest('.cld-opt-row').dataset.idx);
        if (clMcqOptions.length <= 2) { clShowToast('Need at least 2 options', 'warning'); return; }
        clMcqOptions.splice(idx, 1);
        clMcqOptions.forEach(function(o, j) { o.label = 'ABCDEF'[j]; });
        clRenderDynamicFields('MCQ Set');
      });
    });
    var addOpt = document.getElementById('cldAddOpt');
    if (addOpt) addOpt.addEventListener('click', function() {
      if (clMcqOptions.length >= 6) { clShowToast('Maximum 6 options allowed', 'warning'); return; }
      clMcqOptions.push({ label:'ABCDEF'[clMcqOptions.length], text:'', correct:false });
      clRenderDynamicFields('MCQ Set');
      var opts = document.querySelectorAll('.cld-opt-input');
      if (opts.length) opts[opts.length-1].focus();
    });
    var qInp = document.getElementById('cldMcqQ');
    if (qInp) qInp.addEventListener('input', function() {
      var ct = document.getElementById('cldMcqQCount');
      if (ct) ct.textContent = this.value.length + '/300';
    });
    var expInp = document.getElementById('cldMcqExp');
    if (expInp) expInp.addEventListener('input', function() {
      var wc = document.getElementById('cldMcqExpWC');
      if (wc) wc.textContent = clCountWords(this.value) + ' words';
    });
  }

  if (type === 'Notes') {
    var notesTA = document.getElementById('cldNotesContent');
    if (notesTA) notesTA.addEventListener('input', function() {
      var wc = document.getElementById('cldNotesWC');
      if (wc) wc.textContent = clCountWords(this.value) + ' words';
    });
  }

  if (type === 'Current Affairs') {
    document.querySelectorAll('.cld-impact-chip').forEach(function(chip) {
      chip.addEventListener('click', function() {
        chip.classList.toggle('active');
        var cb = chip.querySelector('input');
        if (cb) cb.checked = chip.classList.contains('active');
      });
    });
    var caTA = document.getElementById('cldCaSummary');
    if (caTA) caTA.addEventListener('input', function() {
      var wc = document.getElementById('cldCaWC');
      if (wc) wc.textContent = clCountWords(this.value) + ' words';
    });
  }
}

/* ── Validation ── */
function clValidateDynamic(type) {
  if (type === 'Article') {
    var s = document.getElementById('cldArticleSummary');
    if (!s || !s.value.trim()) { clShowToast('Article summary is required', 'danger'); return false; }
  }
  if (type === 'MCQ Set') {
    var q = document.getElementById('cldMcqQ');
    if (!q || !q.value.trim()) { clShowToast('MCQ question is required', 'danger'); return false; }
    if (!clMcqOptions.some(function(o){ return o.correct; })) { clShowToast('Mark at least one correct answer', 'danger'); return false; }
    if (!clMcqOptions.every(function(o){ return o.text.trim(); })) { clShowToast('Fill in all option texts', 'danger'); return false; }
  }
  if (type === 'Notes') {
    var n = document.getElementById('cldNotesContent');
    if (!n || !n.value.trim()) { clShowToast('Notes content is required', 'danger'); return false; }
  }
  if (type === 'Current Affairs') {
    var ca = document.getElementById('cldCaSummary');
    if (!ca || !ca.value.trim()) { clShowToast('News summary is required', 'danger'); return false; }
    var src = document.getElementById('cldCaSource');
    if (!src || !src.value) { clShowToast('Please select a news source', 'danger'); return false; }
  }
  return true;
}

/* ── Reset modal ── */
function clResetCreateModal() {
  var form = document.getElementById('clCreateForm');
  if (form) form.reset();
  document.getElementById('clTitleCount') && (document.getElementById('clTitleCount').textContent = '0/150');
  /* Reset to Article */
  var first = document.querySelector('.cl-type-radio-input[value="Article"]');
  if (first) { first.checked = true; }
  clMcqOptions = [{ label:'A',text:'',correct:false },{ label:'B',text:'',correct:false },{ label:'C',text:'',correct:false },{ label:'D',text:'',correct:false }];
  clKeyFacts = [''];
  clRenderDynamicFields('Article');
  var badge = document.getElementById('clTypeBadge');
  if (badge) { badge.style.display='none'; badge.textContent=''; }
}

/* ══════════════════════════════════════════════════════════
   EXPORT MODAL
══════════════════════════════════════════════════════════ */
var clExportFormat = 'excel';

function clWireExportModal() {
  var exportBtn = document.getElementById('clExportBtn');
  if (exportBtn) exportBtn.addEventListener('click', function() {
    document.getElementById('clExportOverlay').classList.add('open');
  });
  document.getElementById('clExportClose')?.addEventListener('click', function() { document.getElementById('clExportOverlay').classList.remove('open'); });
  document.getElementById('clExportCancel')?.addEventListener('click', function() { document.getElementById('clExportOverlay').classList.remove('open'); });
  document.getElementById('clExportOverlay')?.addEventListener('click', function(e) {
    if (e.target === document.getElementById('clExportOverlay')) document.getElementById('clExportOverlay').classList.remove('open');
  });
  document.querySelectorAll('.cl-format-card').forEach(function(card) {
    card.addEventListener('click', function() {
      document.querySelectorAll('.cl-format-card').forEach(function(c){ c.classList.remove('selected'); });
      card.classList.add('selected');
      clExportFormat = card.dataset.fmt;
    });
  });
  document.querySelectorAll('.cl-export-choice').forEach(function(choice) {
    choice.addEventListener('click', function() {
      document.querySelectorAll('.cl-export-choice').forEach(function(c){ c.classList.remove('selected'); });
      choice.classList.add('selected');
      choice.querySelector('input').checked = true;
    });
  });
  document.getElementById('clExportSubmit')?.addEventListener('click', function() {
    document.getElementById('clExportOverlay').classList.remove('open');
    clShowToast('Exporting as '+clExportFormat.toUpperCase()+' \u2713', 'success');
  });
}

/* ══════════════════════════════════════════════════════════
   DATE RANGE PICKER  (sidebar filter button)
══════════════════════════════════════════════════════════ */
(function(){
  var drpEl = null;
  var drpStart = new Date(2025,4,14);
  var drpEnd   = new Date(2025,4,21);
  var MONTHS3  = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  document.addEventListener('app:ready', function() {
    var btn = document.getElementById('clDateRangeBtn');
    if (btn) btn.addEventListener('click', function(e) { e.stopPropagation(); openDRP(btn); });
  });

  function openDRP(anchor) {
    if (drpEl) { drpEl.remove(); drpEl = null; return; }
    drpEl = document.createElement('div');
    drpEl.className = 'cl-datepicker-dd';
    var presets = ['Last 7 days','Last 14 days','Last 30 days','This month'];
    drpEl.innerHTML = '<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:12px;">'+
      presets.map(function(p,i){ return '<button class="cl-dp-preset" data-idx="'+i+'">'+p+'</button>'; }).join('')+
    '</div>'+
    '<div style="font-size:12px;color:var(--text-secondary);padding:8px;background:var(--bg-base);border-radius:8px;">'+
      fmt(drpStart)+' &rarr; '+fmt(drpEnd)+'<br><span style="font-size:11px;color:var(--text-muted);">Click Apply to confirm</span>'+
    '</div>'+
    '<div style="display:flex;justify-content:flex-end;gap:8px;margin-top:12px;">'+
      '<button class="cl-dp-cancel">Cancel</button><button class="cl-dp-apply">Apply</button>'+
    '</div>';
    document.body.appendChild(drpEl);
    var rect = anchor.getBoundingClientRect();
    drpEl.style.top  = (rect.bottom + 4 + window.scrollY) + 'px';
    drpEl.style.left = Math.max(8, rect.left) + 'px';
    drpEl.style.minWidth = '240px';
    requestAnimationFrame(function(){ drpEl.classList.add('open'); });

    drpEl.querySelectorAll('.cl-dp-preset').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        var today = new Date(2025,4,21);
        var days  = [7,14,30,0][parseInt(btn.dataset.idx)];
        if (days) { drpEnd = new Date(today); drpStart = new Date(today); drpStart.setDate(drpStart.getDate()-(days-1)); }
        else       { drpEnd = new Date(today); drpStart = new Date(today.getFullYear(), today.getMonth(), 1); }
        drpEl.querySelector('div:nth-child(2)').innerHTML = fmt(drpStart)+' &rarr; '+fmt(drpEnd)+'<br><span style="font-size:11px;color:var(--text-muted);">Click Apply to confirm</span>';
      });
    });
    drpEl.querySelector('.cl-dp-cancel').addEventListener('click', function(e){ e.stopPropagation(); closeDRP(); });
    drpEl.querySelector('.cl-dp-apply').addEventListener('click', function(e) {
      e.stopPropagation();
      anchor.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:14px;height:14px;"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/></svg> '+fmt(drpStart)+' – '+fmt(drpEnd);
      closeDRP();
      clShowToast('Date range updated', 'success');
    });
    setTimeout(function(){ document.addEventListener('click', drpOut); }, 0);
    function drpOut(e) { if (drpEl && !drpEl.contains(e.target) && e.target !== anchor) { closeDRP(); document.removeEventListener('click', drpOut); } }
  }
  function closeDRP() { if (drpEl) { drpEl.remove(); drpEl = null; } }
  function fmt(d) { return MONTHS3[d.getMonth()]+' '+d.getDate()+', '+d.getFullYear(); }
})();

/* ══════════════════════════════════════════════════════════
   INIT — wire everything on app:ready
══════════════════════════════════════════════════════════ */
document.addEventListener('app:ready', function() {

  /* Render initial table */
  clRenderTable();

  /* Render initial dynamic fields (Article by default) */
  clRenderDynamicFields('Article');

  /* ── Tabs ── */
  document.querySelectorAll('.cl-tab').forEach(function(tab) {
    tab.addEventListener('click', function() {
      clTab = tab.dataset.tab; clPage = 1; clSetActiveTab(clTab); clRenderTable();
    });
  });

  /* ── Search ── */
  document.getElementById('clSearchInput')?.addEventListener('input', function() {
    clSearch = this.value; clPage = 1; clRenderTable();
  });

  /* ── Filters ── */
  document.getElementById('clSubjectFilter')?.addEventListener('change', function() { clSubject = this.value; clPage=1; clRenderTable(); });
  document.getElementById('clExamFilter')?.addEventListener('change',    function() { clExam    = this.value; clPage=1; clRenderTable(); });
  document.getElementById('clTypeFilter')?.addEventListener('change',    function() { clType    = this.value; clPage=1; clRenderTable(); });

  /* ── Clear filters ── */
  document.getElementById('clClearFilters')?.addEventListener('click', function() {
    clSearch=''; clSubject=''; clExam=''; clType=''; clPage=1;
    document.getElementById('clSearchInput').value='';
    document.getElementById('clSubjectFilter').value='';
    document.getElementById('clExamFilter').value='';
    document.getElementById('clTypeFilter').value='';
    clRenderTable();
    clShowToast('Filters cleared', 'info');
  });

  /* ── Date sort ── */
  document.getElementById('clDateSort')?.addEventListener('click', function() {
    clSortDate = clSortDate==='desc' ? 'asc' : 'desc';
    var icon = document.getElementById('clDateSortIcon');
    if (icon) icon.style.transform = clSortDate==='desc' ? '' : 'rotate(180deg)';
    clPage=1; clRenderTable();
  });

  /* ── Select all ── */
  document.getElementById('clCheckAll')?.addEventListener('change', function() {
    clGetPage(clGetFiltered()).forEach(function(i) { clSelected[i.id] = document.getElementById('clCheckAll').checked; });
    clRenderTable();
  });

  /* ── Per page ── */
  document.getElementById('clPerPageSelect')?.addEventListener('change', function() {
    clPerPage = parseInt(this.value); clPage=1; clRenderTable();
  });

  /* ── Content Type radio → re-render dynamic fields ── */
  document.querySelectorAll('.cl-type-radio-input').forEach(function(radio) {
    radio.addEventListener('change', function() {
      if (this.checked) {
        /* Reset MCQ/facts state when switching */
        clMcqOptions = [{ label:'A',text:'',correct:false },{ label:'B',text:'',correct:false },{ label:'C',text:'',correct:false },{ label:'D',text:'',correct:false }];
        clKeyFacts = [''];
        clRenderDynamicFields(this.value);
      }
    });
  });

  /* ── Title char count ── */
  document.getElementById('clTitleInput')?.addEventListener('input', function() {
    var ct = document.getElementById('clTitleCount');
    if (ct) ct.textContent = this.value.length + '/150';
  });

  /* ── Create button (header) ── */
  document.getElementById('clCreateBtn')?.addEventListener('click', function() {
    clResetCreateModal();
    document.getElementById('clCreateOverlay').classList.add('open');
  });

  /* ── Close create modal ── */
  document.getElementById('clCreateClose')?.addEventListener('click', function() {
    document.getElementById('clCreateOverlay').classList.remove('open');
  });
  document.getElementById('clCreateCancel')?.addEventListener('click', function() {
    document.getElementById('clCreateOverlay').classList.remove('open');
  });
  document.getElementById('clCreateOverlay')?.addEventListener('click', function(e) {
    if (e.target === document.getElementById('clCreateOverlay')) {
      document.getElementById('clCreateOverlay').classList.remove('open');
    }
  });

  /* ── Submit create form ── */
  document.getElementById('clCreateSubmitBtn')?.addEventListener('click', function() {
    var title = document.getElementById('clTitleInput')?.value.trim();
    var type  = document.querySelector('.cl-type-radio-input:checked')?.value || 'Article';
    if (!title) { clShowToast('Title is required', 'danger'); return; }
    if (!clValidateDynamic(type)) return;

    var subject    = document.getElementById('clSubjectSelect')?.value;
    var subjectMap = { 'int-rel':'International Relations','economy':'Economy','science':'Science & Tech','polity':'Polity','geo':'Geography','history':'History' };
    var typeEmoji  = { 'Article':'📝','MCQ Set':'🟠','Notes':'📒','Current Affairs':'📰' };
    var newItem = {
      id: Date.now(), emoji: typeEmoji[type] || '📝', title: title,
      subject: subject || 'polity', subjectLabel: subjectMap[subject] || 'General',
      exams: Array.from(document.querySelectorAll('.cl-exam-check-input:checked')).map(function(c){ return c.value; }),
      type: type, author: 'Sachin',
      date: document.getElementById('clPublishDateInput')?.value || 'May 22, 2025',
      time: document.getElementById('clPublishTimeInput')?.value || '09:00 AM',
      status: 'draft',
    };
    CL_DATA.unshift(newItem);
    document.getElementById('clCreateOverlay').classList.remove('open');
    clResetCreateModal();
    clPage = 1;
    clTab  = 'all';
    clSetActiveTab('all');
    clRenderTable();
    clShowToast('"'+title.slice(0,35)+'" created as '+type+' \u2713', 'success');
  });

  /* ── Preview drawer ── */
  document.getElementById('clPreviewOverlay')?.addEventListener('click', function(e) {
    if (e.target === document.getElementById('clPreviewOverlay')) clClosePreviewDrawer();
  });
  document.getElementById('clPreviewDrawerClose')?.addEventListener('click', clClosePreviewDrawer);
  document.getElementById('clPreviewDrawerCloseBtn')?.addEventListener('click', clClosePreviewDrawer);
  document.getElementById('clPreviewEditBtn')?.addEventListener('click', function() { clClosePreviewDrawer(); window.location.href = 'content-editor.html'; });

  /* ── ESC closes all ── */
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      document.getElementById('clCreateOverlay')?.classList.remove('open');
      document.getElementById('clExportOverlay')?.classList.remove('open');
      clClosePreviewDrawer();
    }
  });

  /* ── Export modal ── */
  clWireExportModal();
});
