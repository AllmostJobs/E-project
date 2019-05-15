import React from "react";
import { Icon } from 'antd';
import Button from '@material-ui/core/Button';

const ChosenDate = ({ changeDate }) => {
    return (
        <form id="date-form">
            <Icon style={{ fontSize: '50px', }} type="smile" />
            <p className="title">Well, now you should wait for the admin to contact you  </p>
            
            <Button id="submit-button" onClick={changeDate} variant="contained" className="change-date-btn" color="primary" >
                Change date
            </Button>
        </form>
    )
}

export default ChosenDate;