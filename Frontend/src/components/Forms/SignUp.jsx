import React, { useState } from "react";
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { connect } from "react-redux";
import { setUser } from "../../store/actions/userActions";
import { setEmail } from "../../store/actions/emailActions";
import { DatePicker } from 'antd';
import Axios from "axios";

const SignUp = ({ setUser, setEmail }) => {
    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        dateOfBirth: '',
        retypePassword: '',
    });

    const [firstNameValid, setFirstNameValid] = useState('');
    const [lastNameValid, setLastNameValid] = useState('');
    const [passwordValid, setPasswordValid] = useState('');
    const [rePassValid, setRePassValid] = useState('');

    const onDateChange = (date, dateStr) => setData(data => ({ ...data, dateOfBirth: dateStr }));

    const { firstName, lastName, email, password, retypePassword } = data;

    

    const Submit = (e) => {
        e.preventDefault();
        if(firstName.length < 4 || isNaN(firstName) == false) {
            setFirstNameValid('Must be more than 4 characters and should not be completely digits');
        }else{
            setFirstNameValid('');
            if(lastName.length < 4 || isNaN(firstName) == false) {
                setLastNameValid('Must be more than 4 characters and should not be completely digits');
            } else{
                setLastNameValid('');
                if(password.length < 6) {
                    setPasswordValid('Its to short');
                } else{
                    setPasswordValid('');
                    if(retypePassword === password) {
                        setRePassValid('');
                        Axios.post('http://localhost:64660/api/signup', data)
                        .then(({ data }) => {
                            Cookies.set('email', data.isConfirmed);
                            setEmail(data.isConfirmed);
                            Cookies.set('user', data.user);
                            setUser(data.user);
                        }).catch(error => !!error.response && console.log(error.response));
                    } else{
                        setRePassValid('Not matching password');
                    }
                }
            }
        }
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
                    id="first-name"
                    label="First Name"
                    name="firstName"
                    value={firstName}
                    onChange={onChange}
                    margin="normal"
                    variant="outlined"
                />
                <span className="valid-message">{firstNameValid}</span>
                <TextField
                    id="last-name"
                    label="Last Name"
                    name="lastName"
                    value={lastName}
                    onChange={onChange}
                    margin="normal"
                    variant="outlined"
                />
                <span className="valid-message">{lastNameValid}</span>
                <TextField
                    required={true}
                    id="email"
                    label="Email"
                    type="email"
                    name="email"
                    margin="normal"
                    variant="outlined"
                    value={email}
                    onChange={onChange}
                />
                <TextField
                    id="password"
                    label="Password"
                    type="password"
                    name="password"
                    autoComplete="current-password"
                    margin="normal"
                    variant="outlined"
                    value={password}
                    onChange={onChange}
                />
                <span className="valid-message">{passwordValid}</span>
                <TextField
                    error={password === retypePassword ? false : true}
                    id="retype-password"
                    label="Retype Password"
                    type="password"
                    name="retypePassword"
                    autoComplete="current-password"
                    margin="normal"
                    variant="outlined"
                    value={retypePassword}
                    onChange={onChange}
                />
                <span className="valid-message">{rePassValid}</span>

                <br/>

                <DatePicker 
                    className="datePickerRegistration" 
                    placeholder="Date of birth"
                    onChange={onDateChange}
                />

                <br/>
                <Button id="submit-button" type="submit" variant="contained" color="secondary">
                    Sign Up
                </Button>
                <Button id="change-auth-button" color="primary">
                    <Link className="custom-link" to="/">Back</Link>
                </Button>
            </form>
        </div>
    )
}

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = { setUser, setEmail }

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);