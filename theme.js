// ════════════════════════════════════════════════════════════════
//  Theme toggle
//  - First load: uses the device's `prefers-color-scheme` setting
//  - Click the toggle button to override; choice is saved in localStorage
//  - If OS preference changes and the user hasn't overridden, the site follows
//
//  The matching <script> in every <head> sets data-theme BEFORE first paint,
//  so this file just wires up the toggle button and the OS-change listener.
// ════════════════════════════════════════════════════════════════
(function () {
  const root = document.documentElement;
  const STORAGE_KEY = 'theme';

  function setTheme(theme, persist) {
    root.setAttribute('data-theme', theme);
    if (persist) {
      try { localStorage.setItem(STORAGE_KEY, theme); } catch (e) { /* private mode etc */ }
    }
  }

  // Toggle button click — flip current value and remember it.
  const btn = document.querySelector('.theme-toggle');
  if (btn) {
    btn.addEventListener('click', function () {
      const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      setTheme(next, true);
    });
  }

  // Follow OS-preference changes, but only when the user hasn't picked manually.
  const mql = window.matchMedia('(prefers-color-scheme: light)');
  const onChange = function (e) {
    let userPick = null;
    try { userPick = localStorage.getItem(STORAGE_KEY); } catch (e) {}
    if (!userPick) setTheme(e.matches ? 'light' : 'dark', false);
  };
  // addEventListener is supported on MediaQueryList in all modern browsers.
  if (mql.addEventListener) mql.addEventListener('change', onChange);
  else if (mql.addListener) mql.addListener(onChange);
})();
