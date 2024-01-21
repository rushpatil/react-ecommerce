import Home from "./pages/Home/Home";
import { Login } from "./pages/Login/Login";
import { Signup } from "./pages/Signup/Signup";
import { AddProducts } from "./pages/AdminProductActions/AddProduct";
import ProductDetailsPage from "./components/ProductDetailsPage/ProductDetailsPage";
import ProductOrder from "./components/ProductOrder/ProductOrder";



const routes = [
    {
        path: '/products',
        component: AddProducts,
        exact: true,
    },
    {
        path: '/home',
        component: Home,
        exact: true,
    },
    {
        path: '/login',
        component: Login,
        exact: true,
    },
    {
        path: '/signup',
        component: Signup,
        exact: true,
    },
    {
        path: '/productDetailsPage',
        component: ProductDetailsPage,
        exact: true,
    },
    {
        path: '/placeOrder',
        component: ProductOrder,
        exact: true,
    }
];

export default routes;