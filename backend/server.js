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
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/assets', assetRoutes); 
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Database Connected"))
  .catch(err => console.log(err));
app.listen(5000, () => console.log("Server on 5000"));