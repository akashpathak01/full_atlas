import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NewProductForm } from '../../components/products/NewProductForm';
import api from '../../lib/api';

export function AdminAddProductPage() {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/admin/products');
    };

    const handleSubmit = async (payload) => {
        try {
            await api.post('/products', payload);
            navigate('/admin/products');
        } catch (error) {
            console.error("Error creating product:", error);
            const message = error.response?.data?.error || "Failed to create product. Please try again.";
            alert(message);
        }
    };

    return (
        <div className="p-6">
            <NewProductForm onBack={handleBack} onSubmit={handleSubmit} />
        </div>
    );
}
