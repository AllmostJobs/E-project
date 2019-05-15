import React, { useEffect, useState } from "react";
import { setEmail } from "../../../store/actions/emailActions";
import { connect } from "react-redux";
import Cookies from "js-cookie";
import Axios from "axios";
import Header from "../generalComponents/Header";
import { Button } from "@material-ui/core";

const NotConfirmedEmail = ({ user, setEmail, confirmUserId, confirmCode }) => {
    const [confirmData, setConfirmData] = useState({
        userId: confirmUserId,
        code: confirmCode
    })

    const SendConfirmMessage = () => {
        Axios.get(`http://localhost:64660/api/student/email/confirm/${user.id}`, { headers: { Authorization: `Bearer ${user.token}` } })
        .then(({ data }) => {
            Cookies.set('email', data);
            setEmail(data);
        }).catch(error => !!error.response && console.log(error.response));
    }

    const SendConfirmParams = () => {
        Axios.post(`http://localhost:64660/api/student/email/confirm`, confirmData, { headers: { Authorization: `Bearer ${user.token}` } })
        .then(({ data }) => {
            Cookies.set('email', data);
            setEmail(data);
        }).catch(error => !!error.response && console.log(error.response));
    }

    if(JSON.stringify(confirmData) != '{}'){
        useEffect(SendConfirmParams, []);
    }

    const logOut = () => {
        Cookies.remove("user");
        setUser({});
    }

    setInterval(SendConfirmMessage, 10000);

    return (
        <div className="user-bg auth-bg-image">
            <Header 
                logOut={logOut} 
                firstName={user.firstName} 
                lastName={user.lastName} 
            />
            <div className="verified-email">
            Welcome! Your user is not confirmed. Please, go to Gmail in order to finish the registration <span>(please confirm your email)</span>
                <Button 
                    id="submit-button" 
                    href="https://mail.google.com/mail" 
                    target="_blank" 
                    variant="contained" 
                    color="secondary"
                    className="to-email-btn"
                    style={{textDecoration: 'none'}}
                    >
                        TO GMAIL
                </Button>
            </div>
        </div>
    )
}

const mapStateToProps = ({ user, email }) => ({ user, email });

const mapDispatchToProps = { setEmail }

export default connect(mapStateToProps, mapDispatchToProps)(NotConfirmedEmail);