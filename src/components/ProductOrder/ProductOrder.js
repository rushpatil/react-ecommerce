import { useEffect, useState } from "react";
import { useLocation, useHistory } from 'react-router-dom';
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { Step, Stepper, StepLabel } from '@mui/material';
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Card } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import { useTheme } from "@material-ui/core/styles";
import SelectAddress from "../SelectAddress/SelectAddress";

const ProductOrder = () => {
    const theme = useTheme();
    const location = useLocation();
    const [activeStep, setActiveStep] = useState(0);
    const history = useHistory();
    let componentMounted = true;
    let productData = JSON.parse(location.state?.orderData);
    let selectedProduct = productData.product || {
        id: null,
        name: null,
        category: null,
        manufacturer: null,
        availableItems: null,
        imageUrl: null,
        description: null,
        price: null
    };
    useEffect(() => {
        console.log('productData:', productData);
        console.log('selectedProduct:', selectedProduct);
        // Your other code
    }, [productData, selectedProduct]);

    let productQuantity = productData.quantity;

    let stepperArray = [
        {
            labelOrder: 1,
            label: "Items",
            completed: false,
        },
        {
            labelOrder: 2,
            label: "Select Address",
            completed: false,
        },
        {
            labelOrder: 3,
            label: "Confirm Order",
            completed: false,
        },
    ];

    const [stepsForOrdering, setStepsForOrdering] = useState(stepperArray);

    const [orderDetail, setOrderDetail] = useState({
        quantity: productQuantity,
        product: selectedProduct.id,
        address: null,
        addressObject: null
    });
    let currentSelectedAddress = orderDetail.addressObject || {
        id: null,
        name: null,
        contactNumber: null,
        city: null,
        landmark: null,
        street: null,
        state: null,
        zipcode: null,
        userId: null
    };

    let saveSelectedAddress = (obj) => {
        console.log(obj);
        setOrderDetail({
            ...orderDetail,
            address: (obj !== null) ? obj.id : null,
            addressObject: obj,
        });
    };

    let moveToLastStep = () => {
        if (activeStep === 0) {
            const jsonData = JSON.stringify({
                value: productData.product,
            });
            history.push('/productDetailsPage', {productData: jsonData});
        }
        else {
            let arr = [];
            for (let i = 0; i < stepsForOrdering.length; i++) {
                if (i === activeStep - 1) {
                    arr.push({
                        ...stepsForOrdering[activeStep - 1],
                        completed: false,
                    });
                } else {
                    arr.push(stepsForOrdering[i]);
                }
            }
            setStepsForOrdering(arr);
            setActiveStep(activeStep - 1);
        }
    };
    let moveToNextStep = () => {
        let arr = [];
        for (let i = 0; i < stepsForOrdering.length; i++) {
            if (i === activeStep) {
                arr.push({
                    ...stepsForOrdering[activeStep],
                    completed: true,
                });
            } else {
                arr.push(stepsForOrdering[i]);
            }
        }
        setStepsForOrdering(arr);
        setActiveStep(activeStep + 1);
    };
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Stepper
                            activeStep={activeStep}
                            sx={{ width: "80%" }}
                        >
                            {
                                stepsForOrdering !== null && stepsForOrdering.length > 0 &&
                                stepsForOrdering.map((element, index) => {
                                    return (
                                        <Step
                                            key={"step_" + index}
                                            active={index === activeStep}
                                            index={index}
                                            last={(index === 2)}
                                            completed={element.completed}
                                        >
                                            <StepLabel>
                                                {element.label}
                                            </StepLabel>
                                        </Step>
                                    );
                                })
                            }
                        </Stepper>
                    </div>
                </Grid>
                {
                    activeStep === 0 &&
                    <Grid item xs={12}>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <Card style={{ width: "80%" }}>
                                <CardContent>
                                    <Grid container style={{ paddingTop: "5%", paddingBottom: "5%" }}>
                                        <Grid item xs={3} />
                                        <Grid item xs={3}>
                                            <img
                                                style={{
                                                    maxWidth: "200px",
                                                    width: "100%",
                                                    height: "250px",
                                                }}
                                                src={selectedProduct.imageUrl}
                                                alt={"Image of " + selectedProduct.name}
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                <Grid container>
                                                    <Grid item xs={12}>
                                                        <Typography variant={"h4"}>
                                                            {selectedProduct.name}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12} style={{ paddingTop: "2%" }}>
                                                        <Typography
                                                            variant={"body1"}
                                                            style={{
                                                                fontSize: "15px",
                                                            }}
                                                        >
                                                            Quantity: <b>{productQuantity}</b>
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12} style={{ paddingTop: "2%" }}>
                                                        <Typography
                                                            variant={"body1"}
                                                            style={{
                                                                fontSize: "15px",
                                                            }}
                                                        >
                                                            Category: <b>{selectedProduct.category}</b>
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12} style={{ paddingTop: "2%" }}>
                                                        <Typography
                                                            variant={"body1"}
                                                            style={{
                                                                fontSize: "15px",
                                                            }}
                                                        >
                                                            Description: <em>{selectedProduct.description}</em>
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12} style={{ paddingTop: "2%" }}>
                                                        <Typography
                                                            variant={"body1"}
                                                            style={{
                                                                fontSize: "25px",
                                                            }}
                                                        >
                                                            Total Price : &#8377; {Number((selectedProduct.price * productQuantity).toFixed(2))}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        </Grid>
                                        <Grid item xs={4} />
                                    </Grid>
                                </CardContent>
                            </Card>
                        </div>
                    </Grid>
                }
                {
                    activeStep === 1 &&
                    <Grid item xs={12}>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <SelectAddress
                                onAddressCallback={saveSelectedAddress}
                                address={orderDetail.addressObject}
                            />
                        </div>
                    </Grid>
                }
                {
                    activeStep === 2 &&
                    <Grid item xs={12}>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <Card style={{ width: "80%" }}>
                                <CardContent>
                                    <Grid container style={{ paddingTop: "5%", paddingBottom: "5%" }}>
                                        <Grid item xs={7} style={{ paddingRight: "1%" }}>
                                            <div style={{ display: 'flex', justifyContent: 'left' }}>
                                                <Grid container>
                                                    <Grid item xs={12}>
                                                        <Typography variant={"h4"}>
                                                            {selectedProduct.name}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12} style={{ paddingTop: "2%" }}>
                                                        <Typography
                                                            variant={"body1"}
                                                            style={{
                                                                fontSize: "15px",
                                                            }}
                                                        >
                                                            Quantity: <b>{productQuantity}</b>
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12} style={{ paddingTop: "2%" }}>
                                                        <Typography
                                                            variant={"body1"}
                                                            style={{
                                                                fontSize: "15px",
                                                            }}
                                                        >
                                                            category: <b>{selectedProduct.category}</b>
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12} style={{ paddingTop: "2%" }}>
                                                        <Typography
                                                            variant={"body1"}
                                                            style={{
                                                                fontSize: "15px",
                                                                color: theme.palette.disabled,
                                                            }}
                                                        >
                                                            <em>{selectedProduct.description}</em>
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12} style={{ paddingTop: "2%" }}>
                                                        <Typography
                                                            variant={"body1"}
                                                            style={{
                                                                fontSize: "25px",
                                                                color: theme.palette.secondary,
                                                            }}
                                                        >
                                                            Total Price : &#8377; {selectedProduct.price * productQuantity}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        </Grid>
                                        <Grid item xs={5}>
                                            <div style={{ display: 'flex', justifyContent: 'left' }}>
                                                <Grid container>
                                                    <Grid item xs={12}>
                                                        <Typography variant={"h4"}>
                                                            Address Details :
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12} style={{ paddingTop: "2%" }}>
                                                        <Typography
                                                            variant={"body1"}
                                                            style={{
                                                                fontSize: "15px",
                                                            }}
                                                        >
                                                            {currentSelectedAddress.name}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Typography
                                                            variant={"body1"}
                                                            style={{
                                                                fontSize: "15px",
                                                            }}
                                                        >
                                                            Contact Number: {currentSelectedAddress.contactNumber}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Typography
                                                            variant={"body1"}
                                                            style={{
                                                                fontSize: "15px",
                                                            }}
                                                        >
                                                            {
                                                                ((address) => {
                                                                    if (address.landmark !== null) {
                                                                        return (
                                                                            <>
                                                                                {address.street}, {address.landmark}, {address.city}
                                                                            </>
                                                                        );
                                                                    } else {
                                                                        return (
                                                                            <>
                                                                                {address.street}, {address.city}
                                                                            </>
                                                                        );
                                                                    }
                                                                })(currentSelectedAddress)
                                                            }
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Typography
                                                            variant={"body1"}
                                                            style={{
                                                                fontSize: "15px",
                                                            }}
                                                        >
                                                            {currentSelectedAddress.state}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Typography
                                                            variant={"body1"}
                                                            style={{
                                                                fontSize: "15px",
                                                            }}
                                                        >
                                                            {currentSelectedAddress.zipcode}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </div>
                    </Grid>
                }
                <Grid item xs={12}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button variant="text"
                            color="disabled"
                            onClick={() => moveToLastStep()}
                        >
                            BACK
                        </Button>
                        {
                            (activeStep === 0 || activeStep === 1) &&
                            <Button variant="contained"
                                color="primary"
                                onClick={() => moveToNextStep()}
                                sx={{}}
                            >
                                NEXT
                            </Button>
                        }
                        {
                            activeStep === 2 &&
                            <Button variant="contained"
                                color="primary"
                            >
                                PLACE ORDER
                            </Button>
                        }
                    </div>
                </Grid>
            </Grid>
        </Box>
    );

};

export default ProductOrder;