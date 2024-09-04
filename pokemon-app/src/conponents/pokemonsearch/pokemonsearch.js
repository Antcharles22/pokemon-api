import React, { useState, useEffect, useRef } from "react";
import fetchData from "../pokiapi/pokiapi.js";
import "./pokemonSearch.css";
import remove from "../path/to/svg.js"; // Import the remove SVG

// Utility function to capitalize the first letter of a string
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}; 

function PokemonSearch() {
  const [pokemonData, setPokemonData] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [pokemonGrid, setPokemonGrid] = useState([]);
  const [errorMessage, setErrorMessage] = useState(""); // Add state for error message
  const [maxPokemonMessage, setMaxPokemonMessage] = useState(""); // Add state for max Pokémon message
  const prevGridLength = useRef(pokemonGrid.length); // Use ref to keep track of previous grid length
  

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setErrorMessage("Please enter a Pokémon name."); // Set error message for empty search
      return;
    }

    try {
      const data = await fetchData(searchTerm.toLowerCase());
      setPokemonData(data);
      setErrorMessage(""); // Clear any previous error message
    } catch (error) {
      setErrorMessage("Pokémon not found. Please try again."); // Set error message
    }
  };

  const addToGrid = () => {
    if (pokemonData && pokemonGrid.length < 6) {
      setPokemonGrid([...pokemonGrid, pokemonData]);
      setPokemonData(null); // Clear the current search result
      setSearchTerm(""); // Clear the search input
      setMaxPokemonMessage(""); // Clear max Pokémon message
    } else if (pokemonGrid.length >= 6) {
      setMaxPokemonMessage("Maximum 6 Pokémon"); // Set max Pokémon message
    }
    };

const handleInputChange = (e) => {
  setSearchTerm(e.target.value);
  setErrorMessage(""); // Clear error message when input changes
};
const removeFromGrid = (index) => {
  const newGrid = [...pokemonGrid];
  newGrid.splice(index, 1);
  setPokemonGrid(newGrid);
};

useEffect(() => {
  // Play the audio for the newly added Pokémon
  if (pokemonGrid.length > prevGridLength.current) {
    const lastAddedPokemon = pokemonGrid[pokemonGrid.length - 1];
    const audio = new Audio(lastAddedPokemon.cries.latest);
    audio.play();
  }
  prevGridLength.current = pokemonGrid.length; // Update the previous grid length
}, [pokemonGrid]);


  return (
   <div className="container">
      <header>
      <h1> Pokemon App </h1>
      </header>
      <main className="info">
      <input 
        type="text" 
        id="pokemonSearch" 
        placeholder="Search your Pokémon!!" 
        value={searchTerm}
        onChange={handleInputChange} // Update onChange handler
      />
      <button onClick={handleSearch} className="btm">Search</button>
      {errorMessage && <p className="error">{errorMessage}</p>} {/* Conditionally render error message */}
      {maxPokemonMessage && <p className="max-pokemon">{maxPokemonMessage}</p>} {/* Conditionally render max Pokémon message */}
      {pokemonData ? (
        <div className="pokiBox">
            <article className="pokiInfo">
            <h3>{capitalizeFirstLetter(pokemonData.name)}</h3>
               <img src={pokemonData.sprites.front_default} 
               alt={pokemonData.name} 
               id="pokemonImage"
              style={{ display: "block" }} />
              <p> Type: {pokemonData.types.map(typeInfo => typeInfo.type.name).join(", ")}</p>
          </article>
          <button className="addBtm"  onClick={() => addToGrid(pokemonData)}>Add to Grid</button>
        </div>
      ) : (
        <div className="pokiBox placeholder">
          <p>No Pokémon selected. Search for a Pokémon to see its details here.</p>
        </div>
      )}
      
      <div className="grid-container">
        {pokemonGrid.length === 0 ? ( 
            <p className="empty-grid-message">Create your perfect team of 6 here!</p>
          ) : (
      <div className="pokemonGrid">
        {pokemonGrid.map((pokemon, index) => (
          <div key={index} className="pokemonCard">
            <h3>{pokemon.name}</h3>
            <img 
              src={pokemon.sprites.front_default} 
              alt={pokemon.name}
              className="pokemonImage" 
            />
            <p> Type: {pokemon.types.map(typeInfo => typeInfo.type.name).join(", ")}</p>
            <button onClick={() => removeFromGrid(index)} className="remove-btn">{remove()}</button> {/* Add remove button */}
            <audio src={pokemon.cries} className="pokemonCry" /> {/* Add audio element */}
          </div> 
        ))}
      </div>
          )}
        </div>
        </main>
        <footer className="footer">
          <h3>Powered by Pokemon Api</h3>
        </footer>
    </div>
   
  );
}

export default PokemonSearch;