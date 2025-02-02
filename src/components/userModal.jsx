import React, { useState, useEffect } from "react";

const UserModal = ({ isOpen, onClose, user, onSave }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    ZIPCode: "",
    city: "",
    country: "France",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        password: "",
        phone: user.phone || "",
        address: user.address || "",
        ZIPCode: user.ZIPCode || "",
        city: user.city || "",
        country: user.country || "France",
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  
    // Déterminer les champs modifiés
    const modifiedFields = {};
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== (user ? user[key] || "" : "")) {
        modifiedFields[key] = formData[key];
      }
    });
  
    try {
      // Appeler la fonction `onSave` avec uniquement les champs modifiés
      await onSave(modifiedFields);
      onClose();
    } catch (err) {
      setError(err.message || "Une erreur est survenue.");
      console.error("Erreur lors de l'ajout/modification de l'utilisateur :", err);
    } finally {
      setLoading(false);
    }
  };
  

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-stone-800 text-white p-6 rounded-[32px] shadow-lg w-[500px]">
        <h2 className="text-xl font-semibold text-center mb-6">
          {user ? "Modifier un utilisateur" : "Créer un utilisateur"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="Prénom"
              className="w-1/2 p-3 bg-stone-700 border border-stone-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-stone-400"
              required
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Nom"
              className="w-1/2 p-3 bg-stone-700 border border-stone-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-stone-400"
              required
            />
          </div>

          <div className="flex gap-4">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="w-1/2 p-3 bg-stone-700 border border-stone-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-stone-400"
              required
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Mot de passe"
              className="w-1/2 p-3 bg-stone-700 border border-stone-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-stone-400"
              required={!user}
            />
          </div>

          <div>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Téléphone"
              className="w-full p-3 bg-stone-700 border border-stone-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-stone-400"
            />
          </div>

          <div>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Adresse"
              className="w-full p-3 bg-stone-700 border border-stone-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-stone-400"
            />
          </div>
          <div className="flex gap-4">
            <input
              type="text"
              name="ZIPCode"
              value={formData.ZIPCode}
              onChange={handleInputChange}
              placeholder="Code postal"
              className="w-1/2 p-3 bg-stone-700 border border-stone-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-stone-400"
            />
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              placeholder="Ville"
              className="w-1/2 p-3 bg-stone-700 border border-stone-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-stone-400"
            />
          </div>
          <div>
            <select
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              className="w-full p-3 bg-stone-700 border border-stone-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-stone-400"
            >
              <option value="France">France</option>
              <option value="Belgique">Belgique</option>
              <option value="Suisse">Suisse</option>
              <option value="Canada">Canada</option>
            </select>
          </div>

          <div className="flex justify-between items-center">
            {error && <p className="text-red-500">{error}</p>}
            <button
              type="button"
              onClick={() => {
                onClose();
                setFormData({
                  firstName: "",
                  lastName: "",
                  email: "",
                  password: "",
                  phone: "",
                  address: "",
                  ZIPCode: "",
                  city: "",
                  country: "France",
                });
              }}
              className="bg-stone-500 text-white py-2 px-6 rounded-full hover:bg-stone-400"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="bg-stone-500 text-white py-2 px-6 rounded-full hover:bg-stone-400"
              disabled={loading}
            >
              {loading ? "Chargement..." : user ? "Modifier" : "Créer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;
