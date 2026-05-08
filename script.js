/* ============================================================
   Wu Xin — Personal Website
   Interactivity: Language Toggle, Lazy Video, Scroll Reveal
   ============================================================ */

(function () {
  'use strict';

  // -------------------- Language Toggle --------------------
  const STORAGE_KEY = 'wx-portfolio-lang';
  const langToggle = document.getElementById('langToggle');
  const body = document.body;

  function setLanguage(lang) {
    body.classList.remove('lang-zh', 'lang-en');
    body.classList.add('lang-' + lang);
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
  }

  // Initial language: stored preference > browser language > zh
  function initLanguage() {
    let saved = null;
    try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) {}
    if (saved === 'zh' || saved === 'en') {
      setLanguage(saved);
      return;
    }
    const browserLang = (navigator.language || 'zh').toLowerCase();
    setLanguage(browserLang.startsWith('zh') ? 'zh' : 'en');
  }
  initLanguage();

  if (langToggle) {
    langToggle.addEventListener('click', function () {
      const isZh = body.classList.contains('lang-zh');
      setLanguage(isZh ? 'en' : 'zh');
    });
  }

  // -------------------- Scroll Progress Bar --------------------
  const progressBar = document.getElementById('scrollProgress');
  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0;
    progressBar.style.width = pct + '%';
  }
  let progressTicking = false;
  window.addEventListener('scroll', function () {
    if (!progressTicking) {
      requestAnimationFrame(function () {
        updateProgress();
        progressTicking = false;
      });
      progressTicking = true;
    }
  }, { passive: true });
  updateProgress();

  // -------------------- Video Cards (Build & Lazy Load) --------------------
  const videoCards = document.querySelectorAll('.video-card');
  const videoBase = 'assets/videos/';
  const thumbBase = 'assets/thumbnails/';

  // Build static markup for each card (thumbnail + play overlay)
  videoCards.forEach(function (card, idx) {
    const videoFile = card.dataset.video;
    const thumbFile = card.dataset.thumb;
    if (!videoFile) return;

    // Set background thumbnail (loads only when card enters viewport via IntersectionObserver below)
    card.dataset.thumbUrl = thumbBase + thumbFile;

    // Build overlay markup
    card.innerHTML = `
      <span class="video-card-tag">${idx + 1 < 10 ? '0' + (idx + 1) : (idx + 1)}</span>
      <div class="video-card-overlay">
        <div class="video-play-btn" aria-label="Play video">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <polygon points="6,4 20,12 6,20"></polygon>
          </svg>
        </div>
      </div>
    `;

    // Click to play
    card.addEventListener('click', function () {
      if (card.classList.contains('playing')) return;
      playVideo(card);
    });
  });

  function playVideo(card) {
    const videoFile = card.dataset.video;
    if (!videoFile) return;

    const video = document.createElement('video');
    video.src = videoBase + videoFile;
    video.controls = true;
    video.autoplay = true;
    video.playsInline = true;
    video.preload = 'auto';
    video.setAttribute('controlslist', 'nodownload');

    // Insert below the tag/overlay so the corner number stays visible briefly
    card.appendChild(video);
    card.classList.add('playing');

    // Try to autoplay (may need to be muted in some browsers)
    const playPromise = video.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(function () {
        // Autoplay blocked - user can press play in native controls
      });
    }
  }

  // -------------------- Lazy load thumbnails --------------------
  if ('IntersectionObserver' in window) {
    const thumbObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const card = entry.target;
          const thumbUrl = card.dataset.thumbUrl;
          if (thumbUrl && !card.style.backgroundImage) {
            const img = new Image();
            img.onload = function () {
              card.style.backgroundImage = 'url(' + thumbUrl + ')';
            };
            img.src = thumbUrl;
          }
          obs.unobserve(card);
        }
      });
    }, { rootMargin: '200px 0px' });

    videoCards.forEach(function (card) { thumbObserver.observe(card); });
  } else {
    // Fallback: load all thumbs immediately
    videoCards.forEach(function (card) {
      if (card.dataset.thumbUrl) {
        card.style.backgroundImage = 'url(' + card.dataset.thumbUrl + ')';
      }
    });
  }

  // -------------------- Scroll Reveal --------------------
  if ('IntersectionObserver' in window) {
    const revealTargets = document.querySelectorAll(
      '.section-header, .about-grid, .exp-card, .project, .award-card, .tech-cat, .contact-card'
    );
    revealTargets.forEach(function (el) { el.classList.add('reveal'); });

    const revealObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });

    revealTargets.forEach(function (el) { revealObserver.observe(el); });
  }

  // -------------------- Smooth scroll offset for sticky nav --------------------
  // Native scroll-behavior:smooth handles the rest. Just make sure anchors don't
  // get hidden under the sticky nav by using scroll-margin-top via CSS (set below).
  // Inject a one-line style for scroll margin instead of editing main CSS.
  const navStyle = document.createElement('style');
  navStyle.textContent = 'section[id], header[id] { scroll-margin-top: 70px; }';
  document.head.appendChild(navStyle);

})();
