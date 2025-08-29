import React from 'react';

const CallToActionChatBot: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-primary-500 to-secondary-600 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">Siap Meningkatkan Bisnis Anda dengan ChatBot?</h2>
        <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
          Mulai perjalanan Anda menuju layanan pelanggan yang lebih baik dan efisiensi operasional yang lebih tinggi.
        </p>
        <a 
          href="/hubungi" 
          className="inline-block bg-white hover:bg-gray-100 text-secondary-600 font-medium py-3 px-8 rounded-lg transition duration-300 shadow-lg"
        >
          Hubungi Kami Sekarang
        </a>
      </div>
    </section>
  );
};

export default CallToActionChatBot;