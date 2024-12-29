import {configureStore} from "@reduxjs/toolkit";
import cartReducer from "./features/cartSlice";
import loadingReducer from './features/loadingSlice';
import productReducer from './features/productSlice';

export const store=configureStore({
    reducer:{
        cartReducer,
        productReducer,
        loadingReducer
    },
});

export type RootState=ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;