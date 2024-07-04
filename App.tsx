import { NavigationContainer } from '@react-navigation/native';
import React, {useEffect} from "react";
import RootNavigator from "./src/navigation/RootNavigation";
import {Provider, useDispatch} from "react-redux";
import {AppDispatch, store} from "./src/redux";
import {fetchPokemonsAsyncThunk} from "./src/redux/slices/pokemons";
import {fetchRegionsAsyncThunk} from "./src/redux/slices/regions";

export const App = () => {
    return (
        <Provider store={store}>
            <AppContent />
        </Provider>
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