import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeFavoritePokemon = async (name: string, url: string) => {
    try {
        await AsyncStorage.setItem(name, url)
    } catch (e) {
        console.log(e);
    }
}

export const getFavoritePokemon = async (name: string): Promise<{name: string, url: string}> => {
    try {
        let url = await AsyncStorage.getItem(name);
        url = url ? url : '';
        return {name, url};
    } catch (e) {
        console.log(e);
        return {name: '', url: ''};
    }
}

export const getAllFavoritePokemon = async (): Promise<{name: string, url: string}[]> => {
    try {
        const keys = await AsyncStorage.getAllKeys();
        const result = await AsyncStorage.multiGet(keys);
        return result.map(([name, url]) => ({name, url: url ? url : ''}));
    } catch (e) {
        console.log(e);
        return [];
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