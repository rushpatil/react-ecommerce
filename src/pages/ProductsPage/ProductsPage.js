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


export const ProductsPage = () => {

    const [error, setError] = useState([]);
    const history = useHistory();
    const [apiData, setApiData] = useState([]);
    const dispatch = useDispatch();

    let componentMounted = true;

    const Authtoken = localStorage.getItem('authToken');
    useEffect(() => {
        const handleProducts = async () => {
            const response = await getAllProducts(Authtoken); 
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
        <>
        <Grid container spacing={2} mt={3}>
            {apiData.map((products, index) => (
                <Grid item md={3} sm={6} xs={6} key={index}>
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
                            <IconButton aria-label="delete" size="small" color="primary">
                                <EditIcon />
                            </IconButton>
                            <IconButton size="small" color="primary">
                                <DeleteIcon />
                            </IconButton>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
            </Grid>
        </>
    );

};
