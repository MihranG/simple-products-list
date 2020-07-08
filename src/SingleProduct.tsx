import React from 'react';
import {useDispatch} from 'react-redux';
import { addItemToCart} from "./store/store";
import { Typography, Card, CardContent, CardActions, CardMedia, Button} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {IProduct} from "./store/types";

const useStyles = makeStyles((theme)=>({
    root: {
        minWidth: 275,
        display: "flex",
        margin: '5px 0',
        justifyContent: "space-around"

    },
    productTitle: {
        // fontSize: 14,
        flexGrow: 2
    },
    control: {
        padding: theme.spacing(2),
    },
    row: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"

    },
    pos: {
        marginBottom: 12,
    },
    image: {
        backgroundImage: 'no repeat',
        alignSelf: 'center',
        width: 50,
        height: 50,
        margin: 5
    }
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
            <CardContent>
                <div className={classes.row}>
                    <Typography className={classes.productTitle} variant="h6" color="textPrimary" >
                        {title}
                    </Typography>
                    <Typography variant="h5">
                        {price+'$'}
                    </Typography>
                </div>
                <Typography className={classes.pos} color="textSecondary">
                    {description}
                </Typography>
                <CardActions>
                    <Button size="small" variant="contained" onClick={()=>dispatch(addItemToCart(id))}>Add to Order</Button>
                </CardActions>
            </CardContent>
        </Card>)
    )
}

export default SingleProduct
