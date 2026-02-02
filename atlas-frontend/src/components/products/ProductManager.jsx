import React, { useState } from 'react';
import api from '../../lib/api';
import { ProductsList } from './ProductsList';
import { NewProductForm } from './NewProductForm';

export function ProductManager({ initialProducts = [] }) {
    const [view, setView] = useState('list'); // 'list' or 'form'
    const [products, setProducts] = useState(initialProducts);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch products on mount
    React.useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await api.get('/products');
            setProducts(response.data);
            setError(null);
        } catch (err) {
            console.error('Failed to fetch products:', err);
            setError('Failed to load products');
        } finally {
            setLoading(false);
        }
    };

    const handleAddProduct = async (newProductData) => {
        setLoading(true);
        try {
            await api.post('/products', newProductData);
            await fetchProducts(); // Refresh list
            setView('list');
        } catch (err) {
            console.error('Failed to create product:', err);
            alert('Failed to create product. Please check your input.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="animate-in fade-in duration-300">
            {view === 'list' ? (
                <ProductsList
                    products={products}
                    onAddProduct={() => setView('form')}
                />
            ) : (
                <NewProductForm
                    onBack={() => setView('list')}
                    onSubmit={handleAddProduct}
                />
            )}
        </div>
    );
}
