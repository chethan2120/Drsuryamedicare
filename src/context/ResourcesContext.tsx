import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  BlogPost,
  BuyingGuide,
  ProductKnowledgeArticle,
  FaqItem,
  ManualDocument,
} from '../types/resources';
import {
  initialBlogs,
  initialBuyingGuides,
  initialProductKnowledge,
  initialFaqs,
  initialManuals,
} from '../data/resourcesData';

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
  const [blogs, setBlogs] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem('dsm_resources_blogs');
    return saved ? JSON.parse(saved) : initialBlogs;
  });

  const [buyingGuides, setBuyingGuides] = useState<BuyingGuide[]>(() => {
    const saved = localStorage.getItem('dsm_resources_guides');
    return saved ? JSON.parse(saved) : initialBuyingGuides;
  });

  const [knowledgeArticles, setKnowledgeArticles] = useState<ProductKnowledgeArticle[]>(() => {
    const saved = localStorage.getItem('dsm_resources_knowledge');
    return saved ? JSON.parse(saved) : initialProductKnowledge;
  });

  const [faqs, setFaqs] = useState<FaqItem[]>(() => {
    const saved = localStorage.getItem('dsm_resources_faqs');
    return saved ? JSON.parse(saved) : initialFaqs;
  });

  const [manuals, setManuals] = useState<ManualDocument[]>(() => {
    const saved = localStorage.getItem('dsm_resources_manuals');
    return saved ? JSON.parse(saved) : initialManuals;
  });

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('dsm_resources_blogs', JSON.stringify(blogs));
  }, [blogs]);

  useEffect(() => {
    localStorage.setItem('dsm_resources_guides', JSON.stringify(buyingGuides));
  }, [buyingGuides]);

  useEffect(() => {
    localStorage.setItem('dsm_resources_knowledge', JSON.stringify(knowledgeArticles));
  }, [knowledgeArticles]);

  useEffect(() => {
    localStorage.setItem('dsm_resources_faqs', JSON.stringify(faqs));
  }, [faqs]);

  useEffect(() => {
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
    setBlogs(initialBlogs);
    setBuyingGuides(initialBuyingGuides);
    setKnowledgeArticles(initialProductKnowledge);
    setFaqs(initialFaqs);
    setManuals(initialManuals);
    localStorage.removeItem('dsm_resources_blogs');
    localStorage.removeItem('dsm_resources_guides');
    localStorage.removeItem('dsm_resources_knowledge');
    localStorage.removeItem('dsm_resources_faqs');
    localStorage.removeItem('dsm_resources_manuals');
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
