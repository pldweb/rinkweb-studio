import React from 'react';
import { ArrowRight } from 'lucide-react';

const wa: string = "https://wa.me/62895365441554";

const HeroChatBot: React.FC = () => {
  return (
    <section className="relative pt-[7.5rem] pb-20 bg-secondary-950 text-white" id="chatbot-hero">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              ChatBot Rinkweb Studio
            </h1>
            <p className="text-xl mb-8 text-white/90 max-w-xl">
              Solusi AI Chatbot untuk Bisnis Anda. Tingkatkan layanan pelanggan dan efisiensi operasional dengan chatbot pintar yang tersedia 24/7.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href={wa} 
                className="bg-primary hover:bg-gray-100 text-white px-6 py-3 rounded-md font-medium transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center max-w-fit"
              >
                Konsultasi Gratis
                <ArrowRight className="ml-2 w-4 h-4" />
              </a>
              <a 
                href="#fitur" 
                className="bg-transparent hover:bg-white/10 text-white border border-white px-6 py-3 rounded-md font-medium transition-all duration-200 flex items-center justify-center max-w-fit"
              >
                Lihat Fitur
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="rounded-lg overflow-hidden shadow-2xl bg-white p-4">
              <img 
                src="https://images.pexels.com/photos/7709087/pexels-photo-7709087.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="AI Chatbot Interface" 
                className="w-full h-auto rounded"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white text-secondary-950 p-4 rounded-lg shadow-xl hidden md:block">
              <div className="flex items-center">
                <div>
                  <p className="text-sm font-medium opacity-80">Tersedia 24/7</p>
                  <p className="text-2xl font-bold">Support Non-Stop</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroChatBot;