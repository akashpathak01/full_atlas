
const express = require('express');
const request = require('supertest');

// Mock Authentication Middleware
const requireAuth = (req, res, next) => {
    req.user = { id: 10, role: 'DELIVERY_AGENT' }; // Simulate logged in user
    next();
};

const requireRole = (roles) => (req, res, next) => {
    if (roles.includes(req.user.role)) next();
    else res.status(403).json({ message: 'Forbidden' });
};

// Import ACTUAL controllers and routes
// We need to handle potential relative path issues by using absolute or ensuring CWD is root
try {
    const deliveryController = require('./atlas-backend/src/modules/delivery/delivery.controller');
    const ordersController = require('./atlas-backend/src/modules/orders/orders.controller');

    console.log('Delivery Controller Config:', Object.keys(deliveryController));
    console.log('Is getDeliveryOrders a function?', typeof deliveryController.getDeliveryOrders);

    const app = express();
    app.use(express.json());

    // Reconstruct the router logic manually to test matching
    const router = express.Router();

    // Exact copy of orders.routes.js logic
    router.get('/delivery', requireAuth, requireRole(['DELIVERY_AGENT', 'ADMIN']), (req, res) => {
        console.log("HIT /delivery route!");
        deliveryController.getDeliveryOrders(req, res);
    });

    router.get('/:id', requireAuth, ordersController.getOrderById);

    app.use('/api/orders', router);

    // Test the route
    console.log("\n--- Testing GET /api/orders/delivery ---");
    request(app)
        .get('/api/orders/delivery')
        .expect(200)
        .end((err, res) => {
            if (err) {
                console.log("Request Failed:", res ? res.body : err);
                console.log("Status:", res ? res.status : 'No Response');
            } else {
                console.log("Request Succeeded!");
                // console.log("Body:", res.body); // Body might be empty DB result, but status 200 is key
            }
        });

} catch (e) {
    console.error("Setup Error:", e);
}
