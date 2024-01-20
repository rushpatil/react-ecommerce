
import {FormControl, InputLabel, Select} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {useEffect, useState} from "react";
import {setSortingFilter} from "../../redux/actions/productActions";
import {connect} from "react-redux";

const ProductSorting = ({selectedSortingFilter, saveSortBy}) => {

	const [sortBy, setSortingFilter] = useState(selectedSortingFilter || 'DEFAULT');
    useEffect(() => {
        setSortingFilter(selectedSortingFilter || 'DEFAULT');
    }, [selectedSortingFilter]);

	const handleSortingChange = (event) => {
        const newSortby = event.target.value;
		setSortingFilter(newSortby);
		saveSortBy(newSortby);
	};

	const sortingOptions = [
		{
			label: "Default",
			value: "DEFAULT",
		},
		{
			label: "Price high to low",
			value: "PRICE_DESCENDING",
		},
		{
			label: "Price low to high",
			value: "PRICE_ASCENDING",
		},
		{
			label: "Newest",
			value: "NEWEST",
		},
	];

	return (
		<FormControl sx={{ m: 1, minWidth: 240 }} size={"small"}>
			<InputLabel id="simple-select-label">Sort By</InputLabel>
			<Select
				labelId="simple-select-label"
				id="simple-select"
				value={sortBy}
				label="Sort By"
				onChange={handleSortingChange}
			>
				{sortingOptions.map((element, index) => {
					return (
						<MenuItem
							key={"sortBy_" + index}
							value={element.value}
						>
							{element.label}
						</MenuItem>
					);
				})}
			</Select>
		</FormControl>
	);
};

const mapStateToProps = (state) => {
	return {
		selectedSortingFilter: state.productdata.selectedSortingFilter,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		saveSortBy: (sortBy) => dispatch(setSortingFilter(sortBy)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductSorting);