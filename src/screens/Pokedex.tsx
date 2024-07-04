import {View, Text} from "react-native";
import {Template} from "./Template";
import {useSelector} from "react-redux";

export const Pokedex = () => {

    const pokemons: { name: string; url: string }[] = useSelector((state: any) => state.pokemons.pokemons);

    return (
        <Template>
            <Text>Pokedex</Text>

            <View>
                {pokemons.map((pokemon, index) => (
                    <Text key={index}>{pokemon.name}</Text>
                ))}
            </View>
        </Template>
    )
}