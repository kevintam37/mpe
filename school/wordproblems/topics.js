/* ===== Word Problem Lab: 3rd grade multi-step word problems (original problems) =====
   Built on the IES practice guide "Assisting Students Struggling with Mathematics":
   - teach word problems by their common underlying structures (strong evidence)
   - use visual representations such as strip diagrams and arrays (moderate evidence)
   Every guided problem asks: plan the first step, solve step by step (carrying the last answer forward), then check. */
NJ.subjects=[
 {id:'guide',name:'Guided Practice',blurb:'Plan, then solve one step at a time with a picture'},
 {id:'think',name:'Think It Through',blurb:'Problem types, equations, and finding the missing step'},
 {id:'solo',name:'On Your Own',blurb:'Solve whole problems with no hints'}];

const NMW=['Maya','Leo','Ava','Noah','Zoe','Ben','Lily','Sam','Ella','Max','Ivy','Omar'];
const ITW=['stickers','cards','marbles','crayons','pencils','erasers','beads','stamps'];
const BAKE=['muffins','cookies','cupcakes','rolls'];

/* ---------- pictures (strip diagrams) ---------- */
const bx=(t,c)=>`<span style="display:inline-block;min-width:42px;padding:6px 9px;margin:2px;border:2px solid currentColor;border-radius:7px;text-align:center;font-weight:800;background:${c||'rgba(42,157,143,.22)'}">${t}</span>`;
const wpic=h=>`<div class="pics"><div class="pic" style="font-size:16px;line-height:1.55">${h}</div></div>`;
const cap1=s=>s.charAt(0).toUpperCase()+s.slice(1);
const groupsPic=(b,n)=>wpic(`<div style="font-size:12px;opacity:.7">${b} groups of ${n}</div>`+Array.from({length:b},()=>bx(n)).join(''));
const comparePic=(a,x,bn,m)=>wpic(`<div><b>${a}</b> ${bx(x)}</div><div><b>${bn}</b> ${Array.from({length:m},()=>bx(x,'rgba(255,107,74,.22)')).join('')}</div>`);
const compareAddPic=(a,x,bn,d)=>wpic(`<div><b>${a}</b> ${bx(x)}</div><div><b>${bn}</b> ${bx(x)}${bx('+'+d,'rgba(255,107,74,.22)')}</div>`);
const partsPic=(arr,tot)=>wpic(arr.map(v=>bx(v)).join('<b> + </b>')+`<b> = </b>${bx(tot===undefined?'?':tot,'rgba(244,201,93,.35)')}`);
const flowPic=arr=>wpic(arr.map(v=>bx(v)).join('<b> → </b>'));
const fmtT=m=>{const h=Math.floor(m/60)%12||12;return h+':'+String(m%60).padStart(2,'0')};

/* ---------- problem templates ----------
   each returns {txt, steps:[{do,ask,ans,expl,time?}], firstWrong:[2], eq, wrongEq:[2], pic} */
function tGroupsPlus(R){const nm=R.pick(NMW),it=R.pick(ITW),b=R.int(3,7),n=R.int(4,9),x=R.int(3,15),p=b*n;
 return {txt:`${nm} bought ${b} packs of ${it}. Each pack has ${n} ${it}. A friend gave ${nm} ${x} more ${it}. How many ${it} does ${nm} have now?`,
  steps:[{do:`Multiply ${b} × ${n} to find how many ${it} are in the packs`,ask:`How many ${it} are in the ${b} packs? (${b} × ${n})`,ans:p,expl:`${b} groups of ${n} is ${b} × ${n} = ${p}.`},
         {do:`Add the ${x} extra ${it}`,ask:`Now add the ${x} extra ${it} to ${p}. How many ${it} does ${nm} have now?`,ans:p+x,expl:`${p} + ${x} = ${p+x}.`}],
  firstWrong:[`Add ${b} + ${n} + ${x}`,`Subtract ${x} from ${n}`],eq:`(${b} × ${n}) + ${x} = ?`,wrongEq:[`${b} + ${n} + ${x} = ?`,`${b} × (${n} + ${x}) = ?`],pic:groupsPic(b,n)}}
function tGroupsMinus(R){const it=R.pick(BAKE),b=R.int(3,6),n=R.int(5,9),p=b*n,s=R.int(5,p-6);
 return {txt:`A baker made ${b} trays of ${it}. Each tray had ${n} ${it}. By noon, the baker sold ${s} ${it}. How many ${it} are left?`,
  steps:[{do:`Multiply ${b} × ${n} to find how many ${it} the baker made`,ask:`How many ${it} did the baker make? (${b} × ${n})`,ans:p,expl:`${b} trays of ${n} is ${b} × ${n} = ${p}.`},
         {do:`Subtract the ${s} that were sold`,ask:`The baker sold ${s}. What is ${p} − ${s}?`,ans:p-s,expl:`${p} − ${s} = ${p-s}.`}],
  firstWrong:[`Subtract ${s} from ${n}`,`Add ${b} + ${n} + ${s}`],eq:`(${b} × ${n}) − ${s} = ?`,wrongEq:[`${b} × (${n} − ${s}) = ?`,`(${b} × ${n}) + ${s} = ?`],pic:groupsPic(b,n)}}
function tBus(R){const a=R.int(30,60),b=R.int(8,20),c=R.int(5,25);
 return {txt:`A bus had ${a} riders. At the first stop, ${b} riders got off. At the next stop, ${c} riders got on. How many riders are on the bus now?`,
  steps:[{do:`Subtract ${b} riders who got off`,ask:`${b} riders got off. What is ${a} − ${b}?`,ans:a-b,expl:`${a} − ${b} = ${a-b}.`},
         {do:`Add the ${c} riders who got on`,ask:`${c} riders got on. What is ${a-b} + ${c}?`,ans:a-b+c,expl:`${a-b} + ${c} = ${a-b+c}.`}],
  firstWrong:[`Add ${a} + ${b} + ${c}`,`Subtract ${c} from ${a}`],eq:`(${a} − ${b}) + ${c} = ?`,wrongEq:[`${a} − ${b} − ${c} = ?`,`${a} + ${b} + ${c} = ?`],pic:flowPic([a,'− '+b,'+ '+c])}}
function tCompareX(R){const [A,B]=R.sample(NMW,2),it=R.pick(ITW),x=R.int(3,9),m=R.int(2,4);
 return {txt:`${A} has ${x} ${it}. ${B} has ${m} times as many ${it} as ${A}. How many ${it} do they have together?`,
  steps:[{do:`Multiply ${m} × ${x} to find how many ${B} has`,ask:`How many ${it} does ${B} have? (${m} × ${x})`,ans:m*x,expl:`${m} times as many as ${x} is ${m} × ${x} = ${m*x}.`},
         {do:`Add ${A}'s ${x} and ${B}'s ${m*x}`,ask:`Together: ${x} + ${m*x} = ?`,ans:x+m*x,expl:`${x} + ${m*x} = ${x+m*x}.`}],
  firstWrong:[`Add ${x} + ${m}`,`Subtract ${m} from ${x}`],eq:`${x} + (${m} × ${x}) = ?`,wrongEq:[`${x} + ${m} = ?`,`${m} × ${x} = ?`],pic:comparePic(A,x,B,m)}}
function tCompareAdd(R){const [A,B,C]=R.sample(NMW,3),it=R.pick(ITW),x=R.int(12,30),d=R.int(5,15),e=R.int(3,Math.min(12,x+d-4));
 return {txt:`${A} has ${x} ${it}. ${B} has ${d} more ${it} than ${A}. ${C} has ${e} fewer ${it} than ${B}. How many ${it} does ${C} have?`,
  steps:[{do:`Add ${x} + ${d} to find how many ${B} has`,ask:`How many ${it} does ${B} have? (${x} + ${d})`,ans:x+d,expl:`${d} more than ${x} is ${x} + ${d} = ${x+d}.`},
         {do:`Subtract ${e} to find how many ${C} has`,ask:`${C} has ${e} fewer than ${x+d}. What is ${x+d} − ${e}?`,ans:x+d-e,expl:`${x+d} − ${e} = ${x+d-e}.`}],
  firstWrong:[`Add ${x} + ${d} + ${e}`,`Subtract ${e} from ${x}`],eq:`(${x} + ${d}) − ${e} = ?`,wrongEq:[`(${x} − ${d}) − ${e} = ?`,`${x} + ${d} + ${e} = ?`],pic:compareAddPic(A,x,B,d)}}
function tShare(R){const [A,B]=R.sample(NMW,2),it=R.pick(ITW),k=R.pick([3,4,5]),q=R.int(3,8),tot=k*q,a=R.int(3,tot-3),b=tot-a;
 return {txt:`${A} has ${a} ${it} and ${B} has ${b} ${it}. They put them together and share them equally among ${k} friends. How many ${it} does each friend get?`,
  steps:[{do:`Add ${a} + ${b} to find the total`,ask:`How many ${it} are there in all? (${a} + ${b})`,ans:tot,expl:`${a} + ${b} = ${tot}.`},
         {do:`Divide ${tot} by ${k}`,ask:`Share ${tot} equally among ${k} friends. What is ${tot} ÷ ${k}?`,ans:q,expl:`${tot} ÷ ${k} = ${q} because ${k} × ${q} = ${tot}.`}],
  firstWrong:[`Divide ${a} by ${k}`,`Subtract ${b} from ${a}`],eq:`(${a} + ${b}) ÷ ${k} = ?`,wrongEq:[`${a} + ${b} ÷ ${k} = ?`,`${a} + ${b} × ${k} = ?`],pic:partsPic([a,b])}}
function tTime(R){const sh=R.int(2,5),sm=R.pick([0,5,10,15,20,30,40,45]),start=sh*60+sm,d1=R.pick([20,25,30,35,40,45]),d2=R.pick([10,15,20,25].filter(v=>v!==d1)),t1=start+d1,t2=t1+d2;
 return {txt:`Soccer practice starts at ${fmtT(start)}. The team practices for ${d1} minutes and then takes a ${d2}-minute water break. What time does the water break end?`,
  steps:[{do:`Add ${d1} minutes to ${fmtT(start)} to find when practice ends`,ask:`What time does practice end? Count on ${d1} minutes from ${fmtT(start)}. (Type it like 4:05)`,ans:fmtT(t1),time:1,expl:`${fmtT(start)} plus ${d1} minutes is ${fmtT(t1)}.`},
         {do:`Add ${d2} minutes to find when the break ends`,ask:`What time does the break end? Count on ${d2} minutes from ${fmtT(t1)}. (Type it like 4:05)`,ans:fmtT(t2),time:1,expl:`${fmtT(t1)} plus ${d2} minutes is ${fmtT(t2)}.`}],
  firstWrong:[`Subtract ${d1} minutes from ${fmtT(start)}`,`Subtract ${d2} minutes from ${fmtT(start)}`],eq:`${fmtT(start)} + ${d1} min + ${d2} min = ?`,wrongEq:[`${fmtT(start)} − ${d1} min + ${d2} min = ?`,`${fmtT(start)} + ${d1} min − ${d2} min = ?`],pic:flowPic([fmtT(start),'+ '+d1+' min','+ '+d2+' min'])}}
/* three-step problems */
function tMoney(R){let nm,a,k,b,tot;do{a=R.int(5,9);k=R.int(2,4);b=R.int(1,3);tot=a+k*b}while(tot>18);nm=R.pick(NMW);
 const [one,many]=R.pick([['notebook','pens'],['puzzle','markers'],['book','bookmarks']]);
 return {txt:`${nm} bought a ${one} for $${a}. ${nm} also bought ${k} ${many} that cost $${b} each. ${nm} paid with a $20 bill. How much change should ${nm} get back?`,
  steps:[{do:`Multiply ${k} × $${b} to find the cost of the ${many}`,ask:`How much do the ${k} ${many} cost in all? (${k} × $${b})`,ans:k*b,expl:`${k} × ${b} = ${k*b}, so the ${many} cost $${k*b}.`},
         {do:`Add $${a} and $${k*b} to find the total cost`,ask:`What is the total cost of the ${one} ($${a}) and the ${many} ($${k*b})?`,ans:tot,expl:`${a} + ${k*b} = ${tot}, so the total is $${tot}.`},
         {do:`Subtract the total from $20`,ask:`${nm} paid $20. What is 20 − ${tot}? (How much change?)`,ans:20-tot,expl:`${20} − ${tot} = ${20-tot}, so the change is $${20-tot}.`}],
  firstWrong:[`Add $${a} + $${b} + $20`,`Divide $20 by ${k}`],eq:`$20 − ($${a} + ${k} × $${b}) = ?`,wrongEq:[`$20 − $${a} + ${k} × $${b} = ?`,`$20 + $${a} + (${k} × $${b}) = ?`],pic:flowPic([k+' × $'+b,'+ $'+a,'$20 − total'])}}
function tParty(R){const k=R.int(2,4),b=R.int(1,3),e=R.int(5,9),tot=4*e,a=tot-k*b;
 return {txt:`Four friends order a pizza for $${a} and ${k} drinks that cost $${b} each. They share the total cost equally. How much does each friend pay?`,
  steps:[{do:`Multiply ${k} × $${b} to find the cost of the drinks`,ask:`How much do the ${k} drinks cost in all? (${k} × $${b})`,ans:k*b,expl:`${k} × ${b} = ${k*b}, so the drinks cost $${k*b}.`},
         {do:`Add $${a} and $${k*b} to find the total cost`,ask:`What is the total cost of the pizza ($${a}) and the drinks ($${k*b})?`,ans:tot,expl:`${a} + ${k*b} = ${tot}, so the total is $${tot}.`},
         {do:`Divide the total by 4 friends`,ask:`Share $${tot} equally among 4 friends. What is ${tot} ÷ 4?`,ans:e,expl:`${tot} ÷ 4 = ${e}, because 4 × ${e} = ${tot}. Each friend pays $${e}.`}],
  firstWrong:[`Divide $${a} by 4`,`Add $${a} + ${k} + $${b}`],eq:`($${a} + ${k} × $${b}) ÷ 4 = ?`,wrongEq:[`$${a} + ${k} × $${b} ÷ 4 = ?`,`($${a} + $${b}) ÷ 4 = ?`],pic:flowPic([k+' × $'+b,'+ $'+a,'÷ 4'])}}
function tCrayons(R){const b=R.int(3,6),n=R.int(6,10),p=b*n,k=R.pick([2,3,4,5]),q=R.int(2,Math.max(2,Math.floor((p-4)/k))),rest=k*q,m=p-rest;
 return {txt:`A teacher ordered ${b} boxes of crayons. Each box has ${n} crayons. She gave ${m} crayons to the art club and put the rest equally into ${k} bins. How many crayons are in each bin?`,
  steps:[{do:`Multiply ${b} × ${n} to find how many crayons there are`,ask:`How many crayons did the teacher order? (${b} × ${n})`,ans:p,expl:`${b} boxes of ${n} is ${b} × ${n} = ${p}.`},
         {do:`Subtract the ${m} given to the art club`,ask:`${m} crayons went to the art club. What is ${p} − ${m}?`,ans:rest,expl:`${p} − ${m} = ${rest}.`},
         {do:`Divide the rest equally into ${k} bins`,ask:`Share ${rest} crayons equally into ${k} bins. What is ${rest} ÷ ${k}?`,ans:q,expl:`${rest} ÷ ${k} = ${q}, because ${k} × ${q} = ${rest}.`}],
  firstWrong:[`Subtract ${m} from ${n}`,`Divide ${n} by ${k}`],eq:`((${b} × ${n}) − ${m}) ÷ ${k} = ?`,wrongEq:[`(${b} × ${n}) − (${m} ÷ ${k}) = ?`,`${b} × ${n} − ${m} − ${k} = ?`],pic:flowPic([b+' × '+n,'− '+m,'÷ '+k])}}
const T2=[tGroupsPlus,tGroupsMinus,tBus,tCompareX,tCompareAdd,tShare,tTime],T3=[tMoney,tParty,tCrayons],ALLT=[...T2,...T3];

/* ---------- question builders ---------- */
function guidedQs(R,t){
 const pass=`<h4>Word problem</h4>${t.txt}`,base={pass,pics:t.pic},qs=[],n=t.steps.length;
 qs.push(mk(R,`<b>Plan.</b> What should you do <b>first</b> to solve this problem?`,t.steps[0].do,t.firstWrong,`Start with: ${t.steps[0].do}. ${t.steps[0].expl}`,{pass},false,3));
 t.steps.forEach((s,i)=>{const last=i===n-1;
  qs.push(txt(`<b>${last?'Final step':'Step '+(i+1)}.</b> ${s.ask}`,[String(s.ans)],`${s.expl}${last?` The answer is <b>${s.time?s.ans:s.ans}</b>.`:''}`,Object.assign({num:!s.time},base)))});
 return qs}
const guidedGen=pool=>(R,n)=>{const out=[];R.sample(pool,Math.min(n,pool.length)).forEach(f=>out.push(...guidedQs(R,f(R))));return out};
function eqQ(R,t){return mk(R,`Which equation matches the <b>whole</b> problem? Use ? for the answer.`,t.eq,t.wrongEq,`Do the parentheses first. ${t.steps.map(s=>s.expl).join(' ')}`,{pass:`<h4>Word problem</h4>${t.txt}`},false,3)}
function missQ(R,t){const nm=R.pick(NMW),s1=t.steps[0].ans,rest=t.steps.slice(1).map(s=>s.do.charAt(0).toLowerCase()+s.do.slice(1)).join(', then ');
 return mk(R,`${nm} did only the first step and wrote <b>${s1}</b> as the final answer. What did ${nm} forget to do?`,`Finish the problem: ${rest}`,[`Nothing. ${s1} is already the answer.`,`Add all the numbers in the problem together.`],`${nm} stopped too early. The question is only answered after the last step. ${t.steps.map(s=>s.expl).join(' ')}`,{pass:`<h4>Word problem</h4>${t.txt}`},false,3)}
function soloQ(R,t){const last=t.steps[t.steps.length-1];
 return txt(`${t.txt}<br><br><b>Solve it on paper. Type your final answer.</b>${last.time?' (Type the time like 4:05)':''}`,[String(last.ans)],`Steps: ${t.steps.map((s,i)=>`(${i+1}) ${s.expl}`).join(' ')} The final answer is <b>${last.ans}</b>.`,{num:!last.time})}

/* Problem Detective: name the structure */
const STRUCT=['Equal groups','Equal sharing','Change (add or take away)','Compare'];
function detect(R){const nm=R.pick(NMW),it=R.pick(ITW),t=R.int(1,5);let q,ans,exp;
 if(t===1){const b=R.int(3,8),n=R.int(3,9);q=`${nm} has ${b} bags with ${n} ${it} in each bag. How many ${it} does ${nm} have in all?`;ans=STRUCT[0];exp=`Each bag has the <b>same number</b>, and we find the total. That is equal groups (multiply).`}
 else if(t===2){const k=R.pick([3,4,5,6]),qq=R.int(3,8);q=`${nm} shares ${k*qq} ${it} equally among ${k} friends. How many ${it} does each friend get?`;ans=STRUCT[1];exp=`A total is split into <b>equal shares</b>. That is equal sharing (divide).`}
 else if(t===3){const a=R.int(20,50),b=R.int(5,15);q=`${nm} had ${a} ${it}. Then ${nm} gave away ${b} ${it}. How many ${it} does ${nm} have left?`;ans=STRUCT[2];exp=`Something <b>changes</b> the amount: some are taken away (subtract).`}
 else if(t===4){const a=R.int(20,50),b=R.int(5,15);q=`${nm} had ${a} ${it}. Then ${nm} found ${b} more ${it}. How many ${it} does ${nm} have now?`;ans=STRUCT[2];exp=`Something <b>changes</b> the amount: some are added (add).`}
 else{const [A,B]=R.sample(NMW,2),a=R.int(10,40),d=R.int(4,12);q=`${A} has ${a} ${it}. ${B} has ${d} more ${it} than ${A}. How many ${it} does ${B} have?`;ans=STRUCT[3];exp=`Two people are <b>compared</b>: who has more or fewer? That is a compare problem.`}
 return mk(R,`<b>What kind of problem is this?</b> (You do not have to solve it.)<br><br>${q}`,ans,STRUCT.filter(x=>x!==ans),exp,{},false,4)}

NJ.reg({id:'wp_guide2',subj:'guide',name:'Guided Two-Step Problems',desc:'Plan first, then solve each step with a picture',n:4,full:4,daily:1,gen:guidedGen(T2)});
NJ.reg({id:'wp_guide3',subj:'guide',name:'Guided Three-Step Challenge',desc:'Money and equal groups with three steps',n:3,full:3,daily:1,gen:guidedGen(T3)});
NJ.reg({id:'wp_detect',subj:'think',name:'Problem Detective',desc:'Name the type: equal groups, sharing, change, compare',n:6,full:6,daily:2,gen:(R,n)=>gather(n,()=>detect(R))});
NJ.reg({id:'wp_eq',subj:'think',name:'Pick the Equation',desc:'Match the whole problem to the right equation',n:6,full:6,daily:2,gen:(R,n)=>gather(n,()=>eqQ(R,R.pick(ALLT)(R)))});
NJ.reg({id:'wp_miss',subj:'think',name:'Find the Missing Step',desc:'A student stopped too early. What did they forget?',n:5,full:5,daily:1,gen:(R,n)=>gather(n,()=>missQ(R,R.pick(ALLT)(R)))});
NJ.reg({id:'wp_solo',subj:'solo',name:'Solve It Yourself',desc:'Whole problems with only the final answer to type',n:6,full:8,daily:2,gen:(R,n)=>gather(n,()=>soloQ(R,R.pick(ALLT)(R)))});
