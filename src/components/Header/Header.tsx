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
  ShieldCheck,
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

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isTrackOrderOpen, setIsTrackOrderOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { totalItemsCount, setIsCartDrawerOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll detection for morphing header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
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
      <div className="sticky top-0 z-50 w-full transition-all duration-300">
        
        {/* 1. Micro Top Bar (collapses smoothly on scroll) */}
        <div
          className={`bg-brand-forest text-brand-ivory text-[10px] sm:text-[11px] px-3 sm:px-6 border-b border-brand-emerald/40 transition-all duration-300 overflow-hidden ${
            isScrolled ? 'max-h-0 py-0 opacity-0 -translate-y-full pointer-events-none' : 'max-h-12 py-1 opacity-100 translate-y-0'
          }`}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-1.5 truncate">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-ivory flex-shrink-0" />
              <span className="font-medium text-brand-warmWhite truncate">
                Certified Medical Supplies • Fast Pan-India Dispatch
              </span>
            </div>
            <div className="flex items-center gap-3 text-brand-ivory/90 flex-shrink-0">
              {/* Track Consignment kept prominently in top bar */}
              <button
                type="button"
                onClick={() => setIsTrackOrderOpen(true)}
                className="flex items-center gap-1 hover:text-white transition-colors text-[10px] sm:text-[11px] font-semibold"
              >
                <Truck className="w-3 h-3 text-brand-ivory" />
                <span>Track Consignment</span>
              </button>
              <span className="hidden sm:inline">|</span>
              <a
                href={`tel:${storeConfig.supportPhone}`}
                className="hidden sm:flex items-center gap-1 hover:text-white transition-colors"
              >
                <Phone className="w-3 h-3 text-brand-ivory" />
                <span>Support: {storeConfig.supportPhone}</span>
              </a>
              <span className="hidden sm:inline">|</span>
              <Link to="/bulk-orders" className="hidden sm:inline hover:text-white transition-colors text-[11px] font-semibold">
                Bulk Orders & RFQ
              </Link>
            </div>
          </div>
        </div>

        {/* 2. Main Header Navigation */}
        <header
          className={`w-full transition-all duration-300 ${
            isScrolled
              ? 'bg-brand-warmWhite/95 backdrop-blur-md shadow-[0_6px_25px_-3px_rgba(7,61,39,0.12)] py-2 border-b border-brand-border'
              : 'bg-brand-ivory py-2.5 sm:py-3 border-b border-brand-border/60 shadow-xs'
          }`}
        >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            
            {/* LEFT: Logo & Brand Name (Navigates to /#home from any page) */}
            <Link
              to="/#home"
              onClick={handleLogoClick}
              className="flex items-center gap-2 sm:gap-2.5 group flex-shrink-0 min-w-0"
              title="Dr Surya Medicare - Home"
            >
              <div
                className={`transition-all duration-300 rounded-xl bg-brand-emerald flex items-center justify-center text-brand-warmWhite shadow-xs group-hover:scale-105 flex-shrink-0 ${
                  isScrolled ? 'w-7 h-7 sm:w-8 sm:h-8' : 'w-8 h-8 sm:w-10 sm:h-10'
                }`}
              >
                <Activity className={`${isScrolled ? 'w-3.5 h-3.5 sm:w-4 sm:h-4' : 'w-4 h-4 sm:w-5 sm:h-5'} text-brand-ivory`} />
              </div>

              <div className="truncate">
                <span
                  className={`font-heading font-extrabold tracking-tight text-brand-forest block transition-all duration-200 truncate ${
                    isScrolled ? 'text-xs sm:text-base' : 'text-sm sm:text-lg'
                  }`}
                >
                  DR SURYA <span className="text-brand-emerald">MEDICARE</span>
                </span>
                <span className="text-[9px] sm:text-[10px] tracking-wider uppercase text-brand-muted font-semibold block -mt-0.5 truncate">
                  Healthcare Marketplace
                </span>
              </div>
            </Link>

            {/* CENTER: Main Desktop Navigation (Home | Shop | Resources | Bulk Orders | About Us | Why Us | Contact Us) */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
              <Link
                to="/#home"
                onClick={handleLogoClick}
                className={`px-2.5 xl:px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  isActive('/') && location.pathname === '/'
                    ? 'text-brand-emerald bg-brand-softGreen'
                    : 'text-brand-forest hover:text-brand-emerald hover:bg-brand-ivory/80'
                }`}
              >
                Home
              </Link>

              <Link
                to="/shop"
                className={`px-2.5 xl:px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  isActive('/shop') && !location.search.includes('type=')
                    ? 'text-brand-emerald bg-brand-softGreen'
                    : 'text-brand-forest hover:text-brand-emerald hover:bg-brand-ivory/80'
                }`}
              >
                Shop
              </Link>

              {/* RESOURCES (Dedicated Knowledge Hub) */}
              <Link
                to="/resources"
                className={`px-2.5 xl:px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  isActive('/resources')
                    ? 'text-brand-emerald bg-brand-softGreen'
                    : 'text-brand-forest hover:text-brand-emerald hover:bg-brand-ivory/80'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 text-brand-emerald" />
                <span>Resources</span>
              </Link>

              <Link
                to="/bulk-orders"
                className={`px-2.5 xl:px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  isActive('/bulk-orders')
                    ? 'text-brand-emerald bg-brand-softGreen'
                    : 'text-brand-forest hover:text-brand-emerald hover:bg-brand-ivory/80'
                }`}
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-brand-emerald" />
                <span>Bulk Orders</span>
              </Link>

              <Link
                to="/about"
                className={`px-2.5 xl:px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  isActive('/about')
                    ? 'text-brand-emerald bg-brand-softGreen'
                    : 'text-brand-forest hover:text-brand-emerald hover:bg-brand-ivory/80'
                }`}
              >
                About Us
              </Link>

              <Link
                to="/why-us"
                className={`px-2.5 xl:px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
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
                className={`px-2.5 xl:px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  isActive('/contact')
                    ? 'text-brand-emerald bg-brand-softGreen'
                    : 'text-brand-forest hover:text-brand-emerald hover:bg-brand-ivory/80'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5 text-brand-emerald" />
                <span>Contact Us</span>
              </Link>
            </nav>

            {/* RIGHT: Search, Wishlist & Cart */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 flex-shrink-0">
              
              {/* Search Trigger */}
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl border border-brand-border bg-brand-warmWhite hover:bg-white text-brand-muted hover:text-brand-forest text-xs transition-all shadow-xs"
                title="Search products"
              >
                <Search className="w-4 h-4 text-brand-emerald" />
                <span className="hidden sm:inline">Search...</span>
                <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-brand-ivory rounded border border-brand-border text-brand-muted">
                  ⌘K
                </kbd>
              </button>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="relative p-2 rounded-xl text-brand-forest hover:text-brand-vermilion hover:bg-brand-warmWhite transition-colors"
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
                className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-brand-emerald hover:bg-brand-emeraldLight text-brand-warmWhite text-xs sm:text-sm font-bold shadow-xs hover:shadow transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden xs:inline">Cart</span>
                {totalItemsCount > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full bg-brand-warmWhite text-brand-emerald text-xs font-extrabold">
                    {totalItemsCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Toggle Button */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl text-brand-forest hover:bg-brand-warmWhite transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

            </div>

          </div>
        </div>

        {/* Mobile Dropdown Menu Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-brand-border bg-brand-warmWhite px-4 py-4 space-y-3 animate-fade-in shadow-modal">
            <div className="space-y-1">
              <Link
                to="/#home"
                onClick={(e) => {
                  setIsMobileMenuOpen(false);
                  handleLogoClick(e);
                }}
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-bold transition-colors ${
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
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-bold transition-colors ${
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
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-bold transition-colors ${
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
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-bold transition-colors ${
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
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-bold transition-colors ${
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
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-bold transition-colors ${
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
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-bold transition-colors ${
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
                className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-bold text-brand-forest hover:bg-brand-softGreen text-left"
              >
                <Truck className="w-4 h-4 text-brand-emerald" />
                <span>Track Consignment</span>
              </button>

              <Link
                to="/wishlist"
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-bold transition-colors ${
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
                className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-bold text-brand-forest hover:bg-brand-softGreen cursor-pointer"
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
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-brand-border py-2 px-3 flex items-center justify-around shadow-modal">
        <Link
          to="/#home"
          onClick={handleLogoClick}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-bold ${
            isActive('/') && location.pathname === '/' ? 'text-brand-emerald' : 'text-brand-muted'
          }`}
        >
          <Home className="w-4.5 h-4.5" />
          <span>Home</span>
        </Link>

        <Link
          to="/shop"
          className={`flex flex-col items-center gap-0.5 text-[10px] font-bold ${
            isActive('/shop') ? 'text-brand-emerald' : 'text-brand-muted'
          }`}
        >
          <Store className="w-4.5 h-4.5" />
          <span>Shop</span>
        </Link>

        <Link
          to="/resources"
          className={`flex flex-col items-center gap-0.5 text-[10px] font-bold ${
            isActive('/resources') ? 'text-brand-emerald' : 'text-brand-muted'
          }`}
        >
          <BookOpen className="w-4.5 h-4.5" />
          <span>Resources</span>
        </Link>

        <Link
          to="/wishlist"
          className={`relative flex flex-col items-center gap-0.5 text-[10px] font-bold ${
            isActive('/wishlist') ? 'text-brand-vermilion' : 'text-brand-muted'
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
          className="relative flex flex-col items-center gap-0.5 text-[10px] font-bold text-brand-emerald"
        >
          <ShoppingBag className="w-4.5 h-4.5" />
          <span>Cart</span>
          {totalItemsCount > 0 && (
            <span className="absolute -top-1 right-1 w-3.5 h-3.5 rounded-full bg-brand-emerald text-white text-[8px] font-bold flex items-center justify-center">
              {totalItemsCount}
            </span>
          )}
        </button>
      </div>

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Track Order Modal */}
      <TrackOrderModal isOpen={isTrackOrderOpen} onClose={() => setIsTrackOrderOpen(false)} />
    </>
  );
};
