import {fetchPokemons} from "./src/api/pokeapi";
import { NavigationContainer } from '@react-navigation/native';
import React from "react";
import RootNavigator from "./src/navigation/RootNavigation";

export default function App() {
  fetchPokemons();
  return (
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
  );
}

