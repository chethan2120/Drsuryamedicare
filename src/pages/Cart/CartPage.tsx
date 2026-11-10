import React, { useState } from 'react';
import { blankProfile, loadProfile, recordOrder, saveProfile } from '../../utils/customerStore';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { formatINR, isValidIndianMobile, isValidIndianPinCode, generateWhatsAppOrderUrl } from '../../utils/formatters';
import { storeConfig } from '../../config/storeConfig';
import { CustomerOrderDetails } from '../../types';
import confetti from 'canvas-confetti';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  MessageCircle,
  Truck,
  ShieldCheck,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Building2,
  FileText,
} from 'lucide-react';

export const CartPage: React.FC = () => {
  const {
    items,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    shippingFee,
    orderTotal,
    totalItemsCount,
  } = useCart();

  const navigate = useNavigate();

  // Customer Checkout Form details
  const [customer, setCustomer] = useState<CustomerOrderDetails>(() => loadProfile() ?? blankProfile());
  const [saveDetails, setSaveDetails] = useState(true);

  const [formErrors, setFormErrors] = useState<{
    customerName?: string;
    phone?: string;
    pincode?: string;
    deliveryAddress?: string;
  }>({});

  const [isOrderGenerated, setIsOrderGenerated] = useState(false);

  const validateForm = () => {
    const errors: typeof formErrors = {};
    if (!customer.customerName.trim()) {
      errors.customerName = 'Customer or Contact Person name is required';
    }
    if (!isValidIndianMobile(customer.phone)) {
      errors.phone = 'Please enter a valid 10-digit Indian mobile number';
    }
    if (!isValidIndianPinCode(customer.pincode)) {
      errors.pincode = 'Please enter a valid 6-digit Indian PIN code';
    }
    if (!customer.deliveryAddress.trim() || customer.deliveryAddress.trim().length < 8) {
      errors.deliveryAddress = 'Complete delivery street address is required';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleProceedToWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    // Trigger delightful celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#046A38', '#F9EBD7', '#E34222'],
      });
    } catch {
      // safe fallback
    }

    if (saveDetails) saveProfile(customer);
    recordOrder({
      id: `DSM-${Date.now().toString(36).toUpperCase()}`,
      placedAt: new Date().toISOString(),
      items: items.map((item) => ({
        id: item.product.id,
        name: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
      })),
      subtotal,
      shippingFee,
      orderTotal,
      customer,
      status: 'Sent on WhatsApp',
    });

    const whatsappUrl = generateWhatsAppOrderUrl(
      items,
      customer,
      subtotal,
      shippingFee,
      orderTotal
    );

    setIsOrderGenerated(true);
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    clearCart('Order sent on WhatsApp. Your cart is clear.');
  };

  if (items.length === 0) {
    return (
      <div className="bg-brand-warmWhite min-h-screen py-16">
        <div className="max-w-xl mx-auto px-4 text-center space-y-6">
          <div className="w-20 h-20 rounded-3xl bg-brand-ivory flex items-center justify-center text-brand-emerald mx-auto border border-brand-border">
            <ShoppingBag className="w-10 h-10 text-brand-emerald/40" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-brand-forest">
              Your Shopping Cart is Empty
            </h1>
            <p className="text-sm text-brand-muted mt-2">
              Browse our medical catalogue to add clinical diagnostic tools, surgical instruments, and consumables.
            </p>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-brand-emerald text-white text-sm font-bold shadow hover:bg-brand-emeraldLight transition-colors"
          >
            <span>Explore Medical Catalogue</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-brand-warmWhite min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-brand-forest">
              Shopping Cart & Order Verification
            </h1>
            <p className="text-xs sm:text-sm text-brand-muted mt-0.5">
              Review your items and proceed with direct WhatsApp submission to Dr Surya Medicare sales desk.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => clearCart()}
              className="text-xs font-semibold text-brand-muted hover:text-brand-vermilion flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear Cart</span>
            </button>
            <Link
              to="/shop"
              className="text-xs font-bold text-brand-emerald hover:underline flex items-center gap-1"
            >
              <span>Continue Browsing</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 2-Column Layout: Left Cart Table, Right WhatsApp Customer Checkout Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Items List (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            
            <div className="bg-white rounded-3xl border border-brand-border/80 p-5 sm:p-6 shadow-card space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-brand-border text-xs font-bold text-brand-muted uppercase">
                <span>Products Selected ({totalItemsCount} items)</span>
                <span>Subtotal</span>
              </div>

              {items.map((item) => {
                const lineTotal = item.product.price * item.quantity;
                return (
                  <div
                    key={item.product.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-3.5 border-b border-brand-border/60 last:border-b-0"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-18 h-18 rounded-xl bg-brand-ivory/50 p-1 border border-brand-border/70 flex-shrink-0 overflow-hidden">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      </div>
                      <div className="min-w-0">
                        <Link
                          to={`/product/${item.product.id}`}
                          className="text-sm font-heading font-bold text-brand-forest hover:text-brand-emerald line-clamp-1"
                        >
                          {item.product.name}
                        </Link>
                        <div className="flex items-center gap-2 text-xs text-brand-muted mt-0.5">
                          <span className="font-mono">{item.product.sku}</span>
                          <span>•</span>
                          <span>{formatINR(item.product.price)} / {item.product.unit}</span>
                        </div>
                      </div>
                    </div>

                    {/* Quantity Controls & Line Total */}
                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                      <div className="flex items-center gap-1.5 bg-brand-ivory/70 rounded-xl p-1 border border-brand-border">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-6 h-6 rounded-lg bg-white hover:bg-brand-softGreen text-brand-forest flex items-center justify-center font-bold text-xs shadow-xs"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-brand-forest">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-6 h-6 rounded-lg bg-white hover:bg-brand-softGreen text-brand-forest flex items-center justify-center font-bold text-xs shadow-xs"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-sm font-bold text-brand-forest font-heading block">
                          {formatINR(lineTotal)}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-[11px] text-brand-vermilion hover:underline flex items-center gap-0.5 mt-0.5"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Indian Shopping Assurance Box */}
            <div className="bg-brand-ivory/60 rounded-2xl p-4 border border-brand-border/70 flex items-center gap-3.5 text-xs text-brand-forest">
              <ShieldCheck className="w-6 h-6 text-brand-emerald flex-shrink-0" />
              <div>
                <span className="font-bold block">100% Verified Indian Healthcare Procurement</span>
                <span>
                  Official GST tax invoice supplied with all hospital dispatches. Free shipping across India on orders over ₹2,499.
                </span>
              </div>
            </div>

          </div>

          {/* RIGHT: Customer Order Form & WhatsApp Button (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl border border-brand-border/80 p-5 sm:p-7 shadow-card space-y-5 sticky top-24">
              
              <div className="border-b border-brand-border pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-brand-emerald text-white flex items-center justify-center font-bold text-xs">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <h3 className="font-heading font-bold text-base text-brand-forest">
                    WhatsApp Order Submission
                  </h3>
                </div>
                <p className="text-xs text-brand-muted mt-1">
                  Provide your delivery details. An official formatted order will be transferred to our WhatsApp sales desk.
                </p>
              </div>

              {/* Order Calculations */}
              <div className="space-y-2 text-xs border-b border-brand-border pb-4">
                <div className="flex justify-between text-brand-muted">
                  <span>Subtotal ({totalItemsCount} items)</span>
                  <span className="font-semibold text-brand-forest">{formatINR(subtotal)}</span>
                </div>
                <div className="flex justify-between text-brand-muted">
                  <span>Estimated Freight / Shipping</span>
                  <span className="font-semibold text-brand-forest">
                    {shippingFee === 0 ? (
                      <span className="text-brand-emerald font-bold">FREE Delivery</span>
                    ) : (
                      formatINR(shippingFee)
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-brand-forest pt-2 border-t border-brand-border/60">
                  <span>Estimated Order Total</span>
                  <span className="text-lg text-brand-emerald font-heading font-extrabold">
                    {formatINR(orderTotal)}
                  </span>
                </div>
                <span className="text-[10px] text-brand-muted block">
                  * Final payable invoice including applicable GST tax brackets will be verified on WhatsApp.
                </span>
              </div>

              {/* Customer Checkout Form */}
              <form onSubmit={handleProceedToWhatsApp} className="space-y-3.5 text-xs">
                
                {/* Full Name */}
                <div>
                  <label className="font-bold text-brand-forest block mb-1">
                    Contact Person / Doctor Name <span className="text-brand-vermilion">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={customer.customerName}
                    onChange={(e) => setCustomer({ ...customer, customerName: e.target.value })}
                    placeholder="e.g. Dr. Rajesh Sharma"
                    className="w-full px-3 py-2 rounded-xl bg-brand-ivory/40 border border-brand-border outline-none focus:border-brand-emerald text-xs font-medium text-brand-forest"
                  />
                  {formErrors.customerName && (
                    <span className="text-[11px] text-brand-vermilion mt-0.5 block">{formErrors.customerName}</span>
                  )}
                </div>

                {/* Mobile & PIN Code in 2 columns */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-brand-forest block mb-1">
                      Indian Mobile <span className="text-brand-vermilion">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      value={customer.phone}
                      onChange={(e) => setCustomer({ ...customer, phone: e.target.value.replace(/[^0-9]/g, '') })}
                      placeholder="e.g. 9876543210"
                      className="w-full px-3 py-2 rounded-xl bg-brand-ivory/40 border border-brand-border outline-none focus:border-brand-emerald text-xs font-mono font-medium text-brand-forest"
                    />
                    {formErrors.phone && (
                      <span className="text-[10px] text-brand-vermilion mt-0.5 block">{formErrors.phone}</span>
                    )}
                  </div>

                  <div>
                    <label className="font-bold text-brand-forest block mb-1">
                      PIN Code <span className="text-brand-vermilion">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={customer.pincode}
                      onChange={(e) => setCustomer({ ...customer, pincode: e.target.value.replace(/[^0-9]/g, '') })}
                      placeholder="e.g. 560034"
                      className="w-full px-3 py-2 rounded-xl bg-brand-ivory/40 border border-brand-border outline-none focus:border-brand-emerald text-xs font-mono font-medium text-brand-forest"
                    />
                    {formErrors.pincode && (
                      <span className="text-[10px] text-brand-vermilion mt-0.5 block">{formErrors.pincode}</span>
                    )}
                  </div>
                </div>

                {/* Delivery Address */}
                <div>
                  <label className="font-bold text-brand-forest block mb-1">
                    Delivery Address <span className="text-brand-vermilion">*</span>
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={customer.deliveryAddress}
                    onChange={(e) => setCustomer({ ...customer, deliveryAddress: e.target.value })}
                    placeholder="Clinic/Hospital address, Street, City, State"
                    className="w-full px-3 py-2 rounded-xl bg-brand-ivory/40 border border-brand-border outline-none focus:border-brand-emerald text-xs font-medium text-brand-forest"
                  />
                  {formErrors.deliveryAddress && (
                    <span className="text-[11px] text-brand-vermilion mt-0.5 block">{formErrors.deliveryAddress}</span>
                  )}
                </div>

                {/* Optional Organisation & GST */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-medium text-brand-muted block mb-1">
                      Clinic / Hospital (Opt.)
                    </label>
                    <input
                      type="text"
                      value={customer.institutionName}
                      onChange={(e) => setCustomer({ ...customer, institutionName: e.target.value })}
                      placeholder="e.g. Apollo Clinic"
                      className="w-full px-3 py-2 rounded-xl bg-brand-ivory/30 border border-brand-border outline-none focus:border-brand-emerald text-xs font-medium text-brand-forest"
                    />
                  </div>

                  <div>
                    <label className="font-medium text-brand-muted block mb-1">
                      GSTIN (Optional)
                    </label>
                    <input
                      type="text"
                      value={customer.gstNumber}
                      onChange={(e) => setCustomer({ ...customer, gstNumber: e.target.value.toUpperCase() })}
                      placeholder="29ABCDE1234F1Z5"
                      className="w-full px-3 py-2 rounded-xl bg-brand-ivory/30 border border-brand-border outline-none focus:border-brand-emerald text-xs font-mono font-medium text-brand-forest"
                    />
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="font-medium text-brand-muted block mb-1">
                    Special Delivery Instructions
                  </label>
                  <input
                    type="text"
                    value={customer.notes}
                    onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
                    placeholder="e.g. Deliver to 2nd Floor OT Reception"
                    className="w-full px-3 py-2 rounded-xl bg-brand-ivory/30 border border-brand-border outline-none focus:border-brand-emerald text-xs font-medium text-brand-forest"
                  />
                </div>

                <label className="flex items-start gap-2 text-xs text-brand-forest">
                  <input
                    type="checkbox"
                    checked={saveDetails}
                    onChange={(e) => setSaveDetails(e.target.checked)}
                    className="mt-0.5"
                  />
                  <span>Save this name, number, and address as the default for the next order.</span>
                </label>

                {/* Submit to WhatsApp Button */}
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl bg-brand-emerald hover:bg-brand-emeraldLight text-white font-bold text-sm shadow-md transition-all duration-200 flex items-center justify-center gap-2 transform active:scale-98"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Proceed to WhatsApp Order</span>
                </button>

                {/* Order Confirmation Disclaimer notice as mandated in Section 12 */}
                <div className="p-3 rounded-xl bg-brand-ivory/70 border border-brand-border/80 text-[11px] text-brand-muted leading-relaxed">
                  <span className="font-bold text-brand-forest block mb-0.5">Note on Confirmation:</span>
                  Submitting to WhatsApp initiates our live quotation review. Your order is officially confirmed once our business desk verifies inventory and acknowledges delivery schedules.
                </div>

              </form>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
