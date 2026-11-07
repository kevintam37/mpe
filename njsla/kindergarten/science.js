const SK1=[
 ['Which one is alive? 🐶 🪨 🚗','🐶 dog',['🪨 rock','🚗 car'],'A dog is alive. Living things grow and need food.'],
 ['Which one is NOT alive?','🪨 rock',['🌳 tree','🐸 frog'],'A rock does not grow or eat.'],
 ['What do plants need to grow?','water and sunlight',['candy and toys','a blanket'],'Plants need water, light and air.'],
 ['What do animals need to live?','food, water and air',['toys and games','paint'],'All animals need food, water and air.'],
 ['Which animal lives in the water?','🐟 fish',['🐶 dog','🐴 horse'],'Fish live in water.'],
 ['Which animal has feathers?','🐦 bird',['🐱 cat','🐸 frog'],'Birds have feathers.'],
 ['Which animal has fur?','🐱 cat',['🐟 fish','🐦 bird'],'Cats have fur.'],
 ['Where does a seed grow best?','in soil with water',['in a closet','in a shoe'],'A seed needs soil, water and light to grow.'],
 ['Which part of a plant is under the ground?','roots',['flower','leaf'],'Roots grow under the ground and take in water.'],
 ['Which part of a plant is often colorful and pretty?','flower',['root','stem'],'Flowers are often colorful.'],
 ['A baby dog is called a ...','puppy',['kitten','chick'],'A baby dog is a puppy.'],
 ['A baby cat is called a ...','kitten',['puppy','calf'],'A baby cat is a kitten.'],
 ['Which one grows bigger over time?','a puppy',['a toy car','a rock'],'Living things grow.'],
 ['Which of these is a plant?','🌳 tree',['🧸 teddy bear','⚽ ball'],'A tree is a living plant.']];
NJ.reg({id:'sk_live',subj:'sci',name:'Living Things',desc:'Plants, animals, what living things need, baby animals',n:10,full:4,daily:1,gen:bankGen(SK1,3)});
const SK2=[
 ['Which body part do we use to SEE?','eyes',['ears','nose'],'We see with our eyes.'],
 ['Which body part do we use to HEAR?','ears',['eyes','hands'],'We hear with our ears.'],
 ['Which body part do we use to SMELL?','nose',['mouth','ears'],'We smell with our nose.'],
 ['Which body part do we use to TASTE?','tongue',['nose','eyes'],'We taste with our tongue.'],
 ['Which body part do we use to TOUCH and feel?','skin (hands)',['eyes','ears'],'We feel with our skin.'],
 ['You smell a flower. Which sense are you using?','smell',['hearing','sight'],'You use your nose to smell.'],
 ['You hear a bell. Which sense are you using?','hearing',['taste','touch'],'You use your ears to hear.'],
 ['You taste a lemon. It is ...','sour',['loud','soft'],'Lemons taste sour.'],
 ['An ice cube feels ...','cold',['hot','loud'],'We feel cold with our skin.'],
 ['A pillow feels ...','soft',['sour','loud'],'We feel soft with our touch.'],
 ['What helps keep our teeth healthy?','brushing them',['eating only candy','never washing'],'We brush our teeth to keep them clean.'],
 ['What helps your body stay strong?','healthy food and playing',['staying up all night','only sitting'],'Food, sleep and play help your body.'],
 ['Which is a loud sound?','a drum',['a whisper','a feather'],'A drum makes a loud sound.']];
NJ.reg({id:'sk_senses',subj:'sci',name:'My Body & Five Senses',desc:'See, hear, smell, taste, touch, staying healthy',n:10,full:3,daily:1,gen:bankGen(SK2,3)});
const SK3=[
 ['What do we call water falling from clouds?','rain',['sand','wind'],'Rain falls from clouds.'],
 ['What do you wear on a snowy day?','a warm coat',['a swimsuit','shorts'],'Snow is cold, so wear a warm coat.'],
 ['Which season is the hottest?','summer',['winter','fall'],'Summer is the warmest season.'],
 ['Which season is the coldest?','winter',['summer','spring'],'Winter is the coldest season.'],
 ['In which season do leaves fall from trees?','fall (autumn)',['summer','spring'],'Leaves fall in autumn.'],
 ['In which season do flowers start to bloom?','spring',['winter','fall'],'Flowers bloom in spring.'],
 ['What do you use on a rainy day?','an umbrella ☂️',['sunglasses','a kite'],'An umbrella keeps you dry.'],
 ['What can you see in the sky on a clear day?','the sun ☀️',['snow','puddles'],'The sun shines on a clear day.'],
 ['Which weather has lots of wind?','🪁 a windy day',['a calm day','a snowy night'],'Wind makes kites fly.'],
 ['What happens to snow when the sun warms it?','it melts',['it grows','it turns green'],'Warm temperatures melt snow.'],
 ['What do we use to tell how hot or cold it is?','a thermometer',['a ruler','a clock'],'A thermometer measures temperature.']];
NJ.reg({id:'sk_weather',subj:'sci',name:'Weather & Seasons',desc:'Rain, wind, sun, snow, the four seasons',n:10,full:4,daily:1,gen:bankGen(SK3,3)});
const SK4=[
 ['When you PUSH a swing, it ...','moves away from you',['comes toward you','stays still forever'],'A push moves things away.'],
 ['When you PULL a wagon, it ...','comes toward you',['moves away from you','disappears'],'A pull brings things closer.'],
 ['Which is a push?','pushing a door open',['pulling a wagon','pulling a zipper'],'Pushing moves things away.'],
 ['Which is a pull?','pulling a drawer open',['pushing a cart','pushing a swing'],'Pulling brings things toward you.'],
 ['A big push makes a ball roll ...','faster',['slower','backward every time'],'A bigger push makes things go faster.'],
 ['What pulls things down to the ground?','gravity',['wind','sunshine'],'Gravity pulls objects down.'],
 ['What happens when you let go of a ball?','it falls',['it flies up','it floats away'],'Gravity makes it fall.'],
 ['A magnet can pick up a ...','paper clip',['piece of paper','cotton ball'],'Magnets attract some metals.'],
 ['Which is heavier?','a rock',['a feather','a leaf'],'A rock is heavier.'],
 ['Which can float on water?','a toy boat',['a heavy rock','a coin'],'Boats are made to float.'],
 ['What makes a toy car move?','a push',['a smell','a color'],'A push makes it roll.']];
NJ.reg({id:'sk_force',subj:'sci',name:'Push, Pull & Motion',desc:'Pushes, pulls, gravity, magnets, float or sink',n:10,full:4,daily:1,gen:bankGen(SK4,3)});
const SK5=[
 ['What gives us light and warms Earth?','the Sun',['the Moon','a cloud'],'The Sun gives light and heat.'],
 ['When is it dark outside?','at night',['at noon','in the morning sun'],'It is dark at night.'],
 ['What can you see in the sky at night?','the Moon and stars',['the Sun','rainbows only'],'The Moon and stars shine at night.'],
 ['What is soil?','the dirt that plants grow in',['a kind of water','a kind of animal'],'Plants grow in soil.'],
 ['Which of these is a rock?','a pebble',['a flower','a cloud'],'A pebble is a small rock.'],
 ['Where does water for the oceans come from?','rain and rivers',['the sky color','the moon'],'Rivers and rain run to the ocean.'],
 ['Which of these should we do to help Earth?','put trash in a bin',['throw litter on the ground','waste water'],'We keep Earth clean.'],
 ['Which can you recycle?','a paper',['a banana peel','a puddle'],'Paper can be recycled.'],
 ['Which animal lives in a cold, snowy place?','🐧 penguin',['🦁 lion','🐪 camel'],'Penguins live where it is cold.'],
 ['Which animal lives in a hot, dry desert?','🐪 camel',['🐧 penguin','🐟 fish'],'Camels live in deserts.']];
NJ.reg({id:'sk_earth',subj:'sci',name:'Earth, Sky & Taking Care',desc:'Sun, Moon, soil, water, habitats, helping Earth',n:10,full:3,daily:1,gen:bankGen(SK5,3)});
