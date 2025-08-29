import React from 'react';
import WhatsAppChatButton from '../components/WaButton';
import SEO from '../components/SEO';

const About: React.FC = () => {
  return (
    <>
      <SEO 
        title="Tentang Kami"
        description="Rinkweb Studio adalah studio pengembangan web profesional yang berfokus pada pembuatan website dan aplikasi web yang modern, responsif, dan berkinerja tinggi untuk bisnis dan individu."
        keywords="Tentang Rinkweb Studio, Jasa Website, Web Development, Pengembangan Web, Visi Misi, Nilai Perusahaan"
        canonicalUrl="https://rinkweb.studio/tentang"
      />
      <main>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">Tentang Rinkweb Studio</h1>
          
          <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-semibold mb-4">Siapa Kami</h2>
            <p className="mb-4">
              Rinkweb Studio adalah studio pengembangan web profesional yang berfokus pada pembuatan website 
              dan aplikasi web yang modern, responsif, dan berkinerja tinggi untuk bisnis dan individu.
            </p>
            <p className="mb-4">
              Didirikan dengan visi untuk membantu bisnis memanfaatkan kekuatan teknologi web, kami telah 
              membantu banyak klien dari berbagai industri untuk membangun kehadiran online yang kuat dan efektif.
            </p>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Visi & Misi</h2>
            
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h3 className="text-xl font-semibold mb-2">Visi</h3>
              <p>
                Menjadi partner terpercaya dalam transformasi digital bisnis melalui solusi web yang inovatif, 
                berkualitas tinggi, dan berorientasi pada hasil.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Misi</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Memberikan solusi web yang disesuaikan dengan kebutuhan spesifik setiap klien</li>
                <li>Menggunakan teknologi terkini untuk menciptakan pengalaman digital yang optimal</li>
                <li>Membangun hubungan jangka panjang dengan klien melalui layanan dan dukungan yang luar biasa</li>
                <li>Terus berinovasi dan meningkatkan kualitas layanan kami</li>
                <li>Berkontribusi pada pertumbuhan bisnis klien melalui solusi digital yang efektif</li>
              </ul>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Nilai-Nilai Kami</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-5 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">Kualitas</h3>
                <p>Kami berkomitmen untuk memberikan hasil kerja dengan standar kualitas tertinggi dalam setiap proyek.</p>
              </div>
              
              <div className="bg-white p-5 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">Inovasi</h3>
                <p>Kami selalu mencari cara baru dan lebih baik untuk menyelesaikan tantangan dan memenuhi kebutuhan klien.</p>
              </div>
              
              <div className="bg-white p-5 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">Integritas</h3>
                <p>Kami menjalankan bisnis dengan kejujuran, transparansi, dan etika yang tinggi.</p>
              </div>
              
              <div className="bg-white p-5 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">Kolaborasi</h3>
                <p>Kami percaya bahwa hasil terbaik dicapai melalui kerjasama yang erat dengan klien dan sesama anggota tim.</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg shadow-md mb-12">
            <h2 className="text-2xl font-semibold mb-4">Keahlian Kami</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-semibold mb-2">Web Development</h3>
                <p className="text-sm">Website bisnis, e-commerce, landing page, dan aplikasi web custom</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-semibold mb-2">UI/UX Design</h3>
                <p className="text-sm">Desain antarmuka yang intuitif dan pengalaman pengguna yang optimal</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-semibold mb-2">Responsive Design</h3>
                <p className="text-sm">Website yang tampil sempurna di semua perangkat</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-semibold mb-2">SEO</h3>
                <p className="text-sm">Optimasi mesin pencari untuk meningkatkan visibilitas online</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-semibold mb-2">Web Hosting</h3>
                <p className="text-sm">Solusi hosting yang aman, cepat, dan andal</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-semibold mb-2">Maintenance</h3>
                <p className="text-sm">Pemeliharaan dan dukungan berkelanjutan untuk website Anda</p>
              </div>
            </div>
          </div>

          <div className="text-center mb-12">
            <h2 className="text-2xl font-semibold mb-6">Siap Bekerja Sama dengan Kami?</h2>
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

export default About;