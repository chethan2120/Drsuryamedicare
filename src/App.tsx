import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider, useCart } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { RecentlyViewedProvider } from './context/RecentlyViewedContext';
import { ResourcesProvider } from './context/ResourcesContext';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { CartDrawer } from './components/CartDrawer/CartDrawer';
import { HomePage } from './pages/Home/HomePage';
import { ShopPage } from './pages/Shop/ShopPage';
import { CategoriesPage } from './pages/Category/CategoriesPage';
import { ProductDetailsPage } from './pages/ProductDetails/ProductDetailsPage';
import { CartPage } from './pages/Cart/CartPage';
import { WishlistPage } from './pages/Wishlist/WishlistPage';
import { BulkOrdersPage } from './pages/BulkOrders/BulkOrdersPage';
import { AccountPage } from './pages/Account/AccountPage';
import { AboutPage } from './pages/About/AboutPage';
import { WhyUsPage } from './pages/WhyUs/WhyUsPage';
import { ContactPage } from './pages/Contact/ContactPage';
import { ResourcesLandingPage } from './pages/Resources/ResourcesLandingPage';
import { ManualsPage } from './pages/Resources/ManualsPage';
import { SpecificationsPage } from './pages/Resources/SpecificationsPage';
import { BlogsListPage } from './pages/Resources/BlogsListPage';
import { BlogDetailPage } from './pages/Resources/BlogDetailPage';
import { BuyingGuidesPage } from './pages/Resources/BuyingGuidesPage';
import { BuyingGuideDetailPage } from './pages/Resources/BuyingGuideDetailPage';
import { ProductKnowledgePage } from './pages/Resources/ProductKnowledgePage';
import { ProductKnowledgeDetailPage } from './pages/Resources/ProductKnowledgeDetailPage';
import { FaqsPage } from './pages/Resources/FaqsPage';
import { AdminResourcesPage } from './pages/Admin/AdminResourcesPage';
import { HealthcareAssistantChat } from './components/Chatbot/HealthcareAssistantChat';
import { CheckCircle2, X } from 'lucide-react';

// Scroll to top helper with anchor hash support (#home)
function RevealController() {
  const { pathname } = useLocation();

  useEffect(() => {
    const root = document.documentElement;
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal], .reveal-stagger'));
    if (!('IntersectionObserver' in window)) {
      nodes.forEach((node) => node.classList.add('is-in'));
      return;
    }

    root.classList.add('js');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-in');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.18, rootMargin: '0px 0px -8% 0px' }
    );

    nodes.forEach((node) => {
      const rect = node.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) node.classList.add('is-in');
      else observer.observe(node);
    });

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const elementId = hash.replace('#', '');
      const element = document.getElementById(elementId);
      if (element) {
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 60);
        return () => clearTimeout(timer);
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname, hash]);

  return null;
}

// Global Toast banner
function GlobalToast() {
  const { toastMessage, dismissToast } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-24 right-4 lg:bottom-6 lg:right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl bg-brand-forest text-white shadow-modal border border-brand-gold/40 animate-fade-in max-w-sm">
      <CheckCircle2 className="w-5 h-5 text-brand-emerald flex-shrink-0" />
      <span className="text-xs font-semibold flex-1 leading-snug">{toastMessage}</span>
      <button
        type="button"
        onClick={dismissToast}
        className="p-1 text-brand-muted hover:text-white transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

function AppContent() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-ivory text-brand-body selection:bg-brand-emerald selection:text-white">
      <ScrollToTop />
      <RevealController />
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/product/:productId" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/bulk-orders" element={<BulkOrdersPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/why-us" element={<WhyUsPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Resources Knowledge Hub Routes */}
          <Route path="/resources" element={<ResourcesLandingPage />} />
          <Route path="/resources/manuals" element={<ManualsPage />} />
          <Route path="/resources/specifications" element={<SpecificationsPage />} />
          <Route path="/resources/blogs" element={<BlogsListPage />} />
          <Route path="/resources/blogs/:slug" element={<BlogDetailPage />} />
          <Route path="/resources/buying-guides" element={<BuyingGuidesPage />} />
          <Route path="/resources/buying-guides/:slug" element={<BuyingGuideDetailPage />} />
          <Route path="/resources/knowledge" element={<ProductKnowledgePage />} />
          <Route path="/resources/knowledge/:slug" element={<ProductKnowledgeDetailPage />} />
          <Route path="/resources/faqs" element={<FaqsPage />} />
          <Route path="/faqs" element={<FaqsPage />} />

          {/* Admin Panel Route */}
          <Route path="/admin" element={<AdminResourcesPage />} />
          <Route path="/admin/resources" element={<AdminResourcesPage />} />

          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
      <Footer />
      <CartDrawer />
      <HealthcareAssistantChat />
      <GlobalToast />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <CartProvider>
        <WishlistProvider>
          <RecentlyViewedProvider>
            <ResourcesProvider>
              <AppContent />
            </ResourcesProvider>
          </RecentlyViewedProvider>
        </WishlistProvider>
      </CartProvider>
    </Router>
  );
}
