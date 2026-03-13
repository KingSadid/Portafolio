import { eventManager } from '../core/EventManager.js';

export function initMagnetic() {
  const els = document.querySelectorAll('.btn-primary, .btn-secondary, .filter-btn, .contact-link, .nav-logo, .project-arrow, .magnetic');
  els.forEach((el) => {
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const dx = (e.clientX - rect.left - rect.width / 2) * 0.2;
      const dy = (e.clientY - rect.top - rect.height / 2) * 0.2;
      el.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
    };
    const onLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.4, ease: 'elastic.out(1, 0.5)', clearProps: 'transform' });
    };
    el.addEventListener('mousemove', onMove, { passive: true });
    el.addEventListener('mouseleave', onLeave, { passive: true });
  });
}

export function initCardTilt() {
  document.querySelectorAll('.project-card').forEach((card) => {
    let ticking = false;
    card.addEventListener('mousemove', (e) => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(800px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale(1.01)`;
        ticking = false;
      });
    }, { passive: true });
    
    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)';
      card.style.transform = 'perspective(800px) rotateY(0) rotateX(0) scale(1)';
      setTimeout(() => { card.style.transition = ''; }, 500);
    }, { passive: true });
  });
}

export function initRipple() {
  const container = document.querySelector('[data-barba="container"]');
  if (!container) return;

  const handler = (e) => {
    const el = e.target.closest('.stat-box, .filter-btn, .stack-item');
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    const size = Math.max(rect.width, rect.height);
    ripple.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - rect.left - size / 2}px;top:${e.clientY - rect.top - size / 2}px;`;
    el.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  };
  
  container.addEventListener('click', handler);
  eventManager.register(() => container.removeEventListener('click', handler));
}

export function initSonarHover() {
  const handler = (e) => {
    const title = e.target.closest('.section-title, .hero-name');
    if (!title) return;
    if (e.type === 'mouseover') {
      title.style.textShadow = '0 0 30px rgba(0,245,255,0.4), 0 0 60px rgba(0,245,255,0.2)';
    } else {
      title.style.transition = 'text-shadow 0.5s';
      title.style.textShadow = '';
      setTimeout(() => { title.style.transition = ''; }, 500);
    }
  };
  document.addEventListener('mouseover', handler, { passive: true });
  document.addEventListener('mouseout', handler, { passive: true });
  eventManager.register(() => {
    document.removeEventListener('mouseover', handler);
    document.removeEventListener('mouseout', handler);
  });
}
