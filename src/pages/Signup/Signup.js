import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

// material ui
import Button from '@material-ui/core/Button';
import LockIcon from '@material-ui/icons/Lock';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

// api
import { userApi } from '../../api/userApi';



export const Signup = () => {

    const [firstName, setFirstName]             = useState('');
    const [lastName, setLastName]               = useState('');
    const [email, setEmail]                     = useState('');
    const [password, setPassword]               = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [contactNumber, setContactNumber]     = useState('');
    const [error, setError]                     = useState([]);

    const dispatch = useDispatch();
    const history = useHistory();

    const validateFields = () => {
        let errorList = [];
        if (!firstName || !lastName || !email || !password || !confirmPassword || !contactNumber) {
            errorList.push("All fields are required");
        }
        
        if (password && confirmPassword && password !== confirmPassword) {
            errorList.push("Password and confirm password fields don't match");
        }
        
        if (password && password.length < 6) {
            errorList.push("Password should have six characters or more");
        }
        
        if (email && !isValidEmail(email)) {
            errorList.push("Please enter a valid email");
        }

        const hasError = (errorList.length > 0);
        if (hasError) {
            setError(errorList);
        }
        return hasError;
    }

    const handleSignUp = async () => {

        try {
            setError([]);

            // perform validation
            const hasError = validateFields();
            if (hasError) {
                return;
            }

            // auth logic
            const userData = {
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                contactNumber,
                roles: [] // to add user with admin role
            };

            const response = await userApi.signup(userData);
            if (response.status === 200) {
                toast.success('Successfully signed up!');
            }

            // clear the form and error after successful sign-up
            setFirstName('');
            setLastName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setContactNumber('');
            setError([]);
        } catch (error) {
            setError([error.message]);
        }
    };

    const isValidEmail = (email) => {
        // regular expression for a basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    return (
        <div className="form-container">

            <div className="form-header">
                <div className="form-header-icon">
                    <LockIcon />
                </div>
                <Typography variant="h5">
                    Sign Up
                </Typography>
            </div>

            <form>
                <TextField
                    label="First Name *"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    fullWidth
                    margin="normal"
                />

                <TextField
                    label="Last Name *"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    fullWidth
                    margin="normal"
                />

                <TextField
                    label="Email *"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    margin="normal"
                />

                <TextField
                    label="Password *"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    margin="normal"
                />

                <TextField
                    label="Confirm Password *"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    fullWidth
                    margin="normal"
                />

                <TextField
                    label="Contact Number *"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    fullWidth
                    margin="normal"
                />

                {error.map((err, index) => 
                    <Typography color="error" className="error-text" key={`err-${index}`}>{err}</Typography>
                )}

                <Button variant="contained" color="primary" onClick={handleSignUp} className="submit-button" fullWidth>
                    Sign Up
                </Button>

                <ToastContainer />
            </form>

            <Typography variant="body2">
                Already have an account? <a href="/login">Sign In</a>
            </Typography>

            <Typography variant="body2">
                © 2023 All rights reserved
            </Typography>
        </div>
    );
};