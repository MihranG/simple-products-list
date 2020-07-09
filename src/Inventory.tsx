import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from './store/store';
import {Button, Paper, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import ItemAddEdit from './ItemAddEdit';
import InventoryItem from './InventoryItem';

const useStyles = makeStyles((theme) => ({
     paper:{
          height: 'auto',
          width: 350,
          maxHeight: '600',
          overflowX: 'scroll',
     },
     addButton : {
          margin: 5,
     },
}))

const Inventory: React.FC = () => {
     const [isAddingItem, setIsAddingItem] = useState<boolean>(false);
     const [editingItemId, setEditingItemId] = useState<number>(-1);
     const classes = useStyles();
     const products = useSelector((state: RootState) => state.inventory.productIDs.map(id => state.inventory.products[id]))

     return (
         <Paper variant="outlined" className={classes.paper} >
              <Typography color="textSecondary" variant="h4">
                   Inventory
              </Typography>
              {products.map((product, index) => (
                  product.id === editingItemId ?
                      <ItemAddEdit key={index} id={ product.id} cancelHandler={() => setEditingItemId(-1)} />
                  :<InventoryItem key={index} product={product} onEditHandler={setEditingItemId}/>),
              )}
              {!isAddingItem ? (
                  <Button
                       variant="contained"
                       color="primary"
                       className={classes.addButton}
                       onClick={() => {setIsAddingItem(true)}}
                  >
                        Add New Item
                   </Button>
              ) : <ItemAddEdit id={null} cancelHandler={() => setIsAddingItem(false)}/>}
         </Paper>
     )
}

export default Inventory
