import React, { useState } from "react";
import Cookies from 'js-cookie';
import NotChosenDate from "./NotChosenDate";
import moment from 'moment';
import ChosenDate from "./ChosenDate";
import Axios from "axios";

export const StudentForm = ({ studyDate, userId, setUser }) => {
    const [isChosenDate, setIsChosenDate] = useState(studyDate != null);
    const [studyDateCalendar, setStudyDateCalendar] = useState('');
    const disabledDate = (current) => current && current < moment().endOf('day');

    const onChange = (date, dateStr) => setStudyDateCalendar(dateStr);

    const Submit = (e) => {
        e.preventDefault();
        const token = Cookies.getJSON("user").token;
        Axios.get(`http://localhost:64660/api/student/${userId}/${studyDateCalendar}`, { headers: { Authorization: `Bearer ${token}` } })
        .then(({ data }) => {
            Cookies.set('user', data);
            setUser(data);
        })
        .catch(error => !!error.response && console.log(error.response));
    }

    if(!isChosenDate){
        return (
            <NotChosenDate 
                Submit={Submit} 
                onDateChange={onChange} 
                studyDate={studyDateCalendar} 
                disabledDate={disabledDate} 
            />
        )
    } 
    else {
       return (<ChosenDate changeDate={() => setIsChosenDate(!isChosenDate)}/>)
    }
}