import React, { useState } from "react";
import Cookies from 'js-cookie';
import { setUser } from "../../store/actions/userActions";
import { connect } from "react-redux";
import { StudentForm } from "./StudentComponents/DateLogic";
import Header from "./generalComponents/Header";
import { openNotification } from "./generalComponents/WelcomeNotification";

let isMounted = true;

const Student = ({ setUser, user }) => {
    const { firstName, lastName, studyDate, id } = user;

    isMounted && openNotification(firstName);
    isMounted = false;

    const logOut = () => {
        Cookies.remove("user");
        setUser({});
    }

    return (
        <div className="user-bg student-bg-image">
            <Header 
                logOut={logOut} 
                firstName={firstName} 
                lastName={lastName} 
            />
            <StudentForm 
                studyDate={studyDate}
                userId={id}
                setUser={setUser}
            />
        </div>
    )
}

const mapStateToProps = ({ user }) => ({ user });
const mapDispatchToProps = { setUser };

export default connect(mapStateToProps, mapDispatchToProps)(Student);