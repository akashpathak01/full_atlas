const express = require('express');
const router = express.Router();
const { createProduct, getAllProducts, getActiveProducts } = require('../controllers/productController');
const { verifyToken, authorizeRoles } = require('../middleware/auth');

// Admin only: Create and view all products
router.post('/', verifyToken, authorizeRoles('ADMIN', 'SUPER_ADMIN'), createProduct);
router.get('/', verifyToken, authorizeRoles('ADMIN', 'SUPER_ADMIN'), getAllProducts);

// Seller/Admin: View active products for order creation
router.get('/active', verifyToken, getActiveProducts);

module.exports = router;
