import React from 'react';
import { CalendarClock, Users, Award, BarChart4 } from 'lucide-react';

const AboutSection: React.FC = () => {
  return (
    <section className="py-20 bg-white" id="about">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-950 font-heading mb-4">
            About <span className="text-primary">WebCraft Pro</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-secondary-800/80 max-w-3xl mx-auto text-lg">
            We craft exceptional web experiences that drive business growth and user engagement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="rounded-lg overflow-hidden shadow-2xl">
              <img 
                src="https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Our team at work" 
                className="w-full h-auto"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-primary text-white p-6 rounded-lg shadow-xl hidden md:block">
              <div className="flex items-center">
                <CalendarClock className="w-10 h-10 mr-4" />
                <div>
                  <p className="text-sm font-medium opacity-80">Established</p>
                  <p className="text-2xl font-bold">2018</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-secondary-900 mb-4 font-heading">
              Delivering Digital Excellence Since 2018
            </h3>
            <p className="text-secondary-800/80 mb-6">
              WebCraft Pro was founded with a simple mission: to help businesses succeed online through exceptional web development. Over the years, we've grown from a small startup to a full-service web development agency trusted by clients worldwide.
            </p>
            <p className="text-secondary-800/80 mb-8">
              Our team of experienced developers, designers, and digital strategists work together to create websites and web applications that not only look beautiful but also deliver measurable results for our clients.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow duration-200">
                <Users className="w-8 h-8 text-primary mb-2" />
                <h4 className="font-bold text-secondary-900">25+</h4>
                <p className="text-secondary-800/70 text-sm">Team Members</p>
              </div>
              
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow duration-200">
                <Award className="w-8 h-8 text-primary mb-2" />
                <h4 className="font-bold text-secondary-900">100+</h4>
                <p className="text-secondary-800/70 text-sm">Projects Completed</p>
              </div>
              
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow duration-200">
                <BarChart4 className="w-8 h-8 text-primary mb-2" />
                <h4 className="font-bold text-secondary-900">98%</h4>
                <p className="text-secondary-800/70 text-sm">Client Satisfaction</p>
              </div>
            </div>

            <div className="mt-8 md:hidden">
              <div className="bg-primary text-white p-4 rounded-lg shadow-xl inline-flex items-center">
                <CalendarClock className="w-8 h-8 mr-3" />
                <div>
                  <p className="text-sm font-medium opacity-80">Established</p>
                  <p className="text-xl font-bold">2018</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;