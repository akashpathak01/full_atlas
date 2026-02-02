const express = require('express');
const router = express.Router();
const callCenterController = require('./callCenter.controller');
const { verifyToken, authorizeRoles } = require('../../middleware/auth');

// Customer Routes
router.get('/customers', verifyToken, authorizeRoles('ADMIN', 'SUPER_ADMIN', 'CALL_CENTER_AGENT', 'CALL_CENTER_MANAGER'), callCenterController.getCustomers);
router.get('/customers/:id', verifyToken, authorizeRoles('ADMIN', 'SUPER_ADMIN', 'CALL_CENTER_AGENT', 'CALL_CENTER_MANAGER'), callCenterController.getCustomerById);

// Order Routes
router.get('/orders', verifyToken, authorizeRoles('ADMIN', 'SUPER_ADMIN', 'CALL_CENTER_AGENT', 'CALL_CENTER_MANAGER'), callCenterController.getOrders);
router.patch('/orders/:id/status', verifyToken, authorizeRoles('ADMIN', 'SUPER_ADMIN', 'CALL_CENTER_AGENT'), callCenterController.updateStatus);

// Notes Routes
router.post('/orders/:id/notes', verifyToken, authorizeRoles('ADMIN', 'SUPER_ADMIN', 'CALL_CENTER_AGENT'), callCenterController.addNote);
router.get('/orders/:id/notes', verifyToken, authorizeRoles('ADMIN', 'SUPER_ADMIN', 'CALL_CENTER_AGENT', 'CALL_CENTER_MANAGER'), callCenterController.getNotes);

// Manager Routes
router.get('/agents', verifyToken, authorizeRoles('ADMIN', 'SUPER_ADMIN', 'CALL_CENTER_MANAGER'), callCenterController.getAgents);
router.get('/performance', verifyToken, authorizeRoles('ADMIN', 'SUPER_ADMIN', 'CALL_CENTER_MANAGER'), callCenterController.getPerformance);


module.exports = router;
