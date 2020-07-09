import React, {useEffect} from 'react';
import ListOfProducts from './ListOfProducts';
import Inventory from './Inventory';
import ShoppingCart from './ShoppingCart';
import {Container, Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {useDispatch} from 'react-redux';
import {fetchProducts} from './store/thunk';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: 100,
    },

    control: {
        padding: theme.spacing(2),
    },
}));
function App() {
    const classes = useStyles();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchProducts())
    },[dispatch])
    return (
            <div className="App">
                <Container fixed>
                    <Grid container className={classes.root} justify="center" spacing={2}>
                            <Grid item>
                                <ListOfProducts />
                            </Grid>
                            <Grid item>
                                <ShoppingCart />
                            </Grid>
                            <Grid item>
                                <Inventory />
                            </Grid>
                    </Grid>
                </Container>
            </div>
  );
}


export default App;
