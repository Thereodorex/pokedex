import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';

import { Provider } from 'react-redux';
import store from './store';

import { PokemonsPage } from './pages/Pokemons';

const root = ReactDOM.createRoot(document.getElementById('app') as HTMLElement);

root.render(
    <Provider store={store}>
        <ConfigProvider>
            <PokemonsPage />
        </ConfigProvider>
    </Provider>,
);
