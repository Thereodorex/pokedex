import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Status, Field } from '../types';

interface Ability {
    ability: Field;
}

interface Type {
    type: Field;
}

export interface Pokemon {
    name: string;
    abilities: Ability[];
    forms: Field[];
    types: Type[];
    sprites: Record<string, string>;
}

interface PokemonsState {
    status: Status;
    data: Pokemon | null;
}

const initialState = {
    status: Status.loading,
    data: null,
} as PokemonsState;

export const fetchPokemon = createAsyncThunk(
    'getPokemon',
    (url: string) => fetch(url)
        .then((response) => response.json())
        .then((data) => data)
        .catch((error) => error),
);

const pokemonSlice = createSlice({
    name: 'pokemons',
    initialState,
    reducers: {
        close(state) {
            state.data = null;
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchPokemon.pending, () => ({
            status: Status.loading,
            data: null,
            error: {},
        }));
        builder.addCase(fetchPokemon.fulfilled, (_, action) => ({
            status: Status.loaded,
            data: action.payload,
            error: {},
        }));
        builder.addCase(fetchPokemon.rejected, (_, action) => ({
            status: Status.error,
            data: null,
            error: action.payload,
        }));
    },
});

export const { close } = pokemonSlice.actions;
export default pokemonSlice.reducer;
