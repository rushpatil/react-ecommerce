import { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Grid from "@material-ui/core/Grid";
import EditIcon from "@material-ui/icons/Edit";
import { useHistory } from "react-router-dom";
import * as React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { CardActionArea, CardActions } from "@material-ui/core/";
import { getAllProducts } from "../../api/productAPIs";
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import ProductCategory from "../ProductCategory/ProductCategory";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import { useTheme } from "@material-ui/core/styles";

const ProductDetailsPage = () => {

    const [error, setError] = useState([]);
    const history = useHistory();
    const [apiData, setApiData] = useState([]);
    const dispatch = useDispatch();
    const location = useLocation();
    const theme = useTheme();
    let componentMounted = true;

    useEffect(() => {
        console.log('Product Data:', JSON.parse(location.state?.productData));
        // The above line will log the productData to the console when the component mounts
        return () => {
            componentMounted = false;
        };
    }, [location.state?.productData]);

    const productData = JSON.parse(location.state?.productData);

    let json = productData.value || {
        id: null,
        name: null,
        category: null,
        manufacturer: null,
        availableItems: null,
        imageUrl: null,
        description: null,
    };


    return (

        <div>
            <h2>Product Details</h2>
            {productData && (
                <div>
                    <p>ID: {json.id}</p>
                    <p>Name: {json.name}</p>
                    <p>Category: {json.category}</p>
                    {/* Add other details */}
                </div>
            )}
        </div>
    );

};

export default ProductDetailsPage;