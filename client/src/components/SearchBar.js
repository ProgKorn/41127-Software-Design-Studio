import React, { useState } from "react";
import { InputAdornment, TextField, IconButton, List, ListItem, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import data from "../components/helpCentreData.json";

function SearchBar({ onSelectSection }) {
  const [inputText, setInputText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (searchText) => {
    if (searchText.length > 0) {
      const filteredData = data.filter((text) => text.content.includes(searchText));
      setSearchResults(filteredData);
    } else {
      setSearchResults([]);
    }
  };

  const handleSectionClick = (section) => {
    onSelectSection(section);
    setSearchResults([]);
    setInputText("");
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(inputText);
    }
  };

  return (
    <div>
      <TextField
        variant="filled"
        label="Search..."
        className="searchBox"
        value={inputText}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => handleSearch(inputText)}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <List className="list">
        {searchResults.map((text, index) => (
          <ListItem key={index}>
            <Button onClick={() => handleSectionClick(text.id)}>{text.title}</Button>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default SearchBar;
