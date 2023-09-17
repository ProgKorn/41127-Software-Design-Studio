import React, { useState } from "react";
import { InputAdornment, TextField, IconButton, List, ListItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import data from '../components/helpCentreData.json';

function SearchBar() {
    const [inputText, setInputText] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = () => {
        if (inputText.length > 0) {
            const filteredData = data.filter((text) => text.content.includes(inputText));
                setSearchResults(filteredData);
            } else {
                setSearchResults([]);
            }
    };

    return (
        <div>
            <TextField
                variant="filled"
                label="Search..."
                className="searchBox"
                value = {inputText}
                onChange={(e) => setInputText(e.target.value)}
            //  helperText="Your search returned 0 items"
                InputProps={{
                endAdornment: (
                <InputAdornment position="end">
                    <IconButton onClick={handleSearch}>
                        <SearchIcon/>
                    </IconButton>
                </InputAdornment>
                ),
            }}
            />
            <List>
                {searchResults.map((text, index) => (
                    <ListItem ley={index}>
                        <a href="#">{text.content}</a>
                    </ListItem>
                ))}
            </List>
        </div>
    );
}

export default SearchBar;