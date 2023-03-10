const axios = require('axios');
const express = require('express');
const ejs = require('ejs');
const data = require('./data/currency-symbols')

const API_KEY = 'YOUR_API_KEY'; // Replace with your API key

const app = express();
// Set the view engine to ejs
app.set('view engine', 'ejs');
// Serve static files from the 'public' folder
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index', {currencySymbols: data});
});

app.get('/convert', async (req, res) => {
  const { fromCurrency, toCurrency, amount } = req.query;
  try {
    const response = await axios.get(`https://openexchangerates.org/api/convert/${amount}/${fromCurrency}/${toCurrency}`, {
      params: {
        app_id: API_KEY
      }
    });
    const result = response.data;
    res.render('result', { amount, fromCurrency, toCurrency, result });
  } catch (error) {
    console.error(error);
    res.render('error');
  }
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});