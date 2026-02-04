
const prisma = require('./atlas-backend/src/utils/prisma');

async function main() {
    console.log("--- DEBUGGING DELIVERY DATA ---");

    // 1. List Delivery Agents
    const agents = await prisma.user.findMany({
        where: { role: { name: 'DELIVERY_AGENT' } },
        select: { id: true, name: true, email: true, createdById: true }
    });
    console.log("\n1. Delivery Agents:", JSON.stringify(agents, null, 2));

    // 2. List Admins (to verify IDs)
    const admins = await prisma.user.findMany({
        where: { role: { name: 'ADMIN' } },
        select: { id: true, name: true, email: true }
    });
    console.log("\n2. Admins:", JSON.stringify(admins, null, 2));

    // 3. List PACKED Orders and their Sellers
    const packedOrders = await prisma.order.findMany({
        where: { status: 'PACKED' },
        select: {
            id: true,
            orderNumber: true,
            status: true,
            seller: {
                select: {
                    id: true,
                    shopName: true,
                    adminId: true,
                    user: { select: { name: true } }
                }
            }
        }
    });
    console.log("\n3. PACKED Orders:", JSON.stringify(packedOrders, null, 2));

    // 4. Check potential matches
    console.log("\n4. Potential Matches (Agent -> Order):");
    agents.forEach(agent => {
        if (!agent.createdById) {
            console.log(`- Agent ${agent.name} (ID: ${agent.id}) has NO createdById (Admin). See NO orders.`);
        } else {
            const matches = packedOrders.filter(o => o.seller && o.seller.adminId === agent.createdById);
            console.log(`- Agent ${agent.name} (ID: ${agent.id}) created by Admin ${agent.createdById} should see ${matches.length} orders.`);
            matches.forEach(m => console.log(`  -> Order ${m.orderNumber} (Seller Admin: ${m.seller.adminId})`));
        }
    });
}

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
