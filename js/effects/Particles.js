export function initParticles() {
  document.querySelectorAll('.particle').forEach(p => p.remove());

  const count = 12;
  const style = document.createElement('style');
  style.id = 'particle-anims';
  
  const old = document.getElementById('particle-anims');
  if (old) old.remove();

  let css = '';
  const colors = ['0,245,255', '255,45,120', '167,139,255'];

  for (let i = 0; i < count; i++) {
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const size = 1 + Math.random() * 2;
    const dur = 18 + Math.random() * 15;
    const delay = Math.random() * 8;
    const dx = (Math.random() - 0.5) * 150;
    const dy = (Math.random() - 0.5) * 200;
    const col = colors[(Math.random() * 3) | 0];

    const p = document.createElement('div');
    p.className = 'particle';
    p.style.cssText = `left:${x}vw;top:${y}vh;width:${size}px;height:${size}px;background:rgba(${col},0.3);animation:pFloat${i} ${dur}s ease-in-out ${delay}s infinite alternate;`;
    document.body.appendChild(p);

    css += `@keyframes pFloat${i}{0%{opacity:0.15;transform:translate3d(0,0,0)}50%{opacity:0.3}100%{opacity:0.1;transform:translate3d(${dx}px,${dy}px,0)}}\n`;
  }

  style.textContent = css;
  document.head.appendChild(style);
}
