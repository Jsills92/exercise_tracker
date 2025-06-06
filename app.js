const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const app = express();
const exerciseRoutes = require('./routes/exerciseRoutes');

// Apply helmet first
app.use(helmet({
  contentSecurityPolicy: {
    useDefaults: false,
    directives: {
      "default-src": ["'self'"],
      "font-src": ["'self'", "https://exercise-tracker-app-5e089126146e.herokuapp.com"],
      "script-src": ["'self'"],
      "style-src": ["'self'", "https://fonts.googleapis.com"],
      "connect-src": ["'self'"]
    }
  }
}));

// Allow only the frontend URL to make requests
const corsOptions = {
  origin: [
    'http://localhost:3000', // Localhost
    'http://localhost:5000', // Localhost
    'http://172.21.224.1:3000',
    'https://exercise-tracker-app-5e089126146e.herokuapp.com', // Heroku
    'https://3000-jsills92-exercisetracke-8e7lqnyyadr.ws-us118.gitpod.io' // Gitpod URL
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions)); // Apply CORS configuration

app.use(express.json()); // To parse JSON bodies
app.use(express.urlencoded({ extended: true }));
app.options('*', cors(corsOptions)); // Handle OPTIONS requests

// Serve static files (like fonts) from the 'resources' folder
app.use('/resources', express.static(path.join(__dirname, 'resources')));

app.use(express.static(path.join(__dirname, 'frontend/build'))); // or 'frontend/build'

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/build', 'index.html')); // or 'frontend/build'
});

// Set Content Security Policy for fonts
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; font-src 'self' https://exercise-tracker-app-5e089126146e.herokuapp.com; script-src 'self'; style-src 'self' https://fonts.googleapis.com; connect-src 'self';"
  );
  next();
});




// Define your routes
app.use('/api', exerciseRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
