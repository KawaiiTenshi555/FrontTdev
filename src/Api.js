// URL de base de l'API
const BASE_URL = "https://api.exemple.com/v1";

// Clé API (si nécessaire)
const API_KEY = "votre_clé_api";

// Fonction pour construire les headers
const getHeaders = (isAuthenticated = false) => {
    const headers = {
        "Content-Type": "application/json",
    };
    if (isAuthenticated) {
        headers["Authorization"] = `Bearer ${API_KEY}`;
    }
    return headers;
};

// Fonction login
const login = async (username, password) => {
    try {
        const response = await fetch(`${BASE_URL}/login`, {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify({ username, password }),
        });
        if (!response.ok) {
            throw new Error(`Login failed: ${response.statusText}`);
        }
        const data = await response.json();
        console.log("Login successful:", data);
        return data;
    } catch (error) {
        console.error("Error during login:", error);
        throw error;
    }
};

// Fonction générique pour récupérer des données
const fetchData = async (endpoint, isAuthenticated = true) => {
    try {
        const response = await fetch(`${BASE_URL}/${endpoint}`, {
            method: "GET",
            headers: getHeaders(isAuthenticated),
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
        }
        const data = await response.json();
        console.log("Data fetched successfully:", data);
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

// (async () => {
//     try {
//         const loginData = await login("user@example.com", "securepassword");
//         const userData = await fetchData("user/profile", true);
//         console.log("User profile:", userData);
//     } catch (error) {
//         console.error("An error occurred:", error);
//     }
// })();
