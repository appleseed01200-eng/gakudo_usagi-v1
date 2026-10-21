'use strict';
const menuButton=document.querySelector('.menu-toggle'), navigation=document.querySelector('#navigation');
function closeMenu(){navigation.classList.remove('open');menuButton.setAttribute('aria-expanded','false');}
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';navigation.classList.toggle('open',open);menuButton.setAttribute('aria-expanded',String(open));});
navigation.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&navigation.classList.contains('open')){closeMenu();menuButton.focus();}});
window.matchMedia('(min-width:951px)').addEventListener('change',event=>{if(event.matches)closeMenu();});
const schedules={
 weekday:[['下校後','「ただいま！」からスタート','手洗いをして、ほっとひと息。'],['15:00','宿題・読書の時間','自分のペースで、机に向かう時間。'],['15:30','みんなでおやつ','準備も片づけも、少しずつ一緒に。'],['16:00','思いきり、あそぼう','外遊びや室内遊びで好きなことを。'],['17:00〜','お迎え・また明日','一日の様子を伝えながら、順番に帰宅。']],
 holiday:[['8:00','「おはよう！」の時間','学校がお休みの日の朝。'],['9:00','学習・自由遊び','宿題や読書、そのあとには好きな遊び。'],['12:00','お昼ごはん','みんなで食卓を囲む時間。'],['13:00','季節の活動・おやつ','その日ならではの体験を。'],['17:00〜','お迎え・また明日','片づけをして、お迎えを待ちます。']]
};
const schedulePanel=document.querySelector('#schedule-panel'),tabs=[...document.querySelectorAll('[data-schedule]')];
function selectSchedule(tab){
 if(!schedulePanel || !tab)return;
 tabs.forEach(item=>{item.setAttribute('aria-selected',String(item===tab));item.tabIndex=item===tab?0:-1;});
 schedulePanel.setAttribute('aria-labelledby',tab.id);const list=document.createElement('ol');
 schedules[tab.dataset.schedule].forEach(([time,title,text])=>{const li=document.createElement('li'),label=document.createElement('span'),content=document.createElement('div'),h=document.createElement('h3'),p=document.createElement('p');label.className='schedule-time';label.textContent=time;h.textContent=title;p.textContent=text;content.append(h,p);li.append(label,content);list.append(li);});schedulePanel.replaceChildren(list);
}
tabs.forEach((tab,index)=>{tab.addEventListener('click',()=>selectSchedule(tab));tab.addEventListener('keydown',event=>{let next;if(['ArrowRight','ArrowLeft'].includes(event.key))next=tabs[(index+1)%tabs.length];if(event.key==='Home')next=tabs[0];if(event.key==='End')next=tabs[tabs.length-1];if(next){event.preventDefault();selectSchedule(next);next.focus();}});});selectSchedule(tabs[0]);
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(item=>{item.classList.toggle('active',item===button);item.setAttribute('aria-pressed',String(item===button));});let count=0;document.querySelectorAll('.post').forEach(post=>{post.hidden=button.dataset.filter!=='all'&&post.dataset.category!==button.dataset.filter;if(!post.hidden)count++;});document.querySelector('#filter-status').textContent=`${button.textContent}の記事を${count}件表示しています。`;}));
document.querySelector('#visit-form')?.addEventListener('submit',event=>{event.preventDefault();const interest=document.querySelector('#interest').value,time=document.querySelector('#visit-time').value;document.querySelector('#form-result').textContent=`相談内容のサンプル：「${interest}」について、「${time}」に見学できるかを相談したいです。操作デモはここまでです。実際の予約は成立していません。入力内容の送信・保存は行っていません。`;});
const submit=document.querySelector('#demo-submit');if(submit)submit.disabled=false;
