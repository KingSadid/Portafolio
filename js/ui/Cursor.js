import { eventManager } from '../core/EventManager.js';

export class CursorManager {
  constructor() {
    this.cursor = document.getElementById('cursor');
    this.mouse = { x: 0, y: 0 };
    this.cursorPos = { x: 0, y: 0 };
    this.tickerId = null;
    this.moveHandler = null;
  }

  init() {
    if (!this.cursor) return;

    this.moveHandler = (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    };
    
    document.addEventListener('mousemove', this.moveHandler, { passive: true });

    this.tickerId = gsap.ticker.add(() => {
      this.cursorPos.x += (this.mouse.x - this.cursorPos.x) * 0.15;
      this.cursorPos.y += (this.mouse.y - this.cursorPos.y) * 0.15;
      this.cursor.style.transform = `translate3d(${this.cursorPos.x}px, ${this.cursorPos.y}px, 0)`;
    });
  }

  initHover() {
    const handler = (e) => {
      const el = e.target.closest('a, button, .project-card, .stack-item, .stat-box, .filter-btn, .form-input, .form-textarea, .contact-link');
      if (!this.cursor) return;
      if (e.type === 'mouseover' && el) this.cursor.classList.add('active');
      if (e.type === 'mouseout' && el) this.cursor.classList.remove('active');
    };
    
    document.addEventListener('mouseover', handler, { passive: true });
    document.addEventListener('mouseout', handler, { passive: true });
    
    eventManager.register(() => {
      document.removeEventListener('mouseover', handler);
      document.removeEventListener('mouseout', handler);
    });
  }

  resetState() {
    if (this.cursor) this.cursor.classList.remove('active');
  }
}

export const cursorManager = new CursorManager();
