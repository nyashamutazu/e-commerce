const express = require("express");
const router = express.Router();

const authRoutes = require('./auth');
const userRoutes = require('./user');
const categoryRoutes = require('./category');
const productRoutes = require('./product');


router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/category', categoryRoutes);
router.use('/product', productRoutes)

module.exports = router;