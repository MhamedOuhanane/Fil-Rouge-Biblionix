import React, { useEffect, useState } from "react";
import UpdatedButton from "../../buttons/UpdatedButton";
import DeletedButton from "../../buttons/DeletedButton";
import { useMediaQuery } from "react-responsive";

const CategorieList = ({ categories: initialCategories, message, onEdit, onDelete}) => {
  const [categories, setCategories] = useState(initialCategories || []);
  const BASE_URL = "http://127.0.0.1:8000/storage/";

  const isDesktop = useMediaQuery({ minWidth: 768 });
  const lengthString = isDesktop ? 50 : 30;
  
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
                <td className="p-1 pl-2 text-amber-900 text-sm md:text-[1rem] font-[merriweather]">{categorie.title}</td>
                <td className="p-1 text-amber-700">
                  <img
                    src={BASE_URL + categorie.logo}
                    alt={categorie.title}
                    className="w-8 h-8 md:w-10 md:h-10 object-cover rounded"
                  />
                </td>
                <td className="p-1 text-amber-700 text-xs md:text-sm">
                  {categorie.content.substring(0, lengthString)}...
                </td>
                <td className="p-1 space-x-2">
                  <UpdatedButton element={categorie} handleAction={onEdit} />
                  <DeletedButton element={categorie} handleAction={onDelete} />
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