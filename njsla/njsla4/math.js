/* ===== 4th grade MATH (NJSLA style) ===== */
const NM4=['Maya','Leo','Ava','Noah','Zoe','Ben','Lily','Sam','Ella','Max','Ivy','Omar'];
const mx4=(w,n,d)=>w?`${w} ${FR(n,d)}`:FR(n,d);
const mxT=(w,n,d)=>w?`${w} ${n}/${d}`:`${n}/${d}`;
function angSVG(deg,lab){const x0=26,y0=120,L=110,a=deg*Math.PI/180,x1=x0+L,x2=x0+L*Math.cos(a),y2=y0-L*Math.sin(a);
 const r=28,ax=x0+r*Math.cos(a),ay=y0-r*Math.sin(a);let s=`<line x1="${x0}" y1="${y0}" x2="${x1}" y2="${y0}" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><line x1="${x0}" y1="${y0}" x2="${x2}" y2="${y2}" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>`;
 s+=deg===90?`<path d="M${x0+16} ${y0}L${x0+16} ${y0-16}L${x0} ${y0-16}" fill="none" stroke="#E0457B" stroke-width="2"/>`:`<path d="M${x0+r} ${y0}A${r} ${r} 0 0 0 ${ax} ${ay}" fill="none" stroke="#E0457B" stroke-width="2"/>`;
 return svgW(160,134,s,'angle')}
function linePic(kind){let s='';
 if(kind==='parallel')s=`<line x1="20" y1="40" x2="190" y2="30" stroke="currentColor" stroke-width="3"/><line x1="20" y1="90" x2="190" y2="80" stroke="currentColor" stroke-width="3"/>`;
 else if(kind==='perpendicular')s=`<line x1="105" y1="10" x2="105" y2="110" stroke="currentColor" stroke-width="3"/><line x1="30" y1="60" x2="180" y2="60" stroke="currentColor" stroke-width="3"/><path d="M105 60L117 60L117 48L105 48" fill="none" stroke="#E0457B" stroke-width="2" transform="translate(-12 12)"/>`;
 else s=`<line x1="30" y1="100" x2="180" y2="20" stroke="currentColor" stroke-width="3"/><line x1="40" y1="25" x2="170" y2="100" stroke="currentColor" stroke-width="3"/>`;
 return svgW(210,120,s,'two lines')}

/* ---------- Multiplicative comparison & word problems ---------- */
function oaComp(R){const a=R.int(3,12),k=R.int(2,9),nm=R.pick(NM4),m=R.pick(NM4.filter(x=>x!==nm)),t=R.int(1,3);
 if(t===1)return numQ(R,`${nm} has ${a} stickers. ${m} has ${k} times as many stickers as ${nm}. How many stickers does ${m} have?`,a*k,[a+k,a*k+a,a*k-k],`${k} times as many means ${k} × ${a} = ${a*k}.`);
 if(t===2)return mk(R,`${m} has ${a*k} marbles. That is ${k} times as many as ${nm} has. Which equation shows how many marbles ${nm} has? Use n for the unknown.`,`${k} × n = ${a*k}`,[`${k} + n = ${a*k}`,`n × ${a*k} = ${k}`,`n − ${k} = ${a*k}`],`${k} times n is ${a*k}.`);
 return numQ(R,`A ruler is ${a*k} centimeters long. A pencil is ${a} centimeters long. The ruler is how many times as long as the pencil?`,k,[k+1,k-1,a*k-a],`${a*k} ÷ ${a} = ${k}.`)}
function oaRem(R){const per=R.int(6,48),k=R.int(5,30),r=R.int(1,per-1),tot=per*k+r,t=R.int(1,3),nm=R.pick(NM4);
 if(t===1)return numQ(R,`A school needs to take ${tot} students on a trip. Each bus holds ${per} students. How many buses are needed?`,k+1,[k,k+2,r],`${tot} ÷ ${per} = ${k} R ${r}. The ${r} extra students need one more bus: ${k+1} buses.`);
 if(t===2)return numQ(R,`${nm} has ${tot} beads and makes bracelets with ${per} beads each. How many complete bracelets can ${nm} make?`,k,[k+1,r,k-1],`${tot} ÷ ${per} = ${k} R ${r}. Only full bracelets count: ${k}.`);
 return numQ(R,`${nm} puts ${tot} photos into albums that hold ${per} photos each. How many photos are in the last album that is not full?`,r,[k,per-r,r+1],`${tot} ÷ ${per} = ${k} R ${r}. The remainder ${r} is the number in the last album.`)}
function oaEq(R){const a=R.int(2,9),b=R.int(1,15),x=R.int(2,12),p=a*x+b;
 return numQ(R,`${a} × n + ${b} = ${p}. What is the value of n?`,x,[x+1,x-1,p-b,(p+b)/a|0],`${p} − ${b} = ${p-b}, and ${p-b} ÷ ${a} = ${x}.`)}
function oaEqPick(R){const c=R.int(20,60),p=R.int(2,5),b=R.int(3,9),nm=R.pick(NM4),left=c-p*b;if(left<=0)return null;
 return mk(R,`${nm} had $${c}. ${nm} bought ${p} books that cost the same amount. ${nm} has $${left} left. Which equation can find the cost of one book, b?`,`${c} − ${p} × b = ${left}`,[`${c} − ${p} + b = ${left}`,`${c} + ${p} × b = ${left}`,`${p} × ${c} − b = ${left}`],`Money spent is ${p} × b, taken from ${c}, leaves ${left}.`)}
function oaEst(R){const a=R.int(213,897),b=R.int(212,799),ra=Math.round(a/100)*100,rb=Math.round(b/100)*100;
 return mk(R,`${a} + ${b}. Which is the best estimate?`,comma(ra+rb),[comma(ra+rb+200),comma(ra+rb-200),comma(ra+rb+1000)],`Round to hundreds: ${ra} + ${rb} = ${ra+rb}.`,{},true)}
NJ.reg({id:'m4_oa',subj:'math',name:'Word Problems & Multiplicative Comparison',desc:'Times as many, remainders, equations with a letter, estimating',n:10,full:4,daily:2,gen:topicGen([oaComp,oaComp,oaRem,oaRem,oaEq,oaEqPick,oaEst])});

/* ---------- Factors, multiples, primes ---------- */
const isP=n=>{if(n<2)return false;for(let i=2;i*i<=n;i++)if(n%i===0)return false;return true};
const facs=n=>{const o=[];for(let i=1;i<=n;i++)if(n%i===0)o.push(i);return o};
function faFactor(R){const n=R.pick([12,16,18,20,24,28,30,32,36,40,42,45,48,54,60]),F=facs(n);const ok=R.pick(F.filter(x=>x>1&&x<n)),bad=[];for(let i=2;i<n&&bad.length<3;i++)if(n%i&&R.f()<.6)bad.push(i);
 for(let i=n+1;bad.length<3;i++)bad.push(i);return mk(R,`Which number is a factor of ${n}?`,String(ok),bad.map(String),`${n} ÷ ${ok} = ${n/ok} with no remainder.`)}
function faList(R){const n=R.pick([12,18,20,24,28,30,36]),F=facs(n),ok=F.join(', ');
 const bad=[F.filter((x,i)=>i!==2).join(', '),F.concat([n+1]).sort((a,b)=>a-b).join(', '),F.filter(x=>x!==1).join(', ')];
 return mk(R,`Which list shows <b>all</b> the factors of ${n}?`,ok,bad,`Factor pairs of ${n}: ${F.slice(0,Math.ceil(F.length/2)).map(x=>x+' × '+n/x).join(', ')}.`)}
function faMult(R){const a=R.int(3,12),k=R.int(2,9);
 if(R.f()<.5)return numQ(R,`What is the ${k===2?'2nd':k===3?'3rd':k+'th'} multiple of ${a}?`,a*k,[a+k,a*(k+1),a*(k-1)],`${a} × ${k} = ${a*k}.`);
 const m=a*R.int(3,12),bad=[m+1,m-1,m+a+1].map(String);return mk(R,`Which number is a multiple of ${a}?`,String(m),bad,`${m} ÷ ${a} = ${m/a}.`)}
function faPrime(R){const t=R.int(1,3),P=[11,13,17,19,23,29,31,37,41,43,47],C=[21,25,27,33,35,39,49,51,55,57,63,65,77,91];
 if(t===1)return mk(R,'Which number is a <b>prime</b> number?',String(R.pick(P)),R.sample(C,3).map(String),'A prime number has exactly two factors: 1 and itself.');
 if(t===2){const c=R.pick(C);return mk(R,'Which number is a <b>composite</b> number?',String(c),R.sample(P,3).map(String),`${c} has more than two factors: ${facs(c).join(', ')}.`)}
 return multi(R,'Select ALL the prime numbers.',R.sample(P,2).map(String),R.sample(C,2).map(String),'Prime numbers have exactly two factors.')}
function faIs(R){const c=R.pick([51,57,87,91,93,119]),f=facs(c);return mk(R,`Is ${c} prime or composite?`,'Composite, because it has factors other than 1 and itself.',['Prime, because it is odd.','Prime, because it is not a multiple of 2 or 5.','Neither prime nor composite.'],`${c} = ${f[1]} × ${c/f[1]}, so it is composite.`)}
NJ.reg({id:'m4_fac',subj:'math',name:'Factors, Multiples & Primes',desc:'Factor pairs, multiples, prime and composite numbers',n:10,full:3,daily:1,gen:topicGen([faFactor,faList,faMult,faMult,faPrime,faPrime,faIs])});

/* ---------- Patterns ---------- */
function paNum(R){const t=R.int(1,3),s=R.int(1,9);
 if(t===1){const d=R.int(3,12),q=[0,1,2,3].map(i=>s+i*d);return numQ(R,`Rule: Start at ${s}. Add ${d}.\nWhat is the 6th number in the pattern?`,s+5*d,[s+6*d,s+4*d,s+5*d+1],`${q.join(', ')}, ${s+4*d}, ${s+5*d}.`)}
 if(t===2){const m=R.int(2,4),q=[s,s*m,s*m*m,s*m*m*m];return numQ(R,`Rule: Multiply by ${m}.\n${q.join(', ')}, ____`,q[3]*m,[q[3]+m,q[3]*m+1,q[3]*(m+1)],`${q[3]} × ${m} = ${q[3]*m}.`)}
 const d=R.int(3,9),n=R.int(40,90),q=[0,1,2,3].map(i=>n-i*d);return numQ(R,`Rule: Start at ${n}. Subtract ${d}.\n${q.join(', ')}, ____`,n-4*d,[n-3*d,n-5*d,n-4*d+1],`${q[3]} − ${d} = ${n-4*d}.`)}
function paRule(R){const s=R.int(2,12),d=R.int(3,9),q=[0,1,2,3,4].map(i=>s+i*d),bad=q.slice(),k=R.int(1,4);bad[k]+=R.pick([-1,1,2]);
 return mk(R,`Which number does <b>not</b> follow the rule "Start at ${s}. Add ${d}."?\n${bad.join(', ')}`,String(bad[k]),bad.filter((x,i)=>i!==k).slice(0,3).map(String),`The numbers should be ${q.join(', ')}. ${bad[k]} breaks the pattern.`)}
function paShape(R){const a=R.int(2,5),b=R.int(1,4),fig=[1,2,3,4].map(i=>a*i+b),n=R.int(6,9);
 return numQ(R,`The table shows the number of tiles in each figure of a pattern. How many tiles are in Figure ${n}?`,a*n+b,[a*n,fig[3]+a*(n-4)+1,a*(n+1)+b],`The tiles go up by ${a} each time: ${a} × ${n} + ${b} = ${a*n+b}.`,{pics:TBL(['Figure','1','2','3','4'],[['Tiles',...fig]])})}
function paFeat(R){const d=R.pick([2,5,10]),s=R.int(0,5);return mk(R,`Look at the pattern: ${[0,1,2,3,4].map(i=>s*d+i*d).join(', ')}, ... What do you notice?`,d===2?'All the numbers are even.':d===5?'The numbers end in 0 or 5.':'All the numbers end in 0.',d===2?['All the numbers are odd.','The numbers end in 5.','The numbers are all prime.']:d===5?['All the numbers are even.','The numbers end in 2 or 7.','The numbers are all odd.']:['The numbers end in 5.','The numbers end in 1.','The numbers are all odd.'],`Look at the ones digits to find the feature.`)}
NJ.reg({id:'m4_pat',subj:'math',name:'Patterns',desc:'Number rules, finding errors, shape patterns',n:10,full:3,daily:1,gen:topicGen([paNum,paNum,paRule,paShape,paShape,paFeat])});

/* ---------- Place value & rounding ---------- */
function pvDigit(R){const n=R.int(100001,999999),s=String(n),i=R.int(0,5),v=+s[i]*Math.pow(10,5-i),dg=s[i];if(dg==='0')return null;
 const same=s.split('').filter(c=>c===dg).length;if(same>1)return null;
 return numQ(R,`What is the value of the digit ${dg} in ${comma(n)}?`,v,[+dg,v*10,v/10].filter(x=>x>0),`The ${dg} is in the ${['hundred thousands','ten thousands','thousands','hundreds','tens','ones'][i]} place, so its value is ${comma(v)}.`,{step:Math.pow(10,5-i)})}
function pvExp(R){const n=R.int(10001,999999),s=String(n),parts=s.split('').map((c,i)=>+c*Math.pow(10,s.length-1-i)).filter(x=>x>0);if(parts.length<3)return null;
 const ok=parts.map(comma).join(' + '),bad=[];for(let k=0;k<3;k++){const p=parts.slice();const i=R.int(0,p.length-1);p[i]=p[i]*R.pick([10,.1<1?10:1]);const t=p.map(comma).join(' + ');if(t!==ok&&!bad.includes(t))bad.push(t)}
 const sw=parts.slice();sw.pop();sw.push(parts[parts.length-1]*10);const t=sw.map(comma).join(' + ');if(t!==ok&&!bad.includes(t))bad.push(t);
 return mk(R,`Which shows ${comma(n)} in expanded form?`,ok,bad,`Write each digit's value and add: ${ok}.`)}
function pvCmp(R){const a=R.int(100000,999999),b=R.f()<.5?a+R.pick([-1,1,9,-9,100,-100,1000,-1000]):R.int(100000,999999),sym=a<b?'<':a>b?'>':'=';
 return mk(R,`Which symbol makes the statement true?\n${comma(a)}  ___  ${comma(b)}`,sym,['<','>','='].filter(x=>x!==sym).concat(['cannot tell']),`Compare digits from the left. ${comma(a)} is ${a<b?'less than':a>b?'greater than':'equal to'} ${comma(b)}.`)}
function pvRound(R){const n=R.int(10001,999999),p=R.pick([10,100,1000,10000,100000]),a=Math.round(n/p)*p,fl=Math.floor(n/p)*p;const nm={10:'ten',100:'hundred',1000:'thousand',10000:'ten thousand',100000:'hundred thousand'}[p];
 return numQ(R,`Round ${comma(n)} to the nearest ${nm}.`,a,[fl===a?a+p:fl,a-p===fl?a+p:a-p,Math.round(n/(p*10))*p*10],`Look at the digit to the right of the ${nm}s place. ${comma(n)} rounds to ${comma(a)}.`,{step:p})}
function pvTen(R){const d=R.int(2,9),k=R.int(0,3),big=d*Math.pow(10,k+1),small=d*Math.pow(10,k);return mk(R,`In the number ${comma(big+small)}, the ${d} in the ${comma(big)} place is how many times as much as the ${d} in the ${comma(small)} place?`,'10 times',['100 times','1,000 times','2 times'],`Each place is 10 times the value of the place to its right.`)}
NJ.reg({id:'m4_pv',subj:'math',name:'Place Value & Rounding',desc:'Numbers to 1,000,000, expanded form, comparing, rounding',n:10,full:3,daily:1,gen:topicGen([pvDigit,pvExp,pvCmp,pvCmp,pvRound,pvRound,pvTen])});

/* ---------- Add & subtract ---------- */
function asAdd(R){const a=R.int(12000,600000),b=R.int(11000,990000-a);return numQ(R,`${comma(a)} + ${comma(b)} = ____`,a+b,[a+b+1000,a+b-1000,a+b+10000,a+b+100],`Line up the place values and add, regrouping when needed: ${comma(a+b)}.`)}
function asSub(R){const a=R.int(200000,999999),b=R.int(11000,a-5000);return numQ(R,`${comma(a)} − ${comma(b)} = ____`,a-b,[a-b+1000,a-b-1000,a-b+10000,a+b],`Subtract place by place, regrouping when needed: ${comma(a-b)}.`)}
function asWord(R){const a=R.int(20000,300000),b=R.int(10000,200000),nm=R.pick(NM4),t=R.int(1,2);
 if(t===1)return numQ(R,`A town had ${comma(a)} visitors in June and ${comma(b)} visitors in July. How many visitors came in both months?`,a+b,[a+b+1000,a+b-1000,a+b+10000],`${comma(a)} + ${comma(b)} = ${comma(a+b)}.`);
 const A=a+b;return numQ(R,`A stadium holds ${comma(A)} people. ${comma(b)} seats are filled. How many seats are empty?`,a,[a+1000,a-1000,a+10000],`${comma(A)} − ${comma(b)} = ${comma(a)}.`)}
NJ.reg({id:'m4_addsub',subj:'math',name:'Add & Subtract Large Numbers',desc:'Multi-digit addition and subtraction to 1,000,000, word problems',n:10,full:3,daily:1,gen:topicGen([asAdd,asAdd,asSub,asSub,asWord,asWord])});

/* ---------- Multiply ---------- */
function muA(R){const a=R.int(1000,9999),b=R.int(2,9);return numQ(R,`${comma(a)} × ${b} = ____`,a*b,[a*b+1000,a*b-100,a*b+b,a*b+10],`Multiply each place by ${b}, regrouping: ${comma(a*b)}.`)}
function muB(R){const a=R.int(12,99),b=R.int(12,99);return numQ(R,`${a} × ${b} = ____`,a*b,[a*b+10,a*b-10,a*b+100,a*(b+1)],`Partial products: ${a} × ${b%10} = ${a*(b%10)} and ${a} × ${b-b%10} = ${a*(b-b%10)}. Add: ${a*b}.`)}
function muC(R){const a=R.int(101,999),b=R.int(2,9);return numQ(R,`${a} × ${b} = ____`,a*b,[a*b+100,a*b-10,a*b+b,a*b+10],`${a} × ${b} = ${a*b}.`)}
function muW(R){const nm=R.pick(NM4),a=R.int(12,64),b=R.int(12,48),t=R.int(1,2);
 if(t===1)return numQ(R,`A theater has ${a} rows with ${b} seats in each row. How many seats are there?`,a*b,[a*b+10,a+b,a*b-100],`${a} × ${b} = ${a*b}.`);
 const c=R.int(2,9),d=R.int(120,999);return numQ(R,`${nm} reads ${d} pages each week for ${c} weeks. How many pages does ${nm} read in all?`,d*c,[d+c,d*c+100,d*c-10],`${d} × ${c} = ${d*c}.`)}
function muE(R){const a=R.int(21,89),b=R.int(21,79),ra=Math.round(a/10)*10,rb=Math.round(b/10)*10;return mk(R,`Which is the best estimate for ${a} × ${b}?`,comma(ra*rb),[comma(ra*rb*10),comma(ra*rb/10),comma(ra*rb+1000)],`Round to ${ra} × ${rb} = ${ra*rb}.`,{},true)}
NJ.reg({id:'m4_mul',subj:'math',name:'Multiply Whole Numbers',desc:'4-digit × 1-digit, 2-digit × 2-digit, estimating, word problems',n:10,full:3,daily:1,gen:topicGen([muA,muB,muB,muC,muW,muW,muE])});

/* ---------- Divide ---------- */
function dvPlain(R){const d=R.int(2,9),q=R.int(100,999);return numQ(R,`${comma(d*q)} ÷ ${d} = ____`,q,[q+1,q-1,q+10,q*10],`${d} × ${q} = ${comma(d*q)}, so ${comma(d*q)} ÷ ${d} = ${q}.`)}
function dvRem(R){const d=R.int(2,9),q=R.int(100,1200),r=R.int(1,d-1),n=d*q+r,ok=`${comma(q)} R ${r}`;
 if(R.f()<.5)return txt(`${comma(n)} ÷ ${d} = ____\n(Write like 25 R 3.)`,[`${q} R ${r}`,`${q} r ${r}`,`${q}R${r}`,`${comma(q)} R ${r}`],`${d} × ${comma(q)} = ${comma(d*q)} and ${comma(n)} − ${comma(d*q)} = ${r}. The answer is ${ok}.`);
 return mk(R,`${comma(n)} ÷ ${d} = ____`,ok,[`${comma(q)} R ${r+1<d?r+1:r-1}`,`${comma(q+1)} R ${r}`,`${comma(q-1)} R ${r}`,`${comma(q)} R ${d}`],`${d} × ${comma(q)} + ${r} = ${comma(n)}.`)}
function dvWord(R){const d=R.int(3,9),q=R.int(60,900),nm=R.pick(NM4),t=R.int(1,2);
 if(t===1)return numQ(R,`${nm} has ${comma(d*q)} stickers and puts them equally into ${d} albums. How many stickers are in each album?`,q,[q+1,q-1,q*10],`${comma(d*q)} ÷ ${d} = ${q}.`);
 const r=R.int(1,d-1);return numQ(R,`There are ${comma(d*q+r)} apples packed ${d} to a bag. How many apples are left over after filling all the bags?`,r,[q,r+1,d-r],`${comma(d*q+r)} ÷ ${d} = ${q} R ${r}.`)}
function dvChk(R){const d=R.int(3,9),q=R.int(20,200),r=R.int(1,d-1);return mk(R,`Which multiplication and addition check shows that ${d*q+r} ÷ ${d} = ${q} R ${r}?`,`${q} × ${d} + ${r} = ${d*q+r}`,[`${q} × ${r} + ${d} = ${d*q+r}`,`${q} + ${d} + ${r} = ${d*q+r}`,`${d} × ${r} + ${q} = ${d*q+r}`],`Quotient × divisor + remainder = dividend.`)}
NJ.reg({id:'m4_div',subj:'math',name:'Divide Whole Numbers',desc:'Division with 1-digit divisors, remainders, word problems',n:10,full:3,daily:1,gen:topicGen([dvPlain,dvRem,dvRem,dvWord,dvWord,dvChk])});

/* ---------- Equivalent fractions & comparing ---------- */
function feEq(R){const d=R.pick([2,3,4,5,6]),n=R.int(1,d-1),k=R.int(2,5);if(n/d===.5&&R.f()<.5)return null;
 if(R.f()<.5)return numQ(R,`${n}/${d} = ____/${d*k}`,n*k,[n+k,n,d*k-n],`Multiply the top and bottom by ${k}: ${n}/${d} = ${n*k}/${d*k}.`);
 return numQ(R,`${n*k}/${d*k} = ${n}/____`,d,[d+1,d*k,d-1],`Divide the top and bottom by ${k}: ${n*k}/${d*k} = ${n}/${d}.`)}
function feBench(R){const d=R.pick([4,6,8,10,12]),h=d/2,big=R.int(h+1,d-1),s1=R.int(1,h-1),s2=R.int(1,h-1);
 if(R.f()<.5)return mk(R,`Which fraction is greater than ${FR(1,2)}?`,FR(big,d),[FR(s1,d),FR(h,d),s2!==s1?FR(s2,d):FR(Math.max(s1-1,1),d)],`${h}/${d} is equal to 1/2. ${big}/${d} has a greater numerator, so it is greater than 1/2.`);
 return mk(R,`Which fraction is closest to 0?`,FR(1,d),[FR(h,d),FR(big,d),FR(d-1,d)],`1/${d} is a tiny part of a whole, so it is closest to 0.`)}
function feCmp(R){const pairs=[[3,4,5,8],[2,3,5,6],[1,2,3,8],[3,5,1,2],[5,6,7,12],[2,5,3,10],[7,8,3,4],[1,3,3,8],[2,3,3,4],[4,5,7,10],[5,8,3,5],[3,4,7,12]],[a,b,c,d]=R.pick(pairs),va=a/b,vc=c/d;if(va===vc)return null;
 const sym=va<vc?'<':'>';return mk(R,`Which symbol makes the statement true?\n${FR(a,b)}  ___  ${FR(c,d)}`,sym,['<','>','=','cannot tell'].filter(x=>x!==sym),`Use a common denominator or a benchmark: ${a}/${b} = ${(a*d)}/${b*d} and ${c}/${d} = ${c*b}/${b*d}.`)}
function feOrd(R){const sets=[[1,2,3,4],[1,4,1,2],[2,3,1,6],[3,4,5,8]];const ds=R.sample([[1,2],[1,4],[3,4],[1,8],[5,8],[3,8],[2,3],[1,3]],3);const v=x=>x[0]/x[1];if(new Set(ds.map(v)).size<3)return null;
 const srt=ds.slice().sort((a,b)=>v(a)-v(b)),f=l=>l.map(x=>FR(x[0],x[1])).join(' , ');const ok=f(srt);
 return mk(R,`Which list is in order from least to greatest?`,ok,[f(srt.slice().reverse()),f([srt[1],srt[0],srt[2]]),f([srt[0],srt[2],srt[1]])],`Rename with a common denominator to compare.`)}
NJ.reg({id:'m4_feq',subj:'math',name:'Equivalent Fractions & Comparing',desc:'Equal fractions, benchmarks, comparing, ordering',n:10,full:3,daily:1,gen:topicGen([feEq,feEq,feCmp,feCmp,feOrd,feBench])});

/* ---------- Add & subtract fractions ---------- */
function faLike(R){const d=R.pick([3,4,5,6,8,10,12]),a=R.int(1,d-2),b=R.int(1,d-1-a),add=R.f()<.5;
 if(add)return fq3(R,`What is ${FR(a,d)} + ${FR(b,d)}?`,[a+b,d],[[a+b,d+d]],`Add the numerators and keep the denominator: ${a}/${d} + ${b}/${d} = ${a+b}/${d}.`);
 return fq3(R,`What is ${FR(a+b,d)} − ${FR(a,d)}?`,[b,d],[[b,d-d||1]].filter(c=>c[1]>0),`Subtract the numerators: ${a+b} − ${a} = ${b}, so the answer is ${b}/${d}.`)}
function faMixed(R){const d=R.pick([3,4,5,6,8]),w1=R.int(1,4),w2=R.int(1,3),n1=R.int(1,d-1),n2=R.int(1,d-1),n=n1+n2,w=w1+w2+(n>=d?1:0),r=n>=d?n-d:n;
 const ans=mx4(w,r,d);if(r===0)return null;return mk(R,`What is ${mx4(w1,n1,d)} + ${mx4(w2,n2,d)}?`,ans,[mx4(w1+w2,n,d),mx4(w1+w2,Math.abs(n1-n2)||1,d),mx4(w+1,r,d),mx4(w,Math.min(r+1,d-1),d)].filter(x=>x!==ans),`Add the whole numbers (${w1+w2}) and the fractions (${n}/${d})${n>=d?', then regroup'  :''}: ${mxT(w,r,d)}.`)}
function faSubMix(R){const d=R.pick([4,5,6,8,10]),w1=R.int(3,7),w2=R.int(1,w1-1),n1=R.int(1,d-2),n2=R.int(n1+1,d-1);
 const wi=w1-w2-1,ni=d+n1-n2,ans=mx4(wi,ni,d);if(wi===0&&false)return null;
 return mk(R,`What is ${mx4(w1,n1,d)} − ${mx4(w2,n2,d)}?`,ans,[mx4(w1-w2,n2-n1,d),mx4(w1-w2,Math.abs(n1-n2),d),mx4(wi+1,ni,d),mx4(wi,Math.max(ni-1,1),d)].filter(x=>x!==ans),`You cannot take ${n2}/${d} from ${n1}/${d}, so regroup 1 whole as ${d}/${d}: ${w1} ${n1}/${d} = ${w1-1} ${n1+d}/${d}. Then subtract: ${mxT(wi,ni,d)}.`)}
function faDecomp(R){const d=R.pick([8,10,12]),n=R.int(5,d-1),a=R.int(1,n-1);
 return mk(R,`Which equation is true?`,`${n}/${d} = ${a}/${d} + ${n-a}/${d}`,[`${n}/${d} = ${a}/${d} + ${n-a}/${d+1}`,`${n}/${d} = ${a}/${d} + ${n+a}/${d}`,`${n}/${d} = ${a}/${d+d} + ${n-a}/${d}`],`Parts with the same denominator add by adding numerators.`)}
function faWord(R){const d=R.pick([6,8,10,12]),a=R.int(1,d-3),b=R.int(1,d-a-1),nm=R.pick(NM4),t=R.int(1,2);
 if(t===1)return fq3(R,`${nm} ate ${a}/${d} of a pizza for lunch and ${b}/${d} of the pizza for dinner. What fraction of the pizza did ${nm} eat in all?`,[a+b,d],[[a+b,d*2]],`${a}/${d} + ${b}/${d} = ${a+b}/${d}.`);
 return fq3(R,`A ribbon is ${a+b}/${d} yard long. ${nm} cuts off ${a}/${d} yard. How much ribbon is left?`,[b,d],[[a,d]],`${a+b}/${d} − ${a}/${d} = ${b}/${d}.`)}
NJ.reg({id:'m4_fadd',subj:'math',name:'Add & Subtract Fractions',desc:'Like denominators, mixed numbers, decomposing, word problems',n:10,full:3,daily:1,gen:topicGen([faLike,faLike,faMixed,faSubMix,faDecomp,faWord,faWord])});

/* ---------- Multiply a fraction by a whole number ---------- */
function fmUnit(R){const d=R.pick([3,4,5,6,8,10]),k=R.int(2,9);return fq3(R,`What is ${k} × ${FR(1,d)}?`,[k,d],[[1,d*k],[k,d*k]],`${k} × 1/${d} means ${k} groups of 1/${d}: ${k}/${d}.`)}
function fmNum(R){const d=R.pick([3,4,5,6,8,10]),n=R.int(2,d-1),k=R.int(2,8);return numQ(R,`${k} × ${n}/${d} = ____/${d}`,k*n,[k+n,n,k*n+1],`${k} × ${n}/${d} = (${k} × ${n})/${d} = ${k*n}/${d}.`)}
function fmMix(R){const d=R.pick([3,4,5,6,8]),n=R.int(2,d-1),k=R.int(3,8),p=k*n,w=Math.floor(p/d),r=p%d;if(r===0||w===0)return null;
 return mk(R,`What is ${k} × ${FR(n,d)} written as a mixed number?`,mx4(w,r,d),[mx4(w+1,r,d),mx4(w,Math.min(r+1,d-1)===r?r+1:Math.min(r+1,d-1),d),mx4(w-1<0?0:w-1,r,d)].filter(x=>x!==mx4(w,r,d)).concat([mx4(w,d-r,d)]),`${k} × ${n}/${d} = ${p}/${d} = ${mxT(w,r,d)}.`)}
function fmWord(R){const d=R.pick([2,3,4,5,6,8]),n=R.int(1,d-1),k=R.int(2,8),p=k*n,w=Math.floor(p/d),r=p%d,nm=R.pick(NM4),t=R.int(1,2);if(r===0&&w===0)return null;
 const ans=r===0?String(w):mx4(w,r,d);const bad=(r===0?[String(w+1),String(w+2),FR(k+n,d),String(w>1?w-1:w+3)]:[mx4(w,Math.min(r+1,d-1)===r?r-1:Math.min(r+1,d-1),d),mx4(w+1,r,d),FR(k+n,d)]).filter(x=>x!==ans);
 if(t===1)return mk(R,`A recipe uses ${FR(n,d)} cup of milk. ${nm} makes ${k} batches. How many cups of milk does ${nm} need?`,ans,bad,`${k} × ${n}/${d} = ${p}/${d}${r===0?' = '+w:' = '+mxT(w,r,d)} cups.`);
 return mk(R,`${nm} walks ${FR(n,d)} mile each day for ${k} days. How many miles does ${nm} walk in all?`,ans,bad,`${k} × ${n}/${d} = ${p}/${d}${r===0?' = '+w:' = '+mxT(w,r,d)} miles.`)}
NJ.reg({id:'m4_fmul',subj:'math',name:'Multiply Fractions by Whole Numbers',desc:'Unit fractions, multiples of fractions, mixed numbers, word problems',n:10,full:3,daily:1,gen:topicGen([fmUnit,fmNum,fmNum,fmMix,fmWord,fmWord])});

/* ---------- Decimals ---------- */
function dcFrac(R){const t=R.int(1,3);
 if(t===1){const n=R.int(1,9);return mk(R,`Write ${FR(n,10)} as a decimal.`,`0.${n}`,[`${n}.0`,`0.0${n}`,`${n}0`],`Tenths are one place after the decimal point.`)}
 if(t===2){const n=R.int(11,99);if(n%10===0)return null;return mk(R,`Write ${FR(n,100)} as a decimal.`,`0.${n}`,[`0.0${n}`,`${n}.0`,`0.${n}0`.replace(/0$/,'')+'0'].filter(x=>x!==`0.${n}`),`Hundredths are two places after the decimal point.`)}
 const n=R.int(11,99);if(n%10===0)return null;return mk(R,`Write 0.${n} as a fraction.`,`${n}/100`,[`${n}/10`,`${n}/1,000`,`1/${n}`],`Two decimal places means hundredths: ${n}/100.`)}
function dcAdd(R){const a=R.int(1,9),b=R.int(1,9);return mk(R,`${FR(a,10)} + ${FR(b,100)} = ?`,`${(a*10+b)}/100`,[`${a+b}/110`,`${a+b}/100`,`${a+b}/10`],`Rename ${a}/10 as ${a*10}/100, then add: ${a*10+b}/100.`)}
function dcCmp(R){const a=R.int(1,9),b=R.int(11,99);if(b%10===0)return null;const x=a/10,y=b/100,A='0.'+a,B='0.'+b,sym=x<y?'<':x>y?'>':'=';if(x===y)return null;
 return mk(R,`Which symbol makes the statement true?\n${A}  ___  ${B}`,sym,['<','>','=','cannot tell'].filter(z=>z!==sym),`Write ${A} as 0.${a}0 to compare: ${(a*10)} hundredths vs ${b} hundredths.`)}
function dcOrd(R){const v=R.sample([0.3,0.35,0.4,0.45,0.5,0.52,0.25,0.2,0.08,0.6],3).sort((a,b)=>a-b);const f=l=>l.map(x=>x.toFixed(x*100%10===0?1:2)).join(' , ');if(new Set(v).size<3)return null;
 return mk(R,`Which list is in order from least to greatest?`,f(v),[f(v.slice().reverse()),f([v[1],v[0],v[2]]),f([v[0],v[2],v[1]])],`Compare tenths and hundredths place by place.`)}
function dcMoney(R){const d=R.int(1,3),c=R.int(1,9)*10,tot=d*100+c;return mk(R,`${d} dollar${d>1?'s':''} and ${c} cents is written as what decimal in dollars?`,`$${d}.${c}`,[`$${d}.0${c/10}`,`$${c}.${d}`,`$${d}${c}`],`${c} cents is ${c}/100 of a dollar.`)}
NJ.reg({id:'m4_dec',subj:'math',name:'Decimals',desc:'Tenths and hundredths, fractions and decimals, comparing',n:10,full:3,daily:1,gen:topicGen([dcFrac,dcFrac,dcAdd,dcCmp,dcCmp,dcOrd,dcMoney])});

/* ---------- Measurement conversions & word problems ---------- */
const CV4=[['kilometer','kilometers','meter','meters',1000],['meter','meters','centimeter','centimeters',100],['kilogram','kilograms','gram','grams',1000],['liter','liters','milliliter','milliliters',1000],['pound','pounds','ounce','ounces',16],['foot','feet','inch','inches',12],['yard','yards','foot','feet',3],['hour','hours','minute','minutes',60],['minute','minutes','second','seconds',60],['gallon','gallons','quart','quarts',4],['week','weeks','day','days',7],['day','days','hour','hours',24]];
function cvBig(R){const c=R.pick(CV4),v=R.int(2,12);return numQ(R,`${v} ${c[1]} = ____ ${c[3]}`,v*c[4],[v+c[4],v*c[4]*10,v*c[4]/10],`1 ${c[0]} = ${c[4]} ${c[3]}, so ${v} × ${c[4]} = ${comma(v*c[4])}.`,{pics:boxHTML(`1 ${c[0]} = ${c[4]} ${c[3]}`),step:c[4]})}
function cvMix(R){const c=R.pick(CV4.slice(0,6).concat(CV4.slice(7,8))),a=R.int(2,9),b=R.int(1,c[4]-1),tot=a*c[4]+b;return numQ(R,`${a} ${c[1]} ${b} ${b===1?c[2]:c[3]} = ____ ${c[3]}`,tot,[a+b,a*c[4]*b,tot+c[4]],`${a} × ${c[4]} = ${a*c[4]}, plus ${b} is ${tot}.`,{pics:boxHTML(`1 ${c[0]} = ${c[4]} ${c[3]}`)})}
function cvWord(R){const nm=R.pick(NM4),t=R.int(1,3);
 if(t===1){const k=R.int(2,9),p=R.int(12,60);return numQ(R,`A movie lasts ${k} hours. ${nm} has already watched ${p} minutes. How many minutes are left?`,k*60-p,[k*60+p,k*60,k+p],`${k} hours = ${k*60} minutes. ${k*60} − ${p} = ${k*60-p}.`)}
 if(t===2){const k=R.int(2,8),r=R.int(100,900);return numQ(R,`${nm} ran ${k} kilometers. ${nm}'s friend ran ${r} meters. How many meters did ${nm} run in all?`,k*1000+r,[k+r,k*100+r,k*1000],`${k} km = ${comma(k*1000)} m. ${comma(k*1000)} + ${r} = ${comma(k*1000+r)}.`)}
 const k=R.int(2,9);return numQ(R,`A bag of rice has a mass of ${k} kilograms. How many grams is that?`,k*1000,[k*100,k*10000,k+1000],`${k} × 1,000 = ${comma(k*1000)} grams.`)}
function cvTime(R){const h=R.int(1,8),m=R.pick([5,10,15,20,25,30,40,45]),d=R.int(20,95),end=h*60+m+d,eh=Math.floor(end/60),em=end%60,T=(a,b)=>`${((a-1)%12)+1}:${String(b).padStart(2,'0')}`;
 return mk(R,`A soccer game starts at ${T(h,m)} and lasts ${d} minutes. What time does it end?`,T(eh,em),[T(eh,(em+10)%60),T(eh+1,em),T(eh,Math.abs(em-10))],`${T(h,m)} + ${d} minutes = ${T(eh,em)}.`)}
NJ.reg({id:'m4_conv',subj:'math',name:'Measurement & Conversions',desc:'Larger to smaller units, mixed units, time and mass word problems',n:10,full:4,daily:2,gen:topicGen([cvBig,cvBig,cvMix,cvWord,cvWord,cvTime])});

/* ---------- Perimeter & area ---------- */
function paArea(R){const l=R.int(4,25),w=R.int(3,18),u=R.pick(['feet','meters','inches','cm']);if(l===w)return null;return numQ(R,`A rectangle is ${l} ${u} long and ${w} ${u} wide. What is its area in square ${u}?`,l*w,[l+w,2*(l+w),l*w+l],`Area = length × width = ${l} × ${w} = ${l*w}.`)}
function paPerim(R){const l=R.int(4,25),w=R.int(3,18);if(l===w)return null;return numQ(R,`What is the perimeter of the rectangle?`,2*(l+w),[l*w,l+w,2*l+w],`Perimeter = 2 × (${l} + ${w}) = ${2*(l+w)}.`,{pics:rectLab(l,w,'ft')})}
function paMiss(R){const l=R.int(4,20),w=R.int(3,15),t=R.int(1,2);if(l===w)return null;
 if(t===1)return numQ(R,`A rectangle has an area of ${l*w} square meters and a width of ${w} meters. What is its length in meters?`,l,[l+1,l*w-w,l-1],`${l*w} ÷ ${w} = ${l}.`);
 return numQ(R,`A rectangle has a perimeter of ${2*(l+w)} feet and a length of ${l} feet. What is its width in feet?`,w,[w+1,2*(l+w)-l,l+w],`Half the perimeter is ${l+w}. ${l+w} − ${l} = ${w}.`)}
function paTwo(R){const l=R.int(5,20),w=R.int(3,12),pw=R.int(1,3),nm=R.pick(NM4);return numQ(R,`${nm}'s garden is ${l} feet long and ${w} feet wide. ${nm} wants to put a fence around the whole garden. How many feet of fence are needed?`,2*(l+w),[l*w,l+w,2*l+w],`The fence goes around the garden: 2 × (${l} + ${w}) = ${2*(l+w)} feet.`)}
function paBoth(R){const s=R.int(4,16);return mk(R,`A square has sides of ${s} units. Which statement is true?`,`Its perimeter is ${4*s} and its area is ${s*s}.`,[`Its perimeter is ${s*s} and its area is ${4*s}.`,`Its perimeter is ${2*s} and its area is ${s*s}.`,`Its perimeter is ${4*s} and its area is ${4*s}.`],`Perimeter = 4 × ${s} = ${4*s}. Area = ${s} × ${s} = ${s*s}.`)}
NJ.reg({id:'m4_pa',subj:'math',name:'Perimeter & Area',desc:'Rectangle formulas, missing sides, word problems',n:10,full:3,daily:1,gen:topicGen([paArea,paArea,paPerim,paPerim,paMiss,paTwo,paBoth])});

/* ---------- Line plots ---------- */
function lp4(R){const d=R.pick([2,4,8]),K=d,T=[],cnt=[];for(let k=0;k<=K;k++){T.push(fr(k,d));cnt.push(R.f()<.45?0:R.int(1,4))}
 const tot=cnt.reduce((a,b)=>a+b,0);if(tot<6||tot>16||cnt.filter(x=>x).length<3)return null;
 const pic=lpSvg(T,cnt,'inches'),idx=cnt.map((x,i)=>x?i:-1).filter(i=>i>=0),t=R.int(1,4),i=R.pick(idx),ctx='The line plot shows the lengths of some pencils in inches.';
 if(t===1)return numQ(R,`${ctx}\nHow many pencils are ${fT(T[i])} inch long?`,cnt[i],[cnt[i]+1,cnt[i]-1,tot],`Count the X marks above ${fT(T[i])}: ${cnt[i]}.`,{pics:pic});
 if(t===2){const j=R.pick(idx.slice(0,-1)||idx),a=cnt.slice(j+1).reduce((x,y)=>x+y,0);if(!a)return null;return numQ(R,`${ctx}\nHow many pencils are longer than ${fT(T[j])} inch?`,a,[a+cnt[j],a-1,a+1],`Count the X marks to the right of ${fT(T[j])}: ${a}.`,{pics:pic})}
 if(t===3){const hi=T[idx[idx.length-1]],lo=T[idx[0]],ans=fsub(hi,lo);if(ans[0]===0)return null;return fq3(R,`${ctx}\nWhat is the difference between the longest and the shortest pencil?`,ans,[fadd(hi,lo)],`${fT(hi)} − ${fT(lo)} = ${fT(ans)} inch.`,{pics:pic})}
 return numQ(R,`${ctx}\nHow many pencils were measured in all?`,tot,[tot+1,tot-1,Math.max(...cnt)],`Add up all the X marks: ${tot}.`,{pics:pic})}
NJ.reg({id:'m4_lp',subj:'math',name:'Line Plots with Fractions',desc:'Read line plots with halves, fourths, and eighths',n:10,full:3,daily:1,gen:topicGen([lp4])});

/* ---------- Angles ---------- */
function anType(R){const deg=R.pick([30,45,60,90,120,135,150]),ty=deg<90?'acute':deg===90?'right':'obtuse';
 return mk(R,`What kind of angle is shown?`,`${cap(ty)} angle`,['Acute angle','Right angle','Obtuse angle','Straight angle'].filter(x=>x!==`${cap(ty)} angle`),`${ty==='acute'?'Less than 90°':ty==='right'?'Exactly 90°':'More than 90° and less than 180°'}.`,{pics:angSVG(deg)})}
function anDef(R){const B=[['An angle measures 90°. What kind of angle is it?','right',['acute','obtuse','straight'],'A right angle is exactly 90°.'],['An angle measures 35°. What kind of angle is it?','acute',['right','obtuse','straight'],'An acute angle is less than 90°.'],['An angle measures 140°. What kind of angle is it?','obtuse',['acute','right','straight'],'An obtuse angle is between 90° and 180°.'],['An angle measures 180°. It is a','straight angle',['right angle','acute angle','obtuse angle'],'A straight angle forms a straight line.'],['A turn through ¼ of a circle is how many degrees?','90°',['45°','180°','360°'],'A full turn is 360°; one fourth is 90°.'],['A turn through ½ of a circle is how many degrees?','180°',['90°','270°','360°'],'Half of 360° is 180°.']];return mk(R,...R.pick(B).slice(0,4))}
function anAdd(R){const a=R.int(15,70),b=R.int(15,80),tot=a+b;if(tot>=180)return null;return numQ(R,`An angle measuring ${tot}° is split into two smaller angles. One of the smaller angles measures ${a}°. What is the measure of the other angle?`,b,[tot+a,tot-a-10,b+10,180-tot],`${tot} − ${a} = ${b}°.`)}
function anStraight(R){const a=R.int(20,150);return numQ(R,`Two angles together form a straight line. One angle is ${a}°. What is the other angle?`,180-a,[360-a,90-a>0?90-a:a,180+a],`180 − ${a} = ${180-a}°.`)}
function anSide(R){return mk(R,'Which tool is used to measure angles?','Protractor',['Ruler','Thermometer','Compass needle'],'A protractor measures angles in degrees.')}
NJ.reg({id:'m4_ang',subj:'math',name:'Angles',desc:'Acute, right, obtuse, turns, adding angle measures',n:10,full:3,daily:1,gen:topicGen([anType,anType,anDef,anDef,anAdd,anStraight,anSide])});

/* ---------- Lines, shapes & symmetry ---------- */
function gLines(R){const k=R.pick(['parallel','perpendicular','intersecting']),nm={parallel:'Parallel lines',perpendicular:'Perpendicular lines',intersecting:'Intersecting lines that are not perpendicular'}[k];
 return mk(R,'What kind of lines are shown?',nm,Object.values({parallel:'Parallel lines',perpendicular:'Perpendicular lines',intersecting:'Intersecting lines that are not perpendicular',ray:'Rays that never meet'}).filter(x=>x!==nm),k==='parallel'?'Parallel lines never cross.':k==='perpendicular'?'Perpendicular lines cross at a right angle.':'These lines cross but not at a right angle.',{pics:linePic(k)})}
function gTri(R){const B=[
 ['A triangle has three sides of different lengths. It is','scalene',['equilateral','isosceles','right'],'Scalene triangles have no equal sides.'],
 ['A triangle has three equal sides. It is','equilateral',['scalene','right','obtuse'],'Equilateral means all sides are equal.'],
 ['A triangle has exactly two equal sides. It is','isosceles',['equilateral','scalene','obtuse'],'Isosceles triangles have two equal sides.'],
 ['A triangle has one right angle. It is a','right triangle',['acute triangle','obtuse triangle','equilateral triangle'],'A right triangle has a 90° angle.'],
 ['A triangle has one angle that measures 110°. It is an','obtuse triangle',['acute triangle','right triangle','equilateral triangle'],'An obtuse triangle has one angle greater than 90°.'],
 ['A triangle has angles of 50°, 60°, and 70°. It is an','acute triangle',['obtuse triangle','right triangle','straight triangle'],'All three angles are less than 90°.']];return mk(R,...R.pick(B).slice(0,4))}
function gQuad(R){const B=[
 ['A quadrilateral has 4 right angles and 4 equal sides. It is a','square',['trapezoid','triangle','pentagon'],'This describes a square.'],
 ['A quadrilateral has opposite sides parallel but no right angles. It could be a','parallelogram',['rectangle','square','triangle'],'A slanted shape with two pairs of parallel sides is a parallelogram.'],
 ['Which shape has exactly one pair of parallel sides?','trapezoid',['rectangle','parallelogram','square'],'A trapezoid has one pair of parallel sides (in this grade\'s definition).'],
 ['How many sides does a hexagon have?','6',['5','7','8'],'Hex means six.']];return mk(R,...R.pick(B).slice(0,4))}
function gSym(R){const B=[['How many lines of symmetry does a square have?','4',['1','2','8'],'A square has 4 lines of symmetry.'],['How many lines of symmetry does a rectangle (not a square) have?','2',['1','4','0'],'A rectangle has 2 lines of symmetry.'],['How many lines of symmetry does an equilateral triangle have?','3',['1','2','6'],'It has 3 lines of symmetry.'],['How many lines of symmetry does a regular hexagon have?','6',['3','2','4'],'A regular hexagon has 6 lines of symmetry.'],['Which letter has a line of symmetry?','A',['F','G','R'],'The letter A can be folded in half so both sides match.'],['Which shape has no lines of symmetry?','A scalene triangle',['A square','A rectangle','A circle'],'A scalene triangle cannot be folded to match.']];return mk(R,...R.pick(B).slice(0,4))}
NJ.reg({id:'m4_geo',subj:'math',name:'Lines, Shapes & Symmetry',desc:'Parallel and perpendicular, triangles, quadrilaterals, symmetry',n:10,full:3,daily:1,gen:topicGen([gLines,gTri,gTri,gQuad,gSym,gSym])});
