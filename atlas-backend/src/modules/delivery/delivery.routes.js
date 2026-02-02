const express = require('express');
const router = express.Router();
const deliveryController = require('./delivery.controller');
const requireAuth = require('../../middlewares/auth.middleware');
const requireRole = require('../../middlewares/role.middleware');

router.post('/assign', requireAuth, requireRole(['ADMIN']), deliveryController.assignOrder);
router.get('/tasks', requireAuth, requireRole(['ADMIN', 'DELIVERY_AGENT']), deliveryController.listTasks);
router.patch('/tasks/:id/start', requireAuth, requireRole(['DELIVERY_AGENT']), deliveryController.startDelivery);
router.patch('/tasks/:id/complete', requireAuth, requireRole(['DELIVERY_AGENT']), deliveryController.completeDelivery);

module.exports = router;
