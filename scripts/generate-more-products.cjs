const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'public', 'products');

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
  <circle cx="300" cy="270" r="180" fill="${color1}" opacity="0.08"/>

  <g filter="url(#sh_${code})" transform="translate(100, 90)">
    <rect x="0" y="0" width="400" height="360" rx="28" fill="white" stroke="#E7E2D8" stroke-width="3"/>
    
    <path d="M0 28 Q0 0 28 0 L372 0 Q400 0 400 28 L400 75 L0 75 Z" fill="url(#card_${code})"/>
    <text x="24" y="38" font-family="Plus Jakarta Sans, sans-serif" font-weight="800" font-size="16" fill="#FFFCF6">${title}</text>
    <text x="24" y="58" font-family="Inter, sans-serif" font-weight="600" font-size="11" fill="#EAF3E9">${category} • CLINICAL GRADE</text>
    
    <g transform="translate(80, 110)">
      ${iconPath}
    </g>

    <rect x="24" y="300" width="110" height="26" rx="6" fill="#046A38"/>
    <text x="79" y="317" font-family="Inter, sans-serif" font-weight="700" font-size="11" fill="white" text-anchor="middle">IN STOCK</text>
    <rect x="144" y="300" width="110" height="26" rx="6" fill="#EAF3E9"/>
    <text x="199" y="317" font-family="Inter, sans-serif" font-weight="700" font-size="11" fill="#046A38" text-anchor="middle">VERIFIED</text>
  </g>

  <rect x="40" y="40" width="170" height="32" rx="16" fill="#046A38" opacity="0.12"/>
  <text x="125" y="61" font-family="Plus Jakarta Sans, sans-serif" font-weight="700" font-size="11" fill="#046A38" text-anchor="middle">DR SURYA MEDICARE</text>
</svg>`;
}

const items = [
  {
    name: 'mattress-air.svg',
    title: 'SuryaRest Anti-Bedsore Air Mattress',
    code: 'matt',
    category: 'PATIENT CARE EQUIPMENT',
    color1: '#0284c7',
    color2: '#0369a1',
    renderIcon: `
      <!-- Alternating pressure air cells -->
      <g transform="translate(10, 20)">
        ${[0, 1, 2, 3, 4, 5, 6].map(i => `
          <rect x="${i * 30}" y="10" width="24" height="90" rx="12" fill="${i % 2 === 0 ? '#38bdf8' : '#7dd3fc'}" stroke="#0284c7" stroke-width="2"/>
        `).join('')}
        <!-- Pump unit -->
        <rect x="50" y="115" width="120" height="40" rx="8" fill="#1e293b"/>
        <circle cx="150" cy="135" r="8" fill="#4ade80"/>
        <text x="100" y="140" font-family="Inter, sans-serif" font-size="10" font-weight="bold" fill="white">AIR PUMP</text>
      </g>
    `
  },
  {
    name: 'bath-wipes.svg',
    title: 'SuryaClean Bed Bath Wipes',
    code: 'wipes',
    category: 'HYGIENE CONSUMABLES',
    color1: '#046A38',
    color2: '#073D27',
    renderIcon: `
      <!-- Bath wipes pack with flip cap -->
      <rect x="20" y="20" width="200" height="110" rx="16" fill="#f0fdf4" stroke="#86efac" stroke-width="3"/>
      <ellipse cx="120" cy="75" rx="50" ry="24" fill="#046A38"/>
      <ellipse cx="120" cy="75" rx="42" ry="18" fill="white"/>
      <text x="120" y="80" font-family="Plus Jakarta Sans, sans-serif" font-weight="800" font-size="10" fill="#046A38" text-anchor="middle">CHG 2%</text>
    `
  },
  {
    name: 'gauze-roll.svg',
    title: 'SuryaGauze Absorbent Cotton Roll',
    code: 'gauze',
    category: 'WOUND CARE CONSUMABLES',
    color1: '#0284c7',
    color2: '#075985',
    renderIcon: `
      <!-- Cylindrical Cotton Roll -->
      <ellipse cx="120" cy="40" rx="60" ry="22" fill="#f8fafc" stroke="#94a3b8" stroke-width="3"/>
      <path d="M 60 40 L 60 130 C 60 150, 180 150, 180 130 L 180 40 Z" fill="#ffffff" stroke="#94a3b8" stroke-width="3"/>
      <ellipse cx="120" cy="130" rx="60" ry="20" fill="#f1f5f9" stroke="#94a3b8" stroke-width="3"/>
      <!-- Cross hatched texture -->
      <line x1="80" y1="60" x2="160" y2="100" stroke="#cbd5e1" stroke-width="2"/>
      <line x1="80" y1="100" x2="160" y2="60" stroke="#cbd5e1" stroke-width="2"/>
    `
  },
  {
    name: 'doctor-stool.svg',
    title: 'SuryaClinic Hydraulic Doctor Stool',
    code: 'stool',
    category: 'HOSPITAL WARD FURNITURE',
    color1: '#334155',
    color2: '#0f172a',
    renderIcon: `
      <!-- Revolving padded seat -->
      <ellipse cx="120" cy="35" rx="65" ry="20" fill="#046A38" stroke="#073D27" stroke-width="3"/>
      <rect x="65" y="35" width="110" height="15" rx="4" fill="#073D27"/>
      <!-- Hydraulic cylinder -->
      <rect x="112" y="50" width="16" height="60" rx="3" fill="#94a3b8"/>
      <!-- 5-star base with casters -->
      <path d="M 120 110 L 50 140 M 120 110 L 190 140 M 120 110 L 120 145" stroke="#475569" stroke-width="6" stroke-linecap="round"/>
      <circle cx="50" cy="145" r="8" fill="#1e293b"/>
      <circle cx="120" cy="150" r="8" fill="#1e293b"/>
      <circle cx="190" cy="145" r="8" fill="#1e293b"/>
    `
  },
  {
    name: 'mobility-walker.svg',
    title: 'SuryaStep Folding Mobility Walker',
    code: 'walk',
    category: 'REHABILITATION AIDS',
    color1: '#046A38',
    color2: '#073D27',
    renderIcon: `
      <!-- Aluminium folding walker frame -->
      <path d="M 60 140 L 75 30 L 165 30 L 180 140" fill="none" stroke="#94a3b8" stroke-width="8" stroke-linecap="round"/>
      <!-- Hand grips -->
      <rect x="70" y="24" width="30" height="12" rx="3" fill="#1e293b"/>
      <rect x="140" y="24" width="30" height="12" rx="3" fill="#1e293b"/>
      <!-- Crossbars -->
      <line x1="70" y1="70" x2="170" y2="70" stroke="#046A38" stroke-width="6"/>
      <line x1="65" y1="110" x2="175" y2="110" stroke="#046A38" stroke-width="6"/>
      <!-- Rubber tips -->
      <rect x="54" y="135" width="12" height="12" rx="2" fill="#1e293b"/>
      <rect x="174" y="135" width="12" height="12" rx="2" fill="#1e293b"/>
    `
  },
  {
    name: 'firstaid-kit.svg',
    title: 'SuryaCare Industrial First Aid Kit',
    code: 'faid',
    category: 'FIRST AID & TRAUMA CARE',
    color1: '#dc2626',
    color2: '#991b1b',
    renderIcon: `
      <!-- Medical kit box -->
      <rect x="40" y="30" width="160" height="110" rx="14" fill="#ffffff" stroke="#dc2626" stroke-width="4"/>
      <!-- Handle -->
      <path d="M 90 30 L 90 12 L 150 12 L 150 30" fill="none" stroke="#991b1b" stroke-width="6" stroke-linecap="round"/>
      <!-- Red Cross Symbol -->
      <rect x="108" y="55" width="24" height="60" rx="3" fill="#dc2626"/>
      <rect x="90" y="73" width="60" height="24" rx="3" fill="#dc2626"/>
    `
  },
  {
    name: 'ambu-resuscitator.svg',
    title: 'SuryaBreathe Silicone Ambu Bag',
    code: 'ambu',
    category: 'EMERGENCY RESUSCITATION',
    color1: '#0284c7',
    color2: '#0369a1',
    renderIcon: `
      <!-- Self-inflating silicone bag -->
      <ellipse cx="120" cy="80" rx="60" ry="35" fill="#38bdf8" stroke="#0284c7" stroke-width="3"/>
      <!-- Patient valve & transparent mask -->
      <polygon points="180,80 220,60 220,100" fill="#bae6fd" stroke="#0284c7" stroke-width="2"/>
      <!-- Oxygen reservoir tube -->
      <path d="M 60 80 C 30 80, 20 120, 50 130" fill="none" stroke="#38bdf8" stroke-width="8" stroke-linecap="round"/>
    `
  },
  {
    name: 'splint-roll.svg',
    title: 'SuryaSplint Malleable Aluminum Splint',
    code: 'splint',
    category: 'ORTHOPEDIC IMMOBILIZATION',
    color1: '#ea580c',
    color2: '#c2410c',
    renderIcon: `
      <!-- Rolled up orange/blue emergency splint -->
      <ellipse cx="90" cy="50" rx="30" ry="40" fill="#f97316" stroke="#c2410c" stroke-width="3"/>
      <path d="M 90 10 L 170 40 L 170 120 L 90 90 Z" fill="#0284c7" stroke="#0369a1" stroke-width="3"/>
      <ellipse cx="170" cy="80" rx="30" ry="40" fill="#f97316" stroke="#c2410c" stroke-width="3"/>
    `
  },
  {
    name: 'doctor-coat.svg',
    title: 'SuryaPro Full-Sleeve Doctor Coat',
    code: 'coat',
    category: 'HEALTHCARE APPAREL',
    color1: '#046A38',
    color2: '#073D27',
    renderIcon: `
      <!-- White Doctor Consultation Coat with lapels and pocket -->
      <path d="M 60 20 L 100 0 L 140 20 L 180 50 L 160 80 L 140 50 L 140 145 L 60 145 L 60 50 L 40 80 L 20 50 Z" fill="#ffffff" stroke="#94a3b8" stroke-width="3"/>
      <line x1="100" y1="50" x2="100" y2="145" stroke="#94a3b8" stroke-width="2"/>
      <!-- Breast pocket with pen -->
      <rect x="70" y="65" width="22" height="24" rx="2" fill="#f1f5f9" stroke="#94a3b8" stroke-width="1.5"/>
      <line x1="78" y1="55" x2="78" y2="70" stroke="#046A38" stroke-width="2.5"/>
    `
  },
  {
    name: 'tourniquet-elastic.svg',
    title: 'SuryaBand Quick-Release Tourniquet',
    code: 'tourn',
    category: 'PHLEBOTOMY ACCESSORIES',
    color1: '#3b82f6',
    color2: '#1d4ed8',
    renderIcon: `
      <!-- Elastic blue strap -->
      <rect x="30" y="65" width="180" height="24" rx="6" fill="#3b82f6"/>
      <!-- Plastic quick release buckle -->
      <rect x="90" y="50" width="55" height="54" rx="8" fill="#1e293b"/>
      <circle cx="118" cy="77" r="12" fill="#ef4444"/>
    `
  },
  {
    name: 'surgical-tray.svg',
    title: 'SuryaSteel Surgical Kidney Tray',
    code: 'tray',
    category: 'STERILE STAINLESS WARE',
    color1: '#64748b',
    color2: '#334155',
    renderIcon: `
      <!-- Stainless steel kidney shaped dish -->
      <path d="M 40 70 C 40 20, 200 20, 200 70 C 200 120, 160 130, 120 90 C 80 130, 40 120, 40 70 Z" fill="#e2e8f0" stroke="#475569" stroke-width="4"/>
      <path d="M 55 65 C 55 35, 185 35, 185 65 C 185 105, 155 110, 120 80 C 85 110, 55 105, 55 65 Z" fill="#f8fafc" stroke="#94a3b8" stroke-width="2"/>
    `
  }
];

items.forEach(p => {
  const filePath = path.join(outDir, p.name);
  const svg = makeSvg(p.title, p.code, p.category, p.color1, p.color2, p.renderIcon);
  fs.writeFileSync(filePath, svg.trim());
  console.log(`Generated: ${p.name}`);
});
