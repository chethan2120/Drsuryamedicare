import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import {
  BlogPost,
  BuyingGuide,
  ProductKnowledgeArticle,
  FaqItem,
  ManualDocument,
} from '../types/resources';

function readSaved<T>(key: string): T[] | null {
  try {
    const saved = localStorage.getItem(key);
    return saved ? (JSON.parse(saved) as T[]) : null;
  } catch {
    return null;
  }
}

interface ResourcesContextType {
  // Blogs
  blogs: BlogPost[];
  getBlogBySlug: (slug: string) => BlogPost | undefined;
  saveBlogPost: (post: BlogPost) => void;
  deleteBlogPost: (id: string) => void;
  toggleBlogDraft: (id: string) => void;

  // Buying Guides
  buyingGuides: BuyingGuide[];
  getGuideBySlug: (slug: string) => BuyingGuide | undefined;
  saveBuyingGuide: (guide: BuyingGuide) => void;
  deleteBuyingGuide: (id: string) => void;

  // Product Knowledge
  knowledgeArticles: ProductKnowledgeArticle[];
  getKnowledgeBySlug: (slug: string) => ProductKnowledgeArticle | undefined;
  saveKnowledgeArticle: (article: ProductKnowledgeArticle) => void;
  deleteKnowledgeArticle: (id: string) => void;

  // FAQs
  faqs: FaqItem[];
  saveFaq: (faq: FaqItem) => void;
  deleteFaq: (id: string) => void;

  // Manuals
  manuals: ManualDocument[];
  saveManual: (manual: ManualDocument) => void;
  deleteManual: (id: string) => void;

  // Reset to default data
  resetResourcesData: () => void;
}

const ResourcesContext = createContext<ResourcesContextType | undefined>(undefined);

export const ResourcesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const libraryReady = useRef(false);
  const defaults = useRef<{
    initialBlogs: BlogPost[];
    initialBuyingGuides: BuyingGuide[];
    initialProductKnowledge: ProductKnowledgeArticle[];
    initialFaqs: FaqItem[];
    initialManuals: ManualDocument[];
  } | null>(null);

  const [blogs, setBlogs] = useState<BlogPost[]>(() => readSaved<BlogPost>('dsm_resources_blogs') ?? []);
  const [buyingGuides, setBuyingGuides] = useState<BuyingGuide[]>(() => readSaved<BuyingGuide>('dsm_resources_guides') ?? []);
  const [knowledgeArticles, setKnowledgeArticles] = useState<ProductKnowledgeArticle[]>(
    () => readSaved<ProductKnowledgeArticle>('dsm_resources_knowledge') ?? [],
  );
  const [faqs, setFaqs] = useState<FaqItem[]>(() => readSaved<FaqItem>('dsm_resources_faqs') ?? []);
  const [manuals, setManuals] = useState<ManualDocument[]>(() => readSaved<ManualDocument>('dsm_resources_manuals') ?? []);

  const needsLibrary = /^\/(resources|admin|faqs)(\/|$)/.test(location.pathname);

  useEffect(() => {
    if (!needsLibrary) return;
    let cancelled = false;
    const hasSaved = ['dsm_resources_blogs', 'dsm_resources_guides', 'dsm_resources_knowledge', 'dsm_resources_faqs', 'dsm_resources_manuals']
      .every((key) => localStorage.getItem(key));

    import('../data/resourcesData').then((data) => {
      if (cancelled) return;
      defaults.current = data;
      if (!hasSaved) {
        setBlogs(data.initialBlogs);
        setBuyingGuides(data.initialBuyingGuides);
        setKnowledgeArticles(data.initialProductKnowledge);
        setFaqs(data.initialFaqs);
        setManuals(data.initialManuals);
      }
      libraryReady.current = true;
    });

    return () => {
      cancelled = true;
    };
  }, [needsLibrary]);

  useEffect(() => {
    if (!libraryReady.current) return;
    localStorage.setItem('dsm_resources_blogs', JSON.stringify(blogs));
  }, [blogs]);

  useEffect(() => {
    if (!libraryReady.current) return;
    localStorage.setItem('dsm_resources_guides', JSON.stringify(buyingGuides));
  }, [buyingGuides]);

  useEffect(() => {
    if (!libraryReady.current) return;
    localStorage.setItem('dsm_resources_knowledge', JSON.stringify(knowledgeArticles));
  }, [knowledgeArticles]);

  useEffect(() => {
    if (!libraryReady.current) return;
    localStorage.setItem('dsm_resources_faqs', JSON.stringify(faqs));
  }, [faqs]);

  useEffect(() => {
    if (!libraryReady.current) return;
    localStorage.setItem('dsm_resources_manuals', JSON.stringify(manuals));
  }, [manuals]);

  // Blog operations
  const getBlogBySlug = (slug: string) => {
    return blogs.find((b) => b.slug.toLowerCase() === slug.toLowerCase());
  };

  const saveBlogPost = (post: BlogPost) => {
    setBlogs((prev) => {
      const idx = prev.findIndex((b) => b.id === post.id);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = { ...post, updatedAt: new Date().toISOString().split('T')[0] };
        return updated;
      }
      return [post, ...prev];
    });
  };

  const deleteBlogPost = (id: string) => {
    setBlogs((prev) => prev.filter((b) => b.id !== id));
  };

  const toggleBlogDraft = (id: string) => {
    setBlogs((prev) =>
      prev.map((b) => (b.id === id ? { ...b, isDraft: !b.isDraft } : b))
    );
  };

  // Buying Guides operations
  const getGuideBySlug = (slug: string) => {
    return buyingGuides.find((g) => g.slug.toLowerCase() === slug.toLowerCase());
  };

  const saveBuyingGuide = (guide: BuyingGuide) => {
    setBuyingGuides((prev) => {
      const idx = prev.findIndex((g) => g.id === guide.id);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = guide;
        return updated;
      }
      return [guide, ...prev];
    });
  };

  const deleteBuyingGuide = (id: string) => {
    setBuyingGuides((prev) => prev.filter((g) => g.id !== id));
  };

  // Knowledge Articles operations
  const getKnowledgeBySlug = (slug: string) => {
    return knowledgeArticles.find((k) => k.slug.toLowerCase() === slug.toLowerCase());
  };

  const saveKnowledgeArticle = (article: ProductKnowledgeArticle) => {
    setKnowledgeArticles((prev) => {
      const idx = prev.findIndex((k) => k.id === article.id);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = article;
        return updated;
      }
      return [article, ...prev];
    });
  };

  const deleteKnowledgeArticle = (id: string) => {
    setKnowledgeArticles((prev) => prev.filter((k) => k.id !== id));
  };

  // FAQs operations
  const saveFaq = (faq: FaqItem) => {
    setFaqs((prev) => {
      const idx = prev.findIndex((f) => f.id === faq.id);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = faq;
        return updated;
      }
      return [...prev, faq];
    });
  };

  const deleteFaq = (id: string) => {
    setFaqs((prev) => prev.filter((f) => f.id !== id));
  };

  // Manuals operations
  const saveManual = (manual: ManualDocument) => {
    setManuals((prev) => {
      const idx = prev.findIndex((m) => m.id === manual.id);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = manual;
        return updated;
      }
      return [manual, ...prev];
    });
  };

  const deleteManual = (id: string) => {
    setManuals((prev) => prev.filter((m) => m.id !== id));
  };

  const resetResourcesData = () => {
    const apply = (data: NonNullable<typeof defaults.current>) => {
      setBlogs(data.initialBlogs);
      setBuyingGuides(data.initialBuyingGuides);
      setKnowledgeArticles(data.initialProductKnowledge);
      setFaqs(data.initialFaqs);
      setManuals(data.initialManuals);
      libraryReady.current = true;
    };
    if (defaults.current) {
      apply(defaults.current);
      return;
    }
    import('../data/resourcesData').then((data) => {
      defaults.current = data;
      apply(data);
    });
  };

  return (
    <ResourcesContext.Provider
      value={{
        blogs,
        getBlogBySlug,
        saveBlogPost,
        deleteBlogPost,
        toggleBlogDraft,
        buyingGuides,
        getGuideBySlug,
        saveBuyingGuide,
        deleteBuyingGuide,
        knowledgeArticles,
        getKnowledgeBySlug,
        saveKnowledgeArticle,
        deleteKnowledgeArticle,
        faqs,
        saveFaq,
        deleteFaq,
        manuals,
        saveManual,
        deleteManual,
        resetResourcesData,
      }}
    >
      {children}
    </ResourcesContext.Provider>
  );
};

export const useResources = () => {
  const context = useContext(ResourcesContext);
  if (!context) {
    throw new Error('useResources must be used within a ResourcesProvider');
  }
  return context;
};
