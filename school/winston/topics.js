/* ===== Winston: 3rd grade reading practice (original questions) =====
   Built from his Fall 2026 Star report: reading fluency and accuracy, reading comprehension, careful reading of real words.
   Nonsense-word decoding is already a strength, so there is only a short maintenance set for it. */
NJ.subjects=[
 {id:'flu',name:'Read Aloud (Fluency)',blurb:'Timed one-minute reading with a grown-up'},
 {id:'wrd',name:'Words',blurb:'Vowel sounds, syllables, prefixes, look-alike words'},
 {id:'cmp',name:'Reading Comprehension',blurb:'Short stories and questions'}];

/* ---------- Fluency: read aloud for one minute ---------- */
const FP=[
 {t:'The Lost Kite',x:`Sam ran up the hill with his new red kite. The wind was strong, and the kite jumped out of his hands. It flew high above the trees. Sam held the string tight and let it go out a little at a time. The kite danced in the sky like a bird. Then the wind stopped. The kite began to fall. Sam ran and ran, but it landed in a big oak tree. His dad came and used a long stick. Soon the kite was back on the ground. Sam smiled. "Let's fly it again," he said.`},
 {t:'Rainy Day Fun',x:`It rained all day on Saturday. Mia and her brother Ben were sad because they could not go to the park. Then Mom had an idea. She put a big blanket over two chairs. Now they had a tent! They brought in pillows, a flashlight, and a pile of books. Ben read a funny story about a frog. Mia drew a picture of a castle. When the rain stopped, the sun came out and a rainbow stretched across the sky. "That was the best rainy day ever," said Mia.`},
 {t:'The Class Garden',x:`Our class planted a garden behind the school. First, we dug small holes in the soft dirt. Then we put a seed in each hole and covered it up. Every day, two kids water the plants. After two weeks, tiny green leaves poked out of the ground. Our teacher says plants need sun, water, and good soil to grow. Last week we picked our first tomatoes. They were round and red and tasted sweet. Next spring, we want to plant pumpkins. We cannot wait to see how big they grow.`},
 {t:'The Brave Little Turtle',x:`A little turtle lived by a quiet pond. All the other animals ran fast or flew high, but the turtle moved very slowly. One day, a storm came and the pond began to rise. The animals were scared. The turtle knew a safe path to the hill. "Follow me," she said. She walked step by step, and the animals came behind her. It took a long time, but they all made it to the top. When the storm ended, the animals said, "Thank you, turtle. Slow and steady was just right."`}
];
const WC=s=>s.trim().split(/\s+/).length;
NJ.reg({id:'w_flu',subj:'flu',name:'One-Minute Read-Aloud',desc:'Read a story out loud, track words per minute and misses',n:4,full:4,daily:1,gen:(R,n)=>R.shuffle(FP).slice(0,Math.min(n,FP.length)).map(p=>{const w=WC(p.x);return {t:'self',q:`<b>One-minute read-aloud with a grown-up</b><br><small>Read this out loud. A grown-up times one minute and counts the words you miss.</small><br><button class="say" type="button" onclick="swGo(this)">⏱ Start 1-minute timer</button>`,pass:`<h4>${p.t} (${w} words)</h4>${p.x}`,model:`Grown-up: when the minute ends, mark the last word read.<br>• <b>Words read in one minute:</b> count up to that word. <b>Goal: 90 or more.</b> (Fall score was 85.)<br>• <b>Missed words:</b> subtract them from the words read. <b>Goal: 95% right or higher</b>, about 1 missed word in 20. (Fall score was 87%.)<br>• I slowed down to read tricky words correctly instead of guessing.<br>• I read in smooth phrases, not one word at a time.<br>Tap Yes when you hit a goal or beat your last try.`,exp:'A grown-up checks this one.'}})});

/* take-turns reading: the report's at-home tip */
NJ.reg({id:'w_turns',subj:'flu',name:'Take-Turns Reading',desc:'Read a book together, switching every sentence or page',n:2,full:2,daily:0,gen:(R,n)=>[
 {t:'self',q:`<b>Take-turns reading (10 minutes)</b><br>Pick a book that is a little easy or just right. Read every other <b>sentence</b> with a grown-up. Switch roles each time.`,model:`• I read my turns out loud, with a clear voice.<br>• I looked at every word before I said it.<br>• When I got stuck, I tried the word in pieces (syllables) and then re-read the sentence.<br>• I told the grown-up what happened in the story after we finished.`,exp:'A grown-up checks this one.'},
 {t:'self',q:`<b>Take-turns reading (10 minutes)</b><br>Today, read every other <b>paragraph</b> or <b>page</b> with a grown-up. If it feels easy, make your turns longer.`,model:`• I read my turns smoothly and did not rush.<br>• I stopped at periods and commas.<br>• I fixed my mistakes by going back and re-reading.<br>• I can tell the grown-up one new thing I learned or one thing I liked.`,exp:'A grown-up checks this one.'}].slice(0,n)});

/* ---------- Words ---------- */
const LV={a:['cake','rain','play','take','gray','snail','tray','name'],e:['tree','beach','sheep','team','green','read','these','sea'],i:['kite','bike','light','night','time','five','right','smile'],o:['boat','rope','snow','home','toe','coat','bone','road'],u:['cube','tube','mule','huge','cute','use','music','fuse']};
const SV={a:['cat','hand','black','map','bag','crab','flat','lamp'],e:['bed','desk','nest','pen','jet','tent','help','web'],i:['sit','ship','drink','pig','win','fish','milk','swim'],o:['dog','clock','frog','top','box','fox','stop','pot'],u:['sun','bus','drum','cup','jump','mud','bug','truck']};
const VW=Object.keys(LV);
function longV(R){const v=R.pick(VW),others=R.shuffle(VW.filter(x=>x!==v));
 const c=R.pick(LV[v]);return mk(R,`Which word has the <b>long ${v}</b> sound?`,c,[R.pick(SV[v]),R.pick(SV[others[0]]),R.pick(SV[others[1]])],`${c} has the long ${v} sound. The vowel says its name.`,{say:`Which word has the long ${v} sound?`},false,4)}
function shortV(R){const v=R.pick(VW),others=R.shuffle(VW.filter(x=>x!==v));
 const c=R.pick(SV[v]);return mk(R,`Which word has the <b>short ${v}</b> sound?`,c,[R.pick(LV[v]),R.pick(LV[others[0]]),R.pick(SV[others[1]])],`${c} has the short ${v} sound, like in ${R.pick(SV[v].filter(x=>x!==c))}.`,{say:`Which word has the short ${v} sound?`},false,4)}
function longShort(R){const v=R.pick(VW),isL=R.f()<.5,w=R.pick(isL?LV[v]:SV[v]);
 return mk(R,`Is the vowel sound in <b>${w}</b> long or short?`,isL?'long':'short',[isL?'short':'long'],`${w}: the vowel sound is ${isL?'long (it says its name)':'short'}.`,{say:`Is the vowel sound in ${w} long or short?`},false,2)}
NJ.reg({id:'w_vow',subj:'wrd',name:'Long and Short Vowels',desc:'Hear the vowel sound inside real words',n:10,full:6,daily:3,gen:topicGen([longV,shortV,longShort])});

const SY=[['cat',1],['jump',1],['train',1],['happy',2],['table',2],['pencil',2],['monkey',2],['window',2],['rabbit',2],['butterfly',3],['elephant',3],['banana',3],['umbrella',3],['dinosaur',3],['computer',3],['vegetable',3],['watermelon',4],['alligator',4],['caterpillar',4],['celebration',4],['important',3],['adventure',3],['beautiful',3],['Saturday',3]];
function syl(R){const [w,n]=R.pick(SY);return kn(R,`How many syllables (beats) are in <b>${w}</b>?`,n,[1,2,3,4],`${w} has ${n} syllable${n>1?'s':''}. Clap or tap each beat as you say it.`,{say:`How many syllables are in ${w}?`},3)}
NJ.reg({id:'w_syl',subj:'wrd',name:'Syllables',desc:'Count the beats to break big words into parts',n:8,full:4,daily:2,gen:topicGen([syl])});

const AF=[
 ['What does the prefix <b>un-</b> mean in <b>unhappy</b>?','not',['again','before'],'<b>Un-</b> means not. Unhappy means not happy.'],
 ['What does the prefix <b>re-</b> mean in <b>reread</b>?','again',['not','under'],'<b>Re-</b> means again. Reread means read again.'],
 ['What does the suffix <b>-less</b> mean in <b>hopeless</b>?','without',['full of','more'],'<b>-less</b> means without. Hopeless means without hope.'],
 ['What does the suffix <b>-ful</b> mean in <b>careful</b>?','full of',['without','not'],'<b>-ful</b> means full of. Careful means full of care.'],
 ['Which word means <b>not safe</b>?','unsafe',['resafe','safeful'],'Add <b>un-</b> (not) to safe to make unsafe.'],
 ['Which word means <b>to build again</b>?','rebuild',['unbuild','buildful'],'Add <b>re-</b> (again) to build to make rebuild.'],
 ['Which word means <b>without a home</b>?','homeless',['homeful','rehome'],'Add <b>-less</b> (without) to home to make homeless.'],
 ['Which word means <b>full of joy</b>?','joyful',['joyless','unjoy'],'Add <b>-ful</b> (full of) to joy to make joyful.'],
 ['What does the prefix <b>pre-</b> mean in <b>preheat</b>?','before',['again','not'],'<b>Pre-</b> means before. Preheat means heat before.'],
 ['Which word means <b>not fair</b>?','unfair',['refair','fairful'],'Add <b>un-</b> to fair to make unfair.'],
 ['What does the suffix <b>-er</b> mean in <b>teacher</b>?','one who does something',['not','again'],'<b>-er</b> can mean a person who does something. A teacher teaches.'],
 ['Which word means <b>to write again</b>?','rewrite',['unwrite','writeless'],'Add <b>re-</b> to write to make rewrite.']];
NJ.reg({id:'w_aff',subj:'wrd',name:'Prefixes and Endings',desc:'un-, re-, pre-, -ful, -less, -er',n:10,full:5,daily:2,gen:bankGen(AF,3)});

/* look-alike words: slows him down to read every word (accuracy) */
const LA=[
 ['I <b>___</b> a big dog at the park yesterday.','saw',['was','say'],'<b>saw</b> is the past of see. <b>was</b> and <b>saw</b> have the same letters but are not the same word.'],
 ['The dog <b>___</b> very happy.','was',['saw','as'],'<b>was</b> tells how the dog felt.'],
 ['First we ate lunch, <b>___</b> we played outside.','then',['than','them'],'<b>then</b> tells what happens next. <b>than</b> is used to compare.'],
 ['A rabbit is smaller <b>___</b> a horse.','than',['then','that'],'<b>than</b> is used to compare two things.'],
 ['The kids put on <b>___</b> coats.','their',['there','they'],'<b>their</b> shows they own something.'],
 ['Please put the book over <b>___</b>.','there',['their','three'],'<b>there</b> tells where.'],
 ['<b>___</b> did you put my shoes?','where',['were','when'],'<b>where</b> asks about a place.'],
 ['The girls <b>___</b> at the park.','were',['where','was'],'<b>were</b> is used with more than one person.'],
 ['Please turn <b>___</b> the light.','off',['of','if'],'<b>off</b> is the opposite of on.'],
 ['I drank a cup <b>___</b> milk.','of',['off','or'],'<b>of</b> is used here to show what is in the cup.'],
 ['I got a letter <b>___</b> my grandma.','from',['form','farm'],'<b>from</b> tells who sent it.'],
 ['I like to <b>___</b> about space.','think',['thing','thank'],'<b>think</b> is what your brain does.'],
 ['The library is a very <b>___</b> place.','quiet',['quite','quit'],'<b>quiet</b> means with very little sound.'],
 ['She <b>___</b> her teeth every night.','brushes',['bushes','brushed to'],'<b>brushes</b> is what you do with a toothbrush.'],
 ['We <b>___</b> the ball over the fence.','threw',['through','though'],'<b>threw</b> is the past of throw.'],
 ['I walked <b>___</b> the door.','through',['threw','thought'],'<b>through</b> means going in one side and out the other.']];
NJ.reg({id:'w_look',subj:'wrd',name:'Look-Alike Words',desc:'Pick the right word: was/saw, then/than, their/there',n:10,full:6,daily:3,gen:bankGen(LA,3)});

/* maintenance: nonsense words (already a strength, benchmark met) */
const CON='bcdfghjklmnprstvwzy'.split('');
const nwords=R=>R.sample('aeiou'.split('').flatMap(v=>R.sample(CON,6).map(c=>c+v+R.pick(CON.filter(x=>!['w','y','h'].includes(x))))),24);
NJ.reg({id:'w_nonsense',subj:'wrd',name:'Silly Word Speed Check',desc:'Read made-up words for one minute (keeps a strength strong)',n:2,full:2,daily:0,gen:(R,n)=>Array.from({length:n},()=>{const ws=nwords(R);
 return {t:'self',q:`<b>Silly words, one minute</b><br><small>Read as many made-up words as you can. A grown-up counts the ones you read correctly.</small><br><button class="say" type="button" onclick="swGo(this)">⏱ Start 1-minute timer</button>`,pass:`<h4>Say each word. Use the short vowel sound.</h4><span style="font-size:22px;line-height:2;font-weight:700;letter-spacing:.03em">${ws.join('&nbsp;&nbsp; ')}</span>`,model:`Count the words read correctly in one minute. <b>Goal: 40 or more.</b> (Fall score was 39, right at the line.)<br>• I said each word with a short vowel sound.<br>• I did not turn silly words into real words.`,exp:'A grown-up checks this one.'}})});

/* ---------- Comprehension ---------- */
const CP=[
 {t:'A Visit to the Farm',x:`Our class took a bus to a farm last Friday. First, we met a farmer named Mr. Lee. He showed us the cows and let us help feed the chickens. The baby goats were my favorite. They jumped and played all around us. After lunch, we picked apples from the trees. Mr. Lee said the apples would be sold at the market. When we got back on the bus, everyone was tired but happy.`,qs:[
  ['Who showed the class around the farm?','Mr. Lee',['The bus driver','The teacher','A baby goat'],'The story says a farmer named Mr. Lee showed them around.'],
  ['What did the class do right after lunch?','Picked apples',['Fed the chickens','Met the goats','Rode the bus home'],'The story says that after lunch they picked apples.'],
  ['How did the children feel at the end of the day?','Tired but happy',['Sad and angry','Scared','Bored'],'The last sentence says everyone was tired but happy.'],
  ['What is this story mostly about?','A class trip to a farm',['How to grow apples','A farmer who sells goats','A long bus ride'],'The whole story tells about the class visiting a farm.']]},
 {t:'The Lemonade Stand',x:`Ava wanted to buy a new bike, but she did not have enough money. Her dad said, "Why not sell lemonade?" So Ava squeezed lemons, added sugar and water, and made a big jug. She made a sign that said "Lemonade 50 cents." On the first day, only three people stopped. Ava felt sad, so she added a drawing of a smiling lemon to her sign. On the second day, many more people came. By Sunday, Ava had enough money for her bike.`,qs:[
  ['Why did Ava make lemonade?','She wanted money for a bike',['She was very thirsty','Her dad asked her to','She won a contest'],'The first sentence says she wanted a bike but did not have enough money.'],
  ['What did Ava do after only three people stopped?','She added a drawing to her sign',['She stopped selling','She made it sweeter','She lowered the price'],'She added a drawing of a smiling lemon.'],
  ['Which word best describes Ava?','Determined',['Lazy','Rude','Shy'],'She kept trying and fixed her plan until she reached her goal.'],
  ['What happened on the second day?','Many more people came',['It started to rain','Nobody came','The jug fell over'],'The story says many more people came.']]},
 {t:'Why Leaves Change Color',x:`In the fall, many leaves change from green to red, orange, and yellow. Leaves are green in the spring and summer because they have a green stuff called chlorophyll. Chlorophyll helps the leaf use sunlight to make food for the tree. When the days get shorter and colder, the tree stops making chlorophyll. The green fades away. Then the other colors, which were hiding in the leaf all along, can be seen. Soon the leaves fall to the ground.`,qs:[
  ['What makes leaves green?','Chlorophyll',['Cold weather','Rain','Orange paint'],'The passage says leaves are green because of chlorophyll.'],
  ['What happens when the days get shorter and colder?','The tree stops making chlorophyll',['The leaves grow bigger','The tree makes more food','The sun gets hotter'],'The tree stops making chlorophyll, so the green fades.'],
  ['What does the word <b>fades</b> mean in this passage?','Slowly goes away',['Gets stronger','Jumps up','Turns blue'],'The green slowly goes away so other colors show.'],
  ['What is the main idea of the passage?','It explains why leaves change color in fall',['It tells how to rake leaves','It says trees like the sun','It tells about spring flowers'],'The whole passage explains why leaves change color.']]},
 {t:'The New Puppy',x:`Dan's family got a new puppy named Biscuit. Biscuit was small and brown with big floppy ears. At first, the puppy cried at night because it missed its mom. Dan put a soft blanket and a ticking clock in the puppy's bed. The clock sounded like a heartbeat. After that, Biscuit slept quietly. Now every morning Biscuit runs to Dan's room and licks his face. Dan laughs and says, "Good morning to you too!"`,qs:[
  ['Why did Biscuit cry at night at first?','He missed his mom',['He was hungry','He was cold','He was sick'],'The story says the puppy cried because it missed its mom.'],
  ['Why did Dan put a ticking clock in the bed?','It sounded like a heartbeat',['It told the time','It was a toy','It was loud'],'The clock sounded like a heartbeat, which helped the puppy feel calm.'],
  ['What can you tell about Dan?','He is kind and caring',['He is afraid of dogs','He does not like mornings','He is not paying attention'],'Dan found a way to help the puppy sleep.'],
  ['What does Biscuit do every morning?','Runs to Dan and licks his face',['Goes for a walk','Eats breakfast first','Hides under the bed'],'The story says Biscuit runs to Dan\'s room and licks his face.']]},
 {t:'Making a Paper Airplane',x:`Do you want to make a paper airplane? First, take one sheet of paper and fold it in half the long way. Open it up, so there is a line down the middle. Next, fold the two top corners to the middle line. Then fold the new edges to the middle line again. Fold the whole plane in half along the first line. Last, fold each side down to make wings. Hold the plane under its body and give it a gentle throw.`,qs:[
  ['What do you do first?','Fold the paper in half the long way',['Make the wings','Throw the plane','Fold the top corners'],'The first step is to fold the paper in half the long way.'],
  ['What do you do right after folding the top corners to the middle?','Fold the new edges to the middle line',['Throw the plane','Fold each side down','Open it up'],'After the corners come the new edges.'],
  ['What is the <b>last</b> step?','Hold the plane and give it a gentle throw',['Fold the corners','Make the wings','Open the paper'],'After the wings are made, you throw the plane.'],
  ['Why does the writer say "Last, fold each side down to make wings"?','It is the final fold',['It is the easiest fold','It is the first fold','It is not needed'],'The word <b>last</b> shows it is the final folding step.']]},
 {t:'The Snowy Morning',x:`When Nora woke up, the world was white. Snow had fallen all night. She pressed her nose to the cold window and shouted, "Snow day!" She put on her boots, hat, and thick mittens. Outside, the snow crunched under her feet. Nora built a snowman with a carrot nose and two black buttons for eyes. Her little brother wanted to help, so she let him pat the snow on the bottom. When they went inside, their cheeks were pink, and Mom had hot cocoa ready.`,qs:[
  ['How do you know it snowed a lot?','The world was white and school was off',['Nora wore mittens','Mom made cocoa','Nora has a brother'],'Nora woke up to a white world and shouted "Snow day!"'],
  ['What did Nora use for the snowman\'s eyes?','Two black buttons',['Two rocks','Two apples','Two carrots'],'The story says two black buttons were the eyes.'],
  ['What did Nora do for her little brother?','Let him help with the snowman',['Gave him her mittens','Took him to school','Made him cocoa'],'She let him pat snow on the bottom of the snowman.'],
  ['What happened <b>last</b> in the story?','They went inside to hot cocoa',['Nora put on her boots','Nora built the snowman','Nora woke up'],'The story ends with them going inside where Mom had hot cocoa ready.']]}];
NJ.reg({id:'w_cmp',subj:'cmp',name:'Stories and Questions',desc:'Read a short story, then answer questions',n:8,full:8,daily:3,gen:rdGen(CP)});

const VC=[
 ['The kitten was <b>tiny</b>. It fit in my hand. What does <b>tiny</b> mean?','very small',['very loud','very fast'],'It fit in a hand, so tiny means very small.'],
 ['The soup was <b>scalding</b>, so I waited to eat it. What does <b>scalding</b> mean?','very hot',['very cold','very salty'],'You wait to eat soup that is very hot.'],
 ['The <b>enormous</b> whale swam by the boat. What does <b>enormous</b> mean?','very big',['very shy','very old'],'A whale is huge, so enormous means very big.'],
 ['Mom was <b>delighted</b> with her gift. She smiled and hugged me. What does <b>delighted</b> mean?','very happy',['very tired','very angry'],'She smiled and hugged, so she was very happy.'],
 ['The boy was <b>exhausted</b> after the race, so he fell asleep. What does <b>exhausted</b> mean?','very tired',['very hungry','very proud'],'He fell asleep, so he was very tired.'],
 ['The little mouse was <b>timid</b> and hid when we came near. What does <b>timid</b> mean?','shy and easily scared',['brave','noisy'],'It hid, so timid means shy and easily scared.'],
 ['We had to <b>hurry</b> to catch the bus. Which word means almost the same as <b>hurry</b>?','rush',['rest','wait'],'Hurry and rush both mean to move fast.'],
 ['The <b>ancient</b> castle was thousands of years old. What does <b>ancient</b> mean?','very old',['brand new','very small'],'Thousands of years old means very old.'],
 ['The path was <b>narrow</b>, so we walked in a line. What does <b>narrow</b> mean?','not wide',['very long','very steep'],'You walk in a line when a path is not wide.'],
 ['She spoke in a <b>whisper</b> so she would not wake the baby. What is a <b>whisper</b>?','a very soft voice',['a loud shout','a song'],'To not wake a baby, you use a very soft voice.']];
NJ.reg({id:'w_voc',subj:'cmp',name:'Word Meanings in Sentences',desc:'Use clues in the sentence to find what a word means',n:10,full:6,daily:2,gen:bankGen(VC,3)});

/* one-minute timer used by the read-aloud cards */
let swT=null;
function swGo(b){if(swT){clearInterval(swT);swT=null}let s=60;b.textContent='⏱ 60';swT=setInterval(()=>{s--;if(s>0){b.textContent='⏱ '+s}else{clearInterval(swT);swT=null;b.textContent='⏱ Time! Mark your last word.';try{navigator.vibrate&&navigator.vibrate(300);speechSynthesis.cancel();speechSynthesis.speak(new SpeechSynthesisUtterance('Time'))}catch(e){}}},1000)}
