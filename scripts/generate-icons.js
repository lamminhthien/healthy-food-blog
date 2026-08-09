import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const svgPath = path.resolve('assets/images/logo-lyn-kitchen.svg');
const outputDir = path.resolve('data/icons');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const svgBuffer = fs.readFileSync(svgPath);

async function generateIcons() {
  console.log('Generating PWA icons...');

  // 192x192 standard icon
  await sharp(svgBuffer)
    .resize(192, 192, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(outputDir, 'pwa-192x192.png'));

  // 512x512 standard icon
  await sharp(svgBuffer)
    .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(outputDir, 'pwa-512x512.png'));

  // 180x180 Apple touch icon
  await sharp(svgBuffer)
    .resize(180, 180, { fit: 'contain', background: { r: 250, g: 249, b: 246, alpha: 1 } })
    .png()
    .toFile(path.join(outputDir, 'apple-touch-icon.png'));

  // 512x512 Maskable icon (with background padding)
  await sharp(svgBuffer)
    .resize(360, 360, { fit: 'contain', background: { r: 250, g: 249, b: 246, alpha: 1 } })
    .extend({
      top: 76,
      bottom: 76,
      left: 76,
      right: 76,
      background: { r: 250, g: 249, b: 246, alpha: 1 }
    })
    .png()
    .toFile(path.join(outputDir, 'maskable-icon-512x512.png'));

  console.log('Successfully generated all PWA icons in data/icons/');
}

generateIcons().catch((err) => {
  console.error('Error generating icons:', err);
});
