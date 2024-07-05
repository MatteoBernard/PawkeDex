import {View, Text, Button} from "react-native";
import {useRoute, RouteProp} from "@react-navigation/native";
import {RootStackParamList} from "../navigation";
import {Template} from "./Template";
import {useEffect, useState} from "react";
import {fetchPokemonByName} from "../api/pokeApi";
import {Pokemon} from "pokenode-ts";
import {isFavoritePokemon, removeFavoritePokemon, storeFavoritePokemon} from "../utils/storage";

export const ShowPokemon = () => {

    const route = useRoute<RouteProp<RootStackParamList, 'ShowPokemon'>>();
    const { name, url } = route.params;
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [isFavorite, setIsFavorite] = useState<boolean>(false);

    const handleLike = () => {
        if (isFavorite) {
            setIsFavorite(false);
            removeFavoritePokemon(name);
        } else {
            setIsFavorite(true);
            storeFavoritePokemon(name, url);
        }
    }

    useEffect(() => {
        console.log(name);
        isFavoritePokemon(name).then((result: boolean) => {
            setIsFavorite(result);
        });
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
                    <Button title={isFavorite ? "Remove like" : "Like"} onPress={() => {handleLike()}} />
                </View>
            )}
        </Template>
    )
}