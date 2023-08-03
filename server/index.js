const express = require('express');
const sequelize = require('./db');
const cors = require('cors');

// Routes
const productRoutes = require('./routes/products');
const userRoutes = require('./routes/users');
const discountCode = require('./routes/discount-code');
const cartRouter = require('./routes/cart');
const ordersRouter = require('./routes/orders');
const customerRouter = require('./routes/customer');

const app = express();

// Extra extensions
app.use(cors());
app.use(express.json());

// Add routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/discount-code', discountCode);
app.use('/api/cart', cartRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/customer', customerRouter);

// sync the database
sequelize.sync().then(() => {
  console.log('Database & tables created!');

  // start the server only after syncing
  app.listen(5000, () => {
    console.log('Server is running on port 5000');
  });
});
