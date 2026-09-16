const header=document.querySelector('.site-header');
const menuButton=document.querySelector('.menu-button');
const nav=document.querySelector('.global-nav');
window.addEventListener('scroll',()=>header?.classList.toggle('scrolled',window.scrollY>20));
menuButton?.addEventListener('click',()=>{const open=nav?.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(Boolean(open)));});
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

(()=>{
  if(!document.querySelector('link[href="media.css"]')){
    const mediaCss=document.createElement('link');
    mediaCss.rel='stylesheet';
    mediaCss.href='media.css';
    document.head.appendChild(mediaCss);
  }

  if(nav && !nav.querySelector('[data-habikino-news-link]')){
    const link=document.createElement('a');
    link.href='#habikino-news';
    link.textContent='羽曳野のこと';
    link.dataset.habikinoNewsLink='true';
    const faqLink=[...nav.querySelectorAll('a')].find(a=>a.getAttribute('href')==='#faq');
    nav.insertBefore(link,faqLink||null);
  }

  if(!document.getElementById('habikino-news')){
    const target=document.getElementById('cases')||document.getElementById('faq');
    if(target){
      const section=document.createElement('section');
      section.className='section habikino-news-section';
      section.id='habikino-news';
      section.innerHTML=`<div class="container"><div class="section-heading reveal is-visible"><p class="section-label">HABIKINO LOCAL</p><h2>羽曳野のこと</h2><p>イベント、子育て、暮らし、行政、お店など、羽曳野の今を分かりやすくお届けします。</p></div><div class="local-news-grid" id="habikino-news-grid"><p class="local-news-loading">記事を読み込んでいます...</p></div><div class="local-news-more"><a class="button button-sub" href="articles/">記事をすべて見る →</a></div></div>`;
      target.parentNode.insertBefore(section,target);
    }
  }
})();

(async()=>{
  const grid=document.getElementById('habikino-news-grid');
  if(!grid) return;
  try{
    const response=await fetch('data/articles.json',{cache:'no-store'});
    if(!response.ok) throw new Error('articles.json');
    const articles=await response.json();
    grid.innerHTML=articles.slice(0,3).map(a=>`<article class="local-news-card"><div class="local-news-thumb">${a.card_label||'羽曳野のこと'}</div><div class="local-news-body"><div class="local-news-meta"><span class="local-news-category">${a.category}</span><time datetime="${a.date}">${a.date.replaceAll('-','.')}</time></div><h3>${a.title}</h3><p>${a.description}</p><a href="${a.url}">続きを読む →</a></div></article>`).join('');
  }catch(e){
    grid.innerHTML='<p class="local-news-loading">記事を読み込めませんでした。</p>';
  }
})();
