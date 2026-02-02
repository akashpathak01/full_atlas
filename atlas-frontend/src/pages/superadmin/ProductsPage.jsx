import React from 'react';
import { ProductManager } from '../../components/products/ProductManager';
import { productsData } from '../../data/superAdminDummyData';

export function ProductsPage() {
    return <ProductManager initialProducts={[]} />; // Start empty as per screenshot "No Products Found" or use productsData if preferred. Screenshot shows 0.
}
