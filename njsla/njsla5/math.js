/* ===== 5th grade MATH, part 1: helpers, Operations & Algebraic Thinking, Number & Operations in Base Ten ===== */
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

/* ---------- Order of operations & expressions (5.OA.A) ---------- */
function exprEval(R){
 const t=R.int(1,7),a=R.int(2,20),b=R.int(2,9),c=R.int(2,9),dd=R.int(2,9);let d,v,alts=[];
 if(t===1){d=`${a} + ${b} × ${c}`;v=a+b*c;alts=[(a+b)*c]}
 else if(t===2){d=`(${a} + ${b}) × ${c}`;v=(a+b)*c;alts=[a+b*c]}
 else if(t===3){const x=R.int(6,15),y=R.int(1,x-1);d=`${b} × (${x} − ${y}) + ${dd}`;v=b*(x-y)+dd;alts=[b*x-y+dd,b*(x-y+dd)]}
 else if(t===4){d=`[${a} + ${b} × ${c}] − ${dd}`;v=a+b*c-dd;if(v<1)return null;alts=[(a+b)*c-dd]}
 else if(t===5){d=`${a} × ${b} − ${c} × ${dd}`;v=a*b-c*dd;if(v<1)return null;alts=[(a*b-c)*dd]}
 else if(t===6){const m=R.int(2,9),cc=R.int(2,9),s=cc*m,x=R.int(1,s-1);d=`(${x} + ${s-x}) ÷ ${cc} + ${dd}`;v=m+dd;alts=[x+(s-x)/cc+dd]}
 else{const x=R.int(20,50),y=R.int(2,9),z=R.int(2,9);d=`{${x} − [${y} + ${z}]} × ${b}`;v=(x-y-z)*b;alts=[(x-y+z)*b]}
 return numQ(R,`What is the value of the expression?\n<b>${d}</b>`,v,alts.filter(Number.isInteger),`Follow the order of operations: work inside parentheses, brackets, and braces first (innermost first), then multiply and divide, then add and subtract. The value is ${fmtN(v)}.`);
}
function exprWords(R){
 const b=R.int(2,12),a=b+R.int(2,15),c=R.int(2,9);
 const T=[
  [`add ${a} and ${b}, then multiply by ${c}`,`(${a} + ${b}) × ${c}`,[`${a} + ${b} × ${c}`,`${a} × ${c} + ${b}`,`${a} + ${b} + ${c}`]],
  [`subtract ${b} from ${a}, then divide by ${c}`,`(${a} − ${b}) ÷ ${c}`,[`${a} − ${b} ÷ ${c}`,`(${b} − ${a}) ÷ ${c}`,`${a} − ${b} − ${c}`]],
  [`multiply ${a} by ${b}, then subtract ${c}`,`${a} × ${b} − ${c}`,[`${a} × (${b} − ${c})`,`${a} − ${b} × ${c}`,`(${a} − ${b}) × ${c}`]],
  [`twice the sum of ${a} and ${b}`,`2 × (${a} + ${b})`,[`2 × ${a} + ${b}`,`2 + ${a} + ${b}`,`2 × ${a} × ${b}`]],
  [`${c} times the difference of ${a} and ${b}`,`${c} × (${a} − ${b})`,[`${c} × ${a} − ${b}`,`(${c} − ${a}) × ${b}`,`${c} − ${a} − ${b}`]],
  [`divide the sum of ${a} and ${b} by ${c}`,`(${a} + ${b}) ÷ ${c}`,[`${a} + ${b} ÷ ${c}`,`${c} ÷ (${a} + ${b})`,`${a} ÷ ${c} + ${b}`]]
 ];
 const [w,ok,bad]=R.pick(T);
 return mk(R,`Which expression matches the words?\n<b>${w}</b>`,ok,bad,`Parentheses show which part is done first. The words match <b>${ok}</b>.`);
}
function exprInterp(R){
 const k=R.int(2,9),a=R.int(3,30),b=R.int(3,30),t=R.int(1,3);
 if(t===1)return mk(R,`Which statement describes the expression <b>${k} × (${a} + ${b})</b>?`,`${k} times the sum of ${a} and ${b}`,[`${k} plus the sum of ${a} and ${b}`,`the sum of ${a} and ${b}, divided by ${k}`,`${k} times ${a}, plus ${b}`],`The parentheses group ${a} + ${b} as one sum, and then that sum is multiplied by ${k}.`);
 if(t===2)return mk(R,`Which statement describes the expression <b>(${a} + ${b}) ÷ ${k}</b>?`,`the sum of ${a} and ${b}, divided by ${k}`,[`${a} plus the quotient of ${b} and ${k}`,`${k} divided by the sum of ${a} and ${b}`,`the sum of ${a}, ${b}, and ${k}`],`First add ${a} and ${b}, then divide that sum by ${k}.`);
 return mk(R,`Without calculating, which statement is true about <b>${k} × (${a} + ${b})</b>?`,`It is ${k} times as large as ${a} + ${b}.`,[`It is ${k} more than ${a} + ${b}.`,`It is ${k} times smaller than ${a} + ${b}.`,`It is equal to ${a} + ${b}.`],`Multiplying the sum ${a} + ${b} by ${k} makes it ${k} times as large.`);
}
NJ.reg({id:'m_oa1',subj:'math',name:'Order of Operations & Expressions',desc:'Parentheses, brackets, writing and reading expressions',n:10,full:3,daily:1,gen:topicGen([exprEval,exprEval,exprEval,exprWords,exprWords,exprInterp])});

/* ---------- Patterns & rules (5.OA.B) ---------- */
function patRelation(R){
 const a=R.int(2,6),k=R.int(2,5),b=a*k;
 const rows=[1,2,3,4,5].map(i=>[i,a*i,b*i]);
 return numQ(R,`Rule A: Start at 0. Add ${a} each time.\nRule B: Start at 0. Add ${b} each time.\nEach term in Rule B is ____ times the matching term in Rule A.`,k,[k+1,k-1,b-a,a],`Compare matching terms: ${a} and ${b}, ${2*a} and ${2*b}, ... Each Rule B term is ${b} ÷ ${a} = ${k} times the Rule A term.`,{pics:TBL(['Term','Rule A','Rule B'],rows)});
}
function patPair(R){
 const a=R.int(2,5),k=R.int(2,4),b=a*k,i=R.int(3,7);
 return mk(R,`Rule A: Start at 0. Add ${a} each time.\nRule B: Start at 0. Add ${b} each time.\nWhich ordered pair (Rule A term, Rule B term) is in the pattern?`,`(${a*i}, ${b*i})`,[`(${a*i}, ${b*i+a})`,`(${b*i}, ${a*i})`,`(${a*i}, ${b*(i+1)-1})`,`(${a*i+1}, ${b*i})`],`The ${i}th terms are ${a}×${i} = ${a*i} for Rule A and ${b}×${i} = ${b*i} for Rule B, so the pair is (${a*i}, ${b*i}).`);
}
function patNth(R){
 const s=R.int(2,15),d=R.int(2,9),n=R.int(6,12),ans=s+(n-1)*d;
 return numQ(R,`A pattern starts at ${s}. Each term is ${d} more than the term before it.\nWhat is term number ${n} in the pattern?`,ans,[s+n*d,s+(n-2)*d,s+n*d-d-1,n*d],`Term 1 is ${s}. To get term ${n}, add ${d} a total of ${n-1} times: ${s} + ${n-1} × ${d} = ${ans}.`);
}
function patRule(R){
 const s=R.int(2,20),d=R.int(3,9),seq=[0,1,2,3].map(i=>s+i*d).join(', ');
 const ok=`Start at ${s}. Add ${d} each time.`;
 return mk(R,`Which rule describes this pattern?\n<b>${seq}, ...</b>`,ok,[`Start at ${s}. Add ${d+1} each time.`,`Start at ${s}. Multiply by ${d} each time.`,`Start at ${s+d}. Add ${d} each time.`,`Start at ${s}. Add ${s} each time.`],`The first term is ${s} and the terms go up by ${d} each time (${s+d} − ${s} = ${d}).`);
}
NJ.reg({id:'m_oa2',subj:'math',name:'Patterns & Rules',desc:'Two number patterns, ordered pairs, finding the rule',n:10,full:3,daily:1,gen:topicGen([patRelation,patPair,patNth,patRule])});

/* ---------- Place value & powers of 10 (5.NBT.A.1-2) ---------- */
const PLN={3:'thousands',2:'hundreds',1:'tens',0:'ones','-1':'tenths','-2':'hundredths','-3':'thousandths'};
function placeRatio(R){
 const p=R.int(-2,3),q=R.int(-3,p-1);if(p-q>4)return null;
 const d=R.int(1,9),hi=Math.max(p,R.int(1,3)),lo=Math.min(q,R.int(-3,0));let ip='',fp='';
 for(let e=hi;e>=lo;e--){let dg;if(e===p||e===q)dg=d;else{do{dg=R.int(0,9)}while(dg===d||(e===hi&&dg===0))}if(e>=0)ip+=dg;else fp+=dg}
 const num=comma(ip)+(fp?'.'+fp:''),r=Math.pow(10,p-q),all=[10,100,1000,10000];
 if(R.f()<.5){
  const labs=x=>`${comma(x)} times`;
  return mk(R,`In the number <b>${num}</b>, the digit ${d} appears twice. How many times greater is the value of the ${d} in the ${PLN[p]} place than the value of the ${d} in the ${PLN[q]} place?`,labs(r),R.shuffle(all.filter(x=>x!==r)).map(labs),`Moving ${p-q} place${p-q>1?'s':''} to the left makes a digit's value 10 × ${p-q>1?'10 ':''}${p-q>2?'× 10 ':''}= ${comma(r)} times as much.`);
 }
 const fr=x=>FR(1,comma(x));
 return mk(R,`In the number <b>${num}</b>, the digit ${d} appears twice. The value of the ${d} in the ${PLN[q]} place is what fraction of the value of the ${d} in the ${PLN[p]} place?`,fr(r),R.shuffle(all.filter(x=>x!==r)).map(fr),`The ${PLN[q]} place is ${p-q} place${p-q>1?'s':''} to the right, so its value is 1/${comma(r)} of the ${PLN[p]} place.`);
}
function powerTen(R){
 const k=R.int(2,6),t=R.int(1,3);
 if(t===1)return numQ(R,`${[...Array(k)].map(()=>10).join(' × ')} = 10<sup>?</sup>\nWhat is the exponent?`,k,[k-1,k+1,k*10,10],`There are ${k} tens being multiplied, so the exponent is ${k}.`);
 if(t===2){const v=Math.pow(10,k);return mk(R,`What is the value of 10${sup(k)}?`,comma(v),[comma(v/10),comma(v*10),String(10*k)],`10${sup(k)} means 10 multiplied by itself ${k} times, which is 1 followed by ${k} zeros: ${comma(v)}.`)}
 const v=Math.pow(10,k);return mk(R,`Which shows ${comma(v)} as a power of 10?`,`10${sup(k)}`,[`10${sup(k-1)}`,`10${sup(k+1)}`,`${k} × 10`],`${comma(v)} has ${k} zeros after the 1, so it is 10${sup(k)}.`);
}
function shiftTen(R){
 const mant=R.int(1,9999),sc=R.int(0,3),v=mant/Math.pow(10,sc),k=R.int(1,3),mul=R.f()<.5,useExp=R.f()<.5;
 const ans=rd(mul?v*Math.pow(10,k):v/Math.pow(10,k)),f=useExp?`10${sup(k)}`:comma(Math.pow(10,k));
 const wrong=rd(mul?v/Math.pow(10,k):v*Math.pow(10,k));
 return numQ(R,`What is ${fmtN(v)} ${mul?'×':'÷'} ${f}?`,ans,[wrong,rd(mul?v*Math.pow(10,k+1):v/Math.pow(10,k+1)),rd(mul?v*Math.pow(10,Math.max(k-1,0)):v/Math.pow(10,Math.max(k-1,0)))],`${mul?'Multiplying':'Dividing'} by ${comma(Math.pow(10,k))} moves the decimal point ${k} place${k>1?'s':''} to the ${mul?'right':'left'}: ${fmtN(ans)}.`,{step:Math.pow(10,-sc)});
}
function expandedForm(R){
 const ip=R.int(1,999),fd=R.int(1,3),fp=[...Array(fd)].map(()=>R.int(0,9));if(fp[fd-1]===0)fp[fd-1]=R.int(1,9);
 const num=ip+'.'+fp.join(''),terms=[],ipS=String(ip);
 ipS.split('').forEach((dg,k)=>{if(dg!=='0')terms.push(+dg*Math.pow(10,ipS.length-1-k))});
 fp.forEach((dg,k)=>{if(dg)terms.push(rd(dg/Math.pow(10,k+1)))});
 if(terms.length<2)return null;
 const ok=terms.join(' + '),bad=[];
 R.shuffle(terms.flatMap((_,i)=>[10,0.1].map(f=>[i,f]))).forEach(([i,f])=>{const t2=terms.slice();t2[i]=rd(t2[i]*f);const s=t2.join(' + ');if(s!==ok&&!bad.includes(s)&&bad.length<3)bad.push(s)});
 return mk(R,`Which expression is equal to <b>${num}</b>?`,ok,bad,`Break the number into the value of each digit: ${ok}.`);
}
NJ.reg({id:'m_nbt1',subj:'math',name:'Place Value & Powers of 10',desc:'Place value, exponents, multiplying and dividing by 10, 100, 1,000',n:10,full:3,daily:1,gen:topicGen([placeRatio,placeRatio,powerTen,shiftTen,shiftTen,expandedForm])});

/* ---------- Decimals: compare, order, round, read (5.NBT.A.3-4) ---------- */
function cmpDec(R){
 const ip=R.int(0,9),mkf=()=>{const L=R.int(1,3);let s='';for(let k=0;k<L;k++)s+=R.int(0,9);return s};
 let a=mkf(),b=mkf();const m=R.f();
 if(m<.15)b=a+'0'.repeat(R.int(1,2));else if(m<.55)b=a.slice(0,1)+mkf();
 const A=`${ip}.${a}`,B=`${ip}.${b}`,x=parseFloat(A),y=parseFloat(B);
 const sym=x<y?'<':x>y?'>':'=';
 return mk(R,`Which symbol makes the statement true?\n<b>${A}  ___  ${B}</b>`,sym,['<','>','=','cannot be determined'],`Compare place by place starting at the tenths. ${A} is ${x<y?'less than':x>y?'greater than':'equal to'} ${B}${x===y?' (extra zeros at the end do not change the value)':''}.`);
}
function orderDec(R){
 const ip=R.int(0,9),vals=new Set(),fr=[];
 for(let t=0;t<40&&fr.length<4;t++){const L=R.int(1,3);let s='';for(let k=0;k<L;k++)s+=R.int(0,9);if(s.endsWith('0'))continue;const v=parseFloat('0.'+s);if(vals.has(v))continue;vals.add(v);fr.push(s)}
 if(fr.length<4)return null;
 const asc=R.f()<.5,nums=fr.map(s=>`${ip}.${s}`);
 const good=nums.slice().sort((p,q)=>parseFloat(p)-parseFloat(q));if(!asc)good.reverse();
 const rev=good.slice().reverse();
 const whole=nums.slice().sort((p,q)=>parseInt(p.split('.')[1],10)-parseInt(q.split('.')[1],10));if(!asc)whole.reverse();
 const sh=R.shuffle(nums),j=g=>g.join(' , ');
 return mk(R,`Which list shows the numbers in order from ${asc?'least to greatest':'greatest to least'}?`,j(good),[j(rev),j(whole),j(sh)],`Line up the decimal points and compare place by place. The order is ${j(good)}.`);
}
function roundDec(R){
 const x=R.int(1001,99999),place=R.pick(['tenth','hundredth','whole number']),f={'tenth':100,'hundredth':10,'whole number':1000}[place];
 const ans=rd(Math.round(x/f)*f/1000),step={'tenth':.1,'hundredth':.01,'whole number':1}[place];
 const cands=[rd(Math.floor(x/f)*f/1000),rd(Math.round(x/10)*10/1000),rd(Math.round(x/100)*100/1000),rd(Math.round(x/1000))];
 return numQ(R,`Round <b>${(x/1000).toFixed(3)}</b> to the nearest ${place}.`,ans,cands.filter(c=>c!==ans),`Look at the digit to the right of the ${place} place. If it is 5 or more, round up; if it is less than 5, keep the digit. The answer is ${fmtN(ans)}.`,{step});
}
const ONES=['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'],TENS=['','','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'],DPL=['','tenths','hundredths','thousandths','ten-thousandths'];
function words3(n){let s='';if(n>=100){s+=ONES[Math.floor(n/100)]+' hundred';n%=100;if(n)s+=' '}if(n>=20){s+=TENS[Math.floor(n/10)];if(n%10)s+='-'+ONES[n%10]}else if(n>0)s+=ONES[n];return s}
const placeWord=(f,k)=>f===1?DPL[k].replace(/s$/,''):DPL[k];
function decWords(R){
 const ip=R.pick([0,0,R.int(1,99)]),k=R.int(2,3),f=R.int(1,Math.pow(10,k)-1);if(f%10===0)return null;
 const pad=(n,L)=>String(n).padStart(L,'0'),num=`${ip}.${pad(f,k)}`;
 const mkW=(kk)=>{const fw=`${words3(f)} ${placeWord(f,kk)}`;return ip>0?`${words3(ip)} and ${fw}`:fw};
 if(R.f()<.5){
  const bad=[`${ip}.${f}`,`${ip}.0${pad(f,k)}`,`${ip*10}.${pad(f,k)}`,`${ip}.${pad(f,k).split('').reverse().join('')}`,`${ip}${pad(f,k)}`].filter(s=>s!==num&&parseFloat(s)!==parseFloat(num));
  return mk(R,`Which number is written in words as <b>${mkW(k)}</b>?`,num,bad,`The last digit is in the ${DPL[k]} place, so ${mkW(k)} is written ${num}.`);
 }
 const bad=[1,2,3,4].filter(kk=>kk!==k).map(mkW);
 return mk(R,`Which is the word form of <b>${num}</b>?`,mkW(k),bad,`The last digit of ${num} is in the ${DPL[k]} place, so we say "${mkW(k)}".`);
}
NJ.reg({id:'m_nbt2',subj:'math',name:'Decimals: Compare, Round & Read',desc:'Comparing, ordering, rounding, word form',n:10,full:3,daily:1,gen:topicGen([cmpDec,cmpDec,orderDec,roundDec,roundDec,decWords])});

/* ---------- Multiply & divide whole numbers (5.NBT.B.5-6) ---------- */
function mulQ(R){
 const big=R.f()<.3,a=big?R.int(1000,2999):R.int(100,999),b=big?R.int(11,45):R.int(11,99),ans=a*b,t=b%10,ten=b-t;
 const cands=[a*t+a*(ten/10),a*ten,ans+a*10,ans-a,ans+a,ans+100,ans-1000];
 if(R.f()<.3){const ctx=R.pick([['boxes','pencils'],['crates','oranges'],['rows','seats'],['packs','stickers']]);
  return numQ(R,`A school ordered ${b} ${ctx[0]} with ${comma(a)} ${ctx[1]} in each. How many ${ctx[1]} were ordered in all?`,ans,cands,`Multiply ${comma(a)} × ${b} = ${comma(ans)}.`);}
 return numQ(R,`What is the product?\n<b>${comma(a)} × ${b}</b>`,ans,cands,`Multiply by the ones digit, multiply by the tens digit (shifted one place), and add the partial products: ${comma(a*t)} + ${comma(a*ten)} = ${comma(ans)}.`);
}
function divQ(R){
 const d=R.int(11,45),qv=R.int(Math.ceil(1000/d),Math.floor(9998/d)),r=R.f()<.5?0:R.int(1,d-1),n=d*qv+r;
 if(r===0){
  if(R.f()<.5)return numQ(R,`What is the quotient?\n<b>${comma(n)} ÷ ${d}</b>`,qv,[qv+1,qv-1,qv+10,Math.floor(qv/10)],`${comma(n)} ÷ ${d} = ${comma(qv)}, because ${comma(qv)} × ${d} = ${comma(n)}.`);
  const ctx=R.pick([['apples','boxes'],['pages','chapters'],['stickers','sheets'],['miles','days']]);
  return numQ(R,`A factory packs ${comma(n)} ${ctx[0]} equally into ${d} ${ctx[1]}. How many ${ctx[0]} go in each?`,qv,[qv+1,qv-1,qv+10,Math.floor(qv/10)],`${comma(n)} ÷ ${d} = ${comma(qv)}.`);
 }
 if(R.f()<.5){
  const ok=`${comma(qv)} R ${r}`,acc=[`${qv} R ${r}`,`${qv} r ${r}`,`${qv} r${r}`,`${qv}r${r}`];
  if(R.f()<.5)return txt(`What is the quotient and remainder?\n<b>${comma(n)} ÷ ${d}</b>\n(Write it like 25 R 3.)`,acc,`${d} × ${comma(qv)} = ${comma(d*qv)}, and ${comma(n)} − ${comma(d*qv)} = ${r}, so the answer is ${ok}.`);
  return mk(R,`What is the quotient and remainder?\n<b>${comma(n)} ÷ ${d}</b>`,ok,[`${comma(qv)} R ${r+1<d?r+1:r-1}`,`${comma(qv+1)} R ${r}`,`${comma(qv-1)} R ${r}`,`${comma(qv)} R ${Math.max(r-1,0)}`],`${d} × ${comma(qv)} = ${comma(d*qv)}, and ${comma(n)} − ${comma(d*qv)} = ${r}, so the answer is ${ok}.`);
 }
 const ctx=R.pick([['muffins','boxes'],['crayons','bags'],['books','shelves']]);
 return numQ(R,`A store has ${comma(n)} ${ctx[0]} and puts ${d} in each of its ${ctx[1]}. How many ${ctx[1]} can be completely filled?`,qv,[qv+1,qv-1,r,qv+10],`${comma(n)} ÷ ${d} = ${comma(qv)} R ${r}. Only the full ${ctx[1]} count, so ${comma(qv)}.`);
}
function estQ(R){
 const a=R.int(31,98),b=R.int(121,899),ra=Math.round(a/10)*10,rb=Math.round(b/100)*100,est=ra*rb;
 const fl=Math.floor(a/10)*10*Math.floor(b/100)*100;
 return mk(R,`Which is the best estimate for <b>${a} × ${b}</b>?`,comma(est),[comma(fl===est?est+ra*100:fl),comma(ra*rb*10),comma(ra*(rb+100)),comma(ra*rb/10)],`Round ${a} to ${ra} and ${b} to ${rb}. Then ${ra} × ${rb} = ${comma(est)}.`);
}
function multiStep(R){
 const t=R.int(1,3),nm=R.pick(NAMES5);
 if(t===1){const rows=R.int(12,40),seats=R.int(14,35),total=rows*seats,e=R.int(20,Math.floor(total/3));
  return numQ(R,`A theater has ${rows} rows with ${seats} seats in each row. For tonight's show, ${e} seats are empty. How many seats are filled?`,total-e,[total+e,e,total],`Total seats: ${rows} × ${seats} = ${total}. Filled seats: ${total} − ${e} = ${total-e}.`);}
 if(t===2){const n=R.int(12,48),per=R.int(12,36),loose=R.int(5,60);
  return numQ(R,`${nm} bought ${n} packs of stickers with ${per} stickers in each pack. ${nm} also has ${loose} loose stickers. How many stickers does ${nm} have in all?`,n*per+loose,[n*per,n*(per+loose),n+per+loose,n*per-loose],`${n} × ${per} = ${n*per}, and ${n*per} + ${loose} = ${n*per+loose}.`);}
 const per=R.int(12,36),k=R.int(20,90),r=R.int(1,per-1),eggs=per*k+r;
 return numQ(R,`A farm collected ${comma(eggs)} eggs. The eggs are packed into cartons of ${per}. How many eggs are left over after all the full cartons are packed?`,r,[k,r+1,per-r,Math.max(r-1,0)],`${comma(eggs)} ÷ ${per} = ${k} R ${r}. The remainder, ${r}, is the number of eggs left over.`);
}
NJ.reg({id:'m_nbt3',subj:'math',name:'Multiply & Divide Whole Numbers',desc:'Multi-digit multiplication, division with remainders, estimating, word problems',n:10,full:3,daily:1,gen:topicGen([mulQ,mulQ,divQ,divQ,estQ,multiStep,multiStep])});

/* ---------- Decimal operations (5.NBT.B.7) ---------- */
const dp2=x=>x.toFixed(2);
function decAdd(R){
 const a=R.int(105,9999)/100,b=R.f()<.5?R.int(105,9999)/100:R.int(11,999)/10,ans=rd(a+b);
 return numQ(R,`Find the sum.\n<b>${dp2(a)} + ${b===Math.round(b*10)/10&&R.f()<.5?b.toFixed(1):dp2(b)}</b>`,ans,[rd(a+b/10),rd(a/10+b),rd(ans+.1),rd(ans-.1),rd(ans+1)],`Line up the decimal points and add each place value: ${fmtN(ans)}.`,{step:.01});
}
function decSub(R){
 let a=R.int(205,9999)/100,b=R.int(105,Math.floor(a*100)-10)/100;if(b>=a)return null;const ans=rd(a-b);
 return numQ(R,`Find the difference.\n<b>${dp2(a)} − ${dp2(b)}</b>`,ans,[rd(a-b/10),rd(ans+.1),rd(ans-.1),rd(ans+1),rd(ans+.9)],`Line up the decimal points, regroup if needed, and subtract: ${fmtN(ans)}.`,{step:.01});
}
function decMul(R){
 if(R.f()<.4){const w=R.int(2,9),x=R.int(12,99)/10,ans=rd(x*w);
  return numQ(R,`What is the product?\n<b>${x.toFixed(1)} × ${w}</b>`,ans,[rd(ans*10),rd(ans/10),rd(ans+w),rd(ans-.1*w)],`${x.toFixed(1)} × ${w} = ${fmtN(ans)}.`,{step:.1});}
 const a=R.int(2,99)/10,b=R.int(2,19)/10,ans=rd(a*b);
 return numQ(R,`What is the product?\n<b>${a.toFixed(1)} × ${b.toFixed(1)}</b>`,ans,[rd(ans*10),rd(ans/10),rd(ans*100),rd(a+b)],`Multiply as whole numbers (${Math.round(a*10)} × ${Math.round(b*10)} = ${Math.round(a*10)*Math.round(b*10)}). Each factor has one decimal place, so the product has two decimal places: ${fmtN(ans)}.`,{step:.01});
}
function decDiv(R){
 if(R.f()<.5){const w=R.int(2,9),qd=R.int(11,999)/100,v=rd(qd*w);
  return numQ(R,`What is the quotient?\n<b>${fmtN(v)} ÷ ${w}</b>`,qd,[rd(qd*10),rd(qd/10),rd(qd+.1),rd(qd-.1)],`${fmtN(v)} ÷ ${w} = ${fmtN(qd)}, because ${fmtN(qd)} × ${w} = ${fmtN(v)}.`,{step:.01});}
 const dv=R.int(2,9)/10,qi=R.int(3,40),v=rd(dv*qi);
 return numQ(R,`What is the quotient?\n<b>${fmtN(v)} ÷ ${dv}</b>`,qi,[qi*10,qi/10,qi+1,qi-1],`Multiply both numbers by 10 to make the divisor a whole number: ${fmtN(v*10)} ÷ ${dv*10} = ${qi}.`);
}
function decWord(R){
 const t=R.int(1,4),nm=R.pick(NAMES5);
 if(t===1){const p1=R.int(150,995)/100,p2=R.int(150,995)/100,pay=Math.ceil(p1+p2)+R.int(1,10),ans=rd(pay-p1-p2);
  return numQ(R,`${nm} bought a notebook for $${dp2(p1)} and a pen set for $${dp2(p2)}. ${nm} paid with $${pay}. How much change should ${nm} get? (Answer in dollars.)`,ans,[rd(p1+p2),rd(ans+1),rd(ans-1),rd(pay-p1)],`Total: ${dp2(p1)} + ${dp2(p2)} = ${dp2(rd(p1+p2))}. Change: ${pay} − ${dp2(rd(p1+p2))} = ${fmtN(ans)}.`,{step:.01});}
 if(t===2){const w=R.int(3,9),pr=R.int(120,899)/100,tot=rd(pr*w);
  return numQ(R,`${w} pounds of grapes cost $${dp2(tot)}. At that price, how much does 1 pound of grapes cost? (Answer in dollars.)`,pr,[rd(pr*10),rd(pr/10),rd(tot-w),rd(pr+.1)],`${dp2(tot)} ÷ ${w} = ${fmtN(pr)}.`,{step:.01});}
 if(t===3){const p=R.pick([.5,.25,.4,.6,1.5,.2]),k=R.int(6,30),L=rd(p*k);
  return numQ(R,`A rope is ${fmtN(L)} meters long. It is cut into pieces that are each ${fmtN(p)} meter long. How many pieces are there?`,k,[k+1,k-1,k*10,Math.round(k/10)],`${fmtN(L)} ÷ ${fmtN(p)} = ${k}.`);}
 const a=R.int(21,99)/10,b=R.int(21,99)/10,c=R.int(21,99)/10,ans=rd(a+b+c);
 return numQ(R,`${nm} ran ${a.toFixed(1)} km on Monday, ${b.toFixed(1)} km on Tuesday, and ${c.toFixed(1)} km on Wednesday. How many kilometers did ${nm} run in all?`,ans,[rd(ans+1),rd(ans-1),rd(ans+.1),rd(ans*10)],`${a.toFixed(1)} + ${b.toFixed(1)} + ${c.toFixed(1)} = ${fmtN(ans)} km.`,{step:.1});
}
NJ.reg({id:'m_nbt4',subj:'math',name:'Decimal Operations',desc:'Add, subtract, multiply, and divide decimals, money problems',n:10,full:3,daily:1,gen:topicGen([decAdd,decSub,decMul,decMul,decDiv,decDiv,decWord,decWord])});
