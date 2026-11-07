/* ===== 3rd grade MATH (NJSLA style) ===== */
const NM3=['Maya','Leo','Ava','Noah','Zoe','Ben','Lily','Sam','Ella','Max','Ivy','Omar'];
function dots(r,c){let s='';for(let i=0;i<r;i++)for(let j=0;j<c;j++)s+=`<circle cx="${14+j*20}" cy="${14+i*20}" r="7" fill="#E0457B"/>`;return svgW(c*20+8,r*20+8,s,`array of ${r} rows and ${c} columns`)}
function fracShape(n,d,shape,sz){
 sz=sz||150;
 if(shape==='circle'){const r=sz/2-4,cx=sz/2,cy=sz/2;let s='';for(let k=0;k<d;k++){const a0=-Math.PI/2+k*2*Math.PI/d,a1=-Math.PI/2+(k+1)*2*Math.PI/d;
   const p=d===1?`M${cx-r} ${cy}a${r} ${r} 0 1 0 ${2*r} 0a${r} ${r} 0 1 0 ${-2*r} 0`:`M${cx} ${cy}L${cx+r*Math.cos(a0)} ${cy+r*Math.sin(a0)}A${r} ${r} 0 ${2*Math.PI/d>Math.PI?1:0} 1 ${cx+r*Math.cos(a1)} ${cy+r*Math.sin(a1)}Z`;
   s+=`<path d="${p}" ${k<n?FL:'fill="none"'} stroke="currentColor" stroke-width="1.6"/>`}return inl(sz,sz,s)}
 const W=sz*1.4,H=40,w=(W-4)/d;let s='';for(let k=0;k<d;k++)s+=`<rect x="${2+k*w}" y="2" width="${w}" height="${H-4}" ${k<n?FL:'fill="none"'} stroke="currentColor" stroke-width="1.6"/>`;return inl(W,H,s);
}
const fracPic=(n,d,shape)=>`<div class="pics"><div class="pic" style="padding:8px">${fracShape(n,d,shape)}</div></div>`;
function numLine(d,top,pt,lab){let s=`<line x1="20" y1="50" x2="${20+top*240}" y2="50" stroke="currentColor" stroke-width="2"/>`;
 for(let k=0;k<=top*d;k++){const x=20+k*240/d,big=k%d===0;s+=`<line x1="${x}" y1="${big?42:45}" x2="${x}" y2="${big?58:55}" stroke="currentColor" stroke-width="2"/>`;if(big)s+=`<text x="${x}" y="76" font-size="14" text-anchor="middle" fill="currentColor">${k/d}</text>`}
 if(pt!==null){const x=20+pt*240/d;s+=`<circle cx="${x}" cy="50" r="6" fill="#E0457B"/><text x="${x}" y="32" font-size="15" font-weight="700" text-anchor="middle" fill="currentColor">${lab||'P'}</text>`}
 return svgW(40+top*240,86,s,'number line')}
function clockSVG(h,m){let s=`<circle cx="70" cy="70" r="62" fill="none" stroke="currentColor" stroke-width="3"/>`;
 for(let k=1;k<=12;k++){const a=k*Math.PI/6;s+=`<text x="${70+48*Math.sin(a)}" y="${74-48*Math.cos(a)}" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">${k}</text>`}
 for(let k=0;k<60;k++){const a=k*Math.PI/30,r1=k%5?57:54;s+=`<line x1="${70+r1*Math.sin(a)}" y1="${70-r1*Math.cos(a)}" x2="${70+60*Math.sin(a)}" y2="${70-60*Math.cos(a)}" stroke="currentColor" stroke-width="1"/>`}
 const am=m*Math.PI/30,ah=((h%12)+m/60)*Math.PI/6;
 s+=`<line x1="70" y1="70" x2="${70+32*Math.sin(ah)}" y2="${70-32*Math.cos(ah)}" stroke="currentColor" stroke-width="5" stroke-linecap="round"/><line x1="70" y1="70" x2="${70+48*Math.sin(am)}" y2="${70-48*Math.cos(am)}" stroke="#E0457B" stroke-width="3" stroke-linecap="round"/><circle cx="70" cy="70" r="4" fill="currentColor"/>`;
 return svgW(140,140,s,'analog clock')}
const T12=(h,m)=>{h=((h-1+24)%12)+1;return `${h}:${String(m).padStart(2,'0')}`};
function barSVG(cats,vals,sc,ttl){const W=60+cats.length*50,H=190,base=150,top=20,mx=Math.ceil(Math.max(...vals)/sc)*sc+sc,ph=(base-top)/mx;
 let s=`<text x="${W/2}" y="12" font-size="12" text-anchor="middle" font-weight="700" fill="currentColor">${ttl}</text>`;
 for(let v=0;v<=mx;v+=sc){const y=base-v*ph;s+=`<line x1="40" y1="${y}" x2="${W-6}" y2="${y}" stroke="currentColor" stroke-opacity=".25"/><text x="34" y="${y+4}" font-size="11" text-anchor="end" fill="currentColor">${v}</text>`}
 s+=`<line x1="40" y1="${top}" x2="40" y2="${base}" stroke="currentColor" stroke-width="2"/><line x1="40" y1="${base}" x2="${W-6}" y2="${base}" stroke="currentColor" stroke-width="2"/>`;
 cats.forEach((c,i)=>{const x=50+i*50;s+=`<rect x="${x}" y="${base-vals[i]*ph}" width="32" height="${vals[i]*ph}" ${FL} stroke="currentColor"/><text x="${x+16}" y="${base+15}" font-size="11" text-anchor="middle" fill="currentColor">${c}</text>`});
 return svgW(W,H,s,'bar graph')}
function pictSVG(cats,vals,k){let s='';const W=170+Math.max(...vals)/k*20;cats.forEach((c,i)=>{s+=`<text x="4" y="${24+i*26}" font-size="13" fill="currentColor">${c}</text>`;for(let j=0;j<vals[i]/k;j++)s+=`<circle cx="${96+j*20}" cy="${20+i*26}" r="8" fill="#E0457B"/>`});
 return svgW(Math.max(W,200),cats.length*26+8,s,'picture graph')}
function gridSVG3(w,h){const u=Math.min(28,Math.floor(260/w));let s='';for(let i=0;i<w;i++)for(let j=0;j<h;j++)s+=`<rect x="${4+i*u}" y="${4+j*u}" width="${u}" height="${u}" ${FL} stroke="currentColor"/>`;return svgW(w*u+8,h*u+8,s,'rectangle made of unit squares')}
/* ---------- Multiplication & division ---------- */
function mMul(R){const a=R.int(2,10),b=R.int(2,10);return numQ(R,`${a} × ${b} = ____`,a*b,[a+b,a*(b+1),a*(b-1),(a+1)*b],`${a} groups of ${b} make ${a*b}.`)}
function mDiv(R){const a=R.int(2,10),b=R.int(2,10);return numQ(R,`${a*b} ÷ ${a} = ____`,b,[b+1,b-1,a,a*b-a],`Think: ${a} × ${b} = ${a*b}, so ${a*b} ÷ ${a} = ${b}.`)}
function mGroups(R){const t=R.int(1,4),a=R.int(2,9),b=R.int(2,9),nm=R.pick(NM3);
 if(t===1){const it=R.pick(['apples','crayons','stickers','marbles']),c=R.pick(['bags','boxes','jars']);return numQ(R,`There are ${a} ${c} with ${b} ${it} in each. How many ${it} are there in all?`,a*b,[a+b,a*b+a,a*b-b],`${a} groups of ${b} = ${a} × ${b} = ${a*b}.`)}
 if(t===2){const it=R.pick(['pencils','cookies','cards','stamps']);return numQ(R,`${nm} shares ${a*b} ${it} equally among ${a} friends. How many does each friend get?`,b,[b+1,b-1,a,a*b-a],`${a*b} ÷ ${a} = ${b}.`)}
 if(t===3)return numQ(R,`A garden has ${a} rows of flowers with ${b} flowers in each row. How many flowers are in the garden?`,a*b,[a+b,a*b+b,a*b-a],`${a} rows × ${b} flowers = ${a*b}.`);
 return numQ(R,`${nm} puts ${a*b} photos on pages. Each page holds ${b} photos. How many pages does ${nm} fill?`,a,[a+1,a-1,b,a*b-b],`${a*b} ÷ ${b} = ${a}.`)}
function mUnk(R){const a=R.int(2,10),b=R.int(2,10),p=a*b,t=R.int(1,4);
 if(t===1)return numQ(R,`____ × ${a} = ${p}`,b,[b+1,b-1,p-a,a],`${p} ÷ ${a} = ${b}, so ${b} × ${a} = ${p}.`);
 if(t===2)return numQ(R,`${a} × ____ = ${p}`,b,[b+1,b-1,p-a,a],`${p} ÷ ${a} = ${b}.`);
 if(t===3)return numQ(R,`${p} ÷ ____ = ${a}`,b,[b+1,b-1,p-a,a],`${a} × ${b} = ${p}, so ${p} ÷ ${b} = ${a}.`);
 return numQ(R,`____ ÷ ${a} = ${b}`,p,[p+a,p-a,a+b,p+1],`${b} × ${a} = ${p}.`)}
function mFam(R){const a=R.int(3,9),b=R.int(3,9);if(a===b)return null;const p=a*b;
 return mk(R,`Which equation is in the same fact family as ${a} × ${b} = ${p}?`,`${p} ÷ ${a} = ${b}`,[`${p} ÷ ${a} = ${b+1}`,`${p} − ${a} = ${b}`,`${a} + ${b} = ${p}`,`${p} ÷ ${b} = ${b}`],`A fact family uses the same three numbers (${a}, ${b}, ${p}) in multiplication and division.`)}
function mArr(R){const r=R.int(2,7),c=R.int(2,8);
 if(R.f()<.5)return numQ(R,`How many dots are in the array?`,r*c,[r+c,r*c+c,r*c-r],`There are ${r} rows with ${c} dots in each row: ${r} × ${c} = ${r*c}.`,{pics:dots(r,c)});
 return mk(R,`Which multiplication sentence matches the array?`,`${r} × ${c}`,[`${r} + ${c}`,`${r} × ${c+1}`,`${r+1} × ${c}`],`${r} rows of ${c} is ${r} × ${c}.`,{pics:dots(r,c)})}
NJ.reg({id:'m3_mult',subj:'math',name:'Multiplication & Division',desc:'Equal groups, arrays, facts, unknown numbers, fact families',n:10,full:3,daily:2,gen:topicGen([mMul,mMul,mDiv,mGroups,mGroups,mUnk,mFam,mArr])});

/* ---------- Properties ---------- */
function pComm(R){const a=R.int(3,9),b=R.int(3,9);if(a===b)return null;return numQ(R,`If ${a} × ${b} = ${a*b}, then ${b} × ${a} = ____`,a*b,[a+b,a*b+a,a*b-b],`Order does not change a product (Commutative Property).`)}
function pDist(R){const a=R.int(3,9),b1=R.int(2,5),b2=R.int(1,5);
 if(R.f()<.5)return numQ(R,`${a} × ${b1+b2} = (${a} × ${b1}) + (${a} × ____)`,b2,[b1,b1+b2,b2+1],`${b1+b2} = ${b1} + ${b2}, so the second part is ${a} × ${b2}.`);
 const ok=`(${a} × ${b1}) + (${a} × ${b2})`,bad=[`(${a} × ${b1}) + ${b2}`,`${a} + (${b1} × ${b2})`,`(${a} × ${b1}) × (${a} × ${b2})`,`${a} × ${b1} + ${b2} + ${a}`];
 return mk(R,`Which expression is equal to ${a} × ${b1+b2}?`,ok,bad,`Break ${b1+b2} into ${b1} + ${b2}: ${a} × ${b1+b2} = (${a} × ${b1}) + (${a} × ${b2}).`)}
function pAssoc(R){const a=R.int(2,5),b=R.int(2,5),c=R.int(2,6);return numQ(R,`(${a} × ${b}) × ${c} = ${a} × (${b} × ____)`,c,[a,b,a*b],`The same three factors are grouped differently (Associative Property).`)}
function pSpecial(R){const a=R.int(2,12),t=R.int(1,3);
 if(t===1)return numQ(R,`What is ${a} × 0?`,0,[a,1,a*a],`Any number times 0 is 0.`);
 if(t===2)return numQ(R,`What is ${a} × 1?`,a,[0,1,a+1],`Any number times 1 is that number.`);
 return numQ(R,`What is 0 ÷ ${a}?`,0,[a,1,a*a],`Zero divided by any number (not 0) is 0.`)}
function pBreak(R){const a=R.int(4,9),b=R.int(6,9),p=a*b,b1=5,b2=b-5;
 return numQ(R,`Use ${a} × 5 = ${a*5} to help find ${a} × ${b}.`,p,[a*5+b2,a*b+a,p-a],`${a} × ${b} = (${a} × 5) + (${a} × ${b2}) = ${a*5} + ${a*b2} = ${p}.`)}
NJ.reg({id:'m3_props',subj:'math',name:'Properties of Multiplication',desc:'Commutative, associative, distributive, strategies',n:10,full:3,daily:1,gen:topicGen([pComm,pDist,pDist,pAssoc,pSpecial,pBreak])});

/* ---------- Word problems ---------- */
function wTwo(R){const nm=R.pick(NM3),t=R.int(1,4);
 if(t===1){const a=R.int(3,8),b=R.int(3,9),c=R.int(2,a*b-4);return numQ(R,`${nm} has ${a} boxes of markers with ${b} markers in each box. ${nm} gives away ${c} markers. How many markers does ${nm} have now?`,a*b-c,[a*b+c,a*b,a+b-c],`First: ${a} × ${b} = ${a*b}. Then: ${a*b} − ${c} = ${a*b-c}.`)}
 if(t===2){const a=R.int(3,8),b=R.int(3,9),c=R.int(2,20);return numQ(R,`There are ${a*b} students in the gym. They sit in ${a} equal rows. Then ${c} more students come and sit at the back. How many students are in the gym now?`,a*b+c,[b+c,a*b,a*b-c],`First: ${a*b} students already; then ${a*b} + ${c} = ${a*b+c}.`)}
 if(t===3){const a=R.int(4,9),b=R.int(3,9),c=R.int(2,9);return numQ(R,`${nm} read ${a} pages each day for ${b} days. ${nm} then read ${c} more pages. How many pages did ${nm} read in all?`,a*b+c,[a*b,a+b+c,a*(b+c)],`${a} × ${b} = ${a*b}. Then ${a*b} + ${c} = ${a*b+c}.`)}
 const a=R.int(3,8),b=R.int(3,9),c=R.int(2,5),tot=a*b*c;return numQ(R,`A baker makes ${a*b} muffins and packs them equally into ${a} boxes. How many muffins are in ${c} boxes?`,b*c,[a*b*c,b+c,a*c],`${a*b} ÷ ${a} = ${b} muffins per box. ${c} boxes: ${b} × ${c} = ${b*c}.`)}
function wEq(R){const a=R.int(3,9),b=R.int(2,9),p=a*b,nm=R.pick(NM3),t=R.int(1,3),L=R.pick(['n','m','p','x']);
 if(t===1)return mk(R,`${nm} buys ${a} packs of cards. Each pack has ${b} cards. ${nm} buys ${p} cards in all. Which equation can find the number of packs? Use ${L} for the unknown.`,`${L} × ${b} = ${p}`,[`${L} + ${b} = ${p}`,`${L} − ${b} = ${p}`,`${p} × ${b} = ${L}`],`Packs × cards in each pack = total, so ${L} × ${b} = ${p}.`);
 if(t===2)return mk(R,`${p} flowers are put into ${a} equal vases. How many flowers go in each vase? Which equation matches?`,`${p} ÷ ${a} = ${L}`,[`${p} × ${a} = ${L}`,`${p} + ${a} = ${L}`,`${a} − ${p} = ${L}`],`Equal sharing is division: ${p} ÷ ${a} = ${L}.`);
 return mk(R,`${nm} had some stickers. ${nm} got ${a+b} more and now has ${p+a+b}. Which equation can find how many stickers ${nm} had at first?`,`${L} + ${a+b} = ${p+a+b}`,[`${L} − ${a+b} = ${p+a+b}`,`${L} × ${a+b} = ${p+a+b}`,`${p+a+b} + ${a+b} = ${L}`],`Start + more = total: ${L} + ${a+b} = ${p+a+b}.`)}
function wOp(R){const a=R.int(3,9),b=R.int(3,9);return mk(R,`Which situation matches ${a*b} ÷ ${a}?`,`${a*b} cherries are shared equally by ${a} children.`,[`${a*b} cherries and ${a} more cherries are put together.`,`${a} children each get ${a*b} cherries.`,`${a*b} cherries are ${a} fewer than before.`],`Division finds how many are in each equal group when sharing.`)}
function wAdd(R){const nm=R.pick(NM3),a=R.int(120,560),b=R.int(110,380);return numQ(R,`${nm} read ${a} pages in June and ${b} pages in July. How many pages did ${nm} read altogether?`,a+b,[a+b+10,a+b-10,a+b+100,a-b],`${a} + ${b} = ${a+b}.`)}
NJ.reg({id:'m3_word',subj:'math',name:'Word Problems',desc:'One- and two-step problems, writing equations with a letter',n:10,full:4,daily:2,gen:topicGen([wTwo,wTwo,wEq,wEq,wOp,wAdd])});

/* ---------- Patterns ---------- */
function paNext(R){const s=R.int(2,40),d=R.pick([2,3,4,5,6,8,10]),q=[0,1,2,3].map(i=>s+i*d);
 return numQ(R,`What is the next number in the pattern?\n${q.join(', ')}, ____`,s+4*d,[s+3*d+1,s+5*d,s+4*d+1,s+4*d-1],`The numbers go up by ${d} each time. ${s+3*d} + ${d} = ${s+4*d}.`)}
function paRule(R){const s=R.int(2,30),d=R.int(2,9),q=[0,1,2,3].map(i=>s+i*d);
 return mk(R,`Which rule describes the pattern?\n${q.join(', ')}, ...`,`Add ${d}`,[`Add ${d+1}`,`Subtract ${d}`,`Multiply by ${d}`],`Each number is ${d} more than the one before it.`)}
function paTable(R){const k=R.int(2,9),ins=[1,2,3,4];
 if(R.f()<.5)return mk(R,`What is the rule for the table?`,`Multiply by ${k}`,[`Add ${k}`,`Multiply by ${k+1}`,`Add ${k+1}`],`1 → ${k}, 2 → ${2*k}, 3 → ${3*k}: the output is the input × ${k}.`,{pics:TBL(['In','Out'],ins.map(i=>[i,i*k]))});
 return numQ(R,`The rule is multiply by ${k}. What is the missing output?`,5*k,[5+k,4*k,6*k],`5 × ${k} = ${5*k}.`,{pics:TBL(['In','Out'],[[1,k],[2,2*k],[5,'?']])})}
function paFacts(R){const B=[
 ['What is always true about the product of 2 and any whole number?','It is even.',['It is odd.','It ends in 5.','It is less than 10.'],'Doubling a whole number always makes an even number.'],
 ['Which statement is true about multiples of 5?','They end in 0 or 5.',['They end in 2 or 7.','They are always odd.','They are always even.'],'5, 10, 15, 20, 25 ... all end in 0 or 5.'],
 ['What happens to the products in the 10s row of a multiplication table?','Every product ends in 0.',['Every product is odd.','Every product ends in 5.','The products get smaller.'],'10, 20, 30, 40 ... all end in 0.'],
 ['Which number is a multiple of both 2 and 5?','30',['25','12','35'],'30 = 2 × 15 and 30 = 5 × 6.'],
 ['An even number plus an odd number is always','odd',['even','zero','ten'],'For example, 4 + 3 = 7.'],
 ['An odd number plus an odd number is always','even',['odd','ten','a multiple of 5'],'For example, 3 + 5 = 8.']];return mk(R,...R.pick(B).slice(0,4))}
NJ.reg({id:'m3_pat',subj:'math',name:'Number Patterns',desc:'Adding patterns, rules, in/out tables, even and odd',n:10,full:3,daily:1,gen:topicGen([paNext,paNext,paRule,paTable,paTable,paFacts])});

/* ---------- Place value & rounding ---------- */
function rNear(R){const t=R.int(1,2),x=R.int(11,999),p=t===1?10:100,a=Math.round(x/p)*p,fl=Math.floor(x/p)*p;
 return numQ(R,`Round ${comma(x)} to the nearest ${p}.`,a,[fl===a?a+p:fl,fl+p===a?a-p:fl+p,Math.round(x/(p*10))*p*10],`Look at the digit to the right of the ${p===10?'tens':'hundreds'} place. If it is 5 or more, round up. ${comma(x)} rounds to ${comma(a)}.`,{step:p})}
function rPlace(R){const d=[R.int(1,9),R.int(1,9),R.int(1,9)],n=d[0]*100+d[1]*10+d[2],pl=R.int(0,2),names=['hundreds','tens','ones'],val=[d[0]*100,d[1]*10,d[2]][pl];
 return numQ(R,`In the number ${n}, what is the value of the digit ${d[pl]}${R.f()<0?'':' in the '+names[pl]+' place'}?`,val,[d[pl],val*10,val===d[pl]?val*10:d[pl]*100].filter(x=>x!==val),`The ${d[pl]} is in the ${names[pl]} place, so its value is ${val}.`)}
function rEst(R){const a=R.int(120,880),b=R.int(120,880),add=R.f()<.6,p=add?100:10,ra=Math.round(a/p)*p,rb=Math.round(b/p)*p;
 if(!add&&a<=b)return null;const v=add?ra+rb:ra-rb;
 return numQ(R,`Round each number to the nearest ${p}, then ${add?'add':'subtract'} to estimate.\n${a} ${add?'+':'−'} ${b}`,v,[v+p,v-p,add?a+b:a-b],`${a} rounds to ${ra} and ${b} rounds to ${rb}. ${ra} ${add?'+':'−'} ${rb} = ${v}.`,{step:p})}
function rMulti(R){const c=R.int(2,8)*100,lo=c-50,hi=c+49;const ok=R.sample([lo,lo+1,c-23,c,c+31,hi],2),bad=R.sample([lo-1,hi+1,lo-1-R.int(1,20),hi+1+R.int(1,20)],2);if(new Set([...ok,...bad]).size<4)return null;
 return multi(R,`Which numbers round to ${c} when rounded to the nearest hundred? Select ALL that apply.`,ok,bad,`Numbers from ${lo} to ${hi} round to ${c}.`)}
NJ.reg({id:'m3_round',subj:'math',name:'Place Value & Rounding',desc:'Value of digits, rounding to 10 or 100, estimating',n:10,full:3,daily:1,gen:topicGen([rNear,rNear,rPlace,rEst,rMulti])});

/* ---------- Add, subtract, multiples of 10 ---------- */
function aAdd(R){const a=R.int(120,780),b=R.int(120,990-a),dg=(x,y)=>x+y;
 return numQ(R,`${a} + ${b} = ____`,a+b,[a+b+10,a+b-10,a+b+100,a+b-100],`Add ones, tens, and hundreds, regrouping when needed: ${a+b}.`)}
function aSub(R){const a=R.int(300,990),b=R.int(110,a-50);return numQ(R,`${a} − ${b} = ____`,a-b,[a-b+10,a-b-10,a-b+100,a+b],`Subtract place by place, regrouping when needed: ${a-b}.`)}
function aWordSub(R){const nm=R.pick(NM3),a=R.int(300,900),b=R.int(100,a-80);return numQ(R,`A school library has ${a} books. ${b} books are checked out. How many books are still in the library?`,a-b,[a+b,a-b+10,a-b-10],`${a} − ${b} = ${a-b}.`)}
function aTens(R){const a=R.int(2,9),b=R.int(2,9)*10;return numQ(R,`${a} × ${b} = ____`,a*b,[a*b/10,a*b*10,a+b],`${a} × ${b/10} = ${a*b/10}, then multiply by 10: ${a*b}.`)}
function aTensWord(R){const a=R.int(2,9),b=R.int(2,9)*10,nm=R.pick(NM3);return numQ(R,`${nm} has ${a} boxes with ${b} paper clips in each box. How many paper clips are there?`,a*b,[a*b/10,a*b*10,a+b],`${a} × ${b} = ${a*b}.`)}
NJ.reg({id:'m3_addsub',subj:'math',name:'Add, Subtract & Multiples of 10',desc:'Within 1,000, regrouping, word problems, 9 × 80',n:10,full:3,daily:1,gen:topicGen([aAdd,aAdd,aSub,aSub,aWordSub,aTens,aTensWord])});

/* ---------- Fractions: parts of a whole ---------- */
function fcShaded(R){const d=R.pick([2,3,4,5,6,8]),n=R.int(1,d-1),sh=R.pick(['bar','circle']);
 return fq3(R,'What fraction of the shape is shaded?',[n,d],[],`The shape has ${d} equal parts and ${n} are shaded: ${n}/${d}.`,{pics:fracPic(n,d,sh)})}
function fcModel(R){const d=R.pick([3,4,5,6,8]),n=R.int(1,d-1),sh=R.pick(['bar','circle']);
 const ok=inl(sh==='bar'?210:150,sh==='bar'?40:150,'');const opts=[fracShape(n,d,sh,100)];const seen=new Set([n]);
 R.shuffle([...Array(d-1).keys()].map(x=>x+1)).forEach(m=>{if(!seen.has(m)&&opts.length<4){seen.add(m);opts.push(fracShape(m,d,sh,100))}});if(opts.length<4)return null;
 const q=mk(R,`Which model shows ${FR(n,d)} shaded?`,opts[0],opts.slice(1),`${n}/${d} means ${n} of ${d} equal parts are shaded.`);return q}
function fcDenom(R){const d=R.int(2,9),n=R.int(1,d-1);return mk(R,`In the fraction ${FR(n,d)}, what does the ${d} tell you?`,`The whole is divided into ${d} equal parts.`,[`${d} parts are shaded.`,`There are ${d} wholes.`,`Each part is ${d} inches long.`],`The denominator is the total number of equal parts in the whole.`)}
function fcNumer(R){const d=R.int(3,9),n=R.int(2,d-1);return mk(R,`In the fraction ${FR(n,d)}, what does the ${n} tell you?`,`${n} of the equal parts are counted.`,[`The whole has ${n} parts.`,`There are ${n} wholes.`,`Each part is ${n} units long.`],`The numerator tells how many equal parts are being counted.`)}
function fcUnit(R){const ds=R.sample([2,3,4,5,6,8],3),ok=FR(1,R.pick([2,3,4,5,6,8]));const d=R.int(3,8);return mk(R,`Which fraction is a unit fraction?`,FR(1,d),[FR(2,d),FR(d-1,d),FR(d,d+1)],`A unit fraction has 1 as its numerator.`)}
function fcWord(R){const d=R.pick([4,6,8,10,12]),n=R.int(1,d-1),nm=R.pick(NM3),it=R.pick(['pizza','sandwich','cake']);
 return fq3(R,`A ${it} is cut into ${d} equal slices. ${nm} eats ${n} slices. What fraction of the ${it} did ${nm} eat?`,[n,d],[[d-n,d]],`${n} of the ${d} equal slices: ${n}/${d}.`)}
function fcPart(R){const d=R.pick([2,3,4,6,8]);return fq3(R,`A rectangle is cut into ${d} equal parts. What fraction of the rectangle is one part?`,[1,d],[[d,1]],`Each of the ${d} equal parts is 1/${d} of the whole.`)}
NJ.reg({id:'m3_frac1',subj:'math',name:'Fractions: Parts of a Whole',desc:'Shaded fractions, numerator, denominator, unit fractions',n:10,full:3,daily:1,gen:topicGen([fcShaded,fcShaded,fcModel,fcDenom,fcNumer,fcUnit,fcWord,fcPart])});

/* ---------- Fractions: number line, equivalent, compare ---------- */
function nlPoint(R){const d=R.pick([2,3,4,5,6,8]),top=R.pick([1,1,2]),n=R.int(1,top*d-1);if(n%d===0)return null;
 return fq3(R,'What fraction does point P show on the number line?',[n,d],[],`Each part is 1/${d}. Point P is ${n} parts from 0: ${n}/${d}.`,{pics:numLine(d,top,n)})}
function nlWhole(R){const d=R.pick([2,3,4,6,8]),k=R.int(1,3);return mk(R,`Which fraction is equal to ${k}?`,FR(k*d,d),[FR(d,k*d),FR(k,d),FR(k+d,d)],`${k} whole${k>1?'s':''} is ${k*d} out of ${d} equal parts, or ${k*d}/${d}.`)}
function eqFrac(R){const d=R.pick([2,3,4]),n=R.int(1,d-1),k=R.int(2,4);if(d===2&&n!==1)return null;
 return numQ(R,`${n}/${d} = ____/${d*k}`,n*k,[n+k,n,d*k-n],`Multiply the numerator and the denominator by ${k}: ${n}/${d} = ${n*k}/${d*k}.`)}
function eqPic(R){const d=R.pick([2,3,4]),k=R.int(2,3),n=1,sh=R.pick(['bar']);
 return mk(R,`The two bars are the same size. Which fraction is equal to ${FR(n,d)}?`,FR(n*k,d*k),[FR(n,d*k),FR(n*k,d),FR(n+1,d*k)],`${n}/${d} = ${n*k}/${d*k}.`,{pics:`<div class="pics"><div class="pic" style="padding:8px">${fracShape(n,d,'bar')}<br>${fracShape(n*k,d*k,'bar')}</div></div>`})}
function cmpSame(R){const d=R.int(3,12),a=R.int(1,d-2),b=R.int(a+1,d-1);if(R.f()<.5)return mk(R,`Which fraction is greater, ${FR(a,d)} or ${FR(b,d)}?`,FR(b,d),[FR(a,d),'They are equal.','Cannot tell'],`Same denominator: the greater numerator means more parts, so ${b}/${d} is greater.`);
 return mk(R,`Which fraction is less, ${FR(a,d)} or ${FR(b,d)}?`,FR(a,d),[FR(b,d),'They are equal.','Cannot tell'],`Same denominator: the smaller numerator is the smaller fraction.`)}
function cmpUnit(R){const d=R.int(2,7),e=R.int(d+1,9);return mk(R,`Which fraction is greater, ${FR(1,d)} or ${FR(1,e)}?`,FR(1,d),[FR(1,e),'They are equal.','Cannot tell'],`Fewer equal parts means each part is larger, so 1/${d} is greater than 1/${e}.`)}
function cmpSym(R){const n=R.int(1,5),d=R.int(n+1,8),e=R.int(2,8);if(e===d)return null;const v1=n/d,v2=n/e,sym=v1<v2?'<':'>';
 return mk(R,`Which symbol makes the statement true?\n${FR(n,d)}  ___  ${FR(n,e)}`,sym,['<','>','=','cannot tell'].filter(x=>x!==sym),`With the same numerator, the fraction with the ${e>d?'larger':'smaller'} denominator is ${v1<v2?'smaller':'larger'}.`)}
function ordUnit(R){const ds=R.sample([2,3,4,5,6,8],3).sort((a,b)=>a-b),asc=R.f()<.5;const ok=(asc?ds.slice().reverse():ds).map(d=>FR(1,d)).join(' , ');const wrong=(asc?ds:ds.slice().reverse()).map(d=>FR(1,d)).join(' , ');
 const sh=R.shuffle(ds).map(d=>FR(1,d)).join(' , ');return mk(R,`Which list is in order from ${asc?'least to greatest':'greatest to least'}?`,ok,[wrong,sh,[ds[1],ds[0],ds[2]].map(d=>FR(1,d)).join(' , ')],`With the same numerator, a bigger denominator means a smaller piece.`)}
NJ.reg({id:'m3_frac2',subj:'math',name:'Fractions: Number Line, Equivalent & Compare',desc:'Fractions on a number line, equal fractions, comparing',n:10,full:3,daily:1,gen:topicGen([nlPoint,nlPoint,nlWhole,eqFrac,eqPic,cmpSame,cmpUnit,ordUnit])});

/* ---------- Time ---------- */
function tClock(R){const h=R.int(1,12),m=R.pick([0,5,10,15,20,25,30,35,40,45,50,55,R.int(1,59)]),ok=T12(h,m);
 return mk(R,'What time does the clock show?',ok,[T12(h,(m+30)%60),T12((h%12)+1,m),T12(m===0?h:h,m===0?30:60-m>0?60-m:0),T12(h-1,m),T12(h+1,(m+5)%60)],`The short hand points at ${h} and the long hand shows ${m} minutes: ${ok}.`,{pics:clockSVG(h,m)})}
function tElapsed(R){const h=R.int(1,11),m=R.pick([0,5,10,15,20,30,45]),d=R.int(10,55),end=m+d,eh=h+Math.floor(end/60),em=end%60,nm=R.pick(NM3);
 if(R.f()<.5)return numQ(R,`${nm}'s class starts at ${T12(h,m)} and ends at ${T12(eh,em)}. How many minutes long is the class?`,d,[d+5,d-5,60-d,d+10],`Count the minutes from ${T12(h,m)} to ${T12(eh,em)}: ${d} minutes.`);
 return mk(R,`${nm} starts reading at ${T12(h,m)}. ${nm} reads for ${d} minutes. What time does ${nm} finish?`,T12(eh,em),[T12(eh,(em+10)%60),T12(h,(m+d)%60===m?m:(m+d+5)%60),T12(eh+1,em),T12(eh,(em+50)%60)],`${T12(h,m)} + ${d} minutes = ${T12(eh,em)}.`)}
function tUnits(R){const B=[
 ['How many minutes are in 1 hour?','60',['30','100','24'],'There are 60 minutes in 1 hour.'],
 ['Which is the best estimate for the time it takes to brush your teeth?','2 minutes',['2 hours','2 seconds','2 days'],'Brushing teeth takes about 2 minutes.'],
 ['Which is the best estimate for the time of a school day?','6 hours',['6 minutes','6 days','60 seconds'],'A school day lasts about 6 hours.'],
 ['What time is 30 minutes after 4:15?','4:45',['4:30','5:15','4:15'],'15 + 30 = 45 minutes past 4.'],
 ['A movie starts at 2:00 and ends at 3:30. How long is the movie?','1 hour 30 minutes',['1 hour','2 hours','30 minutes'],'From 2:00 to 3:00 is 1 hour, plus 30 more minutes.']];return mk(R,...R.pick(B).slice(0,4))}
function tBefore(R){const h=R.int(3,11),m=R.pick([15,20,25,30,40,45]),d=R.pick([10,15,20]),nm=R.pick(NM3);
 return mk(R,`${nm} needs to be at school at ${T12(h,m)}. The trip takes ${d} minutes. What time should ${nm} leave home?`,T12(h,m-d),[T12(h,m+d),T12(h,Math.max(m-d-10,0)),T12(h-1,m)],`${T12(h,m)} − ${d} minutes = ${T12(h,m-d)}.`)}
NJ.reg({id:'m3_time',subj:'math',name:'Telling Time & Elapsed Time',desc:'Clocks to the minute, elapsed time, time word problems',n:10,full:3,daily:1,gen:topicGen([tClock,tClock,tElapsed,tElapsed,tUnits,tBefore])});

/* ---------- Liquid volume & mass ---------- */
function vWord(R){const t=R.int(1,4),nm=R.pick(NM3);
 if(t===1){const n=R.int(2,8),k=R.int(2,9);return numQ(R,`A jug holds ${n*k} liters of water. ${nm} pours it equally into ${n} buckets. How many liters are in each bucket?`,k,[k+1,k-1,n*k-n],`${n*k} ÷ ${n} = ${k} liters.`)}
 if(t===2){const a=R.int(2,9),b=R.int(3,9);return numQ(R,`Each bag of apples has a mass of ${b} kilograms. What is the mass of ${a} bags?`,a*b,[a+b,a*b+b,a*b-a],`${a} × ${b} = ${a*b} kilograms.`)}
 if(t===3){const a=R.int(120,480),b=R.int(110,400);return numQ(R,`A tank has ${a} liters of water. ${nm} adds ${b} more liters. How many liters are in the tank now?`,a+b,[a+b+10,a+b-10,a-b],`${a} + ${b} = ${a+b} liters.`)}
 const a=R.int(300,900),b=R.int(100,a-50);return numQ(R,`A box has a mass of ${a} grams. ${nm} takes out items that have a mass of ${b} grams. What is the mass of the box now?`,a-b,[a+b,a-b+10,a-b-10],`${a} − ${b} = ${a-b} grams.`)}
function vUnit(R){const B=[
 ['Which unit is best for measuring the mass of a pencil?','grams',['kilograms','liters','meters'],'A pencil is very light, so use grams.'],
 ['Which unit is best for measuring the mass of a bicycle?','kilograms',['grams','liters','centimeters'],'A bicycle is heavy, so use kilograms.'],
 ['Which unit is best for measuring the amount of water in a bathtub?','liters',['grams','kilograms','meters'],'Liquid volume is measured in liters.'],
 ['Which holds about 1 liter?','A water bottle',['A teaspoon','A swimming pool','A drinking straw'],'A large water bottle is about 1 liter.'],
 ['About how much does a paper clip weigh?','1 gram',['1 kilogram','10 kilograms','1 liter'],'A paper clip is about 1 gram.'],
 ['Which is the best estimate for the mass of a watermelon?','4 kilograms',['4 grams','40 kilograms','400 liters'],'A medium watermelon is a few kilograms.']];return mk(R,...R.pick(B).slice(0,4))}
NJ.reg({id:'m3_meas',subj:'math',name:'Liquid Volume & Mass',desc:'Liters, grams, kilograms, word problems',n:10,full:3,daily:1,gen:topicGen([vWord,vWord,vWord,vUnit,vUnit])});

/* ---------- Graphs & line plots ---------- */
function gBar(R){const sc=R.pick([2,5,10]),cats=R.sample(['Apples','Pears','Plums','Grapes','Kiwis','Figs'],4),vals=cats.map(()=>sc*R.int(1,6)),pic=barSVG(cats,vals,sc,'Fruit sold'),t=R.int(1,4);
 if(new Set(vals).size<4)return null;const hi=Math.max(...vals),lo=Math.min(...vals);
 if(t===1){const i=R.int(0,3);return numQ(R,`How many ${cats[i].toLowerCase()} were sold?`,vals[i],[vals[i]+sc,vals[i]-sc,vals[i]/sc],`The top of the ${cats[i]} bar is at ${vals[i]}.`,{pics:pic,step:sc})}
 if(t===2){const a=R.sample([0,1,2,3],2);return numQ(R,`How many more ${cats[a[0]].toLowerCase()} than ${cats[a[1]].toLowerCase()} were sold? (Subtract the smaller from the larger.)`,Math.abs(vals[a[0]]-vals[a[1]]),[vals[a[0]]+vals[a[1]],Math.abs(vals[a[0]]-vals[a[1]])+sc],`Read both bars and subtract: ${Math.max(vals[a[0]],vals[a[1]])} − ${Math.min(vals[a[0]],vals[a[1]])}.`,{pics:pic,step:sc})}
 if(t===3)return mk(R,`Which fruit was sold the <b>least</b>?`,cats[vals.indexOf(lo)],cats.filter((c,i)=>i!==vals.indexOf(lo)),`The shortest bar is ${cats[vals.indexOf(lo)]}.`,{pics:pic});
 const tot=vals.reduce((a,b)=>a+b,0);return numQ(R,`How many fruits were sold in all?`,tot,[tot+sc,tot-sc,hi],`Add all four bars: ${vals.join(' + ')} = ${tot}.`,{pics:pic,step:sc})}
function gPict(R){const k=R.pick([2,5,10]),cats=R.sample(['Cats','Dogs','Fish','Birds'],4),vals=cats.map(()=>k*R.int(1,5)),pic=pictSVG(cats,vals,k),t=R.int(1,2),i=R.int(0,3);
 const pk=`Each pink dot = ${k} pets.\n`;
 if(t===1)return numQ(R,`${pk}How many ${cats[i].toLowerCase()} are there?`,vals[i],[vals[i]/k,vals[i]+k,vals[i]-k],`${vals[i]/k} symbol${vals[i]/k>1?'s':''} × ${k} = ${vals[i]}.`,{pics:pic,step:k});
 const tot=vals.reduce((a,b)=>a+b,0);return numQ(R,`${pk}How many pets are there in all?`,tot,[tot/k,tot+k,tot-k],`Add the groups: ${vals.join(' + ')} = ${tot}.`,{pics:pic,step:k})}
function gLine(R){const d=R.pick([2,4]),T=[],n=d*2,cnt=[];for(let k=0;k<=n;k++){T.push(fr(k,d));cnt.push(R.f()<.5?0:R.int(1,4))}
 if(cnt.reduce((a,b)=>a+b,0)<5||cnt.filter(x=>x).length<3)return null;
 const cw=Math.min(44,Math.floor(300/T.length)),W=20+T.length*cw,mx=Math.max(...cnt),H=34+mx*17+8,base=H-28;let s=`<line x1="8" y1="${base}" x2="${W-8}" y2="${base}" stroke="currentColor" stroke-width="2"/>`;
 T.forEach((t,i)=>{const cx=10+cw/2+i*cw;s+=`<line x1="${cx}" y1="${base-4}" x2="${cx}" y2="${base+4}" stroke="currentColor" stroke-width="2"/><text x="${cx}" y="${base+16}" font-size="11" text-anchor="middle" fill="currentColor">${fT(t)}</text>`;for(let j=0;j<cnt[i];j++){const y=base-13-j*17;s+=`<path d="M${cx-5} ${y-5}L${cx+5} ${y+5}M${cx+5} ${y-5}L${cx-5} ${y+5}" stroke="#E0457B" stroke-width="2.4" stroke-linecap="round"/>`}});
 s+=`<text x="${W/2}" y="${H-2}" font-size="11" text-anchor="middle" fill="currentColor" opacity=".75">inches</text>`;const pic=svgW(W,H,s,'line plot'),idx=cnt.map((x,i)=>x?i:-1).filter(i=>i>=0),i=R.pick(idx),t=R.int(1,2);
 if(t===1)return numQ(R,`The line plot shows the lengths of some leaves in inches. How many leaves are ${fT(T[i])} inch long?`,cnt[i],[cnt[i]+1,cnt[i]-1,i],`Count the X marks above ${fT(T[i])}: ${cnt[i]}.`,{pics:pic});
 const tot=cnt.reduce((a,b)=>a+b,0);return numQ(R,`The line plot shows the lengths of some leaves in inches. How many leaves were measured in all?`,tot,[tot+1,tot-1,Math.max(...cnt)],`Count every X: ${tot}.`,{pics:pic})}
NJ.reg({id:'m3_graph',subj:'math',name:'Graphs & Line Plots',desc:'Scaled bar graphs, picture graphs, line plots',n:10,full:3,daily:1,gen:topicGen([gBar,gBar,gBar,gPict,gPict,gLine])});

/* ---------- Area ---------- */
function arCount(R){const w=R.int(2,8),h=R.int(2,6);return numQ(R,`Each square is 1 square unit. What is the area of the rectangle?`,w*h,[w+h,2*(w+h),w*h+w],`Count squares: ${h} rows of ${w} = ${w*h} square units.`,{pics:gridSVG3(w,h)})}
function arRect(R){const l=R.int(3,12),w=R.int(2,9),u=R.pick(['cm','in.','ft','m']);if(l===w)return null;return numQ(R,`A rectangle is ${l} ${u} long and ${w} ${u} wide. What is its area in square ${u}?`,l*w,[l+w,2*(l+w),l*w+l],`Area = length × width = ${l} × ${w} = ${l*w} square ${u}.`)}
function arMiss(R){const l=R.int(3,10),w=R.int(2,9),a=l*w;return numQ(R,`A rectangle has an area of ${a} square feet. Its length is ${l} feet. What is its width in feet?`,w,[w+1,w-1,a-l],`${a} ÷ ${l} = ${w} feet.`)}
function arComp(R){const a=R.int(3,8),b=R.int(2,5),c=R.int(2,5),d=R.int(2,5);return numQ(R,`A figure is made of two rectangles that do not overlap.\nRectangle 1 is ${a} cm by ${b} cm.\nRectangle 2 is ${c} cm by ${d} cm.\nWhat is the total area in square centimeters?`,a*b+c*d,[a*b*c*d,a+b+c+d,a*b],`Rectangle 1: ${a*b}. Rectangle 2: ${c*d}. Total: ${a*b+c*d}.`)}
function arDist(R){const l=R.int(4,9),a=R.int(2,5),b=R.int(2,5);return numQ(R,`A ${l} by ${a+b} rectangle is split into a ${l} by ${a} rectangle and a ${l} by ${b} rectangle. What is the area of the whole rectangle?`,l*(a+b),[l*a+b,l+a+b,l*a],`${l} × ${a} + ${l} × ${b} = ${l*a} + ${l*b} = ${l*(a+b)}.`)}
function arUnit(R){return mk(R,'Which unit is used to measure area?',R.pick(['square centimeters','square feet','square inches']),['centimeters','liters','grams'].slice(0,3),'Area is the number of unit squares that cover a shape, so it uses square units.')}
NJ.reg({id:'m3_area',subj:'math',name:'Area',desc:'Counting unit squares, length × width, missing sides, combined shapes',n:10,full:3,daily:1,gen:topicGen([arCount,arCount,arRect,arRect,arMiss,arComp,arDist,arUnit])});

/* ---------- Perimeter ---------- */
function peTri(R){const a=R.int(3,15),b=R.int(3,15),c=R.int(3,15),u=R.pick(['cm','in.','m']);if(a+b<=c||a+c<=b||b+c<=a)return null;return numQ(R,`A triangle has sides of ${a} ${u}, ${b} ${u}, and ${c} ${u}. What is its perimeter?`,a+b+c,[a*b*c,a+b,a+b+c+1],`Add all sides: ${a} + ${b} + ${c} = ${a+b+c} ${u}.`)}
function peRect(R){const l=R.int(3,14),w=R.int(2,10);if(l===w)return null;return numQ(R,`What is the perimeter of the rectangle?`,2*l+2*w,[l*w,l+w,2*l+w],`Perimeter = ${l} + ${w} + ${l} + ${w} = ${2*l+2*w}.`,{pics:rectLab(l,w,'cm')})}
function peSq(R){const s=R.int(3,12);return numQ(R,`A square has a side length of ${s} inches. What is its perimeter?`,4*s,[2*s,s*s,s+4],`4 sides × ${s} = ${4*s} inches.`)}
function peMiss(R){const a=R.int(4,12),b=R.int(4,12),c=R.int(4,12),P=a+b+c;return numQ(R,`A triangle has a perimeter of ${P} cm. Two sides are ${a} cm and ${b} cm. How long is the third side?`,c,[P-a,P+a+b,a+b],`${P} − ${a} − ${b} = ${c} cm.`)}
function peSqSide(R){const s=R.int(3,12);return numQ(R,`A square has a perimeter of ${4*s} feet. How long is each side?`,s,[4*s-4,s+4,2*s],`${4*s} ÷ 4 = ${s} feet.`)}
function peCmp(R){const S=R.int(7,12),l1=R.int(2,S-3),w1=S-l1,l2=R.int(l1+1,S-1),w2=S-l2;if(l2===w1||l2*w2===l1*w1)return null;const a1=l1*w1,a2=l2*w2,P=2*S;
 const hi=a1>a2?'A':'B';return mk(R,`Rectangle A is ${l1} units by ${w1} units. Rectangle B is ${l2} units by ${w2} units. Which statement is true?`,`Both have a perimeter of ${P}, but Rectangle ${hi} has the greater area.`,[`Both have the same area.`,`Rectangle ${hi==='A'?'B':'A'} has the greater perimeter.`,`Both have an area of ${P}.`],`Perimeter: 2 × (${l1} + ${w1}) = ${P} and 2 × (${l2} + ${w2}) = ${P}. Area: ${a1} and ${a2}.`)}
NJ.reg({id:'m3_perim',subj:'math',name:'Perimeter',desc:'Perimeter of polygons, missing sides, same perimeter different area',n:10,full:3,daily:1,gen:topicGen([peTri,peRect,peRect,peSq,peMiss,peSqSide,peCmp])});

/* ---------- Shapes ---------- */
function shName(R){const B=[['triangle',3],['quadrilateral',4],['pentagon',5],['hexagon',6],['octagon',8]],[nm,n]=R.pick(B);
 if(R.f()<.5)return mk(R,`How many sides does a ${nm} have?`,String(n),B.map(b=>String(b[1])).filter(x=>x!==String(n)),`A ${nm} has ${n} sides.`);
 return mk(R,`A polygon has ${n} sides. What is its name?`,nm,B.map(b=>b[0]).filter(x=>x!==nm),`${n} sides: ${nm}.`)}
function shAttr(R){const B=[
 ['I have 4 equal sides and 4 right angles. What shape am I?','square',['triangle','pentagon','hexagon'],'A square has 4 equal sides and 4 right angles.'],
 ['I have 4 sides. Opposite sides are equal, and I have 4 right angles. My neighbor sides are different lengths. What am I?','rectangle',['square','triangle','octagon'],'This describes a rectangle that is not a square.'],
 ['I have 4 equal sides but my angles are not right angles. What am I?','rhombus',['rectangle','square','triangle'],'A rhombus has 4 equal sides.'],
 ['Which shape always has exactly 3 sides?','triangle',['square','pentagon','hexagon'],'A triangle has 3 sides.'],
 ['Which shape is NOT a quadrilateral?','pentagon',['square','rectangle','rhombus'],'A quadrilateral has exactly 4 sides.'],
 ['Which of these has 4 right angles?','rectangle',['rhombus (not a square)','triangle','pentagon'],'A rectangle always has four right angles.']];return mk(R,...R.pick(B).slice(0,4))}
function shMulti(R){const t=R.int(1,2);
 if(t===1)return multi(R,'Which shapes are quadrilaterals? Select ALL that apply.',['square','rectangle','rhombus'],R.sample(['triangle','pentagon','hexagon'],2),'Quadrilaterals have 4 sides.');
 return multi(R,'Which shapes have 4 equal sides? Select ALL that apply.',['square','rhombus'],R.sample(['rectangle (not a square)','triangle','pentagon'],2).slice(0,2),'A square and a rhombus have four equal sides.')}
function shPart(R){const d=R.pick([2,3,4,6,8]),nm=R.pick(['rectangle','square','circle']);return fq3(R,`A ${nm} is cut into ${d} parts that are all the same size. What fraction of the ${nm} is each part?`,[1,d],[[d,1]],`Equal parts: each is 1 out of ${d}, or 1/${d}.`)}
NJ.reg({id:'m3_geo',subj:'math',name:'Shapes & Their Attributes',desc:'Polygons, quadrilaterals, equal parts of shapes',n:10,full:3,daily:1,gen:topicGen([shName,shName,shAttr,shAttr,shMulti,shPart])});
