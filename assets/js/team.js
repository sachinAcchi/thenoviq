/* ============================================================
   TEAM MANAGEMENT JS — Noviq
   ============================================================ */
'use strict';

/* ── Role definitions ── */
const ROLES = [
  { key:'admin',       label:'Admin',          color:'#3B82F6', perms:'All Access',                    cls:'admin',       permList:['Create','Edit','Publish','Review','Delete','Analytics'] },
  { key:'editor',      label:'Editor',         color:'#3B82F6', perms:'Content Create, Edit, Publish', cls:'editor',      permList:['Create Content','Edit Content','Publish Content']        },
  { key:'reviewer',    label:'Reviewer',       color:'#F97316', perms:'Review, Approve, Comment',      cls:'reviewer',    permList:['Review & Approve','Leave Comments']                     },
  { key:'author',      label:'Author',         color:'#10B981', perms:'Content Create, Edit',          cls:'author',      permList:['Create Content','Edit Content']                         },
  { key:'contributor', label:'Contributor',    color:'#7C3AED', perms:'Content Create',                cls:'contributor', permList:['Create Content']                                       },
  { key:'seo',         label:'SEO Specialist', color:'#059669', perms:'SEO Tools, Metadata',           cls:'seo',         permList:['Edit Metadata','SEO Tools']                            },
  { key:'viewer',      label:'Viewer',         color:'#6B7280', perms:'View Only',                     cls:'viewer',      permList:['View Only']                                            },
  { key:'factchecker', label:'Fact Checker',   color:'#D97706', perms:'Review, Fact Check',            cls:'factchecker', permList:['Review Content','Fact-Check','Add Comments']           },
];

/* ── Members data ── */
var MEMBERS = [
  { id:1,  name:'Sachin', email:'saurabh.kumar@examprep.com', roleKey:'admin',       status:'active',   lastDate:'May 21, 2025', lastTime:'10:30 AM', isYou:true,  color:'#F97316', init:'SK' },
  { id:2,  name:'Ananya Singh',  email:'ananya.singh@examprep.com',  roleKey:'editor',      status:'active',   lastDate:'May 21, 2025', lastTime:'09:15 AM', isYou:false, color:'#10B981', init:'AS' },
  { id:3,  name:'Rohit Verma',   email:'rohit.verma@examprep.com',   roleKey:'reviewer',    status:'active',   lastDate:'May 21, 2025', lastTime:'08:45 AM', isYou:false, color:'#3B82F6', init:'RV' },
  { id:4,  name:'Priya Sharma',  email:'priya.sharma@examprep.com',  roleKey:'author',      status:'active',   lastDate:'May 20, 2025', lastTime:'07:20 PM', isYou:false, color:'#8B5CF6', init:'PS' },
  { id:5,  name:'Vikram Patel',  email:'vikram.patel@examprep.com',  roleKey:'contributor', status:'active',   lastDate:'May 20, 2025', lastTime:'06:10 PM', isYou:false, color:'#EF4444', init:'VP' },
  { id:6,  name:'Neha Gupta',    email:'neha.gupta@examprep.com',    roleKey:'seo',         status:'active',   lastDate:'May 20, 2025', lastTime:'05:40 PM', isYou:false, color:'#F59E0B', init:'NG' },
  { id:7,  name:'Arjun Mehta',   email:'arjun.mehta@examprep.com',   roleKey:'viewer',      status:'inactive', lastDate:'May 18, 2025', lastTime:'03:15 PM', isYou:false, color:'#6B7280', init:'AM' },
  { id:8,  name:'Kavya Reddy',   email:'kavya.reddy@examprep.com',   roleKey:'factchecker', status:'active',   lastDate:'May 18, 2025', lastTime:'11:05 AM', isYou:false, color:'#D97706', init:'KR' },
  { id:9,  name:'Deepak Shah',   email:'deepak.shah@examprep.com',   roleKey:'author',      status:'active',   lastDate:'May 17, 2025', lastTime:'04:00 PM', isYou:false, color:'#0D9488', init:'DS' },
  { id:10, name:'Meera Iyer',    email:'meera.iyer@examprep.com',    roleKey:'editor',      status:'active',   lastDate:'May 17, 2025', lastTime:'02:30 PM', isYou:false, color:'#7C3AED', init:'MI' },
  { id:11, name:'Rahul Nair',    email:'rahul.nair@examprep.com',    roleKey:'contributor', status:'active',   lastDate:'May 16, 2025', lastTime:'05:45 PM', isYou:false, color:'#2563EB', init:'RN' },
  { id:12, name:'Shreya Bansal', email:'shreya.bansal@examprep.com', roleKey:'reviewer',    status:'active',   lastDate:'May 16, 2025', lastTime:'03:10 PM', isYou:false, color:'#DC2626', init:'SB' },
  { id:13, name:'Amit Joshi',    email:'amit.joshi@examprep.com',    roleKey:'author',      status:'inactive', lastDate:'May 14, 2025', lastTime:'01:00 PM', isYou:false, color:'#6366F1', init:'AJ' },
  { id:14, name:'Pooja Verma',   email:'pooja.verma@examprep.com',   roleKey:'editor',      status:'active',   lastDate:'May 14, 2025', lastTime:'11:30 AM', isYou:false, color:'#0891B2', init:'PV' },
  { id:15, name:'Kiran Menon',   email:'kiran.menon@examprep.com',   roleKey:'viewer',      status:'active',   lastDate:'May 13, 2025', lastTime:'09:00 AM', isYou:false, color:'#65A30D', init:'KM' },
  { id:16, name:'Nisha Rao',     email:'nisha.rao@examprep.com',     roleKey:'factchecker', status:'active',   lastDate:'May 12, 2025', lastTime:'04:30 PM', isYou:false, color:'#B45309', init:'NR' },
  { id:17, name:'Suresh Pillai', email:'suresh.pillai@examprep.com', roleKey:'contributor', status:'active',   lastDate:'May 11, 2025', lastTime:'03:00 PM', isYou:false, color:'#0F766E', init:'SP' },
  { id:18, name:'Tanya Mishra',  email:'tanya.mishra@examprep.com',  roleKey:'seo',         status:'active',   lastDate:'May 10, 2025', lastTime:'02:00 PM', isYou:false, color:'#9333EA', init:'TM' },
];

var AUDIT_LOG = [
  { type:'add',    icon:'👤', text:'<strong>Sachin</strong> added <strong>Tanya Mishra</strong> as SEO Specialist',        time:'May 21, 2025 · 10:30 AM' },
  { type:'edit',   icon:'✏️', text:'<strong>Sachin</strong> changed <strong>Rohit Verma</strong> role to Reviewer',       time:'May 21, 2025 · 09:00 AM' },
  { type:'login',  icon:'🔑', text:'<strong>Ananya Singh</strong> logged in from Mumbai, India',                                  time:'May 21, 2025 · 09:15 AM' },
  { type:'edit',   icon:'✏️', text:'<strong>Priya Sharma</strong> updated permissions for <strong>Vikram Patel</strong>',        time:'May 20, 2025 · 06:00 PM' },
  { type:'add',    icon:'👤', text:'<strong>Sachin</strong> invited <strong>Kavya Reddy</strong> as Fact Checker',        time:'May 18, 2025 · 10:00 AM' },
  { type:'remove', icon:'🗑️', text:'<strong>Sachin</strong> removed <strong>Raj Kumar</strong> from the team',           time:'May 16, 2025 · 02:30 PM' },
  { type:'edit',   icon:'✏️', text:'<strong>Sachin</strong> changed <strong>Arjun Mehta</strong> status to Inactive',    time:'May 14, 2025 · 03:15 PM' },
  { type:'login',  icon:'🔑', text:'<strong>Deepak Shah</strong> logged in from Delhi, India',                                   time:'May 17, 2025 · 04:00 PM' },
  { type:'add',    icon:'👤', text:'<strong>Sachin</strong> added <strong>Rahul Nair</strong> as Contributor',            time:'May 12, 2025 · 10:00 AM' },
  { type:'edit',   icon:'✏️', text:'<strong>Meera Iyer</strong> updated her profile information',                                time:'May 16, 2025 · 01:00 PM' },
];

/* ── State ── */
var tmTab         = 'all';
var tmSearch      = '';
var tmPage        = 1;
var tmPerPage     = 10;
var tmFilterRoles = [];
var editingId     = null;
var inviteEmails  = [];
var actionMenuEl  = null;
var filterDdEl    = null;

/* ══════════════════════════════════════════════════════════
   HELPERS
══════════════════════════════════════════════════════════ */
function getRole(key) {
  return ROLES.find(function(r) { return r.key === key; }) || ROLES[0];
}

function getFiltered() {
  var list = MEMBERS.filter(function(m) {
    if (tmTab === 'active')   return m.status === 'active';
    if (tmTab === 'inactive') return m.status === 'inactive';
    if (tmTab === 'pending')  return m.status === 'pending';
    return true;
  });
  if (tmSearch) {
    var q = tmSearch.toLowerCase();
    list = list.filter(function(m) {
      return m.name.toLowerCase().includes(q) ||
             m.email.toLowerCase().includes(q) ||
             getRole(m.roleKey).label.toLowerCase().includes(q);
    });
  }
  if (tmFilterRoles.length) {
    list = list.filter(function(m) { return tmFilterRoles.includes(m.roleKey); });
  }
  return list;
}

function getPage(list) {
  return list.slice((tmPage - 1) * tmPerPage, tmPage * tmPerPage);
}

/* ══════════════════════════════════════════════════════════
   RENDER TABLE
══════════════════════════════════════════════════════════ */
function renderTable() {
  var filtered = getFiltered();
  var page     = getPage(filtered);
  var tbody    = document.getElementById('tmTbody');
  if (!tbody) return;

  if (page.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;padding:40px;color:var(--text-muted);">No members found.</td></tr>';
  } else {
    var html = '';
    page.forEach(function(m) {
      var role = getRole(m.roleKey);
      html += '<tr data-id="' + m.id + '">' +
        '<td class="col-member">' +
          '<div class="tm-member-cell">' +
            '<div class="tm-avatar" style="background:' + m.color + '">' + m.init + '</div>' +
            '<div class="tm-member-name-wrap">' +
              '<div class="tm-member-name">' + m.name + (m.isYou ? ' <span class="tm-you-badge">You</span>' : '') + '</div>' +
              '<div class="tm-member-email">' + m.email + '</div>' +
            '</div>' +
          '</div>' +
        '</td>' +
        '<td class="col-email">' + m.email + '</td>' +
        '<td class="col-role"><span class="tm-role-badge ' + role.cls + '">' + role.label + '</span></td>' +
        '<td class="col-perms"><span class="tm-perms">' + role.perms + '</span></td>' +
        '<td class="col-status">' +
          '<span class="tm-status-badge ' + m.status + '">' +
            '<span class="tm-status-dot"></span>' +
            m.status.charAt(0).toUpperCase() + m.status.slice(1) +
          '</span>' +
        '</td>' +
        '<td class="col-active">' +
          '<div class="tm-last-active">' +
            '<span class="date">' + m.lastDate + '</span>' +
            '<span class="time">' + m.lastTime + '</span>' +
          '</div>' +
        '</td>' +
        '<td class="col-actions">' +
          '<div class="tm-action-btns">' +
            '<button class="tm-action-btn edit" data-id="' + m.id + '" title="Edit">' +
              '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>' +
            '</button>' +
            '<button class="tm-action-btn more" data-id="' + m.id + '" title="More">' +
              '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="5" r="1" fill="currentColor"/><circle cx="12" cy="12" r="1" fill="currentColor"/><circle cx="12" cy="19" r="1" fill="currentColor"/></svg>' +
            '</button>' +
          '</div>' +
        '</td>' +
      '</tr>';
    });
    tbody.innerHTML = html;
  }

  tbody.querySelectorAll('.tm-action-btn.edit').forEach(function(btn) {
    btn.addEventListener('click', function(e) { e.stopPropagation(); openEditModal(parseInt(btn.dataset.id)); });
  });
  tbody.querySelectorAll('.tm-action-btn.more').forEach(function(btn) {
    btn.addEventListener('click', function(e) { e.stopPropagation(); openActionMenu(btn, parseInt(btn.dataset.id)); });
  });

  renderPagination(filtered.length);
  updateTabCounts();
  updateStats();
}

/* ══════════════════════════════════════════════════════════
   PAGINATION
══════════════════════════════════════════════════════════ */
function renderPagination(total) {
  var totalPages = Math.max(1, Math.ceil(total / tmPerPage));
  var s = total === 0 ? 0 : (tmPage - 1) * tmPerPage + 1;
  var e = Math.min(tmPage * tmPerPage, total);
  var info  = document.getElementById('tmPaginationInfo');
  var pages = document.getElementById('tmPages');
  if (info)  info.textContent = 'Showing ' + s + ' to ' + e + ' of ' + total + ' members';
  if (!pages) return;

  var html = '<button class="tm-pg-btn" id="tmPrev"' + (tmPage === 1 ? ' disabled' : '') + '>' +
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg></button>';
  for (var p = 1; p <= totalPages; p++) {
    html += '<button class="tm-pg-btn' + (p === tmPage ? ' active' : '') + '" data-pg="' + p + '">' + p + '</button>';
  }
  html += '<button class="tm-pg-btn" id="tmNext"' + (tmPage === totalPages ? ' disabled' : '') + '>' +
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg></button>';
  pages.innerHTML = html;

  pages.querySelector('#tmPrev').addEventListener('click', function() { tmPage--; renderTable(); });
  pages.querySelector('#tmNext').addEventListener('click', function() { tmPage++; renderTable(); });
  pages.querySelectorAll('[data-pg]').forEach(function(b) {
    b.addEventListener('click', function() { tmPage = parseInt(b.dataset.pg); renderTable(); });
  });
}

/* ══════════════════════════════════════════════════════════
   TAB COUNTS + STATS
══════════════════════════════════════════════════════════ */
function updateTabCounts() {
  var active   = MEMBERS.filter(function(m) { return m.status === 'active'; }).length;
  var inactive = MEMBERS.filter(function(m) { return m.status === 'inactive'; }).length;
  var pending  = MEMBERS.filter(function(m) { return m.status === 'pending'; }).length;
  var el = function(id) { return document.getElementById(id); };
  if (el('tabAll'))      el('tabAll').textContent      = 'All Members (' + MEMBERS.length + ')';
  if (el('tabActive'))   el('tabActive').textContent   = 'Active (' + active + ')';
  if (el('tabInactive')) el('tabInactive').textContent = 'Inactive (' + inactive + ')';
  if (el('tabPending'))  el('tabPending').textContent  = 'Pending Invites (' + pending + ')';
}

function updateStats() {
  var active = MEMBERS.filter(function(m) { return m.status === 'active'; }).length;
  var el = function(id) { return document.getElementById(id); };
  if (el('statTotal'))     el('statTotal').textContent     = MEMBERS.length;
  if (el('statActive'))    el('statActive').textContent    = active;
  if (el('statRoles'))     el('statRoles').textContent     = ROLES.length;
  if (el('statPerms'))     el('statPerms').textContent     = '24';
  if (el('statActivePct')) el('statActivePct').textContent = Math.round(active / MEMBERS.length * 100) + '% of total members';
}

/* ══════════════════════════════════════════════════════════
   ROLES OVERVIEW SIDEBAR
══════════════════════════════════════════════════════════ */
function renderRolesOverview() {
  var list = document.getElementById('tmRolesList');
  if (!list) return;
  var html = '';
  ROLES.forEach(function(r) {
    var count = MEMBERS.filter(function(m) { return m.roleKey === r.key; }).length;
    html += '<div class="tm-role-row" data-role="' + r.key + '">' +
      '<div class="tm-role-row-left">' +
        '<span class="tm-role-dot" style="background:' + r.color + '"></span>' +
        '<span class="tm-role-name">' + r.label + '</span>' +
      '</div>' +
      '<span class="tm-role-count">' + count + '</span>' +
    '</div>';
  });
  list.innerHTML = html;

  list.querySelectorAll('.tm-role-row').forEach(function(row) {
    row.addEventListener('click', function() {
      var roleKey = row.dataset.role;
      if (tmFilterRoles.includes(roleKey)) {
        tmFilterRoles = tmFilterRoles.filter(function(r) { return r !== roleKey; });
        row.style.background = '';
      } else {
        tmFilterRoles = [roleKey];
        list.querySelectorAll('.tm-role-row').forEach(function(r) { r.style.background = ''; });
        row.style.background = 'var(--brand-primary-light)';
      }
      tmPage = 1;
      renderTable();
      showTmToast(tmFilterRoles.length ? 'Filtered by: ' + getRole(tmFilterRoles[0]).label : 'Filter cleared', 'info');
    });
  });
}

/* ══════════════════════════════════════════════════════════
   ACTION MENU (3-dot)
══════════════════════════════════════════════════════════ */
function openActionMenu(anchor, id) {
  closeActionMenu();
  var m = MEMBERS.find(function(m) { return m.id === id; });
  if (!m) return;
  var isActive = m.status === 'active';

  actionMenuEl = document.createElement('div');
  actionMenuEl.className = 'ui-dropdown tm-action-menu ui-dropdown--open';
  actionMenuEl.innerHTML =
    '<button class="dd-item" data-act="edit">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>Edit Member' +
    '</button>' +
    '<button class="dd-item" data-act="toggle">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"/><line x1="12" y1="2" x2="12" y2="12"/></svg>' +
      (isActive ? 'Deactivate' : 'Activate') +
    '</button>' +
    '<button class="dd-item" data-act="resend">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>Resend Invite' +
    '</button>' +
    '<div class="dd-divider"></div>' +
    '<button class="dd-item dd-item--danger" data-act="remove">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>Remove Member' +
    '</button>';
  document.body.appendChild(actionMenuEl);

  var rect = anchor.getBoundingClientRect();
  var w = 190;
  var left = rect.right - w;
  if (left < 8) left = 8;
  actionMenuEl.style.top   = (rect.bottom + 4 + window.scrollY) + 'px';
  actionMenuEl.style.left  = left + 'px';
  actionMenuEl.style.width = w + 'px';

  actionMenuEl.addEventListener('click', function(e) {
    var btn = e.target.closest('[data-act]');
    if (!btn) return;
    closeActionMenu();
    var act = btn.dataset.act;
    if (act === 'edit')   openEditModal(id);
    if (act === 'toggle') toggleStatus(id);
    if (act === 'resend') showTmToast('Invite resent to ' + m.email, 'success');
    if (act === 'remove') openRemoveConfirm(id);
  });

  setTimeout(function() { document.addEventListener('click', actionMenuOutside); }, 0);
}

function actionMenuOutside(e) {
  if (actionMenuEl && !actionMenuEl.contains(e.target)) closeActionMenu();
}
function closeActionMenu() {
  if (actionMenuEl) { actionMenuEl.remove(); actionMenuEl = null; }
  document.removeEventListener('click', actionMenuOutside);
}

function toggleStatus(id) {
  var m = MEMBERS.find(function(m) { return m.id === id; });
  if (!m) return;
  m.status = m.status === 'active' ? 'inactive' : 'active';
  renderTable();
  renderRolesOverview();
  showTmToast(m.name + ' is now ' + m.status, m.status === 'active' ? 'success' : 'info');
}

/* ══════════════════════════════════════════════════════════
   FILTER DROPDOWN
══════════════════════════════════════════════════════════ */
function openFilterDD(anchor) {
  if (filterDdEl) { filterDdEl.remove(); filterDdEl = null; return; }
  filterDdEl = document.createElement('div');
  filterDdEl.className = 'ui-dropdown tm-filter-dd ui-dropdown--open';

  var checksHtml = '';
  ROLES.forEach(function(r) {
    checksHtml += '<label class="tm-filter-dd-check">' +
      '<input type="checkbox" value="' + r.key + '"' + (tmFilterRoles.includes(r.key) ? ' checked' : '') + ' />' +
      '<span style="width:8px;height:8px;border-radius:50%;background:' + r.color + ';flex-shrink:0;display:inline-block;"></span>' +
      r.label +
    '</label>';
  });

  filterDdEl.innerHTML =
    '<div class="tm-filter-dd-title">Filter by Role</div>' +
    '<div class="tm-filter-dd-checks">' + checksHtml + '</div>' +
    '<div style="display:flex;gap:8px;margin-top:12px;">' +
      '<button class="btn btn-ghost" style="flex:1;font-size:12px;padding:6px;" id="tmFilterClear">Clear</button>' +
      '<button class="btn btn-primary" style="flex:1;font-size:12px;padding:6px;" id="tmFilterApply">Apply</button>' +
    '</div>';
  document.body.appendChild(filterDdEl);

  var rect = anchor.getBoundingClientRect();
  filterDdEl.style.top   = (rect.bottom + 4 + window.scrollY) + 'px';
  filterDdEl.style.left  = (rect.right - 220) + 'px';
  filterDdEl.style.width = '220px';

  filterDdEl.querySelector('#tmFilterClear').addEventListener('click', function() {
    tmFilterRoles = [];
    tmPage = 1;
    filterDdEl.remove(); filterDdEl = null;
    anchor.classList.remove('active');
    renderTable();
    renderRolesOverview();
    document.querySelectorAll('.tm-role-row').forEach(function(r) { r.style.background = ''; });
    showTmToast('Filters cleared', 'info');
  });

  filterDdEl.querySelector('#tmFilterApply').addEventListener('click', function() {
    tmFilterRoles = Array.from(filterDdEl.querySelectorAll('input:checked')).map(function(c) { return c.value; });
    tmPage = 1;
    filterDdEl.remove(); filterDdEl = null;
    anchor.classList.toggle('active', tmFilterRoles.length > 0);
    renderTable();
    showTmToast(tmFilterRoles.length ? 'Filtering by ' + tmFilterRoles.length + ' role(s)' : 'All members shown', 'info');
  });

  setTimeout(function() {
    document.addEventListener('click', function filterOut(e) {
      if (filterDdEl && !filterDdEl.contains(e.target) && !anchor.contains(e.target)) {
        filterDdEl.remove(); filterDdEl = null;
        document.removeEventListener('click', filterOut);
      }
    });
  }, 0);
}

/* ══════════════════════════════════════════════════════════
   MODAL HELPERS
══════════════════════════════════════════════════════════ */
function openModal(id)  { var el = document.getElementById(id); if (el) el.classList.add('open'); }
function closeModal(id) { var el = document.getElementById(id); if (el) el.classList.remove('open'); }

function wireModalClose(overlayId, closeBtnId, cancelBtnId) {
  document.getElementById(closeBtnId)  && document.getElementById(closeBtnId).addEventListener('click',  function() { closeModal(overlayId); });
  document.getElementById(cancelBtnId) && document.getElementById(cancelBtnId).addEventListener('click', function() { closeModal(overlayId); });
  document.getElementById(overlayId)   && document.getElementById(overlayId).addEventListener('click',   function(e) {
    if (e.target === document.getElementById(overlayId)) closeModal(overlayId);
  });
}

/* ══════════════════════════════════════════════════════════
   ADD MEMBER MODAL
══════════════════════════════════════════════════════════ */
function openAddMemberModal() {
  ['tmAddFirstName','tmAddLastName','tmAddEmail','tmAddPhone'].forEach(function(id) {
    var el = document.getElementById(id); if (el) el.value = '';
  });
  var roleEl = document.getElementById('tmAddRole');
  if (roleEl) roleEl.value = '';
  document.querySelectorAll('.tm-perm-check').forEach(function(c) {
    c.classList.remove('checked');
    c.querySelector('input').checked = false;
  });
  openModal('tmAddOverlay');
}

/* ══════════════════════════════════════════════════════════
   INVITE MEMBER MODAL  (completely different from Add)
══════════════════════════════════════════════════════════ */
function openInviteMemberModal() {
  inviteEmails = [];
  renderInviteEmailTags();
  var inp = document.getElementById('tmInviteEmailInput');
  if (inp) inp.value = '';
  var roleEl = document.getElementById('tmInviteRole');
  if (roleEl) roleEl.value = '';
  var msgEl = document.getElementById('tmInviteMessage');
  if (msgEl) msgEl.value = '';
  var expEl = document.getElementById('tmInviteExpiry');
  if (expEl) expEl.value = '3d';
  var preview = document.getElementById('tmInviteRolePreview');
  if (preview) preview.style.display = 'none';
  openModal('tmInviteOverlay');
  setTimeout(function() { if (inp) inp.focus(); }, 100);
}

function renderInviteEmailTags() {
  var wrap = document.getElementById('tmInviteEmailTags');
  if (!wrap) return;
  var html = '';
  inviteEmails.forEach(function(email, i) {
    var valid = email.includes('@') && email.includes('.');
    html += '<span class="tm-invite-email-tag ' + (valid ? 'valid' : 'invalid') + '">' +
      email +
      '<span class="tm-invite-tag-remove" data-idx="' + i + '">&#10005;</span>' +
    '</span>';
  });
  wrap.innerHTML = html;
  wrap.querySelectorAll('.tm-invite-tag-remove').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      inviteEmails.splice(parseInt(btn.dataset.idx), 1);
      renderInviteEmailTags();
    });
  });
}

function addInviteEmail(val) {
  var emails = val.split(/[,;\s]+/).map(function(e) { return e.trim(); }).filter(function(e) { return e; });
  emails.forEach(function(e) { if (!inviteEmails.includes(e)) inviteEmails.push(e); });
  renderInviteEmailTags();
}

function showInviteRolePreview(roleKey) {
  var role = getRole(roleKey);
  var preview = document.getElementById('tmInviteRolePreview');
  var permsEl = document.getElementById('tmInviteRolePerms');
  if (!preview || !permsEl) return;
  var html = '';
  (role.permList || []).forEach(function(p) {
    html += '<span class="tm-invite-perm-chip">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>' +
      p +
    '</span>';
  });
  permsEl.innerHTML = html;
  preview.style.display = 'block';
}

/* ══════════════════════════════════════════════════════════
   EDIT MEMBER MODAL
══════════════════════════════════════════════════════════ */
function openEditModal(id) {
  var m = MEMBERS.find(function(m) { return m.id === id; });
  if (!m) return;
  editingId = id;
  var nameEl   = document.getElementById('tmEditName');
  var avatarEl = document.getElementById('tmEditAvatar');
  var initEl   = document.getElementById('tmEditAvatarInit');
  var emailEl  = document.getElementById('tmEditEmail');
  var roleEl   = document.getElementById('tmEditRole');
  var statusEl = document.getElementById('tmEditStatus');
  if (nameEl)   nameEl.textContent              = m.name;
  if (avatarEl) avatarEl.style.background       = m.color;
  if (initEl)   initEl.textContent              = m.init;
  if (emailEl)  emailEl.value                   = m.email;
  if (roleEl)   roleEl.value                    = m.roleKey;
  if (statusEl) statusEl.value                  = m.status;
  openModal('tmEditOverlay');
}

/* ══════════════════════════════════════════════════════════
   REMOVE CONFIRM MODAL
══════════════════════════════════════════════════════════ */
function openRemoveConfirm(id) {
  var m = MEMBERS.find(function(m) { return m.id === id; });
  if (!m) return;
  var nameEl  = document.getElementById('tmRemoveName');
  var emailEl = document.getElementById('tmRemoveEmail');
  var overlay = document.getElementById('tmRemoveOverlay');
  if (nameEl)  nameEl.textContent   = m.name;
  if (emailEl) emailEl.textContent  = m.email;
  if (overlay) overlay.dataset.removeId = id;
  openModal('tmRemoveOverlay');
}

/* ══════════════════════════════════════════════════════════
   AUDIT LOG MODAL
══════════════════════════════════════════════════════════ */
function openAuditModal() {
  var list = document.getElementById('tmAuditList');
  if (list) {
    var html = '';
    AUDIT_LOG.forEach(function(a) {
      html += '<div class="tm-audit-item">' +
        '<div class="tm-audit-icon ' + a.type + '">' + a.icon + '</div>' +
        '<div class="tm-audit-body">' +
          '<div class="tm-audit-text">' + a.text + '</div>' +
          '<div class="tm-audit-time">' + a.time + '</div>' +
        '</div>' +
      '</div>';
    });
    list.innerHTML = html;
  }
  openModal('tmAuditOverlay');
}

/* ══════════════════════════════════════════════════════════
   SIDEBAR INVITE SEND
══════════════════════════════════════════════════════════ */
function sendSidebarInvite() {
  var emailEl = document.getElementById('tmSidebarEmail');
  var roleEl  = document.getElementById('tmSidebarRole');
  var email   = emailEl ? emailEl.value.trim() : '';
  var role    = roleEl  ? roleEl.value         : '';

  if (!email)             { showTmToast('Please enter an email address', 'danger'); return; }
  if (!email.includes('@')){ showTmToast('Please enter a valid email address', 'danger'); return; }
  if (!role)              { showTmToast('Please select a role', 'danger'); return; }

  var roleObj = getRole(role);
  MEMBERS.push({ id: Date.now(), name: email.split('@')[0], email: email, roleKey: role, status: 'pending', lastDate: 'Invite sent', lastTime: 'Just now', isYou: false, color: '#9CA3AF', init: email.slice(0,2).toUpperCase() });
  AUDIT_LOG.unshift({ type:'add', icon:'👤', text:'<strong>Sachin</strong> invited <strong>' + email + '</strong> as ' + roleObj.label, time:'Just now' });
  if (emailEl) emailEl.value = '';
  if (roleEl)  roleEl.value  = '';
  renderTable();
  renderRolesOverview();
  showTmToast('Invitation sent to ' + email + ' as ' + roleObj.label + ' \u2713', 'success');
}

/* ══════════════════════════════════════════════════════════
   TOAST
══════════════════════════════════════════════════════════ */
function showTmToast(msg, type) {
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
   WIRE EVERYTHING
══════════════════════════════════════════════════════════ */
document.addEventListener('app:ready', function() {

  /* Initial render */
  renderTable();
  renderRolesOverview();

  /* Tabs */
  document.querySelectorAll('.tm-tab').forEach(function(tab) {
    tab.addEventListener('click', function() {
      document.querySelectorAll('.tm-tab').forEach(function(t) { t.classList.remove('active'); });
      tab.classList.add('active');
      tmTab = tab.dataset.tab;
      tmPage = 1;
      renderTable();
    });
  });

  /* Search */
  var searchInp = document.getElementById('tmSearchInput');
  if (searchInp) searchInp.addEventListener('input', function() {
    tmSearch = this.value;
    tmPage = 1;
    renderTable();
  });

  /* Filter button */
  var filterBtn = document.getElementById('tmFilterBtn');
  if (filterBtn) filterBtn.addEventListener('click', function(e) { e.stopPropagation(); openFilterDD(this); });

  /* Per page */
  var perPageSel = document.getElementById('tmPerPageSelect');
  if (perPageSel) perPageSel.addEventListener('change', function() { tmPerPage = parseInt(this.value); tmPage = 1; renderTable(); });

  /* Header buttons */
  var inviteBtn = document.getElementById('tmInviteBtn');
  if (inviteBtn) inviteBtn.addEventListener('click', openInviteMemberModal);
  var addBtn = document.getElementById('tmAddBtn');
  if (addBtn) addBtn.addEventListener('click', openAddMemberModal);

  /* ── Add modal ── */
  wireModalClose('tmAddOverlay', 'tmAddClose', 'tmAddCancel');

  /* Auto-fill permissions when role selected */
  var addRoleSel = document.getElementById('tmAddRole');
  if (addRoleSel) addRoleSel.addEventListener('change', function() {
    var permsMap = {
      admin:['Create','Edit','Publish','Review','Delete','Comment','SEO','Analytics'],
      editor:['Create','Edit','Publish'], reviewer:['Review','Comment'],
      author:['Create','Edit'], contributor:['Create'],
      seo:['Edit','SEO'], viewer:[], factchecker:['Review','Comment']
    };
    var active = permsMap[this.value] || [];
    document.querySelectorAll('.tm-perm-check').forEach(function(c) {
      var on = active.includes(c.dataset.perm);
      c.classList.toggle('checked', on);
      c.querySelector('input').checked = on;
    });
  });

  /* Permission toggles */
  document.querySelectorAll('.tm-perm-check').forEach(function(c) {
    c.addEventListener('click', function() {
      c.classList.toggle('checked');
      c.querySelector('input').checked = c.classList.contains('checked');
    });
  });

  /* Add submit */
  var addSubmit = document.getElementById('tmAddSubmit');
  if (addSubmit) addSubmit.addEventListener('click', function() {
    var fname = document.getElementById('tmAddFirstName').value.trim();
    var lname = document.getElementById('tmAddLastName').value.trim();
    var email = document.getElementById('tmAddEmail').value.trim();
    var role  = document.getElementById('tmAddRole').value;
    if (!fname)               { showTmToast('First name is required', 'danger'); return; }
    if (!email.includes('@')) { showTmToast('Valid email is required', 'danger'); return; }
    if (!role)                { showTmToast('Please select a role', 'danger'); return; }
    var fullName = fname + (lname ? ' ' + lname : '');
    var roleObj  = getRole(role);
    var newM = { id: Date.now(), name: fullName, email: email, roleKey: role, status: 'active', lastDate: 'May 21, 2025', lastTime: 'Just now', isYou: false, color: '#6366F1', init: (fname[0] + (lname ? lname[0] : fname[1] || '')).toUpperCase() };
    MEMBERS.unshift(newM);
    AUDIT_LOG.unshift({ type:'add', icon:'👤', text:'<strong>Sachin</strong> added <strong>' + fullName + '</strong> as ' + roleObj.label, time:'Just now' });
    closeModal('tmAddOverlay');
    renderTable();
    renderRolesOverview();
    showTmToast(fullName + ' added as ' + roleObj.label + ' \u2713', 'success');
  });

  /* ── Invite modal ── */
  wireModalClose('tmInviteOverlay', 'tmInviteClose', 'tmInviteCancel');

  /* Email tag input */
  var emailInp = document.getElementById('tmInviteEmailInput');
  if (emailInp) {
    emailInp.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ',') {
        e.preventDefault();
        var val = this.value.trim().replace(/,$/, '');
        if (val) { addInviteEmail(val); this.value = ''; }
      }
      if (e.key === 'Backspace' && !this.value && inviteEmails.length) {
        inviteEmails.pop();
        renderInviteEmailTags();
      }
    });
    emailInp.addEventListener('blur', function() {
      var val = this.value.trim();
      if (val) { addInviteEmail(val); this.value = ''; }
    });
  }
  var emailsWrap = document.getElementById('tmInviteEmailsWrap');
  if (emailsWrap) emailsWrap.addEventListener('click', function() {
    var inp = document.getElementById('tmInviteEmailInput');
    if (inp) inp.focus();
  });

  /* Role select → show permissions preview */
  var inviteRoleSel = document.getElementById('tmInviteRole');
  if (inviteRoleSel) inviteRoleSel.addEventListener('change', function() {
    if (this.value) showInviteRolePreview(this.value);
    else { var pv = document.getElementById('tmInviteRolePreview'); if (pv) pv.style.display = 'none'; }
  });

  /* Copy invite link */
  var copyBtn = document.getElementById('tmCopyLinkBtn');
  if (copyBtn) copyBtn.addEventListener('click', function() {
    var link = 'https://examprep.studio/invite?token=abc123xyz&expires=3d';
    var self = this;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(link).then(function() {
        self.textContent = 'Copied \u2713';
        self.classList.add('copied');
        setTimeout(function() { self.textContent = 'Copy Link'; self.classList.remove('copied'); }, 2000);
      });
    } else {
      showTmToast('Link copied to clipboard \u2713', 'success');
    }
  });

  /* Send invite submit */
  var inviteSubmit = document.getElementById('tmInviteSubmit');
  if (inviteSubmit) inviteSubmit.addEventListener('click', function() {
    var inp = document.getElementById('tmInviteEmailInput');
    if (inp && inp.value.trim()) { addInviteEmail(inp.value.trim()); inp.value = ''; }

    var role = document.getElementById('tmInviteRole').value;
    if (!inviteEmails.length) { showTmToast('Please add at least one email address', 'danger'); return; }
    if (!role)                 { showTmToast('Please select a role', 'danger'); return; }

    var invalid = inviteEmails.filter(function(e) { return !e.includes('@'); });
    if (invalid.length) { showTmToast('Invalid email: ' + invalid[0], 'danger'); return; }

    var roleObj = getRole(role);
    inviteEmails.forEach(function(email) {
      var exists = MEMBERS.find(function(m) { return m.email === email; });
      if (!exists) {
        MEMBERS.push({ id: Date.now() + Math.random(), name: email.split('@')[0], email: email, roleKey: role, status: 'pending', lastDate: 'Invite sent', lastTime: 'Just now', isYou: false, color: '#9CA3AF', init: email.slice(0,2).toUpperCase() });
        AUDIT_LOG.unshift({ type:'add', icon:'👤', text:'<strong>Sachin</strong> invited <strong>' + email + '</strong> as ' + roleObj.label, time:'Just now' });
      }
    });

    var count = inviteEmails.length;
    var msg   = count === 1 ? 'Invitation sent to ' + inviteEmails[0] + ' \u2713' : count + ' invitations sent successfully \u2713';
    closeModal('tmInviteOverlay');
    renderTable();
    renderRolesOverview();
    showTmToast(msg, 'success');
  });

  /* ── Edit modal ── */
  wireModalClose('tmEditOverlay', 'tmEditClose', 'tmEditCancel');
  var editSave = document.getElementById('tmEditSave');
  if (editSave) editSave.addEventListener('click', function() {
    if (!editingId) return;
    var m = MEMBERS.find(function(m) { return m.id === editingId; });
    if (!m) return;
    m.email   = document.getElementById('tmEditEmail').value;
    m.roleKey = document.getElementById('tmEditRole').value;
    m.status  = document.getElementById('tmEditStatus').value;
    closeModal('tmEditOverlay');
    renderTable();
    renderRolesOverview();
    showTmToast(m.name + ' updated \u2713', 'success');
  });

  /* ── Remove modal ── */
  wireModalClose('tmRemoveOverlay', 'tmRemoveClose', 'tmRemoveCancel');
  var removeConfirm = document.getElementById('tmRemoveConfirm');
  if (removeConfirm) removeConfirm.addEventListener('click', function() {
    var id = parseInt(document.getElementById('tmRemoveOverlay').dataset.removeId);
    var m  = MEMBERS.find(function(m) { return m.id === id; });
    if (m) {
      AUDIT_LOG.unshift({ type:'remove', icon:'🗑️', text:'<strong>Sachin</strong> removed <strong>' + m.name + '</strong> from the team', time:'Just now' });
      MEMBERS = MEMBERS.filter(function(m) { return m.id !== id; });
      closeModal('tmRemoveOverlay');
      renderTable();
      renderRolesOverview();
      showTmToast(m.name + ' removed from team', 'danger');
    }
  });

  /* ── Audit log modal ── */
  var auditBtn = document.getElementById('tmAuditBtn');
  if (auditBtn) auditBtn.addEventListener('click', openAuditModal);
  wireModalClose('tmAuditOverlay', 'tmAuditClose', 'tmAuditCloseBtn');
  var auditExport = document.getElementById('tmAuditExportBtn');
  if (auditExport) auditExport.addEventListener('click', function() { showTmToast('Exporting audit log\u2026', 'info'); });

  /* ── Sidebar invite ── */
  var sidebarSend = document.getElementById('tmSendInviteBtn');
  if (sidebarSend) sidebarSend.addEventListener('click', sendSidebarInvite);
  var sidebarInviteTitle = document.getElementById('tmSidebarInviteTitle');
  if (sidebarInviteTitle) sidebarInviteTitle.addEventListener('click', openInviteMemberModal);

  /* ── ESC closes all ── */
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      ['tmAddOverlay','tmInviteOverlay','tmEditOverlay','tmRemoveOverlay','tmAuditOverlay'].forEach(closeModal);
      closeActionMenu();
      if (filterDdEl) { filterDdEl.remove(); filterDdEl = null; }
    }
  });
});
