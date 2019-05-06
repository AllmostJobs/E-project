import React, { useState } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { setUser } from "../../store/actions/userActions";
import { setEmail } from "../../store/actions/emailActions";
import Cookies from "js-cookie";
import Axios from "axios";

const Styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
});

const SignIn = ({ classes, setUser, setEmail }) => {
    const [data, setData] = useState({
        email: '',
        password: ''
    });

    const [inputError, setInputError] = useState(false);

    const Submit = (e) => {
        e.preventDefault();
        Axios.post('http://localhost:64660/api/signin', data)
        .then(({ data }) => {
            Cookies.set('email', data.isConfirmed);
            Cookies.set('user', data.user);
            setUser(data.user);
            setEmail(data.isConfirmed);
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
                    className={classes.textField}
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
                    className={classes.textField}
                    type="password"
                    name="password"
                    autoComplete="current-password"
                    margin="normal"
                    variant="outlined"
                    value={password}
                    onChange={onChange}
                />
                <Button id="submit-button" type="submit" variant="contained" color="primary" className={classes.button}>
                    Sign In
                </Button>
                <Button id="change-auth-button" color="primary" className={classes.button}>
                    <Link className="custom-link" to="/sign-up" >Registration</Link>
                </Button>
            </form>
        </div>
    )
}

SignIn.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = { setUser, setEmail };

const ConnectedSignIn = connect(mapStateToProps, mapDispatchToProps)(SignIn);

export default withStyles(Styles)(ConnectedSignIn);