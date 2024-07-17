import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Template } from "./Template";
import { getAllFavoritePokemon } from "../utils/storage";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation";

export const Favorites = () => {
    const [favorites, setFavorites] = useState<{ name: string; url: string }[]>([]);
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const placeholderImage = 'https://via.placeholder.com/50'; // URL de l'image de remplacement

    useEffect(() => {
        const fetchFavorites = async () => {
            const result = await getAllFavoritePokemon();
            setFavorites(result);
        };

        fetchFavorites();
    }, [favorites]);

    return (
        <Template title={"Favorites"}>
            <Text style={styles.title}>Favorites</Text>
            <View>
                {favorites.map((favorite, index) => {
                    const pokemonId = favorite.url.split('/')[6];
                    const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

                    return (
                        <TouchableOpacity
                            key={index}
                            onPress={() => { navigation.navigate('ShowPokemon', { name: favorite.name, url: favorite.url, from: 'Favorites' }); }}
                        >
                            <View style={styles.pokemonContainer}>
                                <Text style={styles.pokemonName}>{favorite.name}</Text>
                                <Image
                                    style={styles.pokemonImage}
                                    source={{ uri: spriteUrl }}
                                    defaultSource={{ uri: placeholderImage }}
                                />
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </Template>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    pokemonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
    },
    pokemonName: {
        fontSize: 18,
        flex: 1,
    },
    pokemonImage: {
        width: 50,
        height: 50,
    },
});
