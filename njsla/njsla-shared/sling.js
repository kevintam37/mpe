/* Sling Showdown: a slingshot game that sits above any practice test.
   Every correct answer earns one shot. Levels never run out (hand-made levels first, then generated ones).
   Loaded by every practice page. Call Sling.attach() once, after the page's own script has run.
   It wraps the page's home(), start() and answer function, so the quiz code itself is not changed.
   All hooks are wrapped in try/catch: if the game ever fails, the quiz keeps working. */
(function(){
'use strict';
var SW=800,SH=400,GY=360,CS=40,X0=470,AX=120,AY=268,PR=14,MAXPULL=80,GRAV=0.36;
var MODE_KEY='sling_mode',SND_KEY='sling_sound';
var MCOL=['#7a5cf0','#e8744f','#2aa876'];

/* ---------- storage ---------- */
function lsGet(k){try{return localStorage.getItem(k)}catch(e){return null}}
function lsSet(k,v){try{localStorage.setItem(k,v)}catch(e){}}
function bridgeChosen(){var v=lsGet('kids_game');return (!!window.Bridge&&v==='bridge')||(!!window.MiniGames&&MiniGames.has(v))}  /* pages that also load bridge.js / minigames.js can pick those games instead */
function modeOn(){return lsGet(MODE_KEY)!=='0'&&!bridgeChosen()}          /* default: on */
var soundOn=lsGet(SND_KEY)!=='0';

/* ---------- sound ---------- */
var AC=null;
function ac(){try{if(!AC)AC=new (window.AudioContext||window.webkitAudioContext)();if(AC.state==='suspended')AC.resume();return AC}catch(e){return null}}
function tone(f1,f2,dur,type,vol,delay){
  var c=ac();if(!c||!soundOn)return;var t=c.currentTime+(delay||0),o=c.createOscillator(),g=c.createGain();
  o.type=type||'sine';o.frequency.setValueAtTime(f1,t);o.frequency.exponentialRampToValueAtTime(Math.max(1,f2),t+dur);
  g.gain.setValueAtTime(vol||.2,t);g.gain.exponentialRampToValueAtTime(.001,t+dur);
  o.connect(g);g.connect(c.destination);o.start(t);o.stop(t+dur+.03);
}
function noise(dur,vol,fc){
  var c=ac();if(!c||!soundOn)return;var n=Math.floor(c.sampleRate*dur),b=c.createBuffer(1,n,c.sampleRate),d=b.getChannelData(0);
  for(var i=0;i<n;i++)d[i]=(Math.random()*2-1)*(1-i/n);
  var s=c.createBufferSource();s.buffer=b;var f=c.createBiquadFilter();f.type='bandpass';f.frequency.value=fc||1000;
  var g=c.createGain();g.gain.value=vol||.2;s.connect(f);f.connect(g);g.connect(c.destination);s.start();
}
var SFX={
 stretch:function(d){tone(180+d*5,220+d*5,.05,'triangle',.07)},
 shoot:function(){tone(160,720,.16,'sawtooth',.16);noise(.3,.14,1400);tone(950,260,.3,'sine',.12,.04)},
 thud:function(){tone(170,60,.1,'square',.1)},
 crack:function(){noise(.2,.28,900);tone(320,70,.16,'square',.12)},
 pop:function(){tone(420,950,.1,'sine',.22);tone(950,220,.16,'triangle',.14,.07)},
 ding:function(){tone(660,660,.12,'sine',.18);tone(990,990,.2,'sine',.18,.1)},
 level:function(){[523,659,784,1047].forEach(function(f,i){tone(f,f,.2,'triangle',.2,i*.12)})}
};
document.addEventListener('pointerdown',function(){if(modeOn())ac()},{passive:true});

/* ---------- levels ----------
   W = wood (breaks on a fast hit), S = stone (needs a harder hit, 2 hits), M = monster, . = empty.
   Rows are written top to bottom. After the hand-made levels, generated levels go on forever. */
var LV=[
 ['.M..M.','.W..W.','WWMWW.'],
 ['..M....','.WSW.M.','.WWW.S.','WWWWMSW'],
 ['...M...','..WSW..','M.WSW.M','S.SSS.S','SWSWSWS'],
 ['M.....M','S.M.M.S','S.W.W.S','SWWWWWS'],
 ['M.....M','W.M.M.W','S.S.S.S','W.W.W.W','WWWWWWW'],
 ['.M.M.M.','.S.S.S.','SSMSMSS'],
 ['......M','...MWSS','.MWWWSS','WWWWWSS'],
 ['M..M..M','S.WSW.S','S.WSW.S','SMWSWMS','SSSSSSS']];
function shuf(a){var x=a.slice();for(var i=x.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=x[i];x[i]=x[j];x[j]=t}return x}
function genLevel(n){
  var cols=7,h=[],mon=[],i,c,k=Math.min(5,3+Math.floor((n-9)/3)),maxH=Math.min(5,3+Math.floor((n-9)/4));
  for(c=0;c<cols;c++){h.push(1+Math.floor(Math.random()*maxH));mon.push(false)}
  var order=shuf([0,1,2,3,4,5,6]);for(i=0;i<k;i++)mon[order[i]]=true;
  var top=0;for(c=0;c<cols;c++)top=Math.max(top,h[c]+(mon[c]?1:0));
  var pS=Math.min(.6,.2+.03*n),rows=[],grid=[];
  for(c=0;c<cols;c++){grid.push([]);for(var r=0;r<h[c];r++)grid[c].push(Math.random()<pS?'S':'W')}
  for(var r2=top-1;r2>=0;r2--){var row='';for(c=0;c<cols;c++)row+=r2<h[c]?grid[c][r2]:(r2===h[c]&&mon[c]?'M':'.');rows.push(row)}
  return rows;
}
function levelTemplate(n){return n<=LV.length?LV[n-1]:genLevel(n)}

/* ---------- game state ---------- */
var S=null,HOST=null;
function stopArena(){
  if(S){S.stop=true;if(S.raf)cancelAnimationFrame(S.raf);if(S.timer)clearTimeout(S.timer);S=null}
  if(HOST&&HOST.parentNode)HOST.parentNode.removeChild(HOST);
  HOST=null;
}
function css(){
  if(document.getElementById('sling-css'))return;
  var st=document.createElement('style');st.id='sling-css';
  st.textContent=
   '.sling-card{display:flex;align-items:center;gap:12px;padding:12px 14px;border:2px solid var(--line,#ddd);border-radius:14px;background:var(--card,#fff);color:var(--ink,#222);margin:0 0 12px}'+
   '.sling-card .sc-t{flex:1;min-width:0}.sling-card b{display:block;font-size:16px;line-height:1.3}'+
   '.sling-card small{display:block;opacity:.7;font-size:13px;line-height:1.35;margin-top:2px}'+
   '.sling-card button{font:inherit;font-weight:800;font-size:14px;cursor:pointer;border-radius:999px;padding:8px 16px;border:2px solid var(--indigo,#2B3A67);background:transparent;color:var(--indigo,#2B3A67);white-space:nowrap}'+
   '.sling-card button[aria-pressed=true]{background:var(--indigo,#2B3A67);color:var(--bg,#fff)}'+
   '.sling-host{margin:12px 0}'+
   '.sling-bar{display:flex;flex-wrap:wrap;gap:6px;margin:0 0 8px}'+
   '.sling-pill{font:inherit;color:var(--ink,#222);font-weight:800;font-size:13px;background:var(--card,#fff);border:2px solid var(--line,#ddd);border-radius:99px;padding:3px 11px;white-space:nowrap}'+
   'button.sling-pill{cursor:pointer}'+
   '.sling-arena{border:2px solid var(--line,#ddd);border-radius:16px;overflow:hidden}'+
   '.sling-arena canvas{display:block;width:100%;height:auto;aspect-ratio:2/1;touch-action:none;cursor:grab}'+
   '.sling-hint{margin:8px 2px 0;font-size:14px;font-weight:700;color:var(--indigo,#2B3A67)}'+
   '.sling-hint.flash{color:var(--teal,#2A9D8F)}';
  document.head.appendChild(st);
}
function isDark(){try{return window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches}catch(e){return false}}

function buildArena(){
  var st=document.getElementById('st');if(!st||!st.parentNode)return;
  css();
  HOST=document.createElement('div');HOST.className='sling-host';HOST.id='sling-host';
  HOST.innerHTML=
   '<div class="sling-bar"><span class="sling-pill" id="sl-shots"></span><span class="sling-pill" id="sl-lvl"></span><span class="sling-pill" id="sl-mon"></span><span class="sling-pill" id="sl-def"></span><button class="sling-pill" id="sl-snd" aria-pressed="true"></button></div>'+
   '<div class="sling-arena"><canvas id="sl-cv" aria-label="Sling game. Pull back the sling and release to launch."></canvas></div>'+
   '<p class="sling-hint" id="sl-hint"></p>';
  st.parentNode.insertBefore(HOST,st);
  var cv=document.getElementById('sl-cv'),dpr=Math.min(2,window.devicePixelRatio||1);
  cv.width=SW*dpr;cv.height=SH*dpr;
  S={cv:cv,ctx:cv.getContext('2d'),dpr:dpr,objs:[],level:1,ammo:0,proj:null,drag:null,fx:[],defeated:0,cleared:0,last:0,acc:0,stop:false,clearing:false,raf:0,f:0,sf:{},timer:0};
  cv.addEventListener('pointerdown',pdown);cv.addEventListener('pointermove',pmove);
  cv.addEventListener('pointerup',pup);cv.addEventListener('pointercancel',pup);
  var sb=document.getElementById('sl-snd');
  function sbl(){sb.textContent='Sound: '+(soundOn?'On':'Off');sb.setAttribute('aria-pressed',soundOn?'true':'false')}
  sb.onclick=function(){soundOn=!soundOn;lsSet(SND_KEY,soundOn?'1':'0');sbl();if(soundOn)SFX.ding()};
  sbl();
  loadLevel();slingUI();S.raf=requestAnimationFrame(loop);
}
function loadLevel(){
  var t=levelTemplate(S.level);S.objs=[];
  t.forEach(function(row,i){var r=t.length-1-i;row.split('').forEach(function(ch,c){
    if(ch==='.')return;
    S.objs.push({t:ch,c:c,r:r,hp:ch==='S'?2:1,k:(S.level-1)%3,y:GY-(r+1)*CS});
  })});
  settle(false);
}
function monsLeft(){return S.objs.filter(function(o){return o.t==='M'}).length}
function setHint(t,flash){var e=document.getElementById('sl-hint');if(!e)return;e.textContent=t;e.className='sling-hint'+(flash?' flash':'')}
function slingUI(){
  if(!S)return;
  var a=function(id,t){var e=document.getElementById(id);if(e)e.textContent=t};
  a('sl-shots','Shots: '+S.ammo);a('sl-lvl','Level '+S.level);a('sl-mon','Monsters: '+monsLeft());a('sl-def','Knocked out: '+S.defeated);
  if(!S.flashing)setHint(S.proj?'':S.ammo>0?'Ready! Touch the critter, pull back, and let go.':'No shots yet. Answer a question right to earn one.');
}
function award(){
  if(!S)return;
  S.ammo++;SFX.ding();S.flashing=true;setHint('+1 shot! Pull back the critter and let go.',true);
  slingUI();
  setTimeout(function(){if(S){S.flashing=false;slingUI()}},2200);
}

/* ---------- input ---------- */
function pos(e){var r=S.cv.getBoundingClientRect();return{x:(e.clientX-r.left)*SW/r.width,y:(e.clientY-r.top)*SH/r.height}}
function pdown(e){
  if(!S||S.proj||S.ammo<=0)return;var p=pos(e);
  if(Math.hypot(p.x-AX,p.y-AY)<70){S.drag={x:p.x,y:p.y};try{S.cv.setPointerCapture(e.pointerId)}catch(x){}pmove(e);e.preventDefault()}
}
function pmove(e){
  if(!S||!S.drag)return;var p=pos(e),dx=p.x-AX,dy=p.y-AY,d=Math.hypot(dx,dy);
  if(d>MAXPULL){dx*=MAXPULL/d;dy*=MAXPULL/d}
  S.drag={x:AX+dx,y:AY+dy};
  var pl=Math.hypot(dx,dy);if(Math.abs(pl-(S.lastPull||0))>7){S.lastPull=pl;SFX.stretch(pl)}
}
function pup(){
  if(!S||!S.drag)return;var d=S.drag;S.drag=null;S.lastPull=0;
  if(Math.hypot(AX-d.x,AY-d.y)>=14)launch((AX-d.x)*.2,(AY-d.y)*.2);
}
function launch(vx,vy){
  if(!S||S.proj||S.ammo<=0)return;
  SFX.shoot();S.ammo--;S.proj={x:AX,y:AY,vx:vx,vy:vy,t:0,gr:0,trail:[]};slingUI();
}

/* ---------- physics ---------- */
function sfxRate(name,gap){if(!S)return false;if(S.f-(S.sf[name]||-99)<gap)return false;S.sf[name]=S.f;return true}
function puff(x,y,col){for(var i=0;i<10;i++){var a=Math.random()*6.28,sp=1+Math.random()*3;S.fx.push({x:x,y:y,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp-1,life:24+Math.random()*10,c:col})}}
function killObj(o,col){S.objs=S.objs.filter(function(x){return x!==o});puff(X0+o.c*CS+CS/2,o.y+CS/2,col)}
function killMon(o){SFX.pop();killObj(o,MCOL[o.k]);S.defeated++;slingUI();checkClear()}
function settle(kill){
  var cols={},again=false;
  S.objs.forEach(function(o){(cols[o.c]=cols[o.c]||[]).push(o)});
  Object.keys(cols).forEach(function(c){
    cols[c].sort(function(a,b){return a.r-b.r}).forEach(function(o,i){
      var fall=o.r-i;o.r=i;
      if(kill&&fall>=2&&o.t==='M'){killMon(o);again=true}
    });
  });
  if(again)settle(false);
}
function checkClear(){
  if(monsLeft()>0||S.clearing)return;
  S.clearing=true;S.cleared++;
  S.timer=setTimeout(function(){
    if(!S)return;S.clearing=false;S.level++;
    SFX.level();loadLevel();slingUI();
    S.flashing=true;setHint('Level '+S.level+'! New monsters.',true);
    setTimeout(function(){if(S){S.flashing=false;slingUI()}},2200);
  },1100);
}
function tick(){
  S.f++;
  S.objs.forEach(function(o){var ty=GY-(o.r+1)*CS;o.y+=(ty-o.y)*.3;if(Math.abs(ty-o.y)<.5)o.y=ty});
  S.fx.forEach(function(f){f.x+=f.vx;f.y+=f.vy;f.vy+=.2;f.life--});S.fx=S.fx.filter(function(f){return f.life>0});
  var p=S.proj;if(!p)return;
  p.t++;p.vy+=GRAV;p.x+=p.vx;p.y+=p.vy;
  if(p.t%2===0){p.trail.push({x:p.x,y:p.y});if(p.trail.length>14)p.trail.shift()}
  if(p.y+PR>GY){p.y=GY-PR;if(p.vy>2&&sfxRate('thud',8))SFX.thud();if(p.vy>0)p.vy=-p.vy*.35;p.vx*=.85;p.gr++}
  var dirty=false;
  S.objs.slice().forEach(function(o){
    if(S.objs.indexOf(o)<0)return;
    var x=X0+o.c*CS,y=GY-(o.r+1)*CS,cx=Math.max(x,Math.min(p.x,x+CS)),cy=Math.max(y,Math.min(p.y,y+CS));
    var dx=p.x-cx,dy=p.y-cy,d2=dx*dx+dy*dy;if(d2>=PR*PR)return;
    var sp=Math.hypot(p.vx,p.vy);
    if(o.t==='M'){killMon(o);dirty=true;p.vx*=.85;p.vy*=.85;return}
    if((o.t==='W'&&sp>=4)||(o.t==='S'&&sp>=6)){
      o.hp--;
      if(o.hp<=0){SFX.crack();killObj(o,o.t==='W'?'#c98a4b':'#98a0b4');dirty=true;p.vx*=.7;p.vy*=.7;return}
      puff(cx,cy,'#98a0b4');if(sfxRate('thud',8))SFX.thud();
    }
    var d=Math.sqrt(d2)||.001,nx=dx/d,ny=dy/d;
    p.x+=nx*(PR-d);p.y+=ny*(PR-d);
    var vn=p.vx*nx+p.vy*ny;if(vn<0){p.vx-=1.3*vn*nx;p.vy-=1.3*vn*ny}
  });
  if(dirty&&S)settle(true);
  if(!S)return;
  var sp2=Math.hypot(p.vx,p.vy);
  if(p.x>SW+40||p.x<-40||p.t>480||(p.gr>25&&sp2<.8)){S.proj=null;slingUI()}
}
function loop(t){
  if(!S||S.stop||!document.body.contains(S.cv))return;
  var dt=Math.min(50,t-(S.last||t));S.last=t;S.acc+=dt;
  while(S.acc>=16.67&&S){S.acc-=16.67;tick()}
  if(S){draw();S.raf=requestAnimationFrame(loop)}
}

/* ---------- drawing (all characters are original) ---------- */
function zippy(c,x,y,r){
  c.fillStyle='#19b5a5';c.beginPath();c.arc(x,y,r,0,6.283);c.fill();
  c.fillStyle='#7fe3d6';c.beginPath();c.arc(x,y+r*.35,r*.6,0,3.14);c.fill();
  c.strokeStyle='#0e7f74';c.lineWidth=2;c.lineCap='round';
  for(var i=-1;i<=1;i++){c.beginPath();c.moveTo(x+i*4,y-r+1);c.lineTo(x+i*6,y-r-6);c.stroke()}
  c.fillStyle='#fff';c.beginPath();c.arc(x-5,y-3,4.5,0,6.283);c.arc(x+5,y-3,4.5,0,6.283);c.fill();
  c.fillStyle='#12303b';c.beginPath();c.arc(x-4,y-3,2,0,6.283);c.arc(x+6,y-3,2,0,6.283);c.fill();
  c.beginPath();c.strokeStyle='#12303b';c.lineWidth=1.6;c.arc(x,y+3,5,.15,2.99);c.stroke();
}
function drawMon(c,o){
  var x=X0+o.c*CS,y=o.y,col=MCOL[o.k];
  c.fillStyle=col;c.beginPath();c.moveTo(x+4,y+CS-2);c.quadraticCurveTo(x-2,y+6,x+CS/2,y+3);c.quadraticCurveTo(x+CS+2,y+6,x+CS-4,y+CS-2);c.closePath();c.fill();
  c.beginPath();c.moveTo(x+8,y+8);c.lineTo(x+6,y-1);c.lineTo(x+14,y+5);c.moveTo(x+CS-8,y+8);c.lineTo(x+CS-6,y-1);c.lineTo(x+CS-14,y+5);c.fill();
  c.fillStyle='#fff';
  if(o.k===1){c.beginPath();c.arc(x+CS/2,y+17,8,0,6.283);c.fill();c.fillStyle='#2a1530';c.beginPath();c.arc(x+CS/2+1,y+18,3.5,0,6.283);c.fill()}
  else{c.beginPath();c.arc(x+13,y+17,6,0,6.283);c.arc(x+27,y+17,6,0,6.283);c.fill();c.fillStyle='#2a1530';c.beginPath();c.arc(x+14,y+18,2.6,0,6.283);c.arc(x+28,y+18,2.6,0,6.283);c.fill()}
  c.strokeStyle='#2a1530';c.lineWidth=2;c.beginPath();c.moveTo(x+12,y+30);c.quadraticCurveTo(x+CS/2,y+36,x+CS-12,y+30);c.stroke();
}
function draw(){
  var c=S.ctx;c.setTransform(S.dpr,0,0,S.dpr,0,0);
  c.fillStyle=isDark()?'#2a3150':'#e3ebfd';c.fillRect(0,0,SW,SH);
  c.fillStyle='#7b5a3c';c.fillRect(0,GY,SW,SH-GY);c.fillStyle='#5a9b5f';c.fillRect(0,GY,SW,8);
  S.objs.forEach(function(o){
    if(o.t==='M')return drawMon(c,o);
    var x=X0+o.c*CS,y=o.y;
    c.fillStyle=o.t==='W'?'#c98a4b':'#98a0b4';c.fillRect(x+1,y+1,CS-2,CS-2);
    c.strokeStyle=o.t==='W'?'#7a4f23':'#5d6578';c.lineWidth=2;c.strokeRect(x+1,y+1,CS-2,CS-2);
    c.beginPath();if(o.t==='W'){c.moveTo(x+4,y+CS/2);c.lineTo(x+CS-4,y+CS/2)}else if(o.hp===1){c.moveTo(x+8,y+6);c.lineTo(x+18,y+20);c.lineTo(x+14,y+32)}c.stroke();
  });
  c.strokeStyle='#6b4423';c.lineCap='round';c.lineWidth=9;
  c.beginPath();c.moveTo(AX,GY);c.lineTo(AX,AY+34);c.stroke();
  c.lineWidth=7;c.beginPath();c.moveTo(AX,AY+34);c.lineTo(AX-14,AY+6);c.moveTo(AX,AY+34);c.lineTo(AX+14,AY+6);c.stroke();
  for(var i=0;i<Math.min(S.ammo-(S.proj||S.drag?0:1),5);i++)zippy(c,AX-40-i*30,GY-PR,PR-2);
  var bx=AX,by=AY,show=S.ammo>0&&!S.proj;
  if(S.drag){bx=S.drag.x;by=S.drag.y}
  if(show||S.drag){
    c.strokeStyle='#3b2412';c.lineWidth=4;c.beginPath();c.moveTo(AX-14,AY+6);c.lineTo(bx,by);c.lineTo(AX+14,AY+6);c.stroke();
    if(S.drag){
      var vx=(AX-bx)*.2,vy=(AY-by)*.2,px=bx,py=by;
      for(var k=1;k<=36;k++){vy+=GRAV;px+=vx;py+=vy;if(py>GY)break;if(k%3===0){c.fillStyle='rgba(255,255,255,'+(.9-k*.02)+')';c.strokeStyle='#12303b';c.lineWidth=1;c.beginPath();c.arc(px,py,3,0,6.283);c.fill();c.stroke()}}
    }
    zippy(c,bx,by,PR);
  }
  if(S.proj){
    S.proj.trail.forEach(function(t,i){c.fillStyle='rgba(25,181,165,'+(i/S.proj.trail.length*.35)+')';c.beginPath();c.arc(t.x,t.y,4,0,6.283);c.fill()});
    zippy(c,S.proj.x,S.proj.y,PR);
  }
  S.fx.forEach(function(f){c.globalAlpha=Math.max(0,f.life/30);c.fillStyle=f.c;c.beginPath();c.arc(f.x,f.y,4,0,6.283);c.fill()});c.globalAlpha=1;
}

/* ---------- page integration ---------- */
function safe(fn){try{return fn()}catch(e){try{console.error('Sling Showdown:',e)}catch(x){}}}
function homeCard(){
  var st=document.getElementById('st');if(!st)return;
  css();
  var old=document.getElementById('sling-card');if(old&&old.parentNode)old.parentNode.removeChild(old);
  var on=modeOn(),d=document.createElement('div');d.className='sling-card';d.id='sling-card';
  if(window.Bridge||window.MiniGames){
    var v=lsGet('kids_game'),g=lsGet(MODE_KEY)==='0'?'off':bridgeChosen()?v:'sling';
    var opts=[['sling','Sling Showdown','Sling Showdown: every right answer earns a shot. Knock out the monsters. The levels never run out.']];
    if(window.Bridge)opts.push(['bridge','Bridge Engineer','Bridge Engineer: every right answer earns truck trips. Design a real bridge, then a heavy truck tests it. Build it right to move on. The levels never run out.']);
    if(window.MiniGames)MiniGames.list.forEach(function(m){opts.push([m.id,m.name,m.name+': '+m.desc+' Every right answer helps you play.'])});
    opts.push(['off','No game','No game. Just the practice questions.']);
    var cur=opts.filter(function(o){return o[0]===g})[0]||opts[0];
    d.innerHTML='<div class="sc-t"><b>Practice game</b><small id="sling-desc">'+cur[2]+'</small></div><select id="sling-sel" aria-label="Choose a practice game" style="font:inherit;font-weight:800;font-size:14px;border-radius:999px;padding:7px 12px;border:2px solid var(--indigo,#2B3A67);background:var(--card,#fff);color:var(--indigo,#2B3A67);max-width:48%">'+
      opts.map(function(o){return '<option value="'+o[0]+'"'+(o[0]===cur[0]?' selected':'')+'>'+o[1]+'</option>'}).join('')+'</select>';
    st.insertBefore(d,st.firstChild);
    document.getElementById('sling-sel').onchange=function(){
      var val=this.value;
      lsSet(MODE_KEY,val==='off'?'0':'1');lsSet('kids_game',val==='off'?(lsGet('kids_game')||'sling'):val);homeCard();
    };
    return;
  }
  d.innerHTML='<div class="sc-t"><b>🎯 Sling Showdown</b><small>Every right answer earns a shot. Knock out the monsters. The levels never run out, so you can keep playing until every question is done.</small></div><button id="sling-toggle" aria-pressed="'+on+'">'+(on?'Game: On':'Game: Off')+'</button>';
  st.insertBefore(d,st.firstChild);
  document.getElementById('sling-toggle').onclick=function(){lsSet(MODE_KEY,modeOn()?'0':'1');homeCard()};
}
function wrap(name,fn){
  var orig=window[name];
  if(typeof orig!=='function'||orig.__sling)return false;
  var w=function(){return fn.call(this,orig,arguments)};
  w.__sling=true;window[name]=w;return true;
}
function attach(opts){
  opts=opts||{};
  var ansName=opts.answer||(typeof window.next==='function'?'next':'record');
  wrap('home',function(orig,args){
    safe(stopArena);
    var r=orig.apply(this,args);
    safe(homeCard);
    return r;
  });
  wrap('start',function(orig,args){
    safe(stopArena);
    var r=orig.apply(this,args);
    if(modeOn())safe(buildArena);
    return r;
  });
  /* After a new question is drawn, bring the arena back into view (the kids' pages already do this themselves). */
  function toTop(){if(S)safe(function(){window.scrollTo(0,0)})}
  wrap(ansName,function(orig,args){
    var r=orig.apply(this,args);
    if(args[0]&&S)safe(award);
    if(ansName==='next')toTop();
    return r;
  });
  if(ansName!=='next')wrap('advance',function(orig,args){var r=orig.apply(this,args);toTop();return r});
  /* The page already drew its home screen before this ran, so draw it again with the game card. */
  if(typeof window.home==='function')window.home();
}
window.Sling={attach:attach,isOn:modeOn,_state:function(){return S},_award:award,
  _level:levelTemplate,_tick:function(){if(S&&!S.stop)tick()}};
})();
