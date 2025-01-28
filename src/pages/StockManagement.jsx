import React, { useState, useEffect } from 'react';
import { getProducts, getProductByName, deleteProduct, editProduct, addProduct } from '../Api';
import StockTable from '../components/StockTable';
import ProductModal from '../components/ProductModal';

export default function StockManagementPage() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        console.log(data);
        setProducts(data);
      } catch (error) {
        console.error('Erreur lors du chargement des produits :', error);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = async (name) => {
    console.log(name);
    
    setSearchTerm(name);
    try {
      const data = await getProductByName(name);
      setProducts(data);
    } catch (error) {
      console.error('Erreur lors de la recherche du produit :', error);
    }
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleSaveProduct = async (formData) => {
    console.log(formData);
    if (editingProduct) {
      await editProduct(editingProduct.id, formData);
    } else {
      await addProduct(formData);
    }
    setIsModalOpen(false);
    const data = await getProducts();
    setProducts(data);
  };

  const handleDeleteProduct = async (productId) => {
    await deleteProduct(productId);
    const data = await getProducts();
    setProducts(data);
  };

  return (
    <div className="bg-stone-100 p-6">
      <header className="flex justify-between items-center mb-6 px-8">
        <div className="relative w-full mr-6">
          <input
            type="text"
            placeholder="Rechercher"
            className="w-full p-2 pl-4 pr-10 border border-stone-300 rounded-[22px]"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}  // Appel immédiat de la recherche
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-stone-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
            />
          </svg>
        </div>
        <button
          onClick={handleAddProduct}
          className="bg-stone-900 text-white py-2 px-6 rounded-[22px] hover:bg-stone-800 whitespace-nowrap"
        >
          Ajouter un article +
        </button>
      </header>

      <StockTable
        products={products}
        onDelete={handleDeleteProduct}
        onUpdate={handleEditProduct}
      />
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={editingProduct}
        onSave={handleSaveProduct}
      />
    </div>
  );
}
