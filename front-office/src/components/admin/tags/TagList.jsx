import React, { useEffect, useState } from "react";

const TagList = ({ tags: initialTags, message }) => {
  const [tags, setTags] = useState(initialTags || []);

  useEffect(() => {
    setTags(initialTags || []);
  }, [initialTags]);

    return (
        <div className="flex justify-center flex-wrap gap-4 p-2 px-4 md:px-8 w-full">
            {tags && tags.length === 0 ? (
                <div className="p-4 text-center text-amber-700 text-sm">{message}</div>
            ) : (tags.map((tag) => (
                    <div key={tag.id} className="p-1 md:p-2 w-32 md:w-44 h-20 md:h-24 bg-white border-b-8 text-center border-[#f3a86a] rounded-2xl">
                        <span className="text-amber-900 text-sm md:text-lg font-[merriweather]">{tag.name}</span>
                    </div>
                ))
            )}
        </div>
    );
};

export default TagList;