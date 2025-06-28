import React, { useState, FC } from 'react';

// Interface untuk struktur setiap pertanyaan FAQ
interface FAQItem {
  question: string;
  answer: string;
}

const FAQSection: FC = () => {
  // State untuk melacak FAQ mana yang sedang terbuka.
  // null berarti tidak ada yang terbuka. Number adalah indeks FAQ yang terbuka.
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Data FAQ Anda
  const faqData: FAQItem[] = [
    {
      question: "Berapa lama waktu yang dibutuhkan untuk membuat website?",
      answer: "Waktu pengerjaan website bervariasi tergantung pada kompleksitas proyek, fitur yang dibutuhkan, dan kecepatan Anda dalam memberikan materi. Umumnya, website sederhana memakan waktu 2-4 minggu, sedangkan website e-commerce atau kustom bisa 6-12 minggu atau lebih.",
    },
    {
      question: "Apakah saya perlu menyediakan domain dan hosting sendiri?",
      answer: "Tidak selalu. Kami bisa membantu Anda dalam proses pendaftaran domain dan hosting, atau Anda bisa menyediakannya sendiri jika sudah memiliki preferensi. Kami akan memberikan panduan yang diperlukan.",
    },
    {
      question: "Bagaimana proses revisi desain dan konten?",
      answer: "Kami akan menyediakan beberapa putaran revisi untuk desain dan konten. Biasanya, ada 2-3 putaran revisi mayor untuk desain dan revisi minor tak terbatas untuk konten. Kami ingin memastikan Anda puas dengan hasilnya.",
    },
    {
      question: "Apakah Rinkweb Studio menyediakan layanan pemeliharaan website?",
      answer: "Ya, kami menyediakan paket layanan pemeliharaan website yang mencakup pembaruan rutin, backup data, pemantauan keamanan, dan dukungan teknis. Ini memastikan website Anda selalu optimal dan aman.",
    },
    {
      question: "Bisakah website saya dioptimasi untuk SEO?",
      answer: "Tentu. Semua website yang kami bangun dirancang dengan struktur SEO-friendly dasar. Kami juga menawarkan layanan optimasi SEO lanjutan sebagai bagian dari paket tertentu atau sebagai layanan terpisah untuk membantu website Anda muncul di peringkat teratas pencarian.",
    },
    {
      question: "Bagaimana cara memulai proyek dengan Rinkweb Studio?",
      answer: "Sangat mudah! Anda bisa menghubungi kami melalui formulir kontak di website, WhatsApp, atau email. Kami akan menjadwalkan sesi konsultasi gratis untuk memahami kebutuhan Anda dan memberikan penawaran terbaik.",
    },
  ];

  // Fungsi untuk mengganti (toggle) status buka/tutup FAQ
  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 bg-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <h2 className="text-3xl font-bold text-center text-secondary-950 mb-12">
          Pertanyaan Umum <span className='text-primary'>(FAQ)</span>
        </h2>
        <div className="max-w-6xl mx-auto space-y-4">
          {faqData.map((item, index) => (
            <div key={index} className="bg-white rounded-xl shadow-xl overflow-hidden">
              <button
                className="w-full text-left p-5 border-b-slate-200 border flex justify-between items-center text-lg font-semibold text-secondary-950 focus:outline-none"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                {item.question}
                <span className={`transform transition-transform text-primary duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
                  &#x25BC; {/* Panah ke bawah */}
                </span>
              </button>
              <div
                id={`faq-answer-${index}`}
                className={`px-5 text-gray-700 transition-all duration-300 ease-in-out overflow-hidden ${
                  openIndex === index ? 'max-h-screen opacity-100 pt-2 pb-5 block' : 'max-h-0 opacity-0'
                }`}
              >
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;