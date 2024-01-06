import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// material ui
import Button from '@material-ui/core/Button';
import LockIcon from '@material-ui/icons/Lock';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

// api
import { userApi } from '../../api/userApi';

// user redux
import { setUser } from '../../redux/actions/userActions';



export const Login = () => {

    const [email, setEmail]       = useState('');
    const [password, setPassword] = useState('');
    const [roles, setRoles] = useState([]);
    const [error, setError]       = useState([]);

    const dispatch = useDispatch();
    const history = useHistory();

    const handleSignIn = async () => {
        try {

            setError([]);

            // perform validation
            if (!email || !password) {
                setError(['Please enter both fields']);
                return;
            }

            const userData = {
                username: email, password
            }

            const response = await userApi.login(userData);
            if (response.status === 200) {
                dispatch(setUser({ 
                    email, password,
                    token: response.token,
                    roles: response.roles
                }));
                history.push('/');
            }

            // clear the form and error after successful login
            setEmail('');
            setPassword('');
            setError([]);

        } catch (error) {
            setError([error.message]);
        }
    }

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

                {error.map((err, index) => 
                    <Typography color="error" className="error-text" key={`err-${index}`}>{err}</Typography>
                )}

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