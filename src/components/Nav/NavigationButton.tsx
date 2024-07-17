import {Pressable, StyleSheet, View} from "react-native";
import {Text} from "../../styles/StyledText";
import {colors} from "../../styles";

type NavigationButtonProps = {
    title: string;
    onPress: () => void;
}

export const NavigationButton = ({title, onPress}: NavigationButtonProps) => {
    return (
        <Pressable style={styles.button} onPress={onPress}>
            <View style={styles.innerButton}>
                <Text style={styles.text}>{title}</Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.secondary,
        paddingHorizontal: 8,
        borderRadius: 5,
        height: "60%"
    },
    innerButton: {
        backgroundColor: colors.primary,
        flex: 1,
        justifyContent: 'center',
        borderRadius: 5,
    },
    text: {
        fontSize: 10,
        padding: 5
    },
});