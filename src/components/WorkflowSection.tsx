import React from 'react';
import { PackageCheck, CreditCard, MessageCircle, Code, CheckCircle } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: "Konsultasi Website",
    description: "Diskusikan kebutuhan website Anda dengan tim kami untuk hasil terbaik.",
    icon: MessageCircle,
    color: "bg-purple-100 text-purple-600",
  },
  {
    id: 2,
    title: "Pilih Paket",
    description: "Sesuaikan kebutuhan website Anda dengan paket yang kami tawarkan.",
    icon: PackageCheck,
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: 3,
    title: "Lakukan Pembayaran",
    description: "Aman dan mudah, lakukan pembayaran melalui metode yang tersedia.",
    icon: CreditCard,
    color: "bg-green-100 text-green-600",
  },
  {
    id: 4,
    title: "Pengerjaan Website",
    description: "Tim kami akan mulai mengerjakan website sesuai yang telah disepakati.",
    icon: Code,
    color: "bg-primary-100 text-primary-600",
  },
  {
    id: 5,
    title: "Launching Website",
    description: "Website dengan konsep branding terbaik siap digunakan dan diluncurkan ke publik.",
    icon: CheckCircle,
    color: "bg-teal-100 text-teal-600",
  },
];

const WorkflowSection: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50" id="services">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-950 font-heading mb-4">
            Bagaimana <span className="text-primary">Alur Kerja</span> Kami?
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-secondary-800/80 max-w-3xl mx-auto text-lg">
            Proses yang cepat, detail dan profesional untuk memastikan website yang siap digunakan dengan kualitas terbaik.
          </p>
        </div>

        <div className="relative">
          {/* Connecting line */}
          <div className="absolute top-1/2 left-8 right-8 h-1 bg-gray-200 -translate-y-1/2 hidden md:block"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <div key={step.id} className="relative z-10">
                <div className="bg-white rounded-xl shadow-lg p-6 h-full transition-transform duration-300 hover:-translate-y-2">
                  <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mb-4 mx-auto`}>
                    <step.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-secondary-900 mb-2 text-center">
                    {step.title}
                  </h3>
                  <p className="text-secondary-800/70 text-center">
                    {step.description}
                  </p>
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 text-xl font-bold text-secondary-950 bg-white h-8 w-8 rounded-full border-2 border-primary flex items-center justify-center md:hidden">
                    {step.id}
                  </div>
                </div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl font-bold text-secondary-950 bg-white h-10 w-10 rounded-full border-2 border-primary flex items-center justify-center hidden md:flex">
                  {step.id}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkflowSection;