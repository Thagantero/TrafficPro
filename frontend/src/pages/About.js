import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Users, Globe, Rocket } from 'lucide-react';

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 bg-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Sol's Traffic Bot</h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              We are dedicated to helping businesses and creators grow their online presence with safe, reliable, and targeted traffic solutions.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                <p className="text-gray-600 mb-4">
                  At Sol's Traffic Bot, our mission is to empower website owners, bloggers, and content creators by providing high-quality traffic that drives engagement and growth. We use cutting-edge technology to ensure our traffic is safe, targeted, and effective.
                </p>
                <p className="text-gray-600">
                  Whether you're looking to boost your website's SEO, increase YouTube views, or grow your e-commerce sales, we're here to help you succeed.
                </p>
              </div>
              <div className="flex justify-center">
                <Globe className="h-40 w-40 text-blue-600" />
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Team Member"
                  className="h-32 w-32 rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">Alex Carter</h3>
                <p className="text-gray-600">Founder & CEO</p>
                <p className="text-gray-500 mt-2">
                  Alex has over 10 years of experience in digital marketing and traffic generation.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Team Member"
                  className="h-32 w-32 rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">Emily Stone</h3>
                <p className="text-gray-600">Lead Developer</p>
                <p className="text-gray-500 mt-2">
                  Emily is a full-stack developer passionate about building scalable web applications.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Team Member"
                  className="h-32 w-32 rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">Michael Brown</h3>
                <p className="text-gray-600">Marketing Expert</p>
                <p className="text-gray-500 mt-2">
                  Michael specializes in SEO and online growth strategies for businesses.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;