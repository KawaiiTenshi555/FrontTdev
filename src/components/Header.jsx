import React from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <nav className="flex w-full">
        <Link
          to="/StockManagement"
          className={`flex-grow text-center py-4 text-white ${
            location.pathname === "/StockManagement"
              ? "bg-stone-900"
              : "bg-stone-800 hover:bg-stone-700"
          } focus:outline-none`}
        >
          Gestion des stocks
        </Link>
        <Link
          to="/KPI"
          className={`flex-grow text-center py-4 text-white ${
            location.pathname === "/KPI"
              ? "bg-stone-900"
              : "bg-stone-800 hover:bg-stone-700"
          } focus:outline-none`}
        >
          Indicateurs de ventes
        </Link>
        <Link
          to="/Command"
          className={`flex-grow text-center py-4 text-white ${
            location.pathname === "/Command"
              ? "bg-stone-900"
              : "bg-stone-800 hover:bg-stone-700"
          } focus:outline-none`}
        >
          Commandes
        </Link>
        <Link
          to="/UserManagement"
          className={`flex-grow text-center py-4 text-white ${
            location.pathname === "/UserManagement"
              ? "bg-stone-900"
              : "bg-stone-800 hover:bg-stone-700"
          } focus:outline-none`}
        >
          Profils clients
        </Link>
        <Link
          to="/Login"
          className={`flex-grow text-center py-4 text-white ${
            location.pathname === "/Login"
              ? "bg-stone-900"
              : "bg-stone-800 hover:bg-stone-700"
          } focus:outline-none`}
        >
          Mon profil
        </Link>
      </nav>
    </header>
  );
};

export default Header;
