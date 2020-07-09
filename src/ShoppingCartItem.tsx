import React from 'react';
import {useDispatch} from 'react-redux';
import {deleteItemFromCart, editQuantityOfItemInCart} from './store/store';
import {Typography, Card, CardContent, IconButton, CardActions, ButtonGroup} from '@material-ui/core';
import {Delete, RemoveCircleOutlineRounded, AddCircleOutlineRounded} from '@material-ui/icons';
import {makeStyles} from '@material-ui/core/styles';
import {IShoppingCartItem} from './ShoppingCart';

const useStyles = makeStyles((theme) => ({
    row: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    card: {
        display: 'flex',
        marginTop: '5px',

    },
    cardContent: {
        width: '100%',
    },
    itemTitle: {
        maxWidth: '110px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
}))

const ShoppingCartItem: React.FC<{ cartItem: IShoppingCartItem }> = ({cartItem}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {title, id, price, qty} = cartItem;
    const addRemoveHandler = (isAdding:boolean) => {
        dispatch(editQuantityOfItemInCart({id, isAdding}))
    }

    return (
        <Card className={classes.card} elevation={2}>
            <CardContent className={classes.cardContent}>
                <div className={classes.row}>
                    <Typography variant="h6" className={classes.itemTitle} >
                        {title}
                    </Typography>
                    <Typography variant="h6">
                        {price + '$'}
                    </Typography>
                </div>
                <div className={classes.row}>
                    <Typography variant="h6" color="textSecondary">
                        Quantity:
                    </Typography>
                    <Typography variant="h6">
                        {qty}
                    </Typography>
                </div>
            </CardContent>
            <CardActions>
                <ButtonGroup variant="contained" size="small" aria-label="small outlined button group" disableElevation >
                    <IconButton size="small" aria-label="delete" onClick={() => addRemoveHandler(true)}>
                        <AddCircleOutlineRounded />
                    </IconButton>
                    <IconButton size="small" aria-label="delete" disabled={qty < 2}
                                onClick={() => addRemoveHandler(false)}>
                        <RemoveCircleOutlineRounded />
                    </IconButton>

                </ButtonGroup>
                <IconButton aria-label="delete" onClick={() => dispatch(deleteItemFromCart(id))}>
                    <Delete />
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default ShoppingCartItem
