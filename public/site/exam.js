const $=id=>document.getElementById(id),bases=[2,6,8,10,16],limits={easy:31,medium:255,hard:4095},names={easy:'ง่าย',medium:'ปานกลาง',hard:'ยาก'};
let questions=[],level='easy',studentName='';
const pick=a=>a[Math.floor(Math.random()*a.length)];

$('examSetup').insertAdjacentHTML('afterbegin',`<div class="student-name-box"><label for="studentName">ชื่อผู้ทำข้อสอบ</label><input id="studentName" maxlength="80" autocomplete="name" placeholder="กรอกชื่อ–นามสกุลก่อนเริ่มทำข้อสอบ"><small>ชื่อนี้จะแสดงพร้อมคะแนนในหน้าคะแนน</small><p id="nameError" role="alert"></p></div>`);

function start(chosen){
  const entered=$('studentName').value.trim();
  if(!entered){$('nameError').textContent='กรุณากรอกชื่อผู้ทำข้อสอบก่อนเลือกระดับ';$('studentName').focus();return}
  studentName=entered;$('nameError').textContent='';level=chosen;
  questions=Array.from({length:10},(_,i)=>{const decimal=1+Math.floor(Math.random()*limits[level]);let from=pick(bases),to=pick(bases);while(to===from)to=pick(bases);return{id:i+1,decimal,from,to,shown:decimal.toString(from).toUpperCase(),answer:decimal.toString(to).toUpperCase()}});
  $('examSetup').hidden=true;$('examResult').hidden=true;$('examForm').hidden=false;
  $('examLevelName').textContent=`ผู้ทำ: ${studentName} • ระดับ${names[level]} • RANDOM SET`;
  $('questionList').innerHTML=questions.map(q=>`<label class="exam-question"><b>ข้อ ${q.id}</b><span>แปลง <strong>${q.shown}<sub>${q.from}</sub></strong> เป็นฐาน ${q.to}</span><input name="q${q.id}" autocomplete="off" placeholder="คำตอบ" required></label>`).join('');scrollTo({top:260,behavior:'smooth'});
}

document.querySelectorAll('[data-exam-level]').forEach(b=>b.onclick=()=>start(b.dataset.examLevel));
$('restartExam').onclick=()=>{ $('examForm').hidden=true;$('examSetup').hidden=false;$('studentName').value=studentName;scrollTo({top:200,behavior:'smooth'}) };
$('examForm').onsubmit=e=>{e.preventDefault();const data=new FormData(e.target);let correct=0;const results=questions.map(q=>{const user=String(data.get(`q${q.id}`)).trim().toUpperCase(),ok=user===q.answer;if(ok)correct++;return{...q,user,ok}});const history=JSON.parse(localStorage.getItem('baselabExamHistory')||'[]');history.unshift({name:studentName,date:new Date().toISOString(),level,correct,total:10});localStorage.setItem('baselabExamHistory',JSON.stringify(history.slice(0,50)));$('examForm').hidden=true;$('examResult').hidden=false;$('examScore').textContent=`${studentName} ได้ ${correct} / 10 คะแนน`;$('reviewList').innerHTML=results.map(r=>`<article class="review-item ${r.ok?'pass':'fail'}"><div><b>${r.ok?'✓ ถูก':'✕ ผิด'} — ข้อ ${r.id}</b><span>${r.shown}<sub>${r.from}</sub> → ฐาน ${r.to}</span></div><p>คำตอบของคุณ: <strong>${r.user}</strong><br>เฉลย: <strong>${r.answer}<sub>${r.to}</sub></strong> (มีค่า ${r.decimal} ในฐาน 10)</p></article>`).join('');scrollTo({top:250,behavior:'smooth'})};


