(function () {
  'use strict';

  var hero = document.getElementById('hero');
  var power = document.getElementById('power');
  var target = document.getElementById('products');
  if (!hero || !power || !target) return;

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var busy = false;

  power.addEventListener('click', function () {
    if (busy) return;
    busy = true;

    var on = power.getAttribute('aria-checked') !== 'true';
    power.setAttribute('aria-checked', on ? 'true' : 'false');

    var delay = 0;
    if (!reduce.matches) {
      hero.classList.remove('surge');
      void hero.offsetWidth;
      hero.classList.add('surge');
      delay = 650;
    }

    window.setTimeout(function () {
      hero.classList.remove('surge');
      target.scrollIntoView({ behavior: reduce.matches ? 'auto' : 'smooth', block: 'start' });
      if (target.tabIndex < 0) target.tabIndex = -1;
      target.focus({ preventScroll: true });
      busy = false;
    }, delay);
  });
})();
