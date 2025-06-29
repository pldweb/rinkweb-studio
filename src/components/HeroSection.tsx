import React, { memo, useMemo, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { ArrowRight } from 'lucide-react';

// Import CSS langsung - TypeScript friendly
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const wa: string = "https://wa.me/62895365441554";

// Pindahkan data ke konstanta untuk menghindari re-creation
const SLIDES_DATA: SlideData[] = [
  {
    id: 1,
    title: "Branding Website dengan Rinkweb Studio",
    subtitle: "Website Cepat, Branding Hebat",
    description: "Bantu bisnis kamu tampil beda dan dipercaya sejak detik pertama orang melihatnya.",
    image: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1",
    ctaText: "Hubungi Segera",
  },
  {
    id: 2,
    title: "Website Kamu, Identitas Bisnis Kamu",
    subtitle: "Website Cepat, Branding Hebat",
    description: "Website kamu akan dirancang khusus, tanpa template jadi-jadian. Desainnya disesuaikan dengan karakter bisnismu, hasilnya jelas terasa.",
    image: "https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1",
    ctaText: "Lihat Karya",
  },
  {
    id: 3,
    title: "Untuk Anda yang mau website cepat",
    subtitle: "Website Cepat, Branding Hebat",
    description: "Rink Web Studio hadir untuk kamu yang serius bangun citra profesional dan nggak main-main soal kualitas digital presence.",
    image: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1",
    ctaText: "Lihat Harga",
  }
];

// Type definitions
interface SlideData {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  ctaText: string;
}

// Preload first image
const preloadFirstImage = (): void => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = SLIDES_DATA[0].image;
  link.as = 'image';
  document.head.appendChild(link);
};

// Memoized Slide Component
interface SlideContentProps {
  slide: SlideData;
  isFirst: boolean;
}

const SlideContent: React.FC<SlideContentProps> = memo(({ slide, isFirst }) => {
  const titleClasses = useMemo(() => 
    "text-3xl md:text-5xl lg:text-[70px] font-bold text-white leading-tight mb-6",
    []
  );

  const ctaClasses = useMemo(() =>
    "bg-primary hover:bg-primary-600 text-white px-6 py-3 rounded-md font-medium transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center max-w-fit",
    []
  );

  return (
    <div className="relative z-20 h-full flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto md:mx-0">
          <p className="text-primary-300 font-medium mb-3 text-lg tracking-wide">
            {slide.subtitle}
          </p>
          <h2 className={titleClasses}>
            {slide.title}
          </h2>
          <p className="text-white/90 text-lg md:text-xl mb-8 max-w-2xl">
            {slide.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href={wa} 
              className={ctaClasses}
              // Preload WhatsApp jika ini slide pertama
              {...(isFirst && { rel: 'preconnect' })}
            >
              {slide.ctaText}
              <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
});

SlideContent.displayName = 'SlideContent';

// Optimized Swiper Configuration
const swiperConfig = {
  modules: [Autoplay, EffectFade, Navigation, Pagination],
  effect: "fade" as const,
  spaceBetween: 0,
  slidesPerView: 1,
  navigation: true,
  pagination: { clickable: true },
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  loop: true,
  // Hapus lazy dan preloadImages - tidak compatible dengan React
  watchSlidesProgress: true,
};

const HeroSection: React.FC = memo(() => {
  const [loadedImages, setLoadedImages] = React.useState<Set<number>>(new Set([0])); // Load gambar pertama

  // Preload critical resources
  useEffect(() => {
    preloadFirstImage();
    
    // Preload gambar kedua setelah 2 detik
    const timer = setTimeout(() => {
      setLoadedImages(prev => new Set([...prev, 1]));
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Function untuk handle slide change
  const handleSlideChange = (swiper: any) => {
    const activeIndex = swiper.realIndex;
    // Preload next image
    const nextIndex = (activeIndex + 1) % SLIDES_DATA.length;
    setLoadedImages(prev => new Set([...prev, activeIndex, nextIndex]));
  };

  return (
    <section className="relative h-screen" id="home">
      <Swiper
        {...swiperConfig}
        onSlideChange={handleSlideChange}
        className="h-full w-full"
      >
        {SLIDES_DATA.map((slide, index) => (
          <SwiperSlide key={slide.id} className="relative">
            {/* Optimized overlay */}
            <div className="absolute inset-0 bg-secondary-950/70 z-10" />
            
            {/* Smart lazy loading untuk background image */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-opacity duration-300"
              style={{ 
                backgroundImage: loadedImages.has(index) ? `url(${slide.image})` : 'none',
                backgroundColor: loadedImages.has(index) ? 'transparent' : '#1a1a1a'
              }}
            />
            
            {/* Loading placeholder untuk image yang belum load */}
            {!loadedImages.has(index) && (
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center z-5">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            )}
            
            <SlideContent slide={slide} isFirst={index === 0} />
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Simplified gradient overlay */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/20 to-transparent z-10 pointer-events-none" />
    </section>
  );
});

HeroSection.displayName = 'HeroSection';

export default HeroSection;