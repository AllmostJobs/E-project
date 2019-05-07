import React, { useState } from "react";
import Cookies from 'js-cookie';
import NotChosenDate from "./NotChosenDate";
import moment from 'moment';
import ChosenDate from "./ChosenDate";
import Axios from "axios";
import LinearProgress from '@material-ui/core/LinearProgress';

export const StudentForm = ({ studyDate, userId, setUser }) => {
    const [isChosenDate, setIsChosenDate] = useState(studyDate != null);
    const [studyDateCalendar, setStudyDateCalendar] = useState('');
    const disabledDate = (current) => current && current < moment().endOf('day');
    const [loader, setLoader] = useState(false);
    const onChange = (date, dateStr) => setStudyDateCalendar(dateStr);

    const Submit = (e) => {
        e.preventDefault();
        setLoader(true);
        const token = Cookies.getJSON("user").token;
        Axios.get(`http://localhost:64660/api/student/${userId}/${studyDateCalendar}`, { headers: { Authorization: `Bearer ${token}` } })
        .then(({ data }) => {
            setLoader(false);
            Cookies.set('user', data);
            setUser(data);
        })
        .catch(error => !!error.response && console.log(error.response));
    }

    if(!isChosenDate){
        return (
            <div>
                <NotChosenDate 
                    Submit={Submit} 
                    onDateChange={onChange} 
                    studyDate={studyDateCalendar} 
                    disabledDate={disabledDate} 
                />
                { loader && <LinearProgress style={{'height':'2px'}} />}
            </div>
        )
    } 
    else {
       return (<ChosenDate changeDate={() => setIsChosenDate(!isChosenDate)}/>)
    }
}