const express = require('express');
const router = express.Router();

const { simulateTrafficHandler, getTrafficRecordsHandler } = require('../controllers/trafficController');
const authMiddleware = require('../middleware/authMiddleware');

// Protected Routes
router.post('/simulate-traffic', authMiddleware, simulateTrafficHandler);
router.get('/traffic-records', authMiddleware, getTrafficRecordsHandler);

module.exports = router;
