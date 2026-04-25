// Theme
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const btn = document.getElementById('themeBtn');
  if (btn) btn.textContent = theme === 'dark' ? '☀' : '☾';
  try { localStorage.setItem('theme', theme); } catch (e) {}
}
function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  applyTheme(current === 'dark' ? 'light' : 'dark');
}
(function initTheme() {
  let saved = null;
  try { saved = localStorage.getItem('theme'); } catch (e) {}
  const prefersDark = window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(saved || (prefersDark ? 'dark' : 'light'));
})();

// Mobile nav toggle
function toggleNav() {
  const nav = document.getElementById('siteNav');
  if (nav) nav.classList.toggle('open');
}

// Cookie consent (AdSense compliance)
(function consent() {
  let agreed = null;
  try { agreed = localStorage.getItem('consent'); } catch (e) {}
  if (agreed) return;
  document.addEventListener('DOMContentLoaded', () => {
    const banner = document.getElementById('consentBanner');
    if (banner) banner.classList.add('show');
  });
})();
function setConsent(value) {
  try { localStorage.setItem('consent', value); } catch (e) {}
  const banner = document.getElementById('consentBanner');
  if (banner) banner.classList.remove('show');
}

// Set active nav link based on current pathname
document.addEventListener('DOMContentLoaded', () => {
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.site-nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
});
