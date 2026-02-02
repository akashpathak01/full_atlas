import React from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../lib/api';
import { ProductsList } from '../../components/products/ProductsList'; // Assuming ProductsList component path

export function AdminProductsPage() {
    const [products, setProducts] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const navigate = useNavigate();

    React.useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get('/products');
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const handleAddProduct = () => {
        navigate('/admin/products/add');
    };

    if (loading) return <div className="p-6 text-center">Loading products...</div>;

    return (
        <div className="p-0">
            <ProductsList products={products} onAddProduct={handleAddProduct} />
        </div>
    );
}
