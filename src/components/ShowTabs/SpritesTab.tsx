import {Pokemon} from "pokenode-ts";
import {Image, StyleSheet, View} from "react-native";

type SpritesTabProps = {
    pokemon: Pokemon;
    shiny: boolean;
}

export const SpritesTab = ({pokemon, shiny}: SpritesTabProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.line}>
                <Image
                    style={styles.image}
                    source={{ uri: (shiny ? pokemon.sprites.front_shiny : pokemon.sprites.front_default) || "" }}
                />
                <Image
                    style={styles.image}
                    source={{ uri: (shiny ? pokemon.sprites.back_shiny : pokemon.sprites.back_default) || "" }}
                />
            </View>
            <View style={styles.line}>
                <Image
                    style={styles.image}
                    source={{ uri: (shiny ? pokemon.sprites.other?.home.front_shiny : pokemon.sprites.other?.home.front_default) || "" }}
                />
                <Image
                    style={styles.image}
                    // @ts-ignore
                    source={{ uri: (shiny ? pokemon.sprites.other?.["official-artwork"].front_shiny : pokemon.sprites.other?.["official-artwork"].front_default) || "" }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 5,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    image: {
        flex: 0.25,
        aspectRatio: 1,
        margin: 0,
    },
    line: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
});