import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import toIco from 'to-ico';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '..', 'public');
const input = path.join(publicDir, 'favicon.png');
const output = path.join(publicDir, 'favicon.ico');

const sizes = [32, 16]; // to-ico supported sizes
const buffers = await Promise.all(
  sizes.map((size) =>
    sharp(fs.readFileSync(input))
      .resize(size, size)
      .png()
      .toBuffer()
  )
);

const ico = await toIco(buffers);
fs.writeFileSync(output, ico);
console.log('Written', output);
