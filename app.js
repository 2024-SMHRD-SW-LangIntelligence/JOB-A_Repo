const express = require('express');
const path = require('path');

const app = express();

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3378;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});