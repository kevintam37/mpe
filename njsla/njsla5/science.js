/* ===== 5th grade SCIENCE (NJSLS-S style): hand-written items with explanations ===== */
const sciGen=bank=>(R,n)=>R.sample(bank,Math.min(n,bank.length)).map(([q,c,d,e,x])=>mk(R,q,c,d,e,x?{pics:x}:undefined));
const stbl=(h,rows)=>`<div class="pics"><div class="pic" style="padding:6px;font-size:14px"><table style="border-collapse:collapse"><tr>${h.map(x=>`<th style="border:1px solid var(--line);padding:5px 9px">${x}</th>`).join('')}</tr>${rows.map(r=>`<tr>${r.map(c=>`<td style="border:1px solid var(--line);padding:5px 9px;text-align:center">${c}</td>`).join('')}</tr>`).join('')}</table></div></div>`;

const S_MATTER=[
 ['Which statement best describes all matter?','It takes up space and has mass.',['It can always be seen.','It is always solid.','It has no weight.'],'Matter is anything that has mass and takes up space.'],
 ['A student mixes 50 g of sand with 100 g of water in a closed jar. What is the total mass of the mixture?','150 g',['50 g','100 g','Less than 150 g'],'Mass is conserved when substances are mixed without anything escaping.'],
 ['Ice melts into water in a cup. What happens to the total mass?','It stays the same.',['It increases.','It decreases.','It becomes zero.'],'Melting is a change of state; no matter is lost.'],
 ['Which is a physical change?','Cutting paper into pieces',['Burning wood','Rusting of an iron nail','Baking a cake'],'A physical change alters the form but not the type of substance.'],
 ['Which is a sign of a chemical change?','Gas bubbles form and a new substance appears.',['A solid is cut into smaller pieces.','Sugar dissolves in water.','Water evaporates from a puddle.'],'New substances and gas production signal a chemical change.'],
 ['Sugar is stirred into water until it seems to disappear. This mixture is called','a solution',['a new substance','a solid','a gas'],'A solution forms when one substance dissolves evenly in another.'],
 ['Which property can be used to separate iron filings from sand?','Magnetism',['Color','Mass','Texture'],'A magnet attracts iron but not sand.'],
 ['A student wants to separate salt from salt water. Which method will work best?','Let the water evaporate.',['Pour it through a coffee filter.','Use a magnet.','Pick out the salt by hand.'],'Evaporation leaves the salt behind.'],
 ['Which describes particles in a gas?','They are far apart and move freely.',['They are tightly packed and vibrate in place.','They are packed together and slide past each other.','They do not move.'],'Gas particles have large spaces between them and move rapidly.'],
 ['Why can you smell cookies baking from another room?','Tiny particles of gas from the cookies spread through the air.',['The cookies get lighter.','The air stops moving.','Heat makes the cookies larger.'],'Particles too small to see move through the air to your nose.'],
 ['Which material is the best electrical <b>conductor</b>?','Copper wire',['Rubber','Plastic','Wood'],'Metals like copper let electric current flow easily.'],
 ['Which property describes how well a material lets light pass through?','Transparency',['Hardness','Flexibility','Magnetism'],'Transparent materials let light through.'],
 ['A balloon is filled with air. Compared with an empty balloon, the filled balloon','has more mass.',['has less mass.','has the same mass.','has no mass.'],'Air is matter, so adding air adds mass.'],
 ['Two clear liquids look the same. Which test shows that they are different substances?','Compare their boiling points.',['Look at their color.','Pour them in different cups.','Measure the cup height.'],'Each substance has its own boiling point.'],
 ['A student heats water and it becomes steam. Which statement is true?','The water is changing from a liquid to a gas.',['A new substance is made.','Mass is lost.','Particles are disappearing.'],'Boiling is a physical change of state.'],
 ['Why does a metal spoon feel colder than a wooden spoon at the same temperature?','Metal conducts heat away from your hand faster.',['Metal is always colder.','Wood makes heat.','Wood is heavier.'],'Metal is a better heat conductor.']
];
NJ.reg({id:'s_matter',subj:'sci',name:'Matter & Its Properties',desc:'Particles, mass, mixtures, changes, properties',n:10,full:4,daily:1,gen:sciGen(S_MATTER)});

const S_FORCE=[
 ['What causes objects to fall toward the ground?','Gravity pulls them toward the center of Earth.',['Air pushes them down.','Magnets in the soil pull them.','They are heavier than air.'],'Earth\'s gravity pulls objects toward its center.'],
 ['A ball rolls across a carpet and slowly stops. Which force is acting?','Friction',['Magnetism','Gravity pushing sideways','Electricity'],'Friction between the ball and carpet slows it down.'],
 ['Which surface would produce the <b>least</b> friction for a sliding box?','Smooth ice',['Rough sandpaper','Carpet','Grass'],'Smooth surfaces have less friction.'],
 ['When a skater pushes a wall, she rolls backward. This shows that','forces come in pairs.',['walls have energy.','skates have no mass.','gravity stops.'],'The wall pushes back with an equal force in the opposite direction.'],
 ['Energy of motion is called','kinetic energy',['potential energy','thermal storage','chemical mass'],'Moving objects have kinetic energy.'],
 ['A roller coaster car is stopped at the top of a hill. It has the most','potential energy',['kinetic energy','sound energy','light energy'],'Height gives stored (potential) energy.'],
 ['A toaster changes electrical energy mainly into','heat energy',['sound energy','chemical energy','motion energy'],'Toasters use electricity to make heat.'],
 ['Which is an example of energy transfer by heat?','A metal spoon in hot soup becomes warm.',['A ball rolls downhill.','A magnet picks up a paper clip.','A bell makes a sound.'],'Heat moves from the hot soup into the spoon.'],
 ['Two magnets push away from each other. This happens because','like poles repel.',['unlike poles repel.','magnets lose energy.','gravity is stronger.'],'Like poles repel and unlike poles attract.'],
 ['A student pushes a heavy box and a light box with the same force. What is most likely true?','The light box will speed up more.',['The heavy box will speed up more.','Both will move the same.','Neither will move.'],'More mass means less acceleration for the same force.'],
 ['Which tool is used to measure force?','Spring scale',['Thermometer','Graduated cylinder','Ruler'],'A spring scale measures force (weight) in newtons.'],
 ['Which of these is a renewable energy source?','Wind',['Coal','Natural gas','Oil'],'Wind keeps being replaced naturally.'],
 ['In a simple circuit, a bulb will light only if','the circuit forms a complete closed loop.',['the wires are not touching','the battery is removed','the circuit has a gap'],'Electric current needs a complete path.'],
 ['A ball is thrown upward, slows, and falls. What force makes it slow down and fall?','Gravity',['Friction with the ground','Magnetism','Electricity'],'Gravity pulls the ball back toward Earth.'],
 ['Sound is made when objects','vibrate',['stay still','get colder','become magnetic'],'Vibrations produce sound waves.'],
 ['Which energy change happens when a flashlight is turned on?','Chemical energy to light energy',['Light energy to heat energy','Sound energy to motion','Heat energy to chemical energy'],'The battery\'s chemical energy becomes electrical, then light.']
];
NJ.reg({id:'s_force',subj:'sci',name:'Forces, Energy & Motion',desc:'Gravity, friction, energy transfer, circuits',n:10,full:4,daily:1,gen:sciGen(S_FORCE)});

const S_LIFE=[
 ['Plants make their own food through a process called','photosynthesis',['respiration','evaporation','digestion'],'Plants use sunlight, water, and carbon dioxide to make sugar.'],
 ['Which materials do plants need for photosynthesis?','Sunlight, water, and carbon dioxide',['Sugar, oxygen, and soil','Wind, rain, and nitrogen','Heat, salt, and oxygen'],'These are the inputs of photosynthesis.'],
 ['What do plants release as a result of photosynthesis?','Oxygen',['Carbon dioxide','Nitrogen','Methane'],'Plants give off oxygen.'],
 ['In a food chain grass → grasshopper → frog → snake, the frog is a','secondary consumer',['producer','decomposer','primary consumer'],'The frog eats a primary consumer (grasshopper).'],
 ['Which organisms are producers?','Plants',['Mushrooms','Rabbits','Hawks'],'Producers make their own food.'],
 ['What is the role of decomposers such as fungi?','They break down dead matter and return nutrients to the soil.',['They make food from sunlight.','They hunt other animals.','They produce oxygen.'],'Decomposers recycle nutrients.'],
 ['Where does the energy in most food chains come from originally?','The Sun',['The soil','The wind','Decomposers'],'Plants capture energy from sunlight.'],
 ['If all the hawks in an ecosystem disappeared, what would most likely happen first to the mouse population?','It would increase.',['It would decrease.','It would stay exactly the same.','It would disappear.'],'Fewer predators means more mice survive.'],
 ['A fish needs oxygen. How does it get it?','From oxygen dissolved in water through its gills',['By breathing air through lungs','By photosynthesis','By eating sunlight'],'Gills take oxygen from the water.'],
 ['What is an adaptation?','A feature or behavior that helps an organism survive',['A change that happens in one day','A kind of food','A type of weather'],'Adaptations help organisms live in their environments.'],
 ['A cactus has thick stems that store water. This helps it survive in the','desert',['rain forest','ocean','arctic'],'Water storage is an adaptation to dry places.'],
 ['In a food web, arrows show','the direction energy and matter flow.',['which animal is larger.','where animals live.','which animals are friends.'],'An arrow points from the food to the eater.'],
 ['Which is a nonliving part of an ecosystem?','Sunlight',['Bacteria','Moss','Insects'],'Sunlight, water, and soil are nonliving factors.'],
 ['Which statement is true about matter in an ecosystem?','It is recycled among living and nonliving things.',['It is used once and lost.','It only flows from animals to plants.','It never leaves the soil.'],'Matter cycles; energy flows through.'],
 ['A scientist finds that plants kept in the dark grow weak and pale. What is the best conclusion?','Plants need light to make food.',['Plants need darkness to grow.','Plants do not need water.','Pale plants make more oxygen.'],'Without light, photosynthesis cannot occur.'],
 ['Which food chain is written in the correct order?','sun → grass → rabbit → fox',['fox → rabbit → grass → sun','grass → sun → rabbit → fox','rabbit → grass → fox → sun'],'Arrows go from the energy source to the eater.']
];
NJ.reg({id:'s_life',subj:'sci',name:'Plants, Animals & Ecosystems',desc:'Photosynthesis, food webs, decomposers, adaptations',n:10,full:4,daily:1,gen:sciGen(S_LIFE)});

const S_EARTH=[
 ['Which process in the water cycle changes liquid water into water vapor?','Evaporation',['Condensation','Precipitation','Runoff'],'Heat from the Sun turns liquid water to vapor.'],
 ['Clouds form when water vapor cools and changes to liquid droplets. This process is','condensation',['evaporation','erosion','melting'],'Gas to liquid is condensation.'],
 ['Most of Earth\'s water is found in','the oceans',['lakes','glaciers','rivers'],'About 97% of Earth\'s water is salt water in the oceans.'],
 ['Which is the best example of weathering?','Rock cracking when water freezes inside it',['Soil moved by a river','Sand blown by wind to a new place','A glacier carrying rocks'],'Weathering breaks rock apart where it is.'],
 ['What is erosion?','The movement of weathered material by wind, water, or ice',['The melting of ice','The building of mountains','The formation of clouds'],'Erosion carries pieces of rock and soil to new places.'],
 ['Which landform is most likely made slowly by a river carving rock over millions of years?','A canyon',['A volcano','A sand dune','An island'],'Moving water erodes rock to cut canyons.'],
 ['Which sphere of Earth includes all living things?','Biosphere',['Atmosphere','Hydrosphere','Geosphere'],'The biosphere is all life.'],
 ['Which is part of the geosphere?','Mountains',['Clouds','Rivers','Plants'],'The geosphere is Earth\'s rock, soil, and land.'],
 ['A farmer plants rows of trees along a field to slow the wind. This helps reduce','erosion of soil',['evaporation of the ocean','sunlight','gravity'],'Trees hold soil and slow the wind.'],
 ['Which resource is renewable?','Sunlight',['Coal','Natural gas','Oil'],'Fossil fuels take millions of years to form; sunlight keeps shining.'],
 ['Which action best helps conserve water?','Turning off the faucet while brushing teeth',['Washing a car every day','Leaving a hose running','Taking a longer shower'],'Saving water reduces waste.'],
 ['Where is most of Earth\'s <b>fresh</b> water stored?','Glaciers and ice caps',['Rivers','Lakes','The atmosphere'],'Ice holds most of the fresh water.'],
 ['What causes most weather changes on Earth?','The Sun heating Earth unevenly',['The Moon\'s light','Earth\'s spin only','Gravity from other planets'],'Uneven heating moves air and water.'],
 ['Which tool is used to measure air pressure?','Barometer',['Thermometer','Rain gauge','Anemometer'],'A barometer measures air pressure.'],
 ['Fossils are most often found in','sedimentary rock',['igneous rock','molten rock','lava'],'Layers of sediment can preserve remains of living things.'],
 ['A scientist observes that a rock layer at the bottom of a cliff contains older fossils than the top layer. Why?','Lower layers were deposited first.',['Fossils move down over time.','Top layers are always older.','Cliffs melt older fossils.'],'The oldest layers are usually at the bottom.']
];
NJ.reg({id:'s_earth',subj:'sci',name:'Earth\'s Systems & Resources',desc:'Water cycle, weathering, erosion, spheres, resources',n:10,full:4,daily:1,gen:sciGen(S_EARTH)});

const S_SPACE=[
 ['Which statement about the Sun is true?','The Sun is a star.',['The Sun is a planet.','The Sun is a moon.','The Sun is a comet.'],'The Sun is the star at the center of our solar system.'],
 ['Why does the Sun look larger and brighter than other stars?','It is much closer to Earth.',['It is the biggest star.','It is the hottest star.','It is made of different materials.'],'Distance affects how big and bright a star looks.'],
 ['What causes day and night on Earth?','Earth rotating on its axis',['Earth orbiting the Sun','The Moon blocking the Sun','The Sun moving around Earth'],'As Earth spins, different places face the Sun.'],
 ['How long does it take Earth to orbit the Sun once?','About 365 days',['24 hours','30 days','12 months of 40 days'],'One orbit is one year.'],
 ['What causes the seasons?','Earth\'s tilted axis as it orbits the Sun',['Earth\'s distance from the Sun','The Moon\'s phase','Changes in the Sun\'s size'],'Tilt changes how directly sunlight hits each part of Earth.'],
 ['In the Northern Hemisphere it is summer when','it is tilted toward the Sun.',['it is closest to the Sun.','it is tilted away from the Sun.','the Moon is full.'],'Direct sunlight makes days longer and warmer.'],
 ['A shadow is shortest at about','noon',['sunrise','sunset','midnight'],'The Sun is highest in the sky around noon.'],
 ['Why do shadows change length during the day?','The Sun\'s position in the sky changes.',['The object changes size.','Earth stops moving.','The air changes color.'],'The apparent position of the Sun changes as Earth rotates.'],
 ['Which star looks brightest from Earth?','The Sun',['The North Star','Sirius','Betelgeuse'],'The Sun is by far the closest star.'],
 ['Gravity on the Moon is less than on Earth because','the Moon has less mass.',['the Moon has no air.','the Moon is farther from the Sun.','the Moon spins faster.'],'Gravity depends on mass.'],
 ['The planets in our solar system orbit','the Sun',['the Moon','Earth','Jupiter'],'The Sun\'s gravity holds the planets in orbit.'],
 ['Which statement about the Moon is correct?','It reflects light from the Sun.',['It makes its own light.','It is a star.','It has an atmosphere like Earth.'],'The Moon shines because it reflects sunlight.'],
 ['Why can we see different stars in different seasons?','Earth is in a different place in its orbit.',['Stars move around Earth.','Stars burn out each season.','Clouds hide the stars.'],'Earth\'s orbit changes which part of the sky faces away from the Sun at night.'],
 ['Which tool would best help a student observe craters on the Moon?','Telescope',['Microscope','Thermometer','Magnet'],'A telescope magnifies faraway objects.'],
 ['Two stars look equally bright, but one is much farther away. What can you conclude?','The farther star is actually brighter.',['The stars are the same distance away.','The closer star is brighter.','Both stars are planets.'],'To look equally bright from farther away, the star must give off more light.'],
 ['The Moon takes about how long to go through all its phases?','About 1 month',['1 day','1 week','1 year'],'The cycle takes about 29.5 days.']
];
NJ.reg({id:'s_space',subj:'sci',name:'Sun, Earth & Stars',desc:'Day and night, seasons, shadows, star brightness',n:10,full:4,daily:1,gen:sciGen(S_SPACE)});

const S_INV=[
 ['A student tests how the amount of sunlight affects plant growth. Which should stay the <b>same</b> in a fair test?','The amount of water',['The amount of light','The plant\'s height at the end','The color of the pot lid'],'Only one variable should change at a time.'],
 ['In an experiment, the variable the scientist changes on purpose is called the','independent variable',['dependent variable','control group only','conclusion'],'The independent variable is the one changed.'],
 ['A student measures how far a toy car rolls down ramps of different heights. What is the dependent variable?','The distance the car rolls',['The height of the ramp','The type of car','The floor surface'],'The dependent variable is what is measured.'],
 ['Why should scientists repeat an investigation several times?','To make sure the results are reliable',['To make the test longer','To change the question','To change the variable'],'Repeated trials show whether results are consistent.'],
 ['Which tool is best for measuring the volume of a liquid?','Graduated cylinder',['Balance','Ruler','Spring scale'],'A graduated cylinder measures liquid volume.'],
 ['Which tool measures mass?','Balance',['Thermometer','Graduated cylinder','Meter stick'],'A balance compares masses.'],
 ['Which type of graph is best for showing how a plant\'s height changed day by day?','Line graph',['Pie chart','Picture only','Table of names'],'Line graphs show change over time.'],
 ['What should a scientist do if the results do not support the hypothesis?','Report the results honestly and revise the idea.',['Change the data.','Ignore the results.','Stop all science.'],'Good science follows the evidence.'],
 ['A student claims "Warm water dissolves sugar faster." Which data best supports the claim?','Time to dissolve: warm 20 s, cool 55 s',['The warm water was blue.','Sugar is sweet.','The cup was glass.'],'Data that compare dissolving times provide evidence.',null],
 ['A student plants 3 seeds in sunlight and 3 seeds in a dark closet, with everything else the same. What is being tested?','The effect of light on seed growth',['The effect of water on seed size','The effect of soil on color','The effect of pots on light'],'Light is the only thing that differs between the two groups.'],
 ['Which is an observation rather than an inference?','The ice cube is 3 cm wide.',['The ice cube will melt in 10 minutes.','The ice cube must be very cold.','The ice cube was made last night.'],'An observation is what you directly sense or measure.'],
 ['A scientist wants to compare plant growth with different fertilizers. Which should she change?','The type of fertilizer',['The size of pots','The amount of light','The amount of water'],'Change only the variable being tested.'],
 ['Why do scientists share their methods and results?','So others can check and repeat the work',['So all experiments agree','So no mistakes can occur','So nobody can test their ideas'],'Sharing allows others to verify findings.'],
 ['A model of the solar system built from balls is useful because it','shows relationships in a simpler way.',['is exactly the same size as space.','proves the planets are balls.','replaces all data.'],'Models help explain ideas but are not exact.'],
 ['Which unit would be best for measuring the mass of a pencil?','Grams',['Meters','Liters','Seconds'],'Grams measure mass.'],
 ['Which prediction is best supported by this pattern? Plant height after 1, 2, 3 weeks: 4 cm, 8 cm, 12 cm.','About 16 cm after 4 weeks',['About 5 cm after 4 weeks','About 12 cm after 4 weeks','About 100 cm after 4 weeks'],'The plant grows about 4 cm per week.']
];
function sciInvTable(R,n){
 const out=sciGen(S_INV)(R,Math.max(0,n-2));
 const T=gather(Math.min(2,n),()=>{
  const lst=R.sample(['Water','Juice','Milk','Soda'],3),v=R.sample([60,72,80,95,110,120],3),hi=lst[v.indexOf(Math.max(...v))];
  return mk(R,'A student heated three liquids for 5 minutes and measured the final temperature of each. Which liquid had the greatest temperature?',hi,lst.filter(x=>x!==hi).concat(['They were all the same']),`Compare the numbers in the table. ${hi} reached ${Math.max(...v)}°C, the highest.`,{pics:stbl(['Liquid','Temperature (°C)'],lst.map((x,i)=>[x,v[i]]))});
 });
 return out.concat(T).slice(0,n);
}
NJ.reg({id:'s_inv',subj:'sci',name:'Investigations & Data',desc:'Fair tests, variables, measurement, graphs, evidence',n:10,full:4,daily:1,gen:sciInvTable});
