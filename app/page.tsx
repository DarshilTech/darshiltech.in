import type { Metadata } from 'next';
import SmoothScroll from '@/components/SmoothScroll';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Expertise from '@/components/Expertise';
import Philosophy from '@/components/Philosophy';
import Process from '@/components/Process';
import Insights from '@/components/Insights';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { siteConfig } from '@/lib/site-config';

// Page-specific metadata (overrides root layout for fine-grained SEO control)
export const metadata: Metadata = {
  title: 'DarshilTech — Software Scalable Digital Commerce Systems',
  description: siteConfig.description,
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: 'DarshilTech — Software Scalable Digital Commerce Systems',
    description: siteConfig.description,
    url: siteConfig.url,
    type: 'website',
  },
};

export default function HomePage() {
  return (
    <>
      <SmoothScroll />
      <Nav />
      <main>
        <Hero />
        <Expertise />
        <Philosophy />
        <Process />
        <Insights />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
