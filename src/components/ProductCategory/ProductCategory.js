import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { removeFilter, setFilter } from "../../redux/actions/productActions";
import { connect } from "react-redux";
import { useEffect, useState } from "react";

const ProductCategory = ({filter, categories, changeFilter, clearFilter}) => {
    const [filterValue, setFilterValue] = useState(filter || "ALL");

    useEffect((newValue = filterValue, array = categories) => {
        let current = false;
        for(let i =0; i < array.length; i++){
            if(array[i] == newValue){
                current = true;
                break;
            }
        }
        if(!current){
            removeFilter();
            setFilterValue("ALL");
        }
    }, [filterValue, categories]);

    const handleAlignment = (event, newAlignment) => {
        console.log(newAlignment);
		if(newAlignment != null) {
			setFilterValue(newAlignment);
			if (newAlignment === "ALL") {
				clearFilter();
			} else {
                console.log("Inside change Filter "+ newAlignment);
				changeFilter(newAlignment);
			}
		}
	};

    return (
		<ToggleButtonGroup
			value={filterValue}
			exclusive
			onChange={handleAlignment}
			aria-label="categories"
		>
			{categories !== null && categories.map((element, index) => {
				return (
					<ToggleButton
						key={"category_" + index}
						value={element}
						aria-label={element}>
						{element.toUpperCase()}
					</ToggleButton>
				);
			})}
		</ToggleButtonGroup>
	);
};

const mapStateToProps = (state) => {
    return{
        filter: state.productdata.selectedCategory,
        categories: state.productdata.categories,
    };
};

const mapDispatchtoProps = (dispatch) => {
    return{
        changeFilter: (category) => dispatch(setFilter(category)),
        clearFilter: () => dispatch(removeFilter()),
    };
};

export default connect(mapStateToProps, mapDispatchtoProps)(ProductCategory);