import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Favorites, Pokedex, Regions, ShowRegion, ShowPokemon} from "../screens";
import { enableScreens } from 'react-native-screens';

enableScreens();

export type RootStackParamList = {
    Pokedex: undefined;
    Regions: undefined;
    Favorites: undefined;
    ShowPokemon: { name: string ; url: string, from: 'Pokedex' | 'Favorites'};
    ShowRegion: { name: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
    return (
        <Stack.Navigator initialRouteName={"Pokedex"}>
            <Stack.Screen name="Pokedex" component={Pokedex} options={{headerShown: false}} />
            <Stack.Screen name="Regions" component={Regions} options={{headerShown: false}} />
            <Stack.Screen name="Favorites" component={Favorites} options={{headerShown: false}} />
            <Stack.Screen name={"ShowPokemon"} component={ShowPokemon} options={{headerShown: false}} />
            <Stack.Screen name={"ShowRegion"} component={ShowRegion} options={{headerShown: false}} />
        </Stack.Navigator>
    );
}