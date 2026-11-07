/* Arcade games for the practice pages: Balloon Pop, Star Catcher, Free Throw, Memory Match, Coin Stacker, Gem Swap, Mystery Egg.
   Every right answer earns a token. Tokens are spent inside the games (a round, a shot, a few moves, an egg).
   MiniGames.mount(container,{game,select}) builds the arena; MiniGames.attach() hooks a quiz page (home/start/answer).
   Everything is wrapped so that if a game fails, the quiz keeps working. All characters and art are original. */
(function(root){
'use strict';
var W=800,H=400,FRAME=1000/60;
var K_GAME='kids_game',K_OFF='sling_mode',K_SND='sling_sound';
function lsGet(k){try{return localStorage.getItem(k)}catch(e){return null}}
function lsSet(k,v){try{localStorage.setItem(k,v)}catch(e){}}
var soundOn=lsGet(K_SND)!=='0';
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
 pop:function(){tone(420,950,.1,'sine',.2);noise(.08,.12,2000)},
 ding:function(){tone(660,660,.12,'sine',.18);tone(990,990,.2,'sine',.18,.1)},
 thud:function(){tone(170,60,.1,'square',.1)},
 coin:function(){tone(988,1318,.08,'square',.1);tone(1318,1318,.14,'square',.1,.07)},
 win:function(){[523,659,784,1047].forEach(function(f,i){tone(f,f,.2,'triangle',.2,i*.12)})},
 lose:function(){tone(330,150,.35,'sawtooth',.12)},
 flip:function(){tone(500,700,.05,'triangle',.1)},
 match:function(){tone(660,990,.12,'sine',.18);tone(880,1320,.14,'sine',.16,.09)},
 swish:function(){noise(.25,.16,3000);tone(800,1200,.2,'sine',.08)},
 bonk:function(){tone(220,90,.12,'square',.14)},
 swap:function(){tone(400,560,.07,'triangle',.1)},
 crack:function(){noise(.18,.25,900);tone(320,70,.14,'square',.1)}
};
document.addEventListener('pointerdown',function(){ac()},{passive:true});
/* ---------- helpers ---------- */
function rnd(a,b){return a+Math.random()*(b-a)}
function ri(a,b){return Math.floor(rnd(a,b+1))}
function clamp(v,a,b){return v<a?a:v>b?b:v}
function rr(c,x,y,w,h,r){c.beginPath();c.moveTo(x+r,y);c.arcTo(x+w,y,x+w,y+h,r);c.arcTo(x+w,y+h,x,y+h,r);c.arcTo(x,y+h,x,y,r);c.arcTo(x,y,x+w,y,r);c.closePath()}
function txt(c,s,x,y,size,col,al,stroke){
  c.font='800 '+size+'px Fredoka, Nunito, system-ui, sans-serif';c.textAlign=al||'center';c.textBaseline='middle';
  if(stroke){c.lineWidth=size/5;c.strokeStyle=stroke;c.lineJoin='round';c.strokeText(s,x,y)}
  c.fillStyle=col;c.fillText(s,x,y);
}
function burst(fx,x,y,col,n,sp){for(var i=0;i<(n||10);i++){var a=Math.random()*6.283,s=(sp||3)*(.4+Math.random());fx.push({x:x,y:y,vx:Math.cos(a)*s,vy:Math.sin(a)*s-1,life:22+Math.random()*14,c:col})}}
function fxStep(fx){for(var i=fx.length-1;i>=0;i--){var p=fx[i];p.x+=p.vx;p.y+=p.vy;p.vy+=.18;p.life--;if(p.life<=0)fx.splice(i,1)}}
function fxDraw(c,fx){fx.forEach(function(p){c.globalAlpha=clamp(p.life/24,0,1);c.fillStyle=p.c;c.fillRect(p.x-3,p.y-3,6,6)});c.globalAlpha=1}
function sky(c,top,bot){var g=c.createLinearGradient(0,0,0,H);g.addColorStop(0,top);g.addColorStop(1,bot);c.fillStyle=g;c.fillRect(0,0,W,H)}
function hud(c,left,right){txt(c,left,16,22,22,'#fff','left','#18223d');if(right)txt(c,right,W-16,22,22,'#fff','right','#18223d')}
function centerMsg(c,l1,l2){
  c.fillStyle='rgba(24,34,61,.55)';c.fillRect(0,0,W,H);
  txt(c,l1,W/2,H/2-14,38,'#fff','center','#18223d');if(l2)txt(c,l2,W/2,H/2+30,22,'#ffe9a8','center','#18223d');
}
var G={};
/* ========================== 1. Balloon Pop ========================== */
G.balloon={id:'balloon',name:'Balloon Pop',desc:'Pop as many balloons as you can in 20 seconds.',unit:'Rounds',per:1,round:true,
 earn:function(ok){return ok?1:0},
 create:function(api){
  var st='idle',t=0,score=0,bs=[],fx=[],spawn=0,last=0;
  var COL=['#ee6a4d','#f5b400','#17a698','#7a5cf0','#2f5bea','#e0529c'];
  function start(){st='run';t=0;score=0;bs=[];fx=[];spawn=0;api.hint('Tap the balloons. Gold ones are worth 3!')}
  function end(){st='done';last=score;api.roundEnd(score,'You popped '+score+' points!')}
  function update(){
    fxStep(fx);
    if(st!=='run')return;
    t++;spawn--;
    if(spawn<=0){
      var gold=Math.random()<.08;
      bs.push({x:rnd(50,W-50),y:H+40,r:gold?24:rnd(28,36),vy:rnd(1.2,2)+t/1200*1.4,c:gold?'#ffd23f':COL[ri(0,5)],gold:gold,ph:rnd(0,6),pts:gold?3:1});
      spawn=Math.max(9,32-t/50);
    }
    for(var i=bs.length-1;i>=0;i--){var b=bs[i];b.y-=b.vy;b.x+=Math.sin(t/25+b.ph)*.6;if(b.y<-70)bs.splice(i,1)}
    if(t>=1200)end();
  }
  function down(x,y){
    if(st!=='run')return;
    for(var i=bs.length-1;i>=0;i--){var b=bs[i];
      if(Math.hypot(x-b.x,(y-b.y)*.85)<b.r+12){score+=b.pts;burst(fx,b.x,b.y,b.c,b.gold?18:10,4);bs.splice(i,1);SFX.pop();return}}
  }
  function draw(c){
    sky(c,'#bfe0ff','#eaf5ff');
    c.fillStyle='rgba(255,255,255,.9)';[[130,320],[420,350],[660,330]].forEach(function(p){c.beginPath();c.arc(p[0],p[1],26,0,6.283);c.arc(p[0]+30,p[1]-10,32,0,6.283);c.arc(p[0]+62,p[1],24,0,6.283);c.fill()});
    bs.forEach(function(b){
      c.strokeStyle='#4a5678';c.lineWidth=2;c.beginPath();c.moveTo(b.x,b.y+b.r*1.15);c.quadraticCurveTo(b.x+Math.sin(t/12+b.ph)*8,b.y+b.r*1.9,b.x,b.y+b.r*2.6);c.stroke();
      c.fillStyle=b.c;c.beginPath();c.ellipse(b.x,b.y,b.r*.82,b.r*1.05,0,0,6.283);c.fill();
      c.fillStyle='rgba(255,255,255,.55)';c.beginPath();c.ellipse(b.x-b.r*.3,b.y-b.r*.35,b.r*.16,b.r*.3,.4,0,6.283);c.fill();
      if(b.gold)txt(c,'x3',b.x,b.y,16,'#7a4f00');
    });
    fxDraw(c,fx);
    if(st==='run'){hud(c,'Score '+score,Math.ceil((1200-t)/60)+'s');c.fillStyle='rgba(24,34,61,.25)';c.fillRect(0,H-8,W,8);c.fillStyle='#f5b400';c.fillRect(0,H-8,W*(1-t/1200),8)}
    else if(st==='done')centerMsg(c,'Popped '+last+'!','Press Play for another round');
    else centerMsg(c,'Balloon Pop','Press Play. Answer right to earn rounds.');
  }
  return{update:update,draw:draw,start:start,down:down,score:function(){return score},_s:function(){return{st:st,bs:bs,score:score}}};
 }};
/* ========================== 2. Star Catcher ========================== */
G.star={id:'star',name:'Star Catcher',desc:'Slide the basket to catch stars. Dodge the rocks!',unit:'Rounds',per:1,round:true,
 earn:function(ok){return ok?1:0},
 create:function(api){
  var st='idle',t=0,score=0,lives=3,bx=W/2,tx=W/2,items=[],fx=[],spawn=0,shake=0,last=0;
  function start(){st='run';t=0;score=0;lives=3;items=[];fx=[];spawn=20;bx=tx=W/2;api.hint('Drag left and right to move the basket.')}
  function end(why){st='done';last=score;api.roundEnd(score,why+' You caught '+score+' stars!')}
  function update(){
    fxStep(fx);if(shake>0)shake--;
    if(st!=='run')return;
    t++;bx+=(tx-bx)*.25;spawn--;
    if(spawn<=0){var rock=Math.random()<Math.min(.4,.15+t/6000);items.push({x:rnd(40,W-40),y:-30,vy:rnd(2.4,3.4)+t/1800*2.2,rock:rock,rot:rnd(0,6)});spawn=Math.max(16,40-t/45)}
    for(var i=items.length-1;i>=0;i--){var it=items[i];it.y+=it.vy;it.rot+=.07;
      if(it.y>H-70&&it.y<H-32&&Math.abs(it.x-bx)<56){
        if(it.rock){lives--;shake=14;burst(fx,it.x,it.y,'#8c97b8',12,4);SFX.bonk()}
        else{score++;burst(fx,it.x,it.y,'#ffd23f',10,3);SFX.coin()}
        items.splice(i,1);continue}
      if(it.y>H+40)items.splice(i,1)}
    if(lives<=0)end('Out of lives!');else if(t>=1800)end('Time!');
  }
  function move(x){if(st==='run')tx=clamp(x,50,W-50)}
  function star(c,x,y,r,rot){c.beginPath();for(var i=0;i<10;i++){var a=rot+i*Math.PI/5-Math.PI/2,rad=i%2?r*.45:r;c.lineTo(x+Math.cos(a)*rad,y+Math.sin(a)*rad)}c.closePath()}
  function draw(c){
    sky(c,'#14214f','#3b4f95');
    c.fillStyle='rgba(255,255,255,.7)';for(var i=0;i<28;i++)c.fillRect((i*97)%W,(i*53+t*.2)%H,2,2);
    c.save();if(shake>0)c.translate(rnd(-4,4),rnd(-3,3));
    items.forEach(function(it){
      if(it.rock){c.fillStyle='#8c97b8';c.strokeStyle='#3d4663';c.lineWidth=3;c.beginPath();for(var k=0;k<7;k++){var a=it.rot+k*.9,r=20+(k%2)*6;c.lineTo(it.x+Math.cos(a)*r,it.y+Math.sin(a)*r)}c.closePath();c.fill();c.stroke()}
      else{c.fillStyle='#ffd23f';c.strokeStyle='#fff3c4';c.lineWidth=3;star(c,it.x,it.y,24,it.rot*.4);c.fill();c.stroke()}
    });
    c.fillStyle='#ee6a4d';c.strokeStyle='#fff';c.lineWidth=4;c.lineJoin='round';
    c.beginPath();c.moveTo(bx-54,H-62);c.lineTo(bx+54,H-62);c.lineTo(bx+40,H-22);c.lineTo(bx-40,H-22);c.closePath();c.fill();c.stroke();
    c.fillStyle='#fff';c.fillRect(bx-56,H-66,112,8);
    c.restore();
    fxDraw(c,fx);
    if(st==='run'){hud(c,'Stars '+score,Math.ceil((1800-t)/60)+'s');for(var h=0;h<3;h++)txt(c,'\u2665',W/2-30+h*30,22,26,h<lives?'#ff6b6b':'rgba(255,255,255,.3)','center','#18223d')}
    else if(st==='done')centerMsg(c,'Caught '+last+' stars!','Press Play for another round');
    else centerMsg(c,'Star Catcher','Press Play. Answer right to earn rounds.');
  }
  return{update:update,draw:draw,start:start,down:function(x){move(x)},move:function(x){move(x)},score:function(){return score},_s:function(){return{st:st,items:items,score:score,lives:lives,bx:bx}}};
 }};
/* ========================== 3. Free Throw ========================== */
G.throw={id:'throw',name:'Free Throw',desc:'Pull back the ball and let go to shoot hoops.',unit:'Shots',per:3,round:false,
 earn:function(ok){return ok?1:0},
 create:function(api){
  var AX=130,AY=290,R=15,GR=.34,MAXP=110,K=.17;
  var ball=null,drag=null,hoop={x:560,y:170},score=0,made=0,streak=0,fx=[],msg='',msgT=0,done=false,touched=false,t=0;
  function newHoop(){hoop.x=ri(500,640);hoop.y=ri(150,210)}
  function update(){
    t++;fxStep(fx);if(msgT>0)msgT--;
    if(!ball)return;
    var b=ball,py=b.y;
    b.vy+=GR;b.x+=b.vx;b.y+=b.vy;b.t++;
    var rx=hoop.x+64,rl=hoop.x;
    // backboard
    if(b.x+R>rx+4&&b.x-R<rx+14&&b.y>hoop.y-86&&b.y<hoop.y+12&&b.vx>0){b.x=rx+4-R;b.vx*=-.55;touched=true;SFX.bonk()}
    // rim posts
    [[rl,hoop.y],[rx,hoop.y]].forEach(function(p){
      var dx=b.x-p[0],dy=b.y-p[1],d=Math.hypot(dx,dy);
      if(d<R+5&&d>0){var nx=dx/d,ny=dy/d,dot=b.vx*nx+b.vy*ny;if(dot<0){b.vx-=1.6*dot*nx;b.vy-=1.6*dot*ny;b.vx*=.7;b.vy*=.7;touched=true;SFX.bonk()}b.x=p[0]+nx*(R+5);b.y=p[1]+ny*(R+5)}});
    // scoring: crossing the rim line downward between the posts
    if(!b.scored&&py<hoop.y&&b.y>=hoop.y&&b.vy>0&&b.x>rl+6&&b.x<rx-6){
      b.scored=true;made++;streak++;var pts=touched?1:2;score+=pts+(streak>=3?1:0);api.setBest(score);
      msg=(touched?'Basket! ':'Swish! ')+'+'+(pts+(streak>=3?1:0));msgT=70;SFX.swish();burst(fx,b.x,hoop.y,'#ffd23f',16,4);
      b.net=14;
    }
    if(b.y>H-R-8&&b.vy>0){b.y=H-R-8;b.vy*=-.5;b.vx*=.8;if(Math.abs(b.vy)>1.5)SFX.thud()}
    if(b.net>0)b.net--;
    if(b.x>W+60||b.x<-60||b.t>330||(b.y>=H-R-9&&Math.abs(b.vy)<.8&&Math.abs(b.vx)<.4&&b.t>40)){
      if(!b.scored){streak=0}
      else newHoop();
      ball=null;touched=false;
      api.refresh();
    }
  }
  function traj(x,y){
    var vx=(AX-x)*K,vy=(AY-y)*K,pts=[],px=AX,py=AY;
    for(var i=0;i<46;i++){vy+=GR;px+=vx;py+=vy;if(i%3===0)pts.push([px,py])}
    return pts;
  }
  function pullPt(x,y){var dx=x-AX,dy=y-AY,d=Math.hypot(dx,dy);if(d>MAXP){dx*=MAXP/d;dy*=MAXP/d}return{x:AX+dx,y:AY+dy}}
  function down(x,y){
    if(ball||done)return;
    if(Math.hypot(x-AX,y-AY)>70)return;
    if(api.units()<=0){api.hint('No shots yet. Answer a question right to earn 3 shots.');return}
    drag=pullPt(x,y);
  }
  function move(x,y){if(drag)drag=pullPt(x,y)}
  function up(){
    if(!drag)return;var d=drag;drag=null;
    if(Math.hypot(d.x-AX,d.y-AY)<18)return;
    if(!api.take())return;
    ball={x:AX,y:AY,vx:(AX-d.x)*K,vy:(AY-d.y)*K,t:0,scored:false,net:0};touched=false;
    SFX.thud();api.refresh();
  }
  function draw(c){
    sky(c,'#ffd9a8','#fff3df');
    c.fillStyle='#c98a4b';c.fillRect(0,H-8,W,8);c.fillStyle='#d9a066';c.fillRect(0,H-8,W,3);
    c.fillStyle='#e8c597';c.fillRect(0,H-70,W,62);c.strokeStyle='#fff';c.lineWidth=3;c.beginPath();c.moveTo(0,H-70);c.lineTo(W,H-70);c.stroke();
    // hoop
    var rl=hoop.x,rx=hoop.x+64;
    c.fillStyle='#8c97b8';c.fillRect(rx+14,hoop.y-86,8,H-hoop.y+80);
    c.fillStyle='#fff';c.strokeStyle='#18223d';c.lineWidth=3;rr(c,rx+4,hoop.y-86,12,98,3);c.fill();c.stroke();
    var sag=ball&&ball.net>0?ball.net*.7:0;
    c.strokeStyle='rgba(255,255,255,.95)';c.lineWidth=2;
    for(var i=0;i<=4;i++){var x1=rl+i*16;c.beginPath();c.moveTo(x1,hoop.y);c.lineTo(rl+10+i*11,hoop.y+40+sag);c.stroke()}
    c.beginPath();c.moveTo(rl+10,hoop.y+20);c.lineTo(rx-10,hoop.y+20);c.moveTo(rl+14,hoop.y+36+sag);c.lineTo(rx-14,hoop.y+36+sag);c.stroke();
    c.strokeStyle='#ee6a4d';c.lineWidth=6;c.lineCap='round';c.beginPath();c.moveTo(rl,hoop.y);c.lineTo(rx,hoop.y);c.stroke();
    // aim
    if(drag){
      c.fillStyle='rgba(24,34,61,.55)';traj(drag.x,drag.y).forEach(function(p,i){c.beginPath();c.arc(p[0],p[1],Math.max(2,5-i*.25),0,6.283);c.fill()});
      c.strokeStyle='rgba(24,34,61,.4)';c.lineWidth=3;c.beginPath();c.moveTo(AX-10,AY);c.lineTo(drag.x,drag.y);c.stroke();
    }
    var bx=ball?ball.x:(drag?drag.x:AX),by=ball?ball.y:(drag?drag.y:AY);
    if(ball||drag||api.units()>0){
      c.fillStyle='#f58a3a';c.strokeStyle='#18223d';c.lineWidth=3;c.beginPath();c.arc(bx,by,R,0,6.283);c.fill();c.stroke();
      c.lineWidth=2;c.beginPath();c.moveTo(bx-R,by);c.lineTo(bx+R,by);c.moveTo(bx,by-R);c.lineTo(bx,by+R);c.stroke();
    }
    fxDraw(c,fx);
    hud(c,'Points '+score+'   Baskets '+made,streak>=2?'Streak x'+streak:'');
    if(msgT>0)txt(c,msg,W/2,90,40,'#ffd23f','center','#18223d');
    if(!ball&&!drag&&api.units()<=0)txt(c,'Answer a question right to earn 3 shots',W/2,H-34,22,'#18223d','center');
    else if(!ball&&!drag&&t<600)txt(c,'Touch the ball, pull back, then let go',W/2,H-34,22,'#18223d','center');
  }
  return{update:update,draw:draw,down:down,move:move,up:up,score:function(){return score},_state:function(){return{ball:ball,hoop:hoop,made:made,score:score,streak:streak}},_aim:{AX:AX,AY:AY}};
 }};
/* ========================== 4. Memory Match ========================== */
G.memory={id:'memory',name:'Memory Match',desc:'Flip cards to find the matching pairs.',unit:'Boards',per:1,round:true,
 earn:function(ok){return ok?1:0},
 create:function(api){
  var st='idle',cards=[],first=null,second=null,wait=0,moves=0,misses=0,pairs=6,level=0,fx=[],last='',t=0;
  var COLS=['#ee6a4d','#2f5bea','#17a698','#f5b400','#7a5cf0','#e0529c','#3f9c4a','#f58a3a','#0e8fbf','#a3524a'];
  function icon(c,k,x,y,s){
    c.save();c.translate(x,y);c.fillStyle=COLS[k];c.strokeStyle='#18223d';c.lineWidth=3;c.lineJoin='round';c.beginPath();
    switch(k%10){
      case 0:c.arc(0,0,s,0,6.283);break;
      case 1:c.rect(-s,-s,2*s,2*s);break;
      case 2:c.moveTo(0,-s);c.lineTo(s,s*.8);c.lineTo(-s,s*.8);c.closePath();break;
      case 3:c.moveTo(0,-s*1.1);c.lineTo(s,0);c.lineTo(0,s*1.1);c.lineTo(-s,0);c.closePath();break;
      case 4:for(var i=0;i<10;i++){var a=i*Math.PI/5-Math.PI/2,r=i%2?s*.45:s*1.1;c.lineTo(Math.cos(a)*r,Math.sin(a)*r)}c.closePath();break;
      case 5:c.moveTo(0,s*.9);c.bezierCurveTo(-s*1.5,-s*.2,-s*.7,-s*1.1,0,-s*.35);c.bezierCurveTo(s*.7,-s*1.1,s*1.5,-s*.2,0,s*.9);break;
      case 6:c.arc(0,0,s,.6,6.283-.6);c.lineTo(0,0);c.closePath();break;
      case 7:c.arc(0,0,s,0,6.283);c.moveTo(s*.5,0);c.arc(0,0,s*.5,0,6.283,true);break;
      case 8:c.moveTo(-s*.2,-s*1.1);c.lineTo(s*.7,-s*.1);c.lineTo(s*.1,-s*.1);c.lineTo(s*.4,s*1.1);c.lineTo(-s*.7,s*.1);c.lineTo(-s*.1,s*.1);c.closePath();break;
      default:c.moveTo(-s,s*.7);c.arc(-s*.45,s*.1,s*.55,Math.PI*.8,Math.PI*1.9);c.arc(s*.35,-s*.15,s*.7,Math.PI*1.1,Math.PI*2.05);c.arc(s*.7,s*.3,s*.4,-1.2,1.6);c.lineTo(-s,s*.7);c.closePath();
    }
    c.fill();c.stroke();c.restore();
  }
  function layout(){
    var cols=pairs<=6?4:pairs<=8?4:5,rows=Math.ceil(pairs*2/cols),gap=12,ch=Math.min(104,(H-50-(rows-1)*gap)/rows),cw=ch*.82;
    var tw=cols*cw+(cols-1)*gap,th=rows*ch+(rows-1)*gap,ox=(W-tw)/2,oy=(H-th)/2+10;
    cards.forEach(function(cd,i){var r=Math.floor(i/cols),cc=i%cols;cd.x=ox+cc*(cw+gap);cd.y=oy+r*(ch+gap);cd.w=cw;cd.h=ch});
  }
  function start(){
    pairs=Math.min(10,6+level*2);var ks=[];for(var i=0;i<pairs;i++){ks.push(i,i)}
    for(var j=ks.length-1;j>0;j--){var r=ri(0,j),tmp=ks[j];ks[j]=ks[r];ks[r]=tmp}
    cards=ks.map(function(k){return{k:k,f:0,up:false,done:false}});layout();
    first=second=null;wait=0;moves=0;misses=0;st='run';fx=[];api.hint('Flip two cards. Find all '+pairs+' pairs.');
  }
  function update(){
    t++;fxStep(fx);
    cards.forEach(function(cd){var tg=cd.up?1:0;cd.f+=clamp(tg-cd.f,-.14,.14)});
    if(wait>0){wait--;if(wait===0&&first&&second){first.up=false;second.up=false;SFX.flip();first=second=null}}
    if(st==='run'&&cards.length&&cards.every(function(cd){return cd.done})&&wait===0){
      st='done';var stars=misses<=Math.floor(pairs/3)?3:misses<=pairs?2:1;level++;
      last='\u2605'.repeat(stars)+'\u2606'.repeat(3-stars);
      SFX.win();api.roundEnd(stars*10-misses,'Board cleared in '+moves+' moves! '+last);
    }
  }
  function down(x,y){
    if(st!=='run'||wait>0)return;
    for(var i=0;i<cards.length;i++){var cd=cards[i];
      if(!cd.up&&!cd.done&&x>=cd.x&&x<=cd.x+cd.w&&y>=cd.y&&y<=cd.y+cd.h){
        cd.up=true;SFX.flip();
        if(!first){first=cd}
        else{second=cd;moves++;
          if(first.k===second.k){first.done=second.done=true;burst(fx,cd.x+cd.w/2,cd.y+cd.h/2,COLS[cd.k],14,4);burst(fx,first.x+first.w/2,first.y+first.h/2,COLS[cd.k],14,4);SFX.match();first=second=null}
          else{misses++;wait=45}}
        return}}
  }
  function draw(c){
    sky(c,'#dff0ff','#bcd9f5');
    cards.forEach(function(cd){
      var sx=Math.abs(Math.cos(Math.PI*cd.f)),cx=cd.x+cd.w/2,cy=cd.y+cd.h/2;
      c.save();c.translate(cx,cy);c.scale(Math.max(.02,sx),1);
      if(cd.f<.5){c.fillStyle='#2f5bea';c.strokeStyle='#18223d';c.lineWidth=3;rr(c,-cd.w/2,-cd.h/2,cd.w,cd.h,10);c.fill();c.stroke();
        c.fillStyle='rgba(255,255,255,.25)';c.beginPath();c.arc(0,0,cd.w*.22,0,6.283);c.fill();txt(c,'?',0,2,cd.h*.42,'#fff')}
      else{c.fillStyle=cd.done?'#e6ffe9':'#fff';c.strokeStyle='#18223d';c.lineWidth=3;rr(c,-cd.w/2,-cd.h/2,cd.w,cd.h,10);c.fill();c.stroke();icon(c,cd.k,0,0,cd.w*.3)}
      c.restore();
    });
    fxDraw(c,fx);
    if(st==='run')hud(c,'Moves '+moves,'Pairs '+cards.filter(function(x){return x.done}).length/2+' / '+pairs);
    else if(st==='done')centerMsg(c,last||'Done!','Press Play for a bigger board');
    else centerMsg(c,'Memory Match','Press Play. Answer right to earn boards.');
  }
  return{update:update,draw:draw,start:start,down:down,score:function(){return moves},_cards:function(){return cards}};
 }};
/* ========================== 5. Coin Stacker ========================== */
G.stack={id:'stack',name:'Coin Stacker',desc:'Tap to drop each coin. Line it up to build the tallest stack.',unit:'Runs',per:1,round:true,
 earn:function(ok){return ok?1:0},
 create:function(api){
  var CH=26,BASE_Y=H-40;
  var st='idle',stack=[],cur=null,dir=1,spd=3,score=0,perfects=0,fx=[],cam=0,camT=0,cuts=[],last=0,t=0;
  function coinW(){return stack[stack.length-1].w}
  function spawn(){var w=coinW();cur={x:dir>0?0:W-w,w:w,v:dir*spd};dir=-dir}
  function start(){
    st='run';stack=[{x:W/2-110,w:220}];score=0;perfects=0;spd=3.2;dir=1;cam=camT=0;cuts=[];fx=[];spawn();
    api.hint('Tap when the coin lines up with the stack.');
  }
  function end(){st='done';last=score;SFX.lose();api.roundEnd(score,'Your stack is '+score+' coins tall!')}
  function drop(){
    if(st!=='run'||!cur)return;
    var top=stack[stack.length-1],l=Math.max(cur.x,top.x),r=Math.min(cur.x+cur.w,top.x+top.w),ov=r-l;
    if(ov<=2){cuts.push({x:cur.x,w:cur.w,lv:stack.length,fall:0,vy:0,vx:0});cur=null;end();return}
    var perfect=Math.abs(cur.x-top.x)<6;
    var nx=cur.x,nw=cur.w;
    if(perfect){nx=top.x;nw=top.w;perfects++;SFX.coin();burst(fx,nx+nw/2,BASE_Y-(stack.length)*CH-cam,'#fff3a0',14,4)}
    else{
      if(cur.x<top.x)cuts.push({x:cur.x,w:top.x-cur.x,lv:stack.length,fall:0,vy:0,vx:-1});
      else cuts.push({x:top.x+top.w,w:cur.x+cur.w-(top.x+top.w),lv:stack.length,fall:0,vy:0,vx:1});
      nx=l;nw=ov;SFX.thud();
    }
    stack.push({x:nx,w:nw});score=stack.length-1;
    spd=Math.min(8.5,3.2+score*.18);if(cur)cur.v=0;
    camT=Math.max(0,(stack.length-6)*CH);
    spawn();
  }
  function update(){
    t++;fxStep(fx);cam+=(camT-cam)*.12;
    cuts.forEach(function(p){p.vy+=.5;p.fall+=p.vy;p.x+=p.vx*1.5});
    cuts=cuts.filter(function(p){return p.fall<500});
    if(st==='run'&&cur){
      cur.x+=cur.v;
      if(cur.x<0){cur.x=0;cur.v=Math.abs(cur.v)}
      if(cur.x+cur.w>W){cur.x=W-cur.w;cur.v=-Math.abs(cur.v)}
    }
  }
  function draw(c){
    sky(c,'#cfe6ff','#f2f8ff');
    c.fillStyle='#69b36d';c.fillRect(0,BASE_Y+CH+cam,W,H);c.fillStyle='#8b6240';c.fillRect(0,BASE_Y+CH+cam+14,W,H);
    function coin(x,y,w,i){
      var hue=42-(i%12)*3;c.fillStyle='hsl('+hue+',92%,'+(52-(i%3)*3)+'%)';c.strokeStyle='#18223d';c.lineWidth=3;rr(c,x,y,w,CH-2,8);c.fill();c.stroke();
      c.fillStyle='rgba(255,255,255,.4)';c.fillRect(x+8,y+5,Math.max(0,w-16),4);
    }
    stack.forEach(function(s,i){coin(s.x,BASE_Y-i*CH+cam,s.w,i)});
    cuts.forEach(function(p){c.globalAlpha=.85;coin(p.x,BASE_Y-p.lv*CH+cam+p.fall,p.w,p.lv);c.globalAlpha=1});
    if(cur&&st==='run')coin(cur.x,BASE_Y-stack.length*CH+cam,cur.w,stack.length);
    fxDraw(c,fx);
    if(st==='run')hud(c,'Height '+score,perfects?'Perfect x'+perfects:'');
    else if(st==='done')centerMsg(c,'Stack of '+last+'!','Press Play to try again');
    else centerMsg(c,'Coin Stacker','Press Play. Answer right to earn runs.');
  }
  return{update:update,draw:draw,start:start,down:function(){drop()},score:function(){return score},_s:function(){return{cur:cur,stack:stack,st:st}}};
 }};
/* ========================== 6. Gem Swap ========================== */
G.gems={id:'gems',name:'Gem Swap',desc:'Swap neighbors to line up 3 or more gems. Right answers earn moves.',unit:'Moves',per:5,round:false,
 earn:function(ok){return ok?1:0},
 create:function(api){
  var C=8,R=6,T=56,OX=36,OY=32,K=5;
  var COL=['#ee6a4d','#2f5bea','#17a698','#f5b400','#a14fe0'];
  var grid=[],sel=null,state='idle',wait=0,score=0,combo=0,fx=[],drag=null,msg='',msgT=0,pend=null,t=0;
  function gem(k,r,c,fromY){return{k:k,x:OX+c*T,y:fromY===undefined?OY+r*T:fromY,dead:0}}
  function at(r,c){return r>=0&&r<R&&c>=0&&c<C?grid[r][c]:null}
  function matches(){
    var set={},r,c,k,n;
    for(r=0;r<R;r++){c=0;while(c<C){k=grid[r][c].k;n=1;while(c+n<C&&grid[r][c+n].k===k)n++;if(n>=3)for(var i=0;i<n;i++)set[r+','+(c+i)]=1;c+=n}}
    for(c=0;c<C;c++){r=0;while(r<R){k=grid[r][c].k;n=1;while(r+n<R&&grid[r+n][c].k===k)n++;if(n>=3)for(var j=0;j<n;j++)set[(r+j)+','+c]=1;r+=n}}
    return Object.keys(set).map(function(s){var p=s.split(',');return[+p[0],+p[1]]});
  }
  function swapCells(a,b){var t1=grid[a[0]][a[1]];grid[a[0]][a[1]]=grid[b[0]][b[1]];grid[b[0]][b[1]]=t1}
  function wouldMatch(a,b){swapCells(a,b);var m=matches().length>0;swapCells(a,b);return m}
  function hasMove(){for(var r=0;r<R;r++)for(var c=0;c<C;c++){if(c+1<C&&wouldMatch([r,c],[r,c+1]))return true;if(r+1<R&&wouldMatch([r,c],[r+1,c]))return true}return false}
  function fill(){
    do{grid=[];for(var r=0;r<R;r++){grid.push([]);for(var c=0;c<C;c++){var k;do{k=ri(0,K-1)}while((c>=2&&grid[r][c-1].k===k&&grid[r][c-2].k===k)||(r>=2&&grid[r-1][c].k===k&&grid[r-2][c].k===k));grid[r].push(gem(k,r,c))}}}while(!hasMove()||matches().length);
  }
  fill();
  function settle(){ /* gravity: keep survivors, drop them down, add new gems above the board */
    for(var c=0;c<C;c++){
      var col=[];for(var r=R-1;r>=0;r--)if(grid[r][c]&&!grid[r][c].rm)col.push(grid[r][c]);
      var n=col.length;
      for(var rw=R-1;rw>=0;rw--){
        var idx=R-1-rw,g=col[idx];
        if(!g){var top=rw;g=gem(ri(0,K-1),rw,c,OY+(rw-(R-n))*T-4)}
        grid[rw][c]=g;
      }
    }
  }
  function resolve(){
    var m=matches();
    if(!m.length){
      combo=0;
      if(!hasMove()){msg='No moves left. Shuffling!';msgT=80;fill()}
      state='idle';api.refresh();return;
    }
    combo++;var pts=m.length*10*combo;score+=pts;api.setBest(score);
    m.forEach(function(p){var g=grid[p[0]][p[1]];g.dead=12;g.rm=true;burst(fx,g.x+T/2,g.y+T/2,COL[g.k],6,3)});
    SFX.match();if(combo>1){msg='Combo x'+combo+'!';msgT=60}
    state='clear';wait=14;
  }
  function trySwap(a,b){
    if(state!=='idle')return;
    if(Math.abs(a[0]-b[0])+Math.abs(a[1]-b[1])!==1)return;
    if(api.units()<=0){api.hint('No moves left. Answer a question right to earn 5 moves.');sel=null;return}
    if(!wouldMatch(a,b)){
      swapCells(a,b);state='bad';wait=12;pend=[a,b];SFX.bonk();msg='That does not make a match.';msgT=50;return}
    api.take();swapCells(a,b);state='swap';wait=10;SFX.swap();sel=null;
  }
  function update(){
    t++;fxStep(fx);if(msgT>0)msgT--;
    for(var r=0;r<R;r++)for(var c=0;c<C;c++){var g=grid[r][c];if(!g)continue;
      var tx=OX+c*T,ty=OY+r*T;g.x+=(tx-g.x)*.35;if(Math.abs(tx-g.x)<.5)g.x=tx;
      if(g.y<ty){g.vy=(g.vy||0)+.9;g.y=Math.min(ty,g.y+g.vy);if(g.y>=ty)g.vy=0}else{g.y+=(ty-g.y)*.35;if(Math.abs(ty-g.y)<.5)g.y=ty}
      if(g.dead>0){g.dead--}}
    if(wait>0){wait--;return}
    if(state==='swap')resolve();
    else if(state==='bad'){swapCells(pend[0],pend[1]);state='idle';pend=null}
    else if(state==='clear'){
      settle();state='fall';wait=8;
    }else if(state==='fall'){
      var moving=false;for(var r2=0;r2<R;r2++)for(var c2=0;c2<C;c2++){var g2=grid[r2][c2];if(Math.abs(g2.y-(OY+r2*T))>1)moving=true}
      if(!moving)resolve();
    }
  }
  function cellAt(x,y){var c=Math.floor((x-OX)/T),r=Math.floor((y-OY)/T);return r>=0&&r<R&&c>=0&&c<C?[r,c]:null}
  function down(x,y){
    var cell=cellAt(x,y);if(!cell||state!=='idle')return;
    if(sel&&Math.abs(sel[0]-cell[0])+Math.abs(sel[1]-cell[1])===1){trySwap(sel,cell);sel=null;drag=null;return}
    sel=cell;drag={x:x,y:y,cell:cell};
  }
  function move(x,y){
    if(!drag||state!=='idle')return;
    var dx=x-drag.x,dy=y-drag.y;
    if(Math.hypot(dx,dy)>T*.45){
      var a=drag.cell,b=Math.abs(dx)>Math.abs(dy)?[a[0],a[1]+(dx>0?1:-1)]:[a[0]+(dy>0?1:-1),a[1]];
      drag=null;if(cellAt(OX+b[1]*T+5,OY+b[0]*T+5))trySwap(a,b);sel=null;
    }
  }
  function up(){drag=null}
  function draw(c){
    sky(c,'#2b2f5e','#161a3a');
    c.fillStyle='rgba(255,255,255,.07)';rr(c,OX-8,OY-8,C*T+16,R*T+16,16);c.fill();
    c.save();rr(c,OX-4,OY-4,C*T+8,R*T+8,12);c.clip();
    for(var r=0;r<R;r++)for(var cc=0;cc<C;cc++){c.fillStyle=(r+cc)%2?'rgba(255,255,255,.05)':'rgba(255,255,255,.1)';c.fillRect(OX+cc*T,OY+r*T,T,T)}
    for(var r2=0;r2<R;r2++)for(var c2=0;c2<C;c2++){
      var g=grid[r2][c2];if(!g)continue;
      var s=g.dead>0?g.dead/12:1,cx=g.x+T/2,cy=g.y+T/2,rad=T*.36*s;
      c.save();c.translate(cx,cy);c.fillStyle=COL[g.k];c.strokeStyle='#fff';c.lineWidth=2.5;c.lineJoin='round';c.beginPath();
      switch(g.k){
        case 0:c.arc(0,0,rad,0,6.283);break;
        case 1:c.rect(-rad*.85,-rad*.85,rad*1.7,rad*1.7);break;
        case 2:c.moveTo(0,-rad);c.lineTo(rad,rad*.8);c.lineTo(-rad,rad*.8);c.closePath();break;
        case 3:c.moveTo(0,-rad*1.1);c.lineTo(rad,0);c.lineTo(0,rad*1.1);c.lineTo(-rad,0);c.closePath();break;
        default:for(var i=0;i<10;i++){var a=i*Math.PI/5-Math.PI/2,q=i%2?rad*.5:rad*1.1;c.lineTo(Math.cos(a)*q,Math.sin(a)*q)}c.closePath();
      }
      c.fill();c.stroke();c.fillStyle='rgba(255,255,255,.35)';c.beginPath();c.arc(-rad*.3,-rad*.3,rad*.22,0,6.283);c.fill();c.restore();
      if(sel&&sel[0]===r2&&sel[1]===c2){c.strokeStyle='#ffd23f';c.lineWidth=4;rr(c,OX+c2*T+2,OY+r2*T+2,T-4,T-4,10);c.stroke()}
    }
    c.restore();fxDraw(c,fx);
    var px=OX+C*T+36;
    txt(c,'Score',px+110,60,22,'#c8d0f5','center');txt(c,String(score),px+110,96,40,'#fff','center');
    txt(c,'Moves left',px+110,160,22,'#c8d0f5','center');txt(c,String(api.units()),px+110,198,46,api.units()>0?'#ffd23f':'#ff8892','center');
    txt(c,'Best '+Math.max(api.best(),score),px+110,250,20,'#c8d0f5','center');
    if(api.units()<=0)txt(c,'Answer a question right',px+110,300,18,'#c8d0f5','center'),txt(c,'for 5 more moves',px+110,324,18,'#c8d0f5','center');
    if(msgT>0)txt(c,msg,OX+C*T/2,OY+R*T/2,28,'#fff','center','#18223d');
  }
  return{update:update,draw:draw,down:down,move:move,up:up,score:function(){return score},_g:function(){return{grid:grid,state:state}},
    _hint:function(){for(var r=0;r<R;r++)for(var c=0;c<C;c++){if(c+1<C&&wouldMatch([r,c],[r,c+1]))return[[r,c],[r,c+1]];if(r+1<R&&wouldMatch([r,c],[r+1,c]))return[[r,c],[r+1,c]]}return null},
    _cellXY:function(r,c){return[OX+c*T+T/2,OY+r*T+T/2]}};
 }};
/* ========================== 7. Mystery Egg ========================== */
G.egg={id:'egg',name:'Mystery Egg',desc:'Get 3 right in a row to earn an egg. Crack it to find a creature.',unit:'Eggs',per:1,round:false,
 earn:function(ok,streak){return ok&&streak>0&&streak%3===0?1:0},
 create:function(api){
  var BODY=['#19b5a5','#ee6a4d','#f5b400','#7a5cf0','#e0529c','#2f5bea'],NAMES=['Zippy','Pip','Bumble','Nox','Fizz','Moss'];
  var RARE=[30,25,20,15,7,3];
  var coll=[],st='idle',taps=0,wob=0,tt=0,cur=-1,isNew=false,fx=[],t=0;
  try{coll=JSON.parse(lsGet('mg_eggs')||'[]')}catch(e){coll=[]}
  for(var i=0;i<24;i++)coll[i]=coll[i]|0;
  function roll(){var tot=RARE.reduce(function(a,b){return a+b},0),v=Math.random()*tot,col=0;for(var i=0;i<6;i++){v-=RARE[i];if(v<=0){col=i;break}}return col*4+ri(0,3)}
  function creature(c,x,y,r,idx,dim){
    var col=Math.floor(idx/4),type=idx%4,fill=dim?'#3c4468':BODY[col],ln=dim?'#2a3050':'#18223d';
    c.save();c.translate(x,y);c.fillStyle=fill;c.strokeStyle=ln;c.lineWidth=Math.max(2,r*.08);c.lineJoin='round';
    // features behind body
    if(type===0){c.beginPath();c.arc(-r*.6,-r*.75,r*.28,0,6.283);c.arc(r*.6,-r*.75,r*.28,0,6.283);c.fill();c.stroke()}
    if(type===3){c.beginPath();c.ellipse(-r*1.05,r*.05,r*.35,r*.55,.5,0,6.283);c.ellipse(r*1.05,r*.05,r*.35,r*.55,-.5,0,6.283);c.fill();c.stroke()}
    c.beginPath();
    if(type===1)c.ellipse(0,0,r*.85,r*1.1,0,0,6.283);else if(type===2){c.arc(0,r*.1,r,0,6.283)}else c.arc(0,0,r,0,6.283);
    c.fill();c.stroke();
    if(type===1){c.beginPath();c.moveTo(0,-r*1.05);c.lineTo(0,-r*1.5);c.stroke();c.beginPath();c.arc(0,-r*1.55,r*.14,0,6.283);c.fillStyle=dim?'#3c4468':'#ffd23f';c.fill();c.stroke();c.fillStyle=fill}
    if(type===2){c.beginPath();c.moveTo(-r*.18,-r*.88);c.lineTo(0,-r*1.45);c.lineTo(r*.18,-r*.88);c.closePath();c.fillStyle=dim?'#3c4468':'#fff3c4';c.fill();c.stroke();c.fillStyle=fill}
    if(!dim){
      c.fillStyle='rgba(255,255,255,.4)';c.beginPath();c.ellipse(0,r*.35,r*.55,r*.4,0,0,3.14);c.fill();
      c.fillStyle='#fff';c.beginPath();c.arc(-r*.32,-r*.15,r*.2,0,6.283);c.arc(r*.32,-r*.15,r*.2,0,6.283);c.fill();
      c.fillStyle='#18223d';c.beginPath();c.arc(-r*.28,-r*.12,r*.09,0,6.283);c.arc(r*.36,-r*.12,r*.09,0,6.283);c.fill();
      c.strokeStyle='#18223d';c.lineWidth=Math.max(2,r*.07);c.beginPath();c.arc(0,r*.18,r*.22,.2,2.94);c.stroke();
    }else txt(c,'?',0,0,r*.9,'#6b749a');
    c.restore();
  }
  function egg(c,x,y,sc,tap){
    c.save();c.translate(x,y);c.rotate(Math.sin(wob)*.12*(wob>0?1:0));c.scale(sc,sc);
    c.fillStyle='#f4ecd6';c.strokeStyle='#18223d';c.lineWidth=4;c.beginPath();c.moveTo(0,-84);c.bezierCurveTo(60,-84,76,-6,76,24);c.bezierCurveTo(76,70,42,92,0,92);c.bezierCurveTo(-42,92,-76,70,-76,24);c.bezierCurveTo(-76,-6,-60,-84,0,-84);c.fill();c.stroke();
    c.fillStyle='#7a5cf0';[[-30,-24,9],[26,-44,8],[34,14,10],[-18,44,8],[-48,10,6],[8,-8,6]].forEach(function(p){c.globalAlpha=.75;c.beginPath();c.arc(p[0],p[1],p[2],0,6.283);c.fill()});c.globalAlpha=1;
    c.strokeStyle='#18223d';c.lineWidth=3.5;c.lineCap='round';c.lineJoin='round';
    if(tap>=1){c.beginPath();c.moveTo(-40,-6);c.lineTo(-20,10);c.lineTo(-34,24);c.lineTo(-14,38);c.stroke()}
    if(tap>=2){c.beginPath();c.moveTo(36,-24);c.lineTo(18,-6);c.lineTo(34,10);c.lineTo(14,22);c.stroke()}
    c.restore();
  }
  function reveal(){
    cur=roll();isNew=!coll[cur];coll[cur]++;lsSet('mg_eggs',JSON.stringify(coll));
    st='reveal';tt=0;SFX.win();burst(fx,235,200,BODY[Math.floor(cur/4)],30,6);api.refresh();
  }
  function down(x,y){
    if(Math.hypot(x-235,(y-200)*.8)>110&&st!=='reveal')return;
    if(st==='reveal'){st='idle';taps=0;wob=0;return}
    if(st==='idle'){
      if(!api.take()){api.hint('No eggs yet. Get 3 questions right in a row to earn one.');return}
      st='crack';taps=0;
    }
    taps++;wob=.01;tt=14;SFX.crack();
    if(taps>=3)reveal()
  }
  function update(){
    t++;fxStep(fx);
    if(wob>0){wob+=.5;if(wob>9)wob=0}
    if(st==='reveal')tt++;
  }
  function draw(c){
    sky(c,'#cfe6ff','#eaf5ff');
    c.fillStyle='#69b36d';c.fillRect(0,330,W,70);c.fillStyle='rgba(0,0,0,.12)';c.beginPath();c.ellipse(235,334,92,14,0,0,6.283);c.fill();
    var have=api.units(),n=coll.filter(function(v){return v>0}).length;
    if(st==='reveal'){
      var sc=Math.min(1,tt/14),bounce=Math.sin(tt/6)*4;
      creature(c,235,218+bounce,86*sc,cur,false);
      txt(c,NAMES[Math.floor(cur/4)]+' '+['Bouncer','Sprout','Unicorn','Flyer'][cur%4],235,330,24,'#18223d','center');
      txt(c,isNew?'NEW!':'You have '+coll[cur],235,48,isNew?44:30,isNew?'#f5b400':'#18223d','center',isNew?'#18223d':null);
      txt(c,'Tap to continue',235,372,18,'#18223d','center');
    }else{
      if(have>0||st==='crack')egg(c,235,230,1.1+(st==='crack'?0:Math.sin(t/14)*.02),st==='crack'?taps:0);
      else{c.globalAlpha=.45;egg(c,235,230,1.1,0);c.globalAlpha=1}
      txt(c,'Eggs: '+have,16,22,24,'#18223d','left');
      if(st==='crack')txt(c,'Keep tapping!',235,48,30,'#18223d','center');
      else if(have>0)txt(c,'Tap the egg to crack it open',235,48,24,'#18223d','center');
      else txt(c,'Get 3 right in a row for an egg',235,48,22,'#18223d','center');
      var s=Math.min(3,api.streak()%3);for(var i=0;i<3;i++){c.fillStyle=i<s?'#f5b400':'rgba(24,34,61,.2)';c.strokeStyle='#18223d';c.lineWidth=2;c.beginPath();c.arc(235-30+i*30,368,9,0,6.283);c.fill();c.stroke()}
    }
    fxDraw(c,fx);
    // collection
    c.fillStyle='rgba(255,255,255,.72)';rr(c,452,30,332,340,16);c.fill();
    txt(c,'Collection '+n+' / 24',618,56,22,'#18223d','center');
    for(var k=0;k<24;k++){var cx=482+(k%6)*54,cy=106+Math.floor(k/6)*62;
      c.fillStyle=coll[k]?'#fff':'#e6ebf7';c.strokeStyle=coll[k]?'#18223d':'#c3cce2';c.lineWidth=2;rr(c,cx-24,cy-26,48,52,10);c.fill();c.stroke();
      creature(c,cx,cy+2,14,k,!coll[k]);
      if(coll[k]>1)txt(c,'x'+coll[k],cx+14,cy+20,11,'#18223d','center')}
  }
  return{update:update,draw:draw,down:down,score:function(){return coll.filter(function(v){return v>0}).length},_coll:function(){return coll},_force:function(i){cur=i}};
 }};
/* ========================== arena shell ========================== */
var LIST=['balloon','star','throw','memory','stack','gems','egg'];
function css(){
  if(document.getElementById('mg-css'))return;
  var st=document.createElement('style');st.id='mg-css';
  st.textContent=
   '.mg-host{margin:12px 0}'+
   '.mg-bar{display:flex;flex-wrap:wrap;gap:6px;margin:0 0 8px;align-items:center}'+
   '.mg-pill{font:inherit;color:var(--ink,#222);font-weight:800;font-size:13px;background:var(--card,var(--surface,#fff));border:2px solid var(--line,#ddd);border-radius:99px;padding:3px 11px;white-space:nowrap}'+
   'button.mg-pill,select.mg-pill{cursor:pointer}'+
   '.mg-arena{border:2px solid var(--line,#ddd);border-radius:16px;overflow:hidden;background:#cfe6ff}'+
   '.mg-arena canvas{display:block;width:100%;height:auto;aspect-ratio:2/1;touch-action:none;cursor:pointer}'+
   '.mg-hint{margin:8px 2px 0;font-size:14px;font-weight:700;color:var(--indigo,var(--accent,#2B3A67));min-height:1.4em}'+
   '.mg-hint.flash{color:var(--teal,#2A9D8F)}'+
   '.mg-actions{display:flex;gap:8px;margin:8px 0 0}'+
   '.mg-btn{font:inherit;font-weight:800;font-size:15px;cursor:pointer;border-radius:999px;padding:8px 20px;border:2px solid var(--indigo,var(--accent,#2B3A67));background:var(--indigo,var(--accent,#2B3A67));color:var(--bg,#fff)}'+
   '.mg-btn:disabled{opacity:.4;cursor:default}';
  document.head.appendChild(st);
}
function mount(container,opts){
  opts=opts||{};css();
  var host=document.createElement('div');host.className='mg-host';
  host.innerHTML=
   '<div class="mg-bar"><span class="mg-pill" data-r="units"></span><span class="mg-pill" data-r="best"></span>'+(opts.select?'<select class="mg-pill" data-r="sel" aria-label="Choose a game">'+LIST.map(function(id){return'<option value="'+id+'">'+G[id].name+'</option>'}).join('')+'</select>':'')+'<button class="mg-pill" data-r="snd" aria-pressed="true"></button></div>'+
   '<div class="mg-arena"><canvas aria-label="Arcade game"></canvas></div><p class="mg-hint" data-r="hint"></p>'+
   '<div class="mg-actions"><button class="mg-btn" data-r="play">Play</button></div>';
  container.appendChild(host);
  var $=function(n){return host.querySelector('[data-r="'+n+'"]')},cv=host.querySelector('canvas'),dpr=Math.min(2,window.devicePixelRatio||1);
  cv.width=W*dpr;cv.height=H*dpr;var ctx=cv.getContext('2d');
  var inst={tokens:0,bank:0,streak:0,gid:G[opts.game]?opts.game:'balloon',stop:false,raf:0,acc:0,last:0,g:null,def:null,playing:false,flashT:0};
  function bestKey(){return 'mg_best_'+inst.gid}
  function best(){return parseInt(lsGet(bestKey())||'0',10)||0}
  function units(){return inst.bank+inst.tokens*inst.def.per}
  var api={
    units:units,
    take:function(){if(inst.bank>0){inst.bank--;refresh();return true}if(inst.tokens>0){inst.tokens--;inst.bank=inst.def.per-1;refresh();return true}return false},
    best:best,setBest:function(s){if(s>best())lsSet(bestKey(),String(s))},streak:function(){return inst.streak},
    hint:function(t,flash){setHint(t,flash)},
    refresh:function(){refresh()},
    roundEnd:function(score,msg){inst.playing=false;var b=best(),nb=score>b;if(nb)lsSet(bestKey(),String(score));setHint(msg+(nb&&score>0?' New best!':''),true);refresh()}
  };
  function setHint(t,flash){var e=$('hint');if(e){e.textContent=t||'';e.className='mg-hint'+(flash?' flash':'')}}
  function refresh(){
    var u=units();$('units').textContent=inst.def.unit+': '+u;$('best').textContent='Best: '+best();
    var p=$('play');p.style.display=inst.def.round?'':'none';p.disabled=inst.playing||u<=0;
    p.textContent=inst.playing?'Playing...':u>0?'Play ('+u+')':'Play (answer a question right)';
    if(inst.gid==='egg')$('best').textContent='Creatures: '+inst.g.score()+' / 24';
  }
  function setGame(id){
    if(!G[id])id='balloon';
    inst.gid=id;inst.def=G[id];inst.playing=false;inst.g=G[id].create(api);
    var s=$('sel');if(s)s.value=id;
    setHint(inst.def.desc);refresh();
  }
  function pt(ev){var r=cv.getBoundingClientRect();return{x:(ev.clientX-r.left)*W/r.width,y:(ev.clientY-r.top)*H/r.height}}
  cv.addEventListener('pointerdown',function(ev){var p=pt(ev);ev.preventDefault();try{cv.setPointerCapture(ev.pointerId)}catch(e){}if(inst.g.down)inst.g.down(p.x,p.y)});
  cv.addEventListener('pointermove',function(ev){var p=pt(ev);if(inst.g.move)inst.g.move(p.x,p.y)});
  cv.addEventListener('pointerup',function(ev){var p=pt(ev);if(inst.g.up)inst.g.up(p.x,p.y)});
  cv.addEventListener('pointercancel',function(ev){if(inst.g.up)inst.g.up(-1,-1)});
  $('play').onclick=function(){if(inst.playing||!inst.def.round)return;if(!api.take())return;inst.playing=true;inst.g.start();refresh()};
  var sb=$('snd');
  function sbl(){sb.textContent='Sound: '+(soundOn?'On':'Off');sb.setAttribute('aria-pressed',soundOn?'true':'false')}
  sb.onclick=function(){soundOn=!soundOn;lsSet(K_SND,soundOn?'1':'0');sbl();if(soundOn)SFX.ding()};sbl();
  var sel=$('sel');if(sel)sel.onchange=function(){setGame(sel.value);if(opts.onChange)opts.onChange(sel.value)};
  function loop(t){
    if(inst.stop||!document.body.contains(cv))return;
    var dt=Math.min(50,t-(inst.last||t));inst.last=t;inst.acc+=dt;
    try{
      while(inst.acc>=FRAME){inst.acc-=FRAME;inst.g.update()}
      inst.g.draw(ctx.setTransform(dpr,0,0,dpr,0,0)||ctx);
    }catch(e){try{console.error('Arcade:',e)}catch(x){}}
    inst.raf=requestAnimationFrame(loop);
  }
  inst.answer=function(ok){
    inst.streak=ok?inst.streak+1:0;
    var n=ok?inst.def.earn(true,inst.streak):inst.def.earn(false,0);
    if(n>0){inst.tokens+=n;SFX.ding();setHint('+'+n+' '+inst.def.unit.toLowerCase().replace(/s$/,'')+(n>1?'s':'')+'! '+(inst.def.round?'Press Play.':'Go!'),true);clearTimeout(inst.ft);inst.ft=setTimeout(function(){if(!inst.stop&&!inst.playing)setHint(inst.def.desc)},2600)}
    else if(inst.gid==='egg'&&ok)setHint(inst.streak%3+' of 3 in a row for an egg.',true);
    refresh();
  };
  inst.setGame=setGame;
  inst.destroy=function(){inst.stop=true;cancelAnimationFrame(inst.raf);clearTimeout(inst.ft);if(host.parentNode)host.parentNode.removeChild(host)};
  inst.host=host;inst.api=api;root.MiniGames&&(root.MiniGames._last=inst);
  setGame(inst.gid);inst.raf=requestAnimationFrame(loop);
  return inst;
}
/* ---------- hook for the shared quiz pages ---------- */
var CUR=null;
function safe(fn){try{return fn()}catch(e){try{console.error('Arcade:',e)}catch(x){}}}
function chosen(){var v=lsGet(K_GAME);return lsGet(K_OFF)!=='0'&&G[v]?v:null}
function wrapFn(name,fn){
  var orig=window[name];
  if(typeof orig!=='function'||orig.__mg)return false;
  var w=function(){return fn.call(this,orig,arguments)};w.__mg=true;window[name]=w;return true;
}
function stopCur(){if(CUR){safe(function(){CUR.destroy()});CUR=null}}
function attach(opts){
  opts=opts||{};
  var ansName=opts.answer||(typeof window.next==='function'?'next':'record');
  wrapFn('home',function(orig,args){stopCur();return orig.apply(this,args)});
  wrapFn('start',function(orig,args){
    stopCur();
    var r=orig.apply(this,args),id=chosen(),st=document.getElementById('st');
    if(id&&st&&st.parentNode)safe(function(){CUR=mount(st.parentNode,{game:id});st.parentNode.insertBefore(CUR.host,st)});
    return r;
  });
  wrapFn(ansName,function(orig,args){
    var r=orig.apply(this,args);
    if(CUR)safe(function(){CUR.answer(!!args[0]);window.scrollTo(0,0)});
    return r;
  });
  if(ansName!=='next')wrapFn('advance',function(orig,args){var r=orig.apply(this,args);if(CUR)safe(function(){window.scrollTo(0,0)});return r});
}
root.MiniGames={list:LIST.map(function(id){return{id:id,name:G[id].name,desc:G[id].desc}}),has:function(id){return LIST.indexOf(id)>=0},mount:mount,attach:attach,isOn:function(){return!!chosen()},_G:G,_cur:function(){return CUR}};
})(window);
