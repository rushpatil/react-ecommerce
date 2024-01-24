import { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Grid from "@material-ui/core/Grid";
import EditIcon from "@material-ui/icons/Edit";
import { useHistory, Link } from "react-router-dom";
import * as React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { CardActionArea, CardActions, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core/";
import { getAllProducts, deleteProduct } from "../../api/productAPIs";
import { useDispatch, useSelector } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


export const ProductCard = ({ mode, buyProduct, ...productDetails }) => {
    let truncate = (text) => {
        if (100 > text.length) {
            return text;
        }
        return text.substring(0, 100) + "...";
    };

    let checkUserMode = () => {
        if (mode === "ADMIN") {
            return (
                <>
                    <Grid item xs={2}>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <IconButton aria-label="delete" size="small" color="primary" component={Link} to={`/editproduct/${productDetails.id}`} >
                                <EditIcon />
                            </IconButton>
                        </div>
                    </Grid>
                    <Grid item xs={2}>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <IconButton size="small" color="primary" onClick={handleOpen} >
                                <DeleteIcon />
                            </IconButton>
                        </div>
                    </Grid>
                </>
            );
        } else {
            return <></>;
        }
    };
    const history = useHistory();
    const [success, setSuccess] = useState(false);
    const [apiData, setApiData] = useState([]);

    let componentMounted = true;
    const [open, setOpen] = useState(false);
    const AuthToken = useSelector(state => state.user?.token);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleSubmit = async (id) => {
        setSuccess(true);
        const response = await deleteProduct(id, AuthToken);
        setApiData(apiData.filter(product => product.id != id))
        setOpen(false);
        setSuccess(true);
    };

    useEffect(() => {
        const handleProducts = async () => {
            const response = await getAllProducts(AuthToken);
            if (componentMounted) {
                setApiData(response.data);
            }
            return () => {
                componentMounted = false;
            };
        };
        handleProducts();
    }, []);

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSuccess(false);
        history.push('/home');
    }


    return (
        <>
            <Card style={{ height: "400px", width: "400px" }} sx={{ maxWidth: 345 }}>
                <CardActionArea>
                    <CardMedia sx={{ height: "200px", display: "flex", justifyContent: "center" }}>
                        <img
                            src={productDetails.imageUrl}
                            alt={"Image of " + productDetails.name}
                            style={{
                                maxWidth: "1000px",
                                width: "100%",
                                height: "200px",
                            }}
                        />
                    </CardMedia>
                    <CardContent>
                        <Grid container>
                            <Grid item xs={8}>
                                <div style={{ display: 'flex', justifyContent: 'left' }}>
                                    <Typography variant="h6" component="div" className="wrap_text" title={productDetails.name}>
                                        {productDetails.name}
                                    </Typography>
                                </div>
                            </Grid>
                            <Grid item xs={4}>
                                <div style={{ display: 'flex', justifyContent: 'right' }}>
                                    <Typography variant="h6" component="div" className="wrap_text" title={'\u20B9 ' + productDetails.price}>
                                        {'\u20B9 ' + productDetails.price}
                                    </Typography>
                                </div>
                            </Grid>
                        </Grid>
                        <Typography variant="body2" color="text.secondary" sx={{ height: 80 }}>
                            {truncate(productDetails.description)}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Grid container>
                        <Grid item xs={8} style={{ display: "flex", flexDirection: "row" }}>
                            <div style={{ display: 'flex', justifyContent: 'left' }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => buyProduct(productDetails)}
                                >
                                    BUY
                                </Button>

                            </div>
                            {checkUserMode()}
                            <Dialog open={open} onClose={handleClose}>
                                <DialogTitle>Confirm deletion of product!</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        Are you sure you want to delete the product?
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={() => handleSubmit(productDetails.id)} color="primary" variant="contained">
                                        OK
                                    </Button>
                                    <Button onClick={handleClose} color="primary">
                                        CANCEL
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </Grid>
                    </Grid>
                </CardActions>
            </Card>
            <Snackbar open={success} autoHideDuration={2000} onClose={handleCloseAlert} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert
                    onClose={handleCloseAlert}
                    severity="success"
                    variant="filled"
                    sx={{ width: '90%' }}

                >
                    Product {productDetails.name} deleted successfully!
                </Alert>
            </Snackbar>
        </>
    )

};