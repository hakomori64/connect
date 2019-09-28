import React from 'react';

const Message = ({message, index}) => (
    <li key={index}>
        <span>
            {message.userName}:
        </span>
        {message.message}
    </li>
)

export default Message;