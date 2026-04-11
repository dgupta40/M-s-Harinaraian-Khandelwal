import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');

const svgBuffer = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="4" fill="#1a1a1a"/>
  <path d="M8 24V12l8-6 8 6v12H8z" fill="none" stroke="#d97706" stroke-width="2"/>
  <path d="M14 24v-6h4v6" fill="none" stroke="#d97706" stroke-width="2"/>
</svg>`);

const sizes = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'icon-192.png', size: 192 },
  { name: 'icon-512.png', size: 512 }
];

async function generateFavicons() {
  console.log('Generating favicon PNGs...');

  for (const { name, size } of sizes) {
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(join(publicDir, name));
    console.log(`  Created ${name} (${size}x${size})`);
  }

  console.log('Done!');
}

generateFavicons().catch(console.error);
