import {Dimensions, Image, StyleSheet, View} from "react-native";
import {Text} from "../styles/StyledText";
import {colors} from "../styles";

const screenHeight = Dimensions.get('window').height;

type HeaderProps = {
    title: string;
}

export const Header = ({title}: HeaderProps) => {
    return (
        <View style={styles.main}>
            <Image
                source={require('../../assets/images/pawkedex_logo_crop.png')}
                style={styles.img}
            />
            <Text style={styles.title}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: colors.dark,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: "5%",
        height: screenHeight * 0.1,
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        color: colors.primary,
    },
    img: {
        height: "85%",
        width: "auto",
        aspectRatio: 1,
        resizeMode: "contain"
    }
});