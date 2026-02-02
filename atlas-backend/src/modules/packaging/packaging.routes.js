const express = require('express');
const router = express.Router();
const packagingController = require('./packaging.controller');
const { verifyToken, authorizeRoles } = require('../../middleware/auth');


router.post('/assign', verifyToken, authorizeRoles('ADMIN'), packagingController.assignOrder);
router.get('/tasks', verifyToken, authorizeRoles('ADMIN', 'PACKAGING_AGENT'), packagingController.listTasks);
router.patch('/tasks/:id/complete', verifyToken, authorizeRoles('PACKAGING_AGENT'), packagingController.completeTask);


module.exports = router;
