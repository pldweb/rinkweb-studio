import React, { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import logo from '../assets/logo.png'; // Sesuaikan path sesuai kebutuhan Anda

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Fungsi untuk smooth scroll
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',    
      });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex justify-between items-center">
          <div className="flex items-center">
            {/* Logo link, biasanya mengarah ke home atau bagian atas halaman */}
            <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }} className="flex items-center">
              <img src={logo} alt="Rinkweb Studio Logo" className={`ml-2 max-h-[40px] ${
                isScrolled ? 'filter-none' : 'filter brightness-0 invert'
              }`}>
              </img>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {['Home', 'About', 'Pricing', 'Portfolio', 'Faq'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                onClick={(e) => { // Tambahkan onClick handler di sini
                  e.preventDefault(); // Mencegah perilaku default (loncat)
                  scrollToSection(item.toLowerCase()); // Panggil fungsi smooth scroll
                }}
                className={`font-medium transition-colors duration-200 ${
                  isScrolled ? 'text-secondary-800 hover:text-primary' : 'text-white hover:text-primary-100'
                }`}
              >
                {item}
              </a>
            ))}
            <a href='https://wa.me/62895365441554?text=Halo,%20saya%20tertarik%20dengan%20layanan%20Rinkweb%20Studio%0A%0ABisakah%20kita%20agendakan%20diskusi?' className="bg-primary hover:bg-primary-600 text-white px-6 py-2 rounded-md font-medium transition-all duration-200 shadow-md hover:shadow-lg">
              Yuk Diskusi
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className={`w-6 h-6 ${isScrolled ? 'text-secondary-950' : 'text-white'}`} />
            ) : (
              <Menu className={`w-6 h-6 ${isScrolled ? 'text-secondary-950' : 'text-white'}`} />
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg py-4 px-4 animate-fade-in-down">
            <div className="flex flex-col space-y-4">
              {['Home', 'About', 'Services', 'Portfolio', 'Contact'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`}
                  onClick={(e) => { 
                    e.preventDefault(); 
                    scrollToSection(item.toLowerCase());
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-secondary-800 hover:text-primary font-medium transition-colors duration-200"
                >
                  {item}
                </a>
              ))}
              <a href='https://wa.me/62895365441554?text=Halo,%20saya%20tertarik%20dengan%20layanan%20Rinkweb%20Studio%0A%0ABisakah%20kita%20agendakan%20diskusi?' className="bg-primary hover:bg-primary-600 text-white px-6 py-2 rounded-md font-medium transition-all duration-200 shadow-md hover:shadow-lg">
              Yuk Diskusi
            </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;