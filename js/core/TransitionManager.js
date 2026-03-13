import { scrollManager } from './ScrollManager.js';
import { eventManager } from './EventManager.js';
import { cursorManager } from '../ui/Cursor.js';
import { navigation } from '../ui/Navigation.js';
import { pageAnimator } from '../animations/PageAnimator.js';

import { initMagnetic, initCardTilt, initRipple, initSonarHover } from '../effects/Interactions.js';
import { initTextScramble, initLogoScramble } from '../effects/TextScramble.js';
import { initTextReactive, initTextParallax } from '../effects/TextReactive.js';

export function initFilterProjects() {
  const bar = document.querySelector('.filter-bar');
  if (!bar) return;

  const handler = (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    bar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const type = btn.dataset.filter;

    document.querySelectorAll('.project-card').forEach((card) => {
      if (type === 'all' || card.dataset.type === type) {
        card.style.display = 'flex';
        gsap.fromTo(card, { opacity: 0, y: 30, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'back.out(1.2)' });
      } else {
        gsap.to(card, { opacity: 0, scale: 0.95, duration: 0.25, onComplete: () => { card.style.display = 'none'; } });
      }
    });
  };
  bar.addEventListener('click', handler);
  eventManager.register(() => bar.removeEventListener('click', handler));
}

export class TransitionManager {
  constructor() {
    this.transitionNames = {
      'home': '// RETURNING TO BASE',
      'about': '// READING SIGNAL ORIGIN',
      'projects': '// LOADING INTERCEPTED DATA',
      'stack': '// SCANNING FREQUENCIES',
      'contact': '// OPENING TRANSMISSION',
    };
  }

  init() {
    barba.init({
      preventRunning: true,
      transitions: [{
        name: 'liquid-curtain',

        leave: (data) => {
          const curtain = document.querySelector('.transition-curtain');
          const signalText = document.querySelector('.transition-signal');
          const nextNs = data.next.namespace || 'home';

          if (signalText) signalText.textContent = this.transitionNames[nextNs] || '// NAVIGATING';
          scrollManager.stop();
          cursorManager.resetState();

          // Clean up old page listeners via centralized manager
          eventManager.cleanupAll();

          return gsap.timeline()
            .to(data.current.container, { opacity: 0, y: -30, duration: 0.3, ease: 'power2.in' })
            .to(curtain, { y: '0%', duration: 0.5, ease: 'power3.inOut' }, '-=0.1')
            .to(signalText, { opacity: 1, duration: 0.3, ease: 'power2.out' })
            .to(signalText, { opacity: 0, duration: 0.2, delay: 0.4 });
        },

        enter(data) {
          const curtain = document.querySelector('.transition-curtain');
          window.scrollTo(0, 0);

          return gsap.timeline()
            .set(data.next.container, { opacity: 0, y: 30 })
            .to(curtain, { y: '-100%', duration: 0.5, ease: 'power3.inOut' })
            .to(data.next.container, { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }, '-=0.2')
            .set(curtain, { y: '100%' });
        },

        afterEnter: (data) => {
          const ns = data.next.namespace;
          
          navigation.updateActive(ns);
          scrollManager.init();
          
          // Re-initialize all interactive components for the new DOM
          cursorManager.initHover();
          initMagnetic();
          initCardTilt();
          initRipple();
          initTextScramble();
          initTextReactive();
          initTextParallax();
          initFilterProjects();
          initSonarHover();
          initLogoScramble();
          
          // Trigger page entrance animations
          pageAnimator.run(ns);
          
          scrollManager.start();
        }
      }]
    });
  }
}

export const transitionManager = new TransitionManager();
