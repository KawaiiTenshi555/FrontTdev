// URL de base de l'API
const BASE_URL = "http://localhost:3000";

// Fonction pour construire les headers
const getHeaders = (isAuthenticated = false, token = null) => {
    const headers = {
        "Content-Type": "application/json",
    };
    if (isAuthenticated && token) {
        headers["Authorization"] = `Bearer ${token}`;
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
        return data.token;
    } catch (error) {
        console.error("Error during login:", error);
        throw error;
    }
};

// Fonction générique pour récupérer des données
const fetchData = async (endpoint, token) => {
    try {
        const response = await fetch(`${BASE_URL}/${endpoint}`, {
            method: "GET",
            headers: getHeaders(true, token),
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
//         const token = await login("user@example.com", "password");
//         const userData = await fetchData("user/profile", token);
//         console.log("User profile:", userData);
//     } catch (error) {
//         console.error("An error occurred:", error);
//     }
// })();
