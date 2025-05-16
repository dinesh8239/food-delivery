const express = require('express');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors({
  origin: 'http://localhost:8000',  
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],

}));
app.use(express.json());

const foodRoutes = require("../routes/food.routes.js");
const orderRoutes = require("../routes/orderRoutes.js");
const cartRoutes = require("../routes/cart.routes.js");
const userRoutes = require("../routes/user.routes.js")
const adminRoutes = require("../routes/adminRoutes.js")


// Test route
app.get('/', (req, res) => {
  res.send('Food App Backend Running...');
});

app.use("/api/food", foodRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes)
app.use("/api/user", userRoutes)
app.use("api/admin", adminRoutes)

module.exports = app;
