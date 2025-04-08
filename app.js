const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const exerciseRoutes = require('./routes/exerciseRoutes');

// Allow only the frontend URL to make requests
const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:5000'], // Adjust if your frontend is deployed elsewhere
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Define allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Define allowed headers
};

app.use(cors(corsOptions)); // Apply CORS configuration
app.use(express.json()); // To parse JSON bodies
app.options('*', cors(corsOptions)); // Handle OPTIONS requests

// Serve static files (like fonts) from the 'resources' folder
app.use('/resources', express.static(path.join(__dirname, 'resources')));

// Set Content Security Policy for fonts
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src 'none'; font-src 'self' http://localhost:5000");
  next();
});

// Define your routes
app.use('/api', exerciseRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
