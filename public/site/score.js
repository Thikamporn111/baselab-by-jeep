const $=id=>document.getElementById(id),names={easy:'ง่าย',medium:'ปานกลาง',hard:'ยาก'};
const getHistory=()=>JSON.parse(localStorage.getItem('baselabExamHistory')||'[]');
const saveHistory=h=>localStorage.setItem('baselabExamHistory',JSON.stringify(h.slice(0,50)));

function render(){
  const h=getHistory(),correct=h.reduce((s,x)=>s+x.correct,0),total=h.reduce((s,x)=>s+x.total,0),pct=total?Math.round(correct/total*100):0,best=h.length?Math.max(...h.map(x=>x.correct)):0;
  $('percent').textContent=`${pct}%`;$('scoreRing').style.setProperty('--score',`${pct*3.6}deg`);$('correctStat').textContent=correct;$('attemptStat').textContent=total;$('setStat').textContent=h.length;$('bestStat').textContent=`${best}/10`;
  if(h.length){
    const latestName=h[0].name||'ไม่ระบุชื่อ';$('latestScore').textContent=`${latestName}: ${h[0].correct} / ${h[0].total} คะแนน`;$('scoreMessage').textContent=`ข้อสอบระดับ${names[h[0].level]} • ${new Date(h[0].date).toLocaleString('th-TH')}`;
    $('historyList').innerHTML=h.map((x,i)=>`<div class="named-score"><b>${x.name||'ไม่ระบุชื่อ'}</b><span>ระดับ${names[x.level]}</span><time>${new Date(x.date).toLocaleString('th-TH')}</time><strong>${x.correct}/${x.total}</strong><button class="delete-score" data-delete="${i}" aria-label="ลบคะแนนของ ${x.name||'ผู้ทำข้อสอบ'}">ลบ</button></div>`).join('');
  }else{$('latestScore').textContent='ยังไม่มีคะแนน';$('scoreMessage').textContent='เริ่มทำโจทย์จริงเพื่อบันทึกคะแนน';$('historyList').innerHTML='<p class="empty-history">ยังไม่มีประวัติการทำข้อสอบ</p>'}
}

$('historyList').addEventListener('click',e=>{const index=e.target.dataset.delete;if(index===undefined)return;const h=getHistory(),item=h[Number(index)];if(confirm(`ลบคะแนนของ ${item.name||'ผู้ทำข้อสอบ'} ${item.correct}/${item.total} ใช่หรือไม่?`)){h.splice(Number(index),1);saveHistory(h);render()}});
$('resetScore').onclick=()=>{if(confirm('ต้องการล้างประวัติคะแนนทั้งหมดหรือไม่?')){localStorage.removeItem('baselabExamHistory');render()}};
render();


