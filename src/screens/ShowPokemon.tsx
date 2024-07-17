import {View, Text, Button} from "react-native";
import {useRoute, RouteProp, useNavigation} from "@react-navigation/native";
import {RootStackParamList} from "../navigation";
import {Template} from "./Template";
import {useEffect, useState} from "react";
import {fetchPokemonByName} from "../api/pokeApi";
import {Pokemon} from "pokenode-ts";
import {getAllFavoritePokemon, isFavoritePokemon, removeFavoritePokemon, storeFavoritePokemon} from "../utils/storage";
import {StackNavigationProp} from "@react-navigation/stack";
import {useSelector} from "react-redux";

export const ShowPokemon = () => {

    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const route = useRoute<RouteProp<RootStackParamList, 'ShowPokemon'>>();
    const { name, url, from} = route.params;
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const pokedex: { name: string; url: string }[] = useSelector((state: any) => state.pokemons.pokemons);

    const [former, setFormer] = useState<{ name: string; url: string } | null>(null);
    const [next, setNext] = useState<{ name: string; url: string } | null>(null);

    useEffect(() => {
        const getFormer = async () => {
            if (from === 'Pokedex') {
                const currentIndex = pokedex.findIndex(p => p.name === name);
                return currentIndex > 0 ? pokedex[currentIndex - 1] : null;
            } else {
                const favorites = await getAllFavoritePokemon();
                const currentIndex = favorites.findIndex(f => f.name === name);
                return currentIndex > 0 ? favorites[currentIndex - 1] : null;
            }
        }

        const getNext = async () => {
            if (from === 'Pokedex') {
                const currentIndex = pokedex.findIndex(p => p.name === name);
                return currentIndex < pokedex.length - 1 ? pokedex[currentIndex + 1] : null;
            } else {
                const favorites = await getAllFavoritePokemon();
                const currentIndex = favorites.findIndex(f => f.name === name);
                return currentIndex < favorites.length - 1 ? favorites[currentIndex + 1] : null;
            }
        }

        const fetchFormerAndNext = async () => {
            const formerPokemon = await getFormer();
            const nextPokemon = await getNext();
            setFormer(formerPokemon);
            setNext(nextPokemon);
        }

        fetchFormerAndNext();
    }, [name, from, pokedex]);

    useEffect(() => {
        console.log(name);
        isFavoritePokemon(name).then((result: boolean) => {
            setIsFavorite(result);
        });
        fetchPokemonByName(name).then((result: Pokemon) => {
            setPokemon(result);
        });
    }, [name]);

    const handleLike = () => {
        if (isFavorite) {
            setIsFavorite(false);
            removeFavoritePokemon(name);
            if (from === 'Favorites') {
                navigation.navigate('Favorites');
            }
        } else {
            setIsFavorite(true);
            storeFavoritePokemon(name, url);
        }
    }


    return (
        <Template title={pokemon?.name ?? "Pokemon"}>
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

            {
                from === 'Pokedex' ? (
                    <Button title={"Go to Pokedex"} onPress={() => {navigation.navigate('Pokedex')}} />
                ) : (
                    <Button title={"Go to Favorites"} onPress={() => {navigation.navigate('Favorites')}} />
                )
            }

            {
                former ? (
                    <Button title={"Former"} onPress={() => {navigation.navigate('ShowPokemon', {name: former?.name, url: former?.url, from: from})}} />
                ) : <Text>no former</Text>
            }
            {
                next ? (
                    <Button title={"Next"} onPress={() => {navigation.navigate('ShowPokemon', {name: next?.name, url: next?.url, from: from})}} />
                ) : <Text>no next</Text>
            }
        </Template>
    )
}