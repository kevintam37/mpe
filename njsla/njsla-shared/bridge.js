/* Bridge Engineer: a bridge-building game that sits above a practice test.
   Every correct answer earns 2 truck trips. Design a truss (road + steel beams) with real spring physics, then a heavy truck drives across.
   Build it right to move on to a wider river and a heavier truck. Levels never run out.
   Loaded by practice pages next to sling.js. Call Bridge.attach() once, after Sling.attach().
   The game choice (Sling Showdown / Bridge Engineer / Off) lives on the home card drawn by sling.js.
   Every hook is wrapped in try/catch: if the game ever fails, the quiz keeps working. */
(function(){
'use strict';
var SW=800,SH=400;
/* Bridge Engineer: spell a word right, then design a real bridge. Beams are springs, joints are pinned, gravity pulls,
   and a heavy truck drives across. Triangles stay strong; squares wobble. Beat the level and the next river is wider. */
var EU=40,EGR=600,ESUB=24,EMAXL=3.2,EJ0=-3,EJ1=2,EM0=3.2,EMD=0.3,EMMAX=9,ESAG=0.5;
var EMAT={
  road:{k:50000,ft:9000,fc:9000,w:.05,cost:3,col:"#c58a4e",edge:"#7a4f23",wd:9},
  steel:{k:100000,ft:30000,fc:45000,w:.08,cost:5,col:"#8795bd",edge:"#46527a",wd:5}
};
function engCfg(n){
  var G=Math.min(13,4+n);
  return{G:G,M:Math.min(EMMAX,EM0+n*EMD),walls:n<=4?2:1};
}
function engRef(G){
  var h=G<=5?1:G<=9?2:3,nodes=[],beams=[],i;
  function B(i1,j1,i2,j2,t){beams.push([i1,j1,i2,j2,t])}
  for(i=0;i<G;i++)B(i,0,i+1,0,"road");
  for(i=1;i<G;i++)B(i,0,i,-h,"steel");
  for(i=1;i<G-1;i++)B(i,-h,i+1,-h,"steel");
  B(0,0,1,-h,"steel");B(G,0,G-1,-h,"steel");
  for(i=1;i<G-1;i++){
    if(i+1<=G/2)B(i,-h,i+1,0,"steel");else B(i+1,-h,i,0,"steel");
  }
  return beams;
}
function engCost(len,type){return Math.max(1,Math.round(len/EU*EMAT[type].cost))}
function engRefCost(G){return engRef(G).reduce(function(s,b){return s+engCost(Math.hypot(b[2]-b[0],b[3]-b[1])*EU,b[4])},0)}
function engBudget(n,G){var mg=Math.max(1.35,2.3-n*.1);return Math.ceil(engRefCost(G)*mg/5)*5}
function engLevel(n){
  var c=engCfg(n),G=c.G;
  S.level=n;S.G=G;S.M=c.M;S.LX=Math.round((SW-G*EU)/2);S.RX=S.LX+G*EU;S.CY=190;S.WY=S.CY+Math.round(2.4*EU);S.Z=Math.min(1.6,600/(G*EU));S.OY=215;
  S.nodes=[];S.beams=[];S.sel=null;S.hist=[];S.hint=false;S.msg="";S.budget=engBudget(n,G);
  S.truck={x:26,y:S.CY,vy:0,ang:0,state:"wait",t:0,sup:null};
  var j;
  for(j=0;j<=c.walls;j++){engMk(0,j,true);engMk(G,j,true)}
  S.fx=[];S.sparks=[];
}
function engMk(i,j,fixed){
  var n={i:i,j:j,x:S.LX+i*EU,y:S.CY+j*EU,hx:0,hy:0,vx:0,vy:0,fx:0,fy:0,m:1,fixed:!!fixed};
  n.hx=n.x;n.hy=n.y;S.nodes.push(n);return n;
}
function engAt(i,j){for(var k=0;k<S.nodes.length;k++){var n=S.nodes[k];if(n.i===i&&n.j===j)return n}return null}
function engScr(x,y){return{x:(x-SW/2)*S.Z+SW/2,y:(y-S.CY)*S.Z+S.OY}}
function engGridOk(i,j){return i>=0&&i<=S.G&&j>=EJ0&&j<=EJ1}
function engSpent(){return S.beams.reduce(function(s,b){return s+b.cost},0)}
function engLeft(){return S.budget-engSpent()}
function engSnap(){
  return JSON.stringify({n:S.nodes.filter(function(n){return!n.fixed}).map(function(n){return[n.i,n.j]}),
    b:S.beams.map(function(b){return[b.A.i,b.A.j,b.B.i,b.B.j,b.type]})});
}
function engRestore(js){
  var d=JSON.parse(js);S.nodes=S.nodes.filter(function(n){return n.fixed});S.beams=[];S.sel=null;
  d.n.forEach(function(p){engMk(p[0],p[1],false)});
  d.b.forEach(function(p){engPush(engAt(p[0],p[1]),engAt(p[2],p[3]),p[4])});
}
function engPush(A,B,type){
  var L=Math.hypot(B.hx-A.hx,B.hy-A.hy);
  var b={A:A,B:B,type:type,L:L,cost:engCost(L,type),r:0,F:0,dead:false,k:0,c:0,ft:0,fc:0};
  S.beams.push(b);return b;
}
function engTry(A,gi,gj,type){
  if(!A){S.msg="Start from a dot.";return false}
  if(!engGridOk(gi,gj)){S.msg="Build between the cliffs.";return false}
  var Bn=engAt(gi,gj);
  if(A===Bn)return false;
  if(!Bn&&(gi===0||gi===S.G)){S.msg="Join the cliff at a bolt.";return false}
  var len=Math.hypot(gi-A.i,gj-A.j);
  if(len>EMAXL+1e-6){S.msg="Too long! A beam can reach about 3 squares.";return false}
  var cost=engCost(len*EU,type);
  if(cost>engLeft()){S.msg="Not enough money left for that beam.";return false}
  if(Bn&&S.beams.some(function(b){return(b.A===A&&b.B===Bn)||(b.A===Bn&&b.B===A)})){S.msg="There is already a beam there.";return false}
  S.hist.push(engSnap());if(S.hist.length>40)S.hist.shift();
  if(!Bn)Bn=engMk(gi,gj,false);
  engPush(A,Bn,type);S.msg="";SFX.plank();engUI();return Bn;
}
function engClean(){
  S.nodes=S.nodes.filter(function(n){return n.fixed||S.beams.some(function(b){return b.A===n||b.B===n})});
}
function engErase(x,y){
  var best=null,bd=14;
  S.beams.forEach(function(b){
    var ax=b.A.x,ay=b.A.y,bx=b.B.x,by=b.B.y,dx=bx-ax,dy=by-ay,t=Math.max(0,Math.min(1,((x-ax)*dx+(y-ay)*dy)/(dx*dx+dy*dy)));
    var d=Math.hypot(x-(ax+dx*t),y-(ay+dy*t));if(d<bd){bd=d;best=b}
  });
  var nb=null,nd=14;
  S.nodes.forEach(function(n){if(n.fixed)return;var d=Math.hypot(x-n.x,y-n.y);if(d<nd){nd=d;nb=n}});
  if(!best&&!nb)return;
  S.hist.push(engSnap());
  if(nb)S.beams=S.beams.filter(function(b){return b.A!==nb&&b.B!==nb});else S.beams=S.beams.filter(function(b){return b!==best});
  engClean();S.sel=null;SFX.thud();engUI();
}
/* ---------- physics ---------- */
function engPrep(){
  S.nodes.forEach(function(n){n.m=.6;n.vx=n.vy=0;n.x=n.hx;n.y=n.hy});
  S.beams.forEach(function(b){var m=EMAT[b.type],w=m.w*b.L/EU;b.A.m+=w/2;b.B.m+=w/2;b.dead=false;b.r=0;b.F=0;
    b.k=m.k*EU/b.L;b.ft=m.ft;b.fc=m.fc*Math.min(1,1.2*EU/b.L)});
  S.beams.forEach(function(b){var ma=b.A.fixed?b.B.m:b.A.m,mb=b.B.fixed?b.A.m:b.B.m;b.c=2*.35*Math.sqrt(b.k*(ma*mb/(ma+mb)))});
  S.truck={x:26,y:S.CY,vy:0,ang:0,state:"drive",t:0,sup:null,out:""};
}
function engReset(){
  S.nodes.forEach(function(n){n.x=n.hx;n.y=n.hy;n.vx=n.vy=0});
  S.beams.forEach(function(b){b.dead=false;b.r=0;b.F=0});
  S.truck={x:26,y:S.CY,vy:0,ang:0,state:"wait",t:0,sup:null,out:""};
}
function engSupport(x){
  var best=null,by=1e9;
  for(var i=0;i<S.beams.length;i++){
    var b=S.beams[i];if(b.dead||b.type!=="road")continue;
    var x1=b.A.x,x2=b.B.x;if(x1>x2){var q=x1;x1=x2;x2=q}
    if(x<x1||x>x2||x2-x1<1)continue;
    var t=(x-b.A.x)/(b.B.x-b.A.x),y=b.A.y+(b.B.y-b.A.y)*t;
    if(y<by){by=y;best={b:b,t:t,y:y}}
  }
  return best;
}
function engSub(h){
  var N=S.nodes,B=S.beams,i,T=S.truck;
  for(i=0;i<N.length;i++){var n=N[i];n.fx=0;n.fy=n.fixed?0:n.m*EGR}
  for(i=0;i<B.length;i++){
    var b=B[i];if(b.dead)continue;
    var A=b.A,C=b.B,dx=C.x-A.x,dy=C.y-A.y,d=Math.sqrt(dx*dx+dy*dy)||1e-6,ux=dx/d,uy=dy/d;
    var Fe=b.k*(d-b.L),rv=(C.vx-A.vx)*ux+(C.vy-A.vy)*uy,F=Fe+b.c*rv;
    A.fx+=F*ux;A.fy+=F*uy;C.fx-=F*ux;C.fy-=F*uy;
    b.F=Fe;var r=Fe>=0?Fe/b.ft:-Fe/b.fc;b.r=b.r*.85+r*.15;
    if(b.r>1){b.dead=true;S.snap=true;if(S.sparks.length<80)for(var k=0;k<6;k++)S.sparks.push({x:(A.x+C.x)/2,y:(A.y+C.y)/2,vx:(Math.random()-.5)*5,vy:-Math.random()*4,life:30,c:EMAT[b.type].col})}
  }
  if(T.sup){
    var sb=T.sup.b;
    if(!sb.dead){var W=S.M*EGR,t=T.sup.t;sb.A.fy+=W*(1-t);sb.B.fy+=W*t}
  }
  for(i=0;i<N.length;i++){
    var m=N[i];if(m.fixed)continue;
    m.vx+=m.fx/m.m*h;m.vy+=m.fy/m.m*h;m.vx*=.9985;m.vy*=.9985;
    m.x+=m.vx*h;m.y+=m.vy*h;
  }
}
function engStepFrame(){
  var T=S.truck,i;
  if(T.state==="drive"){
    T.x+=S.speed||2.6;
    var s=T.x>S.LX&&T.x<S.RX?engSupport(T.x):null;
    if(s){T.sup=s;T.y=s.y;var b=s.b;T.ang=Math.atan2(b.B.y-b.A.y,b.B.x-b.A.x);if(T.ang>1.2||T.ang<-1.2)T.ang=0;if(b.B.x<b.A.x)T.ang=Math.atan2(b.A.y-b.B.y,b.A.x-b.B.x)}
    else if(T.x<=S.LX||T.x>=S.RX){T.sup=null;T.y=S.CY;T.ang=0}
    else{T.sup=null;T.vy+=.55;T.y+=T.vy;T.ang=Math.min(.5,T.ang+.02);T.state="lost";T.out="fell";SFX.crack()}
    if(T.state==="drive"&&T.y>S.CY+EU*ESAG){T.state="lost";T.out="sag";T.sup=null;SFX.crack()}
    if(T.state==="drive"&&T.x>=S.RX+EU*1.6){T.state="won"}
  }else if(T.state==="lost"){
    T.sup=null;T.vy+=.55;T.y+=T.vy;
  }
  var h=1/60/ESUB;
  for(i=0;i<ESUB;i++)engSub(h);
  if(S.snap){S.snap=false;if(sfxRate("snap",6))SFX.crack()}
  if(T.state==="won"||T.state==="lost"){T.t++;
    if(T.t===60){engResult(T.state==="won")}}
}
function engCheck(){ /* run a whole trip instantly: used by tests */
  engPrep();var n=0;while(S.truck.t<62&&n<4000){engStepFrame();n++}
  var T=S.truck;return{won:T.state==="won",out:T.out,dead:S.beams.filter(function(b){return b.dead}).length,maxr:Math.max.apply(null,[0].concat(S.beams.map(function(b){return b.r})))}
}
function etick(){
  S.f++;
  S.sparks.forEach(function(p){p.x+=p.vx;p.y+=p.vy;p.vy+=.25;p.life--});S.sparks=S.sparks.filter(function(p){return p.life>0});
  if(S.mode==="test"||S.mode==="result")engStepFrame();
  else if(S.celebrate>0){S.celebrate--}
}
/* ---------- drawing ---------- */
function engCol(r){r=Math.max(0,Math.min(1,r));return"hsl("+Math.round(205-205*r)+",78%,"+(46+8*(1-r))+"%)"}
function edraw(){
  var c=S.ctx;c.setTransform(S.dpr,0,0,S.dpr,0,0);
  var sky=isDark()?"#2b3a5e":"#d8e8f8";
  c.fillStyle=sky;c.fillRect(0,0,SW,SH);
  c.fillStyle="#f6c453";c.beginPath();c.arc(730,56,24,0,6.283);c.fill();
  c.fillStyle="rgba(255,255,255,.8)";
  [[120,60],[420,40]].forEach(function(p,i){var x=((p[0]+S.f*.12*(i+1))%900)-60;c.beginPath();c.arc(x,p[1],16,0,6.283);c.arc(x+20,p[1]-7,20,0,6.283);c.arc(x+40,p[1],15,0,6.283);c.fill()});
  var LX=S.LX,RX=S.RX,CY=S.CY,WY=S.WY;
  c.save();c.translate(SW/2,S.OY);c.scale(S.Z,S.Z);c.translate(-SW/2,-CY);
  c.fillStyle="#3b82c4";c.fillRect(LX,WY,RX-LX,700);
  c.strokeStyle="rgba(255,255,255,.55)";c.lineWidth=2;c.lineCap="round";
  for(var wx=LX+14;wx<RX-14;wx+=36){var wy=WY+18+Math.sin((S.f+wx)*.07)*3;c.beginPath();c.moveTo(wx,wy);c.quadraticCurveTo(wx+9,wy-5,wx+18,wy);c.stroke()}
  c.fillStyle="#7b5a3c";c.fillRect(-700,CY,LX+700,700);c.fillRect(RX,CY,SW-RX+700,700);
  c.fillStyle="#5a9b5f";c.fillRect(-700,CY,LX+700,9);c.fillRect(RX,CY,SW-RX+700,9);
  c.strokeStyle="rgba(0,0,0,.12)";c.lineWidth=2;
  for(var sy=CY+50;sy<CY+400;sy+=46){c.beginPath();c.moveTo(-700,sy);c.lineTo(LX-6,sy+4);c.moveTo(RX+6,sy+4);c.lineTo(SW+700,sy);c.stroke()}
  var editing=S.mode==="edit";
  if(editing){
    c.fillStyle="rgba(19,32,67,.22)";
    for(var gi=1;gi<S.G;gi++)for(var gj=EJ0;gj<=EJ1;gj++){c.beginPath();c.arc(LX+gi*EU,CY+gj*EU,2.2,0,6.283);c.fill()}
  }
  if(S.hint){
    c.setLineDash([6,5]);c.strokeStyle="rgba(23,138,76,.75)";c.lineWidth=3;
    engRef(S.G).forEach(function(b){c.beginPath();c.moveTo(LX+b[0]*EU,CY+b[1]*EU);c.lineTo(LX+b[2]*EU,CY+b[3]*EU);c.stroke()});
    c.setLineDash([]);
  }
  var testing=S.mode==="test"||S.mode==="result";
  S.beams.forEach(function(b){
    if(b.dead)return;var m=EMAT[b.type];
    c.lineCap="butt";c.strokeStyle=m.edge;c.lineWidth=m.wd+3;c.beginPath();c.moveTo(b.A.x,b.A.y);c.lineTo(b.B.x,b.B.y);c.stroke();
    c.strokeStyle=testing?engCol(b.r):m.col;c.lineWidth=m.wd;c.beginPath();c.moveTo(b.A.x,b.A.y);c.lineTo(b.B.x,b.B.y);c.stroke();
  });
  if(S.mode==="edit"&&S.pd&&S.pd.n&&S.pm){
    var g=S.hoverG,ok=g&&engGridOk(g.i,g.j)&&Math.hypot(g.i-S.pd.n.i,g.j-S.pd.n.j)<=EMAXL+1e-6;
    c.setLineDash([5,5]);c.lineWidth=4;c.strokeStyle=ok?(S.tool==="steel"?EMAT.steel.edge:EMAT.road.edge):"#c62f3d";
    c.beginPath();c.moveTo(S.pd.n.x,S.pd.n.y);if(g)c.lineTo(LX+g.i*EU,CY+g.j*EU);else c.lineTo(S.pm.x,S.pm.y);c.stroke();c.setLineDash([]);
  }
  S.nodes.forEach(function(n){
    c.beginPath();
    if(n.fixed){c.fillStyle="#46527a";c.fillRect(n.x-6,n.y-6,12,12);c.fillStyle="#fff";c.beginPath();c.arc(n.x,n.y,2.2,0,6.283);c.fill()}
    else{c.fillStyle="#fff";c.strokeStyle="#132043";c.lineWidth=2.5;c.arc(n.x,n.y,6,0,6.283);c.fill();c.stroke()}
    if(S.sel===n&&editing){c.strokeStyle="#f5a800";c.lineWidth=3.5;c.beginPath();c.arc(n.x,n.y,11,0,6.283);c.stroke()}
  });
  if(editing&&S.hoverG&&engGridOk(S.hoverG.i,S.hoverG.j)){c.strokeStyle="rgba(47,91,234,.7)";c.lineWidth=2;c.beginPath();c.arc(LX+S.hoverG.i*EU,CY+S.hoverG.j*EU,9,0,6.283);c.stroke()}
  etruck(c,S.truck);
  S.sparks.forEach(function(p){c.globalAlpha=Math.max(0,p.life/30);c.fillStyle=p.c;c.fillRect(p.x-2,p.y-2,4,4)});c.globalAlpha=1;
  c.restore();
  if(S.celebrate>0){c.globalAlpha=Math.min(1,S.celebrate/30);c.font="800 44px Fredoka, sans-serif";c.textAlign="center";c.fillStyle="#f5a800";c.strokeStyle="#132043";c.lineWidth=6;c.strokeText("Bridge built!",SW/2,90);c.fillText("Bridge built!",SW/2,90);c.globalAlpha=1;c.textAlign="start"}
}
function etruck(c,T){
  c.save();c.translate(T.x,T.y);c.rotate(T.ang||0);
  c.fillStyle="#e8503a";c.strokeStyle="#132043";c.lineWidth=2;
  c.beginPath();c.rect(-28,-30,38,20);c.fill();c.stroke();
  c.fillStyle="#f58a3a";c.beginPath();c.moveTo(10,-30);c.lineTo(22,-30);c.lineTo(30,-18);c.lineTo(30,-10);c.lineTo(10,-10);c.closePath();c.fill();c.stroke();
  c.fillStyle="#bfe3ff";c.fillRect(14,-27,8,8);
  c.fillStyle="#2b2f45";[-16,18].forEach(function(wx){c.beginPath();c.arc(wx,-8,8,0,6.283);c.fill();c.fillStyle="#cfd4e6";c.beginPath();c.arc(wx,-8,3,0,6.283);c.fill();c.fillStyle="#2b2f45"});
  c.fillStyle="#132043";c.font="800 11px Nunito, sans-serif";c.textAlign="center";c.fillText(S.M.toFixed(0)+" t",-9,-16);c.textAlign="start";
  c.restore();
}
/* ---------- host UI for the practice pages ---------- */
var HOST=null,S=null,AC=null;
var SND_KEY='sling_sound',MODE_KEY='sling_mode',GAME_KEY='kids_game';
function lsGet(k){try{return localStorage.getItem(k)}catch(e){return null}}
function lsSet(k,v){try{localStorage.setItem(k,v)}catch(e){}}
var soundOn=lsGet(SND_KEY)!=='0';
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
 thud:function(){tone(170,60,.1,'square',.1)},
 crack:function(){noise(.2,.28,900);tone(320,70,.16,'square',.12)},
 pop:function(){tone(420,950,.1,'sine',.22);tone(950,220,.16,'triangle',.14,.07)},
 ding:function(){tone(660,660,.12,'sine',.18);tone(990,990,.2,'sine',.18,.1)},
 plank:function(){tone(240,170,.09,'square',.12);tone(520,300,.1,'triangle',.1,.03)},
 level:function(){[523,659,784,1047].forEach(function(f,i){tone(f,f,.2,'triangle',.2,i*.12)})}
};
function sfxRate(name,gap){if(!S)return false;S.sf=S.sf||{};if((S.f||0)-(S.sf[name]||-99)<gap)return false;S.sf[name]=S.f||0;return true}
function unlock(){}
function isDark(){try{return window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches}catch(e){return false}}
function off(){return lsGet(MODE_KEY)==='0'}
function chosen(){return lsGet(GAME_KEY)==='bridge'}
function active(){return!off()&&chosen()}
function css(){
  if(document.getElementById('bridge-css'))return;
  var st=document.createElement('style');st.id='bridge-css';
  st.textContent=
   '.bridge-host{margin:12px 0}'+
   '.br-bar{display:flex;flex-wrap:wrap;gap:6px;margin:0 0 8px}'+
   '.br-pill{font:inherit;color:var(--ink,#222);font-weight:800;font-size:13px;background:var(--card,#fff);border:2px solid var(--line,#ddd);border-radius:99px;padding:3px 11px;white-space:nowrap}'+
   'button.br-pill{cursor:pointer}'+
   '.br-arena{border:2px solid var(--line,#ddd);border-radius:16px;overflow:hidden}'+
   '.br-arena canvas{display:block;width:100%;height:auto;aspect-ratio:2/1;touch-action:none;cursor:crosshair}'+
   '.br-hint{margin:8px 2px 0;font-size:14px;font-weight:700;color:var(--indigo,#2B3A67)}'+
   '.br-hint.flash{color:var(--teal,#2A9D8F)}'+
   '.br-tools{display:flex;flex-wrap:wrap;gap:6px;margin:8px 0 0}'+
   '.br-btn{font:inherit;font-weight:800;font-size:14px;cursor:pointer;border-radius:999px;padding:7px 14px;border:2px solid var(--indigo,#2B3A67);background:transparent;color:var(--indigo,#2B3A67);white-space:nowrap}'+
   '.br-btn.on,.br-btn.go{background:var(--indigo,#2B3A67);color:var(--bg,#fff)}'+
   '.br-btn:disabled{opacity:.4;cursor:default}'+
   '.br-res{margin:8px 0 0;padding:12px 14px;border:2px solid var(--line,#ddd);border-radius:14px;background:var(--card,#fff);color:var(--ink,#222)}'+
   '.br-res b{display:block;font-size:16px;margin-bottom:4px}.br-res small{display:block;opacity:.75;font-size:13px;line-height:1.4;margin-bottom:8px}';
  document.head.appendChild(st);
}
function stopArena(){
  if(S){S.stop=true;if(S.raf)cancelAnimationFrame(S.raf);S=null}
  if(HOST&&HOST.parentNode)HOST.parentNode.removeChild(HOST);
  HOST=null;
}
function buildArena(){
  var st=document.getElementById('st');if(!st||!st.parentNode)return;
  css();
  HOST=document.createElement('div');HOST.className='bridge-host';HOST.id='bridge-host';
  HOST.innerHTML=
   '<div class="br-bar"><span class="br-pill" id="br-lvl"></span><span class="br-pill" id="br-bud"></span><span class="br-pill" id="br-trip"></span><button class="br-pill" id="br-snd" aria-pressed="true"></button></div>'+
   '<div class="br-arena"><canvas id="br-cv" aria-label="Bridge Engineer. Build a bridge so the truck can cross the river."></canvas></div>'+
   '<p class="br-hint" id="br-hint"></p>'+
   '<div id="br-panel"><div class="br-tools"><button class="br-btn br-tool" data-t="road">Road</button><button class="br-btn br-tool" data-t="steel">Steel</button><button class="br-btn br-tool" data-t="erase">Erase</button>'+
   '<button class="br-btn" id="br-undo">Undo</button><button class="br-btn" id="br-clear">Clear</button><button class="br-btn" id="br-hintb">Hint</button><button class="br-btn go" id="br-test">Test the truck</button></div></div>'+
   '<div id="br-res"></div>';
  st.parentNode.insertBefore(HOST,st);
  var cv=document.getElementById('br-cv'),dpr=Math.min(2,window.devicePixelRatio||1);
  cv.width=SW*dpr;cv.height=SH*dpr;
  S={kind:'eng',cv:cv,ctx:cv.getContext('2d'),dpr:dpr,cleared:0,mode:'edit',tool:'road',trips:0,celebrate:0,last:0,acc:0,stop:false,raf:0,f:0,speed:2.6,sf:{}};
  engLevel(1);
  function pt(ev){var r=cv.getBoundingClientRect(),sx=(ev.clientX-r.left)*SW/r.width,sy=(ev.clientY-r.top)*SH/r.height;return{x:(sx-SW/2)/S.Z+SW/2,y:(sy-S.OY)/S.Z+S.CY}}
  function snap(p){var i=Math.round((p.x-S.LX)/EU),j=Math.round((p.y-S.CY)/EU);return engGridOk(i,j)&&Math.hypot(p.x-(S.LX+i*EU),p.y-(S.CY+j*EU))<EU*.55?{i:i,j:j}:null}
  cv.addEventListener('pointerdown',function(ev){
    if(!S||S.mode!=='edit')return;ev.preventDefault();var p=pt(ev);
    try{cv.setPointerCapture(ev.pointerId)}catch(e){}
    if(S.tool==='erase'){engErase(p.x,p.y);return}
    var g=snap(p);S.pm=p;S.hoverG=g;
    S.pd={n:g?engAt(g.i,g.j):null,x:p.x,y:p.y};
    if(!S.pd.n&&!S.sel)S.msg='Start from a dot or bolt (tap a joint first).';
    engUI();
  });
  cv.addEventListener('pointermove',function(ev){if(!S||S.mode!=='edit')return;var p=pt(ev);S.pm=p;S.hoverG=snap(p)});
  cv.addEventListener('pointerup',function(ev){
    if(!S||S.mode!=='edit'||S.tool==='erase')return;ev.preventDefault();
    var p=pt(ev),g=snap(p),st=S.pd;S.pd=null;S.pm=null;
    if(!g){S.msg='Let go on a dot.';engUI();return}
    var nUp=engAt(g.i,g.j);
    if(st&&st.n&&st.n!==nUp){S.sel=null;engTry(st.n,g.i,g.j,S.tool)}
    else if(st&&st.n&&st.n===nUp){
      if(S.sel&&S.sel!==nUp){var a=S.sel;S.sel=null;var nb=engTry(a,g.i,g.j,S.tool);if(nb)S.sel=nb}
      else S.sel=S.sel===nUp?null:nUp;
    }else if(S.sel){var a2=S.sel;S.sel=null;var nb2=engTry(a2,g.i,g.j,S.tool);if(nb2)S.sel=nb2}
    engUI();
  });
  cv.addEventListener('pointercancel',function(){if(S){S.pd=null;S.pm=null}});
  var sb=document.getElementById('br-snd');
  function sbl(){sb.textContent='Sound: '+(soundOn?'On':'Off');sb.setAttribute('aria-pressed',soundOn?'true':'false')}
  sb.onclick=function(){soundOn=!soundOn;lsSet(SND_KEY,soundOn?'1':'0');sbl();if(soundOn)SFX.ding()};
  sbl();
  HOST.querySelectorAll('.br-tool').forEach(function(b){b.onclick=function(){S.tool=b.dataset.t;S.sel=null;S.msg='';engUI()}});
  document.getElementById('br-undo').onclick=function(){if(S.mode!=='edit'||!S.hist.length)return;engRestore(S.hist.pop());engUI()};
  document.getElementById('br-clear').onclick=function(){if(S.mode!=='edit'||!S.beams.length)return;S.hist.push(engSnap());S.beams=[];engClean();S.sel=null;engUI()};
  document.getElementById('br-hintb').onclick=function(){S.hint=!S.hint;this.textContent=S.hint?'Hide hint':'Hint'};
  document.getElementById('br-test').onclick=engTest;
  engUI();S.raf=requestAnimationFrame(loop);
}
function loop(t){
  if(!S||S.stop||!document.body.contains(S.cv))return;
  var dt=Math.min(50,t-(S.last||t));S.last=t;S.acc+=dt;
  while(S.acc>=16.67&&S){S.acc-=16.67;etick()}
  if(S){edraw();S.raf=requestAnimationFrame(loop)}
}
function engUI(){
  if(!S)return;
  var a=function(id,t){var e=document.getElementById(id);if(e)e.textContent=t};
  a('br-lvl','Level '+S.level+' | Bridges: '+S.cleared);
  a('br-bud','Money: $'+engLeft()+' / $'+S.budget);
  a('br-trip','Truck trips: '+S.trips);
  var h='',fl=false;
  if(S.flash){h=S.flash;fl=true}
  else if(S.mode==='edit'){
    h=S.msg||(S.beams.length?(S.trips>0?'Triangles make a bridge strong. Test it when you are ready.':'Keep building, then answer a question right to earn truck trips.'):'Join the bolts across the river. Drag from a dot to another dot. Brown road is for the truck. Steel is stronger.');
  }else if(S.mode==='test')h='Here comes the '+S.M.toFixed(0)+' ton truck...';
  var e=document.getElementById('br-hint');if(e){e.textContent=h;e.className='br-hint'+(fl?' flash':'')}
  var tb=document.getElementById('br-test');if(tb){tb.disabled=S.mode!=='edit'||S.trips<=0;tb.textContent=S.trips>0?'Test the truck':'Test (need a trip)'}
  var pn=document.getElementById('br-panel');if(pn)pn.style.display=S.mode==='result'?'none':'';
  HOST&&HOST.querySelectorAll('.br-tool').forEach(function(b){b.classList.toggle('on',b.dataset.t===S.tool)});
}
function award(){
  if(!S)return;
  S.trips+=2;SFX.ding();S.flash='+2 truck trips! Build your bridge, then test it.';
  engUI();
  clearTimeout(S.ft);S.ft=setTimeout(function(){if(S){S.flash='';engUI()}},2400);
}
function engTest(){
  if(!S||S.mode!=='edit'||S.trips<=0)return;
  if(!S.beams.some(function(b){return b.type==='road'})){S.msg='The truck needs a road. Build some brown road beams across the river.';engUI();return}
  S.trips--;S.sel=null;S.pd=null;S.mode='test';S.hint=false;S.flash='';
  var hb=document.getElementById('br-hintb');if(hb)hb.textContent='Hint';
  engPrep();SFX.pop();engUI();
}
function engResult(won){
  if(!S)return;
  S.mode='result';var res=document.getElementById('br-res');
  if(won){
    S.cleared++;S.celebrate=90;SFX.level();
    res.innerHTML='<div class="br-res"><b>The truck made it across! Bridge '+S.cleared+' built.</b><small>Next up: a wider river and a heavier truck.</small><button class="br-btn go" id="br-go">Next bridge</button></div>';
    document.getElementById('br-go').onclick=function(){res.innerHTML='';S.level++;engLevel(S.level);S.mode='edit';engUI()};
  }else{
    var why=S.truck.out==='sag'?'The bridge sagged too low.':S.truck.out==='fell'?'There was a gap in the road.':'The bridge broke.';
    var broke=S.beams.some(function(b){return b.dead});
    var tip=broke?'Red beams were carrying too much. Add triangles near where it broke.':'Make sure brown road beams connect from one cliff bolt to the other.';
    res.innerHTML='<div class="br-res"><b>'+why+'</b><small>'+tip+(S.trips>0?' You have '+S.trips+' truck trip'+(S.trips===1?'':'s')+' left.':' Answer the next question right to earn more trips.')+'</small><button class="br-btn go" id="br-fix">Fix my bridge</button></div>';
    document.getElementById('br-fix').onclick=function(){res.innerHTML='';engReset();S.mode='edit';engUI()};
  }
  engUI();
}
function safe(fn){try{return fn()}catch(e){try{console.error('Bridge Engineer:',e)}catch(x){}}}
function wrap(name,fn){
  var orig=window[name];
  if(typeof orig!=='function'||orig.__bridge)return false;
  var w=function(){return fn.call(this,orig,arguments)};
  w.__bridge=true;window[name]=w;return true;
}
function attach(opts){
  opts=opts||{};
  var ansName=opts.answer||(typeof window.next==='function'?'next':'record');
  wrap('home',function(orig,args){safe(stopArena);return orig.apply(this,args)});
  wrap('start',function(orig,args){
    safe(stopArena);
    var r=orig.apply(this,args);
    if(active())safe(buildArena);
    return r;
  });
  wrap(ansName,function(orig,args){
    var r=orig.apply(this,args);
    if(args[0]&&S)safe(award);
    if(S&&ansName==='next')safe(function(){window.scrollTo(0,0)});
    return r;
  });
  if(ansName!=='next')wrap('advance',function(orig,args){var r=orig.apply(this,args);if(S)safe(function(){window.scrollTo(0,0)});return r});
}
window.Bridge={attach:attach,isOn:active,_state:function(){return S},_award:award,_api:{engLevel:engLevel,engRef:engRef,engAt:engAt,engMk:engMk,engPush:engPush,engCheck:engCheck,engLeft:engLeft,engScr:engScr,engTest:engTest,engUI:engUI,EU:EU,SW:SW,SH:SH}};
})();
