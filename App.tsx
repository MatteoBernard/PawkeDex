import {fetchAllRegions, fetchPokemon, fetchPokemons} from "./src/api/pokeApi";
import { NavigationContainer } from '@react-navigation/native';
import React from "react";
import RootNavigator from "./src/navigation/RootNavigation";

export default function App() {
    // fetchPokemons();
    // fetchAllRegions();
    // fetchPokemon(1);
    return (
        <NavigationContainer>
          <RootNavigator />
      </NavigationContainer>
    );
}

