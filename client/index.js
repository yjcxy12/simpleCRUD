import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import SimpleCrudContainer from './containers/SimpleCrudContainer';

const store = applyMiddleware(thunk)(createStore)(rootReducer);
const containerElement = document.getElementById('main-display');

if (containerElement !== null) {
    ReactDOM.render(
        <Provider store={ store }>
            <SimpleCrudContainer />
        </Provider>,
        containerElement
    );
}
