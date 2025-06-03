import React, { useState } from 'react';
import { Check, X, Sparkles } from 'lucide-react';

const packages = [
  {
    id: 1,
    name: "Rink Starter",
    description: "Cocok untuk memulai branding di website",
    price: "Rp3.8 Jt",
    features: [
      { text: "UI/UX Eye Catching", included: true },
      { text: "Mobile-friendly design", included: true },
      { text: "Konfigurasi SEO", included: true },
      { text: "Google Analytics", included: true },
      { text: "Embed Postingan Media Sosial", included: true },
      { text: "5 Halaman Tambahan", included: true },
      { text: "Waktu pembuatan ±10 hari kerja", included: true },
      { text: "Premium support", included: false },
      { text: "Manajemen Artikel", included: false },
      { text: "Manajemen penjualan", included: false },
      { text: "Manajemen pembayaran", included: false },
      { text: "Request fitur tambahan (+300rb)", included: false },
    ]
  },
  {
    id: 2,
    name: "Rink Medium",
    description: "Cocok untuk bisnis yang ingin brandingnnya dikenal",
    price: "Rp4.8 Jt",
    features: [
      { text: "UI/UX Eye Catching", included: true },
      { text: "Mobile-friendly design", included: true },
      { text: "Konfigurasi SEO", included: true },
      { text: "Google Analytics", included: true },
      { text: "Embed Postingan Media Sosial", included: true },
      { text: "8 Halaman Tambahan", included: true },
      { text: "Waktu pembuatan ±12 hari kerja", included: true },
      { text: "Premium support", included: true },
      { text: "Manajemen Artikel", included: true },
      { text: "Manajemen penjualan", included: true },
      { text: "Manajemen pembayaran", included: false },
      { text: "Request fitur tambahan (+300rb)", included: false },
    ],
    popular: true
  },
  {
    id: 3,
    name: "Rink Expert",
    description: "Cocok untuk bisnis yang ingin seluruhnya dikenal",
    price: "Rp5.5 Jt",
    features: [
      { text: "UI/UX Eye Catching", included: true },
      { text: "Mobile-friendly design", included: true },
      { text: "Konfigurasi SEO", included: true },
      { text: "Google Analytics", included: true },
      { text: "Embed Postingan Media Sosial", included: true },
      { text: "10 Halaman Tambahan", included: true },
      { text: "Waktu pembuatan ±14 hari kerja", included: true },
      { text: "Premium support", included: true },
      { text: "Manajemen Artikel", included: true },
      { text: "Manajemen penjualan", included: true },
      { text: "Manajemen pembayaran", included: true },
      { text: "Request fitur tambahan (+300rb)", included: true },
    ]
  },
  {
    id: 4,
    name: "Rink Custom",
    description: "Ingin punya website atau aplikasi custom? diskusikan segera dengan kami",
    price: "Custom",
    features: [
      { text: "UI/UX Custom", included: true },
      { text: "Mobile-friendly design", included: true },
      { text: "Konfigurasi SEO", included: true },
      { text: "Google Analytics", included: true },
      { text: "Embed Postingan Media Sosial", included: true },
      { text: "Unlimited Halaman Tambahan", included: true },
      { text: "Waktu pembuatan kondisional", included: true },
      { text: "Eksklusif support", included: true },
      { text: "Manajemen Artikel", included: true },
      { text: "Manajemen penjualan", included: true },
      { text: "Manajemen pembayaran", included: true },
    ],
    custom: true
  }
];

const PackagesSection: React.FC = () => {
  const [hoveredPackage, setHoveredPackage] = useState<number | null>(null);

  return (
    <section className="py-20 bg-white" id="pricing">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-950 font-heading mb-4">
            <span className="text-primary">Harga Paket</span> Website Branding
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-secondary-800/80 max-w-3xl mx-auto text-lg">
            Pilih paket yang sesuai dengan keinginan Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {packages.map((pkg) => (
            <div 
              key={pkg.id}
              className={`rounded-xl overflow-hidden transition-all duration-300 ${
                pkg.popular 
                  ? 'shadow-xl border-2 border-primary scale-105 relative z-10' 
                  : pkg.custom 
                    ? 'shadow-lg border border-secondary-200 bg-gradient-to-br from-secondary-900 to-secondary-950' 
                    : 'shadow-lg border border-gray-200 hover:shadow-xl'
              } ${
                hoveredPackage === pkg.id ? 'transform -translate-y-2' : ''
              }`}
              onMouseEnter={() => setHoveredPackage(pkg.id)}
              onMouseLeave={() => setHoveredPackage(null)}
            >
              {pkg.popular && (
                <div className="bg-primary text-white text-center py-2 text-sm font-medium">
                  Most Popular
                </div>
              )}
              
              <div className={`p-8 ${pkg.custom ? 'text-white' : ''}`}>
                <div className="flex justify-between items-start mb-4">
                  <h3 className={`text-2xl font-bold ${pkg.custom ? 'text-white' : 'text-secondary-900'} font-heading`}>
                    {pkg.name}
                  </h3>
                  {pkg.custom && <Sparkles className="w-6 h-6 text-primary" />}
                </div>
                <p className={`mb-6 ${pkg.custom ? 'text-white/80' : 'text-secondary-800/70'}`}>
                  {pkg.description}
                </p>
                <div className="mb-8">
                  <span className={`text-3xl font-bold ${pkg.custom ? 'text-primary-300' : 'text-primary'}`}>
                    {pkg.price}
                  </span>
                  {!pkg.custom && <span className="text-secondary-800/70 ml-1">/project</span>}
                </div>
                
                <div className="space-y-3 mb-8">
                  {pkg.features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      {feature.included ? (
                        <Check className={`w-5 h-5 mr-3 mt-0.5 flex-shrink-0 ${pkg.custom ? 'text-primary-300' : 'text-primary'}`} />
                      ) : (
                        <X className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-gray-400" />
                      )}
                      <span className={`${
                        feature.included 
                          ? pkg.custom ? 'text-white/90' : 'text-secondary-800' 
                          : 'text-gray-400'
                      }`}>
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>
                
                <button 
                  className={`w-full py-3 rounded-md font-medium transition-all duration-200 ${
                    pkg.custom 
                      ? 'bg-white text-secondary-950 hover:bg-gray-100' 
                      : pkg.popular 
                        ? 'bg-primary hover:bg-primary-600 text-white' 
                        : 'bg-secondary-950 hover:bg-secondary-900 text-white'
                  }`}
                >
                  {pkg.custom ? 'Lakukan Penawaran' : 'Pilih Paket'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;