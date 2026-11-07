const S_CHEM=[
 ['What is the smallest unit of an element that keeps the properties of that element?','Atom',['Molecule','Compound','Proton'],'An atom is the smallest unit of an element.'],
 ['Which particle has a positive charge?','Proton',['Electron','Neutron','Atom'],'Protons are positive.'],
 ['The atomic number of an element equals its number of','protons',['neutrons','electrons plus neutrons','molecules'],'Atomic number is the proton count.'],
 ['Which describes a compound?','Two or more elements chemically combined',['A mixture of metals','A single atom','A solution of salt in water'],'Compounds are chemically bonded elements, such as water.'],
 ['In a chemical reaction, the total mass of the reactants','equals the total mass of the products',['is greater than the products','is less than the products','disappears'],'Mass is conserved.'],
 ['Which is a sign of a chemical reaction?','Production of a new gas or color change',['Melting of ice','Tearing paper','Dissolving sugar'],'New substances form in chemical changes.'],
 ['On the periodic table, elements in the same column (group) have','similar properties',['the same mass','the same number of protons','no properties in common'],'Groups share properties.'],
 ['A sample of water boils at 100 °C. Which type of property is this?','Physical property',['Chemical property','Chemical change','Reaction'],'Boiling point can be observed without changing identity.'],
 ['Which is an example of an element?','Oxygen',['Water','Salt','Air'],'Oxygen is made of one kind of atom.'],
 ['When vinegar and baking soda are mixed, bubbles form. This is evidence of','a chemical reaction',['a physical change','a mixture only','evaporation'],'Gas formation shows a new substance.'],
 ['What does the formula H₂O tell you about water?','Each molecule has 2 hydrogen atoms and 1 oxygen atom.',['It has 2 oxygen atoms.','It has 3 hydrogen atoms.','It contains no hydrogen.'],'Subscripts show atom counts.'],
 ['Which action increases the rate at which sugar dissolves in water?','Stirring',['Cooling the water','Using bigger sugar crystals without stirring','Covering the cup'],'Stirring and heating speed up dissolving.']
];
NJ.reg({id:'s7_chem',subj:'sci',name:'Atoms, Matter & Chemical Change',desc:'Atoms, elements, compounds, reactions, conservation of mass',n:10,full:4,daily:1,gen:sciGen(S_CHEM)});
const S_CELL=[
 ['Which statement is part of the cell theory?','All living things are made of one or more cells.',['Cells are always visible without a microscope.','Only animals are made of cells.','Cells come from nonliving matter.'],'Cell theory states cells are the basic unit of life.'],
 ['Which organelle makes food by photosynthesis?','Chloroplast',['Mitochondrion','Nucleus','Ribosome'],'Chloroplasts capture light.'],
 ['Which organelle releases energy from food for the cell?','Mitochondrion',['Chloroplast','Cell wall','Vacuole'],'Mitochondria carry out cellular respiration.'],
 ['Which structure is found in plant cells but not animal cells?','Cell wall',['Cell membrane','Nucleus','Cytoplasm'],'Plant cells have a rigid cell wall.'],
 ['Which body system carries oxygen and nutrients to cells?','Circulatory system',['Digestive system','Skeletal system','Nervous system'],'The heart and blood vessels transport materials.'],
 ['Which system breaks down food into nutrients?','Digestive system',['Respiratory system','Muscular system','Immune system'],'Digestion breaks food apart.'],
 ['Cells → tissues → organs → ______ ', 'organ systems',['organelles','molecules','populations'],'This is the levels of organization.'],
 ['What is the function of the cell membrane?','It controls what enters and leaves the cell.',['It stores DNA.','It makes proteins.','It produces sunlight.'],'The membrane is selectively permeable.'],
 ['Which system uses neurons to send signals?','Nervous system',['Skeletal system','Digestive system','Circulatory system'],'Neurons carry electrical signals.'],
 ['What is the main job of the respiratory system?','To take in oxygen and release carbon dioxide',['To digest food','To produce hormones','To support the body'],'The lungs exchange gases.']
];
NJ.reg({id:'s7_cell',subj:'sci',name:'Cells & Body Systems',desc:'Cell theory, organelles, levels of organization, body systems',n:10,full:4,daily:1,gen:sciGen(S_CELL)});
const S_GEN=[
 ['Which type of reproduction produces offspring identical to the parent?','Asexual reproduction',['Sexual reproduction','Pollination','Fertilization'],'One parent gives identical offspring.'],
 ['What is a gene?','A segment of DNA that codes for a trait',['A type of cell','A kind of protein only','A body organ'],'Genes are instructions for traits.'],
 ['In a Punnett square, the cross Bb × Bb gives what fraction of offspring with bb?','1/4',['1/2','3/4','0'],'BB, Bb, Bb, bb: one in four.'],
 ['A dominant allele is one that','is expressed when present',['is always rare','is hidden always','is found only in males'],'It shows even when only one copy is present.'],
 ['Which process leads to the survival of organisms best suited to their environment?','Natural selection',['Mutation only','Artificial selection','Pollination'],'Organisms with helpful traits survive and reproduce.'],
 ['A bird with a thicker beak is better able to crack seeds and survives drought. Over time, thick beaks become more common. This shows','adaptation through natural selection',['a learned behavior','a new species forming overnight','a mutation caused by hunger'],'Helpful inherited traits become common.'],
 ['What can fossils show about the past?','How life changed over time',['The exact age of the Sun','The weather today','The future'],'Fossils are evidence of past organisms.'],
 ['Which is evidence that species share a common ancestor?','Similar bone structures',['Different diets','Different habitats','Different colors'],'Homologous structures suggest common ancestry.'],
 ['A change in DNA is called a','mutation',['adaptation','habitat','population'],'Mutations can create new traits.'],
 ['Why does sexual reproduction increase variation?','Offspring get a mix of genes from two parents.',['Offspring are clones.','Mutations never occur.','Offspring get genes from one parent.'],'Gene mixing produces variety.']
];
NJ.reg({id:'s7_gen',subj:'sci',name:'Heredity & Evolution',desc:'Genes, Punnett squares, natural selection, fossils',n:10,full:4,daily:1,gen:sciGen(S_GEN)});
const S_EARTH=[
 ['What did Alfred Wegener propose?','The continents were once joined and have moved apart.',['The Earth is flat.','Mountains do not change.','Oceans are getting smaller everywhere.'],'Continental drift.'],
 ['Which is evidence for plate tectonics?','Matching fossils on continents separated by oceans',['Weather forecasts','Tides','The color of rocks'],'Matching fossils support moving continents.'],
 ['Most earthquakes and volcanoes happen','near plate boundaries',['at the center of plates','in deserts only','only under oceans'],'Plates collide and slide there.'],
 ['Which type of boundary is formed when plates move apart?','Divergent',['Convergent','Transform','Stable'],'Divergent boundaries spread apart.'],
 ['Rock that forms from cooled magma is','igneous',['sedimentary','metamorphic','fossil'],'Igneous rock comes from molten rock.'],
 ['Sedimentary rock forms by','compaction and cementation of sediments',['melting and cooling','heat and pressure on rock','volcanic eruption'],'Layers of sediment harden.'],
 ['In undisturbed rock layers, the oldest layer is usually','at the bottom',['at the top','in the middle','the thickest'],'Law of superposition.'],
 ['What drives the movement of tectonic plates?','Convection currents in the mantle',['Ocean waves','Wind','The Moon\'s gravity'],'Heat in the mantle moves material.'],
 ['A fossil of a sea creature found on a mountain top suggests that','the area was once underwater',['the sea creature climbed','the mountain moved to the sea','the climate is warmer'],'Land was uplifted.'],
 ['Which feature forms where two continental plates collide?','Mountain range',['Rift valley','Deep ocean trench only','Island chain only'],'Colliding continental plates crumple upward.']
];
NJ.reg({id:'s7_earth',subj:'sci',name:'Plate Tectonics & Earth History',desc:'Plates, rocks, fossils, rock layers',n:10,full:4,daily:1,gen:sciGen(S_EARTH)});
const S_FORCE=[
 ['A force that does not change a moving object\'s motion means the forces are','balanced',['unbalanced','absent in all cases','accelerating'],'Balanced forces result in no change in motion.'],
 ['According to Newton\'s second law, increasing the force on an object','increases its acceleration',['decreases its mass','stops it','reduces its speed'],'F = ma.'],
 ['A 2 kg object accelerates at 3 m/s². What net force acts on it?','6 N',['1.5 N','5 N','9 N'],'F = 2 × 3 = 6.'],
 ['Which describes Newton\'s third law?','For every action there is an equal and opposite reaction.',['Objects at rest stay at rest.','Force equals mass.','Energy is conserved.'],'Forces occur in pairs.'],
 ['A car travels 150 km in 3 hours. What is its average speed?','50 km/h',['450 km/h','147 km/h','3 km/h'],'150 ÷ 3 = 50.'],
 ['Which will have the most kinetic energy?','A heavy truck moving fast',['A bike at rest','A light ball moving slowly','A parked car'],'Kinetic energy depends on mass and speed.'],
 ['A rock at the top of a cliff has','gravitational potential energy',['no energy','only thermal energy','kinetic energy only'],'Position gives stored energy.'],
 ['What happens to the gravitational force between two objects as the distance between them increases?','It decreases.',['It increases.','It stays the same.','It disappears completely.'],'Gravity weakens with distance.'],
 ['Which pair of objects exerts the strongest gravitational attraction?','Two large masses close together',['Two small masses far apart','A large and a tiny mass far apart','Two small masses close together'],'Greater mass and shorter distance give a stronger pull.'],
 ['Friction acts','in the direction opposite to motion',['in the direction of motion','upward only','only on liquids'],'Friction opposes sliding.']
];
NJ.reg({id:'s7_force',subj:'sci',name:'Forces, Motion & Energy',desc:'Newton\'s laws, speed, energy, gravity',n:10,full:4,daily:1,gen:sciGen(S_FORCE)});
function invGen(R,n){const B=[
 ['A student tests how the angle of a ramp affects the distance a toy car rolls. Which is the independent variable?','Angle of the ramp',['Distance rolled','Mass of the car','Type of floor'],'It is the variable the student changes.'],
 ['In the ramp experiment, which is the dependent variable?','Distance the car rolls',['Angle of the ramp','Type of car','Type of floor'],'It is what is measured.'],
 ['Why should only one variable be changed at a time?','So the result can be linked to that variable',['To save time','To avoid recording data','To make the graph curved'],'It keeps the test fair.'],
 ['Which is the best way to display how temperature changes over a day?','Line graph',['Pie chart','Circle graph with names','Bar chart of colors'],'Line graphs show trends over time.'],
 ['A scientist\'s results do not match the hypothesis. What should she do?','Report the results and revise the hypothesis',['Change the data','Ignore the results','Hide the experiment'],'Science follows evidence.'],
 ['Which tool is best to measure the volume of an irregular rock?','Graduated cylinder with water',['Ruler only','Balance','Thermometer'],'Water displacement measures volume.']];
 const q=mk(R,'The graph data show the temperature of water as it was heated. Which conclusion is best supported?','The temperature rose steadily as time increased.',['The temperature fell steadily.','The temperature stayed constant.','Time had no effect on temperature.'],'The values increase with time.',{pics:stbl(['Time (min)','Temp (°C)'],[[0,20],[2,32],[4,44],[6,56]])});
 return R.sample([...B.map(([a,b,c,d])=>mk(R,a,b,c,d)),q],Math.min(n,7))}
NJ.reg({id:'s7_inv',subj:'sci',name:'Investigations & Data',desc:'Variables, fair tests, graphs and conclusions',n:7,full:4,daily:1,gen:invGen});
