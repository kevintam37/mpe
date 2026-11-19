/* MPE light/dark toggle. Loaded in <head> of every page.
   Modes: auto (follow the device), light, dark. Saved per device in localStorage "mpe_theme". */
(function () {
  var K = 'mpe_theme', root = document.documentElement;
  function get() { try { var v = localStorage.getItem(K); return v === 'light' || v === 'dark' ? v : 'auto'; } catch (e) { return 'auto'; } }
  function apply(m) { if (m === 'auto') root.removeAttribute('data-theme'); else root.setAttribute('data-theme', m); }
  function set(m) { try { localStorage.setItem(K, m); } catch (e) {} apply(m); paint(); try { window.dispatchEvent(new Event('mpe-theme')); } catch (e) {} }
  apply(get());
  window.MPETheme = { get: get, set: set };
  var NEXT = { auto: 'light', light: 'dark', dark: 'auto' };
  var ICON = { auto: '◐', light: '☀️', dark: '🌙' };
  var LABEL = { auto: 'Auto', light: 'Light', dark: 'Dark' };
  var btn;
  function paint() {
    if (!btn) return;
    var m = get();
    btn.innerHTML = '<span aria-hidden="true">' + ICON[m] + '</span> ' + LABEL[m];
    btn.setAttribute('aria-label', 'Color theme: ' + LABEL[m] + '. Tap to change to ' + LABEL[NEXT[m]] + '.');
    btn.title = 'Color theme: ' + LABEL[m] + ' (tap for ' + LABEL[NEXT[m]] + ')';
  }
  function build() {
    if (btn || !document.body) return;
    var st = document.createElement('style');
    st.textContent = ':root[data-theme="dark"]{color-scheme:dark}:root[data-theme="light"]{color-scheme:light}' +
      '#mpe-theme{position:fixed;top:10px;right:10px;z-index:9990;font:700 13px/1 system-ui,-apple-system,"Segoe UI",sans-serif;' +
      'padding:8px 12px;border-radius:99px;border:2px solid currentColor;background:var(--bg,var(--surface,#fff));color:var(--ink,#222);' +
      'cursor:pointer;opacity:.92;box-shadow:0 1px 4px rgba(0,0,0,.25)}#mpe-theme:hover{opacity:1}' +
      '#mpe-theme:focus-visible{outline:3px solid #f5a800;outline-offset:2px}@media print{#mpe-theme{display:none}}';
    document.head.appendChild(st);
    btn = document.createElement('button');
    btn.id = 'mpe-theme'; btn.type = 'button';
    btn.onclick = function () { set(NEXT[get()]); };
    document.body.appendChild(btn);
    paint();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build); else build();
  window.addEventListener('storage', function (e) { if (e.key === K) { apply(get()); paint(); } });
})();
