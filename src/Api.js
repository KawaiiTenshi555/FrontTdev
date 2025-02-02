// src/Api.js

const BASE_URL = "https://monapipersotdev.online/";

// Fonction pour obtenir les en-têtes de requête
const getHeaders = (includeToken = false) => {
  const headers = {
    "Content-Type": "application/json",
  };
  if (includeToken) {
    const token = localStorage.getItem("jwt_token");
    if (token) {
      headers["x-auth-token"] = token;
    }
  }
  return headers;
};

// Fonction de connexion
const login = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/api/user/login`, {
      method: "POST",
      headers: getHeaders(false), // Ne pas inclure le token
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(
        `Échec de la connexion : ${data.error || response.statusText}`,
      );
    }
    return data.token;
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    throw error;
  }
};

// Fonction pour obtenir l'utilisateur actuel
const getCurrentUser = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/user/currentUser`, {
      method: "GET",
      headers: getHeaders(true), // Inclure le token
    });
    if (!response.ok) {
      throw new Error(
        `Échec de la récupération de l'utilisateur actuel : ${response.statusText}`,
      );
    }
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération de l'utilisateur actuel :",
      error,
    );
    throw error;
  }
};

// Fonction pour obtenir tous les utilisateurs
const getUsers = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/user`, {
      method: "GET",
      headers: getHeaders(true), // Inclure le token si nécessaire
    });
    if (!response.ok) {
      throw new Error(
        `Échec de la récupération des utilisateurs : ${response.statusText}`,
      );
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs :", error);
    throw error;
  }
};

// Fonction pour ajouter un nouvel utilisateur (inscription)
const addUser = async (user) => {
  try {
    const response = await fetch(`${BASE_URL}/api/user/signup`, {
      method: "POST",
      headers: getHeaders(false),
      body: JSON.stringify(user),
    });
    const data = await response.json();
    if (!response.ok) {
      const errorMsg = Array.isArray(data.error)
        ? data.error.join(", ")
        : data.error;
      throw new Error(
        `Échec de l'ajout de l'utilisateur : ${errorMsg || response.statusText}`,
      );
    }
    return data.accessToken || data.message;
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'utilisateur :", error);
    throw error;
  }
};

// Fonction pour supprimer un utilisateur par ID
const deleteUser = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/api/user/delete`, {
      method: "DELETE",
      headers: getHeaders(true), // Inclure le token
      body: JSON.stringify({ id }),
    });
    const data = await response.json();
    if (!response.ok) {
      const errorMsg = Array.isArray(data.error)
        ? data.error.join(", ")
        : data.error;
      throw new Error(
        `Échec de la suppression de l'utilisateur : ${errorMsg || response.statusText}`,
      );
    }
    return data.message;
  } catch (error) {
    console.error("Erreur lors de la suppression de l'utilisateur :", error);
    throw error;
  }
};

// Edit user
const editUser = async (id, formData) => {
  try {
    const response = await fetch(`${BASE_URL}/api/user/updateWithId?id=${id}`, {
      method: "PATCH",
      headers: getHeaders(true),
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (!response.ok) {
      const errorMsg = Array.isArray(data.error)
        ? data.error.join(", ")
        : data.error;
      throw new Error(
        `Failed to update user: ${errorMsg || response.statusText}`,
      );
    }
    return data.message;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

// Fonctions liées aux produits (exemples génériques, à adapter selon votre backend)

// Fonction pour obtenir tous les produits avec paramètres optionnels
const getProducts = async (params = {}) => {
  try {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${BASE_URL}/api/product/getProducts`, {
      method: "GET",
      headers: getHeaders(true), // Inclure le token si nécessaire
    });
    if (!response.ok) {
      throw new Error(
        `Échec de la récupération des produits : ${response.statusText}`,
      );
    }
    const data = await response.json();
    return data.message;
  } catch (error) {
    console.error("Erreur lors de la récupération des produits :", error);
    throw error;
  }
};

// Fonction pour obtenir un produit spécifique par ID
const getProduct = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/api/products/${id}`, {
      method: "GET",
      headers: getHeaders(true), // Inclure le token si nécessaire
    });
    if (!response.ok) {
      throw new Error(
        `Échec de la récupération du produit : ${response.statusText}`,
      );
    }
    const data = await response.json();
    return data.product;
  } catch (error) {
    console.error("Erreur lors de la récupération du produit :", error);
    throw error;
  }
};

// Fonction pour ajouter un nouveau produit
const addProduct = async (productData) => {
  try {
    const response = await fetch(`${BASE_URL}/api/product/addProduct`, {
      method: "POST",
      headers: getHeaders(true), // Inclure le token si nécessaire
      body: JSON.stringify(productData),
    });
    const data = await response.json();
    if (!response.ok) {
      const errorMsg = Array.isArray(data.error)
        ? data.error.join(", ")
        : data.error;
      throw new Error(
        `Échec de l'ajout du produit : ${errorMsg || response.statusText}`,
      );
    }
    return data;
  } catch (error) {
    console.error("Erreur lors de l'ajout du produit :", error);
    throw error;
  }
};

// Fonction pour éditer un produit par ID
const editProduct = async (id, productData) => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/product/editProduct?id=${id}`,
      {
        method: "PUT",
        headers: getHeaders(true), // Inclure le token si nécessaire
        body: JSON.stringify(productData),
      },
    );
    const data = await response.json();
    if (!response.ok) {
      const errorMsg = Array.isArray(data.error)
        ? data.error.join(", ")
        : data.error;
      throw new Error(
        `Échec de la mise à jour du produit : ${errorMsg || response.statusText}`,
      );
    }
    return data.message;
  } catch (error) {
    console.error("Erreur lors de la mise à jour du produit :", error);
    throw error;
  }
};

// Fonction pour supprimer un produit par ID
const deleteProduct = async (id) => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/product/deleteProduct?id=${id}`,
      {
        method: "DELETE",
        headers: getHeaders(true), // Inclure le token si nécessaire
      },
    );
    const data = await response.json();
    if (!response.ok) {
      const errorMsg = Array.isArray(data.error)
        ? data.error.join(", ")
        : data.error;
      throw new Error(
        `Échec de la suppression du produit : ${errorMsg || response.statusText}`,
      );
    }
    return data.message;
  } catch (error) {
    console.error("Erreur lors de la suppression du produit :", error);
    throw error;
  }
};

// Fonction pour mettre à jour le stock d'un produit
const addProductStock = async (stockData) => {
  try {    
    const response = await fetch(`${BASE_URL}/api/stock/create`, {
      method: "POST",
      headers: getHeaders(true),
      body: JSON.stringify(stockData),
    });
    const data = await response.json();
    if (!response.ok) {
      const errorMsg = Array.isArray(data.error)
        ? data.error.join(", ")
        : data.error;
      throw new Error(
        `Échec de la mise à jour du stock : ${errorMsg || response.statusText}`,
      );
    }
    return data.message;
  } catch (error) {
    console.error("Erreur lors de la mise à jour du stock :", error);
    throw error;
  }
};

// Fonction pour mettre à jour le stock d'un produit
const updateProductStock = async (id, stockData) => {
  try {
    const response = await fetch(`${BASE_URL}/api/stock/edit?id=${id}`, {
      method: "PATCH",
      headers: getHeaders(true),
      body: JSON.stringify(stockData),
    });
    const data = await response.json();
    if (!response.ok) {
      const errorMsg = Array.isArray(data.error)
        ? data.error.join(", ")
        : data.error;
      throw new Error(
        `Échec de la mise à jour du stock : ${errorMsg || response.statusText}`,
      );
    }
    return data.message;
  } catch (error) {
    console.error("Erreur lors de la mise à jour du stock :", error);
    throw error;
  }
};

const getProductByName = async (name) => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/product/getProductsByName?productName=${encodeURIComponent(name)}`,
      {
        method: "GET",
        headers: getHeaders(),
      },
    );    

    if (response.status === 404) {
      return [];
    }

    if (!response.ok) {
      throw new Error(`getProductByName failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data.message;
  } catch (error) {
    if (error.message.includes("404")) {
      return []; 
    }
    console.warn("Erreur lors de getProductByName:", error);
    return [];
  }
};



const getKpi = async (endpoint) => {
  try {
      const response = await fetch(`${BASE_URL}/api/kpi/${endpoint}`, {
          method: "GET",
          headers: getHeaders(true),
      });
      if (!response.ok) {
          throw new Error(`${endpoint} failed: ${response.statusText}`);
      }
      const data = await response.json();
      return data.message;
  } catch (error) {
      console.error(`Error during ${endpoint}:`, error);
      throw error;
  }
};

const getOrders = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/order`, {
      method: "GET",
      headers: getHeaders(true)
    })
    const data = await response.json()
    return data
  } catch (err) {
    throw err.message
  }
}

const deleteOrder = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/api/order/delete?id=${id}`, {
      method: "DELETE",
      headers: getHeaders(true)
    })
    const data = await response.json()
    return data
  } catch (err) {
    throw err.message
  }
}

const fetchAverageBasketValue = async () => {
  return await getKpi("orderAvg");
};

const fetchStockOutRate = async () => {
  return await getKpi("outOfStockPercentage");
};

const fetchConversionRate = async () => {
  return await getKpi("txConv");
};

const fetchTopSellingProducts = async () => {
  return await getKpi("moreSold");
};

const fetchLeastSellingProducts = async () => {
  return await getKpi("lessSold");
};


export {
  login,
  getCurrentUser,
  getUsers,
  addUser,
  deleteUser,
  editUser,
  getProduct,
  getProducts,
  addProduct,
  deleteProduct,
  editProduct,
  addProductStock,
  updateProductStock,
  getProductByName,
  fetchAverageBasketValue,
  fetchStockOutRate,
  fetchConversionRate,
  fetchTopSellingProducts,
  fetchLeastSellingProducts,
  getOrders,
  deleteOrder
};
