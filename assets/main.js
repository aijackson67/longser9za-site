// 年齡確認
(function(){
  var gate = document.getElementById('ageGate');
  if (!gate) return;
  if (sessionStorage.getItem('ls9za-age') === 'ok') {
    gate.classList.add('hidden');
  }
  var yes = document.getElementById('ageYes');
  var no = document.getElementById('ageNo');
  if (yes) yes.addEventListener('click', function(){
    sessionStorage.setItem('ls9za-age','ok');
    gate.classList.add('hidden');
  });
  if (no) no.addEventListener('click', function(){
    window.location.href = 'https://www.google.com';
  });
})();

// 手機選單
(function(){
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  if (!toggle || !links) return;
  toggle.addEventListener('click', function(){
    var open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  links.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded','false');
    });
  });
})();

// 捲動顯示動畫
(function(){
  var els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  if (!('IntersectionObserver' in window)) {
    els.forEach(function(el){ el.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  els.forEach(function(el){ io.observe(el); });
})();

// 開跑倒數（僅在有 #countdown 的頁面執行）
(function(){
  var box = document.getElementById('countdown');
  if (!box) return;
  var targets = [
    { label: box.getAttribute('data-label-1') || '距離台中「心動篇」開跑', t: new Date('2026-10-23T19:00:00+08:00').getTime() }
  ];
  var label = document.getElementById('cdLabel');
  var d = document.getElementById('cdD'), h = document.getElementById('cdH'),
      m = document.getElementById('cdM'), s = document.getElementById('cdS');
  function pad(n){ return n < 10 ? '0' + n : '' + n; }
  function tick(){
    var now = Date.now(), cur = null;
    for (var i = 0; i < targets.length; i++) {
      if (targets[i].t > now) { cur = targets[i]; break; }
    }
    if (!cur) { box.hidden = true; return; }
    box.hidden = false;
    label.textContent = cur.label;
    var diff = Math.floor((cur.t - now) / 1000);
    d.textContent = Math.floor(diff / 86400);
    h.textContent = pad(Math.floor(diff % 86400 / 3600));
    m.textContent = pad(Math.floor(diff % 3600 / 60));
    s.textContent = pad(diff % 60);
    setTimeout(tick, 1000);
  }
  tick();
})();

// 年份
(function(){
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();

// 購票點擊追蹤（所有 lin.ee 連結；事件名 buy_click，區分頁面與按鈕位置）
(function(){
  if (typeof gtag !== 'function') return;
  document.querySelectorAll('a[href*="lin.ee"]').forEach(function(a){
    a.addEventListener('click', function(){
      var area = 'other';
      if (a.closest('header')) area = 'nav';
      else if (a.closest('footer')) area = 'footer';
      else if (a.closest('.cta-box')) area = 'cta_box';
      else if (a.closest('.hero')) area = 'hero';
      else if (a.closest('.section')) area = 'section';
      gtag('event', 'buy_click', {
        page_path: location.pathname,
        button_area: area,
        button_text: (a.textContent || '').trim().slice(0, 40)
      });
    });
  });
})();
