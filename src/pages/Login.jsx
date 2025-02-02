import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import { login } from "../Api.js";

export default function Login() {
  // Local states
  const [email, setEmail] = useState(() => {
    return localStorage.getItem("email") || "";
  });
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // React Router hook for redirection
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setErrorMessage("");

    try {
      const token = await login(email, password);
      localStorage.setItem("email", email);
      localStorage.setItem("jwt_token", token);

      // After successful login, redirect to the landing page ("/" as an example)
      navigate("/profile");
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Clear password on component mount (or page change)
  useEffect(() => {
    setPassword("");
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
    <h1 className="text-3xl font-bold text-center text-gray-800 mb-20">
          Shop Manager
        </h1>
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-200 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Connexion
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Adresse Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Entrez votre adresse email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required="required"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Entrez votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required="required"
            />
          </div>

          {/* Display error message if any */}
          {errorMessage && (
            <div className="text-red-500 text-sm">{errorMessage}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {loading ? "Connexion en cours..." : "Connexion"}
          </button>
        </form>
      </div>
    </div>
  );
}
