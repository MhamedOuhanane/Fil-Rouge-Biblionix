import React, { useEffect, useState } from "react";

const CategorieList = ({ categories: initialCategories, message }) => {
  const [categories, setCategories] = useState(initialCategories || []);

  useEffect(() => {
    setCategories(initialCategories || []);
  }, [initialCategories]);

  return (
    <div className="p-2 w-full max-h-[300px] overflow-auto">
      {categories && categories.length === 0 && (
        <div className="p-4 text-center text-amber-700 text-sm">{message}</div>
      )}
      {categories && categories.length !== 0 && (
        <table className="w-full border-collapse">
          <thead className="bg-amber-100">
            <tr>
              <th className="text-left p-3 text-amber-900">Title</th>
              <th className="text-left p-3 text-amber-900">Logo</th>
              <th className="text-left p-3 text-amber-900">Content</th>
              <th className="text-left p-3 text-amber-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((categorie) => (
              <tr key={categorie.id} className="border-b border-amber-100">
                <td className="p-1 text-amber-900">{categorie.title}</td>
                <td className="p-1 text-amber-700">
                  <img
                    src={`/storage/${categorie.logo}`}
                    alt={categorie.title}
                    className="w-12 h-12 object-cover rounded"
                  />
                </td>
                <td className="p-1 text-amber-700">
                  {categorie.content.substring(0, 50)}...
                </td>
                <td className="p-1">
                  
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