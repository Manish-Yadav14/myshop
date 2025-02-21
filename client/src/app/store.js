import { configureStore, } from '@reduxjs/toolkit'
import authReducer from '../slices/authSlice';
import cartReducer from '../slices/cartSlice';
import storage from 'redux-persist/lib/storage'; 
import {persistStore,persistReducer}  from 'redux-persist'
import { combineReducers } from 'redux';

const persistConfig = {
  key : 'root',
  storage
}

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer:persistedReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({ // middleware to avoid serialisable error
    serializableCheck: false,
  }),
})

export const persistor = persistStore(store);