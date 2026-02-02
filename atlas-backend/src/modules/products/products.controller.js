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
            price, // sometimes frontend sends price
            stockQuantity,
            stock, // sometimes frontend sends stock
            description,
            productLink,
            warehouse,
            variants,
            status
        } = req.body;

        // Basic validation
        const finalName = name || req.body.nameEn;
        const finalPrice = parseFloat(sellingPrice || price);

        if (!finalName) {
            return res.status(400).json({ error: 'Product Name is required' });
        }
        if (isNaN(finalPrice)) {
            return res.status(400).json({ error: 'Selling Price is required and must be a number' });
        }

        // Generate SKU if not provided
        const sku = req.body.sku || req.body.code || `SKU-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

        // Map data to Prisma model
        const productData = {
            name: finalName,
            nameAr: nameAr || null,
            sku: sku,
            category: category || 'Uncategorized',
            description: description || '',
            purchasePrice: purchasePrice ? parseFloat(purchasePrice) : null,
            price: finalPrice,
            stock: parseInt(stockQuantity || stock || 0),
            status: status || 'Active', // Default to Active as per requirement
            productLink: productLink || null,
            variants: variants || [],
            // Ignore image as per requirement
        };

        const product = await prisma.product.create({
            data: productData
        });

        return res.status(201).json(product);
    } catch (error) {
        console.error('Error creating product:', error);
        // Handle unique constraint on SKU
        if (error.code === 'P2002') {
            return res.status(400).json({ error: 'A product with this SKU already exists' });
        }
        return res.status(500).json({ error: 'Failed to create product', details: error.message });
    }
};

const getProducts = async (req, res) => {
    try {
        const { active } = req.query;
        const where = {};

        // If active=true is passed (e.g. from Seller view), filter by status
        if (active === 'true') {
            where.status = 'Active';
        }

        const products = await prisma.product.findMany({
            where,
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
