const header=document.querySelector('.site-header');
const menuButton=document.querySelector('.menu-button');
const nav=document.querySelector('.global-nav');
window.addEventListener('scroll',()=>header?.classList.toggle('scrolled',window.scrollY>20));
menuButton?.addEventListener('click',()=>{const open=nav?.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(Boolean(open)));});
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
