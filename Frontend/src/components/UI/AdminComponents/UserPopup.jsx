import { Card, Icon, Input, Form } from 'antd';
import React, { useEffect } from 'react';
import Axios from 'axios';

const InputGroup = Input.Group;
let info = '';

const UserPopup = ({ user, setClickedUser, setMail, mail, setMessageStatus, messageStatus }) => {
    const Close = () => {
        info = '';
        setMessageStatus('');
        setClickedUser('');
    }

    const SendMail = (e) => {
        e.preventDefault();
        if(mail.subject != '' && mail.message != '') {
            Axios.post('http://localhost:64660/api/admin/mail', mail,  { headers: { Authorization: `Bearer ${user.token}` } })
            .then(({ data }) => {
                
            })
            .catch(error => !!error.response && console.log(error.response));
            Close();
        } else {
            info = 'Should be fill';
            setMessageStatus('error');
        }
    }

    const setUser = (clickedUser) => setMail(data => ({ ...data, toUser: clickedUser }))
    
    const onChange = ({target: {name, value}}) => {
        setMail(data => ({
            ...data,
            [name]: value
        }))
    }

    return (
        <div className="darken-bgr">
            <div className="user-popup">
                <Card
                    title={`${user.firstName} ${user.lastName}`}
                    extra={
                        <button onClick={Close} className="close-popup-btn">
                            <Icon type="close-circle" />
                        </button>}
                >
                    <p>Email: {user.email}</p>
                    <p>Date of birth: {user.dateOfBirth}</p>
                    <p>Registrated date: {user.registratedDate}</p>
                    <p>Study date: {user.studyDate}</p>
                    <InputGroup>
                        <form onSubmit={SendMail} autoComplete="off">
                            <Form.Item  
                                validateStatus={messageStatus}
                                help={info}
                            >
                                <Input 
                                    style={{ width: '20%', borderRadius: '4px 0 0 4px' }} 
                                    size="large" 
                                    placeholder="Subject:" 
                                    name="subject"
                                    onChange={onChange}
                                />
                                <Input 
                                    style={{ width: '80%'}} 
                                    size="large" 
                                    placeholder="Message" 
                                    name="message"
                                    onChange={onChange}
                                    addonAfter={
                                        <button onClick={() => setUser(user.email)} type="submit" className="send-message-btn">
                                            <Icon type="right" />  
                                        </button>
                                    }
                                />
                            </Form.Item>
                        </form>
                    </InputGroup>
                </Card>
            </div>
        </div>
    )
}

export default UserPopup