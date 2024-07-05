import {View, Text} from "react-native";
import {useRoute, RouteProp} from "@react-navigation/native";
import {RootStackParamList} from "../navigation";
import {Template} from "./Template";
import {useEffect, useState} from "react";
import {fetchPokemonByName} from "../api/pokeApi";
import {Pokemon} from "pokenode-ts";

export const ShowPokemon = () => {

    const route = useRoute<RouteProp<RootStackParamList, 'ShowPokemon'>>();
    const { name } = route.params;

    const [pokemon, setPokemon] = useState<Pokemon | null>(null);

    useEffect(() => {
        console.log(name);
        fetchPokemonByName(name).then((result: Pokemon) => {
            setPokemon(result);
        });
    }, [name]);

    return (
        <Template>
            <Text>{name}</Text>
            {pokemon && (
                <View>
                    <Text>{pokemon.name}</Text>
                    <Text>{pokemon.id}</Text>
                    <Text>{pokemon.height}</Text>
                    <Text>{pokemon.weight}</Text>
                    <Text>{pokemon.base_experience}</Text>
                </View>
            )}
        </Template>
    )
}