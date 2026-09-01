"use client";

const bases = [
  { base: 2, digits: "0, 1", example: "1011₂" },
  { base: 6, digits: "0, 1, 2, 3, 4, 5", example: "153₆" },
  { base: 8, digits: "0, 1, 2, 3, 4, 5, 6, 7", example: "247₈" },
  { base: 10, digits: "0, 1, 2, 3, 4, 5, 6, 7, 8, 9", example: "156₁₀" },
  { base: 16, digits: "0–9 และ A, B, C, D, E, F", example: "AF₁₆" },
];

export default function Basics({ go }: { go: (tab: "learn") => void }) {
  return <>
    <section className="bg-[#071c36] px-[8vw] py-16 text-white">
      <p className="font-mono text-xs tracking-[.25em] text-[#1dd1c1]">NUMBER BASE BASICS</p>
      <h1 className="mt-4 text-4xl font-black md:text-6xl">เรียนพื้นฐานเลขฐาน</h1>
      <p className="mt-4 text-slate-400">รู้จักสัญลักษณ์และกฎของแต่ละฐาน ก่อนเริ่มเรียนวิธีแปลง</p>
    </section>
    <main className="glass mx-auto -mt-8 mb-20 max-w-6xl rounded-xl bg-white p-6 md:p-10">
      <p className="font-mono text-xs tracking-widest text-[#008f86]">DIGITS IN EACH BASE</p>
      <h2 className="mt-2 text-2xl font-black">แต่ละฐานประกอบด้วยตัวอะไรบ้าง?</h2>
      <p className="mt-2 text-slate-500">ฐานบอกจำนวนสัญลักษณ์ที่ใช้ได้ เริ่มนับจาก 0 และตัวเลขทุกตัวต้องมีค่าน้อยกว่าฐาน</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {bases.map(item => <article key={item.base} className="rounded-xl border border-slate-200 bg-slate-50 p-5 hover:-translate-y-1 hover:border-[#1dd1c1]">
          <span className="font-mono text-xs text-[#008f86]">BASE {item.base}</span>
          <h3 className="mt-1 text-xl font-black">ฐาน {item.base}</h3>
          <p className="mt-4 text-xs text-slate-500">สัญลักษณ์ที่ใช้ได้</p>
          <p className="mt-1 break-words font-mono font-bold text-[#007b73]">{item.digits}</p>
          <p className="mt-4 text-xs font-bold text-slate-500">ตัวอย่างการเขียน</p>
          <div className="mt-1 rounded-lg bg-[#071c36] p-3 text-center font-mono text-white">{item.example}</div>
        </article>)}
      </div>
      <section className="mt-7 rounded-xl border border-[#a9ddd6] bg-[#e9f8f5] p-5">
        <h3 className="font-bold">เลขตัวเล็กด้านล่างมาจากไหน?</h3>
        <p className="mt-2 text-sm leading-6 text-slate-600"><b>156₁₀ ไม่ได้มาจากการคำนวณข้อก่อนหน้า</b> แต่เป็นตัวอย่างการเขียนเลข 156 ในระบบฐาน 10 โดยเลขตัวเล็ก ₁₀ ใช้บอกว่าเลขข้างหน้าเป็น “ฐาน 10” ไม่ใช่เลขยกกำลัง เช่น 1011₂ อ่านว่า 1011 ฐาน 2 และ AF₁₆ อ่านว่า AF ฐาน 16</p>
      </section>
      <section className="mt-7 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border-l-4 border-[#ffb524] bg-[#fff6df] p-5">
          <h3 className="font-bold">กฎสำคัญ</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">ตัวเลขต้องน้อยกว่าฐาน เช่น ฐาน 6 ใช้ได้แค่ 0–5 ดังนั้น 126₆ เขียนไม่ได้ เพราะมีเลข 6 อยู่ในจำนวน</p>
        </div>
        <div className="rounded-xl border-l-4 border-[#1dd1c1] bg-[#e9f8f5] p-5">
          <h3 className="font-bold">ตัวอักษรในฐาน 16</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">เมื่อเลข 0–9 ไม่พอ จึงใช้ A=10, B=11, C=12, D=13, E=14 และ F=15</p>
        </div>
      </section>
      <button onClick={() => go("learn")} className="mt-7 rounded-lg bg-[#1dd1c1] px-6 py-3 font-bold">ต่อไป: เรียนวิธีแปลงฐาน →</button>
    </main>
  </>;
}
