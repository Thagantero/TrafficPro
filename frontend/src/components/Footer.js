import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-xl font-bold mb-3 text-white">TrafficPro</h3>
            <p className="text-gray-400 leading-relaxed">
              Drive results with targeted traffic and AI-optimized delivery. Scale your reach faster and smarter.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/about" className="hover:text-white transition">About</Link></li>
              <li><Link to="/pricing" className="hover:text-white transition">Pricing</Link></li>
              <li><Link to="/contact" className="hover:text-white transition">Contact</Link></li>
              <li><Link to="/auth" className="hover:text-white transition">Login</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-3">Contact</h4>
            <p className="text-gray-400">support@trafficpro.ai</p>
            <p className="text-gray-400">+1 (555) 123-4567</p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} TrafficPro. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
