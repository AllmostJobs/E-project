import React, { useState } from "react";
import Cookies from 'js-cookie';
import { setUser } from "../../store/actions/userActions";
import { connect } from "react-redux";
import Header from "./generalComponents/Header";
import { openNotification } from "./generalComponents/WelcomeNotification";
import UserTable from "./AdminComponents/UserList";
import Searching from "./AdminComponents/Searching";
import Sorting from "./AdminComponents/Sorting";
import UserPopup from "./AdminComponents/UserPopup";
import { TitleHeader } from "./AdminComponents/TitleHeader";

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
            <div className="table-wrap">
                <TitleHeader/>
                <div className="main-wrapper">
                    <div className="operations-wrapper">
                        <Searching setUserList={setUserList}/>
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
            </div>
        </div>
    )
}

const mapStateToProps = ({ user }) => ({ user });
const mapDispatchToProps = { setUser };

export default connect(mapStateToProps, mapDispatchToProps)(Admin);