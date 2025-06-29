import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Github } from 'lucide-react';
import pribadi from '../assets/my-profile.png';

const OwnerSection: React.FC = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={pribadi} 
                  alt="Muhammad Rivaldi Fanani - Founder & CEO" 
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-xl">
                <div className="flex space-x-3">
                  {/* <a 
                    href="https://facebook.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-secondary-950 text-white hover:bg-primary transition-colors duration-200 w-10 h-10 rounded-full flex items-center justify-center"
                  >
                    <Facebook className="w-5 h-5" />
                  </a> */}
                  <a 
                    href="https://instagram.com/rivaldipostman" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-secondary-950 text-white hover:bg-primary transition-colors duration-200 w-10 h-10 rounded-full flex items-center justify-center"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/muhammad-rivaldi-fanani-550772318/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-secondary-950 text-white hover:bg-primary transition-colors duration-200 w-10 h-10 rounded-full flex items-center justify-center"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-secondary-950 font-heading mb-6">
                Meet Our <span className="text-primary">Founder</span>
              </h2>
              <div className="w-24 h-1 bg-primary mb-8"></div>
              
              <h3 className="text-2xl font-bold text-secondary-900 mb-2">Muhammad Rivaldi Fanani</h3>
              <p className="text-primary font-medium mb-6">Founder & CEO</p>
              
              <p className="text-secondary-800/80 mb-6">
                Pembelajar dengan pengalaman lebih dari 4 tahun di bidang pengembangan website dan transformasi digital, kami telah berkontribusi pada berbagai projek sukses untuk banyak bisnis.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OwnerSection;