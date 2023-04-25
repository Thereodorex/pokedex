import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Status, Field } from '../types';
import { Pokemon } from './pokemonsSlice';

interface Value {
    value: Type;
}

interface PokemonArray {
    pokemon: Pokemon;
}

export interface Type {
    name: string;
    pokemon: PokemonArray[];
    move_damage_class: Field;
}

interface TypesState {
    status: Status;
    data: Type[];
}

const initialState = {
    status: Status.loading,
    data: [],
} as TypesState;

const fetchEachType = (types: Field[]) => {
    const promiseArray = types.map(({ url }) => fetch(url).then((response) => response.json()));
    return Promise.allSettled(promiseArray);
};

export const fetchTypes = createAsyncThunk(
    'types/getList',
    () => fetch('https://pokeapi.co/api/v2/type?limit=1000&offset=0')
        .then((response) => response.json())
        .then((data) => fetchEachType(data.results))
        .catch((error) => error),
);

const pokemonsSlice = createSlice({
    name: 'types',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchTypes.pending, () => ({
            status: Status.loading,
            data: [],
            error: {},
        }));
        builder.addCase(fetchTypes.fulfilled, (_, action) => ({
            status: Status.loaded,
            data: action.payload.map(({ value }: Value): Type => value),
            error: {},
        }));
        builder.addCase(fetchTypes.rejected, (_, action) => ({
            status: Status.error,
            data: [],
            error: action.payload,
        }));
    },
});

// export const { increment, decrement, incrementByAmount } = pokemonsSlice.actions;
export default pokemonsSlice.reducer;
