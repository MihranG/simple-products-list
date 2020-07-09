import React from 'react';
import { useSelector} from 'react-redux';
import {RootState} from './store/store';
import {Paper, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import ShoppingCartItem from './ShoppingCartItem';

const useStyles = makeStyles((theme) => ({
    paper:{
        height: 'auto',
        width: 350,
        maxHeight: '600',
        overflowX: 'scroll',
    },
}))


export interface IShoppingCartItem {
    id: number,
    price: number,
    title: string,
    qty: number
}

const ShoppingCart: React.FC<{}> = () => {
    const classes = useStyles();
    let total = 0;
    const shoppingCart: IShoppingCartItem[] = useSelector((state: RootState) => {
        return Object.keys(state.cart).map((itemID, index, arr) => {
            const product = state.inventory.products[itemID];
            total += state.cart[itemID] * product.price;
            const id = parseInt(itemID);
            return {id, price: product.price, title: product.title, qty: state.cart[itemID] }
        })
    });


    return (
        <Paper variant="outlined" className={classes.paper} >
            <Typography color="textSecondary" variant="h4">
                Shopping Cart
            </Typography>
            {shoppingCart.map((cartItem, index) => (
               <ShoppingCartItem cartItem={cartItem} key={`${index}_${cartItem.id}_${cartItem.title}`}/>
            ))}
            <Typography variant="h6">
                Total: {total + '$'}
            </Typography>
        </Paper>
    )
}

export default ShoppingCart
