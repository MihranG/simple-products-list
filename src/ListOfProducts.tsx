import React from 'react';
import {Paper, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {RootState, } from "./store/store";
import {useSelector} from "react-redux";
import SingleProduct from "./SingleProduct";

const useStyles = makeStyles((theme) => ({
    title: {},
    paper: {
        height: 'auto',
        width: 350,
    },
}));


const  ListOfProducts : React.FC<{}>= ()=> {
    const classes = useStyles();
    const products = useSelector((state: RootState)=> {
        console.log(2234, state.inventory, state.inventory.productIDs.length)
        return state.inventory.productIDs.map(id => state.inventory.products[id])
    })

    return (
        <Paper variant="outlined" className={classes.paper} >
            <Typography className={classes.title} color="textSecondary" variant='h4'>
                List of Products
            </Typography>
            {products.map((product, index) =>
                <SingleProduct product={product} key={`${index}_${product.title}`} />
            )}
        </Paper>
    )
}


export default ListOfProducts
