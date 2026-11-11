import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider, useCart } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { RecentlyViewedProvider } from './context/RecentlyViewedContext';
import { ResourcesProvider } from './context/ResourcesContext';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { HomePage } from './pages/Home/HomePage';
import { storeConfig } from './config/storeConfig';
import { CheckCircle2, X } from 'lucide-react';

const load = (importer: () => Promise<Record<string, React.ComponentType<any>>>, name: string) =>
  lazy(() => importer().then((module) => ({ default: module[name] })));

const CartDrawer = load(() => import('./components/CartDrawer/CartDrawer'), 'CartDrawer');
const HealthcareAssistantChat = load(() => import('./components/Chatbot/HealthcareAssistantChat'), 'HealthcareAssistantChat');
const ShopPage = load(() => import('./pages/Shop/ShopPage'), 'ShopPage');
const CategoriesPage = load(() => import('./pages/Category/CategoriesPage'), 'CategoriesPage');
const ProductDetailsPage = load(() => import('./pages/ProductDetails/ProductDetailsPage'), 'ProductDetailsPage');
const CartPage = load(() => import('./pages/Cart/CartPage'), 'CartPage');
const WishlistPage = load(() => import('./pages/Wishlist/WishlistPage'), 'WishlistPage');
const BulkOrdersPage = load(() => import('./pages/BulkOrders/BulkOrdersPage'), 'BulkOrdersPage');
const AccountPage = load(() => import('./pages/Account/AccountPage'), 'AccountPage');
const AboutPage = load(() => import('./pages/About/AboutPage'), 'AboutPage');
const WhyUsPage = load(() => import('./pages/WhyUs/WhyUsPage'), 'WhyUsPage');
const ContactPage = load(() => import('./pages/Contact/ContactPage'), 'ContactPage');
const ResourcesLandingPage = load(() => import('./pages/Resources/ResourcesLandingPage'), 'ResourcesLandingPage');
const ManualsPage = load(() => import('./pages/Resources/ManualsPage'), 'ManualsPage');
const SpecificationsPage = load(() => import('./pages/Resources/SpecificationsPage'), 'SpecificationsPage');
const BlogsListPage = load(() => import('./pages/Resources/BlogsListPage'), 'BlogsListPage');
const BlogDetailPage = load(() => import('./pages/Resources/BlogDetailPage'), 'BlogDetailPage');
const BuyingGuidesPage = load(() => import('./pages/Resources/BuyingGuidesPage'), 'BuyingGuidesPage');
const BuyingGuideDetailPage = load(() => import('./pages/Resources/BuyingGuideDetailPage'), 'BuyingGuideDetailPage');
const ProductKnowledgePage = load(() => import('./pages/Resources/ProductKnowledgePage'), 'ProductKnowledgePage');
const ProductKnowledgeDetailPage = load(() => import('./pages/Resources/ProductKnowledgeDetailPage'), 'ProductKnowledgeDetailPage');
const FaqsPage = load(() => import('./pages/Resources/FaqsPage'), 'FaqsPage');
const PolicyPage = load(() => import('./pages/Policies/PolicyPage'), 'PolicyPage');
const AdminResourcesPage = load(() => import('./pages/Admin/AdminResourcesPage'), 'AdminResourcesPage');

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

    const limit = window.innerHeight * 0.92;
    const alreadyVisible: HTMLElement[] = [];
    const pending: HTMLElement[] = [];
    nodes.forEach((node) => {
      const rect = node.getBoundingClientRect();
      if (rect.top < limit && rect.bottom > 0) alreadyVisible.push(node);
      else pending.push(node);
    });
    alreadyVisible.forEach((node) => node.classList.add('is-in'));
    pending.forEach((node) => observer.observe(node));

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

function SupportLauncher({ onChat }: { onChat: () => void }) {
  return (
    <div className="pointer-events-none fixed bottom-[4.75rem] right-3 z-40 flex flex-col items-end gap-3 lg:bottom-6 lg:right-6">
      <button
        type="button"
        onClick={onChat}
        className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-navy text-white shadow-modal"
        aria-label="Toggle Healthcare Assistant"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="2" aria-hidden="true">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </button>
      <a
        href={`https://wa.me/${storeConfig.whatsappNumber}?text=${encodeURIComponent('Hello Dr Surya Medicare, I would like to place an order or ask a question regarding medical supplies.')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-modal"
        title="Chat directly on WhatsApp"
        aria-label="Official WhatsApp Support"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6 fill-white" aria-hidden="true">
          <path d="M17.472 14.382c-.301-.15-1.78-.879-2.056-.98-.276-.1-.477-.15-.678.15-.2.301-.778.98-.954 1.18-.175.201-.351.226-.652.075-.301-.15-1.272-.469-2.423-1.495-.896-.799-1.501-1.786-1.677-2.087-.176-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.175.201-.301.301-.502.1-.201.05-.376-.025-.526-.075-.15-.678-1.634-.929-2.239-.245-.589-.494-.509-.678-.519-.176-.01-.376-.01-.577-.01-.201 0-.527.075-.803.376s-1.054 1.03-1.054 2.511 1.079 2.912 1.23 3.113c.15.201 2.122 3.24 5.141 4.544.718.31 1.279.496 1.716.635.722.23 1.378.197 1.898.12.58-.088 1.78-.727 2.03-1.43.251-.703.251-1.306.176-1.431-.076-.126-.277-.202-.578-.352zM12 21.6c-1.8 0-3.565-.486-5.111-1.408l-.367-.218-3.799.996 1.014-3.703-.239-.38A9.555 9.555 0 0 1 2.4 12c0-5.293 4.307-9.6 9.6-9.6 5.293 0 9.6 4.307 9.6 9.6 0 5.293-4.307 9.6-9.6 9.6zM12 0C5.373 0 0 5.373 0 12c0 2.115.549 4.16 1.594 5.968L0 24l6.236-1.636A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
        </svg>
      </a>
    </div>
  );
}

function DeferredChrome() {
  const { isCartDrawerOpen } = useCart();
  const [chatOn, setChatOn] = React.useState(false);

  return (
    <>
      {isCartDrawerOpen ? null : chatOn ? (
        <Suspense fallback={<SupportLauncher onChat={() => undefined} />}>
          <HealthcareAssistantChat startOpen />
        </Suspense>
      ) : (
        <SupportLauncher onChat={() => setChatOn(true)} />
      )}
      {isCartDrawerOpen ? (
        <Suspense fallback={null}>
          <CartDrawer />
        </Suspense>
      ) : null}
    </>
  );
}

function AppContent() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-ivory text-brand-body selection:bg-brand-emerald selection:text-white">
      <ScrollToTop />
      <RevealController />
      <Header />
      <main className="flex-1 pb-16 lg:pb-0">
        <Suspense fallback={<div className="min-h-[50vh]" />}>
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
          <Route path="/policies/shipping" element={<PolicyPage kind="shipping" />} />
          <Route path="/policies/returns" element={<PolicyPage kind="returns" />} />
          <Route path="/policies/privacy" element={<PolicyPage kind="privacy" />} />
          <Route path="/policies/terms" element={<PolicyPage kind="terms" />} />

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
        </Suspense>
      </main>
      <Footer />
      <DeferredChrome />
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
