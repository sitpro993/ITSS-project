import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import InputAdornment from "@mui/material/InputAdornment";

export const SearchBar = ({ setSearchQuery }) => (
  <form
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <TextField
      sx={{
        width: 500,
      }}
      className="search-bar"
      onInput={(e) => {
        setSearchQuery(e.target.value);
      }}
      label="Enter occupation"
      variant="outlined"
      placeholder="Search..."
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  </form>
);
