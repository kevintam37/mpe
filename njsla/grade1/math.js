/* ===== 1st grade MATH (NJ Student Learning Standards style, original questions) ===== */
KS('Adding and subtracting to 20, tens and ones, time, shapes','Phonics, sight words, spelling, stories, grammar','Sun and Moon, light and sound, plants and animals','Community, maps, our country and state');
const G1N=['Mia','Leo','Ava','Sam','Zoe','Ben','Lily','Max','Ella','Noah','Ivy','Eli'];
const G1T=[['apples','🍎'],['stickers','⭐'],['cookies','🍪'],['marbles','🔵'],['crayons','🖍️'],['balloons','🎈'],['books','📖'],['cars','🚗']];
/* ---------- Addition ---------- */
function a1Fact(R){const a=R.int(1,9),b=R.int(1,9),t=R.int(1,3);
 if(a+b>20)return null;
 if(t===1)return numQ(R,`${a} + ${b} = ?`,a+b,[a+b+1,a+b-1,a,b],`${a} + ${b} = ${a+b}.`);
 if(t===2){const d=R.int(2,9);return numQ(R,`${d} + ${d} = ?`,2*d,[2*d+1,2*d-1,d],`Doubles: ${d} + ${d} = ${2*d}.`)}
 const c=R.int(1,6);return numQ(R,`${a} + ${b} + ${c} = ?`,a+b+c,[a+b,a+b+c+1,a+b+c-1],`Add two numbers first, then the third: ${a+b} + ${c} = ${a+b+c}.`)}
function a1Ten(R){const a=R.int(6,9),b=R.int(2,9);if(a+b<=10)return null;
 return numQ(R,`${a} + ${b} = ?  (Hint: make a 10 first.)`,a+b,[a+b+1,a+b-1,a+b+10],`${a} + ${10-a} = 10, then 10 + ${b-(10-a)} = ${a+b}.`)}
function a1Tens(R){const a=R.int(1,9),t=R.int(1,2);
 if(t===1)return numQ(R,`10 + ${a} = ?`,10+a,[a,10+a+1,10+a-1],`10 and ${a} more is ${10+a}.`);
 return numQ(R,`${10+a} = 10 + ?`,a,[a+1,a-1>0?a-1:a+2,10],`${10+a} is 10 and ${a} more.`)}
function a1Pic(R){const[n,e]=R.pick(G1T),a=R.int(2,9),b=R.int(2,9);if(a+b>20)return null;
 return numQ(R,`How many ${n} in all?`,a+b,[a+b+1,a+b-1,a,b],`${a} + ${b} = ${a+b}.`,{pics:`<div class="pics"><div class="pic emo" style="font-size:24px">${e.repeat(a)}</div><div class="pic emo" style="font-size:24px">${e.repeat(b)}</div></div>`})}
NJ.reg({id:'g1_add',subj:'math',name:'Adding to 20',desc:'Facts, doubles, make a ten, adding three numbers',n:10,full:4,daily:2,gen:topicGen([a1Fact,a1Fact,a1Ten,a1Tens,a1Pic])});
/* ---------- Subtraction ---------- */
function s1Fact(R){const a=R.int(2,18),b=R.int(1,Math.min(a,9)),t=R.int(1,3);if(a>18)return null;
 if(t===1)return numQ(R,`${a} − ${b} = ?`,a-b,[a-b+1,a-b-1,a+b,b],`${a} − ${b} = ${a-b}.`);
 if(t===2)return numQ(R,`${b} + ? = ${a}`,a-b,[a-b+1,a-b-1,a+b],`Think: ${a} − ${b} = ${a-b}.`);
 return numQ(R,`${a} − ? = ${b}`,a-b,[a-b+1,a-b-1,a+b],`${a} − ${a-b} = ${b}.`)}
function s1Ten(R){const a=R.int(11,18),b=R.int(2,9);if(b<=a-10)return null;
 return numQ(R,`${a} − ${b} = ?  (Hint: take apart to 10.)`,a-b,[a-b+1,a-b-1,a-b+10],`${a} − ${a-10} = 10, then 10 − ${b-(a-10)} = ${a-b}.`)}
function s1Pic(R){const[n,e]=R.pick(G1T),a=R.int(4,14),b=R.int(1,a-1);
 return numQ(R,`There are ${a} ${n}. ${b} are taken away. How many are left?`,a-b,[a-b+1,a-b-1,a+b],`${a} − ${b} = ${a-b}.`,{pics:`<div class="pics"><div class="pic emo" style="font-size:22px">${e.repeat(a)}</div></div>`})}
NJ.reg({id:'g1_sub',subj:'math',name:'Subtracting to 20',desc:'Take away, missing numbers, think addition',n:10,full:4,daily:2,gen:topicGen([s1Fact,s1Fact,s1Ten,s1Pic])});
/* ---------- Word problems ---------- */
function wProb(R){const[n]=R.pick(G1T),nm=R.pick(G1N),a=R.int(3,12),b=R.int(2,8),t=R.int(1,6);
 if(t===1)return numQ(R,`${nm} has ${a} ${n}. ${nm} gets ${b} more. How many ${n} does ${nm} have now?`,a+b,[a,b,a+b+1,a+b-1],`${a} + ${b} = ${a+b}.`);
 if(t===2&&a>b)return numQ(R,`${nm} had ${a} ${n}. ${nm} gave away ${b}. How many ${n} are left?`,a-b,[a+b,a-b+1,a-b-1],`${a} − ${b} = ${a-b}.`);
 if(t===3&&a>b)return numQ(R,`${nm} has ${a} ${n}. Sam has ${b} ${n}. How many more does ${nm} have than Sam?`,a-b,[a+b,a-b+1,a-b-1],`${a} − ${b} = ${a-b}.`);
 if(t===4){const nm2=R.pick(G1N.filter(x=>x!==nm));return numQ(R,`${nm} has ${a} red ${n} and ${b} blue ${n}. How many ${n} does ${nm} have in all?`,a+b,[a,b,a+b+1],`${a} + ${b} = ${a+b}.`)}
 if(t===5)return numQ(R,`${nm} has ${a} ${n}. After ${nm} gets some more, there are ${a+b}. How many did ${nm} get?`,b,[a+b,a,b+1,b-1>0?b-1:b+2],`${a} + ? = ${a+b}, so ? = ${b}.`);
 if(t===6&&a+b<=20){const c=R.int(1,5);if(a+b+c>20)return null;return numQ(R,`${nm} has ${a} ${n}. Ben has ${b}. Ava has ${c}. How many ${n} do they have all together?`,a+b+c,[a+b,a+b+c+1,a+b+c-1],`${a} + ${b} + ${c} = ${a+b+c}.`)}
 return null}
NJ.reg({id:'g1_word',subj:'math',name:'Word Problems',desc:'Add to, take from, put together, compare, find the missing number',n:10,full:4,daily:2,gen:topicGen([wProb])});
/* ---------- Equal sign & fact families ---------- */
function eqTF(R){const a=R.int(2,9),b=R.int(2,9),c=R.int(2,9),d=a+b-c;if(d<0||d>18)return null;const tr=R.f()<.5,r=tr?d:d+R.pick([1,-1,2]);if(r<0)return null;
 return mk3(R,`Is this number sentence true or false?\n<b>${a} + ${b} = ${c} + ${r}</b>`,tr?'True':'False',[tr?'False':'True','Not sure'].slice(0,2),tr?`Both sides equal ${a+b}.`:`The left side is ${a+b} and the right side is ${c+r}.`)}
function eqMiss(R){const a=R.int(2,9),b=R.int(2,9),t=R.int(1,3);if(a+b>18)return null;
 if(t===1)return numQ(R,`${a} + ${b} = ? + ${b+1}`.replace('? + '+(b+1),'__ + '+(b+1)),a-1,[a,a+1,a+b],`The sides must be equal. ${a+b} = ${a-1} + ${b+1}.`);
 if(t===2)return numQ(R,`${a+b} = __ + ${b}`,a,[a+b,a+1,a-1>0?a-1:a+2],`${a} + ${b} = ${a+b}.`);
 return numQ(R,`__ + ${a} = ${a+b}`,b,[a+b,b+1,a],`${b} + ${a} = ${a+b}.`)}
function fam(R){const a=R.int(2,9),b=R.int(2,9),s=a+b;if(a===b||s>18)return null;
 return mk3(R,`Which number sentence is in the same fact family as <b>${a} + ${b} = ${s}</b>?`,`${s} − ${a} = ${b}`,[`${s} − ${a} = ${a}`,`${a} − ${b} = ${s}`,`${s} + ${a} = ${b}`],`Fact family: ${a}, ${b}, and ${s} go together: ${a}+${b}=${s}, ${b}+${a}=${s}, ${s}−${a}=${b}, ${s}−${b}=${a}.`)}
function swap(R){const a=R.int(2,9),b=R.int(2,9);if(a===b)return null;return numQ(R,`${a} + ${b} = ${b} + __`,a,[a+b,b,a+1],`Adding in any order gives the same total.`)}
NJ.reg({id:'g1_eq',subj:'math',name:'Equal Sign & Fact Families',desc:'True or false, missing numbers, fact families, any order',n:10,full:3,daily:1,gen:topicGen([eqTF,eqMiss,eqMiss,fam,swap])});
/* ---------- Tens and ones ---------- */
function pvBlocks(R){const t=R.int(1,9),o=R.int(0,9);return numQ(R,`What number do the blocks show?`,t*10+o,[t+o,o*10+t,t*10+o+10,t*10+o+1],`${t} tens and ${o} ones is ${t*10+o}.`,{pics:blocksSVG(0,t,o)})}
function pvTO(R){const n=R.int(11,99),t=Math.floor(n/10),o=n%10,k=R.int(1,3);
 if(k===1)return numQ(R,`${t} tens and ${o} ones = ?`,n,[o*10+t,t+o,n+10],`${t} tens is ${t*10}, plus ${o} ones is ${n}.`);
 if(k===2)return numQ(R,`${n} is __ tens and ${o} ones.`,t,[o,t+1,t-1>0?t-1:t+2],`The tens digit of ${n} is ${t}.`);
 return mk3(R,`Which number has ${t} tens and ${o} ones?`,String(n),[String(o*10+t),String(n+10)].filter(x=>x!==String(n)).concat([String(n+1)]),`${t} tens ${o} ones is ${n}.`)}
function pvTens(R){const n=R.int(2,9),t=R.int(1,2);
 if(t===1)return numQ(R,`${n} tens = ?`,n*10,[n,n*10+1,n+10],`${n} tens is ${n*10}.`);
 return numQ(R,`How many tens are in ${n*10}?`,n,[n*10,n+1,n-1>0?n-1:n+2],`${n*10} is ${n} tens.`)}
function pvVal(R){const n=R.int(21,98),t=Math.floor(n/10),o=n%10;if(!o||o===t)return null;const w=R.f()<.5;
 return mk3(R,`In the number <b>${n}</b>, what does the digit <b>${w?t:o}</b> mean?`,w?`${t} tens (${t*10})`:`${o} ones`,w?[`${t} ones`,`${o} tens`]:[`${o} tens (${o*10})`,`${t} ones`],`In ${n}, the ${w?t:o} is in the ${w?'tens':'ones'} place.`)}
NJ.reg({id:'g1_pv',subj:'math',name:'Tens and Ones',desc:'Place value to 99, base ten blocks, tens and ones',n:10,full:4,daily:2,gen:topicGen([pvBlocks,pvBlocks,pvTO,pvTO,pvTens,pvVal])});
/* ---------- Compare, count, add tens ---------- */
function cmpQ(R){const a=R.int(10,99),b=R.int(10,99);if(a===b)return null;const gt=a>b;
 return mk3(R,`Which sign makes this true?\n<b>${a} __ ${b}</b>`,gt?'>':'<',[gt?'<':'>','='],`${a} is ${gt?'greater':'less'} than ${b}, so use ${gt?'>':'<'}.`)}
function cmpBig(R){const a=R.int(10,99),b=R.int(10,99);if(a===b)return null;const big=R.f()<.5;
 return mk3(R,`Which number is ${big?'greater':'less'}: ${a} or ${b}?`,String(big?Math.max(a,b):Math.min(a,b)),[String(big?Math.min(a,b):Math.max(a,b)),'They are equal'],`Compare the tens first, then the ones.`)}
function tenMore(R){const n=R.int(11,89),up=R.f()<.5;return numQ(R,`What is 10 ${up?'more':'less'} than ${n}?`,up?n+10:n-10,[up?n+1:n-1,up?n-10:n+10,up?n+100:n-100].filter(x=>x>0),`${up?'Add':'Subtract'} one ten: ${up?n+10:n-10}.`)}
function skip(R){const s=R.pick([2,5,10]),st=R.int(0,4)*s+(s===10?10:s),t=R.int(1,2);
 return numQ(R,`Count by ${s}s: ${st}, ${st+s}, ${st+2*s}, __`,st+3*s,[st+3*s+1,st+3*s-s,st+2*s+1],`Add ${s} each time: ${st+3*s}.`)}
function addTens(R){const a=R.int(1,9)*10,b=R.int(1,9)*10;if(a+b>100)return null;const t=R.int(1,2);
 if(t===1)return numQ(R,`${a} + ${b} = ?`,a+b,[a+b+10,a+b-10,a+b+1],`${a/10} tens + ${b/10} tens = ${(a+b)/10} tens = ${a+b}.`);
 const n=R.int(11,89),k=R.int(1,9);if(n%10+k>9)return null;return numQ(R,`${n} + ${k} = ?`,n+k,[n+k+10,n+k-1,n+k+1],`${n%10} + ${k} = ${n%10+k}, so the answer is ${n+k}.`)}
function after(R){const n=R.int(60,115);const t=R.int(1,2);return numQ(R,t===1?`What number comes right after ${n}?`:`What number comes right before ${n}?`,t===1?n+1:n-1,[t===1?n-1:n+1,n+10,n],t===1?`${n+1} comes after ${n}.`:`${n-1} comes before ${n}.`)}
NJ.reg({id:'g1_cmp',subj:'math',name:'Compare, Count & Add Tens',desc:'Greater than/less than, 10 more/less, skip counting, adding tens',n:10,full:4,daily:2,gen:topicGen([cmpQ,cmpQ,cmpBig,tenMore,skip,addTens,after])});
/* ---------- Time & money ---------- */
function tmHour(R){const h=R.int(1,12);return mk3(R,`What time does the clock show?`,T12(h,0),[T12(h+1,0),T12(h-1,0)],`The short hand points to ${h} and the long hand points to 12: ${T12(h,0)}.`,{pics:clockSVG(h,0)})}
function tmHalf(R){const h=R.int(1,12);return mk3(R,`What time does the clock show?`,T12(h,30),[T12(h,0),T12(h+1,30)],`The long hand points to 6, so it is half past ${h}: ${T12(h,30)}.`,{pics:clockSVG(h,30)})}
function tmHalfW(R){const h=R.int(1,12),half=R.f()<.5;return mk3(R,`Which time is ${half?'half past '+h:h+" o'clock"}?`,T12(h,half?30:0),[T12(h,half?0:30),T12(h+1,half?30:0)],half?`Half past ${h} is ${T12(h,30)}.`:`${h} o'clock is ${T12(h,0)}.`)}
function mnCoin(R){const c=R.pick([1,5,10,25]);return mk3(R,`What is the value of a ${COIN[c][1]}?`,`${c} cents`,[1,5,10,25].filter(x=>x!==c).slice(0,3).map(x=>`${x} cents`),`A ${COIN[c][1]} is worth ${c} cents.`,{pics:coinsPic([c])})}
function mnCount(R){const k=R.int(2,5),list=[];for(let i=0;i<k;i++)list.push(R.pick([1,5,10]));list.sort((a,b)=>b-a);const v=list.reduce((a,b)=>a+b,0);
 return numQ(R,`How many cents in all?`,v,[v+1,v-1,v+5,v+10],`Add the coins: ${list.join(' + ')} = ${v}.`,{pics:coinsPic(list)})}
function mnTrade(R){const B=[['How many pennies make a nickel?','5',['1','10'],'5 pennies = 1 nickel.'],['How many pennies make a dime?','10',['5','25'],'10 pennies = 1 dime.'],['How many nickels make a dime?','2',['5','10'],'2 nickels = 1 dime.'],['Which coin is worth the MOST?','quarter',['dime','nickel'],'A quarter is 25 cents.'],['Which coin is worth the LEAST?','penny',['dime','quarter'],'A penny is 1 cent.']];return mk3(R,...R.pick(B))}
NJ.reg({id:'g1_time',subj:'math',name:'Time & Coins',desc:"Time to the hour and half hour, penny, nickel, dime, quarter",n:10,full:4,daily:2,gen:topicGen([tmHour,tmHour,tmHalf,tmHalf,tmHalfW,mnCoin,mnCount,mnCount,mnTrade])});
/* ---------- Measurement & data ---------- */
function msCubes(R){const n=R.int(3,10),e=R.pick(['🖍️','✏️','🥕','🪄']);const bar=`<rect x="8" y="14" width="${n*22}" height="24" rx="3" fill="#4C8DF6" fill-opacity=".45" stroke="currentColor" stroke-width="2"/>`+Array.from({length:n-1},(_,i)=>`<line x1="${8+(i+1)*22}" y1="14" x2="${8+(i+1)*22}" y2="38" stroke="currentColor"/>`).join('');
 return numQ(R,`The bar is made of small cubes. How long is the bar in cubes?`,n,[n+1,n-1,n+2],`Count the cubes: ${n}.`,{pics:svgW(n*22+16,52,bar,'cube bar')})}
function msCmp(R){const a=R.int(2,9),b=R.int(2,9);if(a===b)return null;const t=R.pick(['longer','shorter']);
 const bar=(w,y,c)=>`<rect x="10" y="${y}" width="${w*22}" height="22" rx="5" fill="${c}" fill-opacity=".65" stroke="currentColor" stroke-width="2"/>`;
 const ans=(t==='longer'?a>b:a<b)?'The top one':'The bottom one';return mk3(R,`Which is ${t}?`,ans,['The top one','The bottom one','They are the same'].filter(x=>x!==ans),`Compare the lengths.`,{pics:svgW(240,76,bar(a,6,'#4C8DF6')+bar(b,42,'#E0457B'),'two bars')})}
function msOrder(R){const v=R.sample([2,3,4,5,6,7,8,9],3);const nm=['pencil','crayon','marker'];const ord=[0,1,2].sort((i,j)=>v[i]-v[j]);
 return mk3(R,`A ${nm[0]} is ${v[0]} cubes long. A ${nm[1]} is ${v[1]} cubes long. A ${nm[2]} is ${v[2]} cubes long. Which is the longest?`,nm[ord[2]],nm.filter(x=>x!==nm[ord[2]]),`${Math.max(...v)} is the greatest.`)}
function dtTally(R){const n=R.int(3,14);return numQ(R,`How many tally marks?`,n,[n+1,n-1,n+5],`Each group of 5 has a slash. Count: ${n}.`,{pics:tallySVG(n)})}
function dtGraph(R){const cats=R.sample(['Dogs','Cats','Fish','Birds','Frogs'],3),v=cats.map(()=>R.int(1,9)),t=R.int(1,4),i=R.int(0,2);
 const pic=barG(cats,v,'Our favorite pets');
 if(t===1)return numQ(R,`How many children chose ${cats[i]}?`,v[i],[v[i]+1,v[i]-1,v[i]+2],`Read the bar for ${cats[i]}: ${v[i]}.`,{pics:pic});
 if(t===2){const mx=Math.max(...v);if(v.filter(x=>x===mx).length>1)return null;return mk3(R,`Which pet did the MOST children choose?`,cats[v.indexOf(mx)],cats.filter((c,j)=>j!==v.indexOf(mx)),`The tallest bar is ${cats[v.indexOf(mx)]}.`,{pics:pic})}
 if(t===3){const mn=Math.min(...v);if(v.filter(x=>x===mn).length>1)return null;return mk3(R,`Which pet did the FEWEST children choose?`,cats[v.indexOf(mn)],cats.filter((c,j)=>j!==v.indexOf(mn)),`The shortest bar is ${cats[v.indexOf(mn)]}.`,{pics:pic})}
 const j=(i+1)%3;if(v[i]===v[j])return null;return numQ(R,`How many more children chose ${cats[v[i]>v[j]?i:j]} than ${cats[v[i]>v[j]?j:i]}?`,Math.abs(v[i]-v[j]),[v[i]+v[j],Math.abs(v[i]-v[j])+1],`${Math.max(v[i],v[j])} − ${Math.min(v[i],v[j])} = ${Math.abs(v[i]-v[j])}.`,{pics:pic})}
NJ.reg({id:'g1_meas',subj:'math',name:'Measuring & Graphs',desc:'Measure with cubes, compare lengths, tally marks, bar graphs',n:10,full:4,daily:2,gen:topicGen([msCubes,msCmp,msOrder,dtTally,dtGraph,dtGraph])});
/* ---------- Shapes & equal shares ---------- */
function gsName(R){const names=['circle','square','triangle','rectangle','hexagon'],n=R.pick(names);return mk3(R,`What is the name of this shape?`,n,names.filter(x=>x!==n),`This shape is a ${n}.`,{pics:shpPic(n,R.pick(SHCOL))})}
function gsSides(R){const B=[['triangle',3,3],['square',4,4],['rectangle',4,4],['hexagon',6,6],['pentagon',5,5]],[n,s,c]=R.pick(B),w=R.f()<.5;
 return numQ(R,`How many ${w?'sides':'corners (vertices)'} does this shape have?`,w?s:c,[s+1,s-1,s+2],`A ${n} has ${s} sides and ${c} corners.`,{pics:shpPic(n,R.pick(SHCOL))})}
function gsSolid(R){const B=[['a ball ⚽','sphere'],['a number cube 🎲','cube'],['a can of soup 🥫','cylinder'],['an ice cream cone 🍦','cone'],['a cereal box 📦','rectangular prism']],[o,n]=R.pick(B);
 return mk3(R,`Which solid shape is like ${o}?`,n,['sphere','cube','cylinder','cone','rectangular prism'].filter(x=>x!==n).slice(0,3),`${o} is shaped like a ${n}.`)}
function gsDef(R){const B=[['Which shape has 3 sides and 3 corners?','triangle',['square','circle'],'A triangle has 3 sides.'],['Which shape has 4 equal sides?','square',['triangle','circle'],'A square has 4 equal sides.'],['Which shape has no corners and is round?','circle',['square','triangle'],'A circle is round.'],['Which solid shape can roll AND stack?','cylinder',['sphere','cube'],'A cylinder can roll on its side and stack on its flat top.'],['Which solid shape can only roll?','sphere',['cube','cylinder'],'A sphere only rolls.'],['How many faces does a cube have?','6',['4','8'],'A cube has 6 square faces.']];return mk3(R,...R.pick(B))}
function gsShare(R){const k=R.pick(['rect','circle']),p=R.pick([2,4]),sh=1,eq=R.f()<.7;
 if(k==='rect'&&p===3)return null;
 if(!eq&&p===4&&k==='circle')return null;
 return mk3(R,`Is this shape cut into equal shares?`,eq?'Yes':'No',[eq?'No':'Yes','Not sure'],eq?'The parts are all the same size.':'The parts are not the same size, so they are not equal shares.',{pics:partSVG(k,p,sh,eq)})}
function gsFrac(R){const k=R.pick(['rect','circle']),p=R.pick([2,4]),s=p===2?1:R.pick([1,2,3]);
 const lab=(n,d)=>d===2?'one half':d===4?(n===1?'one fourth (quarter)':n===2?'two fourths (a half)':'three fourths'):'';
 const ans=p===2?'half':s===1?'a fourth (quarter)':s===2?'two fourths (a half)':'three fourths';
 const all=['half','a fourth (quarter)','two fourths (a half)','three fourths'];
 return mk3(R,`The shape is cut into equal parts. How much is shaded?`,ans,all.filter(x=>x!==ans&&!(p===4&&s===2&&x==='half')&&!(p===2&&x.includes('two fourths'))).slice(0,2),p===2?'The shape has 2 equal parts and 1 is shaded: one half.':`The shape has 4 equal parts and ${s} ${s===1?'is':'are'} shaded.`,{pics:partSVG(k,p,s,true)})}
function gsWord(R){const B=[['If you cut a pizza into 2 equal parts, each part is a ...','half',['fourth','whole'],'2 equal parts are halves.'],['If you cut a sandwich into 4 equal parts, each part is a ...','fourth (quarter)',['half','whole'],'4 equal parts are fourths or quarters.'],['Which is bigger: a half of a pizza or a fourth of the same pizza?','a half',['a fourth','They are the same'],'The fewer the parts, the bigger each part.'],['Two halves make a ...','whole',['fourth','half'],'Two halves make one whole.'],['Four fourths make a ...','whole',['half','fourth'],'Four fourths make one whole.']];return mk3(R,...R.pick(B))}
NJ.reg({id:'g1_geo',subj:'math',name:'Shapes & Equal Shares',desc:'Flat shapes, solid shapes, halves and fourths',n:10,full:4,daily:2,gen:topicGen([gsName,gsSides,gsSolid,gsDef,gsShare,gsFrac,gsFrac,gsWord])});
