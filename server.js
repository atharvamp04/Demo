const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const statusRouter = require('./routes/status'); // Correct path to your routes

const app = express();

// Middleware to parse JSON bodies
app.use(express.json()); // Correct way to parse JSON
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/aadhaar', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Use the status router for /api/status
app.use('/api/status', statusRouter);

// Handle invalid routes
// app.use((req, res, next) => {
//   res.status(404).json({ message: 'Route not found' });
// });

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error', error: err });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
