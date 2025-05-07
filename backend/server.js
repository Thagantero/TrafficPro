const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios');
require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },
});

const User = mongoose.model('User', userSchema);

// Traffic Record Schema
const trafficRecordSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  url: { type: String, required: true },
  visits: { type: Number, required: true },
  trafficType: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const TrafficRecord = mongoose.model('TrafficRecord', trafficRecordSchema);

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access denied' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};

// Register Endpoint
app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: email.includes('admin') ? 'admin' : 'user',
    });

    await user.save();

    const token = jwt.sign({ email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ token, user: { email: user.email, name: user.name, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
});

// Login Endpoint
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect password' });
    }

    const token = jwt.sign({ email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token, user: { email: user.email, name: user.name, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
});

// Simulate Traffic Endpoint
app.post('/api/simulate-traffic', authenticateToken, async (req, res) => {
  const { url, visits, trafficType } = req.body;
  if (!url || !visits || !trafficType) {
    return res.status(400).json({ message: 'Missing required fields: url, visits, trafficType' });
  }

  try {
    console.log(`Simulating ${visits} ${trafficType} visits to ${url}`);

    for (let i = 0; i < visits; i++) {
      await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      });
      console.log(`Visit ${i + 1}/${visits} sent to ${url}`);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    const trafficRecord = new TrafficRecord({
      userEmail: req.user.email,
      url,
      visits,
      trafficType,
      timestamp: new Date(),
    });
    await trafficRecord.save();

    res.status(200).json({ message: `Successfully sent ${visits} visits to ${url}` });
  } catch (error) {
    console.error('Traffic simulation error:', error.message);
    res.status(500).json({ message: 'Failed to simulate traffic', error: error.message });
  }
});

// Get Traffic Records Endpoint
app.get('/api/traffic-records', authenticateToken, async (req, res) => {
  try {
    const records = await TrafficRecord.find({ userEmail: req.user.email });
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching traffic records', error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});