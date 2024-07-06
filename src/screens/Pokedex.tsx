import {View, Text, TouchableOpacity} from "react-native";
import {Template} from "./Template";
import {useSelector} from "react-redux";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "../navigation";

export const Pokedex = () => {

    const pokemons: { name: string; url: string }[] = useSelector((state: any) => state.pokemons.pokemons);
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    return (
        <Template>
            <Text>Pokedex</Text>

            <View>
                {pokemons.map((pokemon, index) => (
                    <TouchableOpacity key={index} onPress={() => {navigation.navigate('ShowPokemon', {name: pokemon.name, url: pokemon.url, from: 'Pokedex'})}}>
                        <Text>{pokemon.name}</Text>
                    </TouchableOpacity>

                ))}
            </View>
        </Template>
    )
}