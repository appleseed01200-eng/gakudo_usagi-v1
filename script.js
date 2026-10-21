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
 tabs.forEach(item=>{item.setAttribute('aria-selected',String(item===tab));item.tabIndex=item===tab?0:-1;});
 schedulePanel.setAttribute('aria-labelledby',tab.id);const list=document.createElement('ol');
 schedules[tab.dataset.schedule].forEach(([time,title,text])=>{const li=document.createElement('li'),label=document.createElement('span'),content=document.createElement('div'),h=document.createElement('h3'),p=document.createElement('p');label.className='schedule-time';label.textContent=time;h.textContent=title;p.textContent=text;content.append(h,p);li.append(label,content);list.append(li);});schedulePanel.replaceChildren(list);
}
tabs.forEach((tab,index)=>{tab.addEventListener('click',()=>selectSchedule(tab));tab.addEventListener('keydown',event=>{let next;if(['ArrowRight','ArrowLeft'].includes(event.key))next=tabs[(index+1)%tabs.length];if(event.key==='Home')next=tabs[0];if(event.key==='End')next=tabs[tabs.length-1];if(next){event.preventDefault();selectSchedule(next);next.focus();}});});selectSchedule(tabs[0]);
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(item=>{item.classList.toggle('active',item===button);item.setAttribute('aria-pressed',String(item===button));});let count=0;document.querySelectorAll('.post').forEach(post=>{post.hidden=button.dataset.filter!=='all'&&post.dataset.category!==button.dataset.filter;if(!post.hidden)count++;});document.querySelector('#filter-status').textContent=`${button.textContent}の記事を${count}件表示しています。`;}));
const articles={
 camp:{title:'みんなと過ごす、特別な一日。',image:'official-life-01.png',alt:'既存サイトの水辺・食事・キャンプなどの組み写真',paragraphs:['水辺での活動、食事を囲む時間、火を囲むひととき。元サイトに掲載されている組み写真を使い、行事紹介の見せ方を提案しています。','実際のブログでは、活動のねらいや子どもたちが工夫したことを、短い文章と写真で伝える構成を想定しています。','本記事はレイアウト確認用です。撮影時期や行事名は未確認のため、特定の日の活動報告として掲載したものではありません。']},
 sports:{title:'思いきり走るって、気持ちいい。',image:'official-life-02.png',alt:'既存サイトの運動の活動写真',paragraphs:['走ったり、体を動かしたり。元サイトの活動写真から、子どもたちのいきいきした様子が伝わる記事の構成を考えました。','写真を大切にしながら、読む人が活動の雰囲気を知れるよう、タイトルと短い説明を添えています。','この文章は制作サンプルです。活動の日時、参加者、行事の具体的な内容は確認していません。']},
 ball:{title:'ボールひとつで、仲間がつながる。',image:'official-life-03.png',alt:'既存サイトのボールを使った活動写真',paragraphs:['ボールを追う姿や、集中した表情。元サイトにある写真を使った活動紹介のサンプルです。','運動あそびの記事では、結果だけでなく、挑戦や仲間との関わりなども紹介できる見せ方を想定しています。','本記事は架空の日付や児童の名前、発言を付け足していません。実際の活動報告にする際は、担当者に内容を確認して更新します。']}
};
const dialog=document.querySelector('#article-dialog');let trigger;
document.querySelectorAll('[data-article]').forEach(button=>button.addEventListener('click',()=>{const article=articles[button.dataset.article];trigger=button;document.querySelector('#article-title').textContent=article.title;const image=document.querySelector('#article-image');image.src='assets/'+article.image;image.alt=article.alt;document.querySelector('#article-content').replaceChildren(...article.paragraphs.map(text=>{const p=document.createElement('p');p.textContent=text;return p;}));dialog.showModal();document.body.classList.add('modal-open');}));
document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');trigger?.focus();});
document.querySelector('#visit-form').addEventListener('submit',event=>{event.preventDefault();const interest=document.querySelector('#interest').value,time=document.querySelector('#visit-time').value;document.querySelector('#form-result').textContent=`相談内容のサンプル：「${interest}」について、「${time}」に見学できるかを相談したいです。操作デモはここまでです。実際の予約は成立していません。入力内容の送信・保存は行っていません。`;});
document.querySelector('#demo-submit').disabled=false;
