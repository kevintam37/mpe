/* ===== 5th grade MATH, part 2: fractions, measurement, data, volume, coordinate plane, shapes ===== */
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

/* ---------- Add & subtract fractions (5.NF.A) ---------- */
function fracAddSub(R){
 const d1=R.pick(FD),d2=R.pick(FD);if(d1===d2&&R.f()<.8)return null;
 const mx=R.f()<.45,w1=mx?R.int(1,5):0,w2=mx?R.int(1,4):0;
 let A=mixed(w1,R.int(1,d1-1),d1),B=mixed(w2,R.int(1,d2-1),d2);
 const add=R.f()<.5;
 if(!add){const c=fval(A)-fval(B);if(Math.abs(c)<1e-9)return null;if(c<0){const t=A;A=B;B=t}}
 const res=add?fadd(A,B):fsub(A,B),L=lcm(A[1],B[1]);
 const wrong=add?[fr(A[0]+B[0],A[1]+B[1])]:[fr(Math.abs(A[0]-B[0]),Math.abs(A[1]-B[1])||A[1]),fr(Math.abs(A[0]*B[1]-B[0]*A[1]),A[1]+B[1])];
 const sA=fH(A),sB=fH(B);
 return fracQ(R,`What is the ${add?'sum':'difference'}?\n<b>${sA} ${add?'+':'−'} ${sB}</b>`,res,wrong,
  `Rename the fractions with a common denominator of ${L}, then ${add?'add':'subtract'}${mx?' (regroup if you need to)':''}. ${fT(A)} ${add?'+':'−'} ${fT(B)} = ${fT(res)}.`);
}
function fracAddSubWord(R){
 const d1=R.pick(FD),d2=R.pick(FD);if(d1===d2)return null;
 const nm=R.pick(NAMES5),a=fr(R.int(1,d1-1),d1),b=fr(R.int(1,d2-1),d2),t=R.int(1,3);
 if(feq(a,b)||a[1]===b[1])return null;
 if(t===1)return fracQ(R,`${nm} ran ${fH(a)} mile in the morning and ${fH(b)} mile in the afternoon. How many miles did ${nm} run in all?`,fadd(a,b),[fr(a[0]+b[0],a[1]+b[1])],`Add ${fT(a)} + ${fT(b)} using a common denominator of ${lcm(a[1],b[1])}: ${fT(fadd(a,b))} miles.`);
 const big=fval(a)>fval(b)?a:b,sm=big===a?b:a;
 if(t===2)return fracQ(R,`A recipe uses ${fH(big)} cup of flour and ${fH(sm)} cup of sugar. How much more flour than sugar is in the recipe?`,fsub(big,sm),[fr(big[0]-sm[0]||1,Math.abs(big[1]-sm[1])||big[1])],`Subtract ${fT(big)} − ${fT(sm)} with a common denominator of ${lcm(a[1],b[1])}: ${fT(fsub(big,sm))} cup.`);
 const wh=R.int(2,6),tot=[wh,1],left=fsub(tot,fadd(a,b));if(fval(left)<=0)return null;
 return fracQ(R,`${nm} had ${wh} yards of ribbon. ${nm} used ${fH(a)} yard for a bow and ${fH(b)} yard for a card. How much ribbon is left?`,left,[fsub([wh,1],a)],`Ribbon used: ${fT(a)} + ${fT(b)} = ${fT(fadd(a,b))}. Left: ${wh} − ${fT(fadd(a,b))} = ${fT(left)} yards.`);
}
function fracReason(R){
 const d1=R.pick([2,3,4,5,6,8]),d2=R.pick([3,4,5,6,8]),a=[R.int(1,d1-1),d1],b=[R.int(1,d2-1),d2];
 const wrong=a[0]+b[0]+'/'+(a[1]+b[1]),wv=(a[0]+b[0])/(a[1]+b[1]);
 if(a[1]===b[1]||wv>=Math.max(fval(a),fval(b))||a[0]+b[0]===a[1]+b[1])return null;
 return mk(R,`${cap(R.pick(NAMES5))} says that ${FR(a[0],a[1])} + ${FR(b[0],b[1])} = ${FR(a[0]+b[0],a[1]+b[1])}. Which statement explains the mistake?`,
  `The sum must be greater than each addend, but ${FR(a[0]+b[0],a[1]+b[1])} is less than ${fval(a)>fval(b)?FR(a[0],a[1]):FR(b[0],b[1])}.`,
  [`The sum should have a denominator of ${a[1]}.`,`The numerators should have been multiplied.`,`Nothing is wrong; you add the tops and add the bottoms.`],
  `You cannot add the numerators and denominators. Use a common denominator: ${fT(a)} + ${fT(b)} = ${fT(fadd(a,b))}.`);
}
NJ.reg({id:'m_nf1',subj:'math',name:'Add & Subtract Fractions',desc:'Unlike denominators, mixed numbers, word problems',n:10,full:3,daily:1,gen:topicGen([fracAddSub,fracAddSub,fracAddSub,fracAddSubWord,fracAddSubWord,fracReason])});

/* ---------- Multiply fractions (5.NF.B.4-6) ---------- */
function fmWhole(R){
 const d=R.pick([3,4,5,6,8]),n=R.int(1,d-1),k=R.int(2,9),ans=fmul([k,1],[n,d]);
 return fracQ(R,`What is the product?\n<b>${k} × ${FR(n,d)}</b>`,ans,[fr(k*n,d*k),fr(k+n,d),fr(k*n,d+k)],`${k} × ${n}/${d} = ${k*n}/${d} = ${fT(ans)}.`);
}
function fmFrac(R){
 const d1=R.pick([2,3,4,5,6,8]),d2=R.pick([2,3,4,5,6,8]),a=[R.int(1,d1-1),d1],b=[R.int(1,d2-1),d2],ans=fmul(a,b);
 return fracQ(R,`What is the product?\n<b>${FR(a[0],a[1])} × ${FR(b[0],b[1])}</b>`,ans,[fr(a[0]+b[0],a[1]*b[1]),fr(a[0]*b[0],a[1]+b[1]),fdiv(a,b)],`Multiply the numerators and the denominators: ${a[0]*b[0]}/${a[1]*b[1]}${a[0]*b[0]+'/'+a[1]*b[1]===fT(ans)?'':' = '+fT(ans)}.`);
}
function fmMixed(R){
 const d=R.pick([2,3,4,5]),w=R.int(1,4),n=R.int(1,d-1),A=mixed(w,n,d),d2=R.pick([2,3,4,5,6]),B=[R.int(1,d2-1),d2],ans=fmul(A,B);
 return fracQ(R,`What is the product?\n<b>${fH(A)} × ${FR(B[0],B[1])}</b>`,ans,[fadd(fmul([w,1],B),[n,d]),fr(w*B[0]+n*B[0],d*B[1]),fmul([n,d],B)],`Write ${fT(A)} as ${A[0]}/${A[1]}. Then ${A[0]}/${A[1]} × ${B[0]}/${B[1]} = ${fT(ans)}.`);
}
function fmScale(R){
 const k=R.int(2,12),t=R.int(1,3);let f,lab;
 if(t===1){const d=R.pick([3,4,5,6,8,10]);f=[R.int(1,d-1),d];lab='less than'}
 else if(t===2){const d=R.pick([2,3,4,5,6]);f=[d+R.int(1,d-1),d];lab='greater than'}
 else{f=R.pick([[3,3],[4,4],[5,5],[2,2],[6,6]]);lab='equal to'}
 const nn=t===1&&R.f()<.5?null:1;
 const opts=['less than','greater than','equal to'].map(x=>`${x} ${k}`);
 return mk(R,`Without multiplying, decide how the product <b>${k} × ${FR(f[0],f[1])}</b> compares to ${k}.`,`${lab} ${k}`,[...opts.filter(o=>o!==`${lab} ${k}`),`cannot be determined`],
  t===1?`Multiplying by a fraction less than 1 gives a product less than ${k}.`:t===2?`Multiplying by a fraction greater than 1 gives a product greater than ${k}.`:`${f[0]}/${f[1]} equals 1, and multiplying by 1 does not change the number.`);
}
function fmArea(R){
 const d1=R.pick([2,3,4,5,6]),d2=R.pick([2,3,4,5,6]),a=R.f()<.4?[R.int(1,3),1]:[R.int(1,d1-1),d1],b=[R.int(1,d2-1),d2],ans=fmul(a,b);
 return fracQ(R,`A rectangle is ${fH(a)} feet long and ${fH(b)} feet wide. What is its area in square feet?`,ans,[fadd(a,b),fr(a[0]*b[0],a[1]+b[1]),fmul(a,[2,1])],`Area = length × width = ${fT(a)} × ${fT(b)} = ${fT(ans)} square feet.`);
}
function fmWord(R){
 const nm=R.pick(NAMES5),t=R.int(1,3);
 if(t===1){const d1=R.pick([2,3,4,5,6,8]),d2=R.pick([2,3,4,5]),a=[R.int(1,d1-1),d1],b=[R.int(1,d2-1),d2],ans=fmul(a,b);
  return fracQ(R,`${nm} had ${fH(a)} of a pizza left and ate ${fH(b)} of it. What fraction of the whole pizza did ${nm} eat?`,ans,[fadd(a,b),fsub(a,b)],`"${fT(b)} of ${fT(a)}" means multiply: ${fT(a)} × ${fT(b)} = ${fT(ans)}.`);}
 if(t===2){const d=R.pick([2,3,4,5,6,8]),a=[R.int(1,d-1),d],k=R.int(3,9),ans=fmul(a,[k,1]);
  return fracQ(R,`A recipe uses ${fH(a)} cup of milk. ${nm} makes ${k} batches. How many cups of milk are used in all?`,ans,[fr(a[0]+k,d),fr(a[0],d*k)],`${k} × ${fT(a)} = ${fT(ans)} cups.`);}
 const d=R.pick([2,3,4,5]),w=R.int(2,5),A=mixed(w,R.int(1,d-1),d),k=R.int(2,6),ans=fmul(A,[k,1]);
 return fracQ(R,`${nm} walks ${fH(A)} miles each day for ${k} days. How many miles does ${nm} walk in all?`,ans,[fr(A[0]+k,A[1]),fadd([w*k,1],[k,d])],`${fT(A)} × ${k} = ${fT(ans)} miles.`);
}
NJ.reg({id:'m_nf2',subj:'math',name:'Multiply Fractions',desc:'Whole × fraction, fraction × fraction, mixed numbers, scaling, area',n:10,full:3,daily:1,gen:topicGen([fmWhole,fmFrac,fmFrac,fmMixed,fmScale,fmArea,fmWord,fmWord])});

/* ---------- Divide fractions (5.NF.B.7) ---------- */
function fdUnit(R){
 const d=R.pick([2,3,4,5,6]),k=R.int(2,6),ans=[1,d*k];
 return fracQ(R,`What is the quotient?\n<b>${FR(1,d)} ÷ ${k}</b>`,ans,[[k,d],[d,k],[1,d+k]],`Splitting ${fT([1,d])} into ${k} equal parts gives ${fT(ans)}, because ${fT(ans)} × ${k} = ${fT([1,d])}.`);
}
function fdWhole(R){
 const d=R.pick([2,3,4,5,6,8]),k=R.int(2,9),ans=k*d,nm=R.pick(NAMES5);
 if(R.f()<.5)return numQ(R,`What is the quotient?\n<b>${k} ÷ ${FR(1,d)}</b>`,ans,[k+d,k*(d-1),d,k],`How many ${fT([1,d])}s are in ${k}? There are ${d} in each whole, so ${k} × ${d} = ${ans}.`);
 return numQ(R,`${nm} has ${k} pounds of nuts and puts ${FR(1,d)} pound in each bag. How many bags can ${nm} fill?`,ans,[k+d,k*(d-1),d,k],`${k} ÷ ${fT([1,d])} = ${k} × ${d} = ${ans} bags.`);
}
function fdShare(R){
 const d=R.pick([2,3,4]),k=R.int(2,6),nm=R.pick(NAMES5),ans=[1,d*k];
 return fracQ(R,`${nm} and ${k-1} friends share ${FR(1,d)} of a pie equally. What fraction of the whole pie does each person get?`,ans,[[k,d],[1,d+k],[1,k]],`${k} people share ${fT([1,d])}: ${fT([1,d])} ÷ ${k} = ${fT(ans)}.`);
}
function fdAsDiv(R){
 const m=R.int(3,9),k=R.f()<.5?R.int(1,m-1):R.int(m+1,m*3);if(k===m||k%m===0)return null;
 const ans=fr(k,m),nm=R.pick(NAMES5);
 if(R.f()<.5)return fracQ(R,`What is ${k} ÷ ${m} written as a fraction or mixed number?`,ans,[[m,k],[1,k*m],[k,m+1]],`A fraction is a division: ${k} ÷ ${m} = ${k}/${m} = ${fT(ans)}.`);
 return fracQ(R,`${k} pounds of clay are shared equally among ${m} students. How many pounds does each student get?`,ans,[[m,k],[1,k*m]],`${k} ÷ ${m} = ${k}/${m} = ${fT(ans)} pounds.`);
}
NJ.reg({id:'m_nf3',subj:'math',name:'Divide Fractions',desc:'Unit fractions and whole numbers, fractions as division',n:10,full:3,daily:1,gen:topicGen([fdUnit,fdUnit,fdWhole,fdWhole,fdShare,fdAsDiv,fdAsDiv])});

/* ---------- Measurement conversions (5.MD.A.1) ---------- */
const CV=[
 {b:['foot','feet'],s:['inch','inches'],f:12,c:1},{b:['yard','yards'],s:['foot','feet'],f:3,c:1},{b:['yard','yards'],s:['inch','inches'],f:36,c:1},
 {b:['gallon','gallons'],s:['quart','quarts'],f:4,c:1},{b:['quart','quarts'],s:['pint','pints'],f:2,c:1},{b:['pint','pints'],s:['cup','cups'],f:2,c:1},{b:['gallon','gallons'],s:['cup','cups'],f:16,c:1},
 {b:['pound','pounds'],s:['ounce','ounces'],f:16,c:1},{b:['hour','hours'],s:['minute','minutes'],f:60,c:1},{b:['minute','minutes'],s:['second','seconds'],f:60,c:1},{b:['day','days'],s:['hour','hours'],f:24,c:1},
 {b:['meter','meters'],s:['centimeter','centimeters'],f:100,m:1},{b:['kilometer','kilometers'],s:['meter','meters'],f:1000,m:1},{b:['centimeter','centimeters'],s:['millimeter','millimeters'],f:10,m:1},
 {b:['liter','liters'],s:['milliliter','milliliters'],f:1000,m:1},{b:['kilogram','kilograms'],s:['gram','grams'],f:1000,m:1},{b:['meter','meters'],s:['millimeter','millimeters'],f:1000,m:1}];
function convBig(R){
 const c=R.pick(CV),v=c.m&&R.f()<.6?R.int(11,99)/10:R.int(2,12),ans=rd(v*c.f);
 return numQ(R,`${fmtN(v)} ${c.b[1]} = ____ ${c.s[1]}`,ans,[rd(v+c.f),rd(v*c.f*10),rd(v*c.f/10),rd(v/c.f)],`1 ${c.b[0]} = ${c.f} ${c.s[1]}, so multiply: ${fmtN(v)} × ${c.f} = ${fmtN(ans)}.`,{pics:boxHTML(`1 ${c.b[0]} = ${c.f} ${c.s[1]}`),step:c.m?1:c.f});
}
function convSmall(R){
 const c=R.pick(CV);let sv,ans;
 if(c.m){sv=R.int(11,999)*(c.f>=1000?1:10);ans=rd(sv/c.f)}else{const k=R.int(2,12);sv=c.f*k+(c.f%2===0&&R.f()<.3?c.f/2:0);ans=rd(sv/c.f)}
 return numQ(R,`${fmtN(sv)} ${c.s[1]} = ____ ${c.b[1]}`,ans,[rd(sv*c.f),rd(ans*10),rd(ans/10),rd(sv-c.f)],`1 ${c.b[0]} = ${c.f} ${c.s[1]}, so divide: ${fmtN(sv)} ÷ ${c.f} = ${fmtN(ans)}.`,{pics:boxHTML(`1 ${c.b[0]} = ${c.f} ${c.s[1]}`),step:c.m?.1:1});
}
function convWord(R){
 const c=R.pick(CV.filter(x=>x.f<=100)),t=R.int(2,9),tot=t*c.f,ds=[];for(let p=2;p<=Math.min(tot/2,60);p++)if(tot%p===0)ds.push(p);
 if(!ds.length)return null;const p=R.pick(ds),cnt=tot/p,nm=R.pick(NAMES5),nn=R.pick(['ribbon','rope','board']);
 if(c.s[0]==='cup'||c.s[0]==='ounce'||c.s[0]==='minute'||c.s[0]==='second'||c.s[0]==='hour'){
  const things=c.s[0]==='cup'?'juice':c.s[0]==='ounce'?'flour':'time';
  return numQ(R,`${nm} has ${t} ${t===1?c.b[0]:c.b[1]}. How many ${c.s[1]} is that?`,tot,[t+c.f,tot*10,tot/10,c.f],`1 ${c.b[0]} = ${c.f} ${c.s[1]}, so ${t} × ${c.f} = ${tot}.`,{pics:boxHTML(`1 ${c.b[0]} = ${c.f} ${c.s[1]}`),step:c.f});
 }
 return numQ(R,`${nm} has a ${nn} that is ${t} ${c.b[1]} long. ${nm} cuts it into pieces that are each ${p} ${c.s[1]} long. How many pieces can ${nm} cut?`,cnt,[t*c.f,cnt+1,cnt-1,t*p],`${t} ${c.b[1]} = ${tot} ${c.s[1]}. Then ${tot} ÷ ${p} = ${cnt} pieces.`,{pics:boxHTML(`1 ${c.b[0]} = ${c.f} ${c.s[1]}`)});
}
NJ.reg({id:'m_md1',subj:'math',name:'Measurement Conversions',desc:'Customary, metric, and time units',n:10,full:3,daily:1,gen:topicGen([convBig,convBig,convSmall,convSmall,convWord])});

/* ---------- Line plots with fractions (5.MD.B.2) ---------- */
function lpData(R){
 const d=R.pick([2,4,4,8]),a=R.int(0,2),wd=d===8?1:2,K=wd*d,ticks=[];
 for(let k=0;k<=K;k++)ticks.push(fr(a*d+k,d));
 const m=R.int(4,6),idx=R.sample([...Array(K+1).keys()].slice(0,K+1),m).sort((x,y)=>x-y),counts=new Array(K+1).fill(0);
 idx.forEach(i=>counts[i]=R.int(1,4));
 const n=counts.reduce((x,y)=>x+y,0);if(n<6||n>14)return null;
 return{ticks,counts,n,d};
}
function lpSVG(D,unit){
 const T=D.ticks.length,cw=Math.min(40,Math.floor(300/T)),W=20+T*cw,mx=Math.max(...D.counts),H=34+mx*17+10,base=H-30;
 let s=`<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" style="color:currentColor" role="img" aria-label="Line plot"><line x1="8" y1="${base}" x2="${W-8}" y2="${base}" stroke="currentColor" stroke-width="2"/>`;
 D.ticks.forEach((t,i)=>{const cx=10+cw/2+i*cw;s+=`<line x1="${cx}" y1="${base-4}" x2="${cx}" y2="${base+4}" stroke="currentColor" stroke-width="2"/><text x="${cx}" y="${base+16}" font-size="11" text-anchor="middle" fill="currentColor">${fT(t)}</text>`;
  for(let j=0;j<D.counts[i];j++){const y=base-13-j*17;s+=`<path d="M${cx-5} ${y-5}L${cx+5} ${y+5}M${cx+5} ${y-5}L${cx-5} ${y+5}" stroke="#E0457B" stroke-width="2.4" stroke-linecap="round"/>`}});
 return s+`<text x="${W/2}" y="${H-2}" font-size="11" text-anchor="middle" fill="currentColor" opacity=".75">${unit}</text></svg>`;
}
const LPC=[{n:'ribbons',u:'yards',desc:'the lengths of some ribbons (in yards)'},{n:'beakers',u:'cups',desc:'the amount of water in some beakers (in cups)'},{n:'pencils',u:'feet',desc:'the lengths of some pencils (in feet)'}];
function lpQ(R){
 const D=lpData(R);if(!D)return null;const c=R.pick(LPC),pic=`<div class="pics"><div class="pic" style="padding:6px">${lpSVG(D,c.u)}</div></div>`;
 const vals=D.ticks,cnt=D.counts,idx=cnt.map((x,i)=>x?i:-1).filter(i=>i>=0);
 const t=R.int(1,5),ctx=`The line plot shows ${c.desc}.`;
 if(t===1){const i=R.pick(idx);return numQ(R,`${ctx}\nHow many ${c.n} measure exactly ${fT(vals[i])}?`,cnt[i],[cnt[i]+1,cnt[i]-1,i,D.n],`Count the X marks above ${fT(vals[i])}: ${cnt[i]}.`,{pics:pic})}
 if(t===2){const i=R.pick(idx.slice(0,-1)),ans=cnt.slice(i+1).reduce((x,y)=>x+y,0);if(!ans)return null;
  return numQ(R,`${ctx}\nHow many ${c.n} are greater than ${fT(vals[i])}?`,ans,[ans+cnt[i],ans-1,ans+1,D.n],`Count all the X marks to the right of ${fT(vals[i])}: ${ans}.`,{pics:pic})}
 if(t===3){const hi=vals[idx[idx.length-1]],lo=vals[idx[0]],ans=fsub(hi,lo);
  return fracQ(R,`${ctx}\nWhat is the difference between the greatest and the least measurement?`,ans,[fadd(hi,lo)],`Greatest: ${fT(hi)}. Least: ${fT(lo)}. ${fT(hi)} − ${fT(lo)} = ${fT(ans)}.`,{pics:pic})}
 let tot=[0,1];cnt.forEach((x,i)=>{if(x)tot=fadd(tot,fmul([x,1],vals[i]))});
 if(t===4)return fracQ(R,`${ctx}\nWhat is the total of all ${D.n} measurements added together?`,tot,[fr(tot[0]+1,tot[1])],`Multiply each value by its number of X marks and add: total = ${fT(tot)} ${c.u}.`,{pics:pic});
 const share=fdiv(tot,[D.n,1]);if(share[1]>8)return null;
 return fracQ(R,`${ctx}\nIf the total were shared equally among all ${D.n} ${c.n}, how much would each one have?`,share,[fr(tot[0],tot[1]*D.n+1),fadd(share,[1,share[1]])],`Total = ${fT(tot)}. Equal share = ${fT(tot)} ÷ ${D.n} = ${fT(share)} ${c.u}.`,{pics:pic});
}
NJ.reg({id:'m_md2',subj:'math',name:'Line Plots with Fractions',desc:'Read and use line plots with halves, fourths, and eighths',n:10,full:3,daily:1,gen:topicGen([lpQ])});

/* ---------- Volume (5.MD.C) ---------- */
function cubeSVG(l,w,h){
 const s=Math.min(26,Math.floor(250/(l+.5*w))),ux=s*.5,uy=-s*.42,W=Math.ceil(l*s+w*ux)+16,Y=8+h*s-w*uy,H=Math.ceil(Y)+8,X=8;
 const ln=(x1,y1,x2,y2)=>`<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}"/>`;
 const poly=(p,fo)=>`<polygon points="${p.map(q=>q.map(v=>v.toFixed(1)).join(',')).join(' ')}" fill="#4C8DF6" fill-opacity="${fo}"/>`;
 let s1=poly([[X,Y-h*s],[X+l*s,Y-h*s],[X+l*s,Y],[X,Y]],.28)+poly([[X,Y-h*s],[X+l*s,Y-h*s],[X+l*s+w*ux,Y-h*s+w*uy],[X+w*ux,Y-h*s+w*uy]],.45)+poly([[X+l*s,Y-h*s],[X+l*s+w*ux,Y-h*s+w*uy],[X+l*s+w*ux,Y+w*uy],[X+l*s,Y]],.14);
 s1+='<g stroke="currentColor" stroke-opacity=".55" stroke-width="1">';
 for(let i=0;i<=l;i++){s1+=ln(X+i*s,Y-h*s,X+i*s,Y)+ln(X+i*s,Y-h*s,X+i*s+w*ux,Y-h*s+w*uy)}
 for(let j=0;j<=h;j++){s1+=ln(X,Y-j*s,X+l*s,Y-j*s)+ln(X+l*s,Y-j*s,X+l*s+w*ux,Y-j*s+w*uy)}
 for(let k=0;k<=w;k++){s1+=ln(X+k*ux,Y-h*s+k*uy,X+l*s+k*ux,Y-h*s+k*uy)+ln(X+l*s+k*ux,Y-h*s+k*uy,X+l*s+k*ux,Y+k*uy)}
 return`<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Rectangular prism made of unit cubes">${s1}</g></svg>`;
}
function volPic(R){
 const l=R.int(2,7),w=R.int(2,5),h=R.int(2,5),V=l*w*h;
 return numQ(R,`A rectangular prism is packed with unit cubes, as shown. How many unit cubes are in the prism?`,V,[l*w+h,l+w+h,2*(l*w+l*h+w*h),l*w*(h-1),l*(w+h)],`The bottom layer has ${l} × ${w} = ${l*w} cubes, and there are ${h} layers: ${l*w} × ${h} = ${V} cubes.`,{pics:`<div class="pics"><div class="pic" style="padding:8px">${cubeSVG(l,w,h)}</div></div>`});
}
function volFormula(R){
 const l=R.int(3,15),w=R.int(2,12),h=R.int(2,10),u=R.pick([['centimeters','cm'],['inches','in.'],['feet','ft'],['meters','m']]),V=l*w*h;
 return numQ(R,`A box is ${l} ${u[0]} long, ${w} ${u[0]} wide, and ${h} ${u[0]} tall. What is its volume in cubic ${u[0]}?`,V,[l+w+h,2*(l*w+l*h+w*h),l*w,l*w*h-l],`Volume = length × width × height = ${l} × ${w} × ${h} = ${V} cubic ${u[0]}.`);
}
function volMissing(R){
 const l=R.int(2,12),w=R.int(2,9),h=R.int(2,12),V=l*w*h,miss=R.pick(['height','width','length']),u=R.pick(['cm','in.','ft','m']);
 const g={height:`length ${l} ${u} and width ${w} ${u}`,width:`length ${l} ${u} and height ${h} ${u}`,length:`width ${w} ${u} and height ${h} ${u}`},ans={height:h,width:w,length:l}[miss];
 return numQ(R,`A rectangular prism has a volume of ${V} cubic ${u}. It has ${g[miss]}. What is its ${miss} in ${u}?`,ans,[V-l*w,Math.round(V/(l+w)),ans+1,ans-1],`Volume = l × w × h, so ${miss} = ${V} ÷ (the other two sides) = ${ans}.`);
}
function volBase(R){
 const B=R.int(8,60),h=R.int(2,12),V=B*h;
 return numQ(R,`The base of a rectangular prism has an area of ${B} square centimeters. The prism is ${h} centimeters tall. What is the volume in cubic centimeters?`,V,[B+h,B*h/2,B*(h+1),2*B+2*h],`Volume = area of base × height = ${B} × ${h} = ${V}.`);
}
function volComposite(R){
 const a=[R.int(2,9),R.int(2,6),R.int(2,6)],b=[R.int(2,9),R.int(2,6),R.int(2,6)],Va=a[0]*a[1]*a[2],Vb=b[0]*b[1]*b[2],V=Va+Vb;
 return numQ(R,`A solid figure is made of two rectangular prisms that do not overlap.\nPrism A: ${a[0]} ft long, ${a[1]} ft wide, ${a[2]} ft tall.\nPrism B: ${b[0]} ft long, ${b[1]} ft wide, ${b[2]} ft tall.\nWhat is the total volume of the figure in cubic feet?`,V,[Va*Vb,Va,Vb,(a[0]+b[0])*(a[1]+b[1])*(a[2]+b[2])],`Prism A: ${a[0]} × ${a[1]} × ${a[2]} = ${Va}. Prism B: ${b[0]} × ${b[1]} × ${b[2]} = ${Vb}. Total: ${Va} + ${Vb} = ${V}.`);
}
function volConcept(R){
 const t=R.int(1,3);
 if(t===1)return mk(R,`Which unit should be used to measure the volume of a fish tank?`,'cubic feet',['square feet','feet','square inches'],`Volume measures the space inside a solid, so it uses cubic units.`);
 if(t===2){const k=R.int(20,90);return mk(R,`A unit cube has a side length of 1 inch. A prism is filled with exactly ${k} of these cubes. What is the volume of the prism?`,`${k} cubic inches`,[`${k} square inches`,`${k} inches`,`${2*k} cubic inches`],`Each unit cube has a volume of 1 cubic inch, so ${k} cubes have a volume of ${k} cubic inches.`)}
 const l=R.int(2,6),w=R.int(2,6),h=R.int(2,6);
 return mk(R,`Prism P is ${l} units long, ${w} units wide, and ${h} units tall. Prism Q has the same base but is ${2*h} units tall. How does the volume of Q compare to the volume of P?`,`Q has twice the volume of P`,[`Q has the same volume as P`,`Q has half the volume of P`,`Q has ${h} more cubic units than P`],`Doubling the height doubles the number of layers, so the volume doubles.`);
}
NJ.reg({id:'m_md3',subj:'math',name:'Volume',desc:'Unit cubes, V = l × w × h, missing sides, composite solids',n:10,full:3,daily:1,gen:topicGen([volPic,volPic,volFormula,volMissing,volBase,volComposite,volConcept])});

/* ---------- Coordinate plane (5.G.A) ---------- */
const GRID=(pts)=>{
 const S=26,ox=30,oy=10*S+14,W=ox+10*S+16,H=oy+30;let s=`<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Coordinate grid"><g stroke="currentColor" stroke-opacity=".18">`;
 for(let i=0;i<=10;i++)s+=`<line x1="${ox+i*S}" y1="${oy}" x2="${ox+i*S}" y2="${oy-10*S}"/><line x1="${ox}" y1="${oy-i*S}" x2="${ox+10*S}" y2="${oy-i*S}"/>`;
 s+=`</g><g stroke="currentColor" stroke-width="2"><line x1="${ox}" y1="${oy}" x2="${ox+10*S+8}" y2="${oy}"/><line x1="${ox}" y1="${oy}" x2="${ox}" y2="${oy-10*S-8}"/></g><g font-size="11" fill="currentColor" text-anchor="middle">`;
 for(let i=0;i<=10;i++)s+=`<text x="${ox+i*S}" y="${oy+14}">${i}</text><text x="${ox-12}" y="${oy-i*S+4}">${i}</text>`;
 s+=`<text x="${ox+10*S+6}" y="${oy+26}" font-weight="700">x</text><text x="${ox-22}" y="${oy-10*S-10}" font-weight="700">y</text></g>`;
 pts.forEach(p=>{s+=`<circle cx="${ox+p.x*S}" cy="${oy-p.y*S}" r="4.5" fill="#E0457B"/><text x="${ox+p.x*S+7}" y="${oy-p.y*S-7}" font-size="13" font-weight="700" fill="currentColor">${p.n}</text>`});
 return s+'</svg>';
};
const gridPic=pts=>`<div class="pics"><div class="pic" style="padding:6px">${GRID(pts)}</div></div>`;
function cpPoints(R,k){
 const xs=R.sample([1,2,3,4,5,6,7,8,9],k),ys=R.sample([1,2,3,4,5,6,7,8,9],k),L=['A','B','C','D','E','F'];
 return xs.map((x,i)=>({n:L[i],x,y:ys[i]}));
}
const OP=(x,y)=>`(${x}, ${y})`;
function cpRead(R){
 const pts=cpPoints(R,4),p=R.pick(pts);
 return mk(R,`What are the coordinates of point ${p.n}?`,OP(p.x,p.y),[OP(p.y,p.x),OP(p.x+1,p.y),OP(p.x,p.y+1),OP(p.x-1,p.y)].filter(s=>!pts.some(q=>OP(q.x,q.y)===s&&q!==p)),`Start at the origin. Go ${p.x} right along the x-axis, then ${p.y} up. Point ${p.n} is at ${OP(p.x,p.y)}.`,{pics:gridPic(pts)});
}
function cpFind(R){
 const pts=cpPoints(R,4),p=R.pick(pts);
 return mk(R,`Which point is located at ${OP(p.x,p.y)}?`,`Point ${p.n}`,pts.filter(q=>q!==p).map(q=>`Point ${q.n}`),`Go ${p.x} units right and ${p.y} units up from the origin. That is point ${p.n}.`,{pics:gridPic(pts)});
}
function cpMove(R){
 const a=R.int(1,5),b=R.int(1,5),k=R.int(1,4),m=R.int(1,4),nm=R.pick(['P','Q','M','T']);if(k===m)return null;
 return mk(R,`Point ${nm} is at ${OP(a,b)}. It moves ${k} unit${k>1?'s':''} right and ${m} unit${m>1?'s':''} up. What are its new coordinates?`,OP(a+k,b+m),[OP(a+m,b+k),OP(a+k,b),OP(a,b+m),OP(a-k,b+m)].filter(s=>s!==OP(a+k,b+m)),`Moving right changes the x-coordinate: ${a} + ${k} = ${a+k}. Moving up changes the y-coordinate: ${b} + ${m} = ${b+m}.`);
}
function cpDist(R){
 const horiz=R.f()<.5,c=R.int(1,9),p=R.sample([0,1,2,3,4,5,6,7,8,9,10].filter(v=>v!==c||true),2).sort((x,y)=>x-y);if(p[0]===p[1])return null;
 const A={n:'A',x:horiz?p[0]:c,y:horiz?c:p[0]},B={n:'B',x:horiz?p[1]:c,y:horiz?c:p[1]},d=p[1]-p[0];
 return numQ(R,`Point A is at ${OP(A.x,A.y)} and point B is at ${OP(B.x,B.y)}. How many units apart are they?`,d,[p[0]+p[1],d+1,d-1,c],`The points are on the same ${horiz?'horizontal':'vertical'} line, so subtract the ${horiz?'x':'y'}-coordinates: ${p[1]} − ${p[0]} = ${d}.`,{pics:gridPic([A,B])});
}
function cpAxis(R){
 const a=R.int(1,9),b=R.int(1,9);if(a===b)return null;const onX=R.f()<.5;
 return mk(R,`Which ordered pair names a point on the ${onX?'x':'y'}-axis?`,onX?OP(a,0):OP(0,a),[onX?OP(0,a):OP(a,0),OP(a,a),OP(a,b),OP(b,a)],onX?`A point on the x-axis has a y-coordinate of 0.`:`A point on the y-axis has an x-coordinate of 0.`);
}
function cpPattern(R){
 const k=R.int(2,6),n=R.int(4,7);
 return mk(R,`A pattern follows one rule. These ordered pairs are on its graph: (1, ${k}), (2, ${2*k}), (3, ${3*k}). Which ordered pair is also on the graph?`,OP(n,n*k),[OP(n*k,n),OP(n,n+k),OP(n,n*k+1),OP(n+1,n*k)],`The y-coordinate is ${k} times the x-coordinate, so when x is ${n}, y is ${n} × ${k} = ${n*k}.`);
}
NJ.reg({id:'m_g1',subj:'math',name:'Coordinate Plane',desc:'Ordered pairs, graphing points, distance, patterns',n:10,full:3,daily:1,gen:topicGen([cpRead,cpRead,cpFind,cpMove,cpDist,cpAxis,cpPattern])});

/* ---------- Classifying 2-D shapes (5.G.B) ---------- */
const SH_T=['All squares are rectangles.','All rectangles are parallelograms.','All squares are rhombuses.','All rhombuses are parallelograms.','All squares are parallelograms.','A rectangle has four right angles.','A parallelogram has two pairs of parallel sides.','A square has four equal sides and four right angles.','A rhombus has four equal sides.','Every square is also a quadrilateral.'];
const SH_F=['All rectangles are squares.','All parallelograms are rectangles.','All rhombuses are squares.','All quadrilaterals are parallelograms.','A rhombus always has four right angles.','A rectangle always has four equal sides.','All parallelograms are rhombuses.','A parallelogram always has four right angles.','Every triangle has a right angle.','A square has only two equal sides.'];
function shTrue(R){return mk(R,'Which statement is <b>true</b>?',R.pick(SH_T),R.sample(SH_F,3),'Think about which properties each shape must have. Shapes in a category share all of that category\'s properties.')}
function shFalse(R){const f=R.pick(SH_F);return mk(R,'Which statement is <b>false</b>?',f,R.sample(SH_T,3),'A statement is false if even one example breaks the rule. For example, a rectangle that is not a square shows "all rectangles are squares" is false.')}
function shMulti(R){
 const t=R.int(1,3);
 if(t===1)return multi(R,'A square belongs to which categories? Select <b>all</b> that apply.',['Quadrilateral','Parallelogram','Rectangle','Rhombus'],R.sample(['Triangle','Pentagon','Hexagon','Circle'],2),'A square has 4 sides, 2 pairs of parallel sides, 4 right angles, and 4 equal sides. That makes it a quadrilateral, parallelogram, rectangle, and rhombus.');
 if(t===2)return multi(R,'A rectangle belongs to which categories? Select <b>all</b> that apply.',['Quadrilateral','Parallelogram'],R.sample(['Rhombus','Triangle','Pentagon','Hexagon'],3).slice(0,2).concat(['Square'].slice(0,0)),'Every rectangle has 4 sides and 2 pairs of parallel sides, so it is a quadrilateral and a parallelogram. It is not always a rhombus or a square, because its sides may not all be equal.');
 return multi(R,'Which shapes <b>always</b> have four right angles? Select <b>all</b> that apply.',['Square','Rectangle'],['Rhombus','Parallelogram','Triangle'].slice(0,R.int(2,3)),'Squares and rectangles always have four right angles. Rhombuses and parallelograms can be slanted.');
}
function shRiddle(R){
 const B=[['I am a quadrilateral with four equal sides and four right angles.','Square'],['I am a quadrilateral with four right angles. My opposite sides are equal, but my neighbors are not.','Rectangle'],['I am a quadrilateral with four equal sides, but no right angles.','Rhombus'],['I am a quadrilateral with two pairs of parallel sides and no right angles. My sides are not all equal.','Parallelogram']],[q,a]=R.pick(B);
 return mk(R,`${q}\nWhat is the most specific name for me?`,a,['Square','Rectangle','Rhombus','Parallelogram'].filter(x=>x!==a),`The clues match a ${a.toLowerCase()}.`);
}
function shTriangle(R){
 const T=[[[90,R.int(20,60)],'right'],[[R.int(95,130),R.int(15,40)],'obtuse'],[[R.int(50,75),R.int(50,75)],'acute']],[[a,b],ans]=R.pick(T),c=180-a-b;
 if(ans==='acute'&&(a>=90||b>=90||c>=90||c<=0))return null;if(c<=0)return null;
 return mk(R,`A triangle has angles measuring ${a}°, ${b}°, and ${c}°. How can this triangle be classified?`,`${cap(ans)} triangle`,['Right triangle','Obtuse triangle','Acute triangle'].filter(x=>x!==`${cap(ans)} triangle`).concat(['Equilateral triangle']),ans==='right'?`One angle is exactly 90°, so it is a right triangle.`:ans==='obtuse'?`One angle is greater than 90°, so it is an obtuse triangle.`:`All three angles are less than 90°, so it is an acute triangle.`);
}
NJ.reg({id:'m_g2',subj:'math',name:'Classifying 2-D Shapes',desc:'Quadrilateral hierarchy, properties, triangles',n:10,full:3,daily:1,gen:topicGen([shTrue,shFalse,shMulti,shRiddle,shRiddle,shTriangle])});
