let enteredCode='';
const birthdayCode='2062131';
function updateSlots(){document.querySelectorAll('#slots i').forEach((slot,i)=>slot.classList.toggle('on',i<enteredCode.length))}
function press(k){
 if(document.getElementById('oops').classList.contains('show'))return;
 if(k==='⌫')enteredCode=enteredCode.slice(0,-1);
 else if(k==='♥')enteredCode='';
 else if(enteredCode.length<7)enteredCode+=k;
 document.getElementById('err').textContent='';
 updateSlots();
 if(enteredCode.length===7)setTimeout(submitCode,250);
}
['1','2','3','4','5','6','7','8','9','⌫','0','♥'].forEach(k=>{
 const button=document.createElement('button');button.type='button';button.textContent=k;
 button.setAttribute('aria-label',k==='⌫'?'Delete':k==='♥'?'Clear':k);
 button.addEventListener('click',()=>press(k));document.getElementById('pad').appendChild(button);
});
function submitCode(){
 if(enteredCode===birthdayCode){openScrapbook();return;}
 enteredCode='';updateSlots();
 const o=document.getElementById('oops');
 document.getElementById('oopsImg').src=document.querySelector('#lock .bears').src;
 o.classList.add('show');o.setAttribute('aria-hidden','false');
}
document.getElementById('again').addEventListener('click',()=>{
 const o=document.getElementById('oops');o.classList.remove('show');o.setAttribute('aria-hidden','true');
});
document.addEventListener('keydown',e=>{
 if(document.getElementById('lock').classList.contains('gone'))return;
 if(/^[0-9]$/.test(e.key))press(e.key);
 else if(e.key==='Backspace')press('⌫');
});
function openScrapbook(){
 document.getElementById('lock').classList.add('gone');
 setTimeout(()=>{
  document.getElementById('lock').style.display='none';
  const main=document.getElementById('scrapbook');main.hidden=false;
  main.querySelectorAll('.paper').forEach(el=>el.classList.add('reveal'));
  main.scrollIntoView({behavior:'smooth'});confetti();startCountdown();setupReveal();
 },900);
}
function setupReveal(){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el))}
function startCountdown(){const target=new Date('2027-05-13T00:00:00');function tick(){let diff=target-new Date();if(diff<0)diff=0;const d=Math.floor(diff/86400000),h=Math.floor(diff/3600000)%24,m=Math.floor(diff/60000)%60,s=Math.floor(diff/1000)%60;document.getElementById('days').textContent=String(d).padStart(3,'0');document.getElementById('hours').textContent=String(h).padStart(2,'0');document.getElementById('minutes').textContent=String(m).padStart(2,'0');document.getElementById('seconds').textContent=String(s).padStart(2,'0')}tick();setInterval(tick,1000)}
function loadPhoto(e,n){const file=e.target.files[0];if(!file)return;const url=URL.createObjectURL(file);const box=document.getElementById('photo'+n);box.innerHTML='';const img=document.createElement('img');img.src=url;img.alt='Memory photo '+(n+1);box.appendChild(img)}
function revealSurprise(){document.getElementById('surpriseBox').classList.add('show');confetti();document.getElementById('surpriseBox').scrollIntoView({behavior:'smooth',block:'center'})}
function confetti(){const symbols=['♡','✿','♥','✧','🌸'];for(let i=0;i<28;i++){const el=document.createElement('div');el.className='confetti';el.textContent=symbols[Math.floor(Math.random()*symbols.length)];el.style.left=Math.random()*100+'vw';el.style.animationDelay=Math.random()*1.2+'s';el.style.color=['#bd7479','#b99b75','#9a9d7b'][i%3];document.body.appendChild(el);setTimeout(()=>el.remove(),4500)}}
function hearts(){for(let i=0;i<18;i++){const el=document.createElement('div');el.className='confetti';el.textContent='💗';el.style.left=(35+Math.random()*30)+'vw';el.style.fontSize=(18+Math.random()*18)+'px';el.style.animationDuration=(2+Math.random()*2)+'s';document.body.appendChild(el);setTimeout(()=>el.remove(),4500)}}
const grid=document.getElementById('calendarGrid');['SUN','MON','TUE','WED','THU','FRI','SAT'].forEach(d=>{const s=document.createElement('span');s.className='day';s.textContent=d;grid.appendChild(s)});for(let d=1;d<=31;d++){const s=document.createElement('span');s.textContent=d;if(d===31)s.className='birthday';grid.appendChild(s)}
