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
    { label: box.getAttribute('data-label-1') || '距離台北微醺・大稻埕場開跑', t: new Date('2026-07-17T00:00:00+08:00').getTime() },
    { label: box.getAttribute('data-label-2') || '距離台北微醺・圓山花博場開跑', t: new Date('2026-07-24T00:00:00+08:00').getTime() }
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
