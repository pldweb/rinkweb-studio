import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { ArrowRight } from 'lucide-react';

let wa = "https://wa.me/62895365441554"; 

const slides = [
  {
    id: 1,
    title: "Branding Website dengan Rinkweb Studio",
    subtitle: "Website Cepat, Branding Hebat",
    description: "Bantu bisnis kamu tampil beda dan dipercaya sejak detik pertama orang melihatnya.",
    image: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    ctaText: "Hubungi Segera",
  },
  {
    id: 2,
    title: "Website Kamu, Identitas Bisnis Kamu",
    subtitle: "Website Cepat, Branding Hebat",
    description: "Website kamu akan dirancang khusus, tanpa template jadi-jadian. Desainnya disesuaikan dengan karakter bisnismu, hasilnya jelas terasa.",
    image: "https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    ctaText: "Lihat Karya",
  },
  {
    id: 3,
    title: "Untuk Anda yang mau website cepat",
    subtitle: "Website Cepat, Branding Hebat",
    description: "Rink Web Studio hadir untuk kamu yang serius bangun citra profesional dan nggak main-main soal kualitas digital presence.",
    image: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    ctaText: "Lihat Harga",
  }
];

const HeroSection: React.FC = () => {
  return (
    <section className="relative h-screen" id="home">
      <Swiper
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        effect="fade"
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="h-full w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="relative">
            <div className="absolute inset-0 bg-secondary-950/70 z-10"></div>
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            ></div>
            <div className="relative z-20 h-full flex items-center">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto md:mx-0">
                  <p className="text-primary-300 font-medium mb-3 text-lg tracking-wide">{slide.subtitle}</p>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-heading leading-tight mb-6">
                    {slide.title}
                  </h1>
                  <p className="text-white/90 text-lg md:text-xl mb-8 max-w-2xl">
                    {slide.description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a href={wa} className="bg-primary hover:bg-primary-600 text-white px-6 py-3 rounded-md font-medium transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center">
                      {slide.ctaText}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </a>
                    {/* <button className="border-2 border-white/80 hover:border-white text-white px-6 py-3 rounded-md font-medium transition-all duration-200 hover:bg-white/10">
                      Learn More
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Overlay shapes for visual interest */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/20 to-transparent z-10 pointer-events-none"></div>
    </section>
  );
};

export default HeroSection;