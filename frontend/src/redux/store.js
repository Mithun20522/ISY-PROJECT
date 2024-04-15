import {configureStore, combineReducers} from '@reduxjs/toolkit';
import userReducer from './user/userSlice.js';
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import roomReducer from './chat/roomSlice.js';

const rootReducer = combineReducers({
    user:userReducer,
    room:roomReducer
});

const persistConfig = {
    key:'root',
    storage,
    version:1
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer:persistedReducer
});

export const persistor = persistStore(store);