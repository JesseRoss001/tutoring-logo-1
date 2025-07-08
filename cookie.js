/*  cookie.js  –  North Wales Tutoring
    -------------------------------------------------------------
    Handles the cookie-consent banner:
      • Shows the banner only if the visitor hasn’t chosen yet
      • Saves the choice (“accepted” | “declined”) to localStorage
      • Hides the banner after the choice is made
      • Fully keyboard accessible
    ----------------------------------------------------------- */
(function () {
  const KEY        = 'nwt-cookie-consent';         // storage key
  const banner     = document.getElementById('cookie-banner');
  const acceptBtn  = document.getElementById('cookie-accept');
  const declineBtn = document.getElementById('cookie-decline');

  if (!banner || !acceptBtn || !declineBtn) return; // safety-net

  /* --- Helpers ------------------------------------------------ */
  const saveChoice = value => {
    try   { localStorage.setItem(KEY, value); }
    catch { /* private-mode fallback – ignore */ }
    banner.classList.add('visually-hidden');
  };

  /* --- 1 ▸ Show banner only when needed ---------------------- */
  const stored = (() => {
    try   { return localStorage.getItem(KEY); }
    catch { return null; }
  })();

  if (!stored) {
    // small timeout avoids re-layout jank on initial paint
    setTimeout(() => banner.classList.remove('visually-hidden'), 400);
  }

  /* --- 2 ▸ Wire up buttons ----------------------------------- */
  acceptBtn.addEventListener('click', () => saveChoice('accepted'));
  declineBtn.addEventListener('click', () => saveChoice('declined'));

  /* --- 3 ▸ Allow <Esc> to dismiss (decline) ------------------ */
  banner.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      e.preventDefault();
      declineBtn.click();
    }
  });
})();
