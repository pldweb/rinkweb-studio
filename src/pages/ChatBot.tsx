import React from 'react';
import SEO from '../components/SEO';
import WhatsAppChatButton from '../components/WaButton';
import HeroChatBot from '../components/HeroChatBot';
import FeaturesChatBot from '../components/FeaturesChatBot';
import PricingChatBot from '../components/PricingChatBot';
import WhyChatBot from '../components/WhyChatBot';
import CallToActionChatBot from '../components/CallToActionChatBot';

const ChatBot: React.FC = () => {
  return (
    <>
      <SEO 
        title="ChatBot"
        description="RinkChatBot adalah solusi AI Chatbot untuk bisnis Anda. Tingkatkan layanan pelanggan dan efisiensi operasional dengan chatbot pintar yang tersedia 24/7."
        keywords="ChatBot, AI Chatbot, WhatsApp Chatbot, Chatbot Bisnis, Otomatisasi Layanan Pelanggan, Chatbot Indonesia"
        canonicalUrl="https://rinkweb.studio/chatbot"
      />
      <main>
        <HeroChatBot />
        <FeaturesChatBot />
        <PricingChatBot />
        <WhyChatBot />
        <WhatsAppChatButton />
      </main>
    </>
  );
};

export default ChatBot;