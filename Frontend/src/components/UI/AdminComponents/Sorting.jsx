import React from "react";
import { Select } from 'antd';
import Axios from "axios";
import Cookies from 'js-cookie';

const { Option } = Select;

const Sorting = ({ setUserList }) => {
    const children = [
        <Option key={'all'}>{'All'}</Option>,
        <Option key={'byName'}>{'Sort by name'}</Option>,
        <Option key={'byAge'}>{'Sort by age'}</Option>,
        <Option key={'byDate'}>{'Whith study date'}</Option>,
        <Option key={'byDateEmpty'}>{'Whithout study date'}</Option>,
    ];

    const Sort = (value) => {
        const token = Cookies.getJSON('user').token;
        Axios.get(`http://localhost:64660/api/admin/sort/${value}`, { headers: { Authorization: `Bearer ${token}` } })
        .then(({ data }) => {
            setUserList(data);
        })
        .catch(error => !!error.response && console.log(error.response));
    }

    return (
        <Select
            size={'large'}
            defaultValue="all"
            onChange={Sort}
        >
        {children}
      </Select>
    )
}

export default Sorting;