import React from 'react';
import WhatsAppChatButton from '../components/WaButton';
import SEO from '../components/SEO';

const About: React.FC = () => {
  return (
    <>
      <SEO 
        title="Tentang Kami"
        description="Rinkweb Studio adalah studio pengembangan web profesional yang berfokus pada pembuatan website dan aplikasi web yang modern, responsif, dan berkinerja tinggi untuk bisnis dan individu."
        keywords="Tentang Rinkweb Studio, Jasa Website, Web Development, Pengembangan Web, Visi Misi, Nilai Perusahaan"
        canonicalUrl="https://rinkweb.studio/tentang"
      />
      <main>
        <div className="container mx-auto px-4 pt-[7.5rem] pb-[5rem]">
          <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 text-secondary-900">Tentang <span className='text-primary'>Rinkweb Studio</span></h1>
          
          <div className="bg-secondary p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl text-white font-semibold mb-4">Siapa Kami</h2>
            <p className="mb-4 text-white">
              Rinkweb Studio adalah studio pengembangan web profesional yang berfokus pada pembuatan website 
               branding yang modern, responsif, dan profesional untuk bisnis dan individu.
            </p>
          </div>
          </div>
        </div>
        <WhatsAppChatButton />
      </main>
    </>
  );
};

export default About;