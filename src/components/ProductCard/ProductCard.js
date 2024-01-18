import Button from "@material-ui/core/Button";
import Delete from "@material-ui/icons/Delete";
import Grid from "@material-ui/core/Grid";
import Edit from "@material-ui/icons/Edit";
import { useHistory } from "react-router-dom";
import * as React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { CardActionArea, CardActions } from "@material-ui/core/";
import "./ProductCard.css";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

export const ProductCard = ({ ...productDetails }) => {
    let truncate = (text) => {
        if(200>text.length){
            return text;
        }
        return text.substring(0, 200)+ "...";
    };

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
                            <Button variant="contained" size="small" color="primary">
                                BUY
                            </Button>
                            <IconButton aria-label="delete" size="small" color="primary" >
                                <EditIcon />
                            </IconButton>
                            <IconButton size="small" color="primary" >
                                <DeleteIcon />
                            </IconButton>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </>
    )
};