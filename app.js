const express = require('express');
const path = require('path');

const app = express();

// Set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public')); // Change views directory to public

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.render('index', { title: 'My EJS Page' });
});

const PORT = process.env.PORT || 3379;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});