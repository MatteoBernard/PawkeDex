import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeFavoritePokemon = async (name: string, url: string) => {
    try {
        await AsyncStorage.setItem(name, url)
    } catch (e) {
        console.log(e);
    }
}

export const getFavoritePokemon = async (name: string) => {
    try {
        const url = await AsyncStorage.getItem(name);
        return {name, url};
    } catch (e) {
        console.log(e);
    }
}

export const getAllFavoritePokemon = async () => {
    try {
        const names = await AsyncStorage.getAllKeys();
        const urls = await AsyncStorage.multiGet(names);
        return names.map(([name, url]) => ({name, url}));
    } catch (e) {
        console.log(e);
    }
}

export const removeFavoritePokemon = async (name: string) => {
    try {
        await AsyncStorage.removeItem(name);
    } catch (e) {
        console.log(e);
    }
}

export const clearAllFavoritePokemon = async () => {
    try {
        await AsyncStorage.clear();
    } catch (e) {
        console.log(e);
    }
}