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
import { CardActionArea, CardActions, InputLabel } from "@material-ui/core/";
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
    const [orderQuantity, setOrderQuantity] = useState('');

    useEffect(() => {
        return () => {
            componentMounted = false;
        };
    }, [location.state?.productData]);

    const handleQuantityChange = (event) =>{
        setOrderQuantity(event.target.value);
    }

    const productData = JSON.parse(location.state?.productData);
    let productDetailsData = productData.value || {
        id: null,
        name: null,
        category: null,
        manufacturer: null,
        availableItems: null,
        imageUrl: null,
        description: null,
    };

    let loadProductOrderPage = () => {
        const jsonData = JSON.stringify({
            product: productDetailsData,
            quantity: orderQuantity,
        });
        console.log(jsonData);
        history.push('/placeOrder', { orderData: jsonData });
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={1}>
                <Grid container item spacing={3}>
                    <Grid item xs={12}>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <ProductCategory />
                        </div>
                    </Grid>
                    <Grid item xs={12} sx={{ display: { xs: 'none', md: 'none', lg: "flex" } }}>
                        <div style={{ display: 'flex', justifyContent: 'center', padding: "5% 20% 0% 20%" }}>
                            <Grid container>
                                <Grid item xs={4}>
                                    <img
                                        style={{
                                            maxWidth: "300px",
                                            width: "100%",
                                            height: "400px",
                                        }}
                                        src={productDetailsData.imageUrl}
                                        alt={"Image of " + productDetailsData.name}
                                    />
                                </Grid>
                                <Grid item xs={1} />
                                <Grid item xs={7}>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <div style={{ display: 'flex', justifyContent: 'left' }}>
                                                <Typography variant={"h4"}>
                                                    {productDetailsData.name}
                                                </Typography>
                                                <div style={{ paddingLeft: "2%" }}>
                                                    <Typography
                                                        variant={"body1"}
                                                        style={{
                                                            color: "#FFFFFF",
                                                            backgroundColor: theme.palette.primary.main,
                                                            padding: "2px 10px 2px 10px",
                                                            marginTop: "5px",
                                                            borderRadius: 20,
                                                        }}
                                                    >
                                                        {"Available Quantity : " + productDetailsData.availableItems}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <div style={{ display: 'flex', justifyContent: 'left' }}>
                                                <Typography
                                                    variant={"body1"}
                                                    style={{
                                                        paddingTop: "2%",
                                                    }}
                                                >
                                                    Category: <b>{productDetailsData.category.toUpperCase()}</b>
                                                </Typography>
                                            </div>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <div style={{ display: 'flex', justifyContent: 'left' }}>
                                                <Typography
                                                    variant={"body1"}
                                                    style={{
                                                        paddingTop: "5%",
                                                    }}
                                                >
                                                    {productDetailsData.description}
                                                </Typography>
                                            </div>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <div style={{ display: 'flex', justifyContent: 'left' }}>
                                                <Typography
                                                    variant={"h5"}
                                                    style={{
                                                        color: theme.palette.secondary.main,
                                                        paddingTop: "5%",
                                                    }}
                                                >
                                                    &#8377; {productDetailsData.price}
                                                </Typography>
                                            </div>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <div style={{ display: 'flex', justifyContent: 'left', paddingTop: "4%", width: "50%" }}>
                                                <TextField
                                                    id="count"
                                                    label="Enter Quantity *"
                                                    variant="outlined"
                                                    fullWidth
                                                    onChange={handleQuantityChange}
                                                />
                                            </div>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <div style={{ display: 'flex', justifyContent: 'left', paddingTop: "4%" }}>
                                                <Button variant="contained"
                                                    color="primary"
                                                    onClick={() => loadProductOrderPage()}
                                                >
                                                    PLACE ORDER
                                                </Button>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );

};

export default ProductDetailsPage;