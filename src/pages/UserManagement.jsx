import React, { useState, useEffect } from 'react';
import { getUsers, deleteUser, editUser, addUser } from '../Api';
import UserTable from '../components/UserTable';
import UserModal from '../components/UserModal';

export default function UserManagementPage() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error('Erreur lors du chargement des utilisateurs :', error);
      }
    };

    fetchUsers();
  }, []);

  const generateFakeUsers = () => {
    const roles = ['Admin', 'User', 'Manager'];
    const statuses = ['Actif', 'Inactif'];

    // Génère des utilisateurs fictifs
    const users = Array.from({ length: 20 }).map((_, index) => ({
      id: index + 1,
      name: `Utilisateur ${index + 1}`,
      email: `user${index + 1}@example.com`,
      role: roles[Math.floor(Math.random() * roles.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
    }));

    return users;
  };

  useEffect(() => {
    const fakeUsers = generateFakeUsers();
    setUsers(fakeUsers);
  }, []);

  const handleAddUser = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleSaveUser = async (formData) => {
    if (editingUser) {
      await editUser(editingUser.id, formData);
    } else {
      await addUser(formData);
    }
    setIsModalOpen(false);
    const data = await getUsers();
    setUsers(data);
  };

  const handleDeleteUser = async (userId) => {
    await deleteUser(userId);
    const data = await getUsers();
    setUsers(data);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-stone-100 p-6">
      <header className="flex justify-between items-center mb-6 px-8">
        <div className="relative w-full mr-6">
          <input
            type="text"
            placeholder="Rechercher"
            className="w-full p-2 pl-4 pr-10 border border-stone-300 rounded-[22px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-stone-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
            />
          </svg>
        </div>
        <button
          onClick={handleAddUser}
          className="bg-stone-900 text-white py-2 px-6 rounded-[22px] hover:bg-stone-800 whitespace-nowrap"
        >
          Ajouter un utilisateur +
        </button>
      </header>

      <UserTable
        users={filteredUsers}
        onDelete={handleDeleteUser}
        onUpdate={handleEditUser}
      />
      <UserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={editingUser}
        onSave={handleSaveUser}
      />
    </div>
  );
}
