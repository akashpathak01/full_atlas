const express = require('express');
const router = express.Router();
const sellersController = require('./sellers.controller');
const { verifyToken, authorizeRoles } = require('../../middleware/auth');

// Super Admin can view all, Admin can manage their own
router.get('/', verifyToken, authorizeRoles('SUPER_ADMIN', 'ADMIN'), sellersController.listSellers);
router.post('/', verifyToken, authorizeRoles('SUPER_ADMIN', 'ADMIN'), sellersController.onboardSeller);



module.exports = router;
