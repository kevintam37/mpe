/* ===== 4th grade SCIENCE ===== */
const S_ENERGY=[
 ['What is energy?','The ability to cause motion or change',['A kind of matter','A type of rock','A shape'],'Energy makes things move, heat up, light up, and more.'],
 ['A moving bicycle has','kinetic energy',['no energy','only light energy','only sound energy'],'Moving objects have energy of motion.'],
 ['When two objects collide, what usually happens to the energy?','Some energy is transferred from one object to the other.',['All energy disappears.','Energy is created.','Nothing changes.'],'Energy transfers in collisions.'],
 ['A faster object has','more energy than a slower object of the same mass.',['less energy.','the same energy.','no energy.'],'Greater speed means more energy of motion.'],
 ['Which device changes electrical energy into light energy?','A light bulb',['A battery','A fan','A magnet'],'A bulb turns electricity into light (and heat).'],
 ['Which device changes electrical energy into motion?','An electric fan',['A candle','A solar panel','A thermometer'],'A fan motor uses electricity to spin the blades.'],
 ['In a simple circuit, what does a battery do?','It provides electrical energy.',['It stops current.','It makes light.','It lowers heat.'],'The battery is the energy source in the circuit.'],
 ['Which materials are electrical conductors?','Copper and aluminum',['Rubber and plastic','Wood and glass','Foam and cloth'],'Metals let electric current flow.'],
 ['A student rubs her hands together and they feel warm. Energy is changing from','motion to heat',['heat to light','light to sound','sound to motion'],'Friction turns motion energy into heat.'],
 ['Which is a renewable energy source?','Solar power',['Coal','Oil','Natural gas'],'The sun keeps shining, so solar energy is renewable.'],
 ['Which energy resource comes from the wind?','Wind turbines',['Gas turbines','Coal furnaces','Nuclear plants'],'Wind turbines turn wind into electricity.'],
 ['A ball rolls down a ramp. Energy is mainly changing from','stored energy due to height into motion energy',['light into heat','sound into heat','motion into stored energy'],'As it rolls down, it speeds up.'],
 ['A ball hits a wall and slows down. Where does some of its energy go?','It becomes sound and heat.',['It disappears.','It becomes electricity.','It turns into light.'],'Collisions can produce sound and heat.'],
 ['What kind of energy is stored in food?','Chemical energy',['Sound energy','Magnetic energy','Light energy'],'Food stores chemical energy that our bodies use.']
];
NJ.reg({id:'s4_energy',subj:'sci',name:'Energy & Electricity',desc:'Energy of motion, transfer in collisions, circuits, energy sources',n:10,full:4,daily:1,gen:sciGen(S_ENERGY)});
const S_WAVE=[
 ['What is a wave?','A repeating pattern of motion',['A kind of rock','A type of food','A flat surface'],'Waves repeat in patterns.'],
 ['Sound is made by','vibrations',['light','magnets','shadows'],'Vibrating objects make sound waves.'],
 ['What do we call the number of waves that pass a point each second?','Frequency',['Mass','Volume','Weight'],'Higher frequency means a higher pitch.'],
 ['Which sound has the highest pitch?','A mouse squeak',['A drum','A truck horn','A thunder clap'],'Small, fast vibrations make high pitches.'],
 ['Why do we see a mirror image of ourselves?','Light reflects off the mirror.',['Light is absorbed.','Light turns into sound.','The mirror makes light.'],'Reflection bounces light back.'],
 ['Which material would let the most light pass through?','Clear glass',['Wood','Aluminum foil','Cardboard'],'Transparent materials let light pass through.'],
 ['What happens when light cannot pass through an object?','A shadow forms.',['The light turns green.','The object disappears.','The light gets louder.'],'Opaque objects block light and make shadows.'],
 ['We see an object because','light from the object enters our eyes.',['our eyes make light.','sound waves hit the object.','the object is hot.'],'Light must enter the eyes for us to see.'],
 ['Which can send information across long distances using light?','Fiber-optic cable',['A paper cup','A rubber band','A wooden stick'],'Light pulses carry signals in cables.'],
 ['A string telephone works because','vibrations travel along the string.',['light shines through the string.','magnets pull the string.','wind blows the string.'],'Vibrations move through solid materials.'],
 ['Which is a way to send a message using a pattern?','Morse code',['A shadow only','A random sound','A blank page'],'Patterns of dots and dashes can carry information.'],
 ['A wave in the ocean moves water up and down. What does a wave mainly carry?','Energy',['Salt','Fish','Boats'],'Waves transfer energy, not matter.'],
 ['When light passes from air into water, it','bends',['stops','turns into sound','disappears'],'Refraction bends light.'],
 ['Which is true about light and sound?','Light can travel through empty space, but sound cannot.',['Sound travels faster than light.','Both need air.','Neither can travel through water.'],'Sound needs matter.']
];
NJ.reg({id:'s4_wave',subj:'sci',name:'Waves, Light & Sound',desc:'Vibrations, pitch, reflection, seeing, sending information',n:10,full:4,daily:1,gen:sciGen(S_WAVE)});
const S_EARTH=[
 ['What is weathering?','The breaking of rock into smaller pieces',['The movement of sand by wind','The building of mountains','The melting of snow'],'Weathering breaks down rocks.'],
 ['What is erosion?','The movement of weathered materials',['The freezing of water','The growth of plants','The making of rocks'],'Wind, water, and ice carry pieces away.'],
 ['Which can cause weathering?','Water freezing in cracks',['A magnet','A shadow','A thermometer'],'Ice expands and cracks rock.'],
 ['The Grand Canyon was formed mostly by','a river eroding rock over millions of years',['a volcano','a flood last year','a giant meteor'],'Flowing water wears away rock.'],
 ['A delta forms where','a river deposits sediment as it enters the sea',['a mountain is born','wind meets a glacier','a lake dries up'],'Deposition builds land at river mouths.'],
 ['Which causes a sudden change to Earth\'s surface?','An earthquake',['Slow rain','A gentle breeze','A tide'],'Earthquakes can change land quickly.'],
 ['Where do most earthquakes and volcanoes occur?','Along the edges of tectonic plates',['In the middle of deserts','Only at the poles','Only on islands'],'Plate boundaries are where the action is.'],
 ['In undisturbed rock layers, the oldest layer is usually','at the bottom',['at the top','in the middle','missing'],'Newer layers form on top of older ones.'],
 ['What can fossils in rock layers show?','What kinds of living things lived long ago',['How hot the Sun is','The speed of wind','The cost of rocks'],'Fossils are evidence of past life.'],
 ['On a map, which feature shows the height of land?','Contour lines',['A compass rose only','A scale bar only','A title'],'Contour lines connect points of the same elevation.'],
 ['What does a map scale tell you?','How map distance compares to real distance',['What the weather is','The year it was made','The map\'s height'],'A scale relates the map to real distances.'],
 ['Which landform is made by moving ice?','A glacial valley',['A volcano','A delta','A sand dune'],'Glaciers carve valleys.'],
 ['Sand dunes are shaped mostly by','wind',['ice','lava','earthquakes'],'Wind moves and piles sand.'],
 ['Which process is MOST likely to make a smooth, rounded river rock?','Rocks bumping and rubbing in moving water',['Lava cooling','Sunlight warming it','Plants growing on it'],'Abrasion in water smooths rocks.']
];
NJ.reg({id:'s4_earth',subj:'sci',name:'Changing Earth',desc:'Weathering, erosion, landforms, rock layers, maps, earthquakes',n:10,full:4,daily:1,gen:sciGen(S_EARTH)});
const S_RES=[
 ['Which resource is nonrenewable?','Coal',['Sunlight','Wind','Moving water'],'Coal takes millions of years to form.'],
 ['Which is a renewable resource?','Wind',['Oil','Natural gas','Coal'],'Wind is continually replenished.'],
 ['Fossil fuels are made from','ancient plants and animals',['rocks only','glass','new trees'],'They formed over millions of years from remains of living things.'],
 ['What is one way to conserve energy at home?','Turn off lights when you leave a room.',['Leave the TV on.','Open the refrigerator often.','Run water all day.'],'Using less saves energy.'],
 ['Burning fossil fuels can cause','air pollution',['more rain','smoother roads','fewer clouds'],'Burning releases pollutants.'],
 ['Which is a natural hazard?','Hurricane',['Sunrise','Picnic','Library'],'A hurricane is a dangerous natural event.'],
 ['How can people reduce damage from floods?','Build levees and avoid building in flood zones.',['Cut down all trees.','Pave over rivers.','Ignore warnings.'],'Planning and barriers reduce flood damage.'],
 ['Why do engineers design buildings to be earthquake-resistant?','To reduce damage and keep people safe',['To make them heavier','To make them taller','To make them cheaper'],'Strong, flexible designs can survive shaking.'],
 ['Which action helps protect a river from pollution?','Throwing trash in a bin',['Dumping oil down a drain','Washing cars into storm drains','Leaving litter near the water'],'Proper disposal keeps water clean.'],
 ['Solar panels use which resource to make electricity?','Sunlight',['Wind','Coal','Water pressure'],'Solar panels turn sunlight into electricity.'],
 ['Recycling helps because it','saves resources and reduces trash',['makes more trash','uses more oil','pollutes more'],'Recycling reuses materials.'],
 ['Which is a benefit of wind turbines?','They produce electricity without burning fuel.',['They make no noise ever.','They work in any weather.','They cost nothing to build.'],'Wind is a clean energy source.'],
 ['How can a community prepare for a hurricane?','Make an evacuation plan.',['Plant more flowers.','Close the schools forever.','Remove all warnings.'],'Planning helps keep people safe.']
];
NJ.reg({id:'s4_res',subj:'sci',name:'Natural Resources & Hazards',desc:'Renewable and nonrenewable resources, conserving, natural hazards',n:10,full:4,daily:1,gen:sciGen(S_RES)});
const S_BODY=[
 ['The roots of a plant help it','take in water and stay in the ground',['make flowers','attract bees','produce seeds only'],'Roots anchor and absorb water.'],
 ['What is the main job of a leaf?','To make food using sunlight',['To hold the plant up','To take in water','To make seeds'],'Photosynthesis happens in leaves.'],
 ['A bird\'s hollow bones help it to','be light enough to fly',['swim underwater','dig holes','stay warm'],'Light bones make flight easier.'],
 ['Which body part do animals use to take in information about light?','Eyes',['Ears','Nose','Skin'],'Eyes sense light.'],
 ['What does the brain do with information from the senses?','It processes it and decides how to respond.',['It stores it as food.','It ignores it.','It sends it outside the body.'],'The brain interprets signals.'],
 ['A cat\'s whiskers help it','feel its surroundings',['hear sounds','see colors','taste food'],'Whiskers are sensitive to touch.'],
 ['Why do some animals have sharp claws?','To catch or hold food or climb',['To hear better','To breathe','To stay cool'],'Claws are structures for survival.'],
 ['A thick shell on a turtle helps','protect it from predators',['find food','swim fast','sing'],'The shell is protection.'],
 ['What do the petals of a flower often do?','Attract pollinators',['Absorb water','Make roots','Hold the soil'],'Colorful petals draw insects.'],
 ['Which sense organ detects sound?','Ear',['Eye','Nose','Tongue'],'Ears detect sound waves.'],
 ['A frog\'s webbed feet help it','swim',['climb trees','dig tunnels','fly'],'Webs make good paddles.'],
 ['Why do some animals have camouflage?','To blend in and avoid being seen',['To be louder','To fly higher','To find water'],'Camouflage is a protective structure.'],
 ['How do animals know a predator is near?','Their senses send signals to their brain.',['They read the air.','They guess.','They use maps.'],'Senses gather information.'],
 ['The stem of a plant mostly','carries water and supports the plant',['makes seeds','absorbs sunlight','attracts bees'],'Stems support and transport.']
];
NJ.reg({id:'s4_body',subj:'sci',name:'Structures & Senses',desc:'Plant and animal parts, senses, brain, information',n:10,full:4,daily:1,gen:sciGen(S_BODY)});
const S_INV=[
 ['A student tests how the height of a ramp affects how far a car rolls. What should she change?','The height of the ramp',['The car','The floor','The ruler'],'Change only one variable.'],
 ['What should stay the same in that fair test?','The car and the floor surface',['The height of the ramp','The distance measured','The results'],'Keep everything else constant.'],
 ['Which tool measures temperature?','Thermometer',['Balance','Ruler','Graduated cylinder'],'Thermometers measure how hot or cold.'],
 ['A student records "The water boiled at 100°C." This is','data from an observation',['a prediction','a question','a model'],'It is a recorded result.'],
 ['Which graph best shows the temperature over a week?','Line graph',['Pie chart only','Map','Diagram of a leaf'],'Line graphs show changes over time.'],
 ['Why do scientists repeat investigations?','To check that results can be trusted',['To be silly','To change the question','To use up time'],'Repeated trials increase confidence.'],
 ['A model of the solar system is useful because','it helps us understand something too big to see at once',['it is exactly the same size','it replaces observations','it never changes'],'Models represent real things.'],
 ['Which is an example of an inference?','The wet ground means it rained.',['The ground is wet.','The ground is brown.','The ground is flat.'],'An inference is a conclusion based on evidence.'],
 ['What should a scientist do if results do not match the prediction?','Report the results and think about why.',['Change the data.','Throw away the results.','Stop experimenting.'],'Science follows evidence.'],
 ['In a data table, the time is listed in the first column and temperature in the second. What can you find?','How temperature changes over time',['The color of the water','The weight of the cup','The shape of the table'],'The table organizes related data.'],
 ['Which tool measures the volume of a liquid?','Graduated cylinder',['Balance','Thermometer','Hand lens'],'It measures liquid volume in milliliters.'],
 ['A hypothesis is','a testable explanation or prediction',['a finished experiment','a type of tool','a graph'],'Hypotheses can be tested.']
];
NJ.reg({id:'s4_inv',subj:'sci',name:'Investigations & Data',desc:'Fair tests, tools, graphs, models, evidence',n:10,full:3,daily:1,gen:sciGen(S_INV)});
