/* ===== 8th grade MATH part 1: exponents & roots, linear equations, systems, functions ===== */
const NM8=['Maya','Leo','Ava','Noah','Zoe','Ben','Lily','Sam','Ella','Max','Ivy','Omar','Nina','Eli'];
const sup2=n=>`<sup>${n}</sup>`;
/* ---------- Exponents, scientific notation, roots ---------- */
function exLaw(R){const b=R.pick([2,3,5,7,10]),m=R.int(2,9),n=R.int(2,9),t=R.int(1,4);
 if(t===1)return mk(R,`Which expression is equivalent to ${b}${sup2(m)} × ${b}${sup2(n)}?`,`${b}${sup2(m+n)}`,[`${b}${sup2(m*n)}`,`${b*b}${sup2(m+n)}`,`${b}${sup2(m-n>0?m-n:m+n+1)}`],`When multiplying powers with the same base, add the exponents.`);
 if(t===2){const a=Math.max(m,n)+1,c=Math.min(m,n);return mk(R,`Which expression is equivalent to ${b}${sup2(a)} ÷ ${b}${sup2(c)}?`,`${b}${sup2(a-c)}`,[`${b}${sup2(a+c)}`,`${b}${sup2(a*c)}`,`1${sup2(a-c)}`],`When dividing powers with the same base, subtract the exponents.`)}
 if(t===3)return mk(R,`Which expression is equivalent to (${b}${sup2(m)})${sup2(n)}?`,`${b}${sup2(m*n)}`,[`${b}${sup2(m+n)}`,`${b*n}${sup2(m)}`,`${b}${sup2(m**n)}`],`For a power of a power, multiply the exponents.`);
 return mk(R,`What is the value of ${b}${sup2(0)}?`,'1',['0',String(b),'not a number'],`Any nonzero number to the power 0 equals 1.`)}
function exNeg(R){const b=R.pick([2,3,4,5,10]),n=R.int(1,4);return mk(R,`What is the value of ${b}${sup2('−'+n)}?`,`1/${b**n}`,[`−${b**n}`,`−${b*n}`,`${b**n}`],`A negative exponent means reciprocal: 1 ÷ ${b}${sup2(n)} = 1/${b**n}.`)}
function exSci(R){const m=R.int(11,99)/10,e=R.int(3,9),t=R.int(1,3);
 if(t===1){const v=Math.round(m*10**e);return mk(R,`What is ${comma(v)} written in scientific notation?`,`${m} × 10${sup2(e)}`,[`${m} × 10${sup2(e+1)}`,`${m*10} × 10${sup2(e-1)}`,`${m} × 10${sup2(e-1)}`],`Move the decimal so one nonzero digit is left of it, then count places.`)}
 if(t===2){const v=Math.round(m*10**-e*10**e)/1,dec='0.'+'0'.repeat(e-1)+String(Math.round(m*10));return mk(R,`What is ${m} × 10${sup2('−'+e)} in standard form?`,dec,['0.'+'0'.repeat(e)+String(Math.round(m*10)),'0.'+'0'.repeat(e-2>0?e-2:0)+String(Math.round(m*10)),String(Math.round(m*10))+'0'.repeat(e)],`A negative exponent moves the decimal point ${e} places left.`)}
 const a=R.int(2,9),b=R.int(2,5);const p=a*b;const ex=R.int(2,6),ey=R.int(2,6);
 return mk(R,`What is (${a} × 10${sup2(ex)}) × (${b} × 10${sup2(ey)}) in scientific notation?`,p<10?`${p} × 10${sup2(ex+ey)}`:`${p/10} × 10${sup2(ex+ey+1)}`,[`${p} × 10${sup2(ex*ey)}`,`${a+b} × 10${sup2(ex+ey)}`,`${p} × 10${sup2(ex+ey+1)}`].filter(x=>x!==(p<10?`${p} × 10${sup2(ex+ey)}`:`${p/10} × 10${sup2(ex+ey+1)}`)),`Multiply the numbers and add the exponents.`)}
function exRoot(R){const s=R.int(2,15),t=R.int(1,3),c=R.int(2,6);
 if(t===1)return numQ(R,`What is √${s*s}?`,s,[s*2,s*s/2|0,s+1],`${s} × ${s} = ${s*s}.`);
 if(t===2)return numQ(R,`What is the cube root of ${c**3}? (∛${c**3})`,c,[c*3,c*c,c+1],`${c} × ${c} × ${c} = ${c**3}.`);
 const v=s*s+R.int(1,2*s);return mk(R,`Between which two consecutive whole numbers is √${v}?`,`${s} and ${s+1}`,[`${s-1} and ${s}`,`${s+1} and ${s+2}`,`${s*2} and ${s*2+1}`],`${s}² = ${s*s} and ${s+1}² = ${(s+1)**2}, and ${v} is between them.`)}
function exIrr(R){const B=[['Which number is irrational?','√7',['√49','0.25','3/4'],'√7 cannot be written as a fraction of integers.'],
 ['Which number is rational?','0.333…',['π','√2','√3'],'0.333… repeating equals 1/3.'],
 ['Which is the best estimate of √50?','7.1',['5.0','6.5','8.0'],'7² = 49, so √50 is just above 7.'],
 ['Which number is between 5 and 6?','√30',['√20','√40','√50'],'5² = 25 and 6² = 36, and 30 is in between.'],
 ['Which statement about π is true?','It is irrational.',['It equals 22/7 exactly.','It equals 3.14 exactly.','It is a whole number.'],'π is a non-repeating, non-terminating decimal.']];return mk(R,...R.pick(B))}
NJ.reg({id:'m8_exp',subj:'math',name:'Exponents, Roots & Scientific Notation',desc:'Laws of exponents, scientific notation, square and cube roots, irrational numbers',n:10,full:4,daily:2,gen:topicGen([exLaw,exLaw,exNeg,exSci,exSci,exRoot,exIrr])});

/* ---------- Linear equations, slope, proportional comparisons ---------- */
function lnSolve(R){const x=R.int(-9,12),a=R.int(2,7),b=R.int(2,9),c=R.int(2,5),t=R.int(1,3);if(!x||c>=a)return null;
 if(t===1){const d=a*x+b-c*x;return numS(R,`Solve for x: ${a}x + ${b} = ${c}x + ${sg(d)}`,x,[-x,x+1],`Subtract ${c}x: ${a-c}x + ${b} = ${sg(d)}. Subtract ${b}, divide by ${a-c}: x = ${sg(x)}.`)}
 if(t===2)return numS(R,`Solve for x: ${a}(x + ${b}) = ${a*(x+b)}`,x,[x+b,a*(x+b)/a+b],`Divide by ${a}: x + ${b} = ${x+b}, so x = ${sg(x)}.`);
 return numS(R,`Solve for x: ${a}x − ${b} = ${sg(a*x-b)}`,x,[-x,a*x],`Add ${b}, divide by ${a}: x = ${sg(x)}.`)}
function lnCount(R){const a=R.int(2,6),b=R.int(1,9),t=R.int(1,3);
 if(t===1)return mk(R,`How many solutions does the equation ${a}x + ${b} = ${a}x + ${b+R.int(1,4)} have?`,'No solution',['One solution','Two solutions','Infinitely many solutions'],`The x terms cancel and leave a false statement.`);
 if(t===2)return mk(R,`How many solutions does the equation ${a}(x + ${b}) = ${a}x + ${a*b} have?`,'Infinitely many solutions',['No solution','One solution','Two solutions'],`Distributing gives the same expression on both sides, so every x works.`);
 return mk(R,`How many solutions does the equation ${a+1}x + ${b} = ${a}x + ${b+3} have?`,'One solution',['No solution','Infinitely many solutions','Two solutions'],`The coefficients of x differ, so there is exactly one solution.`)}
function lnSlope(R){const x1=R.int(-5,3),y1=R.int(-5,5),dx=R.int(1,5),m=R.int(-4,4),y2=y1+m*dx,x2=x1+dx;if(!m)return null;
 return numS(R,`What is the slope of the line through (${sg(x1)}, ${sg(y1)}) and (${sg(x2)}, ${sg(y2)})?`,m,[-m,dx,1/m].filter(v=>Number.isFinite(v)&&Number.isInteger(v)),`slope = (${sg(y2)} − ${pn(y1)}) ÷ (${sg(x2)} − ${pn(x1)}) = ${sg(m*dx)} ÷ ${dx} = ${sg(m)}.`)}
function lnGraph(R){const m=R.int(-3,3),b=R.int(-4,4),t=R.int(1,3);if(!m)return null;
 const pic=planeSVG({r:6,lines:[{m,b}]});
 if(t===1)return numS(R,`What is the slope of the line shown on the graph?`,m,[-m,b],`Rise over run: the line goes ${m>0?'up':'down'} ${Math.abs(m)} for each 1 unit right.`,{pics:pic});
 if(t===2)return numS(R,`What is the y-intercept of the line shown on the graph?`,b,[m,-b],`The line crosses the y-axis at (0, ${sg(b)}).`,{pics:pic});
 const eq=(m===1?'':m===-1?MN:sg(m))+'x'+(b===0?'':b>0?` + ${b}`:` ${MN} ${-b}`);const wrong=[(m===1?'':sg(-m))+'x'+(b===0?'':b>0?` + ${b}`:` ${MN} ${-b}`),(b===0?'':'')+sg(b)+'x'+(m>0?` + ${m}`:` ${MN} ${-m}`),sg(m)+'x'+(b>=0?` ${MN} ${b}`:` + ${-b}`)];
 return mk(R,`Which equation represents the line shown on the graph?`,`y = ${eq}`,wrong.map(w=>`y = ${w}`),`slope ${sg(m)}, y-intercept ${sg(b)}: y = mx + b.`,{pics:pic})}
function lnEq(R){const m=R.int(-5,6),b=R.int(-8,9),x=R.int(1,6),t=R.int(1,2);if(!m)return null;
 if(t===1)return numS(R,`A line has the equation y = ${sg(m)}x ${b<0?MN+' '+(-b):'+ '+b}. What is y when x = ${x}?`,m*x+b,[m*x-b,-m*x+b],`y = ${sg(m)} × ${x} ${b<0?'−':'+'} ${Math.abs(b)} = ${sg(m*x+b)}.`);
 return mk(R,`Which describes the line y = ${sg(m)}x ${b<0?MN+' '+(-b):'+ '+b}?`,`slope ${sg(m)}, y-intercept ${sg(b)}`,[`slope ${sg(b)}, y-intercept ${sg(m)}`,`slope ${sg(-m)}, y-intercept ${sg(b)}`,`slope ${sg(m)}, y-intercept ${sg(-b)}`],`In y = mx + b, m is the slope and b is the y-intercept.`)}
function lnWord(R){const nm=R.pick(NM8),r=R.int(2,9),s=R.int(5,40),x=R.int(3,10),t=R.int(1,2);
 if(t===1)return mk(R,`${nm} starts with $${s} and saves $${r} each week. Which equation gives the total y after x weeks?`,`y = ${r}x + ${s}`,[`y = ${s}x + ${r}`,`y = ${r}x − ${s}`,`y = ${r+s}x`],`The rate is ${r} per week; the starting amount is ${s}.`);
 return numQ(R,`A plumber charges $${s} plus $${r} per hour. The equation is y = ${r}x + ${s}. How much does a ${x}-hour job cost, in dollars?`,r*x+s,[r+s+x,r*(x+s),s*x],`${r} × ${x} + ${s} = ${r*x+s}.`)}
function lnComp(R){const a=R.int(2,8),b=a+R.int(1,4),nm=R.pick(NM8);
 return mk(R,`Car A travels at a constant ${a*10} mph. The distance of Car B is y = ${b*10}x, where x is hours. Which car is faster?`,'Car B',['Car A','They are the same speed.','It cannot be determined.'],`Car B's unit rate is ${b*10} mph, which is greater than ${a*10} mph.`)}
NJ.reg({id:'m8_lin',subj:'math',name:'Linear Equations & Slope',desc:'Solving equations, number of solutions, slope, y = mx + b, graphs',n:10,full:5,daily:2,gen:topicGen([lnSolve,lnSolve,lnCount,lnSlope,lnGraph,lnGraph,lnEq,lnWord,lnComp])});

/* ---------- Systems of equations ---------- */
function syGraph(R){const x=R.int(-3,4),y=R.int(-3,4),m1=R.pick([1,2,-1,-2]),m2=R.pick([1,2,-1,-2].filter(v=>v!==m1)),b1=y-m1*x,b2=y-m2*x;if(Math.abs(b1)>5||Math.abs(b2)>5)return null;
 return mk(R,`The graph shows two lines. What is the solution of the system of equations?`,`(${sg(x)}, ${sg(y)})`,[`(${sg(y)}, ${sg(x)})`,`(${sg(-x)}, ${sg(y)})`,`(${sg(x)}, ${sg(-y)})`],`The solution is the point where the lines intersect.`,{pics:planeSVG({r:6,lines:[{m:m1,b:b1,c:'#4C8DF6'},{m:m2,b:b2,c:'#E0457B'}],pts:[{x,y,n:''}]})})}
function sySub(R){const x=R.int(1,8),y=R.int(1,8),a=R.int(2,4);const s=x+y;
 return mk(R,`Solve the system:\ny = ${a}x\nx + y = ${x*(1+a)}`,`(${x}, ${a*x})`,[`(${a*x}, ${x})`,`(${x+1}, ${a*x})`,`(${x}, ${x*(1+a)})`],`Substitute y = ${a}x: x + ${a}x = ${x*(1+a)}, so x = ${x} and y = ${a*x}.`)}
function syElim(R){const x=R.int(1,9),y=R.int(1,9),a=R.int(1,3),b=R.int(1,3);if(x===y)return null;
 return mk(R,`Solve the system:\nx + y = ${x+y}\nx − y = ${sg(x-y)}`,`(${x}, ${y})`,[`(${y}, ${x})`,`(${x+1}, ${y-1>=0?y-1:y+1})`,`(${x+y}, ${sg(x-y)})`],`Add the equations: 2x = ${2*x}, so x = ${x}. Then y = ${y}.`)}
function syWord(R){const a=R.int(2,6),b=R.int(2,8),x=R.int(2,10),y=R.int(2,10);if(a===b)return null;const n1=R.pick(['notebooks','pens','tickets','books']);const t=a*x+b*y;
 return numQ(R,`Notebooks cost $${a} each and pens cost $${b} each. ${R.pick(NM8)} buys ${x+y} items in total and spends $${t}. How many notebooks were bought?`,x,[y,x+y,x+1],`Let n + p = ${x+y} and ${a}n + ${b}p = ${t}. Solving gives n = ${x}.`)}
function syNum(R){const B=[['A system of two linear equations has no solution when the lines are','parallel',['intersecting','the same line','perpendicular'],'Parallel lines never meet.'],
 ['A system of two linear equations has infinitely many solutions when the lines are','the same line',['parallel','perpendicular','intersecting at one point'],'The equations describe the same line.'],
 ['Is (2, 5) a solution of y = 2x + 1?','Yes, because 5 = 2(2) + 1',['No, because 5 ≠ 2','Yes, because 2 + 5 = 7','No, because 2(5) + 1 = 11'],'Substitute x = 2: y = 5.'],
 ['Which pair of equations has exactly one solution?','y = 2x + 1 and y = 3x − 4',['y = 2x + 1 and y = 2x + 5','y = 2x + 1 and 2y = 4x + 2','y = x and y = x'],'The slopes are different.']];return mk(R,...R.pick(B))}
NJ.reg({id:'m8_sys',subj:'math',name:'Systems of Equations',desc:'Graphing, substitution, elimination, word problems, number of solutions',n:10,full:4,daily:2,gen:topicGen([syGraph,syGraph,sySub,syElim,syWord,syNum])});

/* ---------- Functions ---------- */
function fnDef(R){const B=[['Which relation is NOT a function?','{(1, 2), (1, 3), (2, 4)}',['{(1, 2), (2, 3), (3, 4)}','{(1, 5), (2, 5), (3, 5)}','{(0, 1), (1, 2), (2, 3)}'],'The input 1 has two different outputs.'],
 ['Which statement describes a function?','Each input has exactly one output.',['Each output has exactly one input.','Each input has two outputs.','Inputs and outputs are always equal.'],'This is the definition.'],
 ['Which table shows y as a function of x?','x: 1, 2, 3 and y: 4, 4, 5',['x: 1, 1, 2 and y: 3, 4, 5','x: 2, 2, 2 and y: 1, 2, 3','x: 0, 0, 1 and y: 5, 6, 7'],'No input repeats with different outputs.']];return mk(R,...R.pick(B))}
function fnRate(R){const m=R.int(2,9),b=R.int(1,12),X=[0,1,2,3,4];return numS(R,`The table shows a linear function. What is the rate of change?`,m,[b,m+1,m*2],`The y-values increase by ${m} each time x increases by 1.`,{pics:TBL(['x','y'],X.map(x=>[x,m*x+b]))})}
function fnInit(R){const m=R.int(2,9),b=R.int(1,12),X=[0,1,2,3];return numQ(R,`The table shows a linear function. What is the initial value (y when x = 0)?`,b,[m,b+m,m*b],`The initial value is the y-value at x = 0.`,{pics:TBL(['x','y'],X.map(x=>[x,m*x+b]))})}
function fnWord(R){const nm=R.pick(NM8),m=R.int(3,12),b=R.int(5,40),t=R.int(1,2);
 if(t===1)return mk(R,`A gym charges a $${b} sign-up fee and $${m} per month. In the function y = ${m}x + ${b}, what does ${m} represent?`,'The cost per month',['The sign-up fee','The total cost','The number of months'],`${m} is the rate of change: dollars per month.`);
 return mk(R,`A gym charges a $${b} sign-up fee and $${m} per month. In the function y = ${m}x + ${b}, what does ${b} represent?`,'The initial cost (sign-up fee)',['The cost per month','The number of months','The total cost'],`${b} is the value when x = 0.`)}
function fnComp(R){const m1=R.int(2,6),b1=R.int(1,9),m2=m1+R.int(1,3),b2=R.int(1,9),x=R.int(1,5);
 return mk(R,`Function A is y = ${m1}x + ${b1}. Function B has a rate of change of ${m2} and an initial value of ${b2}. Which function has the greater rate of change?`,'Function B',['Function A','They are equal','Cannot be determined'],`${m2} > ${m1}.`)}
function fnLin(R){const B=[['Which equation represents a nonlinear function?','y = x²',['y = 3x + 2','y = −x','y = 5'],'x² makes a curve.'],['Which graph is linear?','A straight line',['A parabola','A circle','A curve that bends'],'Linear functions graph as straight lines.'],['A function has a constant rate of change. It is','linear',['quadratic','exponential','not a number'],'Constant rate of change means linear.']];return mk(R,...R.pick(B))}
NJ.reg({id:'m8_func',subj:'math',name:'Functions',desc:'Function definition, rate of change, initial value, comparing functions, linear vs. nonlinear',n:10,full:4,daily:2,gen:topicGen([fnDef,fnRate,fnInit,fnWord,fnWord,fnComp,fnLin])});
