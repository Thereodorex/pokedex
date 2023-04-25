import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Table } from 'antd';

import PokemonModal from '../../features/PokemonModal';
import Filter from '../../features/Filter';

import { RootState, AppDispatch } from '../../store';
import { fetchPokemons, Pokemon } from '../../store/pokemonsSlice';
import { fetchTypes } from '../../store/typesSlice';
import { fetchPokemon } from '../../store/choosenPokemonSlice';

interface PokemonTable extends Pokemon {
    damage: string[];
}

const { Column } = Table;

export function PokemonsPage() {
    const [tableDate, setTableData] = useState<PokemonTable[]>([]);
    const [nameFilter, setNameFilter] = useState('');
    const [typeFilter, setTypeFilter] = useState([] as string[]);
    const dispatch = useDispatch<AppDispatch>();
    const pokemons = useSelector((state: RootState) => state.pokemons.data);
    const types = useSelector((state: RootState) => state.types.data);

    useEffect(() => {
        dispatch(fetchPokemons());
        dispatch(fetchTypes());
    }, []);

    useEffect(() => {
        setTypeFilter(types.map((type) => type.name));
    }, [types]);

    useEffect(() => {
        if (pokemons?.length && types?.length) {
            const pokemonsData = pokemons.map((pokemon) => ({
                ...pokemon,
                ...types.reduce((acc, type) => {
                    // console.log(pokemon.name, type.pokemon)
                    if (type.pokemon.find((pok) => (pok.pokemon.name === pokemon.name))) {
                        acc.types.push(type.name);
                        if (type.move_damage_class) {
                            acc.damage.push(type.move_damage_class.name);
                        }
                    }
                    return acc;
                }, { types: [] as string[], damage: [] as string[] }),
            }));
            setTableData(
                pokemonsData
                    .filter((pokemon) => pokemon.name.includes(nameFilter))
                    .filter((pokemon) => typeFilter.some(
                        (choosenType) => pokemon.types.some((pokemonType) => pokemonType === choosenType),
                    )),
            );
        }
    }, [pokemons, types, nameFilter, typeFilter]);

    return (
        <>
            <Filter
                inputText={nameFilter}
                onChangeInput={(name: string) => setNameFilter(name)}
                filterTypes={typeFilter}
                setFilterTypes={setTypeFilter}
                allTypes={types.map((type) => type.name)}
            />
            <Table
                dataSource={tableDate}
                pagination={{
                    defaultPageSize: 10,
                    showSizeChanger: true,
                    pageSizeOptions: ['10', '20', '50'],
                }}
                onRow={(record: PokemonTable) => ({
                    onClick: () => {
                        dispatch(fetchPokemon(record.url));
                    },
                })}
            >
                <Column title="Name" dataIndex="name" key="firstName" />
                <Column
                    title="Types"
                    key="types"
                    render={(_, record: PokemonTable) => (<p>{record.types.join(', ')}</p>)}
                />
                <Column
                    title="Damage"
                    key="damage"
                    render={(_, record: PokemonTable) => (<p>{record.damage.join(', ')}</p>)}
                />
            </Table>
            <PokemonModal />
        </>
    );
}

export default PokemonsPage;
