import React from 'react';
import {useDispatch} from 'react-redux';
import {deleteItemFromCart} from "./store/store";
import {Typography, Card, CardContent, IconButton, CardActions} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";
import {IShoppingCartItem} from "./ShoppingCart";

const useStyles = makeStyles((theme)=>({
    row: {
        display: "flex",
        justifyContent: "space-between",
    },
    card: {
        display: 'flex',
        marginTop: "5px"

    },
    cardContent: {
        width: '100%'
    },
}))

const ShoppingCartItem: React.FC<{ cartItem: IShoppingCartItem }> = ({cartItem}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {title, id, price, qty} = cartItem;

    return (
        <Card className={classes.card} elevation={2}>
            <CardContent className={classes.cardContent}>
                <div className={classes.row}>
                    <Typography variant="h6" >
                        {title}
                    </Typography>
                    <Typography variant="h6">
                        {price + '$'}
                    </Typography>
                </div>
                <div className={classes.row}>
                    <Typography variant="h6" color='textSecondary'>
                        Quantity:
                    </Typography>
                    <Typography variant="h6">
                        {qty}
                    </Typography>
                </div>
            </CardContent>
            <CardActions>
                <IconButton aria-label="delete" onClick={()=>dispatch(deleteItemFromCart(id))}>
                    <Delete />
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default ShoppingCartItem
