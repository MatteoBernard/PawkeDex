import {View, StyleSheet, Dimensions} from "react-native";
import {RootStackParamList} from "../../navigation";
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from "@react-navigation/stack";
import {NavigationButton} from "./NavigationButton";
import {colors} from "../../styles";

const screenHeight = Dimensions.get('window').height;

export const NavigationMenu = () => {

    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    return (
        <View style={styles.container}>
            <NavigationButton title={"Pokedex"} onPress={() => {navigation.navigate("Pokedex")}} />
            <NavigationButton title={"Regions"} onPress={() => {navigation.navigate("Regions")}} />
            <NavigationButton title={"Favorites"} onPress={() => {navigation.navigate("Favorites")}} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        height: screenHeight * 0.1,
        backgroundColor: colors.dark
    },
});