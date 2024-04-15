import {configureStore, combineReducers} from '@reduxjs/toolkit';
import userReducer from './user/userSlice.js';
import roomReducer from './room/roomSlice.js';
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {FLUSH, REHYDRATE, PAUSE, REGISTER, PURGE, PERSIST} from 'redux-persist';
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
    reducer:persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);