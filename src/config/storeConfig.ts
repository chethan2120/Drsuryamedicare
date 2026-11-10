export interface StoreConfig {
  businessName: string;
  tagline: string;
  whatsappNumber: string; // international format without spaces, e.g., 919876543210
  whatsappDisplayNumber: string;
  supportEmail: string;
  supportPhone: string;
  address: {
    line1: string;
    line2: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  currency: {
    code: string;
    symbol: string;
    locale: string;
  };
  shipping: {
    freeThreshold: number; // e.g. 2000
    standardFee: number; // e.g. 149
    estimatedDays: string;
  };
  social: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
  gstin: string; // placeholder for demo
  drugLicenseDemo: string;
}

export const storeConfig: StoreConfig = {
  businessName: 'Dr Surya Medicare',
  tagline: 'Your Healthcare Supply Partner',
  // Configurable WhatsApp Business number placeholder
  whatsappNumber: '919876543210',
  whatsappDisplayNumber: '+91 98765 43210',
  supportEmail: 'care@drsuryamedicare.com',
  supportPhone: '+91 80 2345 6789',
  address: {
    line1: 'Medicare Commercial Hub, 4th Block, Koramangala',
    line2: 'Opp. Apollo Health City',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560034',
    country: 'India',
  },
  currency: {
    code: 'INR',
    symbol: '₹',
    locale: 'en-IN',
  },
  shipping: {
    freeThreshold: 2499,
    standardFee: 149,
    estimatedDays: '2 - 4 Business Days',
  },
  social: {
    linkedin: 'https://linkedin.com/company/dr-surya-medicare',
    twitter: 'https://twitter.com/drsuryamedicare',
    instagram: 'https://instagram.com/drsuryamedicare',
  },
  gstin: '29ABCDE1234F1Z5',
  drugLicenseDemo: 'KA-BLR-2024-DL0988',
};
