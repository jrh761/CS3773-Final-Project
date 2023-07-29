const express = require("express");
const { DiscountCode } = require("../models");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const discountCode = await DiscountCode.findAll();
    res.json(discountCode);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// router.get("/:code", async (req, res) => {
//   try {
//     const product = await Product.findByPk(req.params.id);
//     if (product) {
//       res.json(product);
//     } else {
//       res.status(404).json({ error: "Product not found" });
//     }
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

router.post("/", async (req, res) => {
  console.log("BODY", res.body);
  try {
    const existingCode = await DiscountCode.findOne({
        where: {
            code: req.body.code
        }
    })

    if (existingCode) {
        res.status(409).json({error: "Discount code already exists."})
    } else {
        const discountCode = await DiscountCode.create({
            dollarAmount: req.body.dollarAmount,
            code: req.body.code
        });
        res.status(201).json(discountCode);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
