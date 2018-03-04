import React from 'react';
import reactDOM from 'react-dom'
import { getStore } from './getStore';
import { Provider } from 'react-redux';
import { App } from './App';
import { DevTools } from './components';

const store = getStore();

const Main = () => (
    <Provider store={store}>
        <App />
    </Provider>
)

const render = (store) => {
    reactDOM.render(
        <div>
            <DevTools store={store} />
            <Main state={store.getState()} />
        </div>,
        document.getElementById('AppContainer'));
};

render(store);