/**
 * AUTO IMAGE SYNC SCRIPT FOR GOOGLE FLOW
 * Run this anytime you download or paste raw Google Flow images into `assets/images/`
 * Usage: node update-images.js
 */

const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, 'assets', 'images');
const SCRIPT_PATH = path.join(__dirname, 'js', 'script.js');

// Keywords mapping to match Google Flow auto-generated names, prompts, or standard filenames
const CATEGORY_KEYWORDS = {
  office: ['office', 'tower', 'corporate', 'workstation', 'boardroom', 'workspace', 'desk'],
  retail: ['retail', 'shop', 'store', 'showroom', 'boutique', 'mall', 'shopping'],
  industrial: ['industrial', 'warehouse', 'logistics', 'shed', 'factory', 'dock', 'manufacturing'],
  building: ['building', 'plaza', 'tower', 'commercial', 'facade', 'architecture']
};

function main() {
  if (!fs.existsSync(IMAGES_DIR)) {
    console.error(`Images directory not found: ${IMAGES_DIR}`);
    return;
  }

  const allFiles = fs.readdirSync(IMAGES_DIR);
  const imageFiles = allFiles.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ['.jpg', '.jpeg', '.png', '.webp'].includes(ext) && !file.startsWith('.');
  });

  console.log(`\nFound ${imageFiles.length} image(s) in assets/images/`);

  if (imageFiles.length === 0) {
    console.log('No images found yet. Simply paste your Google Flow downloaded files into assets/images/ and run this script again!');
    return;
  }

  // Print detected files
  imageFiles.forEach((file, index) => {
    console.log(`  [${index + 1}] ${file}`);
  });

  // Categorize or index images
  let scriptContent = fs.readFileSync(SCRIPT_PATH, 'utf-8');

  // Let's create an image manifest mapping property IDs to detected images
  console.log('\nAuto-mapping images to properties...');
  
  // Update js/script.js to inject image property dynamically
  const manifest = {};
  
  // Try to match by keyword or distribute sequentially
  const offices = imageFiles.filter(f => matchesCategory(f, 'office'));
  const retails = imageFiles.filter(f => matchesCategory(f, 'retail'));
  const industrials = imageFiles.filter(f => matchesCategory(f, 'industrial'));
  const buildings = imageFiles.filter(f => matchesCategory(f, 'building'));

  // Remaining pool for unassigned
  let remaining = [...imageFiles];

  function pickImage(pool, fallbackPool) {
    if (pool && pool.length > 0) {
      const img = pool.shift();
      remaining = remaining.filter(f => f !== img);
      return img;
    }
    if (fallbackPool && fallbackPool.length > 0) {
      return fallbackPool.shift();
    }
    return null;
  }

  // Target assignments for the 8 default properties
  const assignments = [
    { id: 'CP-101', preferred: offices },
    { id: 'CP-102', preferred: retails },
    { id: 'CP-103', preferred: industrials },
    { id: 'CP-104', preferred: buildings },
    { id: 'CP-105', preferred: offices },
    { id: 'CP-106', preferred: retails },
    { id: 'CP-107', preferred: industrials },
    { id: 'CP-108', preferred: offices }
  ];

  assignments.forEach((item, idx) => {
    let chosen = pickImage(item.preferred, remaining);
    if (!chosen && imageFiles.length > 0) {
      chosen = imageFiles[idx % imageFiles.length]; // cycle if fewer files
    }
    if (chosen) {
      manifest[item.id] = `assets/images/${chosen}`;
      console.log(`  -> Property ${item.id} mapped to: ${chosen}`);
    }
  });

  // Write image manifest JSON
  const manifestPath = path.join(__dirname, 'assets', 'images', 'manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`\nSaved manifest to assets/images/manifest.json`);

  console.log('\nAll done! The website will now automatically display the images exactly as named by Google Flow.\n');
}

function matchesCategory(filename, category) {
  const lower = filename.toLowerCase();
  const words = CATEGORY_KEYWORDS[category] || [];
  return words.some(w => lower.includes(w));
}

main();
