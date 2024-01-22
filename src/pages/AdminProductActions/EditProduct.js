import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux'
import { useParams } from "react-router-dom";
import { viewProduct, modifyProduct, getAllCategories } from "../../api/productAPIs";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import CreatableSelect from "react-select/creatable";
import { Button } from "@material-ui/core";

export const EditProduct = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState({});
  const [manufacturer, setManufacturer] = useState('');
  const [availableItems, setAvailableItems] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setimageUrl] = useState('');
  const [description, setdescription] = useState('');
  const [error, setError] = useState([]);
  const [categories, setCategories] = useState([]);
  const [id, setId] = useState('');
  // const history = useHistory();

  const AuthToken = useSelector(state => state.user?.token);
  
  const { productId } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await viewProduct(id, AuthToken);
        console.log(response.value[0].id);
        
        setName(response.value[0].name);
        console.log(response);
        setId(response.value[0].id);
        setCategory(response.value[0].category);
        setManufacturer(response.value[0].manufacturer);
        setAvailableItems(response.value[0].availableItems);
        setPrice(response.value[0].price);
        setimageUrl(response.value[0].imageUrl);
        setdescription(response.value[0].description);
        setCategory({
          label: response.value[0].category,
          value: response.value[0].category,
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
  }, [id, AuthToken]);

  const clearForm = () => {
    setName("");
    setCategory({ label: "", value: "" });
    setManufacturer("");
    setAvailableItems("");
    setPrice("");
    setimageUrl("");
    setdescription("");
  };

  const handleSubmit = async (e) => {
    console.log(e);
    try {
      const productData = {
        name,
        category: category.value,
        manufacturer,
        availableItems,
        price,
        imageUrl,
        description,
      };

      console.log(productData);

      // const hasError = validateFields();
      // if (hasError) {
      //   return;
      // }

      const response = await modifyProduct(productId, productData, AuthToken);
      console.log(response);

      if (response) {
        setError([]);
        clearForm();
        // Handle success or navigation after modification
      }
    } catch (error) {
      console.error(error);
      clearForm();
    }
  };

    // const Options = (setCategories) => {
    //     useEffect(() => {
    //         const getCategories = async () => {
    //             try {
    //                 const response = await getAllCategories();
    //                 console.log(response);
    //                 setCategories(response.data);
    //             } catch (error) {
    //                 // console.log(error);
    //             }
    //         };
    //         getCategories();
    //     }, [categories]);
    //     return null;
    // };
    //modal shpould open with pre filled data

    // const fillForm = async (id) => {
    //     const response = await viewProduct(id, AuthToken);
    //     console.log(response);
    //     setId(response.data.id);
    //     setName(response.data.name);
    //     setCategory(response.data.category);
    //     setManufacturer(response.data.manufacturer);
    //     setAvailableItems(response.data.availableItems);
    //     setPrice(response.data.price);
    //     setimageUrl(response.data.imageUrl);
    //     setdescription(response.data.description);
    // }

    // const handleSubmit = async (requestJson, AuthToken) => {
    //     console.log(requestJson);
    //     const response = await modifyProduct(requestJson, AuthToken);
    //     console.log(response);
    //     setSuccess(true);
    // }

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
          {/* <Options setCategories={setCategories} /> */}
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
              category &&
                !categories.includes(category.value) && {
                  label: category.label,
                  value: category.value,
                },
            ].filter(Boolean)}
            value={category?.value}
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
    </div>

    )
}