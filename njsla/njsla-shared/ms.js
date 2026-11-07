/* Shared helpers for middle-school NJSLA pages (grades 6-8): signed numbers, signed fractions, plane / plot pictures */
const MN='−';
const sg=n=>n<0?MN+Math.abs(n):String(n);                 // signed display text
const sgc=n=>n<0?MN+comma(Math.abs(n)):comma(n);
const pn=n=>n<0?`(${MN}${Math.abs(n)})`:String(n);          // parenthesised if negative
/* signed whole/decimal answer: typed (40%) or multiple choice. Negative numbers are allowed. */
function numS(R,q,ans,cands,exp,extra){
 const ex=Object.assign({},extra||{});const step=ex.step||1;delete ex.step;const fx=x=>sgc(rd(x));
 if(R.f()<.4){const a=[String(rd(ans))];if(ans<0)a.push(MN+String(Math.abs(rd(ans))));return txt(q,a,exp,Object.assign({num:true},ex))}
 const seen=new Set([fx(ans)]),d=[];
 [...R.shuffle(cands||[]),ans+step,ans-step,-ans,ans+2*step,ans-2*step,ans*2,ans+10*step].forEach(x=>{if(typeof x==='number'&&isFinite(x)&&!seen.has(fx(x))){seen.add(fx(x));d.push(fx(x))}});
 return mk(R,q,fx(ans),d,exp,ex,true);
}
/* signed fraction as html / text. f=[n,d] with d>0, n may be negative */
const sfH=f=>{const[n,d]=f;if(d===1)return sg(n);const a=Math.abs(n),w=Math.floor(a/d),r=a-w*d,body=w?`${w} ${FR(r,d)}`:FR(a,d);return(n<0?MN:'')+body};
const sfT=f=>{const[n,d]=f;if(d===1)return String(n);const a=Math.abs(n),w=Math.floor(a/d),r=a-w*d;return(n<0?'-':'')+(w?`${w} ${r}/${d}`:`${a}/${d}`)};
const sfI=f=>{const[n,d]=f;return d===1?String(n):`${n}/${d}`};
const fsr=(n,d)=>fr(n,d);
function fracS(R,q,ans,cands,exp,extra){
 if(R.f()<.4){const a=[sfT(ans)];if(ans[0]<0)a.push(sfT(ans).replace('-',MN));if(ans[1]!==1&&Math.abs(ans[0])>ans[1])a.push(sfI(ans));return txt(q+'\n(Simplest form, like 3/4, -1/2, or 1 1/2.)',a,exp,extra)}
 const n=ans[0],d=ans[1],seen=new Set([sfT(ans)]),dist=[];
 const all=[...R.shuffle((cands||[]).map(c=>fr(c[0],c[1]))),fr(-n,d),fr(n+1,d),fr(n,d+1),fr(n-1,d),fr(n*2,d),fr(n,d*2),fr(d,n||1)];
 for(const c of all){if(!isFinite(c[0])||!isFinite(c[1])||c[1]<=0)continue;const t=sfT(c);if(seen.has(t))continue;seen.add(t);dist.push(sfH(c))}
 return mk(R,q,sfH(ans),dist,exp,extra);
}
/* ---- pictures ---- */
function planeSVG(o){o=o||{};const R0=o.r||5,S=Math.floor(280/(2*R0)),W=2*R0*S+40,c=W/2,X=x=>c+x*S,Y=y=>c-y*S;let s='';
 for(let i=-R0;i<=R0;i++)s+=`<line x1="${X(i)}" y1="${Y(-R0)}" x2="${X(i)}" y2="${Y(R0)}" stroke="currentColor" stroke-opacity=".15"/><line x1="${X(-R0)}" y1="${Y(i)}" x2="${X(R0)}" y2="${Y(i)}" stroke="currentColor" stroke-opacity=".15"/>`;
 s+=`<line x1="${X(-R0)-6}" y1="${Y(0)}" x2="${X(R0)+8}" y2="${Y(0)}" stroke="currentColor" stroke-width="2"/><line x1="${X(0)}" y1="${Y(-R0)-6}" x2="${X(0)}" y2="${Y(R0)+8}" stroke="currentColor" stroke-width="2"/><g font-size="10" fill="currentColor" text-anchor="middle">`;
 const st=R0>6?2:1;for(let i=-R0;i<=R0;i+=st)if(i){s+=`<text x="${X(i)}" y="${Y(0)+13}">${sg(i)}</text><text x="${X(0)-14}" y="${Y(i)+4}">${sg(i)}</text>`}
 s+=`<text x="${X(R0)+14}" y="${Y(0)+4}" font-weight="700">x</text><text x="${X(0)+8}" y="${Y(R0)-2}" font-weight="700">y</text></g>`;
 (o.lines||[]).forEach(l=>{const m=l.m,b=l.b,x1=-R0,x2=R0;s+=`<line x1="${X(x1)}" y1="${Y(m*x1+b)}" x2="${X(x2)}" y2="${Y(m*x2+b)}" stroke="${l.c||'#4C8DF6'}" stroke-width="2.5" clip-path="url(#pc${R0})"/>`});
 (o.polys||[]).forEach(p=>{s+=`<polygon points="${p.pts.map(q=>X(q[0])+','+Y(q[1])).join(' ')}" fill="${p.c||'#4C8DF6'}" fill-opacity="${p.fo===undefined?.25:p.fo}" stroke="${p.c||'#4C8DF6'}" stroke-width="2"/>`;if(p.label)p.pts.forEach((q,i)=>{s+=`<text x="${X(q[0])+6}" y="${Y(q[1])-6}" font-size="12" font-weight="700" fill="currentColor">${p.label[i]}</text>`})});
 (o.pts||[]).forEach(p=>{s+=`<circle cx="${X(p.x)}" cy="${Y(p.y)}" r="4.5" fill="${p.c||'#E0457B'}"/>${p.n?`<text x="${X(p.x)+7}" y="${Y(p.y)-7}" font-size="13" font-weight="700" fill="currentColor">${p.n}</text>`:''}`});
 const clip=`<defs><clipPath id="pc${R0}"><rect x="${X(-R0)}" y="${Y(R0)}" width="${2*R0*S}" height="${2*R0*S}"/></clipPath></defs>`;
 return svgW(W,W,clip+s,'coordinate plane');
}
function nlineSVG(a,b,step,pts,opt){opt=opt||{};const n=Math.round((b-a)/step),W=300,x0=20,dx=(W-40)/n;let s=`<line x1="${x0-8}" y1="40" x2="${W-12}" y2="40" stroke="currentColor" stroke-width="2"/>`;
 for(let i=0;i<=n;i++){const v=a+i*step,x=x0+i*dx;s+=`<line x1="${x}" y1="34" x2="${x}" y2="46" stroke="currentColor" stroke-width="2"/><text x="${x}" y="62" font-size="11" text-anchor="middle" fill="currentColor">${sg(rd(v))}</text>`}
 (pts||[]).forEach(p=>{const x=x0+(p.v-a)/step*dx;if(p.open===undefined)s+=`<circle cx="${x}" cy="40" r="5" fill="#E0457B"/>`;else s+=`<circle cx="${x}" cy="40" r="5.5" fill="${p.open?'var(--card,#fff)':'#E0457B'}" stroke="#E0457B" stroke-width="2.5"/>`;if(p.n)s+=`<text x="${x}" y="24" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">${p.n}</text>`;
  if(p.ray){const ex=p.ray>0?W-14:x0-8;s+=`<line x1="${x}" y1="40" x2="${ex}" y2="40" stroke="#E0457B" stroke-width="4"/>`}});
 return svgW(W,74,s,'number line');
}
function dotSVG(vals,lo,hi,unit){const cnt={};vals.forEach(v=>cnt[v]=(cnt[v]||0)+1);const n=hi-lo+1,cw=Math.min(36,Math.floor(300/n)),W=24+n*cw,mx=Math.max(...Object.values(cnt)),H=30+mx*16+38,base=H-38;
 let s=`<line x1="8" y1="${base}" x2="${W-8}" y2="${base}" stroke="currentColor" stroke-width="2"/>`;
 for(let v=lo;v<=hi;v++){const x=12+cw/2+(v-lo)*cw;s+=`<line x1="${x}" y1="${base-3}" x2="${x}" y2="${base+3}" stroke="currentColor"/><text x="${x}" y="${base+16}" font-size="11" text-anchor="middle" fill="currentColor">${v}</text>`;for(let j=0;j<(cnt[v]||0);j++)s+=`<circle cx="${x}" cy="${base-10-j*16}" r="6" fill="#E0457B"/>`}
 if(unit)s+=`<text x="${W/2}" y="${H-4}" font-size="10" text-anchor="middle" fill="currentColor" opacity=".7">${unit}</text>`;return svgW(W,H,s,'dot plot');
}
function histSVG(bins,counts,ttl){const n=bins.length,bw=Math.min(52,Math.floor(270/n)),W=50+n*bw,H=190,base=150,mx=Math.max(...counts),sc=mx>10?5:mx>6?2:1,top=Math.ceil(mx/sc)*sc,ph=(base-20)/top;
 let s=`<text x="${W/2}" y="12" font-size="12" font-weight="700" text-anchor="middle" fill="currentColor">${ttl||''}</text>`;
 for(let v=0;v<=top;v+=sc){const y=base-v*ph;s+=`<line x1="40" y1="${y}" x2="${W-6}" y2="${y}" stroke="currentColor" stroke-opacity=".2"/><text x="34" y="${y+4}" font-size="10" text-anchor="end" fill="currentColor">${v}</text>`}
 bins.forEach((b,i)=>{const x=42+i*bw;s+=`<rect x="${x}" y="${base-counts[i]*ph}" width="${bw}" height="${counts[i]*ph}" fill="#4C8DF6" fill-opacity=".55" stroke="currentColor"/><text x="${x+bw/2}" y="${base+14}" font-size="10" text-anchor="middle" fill="currentColor">${b}</text>`});
 s+=`<line x1="40" y1="20" x2="40" y2="${base}" stroke="currentColor" stroke-width="2"/><line x1="40" y1="${base}" x2="${W-6}" y2="${base}" stroke="currentColor" stroke-width="2"/>`;return svgW(W,H,s,'histogram');
}
function boxSVG(mn,q1,md,q3,mx,lo,hi,label){const W=320,x0=20,sc=(W-40)/(hi-lo),X=v=>x0+(v-lo)*sc;let s=`<line x1="${x0}" y1="70" x2="${W-20}" y2="70" stroke="currentColor"/>`;
 const st=hi-lo>40?10:hi-lo>20?5:hi-lo>10?2:1;for(let v=lo;v<=hi;v+=st)s+=`<line x1="${X(v)}" y1="66" x2="${X(v)}" y2="74" stroke="currentColor"/><text x="${X(v)}" y="88" font-size="10" text-anchor="middle" fill="currentColor">${v}</text>`;
 s+=`<line x1="${X(mn)}" y1="40" x2="${X(q1)}" y2="40" stroke="currentColor" stroke-width="2"/><line x1="${X(q3)}" y1="40" x2="${X(mx)}" y2="40" stroke="currentColor" stroke-width="2"/><rect x="${X(q1)}" y="26" width="${X(q3)-X(q1)}" height="28" fill="#4C8DF6" fill-opacity=".35" stroke="currentColor" stroke-width="2"/><line x1="${X(md)}" y1="26" x2="${X(md)}" y2="54" stroke="currentColor" stroke-width="3"/><line x1="${X(mn)}" y1="32" x2="${X(mn)}" y2="48" stroke="currentColor" stroke-width="2"/><line x1="${X(mx)}" y1="32" x2="${X(mx)}" y2="48" stroke="currentColor" stroke-width="2"/>`;
 if(label)s+=`<text x="${W/2}" y="14" font-size="11" text-anchor="middle" fill="currentColor" font-weight="700">${label}</text>`;return svgW(W,96,s,'box plot');
}
function scatterSVG(pts,xl,yl,xmax,ymax,line){const W=300,H=230,x0=44,y0=190,pw=W-x0-14,ph=y0-18,X=v=>x0+v/xmax*pw,Y=v=>y0-v/ymax*ph;let s='';
 for(let i=0;i<=5;i++){const gx=xmax*i/5,gy=ymax*i/5;s+=`<line x1="${X(gx)}" y1="${y0}" x2="${X(gx)}" y2="${Y(ymax)}" stroke="currentColor" stroke-opacity=".12"/><line x1="${x0}" y1="${Y(gy)}" x2="${X(xmax)}" y2="${Y(gy)}" stroke="currentColor" stroke-opacity=".12"/><text x="${X(gx)}" y="${y0+14}" font-size="10" text-anchor="middle" fill="currentColor">${rd(gx)}</text><text x="${x0-5}" y="${Y(gy)+4}" font-size="10" text-anchor="end" fill="currentColor">${rd(gy)}</text>`}
 s+=`<line x1="${x0}" y1="${y0}" x2="${X(xmax)}" y2="${y0}" stroke="currentColor" stroke-width="2"/><line x1="${x0}" y1="${y0}" x2="${x0}" y2="${Y(ymax)}" stroke="currentColor" stroke-width="2"/><text x="${(x0+W)/2}" y="${H-6}" font-size="11" text-anchor="middle" fill="currentColor">${xl}</text><text x="12" y="${(y0+18)/2}" font-size="11" text-anchor="middle" fill="currentColor" transform="rotate(-90 12 ${(y0+18)/2})">${yl}</text>`;
 if(line)s+=`<line x1="${X(0)}" y1="${Y(line.b)}" x2="${X(xmax)}" y2="${Y(Math.min(line.m*xmax+line.b,ymax*1.05))}" stroke="#4C8DF6" stroke-width="2.5"/>`;
 pts.forEach(p=>{s+=`<circle cx="${X(p[0])}" cy="${Y(p[1])}" r="4" fill="#E0457B"/>`});return svgW(W,H,s,'scatter plot');
}
/* simple triangle / shape with labelled sides: kind 'tri' (base b, height h), 'rt' right triangle legs a,b */
function triSVG(b,h,u,opt){opt=opt||{};const sx=Math.min(200,16*b+40),sy=Math.min(110,10*h+30);let s=`<polygon points="30,${sy+20} ${30+sx},${sy+20} ${30+sx*(opt.apex||.35)},20" fill="#4C8DF6" fill-opacity=".25" stroke="currentColor" stroke-width="2.5"/>`;
 s+=`<line x1="${30+sx*(opt.apex||.35)}" y1="20" x2="${30+sx*(opt.apex||.35)}" y2="${sy+20}" stroke="currentColor" stroke-dasharray="4 3"/><text x="${30+sx/2}" y="${sy+38}" font-size="13" text-anchor="middle" fill="currentColor">${b} ${u}</text><text x="${34+sx*(opt.apex||.35)}" y="${20+sy/2}" font-size="13" fill="currentColor">${h} ${u}</text>`;return svgW(sx+80,sy+48,s,'triangle');
}
function rtSVG(a,b,la,lb,lc){const sx=140,sy=100;let s=`<polygon points="30,${sy+20} ${30+sx},${sy+20} 30,20" fill="#4C8DF6" fill-opacity=".25" stroke="currentColor" stroke-width="2.5"/><path d="M30 ${sy+4}L46 ${sy+4}L46 ${sy+20}" fill="none" stroke="#E0457B" stroke-width="2"/>`;
 s+=`<text x="${30+sx/2}" y="${sy+38}" font-size="13" text-anchor="middle" fill="currentColor">${lb}</text><text x="22" y="${20+sy/2}" font-size="13" text-anchor="end" fill="currentColor">${la}</text><text x="${30+sx/2+8}" y="${20+sy/2-8}" font-size="13" fill="currentColor">${lc}</text>`;return svgW(sx+80,sy+48,s,'right triangle');
}
