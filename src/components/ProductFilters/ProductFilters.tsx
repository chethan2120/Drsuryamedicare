import React from 'react';
import { FilterState, ProductType, CategoryId } from '../../types';
import { products } from '../../data/products';
import type { LucideIcon } from 'lucide-react';
import {
  RotateCcw,
  Filter,
  Check,
  Pill,
  Activity,
  Scissors,
  Package,
  ShieldCheck,
  Wind,
  Monitor,
  HeartPulse,
  Building2,
  Microscope,
  BriefcaseMedical,
} from 'lucide-react';

interface ProductFiltersProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  onResetFilters: () => void;
  isMobile?: boolean;
  onCloseMobile?: () => void;
  totalFilteredCount: number;
}

interface HumanCategoryOption {
  id: string;
  label: string;
  icon: LucideIcon;
  description: string;
  productType?: ProductType;
  categoryId?: CategoryId;
}

export const HUMAN_LOOKING_FOR_OPTIONS: HumanCategoryOption[] = [
  {
    id: 'tablets-daily-health',
    label: 'Tablets & Daily Medicine',
    icon: Pill,
    description: 'Fever (Dolo), Antacids, Multivitamins, Allergy & ORS',
    productType: 'Tablets & Daily Health',
    categoryId: 'tablets-daily-health',
  },
  {
    id: 'diagnostic-equipment',
    label: 'Medical Diagnostic Devices',
    icon: Activity,
    description: 'Digital BP Monitors, Pulse Oximeters, Thermometers',
    productType: 'Medical Equipment',
    categoryId: 'diagnostic-equipment',
  },
  {
    id: 'surgical-instruments',
    label: 'Surgical Instruments & Sets',
    icon: Scissors,
    description: 'Minor OT Sets, Scalpel Blades, Needle Holders',
    productType: 'Instruments',
    categoryId: 'surgical-instruments',
  },
  {
    id: 'medical-consumables',
    label: 'Clinical Consumables & Dressing',
    icon: Package,
    description: 'Sterile Syringes, IV Drip Sets, Cotton Rolls, Gauze',
    productType: 'Consumables',
    categoryId: 'medical-consumables',
  },
  {
    id: 'ppe',
    label: 'Nitrile Gloves & Face Masks',
    icon: ShieldCheck,
    description: 'Medical Exam Gloves, 3-Ply Surgical Masks, OT Gowns',
    productType: 'Consumables',
    categoryId: 'ppe',
  },
  {
    id: 'respiratory-care',
    label: 'Respiratory & Oxygen Support',
    icon: Wind,
    description: '10L Oxygen Concentrators, Nebulizers, Nasal Cannulas',
    productType: 'Medical Equipment',
    categoryId: 'respiratory-care',
  },
  {
    id: 'monitoring-devices',
    label: 'Patient Monitors & ECG',
    icon: Monitor,
    description: 'ICU Bedside Multipara Monitors, 12-Lead ECG Machines',
    productType: 'Medical Equipment',
    categoryId: 'monitoring-devices',
  },
  {
    id: 'patient-care',
    label: 'Patient Care & Bedsore Support',
    icon: HeartPulse,
    description: 'Alternating Air Mattresses, Suction Machines, Bath Wipes',
    productType: 'Medical Equipment',
    categoryId: 'patient-care',
  },
  {
    id: 'hospital-furniture',
    label: 'Hospital Beds & Ward Furniture',
    icon: Building2,
    description: 'Semi-Fowler ICU Beds, Stainless IV Stands, Doctor Stools',
    productType: 'Medical Equipment',
    categoryId: 'hospital-furniture',
  },
  {
    id: 'laboratory-equipment',
    label: 'Laboratory Diagnostics',
    icon: Microscope,
    description: 'Clinical Microscopes, Centrifuges, Micropipettes',
    productType: 'Medical Equipment',
    categoryId: 'laboratory-equipment',
  },
  {
    id: 'first-aid',
    label: 'First Aid & Trauma Kits',
    icon: BriefcaseMedical,
    description: 'Trauma Bags, Ambu Resuscitators, Splints & Bandages',
    productType: 'Accessories',
    categoryId: 'first-aid',
  },
];

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  isMobile,
  onCloseMobile,
  totalFilteredCount,
}) => {
  const toggleOption = (opt: HumanCategoryOption) => {
    let updatedCats = [...filters.categories];
    let updatedTypes = [...filters.productTypes];

    if (opt.categoryId) {
      if (updatedCats.includes(opt.categoryId)) {
        updatedCats = updatedCats.filter((c) => c !== opt.categoryId);
      } else {
        updatedCats.push(opt.categoryId);
      }
    }

    if (opt.productType && !opt.categoryId) {
      if (updatedTypes.includes(opt.productType)) {
        updatedTypes = updatedTypes.filter((t) => t !== opt.productType);
      } else {
        updatedTypes.push(opt.productType);
      }
    }

    onFilterChange({
      ...filters,
      categories: updatedCats,
      productTypes: updatedTypes,
    });
  };

  const isSelected = (opt: HumanCategoryOption) => {
    if (opt.categoryId) {
      return filters.categories.includes(opt.categoryId);
    }
    if (opt.productType) {
      return filters.productTypes.includes(opt.productType);
    }
    return false;
  };

  const getOptionCount = (opt: HumanCategoryOption) => {
    if (opt.categoryId) {
      return products.filter((p) => p.category === opt.categoryId).length;
    }
    if (opt.productType) {
      return products.filter((p) => p.productType === opt.productType).length;
    }
    return 0;
  };

  return (
    <div className="space-y-4">
      {/* Header bar */}
      <div className="flex items-center justify-between pb-3 border-b border-brand-border">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-brand-emerald" />
          <h3 className="font-heading font-extrabold text-base text-brand-forest">
            What Are You Looking For?
          </h3>
        </div>
        {(filters.categories.length > 0 || filters.productTypes.length > 0 || filters.searchQuery) && (
          <button
            type="button"
            onClick={onResetFilters}
            className="text-xs font-semibold text-brand-vermilion hover:underline flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      <p className="text-[11px] text-brand-muted leading-tight">
        Select any clinical category or supply type to filter the catalogue:
      </p>

      {/* Only "What Are You Looking For?" Options */}
      <div className="space-y-2">
        {HUMAN_LOOKING_FOR_OPTIONS.map((opt) => {
          const selected = isSelected(opt);
          const count = getOptionCount(opt);
          const Icon = opt.icon;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => toggleOption(opt)}
              className={`w-full text-left p-2.5 rounded-2xl border transition-all flex items-start justify-between gap-3 select-none ${
                selected
                  ? 'border-brand-emerald bg-brand-softGreen text-brand-forest shadow-xs'
                  : 'border-brand-border/70 hover:border-brand-emerald/40 hover:bg-brand-ivory/40 text-brand-body'
              }`}
            >
              <div className="flex items-start gap-2.5 min-w-0">
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${selected ? 'bg-brand-emerald text-white' : 'bg-brand-softGreen text-brand-emerald'}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className={`text-xs leading-snug line-clamp-1 ${selected ? 'font-bold text-brand-emerald' : 'font-semibold text-brand-forest'}`}>
                    {opt.label}
                  </div>
                  <div className="text-[10px] text-brand-muted line-clamp-1 mt-0.5 font-normal">
                    {opt.description}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 flex-shrink-0 mt-0.5">
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold ${selected ? 'bg-brand-emerald text-white' : 'bg-brand-ivory text-brand-muted'}`}>
                  {count}
                </span>
                {selected && (
                  <Check className="w-3.5 h-3.5 text-brand-emerald flex-shrink-0" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      <div className="space-y-2 border-t border-brand-border pt-4">
        <h4 className="text-xs font-bold uppercase tracking-wide text-brand-navy">Brand</h4>
        <div className="max-h-40 space-y-1 overflow-y-auto pr-1">
          {Array.from(new Set(products.map((product) => product.brand)))
            .sort()
            .map((brand) => {
              const selected = filters.brands.includes(brand);
              return (
                <label key={brand} className="flex cursor-pointer items-center gap-2 text-xs text-brand-body">
                  <input
                    type="checkbox"
                    checked={selected}
                    onChange={() =>
                      onFilterChange({
                        ...filters,
                        brands: selected ? filters.brands.filter((item) => item !== brand) : [...filters.brands, brand],
                      })
                    }
                  />
                  {brand}
                </label>
              );
            })}
        </div>
      </div>

      <div className="space-y-2 border-t border-brand-border pt-4">
        <h4 className="text-xs font-bold uppercase tracking-wide text-brand-navy">Price</h4>
        {(
          [
            ['all', 'Any price'],
            ['under-500', 'Under ₹500'],
            ['500-2000', '₹500 – ₹2,000'],
            ['2000-10000', '₹2,000 – ₹10,000'],
            ['above-10000', 'Above ₹10,000'],
          ] as const
        ).map(([value, label]) => (
          <label key={value} className="flex cursor-pointer items-center gap-2 text-xs text-brand-body">
            <input
              type="radio"
              name="price-range"
              checked={filters.priceRange === value}
              onChange={() => onFilterChange({ ...filters, priceRange: value })}
            />
            {label}
          </label>
        ))}
      </div>

      <label className="flex cursor-pointer items-center gap-2 border-t border-brand-border pt-4 text-xs font-semibold text-brand-navy">
        <input
          type="checkbox"
          checked={filters.inStockOnly}
          onChange={() => onFilterChange({ ...filters, inStockOnly: !filters.inStockOnly })}
        />
        Available to order
      </label>

      {isMobile && (
        <div className="pt-4 border-t border-brand-border">
          <button
            type="button"
            onClick={onCloseMobile}
            className="w-full py-3.5 rounded-xl bg-brand-emerald text-white text-xs font-bold shadow-md active:scale-98 transition-all"
          >
            Show {totalFilteredCount} Products
          </button>
        </div>
      )}
    </div>
  );
};