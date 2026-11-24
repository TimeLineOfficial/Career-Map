import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const src = path.resolve(__dirname, '../dist/spa/index.html');
const dest = path.resolve(__dirname, '../dist/spa/404.html');

if (fs.existsSync(src)) {
  fs.copyFileSync(src, dest);
  console.log('✓ Created dist/spa/404.html for GitHub Pages fallback');
}
