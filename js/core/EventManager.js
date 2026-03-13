export class EventManager {
  constructor() {
    this.cleanupFns = [];
  }

  register(fn) {
    this.cleanupFns.push(fn);
  }

  cleanupAll() {
    this.cleanupFns.forEach(fn => fn());
    this.cleanupFns = [];
  }

  // RAF-throttled mousemove utility
  onMouseMoveRAF(callback) {
    let ticking = false;
    const handler = (e) => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          callback(e);
          ticking = false;
        });
      }
    };
    document.addEventListener('mousemove', handler, { passive: true });
    return () => document.removeEventListener('mousemove', handler);
  }
}

export const eventManager = new EventManager();
