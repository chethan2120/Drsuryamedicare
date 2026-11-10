import { Product } from '../types';

const TOKEN_ALIASES: Record<string, string> = {
  bp: 'blood pressure',
  ecg: 'electrocardiogram',
  spo2: 'oximeter',
  o2: 'oxygen',
  iv: 'infusion',
  ot: 'surgical',
  ppe: 'gloves',
};

export function productMatchesQuery(product: Product, rawQuery: string): boolean {
  const tokens = rawQuery.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return true;

  const haystack = [
    product.name,
    product.sku,
    product.brand,
    product.categoryName,
    product.shortDescription,
    product.productType,
    ...product.searchKeywords,
  ]
    .join(' ')
    .toLowerCase();

  return tokens.every((token) => {
    if (haystack.includes(token)) return true;
    const alias = TOKEN_ALIASES[token];
    return alias ? haystack.includes(alias) : false;
  });
}
