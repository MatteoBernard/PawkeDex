import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {fetchPokemons} from "../../api/pokeApi";

interface PokemonsState {
    pokemons: { name: string; url: string }[];
    loading: boolean;
    error: string | null;
}

const initialState: PokemonsState = {
    pokemons: [],
    loading: false,
    error: null,
};

export const fetchPokemonsAsyncThunk = createAsyncThunk(
    "pokemons/fetchPokemons",
    async () => {
        return await fetchPokemons();
    }
);

export const pokemonsSlice = createSlice({
    name: "pokemons/fetchPokemons",
    initialState: initialState,
    reducers: {
        setLoading: (state) => {
            state.loading = true;
            state.error = null;
        },
        setPokemons: (state, action) => {
            state.loading = false;
            state.error = null;
            state.pokemons = action.payload;
        },
        setError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPokemonsAsyncThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchPokemonsAsyncThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.pokemons = action.payload;
            console.log("pokemons fetched: ", action.payload);
        });
        builder.addCase(fetchPokemonsAsyncThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "An error occurred.";
        });
    }
});

export const {setLoading, setPokemons, setError} = pokemonsSlice.actions;