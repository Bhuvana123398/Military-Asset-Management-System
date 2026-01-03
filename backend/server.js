const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app = express();
app.use(express.json());
app.use(cors()); 
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const assetRoutes = require('./routes/assets');
app.get('/', (req, res) => {
  res.send('Military Asset Management API is running...');
});
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/assets', assetRoutes); 
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Database Connected Successfully"))
  .catch(err => console.error("Database Connection Error:", err));

// Port configuration for Deployment (Render/Heroku)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));