import React, { useState } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { connect } from "react-redux";
import { setUser } from "../../store/actions/userActions";
import { setEmail } from "../../store/actions/emailActions";
import { DatePicker } from 'antd';
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

const SignUp = ({ classes, setUser, setEmail }) => {
    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        dateOfBirth: '',
        retypePassword: '',
    });

    const onDateChange = (date, dateStr) => setData(data => ({ ...data, dateOfBirth: dateStr }));

    const { firstName, lastName, email, password, retypePassword } = data;

    const Submit = (e) => {
        e.preventDefault();
        Axios.post('http://localhost:64660/api/signup', data)
        .then(({ data }) => {
            Cookies.set('email', data.isConfirmed);
            setEmail(data.isConfirmed);
            Cookies.set('user', data.user);
            setUser(data.user);
        }).catch(error => !!error.response && console.log(error.response));
    }

    const onChange = ({target: {name, value}}) => {
        setData(data => ({
            ...data,
            [name]: value
        }))
    }

    return (
        <div className="user-bg auth-bg-image">
            <form className="form" onSubmit={Submit} autoComplete="off">
                <h3 className="FormTitle">Sign Up</h3>
                <TextField
                    required={true}
                    id="first-name"
                    label="First Name"
                    className={classes.textField}
                    name="firstName"
                    value={firstName}
                    onChange={onChange}
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    required={true}
                    id="last-name"
                    label="Last Name"
                    className={classes.textField}
                    name="lastName"
                    value={lastName}
                    onChange={onChange}
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    required={true}
                    id="email"
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
                    required={true}
                    id="password"
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
                <TextField
                    required={true}
                    error={password === retypePassword ? false : true}
                    id="retype-password"
                    label="Retype Password"
                    className={classes.textField}
                    type="password"
                    name="retypePassword"
                    autoComplete="current-password"
                    margin="normal"
                    variant="outlined"
                    value={retypePassword}
                    onChange={onChange}
                />

                <br/>

                <DatePicker 
                    className="datePickerRegistration" 
                    placeholder="Date of birth"
                    onChange={onDateChange}
                />

                <br/>
                <Button id="submit-button" type="submit" variant="contained" color="secondary" className={classes.button}>
                    Sign Up
                </Button>
                <Button id="change-auth-button" color="primary" className={classes.button}>
                    <Link className="custom-link" to="/">Back</Link>
                </Button>
            </form>
        </div>
    )
}

SignUp.propTypes = {
    classes: PropTypes.object.isRequired,
  };

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = { setUser, setEmail }

const SignUpWithStyles = withStyles(Styles)(SignUp);

export default connect(mapStateToProps, mapDispatchToProps)(SignUpWithStyles);