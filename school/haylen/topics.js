/* ===== Haylen: Kindergarten phonics practice (original questions) =====
   Built from her Fall 2026 Star report: Letter Sounds and Receptive Nonsense Words (CVC) need practice. */
NJ.subjects=[
 {id:'ls',name:'Letter Sounds',blurb:'First and last sounds, flashcards with a grown-up'},
 {id:'cvc',name:'Sounding Out Words',blurb:'Listen and pick the word, build 3-letter words, middle sounds'}];

/* picture words with a clear first and last sound */
const PW=[['🐱','cat','c','t'],['🐶','dog','d','g'],['🐷','pig','p','g'],['🌞','sun','s','n'],['🚌','bus','b','s'],['🛏️','bed','b','d'],['🎩','hat','h','t'],['🌙','moon','m','n'],['🦁','lion','l','n'],['🐰','rabbit','r','t'],['🐐','goat','g','t'],['🥜','nut','n','t'],['⛺','tent','t','t'],['🚐','van','v','n'],['🦓','zebra','z','a'],['🪁','kite','k','e'],['🕸️','web','w','b'],['🐟','fish','f','sh'],['🔑','key','k','y'],['🥄','spoon','s','n']];
const PWF=PW.filter(x=>x[1]!=='fish'&&x[1]!=='key'); /* first-sound words */
const PWL=PW.filter(x=>['cat','dog','pig','sun','bus','bed','hat','moon','lion','nut','tent','van','web','goat','rabbit'].includes(x[1])); /* last-sound words */
const AL='abcdefghijklmnopqrstuvwxyz'.split('');
const upl=c=>c.toUpperCase();

/* 1. What sound does the picture start with? pick the letter */
function lsFirst(R){const w=R.pick(PWF),c=w[2],wr=R.sample(AL.filter(x=>x!==c),2);
 return mk3(R,`Tap 🔊. What is the <b>first sound</b> in <b>${w[1]}</b>? Which letter makes that sound?`,upl(c)+' '+c,wr.map(x=>upl(x)+' '+x),`${w[1]} starts with the sound /${c}/. The letter is ${upl(c)}.`,{pics:eBig(w[0]),say:`What is the first sound in ${w[1]}? ${w[1]}. Which letter makes that sound?`})}
/* 2. Which picture starts with the letter? */
function lsPic(R){const w=R.pick(PWF),c=w[2];
 const wr=R.shuffle(PWF.filter(x=>x[2]!==c)).slice(0,2);
 return mk3(R,`Which picture starts with the letter <b>${upl(c)}</b>?`,w[0]+' '+w[1],wr.map(x=>x[0]+' '+x[1]),`${w[1]} starts with ${upl(c)}.`,{say:`Which picture starts with the letter ${c}?`})}
/* 3. last sound */
function lsLast(R){const w=R.pick(PWL),c=w[3];
 const wr=R.sample(AL.filter(x=>x!==c),2);
 return mk3(R,`Tap 🔊. What is the <b>last sound</b> in <b>${w[1]}</b>? Which letter?`,upl(c)+' '+c,wr.map(x=>upl(x)+' '+x),`${w[1]} ends with the sound /${c}/. The letter is ${upl(c)}.`,{pics:eBig(w[0]),say:`What is the last sound in ${w[1]}? ${w[1]}.`})}
/* 4. same beginning sound */
function lsSame(R){const w=R.pick(PWF),same=PWF.filter(x=>x[2]===w[2]&&x!==w);
 if(!same.length)return null;const s=R.pick(same),wr=R.shuffle(PWF.filter(x=>x[2]!==w[2])).slice(0,2);
 return mk3(R,`Which word starts with the <b>same sound</b> as <b>${w[1]}</b>?`,s[0]+' '+s[1],wr.map(x=>x[0]+' '+x[1]),`${w[1]} and ${s[1]} both start with /${w[2]}/.`,{pics:eBig(w[0]),say:`Which word starts with the same sound as ${w[1]}?`})}
/* 5. letter-sound flashcards with a grown-up (matches the school's at-home tip) */
const KEYW={a:'apple 🍎',b:'bed 🛏️',c:'cat 🐱',d:'dog 🐶',e:'egg 🥚',f:'fish 🐟',g:'goat 🐐',h:'hat 🎩',i:'igloo 🏠',j:'jet ✈️',k:'kite 🪁',l:'lion 🦁',m:'moon 🌙',n:'nut 🥜',o:'octopus 🐙',p:'pig 🐷',q:'queen 👑',r:'rabbit 🐰',s:'sun 🌞',t:'tent ⛺',u:'umbrella ☂️',v:'van 🚐',w:'web 🕸️',x:'fox (ends with /ks/) 🦊',y:'yo-yo 🪀',z:'zebra 🦓'};
const flash=R=>{const c=R.pick(AL);return {t:'self',q:`<b>Flashcard with a grown-up.</b><br>Grown-up asks: <b>"What sound does this letter make?"</b>`,pics:eBig(upl(c)+' '+c),model:`The sound is <b>/${c}/</b> like in <b>${KEYW[c]}</b>.<br>Praise a right answer. If it is wrong, say the sound and have Haylen say it back.`,exp:'A grown-up checks this one.'}};

NJ.reg({id:'h_first',subj:'ls',name:'First Sounds',desc:'Which letter starts the picture word',n:10,full:6,daily:3,gen:topicGen([lsFirst,lsPic,lsSame])});
NJ.reg({id:'h_last',subj:'ls',name:'Last Sounds',desc:'Which letter ends the picture word',n:8,full:4,daily:2,gen:topicGen([lsLast])});
NJ.reg({id:'h_flash',subj:'ls',name:'Letter Sound Flashcards',desc:'A grown-up shows a letter and asks for its sound',n:10,full:6,daily:2,gen:(R,n)=>gather(n,()=>flash(R))});

/* 6. receptive nonsense words: hear it, pick it */
const CON='bcdfghjklmnprstvwz'.split('');
const nonsense=R=>{const v=R.pick('aeiou'.split('')),c1=R.pick(CON),c2=R.pick(CON.filter(x=>!['w','h','j','v'].includes(x)));return {w:c1+v+c2,c1,v,c2}};
function hear(R){const n=nonsense(R),ws=new Set([n.w]),dist=[];
 const mode=R.int(1,2);
 while(dist.length<2){let d;
  if(mode===1){const v2=R.pick('aeiou'.split('').filter(x=>x!==n.v));d=n.c1+v2+n.c2}else{const c=R.pick(CON.filter(x=>x!==n.c1&&x!==n.c2));d=R.f()<.5?c+n.v+n.c2:n.c1+n.v+c}
  if(!ws.has(d)){ws.add(d);dist.push(d)}}
 return mk3(R,`Tap 🔊 (or a grown-up says the word). Which word did you hear?<br><small>These are silly made-up words.</small>`,n.w,dist,`The word was <b>${n.w}</b>: /${n.c1}/ /${n.v}/ /${n.c2}/.`,{say:n.w})}
/* 7. blend sounds shown separately */
function blend(R){const n=nonsense(R),ws=new Set([n.w]),dist=[];
 while(dist.length<2){const v2=R.pick('aeiou'.split('').filter(x=>x!==n.v)),d=R.f()<.5?n.c1+v2+n.c2:n.c1+n.v+R.pick(CON);if(!ws.has(d)){ws.add(d);dist.push(d)}}
 return mk3(R,`Put the sounds together. Which word do these sounds make?<br><b style="font-size:26px">/${n.c1}/ &nbsp;/${n.v}/ &nbsp;/${n.c2}/</b>`,n.w,dist,`/${n.c1}/ /${n.v}/ /${n.c2}/ makes <b>${n.w}</b>.`,{say:`Put the sounds together. ${n.c1}. ${n.v}. ${n.c2}.`})}
/* 8. real word with picture */
const CV=[['🐱','cat'],['🎩','hat'],['🐶','dog'],['🐷','pig'],['🌞','sun'],['🚌','bus'],['🛏️','bed'],['🥜','nut'],['🕸️','web'],['🚐','van'],['🗺️','map'],['🥄','cup'],['🐞','bug'],['🦊','fox'],['🧢','cap'],['🪵','log'],['🛒','cart']].filter(x=>x[1].length===3);
function pictureWord(R){const w=R.pick(CV),a=w[1];
 const alts=[a[0]+R.pick('aeiou'.split('').filter(x=>x!==a[1]))+a[2],R.pick(CON.filter(x=>x!==a[0]))+a[1]+a[2]].filter(x=>x!==a);
 return mk3(R,`Which word matches the picture?`,a,alts,`The picture is <b>${a}</b>.`,{pics:eBig(w[0]),say:'Which word matches the picture?'})}
/* 9. middle (vowel) sound */
const VW={a:['cat','hat','map','bag','van','mat','cap','jam'],e:['bed','net','pen','red','web','leg','hen','jet'],i:['pig','sit','lip','bin','wig','fin','kid','zip'],o:['dog','pot','mop','box','fox','top','log','hop'],u:['sun','bus','cup','bug','nut','rug','mud','tub']};
function midSound(R){const vs=R.sample(Object.keys(VW),3),v=vs[0],w=R.pick(VW[v]),s=R.pick(VW[v].filter(x=>x!==w));
 return mk3(R,`Which word has the <b>same middle sound</b> as <b>${w}</b>?`,s,[R.pick(VW[vs[1]]),R.pick(VW[vs[2]])],`${w} and ${s} both have the short ${v} sound in the middle.`,{say:`Which word has the same middle sound as ${w}?`})}
/* 10. build a word with cards (grown-up activity) */
const build=R=>{const v=R.pick('aeiou'.split('')),c1=R.pick(CON),c2=R.pick(CON.filter(x=>!['w','h','j','v'].includes(x)));
 return {t:'self',q:`<b>Build-a-word cards.</b><br>Grown-up: lay out the <b>consonant</b> cards <b>${upl(c1)}</b> and <b>${upl(c2)}</b> and the <b>vowel</b> card <b>${upl(v)}</b>. Put them in a row: <b>${upl(c1)} ${upl(v)} ${upl(c2)}</b>. Haylen touches each card and says the sound, then blends them into a word.`,model:`Say each sound slowly: /${c1}/ ... /${v}/ ... /${c2}/. Then blend it fast: <b>${c1+v+c2}</b>.<br>It is OK if the word is silly. The vowel says its short sound.<br>Try swapping the first or last letter to make a new word.`,exp:'A grown-up checks this one.'}};

NJ.reg({id:'h_hear',subj:'cvc',name:'Listen and Pick the Word',desc:'Hear a made-up 3-letter word and pick it',n:10,full:6,daily:3,gen:topicGen([hear,hear,blend])});
NJ.reg({id:'h_pic',subj:'cvc',name:'Picture Words',desc:'Match the 3-letter word to the picture',n:8,full:4,daily:2,gen:topicGen([pictureWord])});
NJ.reg({id:'h_mid',subj:'cvc',name:'Middle Sounds',desc:'Which word has the same middle sound',n:8,full:4,daily:2,gen:topicGen([midSound])});
NJ.reg({id:'h_build',subj:'cvc',name:'Build-a-Word Cards',desc:'Make 3-letter words with letter cards (grown-up)',n:6,full:3,daily:1,gen:(R,n)=>gather(n,()=>build(R))});
