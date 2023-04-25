import { configureStore } from '@reduxjs/toolkit';

import pokemonsReducer from './pokemonsSlice';
import typesReducer from './typesSlice';
import choosenPokemonReducer from './choosenPokemonSlice';

const store = configureStore({
    reducer: {
        pokemons: pokemonsReducer,
        types: typesReducer,
        choosenPokemon: choosenPokemonReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
