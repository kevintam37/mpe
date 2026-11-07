/* Shared helpers for the NJSLA practice pages (grades 3 and 4) */
const rd=x=>+x.toFixed(6);
const gcd=(a,b)=>b?gcd(b,a%b):Math.abs(a);
const comma=s=>{const p=String(s).split('.');return p[0].replace(/\B(?=(\d{3})+(?!\d))/g,',')+(p[1]!==undefined?'.'+p[1]:'')};
const fmtN=x=>comma(rd(x));
const sup=n=>String(n).replace(/\d/g,d=>'⁰¹²³⁴⁵⁶⁷⁸⁹'[d]);
const TBL=(heads,rows)=>`<div class="pics"><div class="pic" style="padding:6px;font-size:14px"><table style="border-collapse:collapse">${heads?`<tr>${heads.map(h=>`<th style="border:1px solid var(--line);padding:5px 9px">${h}</th>`).join('')}</tr>`:''}${rows.map(r=>`<tr>${r.map(c=>`<td style="border:1px solid var(--line);padding:5px 9px;text-align:center">${c}</td>`).join('')}</tr>`).join('')}</table></div></div>`;
const boxHTML=h=>`<div class="pics"><div class="pic" style="font-size:20px;font-weight:700;padding:10px 16px">${h}</div></div>`;
const topicGen=subs=>(R,n)=>gather(n,()=>R.pick(subs)(R));
const NAMES5=['Maya','Leo','Ava','Noah','Zoe','Ben','Lily','Sam','Ella','Max','Ivy','Omar','Nina','Eli'];

/* A number answer: typed (40%) or multiple choice (60%). cands = likely wrong answers (numbers). */
function numQ(R,q,ans,cands,exp,extra){
 const ex=Object.assign({},extra||{});const step=ex.step||1;delete ex.step;
 const fix=x=>fmtN(x);
 if(R.f()<.4)return txt(q,[fix(ans)],exp,Object.assign({num:true},ex));
 const seen=new Set([fix(ans)]),d=[];
 [...R.shuffle(cands),ans+step,ans-step,ans+10*step,ans-10*step,ans*10,ans/10,ans+2*step].forEach(x=>{if(typeof x==='number'&&isFinite(x)&&x>=0&&!seen.has(fix(x))){seen.add(fix(x));d.push(x)}});
 return mk(R,q,fix(ans),d.map(fix),exp,ex,true);
}

const FR=(n,d)=>`<span class="fr"><span>${n}</span><span>${d}</span></span>`;
const lcm=(a,b)=>a/gcd(a,b)*b;
const fr=(n,d)=>{if(d<0){n=-n;d=-d}const g=gcd(n,d)||1;return[n/g,d/g]};
const fadd=(a,b)=>fr(a[0]*b[1]+b[0]*a[1],a[1]*b[1]),fsub=(a,b)=>fr(a[0]*b[1]-b[0]*a[1],a[1]*b[1]);
const fmul=(a,b)=>fr(a[0]*b[0],a[1]*b[1]),fdiv=(a,b)=>fr(a[0]*b[1],a[1]*b[0]);
const feq=(a,b)=>a[0]===b[0]&&a[1]===b[1],fval=a=>a[0]/a[1];
/* html: mixed number with stacked fraction */
function fH(f){const[n,d]=f;if(d===1)return String(n);const w=Math.floor(n/d),r=n-w*d;return w?`${w} ${FR(r,d)}`:FR(n,d)}
/* plain text */
function fT(f){const[n,d]=f;if(d===1)return String(n);const w=Math.floor(n/d),r=n-w*d;return w?`${w} ${r}/${d}`:`${n}/${d}`}
const fAcc=f=>{const[n,d]=f;if(d===1)return[String(n)];return n>d?[fT(f),`${n}/${d}`]:[`${n}/${d}`]};
/* mixed-number input [whole, n, d] -> improper fraction */
const mixed=(w,n,d)=>[w*d+n,d];
const dispIn=(f,mx)=>mx?fH(f):fH(f);

/* A fraction answer: typed (45%) or multiple choice. cands = likely wrong answers as [n,d] pairs. */
function fracQ(R,q,ans,cands,exp,extra){
 if(R.f()<.45)return txt(q+'\n(Write the answer in simplest form, like 3/4 or 1 1/2.)',fAcc(ans),exp,extra);
 const n=ans[0],d=ans[1],seen=new Set([fT(ans)]),dist=[];
 const all=[...R.shuffle((cands||[]).map(c=>fr(c[0],c[1]))),fr(n+1,d),fr(n,d+1),fr(n+d,d),fr(Math.max(n-1,0),d),fr(n*2,d),fr(n,d*2),fr(n+2,d),fr(n,d+2)];
 for(const c of all){if(!isFinite(c[0])||!isFinite(c[1])||c[1]<=0||c[0]<0)continue;const t=fT(c);if(seen.has(t))continue;seen.add(t);dist.push(fH(c))}
 return mk(R,q,fH(ans),dist,exp,extra);
}
const FD=[2,3,4,5,6,8,10,12];
const P=(title,text)=>`<h4>${title}</h4>${text}`;
/* passage bank item: {t:title, x:text, qs:[[question, correct, [3 wrong], explanation], ...]} */
function readGen(bank,secName){return(R,n)=>{
 const k=Math.ceil(n/4),ps=R.sample(bank,Math.min(k,bank.length)),out=[];
 ps.forEach((p,pi)=>{let qs=p.qs.slice();if(n<4||pi===k-1&&n%4)qs=R.sample(qs,Math.min(qs.length,n<4?n:n%4));
  qs.forEach(([q,c,d,e])=>out.push(mk(R,q,c,d,e,{pass:P(p.t,p.x)})))});
 return out.slice(0,n)}}

const sciGen=bank=>(R,n)=>R.sample(bank,Math.min(n,bank.length)).map(([q,c,d,e,x])=>mk(R,q,c,d,e,x?{pics:x}:undefined));
const stbl=(h,rows)=>`<div class="pics"><div class="pic" style="padding:6px;font-size:14px"><table style="border-collapse:collapse"><tr>${h.map(x=>`<th style="border:1px solid var(--line);padding:5px 9px">${x}</th>`).join('')}</tr>${rows.map(r=>`<tr>${r.map(c=>`<td style="border:1px solid var(--line);padding:5px 9px;text-align:center">${c}</td>`).join('')}</tr>`).join('')}</table></div></div>`;
