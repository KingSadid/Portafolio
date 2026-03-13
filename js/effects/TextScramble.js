class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = '!<>-_\\/[]{}—=+*^?#';
    this.update = this.update.bind(this);
  }
  
  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise((resolve) => (this.resolve = resolve));
    this.queue = [];
    
    for (let i = 0; i < length; i++) {
      this.queue.push({
        from: oldText[i] || '', to: newText[i] || '',
        start: Math.floor(Math.random() * 20),
        end: Math.floor(Math.random() * 20) + 20,
      });
    }
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }
  
  update() {
    let output = '', complete = 0;
    for (let i = 0; i < this.queue.length; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) { complete++; output += to; }
      else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.chars[(Math.random() * this.chars.length) | 0];
          this.queue[i].char = char;
        }
        output += `<span style="color:var(--cyan);opacity:0.6">${char}</span>`;
      } else { output += from; }
    }
    this.el.innerHTML = output;
    if (complete === this.queue.length) this.resolve();
    else { this.frameRequest = requestAnimationFrame(this.update); this.frame++; }
  }
}

export function initTextScramble() {
  document.querySelectorAll('.project-name').forEach((el) => {
    const original = el.textContent;
    const scramble = new TextScramble(el);
    const card = el.closest('.project-card');
    if (card) card.addEventListener('mouseenter', () => scramble.setText(original), { passive: true });
  });
}

export function initLogoScramble() {
  const logo = document.querySelector('.nav-logo');
  if (!logo) return;
  const original = logo.textContent;
  const scramble = new TextScramble(logo);
  logo.addEventListener('mouseenter', () => scramble.setText(original), { passive: true });
}
