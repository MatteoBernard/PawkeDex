import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Favorites, Pokedex, Regions} from "../screens";
import {ShowPokemon} from "../screens/ShowPokemon";

export type RootStackParamList = {
    Pokedex: undefined;
    Regions: undefined;
    Favorites: undefined;
    ShowPokemon: { name: string ; url: string};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
    return (
        <Stack.Navigator initialRouteName={"Pokedex"}>
            <Stack.Screen name="Pokedex" component={Pokedex} options={{headerShown: false}} />
            <Stack.Screen name="Regions" component={Regions} options={{headerShown: false}} />
            <Stack.Screen name="Favorites" component={Favorites} options={{headerShown: false}} />
            <Stack.Screen name={"ShowPokemon"} component={ShowPokemon} options={{headerShown: false}} />
        </Stack.Navigator>
    );
}