import React, { useState, useEffect } from 'react';
import { getProducts, delProduct, updateProduct } from '../Api'; // Import des fonctions API

const StockManagementPage = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Charger les produits depuis l'API
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Erreur lors du chargement des produits :', error);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    try {
      await delProduct(productId);
      setProducts(products.filter((product) => product.id !== productId));
    } catch (error) {
      console.error('Erreur lors de la suppression du produit :', error);
    }
  };

  const handleUpdate = (productId) => {
    console.log(`Modifier le produit avec ID : ${productId}`);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestion des stocks</h1>
        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Ajouter un article +
        </button>
      </header>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Rechercher"
          className="w-full p-2 border border-gray-300 rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table className="w-full bg-white rounded shadow">
        <thead className="bg-gray-200">
          <tr>
            <th className="text-left p-4">Nom produit</th>
            <th className="text-left p-4">Entrepôt</th>
            <th className="text-left p-4">Status</th>
            <th className="text-left p-4">Prix</th>
            <th className="text-left p-4">Modifier</th>
            <th className="text-left p-4">Supprimer</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.id} className="border-t">
              <td className="p-4">{product.name}</td>
              <td className="p-4">{product.warehouse}</td>
              <td
                className={`p-4 font-bold ${
                  product.status === 'En stock'
                    ? 'text-green-500'
                    : product.status === 'Rupture'
                    ? 'text-red-500'
                    : 'text-yellow-500'
                }`}
              >
                {product.status}
              </td>
              <td className="p-4">{product.price}€</td>
              <td className="p-4">
                <button
                  onClick={() => handleUpdate(product.id)}
                  className="text-blue-500 hover:underline"
                >
                  Modifier
                </button>
              </td>
              <td className="p-4">
                <button
                  onClick={() => handleDelete(product.id)}
                  className="text-red-500 hover:underline"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockManagementPage;