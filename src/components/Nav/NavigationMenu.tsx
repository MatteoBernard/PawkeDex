import {TouchableOpacity, View, Text, StyleSheet} from "react-native";
import {RootStackParamList} from "../../navigation";
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from "@react-navigation/stack";

export const NavigationMenu = () => {

    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate("Pokedex")}}>
                <Text>Pokedex</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate("Regions")}}>
                <Text>Regions</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate("Favorites")}}>
                <Text>Favorites</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10,
    },
    button: {
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
    },
});