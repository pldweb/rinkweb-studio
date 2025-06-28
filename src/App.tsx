import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import WorkflowSection from './components/WorkflowSection';
import PackagesSection from './components/PackagesSection';
import PortfolioSection from './components/PortfolioSection';
import ArticlesSection from './components/ArticlesSection';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import OwnerSection from './components/Owner';
import FAQSection from './components/FaqSection';
import WhatsAppChatButton from './components/WaButton';
import LastSection from './components/LastSection';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <WorkflowSection />
        <PackagesSection />
        <PortfolioSection />
        <OwnerSection />
        <FAQSection />
        <LastSection />
        {/* <ArticlesSection /> */}
        <WhatsAppChatButton />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default App;