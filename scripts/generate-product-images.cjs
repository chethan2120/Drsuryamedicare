const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'public', 'products');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

function makeSvg(title, code, category, color1, color2, iconPath) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
  <defs>
    <linearGradient id="bg_${code}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FFFCF6"/>
      <stop offset="100%" stop-color="#F4ECE1"/>
    </linearGradient>
    <linearGradient id="card_${code}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${color1}"/>
      <stop offset="100%" stop-color="${color2}"/>
    </linearGradient>
    <filter id="sh_${code}" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="16" stdDeviation="20" flood-color="#046A38" flood-opacity="0.14"/>
    </filter>
  </defs>
  <rect width="600" height="600" fill="url(#bg_${code})"/>
  
  <!-- Subtle circular halo -->
  <circle cx="300" cy="270" r="180" fill="${color1}" opacity="0.08"/>

  <!-- Main Product Canvas Box -->
  <g filter="url(#sh_${code})" transform="translate(100, 90)">
    <rect x="0" y="0" width="400" height="360" rx="28" fill="white" stroke="#E7E2D8" stroke-width="3"/>
    
    <!-- Top Brand Header Bar -->
    <path d="M0 28 Q0 0 28 0 L372 0 Q400 0 400 28 L400 75 L0 75 Z" fill="url(#card_${code})"/>
    <text x="24" y="38" font-family="Plus Jakarta Sans, sans-serif" font-weight="800" font-size="16" fill="#FFFCF6">${title}</text>
    <text x="24" y="58" font-family="Inter, sans-serif" font-weight="600" font-size="11" fill="#EAF3E9">${category} • CDSCO VERIFIED</text>
    
    <!-- Custom Rendered Icon/Illustration in Center -->
    <g transform="translate(80, 110)">
      ${iconPath}
    </g>

    <!-- Bottom Specs Pill -->
    <rect x="24" y="300" width="110" height="26" rx="6" fill="#046A38"/>
    <text x="79" y="317" font-family="Inter, sans-serif" font-weight="700" font-size="11" fill="white" text-anchor="middle">IN STOCK</text>
    <rect x="144" y="300" width="110" height="26" rx="6" fill="#EAF3E9"/>
    <text x="199" y="317" font-family="Inter, sans-serif" font-weight="700" font-size="11" fill="#046A38" text-anchor="middle">GENUINE BATCH</text>
  </g>

  <!-- Top Left Dr Surya Brand Tag -->
  <rect x="40" y="40" width="170" height="32" rx="16" fill="#046A38" opacity="0.12"/>
  <text x="125" y="61" font-family="Plus Jakarta Sans, sans-serif" font-weight="700" font-size="11" fill="#046A38" text-anchor="middle">DR SURYA MEDICARE</text>
</svg>`;
}

const extraProducts = [
  {
    name: 'syringe-5ml.svg',
    title: 'SuryaInject 5ml Syringes',
    code: 'syr5',
    category: 'HOSPITAL CONSUMABLES',
    color1: '#0284c7',
    color2: '#0369a1',
    renderIcon: `
      <!-- 5ml Syringe Vector -->
      <rect x="60" y="30" width="120" height="50" rx="4" fill="#f8fafc" stroke="#64748b" stroke-width="3"/>
      <!-- Milliliter gradations -->
      <line x1="80" y1="30" x2="80" y2="45" stroke="#0284c7" stroke-width="2"/>
      <line x1="100" y1="30" x2="100" y2="45" stroke="#0284c7" stroke-width="2"/>
      <line x1="120" y1="30" x2="120" y2="45" stroke="#0284c7" stroke-width="2"/>
      <line x1="140" y1="30" x2="140" y2="45" stroke="#0284c7" stroke-width="2"/>
      <line x1="160" y1="30" x2="160" y2="45" stroke="#0284c7" stroke-width="2"/>
      <text x="80" y="60" font-family="Inter, sans-serif" font-size="10" font-weight="bold" fill="#0284c7">1</text>
      <text x="120" y="60" font-family="Inter, sans-serif" font-size="10" font-weight="bold" fill="#0284c7">3</text>
      <text x="160" y="60" font-family="Inter, sans-serif" font-size="10" font-weight="bold" fill="#0284c7">5ml</text>
      <!-- Plunger -->
      <rect x="0" y="45" width="60" height="20" rx="2" fill="#046A38"/>
      <rect x="0" y="35" width="8" height="40" rx="2" fill="#073D27"/>
      <!-- Needle Hub & Needle -->
      <polygon points="180,45 195,50 195,60 180,65" fill="#38bdf8"/>
      <line x1="195" y1="55" x2="240" y2="55" stroke="#94a3b8" stroke-width="3"/>
    `
  },
  {
    name: 'iv-set-nonvented.svg',
    title: 'SuryaFlow Non-Vented IV Set',
    code: 'ivnon',
    category: 'INFUSION CONSUMABLES',
    color1: '#046A38',
    color2: '#073D27',
    renderIcon: `
      <!-- Drip Chamber -->
      <rect x="80" y="10" width="40" height="70" rx="6" fill="#f0f9ff" stroke="#0284c7" stroke-width="2"/>
      <line x1="80" y1="45" x2="120" y2="45" stroke="#38bdf8" stroke-width="2"/>
      <!-- Tubing loop -->
      <path d="M 100 80 C 100 130, 20 140, 20 180 C 20 220, 180 200, 180 240" fill="none" stroke="#38bdf8" stroke-width="8" stroke-linecap="round"/>
      <!-- Amber Latex bulb -->
      <ellipse cx="140" cy="180" rx="14" ry="24" fill="#fbbf24" stroke="#d97706" stroke-width="2"/>
    `
  },
  {
    name: 'gown-sms.svg',
    title: 'SuryaMed Sterile SMS Gown',
    code: 'gownsms',
    category: 'PPE & SURGICAL APPAREL',
    color1: '#0284c7',
    color2: '#0369a1',
    renderIcon: `
      <!-- Medical Gown Illustration -->
      <path d="M 60 20 L 100 0 L 140 20 L 180 60 L 150 80 L 130 50 L 130 140 L 70 140 L 70 50 L 50 80 L 20 60 Z" fill="#38bdf8" stroke="#0284c7" stroke-width="3"/>
      <!-- Tie straps -->
      <line x1="70" y1="70" x2="130" y2="70" stroke="#0284c7" stroke-width="3" stroke-dasharray="4,4"/>
    `
  },
  {
    name: 'tab-multivit.svg',
    title: 'SuryaMax Vital Multivitamins',
    code: 'tabmulti',
    category: 'DAILY WELLNESS MEDICINE',
    color1: '#e11d48',
    color2: '#9f1239',
    renderIcon: `
      <!-- Multivitamin Capsules Strip -->
      <rect x="20" y="10" width="200" height="130" rx="14" fill="#f8fafc" stroke="#cbd5e1" stroke-width="3"/>
      ${[0, 1, 2].map(col => [0, 1].map(row => `
        <g transform="translate(${40 + col * 55}, ${25 + row * 55})">
          <rect x="0" y="0" width="36" height="18" rx="9" fill="#e11d48"/>
          <rect x="18" y="0" width="18" height="18" rx="9" fill="#facc15"/>
        </g>
      `).join('')).join('')}
    `
  },
  {
    name: 'tab-vitc.svg',
    title: 'Surya-C 500mg Chewable + Zinc',
    code: 'tabvitc',
    category: 'DAILY IMMUNITY MEDICINE',
    color1: '#ea580c',
    color2: '#c2410c',
    renderIcon: `
      <!-- Orange Chewable Tablets -->
      <rect x="20" y="10" width="200" height="130" rx="14" fill="#fff7ed" stroke="#fed7aa" stroke-width="3"/>
      ${[0, 1, 2].map(col => [0, 1].map(row => `
        <circle cx="${55 + col * 55}" cy="${42 + row * 55}" r="20" fill="#f97316" stroke="#ea580c" stroke-width="2"/>
        <text x="${55 + col * 55}" y="${46 + row * 55}" font-family="Inter, sans-serif" font-weight="800" font-size="9" fill="white" text-anchor="middle">500</text>
      `).join('')).join('')}
    `
  },
  {
    name: 'tab-cet.svg',
    title: 'SuryaCet 10mg Allergy Relief',
    code: 'tabcet',
    category: 'COLD & ALLERGY MEDICINE',
    color1: '#046A38',
    color2: '#073D27',
    renderIcon: `
      <!-- Cetirizine Small Oval Tablets -->
      <rect x="20" y="10" width="200" height="130" rx="14" fill="#f0fdf4" stroke="#bbf7d0" stroke-width="3"/>
      ${[0, 1, 2, 3].map(col => [0, 1].map(row => `
        <ellipse cx="${45 + col * 42}" cy="${42 + row * 55}" rx="14" ry="10" fill="#22c55e" stroke="#16a34a" stroke-width="2"/>
      `).join('')).join('')}
    `
  },
  {
    name: 'tab-ors.svg',
    title: 'SuryaLyte ORS Electrolytes',
    code: 'tabors',
    category: 'HYDRATION & RECOVERY',
    color1: '#0284c7',
    color2: '#075985',
    renderIcon: `
      <!-- Effervescent Tube -->
      <rect x="80" y="10" width="40" height="130" rx="8" fill="#e0f2fe" stroke="#0284c7" stroke-width="3"/>
      <rect x="75" y="8" width="50" height="15" rx="4" fill="#0284c7"/>
      <text x="100" y="70" font-family="Inter, sans-serif" font-weight="800" font-size="9" fill="#0369a1" text-anchor="middle" transform="rotate(-90 100 70)">ORS TUBE</text>
    `
  },
  {
    name: 'thermometer.svg',
    title: 'SuryaTemp Infrared Thermometer',
    code: 'therm',
    category: 'DIAGNOSTIC EQUIPMENT',
    color1: '#046A38',
    color2: '#073D27',
    renderIcon: `
      <!-- Gun shape body -->
      <path d="M 60 10 L 140 10 L 140 60 L 110 80 L 110 140 L 70 140 L 70 70 L 60 50 Z" fill="#f8fafc" stroke="#64748b" stroke-width="3"/>
      <circle cx="80" cy="85" r="8" fill="#e11d48"/>
      <rect x="85" y="25" width="45" height="30" rx="4" fill="#0f172a"/>
      <text x="107" y="45" font-family="Plus Jakarta Sans, sans-serif" font-size="11" font-weight="bold" fill="#4ade80" text-anchor="middle">36.8°C</text>
    `
  },
  {
    name: 'ecg-machine.svg',
    title: 'CardioSmart 12-Lead ECG Machine',
    code: 'ecg',
    category: 'CARDIOLOGY & ICU EQUIPMENT',
    color1: '#0f172a',
    color2: '#1e293b',
    renderIcon: `
      <!-- ECG Console -->
      <rect x="20" y="20" width="200" height="110" rx="12" fill="#1e293b" stroke="#475569" stroke-width="3"/>
      <!-- Color LCD with ECG waveform -->
      <rect x="35" y="32" width="100" height="60" rx="6" fill="#020617"/>
      <path d="M 40 65 L 55 65 L 60 45 L 65 80 L 70 55 L 75 65 L 125 65" fill="none" stroke="#22c55e" stroke-width="2"/>
      <!-- Thermal Paper Slot -->
      <rect x="150" y="32" width="55" height="60" rx="4" fill="#f8fafc"/>
      <line x1="155" y1="45" x2="200" y2="45" stroke="#e11d48" stroke-width="1.5"/>
      <line x1="155" y1="60" x2="200" y2="60" stroke="#e11d48" stroke-width="1.5"/>
    `
  },
  {
    name: 'ot-set.svg',
    title: 'SuryaCraft 32-Piece Minor OT Set',
    code: 'otset',
    category: 'SURGICAL INSTRUMENTS',
    color1: '#334155',
    color2: '#1e293b',
    renderIcon: `
      <!-- Stainless Tray with Instruments -->
      <rect x="20" y="20" width="200" height="110" rx="12" fill="#e2e8f0" stroke="#64748b" stroke-width="3"/>
      <!-- Forceps -->
      <line x1="45" y1="35" x2="45" y2="115" stroke="#334155" stroke-width="4" stroke-linecap="round"/>
      <!-- Scissors -->
      <line x1="85" y1="35" x2="85" y2="115" stroke="#334155" stroke-width="4" stroke-linecap="round"/>
      <circle cx="80" cy="115" r="6" fill="none" stroke="#334155" stroke-width="2"/>
      <circle cx="90" cy="115" r="6" fill="none" stroke="#334155" stroke-width="2"/>
      <!-- Scalpel Handle -->
      <line x1="125" y1="35" x2="125" y2="115" stroke="#334155" stroke-width="4" stroke-linecap="round"/>
      <!-- Retractor -->
      <line x1="165" y1="35" x2="165" y2="115" stroke="#334155" stroke-width="4" stroke-linecap="round"/>
    `
  },
  {
    name: 'scalpel.svg',
    title: 'SuryaBlade Sterile #11 Blades',
    code: 'scalp',
    category: 'SURGICAL BLADES',
    color1: '#046A38',
    color2: '#073D27',
    renderIcon: `
      <!-- Scalpel Blade #11 -->
      <polygon points="40,90 40,50 180,50 140,90" fill="#cbd5e1" stroke="#475569" stroke-width="3"/>
      <!-- Foil Packet -->
      <rect x="20" y="20" width="200" height="50" rx="6" fill="#046A38"/>
      <text x="120" y="50" font-family="Inter, sans-serif" font-size="11" font-weight="bold" fill="white" text-anchor="middle">SURGICAL BLADES #11</text>
    `
  },
  {
    name: 'needle-holder.svg',
    title: 'Castroviejo Micro Needle Holder',
    code: 'needle',
    category: 'MICROSURGERY INSTRUMENTS',
    color1: '#334155',
    color2: '#0f172a',
    renderIcon: `
      <!-- Tungsten carbide gold handle needle holder -->
      <line x1="100" y1="20" x2="85" y2="120" stroke="#475569" stroke-width="5" stroke-linecap="round"/>
      <line x1="120" y1="20" x2="135" y2="120" stroke="#475569" stroke-width="5" stroke-linecap="round"/>
      <!-- Gold plated handle rings -->
      <rect x="75" y="80" width="15" height="40" rx="3" fill="#eab308"/>
      <rect x="130" y="80" width="15" height="40" rx="3" fill="#eab308"/>
    `
  },
  {
    name: 'centrifuge.svg',
    title: 'SuryaSpin Benchtop Centrifuge',
    code: 'cent',
    category: 'LABORATORY EQUIPMENT',
    color1: '#0284c7',
    color2: '#075985',
    renderIcon: `
      <!-- Centrifuge Chamber Round -->
      <ellipse cx="120" cy="70" rx="80" ry="40" fill="#f8fafc" stroke="#64748b" stroke-width="3"/>
      <circle cx="120" cy="70" r="25" fill="#38bdf8"/>
      <!-- Tube holders -->
      ${[0, 60, 120, 180, 240, 300].map(deg => {
        const rad = deg * Math.PI / 180;
        const cx = 120 + Math.cos(rad) * 45;
        const cy = 70 + Math.sin(rad) * 22;
        return `<circle cx="${cx}" cy="${cy}" r="6" fill="#e11d48"/>`;
      }).join('')}
    `
  },
  {
    name: 'wheelchair.svg',
    title: 'SuryaGlide Hospital Wheelchair',
    code: 'wheel',
    category: 'PATIENT CARE & MOBILITY',
    color1: '#046A38',
    color2: '#073D27',
    renderIcon: `
      <!-- Wheelchair Big Wheel -->
      <circle cx="80" cy="90" r="40" fill="none" stroke="#475569" stroke-width="6"/>
      <circle cx="80" cy="90" r="10" fill="#046A38"/>
      <!-- Small front wheel -->
      <circle cx="160" cy="115" r="14" fill="none" stroke="#475569" stroke-width="4"/>
      <!-- Frame -->
      <line x1="80" y1="90" x2="120" y2="50" stroke="#046A38" stroke-width="6"/>
      <line x1="120" y1="50" x2="160" y2="115" stroke="#046A38" stroke-width="6"/>
      <line x1="120" y1="50" x2="120" y2="20" stroke="#046A38" stroke-width="6"/>
      <line x1="120" y1="20" x2="90" y2="20" stroke="#073D27" stroke-width="6"/>
    `
  },
  {
    name: 'hospital-bed.svg',
    title: 'SuryaOrtho Electric ICU Bed',
    code: 'bed',
    category: 'HOSPITAL FURNITURE',
    color1: '#0284c7',
    color2: '#0369a1',
    renderIcon: `
      <!-- Hospital Bed Frame -->
      <rect x="30" y="60" width="180" height="25" rx="4" fill="#0284c7"/>
      <!-- Mattress Profile -->
      <path d="M 30 60 L 80 40 L 140 55 L 210 55" fill="none" stroke="#38bdf8" stroke-width="12" stroke-linecap="round"/>
      <!-- Side Rails -->
      <rect x="90" y="30" width="60" height="20" rx="3" fill="#e2e8f0" stroke="#94a3b8" stroke-width="2"/>
      <!-- Legs and Casters -->
      <line x1="50" y1="85" x2="50" y2="120" stroke="#475569" stroke-width="4"/>
      <line x1="190" y1="85" x2="190" y2="120" stroke="#475569" stroke-width="4"/>
      <circle cx="50" cy="125" r="8" fill="#1e293b"/>
      <circle cx="190" cy="125" r="8" fill="#1e293b"/>
    `
  }
];

extraProducts.forEach(p => {
  const filePath = path.join(outDir, p.name);
  const svg = makeSvg(p.title, p.code, p.category, p.color1, p.color2, p.renderIcon);
  fs.writeFileSync(filePath, svg.trim());
  console.log(`Generated: ${p.name}`);
});
