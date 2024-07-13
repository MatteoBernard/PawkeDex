import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Template } from "./Template";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation";

export const Pokedex = () => {
    const pokemons: { name: string; url: string }[] = useSelector((state: any) => state.pokemons.pokemons);
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const placeholderImage = 'https://via.placeholder.com/50';

    return (
        <Template>
            <Text style={styles.title}>Pokedex</Text>

            <View>
                {pokemons.map((pokemon, index) => {
                    const pokemonId = pokemon.url.split('/')[6];
                    const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

                    return (
                        <TouchableOpacity
                            key={index}
                            onPress={() => { navigation.navigate('ShowPokemon', { name: pokemon.name, url: pokemon.url, from: 'Pokedex' }); }}
                        >
                            <View style={styles.pokemonContainer}>
                                <Text style={styles.pokemonName}>{pokemon.name}</Text>
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
