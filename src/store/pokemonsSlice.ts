import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Status } from '../types';

export interface Pokemon {
    name: string;
    types: string[];
    url: string;
}

interface PokemonsState {
    status: Status;
    data: Pokemon[];
}

const initialState = {
    status: Status.loading,
    data: [],
} as PokemonsState;

export const fetchPokemons = createAsyncThunk(
    'pokemons/getList',
    () => fetch('https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0')
        .then((response) => response.json())
        .then((data) => data.results)
        .catch((error) => error),
);

const pokemonsSlice = createSlice({
    name: 'pokemons',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPokemons.pending, () => ({
            status: Status.loading,
            data: [],
            error: {},
        }));
        builder.addCase(fetchPokemons.fulfilled, (_, action) => ({
            status: Status.loaded,
            data: action.payload,
            error: {},
        }));
        builder.addCase(fetchPokemons.rejected, (_, action) => ({
            status: Status.error,
            data: [],
            error: action.payload,
        }));
    },
});

export default pokemonsSlice.reducer;
