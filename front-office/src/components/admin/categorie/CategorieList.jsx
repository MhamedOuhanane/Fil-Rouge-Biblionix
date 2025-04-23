import React, { useEffect, useState } from "react";
import UpdatedButton from "../../buttons/UpdatedButton";

const CategorieList = ({ categories: initialCategories, message, onEdit}) => {
  const [categories, setCategories] = useState(initialCategories || []);
  const BASE_URL = "http://127.0.0.1:8000/storage/";

  useEffect(() => {
    setCategories(initialCategories || []);
  }, [initialCategories]);

  return (
    <div className="p-2 w-full">
      {categories && categories.length === 0 && (
        <div className="p-4 text-center text-amber-700 text-sm">{message}</div>
      )}
      {categories && categories.length !== 0 && (
        <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100">
              <th className="text-left p-3 text-amber-900">Title</th>
              <th className="text-left p-3 text-amber-900">Logo</th>
              <th className="text-left p-3 text-amber-900">Content</th>
              <th className="text-left p-3 text-amber-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((categorie) => (
              <tr key={categorie.id} className="border-b">
                <td className="p-1 pl-2 text-amber-900 font-[merriweather]">{categorie.title}</td>
                <td className="p-1 text-amber-700">
                  <img
                    src={BASE_URL + categorie.logo}
                    alt={categorie.title}
                    className="w-12 h-12 object-cover rounded"
                  />
                </td>
                <td className="p-1 text-amber-700">
                  {categorie.content.substring(0, 50)}...
                </td>
                <td className="p-1">
                  <UpdatedButton element={categorie} handleAction={onEdit} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CategorieList;