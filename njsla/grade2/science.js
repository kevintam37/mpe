/* ===== 2nd grade science (original questions) ===== */
const S2A=[
 ['Which is a SOLID?','a rock',['juice','air'],'A solid keeps its own shape.'],
 ['Which is a LIQUID?','milk',['a brick','a ball'],'A liquid flows and takes the shape of its container.'],
 ['Which is a GAS?','the air in a balloon',['water in a cup','an ice cube'],'A gas spreads out to fill space.'],
 ['What happens to ice when it is heated?','It melts into water.',['It gets harder.','It turns to sand.'],'Heat melts ice.'],
 ['What happens to water when it is cooled enough?','It freezes into ice.',['It becomes a gas.','It disappears.'],'Cooling freezes water.'],
 ['Which word describes how a material feels?','rough',['loud','late'],'Rough is a texture.'],
 ['Which property helps you choose a material for a window?','You can see through it.',['It is soft.','It is bumpy.'],'A window must be see-through.'],
 ['Why are raincoats made of plastic?','Water cannot soak through it.',['It is crunchy.','It is heavy.'],'Plastic is waterproof.'],
 ['Which material is BEST for a pillow?','soft fabric',['metal','glass'],'A pillow should be soft.'],
 ['Which can be bent and then goes back to its shape?','a rubber band',['a rock','a glass cup'],'Rubber is stretchy and flexible.'],
 ['A small block can be built into a big tower. What is true about the parts?','Small pieces can be put together to make something new.',['They disappear.','They turn into liquid.'],'Pieces can be assembled in new ways.'],
 ['Which change can be undone?','melting ice and freezing it again',['burning a log','baking a cake'],'Melting and freezing can be reversed.'],
 ['Which change CANNOT be undone?','baking a cake',['freezing water','melting butter'],'Baking makes a new material.'],
 ['What is matter?','anything that takes up space',['only heavy things','only solids'],'Matter takes up space and has mass.'],
 ['Which is the best tool to measure how heavy something is?','a scale',['a ruler','a thermometer'],'A scale measures weight.']];
NJ.reg({id:'s2_mat',subj:'sci',name:'Solids, Liquids & Gases',desc:'States of matter, properties, melting and freezing, choosing materials',n:10,full:4,daily:2,gen:bankGen(S2A,3)});
const S2B=[
 ['What do plants need to grow?','sunlight, water and air',['candy and milk','toys and paper'],'Plants need light, water, air and nutrients.'],
 ['What do roots do?','take in water and hold the plant',['make seeds','catch bugs'],'Roots drink water and anchor the plant.'],
 ['What do leaves do?','make food using sunlight',['drink milk','hold seeds'],'Leaves make food.'],
 ['What helps carry pollen from flower to flower?','bees',['rocks','rain only'],'Bees move pollen.'],
 ['How can a seed travel far from its plant?','The wind carries it.',['It walks.','It is mailed.'],'Wind, water and animals spread seeds.'],
 ['A dandelion seed has fluffy parts. How does that help?','The wind can carry it.',['It makes it sink.','It scares animals.'],'The fluff catches the wind.'],
 ['Burrs stick to an animal\'s fur. How does this help the plant?','The seeds get carried to new places.',['It makes the animal fly.','It waters the plant.'],'Animals spread seeds.'],
 ['Which is a habitat?','a pond',['a spoon','a cloud'],'A habitat is where an animal lives and gets what it needs.'],
 ['A cactus lives in the desert. Why can it live there?','It stores water.',['It needs lots of rain.','It grows in water.'],'Cacti store water in their stems.'],
 ['Which animal is adapted for cold places?','polar bear',['camel','parrot'],'Thick fur and fat keep a polar bear warm.'],
 ['Why do many animals in the rainforest live in trees?','They find food and shelter there.',['The ground is hot.','They can\'t walk.'],'Trees give food and shelter.'],
 ['What do all living things need?','food, water and air',['toys','electricity'],'All living things need food, water and air.'],
 ['Which is a PRODUCER (makes its own food)?','a plant',['a lion','a worm'],'Plants make their own food.'],
 ['What does a food chain start with?','the Sun',['a lion','a worm'],'Energy comes from the Sun.'],
 ['What happens when a habitat dries up?','Animals must move or may die.',['Nothing.','More water appears.'],'Living things need their habitat.']];
NJ.reg({id:'s2_life',subj:'sci',name:'Plants & Habitats',desc:'What plants need, pollination, seed travel, habitats and adaptations',n:10,full:4,daily:2,gen:bankGen(S2B,3)});
const S2C=[
 ['Which is a landform?','a mountain',['a cloud','a spoon'],'Mountains are landforms.'],
 ['What is a very large body of salt water?','ocean',['pond','puddle'],'Oceans are salty.'],
 ['What is a body of water with land all around it?','lake',['ocean','river'],'A lake is surrounded by land.'],
 ['What is a flat, low land called?','plain',['mountain','hill'],'Plains are flat.'],
 ['Which landform is higher than a hill?','a mountain',['a valley','a plain'],'Mountains are the tallest.'],
 ['What can wear down rocks slowly?','wind and water',['sunglasses','music'],'Erosion wears rock away.'],
 ['What is erosion?','Wind or water moves bits of rock and soil.',['Plants grow tall.','Clouds form.'],'Erosion moves soil and rock.'],
 ['How can people slow down erosion on a hillside?','plant grass and trees',['dig it up','cut all the plants'],'Roots hold soil.'],
 ['How does a fast river change the land?','It can carve a canyon.',['It makes mountains.','It makes sand turn to glass.'],'Moving water carves land.'],
 ['What is a map useful for?','showing where land and water are',['telling time','measuring heat'],'Maps show places.'],
 ['Where is most of Earth\'s water?','in the oceans',['in lakes','in rivers'],'Oceans hold most water.'],
 ['Which water is fresh, not salty?','a river',['the ocean','the sea'],'Rivers are fresh water.'],
 ['What can a volcano do?','shoot out hot melted rock',['make snow','plant trees'],'Volcanoes erupt lava.'],
 ['What can an earthquake do?','shake the ground',['bring snow','make rain'],'Earthquakes shake the Earth.'],
 ['How can sand dunes form?','Wind piles up sand.',['Rain builds them.','Snow melts.'],'Wind moves sand into dunes.']];
NJ.reg({id:'s2_earth',subj:'sci',name:'Land & Water',desc:'Landforms, bodies of water, erosion, volcanoes and earthquakes',n:10,full:4,daily:2,gen:bankGen(S2C,3)});
const S2D=[
 ['A scientist wants to know if a plant needs light. What should she do?','Put one plant in light and one in the dark.',['Water both plants more.','Ask a friend.'],'Compare plants that differ in one thing.'],
 ['What should you do first in an investigation?','Ask a question.',['Share the results.','Clean up.'],'Start with a question.'],
 ['Which tool measures temperature?','thermometer',['ruler','scale'],'A thermometer measures how hot or cold.'],
 ['Which tool helps you see tiny things?','a magnifying glass',['a ruler','a clock'],'A magnifier makes small things bigger.'],
 ['What is a prediction?','what you think will happen',['what already happened','a drawing'],'A prediction is a guess based on what you know.'],
 ['Why do scientists repeat tests?','to check the results',['to get bored','to waste time'],'Repeating checks results.'],
 ['Why do we record data in a chart?','to keep track of what we find',['to decorate','to hide it'],'Charts organize data.'],
 ['A pea plant in sunlight grows 5 cm. One in the dark grows 1 cm. What can you say?','Light helps the plant grow.',['Dark helps plants grow.','Light has no effect.'],'Results show light helps.'],
 ['A push or pull is called a ...','force',['light','sound'],'A force is a push or pull.'],
 ['Which will roll farthest down a ramp?','a ball',['a book','a block'],'Round things roll.'],
 ['What happens when you make a ramp steeper?','Things roll faster.',['Things stop.','Things float.'],'A steeper ramp makes things go faster.'],
 ['A magnet picks up which object?','a paper clip',['a pencil','a rubber band'],'Magnets attract iron things.'],
 ['What is an engineer?','a person who designs and builds things',['a person who sells food','a person who flies'],'Engineers design solutions.'],
 ['Why do engineers test a model bridge?','to find out if it is strong',['to paint it','to eat lunch'],'Testing shows what works.']];
NJ.reg({id:'s2_inv',subj:'sci',name:'Investigations & Forces',desc:'Fair tests, tools, predictions, data, pushes and pulls, designing',n:10,full:3,daily:1,gen:bankGen(S2D,3)});
