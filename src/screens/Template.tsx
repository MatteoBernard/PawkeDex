import {SafeAreaView, StyleSheet} from "react-native";
import {NavigationMenu} from "../components";

type TemplateProps = {
    children: React.ReactNode;

}

export const Template = ({children}: TemplateProps) => {
    return (
        <SafeAreaView style={styles.container}>

            {children}

            <NavigationMenu />

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between'
    }
});