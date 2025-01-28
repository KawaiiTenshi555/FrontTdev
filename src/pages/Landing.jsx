import React from "react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="p-4 md:p-8">
        <h1 className="text-3xl md:text-5xl font-bold">Bienvenue, Alexandre</h1>

        {/* Illustration principale */}
        <div className="mt-6 max-w-4xl rounded-lg overflow-hidden mx-auto"></div>
      </header>

      {/* Tableau de bord */}
      <section className="p-4 md:p-8">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">
          Votre tableau de bord aujourd'hui
        </h2>

        {/* Cartes en grille */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Ventes du jour */}
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-lg md:text-xl font-medium">Ventes du jour</h3>
            <p className="text-3xl font-bold mt-2">1,234</p>
            <button className="mt-4 px-4 py-2 bg-indigo-600 rounded hover:bg-indigo-500">
              Aujourd'hui
            </button>
          </div>

          {/* Produits en rupture */}
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-lg md:text-xl font-medium">
              Produits en rupture
            </h3>
            <p className="text-3xl font-bold mt-2">12</p>
            <button className="mt-4 px-4 py-2 bg-indigo-600 rounded hover:bg-indigo-500">
              Produits
            </button>
          </div>

          {/* Utilisateurs actifs */}
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-lg md:text-xl font-medium">
              Utilisateurs actifs
            </h3>
            <p className="text-3xl font-bold mt-2">567</p>
            <div className="flex items-center mt-4 space-x-2">
              {/* Exemple d’avatars */}
              <div className="w-8 h-8 rounded-full bg-gray-500"></div>
              <div className="w-8 h-8 rounded-full bg-gray-400"></div>
              <div className="w-8 h-8 rounded-full bg-gray-300"></div>
            </div>
          </div>

          {/* Tendances des ventes */}
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-lg md:text-xl font-medium">
              Tendances des ventes
            </h3>
            <p className="text-sm text-gray-400">Graphique</p>
            <div className="mt-4 bg-gray-700 h-24 rounded flex items-center justify-center">
              <span className="text-gray-500">Tendances</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
