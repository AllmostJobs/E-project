import React, { useState } from "react";
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { setUser } from "../../store/actions/userActions";
import { setEmail } from "../../store/actions/emailActions";
import Cookies from "js-cookie";
import Axios from "axios";

const SignIn = ({ setUser, setEmail }) => {
    const [data, setData] = useState({
        email: '',
        password: ''
    });

    const [inputError, setInputError] = useState(false);

    const Submit = (e) => {
        e.preventDefault();
        Axios.post('http://localhost:64660/api/signin', data)
        .then(({ data }) => {
            setInputError(false);
            Cookies.set('email', data.isConfirmed);
            setEmail(data.isConfirmed);
            Cookies.set('user', data.user);
            setUser(data.user);
        })
        .catch(error => !!error.response && console.log(error.response), setInputError(true));
    }

    const onChange = ({target: {name, value}}) => {
        setData(data => ({
            ...data,
            [name]: value
        }))
        if(value == '') {
            setInputError(false); 
        }
    }

    const { email, password } = data;

    return (
        <div className="user-bg auth-bg-image">
            <form className="form" onSubmit={Submit} autoComplete="off">
                <h3 className="FormTitle">Sign In</h3>
                <TextField
                    id="outlined-email-input"
                    required
                    error={inputError}
                    label="Email"
                    type="email"
                    name="email"
                    margin="normal"
                    variant="outlined"
                    value={email}
                    onChange={onChange}
                />
                <TextField
                    id="outlined-password-input"
                    required
                    error={inputError}
                    label="Password"
                    type="password"
                    name="password"
                    margin="normal"
                    variant="outlined"
                    value={password}
                    onChange={onChange}
                />
                <Button id="submit-button" type="submit" variant="contained" color="primary">
                    Sign In
                </Button>
                <Button id="change-auth-button" color="primary">
                    <Link className="custom-link" to="/sign-up" >Registration</Link>
                </Button>
            </form>
        </div>
    )
}

const mapStateToProps = () => ({});

const mapDispatchToProps = { setUser, setEmail };

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);