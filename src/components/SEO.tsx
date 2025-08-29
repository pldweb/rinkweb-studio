import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  canonicalUrl?: string;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description = 'Rinkweb Studio adalah jasa website desain untuk menaikkan branding bisnis Anda',
  keywords = 'Digital Agency, Social Agency, Jasa Branding, Jasa Website, Website Desain',
  ogTitle,
  ogDescription,
  ogImage = 'https://i.imghippo.com/files/rCWK3772DUA.png',
  ogUrl,
  twitterTitle,
  twitterDescription,
  twitterImage = 'https://i.imghippo.com/files/rCWK3772DUA.png',
  canonicalUrl,
}) => {
  const siteTitle = `${title} | Rinkweb Studio`;
  
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={ogTitle || siteTitle} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:image" content={ogImage} />
      {ogUrl && <meta property="og:url" content={ogUrl} />}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Rinkweb Studio" />
      <meta property="og:locale" content="id_ID" />
      
      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={twitterTitle || ogTitle || siteTitle} />
      <meta name="twitter:description" content={twitterDescription || ogDescription || description} />
      <meta name="twitter:image" content={twitterImage || ogImage} />
    </Helmet>
  );
};

export default SEO;