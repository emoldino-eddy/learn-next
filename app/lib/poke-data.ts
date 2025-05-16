import axios from 'axios';

export async function getAllPokemon() {
    const res = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=5');
    const data = res.data;
    const pokemonList = data.results;
    return data;
}