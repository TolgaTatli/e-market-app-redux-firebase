import React from "react";
import { RiSearch2Line } from "react-icons/ri";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";

const SearchBar = () => {
  return (
    <Input
      className="p-3 m-12 w-[600px] border outline-none rounded-md bg-gradient-to-r from-white to-slate-300"
      placeholder="Ürünlerde arama yapınız"
      id="searchId"
      startAdornment={
        <InputAdornment position="start">
          <RiSearch2Line size={'27px'} />
        </InputAdornment>
      }
    />
  );
};

export default SearchBar;

// <div className='flex'>
//   <RiSearch2Line  />
//   <input
//     type="text"
//     className="p-4 m-12 w-[600px] bg-gradient-to-r from-white to-slate-300 rounded-xl "
//     placeholder="Ürünlerde arama yapın.."
//   />
// </div>
