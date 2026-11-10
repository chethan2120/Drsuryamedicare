import { Category } from '../types';
import { products } from './products';

const categoryDefinitions: Omit<Category, 'productCount'>[] = [
  {
    id: 'tablets-daily-health',
    name: 'Tablets & Daily Health',
    shortDescription: 'Essential fever reducers (Dolo), antacids (Pan-D), multivitamins, Vitamin C, and daily wellness formulations.',
    image: '/products/tab-dolo.jpg',
    featured: true,
  },
  {
    id: 'diagnostic-equipment',
    name: 'Diagnostic Equipment',
    shortDescription: 'Clinical-grade diagnostic tools including digital BP monitors, acoustic stethoscopes, and thermometers.',
    image: '/products/bp-monitor.svg',
    featured: true,
  },
  {
    id: 'surgical-instruments',
    name: 'Surgical Instruments',
    shortDescription: 'Precision surgical-grade stainless steel minor OT sets, carbon scalpel blades, and needle holders.',
    image: '/products/ot-set.svg',
    featured: true,
  },
  {
    id: 'medical-consumables',
    name: 'Medical Consumables',
    shortDescription: 'Sterile syringes, vented & non-vented IV infusion sets, IV cannulas, and sterile wound gauze.',
    image: '/products/iv-set-vented.svg',
    featured: true,
  },
  {
    id: 'ppe',
    name: 'Personal Protective Equipment',
    shortDescription: 'Powder-free medical nitrile examination gloves, latex gloves, 3-ply surgical masks, and sterile OT gowns.',
    image: '/products/gloves-nitrile.svg',
    featured: true,
  },
  {
    id: 'respiratory-care',
    name: 'Respiratory Care',
    shortDescription: '10L continuous medical oxygen concentrators, soft-touch nasal oxygen cannulas, and breathing accessories.',
    image: '/products/nasal-cannula.jpg',
    featured: true,
  },
  {
    id: 'monitoring-devices',
    name: 'Monitoring Devices',
    shortDescription: 'OLED fingertip pulse oximeters, 12-lead diagnostic ECG machines, and patient vitals monitors.',
    image: '/products/oximeter.jpg',
    featured: true,
  },
  {
    id: 'patient-care',
    name: 'Patient Care Equipment',
    shortDescription: 'Anti-decubitus alternating pressure air mattresses with whisper pump, rinse-free sponge bath wipes, and hygiene aids.',
    image: '/products/mattress-air.svg',
    featured: true,
  },
  {
    id: 'hospital-furniture',
    name: 'Hospital Furniture',
    shortDescription: 'Semi-Fowler manual hospital beds with ABS panels, hydraulic doctor examination stools, and ward essentials.',
    image: '/products/hospital-bed.svg',
  },
  {
    id: 'laboratory-equipment',
    name: 'Laboratory Equipment',
    shortDescription: 'Clinical binocular biological compound microscopes, 4000 RPM benchtop centrifuges, and lab consumables.',
    image: '/products/microscope.jpg',
  },
  {
    id: 'first-aid',
    name: 'First Aid & Emergency Care',
    shortDescription: '140-item industrial trauma responder kits, adult silicone manual resuscitator ambu bags, and fracture splints.',
    image: '/products/firstaid-kit.svg',
  },
  {
    id: 'rehabilitation',
    name: 'Rehabilitation Equipment',
    shortDescription: 'Ultra-light folding wheelchairs with attendant brakes, reciprocal aluminum walking frames, and mobility support.',
    image: '/products/wheelchair.svg',
  },
  {
    id: 'healthcare-accessories',
    name: 'Healthcare Accessories',
    shortDescription: 'Heavy poly-cotton doctor lab aprons, quick-release elastic venipuncture tourniquets, and stainless steel kidney dishes.',
    image: '/products/doctor-coat.svg',
  },
];

// Dynamically compute exact product counts from the actual products array
export const categories: Category[] = categoryDefinitions.map((cat) => ({
  ...cat,
  productCount: products.filter((p) => p.category === cat.id).length,
}));
