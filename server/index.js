const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// Mock Payment Gateway Endpoint
app.post('/api/checkout', (req, res) => {
  const { customer, cart, total } = req.body;

  if (!customer || !cart || cart.length === 0) {
    return res.status(400).json({ error: 'Invalid checkout data.' });
  }

  // Simulate payment processing delay (1.5 seconds)
  setTimeout(() => {
    // 90% chance of success for the mock
    const isSuccess = Math.random() < 0.9;

    if (isSuccess) {
      // Insert into DB
      const stmt = db.prepare(`INSERT INTO orders (customer_name, customer_email, total_amount, items, status) VALUES (?, ?, ?, ?, ?)`);
      stmt.run([customer.name, customer.email, total, JSON.stringify(cart), 'paid'], function(err) {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Failed to save order.' });
        }
        
        res.json({
          success: true,
          message: 'Payment successful!',
          orderId: this.lastID
        });
      });
      stmt.finalize();
    } else {
      res.status(400).json({ success: false, error: 'Payment declined by bank.' });
    }
  }, 1500);
});

// Get orders endpoint
app.get('/api/orders', (req, res) => {
  db.all('SELECT * FROM orders ORDER BY created_at DESC', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ orders: rows });
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
