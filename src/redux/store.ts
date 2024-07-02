import { configureStore } from '@reduxjs/toolkit';
import { pokemonsSlice } from './slices/pokemons';
import { regionsSlice } from './slices/regions';

export const store = configureStore({
    reducer: {
        pokemons: pokemonsSlice.reducer,
        regions: regionsSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;