/* ===== Kindergarten MATH (NJ Student Learning Standards style, original questions) ===== */
KS('Counting, numbers, adding, shapes, measuring','Letters, sounds, rhymes, sight words, stories','Living things, senses, weather, pushes and pulls','Community, rules, maps, our country');
const OBJ=['🍎','🍓','🍌','🐟','⭐','🎈','🐥','🚗','🌸','⚽','🐞','🧸'];
const OB1={'🍎':'apple','🍓':'strawberry','🍌':'banana','🐟':'fish','⭐':'star','🎈':'balloon','🐥':'chick','🚗':'car','🌸':'flower','⚽':'ball','🐞':'ladybug','🧸':'teddy bear'};
const nn=(e,n)=>n===1?OB1[e]:OBN[e];
const OBN={'🍎':'apples','🍓':'strawberries','🍌':'bananas','🐟':'fish','⭐':'stars','🎈':'balloons','🐥':'chicks','🚗':'cars','🌸':'flowers','⚽':'balls','🐞':'ladybugs','🧸':'teddy bears'};
function kCount(R){const e=R.pick(OBJ),n=R.int(1,R.f()<.3?15:10),t=R.int(1,3);
 if(t===1)return kn(R,`How many ${OBN[e]} are there?`,n,[n+1,n-1],`Count each one: ${n}.`,{pics:eRow(e,n)});
 if(t===2){const e2=R.pick(OBJ.filter(x=>x!==e)),a=R.int(1,8),b=R.int(1,8);return kn(R,`How many ${OBN[e]} are there?`,a,[b,a+1,a-1],`Count only the ${OBN[e]}: ${a}.`,{pics:eTwo(e,a,e2,b)})}
 const n2=R.int(2,9);const w=[n2-1,n2+1,n2+2,n2-2].filter(x=>x>=1);return mk3(R,`Which group shows ${n2}?`,e.repeat(n2),R.shuffle(w).slice(0,2).map(x=>e.repeat(x)),`Count the pictures in each group: ${n2}.`)}
function kNext(R){const a=R.int(1,18),t=R.int(1,3);
 if(t===1)return kn(R,`What number comes next?\n${a-1>0?a-1:a}, ${a-1>0?a:a+1}, ${a-1>0?a+1:a+2}, __`.replace(/^/,''),a-1>0?a+2:a+3,[a],`Counting up, the next number is ${a-1>0?a+2:a+3}.`);
 if(t===2)return kn(R,`What number comes right AFTER ${a}?`,a+1,[a-1,a+2],`${a+1} comes right after ${a}.`);
 return kn(R,`What number comes right BEFORE ${a+1}?`,a,[a+2,a-1],`${a} comes right before ${a+1}.`)}
function kBig(R){const a=R.int(1,10),b=R.int(1,10);if(a===b)return null;const big=R.f()<.5;
 return kn(R,`Which number is ${big?'bigger':'smaller'}?`,big?Math.max(a,b):Math.min(a,b),[big?Math.min(a,b):Math.max(a,b)],`${Math.max(a,b)} is more than ${Math.min(a,b)}.`,{pics:eBig(`${a} &nbsp; ${b}`)}).t?mk3(R,`Which number is ${big?'bigger':'smaller'}: ${a} or ${b}?`,String(big?Math.max(a,b):Math.min(a,b)),[String(big?Math.min(a,b):Math.max(a,b)),'They are the same'],`${Math.max(a,b)} is more than ${Math.min(a,b)}.`):null}
function kTen(R){const n=R.int(1,9),t=R.int(1,2);
 if(t===1)return kn(R,`10 and ${n} more makes how many?`,10+n,[n,10+n+1,10+n-1],`10 + ${n} = ${10+n}. Numbers 11 to 19 are ten and some more.`);
 return kn(R,`${10+n} is ten and how many more?`,n,[n+1,10,n-1>0?n-1:n+2],`${10+n} is 10 and ${n} more.`)}
function kSkip(R){const t=R.int(1,2),a=R.int(1,6)*10;
 if(t===1)return kn(R,`Count by tens: ${a-10>0?a-10:a}, ${a-10>0?a:a+10}, __`,a-10>0?a+10:a+20,[a-10>0?a+1:a+11,a-10>0?a+5:a+15],`Add 10 each time.`.replace('.',': ')+(a-10>0?a+10:a+20));
 const s=R.int(1,90);return kn(R,`What number comes next? ${s}, ${s+1}, ${s+2}, __`,s+3,[s+4,s+10],`Count up by ones: ${s+3}.`)}
function kMore(R){const e=R.pick(OBJ),a=R.int(1,9),b=R.f()<.25?a:R.int(1,9);const ans=a>b?'The top group':a<b?'The bottom group':'They are the same';
 return mk3(R,`Which group has more?`,ans,['The top group','The bottom group','They are the same'].filter(x=>x!==ans),a===b?'Both groups have the same number.':`${Math.max(a,b)} is more than ${Math.min(a,b)}.`,{pics:`<div class="pics"><div class="pic emo">${e.repeat(a)}</div><div class="pic emo">${e.repeat(b)}</div></div>`})}
function kFew(R){const e=R.pick(OBJ),a=R.int(1,9),b=R.int(1,9);if(a===b)return null;const ans=a<b?'The top group':'The bottom group';
 return mk3(R,`Which group has fewer?`,ans,['The top group','The bottom group','They are the same'].filter(x=>x!==ans),`${Math.min(a,b)} is fewer than ${Math.max(a,b)}.`,{pics:`<div class="pics"><div class="pic emo">${e.repeat(a)}</div><div class="pic emo">${e.repeat(b)}</div></div>`})}
function kOrder(R){const v=R.sample([1,2,3,4,5,6,7,8,9,10],3).sort((a,b)=>a-b);const w=[[v[1],v[0],v[2]],[v[2],v[1],v[0]],[v[0],v[2],v[1]]];
 return mk3(R,`Which shows the numbers in order from smallest to biggest?`,v.join(', '),w.map(x=>x.join(', ')),`The smallest number goes first: ${v.join(', ')}.`)}
NJ.reg({id:'k_count',subj:'math',name:'Counting & Numbers',desc:'Count objects, what comes next, teen numbers, counting by tens',n:10,full:4,daily:1,gen:topicGen([kCount,kCount,kCount,kNext,kNext,kTen,kSkip])});
NJ.reg({id:'k_comp',subj:'math',name:'More, Fewer & Order',desc:'Compare groups and numbers, put numbers in order',n:10,full:3,daily:1,gen:topicGen([kMore,kMore,kFew,kBig,kBig,kOrder])});

function kAdd(R){const e=R.pick(OBJ),a=R.int(1,5),b=R.int(1,5),t=R.int(1,3);if(a+b>10)return null;
 if(t===1)return kn(R,`${a} + ${b} = ?`,a+b,[a,b,a+b+1],`Put them together: ${a} and ${b} make ${a+b}.`,{pics:`<div class="pics"><div class="pic emo">${e.repeat(a)}</div><div class="pic emo" style="border:none;background:none">+</div><div class="pic emo">${e.repeat(b)}</div></div>`});
 if(t===2){const nm=R.pick(KN);return kn(R,`${nm} has ${a} ${nn(e,a)}. ${nm} gets ${b} more. How many ${OBN[e]} does ${nm} have now?`,a+b,[a,b,a+b+1],`${a} + ${b} = ${a+b}.`,{pics:eTwo(e,a,e,b)})}
 return kn(R,`There ${a===1?'is':'are'} ${a} ${nn(e,a)} here and ${b} ${nn(e,b)} there. How many in all?`,a+b,[a,a+b-1,a+b+1],`${a} + ${b} = ${a+b}.`,{pics:eTwo(e,a,e,b)})}
function kSub(R){const e=R.pick(OBJ),a=R.int(2,10),b=R.int(1,a-1),t=R.int(1,3);
 if(t===1)return kn(R,`${a} − ${b} = ?`,a-b,[a,b,a-b+1],`Take away ${b} from ${a}: ${a-b} left.`,{pics:eRow(e,a,5)});
 if(t===2){const nm=R.pick(KN);return kn(R,`${nm} has ${a} ${nn(e,a)}. ${nm} gives away ${b}. How many are left?`,a-b,[a,b,a-b+1],`${a} − ${b} = ${a-b}.`,{pics:eRow(e,a,5)})}
 return kn(R,`There ${a===1?'is':'are'} ${a} ${nn(e,a)}. ${b} ${b===1?'goes':'go'} away. How many are left?`,a-b,[a,b,a-b-1],`${a} − ${b} = ${a-b}.`,{pics:eRow(e,a,5)})}
function kMake(R){const t=R.pick([5,5,10]),a=R.int(0,t);return kn(R,`${a} and __ make ${t}.`,t-a,[a,t,t-a+1],`${a} + ${t-a} = ${t}.`)}
function kMore2(R){const a=R.int(1,5),b=R.int(1,4),nm=R.pick(KN);return kn(R,`${nm} has ${a} cookies. ${nm} gets ${b} more. How many now?`,a+b,[a,b,a+b+1],`${a} + ${b} = ${a+b}.`,{pics:eTwo('🍪',a,'🍪',b)})}
NJ.reg({id:'k_add',subj:'math',name:'Adding',desc:'Put together, add within 10, story problems',n:10,full:4,daily:1,gen:topicGen([kAdd,kAdd,kAdd,kMore2])});
NJ.reg({id:'k_sub',subj:'math',name:'Subtracting',desc:'Take away, subtract within 10, story problems',n:10,full:4,daily:1,gen:topicGen([kSub])});
NJ.reg({id:'k_make',subj:'math',name:'Making 5 and 10',desc:'Number partners: pairs that make 5 and 10',n:10,full:2,daily:1,gen:topicGen([kMake])});

function kShape(R){const names=['circle','square','triangle','rectangle','hexagon'],n=R.pick(names);
 return mk3(R,`What shape is this?`,n,names.filter(x=>x!==n),`This shape is a ${n}.`,{pics:shpPic(n,R.pick(SHCOL))})}
function kSides(R){const B=[['triangle',3],['square',4],['rectangle',4],['hexagon',6]],[n,s]=R.pick(B);
 return kn(R,`How many sides does a ${n} have?`,s,[3,4,5,6,s+1],`A ${n} has ${s} sides.`,{pics:shpPic(n,R.pick(SHCOL))})}
function kReal(R){const B=[['a ball ⚽','sphere','A ball is round like a sphere.'],['a number cube 🎲','cube','A number cube is shaped like a cube.'],['a can of soup 🥫','cylinder','A can is a cylinder.'],['an ice cream cone 🍦','cone','The cone part is shaped like a cone.']],[o,n,e]=R.pick(B);
 return mk3(R,`Which shape is like ${o}?`,n,['sphere','cube','cylinder','cone'].filter(x=>x!==n),e)}
function kFlat(R){const B=[['A wheel 🛞','circle'],['A window 🪟','square'],['A slice of pizza 🍕','triangle'],['A door 🚪','rectangle']],[o,n]=R.pick(B);
 return mk3(R,`${o} is most like which flat shape?`,n,['circle','square','triangle','rectangle'].filter(x=>x!==n),`It looks like a ${n}.`)}
function kPos(R){const T=R.sample(['🐱','🐶','🐸','🐰','🐥'],3),[a,b,c]=T,t=R.int(1,3),pic=eBig(`${a}<br>${b}<br>${c}`);
 if(t===1)return mk3(R,`Which animal is ABOVE the ${b}?`,a,[b,c].filter(x=>x),`${a} is on top, above ${b}.`.replace('on top,','on top, '),{pics:pic});
 if(t===2)return mk3(R,`Which animal is BELOW the ${b}?`,c,[a,'🐻'],`${c} is at the bottom, below ${b}.`,{pics:pic});
 return mk3(R,`Which animal is BETWEEN the other two?`,b,[a,c],`${b} is in the middle, between ${a} and ${c}.`,{pics:pic})}
function kPat(R){const P=R.sample(['🔴','🔵','🟡','🟢','⭐','🌙','🐱','🐶'],3),[a,b,c]=P,t=R.int(1,3);
 let seq,nx;
 if(t===1){seq=[a,b,a,b,a,b];nx=a}else if(t===2){seq=[a,a,b,b,a,a];nx=b}else{seq=[a,b,c,a,b];nx=c}
 return mk3(R,`What comes next in the pattern?`,nx,P.filter(x=>x!==nx).slice(0,2),`Look for what repeats: ${nx} comes next.`,{pics:eBig(seq.join(' ')+' ❓')})}
NJ.reg({id:'k_shape',subj:'math',name:'Shapes',desc:'Flat shapes, solid shapes, sides, shapes in real life',n:10,full:4,daily:1,gen:topicGen([kShape,kShape,kSides,kReal,kFlat])});
NJ.reg({id:'k_pat',subj:'math',name:'Patterns & Where Things Are',desc:'What comes next, above, below, between',n:8,full:3,daily:1,gen:topicGen([kPat,kPat,kPos,kPos])});

function kLong(R){const a=R.int(2,9),b=R.int(2,9);if(a===b)return null;const t=R.pick(['longer','shorter']);
 const bar=(w,y,c)=>`<rect x="10" y="${y}" width="${w*22}" height="24" rx="6" fill="${c}" fill-opacity=".65" stroke="currentColor" stroke-width="2"/>`;
 const ans=(t==='longer'?a>b:a<b)?'The top one':'The bottom one';
 return mk3(R,`Which is ${t}?`,ans,['The top one','The bottom one','They are the same'].filter(x=>x!==ans),`Compare the two lengths: the ${ans.slice(4)} is ${t}.`,{pics:svgW(230,80,bar(a,8,'#4C8DF6')+bar(b,44,'#E0457B'),'two bars')})}
function kHeavy(R){const P=[['🐘','🐭'],['🚌','🚲'],['🐄','🐥'],['🍉','🍓'],['🏠','🪑']],[h,l]=R.pick(P),t=R.pick(['heavier','lighter']),sw=R.f()<.5,A=sw?l:h,B=sw?h:l,w=t==='heavier'?h:l;
 return mk3(R,`Which is ${t}? ${A} or ${B}`,w,[w===A?B:A],`The ${w} is ${t}.`).opts?mk3(R,`Which is ${t}?`,w,[w===A?B:A,'They weigh the same'],`${w} is ${t}.`,{pics:eBig(`${A} &nbsp; ${B}`)}):null}
function kTall(R){const P=[['🌳','🌱'],['🦒','🐕'],['🏢','🏠'],['🧍','🧒']];return null}
function kSort(R){const c1=R.pick(['🔴','🟡','🟢']),c2=R.pick(['🔵','🟣','🟠']),a=R.int(1,7),b=R.int(1,7),ar=R.shuffle([...Array(a).fill(c1),...Array(b).fill(c2)]),t=R.int(1,3);
 const pic=eBig(ar.join(' '));
 if(t===1)return kn(R,`How many ${c1}?`,a,[b,a+1],`Count only ${c1}: ${a}.`,{pics:pic});
 if(t===2)return kn(R,`How many ${c2}?`,b,[a,b+1],`Count only ${c2}: ${b}.`,{pics:pic});
 if(a===b)return null;const ans=a>b?c1:c2;return mk3(R,`Which color has more?`,ans,[c1,c2,'Same'].filter(x=>x!==ans),`${Math.max(a,b)} is more than ${Math.min(a,b)}.`,{pics:pic})}
function kGraph(R){const E=R.sample(['🍎','🍌','🍇','🍊'],3),n=E.map(()=>R.int(1,6)),t=R.int(1,2);
 const pic=TBL(null,E.map((e,i)=>[`<span style="font-size:26px">${e}</span>`,`<span style="font-size:22px">${'🟦'.repeat(n[i])}</span>`]));
 if(t===1){const mx=Math.max(...n);if(n.filter(x=>x===mx).length>1)return null;const i=n.indexOf(mx);return mk3(R,`Each square is 1. Which fruit has the MOST?`,E[i],E.filter((x,j)=>j!==i),`${E[i]} has the longest row: ${mx}.`,{pics:pic})}
 const i=R.int(0,2);return kn(R,`Each square is 1. How many ${E[i]}?`,n[i],[n[i]+1,n[i]-1],`Count the squares in the row: ${n[i]}.`,{pics:pic})}
NJ.reg({id:'k_meas',subj:'math',name:'Measuring, Sorting & Graphs',desc:'Longer/shorter, heavier/lighter, sort and count, picture graphs',n:10,full:4,daily:1,gen:topicGen([kLong,kLong,kHeavy,kSort,kSort,kGraph])});
