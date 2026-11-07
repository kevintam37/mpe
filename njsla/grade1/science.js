const S1A=[
 ['What does the Sun give to Earth?','light and heat',['rain only','wind only'],'The Sun gives Earth light and heat.'],
 ['When can we see the Sun in the sky?','during the day',['only at night','never'],'The Sun is in our sky during the day.'],
 ['What do we see in the sky at night?','the Moon and stars',['the Sun','rainbows'],'We see the Moon and stars at night.'],
 ['Why is it dark at night where we live?','Our part of Earth is turned away from the Sun.',['The Sun goes out.','The Moon eats the Sun.'],'Earth spins, so night comes when we face away from the Sun.'],
 ['What does Earth do that makes day and night?','spins around',['jumps','stops'],'Earth spins once every day.'],
 ['The Sun looks like it moves across the sky. In the morning, the Sun is ...','low in the sky in the east',['high in the west','not in the sky'],'The Sun rises in the east.'],
 ['When is your shadow the SHORTEST?','at noon, when the Sun is high',['in the morning','at sunset'],'The higher the Sun, the shorter the shadow.'],
 ['How does a shadow form?','Something blocks light.',['Light makes it hot.','Wind blows it.'],'A shadow is where light is blocked.'],
 ['Which season usually has the MOST hours of daylight?','summer',['winter','fall'],'Summer days are the longest.'],
 ['Which season usually has the FEWEST hours of daylight?','winter',['summer','spring'],'Winter days are the shortest.'],
 ['What does the Moon look like over a month?','Its shape seems to change.',['It disappears forever.','It turns red.'],'The Moon has phases.'],
 ['Which is a star?','the Sun',['the Moon','a planet like Earth'],'The Sun is a star.']];
NJ.reg({id:'s1_sky',subj:'sci',name:'Sun, Moon & Stars',desc:'Day and night, shadows, the Moon, seasons and daylight',n:10,full:4,daily:2,gen:bankGen(S1A,3)});
const S1B=[
 ['What makes a sound?','something that vibrates (shakes back and forth)',['something that is cold','something that is wet'],'Sounds are made by vibrations.'],
 ['When you pluck a guitar string, you can feel it ...','shake',['freeze','melt'],'The string vibrates.'],
 ['Which makes a LOUD sound?','a drum being hit hard',['a mouse walking','a whisper'],'A hard hit makes a loud sound.'],
 ['Which makes a soft, quiet sound?','a whisper',['a siren','a fire truck'],'A whisper is soft.'],
 ['Which can light go through? (It is see-through.)','clear glass',['a wooden door','a brick'],'Clear glass lets light through.'],
 ['Which blocks most light?','a wooden door',['clear plastic wrap','a window'],'A wooden door is opaque.'],
 ['Where is a shadow made?','where an object blocks light',['where the light is brightest','inside the Sun'],'Shadows form behind objects that block light.'],
 ['What do we need to see things?','light',['sound','wind'],'We see when light reaches our eyes.'],
 ['What does a mirror do to light?','bounces it back',['stops it','makes it hot'],'Mirrors reflect light.'],
 ['What do we use to hear sounds?','our ears',['our eyes','our nose'],'We hear with ears.'],
 ['Which of these gives off its own light?','a flashlight',['a mirror','a book'],'A flashlight makes light.'],
 ['What can make a sound travel?','air',['nothing at all','a shadow'],'Sound travels through air and other materials.']];
NJ.reg({id:'s1_light',subj:'sci',name:'Light & Sound',desc:'Vibrations, loud and soft, shadows, see-through materials',n:10,full:4,daily:2,gen:bankGen(S1B,3)});
const S1C=[
 ['Which part of a plant takes in water from the soil?','roots',['flower','leaves'],'Roots take in water.'],
 ['Which part of a plant makes seeds?','flower',['root','stem'],'Flowers make seeds and fruit.'],
 ['What do the leaves of a plant do?','use sunlight to make food',['hold up the animal','make noise'],'Leaves make food.'],
 ['A bird has a beak. Why?','to help it eat',['to help it swim','to help it dig only'],'Different beaks help birds get food.'],
 ['Why do fish have fins?','to help them swim',['to help them fly','to climb'],'Fins help fish move in water.'],
 ['Why does a bear have thick fur?','to stay warm',['to swim','to fly'],'Fur keeps animals warm.'],
 ['A baby animal looks a lot like its ...','parents',['plants','rocks'],'Young animals look like their parents.'],
 ['A baby chicken is called a ...','chick',['calf','cub'],'A baby chicken is a chick.'],
 ['A baby cow is called a ...','calf',['chick','pup'],'A baby cow is a calf.'],
 ['Which animal gives milk to its babies?','cow',['frog','fish'],'Cows are mammals.'],
 ['Which of these hatch from eggs?','birds',['dogs','cats'],'Birds hatch from eggs.'],
 ['What do all animals need?','food, water and air',['toys','paint'],'All animals need food, water and air.'],
 ['What helps a rabbit hear well?','long ears',['a long tail','feathers'],'Long ears help rabbits hear danger.'],
 ['A duck has webbed feet to ...','swim',['climb trees','dig'],'Webbed feet help ducks paddle.']];
NJ.reg({id:'s1_life',subj:'sci',name:'Plants & Animals',desc:'Plant parts, animal body parts, parents and babies',n:10,full:4,daily:2,gen:bankGen(S1C,3)});
const S1D=[
 ['Which word tells how something FEELS?','rough',['green','loud'],'Rough tells how something feels to touch.'],
 ['Which is HARD?','a rock',['a pillow','a marshmallow'],'Rocks are hard.'],
 ['Which is SOFT?','a pillow',['a brick','a rock'],'Pillows are soft.'],
 ['What happens to ice if it gets warm?','it melts',['it grows','it turns red'],'Ice melts into water.'],
 ['What happens to water if it gets very cold?','it freezes',['it burns','it grows legs'],'Water freezes into ice.'],
 ['Which tool tells how hot or cold it is?','thermometer',['ruler','scale'],'A thermometer measures temperature.'],
 ['Which tool measures how long something is?','ruler',['thermometer','clock'],'A ruler measures length.'],
 ['What do you use to look at tiny things up close?','magnifying glass',['ruler','spoon'],'A magnifying glass makes small things look bigger.'],
 ['What is the weather like when you need an umbrella?','rainy',['sunny','calm'],'You use an umbrella in the rain.'],
 ['What happens to the air in winter?','it gets colder',['it gets hotter','it disappears'],'Winter is the coldest season.'],
 ['Which object will FLOAT in water?','a wooden block',['a rock','a coin'],'Wood floats.'],
 ['Which object will SINK in water?','a rock',['a leaf','a cork'],'A rock sinks.']];
NJ.reg({id:'s1_mat',subj:'sci',name:'Materials, Weather & Tools',desc:'Hard/soft, float/sink, melting and freezing, science tools',n:10,full:4,daily:2,gen:bankGen(S1D,3)});
