//Home page which can be called after login success

import { Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import ProductCategory from "../../components/ProductCategory/ProductCategory";
import ProductsList from "../../components/ProductsList/ProductsList";
import ProductSorting from "../../components/ProductSorting/ProductSorting";
import { connect } from 'react-redux';
import { initialCatalog } from "../../redux/actions/productActions";
import { useCallback, useContext, useEffect } from "react";
import { useDispatch } from "react-redux";

const Home = ({ user }) => {
    const dispatch = useDispatch();

    const accessToken = user.token;
    console.log(accessToken);
    const initialFetchProductsData = useCallback(() => {
        dispatch(initialCatalog(accessToken));
    }, [dispatch, accessToken]);

    useEffect(() => {
        initialFetchProductsData();
    }, [initialFetchProductsData]);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={1}>
                <Grid container item spacing={3}>
                    <Grid item xs={12}>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <Button>
                                <ProductCategory />
                            </Button>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <div style={{ display: 'flex', justifyContent: 'left', paddingLeft: "1%" }}>
                            <Button>
                                <ProductSorting />
                            </Button>
                        </div>
                    </Grid>
                    <ProductsList />
                </Grid>
            </Grid>
        </Box>
    );
};

// map the Redux state to component props
const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

export default connect(mapStateToProps)(Home);