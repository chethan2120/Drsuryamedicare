export type CategoryId =
  | 'tablets-daily-health'
  | 'diagnostic-equipment'
  | 'surgical-instruments'
  | 'medical-consumables'
  | 'patient-care'
  | 'respiratory-care'
  | 'hospital-furniture'
  | 'laboratory-equipment'
  | 'ppe'
  | 'first-aid'
  | 'rehabilitation'
  | 'monitoring-devices'
  | 'healthcare-accessories';

export interface Category {
  id: CategoryId;
  name: string;
  shortDescription: string;
  image: string;
  productCount: number;
  featured?: boolean;
}

export type StockStatus = 'in_stock' | 'low_stock' | 'out_of_stock' | 'enquiry_only';
export type UnitType = 'Piece' | 'Box' | 'Pack' | 'Set' | 'Unit' | 'Bottle' | 'Roll' | 'Strip' | 'Tube';
export type ProductType = 'Tablets & Daily Health' | 'Medical Equipment' | 'Consumables' | 'Accessories' | 'Instruments';
export type TargetRequirement =
  | 'Hospitals'
  | 'Clinics'
  | 'Laboratories'
  | 'Healthcare Professionals'
  | 'Home Healthcare';

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: CategoryId;
  categoryName: string;
  brand: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  shortDescription: string;
  description: string;
  images: string[];
  specifications: Record<string, string>;
  packagingDetails: string;
  stockStatus: StockStatus;
  stockCount: number;
  unit: UnitType;
  rating: number; // Demo label
  reviewCount: number;
  isFeatured?: boolean;
  isBestseller?: boolean;
  isSpecialOffer?: boolean;
  targetAudience: TargetRequirement[];
  productType: ProductType;
  relatedProductIds: string[];
  frequentlyBoughtTogetherIds?: string[];
  searchKeywords: string[];
  gstPercent: number;
  faqs: { question: string; answer: string }[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CustomerOrderDetails {
  customerName: string;
  phone: string;
  email?: string;
  pincode: string;
  deliveryAddress: string;
  institutionType?: string;
  institutionName?: string;
  gstNumber?: string;
  notes?: string;
}

export interface BulkEnquiryItem {
  productId?: string;
  productName: string;
  quantity: number;
  unit: string;
  specificationsOrNotes?: string;
}

export interface BulkEnquirySubmission {
  organisationName: string;
  contactPerson: string;
  phone: string;
  email: string;
  organisationType: string;
  items: BulkEnquiryItem[];
  additionalRequirements: string;
  deliveryPincode: string;
  urgency: 'Immediate' | 'Within 2 Weeks' | 'Within 1 Month' | 'Quarterly Contract';
}

export interface FilterState {
  searchQuery: string;
  categories: CategoryId[];
  brands: string[];
  productTypes: ProductType[];
  priceRange: 'all' | 'under-500' | '500-2000' | '2000-10000' | 'above-10000';
  minPrice: number;
  maxPrice: number;
  inStockOnly: boolean;
  minRating: number;
  onlyDiscounted: boolean;
  sortBy: 'recommended' | 'popularity' | 'price-asc' | 'price-desc' | 'newest' | 'name-asc';
}
