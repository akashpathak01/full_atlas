const express = require('express');
const router = express.Router();
const usersController = require('./users.controller');
const requireAuth = require('../../middlewares/auth.middleware');
const requireRole = require('../../middlewares/role.middleware');

// Only Super Admin and Admin can access the users module
const allowedManagers = ['SUPER_ADMIN', 'ADMIN'];

router.post('/', requireAuth, requireRole(allowedManagers), usersController.createUser);
router.get('/', requireAuth, requireRole(allowedManagers), usersController.listUsers);
router.patch('/:id/status', requireAuth, requireRole(allowedManagers), usersController.updateStatus);

module.exports = router;
