// Mobile navigation
const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('site-nav');

function setNav(open) {
  toggle.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('open', open);
}

toggle.addEventListener('click', () => setNav(toggle.getAttribute('aria-expanded') !== 'true'));
nav.addEventListener('click', (e) => { if (e.target.closest('a')) setNav(false); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setNav(false); });

// Quick animated scroll for in-page links. Done in JS rather than CSS
// scroll-behavior so it stays short and consistent across browsers and OS settings.
const header = document.querySelector('.site-header');
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
let scrollFrame = null;

function scrollToY(targetY) {
  cancelAnimationFrame(scrollFrame);
  const startY = window.scrollY;
  const distance = targetY - startY;
  const duration = Math.min(700, Math.max(300, Math.abs(distance) / 5));
  const start = performance.now();
  const step = (now) => {
    const t = Math.min(1, (now - start) / duration);
    window.scrollTo(0, startY + distance * easeInOut(t));
    if (t < 1) scrollFrame = requestAnimationFrame(step);
  };
  scrollFrame = requestAnimationFrame(step);
}

document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href^="#"]');
  if (!link || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
  const target = document.getElementById(link.getAttribute('href').slice(1));
  if (!target) return;
  e.preventDefault();
  const y = target.id === 'top' ? 0 : target.getBoundingClientRect().top + window.scrollY - header.offsetHeight;
  scrollToY(Math.max(0, y));
  history.pushState(null, '', link.hash);
  // Move keyboard focus along with the scroll (needed for the skip link)
  if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
  target.focus({ preventScroll: true });
});

// Stop the animation if the user scrolls themselves
['wheel', 'touchstart', 'keydown'].forEach((type) =>
  window.addEventListener(type, () => cancelAnimationFrame(scrollFrame), { passive: true })
);

// Reveal sections as they scroll into view
const revealables = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    }
  }, { rootMargin: '0px 0px -10% 0px' });
  revealables.forEach((el) => observer.observe(el));
} else {
  revealables.forEach((el) => el.classList.add('visible'));
}

// Keep the footer year current
document.getElementById('year').textContent = new Date().getFullYear();
