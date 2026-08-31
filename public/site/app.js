const $ = (id) => document.getElementById(id);
const fromBase = $('fromBase');
const toBase = $('toBase');
const numberInput = $('numberInput');
const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

for (const base of [2, 6, 8, 10, 16]) {
  fromBase.add(new Option(`ฐาน ${base}`, base, base === 2, base === 2));
  toBase.add(new Option(`ฐาน ${base}`, base, base === 10, base === 10));
}

function parseBigInt(value, base) {
  let result = 0n;
  for (const char of value.toUpperCase()) {
    const digit = digits.indexOf(char);
    if (digit < 0 || digit >= base) throw new Error(`“${char}” ใช้ไม่ได้ในฐาน ${base}`);
    result = result * BigInt(base) + BigInt(digit);
  }
  return result;
}

function convert() {
  const raw = numberInput.value.trim();
  const source = Number(fromBase.value);
  const target = Number(toBase.value);
  $('errorText').textContent = '';
  if (!raw) { $('errorText').textContent = 'กรุณากรอกค่าที่ต้องการคำนวณ'; return; }
  try {
    const decimal = parseBigInt(raw, source);
    const result = decimal.toString(target).toUpperCase();
    $('resultValue').textContent = result;
    $('resultMeta').innerHTML = `${raw.toUpperCase()}<sub>${source}</sub> = ${result}<sub>${target}</sub>`;
    [2,8,10,16].forEach(base => $(`quick${base}`).textContent = decimal.toString(base).toUpperCase());
  } catch (error) { $('errorText').textContent = error.message; }
}

$('convertBtn').addEventListener('click', convert);
numberInput.addEventListener('keydown', e => { if (e.key === 'Enter') convert(); });
$('swapBtn').addEventListener('click', () => { const a = fromBase.value; fromBase.value = toBase.value; toBase.value = a; const prior = $('resultValue').textContent; if (prior && prior !== '—') numberInput.value = prior; convert(); });
$('copyBtn').addEventListener('click', async () => { try { await navigator.clipboard.writeText($('resultValue').textContent); $('copyBtn').textContent = '✓'; setTimeout(() => $('copyBtn').textContent = '□', 1200); } catch {} });

convert();


