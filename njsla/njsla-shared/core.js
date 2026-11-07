/* Shared helpers for the 5th grade NJSLA practice page.
   Questions are generated from a seed, so a set stays the same until "New questions" is tapped. */
function mulberry32(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function makeRng(seed){const f=mulberry32(seed>>>0);const o={f,int:(a,b)=>a+Math.floor(f()*(b-a+1)),pick:arr=>arr[Math.floor(f()*arr.length)],shuffle:arr=>{const x=arr.slice();for(let i=x.length-1;i>0;i--){const j=Math.floor(f()*(i+1));const t=x[i];x[i]=x[j];x[j]=t}return x},sample:(arr,k)=>o.shuffle(arr).slice(0,k)};return o}
const cap=w=>w.charAt(0).toUpperCase()+w.slice(1);
const art=w=>(/^[aeiou]/i.test(w)?'an ':'a ')+w;
const list=a=>a.length<3?a.join(' and '):a.slice(0,-1).join(', ')+', and '+a[a.length-1];

const NJ={topics:[],reg(t){this.topics.push(t)},subjects:[
 {id:'math',name:'Math',blurb:'Operations, base ten, fractions, measurement, geometry'},
 {id:'ela',name:'ELA: Reading & Writing',blurb:'Passages, vocabulary, grammar, editing, writing'},
 {id:'sci',name:'Science',blurb:'Physical, life, Earth and space science'}]};

/* Build a multiple-choice question: 1 correct answer + wrong answers (total choices, default 4), shuffled.
   sortNum keeps number choices in increasing order. */
function mk(R,q,correct,dist,exp,extra,sortNum,total){
 total=total||4;
 const c=String(correct),seen=new Set([c]),d=[];
 for(const x of dist){const s=String(x);if(!seen.has(s)){seen.add(s);d.push(s)}if(d.length===total-1)break}
 if(d.length<total-1)throw new Error('need '+(total-1)+' distractors');
 let opts=[c,...d];
 const num=s=>parseFloat(String(s).replace(/,/g,''));
 opts=sortNum?opts.sort((a,b)=>num(a)-num(b)):R.shuffle(opts);
 return Object.assign({t:'mc',q,opts,a:opts.indexOf(c),exp},extra||{});
}
/* Typed answer. acc = accepted answers (commas, $, spaces and trailing units are ignored when checking).
   num:true also accepts equal decimals (0.5 = 0.50 = .5). */
function txt(q,acc,exp,extra){return Object.assign({t:'txt',q,acc:acc.map(String),exp},extra||{})}
/* Select-all question: opts, a = array of correct indexes */
function multi(R,q,correctArr,wrongArr,exp,extra){
 const all=R.shuffle([...correctArr.map(t=>({t,ok:1})),...wrongArr.map(t=>({t,ok:0}))]);
 return Object.assign({t:'multi',q,opts:all.map(o=>o.t),a:all.map((o,i)=>o.ok?i:-1).filter(i=>i>=0),exp},extra||{});
}
/* Collect n unique questions from fn (which may return null or throw to be retried) */
function gather(n,fn){const out=[],seen=new Set();let tries=0;while(out.length<n&&tries++<800){let q=null;try{q=fn()}catch(e){q=null}if(!q)continue;const k=q.q+'|'+(q.pics||'')+'|'+(q.opts||[]).slice().sort().join('|')+'|'+(q.acc||[]).join('|');if(seen.has(k))continue;seen.add(k);out.push(q)}if(out.length<n)throw new Error('could not generate '+n);return out}
/* Pick n distinct bank items (re-shuffled so a new set looks different) */
const bankPick=(R,bank,n)=>R.sample(bank,Math.min(n,bank.length));
