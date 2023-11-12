import React from 'react'

const CategoryList = ({category}) => {
  return (
    <button className='text-2xl px-12 mx-3 font-bold rounded-md w-auto h-14 flex items-center border-2 border-gray-600 p-7'>
      {category}
    </button>
  )
}

export default CategoryList