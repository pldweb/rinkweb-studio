import React from 'react'; // 'useState' tidak diperlukan lagi jika tidak ada toggle
import { FaWhatsapp } from 'react-icons/fa';

const FloatingWhatsapp = () => {
    // State 'show' dan fungsi 'toggleContacts' tidak diperlukan lagi
    // karena tombol akan langsung mengarah ke WhatsApp.

    const contacts = [
        {
          name: "Rivaldi",
          role: "Brand Consultant",
          number: "62895365441554", 
        },        
    ];
      
    const openWhatsapp = (number: string) => {
        
        const url = `https://api.whatsapp.com/send?phone=${number}&text=${encodeURIComponent("Halo, saya tertarik dengan layanan pembuatan website Anda. Bisa diskusi lebih lanjut?")}`;
        window.open(url, "_blank");
    }

    const mainWhatsappNumber = contacts[0].number;

    return (
        <div className="fixed bottom-[75px] right-6 z-50">
            <button
                onClick={() => openWhatsapp(mainWhatsappNumber)} // Langsung panggil openWhatsapp
                className="w-14 relative h-14 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg hover:bg-green-600"
                aria-label="Chat via WhatsApp"
            >
                <FaWhatsapp size={28} />
            </button>
        </div>
    );
}

export default FloatingWhatsapp;