import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { useCallback, useState, useEffect } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { createAddress, getAllAddresses } from "../../api/addressApi";
import { connect } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const SelectAddress = ({ user, onAddressCallback, address }) => {
    let initialState = {
		name: null,
		contactNumber: null,
		street: null,
		city: null,
		state: null,
		landmark: null,
		zipcode: null,
	};
    const [addressList, setAddressList] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(address);
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const initAddressList = useCallback(() => {
        getAllAddresses(user.token).then((json) => {
            console.log(json.data);
            setAddressList(json.data);
            setSelectedAddress(json.data[0].id);
        }).catch(() => {
            setAddressList([]);
        })
    }, [user.token]);

    useEffect(() => {
        initAddressList();
    }, [initAddressList]);

    const handleChange = (event) => {
        console.log("Inside on handleChange");
        setSelectedAddress(event.target.value);
        for(let i=0; i < addressList.length; i++){
            if(addressList[i].id === event.target.value){
                onAddressCallback(addressList[i]);
                return;
            }
        }
        onAddressCallback(null);
    };
    let saveChanges = (field, value) => {
		setFormData({
			...formData,
			[field]:value
		});
	};
    let saveAddress = () => {
        let data = {
            ...formData
        }
        let request = {
            user: user.userId,
        };
        for(let k in formData){
            request[k] = data[k];
        }
        setFormData(data);
        console.log("Sending Address request : "+ JSON.stringify(request));
        createAddress(request, user.token).then(() => {
            console.log("Address Saved Successfully");
            setFormData(initialState);
            initAddressList();
        }).catch(json => {
            console.log("Address save Failed :" + json.reason);
        });
    };

    const handleCloseSuccessAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSuccess(false);
    }
    return (

        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={1}>
                <Grid container item spacing={3}>
                    <Grid item xs={12}>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <FormControl sx={{ m: 1, minWidth: 240 }}>
                                <InputLabel id="demo-simple-select-label">Select Address</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={selectedAddress}
                                    label="Select Address"
                                    onChange={handleChange}
                                    style={{minHeight: 10}}
                                >
                                    {
                                        (addressList === undefined || addressList === null || addressList.length === 0) &&
                                        <MenuItem disabled value="">
                                            No address saved
                                        </MenuItem>
                                    }
                                    {
                                        addressList !== undefined && addressList !== null && addressList.length > 0 &&
                                        addressList.map((element, index) => {
                                            return (
                                                <MenuItem
                                                    key={"sortBy_" + index}
                                                    value={element.id}
                                                >
                                                    {element.name + ", Contact Number : " + element.contactNumber}
                                                    <br />
                                                    {
                                                        ((element) => {
                                                            if (element.landmark !== null) {
                                                                return (
                                                                    <>
                                                                        {element.street + ", " + element.landmark}
                                                                    </>
                                                                );
                                                            } else {
                                                                return (
                                                                    <>
                                                                        {element.street}
                                                                    </>
                                                                );
                                                            }
                                                        })(element)
                                                    }
                                                    <br />
                                                    {element.city + ", " + element.state + ", " + element.zipcode}
                                                </MenuItem>
                                            );
                                        })
                                    }
                                </Select>
                            </FormControl>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <Typography
                                variant="subtitle1"
                                noWrap
                                sx={{
                                    fontSize: "15px",
                                    color: 'inherit',
                                }}
                            >
                                OR
                            </Typography>
                        </div>
                    </Grid>
                </Grid>
                <Grid container item spacing={3}>
					<Grid item xs={4}/>
					<Grid item xs={4}>
						<div style={{display: 'flex', justifyContent: 'center'}}>
							<Typography
								variant="subtitle1"
								noWrap
								sx={{
									fontSize: "25px",
									color: 'inherit',
								}}
							>
								Add Address
							</Typography>
						</div>
						<div style={{display: 'flex', justifyContent: 'center', marginTop: "30px"}}>
							<TextField id="name"
									   label="Name *"
									   variant="outlined"
									   fullWidth
									   onChange={(event) => saveChanges("name", event.target.value)}
							/>
						</div>
						<div style={{display: 'flex', justifyContent: 'center', marginTop: "30px"}}>
							<TextField id="contactNumber"
									   label="Contact Number *"
									   variant="outlined"
									   fullWidth
									   onChange={(event) => saveChanges("contactNumber", event.target.value)}
							/>
						</div>
						<div style={{display: 'flex', justifyContent: 'center', marginTop: "30px"}}>
							<TextField id="street"
									   label="Street *"
									   variant="outlined"
									   fullWidth
									   onChange={(event) => saveChanges("street", event.target.value)}
							/>
						</div>
						<div style={{display: 'flex', justifyContent: 'center', marginTop: "30px"}}>
							<TextField id="city"
									   label="City *"
									   variant="outlined"
									   fullWidth
									   onChange={(event) => saveChanges("city", event.target.value)}
							/>
						</div>
						<div style={{display: 'flex', justifyContent: 'center', marginTop: "30px"}}>
							<TextField id="state"
									   label="State *"
									   variant="outlined"
									   fullWidth
									   onChange={(event) => saveChanges("state", event.target.value)}
							/>
						</div>
						<div style={{display: 'flex', justifyContent: 'center', marginTop: "30px"}}>
							<TextField id="landmark"
									   label="Landmark"
									   variant="outlined"
									   fullWidth
									   onChange={(event) => saveChanges("landmark", event.target.value)}
							/>
						</div>
						<div style={{display: 'flex', justifyContent: 'center', marginTop: "30px"}}>
							<TextField id="zipcode"
									   label="Zip Code *"
									   variant="outlined"
									   fullWidth
									   onChange={(event) => saveChanges("zipcode", event.target.value)}
							/>
						</div>
						<div style={{display: 'flex', justifyContent: 'center', marginTop: "30px"}}>
							<Button variant="contained"
									color="primary"
									fullWidth
									onClick={saveAddress}
							>
								SAVE ADDRESS
							</Button>
						</div>
					</Grid>
					<Grid item xs={4}/>
				</Grid>
            </Grid>
            <Snackbar open={success} autoHideDuration={2000} onClose={handleCloseSuccessAlert} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert
                    onClose={handleCloseSuccessAlert}
                    severity="success"
                    variant="filled"
                    sx={{ width: '90%' }}

                >
                    Address saved successfully!
                </Alert>
            </Snackbar>
        </Box>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
};

export default connect(mapStateToProps)(SelectAddress);