const BASE_URL = "http://localhost:3000";

const getHeaders = () => {
    const token = localStorage.getItem("jwt_token");
    const headers = {
        "Content-Type": "application/json",
    };
    if (token) {
        headers["x-auth-token"] = token;
    }
    return headers;
};


const login = async (email, password) => {
    try {
        const response = await fetch(`${BASE_URL}/api/user/login`, {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify({ email, password }),
        });
        if (!response.ok) {
            throw new Error(`Login failed: ${response.statusText}`);
        }
        const data = await response.json();
        return data.token;
    } catch (error) {
        console.error("Error during login:", error);
        throw error;
    }
};

const getUsers = async () => {
    try {
        const response = await fetch(`${BASE_URL}/api/users`, {
            method: "GET",
            headers: getHeaders(),
        });
        if (!response.ok) {
            throw new Error(`getUsers failed: ${response.statusText}`);
        }
        const data = await response.json();
        return data.users;
    } catch (error) {
        console.error("Error during getUsers:", error);
        throw error;
    }
};

const getUser = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/api/user/${id}`, {
            method: "GET",
            headers: getHeaders(),
        });
        if (!response.ok) {
            throw new Error(`getUser failed: ${response.statusText}`);
        }
        const data = await response.json();
        return data.user;
    } catch (error) {
        console.error("Error during getUser:", error);
        throw error;
    }
};

const addUser = async (user) => {
    try {
        const response = await fetch(`${BASE_URL}/api/user/${id}`, {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify({ user }),
        });
        if (!response.ok) {
            throw new Error(`addUser failed: ${response.statusText}`);
        }
        const data = await response.json();
        return data.message;
    } catch (error) {
        console.error("Error during addUser:", error);
        throw error;
    }
};

const deleteUser = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/api/user/${id}`, {
            method: "DELETE",
            headers: getHeaders(),
        });
        if (!response.ok) {
            throw new Error(`deleteUser failed: ${response.statusText}`);
        }
        const data = await response.json();
        return data.message;
    } catch (error) {
        console.error("Error during deleteUser:", error);
        throw error;
    }
};

const editUser = async (id, user) => {
    try {
        const response = await fetch(`${BASE_URL}/api/product/editProduct?id=${id}`, {
            method: "PUT",
            headers: getHeaders(),
            body: JSON.stringify({ user }),
        });
        if (!response.ok) {
            throw new Error(`editUser failed: ${response.statusText}`);
        }
        const data = await response.json();
        return data.message;
    } catch (error) {
        console.error("Error during editUser:", error);
        throw error;
    }
};

const getProducts = async () => {
    console.log("getProducts");
    
    try {
        const response = await fetch(`${BASE_URL}/api/product/getProducts`, {
            method: "GET",
            headers: getHeaders(),
        });
        if (!response.ok) {
            throw new Error(`getProducts failed: ${response.statusText}`);
        }
        const data = await response.json();
        const products =data.message;
        
        return products;
    } catch (error) {
        console.error("Error during getProducts:", error);
        throw error;
    }
};

const getCategorys = async () => {
    console.log("getProducts");
    
    try {
        const response = await fetch(`${BASE_URL}/api/product/getCategorys`, {
            method: "GET",
            headers: getHeaders(),
        });
        if (!response.ok) {
            throw new Error(`getCategorys failed: ${response.statusText}`);
        }
        const data = await response.json();
        const products =data.message;
        
        return products;
    } catch (error) {
        console.error("Error during getCategorys:", error);
        throw error;
    }
};

const getProductByName = async (name) => {
    console.log("getProductByName :",name);
    
    try {
        const response = await fetch(`${BASE_URL}/api/product/getProductsByName?productName=${name}`, {
            method: "GET",
            headers: getHeaders(),
        });
        if (!response.ok) {
            throw new Error(`getProductByName failed: ${response.statusText}`);
        }
        const data = await response.json();
        return data.message;
    } catch (error) {
        console.error("Error during getProductByName:", error);
        throw error;
    }
};

const addProduct = async (productData) => {
    try {
        const response = await fetch(`${BASE_URL}/api/product/addProduct`, {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(productData),
        });
        if (!response.ok) {
            throw new Error(`addProduct failed: ${response.statusText}`);
        }
        const data = await response.json();
        return data.message;
    } catch (error) {
        console.error("Error during addProduct:", error);
        throw error;
    }
};

const editProduct = async (id, productData) => {
    try {
        const response = await fetch(`${BASE_URL}/api/product/editProduct?id=${id}`, {
            method: "PUT",
            headers: getHeaders(),
            body: JSON.stringify(productData),
        });
        if (!response.ok) {
            throw new Error(`editProduct failed: ${response.statusText}`);
        }
        const data = await response.json();
        console.log(data);
        return data.message;
    } catch (error) {
        console.error("Error during editProduct:", error);
        throw error;
    }
};

const deleteProduct = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/api/product/deleteProduct?id=${id}`, {
            method: "DELETE",
            headers: getHeaders(),
        });
        if (!response.ok) {
            throw new Error(`deleteProduct failed: ${response.statusText}`);
        }
        const data = await response.json();
        return data.message;
    } catch (error) {
        console.error("Error during deleteProduct:", error);
        throw error;
    }
};

const updateProductStock = async (id, stockData) => {
    try {
        const response = await fetch(`${BASE_URL}/api/products/${id}/stock`, {
            method: "PATCH",
            headers: getHeaders(),
            body: JSON.stringify(stockData),
        });
        if (!response.ok) {
            throw new Error(`updateProductStock failed: ${response.statusText}`);
        }
        const data = await response.json();
        return data.message;
    } catch (error) {
        console.error("Error during updateProductStock:", error);
        throw error;
    }
};

const getAverageCartValue = async () => {
    try {
        const response = await fetch(`${BASE_URL}/api/kpi/average-cart-value`, {
            method: "GET",
            headers: getHeaders(),
        });
        if (!response.ok) {
            throw new Error(`getAverageCartValue failed: ${response.statusText}`);
        }
        const data = await response.json();
        return data.averageCartValue;
    } catch (error) {
        console.error("Error during getAverageCartValue:", error);
        throw error;
    }
};

const getStockOutRate = async () => {
    try {
        const response = await fetch(`${BASE_URL}/api/kpi/stock-out-rate`, {
            method: "GET",
            headers: getHeaders(),
        });
        if (!response.ok) {
            throw new Error(`getStockOutRate failed: ${response.statusText}`);
        }
        const data = await response.json();
        return data.stockOutRate;
    } catch (error) {
        console.error("Error during getStockOutRate:", error);
        throw error;
    }
};

const getTopSellingProducts = async (limit = 10) => {
    try {
        const response = await fetch(`${BASE_URL}/api/kpi/top-selling-products?limit=${limit}`, {
            method: "GET",
            headers: getHeaders(),
        });
        if (!response.ok) {
            throw new Error(`getTopSellingProducts failed: ${response.statusText}`);
        }
        const data = await response.json();
        return data.topProducts;
    } catch (error) {
        console.error("Error during getTopSellingProducts:", error);
        throw error;
    }
};

const getLowSellingProducts = async (limit = 10) => {
    try {
        const response = await fetch(`${BASE_URL}/api/kpi/low-selling-products?limit=${limit}`, {
            method: "GET",
            headers: getHeaders(),
        });
        if (!response.ok) {
            throw new Error(`getLowSellingProducts failed: ${response.statusText}`);
        }
        const data = await response.json();
        return data.lowProducts;
    } catch (error) {
        console.error("Error during getLowSellingProducts:", error);
        throw error;
    }
};

const getConversionRate = async () => {
    try {
        const response = await fetch(`${BASE_URL}/api/kpi/conversion-rate`, {
            method: "GET",
            headers: getHeaders(),
        });
        if (!response.ok) {
            throw new Error(`getConversionRate failed: ${response.statusText}`);
        }
        const data = await response.json();
        return data.conversionRate;
    } catch (error) {
        console.error("Error during getConversionRate:", error);
        throw error;
    }
};

export { login, getUser, getUsers, addUser, deleteUser, editUser, getProducts, getCategorys, getProductByName, addProduct, deleteProduct, editProduct, updateProductStock, getAverageCartValue, getStockOutRate, getTopSellingProducts, getLowSellingProducts, getConversionRate};
