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
      question: "Bagaimana cara prosedur pemesanan Website?",
      answer: "Proses pemesanan website dapat dilakukan langsung dengan memilih paket yang ada di website dan mengkonsultasikannya via Whatsapp kepada nomor kontak kami yang tertera. Selanjutnya terkait pembayaran dapat dilakukan setelah deal terkait apa saja kebutuhan yang telah diajukan dan disetujui.",
    },
    {
      question: "Bagaimana sistem pembayaran di Rinkweb Studio?",
      answer: "Skema pembayaran dilakukan secara dua tahap : Down Payment (DP) sebesar 50% dibayarkan di awal sebagai tanda kesepakatan dan dimulainya proyek. Pelunasan 50% sisanya dilakukan setelah website selesai dan siap untuk diluncurkan (go-live), sebelum akses penuh diberikan kepada klien.",
    },
    {
      question: "Berapa lama waktu yang dibutuhkan untuk pengerjaannya?",
      answer: "Estimasi waktu pengerjaan website atau pun aplikasi sekitar 7-14 hari sejak pembayaran dan pengiriman bahan konten untuk memproses pembuatannya.",
    },
    {
      question: "Apakah ada biaya tersembunyi?",
      answer: "Tidak ada biaya tersembunyi. Semua biaya akan dijelaskan secara transparan di awal kesepakatan. Biaya tambahan hanya akan timbul jika ada permintaan pengubahan major pada website.",
    },
    {
      question: "Bagaimana jika saya membutuhkan perubahan pada website?",
      answer: "Perubahan minor atau update website dapat kami bantu sesuai kesepakatan yang telah dilakukan.",
    },
    {
      question: "Bagaimana cara memulai proyek dengan Rinkweb Studio?",
      answer: "Sangat mudah! Anda bisa menghubungi kami melalui kontak di website untuk membahas jadwal diskusi via zoom. Kami akan menjadwalkan sesi konsultasi gratis untuk memahami kebutuhan Anda dan memberikan penawaran terbaik.",
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