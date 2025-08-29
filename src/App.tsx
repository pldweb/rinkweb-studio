import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import ChatBot from './pages/ChatBot';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="min-h-screen bg-white">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tentang" element={<About />} />
            <Route path="/chatbot" element={<ChatBot />} />
            <Route path="/hubungi" element={<Contact />} />
            <Route path="/kebijakan-privasi" element={<Privacy />} />
          </Routes>
          <Footer />
          <ScrollToTop />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;