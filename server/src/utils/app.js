const express = require('express');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
<<<<<<< HEAD
=======
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

>>>>>>> 52ed44e3 (feat: Add food category management functionality)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes (multer needs to go before body parsers)
const foodRoutes = require("../routes/food.routes.js");
const orderRoutes = require("../routes/orderRoutes.js");
const cartRoutes = require("../routes/cart.routes.js");
<<<<<<< HEAD
const userRoutes = require("../routes/user.routes.js");
const adminRoutes = require("../routes/adminRoutes.js");
=======
const userRoutes = require("../routes/user.routes.js")
const adminRoutes = require("../routes/adminRoutes.js")
const foodCategoryRoutes = require("../routes/foodCategory.routes.js")


>>>>>>> 52ed44e3 (feat: Add food category management functionality)

// Test route
app.get('/', (req, res) => {
  res.send('Food App Backend Running...');
});

app.use("/api/food", foodRoutes);  // multer-based routes come first
app.use("/api/orders", orderRoutes);
<<<<<<< HEAD
app.use("/api/cart", cartRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);

=======
app.use("/api/cart", cartRoutes)
app.use("/api/user", userRoutes)
app.use("api/admin", adminRoutes)
app.use('/api/food-categories', foodCategoryRoutes);
>>>>>>> 52ed44e3 (feat: Add food category management functionality)


module.exports = app;
