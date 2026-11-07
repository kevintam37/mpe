/* ===== 7th grade MATH part 1: proportions, percents, rational numbers, expressions & equations ===== */
const NM7=['Maya','Leo','Ava','Noah','Zoe','Ben','Lily','Sam','Ella','Max','Ivy','Omar','Nina','Eli'];
/* ---------- Proportional relationships ---------- */
function prK(R){const k=R.int(2,12),X=[1,2,3,5];
 return numQ(R,`The table shows a proportional relationship. What is the constant of proportionality (y ÷ x)?`,k,[k+1,k*2,k*5],`Divide any y by its x: ${k*2} ÷ 2 = ${k}.`,{pics:TBL(['x','y'],X.map(x=>[x,k*x]))})}
function prEq(R){const k=R.int(2,9),nm=R.pick(NM7);
 return mk(R,`A machine makes ${k} items each minute. Which equation shows the number of items y made in x minutes?`,`y = ${k}x`,[`y = x + ${k}`,`y = x ÷ ${k}`,`x = ${k}y`],`The rate is ${k} per minute, so y = ${k}x.`)}
function prWord(R){const k=R.int(3,9),n=R.int(4,12),nm=R.pick(NM7),t=R.int(1,3);
 if(t===1)return numQ(R,`${nm} earns $${k} for each hour of work. At this rate, how many dollars does ${nm} earn in ${n} hours?`,k*n,[k+n,k*n-k,k*(n+1)],`${k} × ${n} = ${k*n}.`);
 if(t===2)return numQ(R,`A recipe uses ${k} cups of flour for every ${k+2} cups of milk. How many cups of milk are needed for ${k*n} cups of flour?`,(k+2)*n,[(k+2)+n,k*n+2,k*n],`Scale by ${n}: ${k+2} × ${n} = ${(k+2)*n}.`);
 return numQ(R,`In a proportional relationship, y = ${k}x. What is x when y = ${k*n}?`,n,[k*n*k,k*n-k,k+n],`Divide ${k*n} by ${k}: x = ${n}.`)}
function prUnit(R){const a=R.pick([[2,5],[3,4],[1,2],[3,5],[2,3]]),k=R.int(2,6),nm=R.pick(NM7),ans=fdiv(a,[1,k]);
 return fracS(R,`${nm} walks ${fT(a)} mile in ${fT([1,k])} hour. How many miles per hour is that?`,ans,[fmul(a,[1,k]),[a[1],a[0]]],`Divide distance by time: ${fT(a)} ÷ ${fT([1,k])} = ${fT(ans)}.`)}
function prNot(R){const a=R.int(2,8),b=R.int(1,6),X=[1,2,3,4];
 const rows=[['A'].concat(X.map(x=>a*x)),['B'].concat(X.map(x=>a*x+b)),['C'].concat(X.map(x=>a+x)),['D'].concat(X.map(x=>x*x+a))],order=R.shuffle([0,1,2,3]),ok=order.indexOf(0),L='ABCD';
 const rr=order.map((o,i)=>[L[i]].concat(rows[o].slice(1)));
 return mk(R,`The tables show values of y for x = ${X.join(', ')}. Which table shows a proportional relationship?`,`Table ${L[ok]}`,[0,1,2,3].filter(i=>i!==ok).map(i=>`Table ${L[i]}`),`In a proportional relationship y ÷ x is constant. Table ${L[ok]} has y = ${a}x.`,{pics:TBL(['Table','x=1','x=2','x=3','x=4'],rr)})}
function prGraph(R){const k=R.int(2,5),t=R.int(1,2);
 if(t===1)return numQ(R,`The graph shows a proportional relationship. What is the unit rate (the value of y when x = 1)?`,k,[k+1,k*2,k-1>0?k-1:k+3],`The line passes through (1, ${k}).`,{pics:planeSVG({r:10,lines:[{m:k,b:0}],pts:[{x:2,y:2*k,n:`(2, ${2*k})`}]})});
 return mk(R,`Which feature must the graph of a proportional relationship have?`,'It is a straight line through the origin (0, 0).',['It is a curve through (0, 1).','It is a horizontal line.','It is a straight line through (0, 5).'],'Proportional relationships have the form y = kx, so x = 0 gives y = 0.')}
NJ.reg({id:'m7_ratio',subj:'math',name:'Proportional Relationships',desc:'Unit rates, constant of proportionality, y = kx, tables and graphs',n:10,full:4,daily:2,gen:topicGen([prK,prK,prEq,prWord,prWord,prUnit,prNot,prGraph])});

/* ---------- Percent applications ---------- */
function pcDisc(R){const p=R.pick([10,15,20,25,30,40,50]),c=R.pick([20,40,60,80,120,200,50]),d=p*c/100,t=R.int(1,2);if(!Number.isInteger(d*4))return null;
 if(t===1)return numQ(R,`A jacket costs $${c}. It is on sale for ${p}% off. What is the sale price, in dollars?`,c-d,[d,c+d,c-p],`Discount = ${p}% of ${c} = $${fmtN(d)}. Sale price = ${c} − ${fmtN(d)} = $${fmtN(c-d)}.`);
 return numQ(R,`A game costs $${c}. A ${p}% discount is applied. How many dollars is the discount?`,d,[c-d,p,c+d],`${p}% of ${c} = ${fmtN(d)}.`)}
function pcTax(R){const c=R.pick([20,40,50,80,100,120,200]),p=R.pick([5,6,7,8,10]),tx=c*p/100,t=R.int(1,2);if(!Number.isInteger(tx*10))return null;
 if(t===1)return numQ(R,`A shirt costs $${c}. The sales tax is ${p}%. What is the total cost, in dollars?`,c+tx,[tx,c-tx,c+p],`Tax = ${fmtN(tx)}. Total = ${c} + ${fmtN(tx)} = ${fmtN(c+tx)}.`);
 const tip=R.pick([15,18,20]),b=R.pick([20,40,60,80,100]),T=b*tip/100;if(!Number.isInteger(T*10))return null;
 return numQ(R,`A restaurant bill is $${b}. ${R.pick(NM7)} leaves a ${tip}% tip. How many dollars is the tip?`,T,[b+T,tip,b-T],`${tip}% of ${b} = ${fmtN(T)}.`)}
function pcChange(R){const a=R.pick([20,40,50,80,100,200,25]),p=R.pick([10,20,25,50,40,5]),up=R.f()<.5,d=a*p/100;if(!Number.isInteger(d*10))return null;const b=up?a+d:a-d;
 return numQ(R,`The price of a ticket changed from $${a} to $${fmtN(b)}. What is the percent ${up?'increase':'decrease'}?`,p,[100-p,p*2,d],`Change = ${fmtN(d)}. ${fmtN(d)} ÷ ${a} = ${p/100} = ${p}%.`,{step:5})}
function pcMark(R){const w=R.pick([10,20,40,50,80,100]),p=R.pick([20,25,50,30,40]),m=w*p/100;if(!Number.isInteger(m*10))return null;
 return numQ(R,`A store buys a bike helmet for $${w} and marks the price up by ${p}%. What is the selling price, in dollars?`,w+m,[m,w-m,w+p],`Markup = ${p}% of ${w} = ${fmtN(m)}. Selling price = ${fmtN(w+m)}.`)}
function pcInt(R){const P=R.pick([100,200,300,500,1000]),r=R.pick([2,3,4,5,6]),t=R.int(2,5),I=P*r*t/100;
 return numQ(R,`${R.pick(NM7)} deposits $${P} at ${r}% simple interest per year. How much interest is earned in ${t} years, in dollars?`,I,[P*r/100,I+P,P*t],`I = P × r × t = ${P} × ${r/100} × ${t} = ${I}.`)}
function pcFind(R){const p=R.pick([10,20,25,40,50,60,75]),w=R.pick([20,40,60,80,120,200]),a=p*w/100,nm=R.pick(NM7);
 return numQ(R,`${nm} answered ${a} questions correctly. That was ${p}% of the test. How many questions were on the test?`,w,[a*p,w-a,a+p],`${a} is ${p}% of the total, so total = ${a} ÷ ${p/100} = ${w}.`)}
NJ.reg({id:'m7_pct',subj:'math',name:'Percent Applications',desc:'Discounts, tax, tips, markup, percent change, simple interest',n:10,full:4,daily:2,gen:topicGen([pcDisc,pcDisc,pcTax,pcChange,pcMark,pcInt,pcFind])});

/* ---------- Rational number operations ---------- */
function roInt(R){const a=R.int(-20,20),b=R.int(-20,20),op=R.pick(['+','−','×','÷']);if(!a||!b)return null;
 if(op==='+')return numS(R,`${sg(a)} + ${pn(b)} = ?`,a+b,[Math.abs(a)+Math.abs(b),a-b],`Combine: ${sg(a)} + ${pn(b)} = ${sg(a+b)}.`);
 if(op==='−')return numS(R,`${sg(a)} − ${pn(b)} = ?`,a-b,[a+b,b-a],`Subtracting ${pn(b)} is the same as adding ${sg(-b)}: ${sg(a-b)}.`);
 if(op==='×'){const x=R.int(-9,9),y=R.int(-9,9);if(!x||!y)return null;return numS(R,`${sg(x)} × ${pn(y)} = ?`,x*y,[Math.abs(x*y),x+y],`${Math.sign(x*y)>0?'Same signs give a positive product':'Different signs give a negative product'}: ${sg(x*y)}.`)}
 const y=R.int(-9,9),q=R.int(-9,9);if(!y||!q)return null;return numS(R,`${sg(y*q)} ÷ ${pn(y)} = ?`,q,[Math.abs(q),y+q],`${Math.sign(q)>0?'Same signs give a positive quotient':'Different signs give a negative quotient'}: ${sg(q)}.`)}
function roDec(R){const a=R.int(-90,90)/10,b=R.int(-90,90)/10,op=R.pick(['+','−','×']);if(!a||!b)return null;const f=x=>x<0?`(${MN}${Math.abs(x).toFixed(1)})`:x.toFixed(1);
 if(op==='×'){const ans=rd(a*b);return numS(R,`${f(a)} × ${f(b)} = ?`,ans,[Math.abs(ans),rd(ans*10)],`Multiply the digits and place the decimal; ${a*b<0?'the signs differ so the product is negative':'the signs match so the product is positive'}.`,{step:.1})}
 const ans=rd(op==='+'?a+b:a-b);return numS(R,`${f(a)} ${op} ${f(b)} = ?`,ans,[Math.abs(ans)],`${op==='−'?'Subtracting is adding the opposite. ':''}Result: ${sg(ans)}.`,{step:.1})}
function roFrac(R){const d1=R.pick([2,3,4,5,6,8]),d2=R.pick([2,3,4,5,6,8]),a=fr(R.int(-7,7),d1),b=fr(R.int(-7,7),d2),op=R.pick(['+','−','×','÷']);if(!a[0]||!b[0]||a[1]===1||b[1]===1)return null;
 const ans=op==='+'?fadd(a,b):op==='−'?fsub(a,b):op==='×'?fmul(a,b):fdiv(a,b);if(Math.abs(ans[0])>40||ans[1]>24)return null;
 const sym=op;return fracS(R,`${sfH(a)} ${sym} ${a[0]<0&&0?'':''}${b[0]<0?'('+sfH(b)+')':sfH(b)} = ?`,ans,[fmul(a,b),fadd(a,b),fsub(a,b)],`Compute with common denominators or reciprocals: ${sfT(ans)}.`)}
function roDist(R){const a=R.int(-12,12),b=R.int(-12,12);if(a===b)return null;return numS(R,`What is the distance between ${sg(a)} and ${sg(b)} on a number line?`,Math.abs(a-b),[Math.abs(a)+Math.abs(b)-1,a+b,Math.abs(a)+Math.abs(b)+1].filter(x=>x!==Math.abs(a-b)),`Distance = |${sg(a)} − ${pn(b)}| = ${Math.abs(a-b)}.`)}
function roCtx(R){const t=R.int(1,3),nm=R.pick(NM7);
 if(t===1){const s=R.int(20,60),d=R.int(10,40);return numS(R,`The temperature at 6 a.m. was ${sg(-d)}°F. By noon it rose ${s}°F. What was the temperature at noon, in °F?`,s-d,[s+d,d-s],`${sg(-d)} + ${s} = ${sg(s-d)}.`)}
 if(t===2){const b=R.int(20,100),w=R.int(10,60);return numS(R,`${nm}'s bank balance is $${b}. ${nm} withdraws $${b+w}. What is the new balance, in dollars?`,-w,[w,b+w,b-w],`${b} − ${b+w} = ${sg(-w)}.`)}
 const e=R.int(5,40),u=R.int(2,15);return numS(R,`A diver is at ${sg(-e)} feet. The diver rises ${u} feet. What is the diver's new depth (elevation) in feet?`,-e+u,[-e-u,e+u,e-u],`${sg(-e)} + ${u} = ${sg(u-e)}.`)}
function roConv(R){const n=R.int(1,19),d=R.pick([4,8,20,5,2]);if(n%d===0)return null;const v=n/d;if(!Number.isInteger(v*1000)||v*1000%1)return null;
 return mk(R,`Which decimal is equal to ${FR(n,d)}?`,String(rd(v)),[String(rd(v*10)),String(rd(v/10)),String(rd(d/n))],`Divide ${n} by ${d}: ${rd(v)}.`)}
NJ.reg({id:'m7_ops',subj:'math',name:'Rational Number Operations',desc:'Add, subtract, multiply, divide integers, decimals and fractions (positive and negative)',n:10,full:4,daily:2,gen:topicGen([roInt,roInt,roDec,roFrac,roFrac,roDist,roCtx,roConv])});

/* ---------- Expressions, equations, inequalities ---------- */
function exSimp(R){const a=R.int(2,9),b=R.int(2,9),c=R.int(1,9),d=R.int(1,9),t=R.int(1,3);
 if(t===1)return mk(R,`Simplify: ${a}x + ${b} + ${c}x + ${d}`,`${a+c}x + ${b+d}`,[`${a+c}x + ${b*d}`,`${a*c}x + ${b+d}`,`${a+c+b+d}x`],`Combine like terms: ${a}x + ${c}x = ${a+c}x and ${b} + ${d} = ${b+d}.`);
 if(t===2)return mk(R,`Simplify: ${a}(x + ${b})`,`${a}x + ${a*b}`,[`${a}x + ${b}`,`${a+1}x + ${b}`,`x + ${a*b}`],`Distribute ${a} to both terms: ${a}x + ${a*b}.`);
 return mk(R,`Simplify: ${a+c}x − ${c}x + ${d}`,`${a}x + ${d}`,[`${a+2*c}x + ${d}`,`${a}x − ${d}`,`${a}x`],`${a+c}x − ${c}x = ${a}x.`)}
function exFactor(R){const g=R.int(2,9),a=R.int(1,6),b=R.int(1,7);if(a===b)return null;
 return mk(R,`Which expression is equivalent to ${g*a}x + ${g*b}?`,`${g}(${a}x + ${b})`,[`${g}(${a}x + ${g*b})`,`${a}(${g}x + ${b})`,`${g}(${a}x) + ${b}`],`Factor out the common factor ${g}.`)}
function exTwo(R){const x=R.int(-8,12),a=R.int(2,9),b=R.int(1,15),t=R.int(1,2);if(!x)return null;
 if(t===1)return numS(R,`Solve for x: ${a}x + ${b} = ${a*x+b}`,x,[a*x,x+1],`Subtract ${b}, then divide by ${a}: x = ${sg(x)}.`);
 return numS(R,`Solve for x: ${a}x − ${b} = ${a*x-b}`,x,[a*x,x+b],`Add ${b}, then divide by ${a}: x = ${sg(x)}.`)}
function exFrac(R){const a=R.int(2,8),x=R.int(2,12),b=R.int(1,9);return numS(R,`Solve for x: x ÷ ${a} + ${b} = ${x+b}`,x*a,[x+b,x,x*a+b],`Subtract ${b}: x ÷ ${a} = ${x}. Multiply by ${a}: x = ${x*a}.`)}
function exIneq(R){const a=R.int(2,8),x=R.int(1,10),b=R.int(1,12),sym=R.pick(['>','<','≥','≤']);
 const rhs=a*x+b,ans=`x ${sym} ${x}`,bad=[`x ${({'>':'<','<':'>','≥':'≤','≤':'≥'})[sym]} ${x}`,`x ${sym} ${x+b}`,`x ${sym} ${rhs}`];
 return mk(R,`Solve: ${a}x + ${b} ${sym} ${rhs}`,ans,bad,`Subtract ${b}: ${a}x ${sym} ${a*x}. Divide by ${a}: x ${sym} ${x}.`)}
function exNeg(R){const a=R.int(2,6),x=R.int(1,8),sym=R.pick(['>','<']),flip=sym==='>'?'<':'>';
 return mk(R,`Solve: −${a}x ${sym} −${a*x}`,`x ${flip} ${x}`,[`x ${sym} ${x}`,`x ${flip} ${-x}`.replace('-',MN),`x ${sym} ${a*x}`],`Dividing by a negative number reverses the inequality: x ${flip} ${x}.`)}
function exWord(R){const nm=R.pick(NM7),f=R.int(3,12),r=R.int(2,9),n=R.int(3,9),t=f+r*n,k=R.int(1,2);
 if(k===1)return numQ(R,`${nm} has a $${f} membership fee plus $${r} per visit. ${nm} paid $${t} in all. How many visits did ${nm} make?`,n,[t-f,t/r|0,n+1],`${r}v + ${f} = ${t}, so v = (${t} − ${f}) ÷ ${r} = ${n}.`);
 return mk(R,`${nm} has $${t}. Each book costs $${r}. Which inequality shows how many books b ${nm} can buy while spending at most $${t}?`,`${r}b ≤ ${t}`,[`${r}b ≥ ${t}`,`${r}b < ${t-1}`,`b + ${r} ≤ ${t}`],`Total spent ${r}b must be less than or equal to ${t}.`)}
function exGraph(R){const n=R.int(-3,4),open=R.f()<.5,dir=R.pick([1,-1]);return numS(R,`The number line graphs all solutions of an inequality of the form x ${dir>0?(open?'>':'≥'):(open?'<':'≤')} c. What is c?`,n,[-n,n+1],`The circle is at ${sg(n)}.`,{pics:nlineSVG(-6,6,1,[{v:n,open,ray:dir}])})}
NJ.reg({id:'m7_expr',subj:'math',name:'Expressions, Equations & Inequalities',desc:'Simplify and factor, two-step equations and inequalities, word problems',n:10,full:4,daily:2,gen:topicGen([exSimp,exSimp,exFactor,exTwo,exTwo,exFrac,exIneq,exNeg,exWord,exGraph])});
