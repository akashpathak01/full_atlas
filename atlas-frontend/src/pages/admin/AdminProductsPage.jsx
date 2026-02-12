import api from '../../lib/api';
import { ProductsList } from '../../components/products/ProductsList';
import { Card, CardContent } from '../../components/ui/Card';
import { X, Package, Tag, DollarSign, Box, Warehouse, User, Info, CheckCircle2, Clock } from 'lucide-react';
import React from 'react'; // Added React import
import { useNavigate } from 'react-router-dom'; // Added useNavigate import

export function AdminProductsPage() {
    const [products, setProducts] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [viewingProduct, setViewingProduct] = React.useState(null);
    const navigate = useNavigate();

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await api.get('/products');
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        fetchProducts();
    }, []);

    const handleAddProduct = () => {
        navigate('/admin/products/add');
    };

    const handleEditProduct = (product) => {
        navigate(`/admin/products/edit/${product.id}`);
    };

    const handleViewProduct = async (product) => {
        try {
            const response = await api.get(`/products/${product.id}`);
            setViewingProduct(response.data);
        } catch (error) {
            console.error("Error fetching product details:", error);
            alert("Failed to fetch product details");
        }
    };

    const handleDeleteProduct = async (product) => {
        if (!window.confirm(`Are you sure you want to delete "${product.name}"?`)) {
            return;
        }

        try {
            await api.delete(`/products/${product.id}`);
            setProducts(products.filter(p => p.id !== product.id));
        } catch (error) {
            console.error("Error deleting product:", error);
            alert("Failed to delete product");
        }
    };

    if (loading) return <div className="p-6 text-center">Loading products...</div>;

    return (
        <div className="p-0">
            <ProductsList
                products={products}
                onAddProduct={handleAddProduct}
                onEdit={handleEditProduct}
                onDelete={handleDeleteProduct}
                onView={handleViewProduct}
            />

            {/* Product Details Modal */}
            {viewingProduct && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-300 p-4">
                    <Card className="w-full max-w-3xl bg-white shadow-2xl overflow-hidden border-0">
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-[#E15B2D] text-white">
                            <h2 className="text-xl font-bold flex items-center">
                                <Package className="w-6 h-6 mr-2" />
                                Product Details
                            </h2>
                            <button onClick={() => setViewingProduct(null)} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <CardContent className="p-8">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {/* Product Image */}
                                <div className="space-y-4">
                                    <div className="aspect-square bg-gray-100 rounded-2xl flex items-center justify-center overflow-hidden border-2 border-gray-50">
                                        {viewingProduct.image ? (
                                            <img src={viewingProduct.image} alt={viewingProduct.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <Package className="w-16 h-16 text-gray-300" />
                                        )}
                                    </div>
                                    <div className={`px-4 py-2 rounded-xl text-center font-bold text-sm ${viewingProduct.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                                        }`}>
                                        {viewingProduct.status}
                                    </div>
                                </div>

                                {/* Main Info */}
                                <div className="md:col-span-2 space-y-6">
                                    <div>
                                        <h3 className="text-2xl font-black text-gray-900">{viewingProduct.name}</h3>
                                        <p className="text-sm text-gray-500 font-medium">{viewingProduct.category || 'Uncategorized'}</p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <InfoCard label="SKU/Code" value={viewingProduct.sku || viewingProduct.code || 'N/A'} icon={<Tag className="w-4 h-4 text-orange-500" />} />
                                        <InfoCard label="Price" value={`${viewingProduct.price} AED`} icon={<DollarSign className="w-4 h-4 text-emerald-500" />} />
                                        <InfoCard label="Stock" value={viewingProduct.stock || 0} icon={<Box className="w-4 h-4 text-blue-500" />} />
                                        <InfoCard label="Purchase Price" value={viewingProduct.purchasePrice ? `${viewingProduct.purchasePrice} AED` : 'N/A'} icon={<DollarSign className="w-4 h-4 text-gray-400" />} />
                                    </div>

                                    <div className="space-y-4 pt-4 border-t border-gray-100">
                                        <div className="flex items-center space-x-4">
                                            <div className="flex-1">
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Seller</p>
                                                <div className="flex items-center font-bold text-gray-800">
                                                    <User className="w-4 h-4 mr-2 text-orange-500" />
                                                    {viewingProduct.seller?.shopName || viewingProduct.seller?.user?.name || 'N/A'}
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Warehouse</p>
                                                <div className="flex items-center font-bold text-gray-800">
                                                    <Warehouse className="w-4 h-4 mr-2 text-blue-500" />
                                                    {viewingProduct.inventory?.[0]?.warehouse?.name || 'No Warehouse'}
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Description</p>
                                            <p className="text-sm text-gray-600 leading-relaxed">
                                                {viewingProduct.description || 'No description available for this product.'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end space-x-3">
                                <button
                                    onClick={() => handleEditProduct(viewingProduct)}
                                    className="px-6 py-2.5 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-all active:scale-95"
                                >
                                    Edit Product
                                </button>
                                <button
                                    onClick={() => setViewingProduct(null)}
                                    className="px-6 py-2.5 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-all active:scale-95"
                                >
                                    Close
                                </button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}

function InfoCard({ label, value, icon }) {
    return (
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <div className="flex items-center gap-2 mb-1">
                {icon}
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</span>
            </div>
            <div className="text-sm font-bold text-gray-900 ml-6">{value}</div>
        </div>
    );
}
