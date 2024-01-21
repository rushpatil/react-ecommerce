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
                            <IconButton aria-label="delete" size="small" >
                                <EditIcon />
                            </IconButton>
                        </div>
                    </Grid>
                    <Grid item xs={2}>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <IconButton size="small" >
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

    return (
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
						<div style={{display: 'flex', justifyContent: 'left'}}>
							<Typography variant="h6" component="div" className="wrap_text" title={productDetails.name}>
								{productDetails.name}
							</Typography>
						</div>
					</Grid>
					<Grid item xs={4}>
						<div style={{display: 'flex', justifyContent: 'right'}}>
							<Typography variant="h6" component="div" className="wrap_text" title={'\u20B9 ' + productDetails.price}>
								{'\u20B9 ' + productDetails.price}
							</Typography>
						</div>
					</Grid>
				</Grid>
				<Typography variant="body2" color="text.secondary" sx={{height: 80}}>
					{truncate(productDetails.description)}
				</Typography>
			</CardContent>
            </CardActionArea>
            <CardActions>
                <Grid container>
                    <Grid item xs={8}>
                        <div style={{ display: 'flex', justifyContent: 'left' }}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => buyProduct(productDetails)}
                            >
                                BUY
                            </Button>
                        </div>
                    </Grid>
                    {checkUserMode()}
                </Grid>
            </CardActions>
        </Card>
    )
};