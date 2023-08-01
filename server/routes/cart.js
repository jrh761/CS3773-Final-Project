const express = require('express');
const { CartItem, Product } = require('../models');
const router = express.Router();

router.get('/', async (req, res) => {
  const { userId } = req.query;

  try {
    const cartItems = await CartItem.findAll({
      where: {
        userId,
      },
      include: {
        model: Product,
        as: 'product',
      },
    });

    res.json(cartItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/add', async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    let cartItem = await CartItem.findOne({
      where: {
        userId,
        productId,
      },
    });

    if (cartItem) {
      // If the item is already in the cart, increment the quantity
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      // If the item is not in the cart, add it
      cartItem = await CartItem.create({
        userId,
        productId,
        quantity,
      });
    }

    res.json(cartItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/update', async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    const cartItem = await CartItem.findOne({
      where: {
        userId,
        productId,
      },
    });

    if (cartItem) {
      cartItem.quantity = quantity;
      await cartItem.save();
      res.json(cartItem);
    } else {
      res.status(404).json({ error: 'Cart item not found.' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/remove-item', async (req, res) => {
  const { userId, productId } = req.query;

  try {
    const cartItem = await CartItem.findOne({
      where: {
        userId,
        productId,
      },
    });

    if (cartItem) {
      await cartItem.destroy();
      res.json({ message: 'Item removed from cart.' });
    } else {
      res.status(404).json({ error: 'Cart item not found.' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/remove-all', async (req, res) => {
  const { userId } = req.body;

  try {
    await CartItem.destroy({
      where: {
        userId,
      },
    });

    res.json({ message: 'All items removed from cart.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
