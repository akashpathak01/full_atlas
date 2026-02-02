const express = require('express');
const router = express.Router();
const packagingController = require('./packaging.controller');
const requireAuth = require('../../middlewares/auth.middleware');
const requireRole = require('../../middlewares/role.middleware');

router.post('/assign', requireAuth, requireRole(['ADMIN']), packagingController.assignOrder);
router.get('/tasks', requireAuth, requireRole(['ADMIN', 'PACKAGING_AGENT']), packagingController.listTasks);
router.patch('/tasks/:id/complete', requireAuth, requireRole(['PACKAGING_AGENT']), packagingController.completeTask);

module.exports = router;
