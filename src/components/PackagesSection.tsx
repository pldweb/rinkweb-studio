import React, { useState } from 'react';
import { Check, X, Sparkles } from 'lucide-react';

const packages = [
  {
    id: 1,
    name: "Basic",
    description: "Cocok untuk brand baru",
    price: "Rp3.2 Jt",
    features: [
      { text: "5-page responsive website", included: true },
      { text: "Mobile-friendly design", included: true },
      { text: "Contact form", included: true },
      { text: "Basic SEO setup", included: true },
      { text: "Social media integration", included: true },
      { text: "Content management system", included: false },
      { text: "E-commerce functionality", included: false },
      { text: "Custom animations", included: false },
      { text: "Premium support", included: false },
    ]
  },
  {
    id: 2,
    name: "Standard",
    description: "Our most popular package for growing businesses",
    price: "$1,499",
    features: [
      { text: "10-page responsive website", included: true },
      { text: "Mobile-friendly design", included: true },
      { text: "Contact form", included: true },
      { text: "Advanced SEO setup", included: true },
      { text: "Social media integration", included: true },
      { text: "Content management system", included: true },
      { text: "Basic analytics integration", included: true },
      { text: "Custom animations", included: false },
      { text: "Premium support", included: false },
    ],
    popular: true
  },
  {
    id: 3,
    name: "Premium",
    description: "For businesses requiring advanced functionality",
    price: "$2,999",
    features: [
      { text: "15-page responsive website", included: true },
      { text: "Mobile-friendly design", included: true },
      { text: "Contact form", included: true },
      { text: "Advanced SEO setup", included: true },
      { text: "Social media integration", included: true },
      { text: "Content management system", included: true },
      { text: "E-commerce functionality", included: true },
      { text: "Custom animations", included: true },
      { text: "Premium support", included: true },
    ]
  },
  {
    id: 4,
    name: "Custom",
    description: "Tailored solutions for unique business requirements",
    price: "Custom",
    features: [
      { text: "Unlimited pages", included: true },
      { text: "Custom design & development", included: true },
      { text: "Advanced functionality", included: true },
      { text: "Priority support", included: true },
      { text: "Dedicated project manager", included: true },
      { text: "Ongoing maintenance available", included: true },
      { text: "Performance optimization", included: true },
      { text: "Training & documentation", included: true },
      { text: "Future-proof scalability", included: true },
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
            Choose the perfect web development package for your business needs and budget.
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
                  {pkg.custom ? 'Request Quote' : 'Get Started'}
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