import {Image, Pressable, StyleSheet, View} from "react-native";
import React from "react";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "../navigation";
import {Text} from "../styles/StyledText";
import {colors} from "../styles";

type PressablePokemonProps = {
    pokemon: { name: string, url: string };
    spriteUrl: string;
    from: 'Pokedex' | 'Favorites';
}

export const PressablePokemon = ({pokemon, spriteUrl, from}: PressablePokemonProps) => {

    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const placeholderImage = 'https://via.placeholder.com/50';

    const formattedName = pokemon.name
        .replace(/-/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    return (
        <Pressable

            onPress={() => { navigation.navigate('ShowPokemon', { name: pokemon.name, url: pokemon.url, from: from }); }}
        >
            <View style={styles.pokemonContainer}>
                <View style={styles.pokemonInnerContainer}>
                    <Text style={styles.pokemonName}>{formattedName}</Text>
                    <Image
                        style={styles.pokemonImage}
                        source={{ uri: spriteUrl }}
                        defaultSource={{ uri: placeholderImage }}
                    />
                </View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    pokemonContainer: {
        margin: 5,
        paddingHorizontal: 10,
        borderWidth: 3,
        borderRadius: 40,
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: colors.secondary
    },
    pokemonInnerContainer: {
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 40,
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: colors.primary,
    },
    pokemonName: {
        fontSize: 12,
        flex: 1,
    },
    pokemonImage: {
        width: 50,
        height: 50,
    },
});

