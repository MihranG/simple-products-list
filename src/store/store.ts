import {configureStore, createSlice, PayloadAction} from "@reduxjs/toolkit";
import { combineReducers } from 'redux';

import {
    ICartState,
    INormalizedProductsObject,
    IProduct,
    IProductsState,
    TProductsEditPayload
} from "./types";

const initialInventoryState: IProductsState = {
    products: {},
    productIDs: []
};


const inventorySlice = createSlice({
    name: 'inventorySlice',
    initialState: initialInventoryState,
    reducers: {
        bulkAddProducts(state, action: PayloadAction<IProduct[]>){
            const {payload} = action;
            const products: INormalizedProductsObject = {};
            state.productIDs = payload.map(product=>{
                products[product.id] = product;
                return product.id;
            });
            state.products =  products;
        },

        addProductToInventory(state, action: PayloadAction<Omit <IProduct,'id'> >){
            let id = state.productIDs[state.productIDs.length -1 ] + 1;
            while(state.productIDs.indexOf(id) !== -1){
                id++;
            }
            const product = {id, ...action.payload};

            state.productIDs.push(id);
            state.products[id] = product;
        },

        deleteProductFromInventory(state, action: PayloadAction<number>){
           const {payload} = action;
           state.productIDs = state.productIDs.filter(item=>item !== payload);
           delete state.products[payload];
        },

        editProductInInventory(state, action: PayloadAction<TProductsEditPayload>){
            const {id} = action.payload;
            if(state.productIDs.indexOf(id) !== -1){
                state.products[id] = {...state.products[id], ...action.payload};
            }
        }
    }
});


const initialCartState: ICartState = {};

const cartSlice = createSlice({
    name: 'cartSlice',
    initialState: initialCartState,
    reducers: {
        addItemToCart(state, action: PayloadAction<number>){
            const id = action.payload;
            if(!!state[id]){
                state[id] += 1;
            }else{
                state[id] = 1;
            }
        },

        deleteItemFromCart(state, action: PayloadAction<number>){
            const { payload} = action;
            if(!!state[payload]){
                delete state[payload];
            }
        },

        editQuantityOfItemInCart(state, action: PayloadAction<{id: number, isAdding: boolean}>){
            const {id, isAdding} = action.payload;
            const corrector: number = isAdding ? 1 : -1;
            if(!!state[id]){
                state[id] += corrector;
            }
        }
    }
});

const rootReducer = combineReducers({
    inventory: inventorySlice.reducer,
    cart: cartSlice.reducer,
});

export const {
    actions: {
        addProductToInventory,
        bulkAddProducts,
        editProductInInventory,
        deleteProductFromInventory
    }
} = inventorySlice;

export const {
    actions: {
        addItemToCart,
        deleteItemFromCart,
        editQuantityOfItemInCart,
    }
} = cartSlice;


export const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>
