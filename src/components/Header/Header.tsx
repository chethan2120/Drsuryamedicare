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
  const [headerQuery, setHeaderQuery] = useState('');

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
          <div className="flex items-center gap-2 sm:gap-4">
            
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

            <form
              className="hidden min-w-0 flex-1 md:block"
              onSubmit={(event) => {
                event.preventDefault();
                const query = headerQuery.trim();
                if (!query) {
                  setIsSearchOpen(true);
                  return;
                }
                navigate(`/shop?search=${encodeURIComponent(query)}`);
              }}
            >
              <label className="relative block">
                <span className="sr-only">Search products</span>
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-muted" />
                <input
                  value={headerQuery}
                  onChange={(event) => setHeaderQuery(event.target.value)}
                  placeholder="Search equipment, supplies, or brands"
                  className="h-11 w-full rounded-[10px] border border-brand-border bg-white pl-10 pr-4 text-sm text-brand-navy outline-none placeholder:text-brand-muted focus:border-brand-navy"
                />
              </label>
            </form>

            {/* RIGHT: Search, Wishlist & Cart */}
            <div className="header-tools flex shrink-0 items-center gap-0.5 sm:gap-1.5">
              
              {/* Search Trigger */}
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-brand-forest md:hidden"
                aria-label="Search products"
              >
                <Search className="w-5 h-5" />
              </button>
              <Link to="/account" className="flex h-10 w-10 items-center justify-center rounded-full text-brand-forest hover:bg-brand-ivory" title="Account" aria-label="Account">
                <User className="w-5 h-5" />
              </Link>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="relative flex h-10 w-10 items-center justify-center rounded-xl text-brand-forest transition-colors hover:bg-brand-warmWhite hover:text-brand-vermilion"
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
                className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-brand-forest hover:bg-brand-ivory"
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
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-brand-forest transition-colors hover:bg-brand-warmWhite lg:hidden"
                aria-label="Toggle Navigation Menu"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

            </div>

          </div>

          <nav className="mt-3 hidden items-center justify-between gap-2 border-t border-brand-border/80 pt-2 text-[13px] font-semibold text-brand-navy lg:flex" aria-label="Primary desktop">
            <Link
              to="/#home"
              onClick={handleLogoClick}
              className={`whitespace-nowrap rounded-full px-3 py-1.5 ${
                isActive('/') && location.pathname === '/' ? 'bg-brand-emerald text-brand-navy' : 'hover:text-brand-goldInk'
              }`}
            >
              Home
            </Link>
            <Link
              to="/shop"
              className={`whitespace-nowrap rounded-full px-3 py-1.5 ${isActive('/shop') ? 'text-brand-goldInk' : 'hover:text-brand-goldInk'}`}
            >
              Shop
            </Link>
            <div className="group relative">
              <Link to="/categories" className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-1.5 ${isActive('/categories') ? 'text-brand-goldInk' : 'hover:text-brand-goldInk'}`}>
                Categories
                <ChevronDown className="h-3.5 w-3.5" />
              </Link>
              <div className="invisible absolute left-0 top-full z-50 pt-2 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                <div className="grid w-[28rem] grid-cols-2 gap-1 rounded-2xl border border-brand-border bg-white p-2 shadow-card">
                  {categories.filter((category) => category.productCount > 0).map((category) => (
                    <Link key={category.id} to={`/shop?category=${category.id}`} className="rounded-lg px-3 py-2 text-sm font-medium text-brand-navy hover:bg-brand-ivory">
                      {category.name}
                    </Link>
                  ))}
                  <Link to="/categories" className="col-span-2 rounded-lg px-3 py-2 text-sm font-semibold text-brand-goldInk">
                    View all categories
                  </Link>
                </div>
              </div>
            </div>
            <div className="group relative">
              <Link to="/resources" className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-1.5 ${isActive('/resources') ? 'text-brand-goldInk' : 'hover:text-brand-goldInk'}`}>
                Resources
                <ChevronDown className="h-3.5 w-3.5" />
              </Link>
              <div className="invisible absolute left-0 top-full z-50 pt-2 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                <div className="w-56 rounded-2xl border border-brand-border bg-white p-2 shadow-card">
                  <Link to="/resources/blogs" className="block rounded-lg px-3 py-2 text-sm font-medium text-brand-navy hover:bg-brand-ivory">Articles</Link>
                  <Link to="/resources/buying-guides" className="block rounded-lg px-3 py-2 text-sm font-medium text-brand-navy hover:bg-brand-ivory">Buying guides</Link>
                  <Link to="/resources/manuals" className="block rounded-lg px-3 py-2 text-sm font-medium text-brand-navy hover:bg-brand-ivory">Manuals</Link>
                  <Link to="/resources/faqs" className="block rounded-lg px-3 py-2 text-sm font-medium text-brand-navy hover:bg-brand-ivory">FAQs</Link>
                </div>
              </div>
            </div>
            <Link to="/bulk-orders" className={`whitespace-nowrap rounded-full px-3 py-1.5 ${isActive('/bulk-orders') ? 'text-brand-goldInk' : 'hover:text-brand-goldInk'}`}>
              Bulk Orders
            </Link>
            <Link to="/about" className={`whitespace-nowrap rounded-full px-3 py-1.5 ${isActive('/about') ? 'text-brand-goldInk' : 'hover:text-brand-goldInk'}`}>
              About Us
            </Link>
            <Link to="/why-us" className={`whitespace-nowrap rounded-full px-3 py-1.5 ${isActive('/why-us') ? 'text-brand-goldInk' : 'hover:text-brand-goldInk'}`}>
              Why Us
            </Link>
            <Link to="/contact" className={`whitespace-nowrap rounded-full px-3 py-1.5 ${isActive('/contact') ? 'text-brand-goldInk' : 'hover:text-brand-goldInk'}`}>
              Contact Us
            </Link>
          </nav>
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
                <span>Shop</span>
              </Link>

              <Link
                to="/categories"
                className={`flex items-center gap-2.5 min-h-11 rounded-xl px-3.5 py-2.5 text-sm font-bold transition-colors ${
                  isActive('/categories')
                    ? 'text-brand-emerald bg-brand-softGreen'
                    : 'text-brand-forest hover:bg-brand-softGreen'
                }`}
              >
                <Store className="w-4 h-4 text-brand-emerald" />
                <span>Categories</span>
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
