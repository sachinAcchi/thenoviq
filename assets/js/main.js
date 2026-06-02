/* ============================================================
   MAIN JS — Noviq
   Hamburger · Sidebar · Search · Topbar (Profile / Notifications)
   These run on EVERY page.
   ============================================================ */
(function () {
  'use strict';

  var sidebar, mainArea, overlay, btn;

  /* ══════════════════════════════════════════════════════════
     SIDEBAR / HAMBURGER
  ══════════════════════════════════════════════════════════ */
  document.addEventListener('DOMContentLoaded', function () {
    btn      = document.getElementById('sidebarToggle');
    sidebar  = document.querySelector('.sidebar');
    mainArea = document.querySelector('.main-area');
    overlay  = document.getElementById('sidebarOverlay');

    if (btn)     btn.addEventListener('click', onHamburgerClick);
    if (overlay) overlay.addEventListener('click', closeMobile);

    document.addEventListener('keydown', function (e) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        var inp = document.querySelector('.search-input');
        if (inp) inp.focus();
      }
      if (e.key === 'Escape') {
        closeMobile();
        closeAllDropdowns();
        closeModal();
      }
    });

    document.querySelectorAll('.nav-item').forEach(function (link) {
      link.addEventListener('click', function () {
        if (window.innerWidth <= 768) closeMobile();
      });
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 768) closeMobile();
    });

    /* Close dropdowns on scroll */
    window.addEventListener('scroll', closeAllDropdowns, { passive: true });

    /* Boot */
    wireTopbar();
    initSearch();

    document.dispatchEvent(new CustomEvent('app:ready'));
  });

  function onHamburgerClick(e) {
    e.stopPropagation();
    if (window.innerWidth <= 768) toggleMobile();
    else toggleDesktop();
  }

  function toggleDesktop() {
    if (!sidebar) return;
    var collapsed = sidebar.getAttribute('data-collapsed') === 'true';
    if (collapsed) {
      sidebar.setAttribute('data-collapsed', 'false');
      sidebar.style.width = '';
      if (mainArea) mainArea.style.marginLeft = '';
    } else {
      sidebar.setAttribute('data-collapsed', 'true');
      sidebar.style.width = '0px';
      if (mainArea) mainArea.style.marginLeft = '0px';
    }
    setTimeout(function () { window.dispatchEvent(new Event('resize')); }, 300);
  }

  function toggleMobile() {
    if (!sidebar) return;
    if (sidebar.getAttribute('data-mobile-open') === 'true') closeMobile();
    else openMobile();
  }

  function openMobile() {
    if (!sidebar) return;
    sidebar.setAttribute('data-mobile-open', 'true');
    sidebar.style.transform = 'translateX(0)';
    if (overlay) {
      overlay.style.display  = 'block';
      overlay.style.opacity  = '1';
      overlay.style.pointerEvents = 'auto';
    }
    document.body.style.overflow = 'hidden';
  }

  function closeMobile() {
    if (!sidebar) return;
    sidebar.setAttribute('data-mobile-open', 'false');
    sidebar.style.transform = '';
    if (overlay) {
      overlay.style.opacity  = '0';
      overlay.style.pointerEvents = 'none';
      setTimeout(function () { overlay.style.display = 'none'; }, 260);
    }
    document.body.style.overflow = '';
  }

  /* ══════════════════════════════════════════════════════════
     DROPDOWN HELPER  (global — used by all pages)
  ══════════════════════════════════════════════════════════ */
  window.createDropdown = function (anchorEl, contentHTML, extraClass) {
    closeAllDropdowns();
    var dd = document.createElement('div');
    dd.className = 'ui-dropdown ' + (extraClass || '');
    dd.innerHTML = contentHTML;
    document.body.appendChild(dd);

    var rect = anchorEl.getBoundingClientRect();
    var ddW  = dd.offsetWidth || 200;
    var left = rect.right - ddW;
    if (left < 8) left = 8;
    if (left + ddW > window.innerWidth - 8) left = window.innerWidth - ddW - 8;
    dd.style.top  = (rect.bottom + 6 + window.scrollY) + 'px';
    dd.style.left = left + 'px';

    requestAnimationFrame(function () { dd.classList.add('ui-dropdown--open'); });

    setTimeout(function () {
      document.addEventListener('click', function outsideClose(e) {
        if (!dd.contains(e.target)) {
          closeAllDropdowns();
          document.removeEventListener('click', outsideClose);
        }
      });
    }, 0);

    return dd;
  };

  window.closeAllDropdowns = function () {
    document.querySelectorAll('.ui-dropdown').forEach(function (d) { d.remove(); });
  };

  /* ══════════════════════════════════════════════════════════
     TOAST  (global)
  ══════════════════════════════════════════════════════════ */
  var toastTimer;
  window.showToast = function (msg, type) {
    type = type || 'info';
    var wrap = document.getElementById('toastWrap');
    if (!wrap) {
      wrap = document.createElement('div');
      wrap.id = 'toastWrap';
      document.body.appendChild(wrap);
    }
    clearTimeout(toastTimer);
    wrap.innerHTML = '<div class="ui-toast ui-toast--' + type + '">' + msg + '</div>';
    requestAnimationFrame(function () {
      var t = wrap.querySelector('.ui-toast');
      if (t) t.classList.add('ui-toast--show');
    });
    toastTimer = setTimeout(function () { wrap.innerHTML = ''; }, 3200);
  };

  /* ══════════════════════════════════════════════════════════
     MODAL  (global)
  ══════════════════════════════════════════════════════════ */
  window.openModal = function (title, bodyHTML, actions) {
    closeModal();
    var overlay = document.createElement('div');
    overlay.className = 'ui-modal-overlay';
    overlay.innerHTML =
      '<div class="ui-modal" role="dialog" aria-modal="true">' +
        '<div class="ui-modal-header">' +
          '<span class="ui-modal-title">' + title + '</span>' +
          '<button class="ui-modal-close" id="modalCloseBtn">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' +
          '</button>' +
        '</div>' +
        '<div class="ui-modal-body">' + bodyHTML + '</div>' +
        (actions ? '<div class="ui-modal-footer">' + actions + '</div>' : '') +
      '</div>';
    document.body.appendChild(overlay);
    requestAnimationFrame(function () { overlay.classList.add('ui-modal-overlay--open'); });
    overlay.querySelector('#modalCloseBtn').addEventListener('click', closeModal);
    overlay.addEventListener('click', function (e) { if (e.target === overlay) closeModal(); });
    document.addEventListener('keydown', escClose);
  };

  function escClose(e) { if (e.key === 'Escape') closeModal(); }

  window.closeModal = function () {
    var o = document.querySelector('.ui-modal-overlay');
    if (!o) return;
    o.classList.remove('ui-modal-overlay--open');
    setTimeout(function () { o.remove(); }, 200);
    document.removeEventListener('keydown', escClose);
  };

  /* ══════════════════════════════════════════════════════════
     PROFILE DROPDOWN  (global topbar)
  ══════════════════════════════════════════════════════════ */
  function openProfileDropdown(anchor) {
    var html =
      '<div class="dd-profile-header">' +
        '<div class="avatar-placeholder avatar-lg" style="background:#F97316;font-size:16px;">SK</div>' +
        '<div>' +
          '<div class="dd-profile-name">Sachin M</div>' +
          '<div class="dd-profile-role">Admin · ExamPrep</div>' +
        '</div>' +
      '</div>' +
      '<div class="dd-divider"></div>' +
      '<button class="dd-item" data-action="profile"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>My Profile</button>' +
      '<button class="dd-item" data-action="settings"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>Account Settings</button>' +
      '<button class="dd-item" data-action="team"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>Team Management</button>' +
      '<button class="dd-item" data-action="help"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>Help & Support</button>' +
      '<div class="dd-divider"></div>' +
      '<button class="dd-item dd-item--danger" data-action="logout"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>Sign Out</button>';

    var dd = createDropdown(anchor, html, 'dd-profile');
    dd.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-action]');
      if (!btn) return;
      closeAllDropdowns();
      var action = btn.dataset.action;
      if (action === 'profile')  openProfileModal();
      if (action === 'settings') window.location.href = 'settings.html';
      if (action === 'team')     window.location.href = 'team-management.html';
      if (action === 'help')     showToast('Opening Help & Support…', 'info');
      if (action === 'logout')   openLogoutConfirm();
    });
  }

  function openProfileModal() {
    openModal('My Profile',
      '<div class="profile-modal-content">' +
        '<div class="profile-modal-avatar">' +
          '<div class="avatar-placeholder" style="width:72px;height:72px;font-size:24px;background:#F97316;">SK</div>' +
          '<button class="btn btn-ghost" style="font-size:12px;margin-top:8px;" onclick="showToast(\'Photo upload coming soon\',\'info\')">Change Photo</button>' +
        '</div>' +
        '<div class="profile-modal-fields">' +
          '<div class="profile-field"><label>Full Name</label><input type="text" value="Sachin M" class="ui-input" /></div>' +
          '<div class="profile-field"><label>Email</label><input type="email" value="sachin@thenoviq.co.in" class="ui-input" /></div>' +
          '<div class="profile-field"><label>Role</label><input type="text" value="Admin" class="ui-input" readonly /></div>' +
          '<div class="profile-field"><label>Organisation</label><input type="text" value="ExamPrep Academy" class="ui-input" /></div>' +
        '</div>' +
      '</div>',
      '<button class="btn btn-ghost" onclick="closeModal()">Cancel</button>' +
      '<button class="btn btn-primary" onclick="showToast(\'Profile saved \u2713\',\'success\');closeModal()">Save Changes</button>'
    );
  }

  function openLogoutConfirm() {
    openModal('Sign Out',
      '<div style="text-align:center;padding:8px 0 4px;">' +
        '<div style="font-size:40px;margin-bottom:12px;">\uD83D\uDC4B</div>' +
        '<p style="color:var(--text-secondary);font-size:14px;line-height:1.6;">Are you sure you want to sign out of<br><strong>Noviq</strong>?</p>' +
      '</div>',
      '<button class="btn btn-ghost" onclick="closeModal()">Stay Signed In</button>' +
      '<button class="btn btn-primary" style="background:var(--color-danger);border-color:var(--color-danger);" onclick="showToast(\'Signed out. Redirecting\u2026\',\'info\');closeModal()">Sign Out</button>'
    );
  }

  /* ══════════════════════════════════════════════════════════
     NOTIFICATIONS DROPDOWN  (global topbar)
  ══════════════════════════════════════════════════════════ */
  var NOTIFICATIONS = [
    { icon:'✅', title:'Content Published',    body:'India–EU Trade Agreement Impact is now live.',    time:'2m ago',  unread:true  },
    { icon:'⏳', title:'Pending Review Alert', body:'36 articles are waiting for editorial review.',   time:'10m ago', unread:true  },
    { icon:'🤖', title:'AI Processing Done',   body:"ISRO's New Launch processed successfully.",       time:'28m ago', unread:true  },
    { icon:'✏️', title:'Content Edited',       body:'Digital India Progress Report was updated.',      time:'1h ago',  unread:false },
    { icon:'❌', title:'News Rejected',        body:'Celebrity News rejected by Neha Gupta.',          time:'2h ago',  unread:false },
    { icon:'📰', title:'New News Fetched',     body:'128 new articles added to Raw News Inbox.',      time:'3h ago',  unread:false },
  ];

  function openNotifDropdown(anchor) {
    var items = NOTIFICATIONS.map(function (n) {
      return '<div class="dd-notif-item ' + (n.unread ? 'dd-notif-item--unread' : '') + '">' +
        '<span class="dd-notif-icon">' + n.icon + '</span>' +
        '<div class="dd-notif-body">' +
          '<div class="dd-notif-title">' + n.title + '</div>' +
          '<div class="dd-notif-text">' + n.body + '</div>' +
          '<div class="dd-notif-time">' + n.time + '</div>' +
        '</div>' +
        (n.unread ? '<span class="dd-notif-dot"></span>' : '') +
      '</div>';
    }).join('');

    var html =
      '<div class="dd-notif-header">' +
        '<span class="dd-notif-heading">Notifications</span>' +
        '<button class="dd-mark-all" id="ddMarkAll">Mark all read</button>' +
      '</div>' +
      '<div class="dd-notif-list">' + items + '</div>' +
      '<div class="dd-notif-footer">' +
        '<button class="dd-view-all-notif" id="ddViewAllNotif">View All Notifications</button>' +
      '</div>';

    var dd = createDropdown(anchor, html, 'dd-notif');
    dd.querySelector('#ddMarkAll').addEventListener('click', function () {
      dd.querySelectorAll('.dd-notif-item--unread').forEach(function (el) { el.classList.remove('dd-notif-item--unread'); });
      dd.querySelectorAll('.dd-notif-dot').forEach(function (el) { el.remove(); });
      var badge = document.querySelector('.notif-badge');
      if (badge) badge.style.display = 'none';
      this.textContent = 'All read \u2713';
      this.disabled = true;
    });
    dd.querySelector('#ddViewAllNotif').addEventListener('click', function () {
      showToast('Opening notification centre\u2026', 'info');
      closeAllDropdowns();
    });
  }

  /* ══════════════════════════════════════════════════════════
     SEARCH  (global topbar — live suggestions)
  ══════════════════════════════════════════════════════════ */
  function initSearch() {
    var input = document.querySelector('.search-input');
    if (!input) return;

    var ALL_ITEMS = [
      'Dashboard','Raw News Inbox','AI Processing','Content Editor',
      'Publish Queue','Content Library','Analytics','Team Management','Settings',
      'India–EU Trade Agreement','RBI Monetary Policy','ISRO Launch',
      'Digital India Report','Climate Change Update',
    ];

    input.addEventListener('input', function () {
      var q = input.value.trim().toLowerCase();
      document.querySelector('.search-results-dd') && document.querySelector('.search-results-dd').remove();
      if (!q) return;
      var matches = ALL_ITEMS.filter(function (s) { return s.toLowerCase().includes(q); }).slice(0, 6);
      if (!matches.length) return;

      var dd = document.createElement('div');
      dd.className = 'ui-dropdown search-results-dd ui-dropdown--open';
      dd.innerHTML = matches.map(function (m) {
        var highlighted = m.replace(new RegExp(q, 'gi'), function (s) { return '<mark>' + s + '</mark>'; });
        return '<button class="dd-item" data-val="' + m + '">' + highlighted + '</button>';
      }).join('');
      document.body.appendChild(dd);

      var rect = input.getBoundingClientRect();
      dd.style.top   = (rect.bottom + 6 + window.scrollY) + 'px';
      dd.style.left  = rect.left + 'px';
      dd.style.width = rect.width + 'px';

      dd.addEventListener('click', function (e) {
        var btn = e.target.closest('[data-val]');
        if (btn) { input.value = btn.dataset.val; dd.remove(); showToast('Searching for "' + btn.dataset.val + '"…', 'info'); }
      });
    });

    input.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { input.value = ''; document.querySelector('.search-results-dd') && document.querySelector('.search-results-dd').remove(); }
      if (e.key === 'Enter' && input.value.trim()) showToast('Searching for "' + input.value.trim() + '"…', 'info');
    });

    document.addEventListener('click', function (e) {
      if (!input.contains(e.target)) document.querySelector('.search-results-dd') && document.querySelector('.search-results-dd').remove();
    });
  }

  /* ══════════════════════════════════════════════════════════
     WIRE TOPBAR  — runs on every page automatically
  ══════════════════════════════════════════════════════════ */
  function wireTopbar() {
    /* Header profile */
    var headerUser = document.querySelector('.header-user');
    if (headerUser) headerUser.addEventListener('click', function (e) { e.stopPropagation(); openProfileDropdown(headerUser); });

    /* Sidebar user */
    var sidebarUser = document.querySelector('.sidebar-user');
    if (sidebarUser) sidebarUser.addEventListener('click', function (e) { e.stopPropagation(); openProfileDropdown(sidebarUser); });

    /* Notifications bell */
    var notifBtn = document.querySelector('.header-notif');
    if (notifBtn) notifBtn.addEventListener('click', function (e) { e.stopPropagation(); openNotifDropdown(notifBtn); });

    /* Upgrade plan button (sidebar) */
    var upgradeBtn = document.querySelector('.btn-upgrade');
    if (upgradeBtn) upgradeBtn.addEventListener('click', function () {
      openModal('Upgrade Your Plan',
        '<div style="text-align:center;padding:8px 0;">' +
          '<div style="font-size:48px;margin-bottom:12px;">\uD83D\uDC51</div>' +
          '<p style="font-weight:600;font-size:16px;margin-bottom:8px;">You\'re already on Premium!</p>' +
          '<p style="color:var(--text-secondary);font-size:13px;line-height:1.6;">You have unlimited access to all features and AI models.<br>Contact us for enterprise solutions.</p>' +
        '</div>',
        '<button class="btn btn-primary" onclick="showToast(\'Our team will contact you soon!\',\'success\');closeModal()">Contact Sales</button>'
      );
    });
  }

})();
