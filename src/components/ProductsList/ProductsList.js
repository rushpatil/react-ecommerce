import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Grid } from '@material-ui/core';
import { ProductCard } from '../ProductCard/ProductCard';
import { Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { initialCatalog } from '../../redux/actions/productActions';
import _ from 'lodash';
import { viewProduct } from '../../api/productAPIs';

const ProductsList = ( {user, allProductsList, selectedSortingFilter, category, reFetchAllData }) => {
    const dispatch = useDispatch();
    const history = useHistory();

	let getSortedProducts = (list, s) => {
        console.log("Inside sortBy filter "+ list + " ****** "+ s);
		if(s === undefined || s === null) {
			s = "DEFAULT";
		}
		if(s !== "DEFAULT") {
			list.sort((a, b) => {
				if (s === "PRICE_ASCENDING") {
					if(a.price < b.price) {
						return -1;
					} else if(a.price > b.price) {
						return 1;
					} else {
						return 0;
					}
				} else if (s === "PRICE_DESCENDING") {
					if(a.price < b.price) {
						return 1;
					} else if(a.price > b.price) {
						return -1;
					} else {
						return 0;
					}
				} else if (s === "NEWEST") {
					//NOTE: We are not receiving time stamp of products from backend so right now the default order has been reversed.
					return -1;
				} else {
					return 0;
				}
			});
		}
		return list;
	}

	let getFilteredProducts = (list, c) => {
        console.log("BEFORE Inside category filter "+list + "****" + c);
		if(c === undefined || c === null) {
			c = "ALL";
		}
		let filteredList = [];
		for(let i = 0; i < list.length; i++) {
			if(c.toUpperCase() === "ALL" || c.toUpperCase() === list[i].category.toUpperCase()) {
				filteredList.push(list[i]);
			}
		}
        console.log("AFTER Inside category filter "+list + "****" + c);
		return filteredList; 
	}
    
    let products = _.flow(
        (filteredProducts) => getFilteredProducts(filteredProducts, category),
        (sortedProducts) => getSortedProducts(sortedProducts, selectedSortingFilter)
    )(allProductsList);
    
    let loadProductDetailsPage = (productDetails) => {
        console.log(productDetails);
        viewProduct(productDetails.id, user.token).then((json) => {
            const jsonData = JSON.stringify({
                value: json.value,
            });
            console.log(jsonData);
            history.push('/productDetailsPage', {productData: jsonData});
        }).catch((json) => {
            console.log("Error in productDetail page load :"+json.reason);
        });
    };
    
    return(
        <>
            <Grid container>
            { 	products !== null && products.length > 0 &&
					products.map((element, index) => {
						return (
							<Grid key={"parent_product_" + index} item xs={3}>
								<div key={"div_product_" + index} style={{display: 'flex', justifyContent: 'center', marginTop: "5%"}}>
									<ProductCard
										key={"product_" + index}
                                        buyProduct={loadProductDetailsPage}
										{...element}
									/>
								</div>
							</Grid>
						);
					})
				}
				{
					(products === null || products.length === 0) &&
					<Grid item xs={12}>
						<div style={{display: 'flex', justifyContent: 'center'}}>
							<Typography variant="body1">
								No products available.
							</Typography>
						</div>
					</Grid>
				}
            </Grid>
        </>
    )

};

const mapStateToProps = (state) => {
    return {
        user: state.user,
        allProductsList: state.productdata.products,
        selectedSortingFilter: state.productdata.selectedSortingFilter,
        category: state.productdata.selectedCategory,
    };
};

const mapDispatchtoProps = (dispatch) => {
    return {
		reFetchAllData: (accessToken) => dispatch(initialCatalog(accessToken)),
	};
}

export default connect(mapStateToProps, mapDispatchtoProps)(ProductsList);