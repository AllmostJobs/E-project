import React from "react";
import { Input } from 'antd';
import Axios from 'axios';

const Search = Input.Search;

const Serching = ({ setUserList }) => {

    const Serch = (value) => {
        if(value == '') {
            value = 'all'; 
        }
        Axios.post(`http://localhost:64660/api/admin/serch/${value}`)
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