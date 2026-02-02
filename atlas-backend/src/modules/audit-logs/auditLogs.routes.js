const express = require('express');
const router = express.Router();
const auditLogsController = require('./auditLogs.controller');
const requireAuth = require('../../middlewares/auth.middleware');
const requireRole = require('../../middlewares/role.middleware');

// Only Super Admin can view audit logs
router.get('/', requireAuth, requireRole(['SUPER_ADMIN']), auditLogsController.listLogs);
router.get('/:id', requireAuth, requireRole(['SUPER_ADMIN']), auditLogsController.getLogById);

module.exports = router;
