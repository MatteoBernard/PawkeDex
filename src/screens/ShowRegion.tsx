import {Template} from "./Template";
import {RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import {RootStackParamList} from "../navigation";
import {Region} from "pokenode-ts";
import {useEffect, useState} from "react";
import {fetchRegionByName} from "../api/pokeApi";
import {PressableRegion, StyledContainer} from "../components";
import {Image, StyleSheet, View, FlatList} from "react-native";
import {Text} from '../styles/StyledText'
import {colors} from "../styles";
import PokeballLoader from "../components/PokeballLoader";

export const ShowRegion = () => {

    const route = useRoute<RouteProp<RootStackParamList, 'ShowRegion'>>();
    const [region, setRegion] = useState<Region | null>(null);
    const name = route.params.name;

    const formatGen = (gen: string) => {
        let parts = gen.split('-');
        return parts[0].charAt(0).toUpperCase() + parts[0].slice(1).toLowerCase() + ' ' + parts[1].toUpperCase();
    }

    const formatString = (str: string) => {
        return str
            .replace(/-/g, ' ')
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    useEffect(() => {
        console.log(name);
        fetchRegionByName(name).then((response: Region) => {
            setRegion(response);
        });
    }, [name]);

    const renderItem = ({ item }: { item: string }) => {
        return (
            <View style={styles.itemContainer}>
                <Text style={styles.itemText}>{item}</Text>
            </View>
        );
    };

    return (
        <Template title={region?.name ?? "Region"}>
            {region ? (
                <View style={styles.container}>
                    <PressableRegion region={name} />

                    {
                        region.main_generation && (
                            <View style={styles.rowContainer}>
                                <StyledContainer>
                                    <Image
                                        source={require('../../assets/images/pawkedex_logo_crop.png')}
                                        style={styles.img}
                                    />
                                    <Text style={styles.text}>{formatGen(region.main_generation.name)}</Text>
                                    <Image
                                        source={require('../../assets/images/pawkedex_logo_crop.png')}
                                        style={styles.img}
                                    />
                                </StyledContainer>
                            </View>
                        )
                    }

                    <View style={styles.flatlistContainer}>
                        <Text style={styles.title}>Locations</Text>
                        <View style={styles.flatlistInner}>
                            <FlatList
                                data={region.locations.map(location => formatString(location.name))}
                                renderItem={renderItem}
                                keyExtractor={(item) => item}
                            />
                        </View>

                    </View>

                </View>
            ) : (
                <PokeballLoader />
                )
            }
        </Template>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
        gap: 10,
    },
    rowContainer: {
        flexDirection: 'row',
    },
    img: {
        height: 20,
        width: 20,
    },
    text: {
        marginHorizontal: 10,
        textAlign: 'center',
    },
    flatlistContainer: {
        flex: 1,
        borderWidth: 3,
        borderRadius: 10,
        padding: 10,
        backgroundColor: colors.dark
    },
    flatlistInner: {
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'white',
        margin: 15,
        padding: 10,
        backgroundColor: colors.light,
    },
    itemContainer: {
        padding: 10,
    },
    itemText: {
        fontSize: 10,
    },
    title: {
        fontSize: 15,
        textAlign: 'center',
        color: 'white',
    }
});