import React, { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import projectmc from '../assets/project-mc.webp';
import projectsb from '../assets/project-sb.webp';
import projectst from '../assets/project-st.webp';
import projectsk from '../assets/project-sk.webp';
import projecttt from '../assets/project-tt.webp';
import projectbs from '../assets/project-bs.webp';
import projectkk from '../assets/project-kk.webp'; 
import projectspa from '../assets/project-spa.webp'; 
import projectdtj from '../assets/project-dtj.webp'; 
import projectaw from '../assets/project-aw.webp'; 
import projectwt from '../assets/project-wt.webp'; 
import projectjf from '../assets/project-jf.webp';

const categories = [
  "All",
  "Website Development",
  "Mobile App",
  "UI/UX Design",
];

const projects = [
  {
    id: 1,
    title: "Tazkiyah Tour - Travel Umrah & Hajj",
    category: "Website Development",
    image: projecttt,
    description: "Website resmi Tazkiyah Tour untuk informasi paket Umrah & Haji.",
    link: "https://tazkiyahtour.com"
  },
  {
    id: 2,
    title: "MyCommerce - B2B E-commerce",
    category: "Website Development",
    image: projectmc,
    description: "Landing page e-commerce B2B untuk transaksi antar pelaku usaha.",
    link: "https://pldweb.github.io/mc-landing"
  },
  { 
    id: 3,
    title: "Sehat Bahagia - Community Pyschology",
    category: "Website Development",
    image: projectsb,
    description: "Media edukasi seputar psikologi komunitas dan kesehatan mental.",
    link: "https://sehatbahagia.com"
  },
  { 
    id: 4,
    title: "SKET Creative - Creative Agency",
    category: "Website Development",
    image: projectsk,
    description: "Portfolio digital layanan desain dan branding dari SKET Creative.",
    link: "https://sketcreative.com"
  },
  { 
    id: 5,
    title: "SINT Travel - Travel Umrah & Hajj",
    category: "Website Development",
    image: projectst,
    description: "Website SINT Travel untuk informasi dan pendaftaran Umrah & Haji.",
    link: "https://sinttravel.co.id"
  },
  { 
    id: 6,
    title: "Bernia Wisata - Travel Umrah & Hajj",
    category: "Website Development",
    image: projectbs,
    description: "Platform digital Bernia Wisata untuk layanan Umrah & Haji.",
    link: "https://berniawisata.co.id"
  },
  { 
    id: 7,
    title: "Salespage Aksana - Wedding Organizer Management System",
    category: "Website Development",
    image: projectspa,
    description: "Salespage sistem manajemen wedding organizer Aksana.",
    link: "https://pldweb.github.io/Salespage-Aksana"
  },
  { 
    id: 8,
    title: "KasirKu",
    category: "Website Development",
    image: projectkk,
    description: "Aplikasi kasir sederhana untuk pelaku usaha kecil dan UMKM.",
    link: "https://pldweb.github.io/kasirku"
  },
  { 
    id: 9,
    title: "Publika Dimensi Terbit Digital",
    category: "Website Development",
    image: projectdtj,
    description: "Portal media digital untuk berita dan informasi publik.",
    link: "https://publika.dimensiterbitdigital.com"
  },
  { 
    id: 10,
    title: "Arsicon - Contractor & Interior Design",
    category: "Website Development",
    image: projectaw,
    description: "Website portfolio jasa kontraktor dan interior desain.",
    link: "https://arsicon.vercel.app"
  },
  { 
    id: 11,
    title: "Wedding Organizer Website",
    category: "Website Development",
    image: projectwt,
    description: "Website untuk promosi layanan dan galeri wedding organizer.",
    link: "https://xit.aksana.co.id"
  },
  { 
    id: 12,
    title: "Jannah Firdaus - Travel Umrah & Hajj",
    category: "Mobile App",
    image: projectjf,
    description: "Aplikasi iOS dan android untuk jamaah umrah & haji.",
    link: "https://apps.apple.com/us/app/jannah-firdaus-tour-dan-travel/id6471333645"
  }
];

const PortfolioSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <section className="py-20 bg-gray-50" id="portfolio">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-950 font-heading mb-4">
            <span className="text-primary">Portfolio Hebat</span> Kami
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-secondary-800/80 max-w-3xl mx-auto text-lg">
            {/* Explore our recent projects and see how we've helped businesses achieve their online goals. */}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map(category => (
            <button
              key={category}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === category
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-white text-secondary-800 hover:bg-gray-100'
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map(project => (
            <div 
              key={project.id}
              className="bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="relative overflow-hidden group">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className={`w-full h-64 object-cover transition-transform duration-500 ${
                    hoveredProject === project.id ? 'scale-105' : ''
                  }`}
                />
                <div className="absolute inset-0 bg-secondary-950/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <a href={project.link} className="bg-primary hover:bg-primary-600 text-white px-4 py-2 rounded-md font-medium transition-all duration-200 flex items-center">
                    View Project
                    <ExternalLink className="ml-2 w-4 h-4" />
                  </a>
                </div>
              </div>
              <div className="p-6">
                <div className="mb-2">
                  <span className="bg-primary-100 text-primary-700 text-xs font-medium px-2.5 py-0.5 rounded">
                    {project.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-secondary-900 mb-2">{project.title}</h3>
                <p className="text-secondary-800/70">{project.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          {/* <button className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-6 py-3 rounded-md font-medium transition-all duration-200">
            View All Projects
          </button> */}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
