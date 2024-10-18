const express = require('express');
const cors = require('cors'); // Import CORS
const app = express();
const port = 3000;

// Allow cross-origin requests
app.use(cors());


let stocks = [
  {
    id: 1,
    name: "Reliance Industries",
    price: 2500,
    growth: 3.5,
    industry: "Finance",
    exchange: "NSE",
  },
  {
    id: 2,
    name: "HDFC Bank",
    price: 1800,
    growth: 4.2,
    industry: "Finance",
    exchange: "BSE",
  },
  {
    id: 3,
    name: "ICICI Bank",
    price: 1600,
    growth: 5.1,
    industry: "Finance",
    exchange: "NSE",
  },
  {
    id: 4,
    name: "Tata Consultancy Services",
    price: 3200,
    growth: 2.9,
    industry: "Finance",
    exchange: "BSE",
  },
  {
    id: 5,
    name: "Infosys",
    price: 2900,
    growth: 3.8,
    industry: "Finance",
    exchange: "NSE",
  },
  {
    id: 6,
    name: "Dr. Reddy's Laboratories",
    price: 2100,
    growth: 4.7,
    industry: "Pharma",
    exchange: "BSE",
  },
  {
    id: 7,
    name: "Sun Pharmaceutical",
    price: 2300,
    growth: 3.2,
    industry: "Pharma",
    exchange: "NSE",
  },
  {
    id: 8,
    name: "Cipla",
    price: 2100,
    growth: 2.6,
    industry: "Pharma",
    exchange: "BSE",
  },
  {
    id: 9,
    name: "NTPC",
    price: 1200,
    growth: 4.1,
    industry: "Power",
    exchange: "NSE",
  },
  {
    id: 10,
    name: "Power Grid Corporation",
    price: 1500,
    growth: 3.4,
    industry: "Power",
    exchange: "BSE",
  },
  {
    id: 11,
    name: "Adani Power",
    price: 2200,
    growth: 5.3,
    industry: "Power",
    exchange: "NSE",
  },
  {
    id: 12,
    name: "Lupin",
    price: 2000,
    growth: 4.5,
    industry: "Pharma",
    exchange: "BSE",
  },
  {
    id: 13,
    name: "Axis Bank",
    price: 1750,
    growth: 2.8,
    industry: "Finance",
    exchange: "NSE",
  },
  {
    id: 14,
    name: "State Bank of India",
    price: 1450,
    growth: 3.6,
    industry: "Finance",
    exchange: "BSE",
  },
  {
    id: 15,
    name: "Bajaj Finance",
    price: 2650,
    growth: -2.9,
    industry: "Finance",
    exchange: "NSE",
  },
  {
    id: 16,
    name: "Biocon",
    price: 1850,
    growth: 3.9,
    industry: "Pharma",
    exchange: "NSE",
  },
  {
    id: 17,
    name: "Torrent Power",
    price: 1600,
    growth: 2.4,
    industry: "Power",
    exchange: "BSE",
  },
  {
    id: 18,
    name: "Tata Power",
    price: 1750,
    growth: 4.0,
    industry: "Power",
    exchange: "NSE",
  },
  {
    id: 19,
    name: "JSW Energy",
    price: 1450,
    growth: 3.1,
    industry: "Power",
    exchange: "BSE",
  },
];

// Endpoint to get all stocks
app.get('/stocks', (req, res) => {
  res.json({ stocks });
});

// Endpoint to sort stocks by price
app.get('/stocks/sort/pricing', (req, res) => {
  const pricing = req.query.order;

  let sortedStocks;

  if (pricing === 'high-to-low') {
      sortedStocks = [...stocks].sort((a, b) => b.price - a.price);
  } else if (pricing === 'low-to-high') {
      sortedStocks = [...stocks].sort((a, b) => a.price - b.price);
  } else {
      return res.status(400).json({
          error: 'Invalid sorting order. Use "high-to-low" or "low-to-high".'
      });
  }

  res.json({ stocks: sortedStocks });
});
app.get('/stocks/sort/growth', (req, res) => {
  const { order } = req.query;

  if (!order || (order !== 'high-to-low' && order !== 'low-to-high')) {
      return res.status(400).json({
          error: 'Invalid sorting order. Use "high-to-low" or "low-to-high".'
      });
  }
  
  let sortedStocks;
  if (order === 'high-to-low') {
      sortedStocks = [...stocks].sort((a, b) => b.growth - a.growth);
  } else {
      sortedStocks = [...stocks].sort((a, b) => a.growth - b.growth);
  }
  
  res.json({ stocks: sortedStocks });
});

// Endpoint to filter stocks by exchange
app.get('/stocks/filter/exchange', (req, res) => {
  const exchange = req.query.exchange?.toLowerCase(); 
  if (!exchange) {
      return res.status(400).json({ error: 'Please provide an exchange (NSE or BSE).' });
  }
  
  const filteredStocks = stocks.filter(stock => stock.exchange.toLowerCase() === exchange);
  
  if (filteredStocks.length === 0) {
      return res.status(404).json({ message: 'No stocks found for the specified exchange.' });
  }
  res.json({ stocks: filteredStocks });
});

// Endpoint to filter stocks by industry
app.get('/stocks/filter/industry', (req, res) => {
  const industry = req.query.industry?.toLowerCase(); 

  if (!industry) {
      return res.status(400).json({ error: 'Please provide an industry (Finance, Pharma, or Power).' });
  }
  
  const filteredStocks = stocks.filter(stock => stock.industry.toLowerCase() === industry);

  if (filteredStocks.length === 0) {
      return res.status(404).json({ message: 'No stocks found for the specified industry.' });
  }
  
  res.json({ stocks: filteredStocks });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

  