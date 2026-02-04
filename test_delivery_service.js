
const deliveryService = require('./atlas-backend/src/modules/delivery/delivery.service');
const prisma = require('./atlas-backend/src/utils/prisma');

async function main() {
    console.log("--- TESTING DELIVERY SERVICE ---");

    // mimic the logged in user based on previous debug findings
    const user = {
        id: 15, // 'del s'
        role: 'DELIVERY_AGENT'
    };

    try {
        const orders = await deliveryService.getDeliveryOrders(user);
        console.log("Result Orders:", JSON.stringify(orders, null, 2));
    } catch (error) {
        console.error("Error:", error);
    }
}

main()
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect();
    });
