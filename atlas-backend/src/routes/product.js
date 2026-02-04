const express = require('express');
const router = express.Router();
const { createProduct, getAllProducts, getActiveProducts } = require('../modules/products/products.controller');
const { verifyToken, authorizeRoles } = require('../middleware/auth');

// Admin only: Create and view all products
router.post('/', verifyToken, authorizeRoles('ADMIN', 'SUPER_ADMIN'), createProduct);
router.get('/', verifyToken, authorizeRoles('ADMIN', 'SUPER_ADMIN', 'STOCK_KEEPER'), getAllProducts);

// Seller/Admin: View active products for order creation
router.get('/active', verifyToken, getActiveProducts);

module.exports = router;
