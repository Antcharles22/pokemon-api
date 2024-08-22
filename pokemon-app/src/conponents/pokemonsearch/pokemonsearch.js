import React, { useState } from "react";
import fetchData from "../pokiapi/pokiapi.js";

function PokemonSearch() {
  const [pokemonData, setPokemonData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async () => {
    try {
      const data = await fetchData(searchTerm.toLowerCase());
      setPokemonData(data);
    } catch (error) {
      console.error("Error fetching Pokémon:", error);
    }
  };

  return (
    <div>
      <input 
        type="text" 
        id="pokemonSearch" 
        placeholder="Search your Pokémon!!" 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      {pokemonData && (
        <div>
          <h3>{pokemonData.name}</h3>
          <p>Type: {pokemonData.types.map(typeInfo => typeInfo.type.name).join(", ")}</p>
          <img 
            src={pokemonData.sprites.front_default} 
            alt={pokemonData.name} 
            id="pokemonImage" 
            style={{ display: "block" }} 
          />
        </div>
      )}
    </div>
  );
}

export default PokemonSearch;