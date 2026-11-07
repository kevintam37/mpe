const S_MAT=[
 ['When a substance gains thermal energy, what happens to its particles?','They move faster.',['They move slower.','They stop moving.','They disappear.'],'Added thermal energy increases particle motion.'],
 ['Which describes the particles in a gas?','Far apart and moving freely',['Tightly packed and vibrating','Packed in a fixed pattern','Not moving at all'],'Gas particles have the most space and freedom.'],
 ['Heat always flows from','a warmer object to a cooler object',['a cooler object to a warmer object','large objects to small objects','metal to plastic only'],'Thermal energy moves from hot to cold.'],
 ['Which method of heat transfer occurs when a metal spoon warms in hot soup?','Conduction',['Convection','Radiation','Evaporation'],'Conduction is transfer through direct contact.'],
 ['Warm air rising and cool air sinking in a room is an example of','convection',['conduction','radiation','condensation'],'Convection moves heat through the movement of fluids.'],
 ['The Sun warms Earth through empty space by','radiation',['conduction','convection','friction'],'Radiation does not need matter.'],
 ['Which is the best insulator?','Foam',['Copper','Aluminum','Iron'],'Insulators slow the transfer of heat.'],
 ['During melting, a substance changes from','solid to liquid',['liquid to gas','gas to liquid','liquid to solid'],'Melting turns a solid into a liquid.'],
 ['Water vapor turns into liquid droplets on a cold glass. This is','condensation',['evaporation','melting','freezing'],'Gas to liquid is condensation.'],
 ['A student adds salt to water and it dissolves. What type of mixture is formed?','Solution',['Compound','Element','New substance'],'The salt is evenly spread in the water.'],
 ['Which is a chemical change?','Iron rusting',['Ice melting','Paper being cut','Sugar dissolving'],'Rust is a new substance.'],
 ['Which tool measures mass?','Balance',['Thermometer','Graduated cylinder','Ruler'],'A balance measures mass.']
];
NJ.reg({id:'s6_mat',subj:'sci',name:'Matter & Thermal Energy',desc:'Particles, states of matter, heat transfer, changes',n:10,full:4,daily:1,gen:sciGen(S_MAT)});
const S_EARTH=[
 ['What drives the water cycle?','Energy from the Sun',['Wind from the poles','Earth\'s magnetic field','The Moon\'s gravity'],'Solar energy powers evaporation.'],
 ['Which process puts water vapor into the atmosphere from plants?','Transpiration',['Condensation','Erosion','Deposition'],'Plants release water through leaves.'],
 ['What causes wind?','Uneven heating of Earth\'s surface',['Earth\'s rotation only','Ocean tides','Clouds'],'Warm air rises and cooler air moves in.'],
 ['A warm, moist air mass meets a cold air mass. What often forms?','A front with clouds and rain',['A clear sky','An earthquake','A volcano'],'Different air masses collide at fronts.'],
 ['What is the difference between weather and climate?','Climate is the long-term pattern of weather in an area.',['Weather lasts years.','Climate is daily.','There is no difference.'],'Climate averages weather over decades.'],
 ['Which layer of Earth\'s atmosphere contains most weather?','Troposphere',['Stratosphere','Mesosphere','Thermosphere'],'It is the lowest layer.'],
 ['Why are ocean currents important to climate?','They move heat around Earth.',['They create earthquakes.','They make mountains.','They stop evaporation.'],'Currents like the Gulf Stream carry warm water.'],
 ['Which is a renewable resource?','Solar energy',['Coal','Natural gas','Oil'],'Sunlight will not run out.'],
 ['Which is the result of greenhouse gases building up in the atmosphere?','Increased global temperatures',['Fewer storms','More ozone','Colder summers'],'Greenhouse gases trap heat.'],
 ['What forms when water freezes in rock cracks and breaks the rock?','Weathering',['Deposition','Condensation','Volcanism'],'Ice wedging is a type of weathering.']
];
NJ.reg({id:'s6_earth',subj:'sci',name:'Earth\'s Systems, Weather & Climate',desc:'Water cycle, air masses, climate, resources',n:10,full:4,daily:1,gen:sciGen(S_EARTH)});
const S_ECO=[
 ['Which is a producer in an ecosystem?','Grass',['Rabbit','Hawk','Mushroom'],'Producers make their own food.'],
 ['What do decomposers do?','Break down dead organisms and return nutrients',['Make food from sunlight','Hunt prey','Pollinate flowers'],'Fungi and bacteria recycle matter.'],
 ['In a food web, arrows show','the direction energy flows',['which animal is bigger','where animals live','predator numbers'],'Arrows point from food to eater.'],
 ['If most of the snakes in an ecosystem are removed, what will likely happen to the mouse population?','It will increase at first.',['It will disappear.','It will not change.','It will migrate.'],'Fewer predators means more mice.'],
 ['What is a limiting factor?','Something that restricts population growth',['A type of plant','A predator only','A weather pattern'],'Food, water, and space can limit populations.'],
 ['Which relationship benefits both organisms?','Mutualism',['Parasitism','Competition','Predation'],'Both gain, like bees and flowers.'],
 ['A tick feeding on a dog is an example of','parasitism',['mutualism','commensalism','competition'],'The tick benefits and harms the host.'],
 ['What is the main source of energy for nearly all ecosystems?','The Sun',['Soil','Water','Wind'],'Plants capture sunlight.'],
 ['Which best describes a biome?','A large region with a characteristic climate and organisms',['A single species','One pond','One food chain'],'Examples include tundra and desert.'],
 ['Which part of a cell controls its activities?','Nucleus',['Cell wall','Vacuole','Cell membrane'],'The nucleus holds genetic information.']
];
NJ.reg({id:'s6_eco',subj:'sci',name:'Ecosystems & Living Things',desc:'Food webs, energy, relationships, populations, cells',n:10,full:4,daily:1,gen:sciGen(S_ECO)});
const S_SPACE=[
 ['What causes Earth\'s seasons?','The tilt of Earth\'s axis',['Distance from the Sun','The Moon\'s orbit','Earth\'s speed'],'The tilt changes sunlight directness.'],
 ['What causes day and night?','Earth\'s rotation',['Earth\'s revolution','The Moon blocking the Sun','Earth\'s tilt'],'Rotation turns places toward and away from the Sun.'],
 ['How long does it take Earth to revolve around the Sun?','About 365 days',['24 hours','30 days','12 months of 40 days'],'One revolution is a year.'],
 ['What causes the Moon\'s phases?','The changing view of the Moon\'s sunlit side',['Earth\'s shadow','Clouds','The Sun\'s tilt'],'Different amounts of the lit half face Earth.'],
 ['A solar eclipse occurs when','the Moon passes between the Sun and Earth',['Earth passes between the Sun and Moon','the Sun moves','Mars is near'],'The Moon blocks sunlight.'],
 ['Which force keeps planets in orbit?','Gravity',['Friction','Magnetism','Electricity'],'The Sun\'s gravity pulls planets inward.'],
 ['Which planet is closest to the Sun?','Mercury',['Venus','Earth','Mars'],'Mercury is first.'],
 ['What are tides mainly caused by?','The Moon\'s gravity',['Wind','Earth\'s tilt','Sunlight'],'The Moon pulls on the oceans.'],
 ['Why do we always see the same side of the Moon?','It rotates once for each orbit.',['It does not rotate.','It is flat.','Earth blocks the other side.'],'Rotation matches orbit.'],
 ['The Sun is','a star',['a planet','a moon','a comet'],'It is the star at the center of the solar system.']
];
NJ.reg({id:'s6_space',subj:'sci',name:'Earth, Sun & Moon',desc:'Seasons, phases, eclipses, gravity, solar system',n:10,full:4,daily:1,gen:sciGen(S_SPACE)});
function invGen(R,n){const B=[
 ['A student tests how sunlight affects plant growth. Which is the independent variable?','Amount of sunlight',['Plant height','Type of soil','Amount of water'],'The independent variable is the one the student changes.'],
 ['In the same experiment, which is the dependent variable?','Plant height',['Amount of sunlight','Pot size','Water given'],'It is what is measured.'],
 ['Which would be a controlled variable?','Type of soil',['Amount of sunlight','Plant height','Number of leaves'],'Controlled variables stay the same.'],
 ['Why should an experiment be repeated several times?','To make results more reliable',['To change the hypothesis','To use more materials','To avoid recording data'],'Repeated trials reduce error.'],
 ['Which is a testable question?','Does the temperature of water affect how fast sugar dissolves?',['Which color is prettiest?','Is science fun?','Why is the sky nice?'],'It can be tested with measurements.'],
 ['Which graph best shows change over time?','Line graph',['Pie chart','Pictograph','Table of names'],'Line graphs show trends.'],
 ['Which unit would best measure the volume of a liquid?','Milliliters',['Grams','Meters','Seconds'],'Volume of liquid is in mL.']];
 const w=R.pick([[10,'20 °C'],[30,'40 °C']]);
 const q=mk(R,'The table shows how long sugar took to dissolve in water at different temperatures. What conclusion is best supported?','Sugar dissolves faster in warmer water.',['Sugar dissolves faster in colder water.','Temperature has no effect.','Sugar never dissolves.'],'The time decreases as temperature increases.',{pics:stbl(['Temperature','Time to dissolve'],[['10 °C','60 s'],['30 °C','35 s'],['50 °C','15 s']])});
 return R.sample([...B.map(([a,b,c,d])=>mk(R,a,b,c,d)),q],Math.min(n,8))}
NJ.reg({id:'s6_inv',subj:'sci',name:'Investigations & Data',desc:'Variables, fair tests, data and graphs',n:8,full:4,daily:1,gen:invGen});
