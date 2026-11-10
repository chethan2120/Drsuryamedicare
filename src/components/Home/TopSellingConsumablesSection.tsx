import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../../data/products';
import { formatINR } from '../../utils/formatters';
import { useCart } from '../../context/CartContext';
import { ArrowRight, Star, ShoppingBag, CheckCircle2, Check } from 'lucide-react';

interface ConsumableItem {
  id: string;
  name: string;
  brand: string;
  image: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  rating: number;
  unit: string;
}

const topConsumablesData: ConsumableItem[] = [
  {
    id: 'dsm-gloves-01',
    name: 'SuryaSafe Nitrile Examination Powder-Free Gloves',
    brand: 'SuryaSafe',
    image: '/products/gloves-nitrile.svg',
    price: 258,
    originalPrice: 2500,
    discountPercent: 90,
    rating: 4.7,
    unit: 'Box of 100',
  },
  {
    id: 'dsm-gloves-02',
    name: 'SuryaSafe Latex Examination Gloves with High Tactility',
    brand: 'SuryaSafe',
    image: '/products/gloves-latex.svg',
    price: 254,
    originalPrice: 2500,
    discountPercent: 90,
    rating: 4.2,
    unit: 'Box of 100',
  },
  {
    id: 'dsm-iv-02',
    name: 'SuryaFlow IV Set Nonvented With Latex Tube',
    brand: 'SuryaFlow',
    image: '/products/iv-set-nonvented.svg',
    price: 355,
    originalPrice: 9000,
    discountPercent: 96,
    rating: 4.4,
    unit: 'Pack of 25',
  },
  {
    id: 'dsm-iv-01',
    name: 'SuryaFlow IV Set Vented With Latex Tube & Fluid Filter',
    brand: 'SuryaFlow',
    image: '/products/iv-set-vented.svg',
    price: 382,
    originalPrice: 8438,
    discountPercent: 95,
    rating: 4.3,
    unit: 'Pack of 25',
  },
  {
    id: 'dsm-cannula-01',
    name: 'SuryaCath IV Cannula With Wings and Injection Port',
    brand: 'SuryaCath',
    image: '/products/iv-cannula.svg',
    price: 618,
    originalPrice: 21000,
    discountPercent: 97,
    rating: 4.8,
    unit: 'Box of 50',
  },
  {
    id: 'dsm-mask-01',
    name: 'SuryaShield 3-Ply Ultrasonic Meltblown Surgical Face Masks',
    brand: 'SuryaShield',
    image: '/products/mask-3ply.svg',
    price: 199,
    originalPrice: 499,
    discountPercent: 60,
    rating: 4.8,
    unit: 'Pack of 50',
  },
  {
    id: 'dsm-syring-01',
    name: 'SuryaInject 5ml Auto-Disable Sterile Single-Use Syringes',
    brand: 'SuryaInject',
    image: '/products/syringe-5ml.svg',
    price: 340,
    originalPrice: 800,
    discountPercent: 58,
    rating: 4.6,
    unit: 'Box of 100',
  },
];

export const TopSellingConsumablesSection: React.FC = () => {
  const { addToCart } = useCart();
  const [addedItemId, setAddedItemId] = useState<string | null>(null);

  const handleQuickAdd = (item: ConsumableItem) => {
    const matched = products.find((p) => p.id === item.id) || products[0];
    addToCart(matched, 1);
    setAddedItemId(item.id);
    setTimeout(() => {
      setAddedItemId(null);
    }, 1800);
  };

  return (
    <section className="py-12 sm:py-16 bg-white border-b border-brand-border/60">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Section Header with View All Link (Exactly as in Medikabazaar screenshot) */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-heading font-extrabold text-brand-forest">
              Top Selling Consumables
            </h2>
            <p className="text-xs text-brand-muted mt-0.5">
              High-velocity surgical gloves, infusion sets, and clinical disposables.
            </p>
          </div>

          <Link
            to="/shop?category=medical-consumables"
            className="text-xs sm:text-sm font-bold text-brand-emerald hover:underline flex items-center gap-1 group"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Consumables Horizontal Scroll / Grid (Exactly matching image 4) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
          {topConsumablesData.map((item) => (
            <div
              key={item.id}
              className="bg-brand-warmWhite/40 hover:bg-white rounded-2xl border border-brand-border/80 hover:border-brand-emerald/40 hover:shadow-card transition-all duration-200 p-3 flex flex-col justify-between group"
            >
              <div>
                {/* Product Thumbnail */}
                <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-brand-ivory/50 mb-2.5 flex items-center justify-center p-2">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                    onError={(e) => {
                      e.currentTarget.src = '/products/gloves-nitrile.svg';
                    }}
                  />
                  {item.discountPercent > 0 && (
                    <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-brand-vermilion text-white text-[9px] font-bold">
                      -{item.discountPercent}%
                    </span>
                  )}
                </div>

                {/* Rating & Brand */}
                <div className="flex items-center gap-1 text-[10px] text-brand-muted mb-1">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-brand-forest">({item.rating})</span>
                  <span>•</span>
                  <span className="truncate">{item.brand}</span>
                </div>

                {/* Name */}
                <h4 className="text-xs font-heading font-bold text-brand-forest line-clamp-2 leading-snug">
                  {item.name}
                </h4>
              </div>

              {/* Price & Add Button */}
              <div className="pt-2 mt-2 border-t border-brand-border/60">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-sm font-extrabold text-brand-forest font-heading">
                    {formatINR(item.price)}
                  </span>
                  <span className="text-[10px] text-brand-muted line-through">
                    {formatINR(item.originalPrice)}
                  </span>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => handleQuickAdd(item)}
                    className={`w-full py-1.5 px-2 rounded-xl text-xs font-bold transition-all shadow-2xs flex items-center justify-center gap-1.5 active:scale-95 ${
                      addedItemId === item.id
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-white hover:bg-brand-emerald hover:text-white text-brand-emerald border border-brand-emerald/40'
                    }`}
                  >
                    {addedItemId === item.id ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Added!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3 h-3" />
                        <span>Add</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};