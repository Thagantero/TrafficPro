import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '../components/ui/Button';
import { CheckCircle, Zap, Globe, BarChart, Shield, Clock } from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      name: 'Starter',
      price: '$49',
      description: 'Perfect for small projects and testing',
      features: [
        '1,000 Targeted Visits',
        'Basic Geo-Targeting',
        'Email Support',
        'Real-Time Analytics',
        '3-Day Delivery'
      ],
      cta: 'Start Trial',
      popular: false
    },
    {
      name: 'Professional',
      price: '$149',
      description: 'For growing businesses and serious marketers',
      features: [
        '5,000 Targeted Visits',
        'Advanced Geo-Targeting',
        'Priority Support',
        'Enhanced Analytics',
        'Behavioral Targeting',
        '24-Hour Delivery'
      ],
      cta: 'Get Started',
      popular: true
    },
    {
      name: 'Enterprise',
      price: '$499',
      description: 'For agencies and high-volume needs',
      features: [
        '25,000 Targeted Visits',
        'Premium Geo-Targeting',
        '24/7 Dedicated Support',
        'Advanced Analytics Dashboard',
        'Behavioral & Interest Targeting',
        'Custom Visitor Parameters',
        'Instant Delivery'
      ],
      cta: 'Contact Sales',
      popular: false
    }
  ];

  const features = [
    {
      icon: <Globe className="h-6 w-6 text-indigo-600" />,
      title: "Global Reach",
      description: "Target visitors from any country worldwide"
    },
    {
      icon: <BarChart className="h-6 w-6 text-indigo-600" />,
      title: "Real Analytics",
      description: "Comprehensive dashboard with detailed metrics"
    },
    {
      icon: <Shield className="h-6 w-6 text-indigo-600" />,
      title: "Ad-Safe",
      description: "Fully compliant with all advertising policies"
    },
    {
      icon: <Clock className="h-6 w-6 text-indigo-600" />,
      title: "Fast Delivery",
      description: "Get traffic flowing within hours, not days"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-indigo-900 to-purple-800 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-indigo-200 max-w-2xl mx-auto">
              Choose the perfect plan for your business needs. Scale up or down as needed.
            </p>
          </div>
        </section>

        {/* Pricing Plans */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {plans.map((plan, index) => (
                <div 
                  key={index}
                  className={`relative bg-white rounded-xl shadow-lg overflow-hidden border ${
                    plan.popular 
                      ? 'border-2 border-indigo-500 transform scale-105 z-10' 
                      : 'border-gray-200'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-bold px-4 py-1 rounded-bl-lg">
                      MOST POPULAR
                    </div>
                  )}
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-600 mb-6">{plan.description}</p>
                    <div className="mb-8">
                      <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                      <span className="text-gray-600">/month</span>
                    </div>
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link to={plan.name === 'Enterprise' ? '/contact' : '/free-trial'}>
                      <Button
                        className={`w-full py-3 font-medium rounded-lg ${
                          plan.popular
                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                      >
                        {plan.cta}
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Comparison */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">All Plans Include</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="text-center p-6">
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Enterprise CTA */}
        <section className="py-20 bg-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Need Custom Solutions?</h2>
              <p className="text-xl text-gray-600 mb-8">
                Our enterprise plans offer custom traffic packages, dedicated account managers, and SLA guarantees.
              </p>
              <Link to="/contact">
                <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg px-8 py-4 text-lg font-medium">
                  Contact Our Team
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;