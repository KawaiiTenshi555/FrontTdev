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
    warehouse: "",
    quantity: "",
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
      setFormData({
        name: product.name || "",
        picture: product.picture || "",
        brand: product.brand || "",
        price: product.price || "",
        type: product.type || "",
        nutritional_information: product.nutritional_information || "",
        barcode: product.barcode || "",
        category: product.category.id || "",
        warehouse: product.stock[0].warehouse || "",
        quantity: product.stock[0].quantity || "",
      });
    }
    else {
      setFormData({
        name: "",
        picture: "",
        brand: "",
        price: "",
        type: "",
        nutritional_information: "",
        barcode: "",
        category: "",
        warehouse: "",
        quantity: "",
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
  
    const updatedFields = {};
    const updatedStock = {};
  
    if (product) {
      // Vérifier les champs généraux
      if (formData.name !== product.name) updatedFields.name = formData.name;
      if (formData.picture !== product.picture) updatedFields.picture = formData.picture;
      if (formData.brand !== product.brand) updatedFields.brand = formData.brand;
      if (formData.price !== product.price) updatedFields.price = formData.price;
      if (formData.type !== product.type) updatedFields.type = formData.type;
      if (formData.nutritional_information !== product.nutritional_information)
        updatedFields.nutritional_information = formData.nutritional_information;
      if (formData.barcode !== product.barcode) updatedFields.barcode = formData.barcode;
      if (formData.category !== product.category.id) updatedFields.category = formData.category;
  
      // Vérifier les champs du stock
      if (product.stock.length > 0) {
        if (formData.warehouse !== product.stock[0].warehouse) {
          updatedStock.warehouse = formData.warehouse;
        }
        if (formData.quantity !== product.stock[0].quantity) {
          updatedStock.quantity = formData.quantity;
        }
      } else {
        // Si aucun stock n'existe dans le produit actuel, on prend tout
        updatedStock.warehouse = formData.warehouse;
        updatedStock.quantity = formData.quantity;
      }
    } else {
      // Si on ajoute un produit, on envoie toutes les données
      Object.assign(updatedFields, formData);
    }
  
    // Envoyer les champs modifiés uniquement s'il y en a
    if (Object.keys(updatedFields).length > 0) {
      onSave({ type: "product", data: updatedFields });
    }
    if (Object.keys(updatedStock).length > 0) {
      onSave({ type: "stock", data: updatedStock });
    }
  };
  

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-stone-800 text-white p-6 rounded-2xl shadow-lg max-w-2xl w-full">
        <h2 className="text-xl font-semibold text-center mb-6">
          {product ? "Modifier un produit" : "Ajouter un produit"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Nom du produit</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-3 bg-stone-700 border border-stone-600 rounded-lg text-white focus:ring-2 focus:ring-stone-400"
              required
            />
          </div>
          <div>
            <label className="block mb-1">URL de l'image</label>
            <input
              type="url"
              name="picture"
              value={formData.picture}
              onChange={handleInputChange}
              className="w-full p-3 bg-stone-700 border border-stone-600 rounded-lg text-white focus:ring-2 focus:ring-stone-400"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block mb-1">Marque</label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleInputChange}
                className="w-full p-3 bg-stone-700 border border-stone-600 rounded-lg text-white"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Type</label>
              <input
                type="text"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full p-3 bg-stone-700 border border-stone-600 rounded-lg text-white"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Prix (€)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full p-3 bg-stone-700 border border-stone-600 rounded-lg text-white"
                required
                min="0"
                step="0.01"
              />
            </div>
          </div>
          <div>
            <label className="block mb-1">Informations nutritionnelles</label>
            <textarea
              name="nutritional_information"
              value={formData.nutritional_information}
              onChange={handleInputChange}
              className="w-full p-3 bg-stone-700 border border-stone-600 rounded-lg text-white"
              rows="2"
              required
            ></textarea>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Code-barres</label>
              <input
                type="text"
                name="barcode"
                value={formData.barcode}
                onChange={handleInputChange}
                className="w-full p-3 bg-stone-700 border border-stone-600 rounded-lg text-white"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Catégorie</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full p-3 bg-stone-700 border border-stone-600 rounded-lg text-white"
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
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Entrepôt</label>
              <input
                type="text"
                name="warehouse"
                value={formData.warehouse}
                onChange={handleInputChange}
                className="w-full p-3 bg-stone-700 border border-stone-600 rounded-lg text-white"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Quantité</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                className="w-full p-3 bg-stone-700 border border-stone-600 rounded-lg text-white"
                required
                min="0"
                step="1"
              />
            </div>
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
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
