import React, { useState, useEffect } from 'react';
import {View, Text} from "react-native";
import {Template} from "./Template";
import {getAllFavoritePokemon} from "../utils/storage";

export const Favorites = () => {
    const [favorites, setFavorites] = useState<{ name: string; url: string }[]>([]);

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
                    <Text key={index}>{favorite.name}</Text>
                ))}
            </View>
        </Template>
    )
}