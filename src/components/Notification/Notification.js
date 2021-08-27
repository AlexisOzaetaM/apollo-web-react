import React from 'react';
import './Notification.css';

const notification = (props) => {
    const style = props.notificationStyle ? props.notificationStyle : 'info';

    return (
        <div className={style}>{props.message}</div>
    );
}

export default notification;