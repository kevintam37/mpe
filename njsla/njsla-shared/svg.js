/* Shared SVG/picture helpers for NJSLA grades 3 and 4 */
const FL='fill="#4C8DF6" fill-opacity=".55"';
const svgW=(w,h,body,aria)=>`<div class="pics"><div class="pic" style="padding:6px"><svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="${aria||'picture'}" style="color:currentColor">${body}</svg></div></div>`;
const inl=(w,h,body)=>`<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" style="color:currentColor">${body}</svg>`;
/* fraction answer, always multiple choice, fractions are not simplified */
function fq3(R,q,ans,cands,exp,extra){
 const[n,d]=ans,seen=new Set([n/d+'']),dist=[];
 [...R.shuffle(cands||[]),[d,n],[n+1,d],[n,d+1],[Math.max(n-1,1),d],[n,Math.max(d-1,2)]].forEach(c=>{if(!c[1]||c[0]<0)return;const v=c[0]/c[1];if(!seen.has(v+'')){seen.add(v+'');dist.push(FR(c[0],c[1]))}});
 return mk(R,q,FR(n,d),dist,exp,extra);
}
function rectLab(l,w,u){const sx=Math.min(150,l*14+30),sy=Math.min(90,w*14+20);return svgW(sx+80,sy+50,`<rect x="40" y="20" width="${sx}" height="${sy}" fill="none" stroke="currentColor" stroke-width="2.5"/><text x="${40+sx/2}" y="14" font-size="14" text-anchor="middle" fill="currentColor">${l} ${u}</text><text x="${34}" y="${20+sy/2+5}" font-size="14" text-anchor="end" fill="currentColor">${w} ${u}</text>`,'rectangle with sides labeled')}


/* generic line plot svg: ticks T=[[n,d],...], counts, unit label */
function lpSvg(T,cnt,unit){
 const cw=Math.min(44,Math.floor(300/T.length)),W=20+T.length*cw,mx=Math.max(...cnt),H=34+mx*17+8,base=H-28;
 let s=`<line x1="8" y1="${base}" x2="${W-8}" y2="${base}" stroke="currentColor" stroke-width="2"/>`;
 T.forEach((t,i)=>{const cx=10+cw/2+i*cw;s+=`<line x1="${cx}" y1="${base-4}" x2="${cx}" y2="${base+4}" stroke="currentColor" stroke-width="2"/><text x="${cx}" y="${base+16}" font-size="11" text-anchor="middle" fill="currentColor">${fT(t)}</text>`;
  for(let j=0;j<cnt[i];j++){const y=base-13-j*17;s+=`<path d="M${cx-5} ${y-5}L${cx+5} ${y+5}M${cx+5} ${y-5}L${cx-5} ${y+5}" stroke="#E0457B" stroke-width="2.4" stroke-linecap="round"/>`}});
 s+=`<text x="${W/2}" y="${H-2}" font-size="11" text-anchor="middle" fill="currentColor" opacity=".75">${unit}</text>`;
 return svgW(W,H,s,'line plot');
}
