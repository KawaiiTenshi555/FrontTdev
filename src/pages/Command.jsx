import React, { useState, useEffect } from "react";
import CommandTable from "../components/CommandTable";
import CommandModal from "../components/CommandModal";

export default function Command() {
  const [commands, setCommands] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCommand, setSelectedCommand] = useState(null);

  useEffect(() => {
    const fakeData = generateFakeCommands();
    setCommands(fakeData);
  }, []);

  const generateFakeCommands = () => {
    const randomCommands = [];
    for (let i = 1; i <= 10; i++) {
      randomCommands.push({
        id: i,
        email: `client${i}@example.com`,
        price: Math.floor(Math.random() * 91 + 10),
        status: Math.random() > 0.5 ? "Payer" : "En attente de payements",
        items: [
          { name: `Article A${i}`, price: (Math.random() * 30).toFixed(2) },
          { name: `Article B${i}`, price: (Math.random() * 50).toFixed(2) },
        ],
      });
    }
    return randomCommands;
  };

  const handleDeleteCommand = (commandId) => {
    setCommands((prev) => prev.filter((cmd) => cmd.id !== commandId));
  };

  const handleUpdateCommand = (command) => {
    setSelectedCommand(command);
    setIsModalOpen(true);
  };

  const filteredCommands = commands.filter((cmd) =>
    cmd.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="bg-stone-100 p-6">
      <header className="flex justify-between items-center mb-6 px-8">
        <div className="relative w-full mr-6">
          <input
            type="text"
            placeholder="Rechercher par email"
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
      </header>

      {/* On passe les commandes filtrées au tableau */}
      <CommandTable
        commands={filteredCommands}
        onDelete={handleDeleteCommand}
        onUpdate={handleUpdateCommand} // <-- On passe la fonction
      />

      {/* Modal pour afficher les détails de la commande sélectionnée */}
      <CommandModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        // On passe le tableau "items" de la commande sélectionnée
        items={selectedCommand?.items || []}
      />
    </div>
  );
}
