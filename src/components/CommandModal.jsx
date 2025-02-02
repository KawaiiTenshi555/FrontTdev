import React from "react";

function CommandModal({ isOpen, onClose, items = [] }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-md shadow-lg p-6 w-full max-w-md mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Détails de la commande
        </h2>

        <ul className="divide-y divide-gray-200 mb-4 text-gray-700">
          {items.map((item, index) => (
            <li key={index} className="py-2 flex justify-between">
              <div>
              {item.product.name}<span style={{fontWeight: "bold"}}> x{item.quantity}</span>
              </div>
              <span>{Number(item.product.price) * Number(item.quantity)}€</span>
            </li>
          ))}
        </ul>

        <button
          className="block w-full text-center bg-gray-800 text-white py-2 rounded hover:bg-gray-700"
          onClick={onClose}
        >
          Fermer
        </button>
      </div>
    </div>
  );
}

export default CommandModal;
