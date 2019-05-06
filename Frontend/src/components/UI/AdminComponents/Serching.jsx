import React from 'react';
import { Input } from 'antd';
import Axios from 'axios';
import Cookies from 'js-cookie';

const Search = Input.Search;

const Serching = ({ setUserList }) => {

    const Serch = (value) => {
        if(value == '') {
            value = 'all'; 
        }
        const token = Cookies.getJSON("user").token;
        Axios.get(`http://localhost:64660/api/admin/serch/${value}`, { headers: { Authorization: `Bearer ${token}` } })
        .then(({ data }) => {
            setUserList(data);
        })
        .catch(error => !!error.response && console.log(error.response));
    }

    return (
        <Search
            placeholder="Serch by name"
            onSearch={Serch}
            size="large"
        />
    )
}

export default Serching;