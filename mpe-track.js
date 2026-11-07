/* MPE results tracker.
   Pages call MPE.begin() when a test starts and MPE.finish({...}) when it ends.
   Each result is saved on the device and sent to the family Google Sheet. If the device is offline,
   the result waits in a queue and is sent the next time any page loads online. */
(function () {
  var SHEET_URL = ''; // paste the Google Apps Script web app URL (ends in /exec) between the quotes
  var KIDS = ['Winston', 'Evelyn', 'Haylen', 'Levin'];
  var COLORS = { Winston: '#2A9D8F', Evelyn: '#E76F9A', Haylen: '#F4A261', Levin: '#4C6EF5' };
  var IDLE_CAP = 180000; // idle gaps longer than 3 minutes are not counted as time spent

  function g(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function s(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function jget(k, d) { try { var v = JSON.parse(g(k)); return v == null ? d : v; } catch (e) { return d; } }
  function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 8); }
  function device() {
    var u = navigator.userAgent || '';
    if (/CrOS/.test(u)) return 'Chromebook';
    if (/iPad/.test(u) || (/Macintosh/.test(u) && navigator.maxTouchPoints > 1)) return 'iPad';
    if (/iPhone/.test(u)) return 'iPhone';
    if (/Android/.test(u)) return 'Android';
    if (/Windows/.test(u)) return 'Windows';
    if (/Macintosh/.test(u)) return 'Mac';
    if (/Linux/.test(u)) return 'Linux';
    return 'Other';
  }

  var A = null; // current attempt

  var SES = { active: 0, last: Date.now() }; // time on this page, for work that is saved later (stories)
  function touch(now) {
    if (!document.hidden) SES.active += Math.min(now - SES.last, IDLE_CAP);
    SES.last = now;
    if (!A || A.paused || !A.started) return;
    A.active += Math.min(now - A.last, IDLE_CAP);
    A.last = now;
  }
  ['pointerdown', 'keydown', 'touchstart', 'input'].forEach(function (ev) {
    document.addEventListener(ev, function () { touch(Date.now()); }, true);
  });
  document.addEventListener('visibilitychange', function () {
    var now = Date.now();
    if (!document.hidden) SES.last = now;
    if (!A || !A.started) return;
    if (document.hidden) { touch(now); A.paused = true; }
    else { A.paused = false; A.last = now; SES.last = now; }
  });

  function picker(kids, done) {
    var last = g('mpe_child'), o = document.createElement('div');
    o.setAttribute('role', 'dialog');
    o.style.cssText = 'position:fixed;inset:0;z-index:99999;background:rgba(20,24,40,.72);display:flex;align-items:center;justify-content:center;padding:16px;font-family:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif';
    var box = document.createElement('div');
    box.style.cssText = 'background:#fff;color:#26304A;border-radius:20px;padding:24px 20px;max-width:420px;width:100%;text-align:center;box-shadow:0 10px 40px rgba(0,0,0,.35)';
    box.innerHTML = '<div style="font-size:22px;font-weight:800;margin-bottom:4px">Who is taking this test?</div><div style="font-size:14px;opacity:.7;margin-bottom:16px">Tap your name to start.</div>';
    kids.forEach(function (k) {
      var b = document.createElement('button');
      b.textContent = k;
      b.style.cssText = 'display:block;width:100%;margin:8px 0;padding:16px;font-size:20px;font-weight:800;border-radius:14px;border:4px solid ' + (k === last ? '#26304A' : 'transparent') + ';background:' + (COLORS[k] || '#2B3A67') + ';color:#fff;cursor:pointer';
      b.onclick = function () { s('mpe_child', k); o.remove(); done(k); };
      box.appendChild(b);
    });
    o.appendChild(box);
    document.body.appendChild(o);
  }

  function toast(msg) {
    var t = document.createElement('div');
    t.textContent = msg;
    t.style.cssText = 'position:fixed;left:50%;bottom:20px;transform:translateX(-50%);z-index:99998;background:#26304A;color:#fff;padding:12px 18px;border-radius:14px;font:700 15px system-ui,-apple-system,sans-serif;box-shadow:0 6px 20px rgba(0,0,0,.35);max-width:92vw;text-align:center';
    document.body.appendChild(t);
    setTimeout(function () { t.remove(); }, 5000);
  }

  var busy = false;
  function flush() {
    if (busy || !SHEET_URL || !navigator.onLine) return;
    var q = jget('mpe_q', []);
    if (!q.length) return;
    var rec = q[0];
    busy = true;
    fetch(SHEET_URL, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(rec), keepalive: true })
      .then(function () {
        var cur = jget('mpe_q', []).filter(function (r) { return r.id !== rec.id; });
        s('mpe_q', JSON.stringify(cur));
        busy = false;
        if (cur.length) flush();
      })
      .catch(function () { busy = false; });
  }
  window.addEventListener('online', flush);

  var MPE = {
    kids: KIDS,
    url: function () { return SHEET_URL; },
    /* opts.kids: names offered in the picker. opts.fixed: skip the picker and use this name. */
    begin: function (opts) {
      opts = opts || {};
      var now = Date.now();
      A = { id: uid(), active: 0, last: now, started: false, paused: false, child: null, reported: false };
      var mine = A;
      var start = function (child) { if (A !== mine) return; mine.child = child; mine.started = true; mine.last = Date.now(); mine.active = 0; };
      if (opts.fixed) { s('mpe_child', opts.fixed); start(opts.fixed); }
      else picker(opts.kids || KIDS, start);
    },
    /* Ask who it is, then call cb(name). Starts a fresh attempt. */
    ask: function (kids, cb) {
      var mine = A = { id: uid(), active: 0, last: Date.now(), started: false, paused: false, child: null, reported: false };
      picker(kids || KIDS, function (c) { if (A === mine) mine.child = c; cb(c); });
    },
    /* info: { score, total, section, test, child, seconds, useSession } */
    finish: function (info) {
      info = info || {};
      if (!A) A = { id: uid(), active: 0, last: Date.now(), started: false, paused: false, child: null, reported: false };
      if (A.reported) return;
      A.reported = true;
      touch(Date.now());
      var rec = {
        id: A.id,
        ts: new Date().toISOString(),
        child: info.child || A.child || g('mpe_child') || '',
        test: info.test || document.title,
        section: info.section || '',
        score: Number(info.score) || 0,
        total: Number(info.total) || 0,
        seconds: info.seconds != null ? Math.round(info.seconds) : Math.round((info.useSession ? SES.active : A.active) / 1000),
        device: device()
      };
      var log = jget('mpe_log', []);
      var pct = rec.total ? Math.round(rec.score / rec.total * 100) : null;
      var prev = log.filter(function (r) { return r.child === rec.child && r.test === rec.test && r.section === rec.section && r.total; })
        .map(function (r) { return Math.round(r.score / r.total * 100); });
      log.push(rec);
      s('mpe_log', JSON.stringify(log.slice(-1000)));
      var q = jget('mpe_q', []); q.push(rec); s('mpe_q', JSON.stringify(q.slice(-300)));
      flush();
      var best = prev.length ? Math.max.apply(null, prev) : null;
      var msg = 'Saved for ' + (rec.child || 'you');
      if (pct != null) msg += best == null ? ' · first try on this test!' : pct > best ? ' · new personal best!' : ' · your best is ' + best + '%';
      toast(msg);
      return rec;
    },
    log: function () { return jget('mpe_log', []); },
    queued: function () { return jget('mpe_q', []); },
    flush: flush
  };
  window.MPE = MPE;
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', flush); else flush();
})();
