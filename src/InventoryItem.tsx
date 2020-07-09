import React from 'react';
import {useDispatch} from 'react-redux';
import {deleteItemFromCart, deleteProductFromInventory} from './store/store';
import {Typography, Card, CardContent, CardActions, IconButton} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {IProduct} from './store/types';
import {Delete, Edit} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    row: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    card: {
        display: 'flex',
    },
    cardContent: {
        width: '100%',
    },
    itemTitle: {
        maxWidth: '155px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
}))


interface IOwnProps {
    product: IProduct,
    onEditHandler: (id:number) => void
}
const InventoryItem: React.FC<IOwnProps> = ({product,onEditHandler}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const deleteHandler = (deletableId: number) => {
        dispatch(deleteProductFromInventory(deletableId));
        dispatch(deleteItemFromCart(deletableId));
    }
    const {id ,title, price} = product;

    return (
        (<Card className={classes.card} >
            <CardContent className={classes.cardContent} >
                <div className={classes.row}>
                    <Typography variant="h6" className={classes.itemTitle} >
                        {title}
                    </Typography>
                    <Typography variant="h6">
                        {price + '$'}
                    </Typography>
                </div>
            </CardContent>
            <CardActions>
                <IconButton aria-label="edit" onClick={() => onEditHandler(id)}>
                    <Edit />
                </IconButton>
                <IconButton aria-label="delete" onClick={() => deleteHandler(id)}>
                    <Delete />
                </IconButton>
            </CardActions>
        </Card>)
    )
}

export default InventoryItem
