/* ===== 2nd grade reading & language (original questions) ===== */
const P2=[
 ['Which word has the long <b>a</b> sound spelled <b>ai</b>?','rain',['ran','rat'],'rain has the ai vowel team.'],
 ['Which word has the long <b>e</b> sound spelled <b>ee</b>?','feet',['fed','fell'],'feet has the ee vowel team.'],
 ['Which word has the long <b>o</b> sound spelled <b>oa</b>?','boat',['bot','bat'],'boat has the oa vowel team.'],
 ['Which word has the vowel team <b>ea</b> (long e)?','beach',['bench','beech'.replace('beech','bed')],'beach has ea saying long e.'],
 ['Which word has the vowel team <b>oo</b>?','moon',['mop','man'],'moon has oo.'],
 ['Which word has the <b>ow</b> sound as in <b>cow</b>?','town',['tone','tan'],'town and cow share the ow sound.'],
 ['Which word has the <b>oy</b> sound?','toy',['top','tie'],'toy has oy.'],
 ['Which word has the <b>ar</b> sound as in <b>car</b>?','farm',['form','fern'],'farm has ar.'],
 ['Which word has the <b>or</b> sound as in <b>corn</b>?','storm',['stamp','stem'],'storm has or.'],
 ['Which word has <b>er</b>, <b>ir</b> or <b>ur</b>?','bird',['bind','bard'],'bird has ir.'],
 ['Which word begins with a silent <b>k</b>?','knee',['key','kite'],'In knee, the k is silent.'],
 ['Which word begins with a silent <b>w</b>?','write',['water','wind'],'In write, the w is silent.'],
 ['How many syllables (beats) are in <b>butterfly</b>?','3',['2','4'],'but-ter-fly has 3 syllables.'],
 ['How many syllables (beats) are in <b>pencil</b>?','2',['1','3'],'pen-cil has 2 syllables.'],
 ['How many syllables (beats) are in <b>elephant</b>?','3',['2','4'],'el-e-phant has 3 syllables.'],
 ['How many syllables (beats) are in <b>cat</b>?','1',['2','3'],'cat has 1 syllable.'],
 ['Which word has the <b>igh</b> spelling for long i?','night',['nine','nit'],'night has igh.'],
 ['Which word has a <b>soft c</b> (sounds like s)?','city',['cat','cup'],'c before i says s.'],
 ['Which word has a <b>soft g</b> (sounds like j)?','giant',['goat','gum'],'g before i can say j.'],
 ['Which word has the <b>ph</b> sound of f?','phone',['pan','pole'],'ph says f.']];
NJ.reg({id:'g2_phon',subj:'ela',name:'Phonics & Syllables',desc:'Vowel teams, r-controlled vowels, silent letters, syllables',n:10,full:4,daily:2,gen:bankGen(P2,3)});
const SW2=['because','friend','people','school','would','could','their','were','again','every','before','other','through','thought','Tuesday','favorite','together','country','animal','answer','beautiful','different','enough','guess','laugh','minute','pretty','heard'];
const SW2S={because:'I stayed in because it rained.',friend:'My friend came to play.',people:'Many people came to the party.',school:'We walk to school.',would:'I would like a drink.',could:'I could not find my hat.',their:'The kids put on their coats.',were:'We were happy.',again:'Please read it again.',every:'I brush my teeth every day.',before:'Wash your hands before lunch.',other:'Give me the other one.',through:'We walked through the park.',thought:'I thought it was Friday.',Tuesday:'Tuesday comes after Monday.',favorite:'Blue is my favorite color.',together:'We played together.',country:'Our country has fifty states.',animal:'A dog is an animal.',answer:'Raise your hand to answer.',beautiful:'The garden is beautiful.',different:'The two hats are different.',enough:'I have enough milk.',guess:'Can you guess the number?',laugh:'The joke made me laugh.',minute:'Wait one minute.',pretty:'She has a pretty dress.',heard:'I heard a loud noise.'};
const spDict2=R=>{const w=R.pick(SW2);return dictQ(w,SW2S[w])};
const MIS=[['becuase','because'],['freind','friend'],['peple','people'],['scool','school'],['wuld','would'],['agen','again'],['evry','every'],['beforr','before'],['thru','through'],['thougt','thought'],['favrite','favorite'],['togther','together'],['diffrent','different'],['enuf','enough'],['gess','guess'],['laf','laugh'],['pritty','pretty'],['herd','heard'],['beutiful','beautiful'],['anser','answer']];
const spPick2=R=>{const[b,g]=R.pick(MIS),o=R.pick(MIS.filter(x=>x[1]!==g))[0];return mk3(R,`Which word is spelled correctly?`,g,[b,o],`The correct spelling is ${g}.`)};
const ICE=[['hop','hopping'],['run','running'],['sit','sitting'],['hug','hugging'],['stop','stopping'],['plan','planning']];
const spDbl=R=>{const[a,b]=R.pick(ICE);return mk3(R,`Add <b>-ing</b> to <b>${a}</b>. Double the last letter. What is the new word?`,b,[a+'ing',a.slice(0,-1)+'ing'].filter(x=>x!==b),`Short vowel + one consonant: double the last letter. ${a} → ${b}.`)};
const spY=R=>{const B=[['baby','babies'],['puppy','puppies'],['story','stories'],['city','cities'],['berry','berries'],['fly','flies'],['lady','ladies'],['penny','pennies']];const[a,b]=R.pick(B);return mk3(R,`What is the plural of <b>${a}</b>?`,b,[a+'s',a.slice(0,-1)+'es'],`Change y to i and add es: ${b}.`)};
NJ.reg({id:'g2_spell',subj:'ela',name:'Spelling',desc:'Listen and type tricky words, pick the correct spelling, endings',n:10,full:4,daily:2,gen:topicGen([spDict2,spDict2,spDict2,spPick2,spDbl,spY])});
const ST2=[
{t:'The Lost Puppy',x:'Jada heard a small cry behind the shed. She looked and found a muddy puppy shaking in the cold. "Don\'t be scared," she whispered. She wrapped it in her scarf and carried it home. Mom checked the puppy\'s collar and called the phone number on it. Soon a boy named Eli ran up the steps. "Biscuit!" he shouted. The puppy wagged its tail so hard that its whole body wiggled.',qs:[['Where did Jada find the puppy?','behind the shed',['in the kitchen','at the park'],'She heard a cry behind the shed.'],['Why did Jada wrap the puppy in her scarf?','to keep it warm',['to hide it','to play a game'],'The puppy was shaking in the cold.'],['What did Mom do?','called the number on the collar',['bought dog food','took it to school'],'Mom called the phone number on the collar.'],['How do you know the puppy was happy to see Eli?','It wagged its tail hard.',['It ran away.','It fell asleep.'],'A wagging tail shows the puppy was happy.'],['What is the best word to describe Jada?','kind',['mean','lazy'],'Jada helped the puppy, so she is kind.']]},
{t:'The Garden Plan',x:'Omar and his sister Lina wanted a garden. First, they picked a sunny spot. Next, they dug the soil with small shovels. Then they planted bean seeds in a row. Every day they watered the seeds. After two weeks, tiny green sprouts poked out of the dirt. "It worked!" cheered Lina.',qs:[['What did Omar and Lina do FIRST?','picked a sunny spot',['planted the seeds','watered the seeds'],'First, they picked a sunny spot.'],['What did they do right AFTER digging the soil?','planted bean seeds',['saw sprouts','watered the seeds'],'Then they planted bean seeds.'],['What happened after two weeks?','Sprouts came up.',['The beans were cooked.','The garden was gone.'],'Tiny sprouts poked out of the dirt.'],['What does the word <b>sprouts</b> mean here?','new little plants',['big trees','rocks'],'Sprouts are new baby plants.']]},
{t:'Ming and the Big Race',x:'Ming wanted to win the school race more than anything. She practiced every day after school. On race day, her legs felt shaky. She took a deep breath and ran as fast as she could. She came in third place. At first she felt sad. Then her friend Tom said, "You ran so well!" Ming smiled. She knew she had done her best.',qs:[['What place did Ming come in?','third',['first','second'],'She came in third place.'],['Why did Ming feel shaky?','She was nervous.',['She was sick.','She was hungry.'],'She was nervous before the race.'],['How did Ming feel at the end?','proud',['angry','bored'],'She knew she had done her best, so she was proud.'],['What is the lesson of the story?','Doing your best matters.',['Winning is the only thing.','Never practice.'],'Ming felt good because she did her best.']]},
{t:'Anansi and the Pot of Stories',x:'Long ago, Anansi the spider wanted all the stories in the world. He asked the Sky God for them. "You must bring me a python, a leopard, and a swarm of hornets," said the Sky God. Anansi was clever. He tricked each one and carried them to the sky. The Sky God kept his promise. From that day on, the stories were called Anansi stories.',qs:[['What did Anansi want?','all the stories',['gold','a new home'],'Anansi wanted all the stories in the world.'],['How many animals did the Sky God ask for?','three',['two','five'],'A python, a leopard and a swarm of hornets.'],['Which word best describes Anansi?','clever',['slow','shy'],'He tricked each one, so he is clever.'],['Why are they called Anansi stories?','Anansi won them.',['They are about a pig.','The Sky God wrote them.'],'Anansi earned the stories.']]},
{t:'The Snow Day',x:'When Kai woke up, the world was white. Snow covered the cars, the trees and the road. "No school!" Kai yelled. He put on his boots, hat and gloves and ran outside. He and his brother built a snowman with a carrot nose. When their fingers felt cold, they went inside for hot cocoa.',qs:[['Why was there no school?','It snowed a lot.',['It was a holiday.','Kai was sick.'],'Snow covered everything.'],['What did the boys use for the snowman\'s nose?','a carrot',['a stick','a rock'],'The snowman had a carrot nose.'],['Why did they go inside?','Their fingers were cold.',['They were hungry.','It started to rain.'],'Cold fingers sent them in.'],['Where does the story take place?','at Kai\'s home and outside',['at school','at the beach'],'Kai stayed home and played outside.']]}];
NJ.reg({id:'g2_story',subj:'ela',name:'Reading Stories',desc:'Characters, order of events, lessons, how characters feel, word meanings',n:10,full:5,daily:2,gen:rdGen(ST2)});
const IN2=[
{t:'Octopuses',x:'An octopus is a sea animal with eight arms. It has no bones, so it can squeeze into very tiny spaces. An octopus can change color to hide from enemies. When it is in danger, it can squirt dark ink into the water and swim away. Octopuses eat crabs, shrimp and fish.',qs:[['How many arms does an octopus have?','eight',['six','ten'],'The text says eight arms.'],['Why can an octopus fit in tiny spaces?','It has no bones.',['It is very small.','It has many legs.'],'No bones means it can squeeze in.'],['How does an octopus hide?','It changes color.',['It digs a hole.','It flies.'],'It changes color to hide.'],['What is the main idea?','Octopuses have special ways to stay safe.',['Octopuses eat crabs.','All sea animals have arms.'],'The passage tells how octopuses stay safe.']]},
{t:'The Water Cycle',x:'Water is always moving. The Sun heats water in oceans and lakes. The water turns into a gas called water vapor and rises into the air. High in the sky, the vapor cools and forms clouds. When the clouds get heavy, rain or snow falls. The water flows back into rivers and oceans, and the cycle starts again.',qs:[['What heats the water?','the Sun',['the wind','the Moon'],'The Sun heats the water.'],['What forms when vapor cools?','clouds',['rocks','ice cream'],'Cooled vapor forms clouds.'],['What happens right before rain falls?','Clouds get heavy.',['Water vapor rises first.','Rivers freeze.'],'When the clouds get heavy, rain falls.'],['Why is it called a cycle?','It goes around and starts again.',['It has wheels.','It happens once.'],'The water keeps going round and round.']]},
{t:'Helping Hands: Firefighters',x:'Firefighters help people in emergencies. They put out fires with water from big hoses. They also rescue people and pets. Firefighters wear special gear to stay safe. A thick coat and helmet protect them from heat. A mask helps them breathe in smoke. Firefighters also visit schools to teach children fire safety.',qs:[['What do firefighters use to put out fires?','water from hoses',['sand','ice'],'They use water from big hoses.'],['Why do firefighters wear masks?','to breathe in smoke',['to hide','to look scary'],'A mask helps them breathe in smoke.'],['Where else do firefighters go?','to schools',['to the moon','to farms only'],'They visit schools to teach fire safety.'],['What is the main idea?','Firefighters help and keep people safe.',['Firefighters wear helmets.','Fires are hot.'],'The passage tells many ways they help.']]},
{t:'Why Leaves Change Color',x:'In summer, leaves are green because they hold a green material called chlorophyll. Leaves use it to make food from sunlight. In fall, the days get shorter and cooler. The tree stops making chlorophyll, and the green fades. Then yellow and orange colors that were hiding in the leaf show through. Soon the leaves fall to the ground.',qs:[['Why are leaves green in summer?','They hold chlorophyll.',['They are painted.','They are cold.'],'Chlorophyll is green.'],['What happens in fall?','Days get shorter and cooler.',['Days get longer.','Trees grow fast.'],'Fall has shorter, cooler days.'],['What do leaves use chlorophyll for?','to make food',['to drink','to fall off'],'Leaves make food from sunlight.'],['What does the word <b>fades</b> mean?','becomes lighter',['becomes louder','grows bigger'],'Fades means gets weaker or lighter.']]}];
NJ.reg({id:'g2_info',subj:'ela',name:'Reading Facts',desc:'Nonfiction: main idea, key details, why and how questions, word meanings',n:10,full:5,daily:2,gen:rdGen(IN2)});
const V2=[
 ['Which word means the OPPOSITE of <b>brave</b>?','afraid',['bold','strong'],'Brave and afraid are opposites.'],
 ['Which word means the OPPOSITE of <b>ancient</b>?','modern',['old','tiny'],'Ancient means very old; modern means new.'],
 ['Which word means the SAME as <b>begin</b>?','start',['stop','end'],'Begin and start mean the same.'],
 ['Which word means the SAME as <b>glad</b>?','happy',['sad','mad'],'Glad and happy are synonyms.'],
 ['Which word means the SAME as <b>large</b>?','huge',['tiny','short'],'Large and huge are close in meaning.'],
 ['Which word means the OPPOSITE of <b>always</b>?','never',['often','daily'],'Always and never are opposites.'],
 ['What does the prefix <b>un-</b> mean in <b>unhappy</b>?','not',['again','before'],'un- means not.'],
 ['What does the prefix <b>re-</b> mean in <b>redo</b>?','again',['not','without'],'re- means again.'],
 ['What does the suffix <b>-less</b> mean in <b>careless</b>?','without',['full of','again'],'-less means without.'],
 ['What does the suffix <b>-ful</b> mean in <b>helpful</b>?','full of',['without','not'],'-ful means full of.'],
 ['Which word means "to read again"?','reread',['unread','readless'],'re- + read = reread.'],
 ['Which word means "not safe"?','unsafe',['resafe','safeful'],'un- + safe = unsafe.'],
 ['Which pair are homophones (sound the same, spelled differently)?','their / there',['big / small','cat / dog'],'their and there sound alike.'],
 ['Choose the right word: I can <b>___</b> the ocean from here. (see / sea)','see',['sea','seed'],'see means to look.'],
 ['Choose the right word: We swim in the <b>___</b>. (see / sea)','sea',['see','sew'],'The sea is a big body of water.'],
 ['Choose the right word: <b>___</b> going to the park. (Their / They\'re)','They\'re',['Their','There'],'They\'re means they are.'],
 ['The word <b>bat</b> can mean an animal or a ... ?','wooden stick used in baseball',['kind of cake','shoe'],'Bat has more than one meaning.'],
 ['Which meaning of <b>bank</b> fits? "We sat on the river <b>bank</b>."','the land beside a river',['a place for money','a kind of bird'],'River bank = side of the river.'],
 ['What is the compound word? <b>sun + flower</b>','sunflower',['flowersun','sunny'],'Two words make one: sunflower.'],
 ['Which is a compound word?','rainbow',['rainy','raining'],'rain + bow = rainbow.'],
 ['What is the root word of <b>jumping</b>?','jump',['jumpi','ping'],'jumping = jump + ing.'],
 ['If you <b>dash</b> to the door, you ...','run fast',['walk slowly','sit'],'Dash means to run quickly.'],
 ['If a room is <b>enormous</b>, it is ...','very big',['very small','very cold'],'Enormous means very big.'],
 ['Which word is a <b>noun</b>?','teacher',['quickly','jump'],'A noun names a person, place or thing.']];
NJ.reg({id:'g2_voc',subj:'ela',name:'Word Meanings',desc:'Synonyms, antonyms, prefixes, suffixes, homophones, multiple meanings',n:10,full:4,daily:2,gen:bankGen(V2,3)});
const GR2=[
 ['Which is the plural of <b>child</b>?','children',['childs','childes'],'Child → children (irregular).'],
 ['Which is the plural of <b>mouse</b>?','mice',['mouses','mices'],'Mouse → mice.'],
 ['Which is the plural of <b>foot</b>?','feet',['foots','feets'],'Foot → feet.'],
 ['Which is the plural of <b>box</b>?','boxes',['boxs','boxies'],'Add es to words ending in x.'],
 ['Which is the past tense of <b>run</b>?','ran',['runned','running'],'Run → ran.'],
 ['Which is the past tense of <b>go</b>?','went',['goed','gone'],'Go → went.'],
 ['Which is the past tense of <b>eat</b>?','ate',['eated','eaten'],'Eat → ate.'],
 ['Choose the right verb: Yesterday we <b>___</b> to the zoo.','went',['go','going'],'Yesterday needs past tense.'],
 ['Choose the right verb: Right now, she <b>___</b> a book.','reads',['read','readed'],'Right now = present tense.'],
 ['Which word is an <b>adjective</b>? "The fluffy cat sat down."','fluffy',['cat','sat'],'An adjective describes a noun.'],
 ['Which word is an <b>adverb</b>? "The turtle moved slowly."','slowly',['turtle','moved'],'An adverb tells how.'],
 ['What is the contraction for <b>do not</b>?','don\'t',['dont\'','do\'nt'],'The apostrophe replaces the o.'],
 ['What is the contraction for <b>she is</b>?','she\'s',['shes\'','she\'is'],'she is → she\'s.'],
 ['What two words make <b>can\'t</b>?','can not',['can it','came not'],'can\'t = cannot.'],
 ['Which sentence is written correctly?','My dog Max likes bones.',['my dog max likes bones','My dog max likes bones'],'Names and the first word start with capitals.'],
 ['Which sentence uses commas correctly?','We bought apples, pears, and plums.',['We bought, apples pears and plums.','We, bought apples pears, and plums.'],'Use commas between items in a list.'],
 ['Which punctuation ends this sentence? <b>Wow, what a big dog</b>','!',['?',','],'It shows strong feeling.'],
 ['Which punctuation ends this sentence? <b>Where do you live</b>','?',['.','!'],'It asks a question.'],
 ['Which shows ownership? ','Sam\'s hat',['Sams hat','Sams\' hat'],'Add \'s to show something belongs to Sam.'],
 ['Which is a complete sentence?','The bird sang a song.',['The bird on the','Sang a song to'],'A sentence has a naming part and an action part.'],
 ['Which word fits? Mom gave the gift to <b>___</b>. (me / I)','me',['I','mine'],'After "to" we say me.'],
 ['Which word fits? <b>___</b> have two cats. (We / Us)','We',['Us','Me'],'We is the subject.'],
 ['Which is a proper noun?','Newark',['city','town'],'A proper noun names a special place and starts with a capital.'],
 ['Which word is a <b>verb</b>? "The kids jump high."','jump',['kids','high'],'A verb shows action.']];
NJ.reg({id:'g2_gram',subj:'ela',name:'Grammar & Sentences',desc:'Plurals, past tense, adjectives, contractions, commas, capitals',n:10,full:4,daily:2,gen:bankGen(GR2,3)});
const W2=[
 {q:'<b>Opinion.</b> What is the best pet? Write your opinion and 2 reasons.',m:['I said what I think.','I gave two reasons.','I used <i>because</i> or <i>also</i>.','I wrote a closing sentence.','I used capitals and end marks.']},
 {q:'<b>Narrative.</b> Write about a time you were excited. Use at least 4 sentences.',m:['I told what happened in order.','I used time words like <i>first</i> and <i>then</i>.','I told how I felt.','I used capitals and end marks.']},
 {q:'<b>Informative.</b> Pick a topic you know. Write a fact paragraph with a topic sentence.',m:['I began with a topic sentence.','I wrote at least three facts.','I ended with a closing sentence.','I checked my spelling.']},
 {q:'<b>Edit this.</b> Fix the mistakes: <i>my freind and me went to the park we had fun</i>',m:['my → My','freind → friend','me → I (my friend and I)','park → park. (end mark)','we → We']}];
NJ.reg({id:'g2_write',subj:'ela',name:'Writing Practice',desc:'Opinion, story, fact writing and editing (grown-up check)',n:3,full:1,daily:0,gen:(R,n)=>R.sample(W2,Math.min(n,W2.length)).map(w=>({t:'self',q:w.q,model:'• '+w.m.join('<br>• '),exp:'A grown-up can use the checklist.'}))});
