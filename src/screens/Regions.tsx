import {View, Text} from "react-native";
import {Template} from "./Template";
import {useSelector} from "react-redux";

export const Regions = () => {

    const regions: { name: string; url: string }[] = useSelector((state: any) => state.regions.regions);

    return (
        <Template>
            <Text>Regions</Text>

            <View>
                {regions.map((region, index) => (
                    <Text key={index}>{region.name}</Text>
                ))}
            </View>
        </Template>
    )
}