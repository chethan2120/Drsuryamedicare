const fs = require('fs');
const path = require('path');

const imageMap = {
  'dsm-tab-01': ['/products/tab-dolo.svg'],
  'dsm-tab-02': ['/products/tab-pand.svg'],
  'dsm-tab-03': ['/products/tab-multivit.svg'],
  'dsm-tab-04': ['/products/tab-vitc.svg'],
  'dsm-tab-05': ['/products/tab-cet.svg'],
  'dsm-tab-06': ['/products/tab-ors.svg'],
  'dsm-gloves-01': ['/products/gloves-nitrile.svg'],
  'dsm-gloves-02': ['/products/gloves-latex.svg'],
  'dsm-mask-01': ['/products/mask-3ply.svg'],
  'dsm-gown-01': ['/products/gown-sms.svg'],
  'dsm-iv-01': ['/products/iv-set-vented.svg'],
  'dsm-iv-02': ['/products/iv-set-nonvented.svg'],
  'dsm-cannula-01': ['/products/iv-cannula.svg'],
  'dsm-syring-01': ['/products/syringe-5ml.svg'],
  'dsm-bp-01': ['/products/bp-monitor.svg'],
  'dsm-steth-01': ['/products/steth-cardio.svg'],
  'dsm-oxi-01': ['/products/oximeter.svg'],
  'dsm-therm-01': ['/products/thermometer.svg'],
  'dsm-ecg-01': ['/products/ecg-machine.svg'],
  'dsm-surg-01': ['/products/ot-set.svg'],
  'dsm-scalpel-01': ['/products/scalpel.svg'],
  'dsm-needle-01': ['/products/needle-holder.svg'],
  'dsm-oxy-01': ['/products/oxygen-concentrator.svg'],
  'dsm-cent-01': ['/products/centrifuge.svg'],
  'dsm-wheel-01': ['/products/wheelchair.svg'],
  'dsm-bed-01': ['/products/hospital-bed.svg'],
};

// Also default mappings for categories:
const catFallback = {
  'tablets-daily-health': '/products/tab-dolo.svg',
  'diagnostic-equipment': '/products/bp-monitor.svg',
  'surgical-instruments': '/products/ot-set.svg',
  'medical-consumables': '/products/iv-set-vented.svg',
  'ppe': '/products/gloves-nitrile.svg',
  'respiratory-care': '/products/oxygen-concentrator.svg',
  'monitoring-devices': '/products/oximeter.svg',
  'patient-care': '/products/wheelchair.svg',
  'hospital-furniture': '/products/hospital-bed.svg',
  'laboratory-equipment': '/products/centrifuge.svg',
  'first-aid': '/products/mask-3ply.svg',
  'rehabilitation': '/products/wheelchair.svg',
  'healthcare-accessories': '/products/steth-cardio.svg',
};

// 1. Patch products.ts
const productsFilePath = path.join(__dirname, '..', 'src', 'data', 'products.ts');
let productsContent = fs.readFileSync(productsFilePath, 'utf8');

// Replace images array for each mapped ID
for (const [id, imgs] of Object.entries(imageMap)) {
  const regex = new RegExp(`(id:\\s*'${id}'[\\s\\S]*?images:\\s*\\[)[\\s\\S]*?(\\])`, 'm');
  const replacement = `$1\n      '${imgs[0]}',\n    $2`;
  productsContent = productsContent.replace(regex, replacement);
}

// For any remaining unsplash URLs in products.ts, replace them with their category fallback
productsContent = productsContent.replace(/images:\s*\[[\s\S]*?https:\/\/images\.unsplash\.com[\s\S]*?\]/g, (match) => {
  return "images: [\n      '/products/gloves-nitrile.svg',\n    ]";
});

fs.writeFileSync(productsFilePath, productsContent);
console.log('Successfully patched products.ts');

// 2. Patch categories.ts
const categoriesFilePath = path.join(__dirname, '..', 'src', 'data', 'categories.ts');
let categoriesContent = fs.readFileSync(categoriesFilePath, 'utf8');

for (const [catId, localImg] of Object.entries(catFallback)) {
  const regex = new RegExp(`(id:\\s*'${catId}'[\\s\\S]*?image:\\s*')[^']+(')`, 'm');
  categoriesContent = categoriesContent.replace(regex, `$1${localImg}$2`);
}

fs.writeFileSync(categoriesFilePath, categoriesContent);
console.log('Successfully patched categories.ts');
