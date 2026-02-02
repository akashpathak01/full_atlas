const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createProduct = async (req, res) => {
    try {
        const {
            name,
            nameAr,
            category,
            purchasePrice,
            sellingPrice,
            price,
            stockQuantity,
            stock,
            description,
            productLink,
            warehouse,
            variants,
            status,
            sellerId
        } = req.body;

        const finalName = name || req.body.nameEn;
        const finalPrice = parseFloat(sellingPrice || price);

        if (!finalName) {
            return res.status(400).json({ error: 'Product Name is required' });
        }
        if (isNaN(finalPrice)) {
            return res.status(400).json({ error: 'Selling Price is required and must be a number' });
        }

        const sku = req.body.sku || req.body.code || `SKU-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

        const productData = {
            name: finalName,
            nameAr: nameAr || null,
            sku: sku,
            category: category || 'Uncategorized',
            description: description || '',
            purchasePrice: purchasePrice ? parseFloat(purchasePrice) : null,
            price: finalPrice,
            stock: parseInt(stockQuantity || stock || 0),
            status: status || 'Active',
            productLink: productLink || null,
            variants: variants || [],
            sellerId: sellerId ? parseInt(sellerId) : null
        };

        const product = await prisma.product.create({
            data: productData
        });

        return res.status(201).json(product);
    } catch (error) {
        console.error('Error creating product:', error);
        if (error.code === 'P2002') {
            return res.status(400).json({ error: 'A product with this SKU already exists' });
        }
        return res.status(500).json({ error: 'Failed to create product', details: error.message });
    }
};

const getProducts = async (req, res) => {
    try {
        const { active } = req.query;
        const { role, id: userId, sellerId } = req.user;
        const where = {};

        if (role === 'SELLER') {
            if (!sellerId) return res.json([]);
            where.sellerId = sellerId;
        } else if (role === 'ADMIN') {
            // Admin sees ONLY products from sellers they manage
            where.seller = { adminId: userId };

            // Allow filtering by specific seller (e.g., in Create Order dropdown)
            if (req.query.sellerId) {
                where.sellerId = parseInt(req.query.sellerId);
            }
        }

        if (active === 'true') {
            where.status = 'Active';
        }

        const products = await prisma.product.findMany({
            where,
            include: {
                seller: {
                    include: {
                        user: {
                            select: { name: true }
                        }
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        return res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        return res.status(500).json({ error: 'Failed to fetch products' });
    }
};


const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { image, ...updateData } = req.body; // Ignore image field in updates too

        // Convert types if present
        if (updateData.price) updateData.price = parseFloat(updateData.price);
        if (updateData.purchasePrice) updateData.purchasePrice = parseFloat(updateData.purchasePrice);
        if (updateData.stock) updateData.stock = parseInt(updateData.stock);

        const product = await prisma.product.update({
            where: { id: parseInt(id) },
            data: updateData
        });

        return res.json(product);
    } catch (error) {
        console.error('Error updating product:', error);
        return res.status(500).json({ error: 'Failed to update product' });
    }
};

module.exports = {
    createProduct,
    getProducts,
    updateProduct
};
