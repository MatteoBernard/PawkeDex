import React, { useState, useEffect } from 'react';
import {View, Text, TouchableOpacity} from "react-native";
import {Template} from "./Template";
import {getAllFavoritePokemon} from "../utils/storage";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "../navigation";

export const Favorites = () => {
    const [favorites, setFavorites] = useState<{ name: string; url: string }[]>([]);
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();


    useEffect(() => {
        const fetchFavorites = async () => {
            const result = await getAllFavoritePokemon();
            setFavorites(result);
        };

        fetchFavorites();
    }, []);

    return (
        <Template>
            <Text>Favorites</Text>

            <View>
                {favorites.map((favorite, index) => (
                    <TouchableOpacity key={index} onPress={() => {navigation.navigate('ShowPokemon', {name: favorite.name, url: favorite.url, from: 'Favorites'})}}>
                        <Text>{favorite.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </Template>
    )
}