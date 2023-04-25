import React, { useCallback } from 'react';
import { Modal } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { close } from '../../store/choosenPokemonSlice';

const PokemonModal: React.FC = () => {
    const dispatch = useDispatch();

    const pokemon = useSelector((state: RootState) => state.choosenPokemon.data);

    const handleOk = useCallback(() => {
        dispatch(close());
    }, []);

    return (
        <Modal
            title={pokemon?.name}
            open={!!pokemon}
            onOk={handleOk}
            onCancel={handleOk}
            cancelButtonProps={{ style: { display: 'none' } }}
            okButtonProps={{ style: { width: '200px' } }}
        >
            { !pokemon ? null
                : (
                    <>
                        <p>
                            {
                                Object.values(pokemon.sprites).map((sprite) => (typeof sprite === 'string'
                                    ? <img src={sprite} alt={pokemon.name} /> : null))
                            }
                        </p>
                        <p>
                            Abilities:
                            {pokemon.abilities.map(({ ability }) => ability.name).join(', ')}
                        </p>
                        <p>
                            Types:
                            {pokemon.types.map(({ type }) => type.name).join(', ')}
                        </p>
                        <p>
                            Forms:
                            {pokemon.forms.map(({ name }) => name).join(', ')}
                        </p>
                    </>
                )}
        </Modal>
    );
};

export default PokemonModal;
