import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const CommandTable = ({ commands, onDelete, onUpdate, onPending }) => {
  return (
    <table className="w-full bg-stone-800 text-white rounded-lg shadow-lg overflow-hidden">
      <thead className="bg-stone-900">
        <tr>
          <th className="p-4 text-left">Numero de commande</th>
          <th className="p-4 text-left">Mail du client</th>
          <th className="p-4 text-left">Montant de commande</th>
          <th className="p-4 text-left">Statut</th>
          <th className="p-4 text-left">Détails</th>
          <th className="p-4 text-left">Supprimer</th>
          <th className="p-4 text-left">Annuler la commande</th>
        </tr>
      </thead>
      <tbody>
        {commands.map((command) => (
          <tr
            key={command.id}
            className="border-t border-stone-700 hover:bg-stone-700"
          >
            <td className="p-4">{command.id}</td>
            <td className="p-4">{command.email}</td>
            <td className="p-4">{command.price} e</td>
            <td
              className={`p-4 font-bold ${
                command.status === "Payer" ? "text-green-400" : "text-red-500"
              }`}
            >
              {command.status}
            </td>
            <td className="p-4">
              <button
                onClick={() => onUpdate(command)}
                className="text-white hover:text-blue-400"
              >
                <FaEdit />
              </button>
            </td>
            <td className="p-4">
              <button
                onClick={() => onDelete(command.id)}
                className="text-white hover:text-red-400"
              >
                <FaTrashAlt />
              </button>
            </td>
            <td className="p-4">
              <button
                onClick={() => onPending(command.id)}
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

export default CommandTable;
