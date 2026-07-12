/**
 * JaipurRide — Build Script
 * Copies web assets into www/ directory for Capacitor to bundle into the Android app.
 * No bundler needed — this is a static site with ES Modules.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'www');

// Directories and files to copy
const COPY_ITEMS = [
  'index.html',
  'css',
  'js',
  'assets',
  'logo1.png',
];

/**
 * Recursively copy a directory
 */
function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

/**
 * Clean and rebuild www/
 */
function build() {
  console.log('🧹 Cleaning www/ ...');
  if (fs.existsSync(OUT)) {
    fs.rmSync(OUT, { recursive: true, force: true });
  }
  fs.mkdirSync(OUT, { recursive: true });

  console.log('📦 Copying web assets to www/ ...');
  for (const item of COPY_ITEMS) {
    const src = path.join(ROOT, item);
    const dest = path.join(OUT, item);

    if (!fs.existsSync(src)) {
      console.warn(`  ⚠️  Skipping missing: ${item}`);
      continue;
    }

    const stat = fs.statSync(src);
    if (stat.isDirectory()) {
      copyDir(src, dest);
      console.log(`  📁 ${item}/`);
    } else {
      fs.copyFileSync(src, dest);
      console.log(`  📄 ${item}`);
    }
  }

  // Copy manifest and service worker to www root
  const extras = ['manifest.json', 'sw.js'];
  for (const file of extras) {
    const src = path.join(ROOT, file);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, path.join(OUT, file));
      console.log(`  📄 ${file}`);
    }
  }

  console.log('✅ Build complete! Output: www/');
}

build();
