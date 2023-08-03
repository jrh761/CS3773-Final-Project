const express = require('express');
const { Customer } = require('../models');
const router = express.Router();

router.post('/', async (req, res) => {
  const customerData = req.body;
  try {
    const customer = await Customer.create(customerData);
    res.json(customer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:userId', async (req, res) => {
  try {
    const customer = await Customer.findOne({
      where: {
        userId: req.params.userId,
      },
    });

    if (customer) {
      res.json(customer);
    } else {
      res.status(404).json({ error: 'Customer not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
