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
          <h1 className="text-4xl font-bold text-center mb-8">Tentang Rinkweb Studio</h1>
          
          <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-semibold mb-4">Siapa Kami</h2>
            <p className="mb-4">
              Rinkweb Studio adalah studio pengembangan web profesional yang berfokus pada pembuatan website 
              dan aplikasi web yang modern, responsif, dan berkinerja tinggi untuk bisnis dan individu.
            </p>
            <p className="mb-4">
              Didirikan dengan visi untuk membantu bisnis memanfaatkan kekuatan teknologi web, kami telah 
              membantu banyak klien dari berbagai industri untuk membangun kehadiran online yang kuat dan efektif.
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