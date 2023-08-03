const express = require('express');
const { Order, OrderItem, Product } = require('../models');
const router = express.Router();

router.post('/checkout', async (req, res) => {
  const { userId, cartItems } = req.body;
  try {
    const newOrder = await Order.create({
      userId,
    });

    const orderItems = cartItems.map((item) => ({
      orderId: newOrder.orderId,
      productId: item.productId,
      quantity: item.quantity,
      price: item.price,
    }));

    await OrderItem.bulkCreate(orderItems);
    await newOrder.update({ confirmed: true });

    // reduce the quantity of products
    for (const item of cartItems) {
      const product = await Product.findByPk(item.productId);
      if (product) {
        await product.update({
          quantity: product.quantity - item.quantity,
        });
      }
    }

    res.json(newOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:userId', async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: {
        userId: req.params.userId,
      },
      include: {
        model: OrderItem,
      },
    });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
