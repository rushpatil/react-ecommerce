import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux'
import { useParams, useHistory  } from "react-router-dom";
import { viewProduct, modifyProduct, getAllCategories } from "../../api/productAPIs";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import CreatableSelect from "react-select/creatable";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Button } from "@material-ui/core";
// import { components } from "react-select";
// import { NavLink } from "react-router-dom";

export const EditProduct = () => {
  const  idObj  = useParams();
  let id = idObj.id;
  console.log("id is "+idObj.id);
  const history = useHistory();
  const [name, setName] = useState('');
  const [category, setCategory] = useState({});
  const [manufacturer, setManufacturer] = useState('');
  const [availableItems, setAvailableItems] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setimageUrl] = useState('');
  const [description, setdescription] = useState('');
  const [error, setError] = useState([]);
  const [categories, setCategories] = useState([]);
  const [ID, setId] = useState('');
  const [open, setOpen] = useState(false);

  const AuthToken = useSelector(state => state.user?.token);
  
  useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await viewProduct(id, AuthToken);
      console.log({response});
      
      setName(response.value.name);
      console.log(response);
      setId(response.value.id);
      console.log({ID});
      // setCategory(response.value.category);
      // console.log(response.value.category);
      setManufacturer(response.value.manufacturer);
      setAvailableItems(response.value.availableItems);
      setPrice(response.value.price);
      setimageUrl(response.value.imageUrl);
      setdescription(response.value.description);
      setCategory({
        label: response.value.category,
        value: response.value.category,
      });
    } catch (error) {
      console.error(error);
    }
  };

    const getCategories = async () => {
      try {
        const response = await getAllCategories();
        console.log(response);
        setCategories(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    getCategories();
  }, []);

  const clearForm = () => {
    setName("");
    setCategory({ label: "", value: "" });
    setManufacturer("");
    setAvailableItems("");
    setPrice("");
    setimageUrl("");
    setdescription("");
  };

  const handleSubmit = async () => {
    try {
      const productData = {
        id: ID,
        name,
        category: category.value,
        manufacturer,
        availableItems,
        price,
        imageUrl,
        description,
      };

      const response = await modifyProduct(productData, AuthToken);
      if (response) {
        setError([]);
        setOpen(true);
        // history.push('/home');
      }
    } catch (error) {
      clearForm();
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    history.push('/home');
  }

    return (
      <div className="form-container">
      <div className="form-header">
        <Typography variant="h5">Modify Product</Typography>
      </div>

      <form>
        <TextField
          required
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          variant="outlined"
          margin="normal"
        />
        <div style={{ marginBottom: "30px" }}>
              <CreatableSelect
                className="basic-single"
                classNamePrefix="select"
                name="category"
                isClearable
                required
                options={categories.map((item) => ({
                  label: item,
                  value: item,
                }))}
                value={category}
                onChange={(data) => setCategory(data)}
              />
            </div>
        <TextField
          required
          label="Manufacturer"
          value={manufacturer}
          onChange={(e) => setManufacturer(e.target.value)}
          fullWidth
          variant="outlined"
          margin="normal"
        />

        <TextField
          required
          label="Available Items"
          value={availableItems}
          onChange={(e) => setAvailableItems(e.target.value)}
          fullWidth
          variant="outlined"
          margin="normal"
        />

        <TextField
          required
          label="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          fullWidth
          variant="outlined"
          margin="normal"
        />

        <TextField
          label="Image URL"
          value={imageUrl}
          onChange={(e) => setimageUrl(e.target.value)}
          fullWidth
          variant="outlined"
          margin="normal"
        />
        <TextField
          label="Product Description"
          value={description}
          onChange={(e) => setdescription(e.target.value)}
          fullWidth
          variant="outlined"
          margin="normal"
        />

        {error.map((err) => (
          <Typography color="error" className="error-text">
            {err}
          </Typography>
        ))}

        <Button
          variant="contained"
          color="primary"
          onClick={(e) => handleSubmit(e)}
          className="submit-button"
          fullWidth
        >
          Save Product
        </Button>
        
      </form>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
  <Alert
    onClose={handleClose}
    severity="success"
    variant="filled"
    sx={{ width: '90%' }}
    
  >
   Product {name} modified successfully!
  </Alert>
</Snackbar>
    </div>
    )
}