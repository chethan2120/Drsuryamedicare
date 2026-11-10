import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { formatINR } from '../../utils/formatters';
import { storeConfig } from '../../config/storeConfig';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, MessageCircle, Truck } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    items,
    removeFromCart,
    updateQuantity,
    subtotal,
    shippingFee,
    orderTotal,
    totalItemsCount,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
  } = useCart();

  const navigate = useNavigate();

  if (!isCartDrawerOpen) return null;

  const handleCheckout = () => {
    setIsCartDrawerOpen(false);
    navigate('/cart');
  };

  const handleBrowse = () => {
    setIsCartDrawerOpen(false);
    navigate('/shop');
  };

  const freeShippingRemaining = Math.max(0, storeConfig.shipping.freeThreshold - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / storeConfig.shipping.freeThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-brand-forest/40 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-brand-warmWhite shadow-modal flex flex-col border-l border-brand-border animate-slide-left">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-brand-border bg-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-brand-softGreen text-brand-emerald flex items-center justify-center font-bold">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-brand-forest text-base">Your Shopping Cart</h3>
                <span className="text-xs text-brand-muted">{totalItemsCount} item{totalItemsCount !== 1 ? 's' : ''}</span>
              </div>
            </div>

            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-1.5 rounded-lg hover:bg-brand-ivory text-brand-muted hover:text-brand-forest transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Meter */}
          <div className="px-5 py-3 bg-brand-ivory/60 border-b border-brand-border/60">
            <div className="flex items-center justify-between text-xs font-medium text-brand-forest mb-1.5">
              <span className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-brand-emerald" />
                {freeShippingRemaining > 0 ? (
                  <>Add <span className="font-bold text-brand-emerald">{formatINR(freeShippingRemaining)}</span> for FREE Delivery</>
                ) : (
                  <span className="font-bold text-brand-emerald">You unlocked FREE Delivery!</span>
                )}
              </span>
              <span className="font-bold text-brand-emerald">{Math.round(freeShippingProgress)}%</span>
            </div>
            <div className="w-full h-1.5 bg-brand-border rounded-full overflow-hidden">
              <div
                className="h-full bg-brand-emerald rounded-full transition-all duration-300"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {items.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-brand-ivory flex items-center justify-center text-brand-muted mx-auto border border-brand-border">
                  <ShoppingBag className="w-8 h-8 text-brand-emerald/40" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-brand-forest text-base">Your cart is empty</h4>
                  <p className="text-xs text-brand-muted mt-1 max-w-xs mx-auto">
                    Explore our medical equipment, surgical supplies, and clinical consumables.
                  </p>
                </div>
                <button
                  onClick={handleBrowse}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-emerald text-white text-xs font-semibold shadow hover:bg-brand-emeraldLight transition-colors"
                >
                  <span>Explore Medical Catalogue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-3.5 p-3 rounded-xl bg-white border border-brand-border/80 shadow-xs relative group"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-20 rounded-lg bg-brand-ivory/50 p-1 flex-shrink-0 border border-brand-border/60 overflow-hidden">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="h-full w-full rounded object-contain"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-semibold text-brand-forest line-clamp-2 leading-tight">
                      {item.product.name}
                    </h4>
                    <div className="text-[11px] font-mono text-brand-muted mt-0.5">
                      SKU: {item.product.sku}
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs font-bold text-brand-emerald">
                        {formatINR(item.product.price)}
                      </span>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-1.5 bg-brand-ivory/70 rounded-lg p-0.5 border border-brand-border">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-5 h-5 rounded flex items-center justify-center bg-white hover:bg-brand-softGreen text-brand-forest text-xs font-bold shadow-xs transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold w-5 text-center text-brand-forest">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-5 h-5 rounded flex items-center justify-center bg-white hover:bg-brand-softGreen text-brand-forest text-xs font-bold shadow-xs transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-brand-muted hover:text-brand-vermilion p-1 transition-colors self-start"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer Calculations & WhatsApp Order CTA */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 bg-white border-t border-brand-border space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-brand-muted">
                  <span>Subtotal ({totalItemsCount} items)</span>
                  <span className="font-semibold text-brand-forest">{formatINR(subtotal)}</span>
                </div>
                <div className="flex justify-between text-brand-muted">
                  <span>Estimated Delivery</span>
                  <span className="font-semibold text-brand-forest">
                    {shippingFee === 0 ? <span className="text-brand-emerald font-bold">FREE</span> : formatINR(shippingFee)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-brand-forest pt-1.5 border-t border-brand-border/60">
                  <span>Estimated Total</span>
                  <span className="text-base text-brand-emerald font-bold">{formatINR(orderTotal)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <button
                  type="button"
                  onClick={handleCheckout}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-brand-emerald hover:bg-brand-emeraldLight text-white font-semibold text-sm shadow transition-all duration-200"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Proceed to WhatsApp Checkout</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    navigate('/cart');
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-brand-ivory hover:bg-brand-border text-brand-forest font-medium text-xs border border-brand-border transition-colors text-center"
                >
                  View Detailed Cart & Estimates
                </button>
              </div>

              <div className="text-center text-[10px] text-brand-muted">
                Official WhatsApp ordering • Pan-India priority dispatch
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
