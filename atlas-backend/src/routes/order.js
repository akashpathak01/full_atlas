const express = require('express');
const router = express.Router();
const { getOrders, getOrderById, createOrder, updateOrderStatus, getPackagingOrders } = require('../controllers/orderController');
const { verifyToken, authorizeRoles } = require('../middleware/auth');

router.get('/packaging', verifyToken, getPackagingOrders);
router.get('/', verifyToken, getOrders);
router.post('/', verifyToken, createOrder);
router.patch('/:id/status', verifyToken, updateOrderStatus);
router.get('/:id', verifyToken, getOrderById);

module.exports = router;
