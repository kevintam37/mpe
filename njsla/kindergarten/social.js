const SSK1=[
 ['Who helps us when we are sick?','a doctor 🧑‍⚕️',['a baker','a mail carrier'],'Doctors help sick people.'],
 ['Who puts out fires?','a firefighter 🧑‍🚒',['a teacher','a farmer'],'Firefighters put out fires.'],
 ['Who helps you learn at school?','a teacher',['a pilot','a chef'],'Teachers help us learn.'],
 ['Who brings letters and packages?','a mail carrier',['a dentist','a driver of a train'],'Mail carriers deliver mail.'],
 ['Who grows food on a farm?','a farmer',['a police officer','a librarian'],'Farmers grow food.'],
 ['Who keeps us safe and helps in emergencies?','a police officer',['a baker','a painter'],'Police officers help keep people safe.'],
 ['What should you do when the light is red?','stop',['go','run'],'Red means stop.'],
 ['When is it okay to cross the street?','with a grown-up, when it is safe',['alone, any time','when cars are coming'],'Cross with a grown-up and look both ways.'],
 ['What is a rule?','something that tells us what to do to stay safe',['a kind of toy','a color'],'Rules help us stay safe and fair.'],
 ['Which is a good rule at school?','raise your hand to talk',['run in the halls','shout in class'],'Raising your hand is polite.'],
 ['Which is something you NEED?','food',['a new toy','candy'],'We need food, water and a home.'],
 ['Which is something you WANT but do not need?','a new toy',['water','a home'],'Toys are fun, but we do not need them to live.'],
 ['What can you say to be kind?','please and thank you',['give me that','go away'],'Kind words make friends.'],
 ['Sharing means ...','letting others use something too',['keeping it all','hiding it'],'We share to be kind.']];
NJ.reg({id:'ssk_comm',subj:'ss',name:'Me, Family & Community',desc:'Helpers, rules, safety, needs and wants, being kind',n:10,full:4,daily:1,gen:bankGen(SSK1,3)});
const SSK2=[
 ['What is a map?','a picture that shows where places are',['a kind of food','a toy car'],'A map shows places.'],
 ['Where do you live?','in a home',['in a tree always','in the sea'],'You live in a home.'],
 ['Which place is a school?','a place where we learn',['a place for flying','a place for swimming only'],'Schools are for learning.'],
 ['On a map, blue usually shows ...','water',['mountains','roads only'],'Blue is often used for water.'],
 ['Which is land?','a mountain',['an ocean','a river'],'A mountain is land.'],
 ['Which is water?','an ocean',['a hill','a desert'],'The ocean is water.'],
 ['Which is NEARER to you if the store is next door and the airport is far away?','the store',['the airport','neither'],'Next door is near.'],
 ['What do we call the place where books can be borrowed?','a library',['a bakery','a gas station'],'A library lends books.'],
 ['Where do we buy food?','a store',['a library','a park only'],'A store sells food.'],
 ['Which tool shows directions like north and south?','a compass 🧭',['a spoon','a pencil'],'A compass shows directions.'],
 ['A globe is a model of ...','the Earth',['the Moon','a ball game'],'A globe is a small model of Earth.']];
NJ.reg({id:'ssk_map',subj:'ss',name:'Maps & Places',desc:'Maps, land and water, near and far, places in town',n:10,full:3,daily:1,gen:bankGen(SSK2,3)});
const SSK3=[
 ['Which is the flag of the United States?','red, white and blue with stars and stripes',['yellow with a moon','green with a tree'],'The U.S. flag has stars and stripes.'],
 ['How many colors are on the U.S. flag?','three',['two','five'],'It is red, white and blue.'],
 ['Which bird is a symbol of the United States?','🦅 bald eagle',['🐧 penguin','🦜 parrot'],'The bald eagle is our national bird.'],
 ['In which state do we live?','New Jersey',['Florida','Hawaii'],'We live in New Jersey, the Garden State.'],
 ['What is New Jersey called?','the Garden State',['the Sunshine State','the Big Apple State'],'New Jersey is nicknamed the Garden State.'],
 ['On which holiday do we say thank you for what we have, with a big meal?','Thanksgiving 🦃',['Halloween','Valentine\'s Day'],'Thanksgiving is a day to give thanks.'],
 ['What do we celebrate on July 4th?','America\'s birthday 🎆',['the new year','a harvest'],'July 4th is Independence Day.'],
 ['Which of these happened in the PAST?','dinosaurs lived long ago',['I am eating now','I will go to sleep later'],'Long ago is the past.'],
 ['What is a president?','the leader of our country',['a kind of teacher','a baker'],'The president leads the United States.'],
 ['What do we say in the Pledge of Allegiance? We say it to the ...','flag',['clock','moon'],'We pledge to the flag.'],
 ['Which symbol is a big green lady with a torch in New York Harbor?','Statue of Liberty',['Eiffel Tower','Big Ben'],'The Statue of Liberty welcomes people to America.']];
NJ.reg({id:'ssk_us',subj:'ss',name:'Our Country, State & Holidays',desc:'Flag, symbols, New Jersey, holidays, past and present',n:10,full:3,daily:1,gen:bankGen(SSK3,3)});
