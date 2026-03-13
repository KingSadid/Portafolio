import { scrollManager } from './core/ScrollManager.js';
import { transitionManager } from './core/TransitionManager.js';
import { runPreloader } from './ui/Preloader.js';
import { cursorManager } from './ui/Cursor.js';
import { navigation } from './ui/Navigation.js';
import { pageAnimator } from './animations/PageAnimator.js';

import { initMagnetic, initCardTilt, initRipple, initSonarHover } from './effects/Interactions.js';
import { initTextScramble, initLogoScramble } from './effects/TextScramble.js';
import { initTextReactive, initTextParallax } from './effects/TextReactive.js';
import { initParticles } from './effects/Particles.js';
import { initFilterProjects } from './core/TransitionManager.js'; // Exported from there for delegation

async function init() {
  // Register core GSAP plugins
  gsap.registerPlugin(ScrollTrigger);

  // 1. Run preloader sequence
  await runPreloader();

  // 2. Core Initializations
  scrollManager.init();
  cursorManager.init();
  navigation.init();
  initParticles();

  // 3. UI Interactions & Effects
  cursorManager.initHover();
  initMagnetic();
  initSonarHover();
  initLogoScramble();
  initCardTilt();
  initRipple();
  initTextScramble();
  initTextReactive();
  initTextParallax();
  initFilterProjects();

  // 4. Determine current namespace and run its animation
  const container = document.querySelector('[data-barba="container"]');
  const ns = container ? container.dataset.barbaNamespace : 'home';
  
  pageAnimator.run(ns);
  navigation.updateActive(ns);

  // 5. Start transition router
  transitionManager.init();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
