import React, { useState } from 'react';
import { ExternalLink } from 'lucide-react';

const categories = [
  "All",
  "E-commerce",
  "Corporate",
  "Portfolio",
  "Landing Pages"
];

const projects = [
  {
    id: 1,
    title: "Luxury Fashion E-commerce",
    category: "E-commerce",
    image: "https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "A high-end fashion store with advanced filtering and personalization."
  },
  {
    id: 2,
    title: "Financial Services Website",
    category: "Corporate",
    image: "https://images.pexels.com/photos/7682340/pexels-photo-7682340.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Modern website for a financial consulting firm with custom calculators."
  },
  {
    id: 3,
    title: "Photographer Portfolio",
    category: "Portfolio",
    image: "https://images.pexels.com/photos/3082341/pexels-photo-3082341.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Elegant portfolio showcasing photography work with custom galleries."
  },
  {
    id: 4,
    title: "Product Launch Page",
    category: "Landing Pages",
    image: "https://images.pexels.com/photos/5077047/pexels-photo-5077047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "High-converting landing page for a tech product launch."
  },
  {
    id: 5,
    title: "Organic Food Store",
    category: "E-commerce",
    image: "https://images.pexels.com/photos/8105035/pexels-photo-8105035.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "E-commerce platform for organic food products with subscription options."
  },
  {
    id: 6,
    title: "Law Firm Website",
    category: "Corporate",
    image: "https://images.pexels.com/photos/8112195/pexels-photo-8112195.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Professional website for a law firm with appointment scheduling."
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
            Our <span className="text-primary">Portfolio</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-secondary-800/80 max-w-3xl mx-auto text-lg">
            Explore our recent projects and see how we've helped businesses achieve their online goals.
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
                  <button className="bg-primary hover:bg-primary-600 text-white px-4 py-2 rounded-md font-medium transition-all duration-200 flex items-center">
                    View Project
                    <ExternalLink className="ml-2 w-4 h-4" />
                  </button>
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
          <button className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-6 py-3 rounded-md font-medium transition-all duration-200">
            View All Projects
          </button>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;