export class ScrollManager {
  constructor() {
    this.lenis = null;
  }

  init() {
    if (this.lenis) this.lenis.destroy();

    this.lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.5,
    });

    this.lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { this.lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);

    // Progress bar — use transform instead of width for GPU
    const progressBar = document.querySelector('.page-progress');
    if (progressBar) {
      progressBar.style.width = '100%';
      progressBar.style.transformOrigin = 'left';
      progressBar.style.transform = 'scaleX(0)';
      this.lenis.on('scroll', ({ progress }) => {
        progressBar.style.transform = `scaleX(${progress})`;
      });
    }
  }

  start() {
    if (this.lenis) this.lenis.start();
  }

  stop() {
    if (this.lenis) this.lenis.stop();
  }
}

export const scrollManager = new ScrollManager();
