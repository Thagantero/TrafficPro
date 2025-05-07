import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/Button';
import { Menu } from 'lucide-react';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm border-b border-gray-100">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
          TrafficPro
        </Link>

        <div className="hidden md:flex space-x-8 items-center text-sm font-medium">
          <Link to="/" className="text-gray-700 hover:text-indigo-600 transition">Home</Link>
          <Link to="/pricing" className="text-gray-700 hover:text-indigo-600 transition">Pricing</Link>
          <Link to="/contact" className="text-gray-700 hover:text-indigo-600 transition">Contact</Link>
        </div>

        <div className="flex items-center space-x-3">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard">
                <Button variant="ghost" className="text-gray-700 hover:text-indigo-700">Dashboard</Button>
              </Link>
              <Button
                onClick={logout}
                className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 font-semibold hover:shadow-lg rounded-lg transition"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => navigate('/auth?mode=login')}
                variant="ghost"
                className="text-gray-700 hover:text-indigo-700"
              >
                Sign In
              </Button>
              <Button
                onClick={() => navigate('/auth?mode=register')}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 font-semibold hover:shadow-lg rounded-lg transition"
              >
                Get Started
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
