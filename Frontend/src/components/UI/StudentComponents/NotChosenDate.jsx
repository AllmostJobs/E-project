import React from "react";
import { DatePicker, Icon } from 'antd';
import Button from '@material-ui/core/Button';

const NotChosenDate = ({ Submit, onDateChange, studyDate, disabledDate }) => {
    return (
        <form id="date-form" onSubmit={Submit}>
            <Icon style={{ fontSize: '50px', }} type="smile" />
            <p className="title">The first, choose your a wish date of study</p>
            <DatePicker
                className="input-date datePickerRegistration" 
                disabledDate={disabledDate} 
                showToday={false} 
                style={{ width: '280px' }} 
                size="large" 
                placeholder="Choose the date"
                onChange={onDateChange}
            />
            { !!studyDate &&
                <Button id="submit-button" type="submit" variant="contained" className="confirm-date-btn" color="primary" >
                    Choose this date
                </Button>
            }
        </form>
    )
}

export default NotChosenDate;