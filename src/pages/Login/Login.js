import React, { useState } from 'react';
import LockIcon from '@material-ui/icons/Lock';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';



export const Login = () => {

    const [email, setEmail]       = useState('');
    const [password, setPassword] = useState('');
    const [error, setError]       = useState('');

    const handleSignIn = () => {
        setError('');
        
        // perform validation
        if (!email || !password) {
            setError('Please enter both fields');
            return;
        }

        // authentication logic

        // clear the form and error after successful login
        setEmail('');
        setPassword('');
        setError('');
    };

    return (
        <div className="form-container">

            <div className="form-header">
                <div className="form-header-icon">
                    <LockIcon />
                </div>
                <Typography variant="h5">
                    Sign In
                </Typography>
            </div>

            <form>
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

                {error && <Typography color="error" className="error-text">{error}</Typography>}

                <Button variant="contained" color="primary" onClick={handleSignIn} className="submit-button" fullWidth>
                    Sign In
                </Button>
            </form>

            <Typography variant="body2">
                Don't have an account? <a href="/signup">Sign Up</a>
            </Typography>

            <Typography variant="body2">
                © 2023 All rights reserved
            </Typography>
        </div>
    );
};