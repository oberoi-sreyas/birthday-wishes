const stage=document.getElementById('stage');
let music=null;
let idx=0;
const musicPath='assets/music/happy-birthday.mp3';

const image = (src, alt, cls='scene-img') =>
  `<img class="${cls}" src="assets/images/${src}" alt="${alt}" loading="eager">`;

function html(content,cls=''){
  stage.innerHTML=`<section class="screen"><div class="card ${cls} reveal">${content}</div></section>`;
}

function startMusic(){
  if(!music){
    music=new Audio(musicPath);
    music.loop=true;
    music.volume=.55;
  }
  music.play().catch(()=>{});
}

function hearts(){
  for(let i=0;i<7;i++){
    const h=document.createElement('div');
    h.className='heart';
    h.textContent=['❤️','💕','✨','💗'][Math.floor(Math.random()*4)];
    h.style.left=Math.random()*100+'vw';
    h.style.bottom='-30px';
    h.style.animationDelay=Math.random()*.8+'s';
    document.body.appendChild(h);
    setTimeout(()=>h.remove(),5600);
  }
}

function confetti(){
  const box=document.getElementById('confetti');
  for(let i=0;i<90;i++){
    const c=document.createElement('i');
    c.className='conf';
    c.style.left=Math.random()*100+'vw';
    c.style.animationDelay=Math.random()*1.2+'s';
    c.style.transform=`rotate(${Math.random()*360}deg)`;
    box.appendChild(c);
    setTimeout(()=>c.remove(),4200);
  }
}

function teaser(){
  html(`
    ${image('teddy-gift.png','Cute teddy bear with a birthday gift','scene-img gift-img')}
    <div class="eyebrow">A tiny warning</div>
    <h1 class="title">Don't go to sleep too early tonight.</h1>
    <p class="subtitle">I have something stupid planned for you. 😂</p>
    <button class="btn" id="go">Okay… show me 👀</button>
    <div class="tiny">P.S. You were warned.</div>
  `);
  document.getElementById('go').onclick=openingScreen;
}

function openingScreen(){
  startMusic();
  hearts();
  html(`
    ${image('teddy-balloons.png','Cute teddy bear holding birthday balloons','scene-img opening-img')}
    <div class="eyebrow">A birthday surprise</div>
    <h1 class="title">🎂❤️ HAPPY BIRTHDAY, ANISHA! ❤️🎂</h1>
    <p class="subtitle opening-copy">${opening}</p>
    <button class="btn" id="next">Begin the 26 wishes 🇮🇳</button>
  `);
  document.getElementById('next').onclick=()=>{idx=0;showLanguage()};
}

function languageImage(){
  if(idx===25) return 'teddy-cake.png';
  if(idx%4===0) return 'teddy-heart.png';
  if(idx%4===1) return 'teddy-balloons.png';
  if(idx%4===2) return 'teddy-cake.png';
  return 'teddy-cozy.png';
}

function showLanguage(){
  const [name,native,eng]=languages[idx];
  const pct=((idx+1)/26)*100;
  html(`
    <div class="message-head">
      ${image(languageImage(),'Cute birthday teddy','message-img')}
      <div class="eyebrow">🎂 ${idx+1}/26</div>
      <h2>${name}</h2>
    </div>
    <div class="progress"><span style="width:${pct}%"></span></div>
    <div class="native">${native}</div>
    <div class="english">English: ${eng}</div>
    <div class="navrow">
      <button class="navbtn" id="prev" ${idx===0?'disabled':''}>← Previous</button>
      <span class="small">26 languages · one best friend ❤️</span>
      <button class="navbtn primary" id="next">${idx===25?'Finish 26/26 ✨':'Next →'}</button>
    </div>
  `);
  document.getElementById('prev').onclick=()=>{if(idx>0){idx--;showLanguage()}};
  document.getElementById('next').onclick=()=>{if(idx<25){idx++;showLanguage()}else dreamScreen()};
  hearts();
}

function dreamScreen(){
  html(`
    ${image('teddy-cozy.png','Cute teddy bear birthday scene','dream-img')}
    <div class="eyebrow">The little preview</div>
    <h1 class="title dream">✨🇮🇳 AND MAYBE THIS IS JUST THE BEGINNING… 🇮🇳✨</h1>
    <div class="long-copy">${dream}</div>
    <button class="btn" id="next">One last thing… ❤️</button>
  `,'dream-card');
  document.getElementById('next').onclick=closingScreen;
  hearts();
}

function closingScreen(){
  html(`
    ${image('birthday-cake.png','Cute birthday cake','final-cake-img')}
    <div class="eyebrow">And finally…</div>
    <div class="long-copy">${closing}</div>
    <button class="btn" id="wish">Make a wish ✨</button>
  `,'final');
  document.getElementById('wish').onclick=finale;
}

function finale(){
  confetti();
  hearts();
  html(`
    ${image('teddy-cake.png','Cute teddy bear with birthday cake','final-img')}
    <div class="eyebrow">The end… or maybe just the beginning</div>
    <h1 class="title">HAPPY BIRTHDAY,<br>ANISHA! ❤️</h1>
    <p class="subtitle">May this year be ridiculously happy, wonderfully chaotic, and full of dreams coming true. 🎂✨</p>
    <p class="subtitle">— Your bestest friend 🫶</p>
  `,'final');
  confetti();
}

teaser();
