import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Rocket, Globe, Shield, BarChart, Users, Zap } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        {/* Premium Hero Section */}
        <section className="relative bg-gradient-to-br from-indigo-900 to-purple-800 text-white py-32 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300">
                  Premium Traffic Solutions
                </span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
                Drive targeted, high-converting traffic to your digital properties with our AI-powered platform.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/free-trial">
                  <Button className="bg-white text-indigo-900 hover:bg-gray-100 text-lg px-8 py-4 font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    Start Free Trial
                    <Zap className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/pricing">
                  <Button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-indigo-900 text-lg px-8 py-4 font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                    View Plans
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
              <div className="text-center">
                <div className="text-4xl font-bold text-indigo-700">10K+</div>
                <div className="text-gray-600">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-indigo-700">50M+</div>
                <div className="text-gray-600">Visits Delivered</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-indigo-700">24/7</div>
                <div className="text-gray-600">Premium Support</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Enterprise-Grade Traffic Solutions
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our platform delivers real results with cutting-edge technology.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <Rocket className="h-12 w-12 text-indigo-600 mb-6" />
                <h3 className="text-xl font-bold mb-3">Lightning-Fast Delivery</h3>
                <p className="text-gray-600">
                  Get targeted traffic within minutes of campaign activation with our global network.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <Globe className="h-12 w-12 text-indigo-600 mb-6" />
                <h3 className="text-xl font-bold mb-3">Geo-Targeting</h3>
                <p className="text-gray-600">
                  Precisely target visitors from specific countries, cities, or regions.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <BarChart className="h-12 w-12 text-indigo-600 mb-6" />
                <h3 className="text-xl font-bold mb-3">Real-Time Analytics</h3>
                <p className="text-gray-600">
                  Monitor campaign performance with our comprehensive dashboard.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <Shield className="h-12 w-12 text-indigo-600 mb-6" />
                <h3 className="text-xl font-bold mb-3">Ad-Safe Traffic</h3>
                <p className="text-gray-600">
                  Fully compliant with all advertising platforms and monetization policies.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <Users className="h-12 w-12 text-indigo-600 mb-6" />
                <h3 className="text-xl font-bold mb-3">Behavioral Targeting</h3>
                <p className="text-gray-600">
                  Reach visitors based on interests, browsing history, and engagement patterns.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-indigo-900 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Trusted by Industry Leaders
              </h2>
              <p className="text-lg text-indigo-200 max-w-2xl mx-auto">
                Join thousands of businesses growing with our platform.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  quote: "Our organic traffic increased by 300% within 3 months of using this service. The quality is unmatched.",
                  name: "Sarah Johnson",
                  title: "Marketing Director, TechCorp",
                  avatar: "https://randomuser.me/api/portraits/women/44.jpg"
                },
                {
                  quote: "The most reliable traffic solution we've found. Customer support is exceptional and the results speak for themselves.",
                  name: "Michael Chen",
                  title: "CEO, DigitalGrowth",
                  avatar: "https://randomuser.me/api/portraits/men/32.jpg"
                },
                {
                  quote: "We've tried numerous services but none deliver the consistent quality and conversion rates we get here.",
                  name: "Emma Rodriguez",
                  title: "E-commerce Manager",
                  avatar: "https://randomuser.me/api/portraits/women/68.jpg"
                }
              ].map((testimonial, index) => (
                <div key={index} className="bg-indigo-800 p-8 rounded-xl">
                  <div className="text-lg italic mb-6">"{testimonial.quote}"</div>
                  <div className="flex items-center">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="h-12 w-12 rounded-full mr-4"
                    />
                    <div>
                      <div className="font-bold">{testimonial.name}</div>
                      <div className="text-indigo-300 text-sm">{testimonial.title}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Traffic?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Get started with our risk-free trial and see the difference.
            </p>
            <Link to="/free-trial">
              <Button className="bg-white text-indigo-900 hover:bg-gray-100 text-lg px-8 py-4 font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                Start Free Trial
                <Zap className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;