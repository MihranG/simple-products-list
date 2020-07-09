import React from 'react';
import {useDispatch} from 'react-redux';
import { addItemToCart} from './store/store';
import { Typography, Card, CardContent, CardActions, CardMedia, Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {IProduct} from './store/types';

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
        display: 'flex',
        marginTop: '5px',
        justifyContent: 'space-around',

    },
    cardContent: {
        width: 250,
    },
    productTitle: {
        fontSize: 18,
        flexGrow: 2,
        maxWidth: '155px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
    control: {
        padding: theme.spacing(2),
    },
    row: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    itemDescription: {
        marginBottom: 12,
        maxHeight: 50,
        overflowY: 'scroll',
    },
    image: {
        backgroundImage: 'no repeat',
        alignSelf: 'center',
        width: 50,
        height: 50,
        margin: 5,
    },
}))

const SingleProduct: React.FC<{ product: IProduct }> = ({product}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {title, price, id, description, imageUrl} = product;

    return (
        (<Card  className={classes.root}>
            <CardMedia
                className={classes.image}
                image={`${process.env.PUBLIC_URL}/${imageUrl}`}
                title="Item image"
            />
            <CardContent className={classes.cardContent}>
                <div className={classes.row}>
                    <Typography className={classes.productTitle} variant="h6" color="textPrimary" >
                        {title}
                    </Typography>
                    <Typography variant="h5">
                        {price + '$'}
                    </Typography>
                </div>
                <Typography className={classes.itemDescription} color="textSecondary">
                    {description}
                </Typography>
                <CardActions>
                    <Button size="small" variant="contained" onClick={() => dispatch(addItemToCart(id))}>Add to Order</Button>
                </CardActions>
            </CardContent>
        </Card>)
    )
}

export default SingleProduct
