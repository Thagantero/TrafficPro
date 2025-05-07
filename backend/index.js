const express = require('express');
const app = express();
const trafficRoutes = require('./routes/trafficRoutes'); // ✅ correct path

app.use(express.json());
app.use('/api', trafficRoutes); // route prefix

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
