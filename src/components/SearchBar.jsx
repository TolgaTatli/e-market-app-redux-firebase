import React, { useState } from "react";
import { RiSearch2Line } from "react-icons/ri";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";

const SearchBar = ({ setSearchKeyword }) => {
  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  return (
    <FormControl>
      <Input
        className="p-3 m-12 w-[600px] border outline-none rounded-md bg-gradient-to-r from-white to-slate-300"
        placeholder="Ürünlerde arama yapınız"
        id="searchId"
        startAdornment={
          <InputAdornment position="start">
            <RiSearch2Line size={'27px'} />
          </InputAdornment>
        }
        onChange={handleSearchChange}
      />
    </FormControl>
  );
};

export default SearchBar;
