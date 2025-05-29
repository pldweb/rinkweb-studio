import React from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';

const articles = [
  {
    id: 1,
    title: "10 Essential Features Every Business Website Needs",
    excerpt: "Discover the must-have features that will make your business website stand out from the competition and drive conversions.",
    image: "https://images.pexels.com/photos/1181325/pexels-photo-1181325.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    date: "May 15, 2025",
    author: "Sarah Johnson",
    category: "Web Design"
  },
  {
    id: 2,
    title: "How to Improve Your Website's Loading Speed",
    excerpt: "Learn practical tips and techniques to optimize your website's performance and provide a better user experience.",
    image: "https://images.pexels.com/photos/38568/apple-imac-ipad-workplace-38568.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    date: "April 28, 2025",
    author: "Michael Chen",
    category: "Performance"
  },
  {
    id: 3,
    title: "The Ultimate Guide to E-commerce SEO",
    excerpt: "Boost your online store's visibility with these proven SEO strategies specifically designed for e-commerce websites.",
    image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    date: "April 10, 2025",
    author: "Emily Parker",
    category: "SEO"
  }
];

const ArticlesSection: React.FC = () => {
  return (
    <section className="py-20 bg-white" id="blog">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-950 font-heading mb-4">
            Latest <span className="text-primary">Articles</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-secondary-800/80 max-w-3xl mx-auto text-lg">
            Stay updated with the latest trends, tips, and insights in web development and digital marketing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map(article => (
            <div key={article.id} className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="relative overflow-hidden h-48">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-white text-xs font-medium px-2.5 py-1 rounded">
                    {article.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <div className="flex items-center mr-4">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{article.date}</span>
                  </div>
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    <span>{article.author}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-secondary-900 mb-3 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-secondary-800/70 mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
                <a 
                  href="#" 
                  className="inline-flex items-center text-primary font-medium hover:text-primary-600 transition-colors duration-200"
                >
                  Read More <ArrowRight className="ml-1 w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-6 py-3 rounded-md font-medium transition-all duration-200">
            View All Articles
          </button>
        </div>
      </div>
    </section>
  );
};

export default ArticlesSection;