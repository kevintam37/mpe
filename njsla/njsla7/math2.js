/* ===== 7th grade MATH part 2: geometry, probability, statistics ===== */
/* ---------- Scale drawings, angles, triangles ---------- */
function scSc(R){const s=R.int(2,10),u=R.pick(['cm','in.']),m=R.pick(['km','miles','feet','meters']),L=R.int(2,12),t=R.int(1,2);
 if(t===1)return numQ(R,`On a map, 1 ${u} represents ${s*5} ${m}. Two towns are ${L} ${u} apart on the map. What is the actual distance in ${m}?`,L*s*5,[L+s*5,L*s,s*5],`${L} × ${s*5} = ${L*s*5}.`);
 return numQ(R,`A scale drawing uses 1 ${u} for every ${s} ${m}. A road is ${s*L} ${m} long. How long is the road in the drawing, in ${u==='in.'?'inches':'centimeters'}?`,L,[s*L*s,s*L-s,L+s],`${s*L} ÷ ${s} = ${L}.`)}
function scArea(R){const k=R.int(2,5),l=R.int(2,8),w=R.int(2,6);return numQ(R,`A rectangle is ${l} cm by ${w} cm. A scale drawing enlarges each side by a scale factor of ${k}. What is the area of the enlarged rectangle in square centimeters?`,l*w*k*k,[l*w*k,(l+w)*k*2,l*w+k],`New sides: ${l*k} and ${w*k}. Area = ${l*k} × ${w*k} = ${l*w*k*k}.`)}
function anCS(R){const a=R.int(15,75),t=R.int(1,3);
 if(t===1)return numQ(R,`Two angles are complementary. One angle measures ${a}°. What is the measure of the other angle, in degrees?`,90-a,[180-a,a,90+a],`Complementary angles add to 90°: 90 − ${a} = ${90-a}.`);
 if(t===2)return numQ(R,`Two angles are supplementary. One angle measures ${a+30}°. What is the measure of the other angle, in degrees?`,150-a,[90-a,a+30,180+a],`Supplementary angles add to 180°: 180 − ${a+30} = ${150-a}.`);
 return numQ(R,`Two lines intersect, forming vertical angles. One angle is ${a}°. What is the measure of the vertical angle, in degrees?`,a,[180-a,90-a,2*a],`Vertical angles are congruent.`)}
function trCond(R){const a=R.int(3,9),b=R.int(3,9),c=R.int(2,a+b-1),t=R.int(1,2);
 if(t===1){return mk(R,`Which set of side lengths can form a triangle?`,`${a}, ${b}, ${c}`,[`${a}, ${b}, ${a+b}`,`${a}, ${b}, ${a+b+2}`,`${a}, ${a}, ${2*a+1}`],`The sum of any two sides must be greater than the third side.`)}
 const A=R.int(30,80),B=R.int(30,70);return numQ(R,`A triangle has angles of ${A}° and ${B}°. What is the measure of the third angle, in degrees?`,180-A-B,[A+B,180-A,90-B],`Angles of a triangle add to 180°: 180 − ${A} − ${B} = ${180-A-B}.`)}
function trUnique(R){const B=[['Which information guarantees exactly one triangle?','Side lengths 4, 5, and 6',['Angles 40°, 60°, and 80°','Two sides, 3 and 4, with no angle given','Angles 30° and 60° only'],'Three side lengths that satisfy the triangle inequality determine one triangle.'],
 ['Which set of angles does NOT form a triangle?','50°, 60°, 80°',['60°, 60°, 60°','30°, 60°, 90°','40°, 70°, 70°'],'Angles must sum to 180°, and 50 + 60 + 80 = 190.'],
 ['Slicing a rectangular prism parallel to its base gives a cross section shaped like a','rectangle',['circle','triangle','trapezoid'],'A slice parallel to the base matches the base.'],
 ['A plane slices a cylinder parallel to its circular base. What is the cross section?','circle',['rectangle','triangle','oval-shaped trapezoid'],'It is congruent to the base.'],
 ['A plane slices a rectangular pyramid parallel to its base. What is the cross section?','rectangle',['triangle','circle','hexagon'],'It is similar to the base.']];return mk(R,...R.pick(B))}
NJ.reg({id:'m7_geo1',subj:'math',name:'Scale Drawings, Angles & Triangles',desc:'Scale factors, angle pairs, triangle rules, cross sections',n:10,full:4,daily:2,gen:topicGen([scSc,scSc,scArea,anCS,anCS,trCond,trUnique])});

/* ---------- Circles, area, surface area, volume ---------- */
function ciC(R){const r=R.int(2,15),t=R.int(1,4);
 if(t===1)return numQ(R,`A circle has a radius of ${r} cm. What is its circumference? Use 3.14 for π. (Answer in cm)`,rd(2*3.14*r),[rd(3.14*r*r),rd(3.14*r),2*r],`C = 2πr = 2 × 3.14 × ${r} = ${fmtN(rd(2*3.14*r))}.`,{step:1});
 if(t===2)return numQ(R,`A circle has a radius of ${r} m. What is its area? Use 3.14 for π. (Answer in square meters)`,rd(3.14*r*r),[rd(2*3.14*r),rd(3.14*2*r*r),r*r],`A = πr² = 3.14 × ${r}² = ${fmtN(rd(3.14*r*r))}.`,{step:1});
 if(t===3)return numQ(R,`A circle has a diameter of ${2*r} in. What is its circumference? Use 3.14 for π. (Answer in inches)`,rd(3.14*2*r),[rd(3.14*r),rd(3.14*r*r),rd(3.14*2*r*2*r)],`C = πd = 3.14 × ${2*r} = ${fmtN(rd(3.14*2*r))}.`,{step:1});
 const C=rd(2*3.14*r);return numQ(R,`The circumference of a circle is ${fmtN(C)} cm. What is its radius? Use 3.14 for π. (Answer in cm)`,r,[2*r,C/3.14,r*r],`r = C ÷ (2π) = ${fmtN(C)} ÷ 6.28 = ${r}.`)}
function ciSemi(R){const r=R.pick([2,4,6,8,10]);return numQ(R,`What is the area of a semicircle with radius ${r} cm? Use 3.14 for π. (Answer in square centimeters)`,rd(3.14*r*r/2),[rd(3.14*r*r),rd(3.14*r),rd(3.14*r+2*r)],`Half of πr²: 3.14 × ${r*r} ÷ 2 = ${fmtN(rd(3.14*r*r/2))}.`,{step:1})}
function arComp(R){const l=R.int(5,14),w=R.int(3,9),s=R.int(1,Math.min(w,l)-1),t=R.int(1,2);
 if(t===1)return numQ(R,`A rectangular garden is ${l} m by ${w} m. A square ${s} m by ${s} m is removed for a patio. What is the area of the garden that is left, in square meters?`,l*w-s*s,[l*w+s*s,l*w,l*w-s],`${l} × ${w} − ${s} × ${s} = ${l*w-s*s}.`);
 const h=R.int(2,8),b=R.int(2,10);if(b*h%2)return null;return numQ(R,`A figure is made of a ${l} cm by ${w} cm rectangle and a triangle with base ${l} cm and height ${h} cm on top of the rectangle. What is the total area in square centimeters?`,l*w+l*h/2,[l*w+l*h,l*w,l*h/2],`Rectangle ${l*w} + triangle ${l*h/2} = ${l*w+l*h/2}.`,{step:.5})}
function vlPr(R){const l=R.int(2,10),w=R.int(2,8),h=R.int(2,9),t=R.int(1,3);
 if(t===1)return numQ(R,`A rectangular prism is ${l} cm long, ${w} cm wide, and ${h} cm tall. What is its volume in cubic centimeters?`,l*w*h,[l+w+h,2*(l*w+l*h+w*h),l*w],`V = lwh = ${l*w*h}.`);
 if(t===2){const B=R.int(10,60);return numQ(R,`A prism has a base area of ${B} square units and a height of ${h} units. What is its volume in cubic units?`,B*h,[B+h,B*h/2,2*B*h],`V = Bh = ${B} × ${h} = ${B*h}.`)}
 const b=R.int(3,10),ht=R.int(2,8),H=R.int(3,12);if(b*ht%2)return null;return numQ(R,`A triangular prism has a triangular base with base ${b} cm and height ${ht} cm. The prism is ${H} cm long. What is its volume in cubic centimeters?`,b*ht/2*H,[b*ht*H,b*ht/2+H,(b+ht)*H],`Base area = ½ × ${b} × ${ht} = ${b*ht/2}; V = ${b*ht/2} × ${H} = ${b*ht/2*H}.`,{step:1})}
function saPr(R){const l=R.int(2,9),w=R.int(2,8),h=R.int(2,8);if(l===w||w===h)return null;return numQ(R,`A rectangular prism is ${l} in. long, ${w} in. wide, and ${h} in. tall. What is its surface area in square inches?`,2*(l*w+l*h+w*h),[l*w*h,2*l*w+2*l*h,l*w+l*h+w*h],`SA = 2(lw + lh + wh) = 2(${l*w} + ${l*h} + ${w*h}) = ${2*(l*w+l*h+w*h)}.`)}
function vlWord(R){const l=R.int(3,8),w=R.int(3,6),V=l*w*R.int(2,6),h=V/(l*w);return numQ(R,`A fish tank has a base of ${l} dm by ${w} dm and holds ${V} liters of water (${V} cubic decimeters) when full. How tall is the tank in decimeters?`,h,[V-l*w,l+w,V/l],`V = lwh, so h = ${V} ÷ ${l*w} = ${h}.`)}
NJ.reg({id:'m7_geo2',subj:'math',name:'Circles, Area & Volume',desc:'Circumference, area of circles, composite figures, prisms, surface area',n:10,full:4,daily:2,gen:topicGen([ciC,ciC,ciSemi,arComp,vlPr,vlPr,saPr,vlWord])});

/* ---------- Probability ---------- */
function pbSimple(R){const r=R.int(2,8),b=R.int(2,8),g=R.int(1,6),tot=r+b+g,t=R.int(1,3);if(t===1)return fracQ(R,`A bag has ${r} red, ${b} blue, and ${g} green marbles. What is the probability of picking a red marble?`,fr(r,tot),[fr(r,b+g),fr(b,tot),fr(tot-r,tot)],`P(red) = ${r}/${tot}.`);
 if(t===2)return fracQ(R,`A bag has ${r} red, ${b} blue, and ${g} green marbles. What is the probability of NOT picking a blue marble?`,fr(tot-b,tot),[fr(b,tot),fr(r,tot),fr(tot-b,b)],`1 − ${b}/${tot} = ${fT(fr(tot-b,tot))}.`);
 return mk(R,`Which probability describes an event that is certain to happen?`,'1',['0','1/2','0.9'],'A certain event has probability 1.')}
function pbComp(R){const a=R.pick([2,3,4,5,6]),b=R.pick([2,3,4,6]),ans=fr(1,a*b);
 return fracQ(R,`Spinner A has ${a} equal sections numbered 1 to ${a}. Spinner B has ${b} equal sections numbered 1 to ${b}. What is the probability of getting a 1 on both spinners?`,ans,[fr(1,a+b),fr(2,a*b),fr(1,a)],`Multiply: 1/${a} × 1/${b} = 1/${a*b}.`)}
function pbSpace(R){const a=R.int(2,5),b=R.int(2,5),c=R.int(2,4);return numQ(R,`A lunch menu has ${a} sandwiches, ${b} drinks, and ${c} desserts. How many different lunches have one of each?`,a*b*c,[a+b+c,a*b,a*b+c],`${a} × ${b} × ${c} = ${a*b*c}.`)}
function pbExp(R){const n=R.pick([20,40,50,100]),p=R.pick([[1,2],[1,4],[1,5],[3,4],[1,10]]),ans=n*p[0]/p[1];if(!Number.isInteger(ans))return null;
 return numQ(R,`The probability of rain on any given day is ${fT(p)}. About how many rainy days would you expect in ${n} days?`,ans,[n-ans,n,ans+10],`${fT(p)} × ${n} = ${ans}.`)}
function pbExper(R){const n=R.pick([20,40,50]),k=R.int(5,n-5),m=R.pick([100,200,300]);if((k*m)%n)return null;
 return numQ(R,`${R.pick(NM7)} spun a spinner ${n} times and it landed on blue ${k} times. Based on these results, how many times would you expect blue in ${m} spins?`,k*m/n,[k,m-k,k*m/n+10],`Experimental probability ${k}/${n}; ${k}/${n} × ${m} = ${k*m/n}.`)}
function pbCompare(R){const B=[['A number cube is rolled. Which event is most likely?','Rolling a number less than 5',['Rolling a 6','Rolling an even number greater than 4','Rolling a 1 or 2'],'P(<5) = 4/6 is the greatest.'],
 ['Which probability best describes an unlikely event?','0.1',['0.5','0.75','1'],'Unlikely events are closer to 0.'],
 ['A coin is flipped 3 times. How many outcomes are in the sample space?','8',['3','6','9'],'2 × 2 × 2 = 8.']];return mk(R,...R.pick(B))}
NJ.reg({id:'m7_prob',subj:'math',name:'Probability',desc:'Simple and compound events, sample spaces, experimental vs. theoretical',n:10,full:4,daily:2,gen:topicGen([pbSimple,pbSimple,pbComp,pbSpace,pbExp,pbExper,pbCompare])});

/* ---------- Statistics: sampling, comparing populations ---------- */
function ssSamp(R){const B=[['A school wants to know which lunch students prefer. Which sample is most likely to represent all students?','Ask 50 students chosen at random from the school list',['Ask the 10 students in the lunch line first','Ask only the soccer team','Ask the principal'],'A random sample is most representative.'],
 ['Which sample is biased?','Surveying only people at a basketball game about their favorite sport',['Picking names randomly from a phone book','Choosing every 10th student on a roster','Using a computer to select 100 students'],'The sample excludes people who do not attend games.'],
 ['A random sample of 40 students found that 10 prefer pizza. About how many of 600 students would you predict prefer pizza?','150',['10','60','240'],'10/40 × 600 = 150.'],
 ['Why is a larger random sample generally better?','It better represents the population.',['It is cheaper.','It is always biased.','It removes all errors.'],'Larger samples reduce variability.']];return mk(R,...R.pick(B))}
function ssPred(R){const n=R.pick([20,25,40,50]),k=R.int(3,n-3),N=R.pick([200,400,500,1000]);if((k*N)%n)return null;return numQ(R,`In a random sample of ${n} students, ${k} walk to school. About how many of the ${N} students in the school walk?`,k*N/n,[k,N-k*N/n,k*N/n+50],`${k}/${n} × ${N} = ${k*N/n}.`)}
function ssMean(R){const a=R.int(10,30),d=R.int(2,6),A=[a,a+1,a+2,a+3,a+4].map(x=>x),B=[a+d,a+d+1,a+d+2,a+d+3,a+d+4];
 return numQ(R,`Team A scores: ${A.join(', ')}. Team B scores: ${B.join(', ')}. How much greater is the mean score of Team B than Team A?`,d,[d+1,d-1>0?d-1:d+2,A[2]],`Both sets have the same spread, and each Team B score is ${d} more, so the means differ by ${d}.`)}
function ssBox(R){const mn=R.int(2,10),q1=mn+R.int(3,8),md=q1+R.int(2,6),q3=md+R.int(3,8),mx=q3+R.int(2,8),mn2=mn+R.int(1,6),q12=q1+R.int(1,6),md2=md+R.int(2,8),q32=q3+R.int(1,6),mx2=mx+R.int(1,6),hi=Math.ceil((mx2+2)/5)*5,iq=q3-q1,iq2=q32-q12;
 return numQ(R,`The box plots show the scores of two classes. How much greater is the median of Class B than Class A?`,md2-md,[q32-q3,md,md2],`Median A = ${md}, median B = ${md2}. Difference = ${md2-md}.`,{pics:boxSVG(mn,q1,md,q3,mx,0,hi,'Class A')+boxSVG(mn2,q12,md2,q32,mx2,0,hi,'Class B')})}
function ssMAD(R){const m=R.int(8,16),A=[m-2,m-1,m,m+1,m+2],B=[m-4,m-2,m,m+2,m+4];return mk(R,`Data set A: ${A.join(', ')}. Data set B: ${B.join(', ')}. Both have a mean of ${m}. Which statement is true?`,'Data set B has greater variability.',['Data set A has greater variability.','The data sets have the same variability.','Data set A has a greater mean.'],`The values in B are farther from ${m} on average (MAD 2.4 vs 1.2).`)}
function ssMed(R){const a=[R.int(3,9),R.int(10,20),R.int(21,30)],ans=a[1];return mk(R,`Which measure of center is best to describe a data set with an outlier?`,'Median',['Mean','Range','Sum'],'The median is not affected much by an outlier.')}
NJ.reg({id:'m7_stat',subj:'math',name:'Sampling & Comparing Data',desc:'Random samples, predictions, comparing data sets, box plots, variability',n:10,full:4,daily:2,gen:topicGen([ssSamp,ssPred,ssPred,ssMean,ssBox,ssMAD,ssMed])});
