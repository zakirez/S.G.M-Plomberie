'use strict';
(() => {
  const header = document.querySelector('#siteHeader');
  const toggle = document.querySelector('#mobileMenuToggle');
  const mobileNav = document.querySelector('#mobileMenu');
  const onScroll = () => header?.classList.toggle('is-scrolled', window.scrollY > 12);
  onScroll();
  addEventListener('scroll', onScroll, {passive:true});

  if(toggle && mobileNav){
    const closeMenu = () => {
      mobileNav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded','false');
      toggle.setAttribute('aria-label','Ouvrir le menu');
      document.body.classList.remove('menu-open');
    };
    toggle.addEventListener('click', () => {
      const opened = mobileNav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(opened));
      toggle.setAttribute('aria-label', opened ? 'Fermer le menu' : 'Ouvrir le menu');
      document.body.classList.toggle('menu-open', opened);
    });
    mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', event => {if(event.key === 'Escape')closeMenu()});
    matchMedia('(min-width:981px)').addEventListener('change', e=>{if(e.matches)closeMenu()});
  }

  const reveals=[...document.querySelectorAll('[data-reveal]')];
  if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches){
    reveals.forEach(el=>el.classList.add('is-visible'));
  }else{
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}
      });
    }, {threshold:0.08,rootMargin:'0px 0px -30px 0px'});
    reveals.forEach(el=>observer.observe(el));
  }

  const form=document.querySelector('#contactForm');
  form?.addEventListener('submit', event => {
    event.preventDefault();
    if(!form.reportValidity())return;
    const d = new FormData(form);
    const lines=[
      'Bonjour S.G.M Plomberie,', '',
      'Je souhaite vous contacter au sujet de : '+d.get('projet'), '',
      'Nom : '+d.get('nom'),
      'E-mail : '+d.get('email'),
      'Téléphone : '+(d.get('telephone')||'Non renseigné'), '',
      'Message :', d.get('message'), '',
      'Cordialement'
    ];
    const subject=encodeURIComponent('Demande de contact S.G.M Plomberie — '+d.get('projet'));
    const body=encodeURIComponent(lines.join('\n'));
    const href='mailto:annesophie1123@gmail.com?subject='+subject+'&body='+body;
    document.querySelector('#formStatus').textContent='Votre logiciel de messagerie va s’ouvrir avec un message prérempli. Vérifiez puis envoyez votre e-mail.';
    window.location.href=href;
  });
})();
