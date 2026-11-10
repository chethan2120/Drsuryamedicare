export type BlogCategory =
  | 'Hospital Supplies'
  | 'Medical Equipment'
  | 'Surgical Supplies'
  | 'Healthcare Industry'
  | 'Medical Consumables'
  | 'Product Guides'
  | 'Hospital Procurement';

export interface TocItem {
  id: string;
  title: string;
  level: number;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  category: BlogCategory;
  excerpt: string;
  content: string; // rich markdown/html content
  featuredImage: string;
  author: string;
  authorRole?: string;
  publishedAt: string;
  updatedAt: string;
  readTime: string;
  tags: string[];
  isFeatured: boolean;
  isDraft: boolean;
  tableOfContents: TocItem[];
  relatedProductIds?: string[];
  relatedBlogSlugs?: string[];
}

export interface BuyingGuide {
  id: string;
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  category: string;
  summary: string;
  estimatedReadTime: string;
  content: string;
  keyTips: string[];
  checklist?: string[];
  relatedProductIds?: string[];
  relatedResourceLinks?: { label: string; url: string }[];
  publishedAt: string;
  isFeatured?: boolean;
}

export interface TerminologyItem {
  term: string;
  definition: string;
}

export interface ProductComparisonItem {
  typeA: string;
  typeB: string;
  comparison: string;
}

export interface ProductKnowledgeArticle {
  id: string;
  slug: string;
  title: string;
  category:
    | 'Medical Equipment'
    | 'Surgical Instruments'
    | 'Hospital Consumables'
    | 'Diagnostic Equipment'
    | 'Personal Protective Equipment'
    | 'Clinical Supplies';
  summary: string;
  intendedUse: string;
  keyFeatures: string[];
  terminology: TerminologyItem[];
  differences: ProductComparisonItem[];
  careAndMaintenance: string[];
  relatedProductIds?: string[];
  publishedAt: string;
}

export type FaqCategory =
  | 'General Enquiries'
  | 'Product Information'
  | 'Orders & Payments'
  | 'Delivery & Consignment'
  | 'Bulk Orders'
  | 'Returns & Refunds'
  | 'Customer Support';

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: FaqCategory;
  isPopular?: boolean;
}

export type DocumentCategory =
  | 'User Manual'
  | 'Technical Service Guide'
  | 'ISO/CE Declaration'
  | 'Sterilization Protocol'
  | 'Product Data Sheet';

export interface ManualDocument {
  id: string;
  title: string;
  productRef: string;
  modelSku?: string;
  category: DocumentCategory;
  language: string;
  fileFormat: 'PDF' | 'DOCX' | 'ZIP';
  fileSize: string;
  fileUrl?: string; // Empty/null if genuine document not yet uploaded
  isAvailable: boolean; // MUST be true ONLY when genuine file exists
  uploadDate: string;
  description: string;
}
