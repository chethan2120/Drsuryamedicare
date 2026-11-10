import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { SearchModal } from './SearchModal';
import { TrackOrderModal } from './TrackOrderModal';
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  X,
  Phone,
  ChevronDown,
  User,
  FileSpreadsheet,
  Activity,
  Truck,
  Home,
  Store,
  Building2,
  HelpCircle,
  BookOpen,
  MessageSquare,
} from 'lucide-react';
import { storeConfig } from '../../config/storeConfig';
import { formatINR } from '../../utils/formatters';
import { categories } from '../../data/categories';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isTrackOrderOpen, setIsTrackOrderOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { totalItemsCount, setIsCartDrawerOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const next = window.scrollY > 12;
        setIsScrolled((current) => (current === next ? current : next));
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  // Logo navigation: smooth scrolls to #home if already on homepage, otherwise navigates to /#home
  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (location.pathname === '/' || location.pathname === '') {
      const heroElement = document.getElementById('home');
      if (heroElement) {
        heroElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      if (window.location.hash !== '#home') {
        window.history.pushState(null, '', '/#home');
      }
    } else {
      navigate('/#home');
      setTimeout(() => {
        const heroElement = document.getElementById('home');
        if (heroElement) {
          heroElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 70);
    }
  };

  return (
    <>
      {/* Fixed Sticky Wrapper - moves along with the page */}
      <div data-site-header data-tone={isScrolled ? 'white' : 'cream'} className="site-header sticky top-0 z-50 w-full">
        
        {/* 1. Micro Top Bar — same navy as the footer */}
        <div className="border-b border-white/10 bg-brand-navy px-3 py-1.5 text-[11px] leading-4 text-brand-ivory sm:px-6 sm:py-2 sm:text-xs">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-center sm:justify-between sm:text-left">
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
              <button
                type="button"
                onClick={() => setIsTrackOrderOpen(true)}
                className="inline-flex items-center gap-1 font-semibold text-brand-ivory"
              >
                <Truck className="h-3 w-3" />
                <span>Track Consignment</span>
              </button>
              <span className="text-white/40" aria-hidden="true">|</span>
              <span className="font-medium text-brand-ivory">
                Free delivery on orders above {formatINR(storeConfig.shipping.freeThreshold)}
              </span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
              <a
                href={`tel:${storeConfig.supportPhone}`}
                className="inline-flex items-center gap-1 font-medium text-brand-ivory"
              >
                <Phone className="h-3 w-3" />
                <span>Support: {storeConfig.supportPhone}</span>
              </a>
              <span className="text-white/40" aria-hidden="true">|</span>
              <Link to="/bulk-orders" className="text-[11px] font-semibold text-brand-ivory">
                Bulk Orders & RFQ
              </Link>
            </div>
          </div>
        </div>

        {/* 2. Main Header Navigation */}
        <header
          className={`w-full border-b py-3 transition-colors duration-300 ${
            isScrolled ? 'border-brand-border bg-white' : 'border-brand-stone/80 bg-brand-ivory'
          }`}
        >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            
            {/* LEFT: Logo & Brand Name (Navigates to /#home from any page) */}
            <Link
              to="/#home"
              onClick={handleLogoClick}
              className="brand-lockup group flex min-w-0 shrink items-center gap-2 sm:shrink-0 sm:gap-2.5"
              title="Dr Surya Medicare - Home"
            >
              <div
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-brand-forest flex items-center justify-center text-white ring-1 ring-brand-gold/70 shadow-xs flex-shrink-0"
              >
                <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-brand-ivory" />
              </div>

              <div className="min-w-0 sm:min-w-max">
                <span
                  className="block max-sm:truncate font-heading text-[15px] font-bold tracking-tight text-brand-forest sm:text-base lg:text-[17px] xl:text-lg"
                >
                  DR SURYA <span className="text-brand-emerald">MEDICARE</span>
                </span>
                <span className="text-[10px] sm:text-[11px] tracking-[0.14em] uppercase text-brand-muted font-medium block truncate">
                  Healthcare Marketplace
                </span>
              </div>
            </Link>

            {/* CENTER: Main Desktop Navigation (Home | Shop | Resources | Bulk Orders | About Us | Why Us | Contact Us) */}
            <nav className="hidden min-w-0 items-center gap-0 whitespace-nowrap lg:flex xl:gap-0.5">
              <Link
                to="/#home"
                onClick={handleLogoClick}
                className={`rounded-full px-2.5 py-1.5 text-[13px] font-semibold transition-all xl:px-3.5 ${
                  isActive('/') && location.pathname === '/'
                    ? 'bg-brand-teal text-white'
                    : 'text-brand-forest hover:text-brand-teal'
                }`}
              >
                Home
              </Link>

              <div className="relative group">
                <Link
                  to="/shop"
                  className={`px-2.5 xl:px-3 py-2 rounded-lg text-[13px] font-semibold transition-all inline-flex items-center gap-1 ${
                    isActive('/shop') ? 'text-brand-teal' : 'text-brand-forest hover:text-brand-teal'
                  }`}
                >
                  Shop
                  <ChevronDown className="w-3.5 h-3.5" />
                </Link>
                <div className="invisible absolute left-0 top-full z-50 pt-2 opacity-0 transition group-hover:visible group-hover:opacity-100">
                  <div className="w-64 rounded-2xl border border-brand-stone bg-white p-2 shadow-card">
                    {categories.slice(0, 6).map((category) => (
                      <Link
                        key={category.id}
                        to={`/shop?category=${category.id}`}
                        className="block rounded-lg px-3 py-2 text-sm text-brand-forest hover:bg-brand-ivory"
                      >
                        {category.name}
                      </Link>
                    ))}
                    <Link to="/shop" className="mt-1 block rounded-lg px-3 py-2 text-sm font-semibold text-brand-teal">
                      View all products
                    </Link>
                  </div>
                </div>
              </div>

              <div className="relative group">
                <Link
                  to="/resources"
                  className={`px-2.5 xl:px-3 py-2 rounded-lg text-[13px] font-semibold transition-all inline-flex items-center gap-1 ${
                    isActive('/resources') ? 'text-brand-teal' : 'text-brand-forest hover:text-brand-teal'
                  }`}
                >
                  Resources
                  <ChevronDown className="w-3.5 h-3.5" />
                </Link>
                <div className="invisible absolute left-0 top-full z-50 pt-2 opacity-0 transition group-hover:visible group-hover:opacity-100">
                  <div className="w-56 rounded-2xl border border-brand-stone bg-white p-2 shadow-card">
                    <Link to="/resources/blogs" className="block rounded-lg px-3 py-2 text-sm text-brand-forest hover:bg-brand-ivory">Articles</Link>
                    <Link to="/resources/buying-guides" className="block rounded-lg px-3 py-2 text-sm text-brand-forest hover:bg-brand-ivory">Buying guides</Link>
                    <Link to="/resources/manuals" className="block rounded-lg px-3 py-2 text-sm text-brand-forest hover:bg-brand-ivory">Manuals</Link>
                    <Link to="/resources/faqs" className="block rounded-lg px-3 py-2 text-sm text-brand-forest hover:bg-brand-ivory">FAQs</Link>
                  </div>
                </div>
              </div>

              <Link
                to="/bulk-orders"
                className={`px-2.5 xl:px-3 py-2 rounded-lg text-[13px] font-semibold transition-all flex items-center gap-1.5 ${
                  isActive('/bulk-orders')
                    ? 'text-brand-emerald bg-brand-softGreen'
                    : 'text-brand-forest hover:text-brand-emerald hover:bg-brand-ivory/80'
                }`}
              >
                <FileSpreadsheet className="hidden h-3.5 w-3.5 text-brand-emerald xl:block" />
                <span>Bulk Orders</span>
              </Link>

              <Link
                to="/about"
                className={`px-2.5 xl:px-3 py-2 rounded-lg text-[13px] font-semibold transition-all ${
                  isActive('/about')
                    ? 'text-brand-emerald bg-brand-softGreen'
                    : 'text-brand-forest hover:text-brand-emerald hover:bg-brand-ivory/80'
                }`}
              >
                About Us
              </Link>

              <Link
                to="/why-us"
                className={`px-2.5 xl:px-3 py-2 rounded-lg text-[13px] font-semibold transition-all ${
                  isActive('/why-us')
                    ? 'text-brand-emerald bg-brand-softGreen'
                    : 'text-brand-forest hover:text-brand-emerald hover:bg-brand-ivory/80'
                }`}
              >
                Why Us
              </Link>

              {/* CONTACT US (Proper navigation link) */}
              <Link
                to="/contact"
                className={`px-2.5 xl:px-3 py-2 rounded-lg text-[13px] font-semibold transition-all flex items-center gap-1.5 ${
                  isActive('/contact')
                    ? 'text-brand-emerald bg-brand-softGreen'
                    : 'text-brand-forest hover:text-brand-emerald hover:bg-brand-ivory/80'
                }`}
              >
                <MessageSquare className="hidden h-3.5 w-3.5 text-brand-emerald xl:block" />
                <span>Contact Us</span>
              </Link>
            </nav>

            {/* RIGHT: Search, Wishlist & Cart */}
            <div className="header-tools flex shrink-0 items-center gap-0.5 sm:gap-1.5">
              
              {/* Search Trigger */}
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="hidden xl:flex items-center gap-2 w-44 px-3 py-2 rounded-full border border-brand-stone bg-brand-ivory text-brand-muted text-sm"
                title="Search products"
              >
                <Search className="w-4 h-4" />
                <span>Search products...</span>
              </button>
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-brand-forest xl:hidden"
                aria-label="Search products"
              >
                <Search className="w-5 h-5" />
              </button>
              <Link to="/account" className="hidden sm:flex p-2 rounded-full text-brand-forest hover:bg-brand-ivory" title="Account">
                <User className="w-5 h-5" />
              </Link>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="relative hidden h-11 w-11 items-center justify-center rounded-xl text-brand-forest transition-colors hover:bg-brand-warmWhite hover:text-brand-vermilion sm:flex"
                title="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-brand-vermilion text-brand-warmWhite text-[10px] font-bold flex items-center justify-center animate-scale-up">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart Drawer Trigger */}
              <button
                type="button"
                onClick={() => setIsCartDrawerOpen(true)}
                className="relative hidden h-11 w-11 items-center justify-center rounded-full text-brand-forest hover:bg-brand-ivory sm:inline-flex"
                aria-label="Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItemsCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-4 h-4 px-1 rounded-full bg-brand-teal text-white text-[10px] font-bold flex items-center justify-center">
                    {totalItemsCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Toggle Button */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-brand-forest transition-colors hover:bg-brand-warmWhite lg:hidden"
                aria-label="Toggle Navigation Menu"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

            </div>

          </div>
        </div>

        {/* Mobile Dropdown Menu Drawer */}
        {isMobileMenuOpen && (
          <div className="max-h-[min(70vh,32rem)] space-y-3 overflow-y-auto border-t border-brand-border bg-brand-warmWhite px-4 py-4 shadow-modal animate-fade-in lg:hidden">
            <div className="space-y-1">
              <Link
                to="/#home"
                onClick={(e) => {
                  setIsMobileMenuOpen(false);
                  handleLogoClick(e);
                }}
                className={`flex items-center gap-2.5 min-h-11 rounded-xl px-3.5 py-2.5 text-sm font-bold transition-colors ${
                  isActive('/') && location.pathname === '/'
                    ? 'text-brand-emerald bg-brand-softGreen'
                    : 'text-brand-forest hover:bg-brand-softGreen'
                }`}
              >
                <Home className="w-4 h-4 text-brand-emerald" />
                <span>Home</span>
              </Link>

              <Link
                to="/shop"
                className={`flex items-center gap-2.5 min-h-11 rounded-xl px-3.5 py-2.5 text-sm font-bold transition-colors ${
                  isActive('/shop')
                    ? 'text-brand-emerald bg-brand-softGreen'
                    : 'text-brand-forest hover:bg-brand-softGreen'
                }`}
              >
                <Store className="w-4 h-4 text-brand-emerald" />
                <span>Shop Catalogue</span>
              </Link>

              <Link
                to="/resources"
                className={`flex items-center gap-2.5 min-h-11 rounded-xl px-3.5 py-2.5 text-sm font-bold transition-colors ${
                  isActive('/resources')
                    ? 'text-brand-emerald bg-brand-softGreen'
                    : 'text-brand-forest hover:bg-brand-softGreen'
                }`}
              >
                <BookOpen className="w-4 h-4 text-brand-emerald" />
                <span>Resources & Knowledge Hub</span>
              </Link>

              <Link
                to="/bulk-orders"
                className={`flex items-center gap-2.5 min-h-11 rounded-xl px-3.5 py-2.5 text-sm font-bold transition-colors ${
                  isActive('/bulk-orders')
                    ? 'text-brand-emerald bg-brand-softGreen'
                    : 'text-brand-forest hover:bg-brand-softGreen'
                }`}
              >
                <FileSpreadsheet className="w-4 h-4 text-brand-emerald" />
                <span>Bulk Orders & RFQ</span>
              </Link>

              <Link
                to="/about"
                className={`flex items-center gap-2.5 min-h-11 rounded-xl px-3.5 py-2.5 text-sm font-bold transition-colors ${
                  isActive('/about')
                    ? 'text-brand-emerald bg-brand-softGreen'
                    : 'text-brand-forest hover:bg-brand-softGreen'
                }`}
              >
                <Building2 className="w-4 h-4 text-brand-emerald" />
                <span>About Us</span>
              </Link>

              <Link
                to="/why-us"
                className={`flex items-center gap-2.5 min-h-11 rounded-xl px-3.5 py-2.5 text-sm font-bold transition-colors ${
                  isActive('/why-us')
                    ? 'text-brand-emerald bg-brand-softGreen'
                    : 'text-brand-forest hover:bg-brand-softGreen'
                }`}
              >
                <HelpCircle className="w-4 h-4 text-brand-emerald" />
                <span>Why Us</span>
              </Link>

              <Link
                to="/contact"
                className={`flex items-center gap-2.5 min-h-11 rounded-xl px-3.5 py-2.5 text-sm font-bold transition-colors ${
                  isActive('/contact')
                    ? 'text-brand-emerald bg-brand-softGreen'
                    : 'text-brand-forest hover:bg-brand-softGreen'
                }`}
              >
                <MessageSquare className="w-4 h-4 text-brand-emerald" />
                <span>Contact Us</span>
              </Link>

              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsTrackOrderOpen(true);
                }}
                className="w-full flex items-center gap-2.5 min-h-11 rounded-xl px-3.5 py-2.5 text-sm font-bold text-brand-forest hover:bg-brand-softGreen text-left"
              >
                <Truck className="w-4 h-4 text-brand-emerald" />
                <span>Track Consignment</span>
              </button>

              <Link
                to="/wishlist"
                className={`flex items-center justify-between min-h-11 rounded-xl px-3.5 py-2.5 text-sm font-bold transition-colors ${
                  isActive('/wishlist')
                    ? 'text-brand-vermilion bg-brand-softGreen'
                    : 'text-brand-forest hover:bg-brand-softGreen'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Heart className="w-4 h-4 text-brand-vermilion" />
                  <span>Wishlist</span>
                </div>
                {wishlistCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-brand-vermilion text-white text-xs font-bold">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <div
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsCartDrawerOpen(true);
                }}
                className="flex items-center justify-between min-h-11 rounded-xl px-3.5 py-2.5 text-sm font-bold text-brand-forest hover:bg-brand-softGreen cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <ShoppingBag className="w-4 h-4 text-brand-emerald" />
                  <span>Cart</span>
                </div>
                {totalItemsCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-brand-emerald text-white text-xs font-bold">
                    {totalItemsCount}
                  </span>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-brand-border flex items-center justify-between text-xs text-brand-muted">
              <span>Support: {storeConfig.supportPhone}</span>
              <a
                href={`https://wa.me/${storeConfig.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-emerald font-bold"
              >
                WhatsApp Desk
              </a>
            </div>
          </div>
        )}
      </header>
      </div>

      {/* 3. Floating Mobile Bottom Navigation Bar (Phone Optimized) */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 flex w-full max-w-full items-stretch justify-around border-t border-brand-border bg-white px-1 py-1 shadow-modal lg:hidden" aria-label="Primary">
        <Link
          to="/#home"
          onClick={handleLogoClick}
          className={`flex flex-col items-center justify-center min-h-11 min-w-0 flex-1 px-0.5 gap-0.5 text-[11px] font-semibold ${
            isActive('/') && location.pathname === '/' ? 'text-brand-emerald' : 'text-brand-muted'
          }`}
        >
          <Home className="w-4.5 h-4.5" />
          <span>Home</span>
        </Link>

        <Link
          to="/shop"
          className={`flex flex-col items-center justify-center min-h-11 min-w-0 flex-1 px-0.5 gap-0.5 text-[11px] font-semibold ${
            isActive('/shop') ? 'text-brand-emerald' : 'text-brand-muted'
          }`}
        >
          <Store className="w-4.5 h-4.5" />
          <span>Shop</span>
        </Link>

        <Link
          to="/resources"
          className={`flex flex-col items-center justify-center min-h-11 min-w-0 flex-1 px-0.5 gap-0.5 text-[11px] font-semibold ${
            isActive('/resources') ? 'text-brand-emerald' : 'text-brand-muted'
          }`}
        >
          <BookOpen className="w-4.5 h-4.5" />
          <span>Resources</span>
        </Link>

        <Link
          to="/wishlist"
          className={`relative flex flex-col items-center justify-center min-h-11 min-w-0 flex-1 px-0.5 gap-0.5 text-[11px] font-semibold ${
            isActive('/wishlist') ? 'text-brand-emerald' : 'text-brand-muted'
          }`}
        >
          <Heart className="w-4.5 h-4.5" />
          <span>Wishlist</span>
          {wishlistCount > 0 && (
            <span className="absolute -top-1 right-2 w-3.5 h-3.5 rounded-full bg-brand-vermilion text-white text-[8px] font-bold flex items-center justify-center">
              {wishlistCount}
            </span>
          )}
        </Link>

        <button
          type="button"
          onClick={() => setIsCartDrawerOpen(true)}
          className="relative flex flex-col items-center justify-center min-h-11 min-w-0 flex-1 px-0.5 gap-0.5 text-[11px] font-semibold text-brand-emerald"
        >
          <ShoppingBag className="w-4.5 h-4.5" />
          <span>Cart</span>
          {totalItemsCount > 0 && (
            <span className="absolute -top-1 right-1 w-3.5 h-3.5 rounded-full bg-brand-emerald text-white text-[8px] font-bold flex items-center justify-center">
              {totalItemsCount}
            </span>
          )}
        </button>
      </nav>

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Track Order Modal */}
      <TrackOrderModal isOpen={isTrackOrderOpen} onClose={() => setIsTrackOrderOpen(false)} />
    </>
  );
};
