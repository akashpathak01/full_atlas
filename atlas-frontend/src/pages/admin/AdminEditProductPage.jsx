import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { NewProductForm } from '../../components/products/NewProductForm';
import api from '../../lib/api';

export function AdminEditProductPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await api.get(`/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error("Error fetching product for edit:", error);
                alert("Failed to fetch product details");
                navigate('/admin/products');
            } finally {
                setIsLoading(false);
            }
        };
        fetchProduct();
    }, [id, navigate]);

    const handleBack = () => {
        navigate('/admin/products');
    };

    const handleSubmit = async (payload) => {
        try {
            await api.put(`/products/${id}`, payload);
            navigate('/admin/products');
        } catch (error) {
            console.error("Error updating product:", error);
            const message = error.response?.data?.error || "Failed to update product. Please try again.";
            alert(message);
        }
    };

    if (isLoading) {
        return <div className="p-8 text-center animate-pulse text-gray-500 font-bold">Loading product details...</div>;
    }

    return (
        <div className="p-0">
            <NewProductForm onBack={handleBack} onSubmit={handleSubmit} initialData={product} />
        </div>
    );
}
