import {Template} from "./Template";
import {Text, View} from "react-native";
import {RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import {RootStackParamList} from "../navigation";
import {StackNavigationProp} from "@react-navigation/stack";
import {Region} from "pokenode-ts";
import {useEffect, useState} from "react";
import {fetchRegionByName} from "../api/pokeApi";

export const ShowRegion = () => {

    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const route = useRoute<RouteProp<RootStackParamList, 'ShowRegion'>>();
    const [region, setRegion] = useState<Region | null>(null);
    const name = route.params.name;

    useEffect(() => {
        console.log(name);
        fetchRegionByName(name).then((response: Region) => {
            setRegion(response);
        });
    }, [name]);

    return (
        <Template>
            <Text>ShowRegion</Text>
            {region && (
                <View>
                    <Text>{region.name}</Text>
                    <Text>{region.main_generation.name}</Text>

                    <Text>Locations :</Text>
                    <View>
                        {region.locations.map((location, index) => (
                            <Text key={index}>{location.name}</Text>  // Wrap the name in a <Text> component
                        ))}
                    </View>

                    <Text>Versions : </Text>
                    <View>
                        {region.version_groups.map((version, index) => (
                            <Text key={index}>{version.name}</Text>  // Wrap the name in a <Text> component
                        ))}
                    </View>
                </View>
            )}
        </Template>
    );
}