import React, { useEffect, useState } from "react";

const TagList = ({ tags: initialTags, message }) => {
  const [tags, setTags] = useState(initialTags || []);

  useEffect(() => {
    setTags(initialTags || []);
  }, [initialTags]);

  return (
    <div className="p-6 font-sans bg-gray-50 min-h-screen">
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        {/* Table Section */}
        <div className="border border-custom-light-sand rounded-lg overflow-hidden shadow-sm">
          <table className="w-full border-collapse">
            <thead className="bg-custom-light-sand">
              <tr>
                <th className="text-left p-4 text-custom-brown font-semibold text-sm uppercase tracking-wider">
                  Nom
                </th>
                <th className="text-left p-4 text-custom-brown font-semibold text-sm uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {tags.length === 0 ? (
                <tr>
                  <td colSpan="2" className="p-6 text-center text-custom-light-brown text-sm italic">
                    {message || "Aucun tag trouvé."}
                  </td>
                </tr>
              ) : (
                tags.map((tag, index) => (
                  <tr
                    key={tag.id}
                    className={`border-t border-custom-light-sand hover:bg-gray-50 transition-colors duration-150 ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                    }`}
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-custom-sand text-white rounded-full flex items-center justify-center text-sm font-medium shadow-sm">
                          {tag.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-custom-brown text-base">
                            {tag.name}
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TagList;