import {LocationClient, Pokemon, PokemonClient} from "pokenode-ts";

const pokemonClient: PokemonClient = new PokemonClient();
const locationClient: LocationClient = new LocationClient();

export const fetchPokemons = async (): Promise<{name:string, url:string}[]> => {
    return await pokemonClient.listPokemons(0, 1302)
        .then((response) => {
            console.log(response.results);
            return response.results;
        })
        .catch((error) => {
            throw error;
        });
}

export const fetchAllRegions = async (): Promise<{name:string, url:string}[]> => {
    return await locationClient.listRegions()
        .then((response) => {
            console.log(response.results);
            return response.results;
        })
        .catch((error) => {
            throw error;
        });
}

export const fetchPokemon = async (id: number): Promise<Pokemon> => {
    return await pokemonClient.getPokemonById(id)
        .then((response) => {
            console.log(response);
            return response;
        })
        .catch((error) => {
            throw error;
        });
}

export const fetchPokemonByName = async (name: string): Promise<Pokemon> => {
    return await pokemonClient.getPokemonByName(name)
        .then((response) => {
            console.log(response);
            return response;
        })
        .catch((error) => {
            throw error;
        });
}