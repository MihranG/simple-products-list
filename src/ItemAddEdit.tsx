import React, {SyntheticEvent} from 'react';
import {Card, TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {Field, FormErrors, InjectedFormProps, reduxForm} from 'redux-form';
import {useDispatch} from "react-redux";

const useStyles = makeStyles((theme)=>({
    root: {
        minWidth: 275,
        display: "flex",
        margin: '5px 0',
        justifyContent: "space-around"
    },
}))

interface IFormData {
    title: string
    price: number
    description: string
    imageUrl: string
}

interface IOwnProps {
    id : number
}


const ItemAddEdit: React.FC<InjectedFormProps<IFormData, IOwnProps> & IOwnProps > = (props)=>{
    const classes = useStyles();
    const dispatch = useDispatch();
    const handleSubmit = (e:SyntheticEvent)=>{
        e.preventDefault()
        console.log('handle');
        // dispatch(addProductToInventory(product))
    }


    const renderInputField = (field: any)=>{
        const { meta: { touched, error } } = field;

        const isContentInput = field.label === 'Content';
        return(
            <div className="input-wrapper">
                <label htmlFor="Title">{ field.label }</label>

                {isContentInput ?
                    <textarea
                        type={ 'text'}
                        {...field.input} />
                    :<input
                        className="input-field"
                        type={ 'text'}
                        {...field.input}
                    />}
                <div className="error-message">
                    {touched ? error : ''}
                </div>
            </div>
        )
    }
    return(
        <Card  className={classes.root}>
            <form onSubmit={handleSubmit}>
                <Field
                    label="Title"
                    name="title"
                    component = {renderInputField}
                />
                <Field
                    label="Description"
                    name="description"
                    component={renderInputField }
                />
                <Field
                    label="Price"
                    name="price"
                    component={renderInputField }
                />
                <div className="button-wrapper">
                    <button type="submit"
                            className="submit-button"
                            // disabled={isThereValidationErrors}
                    >
                        Add
                    </button>
                </div>
            </form>
        </Card>
    )
}

const validate = (formValues: IFormData):FormErrors<IFormData, string> =>{
    const errors: FormErrors<IFormData, string> = {};
    const {title, description, price} = formValues;
    if(!title){
        errors.title =  "You should provide a Title"
    }
    if(!description){
        errors.description =  "You should provide Description"
    }
    if(!price){
        errors.price = "You should provide price"
    }

    return errors;
}

export const ItemAddEditWithReduxForm = reduxForm<IFormData,IOwnProps>({
    validate,
    form: 'inventory_add'
})(ItemAddEdit)

export default ItemAddEditWithReduxForm
