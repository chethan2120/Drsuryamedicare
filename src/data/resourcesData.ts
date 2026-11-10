import {
  BlogPost,
  BuyingGuide,
  ProductKnowledgeArticle,
  FaqItem,
  ManualDocument,
} from '../types/resources';

// =========================================================================
// 1. BLOGS & INSIGHTS (SEO-PRIORITY INITIAL DRAFTS)
// =========================================================================
export const initialBlogs: BlogPost[] = [
  {
    id: 'blog-1',
    slug: 'hospital-medical-equipment-procurement-guide',
    title: 'The Strategic Guide to Hospital Medical Equipment Procurement in India',
    metaTitle: 'Hospital Medical Equipment Procurement Guide | Dr Surya Medicare',
    metaDescription:
      'A comprehensive guide for hospital administrators and procurement heads on planning, vendor assessment, total cost of ownership, and regulatory compliance for medical equipment.',
    category: 'Hospital Procurement',
    excerpt:
      'Learn how hospital procurement teams navigate capital equipment budgeting, CDSCO regulatory approvals, warranty lifecycles, and uptime service level agreements.',
    featuredImage: '/banners/icu-critical-care.jpg',
    author: 'Dr Surya Medicare Procurement Desk',
    authorRole: 'Clinical Procurement & Supply Chain Lead',
    publishedAt: '2026-11-04',
    updatedAt: '2026-11-08',
    readTime: '6 min read',
    tags: ['Procurement', 'Hospital Equipment', 'Budgeting', 'CDSCO'],
    isFeatured: true,
    isDraft: false,
    tableOfContents: [
      { id: 'clinical-needs-assessment', title: '1. Clinical Needs Assessment & Caseload Forecasting', level: 2 },
      { id: 'total-cost-ownership', title: '2. Evaluating Total Cost of Ownership (TCO)', level: 2 },
      { id: 'vendor-verification', title: '3. Vendor Due Diligence & Regulatory Approvals', level: 2 },
      { id: 'uptime-warranty', title: '4. Warranty, Preventive Maintenance & AMC/CMC Terms', level: 2 },
      { id: 'procurement-checklist', title: '5. Key Takeaways for Procurement Officers', level: 2 },
    ],
    relatedProductIds: ['dsm-ecg-01', 'dsm-oxi-01', 'dsm-bed-01'],
    relatedBlogSlugs: ['cold-chain-quality-compliance-hospital-supplies', 'minor-ot-surgical-instruments-sterilization-guide'],
    content: `
### Overview

Medical equipment procurement is among the most capital-intensive operational decisions for healthcare facilities. Whether outfitting an outpatient consultation department, an intensive care unit, or a regional diagnostic pathology laboratory, structured acquisition frameworks directly influence clinical outcomes and long-term operating viability.

## 1. Clinical Needs Assessment & Caseload Forecasting {#clinical-needs-assessment}

Before engaging vendors or issuing tender Requests for Quotation (RFQs), the procurement committee should evaluate departmental caseload patterns. 

Key diagnostic parameters to establish:
- **Patient throughput requirements:** Daily and peak operating volumes (e.g., number of ECG tracings or surgical operations expected per week).
- **Clinical staff familiarity:** Ease of calibration, user ergonomics, and training requirements for biomedical engineers and nursing teams.
- **Facility infrastructure readiness:** Continuous regulated electrical supply, earthing standards, medical gas pipeline hookups, and environmental air filtration.

## 2. Evaluating Total Cost of Ownership (TCO) {#total-cost-ownership}

Capital expenditure (CapEx) accounts for merely 40% to 60% of an electronic diagnostic device's lifetime expenditure. The remaining costs arise from recurring operational expenses:
- **Consumable dependency:** Proprietary reagents, disposable sensors, thermal printing paper, and single-use tubing sets.
- **Power consumption & standby requirements:** Heat dissipation profiles and uninterruptible power supply (UPS) sizing.
- **Wearable replacements:** Lead cables, blood pressure cuffs, SpO2 sensor clips, and lithium backup batteries.

## 3. Vendor Due Diligence & Regulatory Approvals {#vendor-verification}

In India, clinical procurement requires verification of manufacturer compliance with central regulatory bodies. Facilities must confirm:
- **CDSCO Medical Device Classification:** Class A, B, C, or D registration under Medical Devices Rules, 2017.
- **Standard compliance certifications:** ISO 13485 for quality management systems and relevant IEC 60601 electrical safety tests for electro-medical equipment.
- **GST-compliant invoicing & batch traceability:** Clear dispatch records linking device serial numbers with warranty certificates.

## 4. Warranty, Preventive Maintenance & AMC/CMC Terms {#uptime-warranty}

Biomedical downtime can severely disrupt clinical operations. Institutional contracts must specify:
- Minimum guaranteed equipment uptime (typically 95% to 98%).
- Maximum response time for biomedical engineer dispatch (under 24 hours for acute care units).
- Clear inclusions in Annual Maintenance Contracts (AMC) and Comprehensive Maintenance Contracts (CMC) after original equipment manufacturer warranty expiration.

## 5. Key Takeaways for Procurement Officers {#procurement-checklist}

Standardizing medical equipment across clinical wards simplifies inventory management, enables bulk volume savings on consumables, and reduces staff training friction. Dr Surya Medicare assists hospitals with consolidated sourcing and direct wholesale invoicing across India.
    `,
  },
  {
    id: 'blog-2',
    slug: 'nitrile-vs-latex-gloves-clinical-guide',
    title: 'Nitrile vs. Latex Examination Gloves: Clinical Barrier Standards & Selection Guide',
    metaTitle: 'Nitrile vs Latex Gloves Clinical Barrier Guide | Dr Surya Medicare',
    metaDescription:
      'Compare nitrile and natural rubber latex medical gloves across puncture resistance, biological barrier integrity, tactile sensitivity, and latex allergy prevention.',
    category: 'Medical Consumables',
    excerpt:
      'An objective clinical comparison between powder-free nitrile and medical latex gloves to help hospital infection control committees select the right barrier protection.',
    featuredImage: '/banners/hospital-consumables.jpg',
    author: 'SuryaSafe Clinical Quality Team',
    authorRole: 'Infection Control Specialist',
    publishedAt: '2026-11-02',
    updatedAt: '2026-11-07',
    readTime: '5 min read',
    tags: ['Nitrile Gloves', 'Latex Gloves', 'PPE', 'Infection Control', 'AQL'],
    isFeatured: true,
    isDraft: false,
    tableOfContents: [
      { id: 'material-composition', title: '1. Material Composition & Hypoallergenic Considerations', level: 2 },
      { id: 'barrier-protection', title: '2. Puncture Resistance & Chemical Barrier Performance', level: 2 },
      { id: 'tactile-sensitivity', title: '3. Tactile Sensitivity, Elasticity & Ergonomics', level: 2 },
      { id: 'aql-standards', title: '4. Understanding Acceptable Quality Level (AQL 1.5)', level: 2 },
      { id: 'department-recommendation', title: '5. Department-Wise Usage Recommendations', level: 2 },
    ],
    relatedProductIds: ['dsm-gloves-01', 'dsm-gloves-02', 'dsm-mask-01'],
    relatedBlogSlugs: ['hospital-medical-equipment-procurement-guide', 'cold-chain-quality-compliance-hospital-supplies'],
    content: `
### Overview

Medical examination gloves are the primary physical barrier against bloodborne pathogens, chemical disinfectants, and cross-contamination in healthcare environments. Selecting between synthetic Nitrile (Acrylonitrile Butadiene) and natural rubber Latex involves balancing tactile precision, mechanical resistance, and staff allergic sensitivity.

## 1. Material Composition & Hypoallergenic Considerations {#material-composition}

- **Natural Rubber Latex:** Manufactured from Hevea brasiliensis tree sap. Contains natural proteins that can provoke Type I IgE-mediated allergic reactions or contact dermatitis in susceptible healthcare workers and patients.
- **Nitrile:** Synthetic polymer compound containing zero natural rubber proteins. It eliminates latex protein allergies while retaining high tensile strength and puncture resilience.

## 2. Puncture Resistance & Chemical Barrier Performance {#barrier-protection}

- **Mechanical Durability:** Nitrile gloves exhibit 3 to 4 times greater puncture and tear resistance than equivalent-thickness latex gloves.
- **Chemical Permeation:** Nitrile demonstrates superior barrier resistance against petroleum-based lubricants, cytotoxic medications, and harsh hospital surface disinfectants (such as isopropyl alcohol, chlorine compounds, and glutaraldehyde).
- **Degradation Detection:** When punctured, nitrile tear characteristics cause rapid breach visualization, allowing immediate glove changes before fluid penetration occurs.

## 3. Tactile Sensitivity, Elasticity & Ergonomics {#tactile-sensitivity}

- Latex remains exceptionally elastic with high tactile feedback, making it widely favored for delicate palpation and complex surgical maneuvers.
- Modern powder-free medical nitrile gloves feature micro-textured fingertips and thermal contouring, conforming closely to the hand under body heat to minimize hand fatigue during prolonged shifts.

## 4. Understanding Acceptable Quality Level (AQL 1.5) {#aql-standards}

The clinical standard for medical examination gloves is defined by the Acceptable Quality Level (AQL) under EN 455 and ASTM D6319:
- **AQL 1.5** signifies that fewer than 1.5 pinholes or barrier defects are permitted per 100 inspected units during water leak immersion tests.
- Non-medical industrial gloves frequently carry lower ratings (AQL 2.5 to 4.0), making verified AQL 1.5 medical grade essential for patient contact.

## 5. Department-Wise Usage Recommendations {#department-recommendation}

- **Intensive Care, Casualty, Oncology & Emergency:** Powder-free blue nitrile gloves (4.0 mil) are strongly recommended due to high chemical resistance and universal allergy safety.
- **Routine OPD Consultation & Phlebotomy:** Both powder-free nitrile and powdered/pre-lubricated latex examination gloves provide reliable cost-effective barriers when staff allergies are ruled out.
    `,
  },
  {
    id: 'blog-3',
    slug: 'minor-ot-surgical-instruments-sterilization-guide',
    title: 'Essential Minor OT Surgical Instruments: Sterilization, Care & Material Metallurgy',
    metaTitle: 'Minor OT Surgical Instruments Sterilization Guide | Dr Surya Medicare',
    metaDescription:
      'A practical clinical guide on surgical stainless steel metallurgy (AISI 410, 420, 316), passivation, ultrasonic cleaning, and autoclave sterilization protocols for OT instruments.',
    category: 'Surgical Supplies',
    excerpt:
      'Best practices for maintaining surgical sharpness, preventing electrolytic corrosion, and executing validated autoclave cycles on minor OT instrument sets.',
    featuredImage: '/banners/hospital-consumables.jpg',
    author: 'Dr Surya Medicare Biomedical Team',
    authorRole: 'Biomedical Engineering Specialist',
    publishedAt: '2026-10-28',
    updatedAt: '2026-11-05',
    readTime: '7 min read',
    tags: ['Surgical Instruments', 'Autoclave', 'Passivation', 'OT Care', 'Stainless Steel'],
    isFeatured: false,
    isDraft: false,
    tableOfContents: [
      { id: 'metallurgy-grades', title: '1. Surgical Metallurgy: Martensitic vs. Austenitic Stainless Steel', level: 2 },
      { id: 'passivation-process', title: '2. The Role of Passivation in Preventing Rust', level: 2 },
      { id: 'cleaning-protocols', title: '3. Pre-Cleaning & Ultrasonic Bath Protocols', level: 2 },
      { id: 'autoclave-parameters', title: '4. Steam Autoclave Parameters (121°C vs. 134°C)', level: 2 },
      { id: 'instrument-inspection', title: '5. Inspection & Lubrication Checklist', level: 2 },
    ],
    relatedProductIds: ['dsm-surg-01', 'dsm-scalpel-01', 'dsm-needle-01', 'dsm-tray-01'],
    relatedBlogSlugs: ['hospital-medical-equipment-procurement-guide', 'nitrile-vs-latex-gloves-clinical-guide'],
    content: `
### Overview

High-quality surgical instruments represent a long-term capital investment for surgical clinics and hospitals. Proper cleaning, inspection, and autoclave sterilization prevent premature pitting, jaw misalignment, and cross-contamination across procedures.

## 1. Surgical Metallurgy: Martensitic vs. Austenitic Stainless Steel {#metallurgy-grades}

Surgical tools utilize distinct grades of medical stainless steel according to their functional requirements:
- **Martensitic Stainless Steel (AISI 410, 420):** High-carbon formulation that can be heat-treated to achieve exceptional hardness and sharp cutting edges. Utilized for scissors, bone rongeurs, scalpel handles, and artery forceps.
- **Austenitic Stainless Steel (AISI 304, 316):** High nickel and chromium content with superior corrosion resistance but lower edge-holding capability. Utilized for instrument trays, kidney dishes, bowls, and retractors.

## 2. The Role of Passivation in Preventing Rust {#passivation-process}

During instrument manufacturing, chemical passivation with nitric or citric acid removes residual free iron from the surface, forming a micro-thin, self-healing chromium oxide passive layer.
- If instruments are cleaned with harsh abrasives or saline solutions without immediate rinsing, this protective chromium oxide barrier breaks down, resulting in localized pitting or dark electrolytic staining.

## 3. Pre-Cleaning & Ultrasonic Bath Protocols {#cleaning-protocols}

1. **Immediate Point-of-Use Wipe:** Wipe blood and bodily fluids immediately with sterile water. Never allow blood or saline to dry on hinged box locks or serrated teeth.
2. **Neutral Enzymatic Soak:** Immerse in neutral pH (7.0 to 8.5) enzymatic detergent. Avoid bleach, chlorine, or acid cleaners.
3. **Ultrasonic Cavitation:** Place opened instruments in an ultrasonic cleaning bath for 5 to 10 minutes. Ultrasonic waves reach microscopic crevices in ratchets, hinges, and box locks that manual scrubbing cannot reach.

## 4. Steam Autoclave Parameters (121°C vs. 134°C) {#autoclave-parameters}

- **Gravity Displacement:** 121°C (250°F) for 30 minutes at 15 psi.
- **Pre-Vacuum (High-Vacuum) Autoclave:** 134°C (273°F) for 4 to 5 minutes at 30 psi.
- **Important:** Ensure instrument box locks and ratchets are completely unlocked during sterilization to allow steam penetration and prevent stress fractures during thermal expansion.

## 5. Instrument Inspection & Lubrication Checklist {#instrument-inspection}

- Check scissors for smooth cutting action from pivot to tip using test latex cloth.
- Check needle holders for tungsten-carbide jaw cross-serration integrity with no light gap when locked.
- Apply water-soluble, autoclavable instrument milk (lubricant) weekly to hinged joints. Never use industrial oil.
    `,
  },
  {
    id: 'blog-4',
    slug: 'cold-chain-quality-compliance-hospital-supplies',
    title: 'Cold-Chain Integrity & Quality Compliance for Hospital Consumables',
    metaTitle: 'Cold-Chain Integrity in Medical Supplies | Dr Surya Medicare',
    metaDescription:
      'Understanding thermal logging, insulated packaging, and batch quality testing in the distribution of temperature-sensitive medical consumables and pharmaceuticals.',
    category: 'Hospital Supplies',
    excerpt:
      'How hospital logistics maintain temperature stability from warehouse dispatch to clinical storage, ensuring therapeutic efficacy and regulatory compliance.',
    featuredImage: '/banners/pharma-medicines.jpg',
    author: 'Dr Surya Medicare Logistics Desk',
    authorRole: 'Supply Chain Operations Lead',
    publishedAt: '2026-10-20',
    updatedAt: '2026-11-01',
    readTime: '5 min read',
    tags: ['Cold Chain', 'Logistics', 'Quality Compliance', 'Storage Standards'],
    isFeatured: false,
    isDraft: false,
    tableOfContents: [
      { id: 'temperature-ranges', title: '1. Standard Medical Temperature Zones', level: 2 },
      { id: 'packaging-technology', title: '2. Thermal Packaging & Phase Change Materials', level: 2 },
      { id: 'temperature-logging', title: '3. Real-Time Data Loggers & Receiving Protocols', level: 2 },
      { id: 'consequences-breakdown', title: '4. Clinical Risks of Thermal Excursion', level: 2 },
    ],
    relatedProductIds: ['dsm-tab-01', 'dsm-tab-03', 'dsm-iv-01'],
    relatedBlogSlugs: ['hospital-medical-equipment-procurement-guide'],
    content: `
### Overview

Maintaining precise thermal conditions throughout the medical distribution chain is essential to preserve the structural stability, potency, and sterility of pharmaceuticals, diagnostic reagents, and sensitive consumables.

## 1. Standard Medical Temperature Zones {#temperature-ranges}

- **Refrigerated / Cold-Chain:** 2°C to 8°C (Reagents, vaccines, insulin, biological cultures).
- **Cool Storage:** 8°C to 15°C (Certain oral liquids, softgels, sensitive syrups).
- **Controlled Room Temperature:** 15°C to 25°C (Tablets, IV solutions, medical examination gloves, dressing packs).

## 2. Thermal Packaging & Phase Change Materials {#packaging-technology}

Modern medical freight utilizes insulated EPS or VIP (Vacuum Insulated Panel) containers combined with calibrated phase change materials (PCMs) or pre-conditioned gel packs. These passively buffer external ambient heat spikes during road and air transit across India.

## 3. Real-Time Data Loggers & Receiving Protocols {#temperature-logging}

Hospital receiving departments should verify consignment documentation upon arrival:
- Check physical integrity of tamper-evident seals.
- Inspect single-use USB or Bluetooth temperature data loggers included with sensitive consignments.
- Verify batch numbers and expiry dates against the GST delivery challan.

## 4. Clinical Risks of Thermal Excursion {#consequences-breakdown}

Excessive heat or freezing cycles can denature protein bonds in diagnostic reagents, degrade active pharmaceutical ingredients, or compromise polymer integrity in medical plastics like IV tubing. Dr Surya Medicare provides validated transit tracking for all hospital dispatches.
    `,
  },
];

// =========================================================================
// 2. BUYING GUIDES (COMPREHENSIVE PROCUREMENT PLAYBOOKS)
// =========================================================================
export const initialBuyingGuides: BuyingGuide[] = [
  {
    id: 'guide-1',
    slug: 'how-to-choose-hospital-medical-equipment',
    title: 'How to Choose Hospital Medical Equipment: A Strategic Procurement Framework',
    metaTitle: 'How to Choose Hospital Medical Equipment | Dr Surya Medicare Buying Guide',
    metaDescription:
      'Step-by-step institutional guide on selecting, evaluating, and purchasing hospital medical equipment with checklists for biomedical engineers and hospital directors.',
    category: 'Medical Equipment',
    summary:
      'A structured, step-by-step strategic framework for clinical departments to assess equipment requirements, evaluate technical specifications, verify certifications, and balance CapEx with maintenance contracts.',
    estimatedReadTime: '8 min read',
    publishedAt: '2026-11-01',
    isFeatured: true,
    keyTips: [
      'Always request an in-clinic demonstration with attending nursing and physician staff before finalizing bulk purchase orders.',
      'Verify whether spare parts and sensor accessories are universally compatible or vendor-locked.',
      'Check local biomedical service engineer response times for your specific city or tier-2 district.',
      'Ensure standard electrical input matches facility voltage stabilizers (220V - 240V, 50Hz with surge protection).',
    ],
    checklist: [
      'CDSCO Medical Device license verification',
      'IEC 60601-1 electrical safety compliance documentation',
      'Dual power / internal rechargeable battery backup capacity',
      'Clear warranty duration (minimum 12 to 24 months)',
      'Availability of comprehensive maintenance contracts (CMC)',
      'Availability of replacement consumables (cuffs, cables, paper)',
    ],
    relatedProductIds: ['dsm-ecg-01', 'dsm-bp-01', 'dsm-oxi-01', 'dsm-oxy-01'],
    relatedResourceLinks: [
      { label: 'Technical Specifications Table', url: '/resources/specifications' },
      { label: 'Bulk Orders & Institutional RFQ', url: '/bulk-orders' },
    ],
    content: `
### Introduction

Acquiring medical equipment for hospitals requires balancing clinical efficacy, patient safety, regulatory compliance, and fiscal sustainability. This framework serves hospital procurement committees, nursing superintendents, and chief medical officers.

### Phase 1: Identifying Clinical Department Scope

Define the precise clinical setting:
- **General Ward:** Durable, intuitive devices with clear displays and long battery endurance for multi-patient daily rounds.
- **Intensive Care Unit (ICU):** Continuous multi-parameter monitoring with high-precision audible and visual physiological threshold alarms.
- **Outpatient Clinic (OPD):** Compact, fast-reading devices that speed patient throughput without compromising diagnostic repeatability.

### Phase 2: Technical Specification Evaluation

Scrutinize technical datasheets beyond promotional summaries:
- **Measurement Accuracy & Range:** Clinical validation standards (e.g., ESH or AAMI protocol compliance for blood pressure monitors).
- **Interface & Connectivity:** USB, Ethernet, or HL7 protocols for electronic medical records (EMR) integration.
- **Portability & Ergonomics:** Weight, handles, mount brackets for IV stands or wall rails.

### Phase 3: Total Lifecycle Cost Calculation

Do not evaluate initial purchase price in isolation. Calculate the cost per procedure over a 5-year operating horizon, factoring in consumables, preventive maintenance visits, calibration charges, and typical component lifespans.
    `,
  },
  {
    id: 'guide-2',
    slug: 'essential-medical-supplies-hospitals',
    title: 'Essential Medical Supplies Checklist for 50-Bed & 100-Bed Hospitals',
    metaTitle: 'Essential Medical Supplies for Hospitals Checklist | Dr Surya Medicare',
    metaDescription:
      'A comprehensive inventory planning checklist covering medical consumables, surgical tools, diagnostic vitals gear, and ward supplies for multi-specialty healthcare facilities.',
    category: 'Hospital Supplies',
    summary:
      'A practical ward-by-ward inventory planning blueprint covering primary clinical consumables, personal protective equipment, emergency triage kits, and patient care essentials.',
    estimatedReadTime: '7 min read',
    publishedAt: '2026-10-25',
    isFeatured: true,
    keyTips: [
      'Maintain a 30-day buffer stock for high-turnover consumables such as gloves, 3-ply masks, IV infusion sets, and sterile syringes.',
      'Segregate storage by expiry dates using the First-In, First-Out (FIFO) inventory rule.',
      'Implement standardized color-coded bin storage for different syringe and cannula gauge sizes.',
    ],
    checklist: [
      'Examination & Surgical Gloves (Nitrile & Latex across sizes S, M, L)',
      'Infusion sets (Vented, Non-vented, and micro-drip pediatric sets)',
      'Peripheral IV Cannulas (18G, 20G, 22G, 24G)',
      'Sterile hypodermic syringes with mounted needles (2ml, 5ml, 10ml, 50ml)',
      'Wound care: Sterile gauze swabs, absorbent cotton rolls, surgical paper tape',
      'Diagnostic essentials: Dual-head stethoscopes, digital BP monitors, pulse oximeters',
      'Emergency gear: Silicone manual resuscitator ambu bags, oxygen cannulas, trauma kits',
    ],
    relatedProductIds: ['dsm-gloves-01', 'dsm-iv-01', 'dsm-iv-03', 'dsm-syring-01', 'dsm-firstaid-01'],
    relatedResourceLinks: [
      { label: 'View All Consumables in Shop', url: '/shop?category=medical-consumables' },
      { label: 'Nitrile vs Latex Glove Guide', url: '/resources/blogs/nitrile-vs-latex-gloves-clinical-guide' },
    ],
    content: `
### Introduction

Efficient hospital operation relies on continuous stock availability in nursing stations, emergency triage rooms, and surgical suites. Stockouts can halt critical interventions and compromise patient safety.

### Consumables Core Ratio Guidelines

For a general hospital setup, recommended monthly procurement ratios per active bed:
- **Examination Gloves:** 8 to 12 pairs per bed per day.
- **Sterile Syringes (Assorted sizes):** 4 to 6 units per bed per day.
- **IV Sets & Cannulas:** 1 to 2 sets per admitted patient every 48 to 72 hours.
- **3-Ply Face Masks:** 3 to 5 units per healthcare staff member per shift.

Dr Surya Medicare supplies hospital facilities with scheduled monthly standing orders and consolidated institutional invoices.
    `,
  },
  {
    id: 'guide-3',
    slug: 'how-to-select-surgical-supplies',
    title: 'How to Select Surgical Supplies & Minor OT Instrumentation Sets',
    metaTitle: 'How to Select Surgical Supplies & Minor OT Sets | Dr Surya Medicare',
    metaDescription:
      'Detailed buying guide on evaluating surgical instrument steel metallurgy, scissor sharpness, ratchet locks, and sterile single-use disposable OT packs.',
    category: 'Surgical Supplies',
    summary:
      'A procurement guide for clinic administrators and surgeons to inspect instrument metallurgy, box-lock alignments, corrosion passivation, and minor OT surgical kits.',
    estimatedReadTime: '6 min read',
    publishedAt: '2026-10-18',
    isFeatured: false,
    keyTips: [
      'Look for AISI 410/420 surgical steel specification markers on instruments rather than generic "stainless steel" labels.',
      'Check that needle holder jaws have cross-serrated carbide grip surfaces with no daylight gap when ratchet is on second notch.',
      'Verify that all sets include a dedicated autoclavable stainless steel storage and sterilization box.',
    ],
    checklist: [
      'Scalpel handles (No. 3 and No. 4) with appropriate blade mounts',
      'Artery forceps (Straight and curved Halsted mosquito & Kelly forceps)',
      'Tissue dissecting forceps (Toothed 1x2 and plain non-toothed)',
      'Mayo and Metzenbaum surgical dissecting scissors',
      'Mayo-Hegar needle holders with positive ratchet locking',
      'Autoclavable stainless steel kidney dishes and gallipots',
    ],
    relatedProductIds: ['dsm-surg-01', 'dsm-scalpel-01', 'dsm-needle-01', 'dsm-tray-01'],
    relatedResourceLinks: [
      { label: 'Minor OT Sterilization Guide', url: '/resources/blogs/minor-ot-surgical-instruments-sterilization-guide' },
      { label: 'Surgical Instruments Shop', url: '/shop?category=surgical-instruments' },
    ],
    content: `
### Key Selection Parameters

High-grade surgical instrumentation reduces surgical fatigue and guarantees tissue security. When selecting minor OT sets for outpatient procedure rooms, look for passivated, reflection-reducing satin or mirror finishes that withstand repeated steam autoclaving without surface corrosion.
    `,
  },
  {
    id: 'guide-4',
    slug: 'medical-equipment-purchasing-checklist',
    title: 'Medical Equipment Purchasing Checklist: Regulatory, Electrical & Warranty Considerations',
    metaTitle: 'Medical Equipment Purchasing Checklist | Dr Surya Medicare',
    metaDescription:
      'An exhaustive operational checklist for biomedical teams covering technical evaluation, safety standards, installation requirements, and vendor agreements.',
    category: 'Medical Equipment',
    summary:
      'An exhaustive operational checklist for biomedical engineers and purchase committees to verify technical compliance, physical ergonomics, electrical grounding, and post-sales support.',
    estimatedReadTime: '6 min read',
    publishedAt: '2026-10-12',
    isFeatured: false,
    keyTips: [
      'Document voltage fluctuations at the proposed installation site to determine if an auxiliary servo stabilizer is required.',
      'Require vendor demonstration of calibration and self-test routines during handover.',
    ],
    checklist: [
      'Physical inspection of chassis and casing for shock-absorbing integrity',
      'Electrical safety test certification (leakage currents under clinical limits)',
      'Availability of bilingual operator and service manuals',
      'Factory calibration certificate with traceability to national standards',
      'Presence of audible and visual alarm indicators for low battery or lead detachment',
    ],
    relatedProductIds: ['dsm-ecg-01', 'dsm-oxi-01', 'dsm-bp-01'],
    relatedResourceLinks: [{ label: 'Browse Diagnostic Specifications', url: '/resources/specifications' }],
    content: `
### Operational Checklist Overview

Every capital diagnostic unit entering a medical facility must clear biomedical engineering validation before clinical commissioning. Use this checklist during vendor quotation analysis and equipment acceptance testing.
    `,
  },
  {
    id: 'guide-5',
    slug: 'factors-to-consider-when-buying-clinical-equipment',
    title: 'Factors to Consider When Buying Patient Monitoring & Diagnostic Devices',
    metaTitle: 'Factors When Buying Patient Monitoring Devices | Dr Surya Medicare',
    metaDescription:
      'Learn how to evaluate SpO2 response, NIBP cuff sizes, ECG filtering, and patient data storage when investing in clinical vital signs monitors.',
    category: 'Monitoring Devices',
    summary:
      'Key considerations for choosing patient monitors, digital blood pressure units, and fingertip oximeters for clinics, home ICU setups, and nursing homes.',
    estimatedReadTime: '5 min read',
    publishedAt: '2026-10-05',
    isFeatured: false,
    keyTips: [
      'For oximeters, ensure Perfusion Index (PI) display is present to verify signal reliability on patients with poor peripheral circulation.',
      'For digital BP monitors, confirm universal cuff circumference (22cm to 42cm) to avoid false readings on obese or pediatric patients.',
    ],
    checklist: [
      'OLED or high-contrast backlit display for dark room readings',
      'Auto-power off for extended battery longevity',
      'Memory storage capacity for multiple patient readings',
      'Washable and replaceable cuffs and sensor probes',
    ],
    relatedProductIds: ['dsm-oxi-01', 'dsm-bp-01', 'dsm-steth-01', 'dsm-therm-01'],
    relatedResourceLinks: [{ label: 'Monitoring Devices Catalogue', url: '/shop?category=monitoring-devices' }],
    content: `
### Introduction

Accurate vitals monitoring forms the cornerstone of clinical decision making. Choosing verified medical equipment with high sensitivity sensors protects against missed desaturations, undetected arrhythmias, and delayed clinical intervention.
    `,
  },
  {
    id: 'guide-6',
    slug: 'bulk-medical-supplies-procurement-guide',
    title: 'Bulk Medical Supplies Procurement Guide: Volume Discounts & GST Compliance',
    metaTitle: 'Bulk Medical Supplies Procurement Guide | Dr Surya Medicare',
    metaDescription:
      'How hospital networks and clinics leverage consolidated bulk purchasing, GST input tax credits, and scheduled dispatches to optimize supply chain costs.',
    category: 'Hospital Procurement',
    summary:
      'Strategies for hospital procurement teams to optimize medical supply spend, claim GST input tax credit, structure tiered volume discounts, and manage batch traceability.',
    estimatedReadTime: '6 min read',
    publishedAt: '2026-09-28',
    isFeatured: false,
    keyTips: [
      'Aggregate consumable requirements across outpatient, surgical, and ward departments to achieve higher bulk discount tiers.',
      'Verify that invoices itemize HSN codes and exact GST slabs (5%, 12%, or 18%) for accurate input tax credit claims.',
    ],
    checklist: [
      'Master supply agreement with transparent price validity periods',
      'Dedicated institutional relationship manager assigned',
      'Flexible payment terms and institutional credit options',
      'Batch-level quality test reports accompanying every master carton',
    ],
    relatedProductIds: ['dsm-gloves-01', 'dsm-mask-01', 'dsm-iv-01', 'dsm-syring-01'],
    relatedResourceLinks: [{ label: 'Submit Bulk Order RFQ', url: '/bulk-orders' }],
    content: `
### Strategic Procurement Overview

Procuring healthcare inventory at scale requires transparent pricing and reliable delivery commitments. Dr Surya Medicare provides dedicated institutional accounts with volume rebates, priority courier allocations, and GST-compliant invoicing for registered hospitals and healthcare networks.
    `,
  },
];

// =========================================================================
// 3. PRODUCT KNOWLEDGE (EDUCATIONAL DEEP-DIVES)
// =========================================================================
export const initialProductKnowledge: ProductKnowledgeArticle[] = [
  {
    id: 'know-1',
    slug: 'diagnostic-equipment-essentials',
    title: 'Diagnostic Equipment: Operating Principles, Terminology & Maintenance',
    category: 'Diagnostic Equipment',
    summary:
      'Understanding the operating principles of digital oscillometric blood pressure monitors, acoustic stethoscopes, and clinical thermometry in routine patient assessment.',
    intendedUse:
      'Non-invasive physiological assessment of patient vital signs across outpatient departments, clinical wards, emergency rooms, and home healthcare.',
    keyFeatures: [
      'Oscillometric pressure wave detection with automatic deflation valves',
      'Tunable dual-frequency acoustic diaphragms for heart murmurs and lung sounds',
      'Waterproof thermistor probes with fever threshold audio alarms',
      'Arterial arrhythmia and irregular heartbeat (IHB) detection algorithms',
    ],
    terminology: [
      {
        term: 'Oscillometric Method',
        definition:
          'Electronic measurement of pressure oscillations in the cuff caused by arterial pulse waves as cuff pressure deflates, calculating systolic and diastolic values.',
      },
      {
        term: 'Plethysmography',
        definition:
          'Optical measurement of volumetric changes in peripheral blood vessels with each heartbeat, providing real-time arterial pulse wave visualization.',
      },
      {
        term: 'Tunable Diaphragm',
        definition:
          'Acoustic stethoscope diaphragm that alters frequency response: light pressure captures low-frequency heart sounds, while firm pressure captures high-frequency lung sounds.',
      },
      {
        term: 'Perfusion Index (PI)',
        definition:
          'The ratio of pulsatile blood flow to static non-pulsatile blood flow in peripheral tissue, indicating pulse signal strength from 0.2% to 20%.',
      },
    ],
    differences: [
      {
        typeA: 'Digital Oscillometric BP Monitor',
        typeB: 'Manual Mercury / Aneroid Sphygmomanometer',
        comparison:
          'Digital monitors eliminate human auscultation error and mercury toxicity risks, providing automated digital readouts; manual units require stethoscope auscultation of Korotkoff sounds.',
      },
      {
        typeA: 'Acoustic Dual-Head Stethoscope',
        typeB: 'Single-Head Nursing Stethoscope',
        comparison:
          'Dual-head models feature both an adult diaphragm and pediatric bell for detailed cardiology and respiratory auscultation; single-head units are designed for basic blood pressure checks.',
      },
    ],
    careAndMaintenance: [
      'Wipe digital monitor chassis and stethoscope tubing weekly with 70% isopropyl alcohol; avoid submerging electronic displays in liquid.',
      'Replace disposable probe covers or wipe rigid clinical thermometers with hospital disinfectant after every patient use.',
      'Store blood pressure cuffs deflated and loosely rolled to prevent bladder punctures and internal tubing stress.',
    ],
    relatedProductIds: ['dsm-bp-01', 'dsm-steth-01', 'dsm-therm-01'],
    publishedAt: '2026-11-01',
  },
  {
    id: 'know-2',
    slug: 'surgical-instruments-metallurgy',
    title: 'Surgical Instruments: Stainless Steel Metallurgy, Passivation & Care',
    category: 'Surgical Instruments',
    summary:
      'An educational guide on medical steel alloys, passivation protection, box-lock alignments, and preventive maintenance for operating theater tools.',
    intendedUse:
      'Precision tissue dissection, clamping, hemostasis, suturing, and wound closure in minor surgical suites and hospital operation theaters.',
    keyFeatures: [
      'Drop-forged AISI 410 and 420 martensitic surgical stainless steel',
      'Tungsten-carbide cross-serrated jaw inserts for needle grip stability',
      'Micro-honed scissor cutting edges passivated against electrolytic rust',
      'Smooth box-lock hinges with multi-step positive ratchet locking',
    ],
    terminology: [
      {
        term: 'Passivation',
        definition:
          'Chemical treatment using acid to remove exogenous free iron from stainless steel surfaces, creating a protective chromium oxide barrier that resists corrosion.',
      },
      {
        term: 'Box-Lock',
        definition:
          'A hinge joint in forceps and scissors where one shank passes through a slot in the other, providing superior lateral stability compared to lap joints.',
      },
      {
        term: 'Ratchet Lock',
        definition:
          'Interlocking stepped teeth near the instrument finger rings that hold the working jaws clamped with constant pressure without manual exertion.',
      },
    ],
    differences: [
      {
        typeA: 'Martensitic Stainless Steel (AISI 410/420)',
        typeB: 'Austenitic Stainless Steel (AISI 304/316)',
        comparison:
          'Martensitic steel can be hardened to maintain razor-sharp cutting edges in scissors and scalpels; austenitic steel is ductile and highly corrosion-resistant, ideal for trays and dishes.',
      },
      {
        typeA: 'Reusable Passivated Instruments',
        typeB: 'Single-Use Disposable Instruments',
        comparison:
          'Reusable instruments provide heavy ergonomic balance and withstand hundreds of autoclave cycles; single-use instruments eliminate reprocessing costs in high-turnover triage.',
      },
    ],
    careAndMaintenance: [
      'Rinse organic residues immediately after procedures; never let saline or blood dry in serrations or hinges.',
      'Clean in ultrasonic baths with neutral enzymatic detergent; never use wire brushes or abrasive pads.',
      'Autoclave with ratchets and box locks open to allow steam penetration and prevent thermal stress cracking.',
    ],
    relatedProductIds: ['dsm-surg-01', 'dsm-scalpel-01', 'dsm-needle-01', 'dsm-tray-01'],
    publishedAt: '2026-10-25',
  },
  {
    id: 'know-3',
    slug: 'hospital-consumables-infusion-standards',
    title: 'Hospital Consumables: Infusion Sets, Cannulas & Syringe Specifications',
    category: 'Hospital Consumables',
    summary:
      'Technical breakdown of intravenous fluid delivery sets, catheter materials, needle wall technology, and fluid filtration standards.',
    intendedUse:
      'Intravenous administration of parenteral medications, crystalloid fluid rehydration, blood sampling, and sterile wound exudate management.',
    keyFeatures: [
      'Kink-resistant clear medical grade PVC tubing with roller clamp control',
      'Hydrophobic antibacterial air vents preventing fluid contamination',
      'Biocompatible PTFE (Teflon) catheter tubing with radiopaque stripes',
      'Triple-facet siliconized Japanese stainless steel needle points',
    ],
    terminology: [
      {
        term: 'Drop Factor',
        definition:
          'The number of drops required to deliver 1 milliliter of fluid through the drip chamber (standard adult gravity set = 20 drops/ml).',
      },
      {
        term: 'Vented vs. Non-Vented',
        definition:
          'Vented sets have a filtered air inlet for rigid glass bottles; non-vented sets are designed for collapsible plastic infusion containers.',
      },
      {
        term: 'Radiopaque Stripe',
        definition:
          'Barium sulfate or bismuth embedded within IV catheters that makes the cannula clearly visible under X-ray imaging if dislodged.',
      },
      {
        term: 'Luer Slip vs. Luer Lock',
        definition:
          'Luer slip pushes firmly into needle hubs; Luer lock twists and securely threads, preventing accidental detachment during high-pressure infusions.',
      },
    ],
    differences: [
      {
        typeA: 'Vented IV Infusion Set',
        typeB: 'Non-Vented IV Infusion Set',
        comparison:
          'Vented sets feature a hydrophobic bacterial air vent to equalize vacuum pressure in rigid glass bottles; non-vented sets rely on atmospheric collapse of plastic bags.',
      },
      {
        typeA: '20G IV Cannula (Pink)',
        typeB: '22G IV Cannula (Blue)',
        comparison:
          '20G (larger lumen, ~60 ml/min flow rate) is standard for rapid adult fluid administration and blood products; 22G (~36 ml/min) is suited for fragile, small peripheral veins.',
      },
    ],
    careAndMaintenance: [
      'Consumables are strictly single-use and sterile; discard if the individual peel-pouch seal is torn or opened.',
      'Store in clean, dry ambient conditions away from direct sunlight and damp walls.',
      'Dispose of used needles and sharps in puncture-resistant biohazard sharps containers in accordance with biomedical waste rules.',
    ],
    relatedProductIds: ['dsm-iv-01', 'dsm-iv-02', 'dsm-iv-03', 'dsm-syring-01', 'dsm-gauze-01'],
    publishedAt: '2026-10-20',
  },
  {
    id: 'know-4',
    slug: 'ppe-standards-barrier-levels',
    title: 'Personal Protective Equipment: Barrier Standards, Filtration & Material Science',
    category: 'Personal Protective Equipment',
    summary:
      'Understanding bacterial filtration efficiency (BFE), fluid barrier ratings (AAMI), and examination glove quality levels (AQL).',
    intendedUse:
      'Biological barrier protection for clinical personnel against infectious pathogens, respiratory droplets, bloodborne fluids, and chemical splashes.',
    keyFeatures: [
      'Meltblown electrostatic micro-fiber filtration layers (BFE ≥ 99%)',
      'Ultrasonically welded non-linting 3-ply polypropylene fabric',
      'Latex-free synthetic nitrile with chemical permeation resistance',
      'SMS multi-layer fluid repellent surgical gown barriers',
    ],
    terminology: [
      {
        term: 'BFE (Bacterial Filtration Efficiency)',
        definition:
          'Percentage of standard biological aerosol particles (Staphylococcus aureus, ~3 microns) captured by a medical face mask filter.',
      },
      {
        term: 'AQL (Acceptable Quality Level)',
        definition:
          'A statistical quality sampling standard; AQL 1.5 indicates fewer than 1.5 pinholes per 100 tested gloves under water pressure testing.',
      },
      {
        term: 'SMS Fabric',
        definition:
          'Spunbond-Meltblown-Spunbond composite non-woven material combining high tensile strength with impenetrable fluid barrier protection.',
      },
    ],
    differences: [
      {
        typeA: 'Medical Nitrile Gloves',
        typeB: 'Surgical Latex Gloves',
        comparison:
          'Nitrile is 100% synthetic, eliminating latex protein allergy risks, with higher puncture resistance; latex offers maximum elasticity and natural snugness.',
      },
      {
        typeA: '3-Ply Surgical Face Mask',
        typeB: 'Cloth / Single-Layer Mask',
        comparison:
          'Medical 3-ply masks contain a certified electrostatically charged meltblown middle filter layer; cloth masks provide no certified bacterial filtration efficiency.',
      },
    ],
    careAndMaintenance: [
      'Glove boxes should be stored below 30°C away from direct heat, ozone generators, and fluorescent ultraviolet lighting.',
      'Masks and gowns are single-use; discard immediately upon visible dampness, blood splash, or after each clinical session.',
    ],
    relatedProductIds: ['dsm-gloves-01', 'dsm-gloves-02', 'dsm-mask-01', 'dsm-gown-01'],
    publishedAt: '2026-10-15',
  },
  {
    id: 'know-5',
    slug: 'respiratory-oxygen-care-systems',
    title: 'Respiratory Care Systems: Oxygen Concentrators, Cannulas & Flow Dynamics',
    category: 'Medical Equipment',
    summary:
      'How molecular sieve oxygen concentrators work, flow rate settings, humidification, and soft-touch cannula patient comfort.',
    intendedUse:
      'Supplemental oxygen therapy for chronic obstructive pulmonary disease (COPD), post-operative recovery, hypoxia, and acute respiratory distress.',
    keyFeatures: [
      'Dual molecular sieve pressure swing adsorption (PSA) technology',
      'Continuous 0.5 to 10 L/min medical purity (93% ± 3%) oxygen output',
      'Built-in oxygen purity sensor with audio-visual status alarms',
      'Crush-resistant star-lumen curved nasal cannulas preventing flow kinks',
    ],
    terminology: [
      {
        term: 'PSA (Pressure Swing Adsorption)',
        definition:
          'Process where zeolite molecular sieves adsorb ambient nitrogen under pressure, delivering concentrated 93% pure oxygen to the patient.',
      },
      {
        term: 'Star-Lumen Tubing',
        definition:
          'Oxygen tubing manufactured with an internal star-shaped cross section that ensures uninterrupted gas flow even if twisted or stepped on.',
      },
      {
        term: 'FiO2',
        definition:
          'Fraction of Inspired Oxygen; ambient room air has an FiO2 of 21%, while supplemental oxygen delivery elevates inspired oxygen concentration.',
      },
    ],
    differences: [
      {
        typeA: 'Medical Oxygen Concentrator',
        typeB: 'Compressed Oxygen Gas Cylinder',
        comparison:
          'Concentrators generate unlimited oxygen continuously from ambient air using electrical power; cylinders store finite pressurized gas and require frequent refills.',
      },
      {
        typeA: 'Nasal Oxygen Cannula',
        typeB: 'Simple Oxygen Face Mask',
        comparison:
          'Cannulas deliver 1-6 L/min comfortably allowing eating and speaking; masks deliver higher flow (5-10 L/min) for moderate to severe hypoxemia.',
      },
    ],
    careAndMaintenance: [
      'Clean concentrator sponge air intake filters weekly in warm water and dry completely before reinserting.',
      'Refill humidifier bottles exclusively with distilled or sterile water; clean bottles daily to prevent bacterial colonization.',
      'Replace nasal cannulas every 2 to 4 weeks or after respiratory infections.',
    ],
    relatedProductIds: ['dsm-oxy-01', 'dsm-cannula-01', 'dsm-oxi-01'],
    publishedAt: '2026-10-10',
  },
  {
    id: 'know-6',
    slug: 'patient-care-furniture-ergonomics',
    title: 'Patient Care & Hospital Furniture: Fowler Bed Positions & Bedsore Prevention',
    category: 'Clinical Supplies',
    summary:
      'Clinical advantages of semi-Fowler positioning, alternating pressure air mattresses, and doctor consultation ergonomics.',
    intendedUse:
      'Long-term patient recovery, decubitus ulcer (bedsore) prevention, patient mobility, and clinical examination comfort.',
    keyFeatures: [
      'Smooth mechanical crank elevation for backrest support up to 75 degrees',
      'Alternating inflation/deflation bubble cell cycles redistributing capillary pressure',
      'Removable molded ABS head and foot boards with four-corner IV pole sockets',
      'Pneumatic hydraulic height adjustment for consultation examination stools',
    ],
    terminology: [
      {
        term: 'Semi-Fowler Position',
        definition:
          'Positioning a patient on their back with the head of the bed inclined at 30 to 45 degrees, facilitating lung expansion and reducing aspiration risk.',
      },
      {
        term: 'Decubitus Ulcer',
        definition:
          'Localized damage to skin and underlying tissue resulting from prolonged, unrelieved pressure over bony prominences like the sacrum and heels.',
      },
      {
        term: 'Alternating Pressure Cycle',
        definition:
          'A system where two sets of air cells alternately inflate and deflate every 6 minutes, ensuring no body zone experiences continuous capillary shutdown.',
      },
    ],
    differences: [
      {
        typeA: 'Semi-Fowler Hospital Bed',
        typeB: 'Full-Fowler / Multi-Function ICU Bed',
        comparison:
          'Semi-Fowler beds adjust the backrest elevation; Full-Fowler beds offer independent backrest, knee rest, trendelenburg, and height adjustment.',
      },
      {
        typeA: 'Alternating Pressure Air Mattress',
        typeB: 'Standard Foam Hospital Mattress',
        comparison:
          'Alternating air systems actively cycle contact points to prevent pressure sores in bedridden patients; standard foam maintains constant static pressure.',
      },
    ],
    careAndMaintenance: [
      'Wipe mattress vinyl and bed frame surfaces with dilute hospital disinfectant (sodium hypochlorite or quaternary ammonium compounds).',
      'Keep air pump intake filters free of dust; ensure air connecting hoses have no sharp bends.',
    ],
    relatedProductIds: ['dsm-bed-01', 'dsm-matt-01', 'dsm-stool-01', 'dsm-bath-01'],
    publishedAt: '2026-10-01',
  },
];

// =========================================================================
// 4. FAQS (ORGANIZED BY 7 REQUESTED SECTIONS)
// =========================================================================
export const initialFaqs: FaqItem[] = [
  // General Enquiries
  {
    id: 'faq-gen-1',
    category: 'General Enquiries',
    question: 'What is Dr Surya Medicare and who do you supply to?',
    answer:
      'Dr Surya Medicare is an Indian B2B medical wholesale marketplace and clinical procurement partner. We supply registered hospitals, nursing homes, diagnostic laboratories, healthcare professionals, and clinics across India with medical equipment, surgical supplies, pharmaceuticals, and consumables.',
    isPopular: true,
  },
  {
    id: 'faq-gen-2',
    category: 'General Enquiries',
    question: 'Are your medical supplies certified and compliant with Indian regulations?',
    answer:
      'Yes. All medical equipment, diagnostic tools, and clinical consumables sourced and distributed by Dr Surya Medicare comply with Central Drugs Standard Control Organisation (CDSCO) regulations, ISO 13485 standards, and Indian Pharmacopoeia (IP) grade requirements where applicable. Batch inspection certificates are provided upon request.',
    isPopular: true,
  },
  {
    id: 'faq-gen-3',
    category: 'General Enquiries',
    question: 'Where is Dr Surya Medicare headquartered and what are your operating hours?',
    answer:
      'Our primary distribution hub is located at Medicare Commercial Hub, 4th Block, Koramangala, Bengaluru, Karnataka 560034. Our customer support and logistics desk operates Monday through Saturday, 9:00 AM to 8:00 PM IST.',
  },

  // Product Information
  {
    id: 'faq-prod-1',
    category: 'Product Information',
    question: 'How do I know if an item is genuine and not counterfeit?',
    answer:
      'Every product in our catalog is procured directly from verified brand manufacturers and authorized distributors. Products feature tamper-evident packaging, manufacturer holograms where applicable, stamped batch numbers, manufacturing/expiry dates, and manufacturer warranty cards.',
    isPopular: true,
  },
  {
    id: 'faq-prod-2',
    category: 'Product Information',
    question: 'Do electronic medical devices come with a warranty?',
    answer:
      'Yes, all electronic medical equipment—including 12-lead ECG machines, digital blood pressure monitors, pulse oximeters, and oxygen concentrators—carry standard 1 to 2-year manufacturer warranties. Comprehensive Annual Maintenance Contracts (CMC) can also be arranged for hospital institutional accounts.',
  },
  {
    id: 'faq-prod-3',
    category: 'Product Information',
    question: 'Can I request technical datasheets or CE/ISO declarations before ordering?',
    answer:
      'Yes. Our regulatory documentation desk can provide detailed technical specifications, CE/ISO certificates, and CDSCO declaration sheets. You can request these directly through our WhatsApp desk or the Specifications section in Resources.',
  },

  // Orders & Payments
  {
    id: 'faq-ord-1',
    category: 'Orders & Payments',
    question: 'How do I place an order on Dr Surya Medicare?',
    answer:
      'You can browse products online, add items to your cart, and submit your order directly via our automated WhatsApp desk with a prefilled inventory summary. For institutional tenders and bulk hospital orders, you can submit an online RFQ or contact our procurement desk directly.',
    isPopular: true,
  },
  {
    id: 'faq-ord-2',
    category: 'Orders & Payments',
    question: 'What payment methods do you support for clinics and hospitals?',
    answer:
      'We accept NEFT/RTGS bank transfers, UPI, corporate debit/credit cards, and net banking. For verified institutional hospital accounts with recurring purchase agreements, credit terms of 15 to 30 days are available upon credit appraisal.',
  },
  {
    id: 'faq-ord-3',
    category: 'Orders & Payments',
    question: 'Will I receive a GST-compliant tax invoice?',
    answer:
      'Yes. Every consignment is dispatched with a formal, GST-compliant tax invoice indicating your hospital or clinic GSTIN, itemized HSN codes, and applicable CGST/SGST/IGST rates (5%, 12%, or 18%) to ensure 100% input tax credit eligibility.',
  },

  // Delivery & Consignment
  {
    id: 'faq-del-1',
    category: 'Delivery & Consignment',
    question: 'How long does delivery take across India?',
    answer:
      'Standard dispatch occurs within 24 hours of order confirmation. Delivery timelines range from 2 to 4 business days for metropolitan and tier-1 cities, and 4 to 6 business days for tier-2/tier-3 regional healthcare facilities.',
    isPopular: true,
  },
  {
    id: 'faq-del-2',
    category: 'Delivery & Consignment',
    question: 'How can I track my medical consignment in real time?',
    answer:
      'You can track your shipment anytime by clicking "Track Consignment" in our top announcement bar. Enter your Order ID (e.g. DSM-98241) or registered phone number to view live transit milestones, carrier details (BlueDart, Delhivery), and temperature monitoring status.',
  },
  {
    id: 'faq-del-3',
    category: 'Delivery & Consignment',
    question: 'What is your shipping fee policy?',
    answer:
      'Orders above ₹2,499 qualify for free standard shipping across India. For orders below this threshold, a flat standard courier fee of ₹149 applies. Heavy capital furniture and pallet freight may incur freight charges based on destination pincode.',
  },

  // Bulk Orders
  {
    id: 'faq-bulk-1',
    category: 'Bulk Orders',
    question: 'What qualifies as a bulk order and what volume discounts are offered?',
    answer:
      'Bulk orders generally comprise master-carton quantities (e.g., 10+ boxes of gloves, 50+ IV sets, or multiple ICU beds). We provide tiered wholesale discounts ranging from 5% to 35% depending on volume, institutional contracts, and recurring purchase schedules.',
    isPopular: true,
  },
  {
    id: 'faq-bulk-2',
    category: 'Bulk Orders',
    question: 'How do I submit an institutional Request for Quotation (RFQ)?',
    answer:
      'Navigate to the "Bulk Orders" page from our header navigation. Fill out your organization details, upload your purchase list or specify required items, and our institutional team will furnish an official quote with stock reservation within 4 business hours.',
  },

  // Returns & Refunds
  {
    id: 'faq-ret-1',
    category: 'Returns & Refunds',
    question: 'What is your return policy for damaged or defective medical supplies?',
    answer:
      'If any product arrives damaged, incomplete, or with a broken seal, report it to our support desk within 48 hours of delivery with photographic evidence. We provide immediate replacement or a full credit note/refund.',
  },
  {
    id: 'faq-ret-2',
    category: 'Returns & Refunds',
    question: 'Can opened sterile consumables or pharmaceuticals be returned?',
    answer:
      'In strict compliance with drug safety and medical hygiene regulations, sterile consumables (e.g., opened gauze, syringes, IV sets) and pharmaceuticals cannot be returned once their primary sterile packaging has been unsealed, unless proven to possess an intrinsic manufacturing defect.',
  },

  // Customer Support
  {
    id: 'faq-sup-1',
    category: 'Customer Support',
    question: 'How do I reach the Dr Surya Medicare support team?',
    answer:
      'You can contact our support team via verified WhatsApp at +91 98765 43210, call our central phone line at +91 80 2345 6789, or email care@drsuryamedicare.com. Emergency hospital procurement queries receive priority dispatch assistance.',
    isPopular: true,
  },
  {
    id: 'faq-sup-2',
    category: 'Customer Support',
    question: 'Do you offer biomedical installation and staff training for hospital equipment?',
    answer:
      'Yes. For diagnostic and capital equipment like 12-lead ECG machines and 10L oxygen concentrators, our biomedical technical partners coordinate on-site installation, operational qualification, and nursing team training.',
  },
];

// =========================================================================
// 5. MANUALS & DOWNLOADS (GENUINE STRUCTURE - NO FAKE DOWNLOADS)
// Note: Per user prompt, isAvailable: false for un-uploaded documents.
// =========================================================================
export const initialManuals: ManualDocument[] = [
  {
    id: 'doc-1',
    title: 'SuryaCardio 12-Channel Diagnostic ECG User Manual & Lead Placement Guide',
    productRef: 'SuryaCardio 12-Channel Diagnostic ECG Machine',
    modelSku: 'DSM-MON-202',
    category: 'User Manual',
    language: 'English',
    fileFormat: 'PDF',
    fileSize: '4.8 MB',
    fileUrl: '', // No fake PDF! Handled via genuine availability check & WhatsApp request
    isAvailable: false,
    uploadDate: '2026-11-01',
    description:
      'Detailed clinical operator manual covering 12-lead cable positioning, Glasgow algorithmic interpretation settings, thermal printer paper loading, and daily calibration protocols.',
  },
  {
    id: 'doc-2',
    title: 'AeroPulse 10L High-Flow Oxygen Concentrator Technical Service & Maintenance Manual',
    productRef: 'AeroPulse 10L High-Flow Medical Oxygen Concentrator',
    modelSku: 'DSM-RES-501',
    category: 'Technical Service Guide',
    language: 'English',
    fileFormat: 'PDF',
    fileSize: '3.6 MB',
    fileUrl: '',
    isAvailable: false,
    uploadDate: '2026-10-25',
    description:
      'Biomedical service documentation detailing zeolite molecular sieve pressure swing adsorption (PSA) diagnostics, compressor maintenance, and bacterial filter replacement cycles.',
  },
  {
    id: 'doc-3',
    title: 'SuryaSafe Nitrile Examination Gloves CDSCO & EN 455 Declaration of Conformity',
    productRef: 'SuryaSafe Powder-Free Blue Medical Nitrile Examination Gloves',
    modelSku: 'DSM-PPE-301',
    category: 'ISO/CE Declaration',
    language: 'English',
    fileFormat: 'PDF',
    fileSize: '1.2 MB',
    fileUrl: '',
    isAvailable: false,
    uploadDate: '2026-10-18',
    description:
      'Regulatory compliance documentation certifying AQL 1.5 water leak inspection, ASTM D6319 physical property requirements, and chemical permeation resistance.',
  },
  {
    id: 'doc-4',
    title: 'SuryaMed Minor OT Surgical Instrument Set Sterilization & Passivation Protocol',
    productRef: 'SuryaMed Minor OT Surgical Instrument Set (24 Pieces)',
    modelSku: 'DSM-SUR-301',
    category: 'Sterilization Protocol',
    language: 'English',
    fileFormat: 'PDF',
    fileSize: '2.1 MB',
    fileUrl: '',
    isAvailable: false,
    uploadDate: '2026-10-12',
    description:
      'Validated decontamination, ultrasonic enzymatic bath preparation, lubrication, and steam autoclave parameters for AISI 410/420 surgical steel tools.',
  },
  {
    id: 'doc-5',
    title: 'BioOptix Clinical Binocular Laboratory Microscope Optical Specifications & User Guide',
    productRef: 'BioOptix Clinical Binocular Biological Compound Laboratory Microscope',
    modelSku: 'DSM-LAB-701',
    category: 'Product Data Sheet',
    language: 'English',
    fileFormat: 'PDF',
    fileSize: '2.9 MB',
    fileUrl: '',
    isAvailable: false,
    uploadDate: '2026-10-05',
    description:
      'Achromatic DIN objective magnification chart, Koehler LED illumination adjustment, mechanical stage vernier scale alignment, and immersion oil cleaning instructions.',
  },
];
