import React, { useState } from 'react';
import { FaEdit, FaTrashAlt, FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

const StockTable = ({ products, onDelete, onUpdate }) => {
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (!sortColumn) return 0;
    let valA = a[sortColumn];
    let valB = b[sortColumn];

    if (sortColumn === 'warehouse') {
      valA = a.stock[0].warehouse;
      valB = b.stock[0].warehouse;
    } else if (sortColumn === 'status') {
      valA = a.stock[0].quantity > 0 ? 1 : 0;
      valB = b.stock[0].quantity > 0 ? 1 : 0;
    }

    if (typeof valA === 'string') valA = valA.toLowerCase();
    if (typeof valB === 'string') valB = valB.toLowerCase();

    if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
    if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const renderSortIcon = (column) => {
    if (sortColumn === column) {
      return sortOrder === 'asc' ? <FaSortUp /> : <FaSortDown />;
    }
    return <FaSort />;
  };

  return (
    <table className="w-full bg-stone-800 text-white rounded-lg shadow-lg overflow-hidden">
      <thead className="bg-stone-900">
        <tr>
          <th className="p-4 text-left cursor-pointer" onClick={() => handleSort('name')}>
            Nom du produit {renderSortIcon('name')}
          </th>
          <th className="p-4 text-left cursor-pointer" onClick={() => handleSort('warehouse')}>
            Entrepôt {renderSortIcon('warehouse')}
          </th>
          <th className="p-4 text-left cursor-pointer" onClick={() => handleSort('status')}>
            Status {renderSortIcon('status')}
          </th>
          <th className="p-4 text-left cursor-pointer" onClick={() => handleSort('price')}>
            Prix {renderSortIcon('price')}
          </th>
          <th className="p-4 text-left">Modifier</th>
          <th className="p-4 text-left">Supprimer</th>
        </tr>
      </thead>
      <tbody>
        {sortedProducts.map((product) => (
          <tr key={product.id} className="border-t border-stone-700 hover:bg-stone-700">
            <td className="p-4">{product.name}</td>
            <td className="p-4">{product.stock[0].warehouse}</td>
            <td className={`p-4 font-bold ${product.stock[0].quantity > 0 ? 'text-green-400' : 'text-red-500'}`}>
              {product.stock[0].quantity > 0 ? 'En stock' : 'Rupture'}
            </td>
            <td className="p-4">{product.price}€</td>
            <td className="p-4">
              <button onClick={() => onUpdate(product)} className="text-white hover:text-blue-400">
                <FaEdit />
              </button>
            </td>
            <td className="p-4">
              <button onClick={() => onDelete(product.id)} className="text-white hover:text-red-400">
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
