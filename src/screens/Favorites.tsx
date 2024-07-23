import React, { useState, useEffect } from 'react';
import {View, StyleSheet, Image, ScrollView} from "react-native";
import { Template } from "./Template";
import { getAllFavoritePokemon } from "../utils/storage";
import {PressablePokemon, StyledContainer} from "../components";
import {colors} from "../styles";
import { Text } from '../styles/StyledText';
import {useSelector} from "react-redux";
import PokeballLoader from "../components/PokeballLoader";

export const Favorites = () => {
    const [favorites, setFavorites] = useState<{ name: string; url: string }[]>([]);
    const loading = useSelector((state: any) => state.pokemons.loading);

    useEffect(() => {
        const fetchFavorites = async () => {
            const result = await getAllFavoritePokemon();
            setFavorites(result);
        };

        fetchFavorites();
    }, [favorites]);

    return (
        <Template title={"Favorites"}>
            <View style={styles.container}>

                {favorites.length === 0 || loading ? (
                    <PokeballLoader />
                ) : (
                    <>
                        <View style={styles.rowContainer}>
                            <StyledContainer>
                                <Image
                                    source={require('../../assets/images/star.png')}
                                    style={styles.img}
                                />
                                <Text>Favorite Pokemons</Text>
                                <Image
                                    source={require('../../assets/images/star.png')}
                                    style={styles.img}
                                />
                            </StyledContainer>
                        </View>

                        <ScrollView style={styles.flatlistContainer}>
                            {favorites.map((favorite, index) => {
                                const pokemonId = favorite.url.split('/')[6];
                                const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

                                return (
                                    <PressablePokemon pokemon={favorite} spriteUrl={spriteUrl} from='Favorites' />
                                );
                            })}
                        </ScrollView>
                    </>
                    )
                }
            </View>
        </Template>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
        gap: 10,
        justifyContent: 'space-between',
    },
    rowContainer: {
        flexDirection: 'row',
        gap: 10,
        alignSelf: 'center',
    },
    flatlistContainer: {
        flex: 1,
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 10,
        backgroundColor: colors.dark
    },
    img: {
        height: 20,
        width: 20,
    },
});
