/* ===== 6th grade MATH (NJSLA style), part 1: ratios, percents, fractions, numbers, expressions ===== */
const NM6=['Maya','Leo','Ava','Noah','Zoe','Ben','Lily','Sam','Ella','Max','Ivy','Omar','Nina','Eli'];
const rat=(a,b)=>{const g=gcd(a,b);return `${a/g}:${b/g}`};

/* ---------- Ratios & rates ---------- */
function rtBasic(R){const a=R.int(2,9),b=R.int(2,9),k=R.int(2,5),x=a*k,y=b*k,[n1,n2]=R.pick([['girls','boys'],['red marbles','blue marbles'],['cats','dogs'],['fiction books','nonfiction books']]);if(gcd(a,b)!==1)return null;
 const ok=`${a}:${b}`;return mk(R,`A club has ${x} ${n1} and ${y} ${n2}. What is the ratio of ${n1} to ${n2} in simplest form?`,ok,[`${b}:${a}`,`${x}:${x+y}`,`${a}:${a+b}`,`${x-1}:${y}`],`${x}:${y} simplifies to ${ok} (divide both by ${k}).`)}
function rtMissing(R){const a=R.int(2,8),b=R.int(2,9),k=R.int(2,9),nm=R.pick(NM6);if(a===b||gcd(a,b)!==1)return null;
 return numQ(R,`The ratio of ${nm}'s red beads to blue beads is ${a}:${b}. If ${nm} has ${a*k} red beads, how many blue beads are there?`,b*k,[b+k,a*k+b,b*k+a,a*b],`${a} × ${k} = ${a*k}, so multiply ${b} by ${k}: ${b*k}.`)}
function rtTable(R){const a=R.int(2,9),b=R.int(3,12),ks=[1,2,3,5],q=R.int(0,3);if(gcd(a,b)!==1)return null;const rows=ks.map(k=>[a*k,b*k]);const m=R.int(1,3);const shown=rows.map((r,i)=>i===m?[r[0],'?']:r);
 return numQ(R,`The table shows equivalent ratios. What is the missing number?`,rows[m][1],[rows[m][1]+a,rows[m][1]-1,rows[m][0]+b],`Each row is ${a}:${b} times ${ks[m]}, so ${rows[m][0]} : ${rows[m][1]}.`,{pics:TBL(['Part A','Part B'],shown)})}
function rtUnit(R){const t=R.int(1,4),nm=R.pick(NM6);
 if(t===1){const s=R.int(30,75),h=R.int(2,8);return numQ(R,`A car travels ${s*h} miles in ${h} hours at a constant speed. How many miles per hour is that?`,s,[s*h,h,s+h],`${s*h} ÷ ${h} = ${s} miles per hour.`)}
 if(t===2){const n=R.int(3,9),u=R.int(6,60)/4,c=rd(n*u);return numQ(R,`${n} notebooks cost $${c.toFixed(2)}. What is the cost of 1 notebook, in dollars?`,u,[rd(c*n),rd(u+1),rd(u*2)],`$${c.toFixed(2)} ÷ ${n} = $${fmtN(u)}.`,{step:.25})}
 if(t===3){const m=R.pick([2,3,4,5,6]),r=R.int(20,60),w=m*r;return numQ(R,`${nm} types ${w} words in ${m} minutes at a steady rate. How many words per minute is that?`,r,[w,m,r+m],`${w} ÷ ${m} = ${r} words per minute.`)}
 const h=R.pick([2,4,5]),mi=R.int(3,9)*h/ (h===4?2:1),sp=rd(mi/h);return numQ(R,`${nm} bikes ${mi} miles in ${h} hours at a steady speed. How many miles per hour is that?`,sp,[rd(mi*h),rd(h/mi),h],`${mi} ÷ ${h} = ${fmtN(sp)} miles per hour.`,{step:.25})}
function rtBuy(R){const n1=R.pick([4,6,8,10,12]),n2=n1+R.pick([2,4,6]),p1=rd(R.int(200,600)/100),r=R.pick([.9,1.05,1.1,1.2]),p2=rd(Math.round(p1/n1*r*n2*100)/100),u1=p1/n1,u2=p2/n2;if(Math.abs(u1-u2)<.01)return null;
 const better=u1<u2?'Pack A':'Pack B';return mk(R,`Pack A has ${n1} pencils for $${p1.toFixed(2)}. Pack B has ${n2} pencils for $${p2.toFixed(2)}. Which is the better buy?`,better,['Pack A','Pack B'].filter(x=>x!==better).concat(['They cost the same per pencil.','Cannot tell']),`Unit prices: A = $${u1.toFixed(3)} per pencil, B = $${u2.toFixed(3)} per pencil. The lower unit price is the better buy.`)}
function rtConv(R){const t=R.int(1,2);if(t===1){const k=R.int(2,9);return numQ(R,`There are 12 inches in 1 foot. How many inches are in ${k} feet?`,12*k,[k+12,12*k/2,k*10],`${k} × 12 = ${12*k}.`)}
 const k=R.int(3,9);return numQ(R,`A recipe uses 3 cups of flour for every 2 cups of sugar. How many cups of flour are needed for ${2*k} cups of sugar?`,3*k,[2*k+1,k,3*k+2],`${2*k} is ${k} times 2, so flour is ${k} × 3 = ${3*k}.`)}
NJ.reg({id:'m6_ratio',subj:'math',name:'Ratios & Rates',desc:'Ratios, equivalent ratios, unit rates, unit price',n:10,full:4,daily:2,gen:topicGen([rtBasic,rtMissing,rtTable,rtUnit,rtUnit,rtBuy,rtConv])});

/* ---------- Percents ---------- */
function pcOf(R){const p=R.pick([5,10,15,20,25,30,40,50,60,75,80]),w=R.pick([20,40,60,80,120,200,240,300,400,500]),a=p*w/100;if(!Number.isInteger(a*100))return null;
 return numQ(R,`What is ${p}% of ${w}?`,a,[w-a,a*10,p+w,a/10].filter(x=>x>=0),`${p}% = ${p}/100, and ${p}/100 × ${w} = ${fmtN(a)}.`,{step:5})}
function pcWhat(R){const p=R.pick([10,20,25,40,50,60,75,80]),w=R.pick([20,40,50,80,100,200]),a=p*w/100;
 return numQ(R,`${a} is what percent of ${w}?`,p,[a,100-p,p+10,w-a],`${a} ÷ ${w} = ${p/100}, which is ${p}%.`,{step:5})}
function pcWhole(R){const p=R.pick([10,20,25,40,50,60,75]),w=R.pick([20,40,60,80,120,200]),a=p*w/100;
 return numQ(R,`${p}% of a number is ${a}. What is the number?`,w,[a*p,a+p,w/2,a*10].filter(x=>x>0&&x!==w),`If ${p}% is ${a}, then 1% is ${fmtN(a/p)}, and 100% is ${w}.`,{step:10})}
function pcConv(R){const t=R.int(1,3);
 if(t===1){const n=R.int(1,19)*5;return mk(R,`Write 0.${String(n).padStart(2,'0')} as a percent.`,`${n}%`,[`${n/10}%`,`${n*10}%`,`0.${n}%`],`Multiply by 100 to convert a decimal to a percent: ${n}%.`)}
 if(t===2){const f=R.pick([[1,2,50],[1,4,25],[3,4,75],[1,5,20],[2,5,40],[3,5,60],[1,10,10],[7,10,70],[9,20,45]]);return mk(R,`Write ${FR(f[0],f[1])} as a percent.`,`${f[2]}%`,[`${f[2]/10}%`,`${f[2]+5}%`,`${f[0]*f[1]}%`,`${100-f[2]}%`],`${f[0]}/${f[1]} = ${f[2]}/100 = ${f[2]}%.`)}
 const p=R.pick([4,8,12,35,45,60,85]);return mk(R,`Write ${p}% as a fraction in simplest form.`,fr(p,100).join('/'),[`${p}/10`,`${p}/1,000`,`1/${p}`,fr(100-p,100).join('/')],`${p}% = ${p}/100 = ${fr(p,100).join('/')}.`)}
function pcWord(R){const tot=R.pick([20,25,30,40,50,60]),p=R.pick([20,40,60,80,10,30]),b=tot*p/100;if(!Number.isInteger(b))return null;const nm=R.pick(NM6);
 return numQ(R,`In a class of ${tot} students, ${p}% ride the bus. How many students do NOT ride the bus?`,tot-b,[b,tot+b,tot-p],`${p}% of ${tot} = ${b} ride the bus. ${tot} − ${b} = ${tot-b}.`)}
NJ.reg({id:'m6_pct',subj:'math',name:'Percents',desc:'Percent of a number, finding the whole, fractions, decimals, and percents',n:10,full:3,daily:1,gen:topicGen([pcOf,pcOf,pcWhat,pcWhole,pcConv,pcConv,pcWord])});

/* ---------- Dividing fractions ---------- */
function fdFF(R){const d1=R.pick([2,3,4,5,6,8]),d2=R.pick([2,3,4,5,6,8]),a=[R.int(1,d1-1),d1],b=[R.int(1,d2-1),d2],ans=fdiv(a,b);
 return fracQ(R,`What is the quotient?\n${FR(a[0],a[1])} ÷ ${FR(b[0],b[1])}`,ans,[fmul(a,b),fdiv(b,a),fr(a[0]*b[1],a[1]*b[0]+1)],`Multiply by the reciprocal: ${a[0]}/${a[1]} × ${b[1]}/${b[0]} = ${fT(ans)}.`)}
function fdWhole(R){const d=R.pick([2,3,4,5,6]),n=R.int(1,d-1),w=R.int(2,9);
 if(R.f()<.5)return fracQ(R,`What is the quotient?\n${w} ÷ ${FR(n,d)}`,fdiv([w,1],[n,d]),[fmul([w,1],[n,d]),fdiv([n,d],[w,1])],`${w} × ${d}/${n} = ${fT(fdiv([w,1],[n,d]))}.`);
 return fracQ(R,`What is the quotient?\n${FR(n,d)} ÷ ${w}`,fdiv([n,d],[w,1]),[fmul([w,1],[n,d]),fdiv([w,1],[n,d])],`${n}/${d} × 1/${w} = ${fT(fdiv([n,d],[w,1]))}.`)}
function fdMix(R){const d=R.pick([2,3,4]),A=mixed(R.int(1,4),R.int(1,d-1),d),B=[R.int(1,3),R.pick([4,5,6,8])],ans=fdiv(A,B);if(B[0]>=B[1])return null;
 return fracQ(R,`What is the quotient?\n${fH(A)} ÷ ${FR(B[0],B[1])}`,ans,[fmul(A,B),fdiv(B,A),fdiv(A,[B[1],B[0]])],`Write ${fT(A)} as ${A[0]}/${A[1]}, then multiply by the reciprocal of ${B[0]}/${B[1]}: ${fT(ans)}.`)}
function fdWord(R){const nm=R.pick(NM6),t=R.int(1,3);
 if(t===1){const d=R.pick([2,3,4]),k=R.int(2,9),s=R.pick([3,4,6,8]),L=[k,1],p=[1,s];return numQ(R,`${nm} has ${k} pounds of trail mix and puts ${fT(p)} pound in each bag. How many bags can ${nm} fill?`,k*s,[k+s,k,s],`${k} ÷ 1/${s} = ${k} × ${s} = ${k*s}.`)}
 if(t===2){const a=[R.int(1,5),2],b=[R.int(1,3),4],ans=fdiv(a,b);if(ans[0]===0)return null;return fracQ(R,`A board is ${fT(a)} feet long. ${nm} cuts pieces that are ${fT(b)} foot long. How many pieces can ${nm} cut?`,ans,[fmul(a,b)],`${fT(a)} ÷ ${fT(b)} = ${fT(ans)} pieces.`)}
 const a=[R.int(1,3),R.pick([2,3,4])],k=R.int(2,5),ans=fdiv(a,[k,1]);return fracQ(R,`${k} friends share ${fT(a)} of a pizza equally. What fraction of the pizza does each friend get?`,ans,[fmul(a,[k,1])],`${fT(a)} ÷ ${k} = ${fT(ans)}.`)}
function fdExpr(R){const w=R.int(2,8),d=R.pick([2,3,4,5]);return mk(R,`How many ${FR(1,d)}-cup servings are in ${w} cups? Which expression models this?`,`${w} ÷ ${FR(1,d)}`,[`${FR(1,d)} ÷ ${w}`,`${w} × ${FR(1,d)}`,`${w} − ${FR(1,d)}`],`Finding how many groups of 1/${d} fit in ${w} means dividing ${w} by 1/${d}.`)}
NJ.reg({id:'m6_fdiv',subj:'math',name:'Dividing Fractions',desc:'Fraction ÷ fraction, mixed numbers, word problems',n:10,full:3,daily:1,gen:topicGen([fdFF,fdFF,fdWhole,fdMix,fdWord,fdWord,fdExpr])});

/* ---------- Decimals, GCF & LCM ---------- */
function dcMul(R){const a=R.int(12,99)/10,b=R.int(12,99)/10,ans=rd(a*b);return numQ(R,`${a.toFixed(1)} × ${b.toFixed(1)} = ?`,ans,[rd(ans*10),rd(ans/10),rd(a+b)],`Multiply as whole numbers: ${Math.round(a*10)} × ${Math.round(b*10)} = ${Math.round(a*10)*Math.round(b*10)}, then place the decimal (2 places): ${fmtN(ans)}.`,{step:.01})}
function dcDiv(R){const d=R.pick([.2,.4,.5,.25,.12,.6,.8]),q=R.int(12,300)/(R.pick([1,10])),v=rd(d*q);
 return numQ(R,`${fmtN(v)} ÷ ${d} = ?`,q,[rd(q*10),rd(q/10),rd(v*d)],`Multiply both numbers by ${d<.2||String(d).length>3?'100':'10'} to make the divisor whole, then divide: ${fmtN(q)}.`,{step:.1})}
function dcAdd(R){const a=R.int(1000,99999)/100,b=R.int(100,9999)/100,add=R.f()<.5;if(!add&&a<=b)return null;const ans=rd(add?a+b:a-b);return numQ(R,`${a.toFixed(2)} ${add?'+':'−'} ${b.toFixed(2)} = ?`,ans,[rd(ans+.1),rd(ans-.1),rd(ans+1)],`Line up the decimal points and ${add?'add':'subtract'}: ${fmtN(ans)}.`,{step:.01})}
function gcfQ(R){const g=R.pick([2,3,4,5,6,7,8,9,12]),a=g*R.int(2,9),b=g*R.int(2,9);if(a===b||gcd(a/g,b/g)!==1)return null;return numQ(R,`What is the greatest common factor (GCF) of ${a} and ${b}?`,g,[g*2,1,a-b>0?a-b:b-a,Math.min(a,b)].filter(x=>x!==g&&x>0),`The largest number that divides both ${a} and ${b} is ${g}.`)}
function lcmQ(R){const a=R.pick([2,3,4,5,6,8,9,10,12,15]),b=R.pick([3,4,5,6,8,9,10,12,15]);if(a===b)return null;const l=lcm(a,b);if(l>120)return null;return numQ(R,`What is the least common multiple (LCM) of ${a} and ${b}?`,l,[a*b===l?l+a:a*b,l/2|0,a+b,l*2].filter(x=>x!==l&&x>0),`The smallest number that is a multiple of both ${a} and ${b} is ${l}.`)}
function lcmWord(R){const a=R.pick([6,8,10,12,15]),b=R.pick([9,12,15,20]);if(a===b)return null;const l=lcm(a,b);if(l>180)return null;return numQ(R,`One bus comes every ${a} minutes and another comes every ${b} minutes. They both arrive at 8:00 A.M. In how many minutes will they next arrive together?`,l,[a*b,a+b,Math.max(a,b)],`The LCM of ${a} and ${b} is ${l} minutes.`)}
function gcfDist(R){const g=R.pick([2,3,4,6,8,12]),a=g*R.int(2,6),b=g*R.int(2,6);if(a===b||gcd(a/g,b/g)!==1)return null;return mk(R,`Which expression is equal to ${a} + ${b}?`,`${g}(${a/g} + ${b/g})`,[`${g}(${a/g} × ${b/g})`,`${g}(${a} + ${b})`,`${g+1}(${a/g} + ${b/g})`],`Factor out the GCF ${g}: ${a} + ${b} = ${g}(${a/g} + ${b/g}).`)}
NJ.reg({id:'m6_dec',subj:'math',name:'Decimals, GCF & LCM',desc:'Multi-digit decimals, greatest common factor, least common multiple',n:10,full:3,daily:1,gen:topicGen([dcMul,dcDiv,dcAdd,gcfQ,gcfQ,lcmQ,lcmWord,gcfDist])});

/* ---------- Integers & the coordinate plane ---------- */
function inOpp(R){const n=R.int(2,25),t=R.int(1,3);
 if(t===1)return numS(R,`What is the opposite of ${sg(-n)}?`,n,[-n,n+1],`Opposites are the same distance from 0 on opposite sides.`);
 if(t===2){const v=R.pick([-1,1])*n;return numS(R,`What is |${sg(v)}|?`,n,[v,-n,n+1].filter(x=>x!==n),`Absolute value is the distance from 0, so |${sg(v)}| = ${n}.`)}
 return numS(R,`What is the opposite of the opposite of ${sg(n)}?`,n,[-n],`The opposite of the opposite is the original number.`)}
function inCmp(R){const a=R.int(-20,20),b=R.int(-20,20);if(a===b)return null;const sym=a<b?'<':'>';return mk(R,`Which symbol makes the statement true?\n${sg(a)}  ___  ${sg(b)}`,sym,['<','>','='].filter(x=>x!==sym).concat(['cannot tell']),`On a number line, the number farther left is less. ${sg(a)} is ${a<b?'to the left of':'to the right of'} ${sg(b)}.`)}
function inOrd(R){const v=R.sample([-12,-8,-5,-3,-1,0,2,4,7,9],4),s=v.slice().sort((a,b)=>a-b),f=l=>l.map(sg).join(' , ');return mk(R,`Which list is in order from least to greatest?`,f(s),[f(s.slice().reverse()),f(v.slice().sort((a,b)=>Math.abs(a)-Math.abs(b))),f(R.shuffle(v))],`Order by position on the number line, from left to right.`)}
function inCtx(R){const t=R.int(1,3),a=R.int(2,30);
 if(t===1)return mk(R,`A diver is at ${sg(-a)} feet and a bird is at ${a} feet above sea level. Which statement is true?`,`The bird is at a greater elevation than the diver.`,[`The diver is at a greater elevation than the bird.`,`They are at the same elevation.`,`The diver is ${a} feet above sea level.`],`${sg(-a)} is below sea level, so it is less than ${a}.`);
 if(t===2){const b=a+R.int(2,10);return mk(R,`The temperature was ${sg(-a)}°F on Monday and ${sg(-b)}°F on Tuesday. Which day was colder?`,'Tuesday',['Monday','They were the same.','Cannot tell'],`${sg(-b)} is less than ${sg(-a)}, so Tuesday was colder.`)}
 return mk(R,`Which number represents a loss of $${a}?`,sg(-a),[String(a),`|${a}|`,`${a}0`],`A loss is represented by a negative number.`)}
function inQuad(R){const x=R.int(1,8)*R.pick([-1,1]),y=R.int(1,8)*R.pick([-1,1]),q=x>0&&y>0?'I':x<0&&y>0?'II':x<0&&y<0?'III':'IV';
 return mk(R,`In which quadrant is the point (${sg(x)}, ${sg(y)})?`,`Quadrant ${q}`,['Quadrant I','Quadrant II','Quadrant III','Quadrant IV'].filter(z=>z!==`Quadrant ${q}`),`The x-coordinate is ${x>0?'positive':'negative'} and the y-coordinate is ${y>0?'positive':'negative'}.`)}
function inRefl(R){const x=R.int(1,8)*R.pick([-1,1]),y=R.int(1,8)*R.pick([-1,1]),ax=R.pick(['x','y']);
 const ok=ax==='x'?`(${sg(x)}, ${sg(-y)})`:`(${sg(-x)}, ${sg(y)})`;return mk(R,`Point P is at (${sg(x)}, ${sg(y)}). What are the coordinates of P reflected across the ${ax}-axis?`,ok,[`(${sg(-x)}, ${sg(-y)})`,`(${sg(y)}, ${sg(x)})`,ax==='x'?`(${sg(-x)}, ${sg(y)})`:`(${sg(x)}, ${sg(-y)})`],`Reflecting across the ${ax}-axis changes the sign of the ${ax==='x'?'y':'x'}-coordinate.`)}
function inDist(R){const same=R.pick(['x','y']),c=R.int(1,6)*R.pick([-1,1]),a=R.int(1,8),b=-R.int(1,8),pa=R.f()<.5,A=same==='x'?[c,a]:[a,c],B=same==='x'?[c,b]:[b,c],d=a-b;
 return numQ(R,`What is the distance between (${sg(A[0])}, ${sg(A[1])}) and (${sg(B[0])}, ${sg(B[1])})?`,d,[Math.abs(a)-Math.abs(b),a+b>0?a+b:Math.abs(a+b)+1,d+1],`The points are on the same ${same==='x'?'vertical':'horizontal'} line. Add the distances from 0: ${a} + ${Math.abs(b)} = ${d}.`)}
function inPic(R){const ps=R.sample([[2,3],[-3,2],[-4,-2],[3,-4],[-1,4],[5,-1]],4).map((p,i)=>({n:'ABCD'[i],x:p[0],y:p[1]})),p=R.pick(ps);
 return mk(R,`What are the coordinates of point ${p.n}?`,`(${sg(p.x)}, ${sg(p.y)})`,[`(${sg(p.y)}, ${sg(p.x)})`,`(${sg(-p.x)}, ${sg(p.y)})`,`(${sg(p.x)}, ${sg(-p.y)})`],`Read across (x) first, then up or down (y).`,{pics:planeSVG({r:6,pts:ps})})}
function inNL(R){const ps=R.sample([-4,-3,-2,-1,1,2,3,4],3).map((v,i)=>({v,n:'PQR'[i]})),p=R.pick(ps);
 return mk(R,`Which point is located at ${sg(p.v)} on the number line?`,`Point ${p.n}`,ps.filter(x=>x!==p).map(x=>`Point ${x.n}`).concat(['None of these']),`Find ${sg(p.v)} on the number line.`,{pics:nlineSVG(-5,5,1,ps)})}
NJ.reg({id:'m6_int',subj:'math',name:'Integers & the Coordinate Plane',desc:'Opposites, absolute value, ordering, quadrants, reflections, distance',n:10,full:4,daily:2,gen:topicGen([inOpp,inCmp,inOrd,inCtx,inQuad,inRefl,inDist,inPic,inNL])});

/* ---------- Expressions ---------- */
function exEval(R){const t=R.int(1,4);
 if(t===1){const b=R.int(2,5),e=R.int(2,4);return numQ(R,`What is the value of ${b}${sup(e)}?`,Math.pow(b,e),[b*e,Math.pow(b,e-1),Math.pow(b,e+1)],`${b}${sup(e)} means ${b} multiplied by itself ${e} times: ${Math.pow(b,e)}.`)}
 if(t===2){const a=R.int(2,9),b=R.int(1,15),x=R.int(2,12);return numQ(R,`What is the value of ${a}x + ${b} when x = ${x}?`,a*x+b,[a*(x+b),a+x+b,a*x-b],`Substitute: ${a} × ${x} + ${b} = ${a*x+b}.`)}
 if(t===3){const a=R.int(2,6),x=R.int(2,5);return numQ(R,`What is the value of ${a}x${sup(2)} when x = ${x}?`,a*x*x,[a*x*2,Math.pow(a*x,2),a+x*x],`${x}${sup(2)} = ${x*x}, then ${a} × ${x*x} = ${a*x*x}.`)}
 const a=R.int(12,60),b=R.int(2,6),x=R.int(2,5);return numQ(R,`What is the value of ${a} ÷ ${b===5?4:b} + ${x}${sup(2)}?`,a/(b===5?4:b)+x*x,[a/(b===5?4:b)*x*x,a/(b===5?4:b)+x*2],`Powers first: ${x}${sup(2)} = ${x*x}. Then divide and add.`)}
function exWords(R){const a=R.int(2,9),b=R.int(2,15),T=[
 [`${b} more than ${a} times a number n`,`${a}n + ${b}`,[`${a}(n + ${b})`,`${a} + ${b}n`,`${a}n − ${b}`]],
 [`${b} less than ${a} times a number n`,`${a}n − ${b}`,[`${b} − ${a}n`,`${a}(n − ${b})`,`${a}n + ${b}`]],
 [`the quotient of a number n and ${a}`,`n ÷ ${a}`,[`${a} ÷ n`,`n × ${a}`,`n − ${a}`]],
 [`the sum of ${a} and a number n, multiplied by ${b}`,`${b}(${a} + n)`,[`${b}${a} + n`,`${a} + ${b}n`,`${a}(${b} + n)`]],
 [`${a} times the difference of n and ${b}`,`${a}(n − ${b})`,[`${a}n − ${b}`,`${a}(${b} − n)`,`n − ${a}${b}`]]],[w,c,d]=R.pick(T);
 return mk(R,`Which expression represents "${w}"?`,c,d,`Translate each phrase in order. The correct expression is ${c}.`)}
function exEquiv(R){const a=R.int(2,9),b=R.int(2,9),t=R.int(1,3);
 if(t===1)return mk(R,`Which expression is equivalent to ${a}(x + ${b})?`,`${a}x + ${a*b}`,[`${a}x + ${b}`,`${a+b}x`,`${a}x + ${a+b}`],`Distribute: ${a} × x + ${a} × ${b}.`);
 if(t===2){const c=R.int(2,9);return mk(R,`Which expression is equivalent to ${a}x + ${c}x + ${b}?`,`${a+c}x + ${b}`,[`${a+c}x${sup(2)} + ${b}`,`${a*c}x + ${b}`,`${a+c+b}x`],`Combine like terms: ${a}x + ${c}x = ${a+c}x.`)}
 return mk(R,`Which expression is equivalent to ${a*b}x + ${a*R.int(2,5)}?`.replace(/\+ (\d+)\?/,'+ $1?'),`${a}(${b}x + ${R.int(2,5)})`.replace(/.*/,m=>m),[],'')}
function exParts(R){const a=R.int(2,9),b=R.int(2,15),t=R.int(1,3);
 if(t===1)return mk(R,`In the expression ${a}x + ${b}, what is the coefficient of x?`,String(a),[String(b),'x',String(a+b)],`The coefficient is the number multiplied by the variable.`);
 if(t===2)return mk(R,`In the expression ${a}x + ${b}, which part is a constant term?`,String(b),[`${a}x`,'x',String(a)],`A constant term has no variable.`);
 return mk(R,`How many terms are in the expression ${a}x + ${b}y − ${R.int(2,9)}?`,'3',['2','4','1'],`The terms are separated by + and −.`)}
function exId(R){const a=R.int(2,9),b=R.int(2,9);return mk(R,`Which statement is true for all values of x?`,`${a}x + ${b}x = ${a+b}x`,[`${a}x + ${b}x = ${a*b}x`,`${a}x + ${b}x = ${a+b}x${sup(2)}`,`${a}x + ${b} = ${a+b}x`],`Like terms can be combined by adding their coefficients.`)}
NJ.reg({id:'m6_expr',subj:'math',name:'Expressions & Exponents',desc:'Evaluating, writing, and simplifying expressions; equivalent expressions',n:10,full:4,daily:2,gen:topicGen([exEval,exEval,exWords,exWords,exEquiv,exParts,exId])});
