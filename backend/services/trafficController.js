const { simulateTraffic } = require('./services/trafficService');
const { getProxy } = require('./services/proxyService');

const simulateTrafficHandler = async (req, res) => {
  const { url, visits, referrer, geo } = req.body;

  try {
    // Get proxy (rotate for geo-targeting)
    const proxy = await getProxy();

    // Simulate traffic
    await simulateTraffic({ url, visits, referrer, geo, proxy });

    res.status(200).json({ message: 'Traffic simulation started successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error simulating traffic.' });
  }
};

module.exports = { simulateTrafficHandler };
