export class PageAnimator {
  constructor() {
    this.strategies = {
      'home': this.animateHome,
      'about': this.animateAbout,
      'projects': this.animateProjects,
      'stack': this.animateStack,
      'contact': this.animateContact
    };
  }

  run(namespace) {
    ScrollTrigger.getAll().forEach(st => st.kill());
    
    const animateFn = this.strategies[namespace] || this.animateHome;
    animateFn.call(this);
  }

  animateHome() {
    const tl = gsap.timeline({ delay: 0.2 });
    tl.to('.hero-tag', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
      .to('.hero-name', { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, '-=0.4')
      .to('.hero-sub', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
      .to('.hero-sub-es', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
      .to('.hero-cta', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
      .to('.hero-scroll', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3')
      .to('.corner', { opacity: 0.5, duration: 0.4, stagger: 0.1 }, '-=0.5');
  }

  animateAbout() {
    const tl = gsap.timeline({ delay: 0.2 });
    tl.to('#about .section-label', { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' })
      .to('#about .section-title', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.3')
      .to('.about-text p', { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' }, '-=0.3')
      .to('.stat-box', { opacity: 1, y: 0, rotateX: 0, duration: 0.8, stagger: 0.12, ease: 'back.out(1.4)', onComplete: () => this.initCountUp() }, '-=0.4');
  }

  animateProjects() {
    const tl = gsap.timeline({ delay: 0.2 });
    tl.to('#projects .section-label', { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' })
      .to('#projects .section-title', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.3')
      .to('.project-card', { opacity: 1, y: 0, scale: 1, duration: 0.9, stagger: 0.1, ease: 'power3.out' }, '-=0.3');
  }

  animateStack() {
    const tl = gsap.timeline({ delay: 0.2 });
    tl.to('#stack .section-label', { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' })
      .to('#stack .section-title', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.3')
      .to('.stack-item', {
        opacity: 1, y: 0, scale: 1,
        duration: 0.7, stagger: { each: 0.06, from: 'random' }, ease: 'back.out(1.2)',
        onComplete: () => {
          document.querySelectorAll('.stack-item').forEach((item, i) => {
            item.style.animation = `floatItem ${2 + (i % 3)}s ease-in-out ${(i * 0.3) % 2}s infinite`;
          });
        },
      }, '-=0.3');
  }

  animateContact() {
    const tl = gsap.timeline({ delay: 0.2 });
    tl.to('#contact .section-label', { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' })
      .to('#contact .section-title', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.3')
      .to('.contact-tagline', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.3')
      .to('.form-group', { opacity: 1, x: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out' }, '-=0.3')
      .to('.form-submit', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.3');
      
    const submit = document.querySelector('.form-submit');
    if (submit) submit.style.animation = 'submitGlow 2s ease-in-out infinite';
  }

  initCountUp() {
    document.querySelectorAll('.stat-number').forEach((el) => {
      const text = el.textContent.trim();
      const match = text.match(/^(\d+)/);
      if (match) {
        const target = parseInt(match[1]);
        const suffix = text.replace(match[1], '');
        const obj = { val: 0 };
        gsap.to(obj, { val: target, duration: 1.8, ease: 'power2.out', onUpdate: () => { el.textContent = Math.floor(obj.val) + suffix; } });
      }
    });
  }
}

export const pageAnimator = new PageAnimator();
