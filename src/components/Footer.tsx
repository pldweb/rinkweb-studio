import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone, Globe } from 'lucide-react';
import logo from '../assets/logo-white.png';

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary-950 text-white pt-16 pb-8" id="contact">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center mb-4">
              <img src={logo} className='max-h-9' alt="" />
            </div>
            <p className="text-gray-400 mb-6">
              Membantu menaikkan website melalui branding terbaik.
            </p>
            <div className="flex space-x-4">
              <a href="" className="bg-secondary-800 hover:bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="bg-secondary-800 hover:bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://instagram.com/rinkweb.studio" className="bg-secondary-800 hover:bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200">
                <Instagram className="w-5 h-5" />
              </a>
              {/* <a href="#" className="bg-secondary-800 hover:bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200">
                <Linkedin className="w-5 h-5" />
              </a> */}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Informasi</h3>
            <ul className="space-y-2">
              {['Home', 'About', 'Services', 'Portfolio', 'Blog', 'Contact'].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-400 hover:text-primary transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Layanan Website</h3>
            <ul className="space-y-2">
              {[
                'Web Development', 
                'E-commerce', 
                'UI/UX Design', 
                'SEO Optimization', 
                'Web Design'
              ].map((item) => (
                <li key={item}>
                  <a 
                    href="#"
                    className="text-gray-400 hover:text-primary transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Hubungi Kami</h3>
            <div className="space-y-2">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400">
                  Jl. Sawo 4 RT08/RW01 Kel. Balekambang Kec. Kramat Jati<br />
                  Jakarta Timur 13530, Jakarta Indonesia
                </span>
              </div>
              <div className="flex items-start">
                <Phone className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400">
                  +62 8953 6544 1554
                </span>
              </div>
              <div className="flex items-start">
                <Mail className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400">
                  support@rinkwebstudio.com
                </span>
              </div>
              <div className="flex items-start mt-1">
                <Mail className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400">
                  muhammadrivaldifnni01@gmail.com
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-secondary-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              © {new Date().getFullYear()} Rinkweb Studio. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors duration-200 text-sm">
                Kebijakan Privasi
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors duration-200 text-sm">
                Syarat dan Ketentuan
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors duration-200 text-sm">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;