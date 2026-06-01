// ── Hamburger menu (Pattern C: slide panel) ──
const hamburger = document.querySelector('.hamburger');
if (hamburger) {
  const scrim = document.createElement('div');
  scrim.className = 'menu-scrim';
  document.body.appendChild(scrim);

  const panel = document.createElement('div');
  panel.className = 'menu-panel';

  const closeBtn = document.createElement('button');
  closeBtn.className = 'menu-panel-close';
  closeBtn.setAttribute('aria-label', 'メニューを閉じる');
  panel.appendChild(closeBtn);

  const nav = document.querySelector('.main-nav');
  if (nav) panel.appendChild(nav.cloneNode(true));

  document.body.appendChild(panel);

  function openMenu() {
    document.body.classList.add('menu-open');
    hamburger.setAttribute('aria-label', 'メニューを閉じる');
  }
  function closeMenu() {
    document.body.classList.remove('menu-open');
    hamburger.setAttribute('aria-label', 'メニューを開く');
  }

  hamburger.addEventListener('click', openMenu);
  closeBtn.addEventListener('click', closeMenu);
  scrim.addEventListener('click', closeMenu);
}

// ── Video toggle ──
document.querySelectorAll('.video-toggle').forEach(btn => {
  const video = btn.closest('.work-thumb').querySelector('video');
  const iconPause = btn.querySelector('.icon-pause');
  const iconPlay  = btn.querySelector('.icon-play');
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (video.paused) {
      video.play();
      iconPause.style.display = '';
      iconPlay.style.display  = 'none';
      btn.setAttribute('aria-label', '一時停止');
    } else {
      video.pause();
      iconPause.style.display = 'none';
      iconPlay.style.display  = '';
      btn.setAttribute('aria-label', '再生');
    }
  });
});

// ── Effect: card reveal ──
const revealCards = document.querySelectorAll('.work-card');
if (revealCards.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('is-visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0, rootMargin: '0px 0px -5% 0px' });
  revealCards.forEach(card => observer.observe(card));
}

// ── Work filter ──
const filterBtns = document.querySelectorAll('.filter-btn');
const workCards  = document.querySelectorAll('.work-card');

if (filterBtns.length) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      const filter = btn.dataset.filter;
      workCards.forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('is-hidden', !match);
      });

      // フィルター後、画面内に入ったカードをすぐ表示
      requestAnimationFrame(() => {
        workCards.forEach(card => {
          if (!card.classList.contains('is-hidden') && !card.classList.contains('is-visible')) {
            const rect = card.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
              card.classList.add('is-visible');
            }
          }
        });
      });
    });
  });
}
