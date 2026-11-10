import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { products } from '../../data/products';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useRecentlyViewed } from '../../context/RecentlyViewedContext';
import { formatINR, isValidIndianPinCode, getPincodeDeliveryInfo, generateWhatsAppOrderUrl } from '../../utils/formatters';
import { storeConfig } from '../../config/storeConfig';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import {
  Heart,
  ShoppingBag,
  MessageCircle,
  ShieldCheck,
  Truck,
  CheckCircle2,
  AlertCircle,
  Star,
  Plus,
  Minus,
  MapPin,
  Share2,
  ChevronRight,
  Info,
  Package,
  Layers,
  HelpCircle,
  Maximize2,
} from 'lucide-react';

const FALLBACK_IMAGE_DATA_URI =
  "data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3e%3crect width='400' height='400' fill='%23F9EBD7'/%3e%3ccircle cx='200' cy='200' r='90' fill='%23046A38' opacity='0.15'/%3e%3cpath d='M175 120h50v160h-50zM120 175h160v50H120z' fill='%23046A38'/%3e%3ctext x='50%25' y='330' font-family='sans-serif' font-size='16' font-weight='bold' fill='%23046A38' text-anchor='middle'%3eDR SURYA MEDICARE%3c/text%3e%3c/svg%3e";

export const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();

  const product = products.find((p) => p.id === productId) || products[0];

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'overview' | 'description' | 'specifications' | 'packaging' | 'faqs'>('overview');
  const [pincodeInput, setPincodeInput] = useState('');
  const [pincodeResult, setPincodeResult] = useState<ReturnType<typeof getPincodeDeliveryInfo> | null>(null);
  const [isZoomModalOpen, setIsZoomModalOpen] = useState(false);

  const { addToCart, setIsCartDrawerOpen } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addRecentlyViewed, recentlyViewed } = useRecentlyViewed();

  // Scroll to top and track recently viewed on product change
  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedImageIndex(0);
    setQuantity(1);
    if (product) {
      addRecentlyViewed(product);
    }
  }, [productId]);

  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsCartDrawerOpen(true);
  };

  const handleDirectWhatsAppOrder = () => {
    // Generate direct WhatsApp link for this single product
    const mockCustomer = {
      customerName: 'Healthcare Enquirer',
      phone: '',
      pincode: pincodeInput || storeConfig.address.pincode,
      deliveryAddress: 'Direct product enquiry',
    };
    const lineTotal = product.price * quantity;
    const url = generateWhatsAppOrderUrl(
      [{ product, quantity }],
      mockCustomer,
      lineTotal,
      0,
      lineTotal
    );
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValidIndianPinCode(pincodeInput)) {
      setPincodeResult(getPincodeDeliveryInfo(pincodeInput));
    } else {
      setPincodeResult({ deliverable: false });
    }
  };

  // Related products from catalogue data
  const relatedProducts = products
    .filter((p) => product.relatedProductIds.includes(p.id) && p.id !== product.id)
    .slice(0, 4);

  const frequentlyBought = products
    .filter((p) => product.frequentlyBoughtTogetherIds?.includes(p.id))
    .slice(0, 2);

  const similarProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="bg-brand-warmWhite min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-1.5 text-xs text-brand-muted mb-6 flex-wrap">
          <Link to="/" className="hover:text-brand-emerald">Home</Link>
          <ChevronRight className="w-3 h-3 text-brand-muted/60" />
          <Link to="/shop" className="hover:text-brand-emerald">Catalogue</Link>
          <ChevronRight className="w-3 h-3 text-brand-muted/60" />
          <Link to={`/shop?category=${product.category}`} className="hover:text-brand-emerald text-brand-emerald font-medium">
            {product.categoryName}
          </Link>
          <ChevronRight className="w-3 h-3 text-brand-muted/60" />
          <span className="text-brand-forest font-semibold line-clamp-1">{product.name}</span>
        </nav>

        {/* Top Product Section: Left Gallery, Right Buy Box */}
        <div className="bg-white rounded-3xl border border-brand-border/80 p-5 sm:p-8 shadow-card mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* LEFT: Product Image Gallery */}
            <div className="lg:col-span-6 space-y-4">
              {/* Main Viewport */}
              <div className="relative aspect-square w-full rounded-2xl bg-brand-ivory/40 p-4 border border-brand-border/70 overflow-hidden flex items-center justify-center group">
                <img
                  src={product.images[selectedImageIndex]}
                  alt={`${product.name} view ${selectedImageIndex + 1}`}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = FALLBACK_IMAGE_DATA_URI;
                  }}
                  className="w-full h-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-105 cursor-zoom-in"
                  onClick={() => setIsZoomModalOpen(true)}
                />

                {/* Vermilion Discount Badge */}
                {product.discountPercent && (
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-md bg-brand-vermilion text-white text-xs font-bold shadow-xs">
                    {product.discountPercent}% OFF
                  </div>
                )}

                {/* Fullscreen Magnifier Trigger */}
                <button
                  type="button"
                  onClick={() => setIsZoomModalOpen(true)}
                  className="absolute bottom-4 right-4 p-2 rounded-xl bg-white/90 hover:bg-white text-brand-forest shadow-xs opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Expand image view"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>

              {/* Thumbnails (3-4 different photographs) */}
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative aspect-square rounded-xl overflow-hidden bg-brand-ivory/50 p-1 border-2 transition-all ${
                      selectedImageIndex === idx
                        ? 'border-brand-emerald shadow-sm scale-98'
                        : 'border-brand-border/70 hover:border-brand-emerald/40'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = FALLBACK_IMAGE_DATA_URI;
                      }}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <span className="absolute bottom-1 right-1 text-[9px] font-bold bg-brand-forest/80 text-white px-1 rounded">
                      {idx === 0 ? 'Front' : idx === 1 ? 'Angle' : idx === 2 ? 'Detail' : 'Pack'}
                    </span>
                  </button>
                ))}
              </div>

              {/* Subtle quality notice */}
              <div className="text-[11px] text-brand-muted text-center flex items-center justify-center gap-1.5 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-emerald" />
                <span>Genuine product photography • Standard clinical packaging</span>
              </div>
            </div>

            {/* RIGHT: Product Buy Box & Details */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-5">
              
              <div className="space-y-3">
                {/* Category & SKU */}
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-brand-emerald uppercase tracking-wider text-[11px]">
                    {product.categoryName}
                  </span>
                  <span className="font-mono bg-brand-ivory px-2 py-0.5 rounded text-brand-muted text-xs">
                    SKU: {product.sku}
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-brand-forest leading-tight">
                  {product.name}
                </h1>

                {/* Rating & Brand */}
                <div className="flex flex-wrap items-center gap-4 text-xs pt-1">
                  <div className="flex items-center gap-1.5 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200/60">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="font-bold text-brand-forest">{product.rating}</span>
                    <span className="text-brand-muted text-[11px]">({product.reviewCount} clinical reviews)</span>
                  </div>

                  <span className="text-brand-muted">
                    Brand: <span className="font-bold text-brand-forest">{product.brand}</span>
                  </span>

                  <span className="text-brand-muted">
                    Unit: <span className="font-bold text-brand-forest">1 {product.unit}</span>
                  </span>
                </div>

                {/* Pricing in Indian Rupees */}
                <div className="pt-3 border-t border-brand-border/60">
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl sm:text-4xl font-heading font-extrabold text-brand-forest">
                      {formatINR(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-base text-brand-muted line-through">
                        {formatINR(product.originalPrice)}
                      </span>
                    )}
                    {product.discountPercent && (
                      <span className="text-xs font-bold text-brand-vermilion bg-brand-vermilion/10 px-2 py-0.5 rounded">
                        Save {product.discountPercent}%
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-brand-muted block mt-0.5">
                    Inclusive of all standard package contents • +{product.gstPercent}% GST applied at billing
                  </span>
                </div>

                {/* Short Description */}
                <p className="text-xs sm:text-sm text-brand-body/90 leading-relaxed pt-2">
                  {product.shortDescription}
                </p>

                {/* Stock Status */}
                <div className="pt-2">
                  {product.stockStatus === 'in_stock' ? (
                    <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200/60">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>In Stock — Ready for Same Day Dispatch ({product.stockCount} {product.unit}s available)</span>
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-700 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200/60">
                      <AlertCircle className="w-4 h-4 text-amber-600" />
                      <span>Limited Stock — Only {product.stockCount} {product.unit}s remaining</span>
                    </div>
                  )}
                </div>

                {/* Indian Delivery PIN Code Estimator */}
                <div className="pt-3 pb-1">
                  <form onSubmit={handleCheckPincode} className="bg-brand-ivory/50 p-3 rounded-2xl border border-brand-border/80">
                    <div className="flex items-center gap-2 mb-2 text-xs font-bold text-brand-forest">
                      <Truck className="w-4 h-4 text-brand-emerald" />
                      <span>Check Delivery Availability in India</span>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        maxLength={6}
                        value={pincodeInput}
                        onChange={(e) => setPincodeInput(e.target.value.replace(/[^0-9]/g, ''))}
                        placeholder="Enter 6-digit PIN Code (e.g. 560001)"
                        className="flex-1 px-3 py-2 text-xs rounded-xl bg-white border border-brand-border outline-none focus:border-brand-emerald font-mono font-medium"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl bg-brand-forest hover:bg-brand-emerald text-white text-xs font-bold transition-colors"
                      >
                        Check
                      </button>
                    </div>

                    {pincodeResult && (
                      <div className="mt-2 text-xs">
                        {pincodeResult.deliverable ? (
                          <div className="text-brand-emerald font-medium flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-brand-emerald flex-shrink-0" />
                            <span>
                              Delivery to <span className="font-bold">{pincodeResult.cityEstimate}</span>: Estimated in {pincodeResult.daysEstimate}. Free shipping over ₹2,499.
                            </span>
                          </div>
                        ) : (
                          <div className="text-brand-vermilion font-medium flex items-center gap-1.5">
                            <AlertCircle className="w-3.5 h-3.5 text-brand-vermilion flex-shrink-0" />
                            <span>Please enter a valid 6-digit Indian PIN code.</span>
                          </div>
                        )}
                      </div>
                    )}
                  </form>
                </div>

              </div>

              {/* Quantity & CTA Actions */}
              <div className="pt-4 border-t border-brand-border space-y-3">
                <div className="flex items-center gap-3">
                  
                  {/* Quantity Selector */}
                  <div className="flex items-center gap-2 bg-brand-ivory/70 rounded-xl p-1 border border-brand-border">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 rounded-lg bg-white hover:bg-brand-softGreen text-brand-forest flex items-center justify-center font-bold text-sm shadow-xs transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm font-bold text-brand-forest">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 rounded-lg bg-white hover:bg-brand-softGreen text-brand-forest flex items-center justify-center font-bold text-sm shadow-xs transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="flex-1 py-3 px-5 rounded-xl bg-brand-emerald hover:bg-brand-emeraldLight text-white font-bold text-xs sm:text-sm shadow-md transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add {quantity} to Cart ({formatINR(product.price * quantity)})</span>
                  </button>

                  {/* Wishlist Button */}
                  <button
                    type="button"
                    onClick={() => toggleWishlist(product)}
                    className={`p-3 rounded-xl border border-brand-border transition-colors ${
                      isFavorited ? 'bg-brand-vermilion text-white border-brand-vermilion' : 'bg-brand-ivory/60 hover:bg-brand-ivory text-brand-muted hover:text-brand-vermilion'
                    }`}
                    title={isFavorited ? 'In Wishlist' : 'Add to Wishlist'}
                  >
                    <Heart className={`w-5 h-5 ${isFavorited ? 'fill-white' : ''}`} />
                  </button>

                </div>

                {/* Direct WhatsApp Ordering Button */}
                <button
                  type="button"
                  onClick={handleDirectWhatsAppOrder}
                  className="w-full py-3 px-4 rounded-xl bg-white hover:bg-brand-softGreen text-brand-emerald border-2 border-brand-emerald font-bold text-xs sm:text-sm shadow-xs transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Order Directly on WhatsApp</span>
                </button>

                {/* Bulk Link shortcut */}
                <div className="text-center pt-1">
                  <Link
                    to={`/bulk-orders?prefill=${product.id}`}
                    className="text-xs text-brand-emerald font-semibold hover:underline"
                  >
                    Need more than 10 units? Request institutional bulk discount →
                  </Link>
                </div>

              </div>

            </div>

          </div>
        </div>

        {/* BELOW MAIN PRODUCT AREA: 5 Detailed Information Tabs */}
        <div className="bg-white rounded-3xl border border-brand-border/80 p-6 sm:p-8 shadow-card mb-16">
          
          {/* Tab Navigation Headers */}
          <div className="flex border-b border-brand-border overflow-x-auto gap-2 sm:gap-6 pb-2">
            {[
              { id: 'overview', label: 'Product Overview', icon: Info },
              { id: 'description', label: 'Clinical Description', icon: Layers },
              { id: 'specifications', label: 'Technical Specifications', icon: ShieldCheck },
              { id: 'packaging', label: 'Packaging & Inclusions', icon: Package },
              { id: 'faqs', label: 'Frequently Asked Questions', icon: HelpCircle },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-3 py-2 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
                    isActive
                      ? 'border-brand-emerald text-brand-emerald'
                      : 'border-transparent text-brand-muted hover:text-brand-forest'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content Panes */}
          <div className="py-6">
            
            {/* 1. Overview */}
            {activeTab === 'overview' && (
              <div className="space-y-4">
                <h3 className="text-lg font-heading font-bold text-brand-forest">
                  Clinical Overview & Application
                </h3>
                <p className="text-sm text-brand-body leading-relaxed max-w-4xl">
                  {product.description}
                </p>

                <div className="pt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-brand-ivory/50 border border-brand-border">
                    <span className="text-xs font-bold text-brand-forest uppercase block mb-1">Recommended Facilities</span>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {product.targetAudience.map((aud) => (
                        <span key={aud} className="px-2 py-0.5 rounded-md bg-white border border-brand-border text-xs font-medium text-brand-forest">
                          {aud}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-brand-ivory/50 border border-brand-border">
                    <span className="text-xs font-bold text-brand-forest uppercase block mb-1">Classification</span>
                    <span className="text-sm font-semibold text-brand-emerald">{product.productType}</span>
                    <span className="text-xs text-brand-muted block mt-1">Regulated Medical Supplies</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-brand-ivory/50 border border-brand-border">
                    <span className="text-xs font-bold text-brand-forest uppercase block mb-1">Tax Structure</span>
                    <span className="text-sm font-semibold text-brand-forest">{product.gstPercent}% Medical GST</span>
                    <span className="text-xs text-brand-muted block mt-1">Tax invoice provided upon dispatch</span>
                  </div>
                </div>
              </div>
            )}

            {/* 2. Detailed Description */}
            {activeTab === 'description' && (
              <div className="space-y-4 max-w-4xl text-sm text-brand-body leading-relaxed">
                <h3 className="text-lg font-heading font-bold text-brand-forest">
                  Detailed Operational Notes
                </h3>
                <p>{product.description}</p>
                <div className="bg-brand-softGreen/50 p-4 rounded-2xl border border-brand-emerald/20 text-xs text-brand-forest">
                  <span className="font-bold block mb-1">Standard Maintenance & Storage</span>
                  Store in clean, dry ambient conditions protected from direct sunlight and excess humidity. Ensure calibration cycles are monitored according to institutional biomedical protocols.
                </div>
              </div>
            )}

            {/* 3. Technical Specifications Table */}
            {activeTab === 'specifications' && (
              <div className="space-y-4">
                <h3 className="text-lg font-heading font-bold text-brand-forest">
                  Technical Parameters & Tolerances
                </h3>
                <div className="border border-brand-border rounded-2xl overflow-hidden shadow-xs">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <tbody>
                      {Object.entries(product.specifications).map(([key, value], idx) => (
                        <tr
                          key={key}
                          className={idx % 2 === 0 ? 'bg-brand-ivory/30' : 'bg-white'}
                        >
                          <td className="p-3.5 font-bold text-brand-forest w-1/3 border-r border-brand-border/60">
                            {key}
                          </td>
                          <td className="p-3.5 text-brand-body font-mono">
                            {value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 4. Packaging Details */}
            {activeTab === 'packaging' && (
              <div className="space-y-4 max-w-4xl">
                <h3 className="text-lg font-heading font-bold text-brand-forest">
                  Packaging & Standard Box Inclusions
                </h3>
                <p className="text-sm text-brand-body leading-relaxed">
                  {product.packagingDetails}
                </p>
                <div className="p-4 rounded-2xl bg-brand-ivory/50 border border-brand-border text-xs text-brand-muted flex items-start gap-3">
                  <Package className="w-5 h-5 text-brand-emerald flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-brand-forest block">Tamper-Evident Transport Packaging</span>
                    All parcels are dispatched in double-walled corrugated freight shippers sealed with security tape.
                  </div>
                </div>
              </div>
            )}

            {/* 5. FAQs */}
            {activeTab === 'faqs' && (
              <div className="space-y-4 max-w-3xl">
                <h3 className="text-lg font-heading font-bold text-brand-forest">
                  Frequently Asked Questions about {product.name}
                </h3>
                {product.faqs.length > 0 ? (
                  <div className="space-y-3">
                    {product.faqs.map((faq, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-brand-ivory/40 border border-brand-border space-y-1">
                        <span className="font-bold text-xs sm:text-sm text-brand-forest block">
                          Q: {faq.question}
                        </span>
                        <p className="text-xs sm:text-sm text-brand-body/90 leading-relaxed">
                          A: {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-brand-muted">Please contact our support desk for additional technical inquiries.</p>
                )}
              </div>
            )}

          </div>

        </div>

        {/* RELATED PRODUCTS SECTIONS */}

        {/* 1. Frequently Bought Together */}
        {frequentlyBought.length > 0 && (
          <div className="mb-14">
            <div className="mb-6">
              <span className="text-xs font-bold text-brand-emerald uppercase tracking-wider">Clinical Combos</span>
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-brand-forest">
                Frequently Bought Together
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <ProductCard product={product} />
              {frequentlyBought.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

        {/* 2. Similar Products */}
        {similarProducts.length > 0 && (
          <div className="mb-14">
            <div className="mb-6">
              <span className="text-xs font-bold text-brand-emerald uppercase tracking-wider">In Same Department</span>
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-brand-forest">
                Similar Products in {product.categoryName}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

        {/* 3. Recently Viewed Products */}
        {recentlyViewed.length > 1 && (
          <div className="mb-14">
            <div className="mb-6">
              <span className="text-xs font-bold text-brand-muted uppercase tracking-wider">Browsing History</span>
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-brand-forest">
                Recently Viewed Products
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recentlyViewed
                .filter((p) => p.id !== product.id)
                .slice(0, 4)
                .map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
            </div>
          </div>
        )}

      </div>

      {/* Fullscreen Image Zoom Modal */}
      {isZoomModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-brand-forest/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setIsZoomModalOpen(false)}
        >
          <div className="relative max-w-4xl max-h-[90vh] bg-white rounded-3xl p-4 overflow-hidden shadow-modal">
            <img
              src={product.images[selectedImageIndex]}
              alt="Zoomed View"
              className="max-h-[80vh] w-auto object-contain mx-auto rounded-2xl"
            />
            <button
              type="button"
              onClick={() => setIsZoomModalOpen(false)}
              className="absolute top-6 right-6 px-3 py-1.5 rounded-full bg-brand-forest text-white text-xs font-bold shadow"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Mobile Sticky Add to Cart Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-white/95 backdrop-blur-md p-3.5 border-t border-brand-border shadow-modal flex items-center justify-between gap-3">
        <div>
          <span className="text-base font-extrabold text-brand-forest font-heading">
            {formatINR(product.price * quantity)}
          </span>
          <span className="text-[10px] text-brand-muted block">
            {quantity} {product.unit}{quantity > 1 ? 's' : ''}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleAddToCart}
            className="px-4 py-2.5 rounded-xl bg-brand-emerald text-white text-xs font-bold shadow"
          >
            Add to Cart
          </button>
          <button
            type="button"
            onClick={handleDirectWhatsAppOrder}
            className="p-2.5 rounded-xl bg-brand-softGreen text-brand-emerald font-bold"
            title="Order on WhatsApp"
          >
            <MessageCircle className="w-5 h-5" />
          </button>
        </div>
      </div>

    </div>
  );
};
