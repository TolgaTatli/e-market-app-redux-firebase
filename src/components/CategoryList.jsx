import React from 'react';

const CategoryList = ({ category, onCategoryClick, isSelected }) => {
  const buttonClass = isSelected
    ? 'text-2xl px-12 mx-3 font-bold rounded-md w-auto h-14 flex items-center border-2 border-gray-600 p-7 bg-gray-200'
    : 'text-2xl px-12 mx-3 font-bold rounded-md w-auto h-14 flex items-center border-2 border-gray-600 p-7';

  return (
    <button
      className={buttonClass}
      onClick={() => onCategoryClick(category)}
    >
      {category}
    </button>
  );
};

export default CategoryList;
