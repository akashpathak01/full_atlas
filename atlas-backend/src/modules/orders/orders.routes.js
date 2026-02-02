const express = require('express');
const router = express.Router();
const ordersController = require('./orders.controller');
const requireAuth = require('../../middlewares/auth.middleware');
const requireRole = require('../../middlewares/role.middleware');

router.post('/', requireAuth, requireRole(['SELLER', 'ADMIN']), ordersController.createOrder);
router.get('/', requireAuth, ordersController.getOrders);
router.get('/:id', requireAuth, ordersController.getOrderById);
router.patch('/:id/status', requireAuth, ordersController.updateStatus);

module.exports = router;
