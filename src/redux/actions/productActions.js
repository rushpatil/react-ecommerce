import { getAllProducts } from "../../api/productAPIs";
import { getAllCategories } from "../../api/productAPIs";

export const initialCatalog = (accessToken) => dispatch => {
    Promise.all([getAllCategories(accessToken), getAllProducts(accessToken)]).then(json => {
        console.log(json);
        dispatch({
            type: "INITIAL_CATALOG",
            categories: json[0].data,
            products: json[1].data,
        });
    }).catch(() => {
        dispatch({
            type: "INITIAL_CATALOG",
            categories: ["ALL"],
            products: [],
        });
    });
};

export const clearCatalog = () => {
    return{
        type: "CLEAR_CATALOG",
    }
};

export const setFilter = (category) => {
    return{
        type: "SET_FILTER",
        category: category,
    }
};

export const removeFilter = () => {
    return{
        type: "REMOVE_FILTER",
    }
};

export const setSortingFilter = (sortBy) => {
    return{
        type: "SET_SORTING_FILTER",
        sortBy: sortBy,
    }
};