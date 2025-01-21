import React from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const UserTable = ({ users, onDelete, onUpdate }) => {
  return (
    <table className="w-full bg-stone-800 text-white rounded-lg shadow-lg overflow-hidden">
      <thead className="bg-stone-900">
        <tr>
          <th className="p-4 text-left">Nom</th>
          <th className="p-4 text-left">Email</th>
          <th className="p-4 text-left">Rôle</th>
          <th className="p-4 text-left">Statut</th>
          <th className="p-4 text-left">Modifier</th>
          <th className="p-4 text-left">Supprimer</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr
            key={user.id}
            className="border-t border-stone-700 hover:bg-stone-700"
          >
            <td className="p-4">{user.name}</td>
            <td className="p-4">{user.email}</td>
            <td className="p-4">{user.role}</td>
            <td
              className={`p-4 font-bold ${
                user.status === 'Actif'
                  ? 'text-green-400'
                  : 'text-red-500'
              }`}
            >
              {user.status}
            </td>
            <td className="p-4">
              <button
                onClick={() => onUpdate(user)}
                className="text-white hover:text-blue-400"
              >
                <FaEdit />
              </button>
            </td>
            <td className="p-4">
              <button
                onClick={() => onDelete(user.id)}
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

export default UserTable;
