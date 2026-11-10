import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { formatINR } from '../../utils/formatters';
import { Heart, ShoppingBag, Trash2, ArrowRight, CheckCircle2, RotateCcw } from 'lucide-react';

export const WishlistPage: React.FC = () => {
  const { wishlist, removeFromWishlist, clearWishlist, wishlistCount } = useWishlist();
  const { addToCart, setIsCartDrawerOpen } = useCart();

  const handleMoveToCart = (product: any) => {
    addToCart(product, 1);
    removeFromWishlist(product.id);
    setIsCartDrawerOpen(true);
  };

  if (wishlistCount === 0) {
    return (
      <div className="bg-brand-warmWhite min-h-screen py-16">
        <div className="max-w-md mx-auto px-4 text-center space-y-6">
          <div className="w-20 h-20 rounded-3xl bg-brand-ivory flex items-center justify-center text-brand-muted mx-auto border border-brand-border">
            <Heart className="w-10 h-10 text-brand-vermilion/30" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-brand-forest">
              Your Wishlist is Empty
            </h1>
            <p className="text-xs sm:text-sm text-brand-muted mt-2">
              Save medical equipment, surgical supplies, and consumables here to easily review and compare later.
            </p>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-brand-emerald text-white text-xs sm:text-sm font-bold shadow hover:bg-brand-emeraldLight transition-colors"
          >
            <span>Browse Medical Catalogue</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-brand-warmWhite min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-brand-forest">
              Saved Medical Supplies ({wishlistCount})
            </h1>
            <p className="text-xs sm:text-sm text-brand-muted mt-0.5">
              Review and move saved items directly to your shopping cart for quotation.
            </p>
          </div>

          <button
            type="button"
            onClick={clearWishlist}
            className="text-xs font-semibold text-brand-muted hover:text-brand-vermilion flex items-center gap-1.5 self-start sm:self-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear Wishlist</span>
          </button>
        </div>

        {/* Wishlist Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-brand-border/80 p-4 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-brand-ivory/40 p-2 mb-3">
                  <Link to={`/product/${product.id}`}>
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover rounded-lg hover:scale-105 transition-transform"
                    />
                  </Link>
                  <button
                    type="button"
                    onClick={() => removeFromWishlist(product.id)}
                    className="absolute top-3 right-3 p-1.5 rounded-full bg-white/90 text-brand-muted hover:text-brand-vermilion shadow-xs"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-[10px] font-bold text-brand-emerald uppercase tracking-wider">
                  {product.categoryName}
                </div>
                <Link
                  to={`/product/${product.id}`}
                  className="font-heading font-bold text-sm text-brand-forest hover:text-brand-emerald line-clamp-2 mt-1 leading-snug"
                >
                  {product.name}
                </Link>

                <div className="flex items-center gap-2 text-xs text-brand-muted mt-1">
                  <span className="font-mono">{product.sku}</span>
                  <span>•</span>
                  <span>{product.brand}</span>
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-brand-border/60 space-y-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-base font-extrabold text-brand-forest font-heading">
                    {formatINR(product.price)}
                  </span>
                  <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium">
                    In Stock
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleMoveToCart(product)}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-brand-emerald hover:bg-brand-emeraldLight text-white text-xs font-bold shadow-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Move to Cart</span>
                  </button>
                  <Link
                    to={`/product/${product.id}`}
                    className="py-2.5 px-3 rounded-xl bg-brand-ivory hover:bg-brand-border text-brand-forest text-xs font-semibold border border-brand-border"
                  >
                    Details
                  </Link>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
