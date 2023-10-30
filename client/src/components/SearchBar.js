import React, { useState, useRef } from "react";
import { InputAdornment, TextField, IconButton, List, ListItem, Button,} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import data from "../components/helpCentreData.json";

function SearchBar({ onSelectSection, onSearch }) {
  const [inputText, setInputText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (searchText) => {
    const lowercaseSearchText = String(searchText).toLowerCase();

    if (lowercaseSearchText.length > 2) {
      const filteredData = data.filter((text) =>
        text.content.toLowerCase().includes(lowercaseSearchText)
      );
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
    const searchText = e.target.value;
    setInputText(searchText);
    handleSearch(searchText);
    onSearch(searchText);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(inputText);
    }
  };

  return (
    <div>
      <TextField
        fullWidth
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
            <Button onClick={() => handleSectionClick(text.id)}>
              {text.title}
            </Button>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default SearchBar;
