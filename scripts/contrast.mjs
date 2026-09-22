import { readFileSync } from 'node:fs';

const lin = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
const parse = (hex) => {
  const h = hex.replace('#', '');
  const n = h.length === 3 ? h.split('').map((x) => x + x).join('') : h;
  return [0, 2, 4].map((i) => parseInt(n.slice(i, i + 2), 16));
};
const lum = (hex) => { const [r, g, b] = parse(hex).map(lin); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
export const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };

const pairs = JSON.parse(readFileSync(process.argv[2], 'utf8'));
let fail = 0;
for (const p of pairs) {
  const r = ratio(p.fg, p.bg);
  const need = p.min ?? 4.5;
  const ok = r >= need;
  if (!ok) fail++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${r.toFixed(2).padStart(5)}:1  need ${need}  ${p.fg} on ${p.bg}  ${p.label ?? ''}`);
}
process.exit(fail ? 1 : 0);
