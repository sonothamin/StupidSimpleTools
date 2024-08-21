// index.js
const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use('/calculator', express.static(path.join(__dirname, 'calculator/public')));

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
