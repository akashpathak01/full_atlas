const express = require('express');
const router = express.Router();
const financeController = require('./finance.controller.js');
const requireAuth = require('../../middlewares/auth.middleware');
const requireRole = require('../../middlewares/role.middleware');

router.get('/summary', requireAuth, requireRole(['SUPER_ADMIN', 'ADMIN', 'SELLER']), financeController.getSummary);
router.get('/orders', requireAuth, requireRole(['SUPER_ADMIN', 'ADMIN', 'SELLER']), financeController.getOrders);

module.exports = router;
