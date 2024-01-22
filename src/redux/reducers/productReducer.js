const initialState = {
    selectedCategory: null,
    categories: [],
    products: [],
    selectedSortingFilter: "DEFAULT",
};

const productReducer = (state = initialState, action) => {
    let data;
    console.log(action.type + action.category + action.sortBy);
    switch(action.type){
        case "INITIAL_CATALOG": {
			data = {
				...state,
				categories: action.categories,
				products: action.products,
			};
			break;
		}
		case "CLEAR_CATALOG": {
			data = initialState;
			break;
		}
        case "SET_FILTER": {
            data = {
                ...state,
                selectedCategory: action.category,
            }
            console.log("setting category to "+ data.selectedCategory);
            break;
        }
        case "REMOVE_FILTER": {
            data = {
                ...state,
                selectedCategory: null,
            }
            break;
        }
        case "SET_SORTING_FILTER": {
            data = {
                ...state,
                selectedSortingFilter: action.sortBy,
            }
            console.log("setting sortBy to "+ data.selectedSortingFilter);
            break;
        }
		default: {
			data = state;
		}
    }
    localStorage.setItem("product_metadata", JSON.stringify(data));
    return data;
};

export default productReducer;