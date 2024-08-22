// src/pokiapi.js
// src/pokiapi/pokiapi.js
export default async function fetchData(pokemonName) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("There was a problem with your fetch operation:", error);
        throw error;
    }
}