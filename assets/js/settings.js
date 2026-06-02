/* ============================================================
   SETTINGS JS — Noviq
   All 10 tabs fully interactive
   ============================================================ */
'use strict';

/* ── State ── */
var settingsData = {
  platformName: 'Noviq',
  tagline: 'Smarter Content. Better Results.',
  timezone: 'Asia/Kolkata',
  dateFormat: 'MMM DD, YYYY',
  timeFormat: '12',
  language: 'en-US',
  autoSummary: true,
  autoTags: true,
  duplicateCheck: false,
  defaultStatus: 'Draft',
  imageSource: 'Unsplash',
  imageSize: 'Large (1200px)',
  videoEmbed: true,
  itemsPerPage: '10',
  darkMode: false,
  orgName: 'ExamPrep Academy',
  orgEmail: 'admin@examprep.in',
  orgWebsite: 'https://examprep.in',
  orgPan: 'AABCE1234F',
  orgGST: '27AABCE1234F1ZV',
  aiModel: 'gpt-4',
  aiTemperature: '0.7',
  maxTokens: '2000',
  autoProcess: true,
  smartSuggest: true,
  qualityCheck: true,
  emailNotif: true,
  inAppNotif: true,
  publishAlert: true,
  reviewAlert: true,
  teamAlert: false,
  digestEmail: 'daily',
  seoAutoMeta: true,
  seoAutoSlug: true,
  seoOgImage: true,
  seoSitemap: true,
  defaultFocusKw: '',
  sessionTimeout: '30',
  twoFactor: false,
  ipWhitelist: false,
  forceHttps: true,
};

/* ══════════════════════════════════════════════════════════
   TAB SWITCHING
══════════════════════════════════════════════════════════ */
function switchSettingsTab(tabKey) {
  document.querySelectorAll('.st-nav-item').forEach(function(item) {
    item.classList.toggle('active', item.dataset.tab === tabKey);
  });
  document.querySelectorAll('.st-panel').forEach(function(panel) {
    panel.classList.toggle('active', panel.id === 'panel-' + tabKey);
  });
}

/* ══════════════════════════════════════════════════════════
   TOGGLE SWITCH HELPER
══════════════════════════════════════════════════════════ */
function makeToggle(inputId, stateKey) {
  var el = document.getElementById(inputId);
  if (!el) return;
  el.checked = !!settingsData[stateKey];
  el.addEventListener('change', function() {
    settingsData[stateKey] = this.checked;
  });
  // Also wire the thumb click propagation
  var toggle = el.closest('.st-toggle');
  if (toggle) {
    toggle.addEventListener('click', function() {
      el.checked = !el.checked;
      settingsData[stateKey] = el.checked;
      el.dispatchEvent(new Event('change'));
    });
  }
}

/* ══════════════════════════════════════════════════════════
   SAVE + TOAST
══════════════════════════════════════════════════════════ */
function showStToast(msg, type) {
  type = type || 'success';
  var wrap = document.getElementById('toastWrap');
  if (!wrap) { wrap = document.createElement('div'); wrap.id = 'toastWrap'; document.body.appendChild(wrap); }
  wrap.innerHTML = '<div class="ui-toast ui-toast--' + type + '">' + msg + '</div>';
  requestAnimationFrame(function() {
    var t = wrap.querySelector('.ui-toast');
    if (t) t.classList.add('ui-toast--show');
  });
  setTimeout(function() { wrap.innerHTML = ''; }, 3000);
}

function savePanel(tabKey) {
  showStToast('Settings saved \u2713', 'success');
  // Show inline badge
  var badge = document.querySelector('#panel-' + tabKey + ' .st-saved-badge');
  if (badge) {
    badge.classList.add('show');
    setTimeout(function() { badge.classList.remove('show'); }, 2500);
  }
}

/* ══════════════════════════════════════════════════════════
   INIT ALL PANELS
══════════════════════════════════════════════════════════ */
document.addEventListener('app:ready', function() {

  /* Wire nav items */
  document.querySelectorAll('.st-nav-item').forEach(function(item) {
    item.addEventListener('click', function() { switchSettingsTab(item.dataset.tab); });
  });

  /* Wire all save buttons */
  document.querySelectorAll('.st-save-btn').forEach(function(btn) {
    btn.addEventListener('click', function() { savePanel(btn.dataset.panel); });
  });

  /* ── GENERAL ── */
  bindInput('stPlatformName', 'platformName');
  bindInput('stTagline', 'tagline');
  bindSelect('stTimezone', 'timezone');
  bindSelect('stDateFormat', 'dateFormat');
  bindRadioGroup('stTimeFormat', 'timeFormat');
  bindSelect('stLanguage', 'language');
  makeToggle('stAutoSummary', 'autoSummary');
  makeToggle('stAutoTags', 'autoTags');
  makeToggle('stDuplicateCheck', 'duplicateCheck');
  bindSelect('stDefaultStatus', 'defaultStatus');
  bindSelect('stImageSource', 'imageSource');
  bindSelect('stImageSize', 'imageSize');
  makeToggle('stVideoEmbed', 'videoEmbed');
  bindSelect('stItemsPerPage', 'itemsPerPage');
  makeToggle('stDarkMode', 'darkMode');

  /* ── ORGANIZATION ── */
  bindInput('stOrgName', 'orgName');
  bindInput('stOrgEmail', 'orgEmail');
  bindInput('stOrgWebsite', 'orgWebsite');
  bindInput('stOrgPan', 'orgPan');
  bindInput('stOrgGST', 'orgGST');

  /* ── AI & PROCESSING ── */
  bindSelect('stAiModel', 'aiModel');
  bindSelect('stAiTemp', 'aiTemperature');
  bindSelect('stMaxTokens', 'maxTokens');
  makeToggle('stAutoProcess', 'autoProcess');
  makeToggle('stSmartSuggest', 'smartSuggest');
  makeToggle('stQualityCheck', 'qualityCheck');

  /* ── NOTIFICATIONS ── */
  makeToggle('stEmailNotif', 'emailNotif');
  makeToggle('stInAppNotif', 'inAppNotif');
  makeToggle('stPublishAlert', 'publishAlert');
  makeToggle('stReviewAlert', 'reviewAlert');
  makeToggle('stTeamAlert', 'teamAlert');
  bindRadioGroup('stDigestEmail', 'digestEmail');

  /* ── SEO ── */
  makeToggle('stSeoAutoMeta', 'seoAutoMeta');
  makeToggle('stSeoAutoSlug', 'seoAutoSlug');
  makeToggle('stSeoOgImage', 'seoOgImage');
  makeToggle('stSeoSitemap', 'seoSitemap');
  bindInput('stDefaultFocusKw', 'defaultFocusKw');

  /* ── SECURITY ── */
  bindSelect('stSessionTimeout', 'sessionTimeout');
  makeToggle('stTwoFactor', 'twoFactor');
  makeToggle('stIpWhitelist', 'ipWhitelist');
  makeToggle('stForceHttps', 'forceHttps');

  /* ── Danger actions ── */
  wireDangerBtn('stResetBtn',      'Reset all settings to defaults?', function() {
    showStToast('Settings reset to defaults', 'info');
  });
  wireDangerBtn('stClearCacheBtn', 'Clear all cached data?', function() {
    showStToast('Cache cleared \u2713', 'success');
  });
  wireDangerBtn('stDeleteDataBtn', 'Permanently delete all content? This cannot be undone!', function() {
    showStToast('Action cancelled — contact support to delete data', 'danger');
  });

  /* Integration connect/disconnect buttons */
  document.querySelectorAll('[data-integration]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var name    = btn.dataset.integration;
      var isConn  = btn.dataset.connected === 'true';
      btn.dataset.connected = isConn ? 'false' : 'true';
      btn.textContent = isConn ? 'Connect' : 'Disconnect';
      btn.className = isConn ? 'st-badge-sm blue' : 'st-badge-sm gray';
      showStToast(isConn ? name + ' disconnected' : name + ' connected \u2713', isConn ? 'info' : 'success');
    });
  });

  /* Role edit buttons */
  document.querySelectorAll('[data-role-edit]').forEach(function(btn) {
    btn.addEventListener('click', function() { showStToast('Edit role: ' + btn.dataset.roleEdit, 'info'); });
  });

  /* Log export */
  var logExport = document.getElementById('stLogExport');
  if (logExport) logExport.addEventListener('click', function() { showStToast('Exporting logs\u2026', 'info'); });

  /* Billing buttons */
  var upgradeBtn = document.getElementById('stUpgradeBtn');
  if (upgradeBtn) upgradeBtn.addEventListener('click', function() { showStToast('Opening billing portal\u2026', 'info'); });
  var cancelBtn = document.getElementById('stCancelPlan');
  if (cancelBtn) cancelBtn.addEventListener('click', function() { showStToast('Please contact support to cancel your plan', 'danger'); });

  /* Change password */
  var changePwdBtn = document.getElementById('stChangePwdBtn');
  if (changePwdBtn) changePwdBtn.addEventListener('click', function() {
    var cur  = document.getElementById('stCurrentPwd')?.value;
    var nw   = document.getElementById('stNewPwd')?.value;
    var conf = document.getElementById('stConfirmPwd')?.value;
    if (!cur || !nw)     { showStToast('Please fill all password fields', 'danger'); return; }
    if (nw !== conf)     { showStToast('New passwords do not match', 'danger'); return; }
    if (nw.length < 8)   { showStToast('Password must be at least 8 characters', 'danger'); return; }
    showStToast('Password changed successfully \u2713', 'success');
    ['stCurrentPwd','stNewPwd','stConfirmPwd'].forEach(function(id) {
      var el = document.getElementById(id); if (el) el.value = '';
    });
  });

  /* Tag inputs */
  wireTagInput('stAllowedDomainsWrap', 'stAllowedDomainsInput');
  wireTagInput('stBlockedDomainsWrap', 'stBlockedDomainsInput');

  /* Avatar upload */
  var avatarUpload = document.getElementById('stAvatarUpload');
  if (avatarUpload) avatarUpload.addEventListener('click', function() { showStToast('File picker would open here', 'info'); });
  var avatarRemove = document.getElementById('stAvatarRemove');
  if (avatarRemove) avatarRemove.addEventListener('click', function() { showStToast('Profile photo removed', 'info'); });

  /* Activate general tab by default */
  switchSettingsTab('general');
});

/* ══════════════════════════════════════════════════════════
   BIND HELPERS
══════════════════════════════════════════════════════════ */
function bindInput(elId, stateKey) {
  var el = document.getElementById(elId);
  if (!el) return;
  if (settingsData[stateKey] !== undefined) el.value = settingsData[stateKey];
  el.addEventListener('input', function() { settingsData[stateKey] = this.value; });
}

function bindSelect(elId, stateKey) {
  var el = document.getElementById(elId);
  if (!el) return;
  if (settingsData[stateKey] !== undefined) el.value = settingsData[stateKey];
  el.addEventListener('change', function() { settingsData[stateKey] = this.value; });
}

function bindRadioGroup(name, stateKey) {
  document.querySelectorAll('input[name="' + name + '"]').forEach(function(radio) {
    if (settingsData[stateKey] !== undefined) radio.checked = radio.value === settingsData[stateKey];
    radio.addEventListener('change', function() {
      if (this.checked) {
        settingsData[stateKey] = this.value;
        // Update parent highlight
        document.querySelectorAll('input[name="' + name + '"]').forEach(function(r) {
          var opt = r.closest('.st-radio-opt');
          if (opt) opt.classList.toggle('selected', r.checked);
        });
      }
    });
    var opt = radio.closest('.st-radio-opt');
    if (opt) {
      opt.classList.toggle('selected', radio.checked);
      opt.addEventListener('click', function() {
        radio.checked = true;
        radio.dispatchEvent(new Event('change'));
      });
    }
  });
}

function wireDangerBtn(btnId, confirmMsg, cb) {
  var btn = document.getElementById(btnId);
  if (!btn) return;
  btn.addEventListener('click', function() {
    if (window.confirm(confirmMsg)) cb();
  });
}

function wireTagInput(wrapId, inputId) {
  var wrap  = document.getElementById(wrapId);
  var input = document.getElementById(inputId);
  if (!wrap || !input) return;
  wrap.addEventListener('click', function() { input.focus(); });
  input.addEventListener('keydown', function(e) {
    if ((e.key === 'Enter' || e.key === ',') && this.value.trim()) {
      e.preventDefault();
      var val = this.value.trim().replace(/,$/, '');
      var tag = document.createElement('span');
      tag.className = 'st-tag';
      tag.innerHTML = val + '<span class="st-tag-x" data-val="' + val + '">&#10005;</span>';
      wrap.insertBefore(tag, input);
      this.value = '';
    }
    if (e.key === 'Backspace' && !this.value) {
      var lastTag = wrap.querySelector('.st-tag:last-of-type');
      if (lastTag) lastTag.remove();
    }
  });
  wrap.addEventListener('click', function(e) {
    if (e.target.classList.contains('st-tag-x')) e.target.closest('.st-tag').remove();
  });
}
