import React, { useState } from 'react';
import LockIcon from '@material-ui/icons/Lock';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';



export const Signup = () => {

    const [firstName, setFirstName]             = useState('');
    const [lastName, setLastName]               = useState('');
    const [email, setEmail]                     = useState('');
    const [password, setPassword]               = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [contactNumber, setContactNumber]     = useState('');
    const [error, setError]                     = useState('');

    const handleSignUp = () => {
        // perform validation
        if (!firstName || !lastName || !email || !password || !confirmPassword || !contactNumber) {
            setError('All fields are required.');
            return;
        }

        // auth logic

        // clear the form and error after successful sign-up
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setContactNumber('');
        setError('');
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

                {error && <Typography color="error" className="error-text">{error}</Typography>}

                <Button variant="contained" color="primary" onClick={handleSignUp} className="submit-button" fullWidth>
                    Sign Up
                </Button>
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