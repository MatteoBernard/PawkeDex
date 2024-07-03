import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Favorites, Pokedex, Regions} from "../screens";

export type RootStackParamList = {
    Pokedex: undefined;
    Regions: undefined;
    Favorites: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Pokedex" component={Pokedex} />
            <Stack.Screen name="Regions" component={Regions} />
            <Stack.Screen name="Favorites" component={Favorites} />
        </Stack.Navigator>
    );
}