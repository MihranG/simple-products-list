import {ThunkAction, Action} from "@reduxjs/toolkit";
import {RootState, bulkAddProducts} from "./store";
import {products} from "./mockData";

export const fetchProducts = (): ThunkAction<void , RootState, unknown, Action<{}>> => {
    return function(dispatch){
        return Promise.resolve(products).then(res=>{
            dispatch(bulkAddProducts(res));
        })
    }
}
