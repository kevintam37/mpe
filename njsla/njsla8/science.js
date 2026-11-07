const S_FORCE=[
 ['A hockey puck slides across ice and gradually stops. Which force is mainly responsible?','Friction',['Gravity pulling it sideways','Magnetism','Inertia pushing it backward'],'Friction opposes motion.'],
 ['What does Newton\'s first law say about an object at rest?','It stays at rest unless acted on by an unbalanced force.',['It will start moving on its own.','It has no inertia.','It always accelerates.'],'Law of inertia.'],
 ['A 5 kg cart accelerates at 2 m/s². What is the net force?','10 N',['2.5 N','7 N','3 N'],'F = ma = 5 × 2.'],
 ['If the net force on an object doubles and its mass stays the same, its acceleration','doubles',['halves','stays the same','quadruples'],'a = F/m.'],
 ['When a skater pushes off a wall, she moves backward. This is an example of','Newton\'s third law',['Newton\'s first law','conservation of mass','gravity only'],'The wall pushes back equally.'],
 ['Which has the greatest momentum?','A 1,000 kg car moving at 20 m/s',['A 1,000 kg car moving at 10 m/s','A 50 kg bike moving at 20 m/s','A 1,000 kg car at rest'],'Momentum = mass × velocity.'],
 ['In a collision, a small car and a large truck exert on each other forces that are','equal in size and opposite in direction',['greater on the car','greater on the truck','zero'],'Newton\'s third law.'],
 ['A roller coaster at the top of a hill has the most','potential energy',['kinetic energy','thermal energy only','no energy'],'Highest position gives maximum potential energy.'],
 ['As a pendulum swings down, its potential energy','changes to kinetic energy',['disappears','changes to mass','stays the same'],'Energy transforms.'],
 ['A graph of distance versus time shows a straight line sloping upward. The object is moving','at a constant speed',['with increasing acceleration','not at all','backward'],'A straight line means constant speed.'],
 ['Which will increase the gravitational force between two objects?','Increasing the mass of one object',['Increasing the distance','Decreasing both masses','Moving them apart'],'More mass gives more gravity.'],
 ['Two magnets repel each other. Which statement explains this?','Like poles repel.',['Opposite poles repel.','Gravity is stronger.','The magnets are heavy.'],'Like poles repel.']
];
NJ.reg({id:'s8_force',subj:'sci',name:'Forces & Motion',desc:'Newton\'s laws, momentum, energy, gravity, magnets',n:10,full:4,daily:1,gen:sciGen(S_FORCE)});
const S_WAVE=[
 ['Which type of wave needs a medium to travel?','Sound',['Light','Radio waves','X-rays'],'Sound is a mechanical wave.'],
 ['The amplitude of a wave is related to its','energy',['speed only','color','wavelength'],'Greater amplitude means more energy.'],
 ['If the frequency of a wave increases and its speed stays the same, its wavelength','decreases',['increases','stays the same','becomes zero'],'v = fλ.'],
 ['What happens when a light wave passes from air into water?','It bends (refracts).',['It disappears.','It turns into sound.','It stops.'],'Speed change causes refraction.'],
 ['Which describes a transverse wave?','The medium moves perpendicular to the wave direction.',['The medium moves parallel to the wave direction.','There is no motion.','It is a sound wave.'],'Light and water waves are transverse.'],
 ['A mirror produces an image by','reflection',['refraction','absorption','diffraction'],'Light bounces off a mirror.'],
 ['Why does a spoon in a glass of water look bent?','Light refracts as it passes between water and air.',['The spoon actually bends.','Water absorbs the spoon.','The glass magnifies the spoon.'],'Refraction.'],
 ['Which part of the electromagnetic spectrum has the highest energy?','Gamma rays',['Radio waves','Infrared','Visible light'],'Gamma rays have the highest frequency.'],
 ['Sound travels fastest through','a solid',['a gas','a liquid','a vacuum'],'Particles are closest together in solids.'],
 ['A black shirt feels hotter than a white shirt in the sun because it','absorbs more light energy',['reflects more light','emits no heat','blocks all light'],'Dark surfaces absorb more.']
];
NJ.reg({id:'s8_wave',subj:'sci',name:'Waves, Light & Sound',desc:'Wave properties, reflection, refraction, electromagnetic spectrum',n:10,full:4,daily:1,gen:sciGen(S_WAVE)});
const S_GEN=[
 ['Which process results in offspring with a combination of genes from two parents?','Sexual reproduction',['Asexual reproduction','Budding','Cloning'],'Sexual reproduction mixes genes.'],
 ['A Punnett square for Tt × Tt gives what ratio of dominant to recessive phenotypes?','3:1',['1:1','1:3','2:1'],'TT, Tt, Tt show dominant; tt shows recessive.'],
 ['What is a genotype?','The genes an organism has',['The way an organism looks','The place an organism lives','The size of an organism'],'Genotype refers to alleles; phenotype is appearance.'],
 ['What can cause a mutation?','A change in DNA',['Exercise','Eating more','Learning a skill'],'Mutations are changes in genetic material.'],
 ['In natural selection, which organisms are most likely to pass on their traits?','Those best adapted to their environment',['The largest organisms','The slowest organisms','The oldest organisms'],'Survival and reproduction.'],
 ['Which evidence supports the theory of evolution?','Fossil records showing changes over time',['Seasonal changes','Ocean tides','The phases of the Moon'],'Fossils document change in life.'],
 ['Antibiotic-resistant bacteria become common because','bacteria with resistance survive and reproduce',['antibiotics create resistance in all bacteria','bacteria choose to change','antibiotics are weak'],'Natural selection favors resistant bacteria.'],
 ['Selective breeding is','humans choosing which organisms reproduce for desired traits',['natural random mutation','a type of fossil','a type of cloning'],'Artificial selection.'],
 ['Which structures suggest that whales and humans share a common ancestor?','Similar bone arrangements in limbs',['Both live in water','Both are large','Both have fur'],'Homologous structures.'],
 ['Which describes a population evolving?','The proportion of traits changes over generations.',['One individual changes its traits.','Animals learn new behaviors.','The environment never changes.'],'Evolution occurs in populations over time.']
];
NJ.reg({id:'s8_gen',subj:'sci',name:'Genetics & Evolution',desc:'Inheritance, Punnett squares, natural selection, evidence for evolution',n:10,full:4,daily:1,gen:sciGen(S_GEN)});
const S_EARTH=[
 ['Which evidence supports the idea that Earth is billions of years old?','Radiometric dating of rocks',['The height of mountains','The salt in the ocean','Weather patterns'],'Radioactive decay provides absolute ages.'],
 ['Fossils found in lower rock layers are generally','older than those in upper layers',['younger than those in upper layers','the same age','less common'],'Law of superposition.'],
 ['The Moon\'s phases are caused by','the changing amount of the Moon\'s lit side we see',['Earth\'s shadow','clouds','the Sun\'s tilt'],'The Moon orbits Earth.'],
 ['What force keeps the planets in orbit around the Sun?','Gravity',['Magnetism','Friction','Inertia alone'],'Gravity provides the pull.'],
 ['Which best describes a galaxy?','A huge system of stars, gas, and dust held together by gravity',['A single large star','A group of planets','A comet\'s tail'],'The Milky Way is our galaxy.'],
 ['The Big Bang theory states that','the universe began from a very hot, dense state and has been expanding',['the universe has always been the same','stars formed from planets','the Sun created the universe'],'Evidence includes expansion of galaxies.'],
 ['Why is the Moon\'s gravity important to Earth?','It causes ocean tides.',['It creates the seasons.','It makes the Sun shine.','It causes day and night.'],'The Moon\'s gravity pulls on the oceans.'],
 ['Which would be best evidence of a past climate that was warmer in a region?','Fossils of tropical plants in a cold place',['Snow today','Strong winds','A river delta'],'Tropical fossils indicate former warm conditions.'],
 ['Light-years measure','distance',['time','speed','brightness'],'A light-year is the distance light travels in a year.'],
 ['Earth\'s tilt of 23.5° causes','the seasons',['the tides','the phases of the Moon','day and night'],'Tilt changes sunlight distribution during orbit.']
];
NJ.reg({id:'s8_earth',subj:'sci',name:'Earth, Space & History',desc:'Rock layers, geologic time, solar system, galaxies, Big Bang',n:10,full:4,daily:1,gen:sciGen(S_EARTH)});
const S_CLIM=[
 ['Which gas is a major contributor to the greenhouse effect?','Carbon dioxide',['Oxygen','Nitrogen','Argon'],'CO₂ traps heat.'],
 ['What is a main source of human-caused increases in carbon dioxide?','Burning fossil fuels',['Planting trees','Wind turbines','Solar panels'],'Fossil fuels release CO₂.'],
 ['Which would reduce human impact on climate?','Using renewable energy',['Burning more coal','Cutting down forests','Increasing waste'],'Renewable energy lowers emissions.'],
 ['What is a likely effect of rising global temperatures?','Rising sea levels',['More ozone','Fewer storms everywhere','Smaller deserts everywhere'],'Melting ice and thermal expansion raise sea level.'],
 ['Which is a renewable resource?','Wind',['Coal','Oil','Natural gas'],'Wind will not be used up.'],
 ['Deforestation can contribute to climate change because trees','absorb carbon dioxide',['create oxygen only at night','block the Sun','add methane'],'Fewer trees means less CO₂ absorbed.'],
 ['What does a food web show?','How energy flows through an ecosystem',['Where animals live','Population sizes','Weather patterns'],'Arrows show energy transfer.'],
 ['If the number of producers in an ecosystem sharply decreases, what is likely to happen?','Consumers will decline.',['Consumers will increase.','Nothing will change.','Decomposers will make food.'],'Energy for the ecosystem comes from producers.'],
 ['Which human activity can reduce biodiversity?','Habitat destruction',['Creating wildlife corridors','Protecting wetlands','Planting native species'],'Losing habitat threatens species.'],
 ['A scientist compares average temperatures over 100 years. This is data about','climate',['weather','a single storm','the day\'s forecast'],'Climate is long-term.']
];
NJ.reg({id:'s8_clim',subj:'sci',name:'Human Impact & Climate',desc:'Greenhouse effect, resources, ecosystems, solutions',n:10,full:4,daily:1,gen:sciGen(S_CLIM)});
const S_MAT=[
 ['In a chemical reaction, the atoms of the reactants','are rearranged to form products',['are destroyed','become new elements','disappear'],'Atoms are conserved.'],
 ['When a hot cup of cocoa cools, thermal energy','transfers to the surroundings',['disappears','is created','turns into mass'],'Energy flows from hot to cold.'],
 ['Which is an example of energy transformation?','A battery powering a flashlight',['An ice cube melting','A rock sitting still','A book on a shelf'],'Chemical energy becomes light and heat.'],
 ['Which is a physical change?','Water freezing',['Wood burning','Iron rusting','Food spoiling'],'No new substance forms.'],
 ['What is the main role of the Sun in photosynthesis?','Provides the light energy',['Provides the oxygen','Provides the water','Provides the soil'],'Plants capture light energy.'],
 ['Which statement about the law of conservation of energy is true?','Energy cannot be created or destroyed, only transformed.',['Energy is created in reactions.','Energy is destroyed as heat.','Energy is lost in all machines.'],'The total energy remains constant.'],
 ['What is the charge of an atom with equal numbers of protons and electrons?','Neutral',['Positive','Negative','Variable'],'Charges balance.'],
 ['Which is the best description of thermal energy?','Total kinetic energy of particles in a substance',['Energy of light','Stored in food only','Energy of position'],'Thermal energy comes from particle motion.']
];
NJ.reg({id:'s8_mat',subj:'sci',name:'Matter & Energy Transformations',desc:'Conservation, energy transfer, chemical and physical change',n:8,full:4,daily:1,gen:sciGen(S_MAT)});
function invGen(R,n){const B=[
 ['A student tests how the mass of a cart affects how far it travels down a ramp. Which is the dependent variable?','Distance traveled',['Mass of the cart','Height of the ramp','Type of surface'],'It is what is measured.'],
 ['Which is the best way to improve the reliability of results?','Repeat the experiment several times',['Change variables each time','Use only one trial','Ignore outliers'],'More trials reduce random error.'],
 ['A scientist finds results that do not support her hypothesis. What is the best next step?','Revise the hypothesis and test again',['Throw out the data','Change the data','Stop the investigation'],'Science relies on evidence.'],
 ['Which graph best shows how two variables are related?','Scatter plot',['Pie chart','List','Pictograph'],'Scatter plots show relationships.'],
 ['Which statement is a testable hypothesis?','If the temperature of water increases, then sugar will dissolve faster.',['Sugar is sweet.','Water is wet.','Hot drinks are better.'],'It makes a testable prediction.']];
 const q=mk(R,'The data table shows the speed of a cart on ramps of different heights. Which conclusion is best supported?','A higher ramp results in a faster cart.',['A higher ramp results in a slower cart.','Ramp height does not affect speed.','Speed does not change.'],'Speed increases as height increases.',{pics:stbl(['Ramp height (cm)','Speed (m/s)'],[[10,0.8],[20,1.2],[30,1.5],[40,1.8]])});
 return R.sample([...B.map(([a,b,c,d])=>mk(R,a,b,c,d)),q],Math.min(n,6))}
NJ.reg({id:'s8_inv',subj:'sci',name:'Investigations & Data',desc:'Variables, hypotheses, data analysis, conclusions',n:6,full:4,daily:1,gen:invGen});
