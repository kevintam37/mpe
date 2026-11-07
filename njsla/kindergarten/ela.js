/* ===== Kindergarten reading & language (original questions) ===== */
const AL='abcdefghijklmnopqrstuvwxyz'.split('');
function eLow(R){const c=R.pick(AL),w=R.shuffle(AL.filter(x=>x!==c)).slice(0,2),up=c.toUpperCase();
 return mk3(R,`Which is the lowercase letter for <b>${up}</b>?`,c,w,`The lowercase of ${up} is ${c}.`,{pics:eBig(up)})}
function eUp(R){const c=R.pick(AL),w=R.shuffle(AL.filter(x=>x!==c)).slice(0,2);
 return mk3(R,`Which is the capital letter for <b>${c}</b>?`,c.toUpperCase(),w.map(x=>x.toUpperCase()),`The capital of ${c} is ${c.toUpperCase()}.`,{pics:eBig(c)})}
function eNext(R){const i=R.int(0,22),t=R.int(1,2);
 if(t===1)return mk3(R,`What letter comes next?<br><b>${AL[i].toUpperCase()} ${AL[i+1].toUpperCase()} ${AL[i+2].toUpperCase()} __</b>`.replace(/<br>/,'\n'),AL[i+3]?AL[i+3].toUpperCase():null,AL.filter((x,j)=>j!==i+3&&Math.abs(j-i)<8).slice(0,2).map(x=>x.toUpperCase()),`The alphabet goes ${AL[i].toUpperCase()}, ${AL[i+1].toUpperCase()}, ${AL[i+2].toUpperCase()}, ${AL[i+3].toUpperCase()}.`);
 return mk3(R,`What letter comes right BEFORE <b>${AL[i+1].toUpperCase()}</b>?`,AL[i].toUpperCase(),[AL[i+2].toUpperCase(),AL[(i+9)%26].toUpperCase()],`${AL[i].toUpperCase()} comes right before ${AL[i+1].toUpperCase()}.`)}
function eVow(R){const t=R.int(1,2),V='aeiou'.split(''),C=AL.filter(x=>!V.includes(x));
 if(t===1){const v=R.pick(V);return mk3(R,`Which letter is a vowel?`,v.toUpperCase()+' '+v,[...R.sample(C,2)].map(x=>x.toUpperCase()+' '+x),`The vowels are a, e, i, o, u.`)}
 const c=R.pick(C);return mk3(R,`Which letter is a consonant (not a vowel)?`,c.toUpperCase()+' '+c,R.sample(V,2).map(x=>x.toUpperCase()+' '+x),`Vowels are a, e, i, o, u. All the other letters are consonants.`)}
NJ.reg({id:'k_abc',subj:'ela',name:'Letters & the Alphabet',desc:'Capital and lowercase letters, ABC order, vowels',n:10,full:3,daily:1,gen:topicGen([eLow,eUp,eNext,eNext,eVow])});

const BEG={b:[['🐻','bear'],['⚽','ball'],['🛏️','bed'],['🚌','bus'],['🐝','bee'],['📖','book'],['🍌','banana'],['⛵','boat']],c:[['🐱','cat'],['🐮','cow'],['🚗','car'],['🎂','cake'],['🥕','carrot']],d:[['🐶','dog'],['🚪','door'],['🦆','duck'],['🥁','drum'],['🦕','dinosaur']],f:[['🐟','fish'],['🍴','fork'],['🐸','frog'],['🦶','foot'],['🔥','fire']],g:[['🐐','goat'],['🎁','gift'],['🍇','grapes'],['🎸','guitar']],h:[['🐴','horse'],['🎩','hat'],['🏠','house'],['✋','hand'],['❤️','heart']],k:[['🔑','key'],['🪁','kite'],['🦘','kangaroo']],l:[['🦁','lion'],['🍃','leaf'],['🍋','lemon'],['🪜','ladder']],m:[['🌙','moon'],['🐭','mouse'],['🐵','monkey'],['🥛','milk'],['🧤','mitten']],n:[['🪺','nest'],['👃','nose'],['🥜','nut']],p:[['🐷','pig'],['🍕','pizza'],['🐧','penguin'],['🍐','pear'],['🎃','pumpkin']],r:[['🐰','rabbit'],['🌈','rainbow'],['💍','ring'],['🤖','robot'],['🌹','rose']],s:[['🌞','sun'],['🧦','sock'],['🐍','snake'],['⭐','star'],['🥄','spoon']],t:[['🌳','tree'],['🐢','turtle'],['🚂','train'],['🐯','tiger'],['🚚','truck']],w:[['⌚','watch'],['🪱','worm'],['🕸️','web'],['🐺','wolf']],v:[['🚐','van'],['🎻','violin']],z:[['🦓','zebra']],j:[['🧃','juice'],['🧥','jacket']],y:[['🪀','yo-yo']]};
const BL=Object.keys(BEG);
function bBegLetter(R){const L=R.pick(BL),[em,w]=R.pick(BEG[L]),o=R.sample(BL.filter(x=>x!==L&&!(L==='c'&&x==='k')&&!(L==='k'&&x==='c')),2);
 return mk3(R,`What letter does <b>${w}</b> start with?`,L.toUpperCase()+' '+L,o.map(x=>x.toUpperCase()+' '+x),`${w} starts with the ${L} sound.`,{pics:eBig(em)})}
function bPick(R){const L=R.pick(BL),[,w]=R.pick(BEG[L]),o=R.sample(BL.filter(x=>x!==L&&!(L==='c'&&x==='k')&&!(L==='k'&&x==='c')),2).map(l=>R.pick(BEG[l]));const ans=BEG[L].find(x=>x[1]===w);
 return mk3(R,`Which picture starts with the same sound as the letter <b>${L.toUpperCase()}</b>?`,`${ans[0]} ${ans[1]}`,o.map(x=>`${x[0]} ${x[1]}`),`${ans[1]} starts with ${L}.`)}
const END=[['🐱','cat','t'],['🐶','dog','g'],['🐷','pig','g'],['🌞','sun','n'],['🚌','bus','s'],['🛏️','bed','d'],['🎩','hat','t'],['🐸','frog','g'],['🥁','drum','m'],['🐛','bug','g'],['🕸️','web','b'],['🧦','sock','k'],['🦆','duck','k'],['🚐','van','n'],['🦵','leg','g'],['🦊','fox','x'],['🐔','hen','n'],['🖊️','pen','n']];
function bEnd(R){const[em,w,L]=R.pick(END),o=R.sample([...new Set(END.map(x=>x[2]))].filter(x=>x!==L),2);
 return mk3(R,`What letter does <b>${w}</b> END with?`,L.toUpperCase()+' '+L,o.map(x=>x.toUpperCase()+' '+x),`${w} ends with the ${L} sound.`,{pics:eBig(em)})}
NJ.reg({id:'k_beg',subj:'ela',name:'Beginning & Ending Sounds',desc:'Match letters to the sounds that start and end words',n:10,full:4,daily:1,gen:topicGen([bBegLetter,bBegLetter,bPick,bPick,bEnd])});

const RH=[['cat','hat','bat','mat','rat'],['dog','log','frog','fog'],['sun','bun','run','fun'],['pig','wig','dig','big'],['bed','red','fed','sled'],['bee','tree','see','knee'],['box','fox','socks'],['car','star','jar','far'],['boat','coat','goat'],['mouse','house'],['cake','lake','snake','bake'],['ball','wall','tall','fall'],['ring','sing','king','wing'],['bear','chair','pear','hair'],['pen','hen','ten','men'],['cup','pup','up'],['bug','rug','hug','mug'],['moon','spoon','noon'],['fish','dish','wish'],['book','look','cook','hook']];
function rhy(R){const fam=R.pick(RH),[a,b]=R.sample(fam,2),o=R.sample(RH.filter(f=>f!==fam),2).map(f=>R.pick(f));
 return mk3(R,`Which word rhymes with <b>${a}</b>?`,b,o,`${a} and ${b} sound the same at the end, so they rhyme.`)}
function rhy2(R){const fam=R.pick(RH),[a,b]=R.sample(fam,2),o=R.pick(R.pick(RH.filter(f=>f!==fam)));
 return mk3(R,`Which two words rhyme?`,`${a} and ${b}`,[`${a} and ${o}`,`${b} and ${o}`],`${a} and ${b} end with the same sound.`)}
const SY=[['🐱','cat',1],['🐶','dog',1],['🐟','fish',1],['🐸','frog',1],['🌞','sun',1],['🐰','rabbit',2],['🍎','apple',2],['🌸','flower',2],['🍕','pizza',2],['🐢','turtle',2],['🐵','monkey',2],['🍌','banana',3],['🐘','elephant',3],['🦋','butterfly',3],['🐙','octopus',3],['🍉','watermelon',4],['🐛','caterpillar',4]];
function syl(R){const[e,w,n]=R.pick(SY);return kn(R,`Clap the word: <b>${w}</b>. How many beats (syllables) does it have?`,n,[1,2,3,4],`${w} has ${n} ${n===1?'beat':'beats'}: ${n} syllable${n===1?'':'s'}.`,{pics:eBig(e)})}
NJ.reg({id:'k_rhyme',subj:'ela',name:'Rhymes & Syllables',desc:'Which words rhyme, how many beats in a word',n:10,full:3,daily:1,gen:topicGen([rhy,rhy,rhy2,syl,syl])});

const SIGHT=['the','a','I','to','and','is','see','like','we','my','you','go','he','she','are','look','said','have','me','can','do','up','no','so','play','come','here','little','me','for','was','they','with','of','on','at'];
function sightQ(R){const w=R.pick(SIGHT),o=R.sample(SIGHT.filter(x=>x!==w&&x.toLowerCase()!==w.toLowerCase()),2);
 return mk3(R,`Tap 🔊 and listen. Which word did you hear?`,w,o,`The word is <b>${w}</b>.`,{say:`Find the word. ${w}. ${w}.`})}
NJ.reg({id:'k_sight',subj:'ela',name:'Sight Words',desc:'Listen and find common words: the, see, like, go, my',n:10,full:3,daily:1,gen:topicGen([sightQ])});

const CVC=[['🐱','cat',['cot','cut']],['🎩','hat',['hit','hot']],['🛏️','bed',['bad','bid']],['🐷','pig',['peg','pug']],['🐶','dog',['dig','dug']],['🌞','sun',['bun','fun']],['🚌','bus',['bud','bun']],['🐛','bug',['big','bag']],['🖊️','pen',['pin','pan']],['🦊','fox',['fix','fax']],['🚐','van',['fan','man']],['🕸️','web',['wet','wed']],['🦵','leg',['log','lag']],['🪵','log',['leg','lag']],['🐔','hen',['pen','ten']],['📦','box',['fox','bus']]];
function cvc(R){const[e,w,o]=R.pick(CVC);return mk3(R,`Which word names the picture?`,w,o,`The picture shows a ${w}. Sound it out: ${w.split('').join('-')}.`,{pics:eBig(e)})}
function cvcMid(R){const[e,w]=R.pick(CVC),m=w[1],V='aeiou'.split('').filter(x=>x!==m);
 return mk3(R,`What letter is in the middle of <b>${w}</b>?`,m,R.sample(V,2),`${w} has the letter ${m} in the middle.`,{pics:eBig(e)})}
function cvcMiss(R){const[e,w]=R.pick(CVC),V='aeiou'.split('').filter(x=>x!==w[1]),k=R.int(0,2),shown=w.split('').map((c,i)=>i===k?'_':c).join(' ');
 return mk3(R,`Which letter is missing? <b>${shown}</b>`,w[k],R.sample('bcdfghjklmnpqrstvwxyz'.split('').filter(x=>x!==w[k]),2),`The word is ${w}, so the missing letter is ${w[k]}.`,{pics:eBig(e)})}
NJ.reg({id:'k_cvc',subj:'ela',name:'Sound It Out',desc:'Three-letter words: match pictures, middle and missing letters',n:10,full:4,daily:1,gen:topicGen([cvc,cvc,cvcMid,cvcMiss])});

const PR=[['Where do we start reading a line of words?','On the left',['On the right','At the bottom'],'We read from left to right.'],
 ['Which punctuation mark goes at the end of a telling sentence?','. (period)',['? (question mark)','a comma'],'A telling sentence ends with a period.'],
 ['Which punctuation mark goes at the end of a question?','? (question mark)',['. (period)','a comma'],'An asking sentence ends with a question mark.'],
 ['A sentence starts with a ...','capital letter',['small letter','number'],'Every sentence begins with a capital letter.'],
 ['How many words are in this sentence? <b>I see a cat.</b>','4',['3','5'],'I - see - a - cat is 4 words.'],
 ['How many words are in this sentence? <b>We can run.</b>','3',['2','4'],'We - can - run is 3 words.'],
 ['Who writes the words in a book?','The author',['The baker','The doctor'],'The author writes the story.'],
 ['Who draws the pictures in a book?','The illustrator',['The author','The driver'],'The illustrator makes the pictures.'],
 ['What do we call the name of a book?','The title',['The page','The end'],'The title tells the name of the book.'],
 ['Where do we find the title of a book?','On the front cover',['On the back of the last page','Nowhere'],'The title is on the front cover.'],
 ['Which one is a sentence?','The dog can run.',['dog run the','The dog'],'A sentence tells a whole idea.'],
 ['What do we put between words when we write?','A space',['A star','Nothing'],'Spaces help us see each word.'],
 ['Which letter is a CAPITAL letter?','M',['m','e'],'Capital letters are big letters.'],
 ['What do we call a group of letters that makes a word you can read?','A word',['A page','A picture'],'Letters together make words.'],
 ['Which is the first word in this sentence? <b>The sun is hot.</b>','The',['hot','sun'],'We read from left to right, so The comes first.']];
NJ.reg({id:'k_print',subj:'ela',name:'Books, Words & Sentences',desc:'How books work, words in a sentence, capitals and periods',n:10,full:3,daily:1,gen:bankGen(PR,3)});

const KR=[
{t:'Sam\'s Hat',x:'Sam has a red hat.\nThe hat is big.\nSam likes his hat.',qs:[['Who has a hat?','Sam',['Mom','Dog'],'Sam has the hat.'],['What color is the hat?','red',['blue','green'],'The story says a red hat.'],['How does Sam feel about his hat?','He likes it.',['He is sad.','He lost it.'],'Sam likes his hat.']]},
{t:'The Cat',x:'A cat sat on a mat.\nThe cat is fat.\nThe cat naps.',qs:[['Where did the cat sit?','on a mat',['in a car','on a bed'],'The cat sat on a mat.'],['What does the cat do at the end?','naps',['runs','eats'],'The cat naps.'],['Which word rhymes with cat?','fat',['dog','nap'],'cat and fat rhyme.']]},
{t:'At the Park',x:'Mia and Dad go to the park.\nMia runs. Dad sits.\nThey play in the sun.',qs:[['Where do Mia and Dad go?','the park',['the shop','school'],'They go to the park.'],['Who runs?','Mia',['Dad','The dog'],'Mia runs.'],['What is the weather like?','sunny',['rainy','snowy'],'They play in the sun.']]},
{t:'My Dog',x:'I have a dog.\nHis name is Max.\nMax can jump and run.\nI love Max.',qs:[['What is the dog\'s name?','Max',['Sam','Ben'],'His name is Max.'],['What can Max do?','jump and run',['fly','swim'],'Max can jump and run.'],['Who loves Max?','I (the child)',['The cat','Nobody'],'The child says I love Max.']]},
{t:'The Bug',x:'A bug is on a log.\nThe bug is little.\nA frog sees the bug.\nHop! The bug is gone.',qs:[['Where is the bug at first?','on a log',['in a bed','in a hat'],'The bug is on a log.'],['Who sees the bug?','a frog',['a cat','a hen'],'A frog sees the bug.'],['What happens at the end?','The bug is gone.',['The bug is big.','The frog sleeps.'],'The story says the bug is gone.']]},
{t:'Rain',x:'It is wet.\nThe rain falls.\nTim has a coat.\nTim jumps in a puddle. Splash!',qs:[['What is falling?','rain',['snow','leaves'],'The rain falls.'],['What does Tim jump in?','a puddle',['a bed','a box'],'Tim jumps in a puddle.'],['What does Tim have?','a coat',['a kite','a bike'],'Tim has a coat.']]},
{t:'Snack Time',x:'Ava has a red apple.\nBen has a yellow banana.\nThey sit and eat.\nYum!',qs:[['What does Ava have?','an apple',['a banana','a cookie'],'Ava has a red apple.'],['What color is the banana?','yellow',['red','blue'],'The banana is yellow.'],['What do they do?','They eat.',['They run.','They sleep.'],'They sit and eat.']]},
{t:'The Big Truck',x:'A big truck goes up the hill.\nIt is slow.\nThe truck stops. The man gets out.',qs:[['What goes up the hill?','a big truck',['a bike','a bus'],'A big truck goes up the hill.'],['Is the truck fast or slow?','slow',['fast','It does not move.'],'The story says it is slow.'],['What happens at the end?','The truck stops.',['The truck flies.','The truck is lost.'],'The truck stops.']]}];
NJ.reg({id:'k_read',subj:'ela',name:'Listen & Read Stories',desc:'Short stories: who, what, where, and what happens',n:8,full:4,daily:1,gen:rdGen(KR)});

const OPP=[['hot','cold'],['up','down'],['big','small'],['happy','sad'],['day','night'],['in','out'],['open','shut'],['fast','slow'],['wet','dry'],['full','empty'],['on','off'],['stop','go']];
function opp(R){const[a,b]=R.pick(OPP),sw=R.f()<.5,w=sw?b:a,ans=sw?a:b,o=R.sample(OPP.filter(x=>!x.includes(ans)&&!x.includes(w)),2).map(x=>R.pick(x));
 return mk3(R,`What is the opposite of <b>${w}</b>?`,ans,o,`${w} and ${ans} are opposites.`)}
const CAT=[['animal','animals',['🐶','🐱','🐸','🐟','🐰','🐴']],['food','foods',['🍎','🍌','🍕','🥕','🍞','🧀']],['vehicle','vehicles',['🚗','🚌','🚂','✈️','⛵','🚲']],['clothing','clothes',['👟','🧦','🎩','🧥','👖','🧤']]];
function cat(R){const[n,pl,items]=R.pick(CAT),o=R.sample(CAT.filter(c=>c[0]!==n),2).map(c=>R.pick(c[2])),ans=R.pick(items);
 return mk3(R,`Which one is a kind of <b>${n}</b>?`,ans,o,`${ans} is a kind of ${n}.`)}
function odd(R){const[n,pl,items]=R.pick(CAT),[a,b]=R.sample(items,2),oc=R.pick(CAT.filter(c=>c[0]!==n)),o=R.pick(oc[2]),sh=R.shuffle([a,b,o]);
 return mk3(R,`Which one does NOT belong?\n${sh.join('  ')}`,o,[a,b],`${a} and ${b} are both ${pl}; ${o} is not.`)}
const ACT=[['🏃','run'],['🍽️','eat'],['😴','sleep'],['📖','read'],['🏊','swim'],['🧑‍🎤','sing'],['🚶','walk'],['🪂','jump']];
NJ.reg({id:'k_voc',subj:'ela',name:'Word Meanings',desc:'Opposites, groups of things, which one does not belong',n:10,full:3,daily:1,gen:topicGen([opp,opp,cat,odd])});
const KW=[
 {q:'<b>My name.</b> Write your name. Then draw a picture of yourself.',m:['I wrote my name with a capital letter at the start.','I drew myself.','My letters are in a row from left to right.']},
 {q:'<b>My favorite animal.</b> Draw your favorite animal. Write one word or sentence about it. (Example: I like cats.)',m:['I drew a picture.','I wrote a word or a sentence.','My sentence starts with a capital letter.','I put spaces between words.']},
 {q:'<b>What I see.</b> Look out of a window. Write or tell what you see. (Example: I see a tree.)',m:['I wrote or said what I see.','I used the word <i>I</i> as a capital letter.','I put a period at the end.']},
 {q:'<b>My family.</b> Draw your family. Write one word for each person.',m:['I drew my family.','I wrote at least one word.','I tried to sound out the words.']}];
NJ.reg({id:'k_write',subj:'ela',name:'Draw & Write',desc:'Draw, write words and sentences (parent check)',n:3,full:1,daily:0,gen:(R,n)=>R.sample(KW,Math.min(n,KW.length)).map(w=>({t:'self',q:w.q,model:'• '+w.m.join('<br>• '),exp:'A grown-up can use the checklist.'}))});
