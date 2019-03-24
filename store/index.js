import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import { AsyncStorage } from 'react-native';
import reducer from '../reducers';
ç
const store = createStore(
    reducer,
    {},
    compose(
        applyMiddleware(thunk),
        autoRehydrate()
    )
);

ç

export default store;

