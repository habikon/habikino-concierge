const header=document.querySelector('.site-header');
const menuButton=document.querySelector('.menu-button');
const nav=document.querySelector('.global-nav');
window.addEventListener('scroll',()=>header?.classList.toggle('scrolled',window.scrollY>20));
menuButton?.addEventListener('click',()=>{const open=nav?.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(Boolean(open)));});
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

(async()=>{
  const newsSection=document.getElementById('habikino-news');
  if(!newsSection) return;
  const grid=document.getElementById('habikino-news-grid');
  try{
    const response=await fetch('data/articles.json',{cache:'no-store'});
    if(!response.ok) throw new Error('articles.json');
    const articles=await response.json();
    grid.innerHTML=articles.slice(0,3).map(a=>`<article class="local-news-card reveal is-visible"><div class="local-news-thumb">${a.card_label||'羽曳野のこと'}</div><div class="local-news-body"><div class="local-news-meta"><span class="local-news-category">${a.category}</span><time datetime="${a.date}">${a.date.replaceAll('-','.')}</time></div><h3>${a.title}</h3><p>${a.description}</p><a href="${a.url}">続きを読む →</a></div></article>`).join('');
  }catch(e){
    grid.innerHTML='<p class="local-news-loading">記事を読み込めませんでした。</p>';
  }
})();
