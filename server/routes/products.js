const express = require('express');
const { Product } = require('../models');
const router = express.Router();

// For image processing
const multer = require('multer');
const upload = multer();

router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', upload.single('photo'), async (req, res) => {
  try {
    const product = await Product.create({
      productName: req.body.productName,
      description: req.body.description,
      quantity: Number(req.body.quantity),
      category: req.body.category,
      price: Number(req.body.price),
      photo: req.file ? req.file.buffer : null,
    });
    res.status(201).json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
