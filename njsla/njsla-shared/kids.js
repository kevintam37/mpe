/* Shared helpers for the Kindergarten / 1st / 2nd grade practice pages */
NJ.subjects=[
 {id:'math',name:'Math',blurb:''},
 {id:'ela',name:'Reading & Language',blurb:''},
 {id:'sci',name:'Science',blurb:''},
 {id:'ss',name:'Social Studies',blurb:''}];
const KS=(a,b,c,d)=>[a,b,c,d].forEach((x,i)=>NJ.subjects[i].blurb=x);
const KN=['Mia','Leo','Ava','Sam','Zoe','Ben','Lily','Max','Ella','Noah','Ivy','Eli'];
/* multiple choice with 3 choices (default for Kindergarten and 1st grade) */
const mk3=(R,q,c,d,e,x,sort)=>mk(R,q,c,d,e,x,sort,3);
/* a row of emoji, wrapped every `per` items */
const eRow=(e,n,per)=>{per=per||5;let s='';for(let i=0;i<n;i++){s+=e+(((i+1)%per===0&&i<n-1)?'<br>':' ')}return `<div class="pics"><div class="pic emo">${s}</div></div>`};
const eTwo=(e1,n1,e2,n2)=>`<div class="pics"><div class="pic emo">${(e1+' ').repeat(n1)}</div><div class="pic emo">${(e2+' ').repeat(n2)}</div></div>`;
const eBig=t=>`<div class="pics"><div class="pic emo" style="font-size:44px">${t}</div></div>`;
/* whole-number multiple choice, ascending order, 3 or 4 choices */
function kn(R,q,ans,cands,exp,extra,total){
 total=total||3;const seen=new Set([ans]),d=[];
 [...R.shuffle(cands||[]),ans+1,ans-1,ans+2,ans-2,ans+10,ans+3,ans-3].forEach(x=>{if(Number.isInteger(x)&&x>=0&&!seen.has(x)){seen.add(x);d.push(x)}});
 return mk(R,q,String(ans),d.map(String),exp,extra,true,total)}
/* passage question sets: bank items {t,x,qs:[[q,correct,[wrong...],exp],...]}; choices = wrong.length+1 */
function rdGen(bank){return(R,n)=>{const out=[],ps=R.shuffle(bank);
 for(const p of ps){if(out.length>=n)break;const qs=R.shuffle(p.qs).slice(0,n-out.length);
  qs.forEach(([q,c,d,e])=>out.push(mk(R,q,c,d,e,{pass:`<h4>${p.t}</h4>${p.x}`},false,d.length+1)))}
 return out.slice(0,n)}}
/* simple bank of [q,correct,[wrong],exp,extra] */
const bankGen=(B,total)=>(R,n)=>R.sample(B,Math.min(n,B.length)).map(([q,c,d,e,x])=>mk(R,q,c,d,e,x,false,total||(d.length+1)));
/* dictation: child hears the word (and a sentence) and types it */
const dictQ=(w,sent)=>txt('Tap 🔊 and listen. Type the word you hear.',[w],`The word is <b>${w}</b>.`,{say:`${w}. ${sent||''} ${w}.`});
/* picture lexicon: [emoji, word] with clear names */
const LEX=[['🐱','cat'],['🐶','dog'],['🐷','pig'],['🐸','frog'],['🐟','fish'],['🐝','bee'],['🐻','bear'],['🐰','rabbit'],['🦆','duck'],['🐴','horse'],['🐮','cow'],['🐔','hen'],['🍎','apple'],['🍌','banana'],['🌞','sun'],['🌙','moon'],['⭐','star'],['🌳','tree'],['🌸','flower'],['🏠','house'],['🚗','car'],['🚌','bus'],['⚽','ball'],['🎈','balloon'],['🪑','chair'],['👟','shoe'],['🧦','sock'],['🎩','hat'],['🔑','key'],['🥄','spoon'],['🍴','fork'],['🥕','carrot'],['🍞','bread'],['🥚','egg'],['🥛','milk'],['🧀','cheese'],['🚪','door'],['🛏️','bed'],['📖','book'],['✏️','pencil'],['⛵','boat'],['🚂','train'],['🐢','turtle'],['🦋','butterfly'],['🐘','elephant'],['🦁','lion'],['🐵','monkey'],['🐙','octopus'],['🍕','pizza'],['🍦','ice cream']];
const lexW=w=>LEX.find(x=>x[1]===w);
const SHCOL=['#4C8DF6','#E0457B','#2A9D8F','#F4A340','#9B6BD6'];
function shpSVG(name,col,sz){col=col||'#4C8DF6';sz=sz||100;
 const P={circle:`<circle cx="50" cy="45" r="38"/>`,square:`<rect x="14" y="9" width="72" height="72"/>`,rectangle:`<rect x="5" y="22" width="90" height="46"/>`,
  triangle:`<polygon points="50,6 92,80 8,80"/>`,hexagon:`<polygon points="27,8 73,8 96,45 73,82 27,82 4,45"/>`,oval:`<ellipse cx="50" cy="45" rx="45" ry="28"/>`,
  pentagon:`<polygon points="50,5 94,37 77,86 23,86 6,37"/>`,rhombus:`<polygon points="50,4 92,45 50,86 8,45"/>`,'trapezoid':`<polygon points="28,14 72,14 94,76 6,76"/>`}[name];
 return `<svg viewBox="0 0 100 90" width="${sz}" height="${sz*.9}" role="img" aria-label="${name}"><g fill="${col}" fill-opacity=".6" stroke="currentColor" stroke-width="3" stroke-linejoin="round">${P}</g></svg>`}
const shpPic=(name,col)=>`<div class="pics"><div class="pic" style="padding:6px">${shpSVG(name,col,120)}</div></div>`;
/* ---- pictures for grades 1 and 2 ---- */
function clockSVG(h,m){let s=`<circle cx="70" cy="70" r="62" fill="none" stroke="currentColor" stroke-width="3"/>`;
 for(let k=1;k<=12;k++){const a=k*Math.PI/6;s+=`<text x="${70+48*Math.sin(a)}" y="${75-48*Math.cos(a)}" font-size="14" font-weight="700" text-anchor="middle" fill="currentColor">${k}</text>`}
 for(let k=0;k<60;k++){const a=k*Math.PI/30,r1=k%5?57:54;s+=`<line x1="${70+r1*Math.sin(a)}" y1="${70-r1*Math.cos(a)}" x2="${70+60*Math.sin(a)}" y2="${70-60*Math.cos(a)}" stroke="currentColor" stroke-width="1"/>`}
 const am=m*Math.PI/30,ah=((h%12)+m/60)*Math.PI/6;
 s+=`<line x1="70" y1="70" x2="${70+30*Math.sin(ah)}" y2="${70-30*Math.cos(ah)}" stroke="currentColor" stroke-width="6" stroke-linecap="round"/><line x1="70" y1="70" x2="${70+46*Math.sin(am)}" y2="${70-46*Math.cos(am)}" stroke="#E0457B" stroke-width="3.5" stroke-linecap="round"/><circle cx="70" cy="70" r="4" fill="currentColor"/>`;
 return svgW(140,140,s,'analog clock')}
const T12=(h,m)=>{h=((h-1+24)%12)+1;return `${h}:${String(m).padStart(2,'0')}`};
const COIN={1:['#C98A5A','penny'],5:['#B8BCC4','nickel'],10:['#D5D8DE','dime'],25:['#B8BCC4','quarter']};
function coinsPic(list){const r={1:19,5:22,10:17,25:26};let x=4,s='',H=60;
 list.forEach(c=>{const R=r[c];s+=`<g><circle cx="${x+R}" cy="${R+4}" r="${R}" fill="${COIN[c][0]}" stroke="currentColor" stroke-width="2"/><text x="${x+R}" y="${R+9}" font-size="${c===25||c===10?13:14}" font-weight="700" text-anchor="middle" fill="#222">${c}¢</text></g>`;x+=2*R+8});
 return svgW(Math.max(x,60),H,s,'coins')}
function blocksSVG(h,t,o){let x=4,s='';const Y=4;
 for(let i=0;i<h;i++){s+=`<rect x="${x}" y="${Y}" width="48" height="48" fill="#4C8DF6" fill-opacity=".45" stroke="currentColor" stroke-width="1.5"/>`;for(let k=1;k<10;k++)s+=`<line x1="${x+k*4.8}" y1="${Y}" x2="${x+k*4.8}" y2="${Y+48}" stroke="currentColor" stroke-opacity=".3"/><line x1="${x}" y1="${Y+k*4.8}" x2="${x+48}" y2="${Y+k*4.8}" stroke="currentColor" stroke-opacity=".3"/>`;x+=56}
 for(let i=0;i<t;i++){s+=`<rect x="${x}" y="${Y}" width="9" height="48" fill="#F4A340" fill-opacity=".7" stroke="currentColor" stroke-width="1.5"/>`;for(let k=1;k<10;k++)s+=`<line x1="${x}" y1="${Y+k*4.8}" x2="${x+9}" y2="${Y+k*4.8}" stroke="currentColor" stroke-opacity=".5"/>`;x+=14}
 if(t)x+=8;
 for(let i=0;i<o;i++){const c=Math.floor(i/5),r=i%5;s+=`<rect x="${x+c*13}" y="${Y+r*10}" width="9" height="9" fill="#E0457B" fill-opacity=".7" stroke="currentColor" stroke-width="1.2"/>`}
 x+=Math.ceil(o/5)*13+4;return svgW(Math.max(x,50),60,s,'base ten blocks')}
function tallySVG(n){let s='',x=6;for(let g=0;g<Math.ceil(n/5);g++){const k=Math.min(5,n-g*5);for(let i=0;i<Math.min(k,4);i++)s+=`<line x1="${x+i*8}" y1="6" x2="${x+i*8}" y2="38" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>`;if(k===5)s+=`<line x1="${x-4}" y1="32" x2="${x+30}" y2="12" stroke="#E0457B" stroke-width="3" stroke-linecap="round"/>`;x+=46}return svgW(Math.max(x,50),44,s,'tally marks')}
function barG(cats,vals,ttl,unit){const W=50+cats.length*54,H=170,base=132,top=22,mx=Math.max(Math.ceil(Math.max(...vals)/ (unit||1)),2)+1,ph=(base-top)/mx;
 let s=`<text x="${W/2}" y="13" font-size="13" text-anchor="middle" font-weight="700" fill="currentColor">${ttl}</text>`;
 for(let v=0;v<=mx;v++){const y=base-v*ph;s+=`<line x1="34" y1="${y}" x2="${W-6}" y2="${y}" stroke="currentColor" stroke-opacity=".2"/><text x="28" y="${y+4}" font-size="11" text-anchor="end" fill="currentColor">${v*(unit||1)}</text>`}
 cats.forEach((c,i)=>{const x=42+i*54,h=vals[i]/(unit||1)*ph;s+=`<rect x="${x}" y="${base-h}" width="36" height="${h}" fill="${SHCOL[i%5]}" fill-opacity=".7" stroke="currentColor" stroke-width="1.5"/><text x="${x+18}" y="${base+16}" font-size="12" text-anchor="middle" fill="currentColor">${c}</text>`});
 s+=`<line x1="34" y1="${top-4}" x2="34" y2="${base}" stroke="currentColor" stroke-width="2"/><line x1="34" y1="${base}" x2="${W-6}" y2="${base}" stroke="currentColor" stroke-width="2"/>`;return svgW(W,H,s,'bar graph')}
/* shape cut into equal (or unequal) parts with some shaded: kind rect|circle, parts 2|3|4 */
function partSVG(kind,parts,shaded,equal){const FLc='#4C8DF6',sh=i=>i<shaded?`fill="${FLc}" fill-opacity=".55"`:'fill="none"';let s='';
 if(kind==='rect'){const W=120,H=80;
  if(parts===2||parts===3){const cuts=equal?Array.from({length:parts-1},(_,i)=>(i+1)/parts):(parts===2?[.3]:[.2,.45]);const b=[0,...cuts,1];for(let i=0;i<parts;i++)s+=`<rect x="${10+b[i]*W}" y="10" width="${(b[i+1]-b[i])*W}" height="${H}" ${sh(i)} stroke="currentColor" stroke-width="2.5"/>`}
  else{const cw=equal?W/2:W*.35,ch=equal?H/2:H*.35;const R=[[0,0,cw,ch],[cw,0,W-cw,ch],[0,ch,cw,H-ch],[cw,ch,W-cw,H-ch]];R.forEach((r,i)=>s+=`<rect x="${10+r[0]}" y="${10+r[1]}" width="${r[2]}" height="${r[3]}" ${sh(i)} stroke="currentColor" stroke-width="2.5"/>`)}
  return svgW(140,100,s,'shape cut into parts')}
 const cx=60,cy=60,r=48;
 if(parts===2){s+=`<path d="M${cx} ${cy-r}A${r} ${r} 0 0 1 ${cx} ${cy+r}Z" ${sh(0)} stroke="currentColor" stroke-width="2.5"/><path d="M${cx} ${cy-r}A${r} ${r} 0 0 0 ${cx} ${cy+r}Z" ${sh(1)} stroke="currentColor" stroke-width="2.5"/>`}
 else{const qs=[[1,-1,1,0],[1,1,0,1],[-1,1,-1,0],[-1,-1,0,-1]];const P=[[cx,cy-r,cx+r,cy],[cx+r,cy,cx,cy+r],[cx,cy+r,cx-r,cy],[cx-r,cy,cx,cy-r]];
  P.forEach((p,i)=>s+=`<path d="M${cx} ${cy}L${p[0]} ${p[1]}A${r} ${r} 0 0 1 ${p[2]} ${p[3]}Z" ${sh(i)} stroke="currentColor" stroke-width="2.5"/>`)}
 return svgW(120,120,s,'circle cut into parts')}
function arrSVG(r,c,e){let s='';for(let i=0;i<r;i++)for(let j=0;j<c;j++)s+=`<circle cx="${14+j*22}" cy="${14+i*22}" r="8" fill="${e||'#E0457B'}"/>`;return svgW(c*22+8,r*22+8,s,`array of ${r} rows and ${c} columns`)}
function rulerSVG(len,unit,max){max=max||10;const sc=unit==='cm'?24:28,W=max*sc+30;let s=`<rect x="10" y="10" width="${len*sc}" height="22" rx="4" fill="#4C8DF6" fill-opacity=".5" stroke="currentColor" stroke-width="2"/><rect x="10" y="44" width="${max*sc}" height="34" fill="#F4A340" fill-opacity=".3" stroke="currentColor" stroke-width="2"/>`;
 for(let i=0;i<=max;i++){s+=`<line x1="${10+i*sc}" y1="44" x2="${10+i*sc}" y2="${i%1===0?60:52}" stroke="currentColor" stroke-width="1.5"/><text x="${10+i*sc}" y="74" font-size="11" text-anchor="middle" fill="currentColor">${i}</text>`}
 s+=`<text x="${W-14}" y="90" font-size="11" text-anchor="end" fill="currentColor">${unit==='cm'?'centimeters':'inches'}</text>`;return svgW(W,96,s,'object and ruler')}
const pf=(a,b)=>fr(a,b);
