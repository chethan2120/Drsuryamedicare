import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products } from '../../data/products';
import { categories } from '../../data/categories';
import { FilterState, CategoryId, ProductType } from '../../types';
import { productMatchesQuery } from '../../utils/search';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { ProductFilters, HUMAN_LOOKING_FOR_OPTIONS } from '../../components/ProductFilters/ProductFilters';
import {
  SlidersHorizontal,
  X,
  Search,
  ChevronDown,
  ShoppingBag,
} from 'lucide-react';

const INITIAL_FILTERS: FilterState = {
  searchQuery: '',
  categories: [],
  brands: [],
  productTypes: [],
  priceRange: 'all',
  minPrice: 0,
  maxPrice: 60000,
  inStockOnly: false,
  minRating: 0,
  onlyDiscounted: false,
  sortBy: 'recommended',
};

export const ShopPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Sync with URL query parameters on initial load or change
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const knownCategories = new Set(categories.map((category) => category.id));
    const categoryIds = (categoryParam ?? '')
      .split(',')
      .map((value) => value.trim())
      .filter((value): value is CategoryId => knownCategories.has(value as CategoryId));
    const searchParam = searchParams.get('search');
    const brandParam = searchParams.get('brand');
    const productTypeParam = searchParams.get('productType') as ProductType | null;
    const sortByParam = searchParams.get('sortBy') as FilterState['sortBy'] | null;
    const onlyDiscountedParam = searchParams.get('onlyDiscounted') === 'true';

    setFilters((prev) => ({
      ...prev,
      categories: categoryIds.length > 0 ? categoryIds : prev.categories,
      brands: brandParam ? [brandParam] : prev.brands,
      searchQuery: searchParam || prev.searchQuery,
      productTypes: productTypeParam ? [productTypeParam] : prev.productTypes,
      sortBy: sortByParam || prev.sortBy,
      onlyDiscounted: onlyDiscountedParam || prev.onlyDiscounted,
    }));
  }, [searchParams]);

  const handleResetFilters = () => {
    setFilters(INITIAL_FILTERS);
    setSearchParams({});
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((item) => {
        // 1. Text search
        if (filters.searchQuery.trim() && !productMatchesQuery(item, filters.searchQuery)) {
          return false;
        }

        if (filters.categories.length > 0 && !filters.categories.includes(item.category)) {
          return false;
        }

        if (filters.brands.length > 0 && !filters.brands.includes(item.brand)) {
          return false;
        }

        if (filters.productTypes.length > 0 && !filters.productTypes.includes(item.productType)) {
          return false;
        }

        if (filters.priceRange === 'under-500' && item.price >= 500) return false;
        if (filters.priceRange === '500-2000' && (item.price < 500 || item.price > 2000)) return false;
        if (filters.priceRange === '2000-10000' && (item.price < 2000 || item.price > 10000)) return false;
        if (filters.priceRange === 'above-10000' && item.price <= 10000) return false;

        if (filters.inStockOnly && item.stockStatus !== 'in_stock' && item.stockStatus !== 'low_stock') {
          return false;
        }

        if (filters.onlyDiscounted && (!item.discountPercent || item.discountPercent <= 0)) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'popularity') return (b.reviewCount || 0) - (a.reviewCount || 0);
        if (filters.sortBy === 'price-asc') return a.price - b.price;
        if (filters.sortBy === 'price-desc') return b.price - a.price;
        if (filters.sortBy === 'name-asc') return a.name.localeCompare(b.name);
        if (filters.sortBy === 'newest') return b.id.localeCompare(a.id);
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [filters]);

  // Active Filter Chips
  const activeChips = useMemo(() => {
    const chips: { label: string; onRemove: () => void }[] = [];

    if (filters.searchQuery) {
      chips.push({
        label: `"${filters.searchQuery}"`,
        onRemove: () => setFilters((f) => ({ ...f, searchQuery: '' })),
      });
    }

    filters.categories.forEach((catId) => {
      const match = HUMAN_LOOKING_FOR_OPTIONS.find((o) => o.categoryId === catId);
      chips.push({
        label: match ? match.label : catId,
        onRemove: () =>
          setFilters((f) => ({
            ...f,
            categories: f.categories.filter((c) => c !== catId),
          })),
      });
    });

    filters.productTypes.forEach((ptype) => {
      chips.push({
        label: ptype,
        onRemove: () =>
          setFilters((f) => ({
            ...f,
            productTypes: f.productTypes.filter((t) => t !== ptype),
          })),
      });
    });

    filters.brands.forEach((brand) => {
      chips.push({
        label: brand,
        onRemove: () => setFilters((f) => ({ ...f, brands: f.brands.filter((item) => item !== brand) })),
      });
    });

    if (filters.priceRange !== 'all') {
      chips.push({
        label: filters.priceRange,
        onRemove: () => setFilters((f) => ({ ...f, priceRange: 'all' })),
      });
    }

    if (filters.inStockOnly) {
      chips.push({
        label: 'Available now',
        onRemove: () => setFilters((f) => ({ ...f, inStockOnly: false })),
      });
    }

    return chips;
  }, [filters]);

  return (
    <div className="bg-brand-warmWhite min-h-screen py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb / Title */}
        <div className="mb-6">
          <div className="text-xs font-semibold text-brand-emerald mb-1">
            HOME / HEALTHCARE CATALOGUE
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-brand-forest">
                Healthcare Product Marketplace
              </h1>
              <p className="text-xs sm:text-sm text-brand-muted mt-0.5">
                Tablets, daily health essentials, verified clinical equipment, and surgical supplies.
              </p>
            </div>

            {/* Quick In-Catalogue Search */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-brand-emerald absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={filters.searchQuery}
                onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
                placeholder="Search products, tablets, SKU..."
                className="w-full pl-9 pr-8 py-2 text-xs rounded-xl bg-white border border-brand-border outline-none focus:border-brand-emerald font-medium text-brand-forest"
              />
              {filters.searchQuery && (
                <button
                  type="button"
                  onClick={() => setFilters({ ...filters, searchQuery: '' })}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-brand-muted hover:text-brand-forest"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Action / Sorting Bar */}
        <div className="bg-white rounded-2xl p-4 border border-brand-border/80 shadow-xs mb-6 flex flex-wrap items-center justify-between gap-4">
          
          {/* Left: Product count & Mobile filter trigger */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsMobileFiltersOpen(true)}
              className="lg:hidden inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-emerald text-white text-xs font-bold shadow-xs active:scale-95 transition-transform"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>What Are You Looking For? ({activeChips.length})</span>
            </button>

            <span className="text-xs font-semibold text-brand-forest">
              Showing <span className="text-brand-emerald font-bold">{filteredProducts.length}</span> of {products.length} products
            </span>
          </div>

          {/* Right: Sort By Dropdown */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-brand-muted font-medium hidden sm:inline">Sort by:</span>
            <div className="relative">
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as FilterState['sortBy'] })}
                className="appearance-none bg-brand-ivory/60 hover:bg-brand-ivory font-semibold text-brand-forest px-3.5 py-2 pr-8 rounded-xl border border-brand-border outline-none cursor-pointer text-xs"
              >
                <option value="recommended">Featured & Recommended</option>
                <option value="popularity">Popularity / Most Reviewed</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Product Name: A to Z</option>
                <option value="newest">Newest Additions</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-brand-muted absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

        </div>

        {/* Active Filter Chips Bar */}
        {activeChips.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-6 p-3 bg-brand-ivory/50 rounded-xl border border-brand-border/60">
            <span className="text-[11px] font-bold text-brand-muted uppercase mr-1">Active Selection:</span>
            {activeChips.map((chip, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-brand-border text-xs font-medium text-brand-forest shadow-xs"
              >
                <span>{chip.label}</span>
                <button
                  type="button"
                  onClick={chip.onRemove}
                  className="hover:text-brand-vermilion p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            <button
              type="button"
              onClick={handleResetFilters}
              className="text-xs font-bold text-brand-vermilion hover:underline ml-2"
            >
              Clear All
            </button>
          </div>
        )}

        {/* Main Grid: Sidebar (What are you looking for?) + Products */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* Desktop Filter Sidebar (1 col) */}
          <div className="hidden lg:block lg:col-span-1 bg-white p-5 rounded-3xl border border-brand-border/80 shadow-xs sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto">
            <ProductFilters
              filters={filters}
              onFilterChange={setFilters}
              onResetFilters={handleResetFilters}
              totalFilteredCount={filteredProducts.length}
            />
          </div>

          {/* Product Cards Grid (3 cols) */}
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl border border-brand-border p-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-brand-ivory flex items-center justify-center text-brand-muted mx-auto border border-brand-border">
                  <ShoppingBag className="w-8 h-8 text-brand-emerald/40" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg text-brand-forest">No matching products found</h3>
                  <p className="text-xs text-brand-muted mt-1 max-w-sm mx-auto">
                    Try selecting another health requirement or clearing search keywords.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-emerald text-white text-xs font-bold shadow hover:bg-brand-emeraldLight transition-colors"
                >
                  Reset Selection
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Mobile Filter Bottom Sheet / Drawer */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden animate-fade-in">
          <div
            className="fixed inset-0 bg-brand-forest/50 backdrop-blur-xs"
            onClick={() => setIsMobileFiltersOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-sm bg-brand-warmWhite p-5 shadow-modal overflow-y-auto border-l border-brand-border">
              <div className="flex items-center justify-between pb-4 border-b border-brand-border mb-4">
                <span className="font-heading font-bold text-base text-brand-forest">What Are You Looking For?</span>
                <button
                  type="button"
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="p-1 rounded-lg hover:bg-brand-ivory text-brand-muted"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <ProductFilters
                filters={filters}
                onFilterChange={setFilters}
                onResetFilters={handleResetFilters}
                isMobile={true}
                onCloseMobile={() => setIsMobileFiltersOpen(false)}
                totalFilteredCount={filteredProducts.length}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
