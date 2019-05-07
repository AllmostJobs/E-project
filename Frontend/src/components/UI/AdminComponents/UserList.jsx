import React, { useEffect } from "react";
import { Table } from 'antd';
import Axios from "axios";
import Cookies from "js-cookie";

const UserTable = ({ setUserList, userList, setClickedUser }) => {
    const columns = [{
        title: '№',
        dataIndex: 'id',
        key: 'id',
      }, { 
        title: 'First Name',
        dataIndex: 'firstName',
        key: 'firstName',
      }, {
        title: 'Last Name',
        dataIndex: 'lastName',
        key: 'lastName',
      }, {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      }, {
        title: 'Date of birth',
        dataIndex: 'dateOfBirth',
        key: 'dateOfBirth',
      }, {
        title: 'Registrated Date',
        dataIndex: 'registratedDate',
        key: 'registratedDate',
      }, {
        title: 'Study Date',
        dataIndex: 'studyDate',
        key: 'studyDate',
        render: studyDate => (
            <span>
              {
                studyDate != null ? 
                  <div className="date-exist" key={studyDate}>{studyDate.toUpperCase()}</div> 
                  : 
                  <div className="date-not-exist">Not chose</div>
              }
            </span>
          ),
    }];

    const GetUsers = () => {
      const token = Cookies.getJSON('user').token;
      Axios.get('http://localhost:64660/api/admin', { headers: { Authorization: "Bearer " + token } })
      .then(({ data }) => {
          setUserList(data);
      })
      .catch(error => !!error.response && console.log(error.response));
    }

    useEffect(GetUsers, []);

    const OnUserClick = (user) => {
      setClickedUser(user);
    }

    return (
        <Table 
          rowKey={ item => item.id } 
          onRow={(user, rowIndex) => {
            return {
              onClick: () => OnUserClick(user), 
            };
          }}  
          dataSource={userList} 
          columns={columns} />
    )
}

export default UserTable;