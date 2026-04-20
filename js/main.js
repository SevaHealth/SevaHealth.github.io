/* ============================================
   SEVA HEALTH — MAIN JS
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {

    // ---- Mobile Nav ----
    const toggle = document.getElementById('nav-toggle');
    const close = document.getElementById('nav-close');
    const menu = document.getElementById('nav-menu');
    const links = document.querySelectorAll('.nav__link');

    function openMenu() { menu.classList.add('show'); document.body.style.overflow = 'hidden'; }
    function closeMenu() { menu.classList.remove('show'); document.body.style.overflow = ''; }

    if (toggle) toggle.addEventListener('click', openMenu);
    if (close) close.addEventListener('click', closeMenu);
    links.forEach(l => l.addEventListener('click', closeMenu));
    document.addEventListener('click', e => {
        if (menu.classList.contains('show') && !menu.contains(e.target) && !toggle.contains(e.target)) closeMenu();
    });

    // ---- Header scroll + topbar hide ----
    const header = document.getElementById('header');
    const topbar = document.getElementById('topbar');
    function onScroll() {
        const scrolled = window.scrollY > 50;
        header.classList.toggle('scrolled', scrolled);
        if (topbar) topbar.classList.toggle('topbar--hidden', scrolled);
        const btt = document.getElementById('btt');
        if (btt) btt.classList.toggle('visible', window.scrollY > 500);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // ---- Back to top ----
    const btt = document.getElementById('btt');
    if (btt) btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));


    // ---- FAQ accordion ----
    document.querySelectorAll('.faq__item').forEach(item => {
        const q = item.querySelector('.faq__q');
        q.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            document.querySelectorAll('.faq__item').forEach(other => {
                if (other !== item) {
                    other.classList.remove('active');
                    other.querySelector('.faq__q').setAttribute('aria-expanded', 'false');
                }
            });
            item.classList.toggle('active');
            q.setAttribute('aria-expanded', !isActive);
        });
    });

    // ---- Contact form ----
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            const data = Object.fromEntries(new FormData(form).entries());
            if (!data.name || !data.email) return showMsg('Please fill in all required fields.', 'error');
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return showMsg('Please enter a valid email address.', 'error');

            const btn = form.querySelector('button[type="submit"]');
            const orig = btn.innerHTML;
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
            btn.disabled = true;

            setTimeout(() => {
                showMsg('Thank you! Your message has been received. We\'ll be in touch within 24 hours.', 'success');
                form.reset();
                btn.innerHTML = orig;
                btn.disabled = false;
            }, 1200);
        });
    }

    function showMsg(text, type) {
        const existing = form.querySelector('.form__msg');
        if (existing) existing.remove();
        const el = document.createElement('div');
        el.className = 'form__msg';
        el.innerHTML = `<i class="fa-solid ${type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation'}"></i> ${text}`;
        el.style.cssText = `padding:1rem 1.25rem;margin-bottom:1rem;border-radius:6px;font-size:.88rem;display:flex;align-items:center;gap:.5rem;animation:fadeIn .3s ease;${type === 'success' ? 'background:#E8F5E9;color:#2E7D32;border:1px solid #C8E6C9' : 'background:#FFF3E0;color:#E65100;border:1px solid #FFE0B2'}`;
        form.insertBefore(el, form.firstChild);
        setTimeout(() => { if (el.parentNode) { el.style.opacity = '0'; el.style.transition = 'opacity .3s'; setTimeout(() => el.remove(), 300); } }, 6000);
    }

    // ---- Active nav on scroll ----
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const y = window.scrollY + 100;
        sections.forEach(s => {
            const link = document.querySelector(`.nav__link[href="#${s.id}"]`);
            if (link) link.classList.toggle('active-link', y >= s.offsetTop && y < s.offsetTop + s.offsetHeight);
        });
    }, { passive: true });

    // ---- Smooth scroll ----
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', function(e) {
            const id = this.getAttribute('href');
            if (id === '#') return;
            const target = document.querySelector(id);
            if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
        });
    });
});
