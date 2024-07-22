import {View, Pressable, ImageBackground, StyleSheet, ImageSourcePropType} from "react-native";
import React from "react";
import {Text} from "../styles/StyledText";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "../navigation";

type PressableRegionProps = {
    region: string;
    onPress?: () => void;
}

const regionImages: { [key: string]: ImageSourcePropType } = {
    kanto: require('../../assets/images/regions/kanto.png'),
    johto: require('../../assets/images/regions/johto.png'),
    hoenn: require('../../assets/images/regions/hoenn.png'),
    sinnoh: require('../../assets/images/regions/sinnoh.png'),
    unova: require('../../assets/images/regions/unova.png'),
    kalos: require('../../assets/images/regions/kalos.png'),
    alola: require('../../assets/images/regions/alola.png'),
    galar: require('../../assets/images/regions/galar.png'),
    hisui: require('../../assets/images/regions/hisui.png'),
    paldea: require('../../assets/images/regions/paldea.png'),
    unknown: require('../../assets/images/box_bg.png')
}

export const PressableRegion = ({region, onPress}: PressableRegionProps) => {

    const formattedName = region
        .replace(/-/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    return (
        <Pressable
            onPress={onPress ?? onPress}
        >
            <ImageBackground source={regionImages[region]} borderRadius={10}>
                <View style={styles.regionContainer}>
                    <Text style={styles.regionName}>{formattedName}</Text>
                </View>
            </ImageBackground>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    regionContainer: {
        padding: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 10,
        borderWidth: 3,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
    },
    regionName: {
        color: 'white',
        fontSize: 24,
    },
    img: {
        borderRadius: 10
    }
});