import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import WorkflowSection from '../components/WorkflowSection';
import PackagesSection from '../components/PackagesSection';
import PortfolioSection from '../components/PortfolioSection';
import OwnerSection from '../components/Owner';
import FAQSection from '../components/FaqSection';
import LastSection from '../components/LastSection';
import WhatsAppChatButton from '../components/WaButton';
import SEO from '../components/SEO';

const Home: React.FC = () => {
  return (
    <>
      <SEO 
        title="Beranda"
        description="Rinkweb Studio adalah jasa website desain untuk menaikkan branding bisnis Anda. Kami menyediakan layanan pembuatan website profesional dengan harga terjangkau."
        keywords="Digital Agency, Social Agency, Jasa Branding, Jasa Website, Website Desain, Pembuatan Website, Web Design, Branding Bisnis"
        canonicalUrl="https://rinkweb.studio"
      />
      <main>
        <HeroSection />
        <AboutSection />
        <WorkflowSection />
        <PortfolioSection />
        <PackagesSection />
        <OwnerSection />
        <FAQSection />
        <LastSection />
        <WhatsAppChatButton />
      </main>
    </>
  );
};

export default Home;