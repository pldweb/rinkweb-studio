import React from 'react';
import { MessageSquare, Clock, BarChart3, Settings, Bot, Zap, FileText } from 'lucide-react';

const features = [
  {
    id: 1,
    title: "Respon Cepat",
    description: "Jawaban instan untuk pertanyaan pelanggan, tersedia 24/7 tanpa waktu tunggu.",
    icon: Zap,
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    id: 2,
    title: "Integrasi WhatsApp",
    description: "Terhubung langsung dengan WhatsApp Business API untuk komunikasi yang lancar.",
    icon: MessageSquare,
    color: "bg-green-100 text-green-600",
  },
  {
    id: 3,
    title: "Layanan 24/7",
    description: "Chatbot Anda tidak pernah tidur, memberikan dukungan pelanggan sepanjang waktu.",
    icon: Clock,
    color: "bg-secondary-100 text-secondary-600",
  },
  {
    id: 4,
    title: "Knowledge berbasis PDF, Excel, Docs",
    description: "Chatbot dapat mengakses dan memanfaatkan informasi dari berbagai format file, seperti PDF, Excel, dan Docs.",
    icon: FileText,
    color: "bg-primary-100 text-primary-600",
  },
  {
    id: 5,
    title: "Jawaban Natural dan Akurat",
    description: "Chatbot memberikan jawaban yang natural dan akurat, memberikan kesan seperti manusia.",
    icon: Settings,
    color: "bg-primary-100 text-primary-600",
  },
  {
    id: 6,
    title: "AI Canggih",
    description: "Didukung teknologi AI terkini untuk memberikan jawaban yang akurat dan relevan.",
    icon: Bot,
    color: "bg-primary-100 text-primary-600",
  },
];

const FeaturesChatBot: React.FC = () => {
  return (
    <section className="py-20 bg-white" id="fitur">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-950 font-heading mb-4">
            Fitur <span className="text-primary">Utama</span> RinkChatBot
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-secondary-800/80 max-w-3xl mx-auto text-lg">
            RinkChatBot dilengkapi dengan berbagai fitur canggih untuk membantu bisnis Anda tumbuh dan berkembang.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature) => (
            <div key={feature.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <div className={`${feature.color} w-12 h-12 rounded-full flex items-center justify-center mb-4`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-secondary-900">{feature.title}</h3>
              <p className="text-secondary-800/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesChatBot;