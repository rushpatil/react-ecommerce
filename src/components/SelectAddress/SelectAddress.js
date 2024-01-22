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

const SelectAddress = ({ user, onAddressCallback, address }) => {
    const [addressList, setAddressList] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(address);
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
            </Grid>
        </Box>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
};

export default connect(mapStateToProps)(SelectAddress);