// One-off image compressor: shrinks public/cases/*.jpg and brand icons.
import sharp from "sharp";
import fs from "fs";
import path from "path";

const root = process.cwd();
const casesDir = path.join(root, "public", "cases");

async function compressJpg(file, maxW = 1280, quality = 78) {
  const buf = fs.readFileSync(file);
  const out = await sharp(buf)
    .resize({ width: maxW, withoutEnlargement: true })
    .jpeg({ quality, mozjpeg: true })
    .toBuffer();
  fs.writeFileSync(file, out);
  return { before: buf.length, after: out.length };
}

async function compressPng(file, maxW) {
  const buf = fs.readFileSync(file);
  const out = await sharp(buf)
    .resize({ width: maxW, withoutEnlargement: true })
    .png({ quality: 80, compressionLevel: 9 })
    .toBuffer();
  fs.writeFileSync(file, out);
  return { before: buf.length, after: out.length };
}

const kb = (n) => `${Math.round(n / 1024)}KB`;

let totalBefore = 0;
let totalAfter = 0;

for (const f of fs.readdirSync(casesDir)) {
  if (!f.endsWith(".jpg")) continue;
  const r = await compressJpg(path.join(casesDir, f));
  totalBefore += r.before;
  totalAfter += r.after;
  console.log(`${f}: ${kb(r.before)} -> ${kb(r.after)}`);
}

for (const [name, w] of [
  ["main_icon.png", 800],
  ["logo_icon.png", 256],
]) {
  const file = path.join(root, "public", name);
  if (fs.existsSync(file)) {
    const r = await compressPng(file, w);
    totalBefore += r.before;
    totalAfter += r.after;
    console.log(`${name}: ${kb(r.before)} -> ${kb(r.after)}`);
  }
}

console.log(`\nTOTAL: ${kb(totalBefore)} -> ${kb(totalAfter)}`);
