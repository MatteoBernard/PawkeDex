import {StyleSheet, View} from "react-native";
import {Text} from "../../styles/StyledText";
import {Pokemon} from "pokenode-ts";
import {typeColors} from "../../styles";

type StatsTabProps = {
    pokemon: Pokemon;
}

export const StatsTab = ({pokemon}: StatsTabProps) => {

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
            <View style={styles.typeContainer}>
                {pokemon.types.map(type => (
                    //@ts-ignore
                    <Text key={type.type.name} style={[styles.type, {backgroundColor: typeColors[type.type.name]}]}>{formatString(type.type.name)}</Text>
                ))}
            </View>
            {pokemon.stats.map(stat => (
                <Text key={stat.stat.name} style={styles.text}>{formatString(stat.stat.name)}: {stat.base_stat}</Text>
            ))}
            <Text style={styles.text}>Weight: {pokemon.weight}</Text>
            <Text style={styles.text}>Height: {pokemon.height}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 5,
        gap: 3
    },
    text: {
        padding: 2,
        fontSize: 10
    },
    typeContainer : {
        flexDirection: 'row',
        gap: 5
    },
    type: {
        padding: 5,
        fontSize: 10,
        borderRadius: 5,
        borderWidth: 2,
        textAlign: 'center',
    }
});