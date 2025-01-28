import React from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa'; // Bibliothèque pour les icônes

const StockTable = ({ products, onDelete, onUpdate }) => {
  return (
    <table className="w-full bg-stone-800 text-white rounded-lg shadow-lg overflow-hidden">
      <thead className="bg-stone-900">
        <tr>
          <th className="p-4 text-left">Nom du produit</th>
          <th className="p-4 text-left">Entrepôt</th>
          <th className="p-4 text-left">Status</th>
          <th className="p-4 text-left">Prix</th>
          <th className="p-4 text-left">Modifier</th>
          <th className="p-4 text-left">Supprimer</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr
            key={product.id}
            className="border-t border-stone-700 hover:bg-stone-700"
          >
            <td className="p-4">{product.name}</td>
            <td className="p-4">{product.stock[0].warehouse}</td>
            <td
              className={`p-4 font-bold ${
                product.stock[0].quantity > 0
                  ? 'text-green-400'
                  : product.stock[0].quantity <= 0
                  ? 'text-red-500'
                  : 'text-yellow-400'
              }`}
            >
              {product.stock[0].quantity > 0 ? (
                "En stock"
                ) : (
                  "Rupture"
                )}
            </td>
            <td className="p-4">{product.price}€</td>
            <td className="p-4">
              <button
                onClick={() => onUpdate(product)}
                className="text-white hover:text-blue-400"
              >
                <FaEdit />
              </button>
            </td>
            <td className="p-4">
              <button
                onClick={() => onDelete(product.id)}
                className="text-white hover:text-red-400"
              >
                <FaTrashAlt />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StockTable;
