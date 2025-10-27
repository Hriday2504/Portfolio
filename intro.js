(function makeSplash() {
  const intro = document.createElement('div');
  intro.id = 'intro';
  intro.className = 'intro';
  intro.innerHTML = `
    <div class="intro-box">
      <div class="intro-title">HRIDAY</div>
      <div class="intro-sub">CREATIVE CODING</div>
      <div class="intro-scan"></div>
      <div class="intro-hint">click or press any key to skip</div>
    </div>
  `;
  document.body.appendChild(intro);

  const finish = () => { if (!intro.classList.contains('done')) intro.classList.add('done'); };
  const t = setTimeout(finish, 2800); 
  intro.addEventListener('click', () => { clearTimeout(t); finish(); });
  window.addEventListener('keydown', () => { clearTimeout(t); finish(); });
  intro.addEventListener('transitionend', () => intro.remove());
})();


(function highlightNav() {
  const here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(a => {
    if (a.getAttribute('href') === here) a.classList.add('is-active');
  });
})();

(function bounceBoxes() {
  const NAV_H = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 46;
  const margin = 10;

  function makeBouncer(el, { startX, startY, vx = 2.2, vy = 1.8 } = {}) {
    if (!el) return;
    let x = startX ?? 50;
    let y = startY ?? NAV_H + 20;
    let dx = vx, dy = vy;

    function frame() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const rect = el.getBoundingClientRect();
      const maxX = w - rect.width - margin;
      const minX = margin;
      const maxY = h - rect.height - margin;
      const minY = NAV_H + margin;

      x += dx; y += dy;

      if (x <= minX) { x = minX; dx = Math.abs(dx); }
      if (x >= maxX) { x = maxX; dx = -Math.abs(dx); }
      if (y <= minY) { y = minY; dy = Math.abs(dy); }
      if (y >= maxY) { y = maxY; dy = -Math.abs(dy); }

      el.style.transform = `translate(${x}px, ${y}px)`;
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  makeBouncer(document.getElementById('introBox'), { startX: 60,  startY: NAV_H + 30,  vx: 2.4, vy: 1.9 });
  makeBouncer(document.getElementById('bioBox'),   { startX: 220, startY: NAV_H + 140, vx: -1.7, vy: 1.5 });
})();
