import React from 'react';
import { AppBar, Toolbar, IconButton, InputBase, Button, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import './NavBar.css';



const Navbar = () => {

    const user = {
        isLoggedIn: false,
        isAdmin: true
    }

    return (
        <AppBar position="static">
            <Toolbar>

                <div className="navbar-container">

                    <div className="navbar-section">
                        <Button component={Link} to="/" color="inherit">
                            <IconButton edge="start" color="inherit">
                                <ShoppingCartIcon />
                                <Typography variant="subtitle1" color="inherit">
                                    Upgrad Eshop
                                </Typography>
                            </IconButton>
                        </Button>
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
                                {user.isAdmin &&
                                    <Button color="inherit">
                                        Add Product
                                    </Button>
                                }
                                <Button color="inherit">
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

export default Navbar;