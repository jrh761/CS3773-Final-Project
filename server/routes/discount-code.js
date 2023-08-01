const express = require('express');
const { DiscountCode } = require('../models');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const discountCode = await DiscountCode.findAll();
    res.json(discountCode);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// router.get("/:code", async (req, res) => {
//   try {
//     const discountCode = await DiscountCode.findOne(req.param.code);
//     if (discountCode) {
//       res.json(discountCode);
//     } else {
//       res.status(404).json({ error: "Discount Code not found" });
//     }
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

router.post('/', async (req, res) => {
  try {
    const existingCode = await DiscountCode.findOne({
      where: {
        code: req.body.code,
      },
    });

    if (existingCode) {
      res.status(409).json({ error: 'Discount code already exists.' });
    } else {
      const discountCode = await DiscountCode.create({
        dollarAmount: req.body.dollarAmount,
        code: req.body.code,
      });
      res.status(201).json(discountCode);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
