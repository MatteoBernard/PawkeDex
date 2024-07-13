import { NavigationContainer } from '@react-navigation/native';
import React, {useEffect} from "react";
import RootNavigator from "./src/navigation/RootNavigation";
import {Provider, useDispatch} from "react-redux";
import {AppDispatch, store} from "./src/redux";
import {fetchPokemonsAsyncThunk} from "./src/redux/slices/pokemons";
import {fetchRegionsAsyncThunk} from "./src/redux/slices/regions";
import {useFonts} from "expo-font";
import { ThemeProvider } from 'styled-components/native';
import {Theme} from "./src/styles";


export const App = () => {

    const [fontsLoaded] = useFonts({
        'Pokemon_GB': require('./assets/fonts/Pokemon_GB.ttf'),
    });

    return (
        <ThemeProvider theme={Theme}>
            <Provider store={store}>
                <AppContent />
            </Provider>
        </ThemeProvider>
    );
}

const AppContent = () => {
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPokemonsAsyncThunk());
        dispatch(fetchRegionsAsyncThunk());
    }, [dispatch]);

    return (
        <NavigationContainer>
            <RootNavigator />
        </NavigationContainer>
    );
}

export default App;