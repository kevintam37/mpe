/* ===== 3rd grade SCIENCE ===== */
const S_FORCE=[
 ['What is a force?','A push or a pull',['A kind of food','A type of weather','A color of light'],'A force is a push or a pull on an object.'],
 ['A soccer ball is kicked and rolls across the grass. What made it move?','A push from the kick',['A pull from the wind only','Its color','Its name'],'The kick is a push that sets the ball in motion.'],
 ['Two children pull on opposite ends of a rope with the same strength. What happens?','The rope does not move.',['The rope moves fast.','The rope breaks.','The rope floats.'],'Equal forces in opposite directions are balanced, so there is no change in motion.'],
 ['One team pulls harder on a rope than the other. What will happen?','The rope moves toward the stronger team.',['The rope stays still.','The rope spins.','The rope disappears.'],'Unbalanced forces change motion.'],
 ['What pulls objects toward the ground?','Gravity',['Magnetism','Friction','Wind'],'Gravity pulls objects toward Earth.'],
 ['A magnet can pick up which object?','A steel paper clip',['A plastic spoon','A wooden block','A rubber ball'],'Magnets attract objects made of iron or steel.'],
 ['Two magnets push away from each other. This is called','repelling',['attracting','melting','floating'],'Like poles repel each other.'],
 ['What happens when the north end of one magnet is placed near the south end of another?','They attract.',['They repel.','They melt.','Nothing ever happens.'],'Opposite poles attract.'],
 ['A toy car rolls farther on a smooth floor than on thick carpet. Why?','There is less friction on the smooth floor.',['The carpet is magnetic.','Gravity is stronger on carpet.','The car is lighter on carpet.'],'Rough surfaces create more friction, which slows things down.'],
 ['Which sentence describes a pattern of motion?','A swing moves back and forth again and again.',['A rock sits on the ground.','A book is on a shelf.','A cup is full.'],'A pattern repeats in a predictable way.'],
 ['Which change would make a wagon go faster downhill?','A bigger push',['A smaller push','Taking off the wheels','Adding a flat tire'],'A bigger force makes the wagon speed up more.'],
 ['Magnets are useful for','holding notes on a metal refrigerator',['cutting paper','making sound','growing plants'],'A magnet sticks to steel surfaces.'],
 ['Which is NOT attracted to a magnet?','A pencil made of wood',['A steel nail','A paper clip','An iron key'],'Wood is not magnetic.'],
 ['What is the best way to find out whether a toy is magnetic?','Touch it with a magnet.',['Smell it.','Weigh it.','Shake it.'],'You can test by trying to pick it up with a magnet.']
];
NJ.reg({id:'s3_force',subj:'sci',name:'Forces, Motion & Magnets',desc:'Pushes and pulls, balanced forces, gravity, magnets, patterns',n:10,full:4,daily:1,gen:sciGen(S_FORCE)});
const S_LIFE=[
 ['Which order shows the life cycle of a frog?','egg → tadpole → froglet → adult frog',['adult frog → egg → tadpole','tadpole → adult → egg → froglet','egg → adult → tadpole'],'A frog hatches as a tadpole and changes into an adult.'],
 ['Which is the correct order for a butterfly?','egg → caterpillar → chrysalis → butterfly',['egg → butterfly → caterpillar','caterpillar → egg → butterfly','chrysalis → egg → caterpillar'],'A butterfly changes completely (metamorphosis).'],
 ['A seed grows into a plant. Which is the first stage?','Seed',['Flower','Fruit','Adult plant'],'The life cycle of a plant begins with a seed.'],
 ['Why do puppies look like their parents?','They inherit traits from their parents.',['They eat the same food.','They sleep in the same bed.','They learn to look alike.'],'Traits are passed from parents to young.'],
 ['Which trait is inherited?','Eye color',['Knowing how to read','A scar from a fall','Wearing glasses'],'Eye color is passed down from parents.'],
 ['Which is a trait that is learned, not inherited?','Riding a bike',['Hair color','Height of a flower','Fur color'],'Skills are learned.'],
 ['Two kittens from the same litter look slightly different. This is an example of','variation',['life cycle','habitat','hibernation'],'Individuals of the same kind can vary in their traits.'],
 ['Which animal does NOT go through a big change in body shape as it grows (like a caterpillar)?','A dog',['A frog','A butterfly','A beetle'],'A puppy looks like a small dog; it just grows larger.'],
 ['What do all living things have in common?','They grow and change.',['They have fur.','They live in water.','They make sounds.'],'All living things go through a life cycle.'],
 ['What part of a flower makes seeds?','The ovary (inside the flower)',['The petals','The stem only','The roots only'],'Seeds develop in the flower after pollination.'],
 ['How do bees help flowering plants?','They carry pollen from flower to flower.',['They eat the stems.','They make rain.','They plant trees.'],'Pollen movement helps plants make seeds.'],
 ['A child has curly hair like her father. What does this show?','Traits can be passed from parent to child.',['Hair is always curly.','Hair is learned.','Hair color changes with weather.'],'This is an inherited trait.'],
 ['Which can change the way a living thing grows?','The environment, such as sunlight and water',['The name it is given','Its shadow','Its age in years only'],'Plants grown with more light and water grow differently.'],
 ['In a bean plant, what comes after the seed sprouts?','A seedling grows.',['The plant dies.','Fruit appears.','The flower falls off.'],'After sprouting, a seedling grows into an adult plant.']
];
NJ.reg({id:'s3_life',subj:'sci',name:'Life Cycles & Traits',desc:'Life cycles, inherited traits, variation, pollination',n:10,full:4,daily:1,gen:sciGen(S_LIFE)});
const S_ENV=[
 ['A polar bear has thick fur and a layer of fat. How do these help it?','They keep it warm in the cold Arctic.',['They help it swim faster in warm water.','They help it climb trees.','They make it taste good.'],'Adaptations help animals survive in their habitats.'],
 ['A cactus stores water in its stem. In which habitat does it live?','Desert',['Ocean','Rain forest','Arctic'],'Water storage is an adaptation to dry places.'],
 ['Why do many birds fly south in the fall?','To find warmer weather and food',['To find snow','To learn to swim','To build cities'],'Migration helps animals survive when food gets scarce.'],
 ['A fossil is','the remains or print of a living thing from long ago',['a kind of rock candy','a modern animal','a type of seed'],'Fossils show us what lived in the past.'],
 ['What can a fossil of a fish found on a mountain tell scientists?','The area was once under water.',['Fish can climb mountains.','Mountains are made of fish.','It rained fish.'],'Fish live in water, so the place must have been underwater.'],
 ['What is a habitat?','The place where a plant or animal lives',['The food an animal eats','A type of weather','An animal\'s name'],'A habitat gives an organism food, water, and shelter.'],
 ['Why do some animals live in groups (like herds or schools)?','Being in a group helps them stay safe and find food.',['They are lonely.','They cannot see well.','They like noise.'],'Groups can protect from predators and help find food.'],
 ['What might happen to animals if a forest is cut down?','They lose their food and shelter.',['They get more food.','They grow bigger.','Nothing at all.'],'Changing a habitat can make it hard to survive.'],
 ['A giraffe\'s long neck helps it','reach leaves high in trees',['swim in rivers','dig holes','hide underground'],'This adaptation helps it find food.'],
 ['What do plants need to survive?','Sunlight, water, and air',['Candy and soda','Darkness only','Plastic'],'These are the basic needs of plants.'],
 ['A chameleon changes color to blend with its surroundings. This helps it','hide from predators',['sing','fly','hibernate'],'Camouflage is an adaptation for survival.'],
 ['In which habitat would you most likely find a fish with fins and gills?','Ocean',['Desert','Mountain top','Dry grassland'],'Fins and gills are adaptations for living in water.'],
 ['Some animals sleep through the cold winter. This is called','hibernation',['migration','camouflage','pollination'],'Hibernation helps animals survive when food is hard to find.'],
 ['Which would help a rabbit survive near a fox?','Fast legs and brown fur',['Bright red fur','Loud noises','A very slow walk'],'Speed and camouflage help avoid predators.']
];
NJ.reg({id:'s3_env',subj:'sci',name:'Habitats, Adaptations & Fossils',desc:'Survival, adaptations, habitats, groups, fossils',n:10,full:4,daily:1,gen:sciGen(S_ENV)});
const S_WEATHER=[
 ['What does a thermometer measure?','Temperature',['Rainfall','Wind speed','Air pressure'],'A thermometer shows how hot or cold something is.'],
 ['Which tool measures how much rain has fallen?','Rain gauge',['Thermometer','Wind vane','Ruler'],'A rain gauge collects and measures rain.'],
 ['Which tool shows the direction the wind is blowing?','Wind vane',['Rain gauge','Thermometer','Magnet'],'A wind vane points into the wind.'],
 ['What is weather?','What the air outside is like at a certain time and place',['The usual conditions in a region over many years','Only rain','The seasons'],'Weather can change from day to day.'],
 ['What is climate?','The usual weather in a place over a long time',['The weather today','Only the temperature','The wind in the morning'],'Climate is the pattern of weather over many years.'],
 ['Which place most likely has a hot, dry climate?','A desert',['The North Pole','A rain forest','A glacier'],'Deserts get very little rain and are usually hot.'],
 ['Which weather is most likely to cause a flood?','Very heavy rain for many days',['A light breeze','A sunny day','A cool night'],'Too much rain can make rivers overflow.'],
 ['What should you do during a thunderstorm?','Go inside a building.',['Stand under a tall tree.','Go swimming.','Fly a kite.'],'Lightning is dangerous outdoors.'],
 ['A weather forecast says "70% chance of rain." What should you bring?','An umbrella',['Sunglasses','A kite','A swimsuit'],'Rain is likely.'],
 ['Which season is usually the coldest in New Jersey?','Winter',['Summer','Spring','Fall'],'Winter has the lowest temperatures.'],
 ['A table shows the daily high temperatures: Mon 50°F, Tue 54°F, Wed 58°F. What pattern do you see?','The temperature rises each day.',['It falls each day.','It stays the same.','It is random.'],'Each day is 4 degrees warmer.'],
 ['What is a hurricane?','A large storm with strong winds and heavy rain',['A small snow shower','A kind of cloud','A dry wind'],'Hurricanes form over warm ocean water.'],
 ['How can people prepare for a storm?','Have flashlights, water, and a plan.',['Ignore the warnings.','Go outside to watch.','Leave windows open.'],'Preparing helps keep people safe.'],
 ['Which clouds often bring thunderstorms?','Tall, dark clouds',['Thin, wispy clouds','No clouds','Light, fluffy clouds only'],'Cumulonimbus clouds are tall and dark.']
];
NJ.reg({id:'s3_weather',subj:'sci',name:'Weather & Climate',desc:'Weather tools, patterns, climate, storms and safety',n:10,full:4,daily:1,gen:sciGen(S_WEATHER)});
const S_INV=[
 ['A student wants to test whether more sunlight helps plants grow. What should she change?','The amount of sunlight',['The kind of plant','The amount of water','The size of the pot'],'Change only one thing and keep the rest the same.'],
 ['Which tool should you use to measure the length of your desk?','Ruler or meter stick',['Thermometer','Balance','Measuring cup'],'Length is measured with a ruler.'],
 ['Which tool measures the mass of a small rock?','Balance',['Ruler','Thermometer','Rain gauge'],'A balance measures mass in grams.'],
 ['What is the best way to record results of an experiment?','In a table or chart',['In your head','On a napkin only','Not at all'],'Tables help organize data.'],
 ['What is a prediction?','A guess about what will happen',['The final answer','A kind of tool','A graph'],'A prediction is made before the test.'],
 ['Which is an observation?','The leaf is green and has 5 points.',['I think the plant is happy.','The plant will grow tomorrow.','Plants are the best.'],'An observation uses your senses or tools.'],
 ['Why should scientists repeat a test more than once?','To check that the results are the same',['To use more paper','To make it harder','To change the question'],'Repeated tests give more reliable results.'],
 ['In a bar graph, which bar is the tallest if plant A grew 8 cm and plant B grew 5 cm?','Plant A',['Plant B','They are equal','Neither'],'Taller bars show larger numbers.'],
 ['A student drops a ball from different heights. What could she measure?','How high the ball bounces',['The ball\'s color','The weather','The floor\'s name'],'She can measure bounce height with a ruler.'],
 ['What should be the same in a fair test of which paper towel absorbs the most water?','The amount of water',['The brand','The shape of the towel only','The color of the table'],'Other conditions should be the same so only the towel type changes.'],
 ['Which is a good question for an investigation?','Which surface makes a toy car go farthest?',['Is purple a nice color?','Who is the best singer?','Why are dogs cute?'],'It can be tested by measuring.'],
 ['Why do scientists share their results?','So others can check and learn from them',['To show off','To avoid work','To change the facts'],'Sharing results helps science grow.']
];
NJ.reg({id:'s3_inv',subj:'sci',name:'Investigations & Data',desc:'Fair tests, tools, observations, charts and graphs',n:10,full:3,daily:1,gen:sciGen(S_INV)});
