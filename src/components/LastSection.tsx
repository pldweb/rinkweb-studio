import React, { FC } from 'react';
import { MessageSquareText } from 'lucide-react'; 

const ConsultationCTASection: FC = () => {
  const phoneNumber = '62895365441554'; 
  const ctaMessage = 'Halo Rinkweb Studio, saya tertarik untuk konsultasi pembuatan website. Bisakah kita jadwalkan diskusi lebih lanjut?';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(ctaMessage)}`;

  return (
    <section id="consultation-cta" className="py-20 text-secondary-950 text-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          Siap Wujudkan Website Anda?
        </h2>
        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-10 opacity-90 text-secondary-950">
          Konsultasi gratis dengan ahlinya untuk merancang strategi website yang sesuai dengan tujuan bisnis Anda. Mari diskusikan!
        </p>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center bg-primary text-white font-bold px-8 py-4 rounded-full text-lg shadow-xl hover:bg-secondary-950 hover:scale-105 transition-all duration-300"
          aria-label="Jadwalkan Konsultasi Gratis via WhatsApp"
        >
          <MessageSquareText className="w-6 h-6 mr-3" />
          Jadwalkan Konsultasi
        </a>
      </div>
    </section>
  );
};

export default ConsultationCTASection;