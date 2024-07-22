import {View, StyleSheet, FlatList, Image} from "react-native";
import {Text} from "../../styles/StyledText";
import {Pokemon} from "pokenode-ts";

type MovesetTabProps = {
    pokemon: Pokemon;
}

export const MovesetTab = ({pokemon}: MovesetTabProps) => {

    const formatString = (string: string) => {
        return string
            .replace(/-/g, ' ')
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1) + ' ')
            .join('')
            .trim();
    }

    return (
        <View style={styles.container}>
            <View style={styles.label}>
                <Image
                    source={require('../../../assets/images/pawkedex_logo_crop.png')}
                    style={styles.img}
                />
                <Text style={styles.title}>Moves :</Text>
            </View>

            <View>
                <FlatList
                    style={styles.list}
                    data={pokemon.moves}
                    keyExtractor={item => item.move.name}
                    renderItem={({item}) => (
                        <Text style={styles.text}>{formatString(item.move.name)}</Text>
                    )}
                />
            </View>

            <View style={styles.label}>
                <Image
                    source={require('../../../assets/images/pawkedex_logo_crop.png')}
                    style={styles.img}
                />
                <Text style={styles.title}>Abilities :</Text>
            </View>

            <View>
                <FlatList
                    style={styles.list}
                    data={pokemon.abilities}
                    keyExtractor={item => item.ability.name}
                    renderItem={({item}) => (
                        <Text style={styles.text}>{formatString(item.ability.name)}</Text>
                    )}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 5,
    },
    title: {
        margin: 5,
    },
    text: {
        padding: 2,
        fontSize: 10,
    },
    list: {
        maxHeight: 70,
        borderRadius: 5,
        borderWidth: 2,
        padding: 5,
        height: '25%',
    },
    img: {
        height: 20,
        width: 20,
    },
    label: {
        flexDirection: 'row',
        alignItems: 'center',
    }
});