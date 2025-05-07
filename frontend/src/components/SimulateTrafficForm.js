import React, { useState } from 'react';
import { Button, Input } from '../components/ui'; // Assuming you have these components
import { useAuth } from '../contexts/AuthContext'; // Assuming you have an Auth context

const SimulateTrafficForm = () => {
  const { user } = useAuth(); // Assuming you have user info from Auth context
  const [url, setUrl] = useState('');
  const [visits, setVisits] = useState(50); // Default visits = 50
  const [referrer, setReferrer] = useState('');
  const [geo, setGeo] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      url,
      visits,
      referrer,
      geo,
    };

    try {
      const response = await fetch('/api/simulate-traffic', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Traffic simulation started successfully!');
      } else {
        alert('Error: ' + data.message);
      }
    } catch (error) {
      console.error('Error simulating traffic:', error);
      alert('Failed to simulate traffic');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="traffic-form">
      <h2>Simulate Traffic</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="url">Website URL</label>
          <Input
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter website URL"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="visits">Number of Visits</label>
          <Input
            id="visits"
            type="number"
            value={visits}
            onChange={(e) => setVisits(Number(e.target.value))}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="referrer">Referrer URL (optional)</label>
          <Input
            id="referrer"
            value={referrer}
            onChange={(e) => setReferrer(e.target.value)}
            placeholder="Optional: Referrer URL"
          />
        </div>

        <div className="form-group">
          <label htmlFor="geo">Geolocation (optional)</label>
          <Input
            id="geo"
            value={geo}
            onChange={(e) => setGeo(e.target.value)}
            placeholder="Optional: Geo-location (e.g., US, UK)"
          />
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? 'Simulating...' : 'Start Traffic Simulation'}
        </Button>
      </form>
    </div>
  );
};

export default SimulateTrafficForm;
