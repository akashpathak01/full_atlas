const express = require('express');
const router = express.Router();
const usersController = require('./users.controller');
const { verifyToken, authorizeRoles } = require('../../middleware/auth');


// Only Super Admin and Admin can access the users module
const allowedManagers = ['SUPER_ADMIN', 'ADMIN'];

router.post('/', verifyToken, authorizeRoles(allowedManagers), usersController.createUser);
router.get('/', verifyToken, authorizeRoles(allowedManagers), usersController.listUsers);
router.patch('/:id/status', verifyToken, authorizeRoles(allowedManagers), usersController.updateStatus);


module.exports = router;
