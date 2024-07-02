import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {fetchAllRegions} from "../../api/pokeApi";

interface RegionsState {
    regions: { name: string; url: string }[];
    loading: boolean;
    error: string | null;
}

const initialState: RegionsState = {
    regions: [],
    loading: false,
    error: null,
};

export const fetchRegionsAsyncThunk = createAsyncThunk(
    "regions/fetchRegions",
    async () => {
       return await fetchAllRegions();
    }
);

export const regionsSlice = createSlice({
    name: "regions",
    initialState: initialState,
    reducers: {
        setLoading: (state) => {
            state.loading = true;
            state.error = null;
        },
        setRegions: (state, action) => {
            state.loading = false;
            state.error = null;
            state.regions = action.payload;
        },
        setError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchRegionsAsyncThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchRegionsAsyncThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.regions = action.payload;
        });
        builder.addCase(fetchRegionsAsyncThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "An error occurred.";
        });
    }
});