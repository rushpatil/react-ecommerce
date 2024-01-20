import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';


const ProductOrder = () => {
    
    const location = useLocation();
    let componentMounted= true;
    useEffect(() => {
        console.log('Order Data:', JSON.parse(location.state?.orderData));
        // The above line will log the productData to the console when the component mounts
        return () => {
            componentMounted = false;
        };
    }, [location.state?.orderData]);

    return (

        <div>
            <h2>Product Details</h2>
            (
                <div>
                    <p>Product ORDER PAGE</p>
                </div>
            )
        </div>
    );

};

export default ProductOrder;