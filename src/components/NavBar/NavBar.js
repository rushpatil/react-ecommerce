import React from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';

// material ui
import { AppBar, Toolbar, IconButton, InputBase, Button, Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

// styles
import './NavBar.css';

// user from redux
import { clearUser } from '../../redux/actions/userActions';



const Navbar = ({ user }) => {

    // console.log(user);

    const dispatch = useDispatch();
    const history = useHistory();

    const handleLogout = () => {
        // clear user data by setting it to null
        dispatch(clearUser());

        // redirect the user to a login page
        history.push('/login');
    };

    return (
        <AppBar position="static">
            <Toolbar>

                <div className="navbar-container">

                    <div className="navbar-section">
                        <IconButton edge="start" color="inherit" component={Link} to="/">
                            <ShoppingCartIcon />
                            <Typography variant="subtitle1" color="inherit">
                                Upgrad Eshop
                            </Typography>
                        </IconButton>
                    </div>

                    <div className="navbar-section">
                        {user.isLoggedIn &&
                            <div className="searchbar-container">
                                <InputBase
                                    placeholder="Search ..."
                                    startAdornment={<SearchIcon />}
                                />
                            </div>
                        }
                    </div>

                    <div className="navbar-section">

                        {/* actions for logged in user */}
                        {user.isLoggedIn &&
                            <>
                                <Button color="inherit" component={Link} to="/">
                                    Home
                                </Button>
                                {console.log(user)}
                                {user?.roles?.includes('ADMIN') &&
                                    <Button color="inherit" component={Link} to="/products">
                                        Add Product
                                    </Button>
                                }
                                <Button color="inherit" onClick={handleLogout}>
                                    Logout
                                </Button>
                            </>
                        }

                        {/* actions for logged out user */}
                        {!user.isLoggedIn &&
                            <>
                                <Button color="inherit" component={Link} to="/login">
                                    Login
                                </Button>
                                <Button color="inherit" component={Link} to="/signup">
                                    Sign Up
                                </Button>
                            </>
                        }

                    </div>

                </div>

            </Toolbar>
        </AppBar>
    )
};

// map the Redux state to component props
const mapStateToProps = (state) => {
    // console.log(state);
    return {
        user: state.user,
    };
};

// connect the component to the Redux store
export default connect(mapStateToProps)(Navbar);