import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/Tabs';
import { Rocket, CheckCircle, ArrowRight } from 'lucide-react';

const FreeTrial = () => {
  const navigate = useNavigate();
  const { user, simulateTraffic } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('website');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);
    const url = formData.get('url');
    const visits = 50; // Fixed free trial visits

    try {
      await simulateTraffic(url, visits, activeTab);
      navigate('/dashboard');
    } catch (error) {
      console.error('Simulation error:', error);
      navigate('/dashboard');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <main className="flex-grow py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Rocket className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <h1 className="text-4xl font-bold mb-2">Try Sol's Traffic Bot</h1>
              <p className="text-lg text-gray-600">
                Start with 50 free visits or views — no credit card required.
              </p>
            </div>

            <Card className="p-8 shadow-sm">
              <Tabs defaultValue="website" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-2 mb-6">
                  <TabsTrigger value="website">Website URL</TabsTrigger>
                  <TabsTrigger value="youtube">YouTube Video</TabsTrigger>
                </TabsList>

                {['website', 'youtube'].map((type) => (
                  <TabsContent key={type} value={type}>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label htmlFor="url" className="text-sm font-medium block">
                          {type === 'website' ? 'Website URL' : 'YouTube Video URL'}
                        </label>
                        <Input
                          id="url"
                          name="url"
                          type="url"
                          required
                          placeholder={
                            type === 'website'
                              ? 'https://example.com'
                              : 'https://youtube.com/watch?v=...'
                          }
                          pattern={
                            type === 'website'
                              ? 'https?://.+'
                              : 'https?://(www\\.)?(youtube\\.com|youtu\\.be)/.+'
                          }
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="email" className="text-sm font-medium">
                            Your Email
                          </label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={user?.email}
                            readOnly
                          />
                        </div>
                        <div>
                          <label htmlFor="visits" className="text-sm font-medium">
                            Trial Visits/Views
                          </label>
                          <Input
                            id="visits"
                            name="visits"
                            type="number"
                            value="50"
                            readOnly
                          />
                        </div>
                      </div>

                      <div className="bg-white border rounded-lg p-4">
                        <h3 className="font-medium mb-3">What you'll get:</h3>
                        <ul className="space-y-2 text-sm text-gray-700">
                          {type === 'website' ? (
                            <>
                              <li className="flex items-start">
                                <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 mr-2" />
                                50 high-retention website visits
                              </li>
                              <li className="flex items-start">
                                <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 mr-2" />
                                Geo-randomized traffic patterns
                              </li>
                            </>
                          ) : (
                            <>
                              <li className="flex items-start">
                                <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 mr-2" />
                                50 authentic YouTube views
                              </li>
                              <li className="flex items-start">
                                <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 mr-2" />
                                Includes watch-time simulation
                              </li>
                            </>
                          )}
                        </ul>
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          type === 'website'
                            ? 'Sending traffic...'
                            : 'Sending views...'
                        ) : (
                          <>
                            Start Free Trial
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </form>
                  </TabsContent>
                ))}
              </Tabs>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FreeTrial;
