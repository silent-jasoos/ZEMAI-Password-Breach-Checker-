// ── TERMINAL ANIMATION ──
// FIX: Track pending timers so restarting the animation cancels previous run
// (prevents ghost lines appearing when setInterval fires mid-animation)
const lines = [
  { html: '<span class="t-dim">$</span> <span class="t-acc">zemai</span> scan --email <span class="t-white">user@example.com</span>' },
  { html: '<span class="t-dim">Initializing scan engine...</span>' },
  { html: '<span class="t-dim">Querying 18.4B breach records...</span>' },
  { html: '<span class="t-red">⚠  BREACH DETECTED</span>' },
  { html: '<span class="t-dim">   ↳ LinkedIn  2021 · password hash exposed</span>' },
  { html: '<span class="t-dim">   ↳ Adobe     2023 · email + username</span>' },
  { html: '<span class="t-blue">   ↳ Dark web  listing found · 2 days ago</span>' },
  { html: '<span class="t-ok">✓  Full report generated.</span> <span class="blink">█</span>' },
];

let termTimers = [];

function runTerminal() {
  termTimers.forEach(id => clearTimeout(id));
  termTimers = [];

  const body = document.getElementById('term-body');
  if (!body) return;
  body.innerHTML = '';

  lines.forEach((line, i) => {
    const id = setTimeout(() => {
      const div = document.createElement('div');
      div.innerHTML = line.html;
      div.style.opacity = '0';
      div.style.transform = 'translateX(-6px)';
      div.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      body.appendChild(div);
      requestAnimationFrame(() => {
        setTimeout(() => { div.style.opacity = '1'; div.style.transform = 'none'; }, 20);
      });
    }, i * 420);
    termTimers.push(id);
  });
}

// ── SCROLL REVEAL ──
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const siblings = entry.target.parentElement.querySelectorAll('[data-reveal]');
      let delay = 0;
      siblings.forEach((el, i) => {
        if (el === entry.target) delay = i * 80;
      });
      setTimeout(() => entry.target.classList.add('visible'), delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));

// ── NAVBAR SCROLL ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ── MOBILE MENU ──
// FIX: sync aria-expanded attribute on burger button for accessibility
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobile-menu');

burger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  burger.innerHTML = isOpen ? '✕' : '&#9776;';
  burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    burger.innerHTML = '&#9776;';
    burger.setAttribute('aria-expanded', 'false');
  });
});

// ── FAQ ACCORDION ──
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const answer = btn.nextElementSibling;
    const isOpen = btn.getAttribute('aria-expanded') === 'true';

    // close all
    document.querySelectorAll('.faq-q').forEach(b => {
      b.setAttribute('aria-expanded', 'false');
      b.nextElementSibling.classList.remove('open');
    });

    // open clicked if it was closed
    if (!isOpen) {
      btn.setAttribute('aria-expanded', 'true');
      answer.classList.add('open');
    }
  });
});

// ── CONTACT FORM ──
// FIX: replaced bare alert() with inline per-field error messages
function setError(groupId, hasError) {
  const group = document.getElementById(groupId);
  if (!group) return;
  group.classList.toggle('has-error', hasError);
}

function clearErrors() {
  document.querySelectorAll('.form-group.has-error').forEach(g => g.classList.remove('has-error'));
}

document.getElementById('submit-btn').addEventListener('click', function () {
  clearErrors();

  const fname   = document.getElementById('fname').value.trim();
  const email   = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  let hasError = false;

  if (!fname) { setError('group-fname', true); hasError = true; }
  if (!email || !emailRegex.test(email)) { setError('group-email', true); hasError = true; }
  if (!message) { setError('group-message', true); hasError = true; }

  if (hasError) return;

  this.textContent = '✓ Message Sent!';
  this.style.background = '#3ddc84';
  this.disabled = true;

  setTimeout(() => {
    ['fname', 'lname', 'email', 'subject', 'message'].forEach(id => {
      document.getElementById(id).value = '';
    });
    clearErrors();
    this.textContent = 'Send Message →';
    this.style.background = '';
    this.disabled = false;
  }, 3500);
});

// clear error state as user types
['fname', 'email', 'message'].forEach(id => {
  document.getElementById(id).addEventListener('input', () => {
    const group = document.getElementById('group-' + id);
    if (group) group.classList.remove('has-error');
  });
});

// ── INIT ──
window.addEventListener('DOMContentLoaded', () => {
  runTerminal();
  setInterval(runTerminal, 12000);
});