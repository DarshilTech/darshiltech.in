import { siteConfig } from './site-config';

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteConfig.name,
  legalName: 'DarshilTech',
  url: siteConfig.url,
  logo: `${siteConfig.url}/logo.png`,
  description: siteConfig.description,
  email: siteConfig.email,
  founder: {
    '@type': 'Person',
    name: siteConfig.author,
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Ahmedabad',
    addressRegion: 'Maharashtra',
    addressCountry: 'IN',
  },
  sameAs: [
    siteConfig.social.github,
    siteConfig.social.linkedin,
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    email: siteConfig.email,
    availableLanguage: ['English'],
  },
};

export const professionalServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: siteConfig.name,
  image: siteConfig.ogImage,
  '@id': siteConfig.url,
  url: siteConfig.url,
  telephone: '',
  priceRange: '$$$',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Ahmedabad',
    addressRegion: 'Maharashtra',
    addressCountry: 'IN',
  },
  description: siteConfig.description,
  serviceType: [
    'Magento Development',
    'Adobe Commerce',
    'Hyvä Development',
    'Headless Commerce',
    'Performance Optimization',
    'API Architecture',
    'AI Automation',
    'Technical Consulting',
    'System Architecture',
  ],
  areaServed: {
    '@type': 'Place',
    name: 'Worldwide',
  },
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  publisher: {
    '@type': 'Organization',
    name: siteConfig.name,
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: `${siteConfig.url}/insights?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: siteConfig.author,
  jobTitle: 'Founding Engineer',
  worksFor: {
    '@type': 'Organization',
    name: siteConfig.name,
  },
  url: siteConfig.url,
  email: siteConfig.email,
  knowsAbout: [
    'Magento',
    'Adobe Commerce',
    'Hyvä',
    'Golang',
    'Headless Commerce',
    'System Architecture',
    'Performance Optimization',
    'AI Automation',
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Ahmedabad',
    addressCountry: 'IN',
  },
};

export const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: siteConfig.url,
    },
  ],
};

export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What does DarshilTech specialize in?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'DarshilTech specializes in scalable commerce architecture using Magento, Adobe Commerce, Hyvä, Golang, headless systems, and AI automation for enterprise teams.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you work with international clients?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. DarshilTech is based in Ahmedabad but operates remote-first and works with software teams globally.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does a typical engagement take?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A full architecture-to-launch engagement runs roughly 12–22 weeks depending on scope. Advisory and architecture reviews can be completed in 2–3 weeks.',
      },
    },
  ],
};
