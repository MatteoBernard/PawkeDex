import {SafeAreaView, ScrollView, StyleSheet, Dimensions} from "react-native";
import {Header, NavigationMenu} from "../components";

const screenHeight = Dimensions.get('window').height;

type TemplateProps = {
    children: React.ReactNode;
    title: string;
}

export const Template = ({children, title}: TemplateProps) => {
    return (
        <SafeAreaView style={styles.container}>

            <Header title={title} />

            <ScrollView style={styles.scroll}>
                {children}
            </ScrollView>

            <NavigationMenu />

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    scroll: {
        height: screenHeight * 0.8,
    },
});