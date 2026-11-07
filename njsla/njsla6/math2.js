/* ===== 6th grade MATH, part 2: equations, geometry, statistics ===== */
/* ---------- Equations & inequalities ---------- */
function eqOne(R){const x=R.int(2,25),t=R.int(1,4),a=R.int(2,12);
 if(t===1)return numQ(R,`Solve for x: x + ${a} = ${x+a}`,x,[x+a+a,a,x-a>0?x-a:x+1],`Subtract ${a} from both sides: x = ${x}.`);
 if(t===2)return numQ(R,`Solve for x: x − ${a} = ${x}`,x+a,[x-a>0?x-a:x+1,a,x],`Add ${a} to both sides: x = ${x+a}.`);
 if(t===3)return numQ(R,`Solve for x: ${a}x = ${a*x}`,x,[a*x-a,a,a*x],`Divide both sides by ${a}: x = ${x}.`);
 return numQ(R,`Solve for x: x ÷ ${a} = ${x}`,x*a,[x+a,x,x/a],`Multiply both sides by ${a}: x = ${x*a}.`)}
function eqWrite(R){const a=R.int(3,12),b=R.int(2,9),p=a*b,nm=R.pick(NM6),t=R.int(1,3);
 if(t===1)return mk(R,`${nm} has some stickers and gets ${a} more. Now ${nm} has ${a+p}. Which equation can be used to find s, the number ${nm} started with?`,`s + ${a} = ${a+p}`,[`s − ${a} = ${a+p}`,`${a}s = ${a+p}`,`s + ${a+p} = ${a}`],`Start + more = total.`);
 if(t===2)return mk(R,`${b} friends equally share the cost of a gift that costs $${p}. Which equation finds c, the cost per friend?`,`${b}c = ${p}`,[`c + ${b} = ${p}`,`c ÷ ${b} = ${p}`,`${p}c = ${b}`],`${b} shares of c dollars make $${p}: ${b}c = ${p}.`);
 return mk(R,`A rope is ${p} feet long. A piece ${a} feet long is cut off. Which equation finds r, the length left?`,`${p} − ${a} = r`,[`${p} + ${a} = r`,`${a} − ${p} = r`,`${p}r = ${a}`],`Total − cut = left.`)}
function ineqSol(R){const n=R.int(3,15),t=R.int(1,4),sym=['>','≥','<','≤'][t-1],ok=t===1?n+R.int(1,5):t===2?n:t===3?n-R.int(1,5):n,bad=t===1?[n,n-1,n-3]:t===2?[n-1,n-2,n-5]:t===3?[n,n+1,n+3]:[n+1,n+2,n+5];
 return mk(R,`Which value is a solution of x ${sym} ${n}?`,String(ok),bad.map(String),`${ok} makes x ${sym} ${n} true; the others do not.`)}
function ineqGraph(R){const n=R.int(-4,4),open=R.f()<.5,dir=R.pick([1,-1]),sym=dir>0?(open?'>':'≥'):(open?'<':'≤');
 const ok=`x ${sym} ${sg(n)}`,bad=[`x ${dir>0?(open?'≥':'>'):(open?'≤':'<')} ${sg(n)}`,`x ${dir>0?(open?'<':'≤'):(open?'>':'≥')} ${sg(n)}`,`x ${sym} ${sg(-n)}`].filter(x=>x!==ok);
 if(new Set(bad).size<3)return null;return mk(R,`Which inequality is shown on the number line?`,ok,bad,`${open?'An open':'A closed'} circle means ${open?'not included':'included'}, and the ray points ${dir>0?'right (greater)':'left (less)'}.`,{pics:nlineSVG(-6,6,1,[{v:n,open,ray:dir}])})}
function ineqWord(R){const n=R.int(2,12)*5,nm=R.pick(NM6),t=R.int(1,2);
 if(t===1)return mk(R,`${nm} needs at least $${n} to buy a bike. Which inequality shows the amount of money m ${nm} needs?`,`m ≥ ${n}`,[`m ≤ ${n}`,`m > ${n}`,`m < ${n}`],`"At least" means greater than or equal to.`);
 return mk(R,`An elevator can hold at most ${n} pounds. Which inequality shows the weight w it can hold?`,`w ≤ ${n}`,[`w ≥ ${n}`,`w < ${n}`,`w > ${n}`],`"At most" means less than or equal to.`)}
function eqVars(R){const k=R.int(2,9),t=R.int(1,2);
 if(t===1)return mk(R,`A car travels at a steady ${k*10} miles per hour. The equation d = ${k*10}t gives the distance d after t hours. Which variable is the independent variable?`,'t (time)',['d (distance)','Both','Neither'],`The independent variable is the one you choose; the distance depends on the time.`);
 const ins=[1,2,3,4];return mk(R,`The table shows x and y. Which equation matches the table?`,`y = ${k}x`,[`y = x + ${k}`,`y = ${k+1}x`,`y = x + ${k+1}`],`In each row, y is ${k} times x.`,{pics:TBL(['x','y'],ins.map(i=>[i,k*i]))})}
function eqTable(R){const k=R.int(2,9),c=R.int(1,9);const x=R.int(5,9);
 return numQ(R,`The equation y = ${k}x + ${c} shows the cost y of x items. What is y when x = ${x}?`,k*x+c,[k+x+c,k*(x+c),k*x-c],`${k} × ${x} + ${c} = ${k*x+c}.`)}
NJ.reg({id:'m6_eq',subj:'math',name:'Equations & Inequalities',desc:'One-step equations, writing equations, inequalities on a number line',n:10,full:4,daily:2,gen:topicGen([eqOne,eqOne,eqWrite,ineqSol,ineqGraph,ineqWord,eqVars,eqTable])});

/* ---------- Geometry: area, surface area, volume ---------- */
function geTri(R){const b=R.int(4,20),h=R.int(3,14),u=R.pick(['cm','m','in.','ft']),a=b*h/2;if(b*h%2)return null;
 return numQ(R,`What is the area of the triangle in square units (${u}²)?`,a,[b*h,b+h,a+b],`Area = ½ × base × height = ½ × ${b} × ${h} = ${a}.`,{pics:triSVG(b,h,u)})}
function geTri2(R){const b=R.int(4,16),h=R.int(3,12),a=b*h/2;if(b*h%2)return null;return mk(R,`A triangle has a base of ${b} units and a height of ${h} units. Which expression gives its area?`,`½ × ${b} × ${h}`,[`${b} × ${h}`,`${b} + ${h}`,`2 × (${b} + ${h})`],`The area of a triangle is half of base times height.`)}
function gePar(R){const b=R.int(4,16),h=R.int(3,12);return numQ(R,`A parallelogram has a base of ${b} cm and a height of ${h} cm. What is its area in square centimeters?`,b*h,[b+h,b*h/2,2*(b+h)],`Area of a parallelogram = base × height = ${b*h}.`)}
function geComp(R){const l=R.int(6,14),w=R.int(4,9),b=w,h=R.int(2,8);if(b*h%2)return null;return numQ(R,`A figure is made of a ${l} m by ${w} m rectangle with a triangle on one side. The triangle has a base of ${b} m (the side of the rectangle) and a height of ${h} m. What is the total area in square meters?`,l*w+b*h/2,[l*w+b*h,l*w,b*h/2],`Rectangle: ${l} × ${w} = ${l*w}. Triangle: ½ × ${b} × ${h} = ${b*h/2}. Total = ${l*w+b*h/2}.`)}
function gePoly(R){const x=R.int(-5,0),y=R.int(-4,0),w=R.int(2,5),h=R.int(2,4),P=[[x,y],[x+w,y],[x+w,y+h],[x,y+h]],t=R.int(1,2);
 return numQ(R,`The rectangle has vertices at (${sg(x)}, ${sg(y)}), (${sg(x+w)}, ${sg(y)}), (${sg(x+w)}, ${sg(y+h)}), and (${sg(x)}, ${sg(y+h)}). What is its ${t===1?'area':'perimeter'}?`,t===1?w*h:2*(w+h),t===1?[w+h,2*(w+h),w*h+w]:[w*h,w+h,2*w+h],t===1?`Length ${w} × width ${h} = ${w*h}.`:`2 × (${w} + ${h}) = ${2*(w+h)}.`,{pics:planeSVG({r:6,polys:[{pts:P}]})})}
function geVol(R){const a=[R.int(1,3),R.pick([2,3,4])],b=[R.int(1,3),R.pick([2,3,4])],c=R.int(2,6);if(a[0]>=a[1]||b[0]>=b[1])return null;const v=fmul(fmul(a,b),[c,1]);
 return fracQ(R,`A rectangular prism has a length of ${fT(a)} ft, a width of ${fT(b)} ft, and a height of ${c} ft. What is its volume in cubic feet?`,v,[fadd(fmul(a,b),[c,1]),fmul(a,b)],`V = l × w × h = ${fT(a)} × ${fT(b)} × ${c} = ${fT(v)}.`)}
function geSA(R){const l=R.int(2,9),w=R.int(2,8),h=R.int(2,8),t=R.int(1,2);
 if(t===1){const s=R.int(2,9);return numQ(R,`A cube has edges of ${s} cm. What is its surface area in square centimeters?`,6*s*s,[s*s,4*s*s,s*s*s,12*s],`A cube has 6 faces, each ${s}² = ${s*s}: 6 × ${s*s} = ${6*s*s}.`)}
 if(l===w)return null;return numQ(R,`A rectangular prism is ${l} in. long, ${w} in. wide, and ${h} in. tall. What is its surface area in square inches?`,2*(l*w+l*h+w*h),[l*w*h,l*w+l*h+w*h,2*l*w],`2(lw + lh + wh) = 2(${l*w} + ${l*h} + ${w*h}) = ${2*(l*w+l*h+w*h)}.`)}
function geNet(R){const B=[['Which solid can be made from a net of 6 identical squares?','cube',['pyramid','cylinder','triangular prism'],'Six congruent squares fold into a cube.'],['Which solid has a net made of 4 triangles?','triangular pyramid',['cube','cone','rectangular prism'],'A triangular pyramid has 4 triangular faces.'],['How many faces does a rectangular prism have?','6',['4','8','12'],'A rectangular prism has 6 rectangular faces.'],['A net of a triangular prism includes how many triangles?','2',['1','3','4'],'A triangular prism has two triangular bases.']];return mk(R,...R.pick(B).slice(0,4))}
NJ.reg({id:'m6_geo',subj:'math',name:'Area, Surface Area & Volume',desc:'Triangles, parallelograms, polygons on the plane, volume with fractions, nets',n:10,full:4,daily:2,gen:topicGen([geTri,geTri,geTri2,gePar,geComp,gePoly,geVol,geSA,geNet])});

/* ---------- Statistics ---------- */
function stMean(R){const n=R.int(4,6),m=R.int(4,20),v=[];let tot=0;for(let i=0;i<n-1;i++){const x=R.int(Math.max(1,m-6),m+6);v.push(x);tot+=x}const last=m*n-tot;if(last<1||last>40)return null;v.push(last);const sh=R.shuffle(v);
 return numQ(R,`What is the mean of the data set?\n${sh.join(', ')}`,m,[Math.round(m)+1,Math.max(...v)-Math.min(...v),v.slice().sort((a,b)=>a-b)[Math.floor(n/2)]].filter(x=>x!==m),`Add the values and divide by ${n}: ${m*n} ÷ ${n} = ${m}.`)}
function stMedian(R){const n=R.pick([5,7,6,8]),v=[];for(let i=0;i<n;i++)v.push(R.int(2,40));const s=v.slice().sort((a,b)=>a-b),med=n%2?s[(n-1)/2]:(s[n/2-1]+s[n/2])/2;
 return numQ(R,`What is the median of the data set?\n${R.shuffle(v).join(', ')}`,med,[v.reduce((a,b)=>a+b,0)/n|0,s[n-1]-s[0],s[0]],`Order the values: ${s.join(', ')}. The middle ${n%2?'value gives':'values give'} ${fmtN(med)}.`,{step:.5})}
function stMode(R){const m=R.int(3,20),v=[m,m,m,R.int(1,25),R.int(1,25),R.int(1,25)];if(v.filter(x=>x===m).length>3)return null;const c={};v.forEach(x=>c[x]=(c[x]||0)+1);if(Object.values(c).filter(x=>x>=3).length!==1)return null;
 return numQ(R,`What is the mode of the data set?\n${R.shuffle(v).join(', ')}`,m,[Math.max(...v),Math.min(...v),Math.round(v.reduce((a,b)=>a+b,0)/6)].filter(x=>x!==m),`The mode is the value that appears most often: ${m}.`)}
function stRange(R){const v=[];for(let i=0;i<6;i++)v.push(R.int(5,60));const r=Math.max(...v)-Math.min(...v);return numQ(R,`What is the range of the data set?\n${v.join(', ')}`,r,[Math.max(...v),Math.min(...v),r+1],`Range = greatest − least = ${Math.max(...v)} − ${Math.min(...v)} = ${r}.`)}
function stQ(R){const B=[['Which is a statistical question?','How many hours do students in our school sleep each night?',['How old is my teacher?','What is 7 × 8?','What time is it now?'],'A statistical question expects different answers that vary.'],
 ['Which is NOT a statistical question?','How many minutes long is today\'s math class?',['How many pets do the students in my grade have?','How tall are the students in our class?','How long do students in my school spend on homework?'],'This one has just one answer.'],
 ['Which measure of center is best for a data set with one extremely large value?','Median',['Mean','Range','Maximum'],'The median is not pulled by extreme values.'],
 ['What does the mean absolute deviation (MAD) describe?','How spread out the data values are',['The most common value','The middle value','The total of the data'],'MAD is the average distance of values from the mean.']];return mk(R,...R.pick(B).slice(0,4))}
function stDot(R){const v=[];const n=R.int(8,12);for(let i=0;i<n;i++)v.push(R.int(1,8));const pic=dotSVG(v,1,8,'number of books read'),t=R.int(1,3),s=v.slice().sort((a,b)=>a-b);
 if(t===1){const x=R.int(2,7),cnt=v.filter(y=>y>x).length;return numQ(R,`The dot plot shows the number of books students read. How many students read more than ${x} books?`,cnt,[cnt+1,cnt-1>=0?cnt-1:cnt+2,v.filter(y=>y>=x).length].filter(y=>y!==cnt),`Count the dots to the right of ${x}: ${cnt}.`,{pics:pic})}
 if(t===2){const c={};v.forEach(y=>c[y]=(c[y]||0)+1);const mx=Math.max(...Object.values(c));const modes=Object.keys(c).filter(k=>c[k]===mx);if(modes.length!==1)return null;return numQ(R,`The dot plot shows the number of books students read. What is the mode?`,+modes[0],[Math.max(...v),Math.min(...v),+modes[0]+1],`The tallest stack of dots is at ${modes[0]}.`,{pics:pic})}
 return numQ(R,`The dot plot shows the number of books students read. How many students were surveyed?`,n,[n+1,n-1,Math.max(...v)],`Count every dot: ${n}.`,{pics:pic})}
function stHist(R){const bins=['0–9','10–19','20–29','30–39','40–49'],c=bins.map(()=>R.int(1,8)),t=R.int(1,3),pic=histSVG(bins,c,'Minutes of practice');
 if(t===1){const i=R.int(0,4);return numQ(R,`The histogram shows how many minutes students practiced. How many students practiced ${bins[i]} minutes?`,c[i],[c[i]+1,c[i]-1>=0?c[i]-1:c[i]+2,c.reduce((a,b)=>a+b,0)].filter(x=>x!==c[i]),`Read the height of the ${bins[i]} bar: ${c[i]}.`,{pics:pic})}
 if(t===2){const mx=Math.max(...c);if(c.filter(x=>x===mx).length>1)return null;return mk(R,`The histogram shows how many minutes students practiced. Which interval has the most students?`,bins[c.indexOf(mx)],bins.filter((b,i)=>i!==c.indexOf(mx)).slice(0,3),`The tallest bar is ${bins[c.indexOf(mx)]}.`,{pics:pic})}
 const tot=c.reduce((a,b)=>a+b,0);return numQ(R,`The histogram shows how many minutes students practiced. How many students are represented in all?`,tot,[tot+1,tot-1,Math.max(...c)],`Add all the bars: ${c.join(' + ')} = ${tot}.`,{pics:pic})}
function stBox(R){const mn=R.int(2,12),q1=mn+R.int(3,8),md=q1+R.int(2,8),q3=md+R.int(3,8),mx=q3+R.int(3,10),t=R.int(1,3),pic=boxSVG(mn,q1,md,q3,mx,0,Math.ceil((mx+2)/5)*5,'Test scores'),lab='The box plot shows test scores.';
 if(t===1)return numQ(R,`${lab} What is the median?`,md,[q1,q3,Math.round((mn+mx)/2)],`The line inside the box marks the median: ${md}.`,{pics:pic});
 if(t===2)return numQ(R,`${lab} What is the range?`,mx-mn,[mx,q3-q1,mx-mn+1],`Range = ${mx} − ${mn} = ${mx-mn}.`,{pics:pic});
 return numQ(R,`${lab} What is the interquartile range (IQR)?`,q3-q1,[mx-mn,md,q3],`IQR = Q3 − Q1 = ${q3} − ${q1} = ${q3-q1}.`,{pics:pic})}
function stMAD(R){const m=R.int(6,14),d=[R.int(1,4),R.int(1,4)],v=[m-d[0],m+d[0],m-d[1],m+d[1]],mad=(d[0]*2+d[1]*2)/4;if(d[0]===d[1])return null;
 return numQ(R,`The mean of the data set ${R.shuffle(v).join(', ')} is ${m}. What is the mean absolute deviation (MAD)?`,mad,[d[0]+d[1],m,mad+1],`Distances from ${m}: ${d[0]}, ${d[0]}, ${d[1]}, ${d[1]}. Their mean is ${fmtN(mad)}.`,{step:.5})}
NJ.reg({id:'m6_stat',subj:'math',name:'Statistics & Data',desc:'Mean, median, mode, range, dot plots, histograms, box plots, MAD',n:10,full:4,daily:2,gen:topicGen([stMean,stMedian,stMode,stRange,stQ,stDot,stDot,stHist,stBox,stMAD])});
