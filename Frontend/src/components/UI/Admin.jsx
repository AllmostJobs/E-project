import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import { setUser } from "../../store/actions/userActions";
import { connect } from "react-redux";
import Header from "./generalComponents/Header";
import { openNotification } from "./generalComponents/WelcomeNotification";
import UserTable from "./AdminComponents/UserList";
import Serching from "./AdminComponents/Serching";
import Sorting from "./AdminComponents/Sorting";
import Axios from "axios";
import UserPopup from "./AdminComponents/UserPopup";

let isMounted = true;

const Admin = ({ setUser, user }) => {
    const { firstName, lastName } = user;
    const [userList, setUserList] = useState([]);
    const [clickedUser, setClickedUser] = useState('');
    const [messageStatus, setMessageStatus] = useState('');
    const [mail, setMail] = useState({
        fromUser: user.email,
        toUser: '',
        subject: '',
        message: '',
    });

    isMounted && openNotification(firstName);
    isMounted = false;

    const logOut = () => {
        Cookies.remove("user");
        setUser({});
    }
  
    return (
        <div className="user-bg admin-bg-image">
            <Header 
                logOut={logOut} 
                firstName={firstName} 
                lastName={lastName} 
            />
            <div className="operations-wrapper">
                <Serching setUserList={setUserList}/>
                <Sorting setUserList={setUserList}/>
            </div>
            <UserTable 
                setClickedUser={setClickedUser}
                setUserList={setUserList}
                userList={userList}
            />
            {
                clickedUser != '' && <UserPopup 
                                        setClickedUser={setClickedUser} 
                                        user={clickedUser}
                                        setMail={setMail}
                                        mail={mail}
                                        clickedUser={clickedUser.email}
                                        messageStatus={messageStatus}
                                        setMessageStatus={setMessageStatus}
                                    />
            }
        </div>
    )
}

const mapStateToProps = ({ user }) => ({ user });
const mapDispatchToProps = { setUser };

export default connect(mapStateToProps, mapDispatchToProps)(Admin);