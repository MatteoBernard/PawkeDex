import React, {useState, useRef, useEffect} from 'react';
import {View, Image, StyleSheet, FlatList, ViewToken, ImageBackground} from "react-native";
import { Template } from "./Template";
import { useSelector } from "react-redux";
import TextInput from "../styles/StyledTextInput"
import {colors} from "../styles";
import {PressablePokemon} from "../components";
import PokeballLoader from "../components/PokeballLoader";

export const Pokedex = () => {

    const pokemons: { name: string; url: string }[] = useSelector((state: any) => state.pokemons.pokemons);
    const loading = useSelector((state: any) => state.pokemons.loading);

    const [search, setSearch] = useState('');
    const [currentPokemon, setCurrentPokemon] = useState(pokemons[0]);
    const filteredPokemons = pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(search.toLowerCase()));

    const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 50 });

    const handleViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
        if (viewableItems.length > 0) {
            setCurrentPokemon(viewableItems[0].item);
        }
    });

    useEffect(() => {
        if (filteredPokemons.length > 0) {
            setCurrentPokemon(filteredPokemons[0]);
        }
    }, [search]);

    return (
        <Template title={"Pokedex"}>
            {loading ? (
                <PokeballLoader />
            ) : (
                <View style={styles.container}>
                    <View style={styles.inputContainer}>
                        <View style={styles.inputInnerContainer}>
                            <TextInput
                                style={styles.input}
                                value={search}
                                onChangeText={setSearch}
                                placeholder="Search Pokemon"
                            />
                            <Image
                                style={styles.inputImage}
                                source={require('../../assets/images/search.png')}
                            />
                        </View>
                    </View>

                    <ImageBackground
                        source={require('../../assets/images/box_bg.png')}
                        style={styles.currentPokemonContainer}
                        borderRadius={10}
                    >
                        {currentPokemon &&
                            <Image
                                style={styles.currentPokemonImage}
                                source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${currentPokemon.url.split('/')[6]}.png` }}
                            />
                        }
                    </ImageBackground>

                    <View style={styles.flatlistContainer}>
                        <FlatList
                            data={filteredPokemons}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item, index) => index.toString()}
                            onViewableItemsChanged={handleViewableItemsChanged.current}
                            viewabilityConfig={viewabilityConfig.current}
                            renderItem={({ item: pokemon, index }) => {
                                const pokemonId = pokemon.url.split('/')[6];
                                const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

                                return (
                                    <PressablePokemon pokemon={pokemon} spriteUrl={spriteUrl} from={"Pokedex"} />
                                );
                            }}
                        />
                    </View>
                </View>
                )
            }

        </Template>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
        gap: 10,
        flex: 1,
    },
    currentPokemonContainer: {
        alignItems: 'center',
        padding: 10,
        borderWidth: 3,
        borderColor: colors.dark,
        borderRadius: 10,
        overflow: 'hidden',
    },
    currentPokemonImage: {
        width: 150,
        height: 150,
    },
    inputContainer: {
        borderWidth: 3,
        borderColor: colors.dark,
        borderRadius: 10,
    },
    inputInnerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: colors.secondary,
        borderLeftWidth: 7,
        borderRightWidth: 7,
        borderRadius: 7,
    },
    inputImage: {
        height: 30,
        width: 30,
        aspectRatio: 1,
        resizeMode: "contain",
        margin: 5,
    },
    input: {
        flex: 1,
        height: 40,
        fontSize: 12,
        color: colors.dark,
        padding: 5,
    },
    flatlistContainer: {
        padding: 5,
        borderWidth: 3,
        borderColor: colors.dark,
        borderRadius: 10,
        flex: 1,
        backgroundColor: colors.dark
    }
});