/**
 * JaipurRide — Asset Synchronization Script
 * Copies mobile app assets (HTML, CSS, JS, Images, Releases) into the Next.js website's public directory.
 * This removes duplicate files from version control and guarantees synchronization.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const MOBILE_DIR = path.join(ROOT, 'mobile');
const WEBSITE_DIR = path.join(ROOT, 'website');

const SIMULATOR_DEST = path.join(WEBSITE_DIR, 'public', 'simulator');
const IMAGES_DEST = path.join(WEBSITE_DIR, 'public', 'images');
const RELEASES_DEST = path.join(WEBSITE_DIR, 'public', 'release');

/**
 * Clean a directory if it exists and create it fresh
 */
function cleanAndCreateDir(dirPath) {
  if (fs.existsSync(dirPath)) {
    if (dirPath === IMAGES_DEST) {
      console.log(`🧹 Smart cleaning images directory: ${path.relative(ROOT, dirPath)}`);
      const preserveFiles = ['qrcraft.png', 'google-play.svg', 'google play.svg'];
      fs.readdirSync(dirPath).forEach((file) => {
        if (!preserveFiles.includes(file)) {
          const filePath = path.join(dirPath, file);
          fs.rmSync(filePath, { recursive: true, force: true });
        }
      });
      return;
    }
    console.log(`🧹 Cleaning target directory: ${path.relative(ROOT, dirPath)}`);
    fs.rmSync(dirPath, { recursive: true, force: true });
  }
  fs.mkdirSync(dirPath, { recursive: true });
}

/**
 * Copy directory recursively (with fallback support for older Node versions)
 */
function copyRecursive(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();

  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursive(
        path.join(src, childItemName),
        path.join(dest, childItemName)
      );
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

function sync() {
  console.log('🔄 Starting Asset Synchronization...');

  // 1. Sync simulator assets
  cleanAndCreateDir(SIMULATOR_DEST);
  console.log('📦 Syncing mobile simulator files to website...');
  
  const simItems = [
    { src: 'index.html', dest: 'index.html' },
    { src: 'logo1.png', dest: 'logo1.png' },
    { src: 'css', dest: 'css' },
    { src: 'js', dest: 'js' },
    { src: 'assets', dest: 'assets' },
    { src: 'sw.js', dest: 'sw.js' }
  ];

  for (const item of simItems) {
    const srcPath = path.join(MOBILE_DIR, item.src);
    const destPath = path.join(SIMULATOR_DEST, item.dest);

    if (fs.existsSync(srcPath)) {
      copyRecursive(srcPath, destPath);
      console.log(`  ✓ Synced ${item.src} -> simulator/${item.dest}`);
    } else {
      console.warn(`  ⚠️ Skipping missing mobile file: ${item.src}`);
    }
  }

  // Note: sw.js is copied only to website/public/simulator/sw.js via the simItems loop.

  // 2. Sync tourist images to website public/images
  cleanAndCreateDir(IMAGES_DEST);
  const mobileImagesSrc = path.join(MOBILE_DIR, 'assets', 'images');
  if (fs.existsSync(mobileImagesSrc)) {
    console.log('🖼️ Syncing tourist attraction images...');
    copyRecursive(mobileImagesSrc, IMAGES_DEST);
    console.log('  ✓ Synced mobile/assets/images -> website/public/images');
  } else {
    console.warn('  ⚠️ Mobile image assets directory not found!');
  }

  // 3. Sync release binaries to website public/release
  cleanAndCreateDir(RELEASES_DEST);
  const mobileReleasesSrc = path.join(MOBILE_DIR, 'releases');
  if (fs.existsSync(mobileReleasesSrc)) {
    console.log('🤖 Syncing compiled Android releases...');
    copyRecursive(mobileReleasesSrc, RELEASES_DEST);
    console.log('  ✓ Synced mobile/releases -> website/public/release');
  } else {
    console.log('  ℹ️ No compiled mobile releases found in mobile/releases.');
  }

  console.log('✅ Asset synchronization complete!');
}

try {
  sync();
} catch (error) {
  console.error('❌ Sync failed:', error);
  process.exit(1);
}
