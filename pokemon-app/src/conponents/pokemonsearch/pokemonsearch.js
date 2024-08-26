import React, { useState } from "react";
import fetchData from "../pokiapi/pokiapi.js";
import "./pokemonSearch.css";



function PokemonSearch() {
  const [pokemonData, setPokemonData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [pokemonGrid, setPokemonGrid] = useState([]);

  const handleSearch = async () => {
    try {
      const data = await fetchData(searchTerm.toLowerCase());
      setPokemonData(data);
    } catch (error) {
      console.error("Error fetching Pokémon:", error);
    }
  };

  const addToGrid = () => {
    if (pokemonData && pokemonGrid.length < 6) {
      setPokemonGrid([...pokemonGrid, pokemonData]);
      setPokemonData(null); // Clear the current search result
      setSearchTerm(""); // Clear the search input
    }
};
  return (
    <div className="info">
      <input 
        type="text" 
        id="pokemonSearch" 
        placeholder="Search your Pokémon!!" 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch} className="btm">Search</button>
      {pokemonData && (
        <div className="pokiBox">
            <article className="pokiInfo">
               <h3>{pokemonData.name}</h3>
          
               <img 
                src={pokemonData.sprites.front_default} 
               alt={pokemonData.name} 
               id="pokemonImage"
              style={{ display: "block" }} />
              <p> Type: {pokemonData.types.map(typeInfo => typeInfo.type.name).join(", ")}</p>
          </article>
            <button onClick={addToGrid} className="btm">Add to Grid</button>
        </div>
      )}
      
      <div className="grid-container">
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
          </div> 
        ))}
      </div>
        </div>
    </div>
  );
}

export default PokemonSearch;