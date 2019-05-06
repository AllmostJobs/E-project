import React from "react";
import { Link } from 'react-router-dom';
import { Avatar, Menu, Dropdown } from 'antd';

const colorList = ['#919558', '#fc864c', '#f2d470', '#401212', '#a59a3d', '#2e2f39', '#123141', '#ebbb3d'];

const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));

let color = colorList[getRandomInt(colorList.length)];

const Header = ({ logOut, firstName, lastName }) => {
    return (
        <header className="user-header">
            <Dropdown overlay={() => (
                <Menu>
                    <Menu.Item key="0" onClick={logOut}>
                        <Link onClick={logOut} className="custom-link" to="/">Log out</Link>
                    </Menu.Item>
                </Menu>
            )
            } trigger={['click']}>
                <Link to="#" className="ant-dropdown-link userNameWrap">
                    <p className="user-name">{`${firstName} ${lastName}`}</p>
                    <Avatar style={{ backgroundColor: color, verticalAlign: 'middle' }} size="large">
                        {firstName.charAt(0) + lastName.charAt(0)}
                    </Avatar>
                </Link>
            </Dropdown>
        </header>
    )
} 

export default Header;