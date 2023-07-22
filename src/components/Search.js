import React, { useState } from "react";
import { TextField } from '@mui/material'
import { Button } from '@mui/material'
import axios from "axios";
import { alignProperty } from "@mui/material/styles/cssUtils";

const Search = () => {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos?query=${query}&client_id=Jv4AFkJ0eA4baEvgQAE3-phJJky5b4JkhqPftw25QTE`
      );
      setImages(response.data.results);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="ImgSearch">
      <form onSubmit={handleSearch}>
      <TextField id="filled-basic" label="Search" variant="filled" onChange={(e)=> setQuery(e.target.value)}/>
        <p>
        <Button variant="contained" type="submit">Submit</Button></p>
      </form>
      <div className="image-container">
        {images.map((image) => (
          <div key={image.id} className="image-item">
            <img src={image.urls.thumb} alt={image.alt_description} />
            <div className="image-overlay">
              <a href={image.urls.regular} download>
                Download
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
