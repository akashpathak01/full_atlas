const express = require('express');
const router = express.Router();
const callCenterController = require('./callCenter.controller');
const requireAuth = require('../../middlewares/auth.middleware');
const requireRole = require('../../middlewares/role.middleware');

// Customer Routes
router.get('/customers', requireAuth, requireRole(['ADMIN', 'SUPER_ADMIN', 'CALL_CENTER_AGENT', 'CALL_CENTER_MANAGER']), callCenterController.getCustomers);
router.get('/customers/:id', requireAuth, requireRole(['ADMIN', 'SUPER_ADMIN', 'CALL_CENTER_AGENT', 'CALL_CENTER_MANAGER']), callCenterController.getCustomerById);

// Order Routes
router.get('/orders', requireAuth, requireRole(['ADMIN', 'SUPER_ADMIN', 'CALL_CENTER_AGENT', 'CALL_CENTER_MANAGER']), callCenterController.getOrders);
router.patch('/orders/:id/status', requireAuth, requireRole(['ADMIN', 'SUPER_ADMIN', 'CALL_CENTER_AGENT']), callCenterController.updateStatus);

// Notes Routes
router.post('/orders/:id/notes', requireAuth, requireRole(['ADMIN', 'SUPER_ADMIN', 'CALL_CENTER_AGENT']), callCenterController.addNote);
router.get('/orders/:id/notes', requireAuth, requireRole(['ADMIN', 'SUPER_ADMIN', 'CALL_CENTER_AGENT', 'CALL_CENTER_MANAGER']), callCenterController.getNotes);

// Manager Routes
router.get('/agents', requireAuth, requireRole(['ADMIN', 'SUPER_ADMIN', 'CALL_CENTER_MANAGER']), callCenterController.getAgents);
router.get('/performance', requireAuth, requireRole(['ADMIN', 'SUPER_ADMIN', 'CALL_CENTER_MANAGER']), callCenterController.getPerformance);

module.exports = router;
