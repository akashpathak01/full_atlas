
try {
    const deliveryController = require('./atlas-backend/src/modules/delivery/delivery.controller');
    console.log('Delivery Controller Config:', Object.keys(deliveryController));
    console.log('Is getDeliveryOrders a function?', typeof deliveryController.getDeliveryOrders);
} catch (e) {
    console.error("Error loading controller:", e);
}
