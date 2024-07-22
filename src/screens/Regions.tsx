import {View, StyleSheet, ScrollView} from "react-native";
import {Template} from "./Template";
import {useSelector} from "react-redux";
import {PressableRegion} from "../components";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "../navigation";

export const Regions = () => {

    const regions: { name: string; url: string }[] = useSelector((state: any) => state.regions.regions);
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    regions.map((region) => {
        console.log(region.name);
    });

    return (
        <Template title={"Regions"}>
            <ScrollView style={styles.container}>
                {regions.map((region, index) => (
                    <View style={styles.regionContainer} key={index}>
                        <PressableRegion region={region.name} onPress={() => {navigation.navigate('ShowRegion', { name: region.name })}} />
                    </View>
                ))}
            </ScrollView>
        </Template>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
    },
    regionContainer: {
        marginBottom: 10,
    }
});