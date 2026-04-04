// LOADER
const loader = document.getElementById('loader');
const loaderProgress = document.getElementById('loader-progress');
let progress = 0;
const interval = setInterval(() => {
  progress += Math.random() * 15;
  if (progress >= 100) {
    progress = 100;
    clearInterval(interval);
    setTimeout(() => loader.classList.add('done'), 400);
  }
  loaderProgress.style.width = progress + '%';
}, 80);

// CUSTOM CURSOR
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;
document.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});
function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  follower.style.left = followerX + 'px';
  follower.style.top = followerY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();
document.querySelectorAll('a, button, .proj-card, .tl-content, .ach-card').forEach(el => {
  el.addEventListener('mouseenter', () => { cursor.classList.add('hover'); follower.classList.add('hover'); });
  el.addEventListener('mouseleave', () => { cursor.classList.remove('hover'); follower.classList.remove('hover'); });
});

// NAVBAR
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => { nav.classList.toggle('scrolled', window.scrollY > 50); });

const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
hamburger.addEventListener('click', () => { navLinks.classList.toggle('open'); });
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// TYPING
const texts = ['AI/ML Engineer', 'Computer Vision Expert', 'ML Systems Builder', 'Predictive Analytics Dev'];
let ti = 0, ci = 0, del = false;
const typedEl = document.getElementById('typed');
function type() {
  const cur = texts[ti];
  if (del) { typedEl.textContent = cur.substring(0, --ci); }
  else { typedEl.textContent = cur.substring(0, ++ci); }
  let delay = del ? 50 : 90;
  if (!del && ci === cur.length) { delay = 2000; del = true; }
  else if (del && ci === 0) { del = false; ti = (ti + 1) % texts.length; delay = 400; }
  setTimeout(type, delay);
}
setTimeout(type, 1500);

// COUNTER
function animateCounter(el) {
  const target = parseFloat(el.dataset.count);
  const isFloat = target % 1 !== 0;
  const duration = 2000, startTime = performance.now();
  function update(time) {
    const p = Math.min((time - startTime) / duration, 1);
    const val = target * (1 - Math.pow(1 - p, 3));
    el.textContent = isFloat ? val.toFixed(1) : Math.floor(val);
    if (p < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// INTERSECTION OBSERVERS
const fadeOpts = { threshold: 0.12, rootMargin: '0px 0px -40px 0px' };
const fadeObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, fadeOpts);
document.querySelectorAll('.tl-item, .proj-card, .skill-cat, .ach-card, .ci, .about-card').forEach(el => {
  el.classList.add('fade-up'); fadeObs.observe(el);
});

const skillObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.querySelectorAll('.skill-fill').forEach(b => b.style.width = b.dataset.w + '%');
  });
}, { threshold: 0.3 });
document.querySelectorAll('.skill-cat').forEach(el => skillObs.observe(el));

const counterObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.querySelectorAll('.stat-num').forEach(animateCounter); counterObs.unobserve(e.target); }
  });
}, { threshold: 0.5 });
const heroStats = document.querySelector('.hero-stats');
if (heroStats) counterObs.observe(heroStats);

// ACTIVE NAV
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');
const secObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navItems.forEach(l => { l.style.color = ''; if (l.getAttribute('href') === '#' + e.target.id) l.style.color = 'var(--accent)'; });
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => secObs.observe(s));


const form = document.querySelector(".contact-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = new FormData(form);

    const response = await fetch(form.action, {
      method: form.method,
      body: data,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      alert("Message sent successfully 🚀");
      form.reset();
    } else {
      alert("Something went wrong ❌");
    }
  });


// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e) {
    const t = document.querySelector(this.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
  });
});
