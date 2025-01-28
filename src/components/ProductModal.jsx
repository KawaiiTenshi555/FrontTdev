import React, { useState, useEffect } from "react";

const ProductModal = ({ isOpen, onClose, product, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    picture: "",
    brand: "",
    price: "",
    type: "",
    nutritional_information: "",
    barcode: "",
    category: "",
  });

  const categories = [
    { id: 1, name: "boisson" },
    { id: 2, name: "alimentaire" },
    { id: 3, name: "snack" },
    { id: 4, name: "produit laitier" },
    { id: 5, name: "confiserie" },
    { id: 6, name: "épicerie" },
    { id: 7, name: "boulangerie" },
    { id: 8, name: "pâtisserie" },
    { id: 9, name: "surgelé" },
    { id: 10, name: "produit bio" },
  ];

  useEffect(() => {
    if (product) {
      console.log(product);
      
      setFormData({
        name: product.name || "",
        picture: product.picture || "",
        brand: product.brand || "",
        price: product.price || "",
        type: product.type || "",
        nutritional_information: product.nutritional_information || "",
        barcode: product.barcode || "",
        category: product.category.id || "",
      });
    }
  }, [product]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "category" ? parseInt(value, 10) : value,
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
          <div className="mb-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Nom du produit"
              className="w-full p-3 bg-stone-700 border border-stone-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-stone-400"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="url"
              name="picture"
              value={formData.picture}
              onChange={handleInputChange}
              placeholder="URL de l'image"
              className="w-full p-3 bg-stone-700 border border-stone-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-stone-400"
            />
          </div>
          <div className="flex gap-4 mb-6">
            <div className="mb-4">
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleInputChange}
                placeholder="Marque"
                className="w-full p-3 bg-stone-700 border border-stone-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-stone-400"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                placeholder="Type"
                className="w-full p-3 bg-stone-700 border border-stone-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-stone-400"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="Prix (€)"
                className="w-full p-3 bg-stone-700 border border-stone-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-stone-400"
                required
                min="0"
                step="0.01"
              />
            </div>
          </div>
          <div className="mb-4">
            <textarea
              name="nutritional_information"
              value={formData.nutritional_information}
              onChange={handleInputChange}
              placeholder="Informations nutritionnelles"
              className="w-full p-3 bg-stone-700 border border-stone-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-stone-400"
              rows="2"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="barcode"
              value={formData.barcode}
              onChange={handleInputChange}
              placeholder="Code-barres"
              className="w-full p-3 bg-stone-700 border border-stone-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-stone-400"
              required
            />
          </div>
          <div className="mb-4">
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full p-3 bg-stone-700 border border-stone-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-stone-400"
              required
            >
              <option value="">Sélectionnez une catégorie</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => {
                onClose();
                setFormData({
                  name: "",
                  picture: "",
                  brand: "",
                  price: "",
                  type: "",
                  nutritional_information: "",
                  barcode: "",
                  category: "",
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
