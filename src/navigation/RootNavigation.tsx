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
        <Stack.Navigator initialRouteName={"Pokedex"}>
            <Stack.Screen name="Pokedex" component={Pokedex} options={{headerShown: false}} />
            <Stack.Screen name="Regions" component={Regions} options={{headerShown: false}} />
            <Stack.Screen name="Favorites" component={Favorites} options={{headerShown: false}} />
        </Stack.Navigator>
    );
}