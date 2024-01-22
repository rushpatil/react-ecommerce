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
import { getAllProducts, deleteProduct } from "../../api/productAPIs";
import { useDispatch, useSelector } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


export const ProductCard = ({ buyProduct, ...productDetails }) => {
    console.log(productDetails.id, typeof productDetails.id);
    let truncate = (text) => {
        if(200>text.length){
            return text;
        }
        return text.substring(0, 200)+ "...";
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
        
    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setSuccess(false);
        history.push('/home');
      }

    return (
        <>
        <Grid container spacing={3} mt={4}>
                <Grid item md={10} sm={6} xs={6} >
                    <Card sx={{ maxWidth: 345 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img" 
                                height="140"
                                image={productDetails.imageUrl}
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {productDetails.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {productDetails.description}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button variant="contained" size="small" color="primary" onClick = {() => buyProduct(productDetails)}>
                                BUY
                            </Button>
                            <IconButton aria-label="delete" size="small" color="primary" component={Link} to={`/editproduct/${productDetails.id}`} >
                                <EditIcon />
                            </IconButton>
                            <IconButton size="small" color="primary" onClick={handleOpen} >
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
                    <Button onClick={() => handleSubmit(productDetails.id)} color="primary" variant="contained">
                        OK
                   </Button>
                    <Button onClick={handleClose} color="primary">
                         CANCEL
                     </Button>
                 </DialogActions>
            </Dialog>
                    </Card>
                </Grid>
            </Grid>
            <Snackbar open={success} autoHideDuration={2000} onClose={handleCloseAlert} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
  <Alert
    onClose={handleCloseAlert}
    severity="success"
    variant="filled"
    sx={{ width: '90%' }}
    
  >
   Product {productDetails.name} modified successfully!
  </Alert>
</Snackbar>
        </>
    )

};