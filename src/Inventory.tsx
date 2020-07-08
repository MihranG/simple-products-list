import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {deleteItemFromCart, deleteProductFromInventory, RootState} from "./store/store";
import {Button, Card, CardActions, CardContent, IconButton, Paper, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {Delete} from "@material-ui/icons";
import ItemAddEdit from "./ItemAddEdit";

const useStyles = makeStyles((theme)=>({
     paper:{
          height: 'auto',
          width: 350,
     },
     row: {
          display: "flex",
          justifyContent: "space-between"
     },
     card: {
          display: 'flex',
     },
     cardContent: {
          width: '100%'
     },
     addButton : {
          margin: 5
     }
}))


export interface IShoppingCartItem {
     id: number,
     price: number,
     title: string,
     qty: number
}

const Inventory: React.FC<{}> = ()=>{
     const [manipulatingItemId, setManipulatingItemId] = useState<number>(-1);
     const classes = useStyles();
     const dispatch = useDispatch();
     const deleteHandler = (id:number)=>{
          dispatch(deleteProductFromInventory(id));
          dispatch(deleteItemFromCart(id))
     }

     const products = useSelector((state: RootState)=>state.inventory.productIDs.map(id=>state.inventory.products[id]))

     return (
         <Paper variant="outlined" className={classes.paper} >
              <Typography color="textSecondary" variant='h4'>
                   Inventory
              </Typography>
              {products.map((product, index)=>(
                  <Card className={classes.card} key={ index}>
                       <CardContent className={classes.cardContent}>
                            <div className={classes.row}>
                                 <Typography variant="h6" >
                                      {product.title}
                                 </Typography>
                                 <Typography variant="h6">
                                      {product.price + '$'}
                                 </Typography>
                            </div>
                       </CardContent>
                       <CardActions>
                            <IconButton aria-label="delete" onClick={()=>deleteHandler(product.id)}>
                                 <Delete />
                            </IconButton>
                       </CardActions>
                  </Card>))}

              {manipulatingItemId === -1 ? (<Button
                  variant="contained"
                  color="primary"
                  className={classes.addButton}
                  onClick={()=>{setManipulatingItemId(0)}}
              >
                   Add New Item
              </Button>):<ItemAddEdit id={manipulatingItemId}/>}



         </Paper>
     )
}

export default Inventory
