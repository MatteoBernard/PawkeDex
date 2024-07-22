import {StyleSheet, View} from "react-native";
import {colors} from "../styles";

type StyledContainerProps = {
    children: React.ReactNode;
    style?: object;
}

export const StyledContainer = ({children, style}: StyledContainerProps) => {
    return (
        <View style={[styles.container, style]}>
            <View style={styles.innerContainer}>
                {children}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 5,
        borderWidth: 3,
        borderColor: colors.dark,
        borderRadius: 10,
        backgroundColor: colors.secondary
    },
    innerContainer: {
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 10,
        backgroundColor: colors.primary,
    }
});