import React from 'react';
import WhatsAppChatButton from '../components/WaButton';
import SEO from '../components/SEO';

const ChatBot: React.FC = () => {
  return (
    <>
      <SEO 
        title="ChatBot AI"
        description="Rinkweb Studio menyediakan layanan pembuatan ChatBot AI yang dapat membantu bisnis Anda meningkatkan efisiensi layanan pelanggan dan mengoptimalkan proses bisnis."
        keywords="ChatBot AI, Layanan ChatBot, AI Chatbot, WhatsApp Chatbot, Chatbot Bisnis, Otomatisasi Layanan Pelanggan"
        canonicalUrl="https://rinkweb.studio/chatbot"
      />
      <main>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">ChatBot Rinkweb Studio</h1>
          
          <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-semibold mb-4">Solusi AI Chatbot untuk Bisnis Anda</h2>
            <p className="mb-4">
              Rinkweb Studio menyediakan layanan pembuatan ChatBot AI yang dapat membantu bisnis Anda 
              meningkatkan efisiensi layanan pelanggan dan mengoptimalkan proses bisnis.
            </p>
            <p className="mb-4">
              ChatBot kami dirancang dengan teknologi AI terkini yang dapat memahami pertanyaan pelanggan 
              dan memberikan respons yang akurat dan relevan secara instan.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Fitur Utama</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Respon cepat dan akurat 24/7</li>
                <li>Integrasi dengan website dan platform media sosial</li>
                <li>Personalisasi sesuai dengan brand Anda</li>
                <li>Analisis data interaksi pelanggan</li>
                <li>Kemampuan multi-bahasa</li>
                <li>Peningkatan berkelanjutan melalui machine learning</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Manfaat untuk Bisnis</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Meningkatkan efisiensi layanan pelanggan</li>
                <li>Mengurangi biaya operasional</li>
                <li>Meningkatkan kepuasan pelanggan</li>
                <li>Menghasilkan leads dan konversi yang lebih tinggi</li>
                <li>Mengumpulkan data pelanggan yang berharga</li>
                <li>Memberikan layanan pelanggan 24/7 tanpa tambahan biaya</li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg shadow-md mb-12">
            <h2 className="text-2xl font-semibold mb-4">Bagaimana ChatBot Kami Bekerja</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">1</div>
                <div>
                  <h4 className="font-medium">Analisis Kebutuhan</h4>
                  <p className="text-gray-600">Kami menganalisis kebutuhan bisnis Anda untuk merancang ChatBot yang sesuai dengan tujuan dan kebutuhan spesifik Anda.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">2</div>
                <div>
                  <h4 className="font-medium">Pengembangan & Pelatihan</h4>
                  <p className="text-gray-600">Kami mengembangkan dan melatih ChatBot dengan data dan informasi yang relevan dengan bisnis Anda.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">3</div>
                <div>
                  <h4 className="font-medium">Integrasi</h4>
                  <p className="text-gray-600">Kami mengintegrasikan ChatBot dengan website, aplikasi, atau platform media sosial Anda.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">4</div>
                <div>
                  <h4 className="font-medium">Pengujian & Optimasi</h4>
                  <p className="text-gray-600">Kami melakukan pengujian menyeluruh dan mengoptimalkan kinerja ChatBot berdasarkan feedback dan data interaksi.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">5</div>
                <div>
                  <h4 className="font-medium">Peluncuran & Pemeliharaan</h4>
                  <p className="text-gray-600">Setelah peluncuran, kami terus memantau dan meningkatkan kinerja ChatBot untuk memastikan hasil yang optimal.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-center">Paket Harga RinkChatBot</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Card 1 */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                <div className="bg-blue-600 text-white p-4 text-center">
                  <h3 className="text-xl font-bold">Paket Standar</h3>
                </div>
                <div className="p-6">
                  <div className="text-center mb-6">
                    <span className="text-4xl font-bold">Rp 60.000</span>
                    <span className="text-gray-600">/bulan</span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                      </svg>
                      <span>1 WhatsApp Number</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                      </svg>
                      <span>1 ChatBot</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                      </svg>
                      <span>Unlimited Messages</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                      </svg>
                      <span>Basic Analytics</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                      </svg>
                      <span>Email Support</span>
                    </li>
                  </ul>
                  <div className="text-center">
                    <a href="/hubungi" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition duration-300 w-full">
                      Pilih Paket
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Card 2 */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300 relative">
                <div className="absolute top-0 right-0 bg-yellow-500 text-white text-xs font-bold px-3 py-1 transform translate-x-2 -translate-y-2 rotate-12">
                  POPULER
                </div>
                <div className="bg-indigo-600 text-white p-4 text-center">
                  <h3 className="text-xl font-bold">Paket Premium</h3>
                </div>
                <div className="p-6">
                  <div className="text-center mb-6">
                    <span className="text-4xl font-bold">Rp 90.000</span>
                    <span className="text-gray-600">/bulan</span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                      </svg>
                      <span>1 WhatsApp Number</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                      </svg>
                      <span>1 ChatBot</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                      </svg>
                      <span>Unlimited Messages</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                      </svg>
                      <span>Advanced Analytics</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                      </svg>
                      <span>Prioritas Support 24/7</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                      </svg>
                      <span>Kustomisasi Lanjutan</span>
                    </li>
                  </ul>
                  <div className="text-center">
                    <a href="/hubungi" className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg transition duration-300 w-full">
                      Pilih Paket
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-12">
            <h2 className="text-2xl font-semibold mb-4">Kenapa Harus RinkChatBot?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-5 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium mb-2 flex items-center">
                  <svg className="w-6 h-6 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  Unlimited Messages
                </h3>
                <p className="text-gray-600">Tidak ada batasan jumlah pesan yang dapat diproses oleh ChatBot kami. Layani pelanggan Anda tanpa khawatir tentang biaya tambahan per pesan.</p>
              </div>
              
              <div className="bg-white p-5 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium mb-2 flex items-center">
                  <svg className="w-6 h-6 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  1 WA 1 ChatBot
                </h3>
                <p className="text-gray-600">Setiap nomor WhatsApp terhubung dengan satu ChatBot yang didedikasikan khusus untuk bisnis Anda, memastikan layanan yang konsisten dan personal.</p>
              </div>
              
              <div className="bg-white p-5 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium mb-2 flex items-center">
                  <svg className="w-6 h-6 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  Dukungan Teknis
                </h3>
                <p className="text-gray-600">Tim dukungan teknis kami siap membantu Anda dengan setup, konfigurasi, dan pemecahan masalah untuk memastikan ChatBot Anda berjalan optimal.</p>
              </div>
              
              <div className="bg-white p-5 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium mb-2 flex items-center">
                  <svg className="w-6 h-6 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  Peningkatan Berkelanjutan
                </h3>
                <p className="text-gray-600">ChatBot kami terus belajar dan meningkat dari setiap interaksi, memastikan layanan yang semakin baik dan akurat seiring waktu.</p>
              </div>
            </div>
          </div>
          
          <div className="text-center mb-12">
            <h2 className="text-2xl font-semibold mb-6">Siap Meningkatkan Bisnis Anda dengan ChatBot?</h2>
            <a 
              href="/hubungi" 
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300"
            >
              Hubungi Kami Sekarang
            </a>
          </div>
        </div>
        </div>
        <WhatsAppChatButton />
      </main>
    </>
  );
};

export default ChatBot;