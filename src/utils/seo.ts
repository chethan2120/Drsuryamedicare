/**
 * Lightweight client-side SEO and Schema.org metadata helper
 */

interface SeoConfig {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  schema?: Record<string, unknown>;
}

export function updatePageSeo({
  title,
  description,
  canonicalUrl,
  ogImage = '/banners/icu-critical-care.jpg',
  ogType = 'website',
  publishedTime,
  modifiedTime,
  author = 'Dr Surya Medicare',
  schema,
}: SeoConfig) {
  // Document title
  const fullTitle = title.includes('Dr Surya Medicare') ? title : `${title} | Dr Surya Medicare`;
  document.title = fullTitle;

  // Helper for meta tags
  const setMetaTag = (attrName: string, attrVal: string, content: string) => {
    let elem = document.querySelector(`meta[${attrName}="${attrVal}"]`);
    if (!elem) {
      elem = document.createElement('meta');
      elem.setAttribute(attrName, attrVal);
      document.head.appendChild(elem);
    }
    elem.setAttribute('content', content);
  };

  // Standard metadata
  setMetaTag('name', 'description', description);
  setMetaTag('name', 'author', author);

  // Open Graph
  setMetaTag('property', 'og:title', fullTitle);
  setMetaTag('property', 'og:description', description);
  setMetaTag('property', 'og:type', ogType);
  setMetaTag('property', 'og:image', ogImage);
  setMetaTag('property', 'og:site_name', 'Dr Surya Medicare');

  const currentUrl = canonicalUrl || window.location.href;
  setMetaTag('property', 'og:url', currentUrl);

  // Canonical tag
  let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute('href', currentUrl);

  // Twitter card
  setMetaTag('name', 'twitter:card', 'summary_large_image');
  setMetaTag('name', 'twitter:title', fullTitle);
  setMetaTag('name', 'twitter:description', description);
  setMetaTag('name', 'twitter:image', ogImage);

  // Article specific tags
  if (ogType === 'article') {
    if (publishedTime) setMetaTag('property', 'article:published_time', publishedTime);
    if (modifiedTime) setMetaTag('property', 'article:modified_time', modifiedTime);
    if (author) setMetaTag('property', 'article:author', author);
  }

  // Schema.org JSON-LD structured data injection
  const existingScript = document.getElementById('page-structured-data');
  if (existingScript) {
    existingScript.remove();
  }

  if (schema) {
    const script = document.createElement('script');
    script.id = 'page-structured-data';
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
  }
}
