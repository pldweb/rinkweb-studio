import React from 'react';
import { MessageSquare, Clock, Shield, BarChart3 } from 'lucide-react';

const reasons = [
  {
    id: 1,
    title: "Unlimited Messages",
    description: "Tidak ada batasan jumlah pesan yang dapat diproses oleh ChatBot kami. Layani pelanggan Anda tanpa khawatir tentang biaya tambahan per pesan.",
    icon: MessageSquare,
  },
  {
    id: 2,
    title: "1 WA 1 ChatBot",
    description: "Setiap nomor WhatsApp terhubung dengan satu ChatBot yang didedikasikan khusus untuk bisnis Anda, memastikan layanan yang konsisten dan personal.",
    icon: Clock,
  },
  {
    id: 3,
    title: "Dukungan Teknis",
    description: "Tim dukungan teknis kami siap membantu Anda dengan setup, konfigurasi, dan pemecahan masalah untuk memastikan ChatBot Anda berjalan optimal.",
    icon: Shield,
  },
  {
    id: 4,
    title: "Peningkatan Berkelanjutan",
    description: "ChatBot kami terus belajar dan meningkat dari setiap interaksi, memastikan layanan yang semakin baik dan akurat seiring waktu.",
    icon: BarChart3,
  },
];

const WhyChatBot: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50" id="why-chatbot">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-950 font-heading mb-4">
            Kenapa Harus <span className="text-primary">RinkChatBot</span>?
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-secondary-800/80 max-w-3xl mx-auto text-lg">
            Kami menawarkan solusi chatbot yang berbeda dari yang lain, dengan fokus pada kualitas dan kepuasan pelanggan.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {reasons.map((reason) => (
            <div key={reason.id} className="bg-white p-5 rounded-lg shadow-sm flex">
              <div className="mr-4 text-secondary-500">
                <reason.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2 text-secondary-900">
                  {reason.title}
                </h3>
                <p className="text-secondary-800/70">
                  {reason.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a 
            href="https://wa.me/62895365441554?text=Halo,%20saya%20tertarik%20dengan%20layanan%20Rinkweb%20Studio%0A%0ABisakah%20kita%20agendakan%20diskusi?" 
            className="inline-block bg-primary hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300"
          >
            Hubungi Kami Sekarang
          </a>
        </div>
      </div>
    </section>
  );
};

export default WhyChatBot;