const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
    const roles = await prisma.role.findMany();
    console.log('Roles in DB:', JSON.stringify(roles, null, 2));

    const users = await prisma.user.findMany({
        where: { email: 'admin@atlas.com' },
        include: { role: true }
    });
    console.log('Admin User in DB:', JSON.stringify(users, null, 2));
}

check().then(() => process.exit(0)).catch(err => { console.error(err); process.exit(1); });
