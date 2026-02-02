const express = require('express');
const router = express.Router();
const { getOrders, getOrderById, createOrder, updateOrderStatus } = require('../controllers/orderController');
const { verifyToken, authorizeRoles } = require('../middleware/auth');

router.get('/', verifyToken, getOrders);
router.get('/:id', verifyToken, getOrderById);
router.post('/', verifyToken, createOrder);
router.patch('/:id/status', verifyToken, updateOrderStatus);

module.exports = router;
