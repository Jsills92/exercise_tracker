const express = require('express');
const app = express();
const exerciseRoutes = require('./routes/exerciseRoutes');

app.use(express.json()); // To parse JSON bodies
app.use('/api', exerciseRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
