import React, { useState, useEffect } from 'react';
import { createProduct, getAllCategories } from '../../api/productAPIs';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CreatableSelect from "react-select/creatable";
import { Button } from '@material-ui/core';



const Options = (setCategories) => {

    useEffect(() => {
        const getCategories = async () => {
            try {
                const response = await getAllCategories();
                console.log(response);
                setCategories(response.data);
            } catch (error) {
                // console.log(error);
            }
        };
        getCategories();
    }, []);
    return null;
}


export const AddProducts = () => {

    const [name, setName] = useState('');
    const [category, setCategory] = useState();
    const [manufacturer, setManufacturer] = useState('');
    const [availableItems, setAvailableItems] = useState('');
    const [price, setPrice] = useState('');
    const [imageUrl, setimageUrl] = useState('');
    const [description, setdescription] = useState('');
    const [error, setError] = useState([]);
    const [categories, setCategories] = useState([]);

    const saveProduct = async () => {
        const Authtoken = localStorage.getItem('authToken');
        try {
            const productData = {
                name,
                category,
                manufacturer,
                availableItems,
                price,
                imageUrl,
                description,
            };
            console.log(productData);
            const hasError = validateFields();
            if (hasError) {
                return;
            }

            const response = await createProduct(productData, Authtoken);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }


    const validateFields = () => {
        let errorList = [];
        if (!name || !category || !manufacturer || !availableItems || !price || !imageUrl || !description) {
            errorList.push("All fields are required");
        }

        if (availableItems && availableItems < 0) {
            errorList.push("Available Items should be greater than 0");
        }

        if (price && price < 0) {
            errorList.push("Price should be greater than 0");
        }

        const hasError = (errorList.length > 0);
        if (hasError) {
            setError(errorList);
        }
        return hasError;
    }
    return(
<div className="form-container">
        <div className="form-header">
        <Typography variant="h5">
            Add Product
        </Typography>
    </div>

    <form>
        <TextField
            required
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            variant= "outlined"
            margin="normal"
        />
    <div style={{ marginBottom: "30px" }}>
    <Options setCategories = {setCategories}/>
    <CreatableSelect
    label="Category"
  className="basic-single"
  classNamePrefix="select"
  name="category"
  isClearable
  required
  options={[
    ...categories.map((item) => ({
      label: item,
      value: item,
    })),
    category && !categories.includes(category.value) && { label: category.label, value: category.value }
  ].filter(Boolean)}
  value={category?.value}
  onChange={(data) => setCategory(data.value)}
/>
</div>
        <TextField
        required
            label="Manufacturer"
            value={manufacturer}
            onChange={(e) => setManufacturer(e.target.value)}
            fullWidth
            variant= "outlined"
            margin="normal"
        />

        <TextField
            required
            label="Available Items"
            value={availableItems}
            onChange={(e) => setAvailableItems(e.target.value)}
            fullWidth
            variant= "outlined"
            margin="normal"
        />

        <TextField
            required
            label="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            fullWidth
            variant= "outlined"
            margin="normal"
        />

        <TextField
            label="Image URL"
            value={imageUrl}
            onChange={(e) => setimageUrl(e.target.value)}
            fullWidth
            variant= "outlined"
            margin="normal"
        />
        <TextField
            label="Product Description"
            value={description}
            onChange={(e) => setdescription(e.target.value)}
            fullWidth
            variant= "outlined"
            margin="normal"
        />

        {error.map((err) => 
            <Typography color="error" className="error-text">{err}</Typography>
        )}

        <Button variant="contained" color="primary" onClick={saveProduct} className="submit-button" fullWidth>
            Save Product
        </Button>
    </form>
    </div>
    )
}