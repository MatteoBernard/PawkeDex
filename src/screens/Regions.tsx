import {View, Text, TouchableOpacity} from "react-native";
import {Template} from "./Template";
import {useSelector} from "react-redux";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "../navigation";

export const Regions = () => {

    const regions: { name: string; url: string }[] = useSelector((state: any) => state.regions.regions);
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    return (
        <Template>
            <Text>Regions</Text>

            <View>
                {regions.map((region, index) => (
                    <TouchableOpacity key={index} onPress={() => { navigation.navigate('ShowRegion', { name: region.name }); }}>
                        <Text>{region.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </Template>
    )
}