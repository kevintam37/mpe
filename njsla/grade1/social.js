const SS1A=[
 ['Why do we have rules?','to keep us safe and treat everyone fairly',['to be bossy','to have no fun'],'Rules help everyone get along.'],
 ['Who makes the rules for a town or city?','the mayor and the town leaders',['the children only','the dogs'],'Leaders make laws for a community.'],
 ['What is a community?','a group of people who live and work in the same place',['a type of food','a game'],'A community is people in the same place.'],
 ['Which is a good citizen action?','picking up litter',['yelling at people','breaking things'],'Good citizens help their community.'],
 ['Who delivers the mail?','mail carrier',['firefighter','dentist'],'Mail carriers bring letters.'],
 ['What is a job?','work that people do to earn money',['a toy','a holiday'],'People work at jobs.'],
 ['Which is a SERVICE?','a haircut',['a banana','a toy car'],'A service is work someone does for you.'],
 ['Which is a GOOD (something you can buy)?','a pair of shoes',['a haircut','a ride on a bus'],'Goods are things you can touch.'],
 ['Which is a NEED?','water',['a video game','a bicycle'],'We need water to live.'],
 ['What can you do to solve a problem with a friend?','talk it out kindly',['yell','walk away forever'],'Talking kindly solves problems.'],
 ['Which person helps keep us safe on the road?','a crossing guard',['a baker','a painter'],'Crossing guards help us cross safely.'],
 ['What do we call a person who is chosen to lead a country?','president',['teacher','mail carrier'],'The president leads the United States.']];
NJ.reg({id:'ss1_comm',subj:'ss',name:'Community, Rules & Jobs',desc:'Rules, good citizens, jobs, goods and services, needs and wants',n:10,full:4,daily:2,gen:bankGen(SS1A,3)});
const SS1B=[
 ['What does a map show?','where places are',['how loud a place is','what time it is'],'A map shows where places are.'],
 ['Which tool shows the whole Earth as a ball?','a globe',['a ruler','a clock'],'A globe is a model of Earth.'],
 ['On a map, the compass rose shows ...','directions',['sizes of animals','the weather'],'It shows north, south, east and west.'],
 ['Which direction is the opposite of NORTH?','south',['east','up'],'North and south are opposites.'],
 ['Which direction is the opposite of EAST?','west',['north','south'],'East and west are opposites.'],
 ['Which of these is a landform?','a mountain',['a car','a school'],'Mountains are landforms.'],
 ['Which of these is a body of water?','an ocean',['a hill','a valley'],'The ocean is water.'],
 ['What is the name of the country we live in?','the United States of America',['Canada','Mexico'],'We live in the United States.'],
 ['How many oceans are shown on most globes?','five',['two','twelve'],'The five oceans are Pacific, Atlantic, Indian, Southern and Arctic.'],
 ['Which is the capital of New Jersey?','Trenton',['Newark','Princeton'],'Trenton is the capital of New Jersey.'],
 ['New Jersey is on which coast of the United States?','the East Coast',['the West Coast','the middle'],'New Jersey is on the Atlantic Ocean.'],
 ['Which place is NEARER to your home?','the store next door',['a city far away','the Moon'],'Next door is very near.']];
NJ.reg({id:'ss1_map',subj:'ss',name:'Maps, Land & Water',desc:'Maps and globes, directions, landforms, oceans, New Jersey',n:10,full:3,daily:1,gen:bankGen(SS1B,3)});
const SS1C=[
 ['Who was the first president of the United States?','George Washington',['Abraham Lincoln','Martin Luther King Jr.'],'George Washington was the first president.'],
 ['Who led the fight for fair treatment of all people with peaceful speeches in the 1960s?','Martin Luther King Jr.',['George Washington','Thomas Edison'],'Dr. King worked for fairness and peace.'],
 ['What do we call a long time ago?','the past',['the future','today'],'The past is before now.'],
 ['What day comes after TODAY?','tomorrow',['yesterday','last week'],'Tomorrow is the next day.'],
 ['Which is something from LONG AGO?','a horse and buggy',['a smart phone','a rocket ship'],'Horse and buggies were used long ago.'],
 ['What does the Statue of Liberty stand for?','freedom',['a big meal','a sports team'],'The Statue of Liberty is a symbol of freedom.'],
 ['On which holiday do we remember Martin Luther King Jr.?','Martin Luther King Jr. Day',['Halloween','Earth Day'],'We honor Dr. King each January.'],
 ['What do the stripes on the U.S. flag stand for?','the first 13 states',['50 states','the colors of the rainbow'],'There are 13 stripes for the first 13 colonies.'],
 ['What do the stars on the U.S. flag stand for?','the 50 states',['13 states','the days of the week'],'Each of the 50 stars stands for one state.'],
 ['Which of these is the national bird?','bald eagle',['robin','owl'],'The bald eagle is our national bird.'],
 ['What is the bird of New Jersey?','the Eastern goldfinch',['the bald eagle','the cardinal'],'The Eastern goldfinch is the state bird of New Jersey.'],
 ['What is the state flower of New Jersey?','the common meadow violet',['the rose','the sunflower'],'The common meadow violet is the state flower.']];
NJ.reg({id:'ss1_us',subj:'ss',name:'Our Country, Past & Present',desc:'Flag, symbols, famous Americans, then and now, New Jersey symbols',n:10,full:4,daily:2,gen:bankGen(SS1C,3)});
