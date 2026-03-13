export function runPreloader() {
  return new Promise((resolve) => {
    const preloader = document.querySelector('.preloader');
    const barFill = document.querySelector('.preloader-bar-fill');
    const preText = document.querySelector('.preloader-text');
    const preSub = document.querySelector('.preloader-sub');

    if (!preloader) { resolve(); return; }

    const messages = [
      { text: 'SCANNING FREQUENCIES', sub: 'Initializing signal protocols...' },
      { text: 'SIGNAL DETECTED', sub: 'Decoding transmission data...' },
      { text: 'DECRYPTING PAYLOAD', sub: 'Extracting portfolio modules...' },
      { text: 'ESTABLISHING LINK', sub: 'Synchronizing visual systems...' },
      { text: 'CONNECTION SECURED', sub: 'Rendering interface...' },
    ];

    let progress = 0;
    let msgIndex = 0;

    const interval = setInterval(() => {
      progress += Math.random() * 8 + 2;
      if (progress > 100) progress = 100;
      if (barFill) barFill.style.width = progress + '%';

      const newMsgIndex = Math.min(Math.floor(progress / 22), messages.length - 1);
      if (newMsgIndex !== msgIndex) {
        msgIndex = newMsgIndex;
        if (preText) {
          preText.style.opacity = '0';
          setTimeout(() => {
            preText.textContent = messages[msgIndex].text;
            preText.style.opacity = '1';
          }, 200);
        }
        if (preSub) {
          preSub.style.opacity = '0';
          setTimeout(() => {
            preSub.textContent = messages[msgIndex].sub;
            preSub.style.opacity = '1';
          }, 150);
        }
      }

      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          preloader.style.opacity = '0';
          setTimeout(() => {
            preloader.classList.add('hidden');
            resolve();
          }, 600);
        }, 400);
      }
    }, 120);
  });
}
