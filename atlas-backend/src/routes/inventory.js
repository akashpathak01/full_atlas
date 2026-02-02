const express = require('express');
const router = express.Router();
const { getInventory, updateStock } = require('../controllers/inventoryController');
const { verifyToken, authorizeRoles } = require('../middleware/auth');

router.get('/', verifyToken, getInventory);
router.post('/update', verifyToken, authorizeRoles('STOCK_KEEPER', 'ADMIN'), updateStock);

module.exports = router;
