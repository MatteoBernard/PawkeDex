import {SafeAreaView, StyleSheet, Dimensions, View} from "react-native";
import {Header, NavigationMenu} from "../components";
import {colors} from "../styles";

const screenHeight = Dimensions.get('window').height;

type TemplateProps = {
    children: React.ReactNode;
    title: string;
}

export const Template = ({children, title}: TemplateProps) => {
    return (
        <SafeAreaView style={styles.container}>

            <Header title={title} />

            <View style={styles.scroll}>
                {children}
            </View>

            <NavigationMenu />

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        //paddingTop: 30,
    },
    scroll: {
        height: screenHeight * 0.8,
        backgroundColor: colors.primary
    },
});