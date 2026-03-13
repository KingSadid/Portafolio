import { eventManager } from '../core/EventManager.js';

let reactiveChars = [];
let reactiveRectsCache = [];
let rectsCacheFrame = -1;

export function initTextReactive() {
  reactiveChars = [];
  reactiveRectsCache = [];

  document.querySelectorAll('.text-reactive').forEach((el) => {
    if (el.querySelector('.text-reactive-char')) return; // Already split

    const text = el.textContent;
    if (!text.trim()) return;
    el.innerHTML = '';

    const words = text.split(' ');
    words.forEach((word, wi) => {
      const wordSpan = document.createElement('span');
      wordSpan.className = 'text-reactive-word';
      wordSpan.style.willChange = 'transform';

      for (let i = 0; i < word.length; i++) {
        const ch = document.createElement('span');
        ch.className = 'text-reactive-char';
        ch.textContent = word[i];
        ch.style.willChange = 'transform';
        wordSpan.appendChild(ch);
      }

      el.appendChild(wordSpan);
      if (wi < words.length - 1) el.appendChild(document.createTextNode(' '));
    });
  });

  reactiveChars = Array.from(document.querySelectorAll('.text-reactive-char'));

  const cleanup = eventManager.onMouseMoveRAF((e) => {
    const mx = e.clientX, my = e.clientY;
    const maxDist = 100;
    const viewH = window.innerHeight;

    const now = performance.now();
    if (now - rectsCacheFrame > 100 || reactiveRectsCache.length !== reactiveChars.length) {
      rectsCacheFrame = now;
      reactiveRectsCache = reactiveChars.map(ch => {
        const r = ch.getBoundingClientRect();
        return { cx: r.left + r.width * 0.5, cy: r.top + r.height * 0.5 };
      });
    }

    for (let i = 0; i < reactiveChars.length; i++) {
      const ch = reactiveChars[i];
      const rc = reactiveRectsCache[i];
      if (!rc) continue;

      if (rc.cy < -50 || rc.cy > viewH + 50) continue;

      const dx = mx - rc.cx;
      const dy = my - rc.cy;
      const distSq = dx * dx + dy * dy;

      if (distSq < maxDist * maxDist) {
        const dist = Math.sqrt(distSq);
        const intensity = 1 - dist / maxDist;
        const angle = Math.atan2(dy, dx);
        const push = intensity * 6;

        ch.style.transform = `translate3d(${-Math.cos(angle) * push}px, ${-Math.sin(angle) * push}px, 0) scale(${1 + intensity * 0.15})`;
        ch.style.color = `hsl(${180 + intensity * 30}, 100%, ${60 + intensity * 20}%)`;
        ch.style.textShadow = `0 0 ${intensity * 15}px rgba(0,245,255,${intensity * 0.5})`;
      } else {
        if (ch.style.transform) {
          ch.style.transform = '';
          ch.style.color = '';
          ch.style.textShadow = '';
        }
      }
    }
  });
  eventManager.register(cleanup);

  // Word hover uses CSS transitions
  document.querySelectorAll('.text-reactive-word').forEach((word) => {
    word.style.transition = 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1), text-shadow 0.3s';
    word.addEventListener('mouseenter', () => {
      word.style.transform = 'scale(1.05)';
      word.style.textShadow = '0 0 15px rgba(0,245,255,0.3)';
    }, { passive: true });
    word.addEventListener('mouseleave', () => {
      word.style.transform = '';
      word.style.textShadow = '';
    }, { passive: true });
  });
}

export function initTextParallax() {
  const els = document.querySelectorAll('.about-text p, .contact-tagline, .project-desc, .hero-sub, .hero-sub-es');
  if (!els.length) return;

  const cleanup = eventManager.onMouseMoveRAF((e) => {
    const cx = window.innerWidth * 0.5;
    const cy = window.innerHeight * 0.5;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;

    for (let i = 0; i < els.length; i++) {
      const depth = 0.4 + (i % 3) * 0.2;
      els[i].style.transform = `translate3d(${dx * 5 * depth}px, ${dy * 3 * depth}px, 0)`;
    }
  });
  eventManager.register(cleanup);
}
