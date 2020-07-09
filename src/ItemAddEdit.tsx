import React, {SyntheticEvent, useState} from 'react';
import {Card, TextField, CardContent, CardActions, Button, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import {addProductToInventory,editProductInInventory, RootState} from "./store/store";

const useStyles = makeStyles((theme)=>({
    root: {
        minWidth: 275,
        display: "flex",
        justifyContent: "space-around"
    },
    row: {
        justifyContent: "space-between",
        display: "flex"
    },
    priceField: {
        width: 70
    },
    titleField: {
        width: 220
    },
    buttonsWrapper: {
        justifyContent: 'center'
    }

}))

interface IFormData {
    title: string
    price: number
    description: string
    imageUrl: string
}

const initialFormData : IFormData = {
    title: '',
    price: 0,
    description: '',
    imageUrl: ''
}

interface IOwnProps {
    id : number| null;
    cancelHandler: ()=>void;
}


const ItemAddEdit: React.FC<IOwnProps > = ({id,cancelHandler})=>{
    const classes = useStyles();
    const dispatch = useDispatch();
    const isAdd = id === null;
    const formValues = useSelector<RootState, IFormData >((state)=>{
        if(id === null){
            return initialFormData;
        }
        return state.inventory.products[id];
    });
    const [formData, setFormData] = useState<IFormData>(formValues);

    const handleChange = (value: string, type: string)=>{
        setFormData({
            ...formData,
            [type]: value
        })
    }
    const handleSubmit = (e:SyntheticEvent)=>{
        e.preventDefault();
        if(id === null){
            dispatch(addProductToInventory(formData));
        }else{
            dispatch(editProductInInventory({id,...formData}))
        }
    }

    return(
        <>
            <Typography color="textSecondary" variant='h6'>
                {isAdd ? 'Adding new Item' : `Editing ${formValues.title}`}
            </Typography>
            <Card  className={classes.root}>
                <form onSubmit={handleSubmit}>
                <CardContent>
                    <div className={classes.row}>
                        <TextField
                            required
                            error={false}
                            id="title"
                            label="Title"
                            variant="outlined"
                            size='small'
                            margin="dense"
                            value={formData.title}
                            onChange={e=>handleChange(e.target.value,'title')}
                        />
                        <TextField
                            required
                            error={false}
                            type="number"
                            id="price"
                            label="Price"
                            variant="outlined"
                            size='small'
                            margin="dense"
                            className={classes.priceField}
                            value={formData.price}
                            onChange={e=>handleChange(e.target.value,'price')}
                        />
                    </div>
                    <TextField
                        error={false}
                        id="description"
                        label="Description"
                        variant="outlined"
                        size='small'
                        fullWidth
                        margin="dense"
                        value={formData.description}
                        onChange={e=>handleChange(e.target.value,'description')}

                    />
                    <TextField
                        error={false}
                        id="imageUrl"
                        label="ImageUrl"
                        helperText="url of an image"
                        variant="outlined"
                        margin="dense"
                        value={formData.imageUrl}
                        onChange={e=>handleChange(e.target.value,'imageUrl')}
                    />
                </CardContent>
                <CardActions className={classes.buttonsWrapper}>
                    <Button size="small" variant="contained" type='submit'>
                        {id === null ? 'Add Item' : 'Edit Item'}
                    </Button>
                    <Button onClick={cancelHandler}>
                        Cancel
                    </Button>
                </CardActions>
            </form>
        </Card>
    </>
    )
}
//
// const validate = (formValues: IFormData):FormErrors<IFormData, string> =>{
//     const errors: FormErrors<IFormData, string> = {};
//     const {title, description, price} = formValues;
//     if(!title){
//         errors.title =  "You should provide a Title"
//     }
//     if(!description){
//         errors.description =  "You should provide Description"
//     }
//     if(!price){
//         errors.price = "You should provide price"
//     }
//
//     return errors;
// }



export default ItemAddEdit
