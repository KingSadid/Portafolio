export class Navigation {
  constructor() {
    this.hamburger = document.querySelector('.hamburger');
    this.mobileMenu = document.querySelector('.mobile-menu');
  }

  init() {
    if (!this.hamburger || !this.mobileMenu) return;

    this.hamburger.addEventListener('click', () => {
      this.hamburger.classList.toggle('open');
      this.mobileMenu.classList.toggle('open');
      if (this.mobileMenu.classList.contains('open')) {
        gsap.fromTo('.mobile-menu a', { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.06, duration: 0.4, ease: 'back.out(1.4)' });
      }
    });

    this.mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        this.hamburger.classList.remove('open');
        this.mobileMenu.classList.remove('open');
      });
    });
  }

  updateActive(namespace) {
    document.querySelectorAll('.nav-links a').forEach((a) => {
      const href = a.getAttribute('href');
      const linkNs = href.replace('.html', '').replace('index', 'home').replace('./', '');
      a.classList.toggle('active', linkNs === namespace || (namespace === 'home' && (linkNs === '' || linkNs === 'index')));
    });
    this.updateIndicator();
  }

  updateIndicator() {
    const activeLink = document.querySelector('.nav-links a.active');
    const indicator = document.querySelector('.nav-indicator');
    if (!activeLink || !indicator) return;
    const navRect = document.querySelector('.nav-links').getBoundingClientRect();
    const linkRect = activeLink.getBoundingClientRect();
    indicator.style.left = (linkRect.left - navRect.left) + 'px';
    indicator.style.width = linkRect.width + 'px';
  }
}

export const navigation = new Navigation();
