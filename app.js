const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Lamsah App Running');
});

module.exports = app;
