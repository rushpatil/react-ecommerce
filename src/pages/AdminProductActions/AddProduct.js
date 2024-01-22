import React, { useState, useEffect } from "react";
import { connect, useSelector } from 'react-redux'
import { createProduct, getAllCategories } from "../../api/productAPIs";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import CreatableSelect from "react-select/creatable";
import { Button } from "@material-ui/core";

export const AddProducts = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState();
  const [manufacturer, setManufacturer] = useState("");
  const [availableItems, setAvailableItems] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setimageUrl] = useState("");
  const [description, setdescription] = useState("");
  const [error, setError] = useState([]);
  const [categories, setCategories] = useState([]);

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

  const clearForm = () => {
    setName("");
    setCategory({label: "", value: ""});
    setManufacturer("");
    setAvailableItems("");
    setPrice("");
    setimageUrl("");
    setdescription("");
    };

  const Authtoken = useSelector(state => state.user?.token);
  console.log(Authtoken);
  const saveProduct = async () => {
    // console.log(Authtoken);
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
      const hasError = validateFields();
      if (hasError) {
        return;
      }

      const response = await createProduct(productData, Authtoken);
      console.log(response);
      if (response) {
            setError([]);
            clearForm();
        }
    } catch (error) {
      console.log(error);
      clearForm();
    }
  };

  const validateFields = () => {
    let errorList = [];
    if (
      !name ||
      !category ||
      !manufacturer ||
      !availableItems ||
      !price ||
      !imageUrl ||
      !description
    ) {
      errorList.push("All fields are required");
    }

    if (availableItems && availableItems < 0) {
      errorList.push("Available Items should be greater than 0");
    }

    if (price && price < 0) {
      errorList.push("Price should be greater than 0");
    }

    const hasError = errorList.length > 0;
    if (hasError) {
      setError(errorList);
    }
    return hasError;
  };
  return (
    <div className="form-container">
      <div className="form-header">
        <Typography variant="h5">Add Product</Typography>
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
          onClick={saveProduct}
          className="submit-button"
          fullWidth
        >
          Save Product
        </Button>
        
      </form>
    </div>
  );
};
