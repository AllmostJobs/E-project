import { notification } from 'antd';

export const openNotification = (name) => {
    notification.open({
        message: `Hi, ${name} :)`,
        placement: 'bottomRight',
        description: 'Welcome to our web-site',
    });
};