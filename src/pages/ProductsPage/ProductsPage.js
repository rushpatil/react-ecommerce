import { useEffect, useState} from "react";
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
import { Alert, AlertTitle } from "@mui/material";
import { getAllProducts, deleteProduct } from "../../api/productAPIs";
import { useDispatch, useSelector } from 'react-redux';
// import  {EditProduct}  from "../../pages/AdminProductActions/EditProduct";


export const ProductsPage = () => {
    const [error, setError] = useState([]);
    const history = useHistory();
    const [success, setSuccess] = useState(false);
    const [apiData, setApiData] = useState([]);
    const dispatch = useDispatch();

    let componentMounted = true;
    const [open, setOpen] = useState(false);
    const AuthToken = useSelector(state => state.user?.token);

    // const Authtoken = localStorage.getItem('authToken');

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleEdit = (id) => {
        history.push('/editproduct/' + id);
    };

    const handleSubmit = async (id) => {
        console.log(id);
        setSuccess(true);
        const response = await deleteProduct(id, AuthToken);
        console.log(response);
        setApiData(apiData.filter(product => product.id != id))
        setOpen(false);
    };
    
    useEffect(() => {
        const handleProducts = async () => {
            const response = await getAllProducts(AuthToken); 
            console.log(response);
            if (componentMounted) {
                setApiData(response.data);
                console.log(apiData);
            }
            return () => {
                componentMounted = false;
            };
        };
        handleProducts();
    }, []);


    return (
        <Grid container spacing={2} mt={3}>
            {apiData.map((products, index) => (
                <Grid item md={3} sm={6} xs={6} key={index}>
                    { success ? <>
                        <Alert severity="success" style={{justifyContent: 'center'}}>
                            <AlertTitle>Product {products.name} deleted Successfully</AlertTitle>
                        </Alert>
                    </> : <></>}
                    <Card sx={{ maxWidth: 345 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img" 
                                height="140"
                                image={products.imageUrl}
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {products.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {products.description}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button variant="contained" size="small" color="primary">
                                BUY
                            </Button>
                            <IconButton aria-label="delete" size="small" color="primary" onClick={() => handleEdit(products.id)}>
                                <EditIcon />
                            </IconButton>
                            <IconButton size="small" color="primary" onClick={handleOpen}>
                                <DeleteIcon />
                            </IconButton>
                        </CardActions>
                        <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Confirm deletion of product!</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete the product?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleSubmit(products.id)} color="primary" variant="contained">
                        OK
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        CANCEL
                    </Button>
                </DialogActions>
            </Dialog>
                    </Card>
                </Grid>
            ))}
            </Grid>
    );

};
