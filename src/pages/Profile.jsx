// src/pages/Profile.jsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, editUser } from "../Api"; // Ensure correct import

export default function Profile() {
  const navigate = useNavigate();
  const token = localStorage.getItem("jwt_token");

  // User ID is no longer needed as the backend identifies the user via the token
  // const [userId, setUserId] = useState(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    ZIPCode: "",
    city: "",
    country: "",
  });

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await getCurrentUser(); // Remove token parameter if getCurrentUser doesn't need it
        if (user) {
          setFormData({
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            phone: user.phone || "",
            address: user.address || "",
            ZIPCode: user.ZIPCode || "",
            city: user.city || "",
            country: user.country || "",
          });
        }
      } catch (err) {
        console.error(err);
        setError("Erreur lors de la récupération du profil.");
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [token]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setError("");

    try {
      const message = await editUser(token, formData);
      console.log("Réponse API :", message);
      alert("Profil mis à jour avec succès !");
    } catch (err) {
      console.error("Erreur lors de la mise à jour du profil :", err);
      setError(err.message || "Erreur lors de la mise à jour du profil.");
    } finally {
      setUpdating(false);
    }
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("jwt_token");
    localStorage.removeItem("email");
    localStorage.removeItem("user_id");
    navigate("/login");
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-700">Chargement du profil...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-gray-800 text-white rounded-lg p-6 shadow-md">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">
            Profil de {formData.firstName} {formData.lastName}
          </h1>
          <button
            onClick={handleLogout}
            className="px-3 py-1 bg-red-500 hover:bg-red-600 rounded"
          >
            Déconnexion
          </button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-4 p-2 bg-red-500 text-white rounded">{error}</div>
        )}

        {/* Update Form */}
        <form onSubmit={handleSubmit}>
          {/* First Name / Last Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="firstName" className="block text-gray-300 mb-1">
                Nom
              </label>
              <input
                type="text"
                id="firstName"
                className="w-full p-2 bg-gray-700 rounded focus:outline-none"
                placeholder="Nom"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-gray-300 mb-1">
                Prénom
              </label>
              <input
                type="text"
                id="lastName"
                className="w-full p-2 bg-gray-700 rounded focus:outline-none"
                placeholder="Prénom"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Phone */}
          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-300 mb-1">
              Téléphone
            </label>
            <input
              type="text"
              id="phone"
              className="w-full p-2 bg-gray-700 rounded focus:outline-none"
              placeholder="0102030405"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          {/* Address */}
          <div className="mb-4">
            <label htmlFor="address" className="block text-gray-300 mb-1">
              Adresse
            </label>
            <input
              type="text"
              id="address"
              className="w-full p-2 bg-gray-700 rounded focus:outline-none"
              placeholder="Adresse"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          {/* ZIPCode / City / Country */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="ZIPCode" className="block text-gray-300 mb-1">
                Code Postal
              </label>
              <input
                type="text"
                id="ZIPCode"
                className="w-full p-2 bg-gray-700 rounded focus:outline-none"
                placeholder="35400"
                value={formData.ZIPCode}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="city" className="block text-gray-300 mb-1">
                Ville
              </label>
              <input
                type="text"
                id="city"
                className="w-full p-2 bg-gray-700 rounded focus:outline-none"
                placeholder="Ville"
                value={formData.city}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="country" className="block text-gray-300 mb-1">
                Pays
              </label>
              <input
                type="text"
                id="country"
                className="w-full p-2 bg-gray-700 rounded focus:outline-none"
                placeholder="Pays"
                value={formData.country}
                onChange={handleChange}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={updating}
            className="mt-6 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded"
          >
            {updating ? "Mise à jour en cours..." : "Mettre à jour"}
          </button>
        </form>
      </div>
    </div>
  );
}
