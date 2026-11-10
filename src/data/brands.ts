export interface Brand {
  id: string;
  name: string;
  description: string;
  tier: 'Premium' | 'Enterprise' | 'Essential';
}

export const brands: Brand[] = [
  { id: 'suryamed-pro', name: 'SuryaMed Pro', description: 'Clinical-grade precision equipment & vitals monitors', tier: 'Premium' },
  { id: 'suryamed-surgical', name: 'SuryaMed Surgical', description: 'Surgical stainless steel instruments & minor OT sets', tier: 'Premium' },
  { id: 'suryamed', name: 'SuryaMed', description: 'Core hospital consumables, first aid & clinic essentials', tier: 'Essential' },
  { id: 'suryacare', name: 'SuryaCare', description: 'Patient care equipment, hospital furniture & bedsore prevention', tier: 'Enterprise' },
  { id: 'suryaglide', name: 'SuryaGlide', description: 'Lightweight wheelchairs & patient mobility solutions', tier: 'Enterprise' },
  { id: 'suryasafe', name: 'SuryaSafe', description: 'Nitrile examination gloves & PPE barrier protection', tier: 'Essential' },
  { id: 'suryashield', name: 'SuryaShield', description: 'Medical meltblown surgical masks & filtration gear', tier: 'Essential' },
  { id: 'aeropulse', name: 'AeroPulse', description: 'Medical oxygen concentrators & respiratory support', tier: 'Premium' },
  { id: 'cardiosmart', name: 'CardioSmart', description: 'Diagnostic 12-channel ECG machines & interpretation systems', tier: 'Enterprise' },
  { id: 'biooptix', name: 'BioOptix', description: 'Clinical microscopes & laboratory centrifuges', tier: 'Enterprise' },
  { id: 'glucofresh', name: 'Glucofresh', description: 'Accurate GDH-FAD blood sugar monitoring systems', tier: 'Essential' },
];
