import fs from 'fs';
import path from 'path';
import { Resvg } from '@resvg/resvg-js';

const circularSvgPath = path.resolve('public/assets/calming-corner-logo.svg');
const horizontalSvgPath = path.resolve('public/assets/calming-corner-logo-horizontal.svg');

const circularSvg = fs.readFileSync(circularSvgPath, 'utf8');
const horizontalSvg = fs.readFileSync(horizontalSvgPath, 'utf8');

// 1. Generate High-Res 1200x1200 Circular Badge PNG
const resvgBadge = new Resvg(circularSvg, {
  fitTo: { mode: 'width', value: 1200 },
  font: { defaultFontFamily: 'sans-serif' }
});
const badgePngData = resvgBadge.render();
const badgeBuffer = badgePngData.asPng();

fs.writeFileSync('calming-corner-logo.png', badgeBuffer);
fs.writeFileSync('public/assets/calming-corner-logo.png', badgeBuffer);
console.log('Created calming-corner-logo.png (1200x1200px)');

// 2. Generate Transparent Version (without outer background rect/fill)
const transparentSvg = circularSvg.replace('fill="#FAF6F0"', 'fill="none"');
const resvgTransparent = new Resvg(transparentSvg, {
  fitTo: { mode: 'width', value: 1200 },
  font: { defaultFontFamily: 'sans-serif' }
});
const transPngData = resvgTransparent.render();
const transBuffer = transPngData.asPng();
fs.writeFileSync('calming-corner-logo-transparent.png', transBuffer);
fs.writeFileSync('public/assets/calming-corner-logo-transparent.png', transBuffer);
console.log('Created calming-corner-logo-transparent.png');

// 3. Generate Horizontal Banner PNG (1400px wide)
const resvgHorizontal = new Resvg(horizontalSvg, {
  fitTo: { mode: 'width', value: 1400 },
  font: { defaultFontFamily: 'sans-serif' }
});
const horizPngData = resvgHorizontal.render();
const horizBuffer = horizPngData.asPng();
fs.writeFileSync('calming-corner-logo-horizontal.png', horizBuffer);
fs.writeFileSync('public/assets/calming-corner-logo-horizontal.png', horizBuffer);
console.log('Created calming-corner-logo-horizontal.png (1400x400px)');
