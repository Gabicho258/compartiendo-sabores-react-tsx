import React from "react";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import "./_SearchBar.scss";

export const SearchBar = () => {
  return (
    <>
      <div className="searchBar">
        <input type="text" className="searchBar__searchInput"></input>
        <div className="searchBar__searchBtn">
          <SearchIcon className="searchBar__searchBtn-icon" />
        </div>
      </div>
    </>
  );
};
