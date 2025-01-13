import React, { useState, useEffect } from "react";

const ProductModal = ({ isOpen, onClose, product, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    warehouse: "",
    status: "",
    price: "",
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description || "",
        warehouse: product.warehouse,
        status: product.status,
        price: product.price,
      });
    }
  }, [product]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-stone-800 text-white p-6 rounded-[32px] shadow-lg">
        <h2 className="text-xl font-semibold text-center mb-6">
          {product ? "Modifier un produit" : "Ajouter un produit"}
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Champ Nom du produit */}
          <div className="mb-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Nom produit"
              className="w-full p-3 bg-stone-700 border border-stone-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-stone-400"
              required
            />
          </div>

          {/* Champ Description */}
          <div className="mb-4">
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Description"
              className="w-full p-3 bg-stone-700 border border-stone-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-stone-400"
              rows="2"
            ></textarea>
          </div>

          {/* Entrepôt, Statut et Prix */}
          <div className="flex gap-4 mb-6">
            <select
              name="warehouse"
              value={formData.warehouse}
              onChange={handleInputChange}
              className="flex-1 p-3 bg-stone-700 border border-stone-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-stone-400"
              required
            >
              <option value="">Entrepôt</option>
              <option value="Entrepôt A">Entrepôt A</option>
              <option value="Entrepôt B">Entrepôt B</option>
              <option value="Entrepôt C">Entrepôt C</option>
            </select>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="flex-1 p-3 bg-stone-700 border border-stone-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-stone-400"
              required
            >
              <option value="">Statut</option>
              <option value="En stock">En stock</option>
              <option value="Rupture">Rupture</option>
              <option value="En commande">En commande</option>
            </select>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="Prix (€)"
              className="flex-1 p-3 bg-stone-700 border border-stone-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-stone-400"
              required
              min="0"
              step="0.01"
            />
          </div>

          {/* Boutons */}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => {
                onClose();
                setFormData({
                  name: "",
                  description: "",
                  warehouse: "",
                  status: "",
                  price: "",
                });
              }}
              
              className="bg-stone-500 text-white py-2 px-6 rounded-full hover:bg-stone-400"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="bg-stone-500 text-white py-2 px-6 rounded-full hover:bg-stone-400"
            >
              {product ? "Modifier" : "Ajouter"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
