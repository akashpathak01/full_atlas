const prisma = require('../utils/prisma');

const createProduct = async (req, res) => {
    const { name, sku, price, stock, description, status, category, productLink, variants } = req.body;

    if (!name || !sku || price === undefined) {
        return res.status(400).json({ message: 'Name, SKU, and Price are required' });
    }

    try {
        const product = await prisma.product.create({
            data: {
                name,
                sku,
                price: parseFloat(price),
                stock: parseInt(stock) || 0,
                description: description || '',
                status: status || 'ACTIVE',
                category: category || 'Uncategorized',
                productLink: productLink || '',
                variants: variants || []
            }
        });
        res.status(201).json(product);
    } catch (error) {
        if (error.code === 'P2002') {
            return res.status(400).json({ message: 'Product with this SKU already exists' });
        }
        res.status(500).json({ message: 'Error creating product', error: error.message });
    }
};

const getAllProducts = async (req, res) => {
    try {
        let where = {};

        // Sellsers only see ACTIVE products
        if (req.user.role === 'SELLER') {
            where.status = 'ACTIVE';
        }

        const products = await prisma.product.findMany({
            where,
            orderBy: { createdAt: 'desc' }
        });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
};

const getActiveProducts = async (req, res) => {
    try {
        const products = await prisma.product.findMany({
            where: { status: 'ACTIVE' },
            orderBy: { name: 'asc' }
        });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching active products', error: error.message });
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getActiveProducts
};
