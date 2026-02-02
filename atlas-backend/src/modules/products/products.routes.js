const express = require('express');
const router = express.Router();
const productsController = require('./products.controller');
const authenticate = require('../../middlewares/auth.middleware');
const authorize = require('../../middlewares/role.middleware');

// Create Product - Admin/Super Admin only
router.post('/', authenticate, authorize(['ADMIN', 'SUPER_ADMIN']), productsController.createProduct);

// Get Products - Admin/Super Admin/Seller (Seller sees active only via query param logic in controller, but route access is open to them)
// Note: Frontend calls specific endpoints. The logic is handled in controller based on query params.
// Everyone authenticated can view products list, but Seller UI filters for 'active=true'. Admin UI shows all.
// Strict enforcement: We could force 'active=true' if role is SELLER in middleware, but query param is simpler for now.
router.get('/', authenticate, authorize(['ADMIN', 'SUPER_ADMIN', 'SELLER']), productsController.getProducts);

// Update Product - Admin/Super Admin only
router.patch('/:id', authenticate, authorize(['ADMIN', 'SUPER_ADMIN']), productsController.updateProduct);

module.exports = router;
